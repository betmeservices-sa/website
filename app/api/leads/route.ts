import { guardarLead, leadDesdeFormulario } from '@/lib/leads'

// Formulario «Déjanos tus datos» de las landings de conferencia (/sandra,
// /andrea). Guarda la fila y responde 200; la página muestra el gracias.
// El equipo los ve en demo.miagentia.com, pantalla Leads del tablero de la
// agencia, que lee la misma tabla.
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

