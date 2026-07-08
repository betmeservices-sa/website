// Datos SIMULADOS para el demo del panel de Sofía (Excel Automotriz).
// Sin APIs: todo es mock, etiquetado como demo en la UI. Los montos van
// como $XX,XXX / $XXX a propósito (no fabricar cifras reales).

export type CanalDemo = 'whatsapp' | 'instagram' | 'facebook' | 'llamada'
export type EstadoDemo = 'sofia' | 'precalificado' | 'cita' | 'asesor'

export type Mensaje = {
  de: 'cliente' | 'sofia' | 'asesor' | 'sistema'
  texto: string
  hora: string
}

export type Conversacion = {
  id: string
  nombre: string
  inicial: string
  canal: CanalDemo
  telefono: string
  snippet: string
  hora: string
  estado: EstadoDemo
  campana: string
  historial: string
  modelo: string
  formaPago: string
  presupuesto: string
  proximaCita?: string
  asesor?: string
  hilo: Mensaje[]
}

export const canalInfoDemo: Record<CanalDemo, { icon: string; label: string; color: string }> = {
  whatsapp: { icon: 'whatsapp', label: 'WhatsApp', color: 'text-emerald-400' },
  instagram: { icon: 'instagram', label: 'Instagram', color: 'text-magenta' },
  facebook: { icon: 'facebook', label: 'Facebook', color: 'text-cyan' },
  llamada: { icon: 'phone', label: 'Llamada', color: 'text-violet' },
}

