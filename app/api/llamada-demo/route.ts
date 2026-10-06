// Botón "Llámame ahora" de las landings de conferencia (/sandra, /andrea).
//
// El formulario manda { name, phone (E.164), source, asesora, consent, ts } y
// esta ruta lo pasa tal cual al flujo de n8n "MiAgentIA - Llamada demo
// (landing)", que valida el teléfono y le pide a Vapi que Sofía llame.
// Pasa por aquí, y no directo a n8n, para que la página no muestre a dónde se
// manda y el CSP siga en connect-src 'self'.
const FLUJO = 'https://betme.app.n8n.cloud/webhook/miagentia-llamada-demo'

export async function POST(request: Request) {
  let cuerpo: unknown
  try {
    cuerpo = await request.json()
  } catch {
    return Response.json({ ok: false, error: 'json invalido' }, { status: 400 })
  }

  try {
    const r = await fetch(FLUJO, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cuerpo),
      signal: AbortSignal.timeout(20_000),
    })
    const datos = await r.json().catch(() => ({ ok: r.ok }))
    return Response.json(datos, { status: r.status })
  } catch {
    return Response.json({ ok: false, error: 'no se pudo iniciar la llamada' }, { status: 502 })
  }
}
