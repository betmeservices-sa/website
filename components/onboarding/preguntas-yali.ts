// Las preguntas del onboarding de Yali Hospitality.
//
// Separadas del componente a propósito: el formulario es genérico y cada
// cliente aporta su lista. Sumar un cliente nuevo es un archivo como este, no
// una copia del formulario.
//
// Lo que se pregunta sale de lo que el sistema de verdad consume. Por eso NO se
// piden tarifas: el agente las consulta en Cloudbeds en vivo (ver yali-pms.ts en
// el demo), así que pedirlas sería pedir el trabajo dos veces y quedaría
// desactualizado el día que cambien un precio.

export interface Pregunta {
  id: string
  label: string
  pista?: string
  tipo?: 'texto' | 'area' | 'select' | 'clave' | 'url' | 'tel'
  opciones?: string[]
  filas?: number
  /** Dos por fila en pantalla ancha. */
  medio?: boolean
}

export interface Casillas {
  titulo: string
  pista?: string
  opciones: string[]
}

export interface BloqueOnboarding {
  id: string
  titulo: string
  porque: string
  aviso?: string
  preguntas?: Pregunta[]
  casillas?: Casillas[]
  /** Preguntas que van DESPUÉS de las casillas. */
  cierre?: Pregunta[]
  nota?: string
}

