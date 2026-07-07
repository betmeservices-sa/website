import type { Metadata } from 'next'
import KeywordLanding, { type KeywordLandingData } from '@/components/KeywordLanding'
import { SITE_URL } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Agente de IA para WhatsApp en Guatemala',
  description:
    'Automatiza la atención de tu negocio en Guatemala con un agente de IA para WhatsApp: responde al instante, califica clientes y agenda citas 24/7. Demo gratis.',
  alternates: { canonical: '/agente-ia-whatsapp-guatemala' },
}

const data: KeywordLandingData = {
  eyebrow: 'Guatemala · WhatsApp + IA',
  titleTop: 'Agente de IA para WhatsApp en',
  titleGrad: 'Guatemala',
  intro:
    'En Guatemala los clientes escriben por WhatsApp a toda hora, y el que responde primero se queda con la venta. Un agente de IA de MiAgentIA contesta cada mensaje al instante, en el tono de tu marca, califica al cliente y le agenda cita en tu calendario. Tú solo hablas con gente lista para comprar.',
  benefits: [
    { icon: 'whatsapp', title: 'Respuesta inmediata', desc: 'Cada mensaje se contesta en segundos, de día, de noche y en fin de semana.' },
    { icon: 'filter', title: 'Califica a cada cliente', desc: 'Hace las preguntas correctas y separa a los curiosos de los compradores.' },
    { icon: 'calendar', title: 'Agenda por ti', desc: 'Reserva la cita directo en tu calendario y envía recordatorios.' },
    { icon: 'plug', title: 'Se integra a tu negocio', desc: 'Conectamos tu CRM, hojas de cálculo o sistema actual.' },
  ],
  steps: [
    { title: 'Diseñamos tu agente', desc: 'Definimos guion, personalidad y objetivos según tu negocio en Guatemala.' },
    { title: 'Lo conectamos a tu WhatsApp', desc: 'El agente responde desde tu número con WhatsApp Business.' },
    { title: 'Atiende y agenda 24/7', desc: 'Responde, califica y llena tu calendario desde el día uno.' },
  ],
  faq: [
    { q: '¿Funciona con mi número de WhatsApp actual?', a: 'Sí. Integramos con WhatsApp Business para que el agente responda desde tu número, con el tono de tu marca.' },
    { q: '¿Cuánto tarda la implementación en Guatemala?', a: 'Normalmente días, no meses. Todo se hace remoto: diseño, entrenamiento y conexión.' },
    { q: '¿Qué pasa si el cliente quiere hablar con una persona?', a: 'El agente transfiere la conversación a tu equipo con todo el contexto capturado. La IA filtra, tu equipo cierra.' },
    { q: '¿Para qué negocios sirve?', a: 'Clínicas, automotriz, inmobiliarias, restaurantes, e-commerce y servicios: cualquier negocio que reciba mensajes de clientes.' },
  ],
  cta: 'Quiero mi agente en WhatsApp',
  waMessage: 'Hola MiAgentIA, quiero un agente de IA para WhatsApp en Guatemala.',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'Agente de IA para WhatsApp en Guatemala',
      serviceType: 'Automatización de WhatsApp con IA',
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: 'Guatemala',
      url: `${SITE_URL}/agente-ia-whatsapp-guatemala`,
      description:
        'Agente de IA que responde WhatsApp al instante, califica clientes y agenda citas 24/7 para negocios en Guatemala.',
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
