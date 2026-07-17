// ── Contenido bilingüe (ES por defecto, EN). Sin cifras inventadas:
//    métricas etiquetadas como ilustrativas y precios "a medida". ──

export type Lang = 'es' | 'en'

const es = {
    nav: {
      links: [
        { label: 'Servicios', href: '#servicios' },
        { label: 'Demo Voz', href: '#voz' },
        { label: 'Demo Chat', href: '#chat' },
        { label: 'Industrias', href: '#industrias' },
      ],
      cta: 'Agenda una demo',
    },

    hero: {
      badge: 'Agentes de IA · Voz + WhatsApp',
      titleTop: 'Agentes de IA que',
      titleGrad: 'atienden, venden y agendan',
      titleBottom: 'por ti. 24 horas, 7 días.',
      sub: 'Contestan cada llamada y cada mensaje al instante, califican al cliente y llenan tu agenda. Sin recordatorios olvidados. Sin leads perdidos. Sin descanso.',
      cta1: 'Habla con el agente de voz',
      cta2: 'Prueba el chat de WhatsApp',
      note: 'Implementación en días, no en meses.',
      stats: [
        { value: '24/7', label: 'Siempre disponible' },
        { value: '<2s', label: 'Tiempo de respuesta' },
        { value: '∞', label: 'Conversaciones a la vez' },
      ],
    },

    logos: {
      label: 'Construido sobre tecnología de punta',
      items: ['Vapi', 'WhatsApp Business', 'Claude', 'OpenAI', 'ElevenLabs', 'Twilio', 'n8n', 'GoHighLevel'],
    },

    services: {
      label: 'Qué hacemos',
      title: 'Un equipo de IA que nunca duerme',
      sub: 'Automatizamos la primera línea de tu negocio con agentes que suenan y escriben como humanos.',
      items: [
        { icon: 'phone', title: 'Agente de voz', desc: 'Contesta llamadas entrantes y hace salientes con voz natural. Responde, califica y transfiere cuando hace falta.' },
        { icon: 'whatsapp', title: 'Chat de WhatsApp', desc: 'Atiende cada mensaje al segundo, en cualquier idioma, con el tono de tu marca.' },
        { icon: 'calendar', title: 'Citas', desc: 'Reserva citas directo en tu calendario y envía recordatorios para reducir ausencias.' },
        { icon: 'filter', title: 'Calificación de leads', desc: 'Hace las preguntas correctas y prioriza a los clientes listos para comprar.' },
        { icon: 'plug', title: 'Integración con tu CRM', desc: 'Se conecta con tu CRM, hoja de cálculo o herramientas para que todo quede registrado.' },
        { icon: 'globe', title: 'Soporte 24/7', desc: 'Resuelve dudas frecuentes y escala a un humano solo cuando de verdad importa.' },
      ],
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
        { who: 'agent', text: 'Gracias por llamar a MiAgentIA, soy Aria. ¿En qué te ayudo?' },
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

    hybrid: {
      label: 'IA + Humanos',
      titleTop: 'La IA no reemplaza a tu equipo.',
      titleGrad: 'Lo potencia.',
      sub: 'El modelo híbrido de MiAgentIA: la inteligencia artificial hace el trabajo pesado (atender, filtrar, calificar) y tus expertos humanos entran justo en el momento que más valor generan: el cierre.',
      steps: [
        { icon: 'bot', kicker: 'Lo hace la IA', title: 'Atiende y califica cada lead', desc: 'Día y noche, la IA responde llamadas y mensajes, hace las preguntas correctas y detecta quién está listo para comprar y quién solo está preguntando.' },
        { icon: 'calendar', kicker: '¿Lead calificado?', title: 'Agenda la cita automáticamente', desc: 'La IA reserva el espacio directo en el calendario de tu equipo, con recordatorios incluidos para que el cliente sí llegue.' },
        { icon: 'user', kicker: 'Entra tu experto', title: 'O transfiere la conversación en vivo', desc: 'Si el cliente está listo ahora, la IA pasa la conversación a uno de tus vendedores al instante, con todo el contexto ya capturado.' },
      ],
      closing: 'Trabajo en equipo entre IA y humanos: tus vendedores dejan de perseguir curiosos y hablan solo con gente lista para comprar.',
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
        { icon: 'cart', name: 'E-commerce', desc: 'Resuelve dudas y recupera carritos.' },
        { icon: 'fork', name: 'Restaurantes', desc: 'Toma reservas y pedidos sin filas.' },
        { icon: 'briefcase', name: 'Servicios y agencias', desc: 'Filtra leads y llena tu calendario.' },
      ],
    },

    results: {
      label: 'Impacto',
      title: 'Lo que cambia cuando nada se queda sin respuesta',
      sub: 'Rangos ilustrativos del potencial de la automatización con IA.',
      stats: [
        { value: 100, suffix: '%', label: 'de llamadas y mensajes atendidos' },
        { value: 24,  suffix: '/7', label: 'disponibilidad, sin turnos' },
        { value: 80,  suffix: '%', label: 'menos tareas repetitivas' },
        { value: 3,   suffix: 'x', label: 'más citas agendadas' },
      ],
      disclaimer: 'Cifras ilustrativas, no resultados garantizados. El desempeño depende de tu negocio y tu volumen.',
    },

    plans: {
      label: 'Planes',
      title: 'Empieza simple, escala sin límite',
      sub: 'Paquetes por capacidad. El precio final se cotiza a la medida de tu negocio.',
      tiers: [
        {
          name: 'Arranque',
          tagline: 'Un canal, listo para vender',
          features: ['1 agente (voz o chat)', 'Guion y personalidad a medida', 'Citas en tu calendario', 'Integración básica', 'Soporte por WhatsApp'],
          cta: 'Cotizar',
          featured: false,
        },
        {
          name: 'Crecimiento',
          tagline: 'Voz + WhatsApp trabajando juntos',
          features: ['Agente de voz y de chat', 'Calificación de leads avanzada', 'Integración con tu CRM', 'Recordatorios automáticos', 'Reportes de conversaciones', 'Soporte prioritario'],
          cta: 'Cotizar',
          featured: true,
        },
        {
          name: 'A medida',
          tagline: 'Operación completa con IA',
          features: ['Múltiples agentes y flujos', 'Llamadas salientes a escala', 'Integraciones personalizadas', 'Automatizaciones con n8n', 'Optimización continua', 'Acompañamiento dedicado'],
          cta: 'Hablar con ventas',
          featured: false,
        },
      ],
      note: 'Sin permanencia forzada. Cancelas cuando quieras.',
      popular: 'Más popular',
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
            { label: 'Servicios', href: '#servicios' },
            { label: 'Demo Voz', href: '#voz' },
            { label: 'Demo Chat', href: '#chat' },
          ],
        },
        {
          title: 'Empresa',
          links: [
            { label: 'Industrias', href: '#industrias' },
            { label: 'Cómo funciona', href: '#como-funciona' },
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
        { label: 'Services', href: '#servicios' },
        { label: 'Voice Demo', href: '#voz' },
        { label: 'Chat Demo', href: '#chat' },
        { label: 'Industries', href: '#industrias' },
      ],
      cta: 'Book a demo',
    },

    hero: {
      badge: 'AI Agents · Voice + WhatsApp',
      titleTop: 'AI agents that',
      titleGrad: 'answer, sell and book',
      titleBottom: 'for you. 24 hours, 7 days.',
      sub: 'They pick up every call and every message instantly, qualify the customer and fill your calendar. No missed follow-ups. No lost leads. No days off.',
      cta1: 'Talk to the voice agent',
      cta2: 'Try the WhatsApp chat',
      note: 'Live in days, not months.',
      stats: [
        { value: '24/7', label: 'Always on' },
        { value: '<2s', label: 'Response time' },
        { value: '∞', label: 'Chats at once' },
      ],
    },

    logos: {
      label: 'Built on best-in-class technology',
      items: ['Vapi', 'WhatsApp Business', 'Claude', 'OpenAI', 'ElevenLabs', 'Twilio', 'n8n', 'GoHighLevel'],
    },

    services: {
      label: 'What we do',
      title: 'An AI team that never sleeps',
      sub: 'We automate the front line of your business with agents that sound and write like humans.',
      items: [
        { icon: 'phone', title: 'Voice agent', desc: 'Answers inbound calls and makes outbound ones with a natural voice. Responds, qualifies and transfers when needed.' },
        { icon: 'whatsapp', title: 'WhatsApp chat', desc: 'Replies to every message in seconds, in any language, in your brand voice.' },
        { icon: 'calendar', title: 'Scheduling', desc: 'Books appointments straight into your calendar and sends reminders to cut no-shows.' },
        { icon: 'filter', title: 'Lead qualification', desc: 'Asks the right questions and prioritizes the customers ready to buy.' },
        { icon: 'plug', title: 'CRM integration', desc: 'Connects to your CRM, spreadsheet or tools so everything is logged.' },
        { icon: 'globe', title: '24/7 support', desc: 'Handles common questions and escalates to a human only when it truly matters.' },
      ],
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
        { who: 'agent', text: 'Thanks for calling MiAgentIA, this is Aria. How can I help?' },
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

    hybrid: {
      label: 'AI + Humans',
      titleTop: 'AI does not replace your team.',
      titleGrad: 'It empowers it.',
      sub: 'The MiAgentIA hybrid model: AI does the heavy lifting (answering, filtering, qualifying) and your human experts step in at the exact moment they create the most value: the close.',
      steps: [
        { icon: 'bot', kicker: 'AI handles it', title: 'Answers and qualifies every lead', desc: 'Day and night, the AI answers calls and messages, asks the right questions and spots who is ready to buy and who is just asking around.' },
        { icon: 'calendar', kicker: 'Qualified lead?', title: 'Books the appointment automatically', desc: 'The AI reserves the slot straight into your team calendar, reminders included so the customer actually shows up.' },
        { icon: 'user', kicker: 'Your expert steps in', title: 'Or transfers the conversation live', desc: 'If the customer is ready now, the AI hands the conversation to one of your salespeople instantly, with all the context already captured.' },
      ],
      closing: 'Teamwork between AI and humans: your salespeople stop chasing window shoppers and talk only to people ready to buy.',
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
        { icon: 'cart', name: 'E-commerce', desc: 'Answer questions and recover carts.' },
        { icon: 'fork', name: 'Restaurants', desc: 'Take reservations and orders, no lines.' },
        { icon: 'briefcase', name: 'Services & agencies', desc: 'Filter leads and fill your calendar.' },
      ],
    },

    results: {
      label: 'Impact',
      title: 'What changes when nothing goes unanswered',
      sub: 'Illustrative ranges of what AI automation can unlock.',
      stats: [
        { value: 100, suffix: '%', label: 'of calls and messages answered' },
        { value: 24,  suffix: '/7', label: 'availability, no shifts' },
        { value: 80,  suffix: '%', label: 'fewer repetitive tasks' },
        { value: 3,   suffix: 'x', label: 'more booked appointments' },
      ],
      disclaimer: 'Illustrative figures, not guaranteed results. Performance depends on your business and volume.',
    },

    plans: {
      label: 'Plans',
      title: 'Start simple, scale without limits',
      sub: 'Packages by capability. Final pricing is quoted to fit your business.',
      tiers: [
        {
          name: 'Starter',
          tagline: 'One channel, ready to sell',
          features: ['1 agent (voice or chat)', 'Custom script and personality', 'Booking into your calendar', 'Basic integration', 'WhatsApp support'],
          cta: 'Get a quote',
          featured: false,
        },
        {
          name: 'Growth',
          tagline: 'Voice + WhatsApp working together',
          features: ['Voice and chat agent', 'Advanced lead qualification', 'CRM integration', 'Automated reminders', 'Conversation reports', 'Priority support'],
          cta: 'Get a quote',
          featured: true,
        },
        {
          name: 'Custom',
          tagline: 'A full AI operation',
          features: ['Multiple agents and flows', 'Outbound calls at scale', 'Custom integrations', 'n8n automations', 'Continuous optimization', 'Dedicated guidance'],
          cta: 'Talk to sales',
          featured: false,
        },
      ],
      note: 'No lock-in. Cancel anytime.',
      popular: 'Most popular',
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
            { label: 'Services', href: '#servicios' },
            { label: 'Voice Demo', href: '#voz' },
            { label: 'Chat Demo', href: '#chat' },
          ],
        },
        {
          title: 'Company',
          links: [
            { label: 'Industries', href: '#industrias' },
            { label: 'How it works', href: '#como-funciona' },
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
