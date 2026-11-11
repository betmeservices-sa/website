// Página /hoteles: Sofía para hoteles, pensada para enseñársela a dueños y
// gerentes. Solo español. Sin cifras de resultados de ningún cliente: lo que se
// cuenta es cómo trabaja Sofía (aparta una hora, recuerda diez minutos antes,
// da seguimiento a la hora) y qué le resuelve al hotel de quien lee.
//
// Un solo CTA, repetido: el WhatsApp de MiAgentIA con mensaje prellenado.
import type { ReactNode } from 'react'
import SiteShell from '@/components/SiteShell'
import Aurora from '@/components/reactbits/Aurora'
import AnimatedContent from '@/components/reactbits/AnimatedContent'
import SplitText from '@/components/reactbits/SplitText'
import SpotlightCard from '@/components/reactbits/SpotlightCard'
import Eyebrow from '@/components/ui/Eyebrow'
import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'
import { waLink } from '@/lib/site'
import ChatDemo from './ChatDemo'
import PanelShowcase from './PanelShowcase'
import { CanalIcon, type Canal } from './CanalIcon'

export const WA_HOTELES = 'Hola, tengo un hotel y quiero conocer a Sofía'

function Cta({ children = 'Quiero conocer a Sofía' }: { children?: ReactNode }) {
  return (
    <Button href={waLink(WA_HOTELES)} className="px-7 py-3.5 text-[15px] font-semibold">
      <Icon name="whatsapp" className="h-[18px] w-[18px]" />
      {children}
    </Button>
  )
}

function Cabecera({
  eyebrow,
  titulo,
  grad,
  sub,
}: {
  eyebrow: string
  titulo: string
  grad?: string
  sub?: string
}) {
  return (
    <AnimatedContent className="mx-auto max-w-2xl text-center">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-5 text-balance font-display text-3xl font-semibold leading-[1.12] tracking-tight sm:text-[2.75rem]">
        {titulo}
        {grad && (
          <>
            {' '}
            <span className="text-grad">{grad}</span>
          </>
        )}
      </h2>
      {sub && <p className="mt-4 text-pretty text-[15px] leading-relaxed text-muted sm:text-lg">{sub}</p>}
    </AnimatedContent>
  )
}

// Iconos propios de esta página (los que el set común no trae).
function Trazo({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  )
}
const ICONOS = {
  luna: <path d="M20 14.6A8 8 0 0 1 9.4 4 7.5 7.5 0 1 0 20 14.6Z" />,
  recibo: <path d="M6 3.5h12v17l-3-1.8-3 1.8-3-1.8-3 1.8v-17ZM9 8h6M9 12h6" />,
  chat: <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-6.5L7 19.5V16H6a2 2 0 0 1-2-2V6Z" />,
  reloj: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  archivo: (
    <>
      <rect x="3.5" y="4" width="17" height="16" rx="2.5" />
      <path d="M3.5 9h17M8 13h8M8 16.5h5" />
    </>
  ),
}

/* ───────────────────────── Beneficios ───────────────────────── */

const BENEFICIOS: { icono: keyof typeof ICONOS; titulo: string; texto: string; tinte: string; ancho: string }[] = [
  {
    icono: 'luna',
    titulo: 'No pierde reservas de noche ni en fin de semana',
    texto:
      'Quien escribe a las once de la noche recibe disponibilidad y precio en segundos, y puede dejar la habitación pagada antes de que abra recepción.',
    tinte: 'text-cyan',
    ancho: 'lg:col-span-3',
  },
  {
    icono: 'recibo',
    titulo: 'Cobra y confirma sin que nadie esté pendiente',
    texto:
      'Envía los datos de pago, lee el comprobante cuando llega y deja la reserva confirmada. Su equipo la encuentra ya hecha.',
    tinte: 'text-magenta',
    ancho: 'lg:col-span-3',
  },
  {
    icono: 'chat',
    titulo: 'Su equipo deja de contestar lo mismo cien veces',
    texto:
      'Horarios, ubicación, desayuno, mascotas, qué incluye cada habitación. Recepción se queda con lo que de verdad pide una persona.',
    tinte: 'text-violet',
    ancho: 'lg:col-span-2',
  },
  {
    icono: 'reloj',
    titulo: 'Le da seguimiento a quien no contestó',
    texto:
      'La cotización sin respuesta recibe un mensaje a la hora. El apartado por vencer, un recordatorio diez minutos antes.',
    tinte: 'text-cyan-soft',
    ancho: 'lg:col-span-2',
  },
  {
    icono: 'archivo',
    titulo: 'Todo queda registrado',
    texto:
      'La reserva entra a su PMS y cada conversación queda en un panel, con el chat completo y quién la atendió.',
    tinte: 'text-magenta',
    ancho: 'lg:col-span-2',
  },
]

