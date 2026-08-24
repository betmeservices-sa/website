import type { Metadata } from 'next'
import Checklist from '@/components/onboarding/Checklist'
import { GRUPOS_YALI } from '@/components/onboarding/checklist-yali'

export const metadata: Metadata = {
  title: 'Puesta en marcha · Yali Hospitality',
  description: 'Los accesos y las decisiones para poner el agente en marcha.',
  // Es la lista de accesos de un cliente: no tiene por qué aparecer en una
  // búsqueda. El disallow de robots.ts acompaña, pero el que manda es este.
  robots: { index: false, follow: false, nocache: true },
  referrer: 'no-referrer',
}

export default function OnboardingYaliPage() {
  return (
    <Checklist
      cliente="yali"
      titulo="Puesta en marcha de"
      tituloGrad="Yali Hospitality"
      bajada="Esto es una lista para recorrer juntos en una llamada, no un formulario para llenar solos. Cada punto dice quién lo hace y por qué hace falta. Se guarda en este navegador, así que pueden ir avanzando de a poco."
      grupos={GRUPOS_YALI}
    />
  )
}
