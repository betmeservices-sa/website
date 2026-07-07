// Plantilla de página de aterrizaje por keyword (SEO): hero + beneficios +
// pasos + FAQ + CTA. Server-rendered en español; reusa el sistema visual.
import SiteShell from '@/components/SiteShell'
import Aurora from '@/components/reactbits/Aurora'
import AnimatedContent from '@/components/reactbits/AnimatedContent'
import SpotlightCard from '@/components/reactbits/SpotlightCard'
import Eyebrow from '@/components/ui/Eyebrow'
import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'
import { waLink } from '@/lib/site'

export interface KeywordLandingData {
  eyebrow: string
  titleTop: string
  titleGrad: string
  intro: string
  benefits: { icon: string; title: string; desc: string }[]
  steps: { title: string; desc: string }[]
  faq: { q: string; a: string }[]
  cta: string
  waMessage: string
}

const accents = ['text-cyan', 'text-violet', 'text-magenta', 'text-cyan-soft']

export default function KeywordLanding({ data }: { data: KeywordLandingData }) {
  return (
    <SiteShell lang="es">
      {/* Hero */}
      <section id="top" className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-24">
        <Aurora dots={false} />
        <div className="tech-grid absolute inset-0" />
        <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
          <Eyebrow badge>{data.eyebrow}</Eyebrow>
          <h1 className="mt-7 font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
            {data.titleTop} <span className="text-grad">{data.titleGrad}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {data.intro}
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href={waLink(data.waMessage)}>
              <Icon name="whatsapp" className="h-4 w-4" />
              {data.cta}
            </Button>
            <Button href="/#voz" variant="ghost">
              <Icon name="phone" className="h-4 w-4 text-cyan" />
              Escucha una demo del agente
            </Button>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="relative border-y border-white/5 bg-bg-soft/60 py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {data.benefits.map((b, i) => (
              <AnimatedContent key={b.title} delay={i * 0.08} className="h-full">
                <SpotlightCard className="h-full rounded-2xl border border-white/10 bg-bg-card p-6">
                  <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] ${accents[i % accents.length]}`}>
                    <Icon name={b.icon} className="h-6 w-6" />
                  </span>
                  <h2 className="mt-4 font-display text-lg font-semibold">{b.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{b.desc}</p>
                </SpotlightCard>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      {/* Pasos */}
      <section className="relative py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <AnimatedContent className="text-center">
            <Eyebrow>Cómo funciona</Eyebrow>
          </AnimatedContent>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {data.steps.map((s, i) => (
              <AnimatedContent key={s.title} delay={i * 0.1} className="text-center md:text-left">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-bg-card font-display font-semibold text-grad md:mx-0">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ (también alimenta el JSON-LD de la página) */}
      <section className="relative border-t border-white/5 bg-bg-soft/60 py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <AnimatedContent className="text-center">
            <Eyebrow>Preguntas frecuentes</Eyebrow>
          </AnimatedContent>
          <div className="mt-10 space-y-4">
            {data.faq.map((item) => (
              <AnimatedContent key={item.q}>
                <div className="rounded-2xl border border-white/10 bg-bg-card p-6">
                  <h3 className="font-display text-base font-semibold sm:text-lg">{item.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">{item.a}</p>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="relative overflow-hidden py-24">
        <Aurora dots={false} />
        <div className="relative mx-auto max-w-2xl px-5 text-center sm:px-8">
          <AnimatedContent>
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              <span className="text-grad">Agenda una demo gratis</span>
            </h2>
            <p className="mt-4 text-muted">
              Mira el agente funcionando con la información de tu negocio antes de decidir.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href={waLink(data.waMessage)}>
                <Icon name="whatsapp" className="h-4 w-4" />
                {data.cta}
              </Button>
              <Button href="/" variant="ghost">
                Ver todo lo que hacemos
                <Icon name="arrow" className="h-4 w-4" />
              </Button>
            </div>
          </AnimatedContent>
        </div>
      </section>
    </SiteShell>
  )
}
