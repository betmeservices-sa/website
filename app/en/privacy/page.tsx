import type { Metadata } from 'next'
import LegalPage, { H2, P, UL } from '@/components/LegalPage'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How MiAgentIA collects, uses, and protects your data, including Meta platform data connected by our clients.',
  alternates: {
    canonical: '/en/privacy',
    languages: { es: '/privacidad', en: '/en/privacy' },
  },
}

export default function Page() {
  return (
    <LegalPage lang="en" title="Privacy Policy" updated="Last updated: July 23, 2026">
      <P>
        MiAgentIA (&quot;we&quot;) provides AI voice and WhatsApp agents and omnichannel
        communication dashboards for businesses. At this time, the service is available to
        businesses in El Salvador and Guatemala. This policy explains what data we collect, how
        we use it, and your rights. It applies to www.miagentia.com, our dashboards (for example,
        those hosted on miagentia.com subdomains), and the services we provide to our clients.
      </P>

      <H2>1. Data we collect</H2>
      <UL
        items={[
          <>
            <strong>Site visitors:</strong> contact details you send through forms or by
            messaging us on WhatsApp (name, phone, email, business), and site usage data through
            analytics tools.
          </>,
          <>
            <strong>Service clients:</strong> account and billing details, and the configuration
            of their AI agents (scripts, schedules, catalogs).
          </>,
          <>
            <strong>Connected platform data:</strong> when a client connects their accounts
            (Meta, WhatsApp Business, telephony), we process the data needed to operate the
            service: messages and conversations with their end customers, contact data from those
            conversations, posts, and account statistics.
          </>,
        ]}
      />

      <H2>2. Meta platform data</H2>
      <P>
        Our dashboards integrate with Meta APIs (Facebook and Instagram) through each client's
        explicit authorization (OAuth). With that authorization we can receive and send messages
        for the client's pages and accounts, manage comments, publish content, and read
        statistics. This data is used exclusively to provide the service to the client who
        authorized it: we do not sell it, we do not use it for our own advertising, and we do not
        share it with third parties outside the operation of the service. Access tokens are
        stored securely server-side, and clients can revoke access at any time (see section 7).
        We comply with the Meta Platform Terms and Developer Policies.
      </P>

      <H2>3. How we use data</H2>
      <UL
        items={[
          'Operating the AI agents: answering messages and calls, qualifying leads, and booking appointments.',
          "Showing each client's conversations, contacts, and statistics in their dashboard.",
          'Answering your sales inquiries and scheduling demos.',
          'Improving the service and meeting legal obligations.',
        ]}
      />

      <H2>4. Artificial intelligence</H2>
      <P>
        To generate automatic replies, conversation messages are processed with AI model
        providers under service agreements. We do not use our clients' data or their end
        customers' data to train our own models, and the providers we use do not train their
        models on this data under their business terms.
      </P>

      <H2>5. Who we share data with</H2>
      <P>
        Only with the providers we need to operate the service: hosting and database
        infrastructure, the messaging and social platforms the client connects (such as Meta and
        WhatsApp Business), AI and telephony providers, and site analytics. Each provider
        processes data under its own business terms. We do not sell personal data.
      </P>

      <H2>6. International transfers</H2>
      <P>
        Some of the providers described above may process data in countries other than your own.
        If your organization requires specific international transfer mechanisms (for example,
        Standard Contractual Clauses or other equivalent safeguards under the GDPR, LGPD, or other
        applicable law), we can incorporate them into the Data Processing Agreement described in
        section 10.
      </P>

      <H2>7. Retention and security</H2>
      <P>
        We keep data for as long as the service relationship exists or as needed for the purposes
        described; exact retention periods per data type (for example, call recordings or
        conversation history) can be agreed in the contract or the Data Processing Agreement. We
        use encryption in transit (HTTPS), access controls, two-factor authentication via an
        authenticator app for dashboard access, and secure storage of credentials and tokens. In
        the event of a security incident affecting personal data, we notify affected clients and,
        where required by law, the competent authority, within applicable deadlines.
      </P>

      <H2>8. Data deletion and access revocation</H2>
      <P>You can request deletion of your data in two ways:</P>
      <UL
        items={[
          <>
            <strong>By email:</strong> write to {site.email} from the email associated with your
            account, stating which data you want deleted. We confirm and complete deletion within
            30 days at most.
          </>,
          <>
            <strong>By revoking access on Meta:</strong> if you are a client and connected your
            accounts, you can remove the app on Facebook (Settings &gt; Business Integrations).
            Upon revocation we delete the access tokens and stop processing data from those
            accounts; already stored data is deleted upon request by email.
          </>,
        ]}
      />

      <H2>9. Your rights</H2>
      <P>
        Depending on your location and the law that applies to you (for example, the GDPR in the
        EU/UK, the CCPA/CPRA in California, the LGPD in Brazil, or other local data protection
        laws), you may have the right to:
      </P>
      <UL
        items={[
          <>
            <strong>Access:</strong> know what data we hold about you.
          </>,
          <>
            <strong>Rectification:</strong> correct inaccurate or incomplete data.
          </>,
          <>
            <strong>Erasure:</strong> ask us to delete your data (see section 8).
          </>,
          <>
            <strong>Portability:</strong> receive your data in a structured format.
          </>,
          <>
            <strong>Objection and restriction:</strong> object to certain uses or ask us to
            limit processing.
          </>,
          <>
            <strong>Non-discrimination and no sale:</strong> we do not sell or share personal
            data for third-party advertising purposes, and you will not receive unfavorable
            treatment for exercising these rights.
          </>,
        ]}
      />
      <P>
        To exercise any of these rights, email us at {site.email}. If you contacted us on
        WhatsApp, you can also ask us there to stop contacting you. If you disagree with our
        response, you may file a complaint with the data protection authority in your country.
      </P>

      <H2>10. Enterprise customers and Data Processing Agreement (DPA)</H2>
      <P>
        If your organization is evaluating or contracting MiAgentIA to deploy agents that will
        interact with your own customers, we understand your legal or compliance team may need
        more than this public policy. Upon request, we can provide a Data Processing Agreement
        (DPA) defining controller/processor roles, processing instructions, a subprocessor list
        with advance notice of material changes, international transfer mechanisms, and responses
        to reasonable security and compliance questionnaires. Email us at {site.email} to
        coordinate this.
      </P>

      <H2>11. Minors</H2>
      <P>
        Our services are aimed at businesses and are not designed for people under 18. We do not
        knowingly collect data from minors.
      </P>

      <H2>12. Changes to this policy</H2>
      <P>
        If we change this policy, we will publish the new version on this page with its update
        date. Significant changes are notified to active clients.
      </P>

      <H2>13. Contact</H2>
      <P>MiAgentIA · {site.email} · www.miagentia.com</P>
    </LegalPage>
  )
}
