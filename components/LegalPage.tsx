// Página legal (privacidad / términos): mismo cascarón del sitio con una
// columna de lectura. El contenido viene como JSX desde cada ruta.
import type { Lang } from '@/lib/content'
import SiteShell from '@/components/SiteShell'

export function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display mt-10 text-xl font-semibold text-ink first:mt-0">{children}</h2>
  )
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 text-[15px] leading-relaxed text-muted">{children}</p>
}

export function UL({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-muted">
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  )
}

export default function LegalPage({
  lang,
  title,
  updated,
  children,
}: {
  lang: Lang
  title: string
  updated: string
  children: React.ReactNode
}) {
  return (
    <SiteShell lang={lang}>
      <section className="relative overflow-hidden">
        <div className="aurora-blob aurora-2 opacity-30" />
        <div className="relative mx-auto max-w-3xl px-5 pb-24 pt-36 sm:px-8">
          <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {title}
          </h1>
          <p className="mt-2 text-sm text-muted">{updated}</p>
          <div className="mt-8">{children}</div>
        </div>
      </section>
    </SiteShell>
  )
}
