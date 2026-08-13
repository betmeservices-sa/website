import type { NextRequest } from 'next/server'
import { voiceDemoServerConfig } from '@/lib/voiceDemo.server'

// ── Abre una sesión del demo de voz. ──
// El navegador nunca ve las llaves: esta ruta las usa para pedir una URL
// firmada (conversación) y un token de sesión (avatar), y devuelve solo eso.
// Sin configuración responde 503 y la sección se queda con el demo visual.

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const CONV_URL = 'https://api.elevenlabs.io/v1/convai/conversation/get-signed-url'
const FACE_TOKEN_URL = 'https://api.simli.ai/compose/token'
const FACE_ICE_URL = 'https://api.simli.ai/compose/ice'
const UPSTREAM_TIMEOUT_MS = 10_000

// Memoria del proceso: es un freno, no una bóveda. En serverless cada
// instancia lleva su propio conteo, así que el límite real es por instancia.
const hitsByIp = new Map<string, number[]>()
let globalHits: number[] = []

function prune(list: number[], since: number): number[] {
  return list.filter((t) => t > since)
}

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  return req.headers.get('x-real-ip')?.trim() || 'sin-ip'
}

function noStore(body: unknown, status: number, extra?: HeadersInit) {
  return Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store', ...extra },
  })
}

export async function POST(req: NextRequest) {
  const cfg = voiceDemoServerConfig()
  if (!cfg.enabled) return noStore({ error: 'not_configured' }, 503)

  const now = Date.now()
  const ip = clientIp(req)
  const ipSince = now - cfg.windowMinutes * 60_000
  const hourSince = now - 3_600_000

  const ipHits = prune(hitsByIp.get(ip) ?? [], ipSince)
  globalHits = prune(globalHits, hourSince)

  if (ipHits.length >= cfg.maxPerIp) {
    const retryAfter = Math.max(1, Math.ceil((ipHits[0] - ipSince) / 1000))
    hitsByIp.set(ip, ipHits)
    return noStore({ error: 'rate_limited', retryAfter }, 429, { 'Retry-After': String(retryAfter) })
  }
  if (globalHits.length >= cfg.maxPerHour) {
    const retryAfter = Math.max(1, Math.ceil((globalHits[0] - hourSince) / 1000))
    return noStore({ error: 'rate_limited', retryAfter }, 429, { 'Retry-After': String(retryAfter) })
  }

  // Se apunta el intento ANTES de llamar a los proveedores (así dos pestañas
  // a la vez no se cuelan) y se devuelve el crédito si el proveedor falla.
  ipHits.push(now)
  hitsByIp.set(ip, ipHits)
  globalHits.push(now)

  // Limpieza perezosa para que el Map no crezca sin fin.
  if (hitsByIp.size > 5000) {
    for (const [key, list] of hitsByIp) {
      const alive = prune(list, ipSince)
      if (alive.length === 0) hitsByIp.delete(key)
      else hitsByIp.set(key, alive)
    }
  }

  const refund = () => {
    hitsByIp.set(ip, (hitsByIp.get(ip) ?? []).filter((t) => t !== now))
    globalHits = globalHits.filter((t) => t !== now)
  }

  try {
    const [conversation, face, ice] = await Promise.all([
      fetch(`${CONV_URL}?agent_id=${encodeURIComponent(cfg.agentId)}`, {
        headers: { 'xi-api-key': cfg.elevenLabsKey },
        cache: 'no-store',
        signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      }),
      fetch(FACE_TOKEN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-simli-api-key': cfg.simliKey },
        body: JSON.stringify({
          faceId: cfg.faceId,
          apiVersion: 'v2',
          handleSilence: true,
          // Un poco más largo que el tope del cliente: el corte lo manda la
          // página, esto es la red de seguridad si el navegador no responde.
          maxSessionLength: cfg.maxSeconds + 15,
          maxIdleTime: 30,
        }),
        cache: 'no-store',
        signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      }),
      // Sin estos servidores la cara no puede abrir su conexión punto a punto:
      // el cliente lanza "Ice Servers Required for P2P Mode".
      fetch(FACE_ICE_URL, {
        headers: { 'Content-Type': 'application/json', 'x-simli-api-key': cfg.simliKey },
        cache: 'no-store',
        signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      }),
    ])

    if (!conversation.ok || !face.ok || !ice.ok) {
      console.error('[voice-demo] proveedor rechazó la sesión', {
        conversation: conversation.status,
        face: face.status,
        ice: ice.status,
      })
      refund()
      return noStore({ error: 'upstream' }, 502)
    }

    const conversationBody = (await conversation.json()) as { signed_url?: string }
    const faceBody = (await face.json()) as { session_token?: string }
    const iceBody = (await ice.json()) as RTCIceServer[]

    if (!conversationBody.signed_url || !faceBody.session_token || !Array.isArray(iceBody) || iceBody.length === 0) {
      refund()
      return noStore({ error: 'upstream' }, 502)
    }

    return noStore(
      {
        signedUrl: conversationBody.signed_url,
        simliSessionToken: faceBody.session_token,
        iceServers: iceBody,
        maxSeconds: cfg.maxSeconds,
      },
      200,
    )
  } catch (err) {
    console.error('[voice-demo] no se pudo abrir la sesión', err)
    refund()
    return noStore({ error: 'upstream' }, 502)
  }
}
