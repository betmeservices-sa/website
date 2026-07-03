'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { content, type Lang, type Dict } from './content'

interface I18nCtx {
  lang: Lang
  t: Dict
  setLang: (l: Lang) => void
  toggle: () => void
}

const Ctx = createContext<I18nCtx | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('es')

  // Rehidratar preferencia guardada
  useEffect(() => {
    const saved = window.localStorage.getItem('miagentia-lang') as Lang | null
    if (saved === 'es' || saved === 'en') setLangState(saved)
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    window.localStorage.setItem('miagentia-lang', l)
    document.documentElement.lang = l
  }

  const toggle = () => setLang(lang === 'es' ? 'en' : 'es')

  return (
    <Ctx.Provider value={{ lang, t: content[lang], setLang, toggle }}>
      {children}
    </Ctx.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useI18n debe usarse dentro de <I18nProvider>')
  return ctx
}
