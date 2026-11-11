'use client'

// Chat simulado del hero de /hoteles. Es una maqueta visual: no llama a nada.
// Recorre la reserva completa (fechas, opciones, apartado, pago, comprobante,
// confirmada) y vuelve a empezar. Hotel, habitaciones y montos son ficticios.
//
// Debajo del chat va una linea con lo que Sofia hace en el sistema del hotel en
// cada momento: es lo que el huesped no ve y lo que el dueno quiere saber.
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import Icon from '@/components/ui/Icon'

type Clase =
  | 'g-fechas'
  | 'escribiendo'
  | 's-opciones'
  | 'g-elige'
  | 's-pago'
  | 's-recordatorio'
  | 'g-comprobante'
  | 's-confirmada'

interface Evento {
  id: string
  clase: Clase
  /** Milisegundos que se queda este evento antes de pasar al siguiente. */
  espera: number
  /** Lo que Sofía hace en el sistema del hotel a partir de este momento. */
  tras?: string
}

const GUION: Evento[] = [
  { id: 'a', clase: 'g-fechas', espera: 1300, tras: 'Atiende el chat del hotel' },
  { id: 'b', clase: 'escribiendo', espera: 1700, tras: 'Consulta disponibilidad y tarifas en el PMS' },
  { id: 'c', clase: 's-opciones', espera: 2900 },
  { id: 'd', clase: 'g-elige', espera: 1200 },
  { id: 'e', clase: 'escribiendo', espera: 1700, tras: 'Calcula el total con impuestos y aparta la habitación' },
  { id: 'f', clase: 's-pago', espera: 3600, tras: 'Habitación apartada por 1 hora' },
  { id: 'g', clase: 's-recordatorio', espera: 2500, tras: 'Recuerda el pago 10 minutos antes de que venza' },
  { id: 'h', clase: 'g-comprobante', espera: 1300 },
  { id: 'i', clase: 'escribiendo', espera: 2100, tras: 'Lee el comprobante: monto y fecha coinciden' },
  { id: 'j', clase: 's-confirmada', espera: 5200, tras: 'Reserva creada en el PMS como confirmada' },
]

// Con el movimiento reducido por el sistema se muestra la conversación entera y
// quieta. useSyncExternalStore y no un efecto: el servidor rinde la versión
// animada y el cliente corrige sin romper la hidratación.
function suscribir(cb: () => void) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}
function leerEstatico() {
  return (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
    document.documentElement.dataset.motion !== 'on'
  )
}

function Burbuja({
  de,
  hora,
  children,
  ancho = '',
}: {
  de: 'huesped' | 'sofia'
  hora: string
  children: ReactNode
  ancho?: string
}) {
  const huesped = de === 'huesped'
  return (
    <div className={`flex ${huesped ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[86%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-snug ${ancho} ${
          huesped
            ? 'rounded-br-md border border-cyan/25 bg-cyan/[0.14] text-ink'
            : 'rounded-bl-md border border-white/[0.07] bg-white/[0.06] text-ink'
        }`}
      >
        {children}
        <p className="mt-1 text-right text-[10px] leading-none text-white/40">{hora}</p>
      </div>
    </div>
  )
}

function Contenido({ clase }: { clase: Clase }) {
  switch (clase) {
    case 'g-fechas':
      return (
        <Burbuja de="huesped" hora="9:47 p. m.">
          Buenas noches, ¿tienen habitación del 20 al 22? Somos 2 adultos
        </Burbuja>
      )
    case 's-opciones':
      return (
        <Burbuja de="sofia" hora="9:47 p. m." ancho="w-[86%]">
          <p>
            ¡Buenas noches! Del <strong className="font-semibold">viernes 20 al domingo 22</strong>, 2 noches
            para 2 adultos, tengo:
          </p>
          <div className="mt-2 space-y-1.5">
            {[
              ['Estándar vista al jardín', '$95'],
              ['Suite frente al mar', '$140'],
            ].map(([nombre, precio]) => (
              <div
                key={nombre}
                className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/25 px-3 py-2"
              >
                <span className="text-[13px]">{nombre}</span>
                <span className="shrink-0 font-display text-[13px] font-semibold">
                  {precio} <span className="text-[10.5px] font-normal text-white/50">por noche</span>
                </span>
              </div>
            ))}
          </div>
          <p className="mt-2">¿Cuál prefiere?</p>
        </Burbuja>
      )
    case 'g-elige':
      return (
        <Burbuja de="huesped" hora="9:49 p. m.">
          La suite, por favor
        </Burbuja>
      )
    case 's-pago':
      return (
        <Burbuja de="sofia" hora="9:49 p. m." ancho="w-[86%]">
          <p>
            Suite frente al mar, 2 noches. Total con impuestos:{' '}
            <strong className="font-semibold">$330.40</strong>. Se la aparto por 1 hora.
          </p>
          <div className="mt-2 rounded-xl border border-white/10 bg-black/25 px-3 py-2">
            <p className="text-[10.5px] uppercase tracking-wider text-white/45">Transferencia</p>
            <p className="mt-0.5 font-display text-[13px] font-semibold tracking-wide">
              Cuenta corriente 001-234567-8
            </p>
            <p className="text-[11.5px] text-white/55">A nombre del hotel</p>
          </div>
          <div className="mt-1.5 flex items-center justify-between gap-2 rounded-xl border border-cyan/25 bg-cyan/[0.08] px-3 py-2 text-cyan-soft">
            <span className="text-[13px] font-medium">Pagar $330.40 con tarjeta</span>
            <Icon name="arrow" className="h-3.5 w-3.5 shrink-0" />
          </div>
        </Burbuja>
      )
    case 's-recordatorio':
      return (
        <Burbuja de="sofia" hora="10:39 p. m.">
          Le recuerdo que su apartado vence en 10 minutos. ¿Pudo hacer el pago?
        </Burbuja>
      )
    case 'g-comprobante':
      return (
        <Burbuja de="huesped" hora="10:42 p. m." ancho="w-[62%]">
          <div className="rounded-xl bg-[#F4F5F9] px-3 py-3 text-[#14141F]">
            <div className="flex items-center gap-1.5">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white">
                <Icon name="check" className="h-2.5 w-2.5" strokeWidth={3} />
              </span>
              <span className="text-[10.5px] font-semibold">Transferencia exitosa</span>
            </div>
            <p className="mt-1.5 font-display text-[19px] font-semibold leading-none">$330.40</p>
            <p className="mt-1.5 text-[10px] text-[#14141F]/55">Hoy, 10:41 p. m.</p>
            <div className="mt-2 space-y-1">
              <div className="h-1 w-full rounded bg-[#14141F]/10" />
              <div className="h-1 w-2/3 rounded bg-[#14141F]/10" />
            </div>
          </div>
        </Burbuja>
      )
    case 's-confirmada':
      return (
        <Burbuja de="sofia" hora="10:42 p. m." ancho="w-[86%]">
          <p className="font-semibold">¡Listo! Su reserva quedó confirmada ✅</p>
          <div className="mt-2 rounded-xl border border-emerald-400/25 bg-emerald-400/[0.08] px-3 py-2">
            <p className="font-display text-[13px] font-semibold">Suite frente al mar</p>
            <p className="text-[11.5px] text-white/60">Viernes 20 a domingo 22 · 2 adultos</p>
            <p className="mt-1 text-[11.5px] text-emerald-300">Reserva n.º 48213</p>
          </div>
        </Burbuja>
      )
    default:
      return null
  }
}

