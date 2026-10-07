'use client'

import { useI18n } from '@/lib/i18n'
import { ChannelIcon, type ChannelKey } from '@/components/ui/ChannelIcons'

/**
 * Las puertas que abre Sofía, y el cliente único detrás de todas.
 *
 * Cinco canales a la izquierda, líneas que convergen en UNA sola ficha de
 * contacto a la derecha. Por cada línea viaja un cometa; cuando llega, se
 * enciende la insignia de ese canal dentro de la ficha — pero la ficha
 * nunca cambia. Ese es todo el argumento: cambia la puerta, no la persona.
 *
 * Línea gráfica MiAgentIA: negro, trazo fino, degradado cian → violeta →
 * magenta, geometría simple. Nada de ilustración.
 */

const DOORS: { key: ChannelKey; tint: string; y: number }[] = [
  { key: 'whatsapp',  tint: '#22D3EE', y: 26 },
  { key: 'instagram', tint: '#9B6CF6', y: 88 },
  { key: 'facebook',  tint: '#5B8CF7', y: 150 },
  { key: 'llamadas',  tint: '#67E8F9', y: 212 },
  { key: 'correo',    tint: '#E879F9', y: 274 },
]

export default function ContactoUnico() {
  const { t } = useI18n()
  const o = t.omni

  return (
    <div className="cu">
      <div className="cu-stage">
        {/* Las líneas. pathLength=1 normaliza cada curva para que el cometa
            tarde lo mismo en todas aunque midan distinto. */}
        <svg className="cu-wires" viewBox="0 0 560 300" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="cu-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#22D3EE" />
              <stop offset="0.55" stopColor="#8B5CF6" />
              <stop offset="1" stopColor="#E879F9" />
            </linearGradient>
          </defs>
          {DOORS.map((d, i) => {
            const path = `M96 ${d.y} C 230 ${d.y}, 250 150, 372 150`
            return (
              <g key={d.key}>
                <path d={path} className="cu-wire" />
                <path
                  d={path}
                  pathLength={1}
                  className="cu-comet"
                  style={{ ['--d' as string]: `${i * 0.8}s` }}
                />
              </g>
            )
          })}
        </svg>

        {/* Las puertas */}
        <div className="cu-doors">
          {DOORS.map((d) => (
            <div key={d.key} className="cu-door" style={{ ['--tint' as string]: d.tint }}>
              <ChannelIcon name={d.key} />
            </div>
          ))}
        </div>

        {/* El cliente: uno solo, pase lo que pase */}
        <div className="cu-card">
          <div className="cu-avatar" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="8.4" r="3.6" />
              <path d="M4.8 20.2a7.2 7.2 0 0 1 14.4 0" />
            </svg>
          </div>
          <p className="cu-title">{o.cardTitle}</p>
          <p className="cu-sub">{o.cardSub}</p>
          <div className="cu-badges">
            {DOORS.map((d, i) => (
              <span
                key={d.key}
                className="cu-badge"
                style={{ ['--tint' as string]: d.tint, ['--d' as string]: `${i * 0.8}s` }}
              >
                <ChannelIcon name={d.key} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
