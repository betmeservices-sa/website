// Iconos de los canales que conecta un hotel. Reusa los paths de marca de
// ChannelIcons y agrega Messenger, que el resto del sitio no usa.
import { CHANNEL_PATHS } from '@/components/ui/ChannelIcons'

export type Canal = 'whatsapp' | 'instagram' | 'messenger' | 'facebook'

export function CanalIcon({ canal, className = '' }: { canal: Canal; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`[&_.fillcur]:fill-current [&_.fillcur]:stroke-none ${className}`}
    >
      {canal === 'messenger' ? (
        <>
          <path d="M12 3C6.9 3 3 6.7 3 11.4c0 2.6 1.2 4.9 3.1 6.4V21l3-1.6c.9.3 1.9.4 2.9.4 5.1 0 9-3.7 9-8.4S17.1 3 12 3z" />
          <path d="m7.4 13.5 3-3.2 2.7 2 3.5-2.9" />
        </>
      ) : (
        CHANNEL_PATHS[canal]
      )}
    </svg>
  )
}
