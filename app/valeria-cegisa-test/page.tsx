import type { Metadata } from 'next'

// Página de prueba: la evaluación de Valeria (CEGISA) servida desde Google
// Apps Script dentro de un iframe. No está enlazada desde el sitio, no va en
// el sitemap y queda bloqueada en robots.txt; el noindex de aquí es el que
// manda. El CSP general no deja embeber otros dominios: next.config.ts le abre
// frame-src a script.google.com solo a esta ruta.
export const metadata: Metadata = {
  title: 'Evaluación de Valeria',
  robots: { index: false, follow: false },
}

export default function Page() {
  return (
    <iframe
      src="https://script.google.com/macros/s/AKfycbwmQJTY5t7UxCEskI7QVZNJ1850zi3Po-YPJMQIriWyZFFCm33y5GD-c2fc7NlS9SX-lg/exec"
      title="Evaluación de Valeria"
      style={{ width: '100%', height: 1400, border: 0, maxWidth: 1200, display: 'block', margin: '0 auto' }}
      allow="clipboard-write"
      loading="lazy"
    />
  )
}
