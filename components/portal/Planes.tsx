'use client'

import { useRouter } from 'next/navigation'
import Icon from '@/components/ui/Icon'
import { PLANES, dinero } from './catalogo'
import { usePortal } from './estado'
import { Titulo, Avanzar, Barra, Marca } from './piezas'

export default function Planes() {
  const router = useRouter()
  const { estado, set } = usePortal()
  const elegido = estado.plan

  return (
    <>
      <Titulo
        eyebrow="Paso 1 de 6"
        bajada="Elige el paquete y queda activa la suscripción. Las funciones del agente se eligen después: primero vemos qué tiene que hacer."
      >
        Empieza con <span className="text-grad">tu agente</span>.
      </Titulo>

      <div className="mt-9 grid gap-4 md:grid-cols-3">
        {PLANES.map((p) => {
          const activo = elegido === p.id
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => set({ plan: p.id })}
              aria-pressed={activo}
              className={`relative flex flex-col rounded-2xl p-6 text-left transition-all duration-200 ${
                activo
                  ? 'border-grad glass -translate-y-1'
                  : 'border border-white/10 bg-bg-card hover:-translate-y-0.5 hover:border-white/20'
              }`}
            >
              {p.recomendado && (
                <span className="absolute -top-3 left-6 rounded-full [background:var(--grad)] px-3 py-1 text-[11px] font-semibold text-bg">
                  El más pedido
                </span>
              )}
              <span className="flex items-start justify-between gap-3">
                <span className="font-display text-xl font-semibold text-ink">{p.nombre}</span>
                <Marca activa={activo} />
              </span>
              <span className="mt-4 flex items-baseline gap-1.5">
                <span className="font-display text-[2rem] font-semibold leading-none text-ink">
                  {dinero(p.mensual)}
                </span>
                <span className="text-sm text-muted">/mes</span>
              </span>
              {/* Alto mínimo de dos líneas: sin esto el separador de cada
                  tarjeta queda a distinta altura y las tres dejan de leerse
                  como una sola fila. */}
              <span className="mt-3 block min-h-[2.6rem] text-sm text-muted">{p.para}</span>
              <span className="mt-2 block h-px bg-white/10" />
              <ul className="mt-5 space-y-2.5">
                {p.incluye.map((x) => (
                  <li key={x} className="flex gap-2 text-sm leading-snug text-muted">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                    {x}
                  </li>
                ))}
              </ul>
            </button>
          )
        })}
      </div>

      <Barra
        izquierda={
          elegido ? (
            <p className="text-sm text-muted">
              <span className="text-ink">{PLANES.find((p) => p.id === elegido)!.nombre}</span>
              {' · '}
              {dinero(PLANES.find((p) => p.id === elegido)!.mensual)} al mes, sin permanencia.
            </p>
          ) : (
            <p className="text-sm text-muted">Elige un paquete para seguir.</p>
          )
        }
      >
        <Avanzar onClick={() => router.push('/portal/pago')} disabled={!elegido}>
          Suscribirme
        </Avanzar>
      </Barra>
    </>
  )
}