/* ───────────────────── Recorrido de la reserva ───────────────────── */

function Caja({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-white/[0.08] bg-black/30 px-3.5 py-3 text-[12.5px] ${className}`}>
      {children}
    </div>
  )
}

function Fila({ a, b, fuerte = false }: { a: string; b: string; fuerte?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-muted">{a}</span>
      <span className={`text-right ${fuerte ? 'font-display text-[15px] font-semibold text-ink' : 'text-ink/90'}`}>{b}</span>
    </div>
  )
}

function Visto({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-center gap-2.5">
      <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
        <Icon name="check" className="h-3 w-3" strokeWidth={2.6} />
      </span>
      <span className="text-ink/90">{children}</span>
    </li>
  )
}

const PASOS: { titulo: string; texto: string; pieza: ReactNode; tono?: 'clave' | 'desvio' }[] = [
  {
    titulo: 'Pregunta fechas y personas',
    texto: 'Lo necesario para cotizar: cuándo llegan, cuántas noches y cuántos son.',
    pieza: (
      <Caja className="flex flex-wrap gap-2">
        {['Llegada', 'Salida', 'Adultos', 'Niños'].map((c) => (
          <span key={c} className="rounded-full border border-white/10 px-2.5 py-1 text-[11.5px] text-muted">
            {c}
          </span>
        ))}
      </Caja>
    ),
  },
  {
    titulo: 'Consulta su PMS y ofrece hasta dos opciones',
    texto:
      'Disponibilidad y tarifa se leen en ese momento. Repite las fechas con el día de la semana, para que el huésped corrija si se equivocó.',
    pieza: (
      <Caja className="space-y-2">
        <p className="text-[11.5px] text-cyan-soft">Viernes 20 a domingo 22 · 2 noches</p>
        <Fila a="Estándar vista al jardín" b="$95 por noche" />
        <Fila a="Suite frente al mar" b="$140 por noche" />
      </Caja>
    ),
  },
  {
    titulo: 'Da el total final, con impuestos',
    texto: 'El huésped sabe cuánto va a pagar antes de decidir. Sin sorpresas al llegar.',
    pieza: (
      <Caja>
        <Fila a="Total con impuestos" b="$330.40" fuerte />
      </Caja>
    ),
  },
  {
    titulo: 'Aparta la habitación una hora y envía cómo pagar',
    texto:
      'La cuenta bancaria del hotel correcto, o el enlace de pago con tarjeta por el monto exacto.',
    pieza: (
      <Caja className="space-y-2.5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-ink/90">Habitación apartada</span>
          <span className="rounded-full border border-cyan/30 bg-cyan/10 px-2 py-0.5 font-display text-[11.5px] font-semibold text-cyan-soft">
            60:00
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-center text-[11.5px] text-muted">
          <span className="rounded-lg border border-white/10 py-1.5">Transferencia</span>
          <span className="rounded-lg border border-white/10 py-1.5">Tarjeta</span>
        </div>
      </Caja>
    ),
  },
  {
    titulo: 'Recuerda el pago diez minutos antes de que venza',
    texto: 'Un mensaje a tiempo, cuando el huésped todavía puede completar la reserva.',
    pieza: (
      <Caja>
        <div className="flex items-center justify-between gap-3">
          <span className="text-ink/90">Apartado</span>
          <span className="text-[11.5px] text-cyan-soft">quedan 10 min</span>
        </div>
        <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-5/6 rounded-full [background:var(--grad)]" />
        </div>
      </Caja>
    ),
  },
  {
    titulo: 'Lee el comprobante y confirma la reserva',
    texto:
      'Cuando llega la captura, compara el monto contra lo acordado en el chat y revisa la fecha. Si cuadra, le confirma al huésped y crea la reserva en su PMS, ya como confirmada. Sin intervención humana.',
    tono: 'clave',
    pieza: (
      <Caja className="border-emerald-400/20 bg-emerald-400/[0.05]">
        <ul className="space-y-2">
          <Visto>El monto coincide con lo acordado</Visto>
          <Visto>La fecha del comprobante es válida</Visto>
          <Visto>Reserva creada en el PMS: confirmada</Visto>
        </ul>
      </Caja>
    ),
  },
  {
    titulo: 'Si algo no cuadra, no confirma',
    texto:
      'Monto distinto, comprobante sin fecha o una reserva que ya existe a nombre del huésped: lo pasa a una persona, con el motivo escrito.',
    tono: 'desvio',
    pieza: (
      <Caja className="border-magenta/25 bg-magenta/[0.05]">
        <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-magenta">Caso para Reservas</p>
        <p className="mt-1.5 text-ink/90">El monto del comprobante es menor al total acordado.</p>
      </Caja>
    ),
  },
]

function Riel({ puntos }: { puntos: { etiqueta: string; marca?: boolean }[] }) {
  return (
    <ol className="relative mt-6 grid" style={{ gridTemplateColumns: `repeat(${puntos.length}, minmax(0, 1fr))` }}>
      <span className="absolute left-[8%] right-[8%] top-[7px] h-px bg-white/15" aria-hidden="true" />
      {puntos.map((p) => (
        <li key={p.etiqueta} className="relative flex flex-col items-center px-1 text-center">
          <span
            className={`h-[15px] w-[15px] rounded-full border-2 border-bg-card ${
              p.marca ? '[background:var(--grad)] shadow-[0_0_14px_rgba(139,92,246,0.8)]' : 'bg-white/30'
            }`}
          />
          <span className={`mt-2.5 text-[11.5px] leading-snug sm:text-[12.5px] ${p.marca ? 'text-ink' : 'text-muted'}`}>
            {p.etiqueta}
          </span>
        </li>
      ))}
    </ol>
  )
}

/* ───────────────────────── Habilidades ───────────────────────── */

function Punto({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <li className="border-l border-white/10 pl-4">
      <p className="font-display text-[15px] font-semibold text-ink">{titulo}</p>
      <p className="mt-1 text-[14px] leading-relaxed text-muted">{children}</p>
    </li>
  )
}

function TituloGrupo({ color, children }: { color: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-2 w-2 rounded-full" style={{ background: color }} />
      <h3 className="font-display text-xl font-semibold">{children}</h3>
    </div>
  )
}

const CANALES: { canal: Canal; nombre: string; tinte: string }[] = [
  { canal: 'whatsapp', nombre: 'WhatsApp', tinte: 'text-emerald-400' },
  { canal: 'instagram', nombre: 'Instagram', tinte: 'text-magenta' },
  { canal: 'messenger', nombre: 'Messenger', tinte: 'text-cyan' },
]

const PASA_A_PERSONA = [
  'Quejas',
  'Cancelaciones',
  'Cambios de fecha',
  'Devoluciones',
  'Eventos',
  'Grupos muy grandes',
  'Objetos perdidos',
  'Notas de voz',
]

const NO_INVENTA = [
  ['Precios', 'Solo salen del sistema del hotel, consultados en ese momento.'],
  ['Cuenta de pago', 'Se copia tal cual. Nunca se redacta.'],
  ['Descuentos', 'Sin una promoción cargada por el hotel, no ofrece ninguno.'],
  ['Lo que no sabe', 'Lo confirma su equipo.'],
  ['Cada respuesta', 'Pasa una revisión automática antes de salir.'],
]

/* ───────────────────────── Panel ───────────────────────── */

const PANEL = [
  ['Bandeja única', 'WhatsApp, Instagram, Messenger y los comentarios de Facebook e Instagram de todos sus hoteles.'],
  ['Mis chats', 'Lo que Sofía le pasó a cada persona del equipo.'],
  ['Tablero', 'Ocupación, llegadas, salidas e ingreso leídos del PMS, por hotel y del grupo, y qué piden los huéspedes por tema.'],
  ['Reservas de Sofía', 'Cada una con su número de reserva y el enlace al chat donde se cerró.'],
  ['Casos', 'Cada asunto abierto, con responsable, hasta que se resuelve.'],
  ['Promociones y perfil del agente', 'El hotel enciende y apaga promociones, y pide cambios a Sofía con sus palabras.'],
  ['Reservas que cerró su equipo', 'Las detecta en el chat y arma la tarjeta de la reserva sola.'],
  ['Excel de ventas', 'Llega por correo cada mañana.'],
  ['Campañas por WhatsApp', 'A huéspedes anteriores, con plantillas aprobadas. Una venta relámpago, por ejemplo.'],
  ['Enlaces medidos', 'Para la bio de cada red: cuántos clics y cuántos escribieron.'],
  ['Aviso de entrega', 'Si WhatsApp presenta un problema para entregar mensajes, el panel lo dice.'],
]

/* ─────────────────────── Puesta en marcha ─────────────────────── */

const ARRANQUE = [
  ['Conectar los canales', 'El WhatsApp, el Instagram y el Messenger de su hotel.'],
  ['Conectar el PMS', 'Para leer disponibilidad y tarifas, y crear las reservas. Hoy, Cloudbeds.'],
  ['Cargar la información', 'Habitaciones, horarios, políticas, cuentas de pago, fotos y promociones.'],
  ['Probar con su equipo', 'Le escriben como huéspedes y piden los ajustes que hagan falta.'],
  ['Encender', 'Sofía empieza a contestar y su equipo ve cada conversación en la bandeja.'],
]

export default function HotelesPage() {
  return (
    <SiteShell lang="es">
      {/* ── Hero ── */}
      <section id="top" className="relative overflow-hidden pb-20 pt-32 sm:pt-40 lg:pb-28">
        <Aurora dots={false} />
        <div className="tech-grid absolute inset-0" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.08fr_.92fr] lg:gap-10">
          <div className="text-center lg:text-left">
            <Eyebrow badge>Sofía para hoteles</Eyebrow>
            <h1 className="mt-7 font-display text-[2.5rem] font-semibold leading-[1.06] tracking-tight sm:text-6xl xl:text-[4.25rem]">
              <SplitText text="Su hotel confirma reservas por chat" delay={0.1} />{' '}
              <SplitText text="a cualquier hora" delay={0.4} wordClassName="text-grad" />
            </h1>
            <p className="mx-auto mt-7 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg lg:mx-0">
              Sofía atiende el WhatsApp, el Instagram y el Messenger de su hotel. Consulta disponibilidad y
              tarifas en su PMS, aparta la habitación, lee el comprobante de pago y deja la reserva confirmada.
              Reserva directa: el huésped le escribe a su hotel y le paga a su hotel.
            </p>
            <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Cta />
              <ul className="flex items-center gap-2" aria-label="Canales que atiende">
                {CANALES.map((c) => (
                  <li
                    key={c.canal}
                    title={c.nombre}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] ${c.tinte}`}
                  >
                    <CanalIcon canal={c.canal} className="h-[18px] w-[18px]" />
                    <span className="sr-only">{c.nombre}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-6 flex items-center justify-center gap-2 text-[13px] text-muted lg:justify-start">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Ya trabaja así, en producción, en hoteles reales.
            </p>
          </div>

          <ChatDemo />
        </div>
      </section>

      {/* ── Beneficios ── */}
      <section className="relative border-y border-white/5 bg-bg-soft/60 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Cabecera
            eyebrow="En su hotel"
            titulo="El chat deja de depender de"
            grad="quién esté en turno"
          />
          <div className="mt-12 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-6">
            {BENEFICIOS.map((b, i) => (
              <AnimatedContent key={b.titulo} delay={i * 0.06} className={`h-full ${b.ancho} ${i === 4 ? 'sm:col-span-2' : ''}`}>
                <SpotlightCard className="h-full rounded-2xl border border-white/10 bg-bg-card p-6 sm:p-7">
                  <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] ${b.tinte}`}>
                    <Trazo className="h-[22px] w-[22px]">{ICONOS[b.icono]}</Trazo>
                  </span>
                  <h3 className={`mt-5 text-balance font-display font-semibold leading-snug ${i < 2 ? 'text-xl sm:text-2xl' : 'text-lg'}`}>
                    {b.titulo}
                  </h3>
                  <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted">{b.texto}</p>
                </SpotlightCard>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      {/* ── La reserva, de punta a punta ── */}
      <section id="reserva" className="relative scroll-mt-24 py-20 sm:py-28">
        <div className="aurora-blob aurora-3 opacity-20" />
        <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
          <Cabecera
            eyebrow="La reserva completa"
            titulo="Del primer mensaje a la reserva"
            grad="confirmada en su PMS"
            sub="Siete pasos que hoy ocupan a recepción. Sofía los hace sola, en el mismo chat donde el huésped preguntó."
          />

          <ol className="mt-12 space-y-3 sm:mt-16">
            {PASOS.map((p, i) => (
              <li key={p.titulo}>
                <AnimatedContent distance={40}>
                  <div
                    className={`grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-4 rounded-2xl p-5 sm:gap-x-6 sm:p-6 md:grid-cols-[auto_minmax(0,1fr)_300px] md:items-center ${
                      p.tono === 'clave'
                        ? 'border-grad bg-bg-card glow-violet'
                        : p.tono === 'desvio'
                          ? 'border border-dashed border-magenta/30 bg-magenta/[0.03]'
                          : 'border border-white/[0.07] bg-white/[0.02]'
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-xl border font-display text-sm font-semibold sm:h-12 sm:w-12 sm:text-base ${
                        p.tono === 'clave'
                          ? 'border-transparent text-bg [background:var(--grad)]'
                          : 'border-white/10 bg-bg-card text-ink/80'
                      }`}
                    >
                      {i + 1}
                    </span>
                    <div>
                      <h3 className={`font-display font-semibold leading-snug ${p.tono === 'clave' ? 'text-xl sm:text-2xl' : 'text-[17px] sm:text-lg'}`}>
                        {p.titulo}
                      </h3>
                      <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">{p.texto}</p>
                    </div>
                    <div className="col-span-2 md:col-span-1">{p.pieza}</div>
                  </div>
                </AnimatedContent>
              </li>
            ))}
          </ol>

          {/* Seguimiento: las dos veces que Sofía vuelve a escribir sin que nadie se lo pida */}
          <AnimatedContent className="mt-14 sm:mt-20">
            <div className="rounded-3xl border border-white/10 bg-bg-card p-6 sm:p-10">
              <div className="max-w-2xl">
                <Eyebrow>Seguimiento</Eyebrow>
                <h3 className="mt-5 text-balance font-display text-2xl font-semibold leading-tight tracking-tight sm:text-[2rem]">
                  El huésped que dejó de contestar <span className="text-grad">recibe otro mensaje</span>
                </h3>
              </div>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 sm:p-6">
                  <p className="font-display text-[17px] font-semibold">Cotización sin respuesta</p>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">
                    A la hora, Sofía retoma la conversación. Una sola vez y dentro del horario: si la hora se
                    cumple de noche, espera a la mañana.
                  </p>
                  <Riel
                    puntos={[
                      { etiqueta: 'Envía la cotización' },
                      { etiqueta: 'Pasa una hora' },
                      { etiqueta: 'Escribe de nuevo', marca: true },
                    ]}
                  />
                </div>
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 sm:p-6">
                  <p className="font-display text-[17px] font-semibold">Apartado por vencer</p>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">
                    La habitación queda apartada una hora. Diez minutos antes de que se libere, Sofía le
                    recuerda al huésped que falta el pago.
                  </p>
                  <Riel
                    puntos={[
                      { etiqueta: 'Aparta la habitación' },
                      { etiqueta: 'Faltan 10 minutos', marca: true },
                      { etiqueta: 'Vence el apartado' },
                    ]}
                  />
                </div>
              </div>
            </div>
          </AnimatedContent>

          <AnimatedContent className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 sm:p-6">
                  <p className="font-display text-[17px] font-semibold">Grupos</p>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">
                    Arma la combinación de varias habitaciones y dice cuántas personas van en cada una.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 sm:p-6">
                  <p className="font-display text-[17px] font-semibold">Disponibilidad al día</p>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">
                    La reserva entra a su PMS, así que la habitación deja de ofrecerse en los demás canales
                    de venta del hotel.
                  </p>
                </div>
          </AnimatedContent>

          <AnimatedContent className="mt-10 text-center">
            <Cta />
          </AnimatedContent>
        </div>
      </section>

      {/* ── Habilidades ── */}
      <section id="habilidades" className="relative scroll-mt-24 border-t border-white/5 bg-bg-soft/60 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Cabecera
            eyebrow="Lo que sabe hacer"
            titulo="Atiende como alguien de su equipo y"
            grad="conoce sus límites"
          />

          <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-14 lg:grid-cols-12">
            {/* Atención */}
            <AnimatedContent className="min-w-0 lg:col-span-7">
              <SpotlightCard className="h-full rounded-2xl border border-white/10 bg-bg-card p-6 sm:p-9">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <TituloGrupo color="#22D3EE">Atención</TituloGrupo>
                  <ul className="flex gap-2">
                    {CANALES.map((c) => (
                      <li
                        key={c.canal}
                        className={`flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[12px] ${c.tinte}`}
                      >
                        <CanalIcon canal={c.canal} className="h-3.5 w-3.5" />
                        <span className="text-ink/85">{c.nombre}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <ul className="mt-7 grid gap-6 sm:grid-cols-2">
                  <Punto titulo="Las 24 horas, todos los días">
                    WhatsApp, mensajes directos de Instagram y Messenger, con respuesta en segundos.
                  </Punto>
                  <Punto titulo="Un solo agente para varios hoteles">
                    Identifica a cuál le escriben: por un menú en WhatsApp y, en redes, por la página que
                    recibió el mensaje. Solo da datos de ese hotel.
                  </Punto>
                  <Punto titulo="Lee todo antes de contestar">
                    Si el huésped manda varios mensajes seguidos, responde una vez. Trato de usted y mensajes
                    cortos, como se escribe en WhatsApp.
                  </Punto>
                  <Punto titulo="Ve las fotos que le mandan">
                    Una publicación con una promoción, una habitación, un comprobante. Responde según lo que
                    ve.
                  </Punto>
                  <Punto titulo="Envía fotos del hotel">
                    Habitaciones y áreas, por el mismo chat.
                  </Punto>
                </ul>
              </SpotlightCard>
            </AnimatedContent>

            {/* Más que habitaciones */}
            <AnimatedContent delay={0.08} className="min-w-0 lg:col-span-5">
              <SpotlightCard className="h-full rounded-2xl border border-white/10 bg-bg-card p-6 sm:p-9">
                <TituloGrupo color="#8B5CF6">Más que habitaciones</TituloGrupo>
                <ul className="mt-7 space-y-6">
                  <Punto titulo="Promociones">
                    Usted las enciende y apaga desde su panel. Sofía las ofrece al instante, con el precio y
                    las restricciones exactas.
                  </Punto>
                  <Punto titulo="Day Pass y habitación por horas">
                    Precios, horarios y condiciones de cada hotel.
                  </Punto>
                  <Punto titulo="Membresías del club">
                    Informa, toma el contacto y deja el caso al equipo de membresías.
                  </Punto>
                  <Punto titulo="Las preguntas de todos los días">
                    Entrada y salida, ubicación, menú, desayuno, mascotas, qué incluye cada habitación.
                  </Punto>
                </ul>
              </SpotlightCard>
            </AnimatedContent>

            {/* Traspaso a una persona */}
            <AnimatedContent className="min-w-0 lg:col-span-5">
              <SpotlightCard
                className="h-full rounded-2xl border border-white/10 bg-bg-card p-6 sm:p-9"
                spotlightColor="rgba(232, 121, 249, 0.18)"
              >
                <TituloGrupo color="#E879F9">Sabe cuándo pasar a una persona</TituloGrupo>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {PASA_A_PERSONA.map((t) => (
                    <li key={t} className="rounded-full border border-magenta/25 bg-magenta/[0.06] px-3 py-1.5 text-[12.5px] text-ink/90">
                      {t}
                    </li>
                  ))}
                </ul>
                <ul className="mt-7 space-y-6">
                  <Punto titulo="Abre un caso con el contexto">
                    Y lo asigna al equipo correcto. Nadie tiene que volver a preguntarle al huésped qué
                    necesitaba.
                  </Punto>
                  <Punto titulo="Fuera de horario, dice la hora">
                    Le informa al huésped a qué hora le van a escribir. No promete una respuesta inmediata
                    que su equipo no puede dar.
                  </Punto>
                  <Punto titulo="Si su equipo escribe, Sofía se calla">
                    Solo en ese chat. Se lo devuelven con un clic.
                  </Punto>
                </ul>
              </SpotlightCard>
            </AnimatedContent>

            {/* No inventa */}
            <AnimatedContent delay={0.08} className="min-w-0 lg:col-span-7">
              <div className="border-grad h-full rounded-2xl bg-bg-card p-6 sm:p-9">
                <TituloGrupo color="#67E8F9">No inventa</TituloGrupo>
                <p className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-muted">
                  Un agente que improvisa un precio le cuesta el huésped y la reputación. Sofía tiene
                  cerrados los caminos por donde eso pasa.
                </p>
                <dl className="mt-6 divide-y divide-white/[0.07] border-y border-white/[0.07]">
                  {NO_INVENTA.map(([k, v]) => (
                    <div key={k} className="grid gap-1 py-3.5 sm:grid-cols-[170px_minmax(0,1fr)] sm:gap-6">
                      <dt className="font-display text-[15px] font-semibold text-ink">{k}</dt>
                      <dd className="text-[14.5px] leading-relaxed text-muted">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </AnimatedContent>
          </div>
        </div>
      </section>

      {/* ── El panel ── */}
      <section id="panel" className="relative scroll-mt-24 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Cabecera
            eyebrow="Su panel"
            titulo="Usted ve todo lo que Sofía"
            grad="conversa y cierra"
          />

          <AnimatedContent className="mt-12 sm:mt-14">
            <PanelShowcase />
          </AnimatedContent>

          <dl className="mt-12 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {PANEL.map(([k, v], i) => (
              <AnimatedContent key={k} delay={(i % 3) * 0.06} distance={30}>
                <div className="border-l border-white/10 pl-4">
                  <dt className="font-display text-[15px] font-semibold text-ink">{k}</dt>
                  <dd className="mt-1 text-[14px] leading-relaxed text-muted">{v}</dd>
                </div>
              </AnimatedContent>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Puesta en marcha ── */}
      <section id="arranque" className="relative scroll-mt-24 border-t border-white/5 bg-bg-soft/60 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Cabecera eyebrow="Puesta en marcha" titulo="De su hotel de hoy a" grad="Sofía encendida" />

          <ol className="relative mt-12 grid gap-8 sm:mt-16 md:grid-cols-5 md:gap-5">
            <span
              className="absolute left-5 top-5 hidden h-px w-[80%] bg-gradient-to-r from-cyan/50 via-violet/50 to-magenta/50 md:block"
              aria-hidden="true"
            />
            {ARRANQUE.map(([k, v], i) => (
              <li key={k}>
                <AnimatedContent delay={i * 0.08} distance={30} className="relative flex gap-4 md:block">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-display text-sm font-semibold ${
                      i === ARRANQUE.length - 1
                        ? 'border-transparent text-bg [background:var(--grad)]'
                        : 'border-white/15 bg-bg-card text-ink'
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div className="md:mt-5">
                    <h3 className="font-display text-[17px] font-semibold">{k}</h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{v}</p>
                  </div>
                </AnimatedContent>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Cierre ── */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <Aurora dots={false} />
        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
          <AnimatedContent>
            <h2 className="text-balance font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
              La próxima reserva de esta noche <span className="text-grad">puede quedar confirmada</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-muted sm:text-lg">
              Escríbanos por WhatsApp y cuéntenos de su hotel: cuántas habitaciones tiene, qué PMS usa y por
              dónde le escriben sus huéspedes.
            </p>
            <div className="mt-9 flex justify-center">
              <Cta />
            </div>
          </AnimatedContent>
        </div>
      </section>
    </SiteShell>
  )
}