function Escribiendo() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-white/[0.07] bg-white/[0.06] px-4 py-3.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-white/60 [animation:blink_1.1s_ease-in-out_infinite]"
            style={{ animationDelay: `${i * 0.18}s` }}
          />
        ))}
      </div>
    </div>
  )
}

export default function ChatDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const enVista = useInView(ref, { amount: 0.3 })
  const estatico = useSyncExternalStore(suscribir, leerEstatico, () => false)
  const [n, setN] = useState(1)

  useEffect(() => {
    if (estatico || !enVista) return
    const espera = n === 0 ? 500 : GUION[n - 1].espera
    const t = setTimeout(() => setN(n >= GUION.length ? 0 : n + 1), espera)
    return () => clearTimeout(t)
  }, [n, enVista, estatico])

  const vistos = GUION.slice(0, estatico ? GUION.length : n)
  const escribiendo = !estatico && vistos[vistos.length - 1]?.clase === 'escribiendo'
  const mensajes = vistos.filter((e) => e.clase !== 'escribiendo')
  const tras = [...vistos].reverse().find((e) => e.tras)?.tras ?? GUION[0].tras

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[380px]">
      <div className="absolute -inset-8 rounded-[3rem] bg-[radial-gradient(circle,rgba(139,92,246,0.28),transparent_68%)] blur-2xl" />

      <div className="border-grad relative overflow-hidden rounded-[2rem] bg-[#090912] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)]">
        {/* Encabezado del chat */}
        <div className="flex items-center gap-3 border-b border-white/[0.07] bg-white/[0.03] px-4 py-3.5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-cyan">
            <Icon name="bed" className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="font-display text-[15px] font-semibold leading-tight">Su hotel</p>
            <p className="flex items-center gap-1.5 text-[11.5px] text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Sofía, en línea
            </p>
          </div>
        </div>

        {/* Conversación. Con alto fijo los mensajes viejos salen por arriba. */}
        <div
          className={`flex flex-col justify-end gap-2 overflow-hidden px-3 py-3 ${
            estatico ? '' : 'h-[430px] [mask-image:linear-gradient(to_bottom,transparent,black_44px)] sm:h-[470px]'
          }`}
          aria-label="Conversación de ejemplo entre un huésped y Sofía"
        >
          {mensajes.map((e) => (
            <motion.div
              key={e.id}
              layout={estatico ? false : 'position'}
              initial={estatico ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <Contenido clase={e.clase} />
            </motion.div>
          ))}
          {escribiendo && (
            <motion.div layout="position" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Escribiendo />
            </motion.div>
          )}
        </div>

        {/* Lo que pasa en el sistema del hotel mientras tanto */}
        <div className="border-t border-white/[0.07] bg-black/40 px-4 py-3">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
            Mientras tanto, en su sistema
          </p>
          <div className="mt-1 flex h-9 items-center gap-2">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full [background:var(--grad)]" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={estatico ? 'fin' : tras}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="text-[12.5px] leading-tight text-ink"
              >
                {tras}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <p className="relative mt-3 text-center text-[11px] text-white/35">
        Conversación de ejemplo. Hotel, habitaciones y montos ficticios.
      </p>
    </div>
  )
}
