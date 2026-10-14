'use client'

// Cobro simulado. Lo usan las dos pantallas que cobran (la suscripción y el
// fee de implementación), así que el formulario de tarjeta existe una sola vez.
//
// SIMULACIÓN: no hay pasarela. El "procesando" es un timer y la tarjeta nunca
// sale del componente (no se guarda en el estado ni en el navegador).

import { useState } from 'react'
import Icon from '@/components/ui/Icon'
import { dinero } from './catalogo'
import { Titulo } from './piezas'

export type Linea = { concepto: string; detalle?: string; monto: number }

export default function Checkout({
  eyebrow,
  titulo,
  bajada,
  lineas,
  periodico,
  textoBoton,
  onPagado,
  debajo,
}: {
  eyebrow: string
  titulo: React.ReactNode
  bajada: string
  lineas: Linea[]
  periodico?: boolean
  textoBoton: string
  onPagado: () => void
  // Lo que va bajo el formulario. Entra por acá y no al lado del Checkout en
  // la página, para que desaparezca junto con él cuando el pago se aprueba.
  debajo?: React.ReactNode
}) {
  const [nombre, setNombre] = useState('')
  const [numero, setNumero] = useState('4242 4242 4242 4242')
  const [vence, setVence] = useState('12 / 29')
  const [cvc, setCvc] = useState('123')
  const [estado, setEstado] = useState<'quieto' | 'cobrando' | 'listo'>('quieto')

  const total = lineas.reduce((s, l) => s + l.monto, 0)
  const puede = Boolean(nombre.trim() && numero.trim() && vence.trim() && cvc.trim())

  function cobrar() {
    if (!puede || estado !== 'quieto') return
    setEstado('cobrando')
    // El cliente tiene que ver que algo pasó. Dos segundos es lo que tarda un
    // cobro real, y es lo que hace creíble el recibo que sale después.
    setTimeout(() => {
      setEstado('listo')
      setTimeout(onPagado, 1100)
    }, 2000)
  }

  if (estado === 'listo') {
    return <Aprobado total={total} periodico={periodico} />
  }

  return (
    <>
      <Titulo eyebrow={eyebrow} bajada={bajada}>
        {titulo}
      </Titulo>

      <div className="mt-9 grid gap-5 lg:grid-cols-[1fr_380px]">
        <div className="rounded-2xl border border-white/10 bg-bg-card p-6 sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-[15px] font-semibold text-ink">Datos de pago</h2>
            <div className="flex items-center gap-1.5">
              <Marcas />
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <CampoPago
              etiqueta="Nombre en la tarjeta"
              valor={nombre}
              onChange={setNombre}
              placeholder="Como aparece impreso"
            />
            <CampoPago
              etiqueta="Número de tarjeta"
              valor={numero}
              onChange={(v) => setNumero(agrupar(v))}
              placeholder="0000 0000 0000 0000"
              inputMode="numeric"
              mono
            />
            <div className="grid grid-cols-2 gap-4">
              <CampoPago etiqueta="Vence" valor={vence} onChange={setVence} placeholder="MM / AA" mono />
              <CampoPago etiqueta="CVC" valor={cvc} onChange={setCvc} placeholder="000" mono />
            </div>
          </div>

          <button
            type="button"
            onClick={cobrar}
            disabled={!puede || estado === 'cobrando'}
            className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-bg transition-all duration-300 [background:var(--grad)] hover:-translate-y-0.5 hover:glow-violet disabled:pointer-events-none disabled:opacity-40"
          >
            {estado === 'cobrando' ? (
              <>
                <Girador />
                Procesando
              </>
            ) : (
              <>
                {textoBoton} {dinero(total)}
                <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </button>

          <p className="mt-4 text-center text-xs leading-relaxed text-muted">
            Simulación: no se cobra nada y la tarjeta no se guarda. Deja la de prueba o escribe
            cualquier número.
          </p>
        </div>

        <aside className="h-fit rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <h2 className="font-display text-[15px] font-semibold text-ink">Tu orden</h2>
          <ul className="mt-5 space-y-4">
            {lineas.map((l) => (
              <li key={l.concepto} className="flex items-start justify-between gap-4">
                <span className="min-w-0">
                  <span className="block text-sm text-ink">{l.concepto}</span>
                  {l.detalle && <span className="mt-0.5 block text-xs text-muted">{l.detalle}</span>}
                </span>
                <span className="shrink-0 font-display text-sm font-semibold text-ink">
                  {dinero(l.monto)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-5 h-px bg-white/10" />
          <div className="mt-5 flex items-baseline justify-between gap-4">
            <span className="font-display text-[11px] uppercase tracking-[0.16em] text-muted">
              Total hoy
            </span>
            <span className="font-display text-2xl font-semibold text-ink">{dinero(total)}</span>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted">
            {periodico
              ? 'Se renueva cada mes y lo puedes cancelar cuando quieras.'
              : 'Pago único, no se renueva.'}
          </p>
        </aside>
      </div>
      {debajo}
    </>
  )
}

function Aprobado({ total, periodico }: { total: number; periodico?: boolean }) {
  return (
    <div className="flex min-h-[55vh] flex-col items-center justify-center text-center">
      <span className="grid h-16 w-16 place-items-center rounded-full glow-violet [background:var(--grad)]">
        <Icon name="check" className="h-8 w-8 text-bg" strokeWidth={2.6} />
      </span>
      <h2 className="mt-7 font-display text-2xl font-semibold text-ink">Pago aprobado</h2>
      <p className="mt-2 text-sm text-muted">
        {dinero(total)} {periodico ? 'al mes' : 'de pago único'}
      </p>
    </div>
  )
}

function CampoPago({
  etiqueta,
  valor,
  onChange,
  placeholder,
  inputMode,
  mono = false,
}: {
  etiqueta: string
  valor: string
  onChange: (v: string) => void
  placeholder?: string
  inputMode?: 'numeric'
  mono?: boolean
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-display text-[11px] uppercase tracking-[0.16em] text-muted">
        {etiqueta}
      </span>
      <input
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        className={`w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-cyan/50 focus:bg-white/[0.05] ${
          mono ? 'tracking-[0.08em]' : ''
        }`}
      />
    </label>
  )
}

/** Agrupa de cuatro en cuatro mientras se escribe. No valida nada. */
function agrupar(v: string): string {
  const digitos = v.replace(/[^0-9]/g, '').slice(0, 19)
  return digitos.replace(/(.{4})/g, '$1 ').trim()
}

function Girador() {
  return <span className="h-4 w-4 animate-spin rounded-full border-2 border-bg/30 border-t-bg" />
}

function Marcas() {
  return (
    <>
      {['VISA', 'MC', 'AMEX'].map((m) => (
        <span
          key={m}
          className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-1 text-[9px] font-semibold tracking-wider text-muted"
        >
          {m}
        </span>
      ))}
    </>
  )
}
