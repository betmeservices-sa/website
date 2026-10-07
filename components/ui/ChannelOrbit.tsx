'use client'

import Image from 'next/image'
import { ChannelIcon, type ChannelKey } from '@/components/ui/ChannelIcons'

/**
 * El orbe del hero: los canales girando alrededor de Sofía.
 *
 * Es el mensaje principal dicho como imagen — "todos tus canales, un solo
 * agente" — y reemplaza al robot. Los iconos son los mismos de la tarjeta.
 *
 * Mecánica: un anillo gira; cada canal se coloca en su ángulo con
 * rotate(θ) translate(R) rotate(-θ), y por dentro contra-gira a la misma
 * velocidad para quedarse derecho. Si cambias la duración del giro, cámbiala
 * en los DOS sitios (--spin) o los iconos empiezan a cabecear.
 */

const CHANNELS: { key: ChannelKey; label: string; tint: string }[] = [
  { key: 'whatsapp',  label: 'WhatsApp',   tint: '#22D3EE' },
  { key: 'instagram', label: 'Instagram',  tint: '#9B6CF6' },
  { key: 'facebook',  label: 'Facebook',   tint: '#5B8CF7' },
  { key: 'llamadas',  label: 'Llamadas',   tint: '#67E8F9' },
  { key: 'correo',    label: 'Correo',     tint: '#8B5CF6' },
  { key: 'web',       label: 'Sitio web',  tint: '#E879F9' },
]

export default function ChannelOrbit({ className = '' }: { className?: string }) {
  const step = 360 / CHANNELS.length
  return (
    <div className={`orbit ${className}`}>
      <div className="orbit-glow" aria-hidden="true" />
      <div className="orbit-track orbit-track-a" aria-hidden="true" />
      <div className="orbit-track orbit-track-b" aria-hidden="true" />

      <div className="orbit-ring">
        {CHANNELS.map((c, i) => (
          <div
            key={c.key}
            className="orbit-item"
            style={{ ['--a' as string]: `${i * step}deg` }}
          >
            <div className="orbit-chip" style={{ ['--tint' as string]: c.tint }}>
              <ChannelIcon name={c.key} />
            </div>
          </div>
        ))}
      </div>

      {/* Sofía al centro */}
      <div className="orbit-core">
        <Image src="/brand/orbe-sofia.png" alt="" width={240} height={240} priority />
      </div>
      <span className="orbit-name">Sofía</span>
    </div>
  )
}
