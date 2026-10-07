'use client'

// React Bits · SplitText — revela palabra por palabra con blur + desplazamiento.
import { motion, useInView, useReducedMotion } from 'framer-motion'
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

const SHOWN = { opacity: 1, y: 0, filter: 'blur(0px)' }
const HIDDEN = { opacity: 0, y: 34, filter: 'blur(10px)' }

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
  const reduce = useReducedMotion()
  const words = text.split(' ')
  const Tag = motion[as]

  // Con el movimiento reducido por el sistema, Framer se salta la animación
  // pero DEJA PUESTO el `initial` — y el initial es opacity:0, así que el
  // titular queda invisible. Paso por el que ya se fue la home publicada.
  //
  // El arreglo NO puede cambiar la estructura del DOM (un primer intento
  // devolvía <span> planos en vez de motion.span y React abortaba la
  // hidratación, dejando el markup del servidor con opacity:0 pegado).
  // Se mantiene el mismo árbol y solo cambian las props: initial={false}
  // hace que Framer arranque directo en el estado final.
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className={`inline-block whitespace-pre ${wordClassName}`}
          initial={reduce ? false : HIDDEN}
          animate={reduce ? SHOWN : inView ? SHOWN : {}}
          transition={{ duration: 0.6, delay: delay + i * stagger, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </Tag>
  )
}
