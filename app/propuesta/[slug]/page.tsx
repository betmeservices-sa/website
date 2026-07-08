import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProposal, allProposalSlugs } from '@/lib/proposals'

// Prerenderiza solo los slugs conocidos; cualquier otro da 404 (sin ISR).
export const dynamicParams = false

export function generateStaticParams() {
  return allProposalSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params
  const p = getProposal(slug)
  const nombre = p?.cliente.nombre ?? 'Cliente'
  return {
    title: `Propuesta para ${nombre}`,
    // Documento privado: fuera del índice. Anula el canonical heredado del
    // layout raíz (que apunta al home) con uno propio.
    robots: { index: false, follow: false },
    alternates: { canonical: `/propuesta/${slug}` },
  }
}

export default async function Page(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const proposal = getProposal(slug)
  if (!proposal) notFound()

  // Cuerpo provisional (se reemplaza en la Task 3 por <ProposalPage/>).
  return <main className="p-10 text-ink">Propuesta para {proposal.cliente.nombre}</main>
}
