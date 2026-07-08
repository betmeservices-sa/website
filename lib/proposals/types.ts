// Contrato único de una propuesta. Las tuplas de longitud fija (hechos,
// opciones, arranque) y los campos obligatorios (setup, mensual) mantienen
// la propuesta corta: violarlos es un error de compilación, no una
// convención que se erosiona.

export type Canal = 'voz' | 'whatsapp'

export type Metrica = {
  insumos: string[]        // los datos que dio el cliente, a la vista
  resultado: string        // su aritmética, no la nuestra
  fuente: string           // de dónde salió el dato (regla no-fabricar)
}

export type Flujo = { situacion: string; respuesta: string }

export type Opcion = {
  nombre: string
  setup: string            // obligatorio
  mensual: string          // obligatorio
  incluye: string[]
  recomendada?: boolean
}

export type Paso = { paso: string; fecha: string }

export type Proposal = {
  slug: string
  cliente: { nombre: string; industria: string; contacto: string }
  validaHasta: string      // ISO 'YYYY-MM-DD'
  fraseDolor: string       // en las palabras del cliente

  diagnostico: {
    hechos: [string, string, string]   // exactamente tres
    metrica?: Metrica
  }

  agente: {
    nombre: string
    canales: Canal[]
    idioma: string
    horario: string
    flujos: Flujo[]
    limites: [string, string, ...string[]]  // al menos dos
    escalada: string
  }

  alcance: {
    incluye: string[]
    contraparte: { item: string; horas?: string }[]
  }

  inversion: {
    opciones: [Opcion, Opcion]   // exactamente dos
    nota: string
  }

  arranque: [Paso, Paso, Paso, Paso]  // exactamente cuatro
}
