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

const LLAVE = 'portal.miagentia.v1'

export type Guion = {
  empresa: string
  contacto: string
  email: string
  whatsapp: string
  uso: string
  objetivo: string
  crm: string
  calendario: string
  canales: string[]
  tono: string
  idiomas: string[]
  horario: string
  queNoHace: string
  notas: string
}

export type Cita = { fecha: string; hora: string }

export type Estado = {
  plan: string | null
  suscrito: boolean
  guion: Guion
  guionListo: boolean
  funciones: string[]
  feePagado: boolean
  cita: Cita | null
}

const VACIO: Estado = {
  plan: null,
  suscrito: false,
  guion: {
    empresa: '',
    contacto: '',
    email: '',
    whatsapp: '',
    uso: '',
    objetivo: '',
    crm: '',
    calendario: '',
    canales: [],
    tono: '',
    idiomas: ['Español'],
    horario: '',
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
  return Boolean(g.empresa && g.contacto && g.email && g.uso && g.objetivo && g.canales.length)
}
