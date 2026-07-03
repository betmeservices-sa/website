'use client'

import { useI18n } from '@/lib/i18n'
import AnimatedContent from '@/components/reactbits/AnimatedContent'
import CountUp from '@/components/reactbits/CountUp'
import Eyebrow from '@/components/ui/Eyebrow'

export default function Results() {
  const { t } = useI18n()
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="tech-grid absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <AnimatedContent className="mx-auto max-w-2xl text-center">
          <Eyebrow>{t.results.label}</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight sm:text-5xl">{t.results.title}</h2>
          <p className="mt-4 text-muted sm:text-lg">{t.results.sub}</p>
        </AnimatedContent>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.results.stats.map((stat, i) => (
            <AnimatedContent key={stat.label} delay={i * 0.1}>
              <div className="rounded-2xl border-grad glass p-8 text-center">
                <p className="font-display text-4xl font-semibold text-grad sm:text-5xl">
                  <CountUp to={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-3 text-sm text-muted">{stat.label}</p>
              </div>
            </AnimatedContent>
          ))}
        </div>

        <AnimatedContent delay={0.3}>
          <p className="mt-8 text-center text-xs text-muted/70">{t.results.disclaimer}</p>
        </AnimatedContent>
      </div>
    </section>
  )
}
