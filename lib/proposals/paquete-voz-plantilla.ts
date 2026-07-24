import type { Proposal } from './types'

// PLANTILLA / PLACEHOLDER. Diagnóstico, dolor y hechos son de relleno a
// propósito (marcados [PLACEHOLDER]) — llenar con la situación real del
// prospecto antes de enviar. Lo que SÍ es real: la paquetería de minutos de
// voz en español (confirmada 2026-07-24). El periodo de prueba de 7 días /
// 100 minutos es una SUGERENCIA propia, no una decisión tomada — confirmar
// antes de usar esta plantilla con un cliente real.
export const paqueteVozPlantilla: Proposal = {
  slug: 'paquete-voz-plantilla',
  cliente: { nombre: '[NOMBRE DEL CLIENTE]', industria: '[INDUSTRIA]', contacto: '[CONTACTO]' },
  validaHasta: '[YYYY-MM-DD]',
  fraseDolor: '[PLACEHOLDER — la frase de dolor en las palabras exactas del cliente, tomada de la discovery call.]',

  diagnostico: {
    hechos: [
      '[PLACEHOLDER — hecho 1 sobre su situación actual, con cifras reales del cliente.]',
      '[PLACEHOLDER — hecho 2.]',
      '[PLACEHOLDER — hecho 3.]',
    ],
  },

  agente: {
    nombre: 'Sofía',
    canales: ['voz'],
    idioma: 'Español',
    horario: '[PLACEHOLDER — horario acordado con el cliente]',
    flujos: [
      { situacion: '[PLACEHOLDER — situación típica 1]', respuesta: '[PLACEHOLDER — cómo responde Sofía]' },
      { situacion: '[PLACEHOLDER — situación típica 2]', respuesta: '[PLACEHOLDER — cómo responde Sofía]' },
      { situacion: '[PLACEHOLDER — situación típica 3]', respuesta: '[PLACEHOLDER — cómo responde Sofía]' },
    ],
    limites: [
      'Sofía no cierra tratos ni negocia condiciones finales: eso lo hace tu equipo.',
      'No inventa información: solo usa lo que el cliente cargue y apruebe en la discovery call.',
      '[PLACEHOLDER — límite específico de este cliente/sector, definido en la discovery call.]',
    ],
    escalada: 'Cuando la llamada sale del guion aprobado o el cliente lo pide, Sofía transfiere a una persona de tu equipo con el contexto ya capturado.',
  },

  alcance: {
    incluye: [
      'Agente de voz en español, disponible según el horario acordado.',
      'Configuración inicial del guion, límites y objetivos de cada llamada, definidos en la discovery call.',
      '50 minutos de prueba interna incluidos en la implementación, antes de salir en vivo con clientes reales.',
      'Soporte y ajustes de configuración durante la implementación.',
    ],
    contraparte: [
      { item: 'Discovery call con Sofía: alcance, límites de cada llamada y objetivos del negocio', horas: '1 hora' },
      { item: 'Revisar y aprobar el guion antes de salir en vivo', horas: '30 min' },
      { item: 'Acceso a la línea telefónica y a la información necesaria para configurar al agente', horas: '30 min' },
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
        ],
        recomendada: true,
      },
    ],
    nota:
      'Compromiso de 12 meses, pago mensual. [SUGERENCIA A CONFIRMAR: 7 días de prueba gratuita, con un tope de 100 minutos y un solo caso de uso definido en la discovery call, antes de que arranque el compromiso de 12 meses y se cobre el setup + el paquete elegido — ajustar o quitar según se decida.]',
  },

  arranque: [
    { paso: 'Discovery call con Sofía: alcance, límites de cada llamada y objetivos', fecha: 'Semana 1, día 1' },
    { paso: 'Programamos y configuramos el guion del agente', fecha: 'Semana 1, días 2–3' },
    { paso: 'Probamos internamente con los 50 minutos de prueba incluidos', fecha: 'Semana 1, días 4–5' },
    { paso: 'Sofía sale en vivo con clientes reales', fecha: 'Semana 1, día 7' },
  ],
}
