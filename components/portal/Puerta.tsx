'use client'

// Puerta de un paso: si el cliente llega a /portal/cita sin haber pagado, lo
// devuelve al paso que le toca en vez de mostrarle una pantalla a medias.
//
// Recibe el NOMBRE del paso, no una función: las páginas son componentes de
// servidor y una función no cruza esa frontera. La condición de cada paso vive
// acá abajo, en un solo lugar.
//
// Espera a que el estado se lea del navegador (`cargado`) antes de decidir: en
// el primer render el servidor no sabe nada y mandaría a todos al paso 1.

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { usePortal, type Estado } from './estado'

type Paso = 'pago' | 'guion' | 'funciones' | 'implementacion' | 'cita' | 'listo'

const REQUISITO: Record<Paso, { permitido: (e: Estado) => boolean; volver: string }> = {
  pago: { permitido: (e) => Boolean(e.plan), volver: '/portal' },
  guion: { permitido: (e) => e.suscrito, volver: '/portal' },
  funciones: { permitido: (e) => e.suscrito, volver: '/portal' },
  implementacion: {
    permitido: (e) => e.suscrito && e.funciones.length > 0,
    volver: '/portal/funciones',
  },
  cita: { permitido: (e) => e.feePagado, volver: '/portal/implementacion' },
  listo: { permitido: (e) => Boolean(e.cita), volver: '/portal/cita' },
}

export default function Puerta({ paso, children }: { paso: Paso; children: React.ReactNode }) {
  const router = useRouter()
  const { cargado, estado } = usePortal()
  const { permitido, volver } = REQUISITO[paso]
  const ok = permitido(estado)

  useEffect(() => {
    if (cargado && !ok) router.replace(volver)
  }, [cargado, ok, volver, router])

  if (!cargado || !ok) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <span className="h-6 w-6 animate-spin rounded-full border-2 border-white/15 border-t-cyan" />
      </div>
    )
  }

  return <>{children}</>
}
