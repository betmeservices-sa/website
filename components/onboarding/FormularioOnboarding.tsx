'use client'

// Formulario de onboarding, genérico.
//
// Las preguntas vienen por props desde cada ruta (ver preguntas-yali.ts), igual
// que en las páginas legales y en "Cómo funciona". Sumar un cliente es un
// archivo de preguntas, no una copia de esta pantalla.
//
// Es una página de React y no un HTML suelto por dos razones: hereda las
// fuentes y el tema del sitio sin volver a declararlos, y el envío llega a algún
// lado. El sitio no tiene backend, así que escribe en el panel del demo, que es
// donde ya vive todo lo del cliente.

import { useCallback, useEffect, useMemo, useState } from 'react'
import type { BloqueOnboarding, Pregunta } from './preguntas-yali'

// El sitio no tiene API propia: el panel del demo recibe y guarda.
const DESTINO = 'https://demo.miagentia.com/api/onboarding'

type Estado = 'quieto' | 'enviando' | 'enviado' | 'error'

export default function FormularioOnboarding({
  cliente,
  titulo,
  tituloGrad,
  bajada,
  urgente,
  bloques,
}: {
  cliente: string
  titulo: string
  tituloGrad: string
  bajada: string
  urgente?: string
  bloques: BloqueOnboarding[]
}) {
  const llave = `onboarding.${cliente}`
  const [valores, setValores] = useState<Record<string, string>>({})
  const [marcadas, setMarcadas] = useState<Record<string, string[]>>({})
  const [estado, setEstado] = useState<Estado>('quieto')
  const [error, setError] = useState<string | null>(null)
  const [guardado, setGuardado] = useState(false)

  const preguntas = useMemo(
    () => bloques.flatMap((b) => [...(b.preguntas ?? []), ...(b.cierre ?? [])]),
    [bloques],
  )

  // El formulario es largo y nadie lo llena de una sentada. Sin esto, cerrar la
  // pestaña por accidente borra media hora de trabajo.
  useEffect(() => {
    try {
      const g = JSON.parse(localStorage.getItem(llave) || '{}')
      if (g.valores) setValores(g.valores)
      if (g.marcadas) setMarcadas(g.marcadas)
    } catch {}
  }, [llave])

  useEffect(() => {
    if (!Object.keys(valores).length && !Object.keys(marcadas).length) return
    try {
      localStorage.setItem(llave, JSON.stringify({ valores, marcadas }))
    } catch {}
    setGuardado(true)
    const t = setTimeout(() => setGuardado(false), 1600)
    return () => clearTimeout(t)
  }, [valores, marcadas, llave])

  const hechos = preguntas.filter((p) => (valores[p.id] ?? '').trim()).length
  const pct = preguntas.length ? Math.round((hechos / preguntas.length) * 100) : 0

  const enviar = useCallback(async () => {
    setEstado('enviando')
    setError(null)

    // Se manda la etiqueta de cada pregunta y no su id: quien lo lee del otro
    // lado necesita entenderlo sin abrir el código.
    const respuestas: Record<string, string | string[]> = {}
    for (const p of preguntas) {
      const v = (valores[p.id] ?? '').trim()
      // La clave de Cloudbeds no viaja: se pide por otro canal.
      if (v) respuestas[p.label] = p.tipo === 'clave' ? '(la envían aparte)' : v
    }
    for (const [titulo, lista] of Object.entries(marcadas)) {
      if (lista.length) respuestas[titulo] = lista
    }

    try {
      const r = await fetch(DESTINO, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ cliente, respuestas, pendientes: preguntas.length - hechos }),
      })
      const j = await r.json()
      if (!j.ok) throw new Error(j.error || 'No se pudo enviar.')
      setEstado('enviado')
    } catch (e) {
      // Nunca se pierde lo escrito: si el envío falla, el resumen queda a mano
      // para copiarlo y mandarlo por WhatsApp.
      setEstado('error')
      setError(e instanceof Error ? e.message : 'No se pudo enviar.')
    }
  }, [cliente, hechos, marcadas, preguntas, valores])

  const resumen = useMemo(() => {
    const hoy = new Date().toLocaleDateString('es-SV', { day: 'numeric', month: 'long', year: 'numeric' })
    let t = `ONBOARDING ${tituloGrad.toUpperCase()}\n${hoy}\n${'='.repeat(48)}\n`
    for (const p of preguntas) {
      const v = (valores[p.id] ?? '').trim()
      if (v) t += `\n${p.label.toUpperCase()}\n${p.tipo === 'clave' ? '(la envían aparte)' : v}\n`
    }
    for (const [k, lista] of Object.entries(marcadas)) {
      if (lista.length) t += `\n${k.toUpperCase()}\n` + lista.map((x) => `  - ${x}`).join('\n') + '\n'
    }
    return t
  }, [preguntas, valores, marcadas, tituloGrad])

  if (estado === 'enviado') {
    return (
      <main className="relative mx-auto min-h-screen max-w-2xl px-5 py-32 text-center sm:px-8">
        <div className="aurora-blob aurora-1 opacity-40" />
        <h1 className="relative font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Recibido. <span className="text-grad">Gracias</span>
        </h1>
        <p className="relative mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-muted">
          Ya nos llegó. Si algo quedó pendiente lo vemos con ustedes; con los accesos de Cloudbeds y
          de Meta arrancamos.
        </p>
      </main>
    )
  }

  return (
    <main className="relative">
      <div className="aurora-blob aurora-1 opacity-40" />
      <div className="aurora-blob aurora-2 opacity-30" />
      <div className="absolute inset-0 tech-grid" />

      <div className="relative mx-auto max-w-3xl px-5 pb-40 pt-28 sm:px-8 sm:pt-36">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-soft">
          MiAgentIA · puesta en marcha
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold leading-[1.06] tracking-tight text-ink sm:text-5xl">
          {titulo} <span className="text-grad">{tituloGrad}</span>
        </h1>
        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base">{bajada}</p>

        {urgente && (
          <p className="mt-8 flex gap-3 rounded-2xl border border-white/[0.08] bg-bg-card p-4 text-[14px] leading-relaxed text-muted">
            <span className="w-1 shrink-0 rounded-full [background:var(--grad)]" />
            <span>{urgente}</span>
          </p>
        )}

        <div className="mt-10 space-y-6">
          {bloques.map((b, i) => (
            <section
              key={b.id}
              className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-bg-card p-5 sm:p-7"
            >
              <span className="absolute inset-x-0 top-0 h-px opacity-60 [background:var(--grad)]" />
              <p className="font-display text-[12px] tracking-[0.14em] text-muted">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h2 className="mt-1.5 font-display text-2xl font-semibold tracking-tight text-ink">{b.titulo}</h2>
              <p className="mt-2.5 max-w-[64ch] text-[14px] leading-relaxed text-muted">{b.porque}</p>

              {b.aviso && (
                <p className="mt-4 flex gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-3.5 text-[13.5px] leading-relaxed text-muted">
                  <span className="w-1 shrink-0 rounded-full [background:var(--grad)]" />
                  <span>{b.aviso}</span>
                </p>
              )}

              <Campos preguntas={b.preguntas ?? []} valores={valores} setValores={setValores} />

              {(b.casillas ?? []).map((c) => (
                <fieldset
                  key={c.titulo}
                  className="mt-5 rounded-2xl border border-white/[0.08] bg-white/[0.014] px-4 py-3.5"
                >
                  <legend className="px-2 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-cyan-soft">
                    {c.titulo}
                  </legend>
                  {c.pista && <p className="mb-2.5 text-[12.5px] leading-relaxed text-muted">{c.pista}</p>}
                  <div className="flex flex-col gap-2.5">
                    {c.opciones.map((o) => {
                      const puesto = (marcadas[c.titulo] ?? []).includes(o)
                      return (
                        <label key={o} className="flex items-start gap-2.5 text-[14px] text-ink">
                          <input
                            type="checkbox"
                            checked={puesto}
                            onChange={(e) =>
                              setMarcadas((m) => {
                                const previas = m[c.titulo] ?? []
                                return {
                                  ...m,
                                  [c.titulo]: e.target.checked
                                    ? [...previas, o]
                                    : previas.filter((x) => x !== o),
                                }
                              })
                            }
                            className="mt-1 h-[15px] w-[15px] shrink-0 accent-violet"
                          />
                          {o}
                        </label>
                      )
                    })}
                  </div>
                </fieldset>
              ))}

              <Campos preguntas={b.cierre ?? []} valores={valores} setValores={setValores} />

              {b.nota && (
                <p className="mt-5 flex gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-3.5 text-[13.5px] leading-relaxed text-muted">
                  <span className="w-1 shrink-0 rounded-full [background:var(--grad)]" />
                  <span>{b.nota}</span>
                </p>
              )}
            </section>
          ))}
        </div>

        {estado === 'error' && (
          <div className="mt-6 rounded-2xl border border-white/[0.08] bg-bg-card p-5">
            <p className="text-[14px] font-semibold text-ink">No se pudo enviar: {error}</p>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">
              Nada se perdió. Copien esto y mándenlo por WhatsApp, que es igual de válido.
            </p>
            <pre className="mt-3 max-h-72 overflow-auto whitespace-pre-wrap rounded-xl border border-white/[0.08] bg-bg-soft p-4 text-[12.5px] leading-relaxed text-ink">
              {resumen}
            </pre>
            <button
              type="button"
              onClick={() => navigator.clipboard?.writeText(resumen)}
              className="mt-3 rounded-xl border border-white/20 px-4 py-2 text-[13.5px] font-semibold text-ink"
            >
              Copiar todo
            </button>
          </div>
        )}
      </div>

      <div className="sticky bottom-0 z-10 border-t border-white/[0.08] bg-[rgba(10,10,20,0.9)] px-5 py-3.5 backdrop-blur-md sm:px-8">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-4">
          <div className="min-w-[140px] flex-1">
            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full transition-[width] duration-300 [background:var(--grad)]" style={{ width: `${pct}%` }} />
            </div>
            <p className="mt-1.5 text-[12px] text-muted">
              {hechos} de {preguntas.length} respondidas
            </p>
          </div>
          {guardado && <span className="text-[12px] text-cyan-soft">guardado</span>}
          <button
            type="button"
            onClick={enviar}
            disabled={estado === 'enviando' || hechos === 0}
            className="rounded-xl px-5 py-2.5 font-display text-[14px] font-semibold text-[#06060C] disabled:opacity-50 [background:var(--grad)]"
          >
            {estado === 'enviando' ? 'Enviando' : 'Enviar'}
          </button>
        </div>
      </div>
    </main>
  )
}

