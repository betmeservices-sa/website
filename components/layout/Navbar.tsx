'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useI18n } from '@/lib/i18n'
import { site } from '@/lib/site'
import Logo from '@/components/ui/Logo'
import Icon from '@/components/ui/Icon'

// El idioma vive en la ruta (/ = es, /en = en): el toggle navega.
function LangToggle() {
  const { lang } = useI18n()
  const router = useRouter()
  return (
    <div className="relative flex items-center rounded-full border border-white/10 bg-white/[0.04] p-0.5 text-xs font-semibold">
      <span
        className="absolute top-0.5 bottom-0.5 w-1/2 rounded-full [background:var(--grad)] transition-transform duration-300"
        style={{ transform: lang === 'en' ? 'translateX(100%)' : 'translateX(0)' }}
      />
      {(['es', 'en'] as const).map((l) => (
        <button
          key={l}
          onClick={() => l !== lang && router.push(l === 'en' ? '/en' : '/')}
          className={`relative z-10 w-9 rounded-full py-1.5 uppercase transition-colors ${
            lang === l ? 'text-bg' : 'text-muted hover:text-ink'
          }`}
          aria-pressed={lang === l}
        >
          {l}
        </button>
      ))}
    </div>
  )
}

export default function Navbar() {
  const { t, lang } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  // Prefijo de la home del idioma actual: así los anclajes también
  // funcionan desde las páginas de aterrizaje por keyword.
  const base = lang === 'en' ? '/en' : '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'border-b border-white/10 bg-bg/80 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a href={`${base}#top`} aria-label="MiAgentIA">
          <Logo className="text-lg" />
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {t.nav.links.map((item) => (
            <a
              key={item.href}
              href={`${base}${item.href}`}
              className="text-sm font-medium text-white/70 transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <LangToggle />
          <a
            href={`${base}${site.booking}`}
            className="hidden rounded-full [background:var(--grad)] px-5 py-2.5 text-sm font-semibold text-bg transition-transform duration-300 hover:-translate-y-0.5 sm:inline-block"
          >
            {t.nav.cta}
          </a>
          <button
            className="flex h-10 w-10 items-center justify-center text-ink lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menú"
            aria-expanded={open}
          >
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-6 bg-current transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
              <span className={`block h-0.5 w-6 bg-current transition-opacity ${open ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-6 bg-current transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
            </div>
          </button>
        </div>
      </nav>

      <div
        className={`overflow-hidden bg-bg/95 backdrop-blur-xl lg:hidden ${
          open ? 'max-h-96 border-b border-white/10' : 'max-h-0'
        } transition-all duration-300`}
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {t.nav.links.map((item) => (
            <a
              key={item.href}
              href={`${base}${item.href}`}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-base font-medium text-white/80 hover:bg-white/5"
            >
              {item.label}
            </a>
          ))}
          <a
            href={`${base}${site.booking}`}
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 rounded-full [background:var(--grad)] px-5 py-3 text-sm font-semibold text-bg"
          >
            {t.nav.cta}
            <Icon name="arrow" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  )
}
