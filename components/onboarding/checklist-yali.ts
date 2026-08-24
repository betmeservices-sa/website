// Checklist de puesta en marcha de Yali Hospitality.
//
// NO es un formulario. La primera versión lo era y estaba mal pensada: pedía
// que escribieran una API key de Cloudbeds en un campo de una página web, y eso
// no es como se entregan accesos. Lo que se entrega es un USUARIO, creado desde
// su cuenta, con permisos acotados y que ellos pueden revocar cuando quieran.
//
// Entonces esto es una lista de cosas por hacer, pensada para recorrerse en una
// llamada: cada punto dice quién lo hace, por qué hace falta y cómo se hace.
//
// REGLA al agregar un punto: no se pregunta nada que vayamos a ver nosotros
// una vez que tengamos el acceso. El ID del Business Manager, los enlaces de
// las páginas o los permisos con los que quedó el usuario aparecen solos apenas
// nos agregan. Preguntarlos es hacerles buscar un dato que ya vamos a tener, y
// eso alarga la lista sin aportar. Solo se pregunta lo que de verdad no
// podemos averiguar por nuestra cuenta.

export type Quien = 'ellos' | 'nosotros' | 'juntos'

export interface Tarea {
  id: string
  titulo: string
  quien: Quien
  porque: string
  /** Los pasos concretos. Lo que se lee en voz alta durante la llamada. */
  pasos?: string[]
  /** Una nota corta al lado del punto. Nunca una credencial. */
  nota?: string
}

export interface Decision {
  id: string
  pregunta: string
  pista?: string
  opciones?: string[]
  /** true = respuesta larga, en párrafo. */
  abierta?: boolean
  filas?: number
}

export interface Grupo {
  id: string
  titulo: string
  intro: string
  urgente?: boolean
  tareas?: Tarea[]
  decisiones?: Decision[]
}

export const CORREO_ACCESOS = 'accesos@miagentia.com'

