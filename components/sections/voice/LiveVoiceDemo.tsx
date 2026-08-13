'use client'

// Demo de voz REAL: conversación por el navegador con la cara hablando.
//
// COMO SE ARMA, que es lo que no se ve leyendo el código suelto:
// 1. Pedimos la sesión a nuestro servidor. Ahí viven las llaves; acá solo
//    llegan una URL firmada para la conversación y un token para la cara.
// 2. La cara se conecta primero: si falla, no arrancamos la conversación y
//    no gastamos minutos del agente.
// 3. El agente manda su voz en trozos por onAudio; se los pasamos a la cara,
//    que es la que reproduce el sonido junto al video. A la conversación le
//    ponemos volumen 0 para que el audio NO suene dos veces ni desfasado.
// 4. El corte a los segundos pactados lo manda esta página; el tope del
//    proveedor va un poco más arriba, como red de seguridad.

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import AnimatedContent from '@/components/reactbits/AnimatedContent'
import Eyebrow from '@/components/ui/Eyebrow'
import Icon from '@/components/ui/Icon'
import Orb, { type OrbPhase } from './Orb'
import { formatClock, type VoiceSessionData } from '@/lib/voiceDemo'

type Linea = { who: 'agent' | 'user'; text: string }

/** base64 (PCM16 del agente) a bytes crudos para la cara. */
function base64ABytes(b64: string): Uint8Array {
  const bin = atob(b64)
  const out = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i)
  return out
}

