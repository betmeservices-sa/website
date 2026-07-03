import type { ReactNode } from 'react'

type Variant = 'primary' | 'ghost'

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60'

const styles: Record<Variant, string> = {
  primary:
    'text-bg [background:var(--grad)] hover:-translate-y-0.5 hover:glow-violet',
  ghost:
    'text-ink glass hover:-translate-y-0.5 hover:border-white/20',
}

export default function Button({
  children,
  href,
  variant = 'primary',
  className = '',
  onClick,
  ...rest
}: {
  children: ReactNode
  href?: string
  variant?: Variant
  className?: string
  onClick?: () => void
} & Record<string, unknown>) {
  const cls = `${base} ${styles[variant]} ${className}`
  if (href) {
    const external = href.startsWith('http')
    return (
      <a href={href} className={cls} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <button onClick={onClick} className={cls} {...rest}>
      {children}
    </button>
  )
}
