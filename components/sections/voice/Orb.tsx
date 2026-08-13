'use client'

// Orbe de la sección de voz: aro cónico girando, anillos pulsantes en llamada
// y centro variable (ecualizador, icono o el rostro del agente).
import type { ReactNode } from 'react'
import Icon from '@/components/ui/Icon'

export type OrbPhase = 'idle' | 'connecting' | 'active' | 'ended'

const bars = [0.35, 0.6, 0.95, 0.75, 1, 0.65, 0.45]

export function Equalizer({ className = 'h-10' }: { className?: string }) {
  return (
    <span className={`flex items-end gap-1 ${className}`}>
      {bars.map((h, i) => (
        <span
          key={i}
          className="w-1.5 rounded-full"
          style={{
            height: `${h * 100}%`,
            background: 'linear-gradient(#67E8F9, #E879F9)',
            animation: `eq ${0.7 + i * 0.09}s ease-in-out ${i * 0.06}s infinite`,
          }}
        />
      ))}
    </span>
  )
}

export default function Orb({
  phase,
  onClick,
  label,
  face,
  center,
  rings,
}: {
  phase: OrbPhase
  onClick: () => void
  label: string
  /** Ocupa el disco interior (video del agente). */
  face?: ReactNode
  /** Reemplaza el contenido central. `null` lo deja vacío. */
  center?: ReactNode
  /** Anillos pulsantes. Por defecto, cuando la llamada está activa. */
  rings?: boolean
}) {
  const showRings = rings ?? phase === 'active'
  const defaultCenter =
    phase === 'active' ? (
      <Equalizer />
    ) : (
      <Icon name="phone" className={`h-10 w-10 ${phase === 'ended' ? 'text-muted' : 'text-cyan'}`} />
    )

  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="group relative flex h-48 w-48 items-center justify-center rounded-full transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60 sm:h-56 sm:w-56"
    >
      {/* Anillos pulsantes en llamada */}
      {showRings && (
        <>
          <span className="absolute inset-0 rounded-full border border-cyan/40" style={{ animation: 'pulse-ring 2.2s ease-out infinite' }} />
          <span className="absolute inset-0 rounded-full border border-magenta/40" style={{ animation: 'pulse-ring 2.2s ease-out 0.7s infinite' }} />
          <span className="absolute inset-0 rounded-full border border-violet/40" style={{ animation: 'pulse-ring 2.2s ease-out 1.4s infinite' }} />
        </>
      )}

      {/* Aro cónico girando */}
      <span
        className={`absolute inset-0 rounded-full ${phase === 'active' ? 'animate-spin-slow' : ''}`}
        style={{ background: 'conic-gradient(from 0deg, #22D3EE, #8B5CF6, #E879F9, #22D3EE)', opacity: phase === 'idle' ? 0.75 : 1 }}
      />
      <span className="absolute inset-[3px] rounded-full bg-bg" />
      <span className="absolute inset-[10px] rounded-full bg-bg-card glow-violet" />

      {/* Rostro del agente, recortado al disco interior */}
      {face && <span className="absolute inset-[10px] overflow-hidden rounded-full">{face}</span>}

      {/* Contenido central */}
      <span className="relative z-10 flex flex-col items-center gap-3">
        {center === undefined ? defaultCenter : center}
      </span>
    </button>
  )
}