export default function LiveVoiceDemo({ maxSeconds }: { maxSeconds: number }) {
  const { t } = useI18n()
  const [phase, setPhase] = useState<OrbPhase>('idle')
  const [restan, setRestan] = useState(maxSeconds)
  const [lineas, setLineas] = useState<Linea[]>([])
  const [aviso, setAviso] = useState<string | null>(null)
  const [hablando, setHablando] = useState(false)
  // La cara conecta antes que la conversación. Se muestra apenas está lista,
  // así el visitante ve algo mientras el agente termina de abrir.
  const [caraLista, setCaraLista] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const caraRef = useRef<{
    stop: () => Promise<void>
    sendAudioData: (b: Uint8Array) => void
  } | null>(null)
  const convRef = useRef<{ endSession: () => Promise<void> } | null>(null)
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const cerrandoRef = useRef(false)

  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [lineas])

  const cerrar = useCallback(async (motivo: 'fin' | 'error', texto?: string) => {
    if (cerrandoRef.current) return
    cerrandoRef.current = true
    if (tickRef.current) clearInterval(tickRef.current)
    tickRef.current = null
    try {
      await convRef.current?.endSession()
    } catch {}
    try {
      await caraRef.current?.stop()
    } catch {}
    convRef.current = null
    caraRef.current = null
    setHablando(false)
    setCaraLista(false)
    setPhase(motivo === 'error' ? 'idle' : 'ended')
    if (texto) setAviso(texto)
  }, [])

  useEffect(() => () => void cerrar('fin'), [cerrar])

  const arrancar = useCallback(async () => {
    if (phase === 'connecting' || phase === 'active') return
    cerrandoRef.current = false
    setAviso(null)
    setLineas([])
    setPhase('connecting')

    try {
      const res = await fetch('/api/voice-demo/session', { method: 'POST' })
      if (!res.ok) {
        const cuerpo = (await res.json().catch(() => ({}))) as {
          error?: string
        }
        setPhase('idle')
        setAviso(cuerpo.error === 'rate_limited' ? t.voice.live.limit : t.voice.live.failed)
        return
      }
      const datos = (await res.json()) as VoiceSessionData
      setRestan(datos.maxSeconds)

      // Se importa el archivo real y no el índice del paquete: su index.js
      // pide './Client' con mayúscula y el archivo es 'client.js', así que
      // el build falla al resolverlo. Bug de simli-client 3.0.2.
      const { SimliClient } = await import('simli-client/dist/client')
      const cara = new SimliClient(
        datos.simliSessionToken,
        videoRef.current as HTMLVideoElement,
        audioRef.current as HTMLAudioElement,
        datos.iceServers,
      )
      await cara.start()
      caraRef.current = cara as unknown as typeof caraRef.current
      setCaraLista(true)

      const { Conversation } = await import('@elevenlabs/client')
      // Si el navegador no entrega micrófono, startSession se queda esperando
      // para siempre. Sin este corte la pantalla se congela en "Conectando".
      const conv = await Promise.race([
        Conversation.startSession({
          signedUrl: datos.signedUrl,
          onAudio: (b64: string) => {
            try {
              caraRef.current?.sendAudioData(base64ABytes(b64))
            } catch {}
          },
          onModeChange: ({ mode }: { mode: string }) => setHablando(mode === 'speaking'),
          onMessage: ({ message, source }: { message: string; source: string }) => {
            if (!message) return
            setLineas((prev) => [...prev, { who: source === 'user' ? 'user' : 'agent', text: message }])
          },
          onDisconnect: () => void cerrar('fin'),
          onError: () => void cerrar('error', t.voice.live.failed),
        }),
        new Promise<never>((_, rechazar) =>
          setTimeout(() => rechazar(Object.assign(new Error('timeout'), { name: 'NotFoundError' })), 20_000),
        ),
      ])
      // El sonido lo pone la cara, no la conversación: así van sincronizados.
      conv.setVolume({ volume: 0 })
      convRef.current = conv as unknown as typeof convRef.current

      setPhase('active')
      const limite = Date.now() + datos.maxSeconds * 1000
      tickRef.current = setInterval(() => {
        const quedan = Math.ceil((limite - Date.now()) / 1000)
        setRestan(Math.max(0, quedan))
        if (quedan <= 0) void cerrar('fin')
      }, 250)
    } catch (err) {
      const e = err as { name?: string }
      const negado = e?.name === 'NotAllowedError'
      const sinSoporte = e?.name === 'NotFoundError' || e?.name === 'NotSupportedError'
      await cerrar(
        'error',
        negado ? t.voice.live.micDenied : sinSoporte ? t.voice.live.micUnsupported : t.voice.live.failed,
      )
    }
  }, [phase, cerrar, t])

  const enCurso = phase === 'active' || phase === 'connecting'
  const estado =
    phase === 'connecting'
      ? t.voice.live.connecting
      : phase === 'active'
        ? hablando
          ? t.voice.live.speaking
          : t.voice.live.listening
        : phase === 'ended'
          ? t.voice.live.ended
          : t.voice.live.start

  return (
    <section id="demo" className="relative overflow-hidden py-24 sm:py-32">
      <div className="aurora-blob aurora-1 opacity-50" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <AnimatedContent className="mx-auto max-w-2xl text-center">
          <Eyebrow>{t.voice.label}</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
            {t.voice.title}
          </h2>
          <p className="mt-4 text-muted sm:text-lg">{t.voice.live.sub}</p>
        </AnimatedContent>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
          <AnimatedContent className="flex flex-col items-center gap-6">
            <div className="relative flex h-56 w-56 items-center justify-center sm:h-64 sm:w-64">
              <span
                className={`absolute inset-0 rounded-full ${enCurso ? 'animate-spin-slow' : ''}`}
                style={{
                  background: 'conic-gradient(from 0deg, #22D3EE, #8B5CF6, #E879F9, #22D3EE)',
                  opacity: caraLista ? 1 : 0,
                }}
              />
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className={`absolute inset-[4px] h-[calc(100%-8px)] w-[calc(100%-8px)] rounded-full object-cover transition-opacity duration-500 ${
                  caraLista ? 'opacity-100' : 'opacity-0'
                }`}
              />
              <audio ref={audioRef} autoPlay className="hidden" />
              {!caraLista && (
                <div className="absolute inset-0">
                  <Orb phase={phase} onClick={() => void arrancar()} label={estado} />
                </div>
              )}
            </div>

            <div className="flex items-center gap-2.5 text-sm text-muted">
              {phase === 'active' && (
                <span className="flex items-center gap-1.5 text-cyan">
                  <span
                    className="h-2 w-2 rounded-full bg-cyan"
                    style={{ animation: 'blink 1.2s ease-in-out infinite' }}
                  />
                  {formatClock(restan)}
                </span>
              )}
              <span>{estado}</span>
            </div>

            {phase === 'idle' && !aviso && (
              <p className="text-xs text-muted">{t.voice.live.hint.replace('{s}', String(maxSeconds))}</p>
            )}

            {phase === 'active' && (
              <button
                onClick={() => void cerrar('fin')}
                className="text-sm font-medium text-muted transition-colors hover:text-ink"
              >
                {t.voice.live.hangUp}
              </button>
            )}

            {phase === 'ended' && (
              <div className="flex flex-col items-center gap-3">
                <p className="text-center text-sm font-medium">{t.voice.live.endTitle}</p>
                <button
                  onClick={() => void arrancar()}
                  className="text-sm font-medium text-grad transition-opacity hover:opacity-80"
                >
                  {t.voice.live.again}
                </button>
              </div>
            )}

            {aviso && <p className="max-w-xs text-center text-sm text-muted">{aviso}</p>}
          </AnimatedContent>

          <AnimatedContent delay={0.15}>
            <div className="rounded-2xl border-grad glass p-6 sm:p-8">
              <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                <span className="flex items-center gap-2 text-sm font-medium">
                  <span
                    className={`h-2 w-2 rounded-full [background:var(--grad)] ${hablando ? 'animate-pulse' : ''}`}
                  />
                  Aria · MiAgentIA
                </span>
                <Icon name="phone" className="h-4 w-4 text-muted" />
              </div>

              <div ref={listRef} className="flex h-72 flex-col gap-3 overflow-y-auto pr-1">
                <AnimatePresence>
                  {lineas.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        line.who === 'agent'
                          ? 'self-start bg-white/[0.06] text-ink'
                          : 'self-end [background:linear-gradient(120deg,rgba(34,211,238,0.18),rgba(232,121,249,0.18))] text-ink'
                      }`}
                    >
                      {line.text}
                    </motion.div>
                  ))}
                </AnimatePresence>
                {lineas.length === 0 && (
                  <p className="m-auto text-center text-sm text-muted">
                    {phase === 'connecting' ? t.voice.live.connecting : t.voice.live.greet}
                  </p>
                )}
              </div>

              <p className="mt-4 border-t border-white/10 pt-3 text-[11px] text-muted">
                {t.voice.live.caption}
              </p>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </section>
  )
}
