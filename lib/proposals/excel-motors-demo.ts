import type { Proposal } from './types'

// EJEMPLO / PLACEHOLDER. Nombres y cifras INVENTADOS para probar la
// plantilla. No es un cliente ni un caso real, ni un testimonio. Los montos
// son $XXX a propósito: hay que llenarlos antes de enviar. Borrar este
// archivo (y quitarlo de lib/proposals/index.ts) cuando entre la primera
// propuesta real.
export const excelMotors: Proposal = {
  slug: 'excel-motors-7f3a',
  cliente: { nombre: 'Excel Motors', industria: 'Venta de autos', contacto: 'Carlos Méndez' },
  validaHasta: '2026-07-22',
  fraseDolor:
    '"Los fines de semana entran un montón de mensajes por los anuncios y no damos abasto; para el lunes ya se enfriaron."',

  diagnostico: {
    hechos: [
      'Reciben más de 200 mensajes al mes por WhatsApp desde sus anuncios, y responden a mano cuando alguien tiene un rato.',
      'Fuera de horario (noches y fines de semana) nadie contesta, justo cuando llega el mayor volumen.',
      'Hoy no hay forma de saber cuántas visitas al piso de ventas se pierden por responder tarde.',
    ],
    metrica: {
      insumos: ['~XX conversaciones sin respuesta al mes', 'ticket promedio de $X,XXX', 'cierre estimado del X%'],
      resultado:
        'Cada mes se enfrían unos XX prospectos. Aun con un cierre conservador, son N ventas (cerca de $XX,XXX) que se van solo por no contestar a tiempo.',
      fuente:
        'EJEMPLO ilustrativo: reemplazar con las cifras reales que dijo el cliente en la llamada y su fuente, antes de enviar.',
    },
  },

  agente: {
    nombre: 'Andrea',
    canales: ['whatsapp', 'voz'],
    idioma: 'Español',
    horario: '24 horas, todos los días',
    flujos: [
      { situacion: 'Llega un mensaje preguntando por un modelo', respuesta: 'Responde al instante con precio, disponibilidad y opciones de financiamiento, y toma los datos del prospecto.' },
      { situacion: 'El prospecto quiere ver el auto', respuesta: 'Ofrece horarios y agenda la visita al piso de ventas directo en el calendario del equipo.' },
      { situacion: 'Pregunta por financiamiento o enganche', respuesta: 'Explica las opciones con la información que ustedes carguen y, si el interés es serio, pasa la conversación a un asesor.' },
      { situacion: 'Escribe a las 11 de la noche un domingo', respuesta: 'Atiende igual que a mediodía un martes: nunca se queda sin respuesta.' },
    ],
    limites: [
      'No cierra la venta ni negocia el precio final: eso lo hace su asesor.',
      'No inventa promociones ni datos; solo usa la información que ustedes carguen.',
      'No aprueba créditos; recopila la información y la pasa a su equipo.',
    ],
    escalada:
      'Cuando el prospecto está listo para comprar o pide hablar con una persona, Andrea transfiere la conversación a un asesor con todo el contexto ya capturado.',
  },

  alcance: {
    incluye: [
      'Agente de WhatsApp entrenado con su inventario, precios y preguntas frecuentes.',
      'Agente de voz para atender llamadas entrantes con el mismo cerebro.',
      'Agenda de visitas conectada al calendario de su equipo, con recordatorios.',
      'Transferencia a un asesor humano con el historial de la conversación.',
      'Ajustes durante las primeras 2 semanas según lo que veamos en conversaciones reales.',
    ],
    contraparte: [
      { item: 'Una llamada para cargar inventario, precios y preguntas frecuentes', horas: '1 hora' },
      { item: 'Acceso a su número de WhatsApp Business y a su calendario', horas: '30 min' },
      { item: 'Revisar y aprobar el guion del agente antes de salir en vivo', horas: '30 min' },
    ],
  },

  inversion: {
    opciones: [
      {
        nombre: 'Solo WhatsApp',
        setup: '$XXX (pago único)',
        mensual: '$XXX / mes',
        incluye: ['Agente de WhatsApp 24/7', 'Agenda de visitas y recordatorios', 'Transferencia a asesor', 'Soporte y ajustes'],
      },
      {
        nombre: 'WhatsApp + Voz',
        setup: '$XXX (pago único)',
        mensual: '$XXX / mes',
        incluye: ['Todo lo de Solo WhatsApp', 'Agente de voz para llamadas entrantes', 'Un solo cerebro para chat y llamada'],
        recomendada: true,
      },
    ],
    nota: 'Sin permanencia, mes a mes. Cancela cuando quieras.',
  },

  arranque: [
    { paso: 'Aprobación y llamada de arranque', fecha: 'Día 1' },
    { paso: 'Cargamos y entrenamos a Andrea con su información', fecha: 'Días 2 a 4' },
    { paso: 'Revisan y aprueban el guion', fecha: 'Día 5' },
    { paso: 'Andrea sale en vivo y empieza a atender', fecha: 'Día 7' },
  ],
}
