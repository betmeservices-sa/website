import type { Metadata } from 'next'
import Checklist from '@/components/onboarding/Checklist'
import { FEEDBACK_YALI, GRUPOS_YALI } from '@/components/onboarding/checklist-yali'

export const metadata: Metadata = {
  title: 'Kickoff · Yali Hospitality',
  description: 'Lo que se acordó en el kickoff: los accesos y las decisiones del agente.',
  // Es la lista de accesos de un cliente: no tiene por qué aparecer en una
  // búsqueda. El disallow de robots.ts acompaña, pero el que manda es este.
  robots: { index: false, follow: false, nocache: true },
  referrer: 'no-referrer',
}

export default function OnboardingYaliPage() {
  return (
    <Checklist
      cliente="yali"
      titulo="Kickoff de"
      tituloGrad="Yali Hospitality"
      bajada="Esto es lo que entendimos de la llamada del 24 de agosto, ya escrito. No hay que llenarlo desde cero: léanlo, corrijan lo que esté mal y agreguen lo que falte. Lo que quedó sin definir aparece en blanco a propósito. Se guarda en este navegador, así que pueden ir de a poco."
      grupos={[...GRUPOS_YALI, FEEDBACK_YALI]}
    />
  )
}
