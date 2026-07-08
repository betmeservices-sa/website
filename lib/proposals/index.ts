import type { Proposal } from './types'
import { excelMotors } from './excel-motors-demo'

// Cada propuesta nueva se agrega a esta lista.
const list: Proposal[] = [excelMotors]

const bySlug: Record<string, Proposal> = Object.fromEntries(
  list.map((p) => [p.slug, p]),
)

export function getProposal(slug: string): Proposal | undefined {
  return bySlug[slug]
}

export function allProposalSlugs(): string[] {
  return list.map((p) => p.slug)
}
