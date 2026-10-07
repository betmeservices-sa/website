import { claveCorrecta, cookieDeSesion } from '@/lib/panel-leads-sesion'

// Entrada al panel /leads: recibe la clave del formulario, deja la cookie y
// vuelve a /leads. Si la clave no es, vuelve con ?clave=mal para el aviso.
export async function POST(request: Request) {
  const form = await request.formData().catch(() => null)
  const clave = String(form?.get('clave') ?? '')
  if (!claveCorrecta(clave)) {
    return new Response(null, { status: 303, headers: { Location: '/leads?clave=mal' } })
  }
  return new Response(null, {
    status: 303,
    headers: { Location: '/leads', 'Set-Cookie': cookieDeSesion() },
  })
}