function Campos({
  preguntas,
  valores,
  setValores,
}: {
  preguntas: Pregunta[]
  valores: Record<string, string>
  setValores: React.Dispatch<React.SetStateAction<Record<string, string>>>
}) {
  if (!preguntas.length) return null
  const base =
    'w-full rounded-xl border border-white/[0.08] bg-bg-soft px-3 py-2.5 text-[14px] text-ink placeholder:text-[#5C5C70] outline-none transition focus-visible:border-cyan focus-visible:ring-2 focus-visible:ring-cyan/25'

  return (
    <div className="mt-5 grid gap-4 sm:grid-cols-2">
      {preguntas.map((p) => (
        <div key={p.id} className={p.medio ? '' : 'sm:col-span-2'}>
          <label htmlFor={p.id} className="block text-[13.5px] font-semibold text-ink">
            {p.label}
          </label>
          {p.pista && <p className="mt-1 text-[12.5px] leading-relaxed text-muted">{p.pista}</p>}
          <div className="mt-1.5">
            {p.tipo === 'area' ? (
              <textarea
                id={p.id}
                rows={p.filas ?? 3}
                value={valores[p.id] ?? ''}
                onChange={(e) => setValores((v) => ({ ...v, [p.id]: e.target.value }))}
                className={`${base} resize-y leading-relaxed`}
              />
            ) : p.tipo === 'select' ? (
              <select
                id={p.id}
                value={valores[p.id] ?? ''}
                onChange={(e) => setValores((v) => ({ ...v, [p.id]: e.target.value }))}
                className={base}
              >
                <option value="">Elegir</option>
                {(p.opciones ?? []).map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={p.id}
                type={p.tipo === 'clave' ? 'password' : p.tipo === 'url' ? 'url' : p.tipo === 'tel' ? 'tel' : 'text'}
                value={valores[p.id] ?? ''}
                onChange={(e) => setValores((v) => ({ ...v, [p.id]: e.target.value }))}
                className={base}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
