'use client'

// Selección de funciones. Un precio único por función, así que el cliente arma
// su propio alcance y ve el fee de implementación moverse mientras elige.
//
// Las que su guion ya pidió salen marcadas como sugeridas, pero NO se
// seleccionan solas: el total no puede subir sin que él lo haya tocado.

import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Icon from '@/components/ui/Icon'
import { FUNCIONES, PRECIO_FUNCION, dinero, feeImplementacion } from './catalogo'
import { usePortal, type Guion } from './estado'
import { Avanzar, Barra, Marca, Titulo } from './piezas'

/** Qué funciones se desprenden de lo que el cliente ya contestó. */
function sugeridas(g: Guion): string[] {
  const s: string[] = []
  const tiene = (v: string) => Boolean(v) && v !== 'Ninguno todavía'
  if (tiene(g.crm)) s.push('crm')
  if (tiene(g.calendario) || g.objetivo === 'citas') s.push('calendario')
  if (g.idiomas.length > 1) s.push('idiomas')
  if (g.canales.includes('Llamadas')) s.push('voz')
  if (g.objetivo === 'cobrar') s.push('pagos')
  if (g.objetivo === 'reactivar') s.push('seguimiento')
  if (g.objetivo === 'resolver') s.push('conocimiento')
  if (g.uso === 'soporte' || g.uso === 'ambos') s.push('transferencia')
  return s
}

export default function Funciones() {
  const router = useRouter()
  const { estado, set } = usePortal()
  const elegidas = estado.funciones
  const sug = useMemo(() => sugeridas(estado.guion), [estado.guion])
  const fee = feeImplementacion(elegidas)

  function alternar(id: string) {
    set({
      funciones: elegidas.includes(id) ? elegidas.filter((x) => x !== id) : [...elegidas, id],
    })
  }

  return (
    <>
      <Titulo
        eyebrow="Paso 4 de 6"
        bajada={`Cada función se cobra una vez, al implementarla: ${dinero(PRECIO_FUNCION)}. La suscripción mensual no cambia por esto.`}
      >
        Qué sabe hacer <span className="text-grad">tu agente</span>.
      </Titulo>

      <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {FUNCIONES.map((f) => {
          const activa = elegidas.includes(f.id)
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => alternar(f.id)}
              aria-pressed={activa}
              className={`relative flex flex-col rounded-2xl p-5 text-left transition-all duration-200 ${
                activa
                  ? 'border-grad glass -translate-y-0.5'
                  : 'border border-white/10 bg-bg-card hover:border-white/20'
              }`}
            >
              <span className="flex items-start justify-between gap-3">
                <span
                  className={`grid h-9 w-9 place-items-center rounded-xl border transition-colors ${
                    activa ? 'border-cyan/40 bg-cyan/10 text-cyan' : 'border-white/10 bg-white/[0.03] text-muted'
                  }`}
                >
                  <Icon name={f.icono} className="h-4.5 w-4.5" />
                </span>
                <Marca activa={activa} />
              </span>

              <span className="mt-4 block font-display text-[15px] font-semibold leading-snug text-ink">
                {f.nombre}
              </span>
              <span className="mt-1.5 block flex-1 text-sm leading-relaxed text-muted">{f.desc}</span>

              <span className="mt-4 flex items-center justify-between gap-2">
                <span className="font-display text-sm font-semibold text-ink">
                  {dinero(PRECIO_FUNCION)}
                </span>
                {sug.includes(f.id) && !activa && (
                  <span className="rounded-full border border-violet/40 bg-violet/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-magenta">
                    Según tu guion
                  </span>
                )}
              </span>
            </button>
          )
        })}
      </div>

      <Barra
        izquierda={
          <div>
            <p className="font-display text-[11px] uppercase tracking-[0.16em] text-muted">
              Fee de implementación
            </p>
            <p className="mt-0.5 flex items-baseline gap-2">
              <span className="font-display text-2xl font-semibold text-ink">{dinero(fee)}</span>
              <span className="text-sm text-muted">
                {elegidas.length} {elegidas.length === 1 ? 'función' : 'funciones'}
              </span>
            </p>
          </div>
        }
      >
        <Avanzar onClick={() => router.push('/portal/implementacion')} disabled={!elegidas.length}>
          Ver el total
        </Avanzar>
      </Barra>
    </>
  )
}
