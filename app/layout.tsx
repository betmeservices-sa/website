import type { Metadata } from 'next'
import { inter, space } from '@/lib/fonts'
import { I18nProvider } from '@/lib/i18n'
import { content } from '@/lib/content'
import { site } from '@/lib/site'
import SmoothScroll from '@/components/providers/SmoothScroll'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import './globals.css'

// Dominio canónico: el apex miagentia.com redirige (308) a www en Vercel.
const SITE_URL = 'https://www.miagentia.com'

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
  alternates: { canonical: '/' },
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

// Datos estructurados (JSON-LD). El bloque FAQPage refleja el FAQ visible en
// español (idioma por defecto que se renderiza en el HTML del servidor).
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'MiAgentIA',
      url: SITE_URL,
      logo: `${SITE_URL}/brand/wordmark.png`,
      email: site.email,
      description: content.es.footer.tagline,
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: 'MiAgentIA',
      url: SITE_URL,
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'es',
    },
    {
      '@type': 'Service',
      name: 'Agentes de IA de voz y WhatsApp',
      serviceType: 'Automatización de atención al cliente con IA',
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: 'Latinoamérica',
      description: content.es.services.sub,
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      mainEntity: content.es.faq.items.map((it) => ({
        '@type': 'Question',
        name: it.q,
        acceptedAnswer: { '@type': 'Answer', text: it.a },
      })),
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${space.variable}`} suppressHydrationWarning>
      <body className="grain font-sans antialiased" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <I18nProvider>
          <SmoothScroll>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
        </I18nProvider>
      </body>
    </html>
  )
}
