// ── Demo de voz: configuración PÚBLICA (puede viajar al navegador). ──
// Aquí solo hay identificadores e ids, nunca llaves. Las llaves se quedan
// en el servidor (ver lib/voiceDemo.server.ts y app/api/voice-demo/session).

/** Tope de sesión por defecto, en segundos. */
export const VOICE_DEMO_DEFAULT_SECONDS = 90
const MIN_SECONDS = 20
const MAX_SECONDS = 300

/** Normaliza el tope de sesión: entero, dentro de rango, con default. */
export function clampSessionSeconds(raw: string | undefined): number {
  const n = Number.parseInt(raw ?? '', 10)
  if (!Number.isFinite(n)) return VOICE_DEMO_DEFAULT_SECONDS
  return Math.min(MAX_SECONDS, Math.max(MIN_SECONDS, n))
}

/** Ids públicos del agente y de la cara. Vacíos = el sitio usa el demo visual. */
export const voiceDemoPublic = {
  agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID ?? '',
  faceId: process.env.NEXT_PUBLIC_SIMLI_FACE_ID ?? '',
  maxSeconds: clampSessionSeconds(process.env.NEXT_PUBLIC_VOICE_DEMO_MAX_SECONDS),
}

/** Respuesta de la ruta que abre la sesión. */
export interface VoiceSessionData {
  signedUrl: string
  simliSessionToken: string
  /** La cara se conecta punto a punto y sin estos no levanta. Se piden con
   *  la llave, así que los trae el servidor y el navegador solo los usa. */
  iceServers: RTCIceServer[]
  maxSeconds: number
}

export type VoiceSessionError = 'not_configured' | 'rate_limited' | 'upstream'

/** mm:ss para el contador visible. */
export function formatClock(totalSeconds: number): string {
  const s = Math.max(0, Math.round(totalSeconds))
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}
