import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/propuesta/',
        '/confianza-5da3ff939845',
        '/hospital-propuesta-4e91c7a3b6d8.html',
        '/content-calendar-8ef21efd3853.html',
      ],
    },
    sitemap: 'https://www.miagentia.com/sitemap.xml',
    host: 'https://www.miagentia.com',
  }
}
