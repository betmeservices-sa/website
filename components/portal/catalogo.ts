// ── Catálogo del portal: planes, preguntas del guion y funciones ──
//
// Todo lo que se cobra vive acá y en ningún otro lado: los precios de los
// planes, el precio por función y las opciones de cada pregunta. Las pantallas
// solo leen de este archivo, así que cambiar un precio es cambiar un número.
//
// SIMULACIÓN: no hay pasarela de pago ni base de datos detrás. El estado vive
// en el navegador (ver estado.tsx) y los cobros se resuelven con un timer.

export type Plan = {
  id: string
  nombre: string
  mensual: number
  para: string
  incluye: string[]
  recomendado?: boolean
}

// Los nombres son los mismos cuatro paquetes del sitio (Starter, Growth,
// Advanced, Enterprise); acá van los tres que se contratan solos.
export const PLANES: Plan[] = [
  {
    id: 'starter',
    nombre: 'Starter',
    mensual: 297,
    para: 'Un canal, un caso de uso.',
    incluye: [
      'Bandeja unificada: WhatsApp, Instagram y Facebook',
      'Hasta 15 respuestas por conversación',
      'Transferencia a una persona por reglas',
      '5 usuarios',
    ],
  },
  {
    id: 'growth',
    nombre: 'Growth',
    mensual: 597,
    para: 'Varios canales y seguimiento automático.',
    incluye: [
      'Todo lo de Starter',
      'Recordatorios y confirmaciones automáticas',
      'Reactivación de contactos inactivos',
      '10 usuarios',
    ],
    recomendado: true,
  },
  {
    id: 'advanced',
    nombre: 'Advanced',
    mensual: 1097,
    para: 'Operación completa con campañas y reseñas.',
    incluye: [
      'Todo lo de Growth',
      'Programa de referidos automático',
      'Reseñas y reputación automatizada',
      '30 usuarios',
    ],
  },
]

export function plan(id: string | null): Plan | null {
  return PLANES.find((p) => p.id === id) ?? null
}

// ── Preguntas del guion ──

export const USOS = [
  { id: 'ventas', nombre: 'Ventas', desc: 'Atiende al que pregunta precio, lo califica y lo lleva a cerrar.' },
  { id: 'soporte', nombre: 'Atención al cliente', desc: 'Resuelve dudas, estados de pedido y reclamos.' },
  { id: 'ambos', nombre: 'Las dos cosas', desc: 'Un agente que vende y uno que atiende, cada uno con su guion.' },
] as const

// Se pueden elegir varios. Cada objetivo es un guion distinto que escribir y
// probar, así que el primero va dentro de la implementación y los demás suman
// (ver PRECIO_OBJETIVO).
export const OBJETIVOS = [
  { id: 'citas', nombre: 'Llenar el calendario de citas' },
  { id: 'calificar', nombre: 'Calificar leads antes de pasarlos al equipo' },
  { id: 'cerrar', nombre: 'Cerrar la venta en el chat' },
  { id: 'resolver', nombre: 'Resolver sin que entre una persona' },
  { id: 'cobrar', nombre: 'Cobrar y dar seguimiento a pagos' },
  { id: 'reactivar', nombre: 'Reactivar contactos viejos' },
]

/** El objetivo escrito a mano. Vive aparte porque su texto lo pone el cliente. */
export const OBJETIVO_OTRO = 'otro'

export function nombreObjetivo(id: string, otro: string): string {
  if (id === OBJETIVO_OTRO) return otro.trim() || 'Otro objetivo'
  return OBJETIVOS.find((o) => o.id === id)?.nombre ?? id
}

export const CRMS = ['Ninguno todavía', 'HubSpot', 'Salesforce', 'GoHighLevel', 'Pipedrive', 'Zoho', 'Otro']
export const CALENDARIOS = ['Ninguno todavía', 'Google Calendar', 'Outlook', 'Calendly', 'Cal.com', 'Otro']
export const CANALES = ['WhatsApp', 'Instagram', 'Facebook', 'Web', 'Llamadas', 'Correo']
export const TONOS = ['Cercano', 'Formal', 'Directo', 'Divertido']
export const IDIOMAS = ['Español', 'Inglés', 'Portugués']

// ── Horario de atención ──
//
// Se elige de listas y no se escribe: el horario entra al guion y de ahí a la
// configuración del agente, así que "L-V de 8 a 6" y "lunes a viernes 8am-6pm"
// tienen que llegar iguales.

