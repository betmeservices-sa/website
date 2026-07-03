'use client'

// React Bits · SpotlightCard — halo que sigue al cursor.
import { useRef, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  spotlightColor?: string
}

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(139, 92, 246, 0.22)',
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={`group relative overflow-hidden ${className}`}
      style={{ '--spot-color': spotlightColor } as React.CSSProperties}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(440px circle at var(--spot-x, 50%) var(--spot-y, 0%), var(--spot-color), transparent 66%)',
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}
