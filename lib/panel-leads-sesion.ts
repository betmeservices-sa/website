import { createHmac, timingSafeEqual } from 'node:crypto'

// Acceso al panel /leads: una clave compartida del equipo (PANEL_LEADS_CLAVE).
// Al entrar bien queda una cookie httpOnly con un HMAC derivado de la clave, y
// cada petición la compara con el HMAC recalculado. Si la clave cambia en
// Vercel, todas las sesiones caducan solas; no hay nada que guardar en base.

export const COOKIE_PANEL = 'panel_leads'
const DIAS = 30

function clave() {
  return process.env.PANEL_LEADS_CLAVE ?? ''
}

function firma(): string {
  return createHmac('sha256', clave()).update('panel-leads-miagentia').digest('hex')
}

function iguales(a: string, b: string): boolean {
  const x = Buffer.from(a)
  const y = Buffer.from(b)
  return x.length === y.length && timingSafeEqual(x, y)
}

export function claveCorrecta(intento: string): boolean {
  const k = clave()
  return Boolean(k && intento) && iguales(intento, k)
}

export function sesionValida(valorCookie: string | undefined | null): boolean {
  if (!valorCookie || !clave()) return false
  return iguales(valorCookie, firma())
}

export function cookieDeSesion(): string {
  return `${COOKIE_PANEL}=${firma()}; Path=/; Max-Age=${DIAS * 86400}; HttpOnly; Secure; SameSite=Lax`
}

export function cookieDeSalida(): string {
  return `${COOKIE_PANEL}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`
}

export function cookieDesdeHeader(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null
  for (const parte of cookieHeader.split(';')) {
    const [k, ...v] = parte.trim().split('=')
    if (k === COOKIE_PANEL) return v.join('=')
  }
  return null
}
