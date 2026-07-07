import type { Metadata } from 'next'
import SiteShell from '@/components/SiteShell'
import HomeSections from '@/components/HomeSections'
import { buildJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'AI Voice & WhatsApp Agents',
  description:
    'AI agents that answer calls and WhatsApp, qualify leads and book appointments for your business, 24/7. Live in days. Book a free demo.',
  alternates: {
    canonical: '/en',
    languages: { es: '/', en: '/en', 'x-default': '/' },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/en',
    siteName: 'MiAgentIA',
    title: 'MiAgentIA · AI Voice & WhatsApp Agents',
    description:
      'AI agents that answer, sell and book for you. Natural voice + WhatsApp, 24/7. Book a free demo.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MiAgentIA · AI Voice & WhatsApp Agents',
    description: 'AI agents that answer, sell and book for you. Voice + WhatsApp, 24/7.',
  },
}

export default function HomeEnglish() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd('en')) }}
      />
      <SiteShell lang="en">
        <HomeSections />
      </SiteShell>
    </>
  )
}
