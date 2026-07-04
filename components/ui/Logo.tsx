// Logo de MiAgentIA: insignia circular ANIMADA (ecualizador de voz en CSS)
// en el espacio de la bolita original + wordmark oficial en PNG con alpha real
// (colorkey sobre el negro; mix-blend no sirve aquí: el header fixed+z-50
// crea un stacking context que bloquea el fundido).

export default function Logo({ className = '', showText = true }: { className?: string; showText?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`} aria-label="MiAgentIA">
      <VoiceBadge />
      {showText && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/brand/wordmark.png"
          alt="miagentiA"
          width={520}
          height={148}
          className="h-[1.85em] w-auto select-none"
          draggable={false}
        />
      )}
    </span>
  )
}

export function VoiceBadge({ className = '' }: { className?: string }) {
  const bars = [0.45, 0.85, 1, 0.7, 0.5]
  return (
    <span
      className={`relative inline-flex h-[1.5em] w-[1.5em] items-center justify-center rounded-full ${className}`}
      style={{ background: 'conic-gradient(from 140deg, #22D3EE, #8B5CF6, #E879F9, #22D3EE)' }}
    >
      <span className="absolute inset-[2px] rounded-full bg-bg" />
      <span className="relative flex h-1/2 items-end gap-[2px]">
        {bars.map((h, i) => (
          <span
            key={i}
            className="w-[2px] rounded-full"
            style={{
              height: `${h * 100}%`,
              background: 'linear-gradient(#67E8F9, #E879F9)',
              animation: `eq ${0.9 + i * 0.12}s ease-in-out ${i * 0.08}s infinite`,
            }}
          />
        ))}
      </span>
    </span>
  )
}
