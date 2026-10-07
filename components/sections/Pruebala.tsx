'use client'

import VoiceDemo from '@/components/sections/VoiceDemo'
import WhatsAppDemo from '@/components/sections/WhatsAppDemo'

/**
 * Una sola sección para los dos demos.
 *
 * Antes eran dos secciones seguidas con su propio titular cada una, lo que
 * en un one-pager se lee como dos paradas distintas para la misma idea.
 * Ahora es una sola parada con las dos piezas dentro.
 */
export default function Pruebala() {
  return (
    <section id="demos" className="relative py-24 sm:py-32">
      <div className="space-y-20 sm:space-y-28">
        <VoiceDemo />
        <WhatsAppDemo />
      </div>
    </section>
  )
}
