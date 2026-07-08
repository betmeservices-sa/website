import Eyebrow from '@/components/ui/Eyebrow'
import Icon from '@/components/ui/Icon'
import type { Proposal } from '@/lib/proposals/types'

export default function ScopeGrid({ alcance }: { alcance: Proposal['alcance'] }) {
  return (
    <section className="border-t border-white/5 py-16 sm:py-20">
      <div className="grid gap-10 sm:grid-cols-2">
        <div>
          <Eyebrow>Qué incluye</Eyebrow>
          <ul className="mt-6 space-y-3">
            {alcance.incluye.map((x, i) => (
              <li key={i} className="flex gap-3 text-sm text-ink">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />{x}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Eyebrow>Qué necesitamos de ti</Eyebrow>
          <ul className="mt-6 space-y-3">
            {alcance.contraparte.map((c, i) => (
              <li key={i} className="flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-bg-card p-4 text-sm">
                <span className="text-ink">{c.item}</span>
                {c.horas && (
                  <span className="shrink-0 rounded-full [background:var(--grad)] px-2.5 py-0.5 text-xs font-semibold text-bg">
                    {c.horas}
                  </span>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted">
            Eso es todo lo que necesitamos de tu lado. Del resto nos encargamos nosotros.
          </p>
        </div>
      </div>
    </section>
  )
}
