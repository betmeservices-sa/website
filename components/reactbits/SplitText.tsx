'use client'

// React Bits · SplitText — revela palabra por palabra con blur + desplazamiento.
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface Props {
  text: string
  className?: string
  // Clase aplicada a CADA palabra (necesario para background-clip:text,
  // que se rompe si vive en el padre mientras los hijos animan con filter).
  wordClassName?: string
  delay?: number
  stagger?: number
  as?: 'h1' | 'h2' | 'span' | 'p'
}

export default function SplitText({
  text,
  className = '',
  wordClassName = '',
  delay = 0,
  stagger = 0.05,
  as = 'span',
}: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const words = text.split(' ')
  const Tag = motion[as]

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className={`inline-block whitespace-pre ${wordClassName}`}
          initial={{ opacity: 0, y: 34, filter: 'blur(10px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.6, delay: delay + i * stagger, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </Tag>
  )
}
