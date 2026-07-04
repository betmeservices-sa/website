'use client'

// Demo de WhatsApp VISUAL (sin APIs): teléfono con conversación scripteada,
// indicador de "escribiendo..." y burbujas estilo WhatsApp. Se reproduce al
// entrar en vista y puede repetirse.
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import AnimatedContent from '@/components/reactbits/AnimatedContent'
import Eyebrow from '@/components/ui/Eyebrow'
import Icon from '@/components/ui/Icon'
import { VoiceBadge } from '@/components/ui/Logo'

function Tick() {
  return (
    <svg viewBox="0 0 18 12" className="h-3 w-4 text-cyan" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 6.5 4.5 10 11 2M7.5 6.5 11 10 17.5 2" />
    </svg>
  )
}

export default function WhatsAppDemo() {
  const { t } = useI18n()
  const [visible, setVisible] = useState(0)
  const [typing, setTyping] = useState(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const phoneRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inView = useInView(phoneRef, { once: true, margin: '-120px' })

  const clear = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  const play = () => {
    clear()
    setVisible(0)
    setTyping(false)
    let at = 700
    t.chat.thread.forEach((msg, i) => {
      if (msg.who === 'out') {
        // El agente "escribe" antes de responder
        timers.current.push(setTimeout(() => setTyping(true), at))
        at += 1300
      }
      timers.current.push(
        setTimeout(() => {
          setTyping(false)
          setVisible(i + 1)
        }, at),
      )
      at += msg.who === 'out' ? 1500 : 1200
    })
  }

  useEffect(() => {
    if (inView) play()
    return clear
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  // Re-reproducir al cambiar idioma si ya estaba en vista
  useEffect(() => {
    if (inView) play()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t])

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [visible, typing])

  const done = visible >= t.chat.thread.length

  return (
    <section id="chat" className="relative overflow-hidden py-24 sm:py-32">
      <div className="aurora-blob aurora-2 opacity-50" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Texto */}
          <AnimatedContent className="order-2 lg:order-1">
            <Eyebrow>{t.chat.label}</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight sm:text-5xl">{t.chat.title}</h2>
            <p className="mt-4 max-w-md text-muted sm:text-lg">{t.chat.sub}</p>
            <button
              onClick={play}
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-grad transition-opacity hover:opacity-80"
            >
              <Icon name="sparkle" className="h-4 w-4 text-violet" />
              {t.chat.replay}
            </button>
          </AnimatedContent>

          {/* Teléfono */}
          <AnimatedContent delay={0.15} className="order-1 flex justify-center lg:order-2">
            <div ref={phoneRef} className="relative w-[320px] sm:w-[360px]">
              {/* Glow trasero */}
              <div className="absolute -inset-6 rounded-[3rem] opacity-40 blur-2xl" style={{ background: 'var(--grad)' }} />

              <div className="relative overflow-hidden rounded-[2.6rem] border border-white/15 bg-[#0B141A] shadow-2xl">
                {/* Notch */}
                <div className="absolute left-1/2 top-2 z-20 h-6 w-28 -translate-x-1/2 rounded-full bg-black" />

                {/* Header WhatsApp */}
                <div className="relative z-10 flex items-center gap-3 bg-[#1F2C34] px-4 pb-3 pt-10">
                  <VoiceBadge className="h-9 w-9" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">{t.chat.contact}</p>
                    <p className="text-[11px] text-[#8696A0]">{typing ? t.chat.typing : t.chat.status}</p>
                  </div>
                  <Icon name="phone" className="h-5 w-5 text-[#8696A0]" />
                </div>

                {/* Hilo */}
                <div
                  ref={scrollRef}
                  className="flex h-[420px] flex-col gap-2 overflow-y-auto px-3 py-4"
                  style={{
                    backgroundColor: '#0B141A',
                    backgroundImage:
                      'radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1.2px)',
                    backgroundSize: '18px 18px',
                  }}
                >
                  <AnimatePresence>
                    {t.chat.thread.slice(0, visible).map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 14, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className={`max-w-[80%] rounded-xl px-3 py-2 text-[13px] leading-snug text-white/95 shadow ${
                          msg.who === 'out'
                            ? 'self-end rounded-tr-sm bg-[#005C4B]'
                            : 'self-start rounded-tl-sm bg-[#1F2C34]'
                        }`}
                      >
                        {msg.text}
                        <span className="mt-0.5 flex items-center justify-end gap-1 text-[10px] text-white/50">
                          {`${String(9 + Math.floor(i / 2)).padStart(2, '0')}:${String(12 + i * 3).padStart(2, '0')}`}
                          {msg.who === 'out' && <Tick />}
                        </span>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {typing && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex w-16 items-center justify-center gap-1 self-end rounded-xl rounded-tr-sm bg-[#005C4B] px-3 py-3"
                    >
                      {[0, 1, 2].map((d) => (
                        <span
                          key={d}
                          className="h-1.5 w-1.5 rounded-full bg-white/70"
                          style={{ animation: `blink 1s ease-in-out ${d * 0.2}s infinite` }}
                        />
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* Input falso */}
                <div className="flex items-center gap-2 bg-[#1F2C34] px-3 py-2.5">
                  <div className="flex-1 rounded-full bg-[#2A3942] px-4 py-2 text-[13px] text-[#8696A0]">
                    {t.chat.placeholder}
                  </div>
                  <span className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${done ? '[background:var(--grad)]' : 'bg-[#00A884]'}`}>
                    <Icon name="arrow" className="h-4 w-4 text-white" />
                  </span>
                </div>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </section>
  )
}
