import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import { site } from '@/lib/site'
import type { Proposal } from '@/lib/proposals/types'
import Cover from './Cover'
import Diagnostico from './Diagnostico'
import AgentSpec from './AgentSpec'

export default function ProposalPage({ proposal }: { proposal: Proposal }) {
  return (
    <div className="relative min-h-screen">
      <div className="aurora-blob aurora-3 opacity-30" />

      <header className="relative mx-auto flex max-w-4xl items-center justify-between px-5 py-6 sm:px-8">
        <Link href="/" aria-label="MiAgentIA"><Logo className="h-7" /></Link>
        <span className="text-xs uppercase tracking-[0.2em] text-muted">Propuesta</span>
      </header>

      <main className="relative mx-auto max-w-4xl px-5 sm:px-8">
        <Cover proposal={proposal} />
        <Diagnostico data={proposal.diagnostico} />
        <AgentSpec agente={proposal.agente} />
      </main>

      <footer className="relative mx-auto max-w-4xl px-5 py-10 text-center text-xs text-muted sm:px-8">
        MiAgentIA · <a href={`mailto:${site.email}`} className="hover:text-ink">{site.email}</a>
      </footer>
    </div>
  )
}
