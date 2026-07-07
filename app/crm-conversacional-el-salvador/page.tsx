import type { Metadata } from 'next'
import KeywordLanding, { type KeywordLandingData } from '@/components/KeywordLanding'
import { SITE_URL } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'CRM Conversacional en El Salvador',
  description:
    'CRM conversacional con IA para negocios en El Salvador: cada chat de WhatsApp y cada llamada queda registrada, calificada y con seguimiento automático. Demo gratis.',
  alternates: { canonical: '/crm-conversacional-el-salvador' },
}

const data: KeywordLandingData = {
  eyebrow: 'El Salvador · CRM + IA',
  titleTop: 'CRM conversacional en',
  titleGrad: 'El Salvador',
  intro:
    'Deja de perder ventas por conversaciones olvidadas. Con MiAgentIA, cada chat de WhatsApp y cada llamada de tu negocio en El Salvador queda registrada en tu CRM: quién escribió, qué necesita, en qué etapa va y cuándo darle seguimiento. La IA atiende y organiza; tu equipo cierra.',
  benefits: [
    { icon: 'whatsapp', title: 'Todo queda registrado', desc: 'Cada conversación de WhatsApp y llamada se guarda con su contexto en tu CRM.' },
    { icon: 'filter', title: 'Pipeline ordenado', desc: 'Los leads se clasifican por etapa: nuevo, calificado, cita agendada, cerrado.' },
    { icon: 'bolt', title: 'Seguimiento automático', desc: 'Recordatorios y mensajes de seguimiento para que ningún lead se enfríe.' },
    { icon: 'user', title: 'Tu equipo con contexto', desc: 'Cuando un vendedor toma la conversación, ya sabe todo lo que pasó.' },
  ],
  steps: [
    { title: 'Conectamos tus canales', desc: 'WhatsApp Business y tu línea telefónica entran al mismo sistema.' },
    { title: 'La IA atiende y registra', desc: 'Responde, califica y deja cada interacción documentada en el CRM.' },
    { title: 'Tu equipo cierra ventas', desc: 'Recibe leads calificados con historial completo y citas ya agendadas.' },
  ],
  faq: [
    { q: '¿Qué es un CRM conversacional?', a: 'Un CRM que se alimenta de tus conversaciones reales (WhatsApp, llamadas) en vez de depender de que alguien registre los datos a mano. La IA captura y organiza todo automáticamente.' },
    { q: '¿Sirve si ya uso otro CRM?', a: 'Sí. Nos integramos con tu CRM actual o te configuramos uno; en ambos casos las conversaciones quedan registradas y organizadas.' },
    { q: '¿Funciona para negocios en El Salvador?', a: 'Sí, trabajamos con negocios salvadoreños y de la región. La implementación es remota y en español.' },
    { q: '¿Cuánto cuesta?', a: 'El precio se cotiza según los canales y el volumen de tu negocio. Escríbenos y te armamos una propuesta a medida.' },
  ],
  cta: 'Quiero mi CRM conversacional',
  waMessage: 'Hola MiAgentIA, quiero un CRM conversacional para mi negocio en El Salvador.',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'CRM Conversacional en El Salvador',
      serviceType: 'CRM conversacional con IA',
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: 'El Salvador',
      url: `${SITE_URL}/crm-conversacional-el-salvador`,
      description:
        'CRM conversacional con IA: conversaciones de WhatsApp y llamadas registradas, calificadas y con seguimiento automático para negocios en El Salvador.',
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
