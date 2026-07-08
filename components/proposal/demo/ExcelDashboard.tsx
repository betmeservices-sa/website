'use client'

// Demo funcional (datos simulados) del panel de Sofía para Excel Automotriz.
// Cuenta la historia de trazabilidad: bandeja omnicanal + memoria unificada
// por teléfono + Sofía calificando + transferencia al asesor sin perder el hilo.
import { useState } from 'react'
import Icon from '@/components/ui/Icon'
import {
  conversaciones,
  kpisDemo,
  canalInfoDemo,
  estadoInfoDemo,
  type Conversacion,
  type Mensaje,
} from './demoData'

function Burbuja({ m }: { m: Mensaje }) {
  if (m.de === 'sistema') {
    return (
      <div className="my-3 flex justify-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] text-muted">
          <Icon name="sparkle" className="h-3 w-3 text-violet" />
          {m.texto}
          <span className="text-muted/60">· {m.hora}</span>
        </span>
      </div>
    )
  }
  const propia = m.de === 'sofia' || m.de === 'asesor'
  const esSofia = m.de === 'sofia'
  return (
    <div className={`flex ${propia ? 'justify-end' : 'justify-start'}`}>
      <div className="max-w-[82%]">
        <div
          className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
            esSofia
              ? 'border border-cyan/25 bg-cyan/10 text-ink'
              : m.de === 'asesor'
                ? 'border border-magenta/25 bg-magenta/10 text-ink'
                : 'border border-white/10 bg-bg-card text-ink'
          }`}
        >
          {(esSofia || m.de === 'asesor') && (
            <span className={`mb-0.5 block text-[11px] font-semibold ${esSofia ? 'text-cyan' : 'text-magenta'}`}>
              {esSofia ? 'Sofía' : 'Asesor'}
            </span>
          )}
          {m.texto}
        </div>
        <span className={`mt-1 block text-[10px] text-muted ${propia ? 'text-right' : ''}`}>{m.hora}</span>
      </div>
    </div>
  )
}

function DatoLead({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-white/5 py-2.5 last:border-0">
      <span className="text-xs text-muted">{label}</span>
      <span className="text-right text-sm text-ink">{children}</span>
    </div>
  )
}

function LeadPanel({ c }: { c: Conversacion }) {
  const canal = canalInfoDemo[c.canal]
  const estado = estadoInfoDemo[c.estado]
  return (
    <div className="p-5">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full [background:var(--grad)] text-base font-semibold text-bg">
          {c.inicial}
        </span>
        <div>
          <p className="font-semibold text-ink">{c.nombre}</p>
          <p className="text-xs text-muted">{c.telefono}</p>
        </div>
      </div>

      <span className={`mt-4 inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${estado.className}`}>
        {estado.label}
      </span>

      {/* Trazabilidad: de dónde viene y su historial */}
      <div className="mt-5 rounded-xl border border-white/10 bg-bg-card p-4">
        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-cyan">
          <Icon name="filter" className="h-3.5 w-3.5" />Trazabilidad
        </p>
        <div className="mt-1">
          <DatoLead label="Canal de origen">
            <span className={`inline-flex items-center gap-1.5 ${canal.color}`}>
              <Icon name={canal.icon} className="h-4 w-4" />{canal.label}
            </span>
          </DatoLead>
          <DatoLead label="Campaña">{c.campana}</DatoLead>
          <DatoLead label="Historial unificado">{c.historial}</DatoLead>
        </div>
      </div>

      {/* Precalificación */}
      <div className="mt-3 rounded-xl border border-white/10 bg-bg-card p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">Precalificación</p>
        <div className="mt-1">
          <DatoLead label="Modelo de interés">{c.modelo}</DatoLead>
          <DatoLead label="Forma de pago">{c.formaPago}</DatoLead>
          <DatoLead label="Presupuesto">{c.presupuesto}</DatoLead>
          {c.proximaCita && <DatoLead label="Próxima cita">{c.proximaCita}</DatoLead>}
          {c.asesor && <DatoLead label="Asesor asignado">{c.asesor}</DatoLead>}
        </div>
      </div>
    </div>
  )
}

export default function ExcelDashboard() {
  const [activeId, setActiveId] = useState(conversaciones[0].id)
  const [mobileDetail, setMobileDetail] = useState(false)
  const active = conversaciones.find((c) => c.id === activeId) ?? conversaciones[0]

  return (
    <div className="flex h-full flex-col bg-bg text-ink">
      {/* Barra superior */}
      <header className="flex shrink-0 items-center gap-3 border-b border-white/10 px-4 py-3 pr-14 sm:px-6 sm:pr-16">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg [background:var(--grad)] text-sm font-bold text-bg">E</span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink">Excel Automotriz · Centro de Sofía</p>
          <p className="flex items-center gap-1.5 text-[11px] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />Sofía en línea
          </p>
        </div>
        <span className="ml-auto hidden rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-muted sm:inline">
          Demo · datos simulados
        </span>
      </header>

      {/* KPIs */}
      <div className="flex shrink-0 gap-2.5 overflow-x-auto border-b border-white/10 px-4 py-3 sm:px-6">
        {kpisDemo.map((k) => (
          <div key={k.label} className="min-w-[112px] shrink-0 rounded-xl border border-white/10 bg-bg-card px-3.5 py-2.5">
            <p className="font-display text-lg font-semibold text-ink">{k.valor}</p>
            <p className="text-[11px] leading-tight text-muted">{k.label}</p>
          </div>
        ))}
      </div>

      {/* Cuerpo: bandeja | conversación | lead */}
      <div className="grid min-h-0 flex-1 lg:grid-cols-[300px_1fr_320px]">
        {/* Bandeja unificada */}
        <aside className={`min-h-0 flex-col overflow-y-auto border-r border-white/10 ${mobileDetail ? 'hidden' : 'flex'} lg:flex`}>
          <p className="px-4 pt-4 pb-2 text-xs font-semibold uppercase tracking-wider text-muted">Bandeja unificada</p>
          {conversaciones.map((c) => {
            const canal = canalInfoDemo[c.canal]
            const estado = estadoInfoDemo[c.estado]
            const activa = c.id === activeId
            return (
              <button
                key={c.id}
                onClick={() => { setActiveId(c.id); setMobileDetail(true) }}
                className={`flex w-full items-start gap-3 border-b border-white/5 px-4 py-3 text-left transition-colors hover:bg-white/[0.03] ${activa ? 'bg-white/[0.05]' : ''}`}
              >
                <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full [background:var(--grad)] text-sm font-semibold text-bg">
                  {c.inicial}
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-bg">
                    <Icon name={canal.icon} className={`h-3 w-3 ${canal.color}`} />
                  </span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-medium text-ink">{c.nombre}</span>
                    <span className="shrink-0 text-[10px] text-muted">{c.hora}</span>
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-muted">{c.snippet}</span>
                  <span className={`mt-1.5 inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${estado.className}`}>
                    {estado.label}
                  </span>
                </span>
              </button>
            )
          })}
        </aside>

        {/* Conversación */}
        <section className={`min-h-0 flex-col ${mobileDetail ? 'flex' : 'hidden'} lg:flex`}>
          <div className="flex shrink-0 items-center gap-3 border-b border-white/10 px-4 py-3">
            <button
              onClick={() => setMobileDetail(false)}
              aria-label="Volver a la bandeja"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-muted hover:text-ink lg:hidden"
            >
              <Icon name="arrow" className="h-4 w-4 rotate-180" />
            </button>
            <span className="flex h-9 w-9 items-center justify-center rounded-full [background:var(--grad)] text-sm font-semibold text-bg">{active.inicial}</span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink">{active.nombre}</p>
              <p className="flex items-center gap-1.5 text-[11px] text-muted">
                <Icon name={canalInfoDemo[active.canal].icon} className={`h-3.5 w-3.5 ${canalInfoDemo[active.canal].color}`} />
                {canalInfoDemo[active.canal].label} · {active.telefono}
              </p>
            </div>
          </div>
          <div className="min-h-0 flex-1 space-y-2.5 overflow-y-auto bg-bg-soft/40 px-4 py-4">
            {active.hilo.map((m, i) => <Burbuja key={i} m={m} />)}
          </div>
        </section>

        {/* Lead / trazabilidad */}
        <aside className={`min-h-0 flex-col overflow-y-auto border-l border-white/10 ${mobileDetail ? 'flex' : 'hidden'} lg:flex`}>
          <LeadPanel c={active} />
        </aside>
      </div>
    </div>
  )
}
