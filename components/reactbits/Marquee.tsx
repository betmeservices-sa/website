'use client'

// Marquee — cinta infinita (duplica el contenido y desplaza -50%).
import type { ReactNode } from 'react'

export default function Marquee({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
        style={{ background: 'linear-gradient(to right, var(--color-bg), transparent)' }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
        style={{ background: 'linear-gradient(to left, var(--color-bg), transparent)' }}
      />
      <div className="marquee-track gap-4">
        {children}
        {children}
      </div>
    </div>
  )
}
