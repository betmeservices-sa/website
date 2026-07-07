'use client'

import { useRef } from 'react'

// Mascota de voz + chat (robot.mp4). Se funde con el fondo por mix-blend-screen
// (el negro del video desaparece); máscara radial de respaldo para desvanecer
// los bordes del rectángulo. Loop suave: en vez de reiniciar desde 0 (salto
// visible), regresa 2s antes del final y se queda repitiendo ese tramo.
const LOOP_WINDOW = 2

export default function RobotMascot({ className = '' }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const seekBack = () => {
    const v = videoRef.current
    if (!v || !isFinite(v.duration)) return
    v.currentTime = Math.max(0, v.duration - LOOP_WINDOW)
    if (v.paused) v.play().catch(() => {})
  }

  const onTimeUpdate = () => {
    const v = videoRef.current
    if (!v || !isFinite(v.duration)) return
    // timeupdate dispara cada ~250ms; margen para alcanzar a saltar antes del fin
    if (v.currentTime >= v.duration - 0.3) seekBack()
  }

  return (
    <video
      ref={videoRef}
      src="/robot.mp4"
      autoPlay
      muted
      playsInline
      onTimeUpdate={onTimeUpdate}
      onEnded={seekBack}
      aria-hidden="true"
      className={`pointer-events-none mix-blend-screen animate-float [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_58%,transparent_84%)] ${className}`}
    />
  )
}