export const GRUPOS_YALI: Grupo[] = [
  {
    id: 'accesos',
    titulo: 'Accesos que hay que crear',
    urgente: true,
    intro:
      'Esto es lo que desbloquea todo lo demás. No hace falta que nos manden contraseñas ni claves por ningún lado: se hace creando usuarios desde sus propias cuentas, con los permisos justos, y ustedes nos los pueden quitar cuando quieran.',
    tareas: [
      {
        id: 'cbUsuario',
        titulo: 'Crearnos un usuario en Cloudbeds',
        quien: 'ellos',
        porque:
          'El agente consulta disponibilidad y tarifas en vivo, así que nunca cotiza con un precio viejo. Hoy está corriendo con datos de demostración y lo aclara en voz alta.',
        pasos: [
          `Desde la cuenta de administrador de Cloudbeds, invitar a ${CORREO_ACCESOS}`,
          'Darle acceso a las tres propiedades: Yalí, Costa del Surf y la tercera',
          'Con eso generamos nosotros la credencial de la integración y nunca viaja por correo ni por chat',
        ],
      },
      {
        id: 'cbPermiso',
        titulo: 'Decidir hasta dónde llega el agente en Cloudbeds',
        quien: 'juntos',
        porque:
          'Consultar es inmediato y sin riesgo. Reservar y cobrar se habilitan cuando ustedes lo decidan, no antes.',
      },
      {
        id: 'metaAdmin',
        titulo: 'Agregarnos como administradores del Business Manager',
        quien: 'ellos',
        porque:
          'Es lo que permite que el agente conteste por WhatsApp, Instagram y Facebook. Sin esto no hay forma de conectar nada.',
        pasos: [
          'Entrar a business.facebook.com con la cuenta dueña del negocio',
          `Configuración del negocio, Usuarios, Personas, Agregar: ${CORREO_ACCESOS}`,
          'Darle acceso a las páginas de Facebook y a las cuentas de Instagram de las tres sedes',
        ],
      },
      {
        id: 'waNumero',
        titulo: 'Definir el número de WhatsApp y ver si está libre',
        quien: 'ellos',
        porque:
          'Es el atasco más común de todos. Si el número ya está en uso en la app de WhatsApp Business del teléfono, hay que migrarlo y eso lleva pasos y días. Si es nuevo, se conecta de una.',
        pasos: [
          'Elegir qué número va a atender el agente (¿uno solo para las tres sedes?)',
          'Revisar si ese número está en uso en la app de WhatsApp Business de algún teléfono',
          'Si está en uso, avisarnos antes de hacer nada: la migración tiene un orden',
        ],
        nota: '¿Qué número es y en qué estado está?',
      },
      {
        id: 'igPaginas',
        titulo: 'Conectar cada Instagram a su página de Facebook',
        quien: 'ellos',
        porque:
          'Los mensajes de Instagram entran por la página. Si el Instagram no está vinculado, esa sede queda muda aunque todo lo demás esté bien.',
        nota: '¿Alguna de las cuentas quedó fuera del Business Manager? Esa no la vemos y es la que se queda muda',
      },
      {
        id: 'verificacion',
        titulo: 'Verificar el negocio en Meta, si aún no está',
        quien: 'ellos',
        porque:
          'Sin verificar, Meta limita cuántos mensajes se pueden mandar por día. Se puede arrancar sin esto, pero conviene empezarlo ya porque tarda.',
      },
    ],
  },
  {
    id: 'agente',
    titulo: 'Decisiones sobre el agente',
    intro:
      'Esto define cómo le habla a sus huéspedes. No hace falta que escriban un guion: con que nos cuenten cómo atienden ustedes en recepción, nosotros lo convertimos en el guion.',
    decisiones: [
      {
        id: 'nombre',
        pregunta: '¿Cómo se va a llamar?',
        pista: 'Hoy está como Sofía. Si prefieren otro nombre, este es el momento.',
      },
      {
        id: 'trato',
        pregunta: '¿De usted o de vos?',
        opciones: ['De usted, siempre', 'De vos, más cercano', 'De usted, y de vos si el huésped lo hace'],
      },
      {
        id: 'idiomas',
        pregunta: '¿En qué idiomas contesta?',
        pista: 'Son hoteles de playa con surf: buena parte de los huéspedes escribe en inglés. Hoy el agente solo habla español.',
        opciones: ['Solo español', 'Español e inglés', 'Español, inglés y otro'],
      },
      {
        id: 'canales',
        pregunta: '¿Solo chat, o también llamadas?',
        pista: 'Hoy está armado para chat. La voz se suma después y cambia el alcance.',
        opciones: ['Solo chat (WhatsApp y redes)', 'Chat y llamadas'],
      },
      {
        id: 'tono',
        pregunta: '¿Cómo tiene que sonar?',
        pista: 'Descríbanlo como se lo explicarían a alguien nuevo en recepción. Por ejemplo: cálida, muy salvadoreña, relajada como la playa, nunca vendedora agresiva.',
        abierta: true,
      },
      {
        id: 'puede',
        pregunta: '¿Qué puede resolver solo y qué pasa a una persona?',
        pista: 'Y sobre todo: a quién se lo pasa, con nombre, teléfono y horario. Si cambia por sede, cuéntennos.',
        abierta: true,
        filas: 4,
      },
      {
        id: 'otas',
        pregunta: 'Alguien escribe por WhatsApp, pero reservó por Booking o Airbnb. ¿Qué hace el agente?',
        pista: 'Por ejemplo: "Hola, reservé por Booking para el sábado, ¿me pueden dar la habitación con vista al mar?". ¿Lo atiende igual que a cualquier huésped, o le dice que eso se maneja desde Booking?',
        abierta: true,
        filas: 2,
      },
      {
        id: 'nunca',
        pregunta: '¿Qué no debe hacer ni decir nunca?',
        pista: 'Descuentos no autorizados, comparaciones con otros hoteles, promesas de upgrade.',
        abierta: true,
        filas: 2,
      },
      {
        id: 'quejas',
        pregunta: 'Alguien se queja en un comentario de Instagram o Facebook, donde todos lo ven. ¿Qué hace el agente?',
        pista: 'Por ejemplo: "Estuve el fin de semana y el aire no servía". ¿Contesta algo corto en público y sigue por privado, o mejor no responde nada y les avisa a ustedes?',
        abierta: true,
        filas: 2,
      },
      {
        id: 'faq',
        pregunta: 'Las cinco preguntas que más les hacen, con su respuesta',
        pista: 'Es lo que más rápido mejora al agente. Escríbanlas como las contestan hoy.',
        abierta: true,
        filas: 5,
      },
    ],
  },
  {
    id: 'casa',
    titulo: 'Reglas de la casa',
    intro:
      'Lo que un huésped pregunta antes de decidirse y que Cloudbeds no contesta. Si el agente no lo sabe, tiene que decir que no lo sabe, y eso enfría la conversación justo cuando estaba por reservar.',
    decisiones: [
      { id: 'checkin', pregunta: 'Check in y check out' },
      { id: 'pagos', pregunta: 'Formas de pago que aceptan' },
      { id: 'cancelacion', pregunta: 'Política de cancelación', abierta: true, filas: 2 },
      { id: 'mascotas', pregunta: 'Mascotas, niños y visitas', abierta: true, filas: 2 },
      {
        id: 'servicios',
        pregunta: 'Servicios de cada sede',
        pista: 'Piscina, restaurante, wifi, aire, parqueo, clases de surf.',
        abierta: true,
        filas: 3,
      },
      {
        id: 'llegar',
        pregunta: 'Cómo llegar a cada sede',
        pista: 'Referencia, tiempo desde San Salvador, enlace de Google Maps.',
        abierta: true,
        filas: 3,
      },
    ],
  },
  {
    id: 'cierre',
    titulo: 'Administración',
    intro: 'Lo último, y lo más rápido.',
    tareas: [
      {
        id: 'usuarios',
        titulo: 'Decirnos quiénes van a usar el panel',
        quien: 'ellos',
        porque: 'Cada persona entra con su propio usuario, así queda claro quién atendió qué.',
        nota: 'Nombre y correo de cada uno',
      },
      {
        id: 'facturacion',
        titulo: 'Datos de facturación',
        quien: 'ellos',
        porque: 'Para dejar la parte administrativa lista desde el arranque y que no frene nada después.',
        nota: 'A nombre de quién, NIT o NRC, y a qué correo se manda',
      },
    ],
  },
]
