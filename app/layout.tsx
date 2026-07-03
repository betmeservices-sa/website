import type { Metadata } from 'next'
import { inter, space } from '@/lib/fonts'
import { I18nProvider } from '@/lib/i18n'
import SmoothScroll from '@/components/providers/SmoothScroll'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://miagentia.com'),
  title: {
    default: 'MiAgentIA · Agentes de IA de Voz y WhatsApp',
    template: '%s · MiAgentIA',
  },
  description:
    'Soluciones inteligentes: agentes de IA que atienden llamadas y WhatsApp, califican leads y agendan citas por tu negocio, 24/7.',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: 'MiAgentIA',
    title: 'MiAgentIA · Agentes de IA de Voz y WhatsApp',
    description:
      'Agentes de IA que atienden, venden y agendan por ti. Voz natural + WhatsApp, 24/7.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${space.variable}`} suppressHydrationWarning>
      <body className="grain font-sans antialiased" suppressHydrationWarning>
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
