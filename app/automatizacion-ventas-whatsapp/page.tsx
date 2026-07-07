import type { Metadata } from 'next'
import KeywordLanding, { type KeywordLandingData } from '@/components/KeywordLanding'
import { SITE_URL } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Automatización de Ventas por WhatsApp',
  description:
    'Automatiza tu proceso de ventas en WhatsApp con IA: respuesta inmediata, calificación de leads, citas agendadas y seguimiento sin trabajo manual. Demo gratis.',
  alternates: { canonical: '/automatizacion-ventas-whatsapp' },
}

const data: KeywordLandingData = {
  eyebrow: 'Ventas · WhatsApp + IA',
  titleTop: 'Automatización de ventas por',
  titleGrad: 'WhatsApp',
  intro:
    'Tu embudo de ventas en WhatsApp, en piloto automático: la IA responde al primer mensaje en segundos, hace las preguntas de calificación, agenda la cita y da seguimiento a los que no contestaron. Tu equipo deja de perseguir curiosos y dedica su tiempo a cerrar.',
  benefits: [
    { icon: 'bolt', title: 'Primer contacto instantáneo', desc: 'El lead recibe respuesta en segundos, cuando su interés está al máximo.' },
    { icon: 'filter', title: 'Calificación automática', desc: 'Preguntas de presupuesto, urgencia y necesidad antes de pasar al vendedor.' },
    { icon: 'calendar', title: 'Citas sin fricción', desc: 'El agente propone horarios, reserva en tu calendario y envía recordatorios.' },
    { icon: 'plug', title: 'Conectado a tus anuncios', desc: 'Los leads de Meta Ads o Google entran directo al flujo de WhatsApp.' },
  ],
  steps: [
    { title: 'Mapeamos tu proceso de venta', desc: 'Qué preguntas califican a un lead y qué pasos llevan al cierre.' },
    { title: 'Automatizamos el embudo', desc: 'Respuesta, calificación, agendamiento y seguimiento quedan en manos de la IA.' },
    { title: 'Tu equipo solo cierra', desc: 'Recibe leads calientes con contexto completo y cita agendada.' },
  ],
  faq: [
    { q: '¿La automatización suena robótica?', a: 'No. El agente escribe con el tono de tu marca y conversa de forma natural; la mayoría de los clientes no nota la diferencia.' },
    { q: '¿Qué pasa con los leads que no responden?', a: 'El sistema les da seguimiento automático con mensajes espaciados para recuperarlos sin ser invasivo.' },
    { q: '¿Se conecta con mis campañas de anuncios?', a: 'Sí. Los leads que llegan de Meta Ads, Google u otras fuentes entran directo al flujo automatizado de WhatsApp.' },
    { q: '¿Puedo intervenir una conversación en cualquier momento?', a: 'Siempre. Tu equipo puede tomar el control de cualquier chat y la IA le deja todo el contexto.' },
  ],
  cta: 'Quiero automatizar mis ventas',
  waMessage: 'Hola MiAgentIA, quiero automatizar mis ventas por WhatsApp.',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'Automatización de Ventas por WhatsApp',
      serviceType: 'Automatización de ventas con IA',
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: ['Guatemala', 'El Salvador', 'Latinoamérica'],
      url: `${SITE_URL}/automatizacion-ventas-whatsapp`,
      description:
        'Embudo de ventas de WhatsApp automatizado con IA: respuesta inmediata, calificación, citas y seguimiento sin trabajo manual.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: data.faq.map((it) => ({
        '@type': 'Question',
        name: it.q,
        acceptedAnswer: { '@type': 'Answer', text: it.a },
      })),
    },
  ],
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <KeywordLanding data={data} />
    </>
  )
}
