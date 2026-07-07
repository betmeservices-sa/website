import { content, type Lang } from './content'
import { site } from './site'

export const SITE_URL = 'https://www.miagentia.com'

// Datos estructurados (JSON-LD) por idioma. El FAQPage refleja el FAQ
// visible en el HTML del servidor de cada ruta.
export function buildJsonLd(lang: Lang) {
  const t = content[lang]
  const pageUrl = lang === 'es' ? SITE_URL : `${SITE_URL}/en`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'MiAgentIA',
        url: SITE_URL,
        logo: `${SITE_URL}/brand/wordmark.png`,
        email: site.email,
        description: t.footer.tagline,
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: 'MiAgentIA',
        url: SITE_URL,
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: lang,
      },
      {
        '@type': 'Service',
        name: lang === 'es' ? 'Agentes de IA de voz y WhatsApp' : 'AI voice and WhatsApp agents',
        serviceType:
          lang === 'es'
            ? 'Automatización de atención al cliente con IA'
            : 'AI customer service automation',
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: lang === 'es' ? 'Latinoamérica' : 'Latin America',
        description: t.services.sub,
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: t.faq.items.map((it) => ({
          '@type': 'Question',
          name: it.q,
          acceptedAnswer: { '@type': 'Answer', text: it.a },
        })),
      },
    ],
  }
}
