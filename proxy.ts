import { NextResponse, type NextRequest } from 'next/server'

// Mayúsculas de las landings de conferencia: /sandra y /andrea (HTML hecho
// aparte en public/, servido por los rewrites de next.config.ts).
//
// Quien escribe la dirección a mano llega con mayúsculas: /Sandra, /ANDREA.
// Esas van a la versión en minúsculas con un 308.
//
// POR QUÉ VIVE AQUÍ Y NO EN redirects() de next.config.ts: Next compara esas
// reglas sin distinguir mayúsculas (experimental.caseSensitiveRoutes viene
// apagado), así que un redirect de /Sandra también atraparía a /sandra y la
// página quedaría en un bucle de redirecciones. Aquí la comparación es exacta,
// en código.
//
// Para sumar otra landing: agregarla a LANDINGS y al matcher de abajo (el
// matcher tiene que ser texto fijo; Next no acepta armarlo con variables).
const LANDINGS = new Set(['/sandra', '/andrea'])

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const minusculas = pathname.toLowerCase()
  if (pathname === minusculas || !LANDINGS.has(minusculas)) return NextResponse.next()

  // clone() conserva el query string (los QR pueden traer utm_*).
  const destino = request.nextUrl.clone()
  destino.pathname = minusculas
  return NextResponse.redirect(destino, 308)
}

export const config = {
  // /sandra y /andrea en cualquier combinación de mayúsculas: así atrapa las
  // variantes tanto si el servidor compara distinguiendo mayúsculas (next
  // start) como si no. El resto del sitio no pasa por aquí.
  matcher: '/:slug([Ss][Aa][Nn][Dd][Rr][Aa]|[Aa][Nn][Dd][Rr][Ee][Aa])',
}