/** Atiende siempre: con esta opción no hay horas que elegir. */
export const HORARIO_SIEMPRE = 'Todos los días, 24 horas'

export const HORARIO_DIAS = [
  HORARIO_SIEMPRE,
  'Lunes a viernes',
  'Lunes a sábado',
  'Todos los días',
  'Solo fines de semana',
]

function reloj(minutos: number): string {
  const h24 = Math.floor(minutos / 60)
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12
  const mm = String(minutos % 60).padStart(2, '0')
  return `${h12}:${mm} ${h24 < 12 ? 'am' : 'pm'}`
}

/** El día completo en pasos de media hora. */
export const HORAS: string[] = Array.from({ length: 48 }, (_, i) => reloj(i * 30))

export function textoHorario(h: {
  horarioDias: string
  horarioDesde: string
  horarioHasta: string
}): string {
  if (h.horarioDias === HORARIO_SIEMPRE) return HORARIO_SIEMPRE
  const horas = h.horarioDesde && h.horarioHasta ? `${h.horarioDesde} a ${h.horarioHasta}` : ''
  return [h.horarioDias, horas].filter(Boolean).join(', ')
}

// ── Funciones ──
//
// Un precio único por función, a propósito: el cliente arma su alcance sumando
// y ve el total cambiar sin tener que entender una tabla.

export const PRECIO_FUNCION = 100

// El primer objetivo va incluido: es el guion base, sin él no hay agente. Los
// demás son guiones adicionales y se cobran igual que una función.
export const PRECIO_OBJETIVO = 100

export type Funcion = { id: string; nombre: string; desc: string; icono: string }

export const FUNCIONES: Funcion[] = [
  { id: 'audio', nombre: 'Escucha notas de voz', desc: 'Entiende los audios que le mandan y contesta por escrito.', icono: 'mic' },
  { id: 'imagenes', nombre: 'Lee las fotos que le mandan', desc: 'Comprobantes, capturas, fotos de producto o del daño.', icono: 'foto' },
  { id: 'crm', nombre: 'Conecta con tu CRM', desc: 'Crea y actualiza el contacto con lo que salió de la conversación.', icono: 'plug' },
  { id: 'calendario', nombre: 'Agenda citas en tu calendario', desc: 'Consulta huecos reales, reserva y manda el recordatorio.', icono: 'calendar' },
  { id: 'memoria', nombre: 'Recuerda conversaciones anteriores', desc: 'Retoma donde quedaron sin pedir los datos otra vez.', icono: 'bot' },
  { id: 'conocimiento', nombre: 'Aprende de tus documentos', desc: 'Responde con tu catálogo, tus precios y tus políticas.', icono: 'briefcase' },
  { id: 'transferencia', nombre: 'Pasa a una persona por reglas', desc: 'Suelta la conversación cuando toca y avisa a quien sigue.', icono: 'user' },
  { id: 'seguimiento', nombre: 'Vuelve a escribir si no contestan', desc: 'Seguimientos con tiempos y mensajes definidos por ti.', icono: 'bolt' },
  { id: 'pagos', nombre: 'Envía links de pago', desc: 'Cobra dentro del chat y confirma cuando el pago entra.', icono: 'cart' },
  { id: 'idiomas', nombre: 'Responde en varios idiomas', desc: 'Detecta el idioma del contacto y sigue en ese.', icono: 'globe' },
  { id: 'voz', nombre: 'Llama por teléfono', desc: 'Agente de voz para salientes y para el que no contesta el chat.', icono: 'phone' },
  { id: 'tablero', nombre: 'Tablero y reportes', desc: 'Qué se preguntó, qué se cerró y dónde se cae la conversación.', icono: 'grafico' },
]

export function funcion(id: string): Funcion | undefined {
  return FUNCIONES.find((f) => f.id === id)
}

/** Objetivos que suman: todos menos el primero. */
export function objetivosExtra(objetivos: string[]): number {
  return Math.max(0, objetivos.length - 1)
}

export function feeImplementacion(funciones: string[], objetivos: string[]): number {
  return funciones.length * PRECIO_FUNCION + objetivosExtra(objetivos) * PRECIO_OBJETIVO
}

export function dinero(n: number): string {
  return '$' + n.toLocaleString('en-US')
}
