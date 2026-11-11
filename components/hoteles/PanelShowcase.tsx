'use client'

// Maquetas del panel del hotel, hechas en codigo (no son capturas). Tres vistas
// con pestanas. Los datos son de ejemplo y donde iria una cifra del negocio hay
// una forma sin numero: la pagina no publica resultados de nadie.
import { useState, type ReactNode } from 'react'
import Icon from '@/components/ui/Icon'
import { CanalIcon, type Canal } from './CanalIcon'

const VISTAS = [
  { id: 'bandeja', label: 'Bandeja' },
  { id: 'tablero', label: 'Tablero' },
  { id: 'promos', label: 'Promociones' },
] as const
type Vista = (typeof VISTAS)[number]['id']

const TINTE: Record<Canal, string> = {
  whatsapp: 'text-emerald-400',
  instagram: 'text-magenta',
  messenger: 'text-cyan',
  facebook: 'text-violet',
}

function Etiqueta({ children, tono = 'neutro' }: { children: ReactNode; tono?: 'neutro' | 'sofia' | 'equipo' | 'ok' }) {
  const tonos = {
    neutro: 'border-white/10 text-muted',
    sofia: 'border-violet/40 bg-violet/10 text-[#C4B5FD]',
    equipo: 'border-magenta/40 bg-magenta/10 text-magenta',
    ok: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
  }
  return (
    <span className={`inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${tonos[tono]}`}>
      {children}
    </span>
  )
}

const CHATS: { canal: Canal; nombre: string; texto: string; hotel: string; estado: 'sofia' | 'equipo' }[] = [
  { canal: 'whatsapp', nombre: 'Carolina M.', texto: 'Le envío el comprobante', hotel: 'Hotel A', estado: 'sofia' },
  { canal: 'instagram', nombre: 'Andrés R.', texto: '¿La promoción aplica el sábado?', hotel: 'Hotel B', estado: 'sofia' },
  { canal: 'messenger', nombre: 'Familia Ortiz', texto: 'Necesitamos cambiar la fecha', hotel: 'Hotel A', estado: 'equipo' },
  { canal: 'facebook', nombre: 'Comentario en una publicación', texto: '¿Precio del Day Pass?', hotel: 'Hotel C', estado: 'sofia' },
  { canal: 'whatsapp', nombre: 'Luis P.', texto: 'Somos 9, ¿cómo quedarían las habitaciones?', hotel: 'Hotel B', estado: 'sofia' },
]

