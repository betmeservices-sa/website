// ── Contenido bilingüe (ES por defecto, EN). Sin cifras inventadas:
//    métricas etiquetadas como ilustrativas y precios "a medida". ──

export type Lang = 'es' | 'en'

const es = {
    nav: {
      links: [
        { label: 'Omnicanal', href: '#omnicanal' },
        { label: 'Sofía', href: '#sofia' },
        { label: 'Planes', href: '#planes' },
        { label: 'Industrias', href: '#industrias' },
        { label: 'Pruébala', href: '#demos' },
      ],
      cta: 'Agenda una demo',
    },

    hero: {
      badge: 'WhatsApp · Instagram · Facebook · Llamadas',
      titleTop: 'Todos tus canales.',
      titleGrad: 'Un solo agente.',
      sub: 'Sofía contesta en segundos, a la hora que sea. Califica al cliente, agenda la cita y deja el lead en tu CRM. Tu equipo entra cuando hay que cerrar.',
      cta1: 'Llama a Sofía',
      cta2: 'Pruébala por WhatsApp',
      waMsg: 'Hola, quiero probar a Sofía.',
      note: 'Ningún lead se queda sin respuesta.',
      stats: [
        { value: '24/7', label: 'Todos los días del año' },
        { value: '<1 min', label: 'Primera respuesta' },
        { value: '∞', label: 'Conversaciones a la vez' },
      ],
    },

    logos: {
      label: 'Construido sobre tecnología de punta',
      items: ['Vapi', 'WhatsApp Business', 'Claude', 'OpenAI', 'ElevenLabs', 'Twilio', 'n8n', 'GoHighLevel'],
    },

    // Banda omnicanal — mismo recorrido que la tarjeta de presentación:
    // canales → orbe (el agente) → ventas. Los iconos son los mismos SVG.
    omni: {
      label: 'Omnicanalidad',
      titleTop: 'El lead entra por cualquier canal.',
      titleGrad: 'Sofía lo recibe y lo clasifica.',
      sub: 'WhatsApp, Instagram, Facebook, llamadas y tu sitio caen en una sola bandeja. Sofía responde, califica y abre el ticket.',
      channels: ['WhatsApp', 'Llamadas', 'Correo', 'Instagram', 'Facebook'],
      hub: 'Sofía',
      out: 'Tu CRM',
      caption: 'Tu vendedor recibe el lead calificado, con todo el contexto. No vuelve a preguntar nada.',
      unifiedTitle: 'Entre por donde entre, es el mismo contacto.',
      cardTitle: 'Un solo contacto',
      cardSub: 'Un solo historial',
      unifiedSub: 'Te escribe por WhatsApp, te llama el martes y te comenta una foto en Facebook. Para Sofía es la misma persona: un solo contacto, un solo historial. Nadie empieza de cero.',
      crmLabel: 'No te cambiamos el sistema',
      crmSub: 'Tu CRM sigue siendo el oficial. Lo que Sofía conversa y califica se escribe ahí, y lo que ya está ahí ella lo sabe.',
      // SOLO integraciones hechas y probadas. Si no se ha conectado de
      // verdad, no va en esta lista: prometer una integración que no existe
      // es el peor error posible en una web B2B.
      crmsLabel: 'Ya los hemos conectado',
      crms: ['Salesforce', 'HubSpot', 'Shopify', 'Cloudbeds'],
      crmNote: '¿Usas otro? Dinos cuál y te decimos si lo conectamos.',
    },

    sofia: {
      label: 'Qué hace Sofía',
      titleTop: 'Sofía te brinda cobertura',
      titleGrad: 'de tu negocio 24/7.',
      sub: 'Responde, informa, califica, agenda y cierra. Sin cola que se forme ni conversación que se enfríe.',
      meta: [
        { k: 'Canales', v: 'WhatsApp, Instagram, Facebook y llamadas' },
        { k: 'Idiomas', v: 'Español e inglés' },
        { k: 'Horario', v: '24 horas, todos los días' },
      ],
      doesLabel: 'Lo que hace',
      does: [
        { t: 'Responde al instante', d: 'WhatsApp, Instagram, Facebook y llamadas en segundos. Fines de semana y madrugadas incluidos.' },
        { t: 'Informa como un vendedor', d: 'Precios, versiones, disponibilidad y formas de pago, leídos de la información que tú compartas.' },
        { t: 'Califica y agenda', d: 'Pregunta presupuesto, forma de pago y fecha de compra. Agenda la cita en tu calendario.' },
        { t: 'Cierra la venta', d: 'Con el cobro integrado, toma el pedido y confirma el pago en la misma conversación. No hay que esperar a un vendedor.' },
        { t: 'No suelta el lead', d: 'Reactiva a los fríos, manda recordatorios y abre el ticket al vendedor que corresponde.' },
      ],
      limitsLabel: 'Lo que no hace',
      limitsNote: 'Los límites los defines tú. Estos son los que recomendamos:',
      limits: [
        'No inventa precios ni promociones. Solo usa lo que tú cargas.',
        'No aprueba descuentos ni condiciones especiales por su cuenta.',
        'No da asesoría legal, médica ni financiera.',
        'Si el cliente pregunta, dice que es IA.',
      ],
      escalaLabel: 'Cuándo entra tu equipo',
      escala: 'Cuando el cliente está listo o pide hablar con una persona, Sofía pasa la posta con todo el contexto. Tu vendedor no vuelve a preguntar nada.',
      cta: 'Llama a Sofía y pregúntale',
    },

    voice: {
      label: 'Demo · Voz',
      title: 'Escúchalo por ti mismo',
      sub: 'Pulsa para simular una llamada. Así suena y responde tu agente de voz.',
      idle: 'Toca para llamar',
      active: 'En llamada...',
      ended: 'Llamada finalizada',
      restart: 'Volver a llamar',
      caption: 'Demostración visual. Tu agente real se entrena con la información de tu negocio.',
      transcript: [
        { who: 'agent', text: 'Gracias por llamar a MiAgentIA, soy Sofía. ¿En qué te ayudo?' },
        { who: 'user', text: 'Hola, quiero información y agendar una demo.' },
        { who: 'agent', text: 'Con gusto. Tengo espacio mañana a las 10 o el jueves a las 3. ¿Cuál te queda mejor?' },
        { who: 'user', text: 'Mañana a las 10 está perfecto.' },
        { who: 'agent', text: 'Listo, agendé tu demo mañana a las 10:00 am. Te envío la confirmación por WhatsApp ahora mismo.' },
      ],
    },

    chat: {
      label: 'Demo · WhatsApp',
      title: 'Conversaciones que convierten',
      sub: 'Mira cómo el agente atiende, califica y agenda en tiempo real.',
      contact: 'MiAgentIA',
      status: 'en línea',
      typing: 'escribiendo...',
      placeholder: 'Escribe un mensaje',
      replay: 'Repetir conversación',
      thread: [
        { who: 'in',  text: 'Hola, vi su anuncio. ¿Cómo funciona esto? 👀' },
        { who: 'out', text: '¡Hola! 👋 Somos MiAgentIA. Creamos agentes de IA que atienden, califican y agendan por WhatsApp y por llamada, 24/7. ¿Para qué tipo de negocio lo necesitas?' },
        { who: 'in',  text: 'Tengo una clínica dental.' },
        { who: 'out', text: 'Perfecto. Nuestro agente responde pacientes al instante, agenda citas en tu calendario y les recuerda para bajar las ausencias. ¿Te muestro una demo esta semana?' },
        { who: 'in',  text: 'Sí, por favor 🙌' },
        { who: 'out', text: 'Genial ✨ Te reservé el jueves 3:00 pm. En un momento te llega la confirmación. ¿Me compartes tu nombre?' },
      ],
    },

    how: {
      label: 'Cómo funciona',
      title: 'De la idea al agente en vivo',
      sub: 'Un proceso simple para poner tu IA a trabajar rápido.',
      steps: [
        { title: 'Diseñamos tu agente', desc: 'Definimos su personalidad, guion y objetivos según tu negocio.' },
        { title: 'Lo entrenamos', desc: 'Le cargamos tu información, preguntas frecuentes y flujos de venta.' },
        { title: 'Lo conectamos', desc: 'Voz, WhatsApp, calendario y CRM integrados en un solo sistema.' },
        { title: 'Atiende 24/7', desc: 'Tu agente empieza a responder, calificar y agendar desde el día uno.' },
      ],
    },

    industries: {
      label: 'Para quién',
      title: 'Hecho para negocios que viven de responder rápido',
      sub: 'Si un cliente sin respuesta es un cliente perdido, esto es para ti.',
      items: [
        { icon: 'tooth', name: 'Clínicas y salud', desc: 'Agenda citas y recuerda a los pacientes.' },
        { icon: 'car', name: 'Automotriz', desc: 'Atiende cotizaciones y prueba de manejo.' },
        { icon: 'home', name: 'Inmobiliaria', desc: 'Califica compradores y coordina visitas.' },
        // Dos compradores distintos, no uno: la tienda con checkout propio y
        // quien vende por DM sin carrito. En la región el segundo rara vez se
        // llama "e-commerce" a sí mismo, así que buscarlo por ese nombre falla.
        { icon: 'cart', name: 'Tiendas en línea', desc: 'Resuelve dudas, recupera carritos y confirma pedidos.' },
        { icon: 'bag', name: 'Retail online', desc: 'Catálogo, tallas y disponibilidad por WhatsApp e Instagram. Cierra la venta en el chat.' },
        { icon: 'fork', name: 'Restaurantes', desc: 'Toma reservas y pedidos sin filas.' },
        { icon: 'bed', name: 'Hoteles y hospedaje', desc: 'Agenda y confirma reservas, cobra el anticipo y responde antes del check-in.' },
        { icon: 'briefcase', name: 'Servicios y agencias', desc: 'Filtra leads y llena tu calendario.' },
      ],
    },

    plans: {
      label: 'Planes',
      title: 'Cuatro paquetes. El mismo agente.',
      sub: 'Todos incluyen la bandeja unificada y el agente completo. Lo que cambia es cuánto entiende y hasta dónde automatiza.',
      tiers: ['Starter', 'Growth', 'Advanced', 'Enterprise'],
      groups: [
        {
          name: 'Qué entiende Sofía',
          rows: [
            { f: 'Texto, hasta 15 respuestas por conversación', v: [true, true, true, true] },
            { f: 'Escucha notas de voz (3 de hasta 20 segundos)', v: [false, true, true, true] },
            { f: 'Lee las fotos que le mandan (hasta 3)', v: [false, false, true, true] },
          ],
        },
        {
          name: 'Canales y bandeja',
          rows: [
            { f: 'Bandeja unificada: WhatsApp, Instagram y Facebook', v: [true, true, true, true] },
            { f: 'Modo IA activable y pausable por conversación', v: [true, true, true, true] },
            { f: 'Transferencia a una persona por reglas', v: [true, true, true, true] },
            { f: 'Agentes personalizables por caso de uso', v: [true, true, true, true] },
          ],
        },
        {
          name: 'Campañas y seguimiento',
          rows: [
            { f: '5 campañas y promociones incluidas', v: [true, true, true, true] },
            { f: 'Reactivación de contactos inactivos a las 24 h', v: [true, true, true, true] },
            { f: 'Gestión de plantillas de Meta', v: [true, true, true, true] },
            { f: 'Recordatorios y confirmaciones automáticas', v: [false, true, true, true] },
            { f: 'Tarjetas de cliente frecuente', v: [false, true, true, true] },
            { f: 'Programa de referidos automático', v: [false, false, true, true] },
            { f: 'Reactivación personalizada', v: [false, false, 'Hasta 3 meses', 'Hasta 6 meses'] },
            { f: 'Reseñas y reputación automatizada', v: [false, false, false, true] },
          ],
        },
        {
          name: 'Tu operación',
          rows: [
            { f: 'Calendario de disponibilidad', v: [true, true, true, true] },
            { f: 'Chat interno por canal y departamento', v: [true, true, true, true] },
            { f: 'Dashboard de métricas del negocio', v: [true, true, true, true] },
            { f: 'Usuarios incluidos', v: ['5', '10', '10', '30'] },
          ],
        },
      ],
      cta: 'Consultar precio',
      note: 'El precio se cotiza por negocio, según tu volumen de conversaciones. Los mensajes que Meta cobra por WhatsApp se facturan directo a tu cuenta, no a través de nosotros.',
    },

    faq: {
      label: 'Preguntas',
      title: 'Lo que todos preguntan',
      items: [
        { q: '¿El agente suena robótico?', a: 'No. Usamos voces naturales y guiones conversacionales. La mayoría de las personas no nota que habla con una IA.' },
        { q: '¿Se conecta con mi WhatsApp actual?', a: 'Sí. Integramos con WhatsApp Business para que el agente responda desde tu número, con el tono de tu marca.' },
        { q: '¿Cuánto tarda la implementación?', a: 'Normalmente días, no meses. Depende de la complejidad de tus flujos e integraciones.' },
        { q: '¿Puede transferir a un humano?', a: 'Claro. El agente resuelve lo repetitivo y escala a tu equipo cuando la conversación lo amerita.' },
        { q: '¿En qué idiomas atiende?', a: 'Español, inglés y más. Puede detectar el idioma del cliente y responder en el mismo.' },
        { q: '¿Necesito conocimientos técnicos?', a: 'No. Nosotros diseñamos, entrenamos y conectamos todo. Tú solo recibes los resultados.' },
      ],
    },

    finalCta: {
      label: 'Empecemos',
      title: 'Tu próximo cliente está escribiendo ahora mismo',
      sub: 'Deja que un agente de IA lo atienda al instante mientras tú te enfocas en crecer.',
      cta: 'Agenda tu demo gratis',
      wa: 'Escríbenos por WhatsApp',
      or: 'o',
    },

    footer: {
      tagline: 'Soluciones inteligentes. Agentes de IA de voz y WhatsApp que trabajan por tu negocio, 24/7.',
      cols: [
        {
          title: 'Producto',
          links: [
            { label: 'Omnicanal', href: '#omnicanal' },
            { label: 'Sofía', href: '#sofia' },
            { label: 'Planes', href: '#planes' },
          ],
        },
        {
          title: 'Empresa',
          links: [
            { label: 'Industrias', href: '#industrias' },
            { label: 'Cómo arrancamos', href: '#planes' },
            { label: 'Preguntas', href: '#preguntas' },
            { label: 'Contacto', href: '#empezar' },
            { label: 'Política de Privacidad', href: '/privacidad' },
            { label: 'Condiciones de Servicio', href: '/terminos' },
          ],
        },
      ],
      rights: 'Todos los derechos reservados.',
    },
}

