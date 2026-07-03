'use client'

import { useI18n } from '@/lib/i18n'
import AnimatedContent from '@/components/reactbits/AnimatedContent'
import SpotlightCard from '@/components/reactbits/SpotlightCard'
import Eyebrow from '@/components/ui/Eyebrow'
import Icon from '@/components/ui/Icon'

const accents = [
  'text-cyan',
  'text-magenta',
  'text-violet',
  'text-cyan-soft',
  'text-fuchsia',
  'text-cyan',
]

export default function Services() {
  const { t } = useI18n()
  return (
    <section id="servicios" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <AnimatedContent className="mx-auto max-w-2xl text-center">
          <Eyebrow>{t.services.label}</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
            {t.services.title}
          </h2>
          <p className="mt-4 text-muted sm:text-lg">{t.services.sub}</p>
        </AnimatedContent>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((item, i) => (
            <AnimatedContent key={item.title} delay={i * 0.08}>
              <SpotlightCard className="h-full rounded-2xl border border-white/10 bg-bg-card p-7 transition-colors duration-300 hover:border-white/20">
                <span className={`inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] ${accents[i % accents.length]}`}>
                  <Icon name={item.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{item.desc}</p>
              </SpotlightCard>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  )
}
