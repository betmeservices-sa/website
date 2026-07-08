import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/propuesta/' },
    sitemap: 'https://www.miagentia.com/sitemap.xml',
    host: 'https://www.miagentia.com',
  }
}