export const estadoInfoDemo: Record<EstadoDemo, { label: string; className: string }> = {
  sofia: { label: 'Atendiendo Sofía', className: 'text-cyan bg-cyan/10 border-cyan/20' },
  precalificado: { label: 'Precalificado', className: 'text-violet bg-violet/10 border-violet/20' },
  cita: { label: 'Cita agendada', className: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
  asesor: { label: 'Con asesor', className: 'text-magenta bg-magenta/10 border-magenta/20' },
}

export const kpisDemo = [
  { valor: '128', label: 'Conversaciones hoy' },
  { valor: '100%', label: 'Atendidas al instante' },
  { valor: '4 s', label: 'Tiempo de respuesta' },
  { valor: '14', label: 'Citas agendadas' },
  { valor: '22', label: 'Leads precalificados' },
]

export const conversaciones: Conversacion[] = [
  {
    id: 'gabriela',
    nombre: 'Gabriela Reyes',
    inicial: 'G',
    canal: 'whatsapp',
    telefono: '+503 7412 8890',
    snippet: 'Sí, el sábado en la mañana',
    hora: '8:06 am',
    estado: 'cita',
    campana: 'Facebook Ads · Hilux 2026',
    historial: 'WhatsApp + 1 llamada',
    modelo: 'Hilux 2026 (negro)',
    formaPago: 'Financiado',
    presupuesto: '~$XXX / mes',
    proximaCita: 'Sáb 10:00 am · agencia',
    asesor: 'Carlos Menjívar',
    hilo: [
      { de: 'sistema', texto: 'Conversación iniciada desde anuncio de Facebook · Hilux 2026', hora: 'Vie 8:14 pm' },
      { de: 'cliente', texto: 'Hola, vi el anuncio de la Hilux. ¿La tienen en color negro?', hora: '8:14 pm' },
      { de: 'sofia', texto: '¡Hola Gabriela! Sí, tenemos la Hilux 2026 en negro disponible. Su precio es de $XX,XXX. ¿La estás viendo al contado o con financiamiento?', hora: '8:14 pm' },
      { de: 'cliente', texto: 'Financiada. ¿Cuánto sería la cuota?', hora: '8:15 pm' },
      { de: 'sofia', texto: 'Con un enganche del 20% la cuota queda alrededor de $XXX al mes a 60 meses. ¿Te gustaría venir a verla y hacer una prueba de manejo?', hora: '8:15 pm' },
      { de: 'cliente', texto: 'Sí, el sábado en la mañana', hora: '8:16 pm' },
      { de: 'sofia', texto: 'Listo, te agendé el sábado a las 10:00 am en la agencia. Te llega un recordatorio antes. 🙌', hora: '8:16 pm' },
      { de: 'sistema', texto: 'Llamada entrante del mismo número, unida a este contacto', hora: 'Dom 6:40 pm' },
      { de: 'cliente', texto: '(Llamada) Quería confirmar si puedo dejar mi carro actual a cuenta', hora: '6:40 pm' },
      { de: 'sofia', texto: 'Claro, en la cita el asesor te hace la evaluación de tu vehículo a cuenta. Ya lo dejé anotado.', hora: '6:41 pm' },
      { de: 'sistema', texto: 'Transferida a Carlos Menjívar (asesor) con todo el historial', hora: 'Lun 8:05 am' },
      { de: 'asesor', texto: 'Hola Gabriela, soy Carlos. Te espero el sábado. Ya tengo tu info y lo de tu carro a cuenta.', hora: '8:06 am' },
    ],
  },
  {
    id: 'marlon',
    nombre: 'Marlon Díaz',
    inicial: 'M',
    canal: 'instagram',
    telefono: '+503 7033 5521',
    snippet: '¿Y viene con cámara de reversa?',
    hora: '9:41 am',
    estado: 'sofia',
    campana: 'Instagram · Reel Corolla Cross',
    historial: 'Instagram',
    modelo: 'Corolla Cross 2026',
    formaPago: 'Por definir',
    presupuesto: 'Por definir',
    hilo: [
      { de: 'sistema', texto: 'Conversación iniciada desde Reel de Instagram · Corolla Cross', hora: '9:39 am' },
      { de: 'cliente', texto: 'Hola, me interesa la Corolla Cross que salió en el reel', hora: '9:39 am' },
      { de: 'sofia', texto: '¡Hola Marlon! Con gusto. La Corolla Cross 2026 está disponible desde $XX,XXX. ¿Te la muestro al contado o financiada?', hora: '9:40 am' },
      { de: 'cliente', texto: '¿Y viene con cámara de reversa?', hora: '9:41 am' },
      { de: 'sofia', texto: 'Sí, todas las versiones traen cámara de reversa y sensores. ¿Quieres que te agende una prueba de manejo esta semana?', hora: '9:41 am' },
    ],
  },
  {
    id: 'karla',
    nombre: 'Karla López',
    inicial: 'K',
    canal: 'facebook',
    telefono: '+503 7890 1240',
    snippet: 'Perfecto, ahí llego',
    hora: 'Ayer',
    estado: 'asesor',
    campana: 'Facebook · Catálogo Ranger',
    historial: 'Facebook Messenger',
    modelo: 'Ranger 2025',
    formaPago: 'Contado',
    presupuesto: 'Aprobado',
    proximaCita: 'Hoy 4:00 pm · agencia',
    asesor: 'Rodrigo Cea',
    hilo: [
      { de: 'sistema', texto: 'Conversación iniciada desde catálogo de Facebook · Ranger', hora: 'Ayer 3:10 pm' },
      { de: 'cliente', texto: 'Quiero la Ranger doble cabina, pago de contado', hora: '3:10 pm' },
      { de: 'sofia', texto: '¡Excelente Karla! La Ranger 2025 doble cabina está disponible. Como es de contado, te paso con un asesor para cerrar los detalles. ¿Te agendo hoy?', hora: '3:11 pm' },
      { de: 'cliente', texto: 'Sí, en la tarde', hora: '3:12 pm' },
      { de: 'sistema', texto: 'Transferida a Rodrigo Cea (asesor) con todo el historial', hora: '3:12 pm' },
      { de: 'asesor', texto: 'Hola Karla, te espero hoy a las 4:00 pm en la agencia.', hora: '3:15 pm' },
      { de: 'cliente', texto: 'Perfecto, ahí llego', hora: '3:20 pm' },
    ],
  },
  {
    id: 'jose',
    nombre: 'José Portillo',
    inicial: 'J',
    canal: 'llamada',
    telefono: '+503 7256 0087',
    snippet: '(Llamada) Ando viendo la Rav4',
    hora: '10:02 am',
    estado: 'precalificado',
    campana: 'Directo / orgánico',
    historial: '1 llamada',
    modelo: 'RAV4 2026',
    formaPago: 'Financiado',
    presupuesto: 'Precalifica',
    hilo: [
      { de: 'sistema', texto: 'Llamada entrante atendida por Sofía', hora: '10:00 am' },
      { de: 'cliente', texto: '(Llamada) Buenos días, ando viendo la Rav4, ¿qué precio tiene?', hora: '10:00 am' },
      { de: 'sofia', texto: 'Buenos días José. La RAV4 2026 está desde $XX,XXX. ¿La ve al contado o financiada?', hora: '10:01 am' },
      { de: 'cliente', texto: 'Financiada, ¿cuánto de enganche pide?', hora: '10:01 am' },
      { de: 'sofia', texto: 'Desde el 20% de enganche. Con sus datos hago una precalificación rápida y le digo su rango de cuota. ¿Se la agendo con un asesor?', hora: '10:02 am' },
    ],
  },
]
