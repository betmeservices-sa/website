'use client'

import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import Aurora from '@/components/reactbits/Aurora'
import SplitText from '@/components/reactbits/SplitText'
import RobotMascot from '@/components/ui/RobotMascot'
import Button from '@/components/ui/Button'
import Eyebrow from '@/components/ui/Eyebrow'
import Icon from '@/components/ui/Icon'

export default function Hero() {
  const { t } = useI18n()

  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20">
      <Aurora />
      <div className="tech-grid absolute inset-0" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-6">
        {/* Columna izquierda: texto */}
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Eyebrow badge>{t.hero.badge}</Eyebrow>
          </motion.div>

          <h1 className="mt-7 font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-6xl xl:text-7xl">
            <SplitText text={t.hero.titleTop} delay={0.1} />{' '}
            <SplitText text={t.hero.titleGrad} delay={0.35} wordClassName="text-grad" />{' '}
            <SplitText text={t.hero.titleBottom} delay={0.7} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05 }}
            className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg lg:mx-0"
          >
            {t.hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.25 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
          >
            <Button href="#voz">
              <Icon name="phone" className="h-4 w-4" />
              {t.hero.cta1}
            </Button>
            <Button href="#chat" variant="ghost">
              <Icon name="whatsapp" className="h-4 w-4 text-cyan" />
              {t.hero.cta2}
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.5 }}
            className="mt-5 flex items-center justify-center gap-1.5 text-xs text-muted lg:justify-start"
          >
            <Icon name="bolt" className="h-3.5 w-3.5 text-cyan" />
            {t.hero.note}
          </motion.p>

          {/* Stats rápidos */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
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

        {/* Columna derecha: robot (arriba en móvil, a la derecha en escritorio) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="order-first flex justify-center lg:order-none"
        >
          <RobotMascot className="h-60 w-auto sm:h-80 lg:h-[34rem]" />
        </motion.div>
      </div>
    </section>
  )
}
