'use client'

// Widget flotante abajo a la derecha que abre el panel de Sofía en pantalla
// completa. Bloquea el scroll del fondo, cierra con la X (arriba a la derecha)
// o con Escape.
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from '@/components/ui/Icon'
import ExcelDashboard from './ExcelDashboard'

export default function DemoLauncher() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        aria-label="Ver el demo del panel de Sofía"
        className="group fixed bottom-5 right-5 z-40 flex items-center gap-2.5 rounded-full border-grad glass py-2.5 pl-2.5 pr-5 shadow-xl transition-transform hover:-translate-y-0.5"
      >
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full [background:var(--grad)] text-bg">
          <Icon name="bot" className="h-5 w-5" />
          <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-bg" />
          </span>
        </span>
        <span className="text-left">
          <span className="block text-sm font-semibold text-ink">Ver demo en vivo</span>
          <span className="block text-[11px] text-muted">El panel de Sofía</span>
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Demo del panel de Sofía"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-bg"
          >
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="h-full w-full"
            >
              <ExcelDashboard />
            </motion.div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar demo"
              className="fixed right-3 top-2.5 z-[110] flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-bg-card/80 text-muted backdrop-blur transition-colors hover:text-ink"
            >
              <Icon name="plus" className="h-5 w-5 rotate-45" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
