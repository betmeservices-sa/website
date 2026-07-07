'use client'

import { useI18n } from '@/lib/i18n'
import AnimatedContent from '@/components/reactbits/AnimatedContent'
import Eyebrow from '@/components/ui/Eyebrow'

export default function HowItWorks() {
  const { t } = useI18n()
  return (
    <section id="como-funciona" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <AnimatedContent className="mx-auto max-w-2xl text-center">
          <Eyebrow>{t.how.label}</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight sm:text-5xl">{t.how.title}</h2>
          <p className="mt-4 text-muted sm:text-lg">{t.how.sub}</p>
        </AnimatedContent>

        <div className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
          {/* Línea conectora (desktop) */}
          <div className="absolute left-0 right-0 top-7 hidden h-px md:block" style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.5), rgba(232,121,249,0.5), transparent)' }} />

          {t.how.steps.map((step, i) => (
            <AnimatedContent key={step.title} delay={i * 0.12} className="relative text-center md:text-left">
              <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-bg-card font-display text-lg font-semibold text-grad glow-violet md:mx-0">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.desc}</p>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  )
}
