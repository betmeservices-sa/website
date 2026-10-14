'use client'

// Paso 2: el cobro de la suscripción.
//
// Es el mismo Checkout que cobra la implementación, con otras líneas: acá hay
// una sola y es periódica.

import { useRouter } from 'next/navigation'
import { dinero, plan } from './catalogo'
import { usePortal } from './estado'
import Checkout from './Checkout'

export default function Pago() {
  const router = useRouter()
  const { estado, set } = usePortal()
  const p = plan(estado.plan)
  if (!p) return null

  return (
    <Checkout
      eyebrow="Paso 2 de 6"
      titulo={
        <>
          Activa tu <span className="text-grad">suscripción</span>.
        </>
      }
      bajada={`${p.nombre}, ${dinero(p.mensual)} al mes. Después de esto te preguntamos qué tiene que hacer tu agente.`}
      lineas={[{ concepto: `Paquete ${p.nombre}`, detalle: p.para, monto: p.mensual }]}
      periodico
      textoBoton="Suscribirme por"
      onPagado={() => {
        set({ suscrito: true })
        router.push('/portal/guion')
      }}
    />
  )
}
