'use client'

import { useI18n } from '@/lib/i18n'
import { waLink } from '@/lib/site'
import Aurora from '@/components/reactbits/Aurora'
import AnimatedContent from '@/components/reactbits/AnimatedContent'
import Eyebrow from '@/components/ui/Eyebrow'
import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'

export default function FinalCta() {
  const { t } = useI18n()
  return (
    <section id="empezar" className="relative overflow-hidden py-28 sm:py-36">
      <Aurora dots={false} />
      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <AnimatedContent>
          <Eyebrow badge>{t.finalCta.label}</Eyebrow>
          <h2 className="mt-6 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-grad">{t.finalCta.title}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted sm:text-lg">{t.finalCta.sub}</p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href={waLink()}>
              <Icon name="calendar" className="h-4 w-4" />
              {t.finalCta.cta}
            </Button>
            <span className="text-sm text-muted">{t.finalCta.or}</span>
            <Button href={waLink()} variant="ghost">
              <Icon name="whatsapp" className="h-4 w-4 text-cyan" />
              {t.finalCta.wa}
            </Button>
          </div>
        </AnimatedContent>
      </div>
    </section>
  )
}
