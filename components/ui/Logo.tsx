// Logo de MiAgentIA: insignia circular ANIMADA (ecualizador de voz en CSS)
// en el espacio de la bolita original + wordmark oficial en PNG con alpha real
// (colorkey sobre el negro; mix-blend no sirve aquí: el header fixed+z-50
// crea un stacking context que bloquea el fundido).

export default function Logo({ className = '', showText = true }: { className?: string; showText?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-[0.09em] ${className}`} aria-label="MiAgentIA">
      {/* Bolita al tamaño del logo original: igual a la altura-x de las letras */}
      <VoiceBadge className="h-[1.15em] w-[1.15em]" />
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

// Barras del ecualizador en SVG: escalan perfecto a cualquier tamaño de
// círculo (en px fijos se desbordaban en insignias pequeñas).
//
// Cada barra lleva su propia curva (voiceA..voiceE) y una duración que no es
// múltiplo de las otras, para que el conjunto NUNCA se vuelva a alinear. Un
// ecualizador de música rebota a compás; la voz tiene ataques secos y pausas.
// Si igualas las duraciones, vuelve a sonar a música.
const BARS = [
  { x: 5.3,  h: 5,  anim: 'voiceA', dur: 1.37 },
  { x: 8.2,  h: 8,  anim: 'voiceD', dur: 1.73 },
  { x: 11.1, h: 11, anim: 'voiceC', dur: 2.11 },
  { x: 14.0, h: 7,  anim: 'voiceB', dur: 1.57 },
  { x: 16.9, h: 5,  anim: 'voiceE', dur: 1.93 },
]

export function VoiceBadge({ className = 'h-[1.5em] w-[1.5em]' }: { className?: string }) {
  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center rounded-full ${className}`}
      // Base oscura + anillo cónico encima. La base (#05050A) evita que el badge
      // se vea claro/blanco en móviles que no pintan bien el conic-gradient.
      style={{
        backgroundColor: '#05050A',
        backgroundImage: 'conic-gradient(from 140deg, #22D3EE, #8B5CF6, #E879F9, #22D3EE)',
      }}
    >
      <span className="absolute rounded-full" style={{ inset: '8%', background: '#05050A' }} />
      <svg viewBox="0 0 24 24" className="relative h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="eq-grad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#67E8F9" />
            <stop offset="1" stopColor="#E879F9" />
          </linearGradient>
        </defs>
        {BARS.map((b, i) => (
          <rect
            key={i}
            x={b.x}
            y={17.5 - b.h}
            width="1.8"
            height={b.h}
            rx="0.9"
            fill="url(#eq-grad)"
            className="voice-bar"
            style={{
              transformOrigin: `${b.x + 0.9}px 17.5px`,
              animation: `${b.anim} ${b.dur}s cubic-bezier(.3,.9,.4,1) ${i * 0.11}s infinite`,
            }}
          />
        ))}
      </svg>
    </span>
  )
}
