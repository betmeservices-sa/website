'use client'

import { useI18n } from '@/lib/i18n'
import { site, waLink } from '@/lib/site'
import Logo from '@/components/ui/Logo'
import Icon from '@/components/ui/Icon'

export default function Footer() {
  const { t, lang } = useI18n()
  const base = lang === 'en' ? '/en' : '/'
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-bg-soft">
      <div className="aurora-blob aurora-3 opacity-40" />
      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo className="text-xl" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{t.footer.tagline}</p>
            <div className="mt-6 flex gap-3">
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted transition-colors hover:border-cyan/40 hover:text-cyan" aria-label="WhatsApp">
                <Icon name="whatsapp" className="h-5 w-5" />
              </a>
              <a href={`mailto:${site.email}`} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted transition-colors hover:border-magenta/40 hover:text-magenta" aria-label="Email">
                <Icon name="mail" className="h-5 w-5" />
              </a>
            </div>
          </div>

          {t.footer.cols.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-ink">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={`${base}${link.href}`} className="text-sm text-muted transition-colors hover:text-ink">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-white/10 pt-6 text-center text-xs text-muted">
          <p>© {new Date().getFullYear()} MiAgentIA. {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  )
}
