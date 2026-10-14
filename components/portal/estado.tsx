'use client'

// ── Estado del portal ──
//
// El recorrido son seis pantallas con URL propia, así que el estado no puede
// vivir dentro de una de ellas: vive acá y se guarda en el navegador. Si el
// cliente cierra la pestaña a medio llenar el guion, vuelve y sigue donde iba.
//
// Es una SIMULACIÓN: nada sale de este navegador. Por eso tampoco hay nada
// sensible guardado (la tarjeta no se persiste, ver Checkout).

import { createContext, useCallback, useContext, useEffect, useState } from 'react'

// v3: el horario dejó de ser texto libre y pasó a tres campos. Cambiar la
// llave evita que un recorrido viejo del navegador reviva con la forma
// anterior (antes: `objetivo` suelto y el paso de pago de la mensualidad).
const LLAVE = 'portal.miagentia.v3'

export type Guion = {
  empresa: string
  contacto: string
  email: string
  whatsapp: string
  uso: string
  objetivos: string[]
  // Lo que escribió en "Otro". Vive aparte del id para no perderlo si lo
  // desmarca y lo vuelve a marcar.
  objetivoOtro: string
  crm: string
  calendario: string
  canales: string[]
  tono: string
  idiomas: string[]
  // Horario de atención, de listas y no de texto libre: días y, si no atiende
  // las 24 horas, el rango. Ver textoHorario() para armarlo en una línea.
  horarioDias: string
  horarioDesde: string
  horarioHasta: string
  queNoHace: string
  notas: string
}

export type Cita = { fecha: string; hora: string }

export type Estado = {
  plan: string | null
  guion: Guion
  guionListo: boolean
  funciones: string[]
  feePagado: boolean
  cita: Cita | null
}

const VACIO: Estado = {
  plan: null,
  guion: {
    empresa: '',
    contacto: '',
    email: '',
    whatsapp: '',
    uso: '',
    objetivos: [],
    objetivoOtro: '',
    crm: '',
    calendario: '',
    canales: [],
    tono: '',
    idiomas: ['Español'],
    horarioDias: '',
    horarioDesde: '',
    horarioHasta: '',
    queNoHace: '',
    notas: '',
  },
  guionListo: false,
  funciones: [],
  feePagado: false,
  cita: null,
}

type Ctx = {
  // `cargado` existe porque el primer render es del servidor y no conoce el
  // localStorage. Las pantallas no deciden nada (ni redirigen) hasta que es
  // true, o mandarían al cliente de vuelta al paso 1 sin razón.
  cargado: boolean
  estado: Estado
  set: (parche: Partial<Estado>) => void
  setGuion: (parche: Partial<Guion>) => void
  reiniciar: () => void
}

const PortalCtx = createContext<Ctx | null>(null)

export function PortalProvider({ children }: { children: React.ReactNode }) {
  const [estado, setEstado] = useState<Estado>(VACIO)
  const [cargado, setCargado] = useState(false)

  useEffect(() => {
    try {
      const crudo = localStorage.getItem(LLAVE)
      if (crudo) {
        const previo = JSON.parse(crudo) as Partial<Estado>
        setEstado({ ...VACIO, ...previo, guion: { ...VACIO.guion, ...previo.guion } })
      }
    } catch {
      // Navegador sin storage: el recorrido sigue, solo no se recuerda.
    }
    setCargado(true)
  }, [])

  useEffect(() => {
    if (!cargado) return
    try {
      localStorage.setItem(LLAVE, JSON.stringify(estado))
    } catch {}
  }, [estado, cargado])

  const set = useCallback((parche: Partial<Estado>) => {
    setEstado((e) => ({ ...e, ...parche }))
  }, [])

  const setGuion = useCallback((parche: Partial<Guion>) => {
    setEstado((e) => ({ ...e, guion: { ...e.guion, ...parche } }))
  }, [])

  const reiniciar = useCallback(() => {
    setEstado(VACIO)
    try {
      localStorage.removeItem(LLAVE)
    } catch {}
  }, [])

  return (
    <PortalCtx.Provider value={{ cargado, estado, set, setGuion, reiniciar }}>
      {children}
    </PortalCtx.Provider>
  )
}

export function usePortal(): Ctx {
  const c = useContext(PortalCtx)
  if (!c) throw new Error('usePortal fuera del PortalProvider')
  return c
}

// El guion está completo cuando están las respuestas que cambian el alcance.
// Lo demás (notas, qué no hace) es opcional a propósito.
export function guionCompleto(g: Guion): boolean {
  // Si marcó "Otro" tiene que decir cuál: un objetivo en blanco no se puede
  // escribir ni cobrar.
  const otroListo = !g.objetivos.includes('otro') || Boolean(g.objetivoOtro.trim())
  return Boolean(
    g.empresa && g.contacto && g.email && g.uso && g.objetivos.length && otroListo && g.canales.length,
  )
}
