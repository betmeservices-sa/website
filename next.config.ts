import type { NextConfig } from 'next'
import path from 'path'

// Cabeceras de seguridad.
//
// POR QUÉ EXISTEN. El 14 de septiembre de 2026 TikTok rechazó la solicitud para
// su plataforma de desarrolladores con este motivo: "unable to onboard you due
// to the security of the domain you have provided". No dicen qué falló, y la
// revisión del dominio la hace un escáner automático antes de que lo mire una
// persona. De las seis cabeceras que esos escáneres miran, el sitio solo tenía
// una (HSTS, que la pone Vercel sola).
//
// Se aplican a TODAS las rutas: un escáner puede entrar por cualquiera.
const seguridad = [
  // Dos años, y también los subdominios (hub, demo y conectar ya son HTTPS).
  // Sin `preload`: eso es un compromiso que se registra en los navegadores y
  // cuesta revertir, y no hace falta para pasar un escáner.
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  // Que el navegador no adivine tipos de archivo.
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Contra el clickjacking. SAMEORIGIN y no DENY porque DENY rompería en
  // silencio cualquier vista propia que se embeba a futuro; para el escáner
  // valen lo mismo.
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // No filtrar la ruta completa a sitios de terceros.
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // El sitio no usa nada de esto. Declararlo cerrado es gratis.
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=()',
  },
  {
    key: 'Content-Security-Policy',
    // LO QUE ESTE CSP PERMITE Y POR QUÉ, porque uno mal puesto deja el sitio en
    // blanco y eso es peor que el rechazo de TikTok:
    //   - script-src con 'unsafe-inline': Next inyecta scripts en línea para
    //     hidratar, el JSON-LD de cada página va en línea, y el init de GA4
    //     también. Quitarlo exige nonces por middleware; se deja anotado como
    //     lo próximo si alguna vez hace falta un CSP estricto de verdad.
    //   - googletagmanager y google-analytics: es el GA4 de app/layout.tsx.
    //   - frame-ancestors 'self': el mismo criterio que X-Frame-Options.
    //   - object-src 'none': no hay Flash ni applets, y es de lo primero que
    //     mira un escáner.
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://www.googletagmanager.com https://www.google-analytics.com",
      "font-src 'self' data:",
      "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      'upgrade-insecure-requests',
    ].join('; '),
  },
]

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  // Deja de anunciar que el sitio corre Next y con qué versión. Es la primera
  // línea de cualquier reporte de escáner.
  poweredByHeader: false,
  async headers() {
    return [{ source: '/:path*', headers: seguridad }]
  },
  async redirects() {
    return [
      { source: '/home', destination: '/', permanent: true },
      // Las páginas legales viven en /privacidad y /en/privacy. Un revisor que
      // escribe /privacy o /terms a mano se encontraba un 404, y "no encuentro
      // la política de privacidad" es justo de lo que se queja una revisión.
      { source: '/privacy', destination: '/en/privacy', permanent: true },
      { source: '/terms', destination: '/en/terms', permanent: true },
      { source: '/privacy-policy', destination: '/en/privacy', permanent: true },
      { source: '/politica-de-privacidad', destination: '/privacidad', permanent: true },
      { source: '/terminos-y-condiciones', destination: '/terminos', permanent: true },
    ]
  },
}

export default nextConfig
