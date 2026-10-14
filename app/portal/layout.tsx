import type { Metadata } from 'next'
import PortalShell from '@/components/portal/PortalShell'

export const metadata: Metadata = {
  title: 'Portal de contratación',
  description: 'Elige tu paquete, define tu agente y agenda el arranque.',
  // Es un recorrido de compra simulado, no una página de venta: no tiene por
  // qué aparecer en una búsqueda. El disallow de robots.ts acompaña.
  robots: { index: false, follow: false, nocache: true },
}

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return <PortalShell>{children}</PortalShell>
}
