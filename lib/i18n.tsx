'use client'

import { createContext, useContext, useEffect, type ReactNode } from 'react'
import { content, type Lang, type Dict } from './content'

// El idioma lo define la RUTA (/ = es, /en = en), no un estado de cliente:
// así Google indexa ambas versiones desde el HTML del servidor.
// El toggle de la navbar navega entre rutas.
interface I18nCtx {
  lang: Lang
  t: Dict
}

const Ctx = createContext<I18nCtx | null>(null)

export function I18nProvider({
  initialLang = 'es',
  children,
}: {
  initialLang?: Lang
  children: ReactNode
}) {
  // El atributo lang del <html> (fijado en "es" por el layout raíz)
  // se corrige en cliente para /en.
  useEffect(() => {
    document.documentElement.lang = initialLang
  }, [initialLang])

  return (
    <Ctx.Provider value={{ lang: initialLang, t: content[initialLang] }}>
      {children}
    </Ctx.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useI18n debe usarse dentro de <I18nProvider>')
  return ctx
}
