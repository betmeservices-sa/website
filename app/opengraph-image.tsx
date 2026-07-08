import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

// Imagen para compartir en redes (og:image + twitter:image): el LOGO oficial
// (bolita + wordmark + tagline) centrado sobre el fondo oscuro de marca.
// Se genera con next/og (satori): cada contenedor con varios hijos lleva
// display:flex y los gradientes cónicos no existen (por eso el logo va en PNG).
export const alt = 'MiAgentIA · Soluciones Inteligentes'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const logo = await readFile(join(process.cwd(), 'public/brand/logo-lockup.png'))
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#05050A',
          position: 'relative',
        }}
      >
        {/* Glows de marca (cian arriba-izquierda, magenta abajo-derecha) */}
        <div
          style={{
            position: 'absolute',
            left: -220,
            top: -220,
            width: 640,
            height: 640,
            background: 'radial-gradient(circle, rgba(34,211,238,0.28) 0%, rgba(34,211,238,0) 65%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: -220,
            bottom: -220,
            width: 640,
            height: 640,
            background: 'radial-gradient(circle, rgba(232,121,249,0.26) 0%, rgba(232,121,249,0) 65%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 300,
            top: 115,
            width: 600,
            height: 400,
            background: 'radial-gradient(circle, rgba(139,92,246,0.22) 0%, rgba(139,92,246,0) 70%)',
          }}
        />

        {/* Logo oficial */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={902} height={253} alt="" />
      </div>
    ),
    { ...size },
  )
}
