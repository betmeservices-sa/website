import { NextResponse, type NextRequest } from 'next/server'

// Variantes de la URL del Women Executive Forum.
//
// La canónica es /women-executive-forum (la sirve el rewrite de next.config.ts
// desde public/women-executive-forum.html). Quien escriba la dirección a mano
// llega con mayúsculas o con espacios: /Women-Executive-Forum o
// /Women%20Executive%20Forum. Esas van a la canónica con un 308.
//
// POR QUÉ VIVE AQUÍ Y NO EN redirects() de next.config.ts: Next compara esas
// reglas sin distinguir mayúsculas (experimental.caseSensitiveRoutes viene
// apagado), así que un redirect de /Women-Executive-Forum también atraparía a
// /women-executive-forum y la página quedaría en un bucle de redirecciones.
// Aquí la comparación es exacta, en código.
const CANONICA = '/women-executive-forum'
const CLAVE = 'womenexecutiveforum'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname === CANONICA) return NextResponse.next()

  let ruta = pathname
  try {
    ruta = decodeURIComponent(pathname)
  } catch {
    // Codificación rota: se compara tal como llegó.
  }
  // Solo letras y números: da igual si separan con guiones, espacios o nada.
  const clave = ruta.toLowerCase().replace(/[^a-z0-9]/g, '')
  if (clave !== CLAVE) return NextResponse.next()

  // clone() conserva el query string (los QR pueden traer utm_*).
  const destino = request.nextUrl.clone()
  destino.pathname = CANONICA
  return NextResponse.redirect(destino, 308)
}

export const config = {
  // Rutas de un solo tramo que empiezan con "women", en cualquier combinación
  // de mayúsculas: así atrapa las variantes tanto si el servidor compara
  // distinguiendo mayúsculas (next start) como si no. El resto del sitio no
  // pasa por aquí.
  matcher: '/:slug([Ww][Oo][Mm][Ee][Nn][^/]*)',
}
