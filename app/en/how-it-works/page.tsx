import type { Metadata } from 'next'
import HowItWorksPage, { type ContenidoHowItWorks } from '@/components/howitworks/HowItWorksPage'
import {
  FlujoRecorrido,
  FlujoSeguridad,
  FlujoVoz,
  FlujoFallback,
} from '@/components/howitworks/Flujogramas'

export const metadata: Metadata = {
  title: 'How it works',
  description:
    'The path a message takes, who provides each security layer, and what happens when an AI provider stops responding. Explained with flowcharts.',
  // Pagina INTERNA por ahora: no se indexa, no esta en el sitemap y no la
  // enlaza nada del sitio. Se llega solo con el enlace directo.
  robots: { index: false, follow: false },
  alternates: {
    canonical: '/en/how-it-works',
    languages: { es: '/como-funciona', en: '/en/how-it-works' },
  },
}

const contenido: ContenidoHowItWorks = {
  hero: {
    eyebrow: 'How it works',
    titulo: 'What happens between your customer’s message and',
    tituloGrad: 'the reply they get',
    sub: 'Three diagrams and the questions that come up in every meeting. They are nearly always the same ones, so we wrote them down.',
  },
  indice: 'Sections on this page',
  bloques: [
    {
      id: 'recorrido',
      eyebrow: 'The path',
      titulo: 'Where a message travels',
      intro:
        'Nearly every security question is the same one underneath: where does my customer’s information end up. This is the path a message takes, start to finish.',
      diagrama: (
        <FlujoRecorrido
          t={{
            titulo: 'The path of a message from customer to reply',
            cliente: ['Your customer writes', 'on WhatsApp'],
            entrega: ['WhatsApp delivers it', 'to your business number'],
            recibe: ['Your agent receives it', 'and saves it to the thread'],
            decision: ['Is the agent', 'switched on?'],
            redacta: ['The AI reads the recent thread', 'and drafts a reply'],
            bandeja: ['It waits in the inbox', 'for your team'],
            respuesta: ['Your customer', 'gets the reply'],
            si: 'Yes',
            no: 'No',
          }}
        />
      ),
      puntos: [
        {
          titulo: 'The number is yours',
          texto:
            'It is your WhatsApp Business number and it lives in your own Meta account. If you stop working with us one day, it stays with you along with its history.',
        },
        {
          titulo: 'We check it came from WhatsApp',
          texto:
            'Every message carries a signature from Meta and gets checked before it is processed. If it did not come from WhatsApp, it is discarded.',
        },
        {
          titulo: 'The AI reads very little',
          texto:
            'It sees the recent conversation, not the whole history. After several quiet hours the thread starts from scratch.',
        },
        {
          titulo: 'It can be switched off',
          texto:
            'There is a switch for the whole business and another for a single conversation. Switched off, messages keep landing in the inbox with nobody answering them automatically.',
        },
        {
          titulo: 'If your team steps in, the agent stops',
          texto:
            'It takes one message from someone on your team. From then on the agent no longer replies in that conversation.',
        },
        {
          titulo: 'There is a record',
          texto:
            'Every message is stored with its timestamp, your customer’s and the agent’s. You can go back later and check what it said.',
        },
      ],
    },
    {
      id: 'voz',
      eyebrow: 'Voice',
      titulo: 'And when they call instead of typing',
      intro:
        'Above is the written message. A call is the same agent through another door: it listens, understands and answers out loud, and when it cannot handle something it hands the call to a person without dropping it.',
      diagrama: (
        <FlujoVoz
          t={{
            titulo: 'How a call travels, from the moment it comes in to hang-up',
            cliente: ['Your customer calls', 'the same number as always'],
            entra: ['The call comes in', 'to your business line'],
            escucha: ['The agent listens and turns', 'what it hears into text, live'],
            entiende: ['The AI understands the request', 'and looks up what it needs'],
            decision: ['Can it', 'handle it?'],
            contesta: ['It answers out loud', 'and books the appointment'],
            transfiere: ['It hands the call', 'to your team'],
            cierre: ['On hang-up you keep the recording,', 'the transcript and the summary'],
            si: 'Yes',
            no: 'No',
          }}
        />
      ),
      puntos: [
        {
          titulo: 'The number stays the same',
          texto:
            'You forward the line you already use. Your customer dials what they always dialed, and the agent picks up.',
        },
        {
          titulo: 'You can cut it off mid-sentence',
          texto:
            'It does not wait for you to finish before it starts understanding. Talk over it and it stops and listens, the way a person does.',
        },
        {
          titulo: 'It transfers without dropping the call',
          texto:
            'If your customer asks for a person, or the request falls outside what it knows, the call moves to your team on the same line.',
        },
        {
          titulo: 'It books while it talks',
          texto:
            'It checks availability and leaves the appointment set during the call, so nobody has to enter it afterwards.',
        },
        {
          titulo: 'Everything is recorded',
          texto:
            'On hang-up you keep the audio, the transcript and a summary of what they asked for. Your team picks it up without asking the same thing twice.',
        },
        {
          titulo: 'It switches off like the chat does',
          texto:
            'Same toggle. Switched off, calls go straight to your team and nothing answers on its own.',
        },
      ],
    },
    {
      id: 'seguridad',
      eyebrow: 'Security',
      titulo: 'Who provides each layer',
      intro:
        'The question we get most is what our firewall is. We do not have one of our own. A message crosses three doors before it reaches your agent and only the last one is ours.',
      diagrama: (
        <FlujoSeguridad
          t={{
            titulo: 'Layers a request crosses before reaching the agent',
            internet: ['A message arriving from the internet'],
            meta: [
              'We use the official WhatsApp API, not a shortcut:',
              'the message travels encrypted across Meta’s network',
              'and your number is never at risk of being banned',
            ],
            metaPie: 'Provided by Meta',
            plataforma: [
              'Firewall, certificate and server patching, handled',
              'by people dedicated to it around the clock.',
              'It stops an attack before it reaches your agent',
            ],
            plataformaPie: 'Provided by the platform',
            nosotros: [
              'Password and second factor to reach the dashboard.',
              'Your integration keys never live in the code.',
              'Your data, walled off from every other client’s',
            ],
            nosotrosPie: 'This part we do ourselves',
            destino: ['Your agent and your conversations'],
            nota: [
              'What is your firewall? This one here.',
              'We do not write our own, and that is',
              'deliberate: we would rather use the one',
              'with a team guarding it day and night.',
              'Our job starts at the layer below.',
            ],
          }}
        />
      ),
      puntos: [
        {
          titulo: 'Why we do not run our own',
          texto:
            'An office in a corporate building does not put its own guard at the building entrance. Maintaining a firewall is full-time work and there are people who do only that, so we use theirs.',
        },
        {
          titulo: 'What we take care of',
          texto:
            'Who has access to what, keeping integration keys out of the code, and making sure one client cannot reach another one’s data.',
        },
        {
          titulo: 'One client cannot reach another',
          texto:
            'The rule lives in the database, not in the screen. A query asking for another business’s data comes back empty.',
        },
        {
          titulo: 'Second factor',
          texto:
            'The dashboard can ask for a code from an authenticator app on top of the password. With that, a leaked password is not enough to get in.',
        },
        {
          titulo: 'What we store',
          texto:
            'The conversations and contact details the agent needs to do its job. Card numbers, no, and the agent is instructed to stop anyone trying to dictate them.',
        },
        {
          titulo: 'What we do not have',
          texto:
            'Certifications. This is how the thing is built, not a badge somebody handed us. If your technology team needs to review something specific, we would rather get on a call with them.',
        },
      ],
    },
    {
      id: 'continuidad',
      eyebrow: 'Continuity',
      titulo: 'What happens if an AI provider goes down',
      intro:
        'The AI models are not ours, we rent them, and sometimes they go down. That is why the agent does not depend on a single one: if the primary stops answering, it moves to the next.',
      diagrama: (
        <FlujoFallback
          t={{
            titulo: 'Fallback chain across AI providers',
            entrada: ['A message needs an answer'],
            principal: ['Primary provider', 'Anthropic · Claude'],
            respaldo1: ['First fallback', 'Google · Gemini'],
            respaldo2: ['Second fallback', 'OpenAI'],
            decision: ['Did it answer', 'in time?'],
            humano: ['Handed to someone', 'on your team'],
            salida: ['Your customer', 'gets the reply'],
            si: 'Yes',
            no: 'No',
          }}
        />
      ),
      puntos: [
        {
          titulo: 'Nobody has to be awake',
          texto:
            'If the provider does not answer in time, the system moves on by itself, at whatever hour it happens.',
        },
        {
          titulo: 'Three separate companies',
          texto:
            'Anthropic, Google and OpenAI, each on its own infrastructure. All three down at once would already be a different class of problem.',
        },
        {
          titulo: 'The script stays put',
          texto:
            'Your agent’s instructions sit in your configuration, not at the provider. The fallback answers in the same voice, under the same rules.',
        },
        {
          titulo: 'If none of them answer',
          texto:
            'The conversation goes to someone on your team instead of falling silent.',
        },
        {
          titulo: 'WhatsApp has no fallback',
          texto:
            'If WhatsApp itself is down there is nowhere to go, because it is the channel. Messages arrive once the service is back and the agent picks them up then.',
        },
        {
          titulo: 'They cost different amounts',
          texto:
            'Each provider has its own rate, and a fallback can run more per message than the primary. That is why it is the fallback.',
        },
      ],
    },
  ],
  faq: {
    eyebrow: 'Questions',
    titulo: 'What we get asked in the meeting',
    sub: 'The same answers we give in person, in case someone asks you.',
    items: [
      {
        p: 'What is your firewall?',
        r: 'We do not have one of our own. The system runs behind the firewall of the platform hosting it, which has teams working on that full time. Rolling our own would be one more layer to maintain, built by people whose trade is something else. From there inward it is on us: permissions, keys, and what data gets stored.',
      },
      {
        p: 'Can you read my customers’ messages?',
        r: 'Yes, like any provider running your inbox. To fix a problem in a conversation you have to be able to see it. In practice we go in when you ask us to or when there is a failure to deal with. If you would rather narrow that down, it goes in the contract.',
      },
      {
        p: 'Are messages end-to-end encrypted?',
        r: 'Up to Meta, yes. Past that it pays to be exact, because it is where plenty of people promise more than is true. Between two people, WhatsApp encrypts from one phone to the other. When someone messages a business through the official API, the message travels encrypted as far as Meta and Meta decrypts it in order to hand it over. Their documentation says so. It has to work that way, because if nobody could read it the business could not reply. What we can say: it is encrypted in transit, it does not pass through an unofficial middleman, and Meta keeps it 30 days at most.',
      },
      {
        p: 'Is the AI trained on my conversations?',
        r: 'We do not use them to train anything. The models are consumed through their business interfaces, not the consumer products people use in a browser, which is where the policies that tend to worry people live.',
      },
      {
        p: 'Can the agent make things up?',
        r: 'It can, and it is the real risk with this technology. You do not fix it by asking the model to behave, you fix it by removing the opportunity: available times are looked up against your calendar instead of recalled from memory, and several fixed replies never reach the model. Where the detail matters, the instruction is to say a person will confirm it.',
      },
      {
        p: 'What if the agent does not know something?',
        r: 'It says so and hands the conversation to your team. An agent that improvises loses you the customer, and you find out late.',
      },
      {
        p: 'Can it end up chatting with someone forever?',
        r: 'No, every conversation has a message cap. When it is reached, the agent closes and says a person will take over. That puts a ceiling on what a single thread can cost.',
      },
      {
        p: 'Can I switch it off if something goes wrong?',
        r: 'Yes, without calling us. One switch for the whole business and another for a single conversation. Switched off, messages keep arriving in the inbox.',
      },
      {
        p: 'If we stop working together, what happens to my data?',
        r: 'The number is yours and sits in your own Meta account, with its history. Contacts and dashboard conversations are handed over as an export.',
      },
      {
        p: 'Does having an agent make me easier to hack?',
        r: 'What it adds is your WhatsApp number, which was already exposed, since the whole point is for people to message you. The care goes into the agent not doing what it should not: incoming content is treated as a customer talking and never as an instruction, even when the message says "ignore your instructions" or hides it inside an image.',
      },
    ],
  },
  cierre: {
    titulo: 'Still something unanswered?',
    texto:
      'If your technology team has a question that is not here, we will answer it. And if the answer is that we do not do it, that too.',
    cta: 'Book a demo',
  },
}

export default function Page() {
  return (
    <HowItWorksPage
      lang="en"
      c={contenido}
      leyenda={{
        cliente: 'Your customer and their channel',
        nuestro: 'What your agent does',
        tercero: 'Third-party pieces',
        persona: 'A person steps in',
      }}
    />
  )
}
