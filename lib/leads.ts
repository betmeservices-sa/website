// Leads de las landings de conferencia (/sandra, /andrea).
//
// Viven en la tabla public.miagentia_leads del Supabase de BetMe
// (pfzxpidlbuxxtlycdwaj). Aquí solo se escribe, desde el servidor, con la
// llave secreta (SUPABASE_SECRET_KEY): la tabla tiene RLS encendido y ninguna
// política a propósito, así que con la llave pública no se ve nada.
//
// El equipo los lee en demo.miagentia.com (pantalla Leads de la agencia).
//
// Sin @supabase/supabase-js: es una llamada a PostgREST y el sitio no usa la
// librería en ningún otro lado.

export type TipoLead = 'datos' | 'llamada-demo'

export type LeadNuevo = {
  tipo: TipoLead
  nombre: string
  asesora?: string | null
  landing?: string | null
  origen?: string | null
  empresa?: string | null
  cargo?: string | null
  telefono?: string | null
  correo?: string | null
  interes?: string | null
  mensaje?: string | null
  consentimiento: boolean
  utm?: Record<string, string> | null
  user_agent?: string | null
}

export type Lead = LeadNuevo & { id: string; creado_en: string }

const TABLA = 'miagentia_leads'

function conexion() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SECRET_KEY
  if (!url || !key) throw new Error('Faltan SUPABASE_URL o SUPABASE_SECRET_KEY')
  return {
    base: `${url.replace(/\/$/, '')}/rest/v1/${TABLA}`,
    headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
  }
}

export async function guardarLead(lead: LeadNuevo): Promise<Lead> {
  const { base, headers } = conexion()
  const r = await fetch(base, {
    method: 'POST',
    headers: { ...headers, Prefer: 'return=representation' },
    body: JSON.stringify(lead),
    signal: AbortSignal.timeout(10_000),
  })
  if (!r.ok) throw new Error(`Supabase ${r.status}: ${(await r.text()).slice(0, 300)}`)
  const filas = (await r.json()) as Lead[]
  return filas[0]
}

// Lo que manda el formulario de la landing, convertido en fila de la tabla.
// Recorta, no corrige: lo que la persona escribió se guarda tal cual lo
// escribió. Devuelve null solo si no hay nombre.
export function leadDesdeFormulario(cuerpo: unknown, tipo: TipoLead, userAgent: string | null): LeadNuevo | null {
  if (!cuerpo || typeof cuerpo !== 'object') return null
  const c = cuerpo as Record<string, unknown>
  const texto = (v: unknown, max = 300) =>
    typeof v === 'string' && v.trim() ? v.trim().slice(0, max) : null

  const nombre = texto(c.nombre ?? c.name)
  if (!nombre) return null

  let utm: Record<string, string> | null = null
  if (c.utm && typeof c.utm === 'object') {
    const pares = Object.entries(c.utm as Record<string, unknown>)
      .filter(([k, v]) => k.toLowerCase().startsWith('utm_') && typeof v === 'string')
      .slice(0, 10)
      .map(([k, v]) => [k.toLowerCase().slice(0, 40), (v as string).slice(0, 200)])
    if (pares.length) utm = Object.fromEntries(pares)
  }

  return {
    tipo,
    nombre,
    asesora: texto(c.asesora, 60),
    landing: texto(c.landing, 100),
    origen: texto(c.source ?? c.origen, 60),
    empresa: texto(c.empresa),
    cargo: texto(c.cargo),
    telefono: texto(c.telefono ?? c.phone, 40),
    correo: texto(c.correo ?? c.email),
    interes: texto(c.interes, 120),
    mensaje: texto(c.mensaje, 2000),
    consentimiento: c.consent === true || c.consentimiento === true,
    utm,
    user_agent: userAgent ? userAgent.slice(0, 300) : null,
  }
}
