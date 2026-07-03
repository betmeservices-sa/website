'use client'

// React Bits · CountUp — anima un número de 0 al valor al entrar en vista.
import { animate, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface Props {
  to: number
  duration?: number
  className?: string
  suffix?: string
  prefix?: string
}

export default function CountUp({ to, duration = 2, className = '', suffix = '', prefix = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(v),
    })
    return () => controls.stop()
  }, [inView, to, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {Math.round(value)}
      {suffix}
    </span>
  )
}
