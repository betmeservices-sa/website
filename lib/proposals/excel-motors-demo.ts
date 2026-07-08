import type { Proposal } from './types'

// Propuesta para Excel Automotriz (prospecto real, venta de autos en El Salvador).
// Contenido basado en la llamada de descubrimiento del 8 de julio.
// Los montos son $XXX a propósito: definir precio antes de enviar.
// El slug se mantiene opaco (excel-motors-7f3a) para que no sea adivinable.
export const excelMotors: Proposal = {
  slug: 'excel-motors-7f3a',
  cliente: { nombre: 'Excel Automotriz', industria: 'Venta de autos', contacto: 'el equipo de Excel Automotriz' },
  validaHasta: '2026-07-22',
  fraseDolor:
    '"Los fines de semana entran un montón de mensajes por los anuncios y no damos abasto; para el lunes ya se enfriaron."',

  diagnostico: {
    hechos: [
      'De noche y el fin de semana entra el mayor volumen de mensajes, que es cuando la gente tiene tiempo. Para el lunes esos prospectos ya se enfriaron.',
      'Con cinco vendedores repartiendo los leads del fin de semana el lunes y dando seguimiento a la semana anterior, a las 10 de la mañana todavía no se le contestó a quien escribió el viernes por la noche.',
      'No hay trazabilidad: no saben qué prospectos vienen de cada campaña ni cuántas visitas a la agencia se pierden por responder tarde.',
    ],
    metrica: {
      insumos: [
        'El mayor volumen entra de noche y fin de semana',
        'La gente cotiza a varias marcas a la vez y quiere precio ya',
        'Hoy responden con un menú de WhatsApp, no con IA',
      ],
      resultado:
        'En la venta de autos gana quien responde primero y mejor. Hoy esas conversaciones se enfrían justo cuando más entran, y no hay forma de saber qué lead vino de qué campaña.',
      fuente:
        'Observaciones de la llamada del 8 de julio. No se compartieron cifras de volumen, así que no estimamos montos.',
    },
  },

  agente: {
    nombre: 'Sofía',
    canales: ['whatsapp', 'facebook', 'instagram', 'voz'],
    idioma: 'Español, con acento salvadoreño cercano y familiar',
    horario: '24 horas, todos los días. Atiende muchas conversaciones y llamadas a la vez',
    flujos: [
      { situacion: 'Preguntan por un modelo (ej. "¿lo tienen en color negro?")', respuesta: 'Responde al instante con precio, disponibilidad y opciones de financiamiento.' },
      { situacion: 'No sabes si el prospecto es serio', respuesta: 'Precalifica sin descartar a nadie: forma de pago, contado o financiado y rangos. Es el filtro de entrada de tu negocio: decide quién pasa al asesor y quién sigue en seguimiento.' },
      { situacion: 'El prospecto quiere ir a la agencia', respuesta: 'Ofrece horarios y agenda la visita directo en el calendario de tu equipo, con recordatorios.' },
      { situacion: 'Escribe a las 11 de la noche un domingo', respuesta: 'Atiende de inmediato, resuelve y deja al cliente listo. Mientras la competencia duerme, tú ya contestaste.' },
    ],
    limites: [
      'No cierra la venta ni negocia el precio final: eso lo hace tu asesor.',
      'No reemplaza a tu equipo. Les quita el trabajo repetitivo y les pasa solo a la gente lista.',
      'No inventa promociones ni datos: solo usa la información que le cargues.',
      'No aprueba créditos: recopila la información y la pasa a tu equipo.',
    ],
    escalada:
      'Cuando el prospecto está listo o pide una persona, Sofía transfiere la conversación al asesor con el historial completo. No se pierde la trazabilidad, aunque el asesor use su propio WhatsApp Business.',
  },

  alcance: {
    incluye: [
      'Agente de WhatsApp entrenado con tu inventario, precios y preguntas frecuentes.',
      'Sofía omnicanal: el mismo cerebro en WhatsApp, Facebook, Instagram y llamadas entrantes.',
      'Memoria unificada por número de teléfono: los chats y las llamadas del mismo cliente se combinan en un solo historial, en un solo panel.',
      'Precalificación de leads y agenda de visitas conectada al calendario de tu equipo, con recordatorios.',
      'Transferencia a un asesor con el historial completo, aunque use su propio WhatsApp Business.',
      'Ajustes durante las primeras 2 semanas, que es cuando más se afina.',
    ],
    contraparte: [
      { item: 'Una llamada para contarnos tu proceso de ventas y el tono y la personalidad de tu marca', horas: '1 hora' },
      { item: 'Tu inventario, precios y preguntas frecuentes (hojas técnicas o archivos de referencia)', horas: '30 min' },
      { item: 'Acceso a tu WhatsApp Business y a tu calendario', horas: '30 min' },
      { item: 'Configuración de cada cuenta de WhatsApp de tu equipo', horas: '~30 min por cuenta' },
    ],
  },

  inversion: {
    opciones: [
      {
        nombre: 'Sofía en WhatsApp',
        setup: '$XXX (pago único)',
        mensual: '$XXX / mes',
        incluye: ['Agente de WhatsApp 24/7', 'Precalificación y agenda de visitas', 'Transferencia a asesor con historial', 'Soporte y ajustes'],
      },
      {
        nombre: 'Sofía omnicanal + Voz',
        setup: '$XXX (pago único)',
        mensual: '$XXX / mes',
        incluye: ['Todo lo de Sofía en WhatsApp', 'Facebook, Instagram y llamadas entrantes', 'Memoria unificada por teléfono en un solo panel'],
        recomendada: true,
      },
    ],
    nota: 'Sin permanencia, mes a mes. Cancela cuando quieras.',
  },

  arranque: [
    { paso: 'Aprobación y llamada de arranque', fecha: 'Día 1' },
    { paso: 'Cargamos y entrenamos a Sofía con tu inventario, precios y tono de marca', fecha: 'Días 2 a 4' },
    { paso: 'Conectamos WhatsApp, redes y calendario, y revisas el guion', fecha: 'Día 5' },
    { paso: 'Sofía sale en vivo y empieza a atender', fecha: 'Día 7' },
  ],
}
