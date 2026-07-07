import type { Metadata } from 'next'
import SiteShell from '@/components/SiteShell'
import HomeSections from '@/components/HomeSections'
import { buildJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
    languages: { es: '/', en: '/en', 'x-default': '/' },
  },
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd('es')) }}
      />
      <SiteShell lang="es">
        <HomeSections />
      </SiteShell>
    </>
  )
}
