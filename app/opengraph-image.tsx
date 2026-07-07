import { ImageResponse } from 'next/og'

// Imagen para compartir en redes (og:image + twitter:image). Next la enlaza
// automáticamente en el <head>. Se genera con next/og (satori): cada contenedor
// con varios hijos lleva display:flex.
export const alt = 'MiAgentIA · Agentes de IA de voz y WhatsApp'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(125% 125% at 50% 0%, #17142e 0%, #0a0a12 62%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
          padding: 80,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            fontSize: 104,
            fontWeight: 700,
            letterSpacing: -3,
          }}
        >
          <span>MiAgent</span>
          <span style={{ color: '#a78bfa' }}>IA</span>
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 8,
            fontSize: 20,
            letterSpacing: 8,
            textTransform: 'uppercase',
            color: '#22d3ee',
          }}
        >
          Voz + WhatsApp · 24/7
        </div>
        <div
          style={{
            marginTop: 34,
            maxWidth: 860,
            textAlign: 'center',
            fontSize: 38,
            lineHeight: 1.3,
            color: '#c7c7d6',
          }}
        >
          Agentes de IA que atienden, venden y agendan por tu negocio.
        </div>
      </div>
    ),
    { ...size },
  )
}
