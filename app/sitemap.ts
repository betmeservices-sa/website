import type { MetadataRoute } from 'next'

// Landing de una sola página (con anclas). Si en el futuro hay páginas
// dedicadas (p. ej. /precios, /industrias/automotriz), agrégalas aquí.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.miagentia.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
