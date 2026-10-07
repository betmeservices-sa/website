'use client'

import { useI18n } from '@/lib/i18n'
import { site } from '@/lib/site'
import AnimatedContent from '@/components/reactbits/AnimatedContent'
import Eyebrow from '@/components/ui/Eyebrow'
import Button from '@/components/ui/Button'
import HowItWorks from '@/components/sections/HowItWorks'

/**
 * Tabla comparativa de paquetes, al estilo de respond.io.
 *
 * SIN PRECIOS, por decisión de Sandra: cada negocio cotiza según su volumen
 * de conversaciones. Lo único que se publica es qué incluye cada paquete.
 *
 * La tabla se desplaza en horizontal en pantallas chicas y la primera
 * columna queda fija: con cuatro planes no hay forma de que quepa entera en
 * un teléfono, y apilarla por plan repetiría veinte filas cuatro veces.
 */

function Mark({ v }: { v: boolean | string }) {
  if (v === true) {
    return (
      <span className="pl-dot" aria-label="Incluido">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 12.5 10 17 19 7" />
        </svg>
      </span>
    )
  }
  if (v === false) {
    return (
      <span className="pl-no" aria-label="No incluido">
        &ndash;
      </span>
    )
  }
  return <span className="pl-val">{v}</span>
}

export default function Planes() {
  const { t } = useI18n()
  const p = t.plans

  return (
    <section id="planes" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <AnimatedContent className="mx-auto max-w-2xl text-center">
          <Eyebrow>{p.label}</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
            {p.title}
          </h2>
          <p className="mt-4 text-muted sm:text-lg">{p.sub}</p>
        </AnimatedContent>

        <AnimatedContent delay={0.1}>
          <div className="pl-scroll mt-14">
            <table className="pl-table">
              <thead>
                <tr>
                  <th className="pl-head pl-first" />
                  {p.tiers.map((name) => (
                    <th key={name} className="pl-head">
                      <span className="pl-tier">{name}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {p.groups.map((g) => (
                  <>
                    <tr key={g.name} className="pl-grouprow">
                      <th className="pl-group pl-first" colSpan={1}>
                        {g.name}
                      </th>
                      <td colSpan={p.tiers.length} />
                    </tr>
                    {g.rows.map((r) => (
                      <tr key={r.f}>
                        <th className="pl-feat pl-first">{r.f}</th>
                        {r.v.map((v, i) => (
                          <td key={`${r.f}-${i}`} className="pl-cell">
                            <Mark v={v} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </>
                ))}
                <tr>
                  <th className="pl-first" />
                  {p.tiers.map((name) => (
                    <td key={`cta-${name}`} className="pl-cell pl-ctacell">
                      <Button
                        href={site.booking}
                        variant="ghost"
                        className="w-full justify-center px-4 py-2.5 text-xs"
                      >
                        {p.cta}
                      </Button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-muted">
            {p.note}
          </p>
        </AnimatedContent>

        {/* "Cómo arrancamos" vivía en su propia sección. Pertenece aquí: la
            pregunta que sigue a ver los paquetes es cómo se empieza. */}
        <AnimatedContent delay={0.14}>
          <div className="mt-24 border-t border-white/10 pt-20">
            <HowItWorks />
          </div>
        </AnimatedContent>
      </div>
    </section>
  )
}
