'use client'

// Cierre del recorrido: la cita confirmada y, debajo, todo lo que quedó
// contratado. Es la pantalla que el cliente va a volver a abrir para
// recordar a qué hora era, así que la fecha manda y el resto acompaña.

import Link from 'next/link'
import Icon from '@/components/ui/Icon'
import { waLink } from '@/lib/site'
import { USOS, dinero, feeImplementacion, funcion, nombreObjetivo, plan } from './catalogo'
import { usePortal } from './estado'
import { bonito } from './Cita'

export default function Listo() {
  const { estado } = usePortal()
  const p = plan(estado.plan)
  const g = estado.guion
  const fee = feeImplementacion(estado.funciones, g.objetivos)
  const uso = USOS.find((u) => u.id === g.uso)?.nombre
  const objetivos = g.objetivos.map((id) => nombreObjetivo(id, g.objetivoOtro))

  return (
    <>
      <div className="mt-14 text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full glow-violet [background:var(--grad)]">
          <Icon name="check" className="h-8 w-8 text-bg" strokeWidth={2.6} />
        </span>
        <h1 className="mt-7 font-display text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-ink sm:text-[2.6rem]">
          Nos vemos el <span className="text-grad">{estado.cita ? bonito(estado.cita.fecha) : ''}</span>
        </h1>
        {estado.cita && (
          <p className="mt-4 text-[15px] text-muted">
            A las {estado.cita.hora}, hora de El Salvador. Una hora, por videollamada. El enlace
            te llega al correo que dejaste.
          </p>
        )}
      </div>

      <div className="mt-11 grid gap-4 sm:grid-cols-2">
        <Ficha titulo="Tu paquete">
          {p && (
            <>
              <p className="font-display text-2xl font-semibold text-ink">{p.nombre}</p>
              <p className="mt-1 text-sm text-muted">
                {dinero(p.mensual)} al mes desde la segunda reunión, sin permanencia.
              </p>
            </>
          )}
        </Ficha>
        <Ficha titulo="Implementación">
          <p className="font-display text-2xl font-semibold text-ink">{dinero(fee)}</p>
          <p className="mt-1 text-sm text-muted">
            Pagado. {estado.funciones.length}{' '}
            {estado.funciones.length === 1 ? 'función' : 'funciones'}
            {objetivos.length > 1 && ` y ${objetivos.length} objetivos`}.
          </p>
        </Ficha>
      </div>

      <section className="mt-10 border-t border-white/5 pt-8">
        <h2 className="font-display text-lg font-semibold text-ink">Tu agente</h2>
        <p className="mt-1.5 text-sm text-muted">
          {[g.empresa, uso, ...objetivos].filter(Boolean).join(' · ')}
        </p>
        <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
          {estado.funciones.map((id) => (
            <li key={id} className="flex gap-2.5 text-sm text-ink">
              <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
              {funcion(id)?.nombre ?? id}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 border-t border-white/5 pt-8">
        <h2 className="font-display text-lg font-semibold text-ink">Qué pasa ahora</h2>
        <ol className="mt-6 space-y-5">
          {[
            ['Antes de la llamada', 'Te mandamos el guion ya escrito con lo que acabas de llenar, para que lo leas y corrijas.'],
            ['En la llamada', 'Repasamos el guion, conectamos tus cuentas y definimos qué NO hace el agente.'],
            ['La segunda reunión', 'Una semana después lo ves andando con tu equipo, y ahí arranca la mensualidad.'],
          ].map(([t, d], i) => (
            <li key={t} className="flex gap-4">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/15 font-display text-xs text-muted">
                {i + 1}
              </span>
              <span className="min-w-0">
                <span className="block font-display text-[15px] font-semibold text-ink">{t}</span>
                <span className="mt-1 block text-sm leading-relaxed text-muted">{d}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-11 flex flex-wrap items-center gap-3">
        <a
          href={waLink('Acabo de contratar por el portal y quiero mover algo de mi cita.')}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-bg transition-all duration-300 [background:var(--grad)] hover:-translate-y-0.5 hover:glow-violet"
        >
          <Icon name="whatsapp" className="h-4 w-4" />
          Escribirnos
        </a>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20"
        >
          Volver al sitio
        </Link>
      </div>
    </>
  )
}

function Ficha({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-bg-card p-6">
      <p className="font-display text-[11px] uppercase tracking-[0.16em] text-muted">{titulo}</p>
      <div className="mt-3">{children}</div>
    </div>
  )
}
