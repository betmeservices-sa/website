import type { Metadata } from 'next'
import HowItWorksPage, { type ContenidoHowItWorks } from '@/components/howitworks/HowItWorksPage'
import {
  FlujoRecorrido,
  FlujoSeguridad,
  FlujoVoz,
  FlujoFallback,
} from '@/components/howitworks/Flujogramas'

export const metadata: Metadata = {
  title: 'Cómo funciona',
  description:
    'El recorrido de un mensaje, quién pone cada capa de seguridad y qué pasa cuando un proveedor de IA deja de responder. Explicado con flujogramas.',
  // Pagina INTERNA por ahora: no se indexa, no esta en el sitemap y no la
  // enlaza nada del sitio. Se llega solo con el enlace directo.
  robots: { index: false, follow: false },
  alternates: {
    canonical: '/como-funciona',
    languages: { es: '/como-funciona', en: '/en/how-it-works' },
  },
}

const contenido: ContenidoHowItWorks = {
  hero: {
    eyebrow: 'Cómo funciona',
    titulo: 'Lo que pasa entre el mensaje de tu cliente y',
    tituloGrad: 'la respuesta que recibe',
    sub: 'Tres diagramas y las preguntas que salen en cada reunión. Son casi siempre las mismas, así que las dejamos por escrito.',
  },
  indice: 'Secciones de esta página',
  bloques: [
    {
      id: 'recorrido',
      eyebrow: 'El recorrido',
      titulo: 'Por dónde pasa un mensaje',
      intro:
        'Casi todas las preguntas sobre seguridad son la misma por debajo: dónde termina la información de mi cliente. Este es el camino que hace un mensaje, de principio a fin.',
      diagrama: (
        <FlujoRecorrido
          t={{
            titulo: 'Recorrido de un mensaje desde el cliente hasta la respuesta',
            cliente: ['Tu cliente escribe', 'por WhatsApp'],
            entrega: ['WhatsApp entrega el mensaje', 'a tu número de negocio'],
            recibe: ['Tu agente lo recibe', 'y lo guarda en la conversación'],
            decision: ['¿El agente', 'está encendido?'],
            redacta: ['La IA lee el hilo reciente', 'y redacta la respuesta'],
            bandeja: ['Queda en la bandeja', 'y contesta tu equipo'],
            respuesta: ['Tu cliente recibe', 'la respuesta'],
            si: 'Sí',
            no: 'No',
          }}
        />
      ),
      puntos: [
        {
          titulo: 'El número es tuyo',
          texto:
            'Es tu número de WhatsApp Business y vive en tu cuenta de Meta. Si un día dejas de trabajar con nosotros, se queda contigo con todo su historial.',
        },
        {
          titulo: 'Verificamos que venga de WhatsApp',
          texto:
            'Cada mensaje trae una firma de Meta y se revisa antes de procesarlo. Si no viene de WhatsApp, se descarta.',
        },
        {
          titulo: 'La IA lee poco',
          texto:
            'Ve la conversación reciente, no el historial completo. Después de varias horas sin mensajes, el hilo empieza de cero.',
        },
        {
          titulo: 'Se puede apagar',
          texto:
            'Hay un interruptor para todo el negocio y otro para una conversación suelta. Apagado, los mensajes siguen llegando a la bandeja sin que nadie los conteste solo.',
        },
        {
          titulo: 'Si entra tu equipo, el agente se calla',
          texto:
            'Basta con que alguien escriba en el hilo. De ahí en adelante el agente ya no contesta en esa conversación.',
        },
        {
          titulo: 'Queda el registro',
          texto:
            'Cada mensaje se guarda con su hora, los de tu cliente y los del agente. Después se puede revisar qué fue lo que contestó.',
        },
      ],
    },
    {
      id: 'voz',
      eyebrow: 'La voz',
      titulo: 'Y cuando en vez de escribir, llaman',
      intro:
        'Arriba está el mensaje escrito. La llamada es el mismo agente con otra puerta de entrada: escucha, entiende y contesta hablando, y cuando no le da, pasa la llamada a una persona sin cortarla.',
      diagrama: (
        <FlujoVoz
          t={{
            titulo: 'Recorrido de una llamada, desde que entra hasta que se cuelga',
            cliente: ['Tu cliente llama', 'al número de siempre'],
            entra: ['La llamada entra', 'a tu línea de negocio'],
            escucha: ['El agente escucha y convierte', 'en texto lo que oye, mientras habla'],
            entiende: ['La IA entiende el pedido', 'y consulta lo que le falte'],
            decision: ['¿Lo puede', 'resolver?'],
            contesta: ['Contesta hablando', 'y deja la cita puesta'],
            transfiere: ['Pasa la llamada', 'a tu equipo'],
            cierre: ['Al colgar quedan la grabación,', 'la transcripción y el resumen'],
            si: 'Sí',
            no: 'No',
          }}
        />
      ),
      puntos: [
        {
          titulo: 'El número no cambia',
          texto:
            'Se desvía el que ya usás. Tu cliente marca lo mismo de siempre y del otro lado atiende el agente.',
        },
        {
          titulo: 'Se le puede interrumpir',
          texto:
            'No espera a que termines la frase para empezar a entender. Si le hablás encima, se calla y escucha, como una persona.',
        },
        {
          titulo: 'Transfiere sin cortar',
          texto:
            'Si tu cliente pide hablar con alguien, o el pedido se sale de lo que sabe hacer, la llamada pasa a tu equipo en la misma línea.',
        },
        {
          titulo: 'Agenda mientras habla',
          texto:
            'Consulta la disponibilidad y deja la cita puesta durante la llamada, sin que nadie tenga que cargarla después.',
        },
        {
          titulo: 'Queda todo grabado',
          texto:
            'Al colgar quedan el audio, la transcripción y un resumen de qué pidió. Tu equipo retoma sin volver a preguntar lo mismo.',
        },
        {
          titulo: 'Se apaga igual que el chat',
          texto:
            'Mismo interruptor. Apagado, las llamadas entran directo a tu equipo y nadie las contesta solo.',
        },
      ],
    },
    {
      id: 'seguridad',
      eyebrow: 'Seguridad',
      titulo: 'Quién pone cada capa',
      intro:
        'La pregunta que más nos hacen es cuál es nuestro firewall. No tenemos uno propio. Un mensaje pasa por tres puertas antes de llegar a tu agente y solo la última es nuestra.',
      diagrama: (
        <FlujoSeguridad
          t={{
            titulo: 'Capas por las que pasa una petición antes de llegar al agente',
            internet: ['Un mensaje que entra desde internet'],
            meta: [
              'Usamos la API oficial de WhatsApp, no un atajo:',
              'el mensaje viaja cifrado por la red de Meta y tu',
              'número no queda en riesgo de que lo bloqueen',
            ],
            metaPie: 'Lo pone Meta',
            plataforma: [
              'Firewall, certificado y parches del servidor,',
              'atendidos por gente dedicada a eso a toda hora.',
              'Filtra el ataque antes de que llegue a tu agente',
            ],
            plataformaPie: 'Lo pone la plataforma',
            nosotros: [
              'Contraseña y segundo factor para entrar al panel.',
              'Las llaves de tus integraciones nunca viven en el',
              'código. Tus datos, separados de los de otro cliente',
            ],
            nosotrosPie: 'Esto lo hacemos nosotros',
            destino: ['Tu agente y tus conversaciones'],
            nota: [
              '¿Cuál es su firewall? Este de aquí.',
              'No escribimos uno propio, y es a propósito:',
              'preferimos el de quien tiene un equipo',
              'cuidándolo día y noche. Nuestro trabajo',
              'empieza en la capa de abajo.',
            ],
          }}
        />
      ),
      puntos: [
        {
          titulo: 'Por qué no montamos el nuestro',
          texto:
            'Una oficina en un edificio corporativo no pone su propio guardia en la entrada del edificio. Mantener un firewall es un trabajo de tiempo completo y hay gente que se dedica solo a eso, así que usamos el suyo.',
        },
        {
          titulo: 'De qué nos encargamos',
          texto:
            'Quién tiene acceso a qué, que las llaves de las integraciones no queden escritas en el código, y que un cliente no pueda alcanzar los datos de otro.',
        },
        {
          titulo: 'Un cliente no alcanza lo de otro',
          texto:
            'La regla vive en la base de datos y no en la pantalla. Una consulta que pida datos de otro negocio vuelve vacía.',
        },
        {
          titulo: 'Segundo factor',
          texto:
            'El panel puede pedir un código de una app de autenticación además de la contraseña. Con eso, una contraseña filtrada no alcanza para entrar.',
        },
        {
          titulo: 'Qué guardamos',
          texto:
            'Las conversaciones y los datos de contacto que el agente necesita para atender. Números de tarjeta no, y el agente tiene instrucción de frenar a quien intente dictárselos.',
        },
        {
          titulo: 'Lo que no tenemos',
          texto:
            'Certificaciones. Esto es cómo está construido, no un sello que alguien nos dio. Si tu área de tecnología necesita revisar algo puntual, preferimos una llamada con ellos.',
        },
      ],
    },
    {
      id: 'continuidad',
      eyebrow: 'Continuidad',
      titulo: 'Qué pasa si un proveedor de IA se cae',
      intro:
        'Los modelos de IA no son nuestros, los alquilamos, y a veces se caen. Por eso el agente no depende de uno solo: si el principal no contesta, pasa al siguiente.',
      diagrama: (
        <FlujoFallback
          t={{
            titulo: 'Cadena de respaldo entre proveedores de IA',
            entrada: ['Hay que contestar un mensaje'],
            principal: ['Proveedor principal', 'Anthropic · Claude'],
            respaldo1: ['Primer respaldo', 'Google · Gemini'],
            respaldo2: ['Segundo respaldo', 'OpenAI'],
            decision: ['¿Respondió', 'a tiempo?'],
            humano: ['Pasa a una persona', 'de tu equipo'],
            salida: ['Tu cliente recibe', 'la respuesta'],
            si: 'Sí',
            no: 'No',
          }}
        />
      ),
      puntos: [
        {
          titulo: 'Nadie tiene que estar despierto',
          texto:
            'Si el proveedor no responde a tiempo, el sistema pasa al siguiente por su cuenta, a la hora que sea.',
        },
        {
          titulo: 'Tres empresas distintas',
          texto:
            'Anthropic, Google y OpenAI, cada una con su propia infraestructura. Que las tres estén caídas a la vez ya sería otra clase de problema.',
        },
        {
          titulo: 'El guion no cambia',
          texto:
            'Las instrucciones de tu agente están en tu configuración, no en el proveedor. El respaldo contesta con el mismo tono y las mismas reglas.',
        },
        {
          titulo: 'Si ninguno responde',
          texto:
            'La conversación pasa a alguien de tu equipo en vez de quedarse muda.',
        },
        {
          titulo: 'WhatsApp no tiene respaldo',
          texto:
            'Si el que se cae es WhatsApp no hay a dónde ir, porque es el canal. Los mensajes entran cuando el servicio vuelve y ahí el agente los contesta.',
        },
        {
          titulo: 'Cuestan distinto entre sí',
          texto:
            'Cada proveedor tiene su tarifa, y un respaldo puede salir más caro por mensaje que el principal. Por eso es respaldo.',
        },
      ],
    },
  ],
  faq: {
    eyebrow: 'Preguntas',
    titulo: 'Lo que nos preguntan en la reunión',
    sub: 'Las mismas respuestas que damos en persona, por si te las preguntan a ti.',
    items: [
      {
        p: '¿Cuál es su firewall?',
        r: 'No tenemos uno propio. El sistema corre detrás del firewall de la plataforma donde está alojado, que tiene equipos dedicados a eso a tiempo completo. Montar el nuestro sería una capa más que mantener, hecha por gente cuyo oficio es otro. De ahí para adentro sí es cosa nuestra: permisos, llaves y qué datos se guardan.'
      },
      {
        p: '¿Ustedes pueden leer los mensajes de mis clientes?',
        r: 'Sí, igual que cualquier proveedor que opera tu bandeja. Para arreglar un problema en una conversación hay que poder verla. En la práctica entramos cuando nos lo pides o cuando hay una falla que atender. Si prefieres acotarlo, se pone en el contrato.'
      },
      {
        p: '¿Los mensajes van cifrados de extremo a extremo?',
        r: 'Hasta Meta sí. De ahí en adelante conviene ser exacto, porque es donde muchos prometen de más. Entre dos personas, WhatsApp cifra de un teléfono al otro. Cuando alguien le escribe a un negocio por la API oficial, el mensaje viaja cifrado hasta Meta y Meta lo descifra para poder entregarlo. Está en su documentación. Tiene que ser así, porque si nadie pudiera leerlo el negocio no podría contestar. Lo que sí: va cifrado en el camino, no pasa por un intermediario no oficial, y Meta lo guarda 30 días como máximo.'
      },
      {
        p: '¿La IA se entrena con mis conversaciones?',
        r: 'No las usamos para entrenar nada. Los modelos se consumen por sus interfaces para empresas, no por los productos de consumo que se usan en el navegador, que es donde están las políticas que suelen preocupar.'
      },
      {
        p: '¿El agente puede inventar cosas?',
        r: 'Puede, y es el riesgo real de esta tecnología. No se arregla pidiéndole que se porte bien, sino quitándole la oportunidad: los horarios los consulta contra tu agenda en vez de proponerlos de memoria, y varias respuestas fijas ni pasan por el modelo. Donde el dato importa, la instrucción es decir que lo confirma una persona.'
      },
      {
        p: '¿Qué pasa si el agente no sabe algo?',
        r: 'Lo dice y pasa la conversación a tu equipo. Un agente que improvisa te hace perder al cliente y encima te enteras tarde.'
      },
      {
        p: '¿Se puede quedar conversando para siempre con alguien?',
        r: 'No, cada conversación tiene un tope de mensajes. Al llegar, el agente cierra y avisa que sigue una persona. Eso le pone techo a lo que puede costar un solo hilo.'
      },
      {
        p: '¿Puedo apagarlo si algo sale mal?',
        r: 'Sí, y sin llamarnos. Un interruptor para todo el negocio y otro para una conversación puntual. Apagado, los mensajes siguen entrando a la bandeja.'
      },
      {
        p: 'Si dejamos de trabajar con ustedes, ¿qué pasa con mi información?',
        r: 'El número es tuyo y está en tu cuenta de Meta, con su historial. Los contactos y las conversaciones del panel te los entregamos exportados.'
      },
      {
        p: '¿Me pueden hackear por tener un agente conectado?',
        r: 'Lo que se agrega es tu número de WhatsApp, que ya estaba expuesto porque el punto es que te escriban. El cuidado va en que el agente no haga lo que no debe: lo que llega se trata como conversación de un cliente y nunca como una orden, aunque el mensaje diga "ignora tus instrucciones" o lo traiga escrito dentro de una imagen.',
      },
    ],
  },
  cierre: {
    titulo: '¿Quedó algo sin responder?',
    texto:
      'Si tu equipo de tecnología tiene una pregunta que no está aquí, la contestamos. Y si la respuesta es que no lo hacemos, también.',
    cta: 'Agenda una demo',
  },
}

export default function Page() {
  return (
    <HowItWorksPage
      lang="es"
      c={contenido}
      leyenda={{
        cliente: 'Tu cliente y su canal',
        nuestro: 'Lo que hace tu agente',
        tercero: 'Piezas de terceros',
        persona: 'Entra una persona',
      }}
    />
  )
}
