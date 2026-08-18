import type { Metadata } from 'next'
import HowItWorksPage, { type ContenidoHowItWorks } from '@/components/howitworks/HowItWorksPage'
import {
  FlujoRecorrido,
  FlujoSeguridad,
  FlujoFallback,
} from '@/components/howitworks/Flujogramas'

export const metadata: Metadata = {
  title: 'Cómo funciona',
  description:
    'El recorrido de un mensaje, quién pone cada capa de seguridad y qué pasa cuando un proveedor de IA deja de responder. Explicado con flujogramas.',
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
    sub: 'Sin metáforas de nube ni palabras infladas. Tres diagramas que puedes seguir con el dedo, y las respuestas a lo que casi siempre nos preguntan en la reunión.',
  },
  indice: 'Secciones de esta página',
  bloques: [
    {
      id: 'recorrido',
      eyebrow: 'El recorrido',
      titulo: 'Por dónde pasa un mensaje',
      intro:
        'Casi todas las preguntas de seguridad son, en el fondo, la misma: ¿por dónde anda la información de mi cliente? Este es el camino completo, y todo lo demás en esta página se cuelga de aquí.',
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
          titulo: 'El número sigue siendo tuyo',
          texto:
            'Es tu número de WhatsApp Business, conectado a tu cuenta de Meta. Si mañana dejas de trabajar con nosotros, el número y su historial se quedan contigo.',
        },
        {
          titulo: 'Nada entra sin firma',
          texto:
            'Cada mensaje que llega trae una firma de Meta que se verifica antes de tocarlo. Un mensaje que no venga de WhatsApp se rechaza sin procesarse.',
        },
        {
          titulo: 'La IA no ve todo el historial',
          texto:
            'Solo lee la conversación reciente, no dos años de mensajes. Después de varias horas de silencio, el hilo arranca en limpio otra vez.',
        },
        {
          titulo: 'El interruptor lo tienes tú',
          texto:
            'Puedes apagar la IA para todo el negocio o para una sola conversación. Cuando está apagada, el mensaje entra a la bandeja y no se contesta solo.',
        },
        {
          titulo: 'Una persona puede entrar cuando quiera',
          texto:
            'Si alguien de tu equipo escribe en el hilo, el agente se calla y deja de responder ahí. No compiten por la misma conversación.',
        },
        {
          titulo: 'Todo queda escrito',
          texto:
            'Cada mensaje, el de tu cliente y el del agente, queda en la conversación con su hora. Lo que contestó el agente se puede leer después.',
        },
      ],
    },
    {
      id: 'seguridad',
      eyebrow: 'Seguridad',
      titulo: 'Quién pone cada capa',
      intro:
        'Aquí va la respuesta corta a la pregunta que más nos hacen: no operamos un firewall propio. Un mensaje atraviesa tres puertas antes de llegar a tu agente, y la del perímetro no la ponemos nosotros.',
      diagrama: (
        <FlujoSeguridad
          t={{
            titulo: 'Capas por las que pasa una petición antes de llegar al agente',
            internet: ['Una petición desde internet'],
            meta: ['Cifrado y perímetro', 'de WhatsApp'],
            metaPie: 'Lo opera Meta',
            plataforma: ['Firewall, certificados', 'y parches del servidor'],
            plataformaPie: 'Lo opera la plataforma',
            nosotros: ['Quién puede entrar, dónde', 'viven las llaves, qué se guarda'],
            nosotrosPie: 'Esto sí es nuestro',
            destino: ['Tu agente y tus conversaciones'],
            nota: [
              '¿Cuál es su firewall? Este.',
              'Y no lo operamos nosotros: viene de la',
              'plataforma, con gente dedicada a eso',
              'las 24 horas.',
            ],
          }}
        />
      ),
      puntos: [
        {
          titulo: 'Por qué no tenemos firewall propio',
          texto:
            'Por la misma razón que una oficina en un edificio corporativo no contrata su propio guardia para la entrada del edificio. Escribir y mantener un firewall es un oficio de tiempo completo. Preferimos usar el de quien vive de eso.',
        },
        {
          titulo: 'Qué sí hacemos nosotros',
          texto:
            'Lo que nadie puede hacer por nosotros: quién tiene acceso a qué, que las llaves de las integraciones no vivan en el código, y que cada cliente solo pueda ver lo suyo.',
        },
        {
          titulo: 'Los datos de cada cliente están separados',
          texto:
            'La base de datos aplica la separación por cliente, no la pantalla. Aunque alguien lograra pedir datos de otro negocio, la consulta vuelve vacía.',
        },
        {
          titulo: 'Segundo factor en el panel',
          texto:
            'El acceso al panel puede pedir un código de una app de autenticación, además de la contraseña. Una contraseña filtrada por sí sola no abre nada.',
        },
        {
          titulo: 'Guardamos lo mínimo',
          texto:
            'Las conversaciones y los datos de contacto que el agente necesita para atender. No pedimos ni almacenamos números de tarjeta, y el agente tiene instrucción de cortar a quien intente dictárselos.',
        },
        {
          titulo: 'Lo que esto no es',
          texto:
            'No es una certificación. Es cómo está construido. Si tu área de tecnología necesita revisar algo en concreto, preferimos sentarnos con ellos antes que mandarles un sello.',
        },
      ],
    },
    {
      id: 'continuidad',
      eyebrow: 'Continuidad',
      titulo: 'Qué pasa si un proveedor de IA se cae',
      intro:
        'Los modelos de IA no son nuestros: los alquilamos, y a veces se caen. Por eso el agente no depende de uno solo. Si el principal no contesta, pasa al siguiente sin que tu cliente se entere.',
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
          titulo: 'El cambio no lo decide una persona',
          texto:
            'Nadie tiene que despertarse a las tres de la mañana a mover algo. Si el proveedor no responde a tiempo, el sistema toma el siguiente por su cuenta.',
        },
        {
          titulo: 'Tres proveedores, no uno',
          texto:
            'Anthropic, Google y OpenAI. Son empresas distintas, con infraestructura distinta. Que las tres estén caídas al mismo tiempo es otra clase de problema.',
        },
        {
          titulo: 'El guion es el mismo',
          texto:
            'Las instrucciones de tu agente no viven en el proveedor, viven en tu configuración. El respaldo contesta con el mismo tono y las mismas reglas.',
        },
        {
          titulo: 'Si ninguno responde, no te deja colgado',
          texto:
            'La conversación pasa a una persona de tu equipo en vez de quedarse en silencio. Un cliente esperando sin respuesta es peor que un cliente atendido por alguien.',
        },
        {
          titulo: 'Esto no cubre a WhatsApp',
          texto:
            'Si el que se cae es WhatsApp, no hay respaldo posible: es el canal. Los mensajes se entregan cuando el servicio vuelve, y ahí el agente los contesta.',
        },
        {
          titulo: 'Cuánto cuesta cambiar',
          texto:
            'Los proveedores cobran distinto entre sí. Un respaldo puede costar más por mensaje que el principal, y por eso es respaldo y no el de siempre.',
        },
      ],
    },
  ],
  faq: {
    eyebrow: 'Preguntas',
    titulo: 'Lo que nos preguntan en la reunión',
    sub: 'Las mismas respuestas que damos en persona, para que las tengas por escrito.',
    items: [
      {
        p: '¿Cuál es su firewall?',
        r: 'No tenemos uno propio, y es a propósito. El sistema corre detrás del firewall de la plataforma donde está alojado, que tiene equipos dedicados a eso a tiempo completo. Montar y mantener el nuestro sería peor: sería una capa más para equivocarnos, hecha por gente cuyo oficio es otro. Nuestro trabajo empieza donde termina el de ellos: permisos, llaves y qué datos se guardan.',
      },
      {
        p: '¿Ustedes pueden leer los mensajes de mis clientes?',
        r: 'Técnicamente sí, igual que cualquier proveedor que opera tu bandeja: hay que poder ver una conversación para arreglar un problema. En la práctica solo entramos cuando nos lo pides o cuando hay una falla que atender. Si eso no te acomoda, se puede acordar por contrato.',
      },
      {
        p: '¿La IA se entrena con mis conversaciones?',
        r: 'Nosotros no usamos tus conversaciones para entrenar nada. Los modelos que usamos se consumen por sus interfaces para empresas, no por los productos de consumo que la gente usa en el navegador, que es donde suelen estar las políticas que preocupan a la gente.',
      },
      {
        p: '¿El agente puede inventar cosas?',
        r: 'Es el riesgo real de esta tecnología y no se resuelve pidiéndole que se porte bien. Se resuelve quitándole la oportunidad: los horarios disponibles los consulta contra tu agenda en vez de proponerlos de memoria, y ciertas respuestas fijas ni siquiera pasan por el modelo. Aun así, si el negocio depende de un dato, la instrucción es decir que lo confirma una persona.',
      },
      {
        p: '¿Qué pasa si el agente no sabe algo?',
        r: 'Lo dice y pasa la conversación a tu equipo. Preferimos un agente que admita que no sabe antes que uno que improvise, porque el segundo te hace perder al cliente y encima te enteras tarde.',
      },
      {
        p: '¿Se puede quedar conversando para siempre con alguien?',
        r: 'No. Cada conversación tiene un tope de mensajes. Al llegar, el agente cierra con cortesía y avisa que sigue una persona. Eso pone un techo a lo que puede costar un solo hilo y evita el ciclo eterno con alguien que solo está jugando.',
      },
      {
        p: '¿Puedo apagarlo si algo sale mal?',
        r: 'Sí, y sin llamarnos. Hay un interruptor para todo el negocio y otro para una conversación puntual. Cuando está apagado los mensajes siguen llegando a la bandeja, simplemente no se contestan solos.',
      },
      {
        p: 'Si dejamos de trabajar con ustedes, ¿qué pasa con mi información?',
        r: 'El número de WhatsApp es tuyo y vive en tu cuenta de Meta, así que el historial se queda ahí. Los contactos y las conversaciones del panel te los entregamos exportados. No hay nada que quede secuestrado de nuestro lado.',
      },
      {
        p: '¿Me pueden hackear por tener un agente conectado?',
        r: 'La superficie que se agrega es tu número de WhatsApp, que ya estaba expuesto porque el punto es que la gente te escriba. Lo que hay que cuidar es que el agente no haga cosas que no debe: por eso lo que llega se trata como conversación de un cliente y nunca como una orden, aunque el mensaje diga "ignora tus instrucciones" o lo traiga escrito dentro de una imagen.',
      },
    ],
  },
  cierre: {
    titulo: '¿Quedó algo sin responder?',
    texto:
      'Si tu equipo de tecnología tiene una pregunta que no está aquí, la contestamos de frente. Y si la respuesta es que algo no lo hacemos, también lo vas a escuchar.',
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
