import type { Metadata } from 'next'
import { inter, space } from '@/lib/fonts'
import { SITE_URL } from '@/lib/jsonld'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'MiAgentIA · Agentes de IA de Voz y WhatsApp',
    template: '%s · MiAgentIA',
  },
  description:
    'Agentes de IA que atienden llamadas y WhatsApp, califican leads y agendan citas por tu negocio, 24/7. Implementación en días. Agenda una demo gratis.',
  keywords: [
    'agentes de IA',
    'agente de voz IA',
    'chatbot de WhatsApp',
    'IA para negocios',
    'automatización de atención al cliente',
    'agendar citas con IA',
    'call center con IA',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: SITE_URL,
    siteName: 'MiAgentIA',
    title: 'MiAgentIA · Agentes de IA de Voz y WhatsApp',
    description:
      'Agentes de IA que atienden, venden y agendan por ti. Voz natural + WhatsApp, 24/7. Agenda una demo gratis.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MiAgentIA · Agentes de IA de Voz y WhatsApp',
    description: 'Agentes de IA que atienden, venden y agendan por ti. Voz + WhatsApp, 24/7.',
  },
  robots: { index: true, follow: true },
  // Al verificar en Google Search Console, pega aquí el código:
  // verification: { google: 'TU-CODIGO-DE-VERIFICACION' },
}

// El lang del <html> es "es" por defecto; en /en el I18nProvider lo corrige
// en cliente y las etiquetas hreflang le dicen a Google qué versión es cuál.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${space.variable}`} suppressHydrationWarning>
      <body className="grain font-sans antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
