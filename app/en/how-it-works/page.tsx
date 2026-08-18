import type { Metadata } from 'next'
import HowItWorksPage, { type ContenidoHowItWorks } from '@/components/howitworks/HowItWorksPage'
import {
  FlujoRecorrido,
  FlujoSeguridad,
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
    sub: 'No cloud metaphors, no inflated words. Three diagrams you can follow with your finger, plus answers to what we get asked in almost every meeting.',
  },
  indice: 'Sections on this page',
  bloques: [
    {
      id: 'recorrido',
      eyebrow: 'The path',
      titulo: 'Where a message travels',
      intro:
        'Nearly every security question is really the same one: where does my customer’s information go? This is the full path, and everything else on this page hangs off it.',
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
          titulo: 'The number stays yours',
          texto:
            'It is your WhatsApp Business number, connected to your own Meta account. If you stop working with us tomorrow, the number and its history stay with you.',
        },
        {
          titulo: 'Nothing gets in unsigned',
          texto:
            'Every incoming message carries a signature from Meta that is verified before anything touches it. A message that did not come from WhatsApp is rejected unprocessed.',
        },
        {
          titulo: 'The AI does not see everything',
          texto:
            'It reads the recent conversation, not two years of messages. After several quiet hours the thread starts clean again.',
        },
        {
          titulo: 'You hold the switch',
          texto:
            'You can turn the AI off for the whole business or for a single conversation. While it is off, messages still land in the inbox, they just are not answered automatically.',
        },
        {
          titulo: 'A person can step in anytime',
          texto:
            'The moment someone on your team writes in a thread, the agent goes quiet there. They never compete over the same conversation.',
        },
        {
          titulo: 'Everything is on the record',
          texto:
            'Every message, your customer’s and the agent’s, is stored with its timestamp. What the agent said can be read back later.',
        },
      ],
    },
    {
      id: 'seguridad',
      eyebrow: 'Security',
      titulo: 'Who provides each layer',
      intro:
        'Here is the short answer to the question we get most: we do not run our own firewall. A message crosses three doors before it reaches your agent, and the outer one is not ours.',
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
          titulo: 'Why we run no firewall of our own',
          texto:
            'For the same reason an office in a corporate building does not hire its own guard for the building entrance. Writing and maintaining a firewall is a full-time trade. We would rather use the one built by people who do it for a living.',
        },
        {
          titulo: 'What we do handle',
          texto:
            'The part nobody can handle for us: who has access to what, keeping integration keys out of the code, and making sure each client can only reach their own data.',
        },
        {
          titulo: 'Each client’s data is walled off',
          texto:
            'The separation is enforced by the database, not by the screen. Even if someone managed to ask for another business’s data, the query comes back empty.',
        },
        {
          titulo: 'Second factor on the dashboard',
          texto:
            'Dashboard access can require a code from an authenticator app on top of the password. A leaked password on its own opens nothing.',
        },
        {
          titulo: 'We store the minimum',
          texto:
            'The conversations and contact details the agent needs to do its job. We neither ask for nor store card numbers, and the agent is instructed to stop anyone trying to dictate them.',
        },
        {
          titulo: 'What this is not',
          texto:
            'This is not a certification. It is how the thing is built. If your technology team needs to review something specific, we would rather sit down with them than send them a badge.',
        },
      ],
    },
    {
      id: 'continuidad',
      eyebrow: 'Continuity',
      titulo: 'What happens if an AI provider goes down',
      intro:
        'The AI models are not ours, we rent them, and sometimes they go down. That is why the agent does not depend on a single one. If the primary stops answering, it moves to the next without your customer noticing.',
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
          titulo: 'No human decides the switch',
          texto:
            'Nobody has to wake up at three in the morning to flip something. If the provider does not answer in time, the system moves on by itself.',
        },
        {
          titulo: 'Three providers, not one',
          texto:
            'Anthropic, Google and OpenAI. Different companies, different infrastructure. All three down at once is a different class of problem.',
        },
        {
          titulo: 'The script does not change',
          texto:
            'Your agent’s instructions do not live at the provider, they live in your configuration. The fallback answers in the same voice, under the same rules.',
        },
        {
          titulo: 'If none of them answer, you are not left hanging',
          texto:
            'The conversation goes to someone on your team instead of falling silent. A customer waiting on nothing is worse than a customer helped by a person.',
        },
        {
          titulo: 'This does not cover WhatsApp',
          texto:
            'If WhatsApp itself is down there is no fallback to be had, it is the channel. Messages are delivered once the service returns, and the agent picks them up then.',
        },
        {
          titulo: 'What switching costs',
          texto:
            'Providers price differently from one another. A fallback can cost more per message than the primary, which is exactly why it is the fallback and not the default.',
        },
      ],
    },
  ],
  faq: {
    eyebrow: 'Questions',
    titulo: 'What we get asked in the meeting',
    sub: 'The same answers we give in person, so you have them in writing.',
    items: [
      {
        p: 'What is your firewall?',
        r: 'We do not have one of our own, and that is deliberate. The system runs behind the firewall of the platform hosting it, which has teams working on that full time. Rolling our own would be worse: one more layer to get wrong, built by people whose trade is something else. Our job starts where theirs ends: permissions, keys, and what data gets stored.',
      },
      {
        p: 'Can you read my customers’ messages?',
        r: 'Technically yes, like any provider running your inbox: you have to be able to see a conversation to fix a problem with it. In practice we only go in when you ask us to or when there is a failure to deal with. If that does not sit right with you, it can be settled in the contract.',
      },
      {
        p: 'Are messages end-to-end encrypted?',
        r: 'Up to Meta, yes, and past that we have to be precise, because plenty of people in this business promise more than is true. When two people message each other on WhatsApp, the encryption runs from one phone to the other. When someone messages a business through the official API, the message travels encrypted as far as Meta, and Meta decrypts it in order to hand it to the business. Their own documentation says so. It has to work that way: if nobody could read it, no business could reply. What we can state is that it is encrypted in transit, that it does not pass through an unofficial middleman, and that Meta keeps it for at most 30 days.',
      },
      {
        p: 'Is the AI trained on my conversations?',
        r: 'We do not use your conversations to train anything. The models we use are consumed through their business interfaces, not through the consumer products people use in a browser, which is where the policies that worry people usually live.',
      },
      {
        p: 'Can the agent make things up?',
        r: 'It is the real risk with this technology, and you do not solve it by asking the model to behave. You solve it by removing the opportunity: available times are looked up against your actual calendar instead of recalled from memory, and certain fixed replies never reach the model at all. Even so, where your business depends on a detail, the instruction is to say a person will confirm it.',
      },
      {
        p: 'What if the agent does not know something?',
        r: 'It says so and hands the conversation to your team. We would rather have an agent that admits it does not know than one that improvises, because the second one loses the customer and you find out late.',
      },
      {
        p: 'Can it end up chatting with someone forever?',
        r: 'No. Every conversation has a message cap. When it is reached, the agent closes politely and says a person will take over. That puts a ceiling on what a single thread can cost and ends the endless loop with someone who is just playing around.',
      },
      {
        p: 'Can I switch it off if something goes wrong?',
        r: 'Yes, without calling us. There is a switch for the whole business and another for a single conversation. While it is off, messages keep arriving in the inbox, they simply are not answered automatically.',
      },
      {
        p: 'If we stop working together, what happens to my data?',
        r: 'The WhatsApp number is yours and lives in your own Meta account, so the history stays there. Contacts and dashboard conversations are handed over as an export. Nothing is held hostage on our side.',
      },
      {
        p: 'Does having an agent make me easier to hack?',
        r: 'The surface it adds is your WhatsApp number, which was already exposed, since the whole point is for people to message you. What has to be guarded is the agent doing things it should not: incoming content is treated as a customer talking and never as an instruction, even when the message says "ignore your instructions" or hides it inside an image.',
      },
    ],
  },
  cierre: {
    titulo: 'Still something unanswered?',
    texto:
      'If your technology team has a question that is not here, we will answer it straight. And if the answer is that we do not do something, you will hear that too.',
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
