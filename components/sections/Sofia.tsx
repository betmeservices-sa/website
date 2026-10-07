'use client'

import { useI18n } from '@/lib/i18n'
import AnimatedContent from '@/components/reactbits/AnimatedContent'
import SpotlightCard from '@/components/reactbits/SpotlightCard'
import Eyebrow from '@/components/ui/Eyebrow'
import Button from '@/components/ui/Button'

/**
 * "Conoce a Sofía": las capacidades tal como están estructuradas en las
 * propuestas (flujos situación→respuesta, límites, escalada), sin precios.
 *
 * El bloque de LÍMITES es deliberadamente tan prominente como el de
 * capacidades. Decir qué NO hace el agente es lo que hace creíble todo lo
 * demás, y es lo que casi ningún competidor publica.
 */
export default function Sofia() {
  const { t } = useI18n()
  const s = t.sofia

  return (
    <section id="sofia" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <AnimatedContent className="mx-auto max-w-2xl text-center">
          <Eyebrow>{s.label}</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
            {s.titleTop} <span className="text-gradient">{s.titleGrad}</span>
          </h2>
          <p className="mt-4 text-muted sm:text-lg">{s.sub}</p>
        </AnimatedContent>

        {/* Ficha del agente */}
        <AnimatedContent delay={0.08}>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {s.meta.map((m) => (
              <div
                key={m.k}
                className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5"
              >
                <span className="font-display text-[11px] uppercase tracking-[.14em] text-muted">
                  {m.k}
                </span>
                <span className="ml-3 text-sm font-medium">{m.v}</span>
              </div>
            ))}
          </div>
        </AnimatedContent>

        <div className="mt-14 grid gap-5 lg:grid-cols-5">
          {/* Qué hace — situación → respuesta, en las palabras del cliente */}
          <AnimatedContent delay={0.12} className="lg:col-span-3">
            <SpotlightCard className="h-full rounded-2xl border border-white/10 bg-bg-card p-7 sm:p-9">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-cyan" />
                <h3 className="font-display text-xl font-semibold">{s.doesLabel}</h3>
              </div>
              <ul className="mt-7 space-y-6">
                {s.does.map((d) => (
                  <li key={d.s} className="border-l border-white/10 pl-5">
                    <p className="font-display text-[12px] uppercase tracking-[.13em] text-cyan">
                      {d.s}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{d.r}</p>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </AnimatedContent>

          {/* Qué NO hace — el bloque de confianza */}
          <AnimatedContent delay={0.18} className="lg:col-span-2">
            <div className="flex h-full flex-col gap-5">
              <SpotlightCard className="rounded-2xl border border-white/10 bg-bg-card p-7 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-magenta" />
                  <h3 className="font-display text-xl font-semibold">{s.limitsLabel}</h3>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-muted">{s.limitsNote}</p>
                <ul className="mt-5 space-y-3.5">
                  {s.limits.map((l) => (
                    <li key={l} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span aria-hidden="true" className="mt-[7px] h-px w-3 flex-none bg-magenta/70" />
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>

              <div className="rounded-2xl border border-violet/25 bg-violet/[0.07] p-7 sm:p-8">
                <h3 className="font-display text-sm uppercase tracking-[.13em] text-violet">
                  {s.escalaLabel}
                </h3>
                <p className="mt-3 text-sm leading-relaxed">{s.escala}</p>
              </div>
            </div>
          </AnimatedContent>
        </div>

        <AnimatedContent delay={0.24} className="mt-12 text-center">
          <Button href="#empezar">{s.cta}</Button>
        </AnimatedContent>
      </div>
    </section>
  )
}
