'use client'

import { motion, useReducedMotion, type TargetAndTransition } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import { site, waSofiaLink } from '@/lib/site'
import Aurora from '@/components/reactbits/Aurora'
import SplitText from '@/components/reactbits/SplitText'
import ChannelOrbit from '@/components/ui/ChannelOrbit'
import Button from '@/components/ui/Button'
import Eyebrow from '@/components/ui/Eyebrow'
import Icon from '@/components/ui/Icon'

export default function Hero() {
  const { t } = useI18n()
  // Con el movimiento reducido por el sistema, Framer se salta la animación
  // pero deja puesto el `initial` — y el initial es opacity:0, así que el
  // contenido se queda invisible. initial={false} arranca directo en el
  // estado final. Mismo bug que tenía SplitText.
  const reduce = useReducedMotion()
  const from = (v: TargetAndTransition) => (reduce ? false : v)

  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20">
      <Aurora />
      <div className="tech-grid absolute inset-0" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-6">
        {/* Columna izquierda: texto */}
        <div className="text-center lg:text-left">
          <motion.div
            initial={from({ opacity: 0, y: 20 })}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Eyebrow badge>{t.hero.badge}</Eyebrow>
          </motion.div>

          <h1 className="mt-7 font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-6xl xl:text-7xl">
            <SplitText text={t.hero.titleTop} delay={0.1} />{' '}
            <SplitText text={t.hero.titleGrad} delay={0.35} wordClassName="text-grad" />
          </h1>

          <motion.p
            initial={from({ opacity: 0, y: 24 })}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05 }}
            className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg lg:mx-0"
          >
            {t.hero.sub}
          </motion.p>

          <motion.div
            initial={from({ opacity: 0, y: 24 })}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.25 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
          >
            {/* Los dos CTA van a la Sofía REAL, no a los demos de la página:
                esos son simulaciones visuales y prometerlos como prueba
                defrauda a quien los abre. */}
            <Button href={`tel:${site.phone}`}>
              <Icon name="phone" className="h-4 w-4" />
              {t.hero.cta1}
            </Button>
            <Button href={waSofiaLink(t.hero.waMsg)} variant="ghost">
              <Icon name="whatsapp" className="h-4 w-4 text-cyan" />
              {t.hero.cta2}
            </Button>
          </motion.div>

          <motion.p
            initial={from({ opacity: 0 })}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.5 }}
            className="mt-5 flex items-center justify-center gap-1.5 text-xs text-muted lg:justify-start"
          >
            <Icon name="bolt" className="h-3.5 w-3.5 text-cyan" />
            {t.hero.note} <span className="text-ink/70">&middot; {site.phoneLabel}</span>
          </motion.p>

          {/* Stats rápidos */}
          <motion.div
            initial={from({ opacity: 0, y: 24 })}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.65 }}
            className="mx-auto mt-12 grid max-w-xl grid-cols-3 divide-x divide-white/10 rounded-2xl glass lg:mx-0"
          >
            {t.hero.stats.map((s) => (
              <div key={s.label} className="px-4 py-5 sm:px-6">
                <p className="font-display text-2xl font-semibold text-grad sm:text-3xl">{s.value}</p>
                <p className="mt-1 text-[11px] uppercase tracking-wider text-muted sm:text-xs">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Columna derecha: los canales girando alrededor de Sofía. Reemplaza al
            robot: dice el mensaje principal como imagen. */}
        <motion.div
          initial={from({ opacity: 0, scale: 0.92 })}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="order-first flex justify-center lg:order-none"
        >
          <ChannelOrbit />
        </motion.div>
      </div>
    </section>
  )
}