export const BLOQUES_YALI: BloqueOnboarding[] = [
  {
    id: 'cloudbeds',
    titulo: 'Acceso a Cloudbeds',
    porque:
      'No hace falta que nos pasen listas de precios. El agente consulta Cloudbeds en vivo, así que cotiza con la tarifa y la disponibilidad del momento, y nunca queda desactualizado. Hoy está corriendo con datos de demostración y lo aclara en voz alta; con estas credenciales pasa a datos reales.',
    preguntas: [
      {
        id: 'cbKey',
        label: 'API key de Cloudbeds',
        pista: 'En Cloudbeds: Configuración, Integraciones (API). No viaja en el resumen que se envía: la pedimos por otro canal.',
        tipo: 'clave',
        medio: true,
      },
      {
        id: 'cbProps',
        label: 'Property ID de cada sede',
        pista: 'Uno por propiedad. Son las tres: Yalí, Costa del Surf y la tercera.',
        tipo: 'area',
        medio: true,
      },
      {
        id: 'cbTipos',
        label: '¿Los tipos de habitación en Cloudbeds se llaman igual que en su sitio?',
        pista:
          'Nosotros cargamos Bungalow, Bungalow Familiar, Planta Baja, Planta Alta (estándar, vista al mar, frente al mar), Sencilla, Doble y Garden View. Si en Cloudbeds tienen otro nombre, díganos cuál es cuál.',
        tipo: 'area',
        filas: 3,
      },
      {
        id: 'cbPaquetes',
        label: 'Lo que NO está en Cloudbeds',
        pista: 'Paquetes, tours, traslados o cualquier cosa que se cotice aparte.',
        tipo: 'area',
        medio: true,
      },
      {
        id: 'cbReserva',
        label: '¿El agente puede reservar en Cloudbeds o solo consultar?',
        pista: 'Consultar es inmediato. Reservar y cobrar el anticipo se habilita cuando ustedes lo decidan.',
        tipo: 'select',
        opciones: [
          'Solo consultar disponibilidad y tarifas',
          'Consultar y crear la reserva',
          'Consultar, reservar y cobrar el anticipo',
        ],
        medio: true,
      },
    ],
  },
  {
    id: 'agente',
    titulo: 'Cómo quieren que sea el agente',
    porque:
      'Esto define cómo le habla a sus huéspedes. No hace falta que escriban un guion: con que nos digan cómo atienden ustedes en recepción, nosotros lo convertimos en el guion.',
    preguntas: [
      { id: 'nombreAgente', label: '¿Cómo se llama?', pista: 'Hoy está como Sofía. Si prefieren otro nombre, este es el momento.', medio: true },
      {
        id: 'trato',
        label: '¿De usted o de vos?',
        tipo: 'select',
        opciones: ['De usted, siempre', 'De vos, más cercano', 'De usted al inicio, de vos si el huésped lo hace'],
        medio: true,
      },
      {
        id: 'idiomas',
        label: '¿En qué idiomas debe contestar?',
        pista:
          'Lo preguntamos porque son hoteles de playa con surf: una parte de sus huéspedes escribe en inglés. Hoy el agente solo habla español.',
        tipo: 'select',
        opciones: ['Solo español', 'Español e inglés', 'Español, inglés y otro (contarnos cuál)'],
        medio: true,
      },
      {
        id: 'canales',
        label: '¿Solo chat, o también llamadas?',
        pista: 'Hoy está armado para chat. La voz se suma después y cambia el alcance.',
        tipo: 'select',
        opciones: ['Solo chat (WhatsApp y redes)', 'Chat y llamadas'],
        medio: true,
      },
      { id: 'tono', label: 'Tono y personalidad', pista: 'Descríbanlo como se lo explicarían a alguien nuevo en recepción. Ejemplo: cálida, muy salvadoreña, relajada como la playa, nunca vendedora agresiva.', tipo: 'area' },
      { id: 'saludo', label: 'Cómo debe saludar', pista: 'La primera frase de cada conversación. Si tienen una que ya usan, escríbanla tal cual.', tipo: 'area', filas: 2 },
    ],
    casillas: [
      {
        titulo: 'Qué SÍ puede hacer solo',
        opciones: [
          'Dar disponibilidad y tarifas (de Cloudbeds, en vivo)',
          'Crear la reserva',
          'Cobrar el anticipo',
          'Cambiar o cancelar una reserva',
          'Dar indicaciones para llegar',
          'Recomendar tours y restaurantes',
          'Atender reclamos',
        ],
      },
    ],
    cierre: [
      { id: 'otas', label: '¿Qué hace con quien reservó por Booking, Airbnb o Expedia?', pista: 'Cloudbeds sincroniza esos canales, así que va a llegar gente por WhatsApp preguntando por una reserva hecha ahí. Si no lo definen, el agente improvisa.', tipo: 'area', filas: 2 },
      { id: 'noHace', label: 'Qué NO debe hacer nunca', pista: 'Lo que prefieren que pase a una persona sí o sí.', tipo: 'area', medio: true },
      { id: 'noDice', label: 'Qué NO debe decir nunca', pista: 'Descuentos no autorizados, comparaciones con otros hoteles, promesas de upgrade.', tipo: 'area', medio: true },
      { id: 'traspaso', label: 'Cuándo pasa la conversación a una persona, y a quién', pista: 'Nombre, teléfono y horario de quien recibe. Si es distinto por sede, díganlo.', tipo: 'area' },
      { id: 'faq', label: 'Las cinco preguntas que más les hacen, con su respuesta', pista: 'Esto es lo que más rápido mejora al agente. Escríbanlas como las contestan hoy.', tipo: 'area', filas: 5 },
    ],
    nota:
      'Las promociones no van acá: se cargan y se apagan desde el panel, en su pestaña Promociones, y el agente las toma en vivo. Así ustedes lanzan una oferta sin depender de nosotros.',
  },
  {
    id: 'casa',
    titulo: 'Reglas de la casa',
    porque:
      'Lo que un huésped pregunta antes de decidirse y que Cloudbeds no contesta. Si el agente no lo sabe, tiene que decir que no lo sabe, y eso enfría la conversación justo cuando estaba por reservar.',
    preguntas: [
      { id: 'checkin', label: 'Check in y check out', pista: 'Por ejemplo: entrada 3:00 p.m., salida 12:00 m.', medio: true },
      { id: 'pagos', label: 'Formas de pago que aceptan', pista: 'Efectivo, tarjeta, transferencia.', medio: true },
      { id: 'cancelacion', label: 'Política de cancelación', tipo: 'area', filas: 2 },
      { id: 'mascotas', label: 'Mascotas, niños y visitas', tipo: 'area', medio: true },
      { id: 'servicios', label: 'Servicios de cada sede', pista: 'Piscina, restaurante, wifi, aire, parqueo, clases de surf.', tipo: 'area', medio: true },
      { id: 'llegar', label: 'Cómo llegar a cada sede', pista: 'Referencia, tiempo desde San Salvador, enlace de Google Maps.', tipo: 'area' },
    ],
  },
  {
    id: 'meta',
    titulo: 'WhatsApp y redes',
    porque:
      'Para que el agente conteste por WhatsApp, Instagram y Facebook necesitamos permiso sobre sus cuentas. No nos den contraseñas: se hace agregándonos como administradores desde su Business Manager, y ustedes nos pueden quitar el acceso cuando quieran.',
    aviso:
      'Nuestra app todavía está en revisión de Meta, así que la conexión automática no está disponible. Este primer tramo va con un token de página que se genera una vez y se pega en el panel. Cuando la aprobación salga, se migra sin que ustedes vuelvan a hacer nada.',
    preguntas: [
      { id: 'bmId', label: 'ID del Business Manager', pista: 'business.facebook.com, Configuración, Información del negocio.', medio: true },
      { id: 'waNumero', label: 'Número de WhatsApp del hotel', pista: '¿Es uno solo para las tres sedes?', tipo: 'tel', medio: true },
      {
        id: 'waMigrar',
        label: '¿Ese número ya está en uso en la app de WhatsApp Business?',
        pista: 'Es el atasco más común de todos. Si ya está en uso, hay que migrarlo y eso lleva pasos y tiempo; si es nuevo, se conecta de una.',
        tipo: 'select',
        opciones: ['Es un número nuevo, sin usar', 'Ya está en la app y hay que migrarlo', 'No estoy seguro'],
        medio: true,
      },
      { id: 'paginas', label: 'Páginas de Facebook e Instagram, por sede', pista: 'Peguen los enlaces. Sabemos que hay un Instagram por sede y un solo WhatsApp: por eso los enlaces de cada perfil llevan una marca distinta, para saber de qué sede viene cada quien.', tipo: 'area', filas: 4 },
    ],
    casillas: [
      {
        titulo: 'Lo que hay que hacer de su lado',
        opciones: [
          'Agregarnos como administradores del Business Manager',
          'Confirmar si el número de WhatsApp está libre o hay que migrarlo',
          'Verificar el negocio en Meta (si aún no está)',
          'Conectar cada Instagram a su página de Facebook',
        ],
      },
      {
        titulo: 'Comentarios en sus publicaciones',
        pista:
          'El agente también puede contestar los comentarios de sus posts. Ahí es donde se pierden más reservas: alguien pregunta el precio en un comentario, nadie contesta en dos días, y se fue.',
        opciones: [
          'Responder en público las preguntas de precio y disponibilidad',
          'Invitar al privado para cerrar la reserva',
          'Agradecer los comentarios positivos',
          'Avisarle a una persona y NO responder solo, si es una queja',
          'Ocultar spam y groserías',
        ],
      },
    ],
    cierre: [
      { id: 'contactoTecnico', label: 'Quién nos ayuda con esto de su lado', pista: 'Nombre, correo y WhatsApp de quien tiene acceso a las cuentas.' },
      { id: 'quejas', label: 'Qué hacer con una queja pública', pista: 'Es la decisión más delicada. Díganos si prefieren que responda algo breve y pase al privado, o que no toque nada y les avise.', tipo: 'area', filas: 2 },
    ],
  },
  {
    id: 'material',
    titulo: 'Material y cierre',
    porque: 'Lo que hace que el panel y las publicaciones se vean como ustedes y no como una plantilla.',
    preguntas: [
      { id: 'material', label: 'Enlace a una carpeta con fotos y logo', pista: 'Drive o Dropbox. Fotos por sede y por tipo de habitación, y el logo en alta resolución con fondo transparente.', tipo: 'url' },
      { id: 'usuarios', label: 'Quiénes van a usar el panel', pista: 'Nombre y correo de cada uno. Cada persona entra con su usuario.', tipo: 'area', medio: true },
      { id: 'quienRecibe', label: 'Quién firma y aprueba de su lado', medio: true },
      { id: 'facturacion', label: 'Datos de facturación', pista: 'A nombre de quién va la factura, NIT o NRC, y a qué correo se manda.', tipo: 'area', medio: true },
      { id: 'volumen', label: '¿Cuántos mensajes reciben al mes, más o menos?', pista: 'Aunque sea un estimado. Sirve para dimensionar y para que no haya sorpresas en la cuenta.', medio: true },
      { id: 'otros', label: 'Cualquier otra cosa que debamos saber', tipo: 'area' },
    ],
  },
]
