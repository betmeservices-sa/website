'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import AnimatedContent from '@/components/reactbits/AnimatedContent'
import Eyebrow from '@/components/ui/Eyebrow'
import Icon from '@/components/ui/Icon'

export default function Faq() {
  const { t } = useI18n()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="relative border-t border-white/5 bg-bg-soft/60 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <AnimatedContent className="text-center">
          <Eyebrow>{t.faq.label}</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight sm:text-5xl">{t.faq.title}</h2>
        </AnimatedContent>

        <div className="mt-12 space-y-3">
          {t.faq.items.map((item, i) => {
            const isOpen = open === i
            return (
              <AnimatedContent key={item.q} delay={i * 0.05}>
                <div className={`overflow-hidden rounded-2xl border transition-colors ${isOpen ? 'border-violet/40 bg-bg-card' : 'border-white/10 bg-bg-card/60'}`}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-base font-medium sm:text-lg">{item.q}</span>
                    <span className={`transition-transform duration-300 ${isOpen ? 'rotate-45 text-magenta' : 'text-muted'}`}>
                      <Icon name="plus" className="h-5 w-5" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <p className="px-6 pb-5 text-sm leading-relaxed text-muted sm:text-base">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </AnimatedContent>
            )
          })}
        </div>
      </div>
    </section>
  )
}
