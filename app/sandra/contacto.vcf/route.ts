import { respuestaVcard } from '@/lib/landing-contacto'

// vCard del botón "Guardar contacto" de /sandra. Los datos salen del
// CONFIG.contact de public/sandra.html (ver lib/landing-contacto.ts): para
// cambiarlos se edita solo el HTML.
//
// force-static: se arma en el build y se sirve como archivo estático.
export const dynamic = 'force-static'

export function GET() {
  return respuestaVcard('sandra.html')
}
