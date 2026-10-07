'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Lead } from '@/lib/leads'

// Lista de leads para el equipo, pensada para verse en el teléfono durante la
// conferencia: se refresca sola cada 30 segundos y al volver a la pestaña,
// cada tarjeta tiene el teléfono, WhatsApp y correo como enlaces, y el CSV se
// arma en el navegador con lo que hay en pantalla.

const ZONA = 'America/El_Salvador'
const CADA_MS = 30_000

const fmtHora = new Intl.DateTimeFormat('es-SV', { timeZone: ZONA, hour: 'numeric', minute: '2-digit', hour12: true })
const fmtDia = new Intl.DateTimeFormat('es-SV', { timeZone: ZONA, day: 'numeric', month: 'short' })
const fmtDiaClave = new Intl.DateTimeFormat('en-CA', { timeZone: ZONA, year: 'numeric', month: '2-digit', day: '2-digit' })
const fmtCsv = new Intl.DateTimeFormat('es-SV', {
  timeZone: ZONA,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

const TIPO: Record<Lead['tipo'], string> = { datos: 'Dejó sus datos', 'llamada-demo': 'Pidió llamada demo' }

function diaSV(iso: string) {
  return fmtDiaClave.format(new Date(iso))
}

function cuando(iso: string, hoy: string) {
  const d = new Date(iso)
  return diaSV(iso) === hoy ? `Hoy ${fmtHora.format(d)}` : `${fmtDia.format(d)} ${fmtHora.format(d)}`
}

function digitos(t: string | null | undefined) {
  return (t ?? '').replace(/\D/g, '')
}

function celdaCsv(v: unknown) {
  const s = v == null ? '' : typeof v === 'object' ? JSON.stringify(v) : String(v)
  return `"${s.replace(/"/g, '""')}"`
}

export default function PanelLeads({
  inicial,
  errorInicial,
  hoyInicial,
}: {
  inicial: Lead[]
  errorInicial: boolean
  hoyInicial: string
}) {
  const [leads, setLeads] = useState(inicial)
  const [error, setError] = useState(errorInicial)
  const [hoy, setHoy] = useState(hoyInicial)
  const [actualizado, setActualizado] = useState<string | null>(null)
  const [asesora, setAsesora] = useState('todas')
  const [tipo, setTipo] = useState('todos')
  const [busca, setBusca] = useState('')

  const recargar = useCallback(async () => {
    try {
      const r = await fetch('/api/leads', { cache: 'no-store' })
      if (r.status === 401) {
        location.reload()
        return
      }
      if (!r.ok) throw new Error(String(r.status))
      const d = (await r.json()) as { leads: Lead[] }
      setLeads(d.leads)
      setError(false)
      const ahora = new Date()
      setHoy(fmtDiaClave.format(ahora))
      setActualizado(fmtHora.format(ahora))
    } catch {
      setError(true)
    }
  }, [])

  useEffect(() => {
    const t = setInterval(recargar, CADA_MS)
    const alVolver = () => {
      if (!document.hidden) recargar()
    }
    document.addEventListener('visibilitychange', alVolver)
    return () => {
      clearInterval(t)
      document.removeEventListener('visibilitychange', alVolver)
    }
  }, [recargar])

  const asesoras = useMemo(
    () => Array.from(new Set(leads.map((l) => l.asesora).filter((a): a is string => Boolean(a)))).sort(),
    [leads],
  )

  const visibles = useMemo(() => {
    const q = busca.trim().toLowerCase()
    return leads.filter((l) => {
      if (asesora !== 'todas' && l.asesora !== asesora) return false
      if (tipo !== 'todos' && l.tipo !== tipo) return false
      if (!q) return true
      return [l.nombre, l.empresa, l.cargo, l.telefono, l.correo, l.interes, l.mensaje]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(q)
    })
  }, [leads, asesora, tipo, busca])

  const deHoy = useMemo(() => leads.filter((l) => diaSV(l.creado_en) === hoy).length, [leads, hoy])

  function exportarCsv() {
    const cab = ['fecha_sv', 'tipo', 'asesora', 'nombre', 'empresa', 'cargo', 'telefono', 'correo', 'interes', 'mensaje', 'landing', 'origen', 'utm']
    const filas = visibles.map((l) =>
      [
        fmtCsv.format(new Date(l.creado_en)),
        TIPO[l.tipo],
        l.asesora,
        l.nombre,
        l.empresa,
        l.cargo,
        l.telefono,
        l.correo,
        l.interes,
        l.mensaje,
        l.landing,
        l.origen,
        l.utm,
      ]
        .map(celdaCsv)
        .join(','),
    )
    const csv = '﻿' + [cab.join(','), ...filas].join('\r\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    const a = document.createElement('a')
    a.href = url
    a.download = `leads-miagentia-${hoy}.csv`
    document.body.appendChild(a)
    a.click()
    a.remove()
    setTimeout(() => URL.revokeObjectURL(url), 4000)
  }

  const campo =
    'rounded-xl border border-line bg-bg-card px-3 py-2.5 text-[15px] text-ink outline-none focus:border-cyan'

  return (
    <main className="min-h-screen bg-bg px-4 pb-16 pt-6 text-ink">
      <div className="mx-auto max-w-3xl">
        <header className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight">Leads de conferencia</h1>
            <p className="mt-1 text-sm text-muted">
              Lo que dejan en /sandra y /andrea.
              {actualizado ? ` Actualizado ${actualizado}.` : ''}
            </p>
          </div>
          <form method="post" action="/api/leads/salir">
            <button type="submit" className="rounded-lg border border-line px-3 py-1.5 text-xs text-muted hover:text-ink">
              Salir
            </button>
          </form>
        </header>

        <section className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Cifra etiqueta="Total" valor={leads.length} />
          <Cifra etiqueta="Hoy" valor={deHoy} destacada />
          {asesoras.slice(0, 2).map((a) => (
            <Cifra key={a} etiqueta={a} valor={leads.filter((l) => l.asesora === a).length} />
          ))}
        </section>

        <section className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-[1fr_1fr_2fr_auto]">
          <select value={asesora} onChange={(e) => setAsesora(e.target.value)} className={campo} aria-label="Asesora">
            <option value="todas">Todas</option>
            {asesoras.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
          <select value={tipo} onChange={(e) => setTipo(e.target.value)} className={campo} aria-label="Tipo">
            <option value="todos">Todo</option>
            <option value="datos">Dejaron datos</option>
            <option value="llamada-demo">Llamada demo</option>
          </select>
          <input
            type="search"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar nombre, empresa, teléfono…"
            className={`${campo} col-span-2 sm:col-span-1`}
          />
          <button
            type="button"
            onClick={exportarCsv}
            disabled={!visibles.length}
            className="col-span-2 rounded-xl border border-cyan/40 px-4 py-2.5 text-sm font-medium text-cyan-soft disabled:opacity-40 sm:col-span-1"
          >
            Exportar CSV
          </button>
        </section>

        {error && (
          <p className="mt-5 rounded-xl border border-magenta/30 bg-magenta/10 px-4 py-3 text-sm text-magenta">
            No se pudo leer la base. Se muestra lo último que cargó; se reintenta solo.
          </p>
        )}

        <ul className="mt-5 space-y-3">
          {visibles.map((l) => (
            <li key={l.id} className="rounded-2xl border border-line bg-bg-card p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-[17px] font-semibold">{l.nombre}</p>
                  {(l.empresa || l.cargo) && (
                    <p className="mt-0.5 truncate text-sm text-muted">{[l.empresa, l.cargo].filter(Boolean).join(' · ')}</p>
                  )}
                </div>
                <time dateTime={l.creado_en} className="shrink-0 text-xs text-muted">
                  {cuando(l.creado_en, hoy)}
                </time>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5 text-[11.5px]">
                <span
                  className={
                    l.tipo === 'datos'
                      ? 'rounded-full bg-cyan/15 px-2.5 py-0.5 text-cyan-soft'
                      : 'rounded-full bg-violet/20 px-2.5 py-0.5 text-[#C4B5FD]'
                  }
                >
                  {TIPO[l.tipo]}
                </span>
                {l.asesora && <span className="rounded-full border border-line px-2.5 py-0.5 text-muted">{l.asesora}</span>}
                {l.interes && <span className="rounded-full border border-line px-2.5 py-0.5 text-muted">{l.interes}</span>}
              </div>

              {(l.telefono || l.correo) && (
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-sm">
                  {l.telefono && (
                    <>
                      <a href={`tel:${l.telefono}`} className="text-ink underline-offset-4 hover:underline">
                        {l.telefono}
                      </a>
                      <a
                        href={`https://wa.me/${digitos(l.telefono)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-soft underline-offset-4 hover:underline"
                      >
                        WhatsApp
                      </a>
                    </>
                  )}
                  {l.correo && (
                    <a href={`mailto:${l.correo}`} className="break-all text-ink underline-offset-4 hover:underline">
                      {l.correo}
                    </a>
                  )}
                </div>
              )}

              {l.mensaje && <p className="mt-3 text-sm leading-relaxed text-muted">{l.mensaje}</p>}
            </li>
          ))}
        </ul>

        {!visibles.length && !error && (
          <p className="mt-10 text-center text-sm text-muted">
            {leads.length ? 'Nada coincide con ese filtro.' : 'Todavía no hay leads. Esta pantalla se actualiza sola.'}
          </p>
        )}
      </div>
    </main>
  )
}

function Cifra({ etiqueta, valor, destacada = false }: { etiqueta: string; valor: number; destacada?: boolean }) {
  return (
    <div className={`rounded-2xl border p-4 ${destacada ? 'border-cyan/40 bg-cyan/10' : 'border-line bg-bg-card'}`}>
      <p className="text-xs text-muted">{etiqueta}</p>
      <p className={`mt-1 font-display text-2xl font-semibold ${destacada ? 'text-cyan-soft' : ''}`}>{valor}</p>
    </div>
  )
}
