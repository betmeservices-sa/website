'use client'

// Paso 5: el fee de implementación y su cobro.
//
// Arriba va lo que el cliente contestó (el guion) y en la orden van las
// funciones con su precio. A propósito no se repiten entre las dos columnas:
// la de la izquierda dice QUÉ se va a construir, la derecha CUÁNTO cuesta.

import { useRouter } from 'next/navigation'
import {
  PRECIO_FUNCION,
  PRECIO_OBJETIVO,
  USOS,
  dinero,
  funcion,
  nombreObjetivo,
  plan,
} from './catalogo'
import { usePortal } from './estado'
import Checkout, { type Linea } from './Checkout'

export default function Implementacion() {
  const router = useRouter()
  const { estado, set } = usePortal()
  const g = estado.guion

  const objetivos = g.objetivos.map((id) => nombreObjetivo(id, g.objetivoOtro))

  // El primer objetivo es el guion base y va dentro: solo se cobran los demás.
  const lineas: Linea[] = [
    ...objetivos.slice(1).map((nombre) => ({
      concepto: `Objetivo: ${nombre}`,
      detalle: 'Guion adicional',
      monto: PRECIO_OBJETIVO,
    })),
    ...estado.funciones.map((id) => ({
      concepto: funcion(id)?.nombre ?? id,
      monto: PRECIO_FUNCION,
    })),
  ]

  const uso = USOS.find((u) => u.id === g.uso)?.nombre
  const integra = [g.crm, g.calendario].filter((x) => x && x !== 'Ninguno todavía')
  const suscripcion = plan(estado.plan)

  const filas: [string, string][] = [
    ['Empresa', g.empresa],
    ['Para', uso ?? ''],
    [objetivos.length === 1 ? 'Objetivo' : 'Objetivos', objetivos.join(' · ')],
    ['Canales', g.canales.join(', ')],
    ['Integraciones', integra.length ? integra.join(' y ') : 'Ninguna por ahora'],
    ['Tono', g.tono],
    ['Horario', g.horario],
    ['Idiomas', g.idiomas.join(', ')],
    ['No debe', g.queNoHace],
  ]

  const resumen = (
  <section className="mt-10 border-t border-white/5 pt-8">
    <h2 className="font-display text-lg font-semibold text-ink">Lo que vamos a construir</h2>
    <dl className="mt-5 grid gap-x-10 gap-y-4 sm:grid-cols-2">
      {filas
        .filter(([, v]) => Boolean(v))
        .map(([k, v]) => (
          <div key={k} className="border-b border-white/5 pb-3">
            <dt className="font-display text-[11px] uppercase tracking-[0.16em] text-muted">{k}</dt>
            <dd className="mt-1 text-sm leading-relaxed text-ink">{v}</dd>
          </div>
        ))}
    </dl>
    {g.notas && (
      <p className="mt-5 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm leading-relaxed text-muted">
        {g.notas}
      </p>
    )}
    {suscripcion && (
      <p className="mt-6 text-sm text-muted">
        Tu paquete {suscripcion.nombre}, de {dinero(suscripcion.mensual)} al mes, empieza a
        cobrarse después de la segunda reunión. Hoy no se toca.
      </p>
    )}
  </section>
  )

  return (
    <Checkout
      eyebrow="Paso 4 de 5"
      titulo={
        <>
          Tu <span className="text-grad">implementación</span>.
        </>
      }
      bajada="Un solo pago por armar el agente: tus objetivos y las funciones que elegiste. Es lo único que se cobra hoy. Al confirmarlo eliges la hora de la llamada de arranque."
      lineas={lineas}
      textoBoton="Pagar"
      onPagado={() => {
        set({ feePagado: true })
        router.push('/portal/cita')
      }}
      debajo={resumen}
    />
  )
}
