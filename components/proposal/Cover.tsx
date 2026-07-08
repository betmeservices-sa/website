import SplitText from '@/components/reactbits/SplitText'
import Eyebrow from '@/components/ui/Eyebrow'
import type { Proposal } from '@/lib/proposals/types'

const fmtFecha = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('es-ES', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

export default function Cover({ proposal }: { proposal: Proposal }) {
  return (
    <section className="relative flex min-h-[68vh] flex-col justify-center py-16">
      <Eyebrow>Propuesta · {proposal.cliente.industria}</Eyebrow>
      <SplitText
        as="h1"
        text={proposal.cliente.nombre}
        className="mt-6 font-display text-5xl font-semibold tracking-tight sm:text-7xl"
        wordClassName="text-grad"
      />
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
        {proposal.fraseDolor}
      </p>
      <p className="mt-8 text-sm text-muted">
        Preparada para {proposal.cliente.contacto} · Válida hasta el {fmtFecha(proposal.validaHasta)}
      </p>
    </section>
  )
}
