'use client'

import { useRef } from 'react'
import { useI18n } from '@/lib/i18n'
import { waLink } from '@/lib/site'
import Aurora from '@/components/reactbits/Aurora'
import AnimatedContent from '@/components/reactbits/AnimatedContent'
import Eyebrow from '@/components/ui/Eyebrow'
import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'

// Ventana de loop: en vez de reiniciar desde 0 (salto visible), el video
// regresa 2s antes del final y se queda repitiendo ese tramo.
const LOOP_WINDOW = 2

export default function FinalCta() {
  const { t } = useI18n()
  const videoRef = useRef<HTMLVideoElement>(null)

  const seekBack = () => {
    const v = videoRef.current
    if (!v || !isFinite(v.duration)) return
    v.currentTime = Math.max(0, v.duration - LOOP_WINDOW)
    if (v.paused) v.play().catch(() => {})
  }

  const onTimeUpdate = () => {
    const v = videoRef.current
    if (!v || !isFinite(v.duration)) return
    // timeupdate dispara cada ~250ms; margen para alcanzar a saltar antes del fin
    if (v.currentTime >= v.duration - 0.3) seekBack()
  }

  return (
    <section id="empezar" className="relative overflow-hidden py-28 sm:py-36">
      <Aurora dots={false} />
      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        {/* Mascota: robot de voz + chat. FUERA de AnimatedContent: el transform
            de GSAP crea un stacking context y rompe mix-blend-screen (el negro
            del video dejaría de fundirse con el fondo). Máscara radial de
            respaldo para desvanecer los bordes del rectángulo. */}
        <video
          ref={videoRef}
          src="/robot.mp4"
          autoPlay
          muted
          playsInline
          onTimeUpdate={onTimeUpdate}
          onEnded={seekBack}
          aria-hidden="true"
          className="pointer-events-none mx-auto mb-4 h-56 w-auto mix-blend-screen animate-float sm:h-72 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_58%,transparent_84%)]"
        />
        <AnimatedContent>
          <Eyebrow badge>{t.finalCta.label}</Eyebrow>
          <h2 className="mt-6 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-grad">{t.finalCta.title}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted sm:text-lg">{t.finalCta.sub}</p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href={waLink()}>
              <Icon name="calendar" className="h-4 w-4" />
              {t.finalCta.cta}
            </Button>
            <span className="text-sm text-muted">{t.finalCta.or}</span>
            <Button href={waLink()} variant="ghost">
              <Icon name="whatsapp" className="h-4 w-4 text-cyan" />
              {t.finalCta.wa}
            </Button>
          </div>
        </AnimatedContent>
      </div>
    </section>
  )
}
