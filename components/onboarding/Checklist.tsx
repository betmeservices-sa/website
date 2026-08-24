'use client'

// Checklist de puesta en marcha.
//
// Está pensado para recorrerse EN UNA LLAMADA, no para que alguien lo llene
// solo. Por eso cada punto dice quién lo hace y por qué hace falta: son las dos
// preguntas que salen cuando uno lee una lista de pendientes ajena.
//
// No pide credenciales en ningún campo, a propósito. Los accesos se entregan
// creando usuarios desde las cuentas del cliente, no escribiendo una clave en
// una página web.

import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Decision, Grupo, Quien, Tarea } from './checklist-yali'

const DESTINO = 'https://demo.miagentia.com/api/onboarding'

const QUIEN: Record<Quien, { texto: string; clase: string }> = {
  ellos: { texto: 'Lo hacen ustedes', clase: 'text-cyan-soft' },
  nosotros: { texto: 'Lo hacemos nosotros', clase: 'text-muted' },
  juntos: { texto: 'Lo definimos juntos', clase: 'text-muted' },
}

type Estado = 'quieto' | 'enviando' | 'enviado' | 'error'

/**
 * Cuántas filas necesita un texto que ya viene escrito.
 *
 * Las respuestas vienen prellenadas desde la llamada, así que una caja de tres
 * filas obligaría a leer un párrafo largo por una rendija. Cuenta los saltos de
 * línea propios y estima los que va a provocar el ancho.
 */
function alto(texto: string, columnas: number, minimo: number, maximo: number): number {
  const saltos = texto.split('\n').length - 1
  return Math.min(maximo, Math.max(minimo, saltos + Math.ceil(texto.length / columnas)))
}

