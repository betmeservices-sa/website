// Checklist del kickoff de Yali Hospitality.
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
//
// ESTÁ PRELLENADO con lo que se acordó en el kickoff del 24 de agosto de 2026
// (Jaime Quintanilla, Verónica Viches, Olga, Dino Safie, y por nuestro lado
// Sandra, Mario, Alex y Andrea). El cliente ya no lo llena: lo revisa y lo
// corrige, que es lo que se le prometió en la llamada.
//
// Lo que quedó SIN respuesta se dejó vacío a propósito, para que se vea que
// falta en vez de esconderlo detrás de una frase de relleno.

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
  /** Ya quedó hecho en la llamada. */
  hecho?: boolean
  /** Cómo quedó, con lo que se dijo. El cliente lo puede corregir. */
  respuesta?: string
}

export interface Decision {
  id: string
  pregunta: string
  pista?: string
  opciones?: string[]
  /** true = respuesta larga, en párrafo. */
  abierta?: boolean
  filas?: number
  /** Lo que contestaron en la llamada. Vacío = quedó pendiente. */
  respuesta?: string
}

export interface Grupo {
  id: string
  titulo: string
  intro: string
  urgente?: boolean
  tareas?: Tarea[]
  decisiones?: Decision[]
}

export const CORREO_ACCESOS = 'marketing@betmeservices.com'

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
        hecho: true,
        porque:
          'El agente consulta disponibilidad y tarifas en vivo, así que nunca cotiza con un precio viejo. Hasta que esté conectado corre con datos de demostración y lo aclara en voz alta.',
        pasos: [
          `Desde la cuenta de administrador de Cloudbeds, invitar a ${CORREO_ACCESOS}`,
          'Darle acceso a las tres propiedades: Yalí, Costa del Surf y Playa Linda',
          'Con eso generamos nosotros la credencial de la integración y nunca viaja por correo ni por chat',
        ],
        nota: 'Cómo quedó',
        respuesta:
          'Se trabó a media llamada (Cloudbeds tiró una alerta de seguridad y soporte le respondía hasta el día siguiente), pero se resolvió antes de colgar: Jaime creó los usuarios y llegaron Playa Linda, Yalí y Costa del Surf, con perfil de administrador. Falta confirmar que las tres propiedades quedaron con el mismo nivel de acceso.',
      },
      {
        id: 'cbPermiso',
        titulo: 'Decidir hasta dónde llega el agente en Cloudbeds',
        quien: 'juntos',
        hecho: true,
        porque:
          'Consultar es inmediato y sin riesgo. Reservar y cobrar se habilitan cuando ustedes lo decidan, no antes.',
        nota: 'Cómo quedó',
        respuesta:
          'Sofía consulta disponibilidad, cotiza con la tarifa oficial de Cloudbeds, deja la reserva puesta en el sistema y además escribe la nota de la reserva (cuántos desayunos lleva, hora de llegada, cama adicional). Lo que dice Cloudbeds es lo que dice Sofía: no maneja tarifas propias. Verónica valida después que lo que quedó en sistema sea lo correcto.',
      },
      {
        id: 'metaAdmin',
        titulo: 'Agregarnos como administradores del Business Manager',
        quien: 'ellos',
        hecho: true,
        porque:
          'Es lo que permite que el agente conteste por WhatsApp, Instagram y Facebook. Sin esto no hay forma de conectar nada.',
        pasos: [
          'Entrar a business.facebook.com con la cuenta dueña del negocio',
          `Configuración del negocio, Usuarios, Personas, Agregar: ${CORREO_ACCESOS}`,
          'Darle acceso a las páginas de Facebook y a las cuentas de Instagram de las tres sedes',
        ],
        nota: 'Cómo quedó',
        respuesta:
          'Hecho en la llamada por Verónica, con acceso completo a la página y al Instagram de Yali. El negocio ya aparece verificado. OJO: del lado nuestro entró UNA sola página (YALI Hotel & Resort, con el Instagram yali_hotel). Si Costa del Surf y Playa Linda tienen página o Instagram propios, hay que agregarlos también, o esas dos sedes quedan mudas.',
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
        respuesta:
          'Es el número de reservas que atiende Verónica hoy, el mismo que está en los anuncios. En el Business Manager todavía aparece como no asociado, y se resuelve al desconectarlo del teléfono para conectarlo acá.',
      },
      {
        id: 'waMigracion',
        titulo: 'Reservar la ventana para migrar el número',
        quien: 'juntos',
        porque:
          'Es el único paso que interrumpe el servicio, y trae dos cambios que conviene que nadie descubra a mitad de un sábado.',
        pasos: [
          'Hacer respaldo de las conversaciones antes de migrar',
          'Elegir día y hora: contemplen hasta una hora fuera de línea (suele ser menos)',
          'Avisar al equipo, porque desde ese momento se deja de usar WhatsApp Web',
        ],
        nota: '¿Qué día y a qué hora?',
        respuesta:
          'Dos cosas que Verónica preguntó y conviene dejar por escrito: al migrar se deja de usar la aplicación web de WhatsApp y se pasa a atender desde el panel, y los chats empiezan de nuevo (por eso el respaldo antes). La migración no se hace hasta tener el número verificado. En la llamada se apuntó a hacerla el martes a las 5 de la tarde, sujeto a que Cloudbeds quedara conectado.',
      },
      {
        id: 'igPaginas',
        titulo: 'Conectar cada Instagram a su página de Facebook',
        quien: 'ellos',
        hecho: true,
        porque:
          'Los mensajes de Instagram entran por la página. Si el Instagram no está vinculado, esa sede queda muda aunque todo lo demás esté bien.',
        nota: '¿Alguna de las cuentas quedó fuera del Business Manager? Esa no la vemos y es la que se queda muda',
        respuesta:
          'Instagram y Facebook de Yali quedaron conectados y visibles. Falta confirmar si Costa del Surf y Playa Linda manejan cuentas propias o si todo va por la misma.',
      },
      {
        id: 'verificacion',
        titulo: 'Verificar el negocio en Meta, si aún no está',
        quien: 'ellos',
        hecho: true,
        porque:
          'Sin verificar, Meta limita cuántos mensajes se pueden mandar por día. Se puede arrancar sin esto, pero conviene empezarlo ya porque tarda.',
        nota: 'Cómo quedó',
        respuesta: 'Ya estaba verificado. Se revisó en pantalla durante la llamada.',
      },
      {
        id: 'olgaLinea',
        titulo: 'Pasar la línea de membresías a WhatsApp Business y sumarla',
        quien: 'ellos',
        porque:
          'Membresías es un canal aparte, con su propia persona. Si esa línea también vive en el panel, queda el historial completo de cada cliente en un solo lugar: lo que habló con reservas y lo que habló con membresías.',
        pasos: [
          'La línea de Olga tiene que ser WhatsApp Business (ya lo es)',
          'Asociarla como segundo número al mismo Business Manager donde está Yali',
          'Verificarla con el código que llega a ese teléfono',
        ],
        nota: '¿Cuál es el número de membresías?',
        respuesta:
          'En la llamada se dictó como 7878 5675 8, y ahí hay un dígito de más: confírmennos el número correcto. Se detectó además que la línea ya está vinculada a otra cuenta comercial, la de Sunsal Beach Club, así que hay que desvincularla de ahí o darnos acceso a ese perfil también. Esto NO frena el arranque: se puede sumar después.',
      },
      {
        id: 'docsPendientes',
        titulo: 'Pasarnos lo que quedó de tarea',
        quien: 'ellos',
        porque:
          'Es lo único que le falta a Sofía para no tener que decir "eso se lo confirma el equipo" en preguntas que se hacen todos los días.',
        pasos: [
          'Day Pass con habitación de las tres sedes, con su precio y qué incluye',
          'Day Pass Premium',
        ],
        nota: 'Cómo quedó',
        respuesta:
          'Ya recibido: el contrato con las cuatro membresías y sus beneficios (por correo), el menú y la ubicación (por WhatsApp). Falta el Day Pass con habitación y el Premium.',
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
        respuesta: 'Sofía',
      },
      {
        id: 'trato',
        pregunta: '¿De usted o de vos?',
        opciones: ['De usted, siempre', 'De vos, más cercano', 'De usted, y de vos si el huésped lo hace'],
        respuesta: 'De usted, siempre',
      },
      {
        id: 'idiomas',
        pregunta: '¿En qué idiomas contesta?',
        pista:
          'Alex hizo ver que les escriben bastante en inglés. Aun así quedó en español, porque el cliente es principalmente nacional. Si quieren revisarlo, este es el punto.',
        opciones: ['Solo español', 'Español e inglés', 'Español, inglés y otro'],
        respuesta: 'Solo español',
      },
      {
        id: 'canales',
        pregunta: '¿Solo chat, o también llamadas?',
        pista: 'Hoy está armado para chat. La voz se suma después y cambia el alcance.',
        opciones: ['Solo chat (WhatsApp y redes)', 'Chat y llamadas'],
        respuesta: 'Solo chat (WhatsApp y redes)',
      },
      {
        id: 'tono',
        pregunta: '¿Cómo tiene que sonar?',
        pista:
          'Descríbanlo como se lo explicarían a alguien nuevo en recepción.',
        abierta: true,
        respuesta:
          'Cordial y amable, y al mismo tiempo formal. Son hospitalidad, pero quien escribe es casi siempre un padre o una madre de familia, no gente joven: nada de jerga ni de confianzas, y de usted aunque el huésped tutee. Cuando no dan el nombre, la atención igual tiene que sentirse personalizada.',
      },
      {
        id: 'puede',
        pregunta: '¿Qué puede resolver solo y qué pasa a una persona?',
        pista: 'Y sobre todo: a quién se lo pasa, con nombre, teléfono y horario. Si cambia por sede, cuéntennos.',
        abierta: true,
        filas: 4,
        respuesta:
          'RESUELVE SOLA: información de habitaciones y disponibilidad, tarifas de Cloudbeds, Day Pass de las tres sedes, menú y fotos del restaurante, ubicación y cómo llegar, horarios, reglas de la casa (mascotas, niños, traje de baño), y la reserva completa hasta dejarla puesta en Cloudbeds con su nota.\n\nPASA A RESERVAS (Verónica, 6061 4885, de 8:00 a 17:00): comprobante que no cuadra con el monto de la reserva, pago parcial, quien no pagó dentro de la hora que se le dio, dos personas peleando la misma habitación el mismo día, entrada antes de las 3 o salida después del mediodía, cancelaciones y devoluciones, cotizaciones de grupo o eventos, y cualquier reclamo.\n\nPASA A MEMBRESÍAS (Olga, de 9:00 a 20:00): todo socio del Sunsal Beach Club y todo interesado en serlo. A un socio no se le da tarifa de público.\n\nA LA SEDE: lo que pasa dentro del hotel, como algo olvidado o algo que no funciona en la habitación.\n\nLas notificaciones le llegan a Verónica, y las de membresías a Olga. Jaime pidió no recibirlas.',
      },
      {
        id: 'otas',
        pregunta: 'Alguien escribe por WhatsApp, pero reservó por Booking o Airbnb. ¿Qué hace el agente?',
        pista:
          'Esto quedó SIN definir en la llamada y hace falta. Lo que sí quedó claro es que la política de cancelación cambia según por dónde reservó: en Airbnb es moderada (hasta 7 días antes sin penalidad, y dentro de los 7 días se cobra la primera noche más impuestos), mientras que lo que se reserva por aquí no es reembolsable. La pregunta es si Sofía lo atiende igual que a cualquier huésped o si le dice que ese cambio se hace desde la plataforma.',
        abierta: true,
        filas: 2,
      },
      {
        id: 'nunca',
        pregunta: '¿Qué no debe hacer ni decir nunca?',
        pista: 'Descuentos no autorizados, comparaciones con otros hoteles, promesas de upgrade.',
        abierta: true,
        filas: 2,
        respuesta:
          'No darle tarifa de público a un socio: eso es de Olga. No dar los precios de los planes de membresía más allá de "desde $55 mensuales", porque cuando la gente ve los números se apaga la venta. No confirmar una reserva si el comprobante no trae el monto exacto, ni por un dólar de diferencia y ni siquiera si pagó de más. No prometer entradas antes de las 3 ni salidas después del mediodía. No ofrecer clases ni actividades, porque no las tienen. No inventar tarifas: las oficiales son las de Cloudbeds, las mismas del motor de reservas del sitio.',
      },
      {
        id: 'proceso',
        pregunta: '¿Cómo venden hoy?',
        pista:
          'Desde que alguien pregunta hasta que la reserva queda hecha. El agente va a seguir ESE proceso, así que mientras más detallado, mejor.',
        abierta: true,
        filas: 5,
        respuesta:
          '1. Lo primero que se pregunta es la fecha y cuántas personas.\n2. Se revisa disponibilidad y se le ofrece lo que hay, con fotos del catálogo. Si lo que pidió no está libre, se le ofrece lo de arriba y lo de abajo, y el cliente decide.\n3. El precio se da DESPUÉS de que elige la habitación, no antes.\n4. Si quiere proceder, se le piden nombre, correo, se confirman fechas y cantidad de personas.\n5. Se le manda el método de pago: transferencia o enlace. Ahí mismo se le avisa que la tarifa no es reembolsable.\n6. La habitación le queda apartada UNA HORA desde que se le manda el enlace (antes eran 4, se bajó en la llamada porque el primer pago es el que interesa). Si pasa la hora sin pagar, se le escribe una vez y el caso pasa a Verónica.\n7. Se pide siempre el comprobante. Se compara el monto contra la reserva. Si cuadra, se pone la reserva en Cloudbeds con su nota; si no cuadra, lo ve una persona.\n\nEl agente trabaja fuera de horario también: se puede reservar para el mismo día a cualquier hora, porque el check in es desde las 3 y el hotel no cierra.',
      },
      {
        id: 'membresia',
        pregunta: 'Sunsal Beach Club: ¿qué hace Sofía cuando aparece un socio?',
        pista: 'Es el punto que más se discutió, porque cambia la primera frase de toda conversación.',
        abierta: true,
        filas: 4,
        respuesta:
          'Sofía pregunta si es socio ANTES de dar cualquier precio. Jaime lo pidió así, como parte aguas, porque además sirve para que más gente se entere de que existe la posibilidad de afiliarse.\n\nSi es socio: no se le da tarifa, ni disponibilidad, ni Day Pass. Pasa a Olga, que es quien atiende ese canal.\n\nSi no es socio pero le interesa: Sofía solo puede decir tres cosas, que los socios no pagan Day Pass, que tienen descuento en hospedaje y en los restaurantes, y que los planes empiezan en $55 mensuales. Nada de los otros planes ni de los beneficios por nivel. De ahí pasa a Olga.\n\nSe queda para más adelante: pasarnos la lista de socios para que Sofía los reconozca por su número sin tener que preguntar.',
      },
      {
        id: 'faq',
        pregunta: 'Las cinco preguntas que más les hacen, con su respuesta',
        pista: 'Es lo que más rápido mejora al agente. Escríbanlas como las contestan hoy.',
        abierta: true,
        filas: 5,
        respuesta:
          '1. Disponibilidad y precio de habitaciones para una fecha.\n2. El menú del restaurante (se manda el PDF).\n3. La ubicación de la sede.\n4. El Day Pass: precio, qué incluye y horario.\n5. Los horarios de atención.',
      },
    ],
  },
  {
    id: 'casa',
    titulo: 'Reglas de la casa',
    intro:
      'Lo que un huésped pregunta antes de decidirse y que Cloudbeds no contesta. Si el agente no lo sabe, tiene que decir que no lo sabe, y eso enfría la conversación justo cuando estaba por reservar.',
    decisiones: [
      {
        id: 'checkin',
        pregunta: 'Check in y check out',
        abierta: true,
        filas: 3,
        respuesta:
          'Check in desde las 3:00 p.m. Check out hasta las 12:00 del mediodía.\n\nEarly check in desde las 8:00 a.m. y late check out hasta las 5:00 p.m., sujetos a disponibilidad y con recargo del 50% del valor de la noche. Esos casos los revisa una persona, porque hay que ver la habitación el día anterior y el siguiente.\n\nEl hotel no cierra: si alguien llega a las 2 de la mañana lo recibe el vigilante y paga lo mismo que si hubiera entrado a las 3. Lo que sí cierra es el restaurante y el bar.',
      },
      {
        id: 'pagos',
        pregunta: 'Formas de pago que aceptan',
        abierta: true,
        filas: 3,
        respuesta:
          'Transferencia o enlace de pago. Visa y Mastercard. American Express NO, porque la plataforma del enlace no lo acepta. Solo dólares.\n\nNo se paga en la propiedad: sin pago no hay reserva garantizada. Siempre se pide el comprobante, la captura de la transferencia o el voucher en PDF del enlace, y el monto tiene que ser exacto.',
      },
      {
        id: 'linksPago',
        pregunta: '¿Tienen links de pago? ¿Cuáles son?',
        pista:
          'Si el agente puede mandar el link al momento, la reserva se cierra en la misma conversación.',
        abierta: true,
        filas: 3,
        respuesta:
          'Uno solo, con nombre propio, y el monto va en blanco: lo digita el cliente. La aplicación genera un voucher que el huésped comparte.\n\nJaime señaló el hueco: hoy alguien podría pagar un dólar y mandar el comprobante. Por eso Sofía compara el monto contra la reserva y no confirma si no cuadra. Cerrar el enlace con el monto fijo quedó para una segunda etapa.',
      },
      {
        id: 'cancelacion',
        pregunta: 'Política de cancelación',
        abierta: true,
        filas: 3,
        respuesta:
          'Lo que se reserva por este canal NO es reembolsable ni se cambia de fecha, porque es donde se dan las tarifas preferenciales, más baratas que en las plataformas. Se avisa antes de cobrar, no después.\n\nEn las plataformas aplica la política de cada una. En Airbnb es moderada: hasta 7 días antes sin penalidad, y dentro de los 7 días se cobra la primera noche más impuestos.',
      },
      {
        id: 'daypass',
        pregunta: 'Day Pass de las tres sedes',
        pista: 'Precio, qué es consumible, horario y restricciones.',
        abierta: true,
        filas: 5,
        respuesta:
          'YALÍ: $15. De lunes a viernes los 15 son 100% consumibles. Sábados y domingos, 10 de los 15 son consumibles ($5 de cover).\nPLAYA LINDA: $10. De lunes a viernes los 10 son consumibles. Sábados y domingos, 5 de los 10.\nCOSTA DEL SURF: $20. De lunes a viernes los 20 son consumibles. Sábados y domingos, 15 de los 20.\n\nHORARIO. Yalí y Playa Linda: entrada desde las 8:00 a.m., salida a las 6:00 p.m. de lunes a jueves y a las 7:00 p.m. de viernes a domingo. Costa del Surf: de 8:00 a.m. a 8:00 p.m. todos los días.\n\nINCLUYE: piscina, acceso a la playa, duchas exteriores y uso del restaurante.\n\nREGLAS, iguales en las tres: no se reserva, se entra por orden de llegada y sujeto a disponibilidad. En temporada alta, feriados y vacaciones aplica la tarifa de fin de semana. Los menores de 12 años no pagan. No se permite ingresar alimentos ni bebidas. No incluye toalla ni hay lockers. Se entrega brazalete, así que se puede salir y volver a entrar dentro del horario. Los socios no pagan Day Pass.',
      },
      {
        id: 'desayuno',
        pregunta: 'Desayuno',
        abierta: true,
        filas: 2,
        respuesta:
          'Va incluido, uno por persona según cuántos se hospedan, y así se anota en la nota de la reserva (si son tres, dice tres desayunos). Se hace así justamente para que nadie pida cuatro siendo dos. Los niños cuentan como persona.\n\nEn Playa Linda no se incluye desayuno en ninguna habitación.',
      },
      {
        id: 'mascotas',
        pregunta: 'Mascotas, niños y visitas',
        abierta: true,
        filas: 2,
        respuesta:
          'Mascotas: se admiten en las tres sedes. En Day Pass no pagan nada; en estadía hay recargo de $15.\n\nNiños: los menores de 12 no pagan Day Pass. En habitación sí cuentan como persona, y llevan su desayuno.\n\nPiscina: se requiere traje de baño, no se puede entrar en ropa de calle.',
      },
      {
        id: 'servicios',
        pregunta: 'Servicios de cada sede',
        pista: 'Piscina, restaurante, wifi, aire, parqueo.',
        abierta: true,
        filas: 3,
        respuesta:
          'Las tres tienen piscina, acceso a la playa, duchas exteriores, restaurante, wifi, aire acondicionado y parqueo. En Playa Linda la playa queda a 2 minutos caminando; en Yalí y Costa del Surf el acceso es directo.\n\nNo hay clases ni actividades, ni aliados que las vendan: ni yoga, ni aeróbicos, ni surf. Tampoco hay lockers ni vestidores. Las toallas son solo para quien se queda en habitación.\n\nRestaurante: entre semana de 8:00 a.m. a 8:00 p.m. Los fines de semana cierra más tarde (viernes cerca de las 9:00 p.m. y sábados cerca de las 10:00 p.m., a confirmar con operaciones). El bar es lo último que cierra.',
      },
      {
        id: 'llegar',
        pregunta: 'Cómo llegar a cada sede',
        pista: 'Referencia, tiempo desde San Salvador, enlace de Google Maps.',
        abierta: true,
        filas: 3,
        respuesta:
          'Verónica compartió la ubicación por WhatsApp durante la llamada. Falta tenerla de las tres sedes, con la referencia que usan cuando lo explican por escrito y el tiempo aproximado desde San Salvador.',
      },
    ],
  },
  {
    id: 'cierre',
    titulo: 'Quién lo va a usar',
    intro: 'Lo último, y lo más rápido.',
    tareas: [
      {
        id: 'usuarios',
        titulo: 'Decirnos quiénes van a usar el panel',
        quien: 'ellos',
        hecho: true,
        porque: 'Cada persona entra con su propio usuario, así queda claro quién atendió qué.',
        nota: 'Nombre y correo de cada uno',
        respuesta:
          'Jaime Quintanilla, Verónica Viches (reservas), Olga (membresías), Dino Safie y José Mauricio. Los correos se pusieron en el chat de la reunión; falta confirmar que estén completos.\n\nHorarios: reservas de 8:00 a 17:00, membresías de 9:00 a 20:00. Las notificaciones le llegan a Verónica al 6061 4885, y las de membresías a Olga. Jaime pidió no recibirlas.\n\nEl panel no es una aplicación que se descarga: se abre en el navegador y se deja como acceso directo en la pantalla del teléfono. Se ve igual desde la computadora.',
      },
      {
        id: 'pruebas',
        titulo: 'Probar a Sofía antes de soltarla',
        quien: 'juntos',
        porque:
          'En la llamada, con lo larga que fue, igual no se alcanzaron a cubrir todos los casos que les pueden llegar. Las pruebas son lo que los saca.',
        pasos: [
          'Nosotros les pasamos una lista de casos para repartirse entre el equipo',
          'Cada quien le escribe a Sofía como si fuera un cliente, hasta llegar a reservar',
          'Hacer al menos una reserva real, de punta a punta',
          'Anotar lo que conteste raro y pasárnoslo',
        ],
        nota: '¿Quién prueba qué?',
      },
      {
        id: 'postEstadia',
        titulo: 'Definir qué se le manda al huésped después de la estadía',
        quien: 'juntos',
        porque:
          'Es lo que convierte una estadía buena en la siguiente reserva, pero hay que decidirlo bien porque toca la reputación.',
        nota: 'Cómo quedó',
        respuesta:
          'SIN DEFINIR. Jaime dijo que no quiere empujar reseñas públicas de Google salvo que sean buenas. Olga propuso que la opinión le llegue a ella para entrar con la venta de la membresía cuando el huésped quedó contento. Sandra hizo ver que una opinión a la que te contestan se siente como una confrontación y que no es lo mismo que dejarla escrita. Quedó para una conversación aparte, junto con el seguimiento mensual a los interesados en membresía que no cerraron.',
      },
    ],
  },
]
