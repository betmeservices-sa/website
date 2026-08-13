import 'server-only'
import { clampSessionSeconds } from './voiceDemo'

// ── Demo de voz: configuración de SERVIDOR. ──
// Este módulo lee las llaves. El import de 'server-only' rompe el build si
// alguien lo importa desde un componente de cliente, así que las llaves no
// pueden filtrarse al bundle del navegador.

export interface VoiceDemoServerConfig {
  /** true solo si están las dos llaves y los dos ids. Si no, el sitio cae al demo visual. */
  enabled: boolean
  elevenLabsKey: string
  simliKey: string
  agentId: string
  faceId: string
  /** Tope duro por sesión (segundos). */
  maxSeconds: number
  /** Sesiones permitidas por IP dentro de la ventana. */
  maxPerIp: number
  /** Ventana del límite por IP, en minutos. */
  windowMinutes: number
  /** Techo global por hora, como freno de gasto. */
  maxPerHour: number
}

function intEnv(raw: string | undefined, fallback: number, min: number, max: number): number {
  const n = Number.parseInt(raw ?? '', 10)
  if (!Number.isFinite(n)) return fallback
  return Math.min(max, Math.max(min, n))
}

export function voiceDemoServerConfig(): VoiceDemoServerConfig {
  const elevenLabsKey = (process.env.ELEVENLABS_API_KEY ?? '').trim()
  const simliKey = (process.env.SIMLI_API_KEY ?? '').trim()
  const agentId = (process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID ?? '').trim()
  const faceId = (process.env.NEXT_PUBLIC_SIMLI_FACE_ID ?? '').trim()

  return {
    enabled: Boolean(elevenLabsKey && simliKey && agentId && faceId),
    elevenLabsKey,
    simliKey,
    agentId,
    faceId,
    maxSeconds: clampSessionSeconds(
      process.env.VOICE_DEMO_MAX_SECONDS ?? process.env.NEXT_PUBLIC_VOICE_DEMO_MAX_SECONDS,
    ),
    maxPerIp: intEnv(process.env.VOICE_DEMO_MAX_PER_IP, 3, 1, 50),
    windowMinutes: intEnv(process.env.VOICE_DEMO_WINDOW_MINUTES, 30, 1, 1440),
    maxPerHour: intEnv(process.env.VOICE_DEMO_MAX_PER_HOUR, 40, 1, 5000),
  }
}
