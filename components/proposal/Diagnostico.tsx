import AnimatedContent from '@/components/reactbits/AnimatedContent'
import Eyebrow from '@/components/ui/Eyebrow'
import Icon from '@/components/ui/Icon'
import type { Proposal } from '@/lib/proposals/types'

export default function Diagnostico({ data }: { data: Proposal['diagnostico'] }) {
  return (
    <section className="border-t border-white/5 py-16 sm:py-20">
      <Eyebrow>Lo que vimos</Eyebrow>
      <div className="mt-8 space-y-4">
        {data.hechos.map((h, i) => (
          <AnimatedContent key={i} delay={i * 0.1}>
            <div className="flex gap-4 rounded-2xl border border-white/10 bg-bg-card p-5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full [background:var(--grad)] text-sm font-semibold text-bg">
                {i + 1}
              </span>
              <p className="text-ink">{h}</p>
            </div>
          </AnimatedContent>
        ))}
      </div>

      {data.metrica && (
        <AnimatedContent delay={0.3}>
          <div className="mt-6 rounded-2xl border-grad glass p-6 sm:p-8">
            <div className="flex flex-wrap gap-2">
              {data.metrica.insumos.map((x, i) => (
                <span key={i} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-muted">
                  {x}
                </span>
              ))}
            </div>
            <p className="mt-4 flex items-start gap-3 text-lg font-medium text-ink sm:text-xl">
              <Icon name="bolt" className="mt-1 h-5 w-5 shrink-0 text-violet" />
              {data.metrica.resultado}
            </p>
            <p className="mt-3 text-xs text-muted">{data.metrica.fuente}</p>
          </div>
        </AnimatedContent>
      )}
    </section>
  )
}
