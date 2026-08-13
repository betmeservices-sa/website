'use client'

// Demo de voz VISUAL (sin APIs): orbe con anillos pulsantes + ecualizador
// y transcripción scripteada que se revela con tiempos de conversación real.
// Es lo que ve el visitante mientras el agente real no está encendido.
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import AnimatedContent from '@/components/reactbits/AnimatedContent'
import Icon from '@/components/ui/Icon'
import Orb, { type OrbPhase } from './Orb'

export default function ScriptedVoiceDemo() {
  const { t } = useI18n()
  const [phase, setPhase] = useState<OrbPhase>('idle')
  const [visible, setVisible] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const listRef = useRef<HTMLDivElement>(null)

  const clear = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  const start = () => {
    clear()
    setPhase('active')
    setVisible(0)
    setSeconds(0)
    // Revela cada línea con cadencia de conversación
    t.voice.transcript.forEach((_, i) => {
      timers.current.push(setTimeout(() => setVisible(i + 1), 900 + i * 2400))
    })
    timers.current.push(
      setTimeout(() => setPhase('ended'), 900 + t.voice.transcript.length * 2400 + 800),
    )
  }

  const onOrb = () => {
    if (phase === 'active') {
      clear()
      setPhase('ended')
    } else {
      start()
    }
  }

  // Cronómetro de llamada
  useEffect(() => {
    if (phase !== 'active') return
    const id = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [phase])

  // Autoscroll de la transcripción
  useEffect(() => {
    const el = listRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [visible])

  useEffect(() => clear, [])

  const mm = String(Math.floor(seconds / 60)).padStart(1, '0')
  const ss = String(seconds % 60).padStart(2, '0')
  const statusText = phase === 'idle' ? t.voice.idle : phase === 'active' ? t.voice.active : t.voice.ended

  return (
    <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
      {/* Orbe */}
      <AnimatedContent className="flex flex-col items-center gap-6">
        <Orb phase={phase} onClick={onOrb} label={statusText} />
        <div className="flex items-center gap-2.5 text-sm text-muted">
          {phase === 'active' && (
            <span className="flex items-center gap-1.5 text-cyan">
              <span className="h-2 w-2 rounded-full bg-cyan" style={{ animation: 'blink 1.2s ease-in-out infinite' }} />
              {mm}:{ss}
            </span>
          )}
          <span>{statusText}</span>
        </div>
        {phase === 'ended' && (
          <button onClick={start} className="text-sm font-medium text-grad transition-opacity hover:opacity-80">
            {t.voice.restart}
          </button>
        )}
      </AnimatedContent>

      {/* Transcripción */}
      <AnimatedContent delay={0.15}>
        <div className="rounded-2xl border-grad glass p-6 sm:p-8">
          <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
            <span className="flex items-center gap-2 text-sm font-medium">
              <span className="h-2 w-2 rounded-full [background:var(--grad)]" />
              Aria · MiAgentIA
            </span>
            <Icon name="phone" className="h-4 w-4 text-muted" />
          </div>

          <div ref={listRef} className="flex h-72 flex-col gap-3 overflow-y-auto pr-1">
            <AnimatePresence>
              {t.voice.transcript.slice(0, visible).map((line, i) => (
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
            {phase === 'idle' && (
              <p className="m-auto text-center text-sm text-muted">{t.voice.idle} ☝️</p>
            )}
          </div>

          <p className="mt-4 border-t border-white/10 pt-3 text-[11px] text-muted">{t.voice.caption}</p>
        </div>
      </AnimatedContent>
    </div>
  )
}
