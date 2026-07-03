'use client'

// IA + Humanos: el modelo híbrido. Flujo de 3 pasos (IA atiende → agenda →
// transfiere al experto) con conectores de flecha y cierre en banner.
import { useI18n } from '@/lib/i18n'
import AnimatedContent from '@/components/reactbits/AnimatedContent'
import SpotlightCard from '@/components/reactbits/SpotlightCard'
import Eyebrow from '@/components/ui/Eyebrow'
import Icon from '@/components/ui/Icon'

const accents = [
  { text: 'text-cyan', spot: 'rgba(34, 211, 238, 0.16)' },
  { text: 'text-violet', spot: 'rgba(139, 92, 246, 0.18)' },
  { text: 'text-magenta', spot: 'rgba(232, 121, 249, 0.16)' },
]

export default function HybridModel() {
  const { t } = useI18n()
  return (
    <section id="ia-humanos" className="relative overflow-hidden border-y border-white/5 bg-bg-soft/60 py-24 sm:py-32">
      <div className="aurora-blob aurora-3 opacity-40" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <AnimatedContent className="mx-auto max-w-3xl text-center">
          <Eyebrow>{t.hybrid.label}</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
            {t.hybrid.titleTop} <span className="text-grad">{t.hybrid.titleGrad}</span>
          </h2>
          <p className="mt-4 text-muted sm:text-lg">{t.hybrid.sub}</p>
        </AnimatedContent>

        <div className="relative mt-14">
          {/* Conectores (desktop) */}
          <div className="pointer-events-none absolute left-1/3 top-1/2 z-10 hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full [background:var(--grad)] lg:flex">
            <Icon name="arrow" className="h-4 w-4 text-bg" />
          </div>
          <div className="pointer-events-none absolute left-2/3 top-1/2 z-10 hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full [background:var(--grad)] lg:flex">
            <Icon name="arrow" className="h-4 w-4 text-bg" />
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {t.hybrid.steps.map((step, i) => (
              <AnimatedContent key={step.title} delay={i * 0.12} className="h-full">
                <SpotlightCard
                  className="h-full rounded-2xl border border-white/10 bg-bg-card p-7"
                  spotlightColor={accents[i].spot}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className={`rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold uppercase tracking-wider ${accents[i].text}`}>
                      {step.kicker}
                    </span>
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] ${accents[i].text}`}>
                      <Icon name={step.icon} className="h-6 w-6" />
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{step.desc}</p>
                </SpotlightCard>
              </AnimatedContent>
            ))}
          </div>
        </div>

        {/* Cierre */}
        <AnimatedContent delay={0.3}>
          <div className="mx-auto mt-10 flex max-w-3xl items-center justify-center gap-3 rounded-2xl border-grad glass px-6 py-5 text-center">
            <Icon name="sparkle" className="h-5 w-5 shrink-0 text-violet" />
            <p className="text-sm font-medium text-ink sm:text-base">{t.hybrid.closing}</p>
          </div>
        </AnimatedContent>
      </div>
    </section>
  )
}
