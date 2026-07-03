'use client'

import { useI18n } from '@/lib/i18n'
import Marquee from '@/components/reactbits/Marquee'
import Icon from '@/components/ui/Icon'

export default function LogosMarquee() {
  const { t } = useI18n()
  return (
    <section className="border-y border-white/5 bg-bg-soft/60 py-10">
      <p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.25em] text-muted">
        {t.logos.label}
      </p>
      <Marquee>
        {t.logos.items.map((name) => (
          <span
            key={name}
            className="mx-6 inline-flex items-center gap-2 whitespace-nowrap font-display text-lg font-medium text-white/40 transition-colors hover:text-white/80"
          >
            <Icon name="sparkle" className="h-4 w-4 text-violet/60" />
            {name}
          </span>
        ))}
      </Marquee>
    </section>
  )
}