function Bandeja() {
  return (
    <div className="grid min-h-[340px] grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
      <ul className="min-w-0 divide-y divide-white/[0.06] md:border-r md:border-white/[0.06]">
        {CHATS.map((c, i) => (
          <li key={c.nombre} className={`flex items-center gap-3 px-4 py-3 ${i === 2 ? 'bg-white/[0.04]' : ''}`}>
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] ${TINTE[c.canal]}`}>
              <CanalIcon canal={c.canal} className="h-[18px] w-[18px]" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-medium text-ink">{c.nombre}</p>
              <p className="truncate text-[12px] text-muted">{c.texto}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <Etiqueta>{c.hotel}</Etiqueta>
              <Etiqueta tono={c.estado}>{c.estado === 'sofia' ? 'Sofía' : 'Equipo'}</Etiqueta>
            </div>
          </li>
        ))}
      </ul>

      {/* Hilo abierto: un caso que Sofía pasó a una persona */}
      <div className="hidden flex-col md:flex">
        <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-5 py-3">
          <p className="text-[13px] font-medium">Familia Ortiz</p>
          <Etiqueta tono="equipo">Lo atiende Reservas</Etiqueta>
        </div>
        <div className="flex flex-1 flex-col justify-end gap-2 px-5 py-4 text-[12.5px]">
          <p className="max-w-[80%] self-start rounded-2xl rounded-bl-md bg-white/[0.06] px-3 py-2">
            Necesitamos cambiar la fecha de la reserva
          </p>
          <div className="rounded-xl border border-magenta/25 bg-magenta/[0.06] px-3 py-2.5">
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-magenta">Caso abierto por Sofía</p>
            <p className="mt-1 text-ink/90">
              Cambio de fecha. La huésped ya tiene una reserva confirmada y quiere moverla una semana.
            </p>
          </div>
          <p className="max-w-[80%] self-end rounded-2xl rounded-br-md border border-white/10 bg-white/[0.03] px-3 py-2 text-ink/90">
            Con gusto, reviso la disponibilidad y le confirmo.
          </p>
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-white/[0.06] px-5 py-3">
          <p className="text-[12px] text-muted">Sofía en silencio en este chat</p>
          <span className="rounded-full border border-white/15 px-3 py-1.5 text-[11.5px] font-medium text-ink">
            Devolver a Sofía
          </span>
        </div>
      </div>
    </div>
  )
}

function Mosaico({ titulo, alturas }: { titulo: string; alturas: number[] }) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5">
      <p className="text-[11px] uppercase tracking-wider text-muted">{titulo}</p>
      <div className="mt-3 flex h-10 items-end gap-1">
        {alturas.map((h, i) => (
          <span
            key={i}
            className="flex-1 rounded-sm [background:var(--grad)]"
            style={{ height: `${h}%`, opacity: 0.35 + (i / alturas.length) * 0.55 }}
          />
        ))}
      </div>
    </div>
  )
}

function Tablero() {
  return (
    <div className="min-h-[340px] p-4 sm:p-5">
      <div className="flex flex-wrap gap-1.5">
        {['Grupo', 'Hotel A', 'Hotel B', 'Hotel C'].map((h, i) => (
          <span
            key={h}
            className={`rounded-full border px-3 py-1 text-[11.5px] ${
              i === 0 ? 'border-white/25 bg-white/[0.07] text-ink' : 'border-white/10 text-muted'
            }`}
          >
            {h}
          </span>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Mosaico titulo="Ocupación" alturas={[48, 60, 52, 74, 88, 96, 70]} />
        <Mosaico titulo="Llegadas" alturas={[30, 42, 36, 58, 92, 80, 40]} />
        <Mosaico titulo="Salidas" alturas={[60, 34, 30, 40, 52, 78, 94]} />
        <Mosaico titulo="Ingreso" alturas={[40, 52, 48, 66, 90, 100, 72]} />
      </div>
      <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5">
          <p className="text-[11px] uppercase tracking-wider text-muted">Qué piden los huéspedes</p>
          <ul className="mt-3 space-y-2.5">
            {[
              ['Reservas', 92],
              ['Day Pass', 64],
              ['Promociones', 51],
              ['Horarios y ubicación', 38],
              ['Membresías', 20],
            ].map(([tema, w]) => (
              <li key={tema as string}>
                <p className="text-[12px] text-ink/90">{tema}</p>
                <span className="mt-1 block h-1.5 rounded-full bg-violet/70" style={{ width: `${w}%` }} />
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5">
          <p className="text-[11px] uppercase tracking-wider text-muted">Reservas que confirmó Sofía</p>
          <ul className="mt-2 divide-y divide-white/[0.06]">
            {[
              ['48213', 'Suite frente al mar', 'Hotel A'],
              ['48209', 'Estándar vista al jardín', 'Hotel C'],
              ['48201', 'Familiar, 2 habitaciones', 'Hotel B'],
            ].map(([num, hab, hotel]) => (
              <li key={num} className="flex items-center gap-3 py-2.5">
                <span className="font-display text-[12.5px] font-semibold text-ink">N.º {num}</span>
                <span className="min-w-0 flex-1 truncate text-[12px] text-muted">
                  {hab} · {hotel}
                </span>
                <span className="inline-flex shrink-0 items-center gap-1 text-[11.5px] font-medium text-cyan">
                  Ver chat <Icon name="arrow" className="h-3 w-3" />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function Interruptor({ on }: { on: boolean }) {
  return (
    <span
      className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${on ? '[background:var(--grad)]' : 'bg-white/15'}`}
    >
      <span
        className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${on ? 'left-[18px]' : 'left-0.5'}`}
      />
    </span>
  )
}

function Promos() {
  const [activas, setActivas] = useState([true, false, true])
  const promos = [
    { nombre: 'Venta relámpago de fin de semana', hotel: 'Hotel A' },
    { nombre: 'Tercera noche con descuento', hotel: 'Hotel B' },
    { nombre: 'Day Pass en pareja', hotel: 'Hotel C' },
  ]
  return (
    <div className="min-h-[340px] p-4 sm:p-5">
      <ul className="space-y-3">
        {promos.map((p, i) => (
          <li key={p.nombre} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
            <div className="flex items-center gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-medium text-ink">{p.nombre}</p>
                <p className="mt-0.5 text-[12px] text-muted">{p.hotel} · precio, vigencia y restricciones</p>
              </div>
              <button
                type="button"
                onClick={() => setActivas((a) => a.map((v, j) => (j === i ? !v : v)))}
                aria-pressed={activas[i]}
                aria-label={`${activas[i] ? 'Apagar' : 'Encender'} ${p.nombre}`}
                className="flex items-center"
              >
                <Interruptor on={activas[i]} />
              </button>
            </div>
            <p className={`mt-3 text-[12px] ${activas[i] ? 'text-emerald-300' : 'text-white/40'}`}>
              {activas[i] ? 'Sofía la está ofreciendo' : 'Apagada: Sofía no la menciona'}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function PanelShowcase() {
  const [vista, setVista] = useState<Vista>('bandeja')

  return (
    <div>
      <div className="border-grad overflow-hidden rounded-2xl bg-[#090912] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)] sm:rounded-3xl">
        <div className="flex items-center gap-3 border-b border-white/[0.07] bg-white/[0.03] px-3 py-2.5 sm:px-4">
          <span className="hidden gap-1.5 sm:flex" aria-hidden="true">
            <i className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <i className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <i className="h-2.5 w-2.5 rounded-full bg-white/15" />
          </span>
          <div role="tablist" aria-label="Vistas del panel" className="flex gap-1">
            {VISTAS.map((v) => (
              <button
                key={v.id}
                role="tab"
                type="button"
                aria-selected={vista === v.id}
                onClick={() => setVista(v.id)}
                className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition-colors ${
                  vista === v.id ? 'bg-white/10 text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
        <div role="tabpanel">
          {vista === 'bandeja' && <Bandeja />}
          {vista === 'tablero' && <Tablero />}
          {vista === 'promos' && <Promos />}
        </div>
      </div>
      <p className="mt-3 text-center text-[11px] text-white/35">Maqueta con datos de ejemplo.</p>
    </div>
  )
}
