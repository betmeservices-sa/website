'use client'

import { useI18n } from '@/lib/i18n'
import { waLink } from '@/lib/site'
import AnimatedContent from '@/components/reactbits/AnimatedContent'
import SpotlightCard from '@/components/reactbits/SpotlightCard'
import Eyebrow from '@/components/ui/Eyebrow'
import Icon from '@/components/ui/Icon'

export default function Plans() {
  const { t } = useI18n()
  return (
    <section id="planes" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <AnimatedContent className="mx-auto max-w-2xl text-center">
          <Eyebrow>{t.plans.label}</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight sm:text-5xl">{t.plans.title}</h2>
          <p className="mt-4 text-muted sm:text-lg">{t.plans.sub}</p>
        </AnimatedContent>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {t.plans.tiers.map((tier, i) => (
            <AnimatedContent key={tier.name} delay={i * 0.1} className="h-full">
              <SpotlightCard
                className={`relative flex h-full flex-col rounded-3xl p-8 ${
                  tier.featured
                    ? 'border-grad bg-bg-card glow-violet'
                    : 'border border-white/10 bg-bg-card'
                }`}
                spotlightColor={tier.featured ? 'rgba(232, 121, 249, 0.2)' : 'rgba(139, 92, 246, 0.16)'}
              >
                {tier.featured && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full [background:var(--grad)] px-4 py-1 text-xs font-semibold text-bg">
                    {t.plans.popular}
                  </span>
                )}

                <h3 className="font-display text-2xl font-semibold">{tier.name}</h3>
                <p className="mt-1.5 text-sm text-muted">{tier.tagline}</p>

                <ul className="mt-7 flex-1 space-y-3.5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-ink/90">
                      <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-8 flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                    tier.featured
                      ? '[background:var(--grad)] text-bg'
                      : 'border border-white/15 text-ink hover:border-white/30'
                  }`}
                >
                  {tier.cta}
                  <Icon name="arrow" className="h-4 w-4" />
                </a>
              </SpotlightCard>
            </AnimatedContent>
          ))}
        </div>

        <AnimatedContent delay={0.35}>
          <p className="mt-8 text-center text-sm text-muted">{t.plans.note}</p>
        </AnimatedContent>
      </div>
    </section>
  )
}
