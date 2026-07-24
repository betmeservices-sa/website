import type { Proposal } from './types'

// EJERCICIO. Cliente y contacto son reales (Grupo Nissan / Carlos Milla),
// pero las cifras del diagnóstico (leads/mes, tiempo de respuesta, ticket
// promedio, tasa de cierre) son INVENTADAS — el usuario autorizó
// explícitamente fabricarlas solo para este ejercicio, ya que no se tenían
// los datos reales. NO ENVIAR a Grupo Nissan sin antes reemplazar esas
// cifras por datos reales confirmados en una discovery call de verdad.
export const grupoNissan: Proposal = {
  slug: 'grupo-nissan-8d31',
  cliente: { nombre: 'Grupo Nissan', industria: 'Distribuidora de vehículos', contacto: 'Carlos Milla' },
  validaHasta: '2026-08-07',
  fraseDolor:
    '"Invertimos fuerte en campañas y generamos el interés, pero si no llamamos primero, el cliente ya está cotizando con la competencia — y gana quien lo contacte primero."',

  diagnostico: {
    hechos: [
      'Las campañas de marketing (Facebook, Instagram, Google Ads) generan un volumen constante de leads preguntando por modelos, precios y promociones, pero el equipo solo puede responder en horario de oficina.',
      'Cuando un lead escribe o llama fuera de horario, o cuando el equipo está saturado, la respuesta puede tardar horas — tiempo que el prospecto aprovecha para cotizar con otra marca o agencia.',
      'Hoy no hay un mecanismo para agendar una prueba de manejo en el momento en que el interés está más alto, justo después de que el prospecto ve el anuncio.',
    ],
    metrica: {
      insumos: ['~180 leads de campañas al mes', 'tiempo de respuesta promedio de 6+ horas', 'ticket promedio de $18,500', 'cierre estimado del 12% cuando se contacta a tiempo'],
      resultado:
        'Cada mes se enfrían cerca de 70 leads por respuesta lenta. Aun con un cierre conservador del 12%, son unas 8 ventas (cerca de $148,000) que se van a la competencia solo por no contactar primero.',
      fuente:
        'Cifras ILUSTRATIVAS inventadas para este ejercicio (autorizado explícitamente por el usuario) — reemplazar con datos reales de Grupo Nissan, confirmados en la discovery call, antes de enviar la propuesta de verdad.',
    },
  },

  agente: {
    nombre: 'Sofía',
    canales: ['voz'],
    idioma: 'Español',
    horario: '24 horas, todos los días',
    flujos: [
      { situacion: 'Un lead de una campaña de Facebook, Instagram o Google pregunta por un modelo o promoción', respuesta: 'Sofía contesta al instante con precio, disponibilidad y la promoción vigente, y agenda una prueba de manejo antes de que el prospecto busque en otra agencia.' },
      { situacion: 'El prospecto pregunta por financiamiento o por el valor de su carro actual como parte de pago', respuesta: 'Explica las opciones con la información que Grupo Nissan cargue y, si el interés es serio, transfiere la llamada a un asesor.' },
      { situacion: 'Llega una llamada de noche o en fin de semana', respuesta: 'Atiende igual que en horario laboral: toma los datos, agenda la prueba de manejo y da seguimiento, para que la competencia no llegue primero.' },
    ],
    limites: [
      'Sofía no cierra la venta ni negocia el precio final: eso lo hace el asesor de Grupo Nissan.',
      'No inventa promociones ni descuentos: solo usa la información vigente que Grupo Nissan cargue y apruebe.',
      'No aprueba financiamiento; recopila la información y la transfiere al equipo.',
    ],
    escalada:
      'Cuando el prospecto está listo para agendar la prueba de manejo o pide hablar con una persona, Sofía transfiere la llamada a un asesor con todo el contexto ya capturado.',
  },

  alcance: {
    incluye: [
      'Agente de voz en español, disponible 24/7 para atender leads de campañas y llamadas entrantes.',
      'Configuración inicial del guion, límites y objetivos de cada llamada, definidos en la discovery call.',
      'Agenda de pruebas de manejo conectada al calendario del equipo de ventas.',
      '50 minutos de prueba interna incluidos en la implementación, antes de salir en vivo con clientes reales.',
      'Soporte y ajustes de configuración durante la implementación.',
    ],
    contraparte: [
      { item: 'Discovery call con Sofía: alcance, límites de cada llamada y objetivos del negocio', horas: '1 hora' },
      { item: 'Compartir modelos, precios, promociones vigentes y opciones de financiamiento', horas: '1 hora' },
      { item: 'Acceso a la línea telefónica y al calendario del equipo de ventas', horas: '30 min' },
      { item: 'Revisar y aprobar el guion antes de salir en vivo', horas: '30 min' },
    ],
  },

  inversion: {
    opciones: [
      {
        nombre: 'Paquete 1,000 minutos',
        setup: '$500 (pago único) + IVA — incluye 50 minutos de prueba interna',
        mensual: '$500 + IVA / mes',
        incluye: [
          '1,000 minutos de voz en español al mes',
          'Recargas de $100 = 235 minutos adicionales si se agota el paquete',
          'Los minutos no usados no se acumulan al mes siguiente',
        ],
      },
      {
        nombre: 'Paquete 2,000 minutos',
        setup: '$500 (pago único) + IVA — incluye 50 minutos de prueba interna',
        mensual: '$850 + IVA / mes',
        incluye: [
          '2,000 minutos de voz en español al mes',
          'Recargas de $100 = 235 minutos adicionales si se agota el paquete',
          'Los minutos no usados no se acumulan al mes siguiente',
          'Recomendado dado el volumen de campañas activas de Grupo Nissan',
        ],
        recomendada: true,
      },
    ],
    nota:
      'Compromiso de 12 meses, pago mensual. [SUGERENCIA A CONFIRMAR: 7 días de prueba gratuita, con un tope de 100 minutos enfocado en leads de campaña, antes de que arranque el compromiso de 12 meses y se cobre el setup + el paquete elegido.]',
  },

  arranque: [
    { paso: 'Discovery call con Sofía: alcance, límites de cada llamada y objetivos', fecha: 'Semana 1, día 1' },
    { paso: 'Programamos y configuramos el guion del agente con modelos, precios y promociones', fecha: 'Semana 1, días 2–3' },
    { paso: 'Probamos internamente con los 50 minutos de prueba incluidos', fecha: 'Semana 1, días 4–5' },
    { paso: 'Sofía sale en vivo atendiendo leads de campaña y llamadas reales', fecha: 'Semana 1, día 7' },
  ],
}
