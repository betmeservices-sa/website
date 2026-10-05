// vCard del botón "Guardar contacto" de /women-executive-forum.
//
// Es un archivo real del sitio, no un blob ni un data: URL, porque así es como
// el iPhone abre la ficha con "Crear contacto nuevo": Safari navega aquí y
// muestra el contacto cuando llega como text/vcard inline. En Android es el
// plan B del intent de Chrome, y en computadora es lo que se descarga.
//
// LOS DATOS SON LOS MISMOS que CONFIG.contact en
// public/women-executive-forum.html (lo que hoy arma su buildVcf). Si cambian
// allá, cambian aquí.
//
// Va como Route Handler y no como archivo en public/ por dos razones: el vCard
// pide saltos de línea CRLF (git los convierte a LF en este equipo) y así las
// cabeceras quedan junto al contenido. force-static lo deja prerenderizado: se
// sirve como archivo estático, sin ejecutar código por visita.
export const dynamic = 'force-static'

const LINEAS = [
  'BEGIN:VCARD',
  'VERSION:3.0',
  'N:Alvarez;Sandra;;;',
  'FN:Sandra Alvarez',
  'ORG:MiAgentIA',
  'TITLE:Representante de MiAgentIA',
  'TEL;TYPE=CELL,VOICE:+50378887308',
  'EMAIL;TYPE=INTERNET,WORK:hola@miagentia.com',
  'URL:https://www.miagentia.com/',
  'NOTE:Conocimos en la conferencia. Agentes de IA de voz y WhatsApp.',
  'END:VCARD',
]

export function GET() {
  return new Response(LINEAS.join('\r\n') + '\r\n', {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': 'inline; filename="Sandra-Alvarez.vcf"',
    },
  })
}
