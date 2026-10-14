'use client'

// Piezas de formulario del portal. Existen para que las seis pantallas usen
// el mismo campo y el mismo foco, y para no repetir veinte clases de Tailwind
// en cada input.

import Icon from '@/components/ui/Icon'

const CAMPO =
  'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-cyan/50 focus:bg-white/[0.05]'

export function Titulo({
  eyebrow,
  children,
  bajada,
}: {
  eyebrow: string
  children: React.ReactNode
  bajada?: string
}) {
  return (
    <div className="mt-12 sm:mt-14">
      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-muted">
        <span className="h-1.5 w-1.5 rounded-full [background:var(--grad)]" />
        {eyebrow}
      </span>
      <h1 className="mt-5 font-display text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-ink sm:text-[2.6rem]">
        {children}
      </h1>
      {bajada && <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">{bajada}</p>}
    </div>
  )
}

export function Campo({
  etiqueta,
  valor,
  onChange,
  tipo = 'text',
  placeholder,
  ancho = '',
}: {
  etiqueta: string
  valor: string
  onChange: (v: string) => void
  tipo?: string
  placeholder?: string
  ancho?: string
}) {
  return (
    <label className={`block ${ancho}`}>
      <span className="mb-2 block font-display text-[11px] uppercase tracking-[0.16em] text-muted">
        {etiqueta}
      </span>
      <input
        type={tipo}
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={CAMPO}
      />
    </label>
  )
}

export function Area({
  etiqueta,
  valor,
  onChange,
  placeholder,
  filas = 3,
}: {
  etiqueta: string
  valor: string
  onChange: (v: string) => void
  placeholder?: string
  filas?: number
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-display text-[11px] uppercase tracking-[0.16em] text-muted">
        {etiqueta}
      </span>
      <textarea
        rows={filas}
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${CAMPO} resize-y leading-relaxed`}
      />
    </label>
  )
}

export function Lista({
  etiqueta,
  valor,
  onChange,
  opciones,
}: {
  etiqueta: string
  valor: string
  onChange: (v: string) => void
  opciones: string[]
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-display text-[11px] uppercase tracking-[0.16em] text-muted">
        {etiqueta}
      </span>
      <div className="relative">
        <select
          value={valor}
          onChange={(e) => onChange(e.target.value)}
          className={`${CAMPO} appearance-none pr-10`}
        >
          <option value="">Elegir</option>
          {opciones.map((o) => (
            <option key={o} value={o} className="bg-bg-card text-ink">
              {o}
            </option>
          ))}
        </select>
        <Icon name="chevron" className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
      </div>
    </label>
  )
}

/** Tarjeta de opción única. */
export function Opcion({
  activa,
  onClick,
  titulo,
  desc,
}: {
  activa: boolean
  onClick: () => void
  titulo: string
  desc?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={activa}
      className={`rounded-2xl p-5 text-left transition-all duration-200 ${
        activa
          ? 'border-grad glass -translate-y-0.5'
          : 'border border-white/10 bg-bg-card hover:border-white/20'
      }`}
    >
      <span className="flex items-start justify-between gap-3">
        <span className="font-display text-[15px] font-semibold text-ink">{titulo}</span>
        <Marca activa={activa} />
      </span>
      {desc && <span className="mt-2 block text-sm leading-relaxed text-muted">{desc}</span>}
    </button>
  )
}

/** Fichas de selección múltiple en una fila. */
export function Fichas({
  etiqueta,
  opciones,
  elegidas,
  onToggle,
}: {
  etiqueta: string
  opciones: readonly string[]
  elegidas: string[]
  onToggle: (v: string) => void
}) {
  return (
    <div>
      <span className="mb-2.5 block font-display text-[11px] uppercase tracking-[0.16em] text-muted">
        {etiqueta}
      </span>
      <div className="flex flex-wrap gap-2">
        {opciones.map((o) => {
          const activa = elegidas.includes(o)
          return (
            <button
              key={o}
              type="button"
              onClick={() => onToggle(o)}
              aria-pressed={activa}
              className={`rounded-full px-4 py-2 text-sm transition-all duration-200 ${
                activa
                  ? 'border border-cyan/50 bg-cyan/10 text-ink'
                  : 'border border-white/10 bg-white/[0.02] text-muted hover:border-white/25 hover:text-ink'
              }`}
            >
              {o}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function Marca({ activa }: { activa: boolean }) {
  return (
    <span
      className={`grid h-5 w-5 shrink-0 place-items-center rounded-full transition-all ${
        activa ? '[background:var(--grad)]' : 'border border-white/20'
      }`}
    >
      {activa && <Icon name="check" className="h-3 w-3 text-bg" strokeWidth={3} />}
    </span>
  )
}

/** Barra inferior fija con el total y el botón que avanza. */
export function Barra({
  izquierda,
  children,
}: {
  izquierda: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="sticky bottom-0 z-20 -mx-5 mt-10 border-t border-white/10 bg-bg/85 px-5 py-4 backdrop-blur-xl sm:-mx-8 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="min-w-0">{izquierda}</div>
        <div className="flex items-center gap-3">{children}</div>
      </div>
    </div>
  )
}

export function Avanzar({
  children,
  onClick,
  disabled = false,
}: {
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-bg transition-all duration-300 [background:var(--grad)] hover:-translate-y-0.5 hover:glow-violet focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60 disabled:pointer-events-none disabled:opacity-35"
    >
      {children}
      <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </button>
  )
}
