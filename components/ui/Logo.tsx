// Wordmark de MiAgentIA recreado en CSS/SVG (crujiente, temeable, animado).
// Insignia circular con ecualizador de voz + "miagent" en tinta y "iA" en gradiente.

export default function Logo({ className = '', showText = true }: { className?: string; showText?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} aria-label="MiAgentIA">
      <VoiceBadge />
      {showText && (
        <span className="font-display text-[1.35em] font-semibold leading-none tracking-tight">
          <span className="text-ink">miagent</span>
          <span className="text-grad">iA</span>
        </span>
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
