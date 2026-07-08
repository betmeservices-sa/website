import Eyebrow from '@/components/ui/Eyebrow'
import Icon from '@/components/ui/Icon'
import type { Proposal } from '@/lib/proposals/types'

export default function Investment({ inversion }: { inversion: Proposal['inversion'] }) {
  return (
    <section className="border-t border-white/5 py-16 sm:py-20">
      <Eyebrow>Inversión</Eyebrow>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {inversion.opciones.map((o, i) => (
          <div
            key={i}
            className={`relative rounded-2xl p-6 sm:p-7 ${
              o.recomendada ? 'border-grad glass' : 'border border-white/10 bg-bg-card'
            }`}
          >
            {o.recomendada && (
              <span className="absolute -top-3 left-6 rounded-full [background:var(--grad)] px-3 py-1 text-xs font-semibold text-bg">
                Recomendada
              </span>
            )}
            <h3 className="font-display text-xl font-semibold text-ink">{o.nombre}</h3>
            <div className="mt-4 space-y-1">
              <p className="text-2xl font-semibold text-ink">{o.mensual}</p>
              <p className="text-sm text-muted">más {o.setup} de implementación</p>
            </div>
            <ul className="mt-5 space-y-2">
              {o.incluye.map((x, j) => (
                <li key={j} className="flex gap-2 text-sm text-muted">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />{x}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-5 flex items-center gap-2 text-sm font-medium text-ink">
        <Icon name="sparkle" className="h-4 w-4 text-violet" />{inversion.nota}
      </p>
    </section>
  )
}
