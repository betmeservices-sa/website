import AnimatedContent from '@/components/reactbits/AnimatedContent'
import Eyebrow from '@/components/ui/Eyebrow'
import Icon from '@/components/ui/Icon'
import type { Canal, Proposal } from '@/lib/proposals/types'

const canalInfo: Record<Canal, { icon: string; label: string }> = {
  voz: { icon: 'phone', label: 'Voz / llamadas' },
  whatsapp: { icon: 'whatsapp', label: 'WhatsApp' },
}

export default function AgentSpec({ agente }: { agente: Proposal['agente'] }) {
  return (
    <section className="border-t border-white/5 py-16 sm:py-20">
      <Eyebrow>Tu agente, ya diseñado</Eyebrow>
      <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        Te presentamos a <span className="text-grad">{agente.nombre}</span>
      </h2>

      {/* Ficha */}
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-bg-card p-5">
          <p className="text-xs uppercase tracking-wider text-muted">Canales</p>
          <div className="mt-2 flex flex-col gap-1.5">
            {agente.canales.map((c) => (
              <span key={c} className="inline-flex items-center gap-1.5 text-sm text-ink">
                <Icon name={canalInfo[c].icon} className="h-4 w-4 text-cyan" />
                {canalInfo[c].label}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-bg-card p-5">
          <p className="text-xs uppercase tracking-wider text-muted">Idioma</p>
          <p className="mt-2 text-sm text-ink">{agente.idioma}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-bg-card p-5">
          <p className="text-xs uppercase tracking-wider text-muted">Disponible</p>
          <p className="mt-2 text-sm text-ink">{agente.horario}</p>
        </div>
      </div>

      {/* Flujos: situación real -> qué hace */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
        {agente.flujos.map((f, i) => (
          <AnimatedContent key={i} delay={i * 0.08}>
            <div className="grid gap-1 border-b border-white/5 bg-bg-card p-5 last:border-0 sm:grid-cols-[1fr_1.4fr] sm:gap-6">
              <p className="text-sm font-medium text-muted">{f.situacion}</p>
              <p className="flex items-start gap-2 text-sm text-ink">
                <Icon name="arrow" className="mt-1 h-3.5 w-3.5 shrink-0 text-violet" />
                {f.respuesta}
              </p>
            </div>
          </AnimatedContent>
        ))}
      </div>

      {/* Qué NO hace + cuándo entra el humano */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-bg-card p-6">
          <p className="text-sm font-semibold text-ink">Qué no hace</p>
          <ul className="mt-3 space-y-2">
            {agente.limites.map((l, i) => (
              <li key={i} className="flex gap-2 text-sm text-muted">
                <span className="text-magenta">·</span>{l}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border-grad glass p-6">
          <p className="flex items-center gap-2 text-sm font-semibold text-ink">
            <Icon name="user" className="h-4 w-4 text-cyan" />Cuándo entra tu equipo
          </p>
          <p className="mt-3 text-sm text-muted">{agente.escalada}</p>
        </div>
      </div>
    </section>
  )
}
