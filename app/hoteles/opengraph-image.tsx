import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

// Imagen para compartir /hoteles: el logo oficial arriba y la promesa de la
// página debajo. Mismas reglas de satori que la imagen raíz: todo contenedor con
// varios hijos lleva display:flex y no hay gradientes cónicos.
export const alt = 'Sofía, agente de IA para hoteles: reservas por WhatsApp, Instagram y Messenger'
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
          flexDirection: 'column',
          justifyContent: 'center',
          background: '#05050A',
          position: 'relative',
          padding: '0 90px',
        }}
      >
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

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={392} height={110} alt="" style={{ marginLeft: -14 }} />

        <div
          style={{
            display: 'flex',
            marginTop: 44,
            fontSize: 70,
            fontWeight: 600,
            lineHeight: 1.08,
            letterSpacing: -2,
            color: '#EDEDF5',
          }}
        >
          Su hotel confirma reservas por chat a cualquier hora
        </div>
        <div style={{ display: 'flex', marginTop: 28, fontSize: 31, color: '#9A9AB0' }}>
          Sofía, agente de IA para hoteles · WhatsApp, Instagram y Messenger
        </div>
      </div>
    ),
    { ...size },
  )
}
