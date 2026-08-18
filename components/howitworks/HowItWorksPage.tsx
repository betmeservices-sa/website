'use client'

// Página "Cómo funciona": la versión larga de la sección del home, pensada para
// mandarle el enlace a quien hace preguntas técnicas en una reunión.
//
// El contenido entra por props desde cada ruta (/como-funciona y
// /en/how-it-works), igual que en las páginas legales. Acá vive solo el armado.
import type { Lang } from '@/lib/content'
import type { ReactNode } from 'react'
import SiteShell from '@/components/SiteShell'
import AnimatedContent from '@/components/reactbits/AnimatedContent'
import Eyebrow from '@/components/ui/Eyebrow'
import { site } from '@/lib/site'

export interface Punto {
  titulo: string
  texto: string
}

export interface Bloque {
  id: string
  eyebrow: string
  titulo: string
  intro: string
  diagrama: ReactNode
  /** Lo mismo que dice el dibujo, en palabras, para quien lee en el teléfono. */
  puntos: Punto[]
}

export interface ContenidoHowItWorks {
  hero: { eyebrow: string; titulo: string; tituloGrad: string; sub: string }
  indice: string
  bloques: Bloque[]
  faq: { eyebrow: string; titulo: string; sub: string; items: { p: string; r: string }[] }
  cierre: { titulo: string; texto: string; cta: string }
}

function Leyenda({ color, children }: { color: string; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[12px] text-muted">
      <span className="h-2.5 w-2.5 rounded-[4px]" style={{ background: color }} />
      {children}
    </span>
  )
}

export default function HowItWorksPage({
  lang,
  c,
  leyenda,
}: {
  lang: Lang
  c: ContenidoHowItWorks
  leyenda: { cliente: string; nuestro: string; tercero: string; persona: string }
}) {
  return (
    <SiteShell lang={lang}>
      {/* ── Portada ── */}
      <section className="relative overflow-hidden">
        <div className="aurora-blob aurora-1 opacity-40" />
        <div className="aurora-blob aurora-2 opacity-30" />
        <div className="absolute inset-0 tech-grid" />
        <div className="relative mx-auto max-w-3xl px-5 pb-16 pt-36 text-center sm:px-8 sm:pb-20 sm:pt-44">
          <AnimatedContent>
            <Eyebrow>{c.hero.eyebrow}</Eyebrow>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-6xl">
              {c.hero.titulo}{' '}
              <span className="text-grad">{c.hero.tituloGrad}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-lg">
              {c.hero.sub}
            </p>
          </AnimatedContent>

          {/* Índice: la página es larga y casi siempre se entra buscando una cosa. */}
          <AnimatedContent delay={0.15}>
            <nav aria-label={c.indice} className="mt-10 flex flex-wrap justify-center gap-2">
              {c.bloques.map((b) => (
                <a
                  key={b.id}
                  href={`#${b.id}`}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[13px] text-muted transition hover:border-white/25 hover:text-ink"
                >
                  {b.eyebrow}
                </a>
              ))}
            </nav>
          </AnimatedContent>
        </div>
      </section>

      {/* ── Bloques con flujograma ── */}
      {c.bloques.map((b, i) => (
        <section
          key={b.id}
          id={b.id}
          className="relative scroll-mt-24 border-t border-white/[0.06] py-20 sm:py-28"
        >
          {i === 1 && <div className="aurora-blob aurora-3 opacity-20" />}
          <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
            <AnimatedContent className="mx-auto max-w-2xl text-center">
              <Eyebrow>{b.eyebrow}</Eyebrow>
              <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                {b.titulo}
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted sm:text-base">{b.intro}</p>
            </AnimatedContent>

            <AnimatedContent delay={0.1} className="mt-12">
              <div className="rounded-3xl border border-white/[0.08] bg-bg-card/60 p-4 backdrop-blur-sm sm:p-8">
                {/* El diagrama se desliza solo, sin arrastrar la página con él. */}
                <div className="overflow-x-auto">{b.diagrama}</div>
                <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 border-t border-white/[0.06] pt-5">
                  <Leyenda color="rgba(34,211,238,0.5)">{leyenda.cliente}</Leyenda>
                  <Leyenda color="rgba(139,92,246,0.55)">{leyenda.nuestro}</Leyenda>
                  <Leyenda color="rgba(255,255,255,0.18)">{leyenda.tercero}</Leyenda>
                  <Leyenda color="rgba(232,121,249,0.55)">{leyenda.persona}</Leyenda>
                </div>
              </div>
            </AnimatedContent>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {b.puntos.map((p, j) => (
                <AnimatedContent key={p.titulo} delay={j * 0.08}>
                  <div className="h-full rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                    <h3 className="font-display text-[15px] font-semibold text-ink">{p.titulo}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-muted">{p.texto}</p>
                  </div>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ── Preguntas ── */}
      <section
        id="preguntas"
        className="relative scroll-mt-24 border-t border-white/[0.06] py-20 sm:py-28"
      >
        <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
          <AnimatedContent className="text-center">
            <Eyebrow>{c.faq.eyebrow}</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {c.faq.titulo}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">{c.faq.sub}</p>
          </AnimatedContent>

          <div className="mt-12 space-y-3">
            {c.faq.items.map((it, i) => (
              <AnimatedContent key={it.p} delay={i * 0.05}>
                <details className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] px-5 py-4 transition hover:border-white/15 open:border-white/15">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-[15px] font-medium text-ink">
                    {it.p}
                    <span className="shrink-0 text-muted transition group-open:rotate-45" aria-hidden>
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{it.r}</p>
                </details>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cierre ── */}
      <section className="relative overflow-hidden border-t border-white/[0.06] py-20 sm:py-28">
        <div className="aurora-blob aurora-3 opacity-25" />
        <div className="relative mx-auto max-w-2xl px-5 text-center sm:px-8">
          <AnimatedContent>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {c.cierre.titulo}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">{c.cierre.texto}</p>
            <a
              href={site.booking}
              className="mt-8 inline-flex items-center justify-center rounded-full px-7 py-3.5 font-display text-[15px] font-semibold text-white glow-violet [background:var(--grad)]"
            >
              {c.cierre.cta}
            </a>
          </AnimatedContent>
        </div>
      </section>
    </SiteShell>
  )
}
