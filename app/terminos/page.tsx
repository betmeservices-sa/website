import type { Metadata } from 'next'
import LegalPage, { H2, P, UL } from '@/components/LegalPage'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Condiciones de Servicio',
  description:
    'Condiciones de servicio de MiAgentIA: agentes de IA de voz y WhatsApp, paneles omnicanal, uso aceptable y responsabilidades.',
  alternates: {
    canonical: '/terminos',
    languages: { es: '/terminos', en: '/en/terms' },
  },
}

export default function Page() {
  return (
    <LegalPage
      lang="es"
      title="Condiciones de Servicio"
      updated="Última actualización: 16 de julio de 2026"
    >
      <P>
        Estas condiciones regulan el uso de los servicios de MiAgentIA: agentes de inteligencia
        artificial de voz y WhatsApp, paneles de comunicación omnicanal y servicios relacionados.
        Al contratar o usar el servicio aceptas estas condiciones.
      </P>

      <H2>1. El servicio</H2>
      <P>
        MiAgentIA diseña, configura y opera agentes de IA que atienden conversaciones y llamadas
        de los clientes finales de tu negocio, y paneles donde tu equipo administra esas
        conversaciones, contactos, publicaciones y estadísticas. El alcance concreto (canales,
        volúmenes, integraciones) es el acordado en la propuesta o plan contratado.
      </P>

      <H2>2. Cuentas y accesos autorizados</H2>
      <UL
        items={[
          'Tú eres el titular de tus cuentas y activos (páginas de Facebook, cuentas de Instagram, números de WhatsApp, líneas telefónicas). MiAgentIA nunca reclama propiedad sobre ellos.',
          'Nos autorizas el acceso mediante los mecanismos oficiales de cada plataforma (por ejemplo, OAuth de Meta) únicamente para prestar el servicio.',
          'Puedes revocar ese acceso en cualquier momento desde la configuración de tus cuentas; al hacerlo, las funciones que dependen de él dejan de operar.',
          'Eres responsable de mantener credenciales seguras y de que las personas de tu equipo con acceso al panel usen el servicio conforme a estas condiciones.',
        ]}
      />

      <H2>3. Uso aceptable</H2>
      <UL
        items={[
          'No usar el servicio para spam, acoso, fraude, contenido ilegal o engañoso.',
          'Cumplir las políticas de las plataformas conectadas (Meta, WhatsApp Business), incluidas las reglas de mensajería como la ventana de 24 horas y el uso de plantillas aprobadas.',
          'Contar con la base legal necesaria para contactar a tus clientes finales y tratar sus datos.',
          'No intentar vulnerar la seguridad del servicio ni usarlo para construir un producto competidor.',
        ]}
      />
      <P>
        Podemos suspender el servicio si su uso pone en riesgo a terceros, a las plataformas
        conectadas o a MiAgentIA, avisándote y explicando el motivo.
      </P>

      <H2>4. Inteligencia artificial y supervisión</H2>
      <P>
        Los agentes de IA generan respuestas automáticas que pueden contener errores. El servicio
        se configura con reglas y límites acordados contigo, pero la supervisión del negocio es
        tuya: debes revisar la operación, corregir información de tu catálogo y escalar a
        personas cuando corresponda. Las respuestas de la IA no constituyen consejo legal, médico
        ni financiero.
      </P>

      <H2>5. Pagos</H2>
      <P>
        Los precios, la moneda, el ciclo de cobro y lo que incluye cada plan son los de tu
        propuesta o plan contratado. Los cargos de terceros derivados de tu operación (por
        ejemplo, conversaciones de WhatsApp Business cobradas por Meta o minutos de telefonía) se
        rigen por las tarifas de esos proveedores, salvo pacto distinto en la propuesta.
      </P>

      <H2>6. Propiedad intelectual</H2>
      <P>
        El software, los paneles y los materiales de MiAgentIA son nuestros o de nuestros
        licenciantes. Tus datos, tus marcas y el contenido de tus conversaciones son tuyos. Nos
        das licencia para procesarlos únicamente para prestarte el servicio.
      </P>

      <H2>7. Disponibilidad</H2>
      <P>
        Trabajamos para mantener el servicio disponible de forma continua, pero depende también
        de plataformas de terceros (Meta, proveedores de IA, telefonía y alojamiento), por lo que
        no garantizamos disponibilidad ininterrumpida. Mantenimientos planificados se avisan con
        anticipación razonable.
      </P>

      <H2>8. Limitación de responsabilidad</H2>
      <P>
        En la medida permitida por la ley, la responsabilidad total de MiAgentIA por reclamos
        derivados del servicio se limita al monto pagado por el cliente en los tres meses
        anteriores al hecho que origina el reclamo, y no respondemos por daños indirectos, lucro
        cesante o pérdida de datos causada por terceros.
      </P>

      <H2>9. Terminación</H2>
      <P>
        Puedes terminar el servicio según lo pactado en tu propuesta o plan. Al terminar,
        revocamos y eliminamos los tokens de acceso a tus cuentas y, a tu solicitud, eliminamos
        los datos almacenados (ver la Política de Privacidad, sección de eliminación de datos).
      </P>

      <H2>10. Ley aplicable</H2>
      <P>
        Estas condiciones se rigen por las leyes de la República de El Salvador, sin perjuicio de
        las protecciones que apliquen en el país del cliente.
      </P>

      <H2>11. Contacto</H2>
      <P>MiAgentIA · {site.email} · www.miagentia.com</P>
    </LegalPage>
  )
}
