import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/jsonld'

// Landing en dos idiomas: / (es) y /en. Las alternates le dicen a Google
// que son la misma página en distinto idioma (hreflang).
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { es: SITE_URL, en: `${SITE_URL}/en` }
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      alternates: { languages },
    },
    {
      url: `${SITE_URL}/en`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: { languages },
    },
    // Páginas de aterrizaje por keyword (solo español)
    ...[
      'agente-ia-whatsapp-guatemala',
      'crm-conversacional-el-salvador',
      'automatizacion-ventas-whatsapp',
    ].map((slug) => ({
      url: `${SITE_URL}/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    // Legales (es + en)
    {
      url: `${SITE_URL}/privacidad`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: { languages: { es: `${SITE_URL}/privacidad`, en: `${SITE_URL}/en/privacy` } },
    },
    {
      url: `${SITE_URL}/en/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: { languages: { es: `${SITE_URL}/privacidad`, en: `${SITE_URL}/en/privacy` } },
    },
    {
      url: `${SITE_URL}/terminos`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: { languages: { es: `${SITE_URL}/terminos`, en: `${SITE_URL}/en/terms` } },
    },
    {
      url: `${SITE_URL}/en/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: { languages: { es: `${SITE_URL}/terminos`, en: `${SITE_URL}/en/terms` } },
    },
  ]
}
