import { VoiceBadge } from './Logo'

// Etiqueta superior de sección: punto/insignia + texto en mayúsculas.
export default function Eyebrow({ children, badge = false }: { children: React.ReactNode; badge?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-muted">
      {badge ? (
        <VoiceBadge className="!h-4 !w-4" />
      ) : (
        <span className="h-1.5 w-1.5 rounded-full [background:var(--grad)]" />
      )}
      {children}
    </span>
  )
}
