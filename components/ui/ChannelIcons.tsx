import type { ReactNode } from 'react'

/**
 * Iconos de canal. Son los MISMOS paths que la tarjeta de presentación
 * (tarjetas-miagentia/v2/tarjeta-final.html), para que lo impreso y lo
 * digital sean la misma pieza. Viven aquí y no dentro de una sección
 * porque los usan el orbe del hero y la banda omnicanal.
 *
 * Convención: trazo heredado (stroke: currentColor), y las partes macizas
 * marcadas con .fillcur.
 */
export type ChannelKey =
  | 'whatsapp'
  | 'llamadas'
  | 'instagram'
  | 'facebook'
  | 'correo'
  | 'web'
  | 'ventas'

export const CHANNEL_PATHS: Record<ChannelKey, ReactNode> = {
  whatsapp: (
    <>
      <path d="M3.2 20.8l1.25-4.1A8.6 8.6 0 1 1 7.6 19.6z" />
      <path
        className="fillcur"
        d="M9.1 7.6c.3-.1.6 0 .7.3l.8 1.8c.1.3 0 .5-.2.7l-.6.6c.6 1.2 1.6 2.2 2.8 2.8l.6-.6c.2-.2.5-.3.7-.2l1.8.8c.3.1.4.4.3.7-.3 1.1-1.2 1.6-2.1 1.5-3-.4-5.6-3-6-6-.1-.9.4-1.8 1.2-2.4z"
      />
    </>
  ),
  llamadas: (
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle className="fillcur" cx="17.2" cy="6.8" r="1.2" />
    </>
  ),
  facebook: (
    <path d="M17 3h-2.6A4.4 4.4 0 0 0 10 7.4V10H7.4v3.6H10V21h3.6v-7.4h2.8l.6-3.6h-3.4V7.8c0-.6.4-1 1-1H17z" />
  ),
  correo: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2.2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  web: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.3 9.5h17.4M3.3 14.5h17.4" />
      <path d="M12 3a15 15 0 0 1 0 18A15 15 0 0 1 12 3z" />
    </>
  ),
  ventas: (
    <>
      <path d="M4 20.5v-3.2M8.5 20.5v-5.6M13 20.5v-8" strokeWidth="2.3" />
      <path d="M3.2 12.2 8 8.2l3.4 2.4 7.4-6.4" strokeWidth="1.45" />
      <path d="M14.9 4.1h4v4" strokeWidth="1.45" />
      <circle cx="18.6" cy="16.6" r="4.1" strokeWidth="1.35" />
      <path
        d="M18.6 14.1v5M19.9 15.1c-.25-.4-.7-.65-1.3-.65-.75 0-1.25.35-1.25.9s.45.75 1.25.9c.8.15 1.35.4 1.35 1s-.55.95-1.35.95c-.65 0-1.1-.25-1.4-.65"
        strokeWidth="1.05"
      />
    </>
  ),
}

export function ChannelIcon({ name, className = '' }: { name: ChannelKey; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {CHANNEL_PATHS[name]}
    </svg>
  )
}
