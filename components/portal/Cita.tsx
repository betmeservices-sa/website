'use client'

// Paso 6: la cita de arranque.
//
// Solo se renderiza en el cliente (la Puerta del paso espera a que el estado
// se lea del navegador), así que `new Date()` acá no provoca desajuste de
// hidratación: el servidor nunca pinta este calendario.
//
// La disponibilidad es SIMULADA, pero no aleatoria en cada render: sale de un
// hash del día, así que un lunes siempre muestra los mismos huecos. Con
// Math.random los horarios cambiaban cada vez que se repintaba y se notaba
// que eran de mentira.

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Icon from '@/components/ui/Icon'
import { usePortal } from './estado'
import { Avanzar, Barra, Titulo } from './piezas'

const DIAS = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
const MESES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
]

const HORAS = [
  '08:30', '09:00', '09:30', '10:00', '10:30', '11:00',
  '13:30', '14:00', '14:30', '15:00', '15:30', '16:00',
]

/** Clave estable de un día, sin zonas horarias de por medio. */
function clave(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const dia = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${dia}`
}

function hash(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return Math.abs(h)
}

/** Huecos libres de un día. El mismo día siempre devuelve los mismos. */
function libres(k: string): string[] {
  const h = hash(k)
  return HORAS.filter((_, i) => ((h >> i) & 1) === 1 || i % 4 === 0)
}

export default function Cita() {
  const router = useRouter()
  const { estado, set } = usePortal()

  const hoy = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])

  const [mes, setMes] = useState(() => new Date(hoy.getFullYear(), hoy.getMonth(), 1))
  const [dia, setDia] = useState<string | null>(estado.cita?.fecha ?? null)
  const [hora, setHora] = useState<string | null>(estado.cita?.hora ?? null)

  const celdas = useMemo(() => construirMes(mes), [mes])
  const huecos = dia ? libres(dia) : []

  // El arranque se agenda a partir del día siguiente: hoy ya se pagó.
  const minimo = useMemo(() => {
    const d = new Date(hoy)
    d.setDate(d.getDate() + 1)
    return d
  }, [hoy])

  const atrasBloqueado =
    mes.getFullYear() === hoy.getFullYear() && mes.getMonth() === hoy.getMonth()

  function confirmar() {
    if (!dia || !hora) return
    set({ cita: { fecha: dia, hora } })
    router.push('/portal/listo')
  }

  return (
    <>
      <Titulo
        eyebrow="Paso 5 de 5"
        bajada="Una hora con el equipo que va a armar tu agente. Repasamos el guion que acabas de llenar, grabamos tu voz de marca y te dejamos la fecha de salida."
      >
        Elige cuándo <span className="text-grad">arrancamos</span>.
      </Titulo>

      <div className="mt-9 grid gap-5 lg:grid-cols-[1fr_320px]">
        {/* Calendario */}
        <div className="rounded-2xl border border-white/10 bg-bg-card p-5 sm:p-7">
          {/* Acotado y centrado: en una columna de 600px las celdas cuadradas
              se vuelven botones enormes y deja de parecer un calendario. */}
          <div className="mx-auto max-w-[420px]">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-[17px] font-semibold capitalize text-ink">
              {MESES[mes.getMonth()]} {mes.getFullYear()}
            </h2>
            <div className="flex gap-2">
              <Flecha
                hacia="atras"
                disabled={atrasBloqueado}
                onClick={() => setMes(new Date(mes.getFullYear(), mes.getMonth() - 1, 1))}
              />
              <Flecha
                hacia="adelante"
                onClick={() => setMes(new Date(mes.getFullYear(), mes.getMonth() + 1, 1))}
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-7 gap-1.5">
            {DIAS.map((d, i) => (
              <span
                key={i}
                className="pb-2 text-center font-display text-[10px] uppercase tracking-[0.14em] text-muted"
              >
                {d}
              </span>
            ))}

            {celdas.map((c, i) => {
              if (!c) return <span key={`v${i}`} />
              const k = clave(c)
              const finDeSemana = c.getDay() === 0 || c.getDay() === 6
              const cerrado = c < minimo || finDeSemana
              const activo = dia === k
              return (
                <button
                  key={k}
                  type="button"
                  disabled={cerrado}
                  onClick={() => {
                    setDia(k)
                    setHora(null)
                  }}
                  aria-pressed={activo}
                  className={`aspect-square rounded-xl text-sm transition-all duration-150 ${
                    cerrado
                      ? 'cursor-not-allowed text-white/15'
                      : activo
                        ? 'font-semibold text-bg [background:var(--grad)]'
                        : 'border border-white/10 text-ink hover:border-cyan/40 hover:bg-white/[0.05]'
                  }`}
                >
                  {c.getDate()}
                </button>
              )
            })}
          </div>

          <p className="mt-6 text-xs text-muted">
            Lunes a viernes. Las horas van en hora de El Salvador.
          </p>
          </div>
        </div>

        {/* Horas */}
        <aside className="h-fit rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
          {dia ? (
            <>
              <h2 className="font-display text-[15px] font-semibold text-ink">{bonito(dia)}</h2>
              <p className="mt-1 text-xs text-muted">
                {huecos.length} {huecos.length === 1 ? 'hora libre' : 'horas libres'}
              </p>
              <div className="mt-5 grid grid-cols-2 gap-2">
                {huecos.map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setHora(h)}
                    aria-pressed={hora === h}
                    className={`rounded-xl py-2.5 text-sm transition-all duration-150 ${
                      hora === h
                        ? 'font-semibold text-bg [background:var(--grad)]'
                        : 'border border-white/10 text-ink hover:border-cyan/40 hover:bg-white/[0.05]'
                    }`}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <p className="py-8 text-center text-sm text-muted">
              Elige un día y acá aparecen las horas libres.
            </p>
          )}
        </aside>
      </div>

      <Barra
        izquierda={
          <p className="text-sm text-muted">
            {dia && hora ? (
              <>
                <span className="text-ink">{bonito(dia)}</span> a las {hora}, una hora.
              </>
            ) : (
              'Elige día y hora.'
            )}
          </p>
        }
      >
        <Avanzar onClick={confirmar} disabled={!dia || !hora}>
          Confirmar la cita
        </Avanzar>
      </Barra>
    </>
  )
}

/** Celdas del mes, empezando en lunes. Los huecos del inicio van en null. */
function construirMes(mes: Date): (Date | null)[] {
  const primero = new Date(mes.getFullYear(), mes.getMonth(), 1)
  const ultimo = new Date(mes.getFullYear(), mes.getMonth() + 1, 0).getDate()
  // getDay() cuenta el domingo como 0; acá la semana arranca el lunes.
  const corrimiento = (primero.getDay() + 6) % 7
  const celdas: (Date | null)[] = Array(corrimiento).fill(null)
  for (let d = 1; d <= ultimo; d++) {
    celdas.push(new Date(mes.getFullYear(), mes.getMonth(), d))
  }
  return celdas
}

export function bonito(k: string): string {
  const [a, m, d] = k.split('-').map(Number)
  const fecha = new Date(a, m - 1, d)
  const semana = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
  return `${semana[fecha.getDay()]} ${d} de ${MESES[m - 1]}`
}

function Flecha({
  hacia,
  onClick,
  disabled,
}: {
  hacia: 'atras' | 'adelante'
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={hacia === 'atras' ? 'Mes anterior' : 'Mes siguiente'}
      className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 text-muted transition-colors hover:border-white/25 hover:text-ink disabled:pointer-events-none disabled:opacity-25"
    >
      <Icon
        name="chevron"
        className={`h-4 w-4 ${hacia === 'atras' ? 'rotate-90' : '-rotate-90'}`}
      />
    </button>
  )
}
