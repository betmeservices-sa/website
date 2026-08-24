import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/propuesta/',
        // "Cómo funciona" es interna por ahora: se manda por enlace directo. El
        // noindex de la propia página es el que manda; esto le evita el rastreo.
        '/como-funciona',
        '/en/how-it-works',
        '/interno-arquitectura-2c456d0b006c',
        '/confianza-5da3ff939845',
        '/hospital-propuesta-4e91c7a3b6d8.html',
        '/content-calendar-8ef21efd3853.html',
        '/yali-propuesta-d6c5d46bd219.html',
        // Formularios de onboarding: los llena el cliente por enlace directo.
        '/onboarding/',
      ],
    },
    sitemap: 'https://www.miagentia.com/sitemap.xml',
    host: 'https://www.miagentia.com',
  }
}