// El diccionario ES define la forma; EN se valida contra ella.
export type Dict = typeof es

const en: Dict = {
    nav: {
      links: [
        { label: 'Omnichannel', href: '#omnicanal' },
        { label: 'Sofía', href: '#sofia' },
        { label: 'Plans', href: '#planes' },
        { label: 'Industries', href: '#industrias' },
        { label: 'Try her', href: '#demos' },
      ],
      cta: 'Book a demo',
    },

    hero: {
      badge: 'WhatsApp · Instagram · Facebook · Calls',
      titleTop: 'Every channel.',
      titleGrad: 'One agent.',
      sub: 'Sofía answers in seconds, at any hour. She qualifies the customer, books the appointment and drops the lead into your CRM. Your team steps in to close.',
      cta1: 'Call Sofía',
      cta2: 'Try her on WhatsApp',
      waMsg: 'Hi, I would like to try Sofía.',
      note: 'No lead goes unanswered.',
      stats: [
        { value: '24/7', label: 'Every day of the year' },
        { value: '<1 min', label: 'First response' },
        { value: '∞', label: 'Chats at once' },
      ],
    },

    logos: {
      label: 'Built on best-in-class technology',
      items: ['Vapi', 'WhatsApp Business', 'Claude', 'OpenAI', 'ElevenLabs', 'Twilio', 'n8n', 'GoHighLevel'],
    },

    omni: {
      label: 'Omnichannel',
      titleTop: 'The lead comes in on any channel.',
      titleGrad: 'Sofía takes it and sorts it.',
      sub: 'WhatsApp, Instagram, Facebook, calls and your website land in one inbox. Sofía answers, qualifies and opens the ticket.',
      channels: ['WhatsApp', 'Calls', 'Email', 'Instagram', 'Facebook'],
      hub: 'Sofía',
      out: 'Your CRM',
      caption: 'Your rep gets the qualified lead with the full context. They never ask twice.',
      unifiedTitle: 'Whichever door they come in, it is the same contact.',
      cardTitle: 'One contact',
      cardSub: 'One history',
      unifiedSub: 'They message on WhatsApp, call on Tuesday and comment on a photo on Facebook. To Sofía it is one person: one contact, one history. Nobody starts over.',
      crmLabel: 'We do not change your system',
      crmSub: 'Your CRM stays the official one. What Sofía talks through and qualifies is written there, and what is already there she knows.',
      crmsLabel: 'Already connected',
      crms: ['Salesforce', 'HubSpot', 'Shopify', 'Cloudbeds'],
      crmNote: 'Using another one? Tell us which and we will tell you if we connect it.',
    },

    sofia: {
      label: 'What Sofía does',
      titleTop: 'Sofía covers your business',
      titleGrad: '24/7.',
      sub: 'She answers, informs, qualifies, books and closes. No queue building, no conversation going cold.',
      meta: [
        { k: 'Channels', v: 'WhatsApp, Instagram, Facebook and calls' },
        { k: 'Languages', v: 'Spanish and English' },
        { k: 'Hours', v: '24 hours, every day' },
      ],
      doesLabel: 'What she does',
      does: [
        { t: 'Answers instantly', d: 'WhatsApp, Instagram, Facebook and calls in seconds. Weekends and small hours included.' },
        { t: 'Informs like a rep', d: 'Pricing, versions, availability and payment options, read from the information you share.' },
        { t: 'Qualifies and books', d: 'Asks budget, payment method and purchase date. Books the appointment in your calendar.' },
        { t: 'Closes the sale', d: 'With payments connected, she takes the order and confirms payment in the same conversation. No waiting for a rep.' },
        { t: 'Never drops the lead', d: 'Reactivates cold ones, sends reminders and opens the ticket for the right rep.' },
      ],
      limitsLabel: 'What she does not do',
      limitsNote: 'You set the limits. These are the ones we recommend:',
      limits: [
        'She does not invent prices or promotions. She only uses what you load.',
        'She does not approve discounts or special terms on her own.',
        'She does not give legal, medical or financial advice.',
        'If the customer asks, she says she is AI.',
      ],
      escalaLabel: 'When your team steps in',
      escala: 'When the customer is ready or asks for a person, Sofía hands off with the full context. Your rep never asks anything twice.',
      cta: 'Call Sofía and ask her yourself',
    },

    voice: {
      label: 'Demo · Voice',
      title: 'Hear it for yourself',
      sub: 'Tap to simulate a call. This is how your voice agent sounds and responds.',
      idle: 'Tap to call',
      active: 'On call...',
      ended: 'Call ended',
      restart: 'Call again',
      caption: 'Visual demo. Your real agent is trained on your business information.',
      transcript: [
        { who: 'agent', text: 'Thanks for calling MiAgentIA, this is Sofía. How can I help?' },
        { who: 'user', text: 'Hi, I want info and to book a demo.' },
        { who: 'agent', text: 'Happy to. I have tomorrow at 10 or Thursday at 3. Which works best?' },
        { who: 'user', text: 'Tomorrow at 10 is perfect.' },
        { who: 'agent', text: 'Done, I booked your demo tomorrow at 10:00 am. Sending the confirmation to your WhatsApp now.' },
      ],
    },

    chat: {
      label: 'Demo · WhatsApp',
      title: 'Conversations that convert',
      sub: 'See how the agent answers, qualifies and books in real time.',
      contact: 'MiAgentIA',
      status: 'online',
      typing: 'typing...',
      placeholder: 'Type a message',
      replay: 'Replay conversation',
      thread: [
        { who: 'in',  text: 'Hi, I saw your ad. How does this work? 👀' },
        { who: 'out', text: 'Hey! 👋 We are MiAgentIA. We build AI agents that answer, qualify and book over WhatsApp and calls, 24/7. What kind of business is it for?' },
        { who: 'in',  text: 'I run a dental clinic.' },
        { who: 'out', text: 'Perfect. Our agent replies to patients instantly, books appointments on your calendar and reminds them to reduce no-shows. Want to see a demo this week?' },
        { who: 'in',  text: 'Yes, please 🙌' },
        { who: 'out', text: 'Great ✨ I booked you Thursday 3:00 pm. Your confirmation is on the way. What is your name?' },
      ],
    },

    how: {
      label: 'How it works',
      title: 'From idea to a live agent',
      sub: 'A simple process to put your AI to work fast.',
      steps: [
        { title: 'We design your agent', desc: 'We define its personality, script and goals around your business.' },
        { title: 'We train it', desc: 'We load your information, FAQs and sales flows.' },
        { title: 'We connect it', desc: 'Voice, WhatsApp, calendar and CRM in one system.' },
        { title: 'It works 24/7', desc: 'Your agent starts answering, qualifying and booking from day one.' },
      ],
    },

    industries: {
      label: 'Who it is for',
      title: 'Built for businesses that live on fast replies',
      sub: 'If an unanswered customer is a lost customer, this is for you.',
      items: [
        { icon: 'tooth', name: 'Clinics & health', desc: 'Book appointments and remind patients.' },
        { icon: 'car', name: 'Automotive', desc: 'Handle quotes and test drives.' },
        { icon: 'home', name: 'Real estate', desc: 'Qualify buyers and schedule showings.' },
        { icon: 'cart', name: 'Online stores', desc: 'Answer questions, recover carts and confirm orders.' },
        { icon: 'bag', name: 'Online retail', desc: 'Catalogue, sizes and stock over WhatsApp and Instagram. Closes the sale in the chat.' },
        { icon: 'fork', name: 'Restaurants', desc: 'Take reservations and orders, no lines.' },
        { icon: 'bed', name: 'Hotels & lodging', desc: 'Book and confirm reservations, take the deposit and answer before check-in.' },
        { icon: 'briefcase', name: 'Services & agencies', desc: 'Filter leads and fill your calendar.' },
      ],
    },

    plans: {
      label: 'Plans',
      title: 'Four packages. The same agent.',
      sub: 'All of them include the unified inbox and the full agent. What changes is how much she understands and how far she automates.',
      tiers: ['Starter', 'Growth', 'Advanced', 'Enterprise'],
      groups: [
        {
          name: 'What Sofía understands',
          rows: [
            { f: 'Text, up to 15 replies per conversation', v: [true, true, true, true] },
            { f: 'Listens to voice notes (3 of up to 20 seconds)', v: [false, true, true, true] },
            { f: 'Reads the photos people send (up to 3)', v: [false, false, true, true] },
          ],
        },
        {
          name: 'Channels and inbox',
          rows: [
            { f: 'Unified inbox: WhatsApp, Instagram and Facebook', v: [true, true, true, true] },
            { f: 'AI mode you can switch on and off per conversation', v: [true, true, true, true] },
            { f: 'Hand-off to a person by rules', v: [true, true, true, true] },
            { f: 'Agents customizable per use case', v: [true, true, true, true] },
          ],
        },
        {
          name: 'Campaigns and follow-up',
          rows: [
            { f: '5 campaigns and promotions included', v: [true, true, true, true] },
            { f: 'Reactivation of inactive contacts at 24 h', v: [true, true, true, true] },
            { f: 'Meta template management', v: [true, true, true, true] },
            { f: 'Automatic reminders and confirmations', v: [false, true, true, true] },
            { f: 'Loyalty cards', v: [false, true, true, true] },
            { f: 'Automatic referral programme', v: [false, false, true, true] },
            { f: 'Custom reactivation', v: [false, false, 'Up to 3 months', 'Up to 6 months'] },
            { f: 'Automated reviews and reputation', v: [false, false, false, true] },
          ],
        },
        {
          name: 'Your operation',
          rows: [
            { f: 'Availability calendar', v: [true, true, true, true] },
            { f: 'Internal chat by channel and department', v: [true, true, true, true] },
            { f: 'Business metrics dashboard', v: [true, true, true, true] },
            { f: 'Users included', v: ['5', '10', '10', '30'] },
          ],
        },
      ],
      cta: 'Ask for pricing',
      note: 'Pricing is quoted per business, based on your conversation volume. The per-message fees Meta charges for WhatsApp are billed straight to your own account, not through us.',
    },

    faq: {
      label: 'FAQ',
      title: 'What everyone asks',
      items: [
        { q: 'Does the agent sound robotic?', a: 'No. We use natural voices and conversational scripts. Most people do not notice they are talking to an AI.' },
        { q: 'Does it connect to my current WhatsApp?', a: 'Yes. We integrate with WhatsApp Business so the agent replies from your number, in your brand voice.' },
        { q: 'How long does setup take?', a: 'Usually days, not months. It depends on the complexity of your flows and integrations.' },
        { q: 'Can it transfer to a human?', a: 'Absolutely. The agent handles the repetitive work and escalates to your team when the conversation calls for it.' },
        { q: 'What languages does it support?', a: 'Spanish, English and more. It can detect the customer language and reply in kind.' },
        { q: 'Do I need technical skills?', a: 'No. We design, train and connect everything. You just get the results.' },
      ],
    },

    finalCta: {
      label: 'Let us start',
      title: 'Your next customer is messaging right now',
      sub: 'Let an AI agent answer instantly while you focus on growing.',
      cta: 'Book your free demo',
      wa: 'Message us on WhatsApp',
      or: 'or',
    },

    footer: {
      tagline: 'Intelligent solutions. AI voice and WhatsApp agents that work for your business, 24/7.',
      cols: [
        {
          title: 'Product',
          links: [
            { label: 'Omnichannel', href: '#omnicanal' },
            { label: 'Sofía', href: '#sofia' },
            { label: 'Plans', href: '#planes' },
          ],
        },
        {
          title: 'Company',
          links: [
            { label: 'Industries', href: '#industrias' },
            { label: 'How we start', href: '#planes' },
            { label: 'FAQ', href: '#preguntas' },
            { label: 'Contact', href: '#empezar' },
            { label: 'Privacy Policy', href: '/en/privacy' },
            { label: 'Terms of Service', href: '/en/terms' },
          ],
        },
      ],
      rights: 'All rights reserved.',
    },
}

export const content: Record<Lang, Dict> = { es, en }
