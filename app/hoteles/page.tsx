import type { Metadata } from 'next'
import HotelesPage from '@/components/hoteles/HotelesPage'
import { SITE_URL } from '@/lib/jsonld'

const TITULO = 'Agente de IA para hoteles: reservas por WhatsApp, Instagram y Messenger'
const DESCRIPCION =
  'Sofía atiende el chat de su hotel a cualquier hora: consulta disponibilidad y tarifas en su PMS, aparta la habitación, lee el comprobante de pago y deja la reserva confirmada.'

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRIPCION,
  alternates: { canonical: '/hoteles' },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: '/hoteles',
    siteName: 'MiAgentIA',
    title: TITULO,
    description: DESCRIPCION,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITULO,
    description: DESCRIPCION,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Sofía, agente de IA para hoteles',
  serviceType: 'Agente de IA para reservas de hotel por chat',
  provider: { '@id': `${SITE_URL}/#organization` },
  url: `${SITE_URL}/hoteles`,
  audience: { '@type': 'BusinessAudience', name: 'Hoteles' },
  description: DESCRIPCION,
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HotelesPage />
    </>
  )
}
