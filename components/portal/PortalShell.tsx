'use client'

// Cascarón del portal: fondo de marca, cabecera y el riel de pasos.
//
// No monta el Navbar del sitio a propósito. Esto es un flujo de contratación:
// mientras se está pagando, un menú que lleva a "Industrias" solo saca al
// cliente del recorrido. El logo sí vuelve al sitio.

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from '@/components/ui/Logo'
import Icon from '@/components/ui/Icon'
import { PortalProvider, usePortal } from './estado'

const PASOS = [
  { href: '/portal', corto: 'Plan' },
  { href: '/portal/pago', corto: 'Pago' },
  { href: '/portal/guion', corto: 'Guion' },
  { href: '/portal/funciones', corto: 'Funciones' },
  { href: '/portal/implementacion', corto: 'Implementación' },
  { href: '/portal/cita', corto: 'Cita' },
]

export default function PortalShell({ children }: { children: React.ReactNode }) {
  return (
    <PortalProvider>
      <div className="relative min-h-screen overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="aurora-blob aurora-1 opacity-40" />
          <div className="aurora-blob aurora-2 opacity-30" />
          <div className="tech-grid absolute inset-0" />
        </div>

        <div className="relative mx-auto max-w-5xl px-5 pb-24 pt-7 sm:px-8">
          <header className="flex items-center justify-between gap-4">
            <Link href="/" className="transition-opacity hover:opacity-80">
              <Logo className="text-lg" />
            </Link>
            <Simulacion />
          </header>

          <Riel />
          {children}
        </div>
      </div>
    </PortalProvider>
  )
}

// Queda claro desde arriba que no se está cobrando nada de verdad, y de paso
// da la salida para volver a empezar el recorrido en limpio.
function Simulacion() {
  const { reiniciar } = usePortal()
  return (
    <div className="flex items-center gap-3">
      <span className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-muted sm:inline-flex">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
        Simulación
      </span>
      <button
        onClick={reiniciar}
        className="text-xs text-muted underline decoration-white/20 underline-offset-4 transition-colors hover:text-ink"
      >
        Reiniciar
      </button>
    </div>
  )
}

function Riel() {
  const ruta = usePathname()
  const actual = PASOS.findIndex((p) => p.href === ruta)
  // En /portal/listo el recorrido terminó: los seis pasos quedan cumplidos.
  const indice = actual === -1 ? PASOS.length : actual

  return (
    <nav aria-label="Pasos" className="mt-7 flex items-center gap-1.5 sm:gap-2">
      {PASOS.map((p, i) => {
        const hecho = i < indice
        const aqui = i === indice
        return (
          <div key={p.href} className="flex min-w-0 flex-1 flex-col gap-2">
            <span
              className={`h-[3px] rounded-full ${
                hecho || aqui ? '[background:var(--grad)]' : 'bg-white/10'
              } ${aqui ? '' : hecho ? 'opacity-60' : ''}`}
            />
            {/* En un teléfono los seis rótulos caben a fuerza de recortarlos
                ("IMP…"), y recortado no dice nada. Ahí se muestra solo el paso
                en curso: las barras ya cuentan el avance. */}
            <span
              className={`items-center gap-1 font-display text-[10.5px] uppercase tracking-[0.14em] sm:flex sm:text-[11px] ${
                aqui ? 'flex text-ink' : 'hidden text-muted'
              }`}
            >
              {hecho && <Icon name="check" className="h-3 w-3 shrink-0 text-cyan" />}
              {/* En móvil solo se pinta este rótulo, así que puede salirse de
                  su columna: las de al lado están vacías. */}
              <span className="truncate max-sm:overflow-visible">{p.corto}</span>
            </span>
          </div>
        )
      })}
    </nav>
  )
}
