import type { Metadata } from 'next'
import FormularioOnboarding from '@/components/onboarding/FormularioOnboarding'
import { BLOQUES_YALI } from '@/components/onboarding/preguntas-yali'

export const metadata: Metadata = {
  title: 'Puesta en marcha · Yali Hospitality',
  description: 'Lo que necesitamos de Yali Hospitality para poner el agente en marcha.',
  // Es un formulario con datos del cliente: no tiene por qué aparecer en una
  // búsqueda. El disallow de robots.ts acompaña, pero el que manda es este.
  robots: { index: false, follow: false, nocache: true },
  referrer: 'no-referrer',
}

export default function OnboardingYaliPage() {
  return (
    <FormularioOnboarding
      cliente="yali"
      titulo="Lo que necesitamos de"
      tituloGrad="Yali Hospitality"
      bajada="Cinco bloques. Lo que se llene acá es literalmente lo que el agente va a saber y a decirle a sus huéspedes. Se guarda solo en este navegador mientras escriben: pueden cerrar y volver después."
      urgente="Lo más urgente son los accesos de Cloudbeds y de Meta. Son los dos que desbloquean todo lo demás: sin Cloudbeds el agente no puede ver tarifas ni disponibilidad reales, y sin Meta no puede contestar por WhatsApp ni redes."
      bloques={BLOQUES_YALI}
    />
  )
}
