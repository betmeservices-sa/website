import { guardarLead, leadDesdeFormulario } from '@/lib/leads'

// Botón "Llámame ahora" de las landings de conferencia (/sandra, /andrea).
//
// El formulario manda { name, phone (E.164), source, asesora, landing, utm,
// consent, ts } y esta ruta lo pasa tal cual al flujo de n8n "MiAgentIA -
// Llamada demo (landing)", que valida el teléfono y le pide a Vapi que Sofía
// llame. Pasa por aquí, y no directo a n8n, para que la página no muestre a
// dónde se manda y el CSP siga en connect-src 'self'.
//
// De paso el dato queda guardado como lead (tipo 'llamada-demo') para el panel
// /leads. Si la base falla, la llamada sale igual: lo que la persona quiere es
// que le suene el teléfono.
const FLUJO = 'https://betme.app.n8n.cloud/webhook/miagentia-llamada-demo'

export async function POST(request: Request) {
  let cuerpo: unknown
  try {
    cuerpo = await request.json()
  } catch {
    return Response.json({ ok: false, error: 'json invalido' }, { status: 400 })
  }

  const lead = leadDesdeFormulario(cuerpo, 'llamada-demo', request.headers.get('user-agent'))
  const guardado = lead
    ? guardarLead(lead).catch((e) => console.error('[llamada-demo] no se guardó el lead', e))
    : Promise.resolve()

  try {
    const r = await fetch(FLUJO, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cuerpo),
      signal: AbortSignal.timeout(20_000),
    })
    const datos = await r.json().catch(() => ({ ok: r.ok }))
    await guardado
    return Response.json(datos, { status: r.status })
  } catch {
    await guardado
    return Response.json({ ok: false, error: 'no se pudo iniciar la llamada' }, { status: 502 })
  }
}
