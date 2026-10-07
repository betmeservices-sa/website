import { guardarLead, leadDesdeFormulario, listarLeads } from '@/lib/leads'
import { cookieDesdeHeader, sesionValida } from '@/lib/panel-leads-sesion'

// Formulario «Déjanos tus datos» de las landings de conferencia (/sandra,
// /andrea). Guarda la fila y responde 200; la página muestra el gracias.
export async function POST(request: Request) {
  let cuerpo: unknown
  try {
    cuerpo = await request.json()
  } catch {
    return Response.json({ ok: false, error: 'json invalido' }, { status: 400 })
  }

  const lead = leadDesdeFormulario(cuerpo, 'datos', request.headers.get('user-agent'))
  if (!lead) return Response.json({ ok: false, error: 'falta el nombre' }, { status: 400 })
  if (!lead.telefono && !lead.correo) {
    return Response.json({ ok: false, error: 'falta telefono o correo' }, { status: 400 })
  }

  try {
    const fila = await guardarLead(lead)
    return Response.json({ ok: true, id: fila.id })
  } catch (e) {
    console.error('[leads] no se pudo guardar', e)
    return Response.json({ ok: false, error: 'no se pudo guardar' }, { status: 502 })
  }
}

// Lista para el panel /leads. Misma cookie que la página.
export async function GET(request: Request) {
  if (!sesionValida(cookieDesdeHeader(request.headers.get('cookie')))) {
    return Response.json({ ok: false }, { status: 401 })
  }
  try {
    const leads = await listarLeads()
    return Response.json({ ok: true, leads }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (e) {
    console.error('[leads] no se pudo listar', e)
    return Response.json({ ok: false }, { status: 502 })
  }
}
