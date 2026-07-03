'use client'

import { useI18n } from '@/lib/i18n'
import AnimatedContent from '@/components/reactbits/AnimatedContent'
import SpotlightCard from '@/components/reactbits/SpotlightCard'
import Eyebrow from '@/components/ui/Eyebrow'
import Icon from '@/components/ui/Icon'

export default function Industries() {
  const { t } = useI18n()
  return (
    <section id="industrias" className="relative border-y border-white/5 bg-bg-soft/60 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <AnimatedContent className="mx-auto max-w-2xl text-center">
          <Eyebrow>{t.industries.label}</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight sm:text-5xl">{t.industries.title}</h2>
          <p className="mt-4 text-muted sm:text-lg">{t.industries.sub}</p>
        </AnimatedContent>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.industries.items.map((item, i) => (
            <AnimatedContent key={item.name} delay={i * 0.07}>
              <SpotlightCard
                className="h-full rounded-2xl border border-white/10 bg-bg-card p-6 transition-colors hover:border-white/20"
                spotlightColor="rgba(34, 211, 238, 0.16)"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-cyan">
                    <Icon name={item.icon} className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold">{item.name}</h3>
                    <p className="mt-1 text-sm text-muted">{item.desc}</p>
                  </div>
                </div>
              </SpotlightCard>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  )
}
