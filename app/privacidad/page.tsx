import type { Metadata } from 'next'
import LegalPage, { H2, P, UL } from '@/components/LegalPage'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description:
    'Cómo MiAgentIA recopila, usa y protege tus datos, incluidos los datos de las plataformas de Meta conectadas por nuestros clientes.',
  alternates: {
    canonical: '/privacidad',
    languages: { es: '/privacidad', en: '/en/privacy' },
  },
}

export default function Page() {
  return (
    <LegalPage
      lang="es"
      title="Política de Privacidad"
      updated="Última actualización: 23 de julio de 2026"
    >
      <P>
        MiAgentIA (&quot;nosotros&quot;) ofrece agentes de inteligencia artificial de voz y
        WhatsApp, y paneles de comunicación omnicanal para negocios. Por el momento, el servicio
        está disponible para negocios en El Salvador y Guatemala. Esta política explica qué datos
        recopilamos, cómo los usamos y qué derechos tienes. Aplica al sitio www.miagentia.com, a
        nuestros paneles (por ejemplo, los alojados en subdominios de miagentia.com) y a los
        servicios que prestamos a nuestros clientes.
      </P>

      <H2>1. Datos que recopilamos</H2>
      <UL
        items={[
          <>
            <strong>Visitantes del sitio:</strong> datos de contacto que nos envías por
            formularios o al escribirnos por WhatsApp (nombre, teléfono, correo, negocio), y datos
            de uso del sitio mediante herramientas de analítica.
          </>,
          <>
            <strong>Clientes del servicio:</strong> datos de cuenta y facturación, y la
            configuración de sus agentes de IA (guiones, horarios, catálogos).
          </>,
          <>
            <strong>Datos de plataformas conectadas:</strong> cuando un cliente conecta sus
            cuentas (Meta, WhatsApp Business, telefonía), procesamos los datos necesarios para
            operar el servicio: mensajes y conversaciones con sus clientes finales, datos de
            contacto de esas conversaciones, publicaciones y estadísticas de sus cuentas.
          </>,
        ]}
      />

      <H2>2. Datos de las plataformas de Meta</H2>
      <P>
        Nuestros paneles se integran con las APIs de Meta (Facebook e Instagram) mediante la
        autorización explícita de cada cliente (OAuth). Con esa autorización podemos recibir y
        enviar mensajes de las páginas y cuentas del cliente, administrar comentarios, publicar
        contenido y leer estadísticas. Estos datos se usan exclusivamente para prestar el
        servicio al cliente que los autorizó: no los vendemos, no los usamos para publicidad
        propia y no los compartimos con terceros ajenos a la operación del servicio. Los tokens
        de acceso se almacenan de forma segura en el servidor y el cliente puede revocar el
        acceso en cualquier momento (ver sección 7). Cumplimos las Condiciones de la Plataforma
        de Meta y sus Políticas para Desarrolladores.
      </P>

      <H2>3. Cómo usamos los datos</H2>
      <UL
        items={[
          'Operar los agentes de IA: responder mensajes y llamadas, calificar clientes y agendar citas.',
          'Mostrar en el panel del cliente sus conversaciones, contactos y estadísticas.',
          'Responder tus consultas comerciales y coordinar demos.',
          'Mejorar el servicio y cumplir obligaciones legales.',
        ]}
      />

      <H2>4. Inteligencia artificial</H2>
      <P>
        Para generar respuestas automáticas, los mensajes de las conversaciones se procesan con
        proveedores de modelos de IA bajo acuerdos de servicio. No usamos los datos de nuestros
        clientes ni de sus clientes finales para entrenar modelos propios, y los proveedores que
        usamos no entrenan sus modelos con estos datos según sus términos empresariales.
      </P>

      <H2>5. Con quién compartimos datos</H2>
      <P>
        Solo con los proveedores que necesitamos para operar el servicio: infraestructura de
        alojamiento y base de datos, las plataformas de mensajería y redes que el cliente conecta
        (como Meta y WhatsApp Business), proveedores de IA y de telefonía, y analítica del sitio.
        Cada proveedor procesa los datos bajo sus propios términos de servicio empresariales. No
        vendemos datos personales.
      </P>

      <H2>6. Transferencias internacionales</H2>
      <P>
        Algunos de los proveedores descritos en la sección anterior pueden procesar datos en
        países distintos al tuyo. Si tu organización requiere mecanismos específicos de
        transferencia internacional (por ejemplo, Cláusulas Contractuales Tipo u otras
        salvaguardas equivalentes conforme al RGPD, la LGPD u otra ley aplicable), podemos
        incorporarlos en el Acuerdo de Procesamiento de Datos descrito en la sección 10.
      </P>

      <H2>7. Conservación y seguridad</H2>
      <P>
        Conservamos los datos mientras exista la relación de servicio con el cliente o mientras
        sean necesarios para los fines descritos; los períodos exactos por tipo de dato (por
        ejemplo, grabaciones de llamadas o historiales de conversación) pueden pactarse en el
        contrato o el Acuerdo de Procesamiento de Datos. Usamos cifrado en tránsito (HTTPS),
        control de acceso a los sistemas, autenticación de dos factores mediante aplicación
        autenticadora para el acceso al panel, y almacenamiento seguro de credenciales y tokens.
        Ante un incidente de seguridad que afecte datos personales, notificamos a los clientes
        afectados y, cuando la ley lo exija, a la autoridad competente, dentro de los plazos
        aplicables.
      </P>

      <H2>8. Eliminación de datos y revocación de acceso</H2>
      <P>Puedes pedir la eliminación de tus datos de dos formas:</P>
      <UL
        items={[
          <>
            <strong>Por correo:</strong> escribe a {site.email} desde el correo asociado a tu
            cuenta indicando qué datos quieres eliminar. Confirmamos y completamos la eliminación
            en un plazo máximo de 30 días.
          </>,
          <>
            <strong>Revocando el acceso en Meta:</strong> si eres cliente y conectaste tus
            cuentas, puedes quitar la aplicación en Facebook (Configuración &gt; Integraciones
            comerciales). Al recibir la revocación, eliminamos los tokens de acceso y dejamos de
            procesar datos de esas cuentas; los datos ya almacenados se eliminan a solicitud por
            correo.
          </>,
        ]}
      />

      <H2>9. Tus derechos</H2>
      <P>
        Dependiendo de tu ubicación y la ley que te aplique (por ejemplo, el RGPD/GDPR en la Unión
        Europea y el Reino Unido, la CCPA/CPRA en California, la LGPD en Brasil, u otras leyes
        locales de protección de datos), puedes tener derecho a:
      </P>
      <UL
        items={[
          <>
            <strong>Acceso:</strong> saber qué datos tenemos sobre ti.
          </>,
          <>
            <strong>Rectificación:</strong> corregir datos inexactos o incompletos.
          </>,
          <>
            <strong>Eliminación:</strong> pedir que borremos tus datos (ver sección 8).
          </>,
          <>
            <strong>Portabilidad:</strong> recibir tus datos en un formato estructurado.
          </>,
          <>
            <strong>Oposición y limitación:</strong> oponerte a ciertos usos o pedir que
            limitemos el tratamiento.
          </>,
          <>
            <strong>No discriminación y no venta:</strong> no vendemos ni compartimos datos
            personales con fines publicitarios de terceros, y no recibirás un trato desfavorable
            por ejercer estos derechos.
          </>,
        ]}
      />
      <P>
        Para ejercer cualquiera de estos derechos, escríbenos a {site.email}. Si nos escribiste
        por WhatsApp, también puedes pedirnos ahí que dejemos de contactarte. Si no estás de
        acuerdo con nuestra respuesta, puedes presentar una queja ante la autoridad de protección
        de datos que corresponda a tu país.
      </P>

      <H2>10. Clientes empresariales y Acuerdo de Procesamiento de Datos (DPA)</H2>
      <P>
        Si tu organización evalúa o contrata MiAgentIA para desplegar agentes que interactuarán
        con tus propios clientes, entendemos que tu equipo legal o de compliance puede requerir
        más que esta política pública. Bajo solicitud, podemos proporcionar un Acuerdo de
        Procesamiento de Datos (DPA) que defina roles de responsable/encargado, instrucciones de
        tratamiento, una lista de subencargados con aviso previo ante cambios materiales,
        mecanismos de transferencia internacional, y respuesta a cuestionarios razonables de
        seguridad y compliance. Escríbenos a {site.email} para coordinarlo.
      </P>

      <H2>11. Menores de edad</H2>
      <P>
        Nuestros servicios están dirigidos a negocios y no están diseñados para menores de 18
        años. No recopilamos datos de menores a sabiendas.
      </P>

      <H2>12. Cambios a esta política</H2>
      <P>
        Si cambiamos esta política, publicaremos la versión nueva en esta misma página con su
        fecha de actualización. Los cambios importantes se avisan a los clientes activos.
      </P>

      <H2>13. Contacto</H2>
      <P>MiAgentIA · {site.email} · www.miagentia.com</P>
    </LegalPage>
  )
}
