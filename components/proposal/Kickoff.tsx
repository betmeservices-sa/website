import Button from '@/components/ui/Button'
import Eyebrow from '@/components/ui/Eyebrow'
import Icon from '@/components/ui/Icon'
import { waLink } from '@/lib/site'
import type { Proposal } from '@/lib/proposals/types'

export default function Kickoff({ proposal }: { proposal: Proposal }) {
  const msg = `Hola MiAgentIA, somos ${proposal.cliente.nombre}. Aprobamos la propuesta, ¿cómo arrancamos?`
  return (
    <section className="border-t border-white/5 py-16 sm:py-24">
      <Eyebrow>Cómo arrancamos</Eyebrow>
      <ol className="mt-8 space-y-3">
        {proposal.arranque.map((p, i) => (
          <li key={i} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-bg-card p-5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full [background:var(--grad)] text-sm font-semibold text-bg">
              {i + 1}
            </span>
            <span className="flex-1 text-ink">{p.paso}</span>
            <span className="shrink-0 text-sm font-medium text-muted">{p.fecha}</span>
          </li>
        ))}
      </ol>

      <div className="mt-10 flex flex-col items-center gap-5 rounded-3xl border-grad glass p-10 text-center">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          ¿Le damos vida a {proposal.agente.nombre}?
        </h2>
        <Button href={waLink(msg)} className="text-base">
          <Icon name="whatsapp" className="h-5 w-5" />Aprobar y arrancar
        </Button>
      </div>
    </section>
  )
}
