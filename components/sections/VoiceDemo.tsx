// Sección de demo de voz. Decide en el SERVIDOR cuál de las dos se muestra,
// porque saber si el agente real está encendido depende de llaves que el
// navegador no puede ver.
//
// Con las cuatro variables puestas, el visitante habla de verdad con el agente
// y ve la cara respondiendo. Sin ellas, se queda el demo visual de siempre:
// nunca una sección rota ni un botón que no hace nada.

import { voiceDemoServerConfig } from '@/lib/voiceDemo.server'
import ScriptedVoiceDemo from './voice/ScriptedVoiceDemo'
import LiveVoiceDemo from './voice/LiveVoiceDemo'

export default function VoiceDemo() {
  const cfg = voiceDemoServerConfig()
  if (!cfg.enabled) return <ScriptedVoiceDemo />
  return <LiveVoiceDemo maxSeconds={cfg.maxSeconds} />
}