export default function Checklist({
  cliente,
  titulo,
  tituloGrad,
  bajada,
  grupos,
}: {
  cliente: string
  titulo: string
  tituloGrad: string
  bajada: string
  grupos: Grupo[]
}) {
  const llave = `checklist.${cliente}`

  // Arranca con lo que ya se contestó en la llamada. El cliente no llena esto
  // desde cero: revisa y corrige, que es lo que se le prometió. Lo que quedó
  // sin respuesta se queda vacío, para que se vea que falta.
  const previo = useMemo(() => {
    const h: Record<string, boolean> = {}
    const n: Record<string, string> = {}
    for (const g of grupos) {
      for (const t of g.tareas ?? []) {
        if (t.hecho) h[t.id] = true
        if (t.respuesta) n[t.id] = t.respuesta
      }
      for (const d of g.decisiones ?? []) {
        if (d.respuesta) n[d.id] = d.respuesta
      }
    }
    return { hechas: h, notas: n }
  }, [grupos])

  const [hechas, setHechas] = useState<Record<string, boolean>>(previo.hechas)
  const [notas, setNotas] = useState<Record<string, string>>(previo.notas)
  const [estado, setEstado] = useState<Estado>('quieto')
  const [error, setError] = useState<string | null>(null)

  const tareas = useMemo(() => grupos.flatMap((g) => g.tareas ?? []), [grupos])
  const decisiones = useMemo(() => grupos.flatMap((g) => g.decisiones ?? []), [grupos])

  // Se recorre en varias sesiones: nadie cierra un onboarding de una sentada.
  useEffect(() => {
    try {
      const g = JSON.parse(localStorage.getItem(llave) || '{}')
      // Lo guardado pisa al prellenado, nunca al revés: si alguien ya corrigió
      // una respuesta, no se la volvemos a cambiar por la nuestra.
      if (g.hechas) setHechas((h) => ({ ...h, ...g.hechas }))
      if (g.notas) setNotas((n) => ({ ...n, ...g.notas }))
    } catch {}
  }, [llave])

  useEffect(() => {
    if (!Object.keys(hechas).length && !Object.keys(notas).length) return
    try {
      localStorage.setItem(llave, JSON.stringify({ hechas, notas }))
    } catch {}
  }, [hechas, notas, llave])

  const listas = tareas.filter((t) => hechas[t.id]).length
  const pct = tareas.length ? Math.round((listas / tareas.length) * 100) : 0

  const resumen = useMemo(() => {
    const hoy = new Date().toLocaleDateString('es-SV', { day: 'numeric', month: 'long', year: 'numeric' })
    let t = `PUESTA EN MARCHA ${tituloGrad.toUpperCase()}\n${hoy}\n${'='.repeat(48)}\n`
    for (const g of grupos) {
      t += `\n${g.titulo.toUpperCase()}\n`
      for (const x of g.tareas ?? []) {
        t += `  [${hechas[x.id] ? 'x' : ' '}] ${x.titulo}\n`
        const n = (notas[x.id] ?? '').trim()
        if (n) t += `      ${n}\n`
      }
      for (const d of g.decisiones ?? []) {
        const v = (notas[d.id] ?? '').trim()
        if (v) t += `  ${d.pregunta}\n      ${v}\n`
      }
    }
    return t
  }, [grupos, hechas, notas, tituloGrad])

  const enviar = useCallback(async () => {
    setEstado('enviando')
    setError(null)
    const respuestas: Record<string, string | string[]> = {}
    for (const g of grupos) {
      for (const x of g.tareas ?? []) {
        const n = (notas[x.id] ?? '').trim()
        respuestas[x.titulo] = hechas[x.id] ? (n ? `LISTO · ${n}` : 'LISTO') : n ? `pendiente · ${n}` : 'pendiente'
      }
      for (const d of g.decisiones ?? []) {
        const v = (notas[d.id] ?? '').trim()
        if (v) respuestas[d.pregunta] = v
      }
    }
    try {
      const r = await fetch(DESTINO, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ cliente, respuestas, pendientes: tareas.length - listas }),
      })
      const j = await r.json()
      if (!j.ok) throw new Error(j.error || 'No se pudo enviar.')
      setEstado('enviado')
    } catch (e) {
      // Nada se pierde: si falla, queda el resumen para mandarlo por WhatsApp.
      setEstado('error')
      setError(e instanceof Error ? e.message : 'No se pudo enviar.')
    }
  }, [cliente, grupos, hechas, listas, notas, tareas.length])

  if (estado === 'enviado') {
    return (
      <main className="relative mx-auto min-h-screen max-w-2xl px-5 py-32 text-center sm:px-8">
        <div className="aurora-blob aurora-1 opacity-40" />
        <h1 className="relative font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Recibido. <span className="text-grad">Gracias</span>
        </h1>
        <p className="relative mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-muted">
          Ya nos llegó el avance. Con los accesos de Cloudbeds y de Meta arrancamos; lo que quede
          pendiente lo vemos con ustedes.
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

        <div className="mt-10 space-y-6">
          {grupos.map((g) => (
            <section
              key={g.id}
              className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-bg-card p-5 sm:p-7"
            >
              <span className="absolute inset-x-0 top-0 h-px opacity-60 [background:var(--grad)]" />
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">{g.titulo}</h2>
                {g.urgente && (
                  <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-cyan-soft">
                    Primero esto
                  </span>
                )}
              </div>
              <p className="mt-2.5 max-w-[64ch] text-[14px] leading-relaxed text-muted">{g.intro}</p>

              {(g.tareas ?? []).length > 0 && (
                <ul className="mt-6 space-y-3">
                  {(g.tareas ?? []).map((t) => (
                    <li key={t.id}>
                      <Punto
                        t={t}
                        hecha={!!hechas[t.id]}
                        nota={notas[t.id] ?? ''}
                        onHecha={(v) => setHechas((h) => ({ ...h, [t.id]: v }))}
                        onNota={(v) => setNotas((n) => ({ ...n, [t.id]: v }))}
                      />
                    </li>
                  ))}
                </ul>
              )}

              {(g.decisiones ?? []).length > 0 && (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {(g.decisiones ?? []).map((d) => (
                    <Pregunta
                      key={d.id}
                      d={d}
                      valor={notas[d.id] ?? ''}
                      onCambio={(v) => setNotas((n) => ({ ...n, [d.id]: v }))}
                    />
                  ))}
                </div>
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
              <div
                className="h-full rounded-full transition-[width] duration-300 [background:var(--grad)]"
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="mt-1.5 text-[12px] text-muted">
              {listas} de {tareas.length} accesos listos
              {decisiones.length > 0 && ` · ${decisiones.filter((d) => (notas[d.id] ?? '').trim()).length} de ${decisiones.length} decisiones`}
            </p>
          </div>
          <button
            type="button"
            onClick={enviar}
            disabled={estado === 'enviando'}
            className="rounded-xl px-5 py-2.5 font-display text-[14px] font-semibold text-[#06060C] disabled:opacity-50 [background:var(--grad)]"
          >
            {estado === 'enviando' ? 'Enviando' : 'Mandarnos el avance'}
          </button>
        </div>
      </div>
    </main>
  )
}

function Punto({
  t,
  hecha,
  nota,
  onHecha,
  onNota,
}: {
  t: Tarea
  hecha: boolean
  nota: string
  onHecha: (v: boolean) => void
  onNota: (v: string) => void
}) {
  const q = QUIEN[t.quien]
  return (
    <div
      className={`rounded-2xl border p-4 transition ${
        hecha ? 'border-white/[0.06] bg-white/[0.015]' : 'border-white/[0.08] bg-white/[0.025]'
      }`}
    >
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={hecha}
          onChange={(e) => onHecha(e.target.checked)}
          className="mt-1 h-[17px] w-[17px] shrink-0 accent-violet"
        />
        <span className="min-w-0 flex-1">
          <span className={`block font-display text-[15.5px] font-semibold ${hecha ? 'text-muted line-through' : 'text-ink'}`}>
            {t.titulo}
          </span>
          <span className={`mt-0.5 block text-[11.5px] font-semibold uppercase tracking-wide ${q.clase}`}>
            {q.texto}
          </span>
        </span>
      </label>

      <p className="mt-2.5 pl-[29px] text-[13.5px] leading-relaxed text-muted">{t.porque}</p>

      {t.pasos && (
        <ol className="mt-3 space-y-1.5 pl-[29px]">
          {t.pasos.map((p, i) => (
            <li key={p} className="flex gap-2.5 text-[13.5px] leading-relaxed text-muted">
              <span className="font-display text-[12px] text-cyan-soft">{i + 1}</span>
              <span>{p}</span>
            </li>
          ))}
        </ol>
      )}

      {(t.nota || nota) && (
        <div className="mt-3 pl-[29px]">
          <label className="block text-[12.5px] text-muted">{t.nota ?? 'Cómo quedó'}</label>
          <textarea
            value={nota}
            onChange={(e) => onNota(e.target.value)}
            rows={alto(nota, 78, 1, 6)}
            className="mt-1.5 w-full resize-y rounded-xl border border-white/[0.08] bg-bg-soft px-3 py-2 text-[13.5px] leading-relaxed text-ink outline-none transition focus-visible:border-cyan focus-visible:ring-2 focus-visible:ring-cyan/25"
          />
        </div>
      )}
    </div>
  )
}

function Pregunta({ d, valor, onCambio }: { d: Decision; valor: string; onCambio: (v: string) => void }) {
  const base =
    'w-full rounded-xl border border-white/[0.08] bg-bg-soft px-3 py-2.5 text-[14px] text-ink outline-none transition focus-visible:border-cyan focus-visible:ring-2 focus-visible:ring-cyan/25'
  return (
    <div className={d.abierta ? 'sm:col-span-2' : ''}>
      <label htmlFor={d.id} className="block text-[13.5px] font-semibold text-ink">
        {d.pregunta}
      </label>
      {d.pista && <p className="mt-1 text-[12.5px] leading-relaxed text-muted">{d.pista}</p>}
      <div className="mt-1.5">
        {d.opciones ? (
          <select id={d.id} value={valor} onChange={(e) => onCambio(e.target.value)} className={base}>
            <option value="">Elegir</option>
            {d.opciones.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        ) : d.abierta ? (
          <textarea
            id={d.id}
            rows={alto(valor, 90, d.filas ?? 3, 14)}
            value={valor}
            onChange={(e) => onCambio(e.target.value)}
            className={`${base} resize-y leading-relaxed`}
          />
        ) : (
          <input id={d.id} value={valor} onChange={(e) => onCambio(e.target.value)} className={base} />
        )}
      </div>
    </div>
  )
}
