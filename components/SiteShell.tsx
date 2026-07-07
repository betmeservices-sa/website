'use client'

// Cascarón común de la página en un idioma dado: provider + scroll suave +
// navbar + footer. Cada ruta (/ y /en) lo monta con su idioma.
import type { Lang } from '@/lib/content'
import { I18nProvider } from '@/lib/i18n'
import SmoothScroll from '@/components/providers/SmoothScroll'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function SiteShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <I18nProvider initialLang={lang}>
      <SmoothScroll>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </SmoothScroll>
    </I18nProvider>
  )
}
