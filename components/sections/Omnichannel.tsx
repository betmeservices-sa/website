'use client'

import Image from 'next/image'
import { useI18n } from '@/lib/i18n'
import AnimatedContent from '@/components/reactbits/AnimatedContent'
import Eyebrow from '@/components/ui/Eyebrow'

/**
 * Banda omnicanal. Es el mismo recorrido que la tarjeta de presentación
 * (canales → orbe → ventas) y usa los MISMOS paths SVG, para que lo impreso
 * y lo digital sean la misma pieza.
 *
 * El movimiento es CSS puro: un pulso viaja por cada conector hacia el orbe,
 * el orbe respira y el nodo de ventas se enciende cuando el pulso llega.
 * Todo queda anulado bajo prefers-reduced-motion (ver globals.css).
 */

const CHANNEL_ICONS = [
  // WhatsApp
  <g key="wa">
    <path d="M3.2 20.8l1.25-4.1A8.6 8.6 0 1 1 7.6 19.6z" />
    <path
      className="fillcur"
      d="M9.1 7.6c.3-.1.6 0 .7.3l.8 1.8c.1.3 0 .5-.2.7l-.6.6c.6 1.2 1.6 2.2 2.8 2.8l.6-.6c.2-.2.5-.3.7-.2l1.8.8c.3.1.4.4.3.7-.3 1.1-1.2 1.6-2.1 1.5-3-.4-5.6-3-6-6-.1-.9.4-1.8 1.2-2.4z"
    />
  </g>,
  // Llamadas
  <path
    key="call"
    d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"
  />,
  // Correo
  <g key="mail">
    <rect x="2.5" y="5" width="19" height="14" rx="2.2" />
    <path d="m3 7 9 6 9-6" />
  </g>,
  // Instagram
  <g key="ig">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle className="fillcur" cx="17.2" cy="6.8" r="1.2" />
  </g>,
  // Facebook
  <path
    key="fb"
    d="M17 3h-2.6A4.4 4.4 0 0 0 10 7.4V10H7.4v3.6H10V21h3.6v-7.4h2.8l.6-3.6h-3.4V7.8c0-.6.4-1 1-1H17z"
  />,
]

// Degradado del recorrido: cian en WhatsApp → violeta al llegar al orbe.
const CHANNEL_TINT = ['#22D3EE', '#5B8CF7', '#6B7AF6', '#7C6CF5', '#8B5CF6']

export default function Omnichannel() {
  const { t } = useI18n()
  const o = t.omni

  return (
    <section id="omnicanal" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <AnimatedContent className="mx-auto max-w-2xl text-center">
          <Eyebrow>{o.label}</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
            {o.titleTop}{' '}
            <span className="text-gradient">{o.titleGrad}</span>
          </h2>
          <p className="mt-4 text-muted sm:text-lg">{o.sub}</p>
        </AnimatedContent>

        <AnimatedContent delay={0.1}>
          <div className="omni-wrap mt-16">
            <div className="omni-rail">
              {o.channels.map((name, i) => (
                <div className="omni-step" key={name}>
                  <div className="omni-icon">
                    <div
                      className="omni-node"
                      style={{ ['--tint' as string]: CHANNEL_TINT[i] }}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        {CHANNEL_ICONS[i]}
                      </svg>
                    </div>
                  </div>
                  <span className="omni-cap">{name}</span>
                  <div
                    className={`omni-link${i === o.channels.length - 1 ? ' omni-link-tohub' : ''}`}
                    style={{
                      ['--tint' as string]: CHANNEL_TINT[i],
                      ['--tint2' as string]:
                        CHANNEL_TINT[Math.min(i + 1, CHANNEL_TINT.length - 1)],
                      ['--delay' as string]: `${i * 0.26}s`,
                    }}
                  >
                    <i className="omni-pulse" />
                  </div>
                </div>
              ))}

              {/* El agente */}
              <div className="omni-step omni-step-hub">
                <div className="omni-icon">
                  <div className="omni-hub">
                    <Image src="/brand/orbe-sofia.png" alt="" width={120} height={120} priority />
                  </div>
                </div>
                <span className="omni-cap omni-cap-hub">{o.hub}</span>
                <div className="omni-link omni-link-out">
                  <i className="omni-pulse omni-pulse-out" />
                </div>
              </div>

              {/* A dónde lleva */}
              <div className="omni-step">
                <div className="omni-icon">
                  <div className="omni-node omni-node-out">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M4 20.5v-3.2M8.5 20.5v-5.6M13 20.5v-8" strokeWidth="2.3" />
                      <path d="M3.2 12.2 8 8.2l3.4 2.4 7.4-6.4" strokeWidth="1.45" />
                      <path d="M14.9 4.1h4v4" strokeWidth="1.45" />
                      <circle cx="18.6" cy="16.6" r="4.1" strokeWidth="1.35" />
                      <path
                        d="M18.6 14.1v5M19.9 15.1c-.25-.4-.7-.65-1.3-.65-.75 0-1.25.35-1.25.9s.45.75 1.25.9c.8.15 1.35.4 1.35 1s-.55.95-1.35.95c-.65 0-1.1-.25-1.4-.65"
                        strokeWidth="1.05"
                      />
                    </svg>
                  </div>
                </div>
                <span className="omni-cap">{o.out}</span>
              </div>
            </div>

            <p className="mt-10 text-center text-sm text-muted">{o.caption}</p>
          </div>
        </AnimatedContent>
      </div>
    </section>
  )
}
