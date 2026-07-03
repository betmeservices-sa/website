'use client'

// React Bits · AnimatedContent — reveal en scroll con GSAP ScrollTrigger.
import { useEffect, useRef, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface Props {
  children: ReactNode
  className?: string
  distance?: number
  direction?: 'vertical' | 'horizontal'
  reverse?: boolean
  duration?: number
  ease?: string
  initialOpacity?: number
  scale?: number
  delay?: number
  threshold?: number
}

export default function AnimatedContent({
  children,
  className = '',
  distance = 70,
  direction = 'vertical',
  reverse = false,
  duration = 0.9,
  ease = 'power3.out',
  initialOpacity = 0,
  scale = 1,
  delay = 0,
  threshold = 0.15,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.registerPlugin(ScrollTrigger)
    const axis = direction === 'horizontal' ? 'x' : 'y'
    const offset = reverse ? -distance : distance

    gsap.set(el, { [axis]: offset, opacity: initialOpacity, scale })
    const tween = gsap.to(el, {
      [axis]: 0,
      opacity: 1,
      scale: 1,
      duration,
      ease,
      delay,
      scrollTrigger: { trigger: el, start: `top ${(1 - threshold) * 100}%`, once: true },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
