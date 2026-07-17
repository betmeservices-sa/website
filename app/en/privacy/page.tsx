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
    <LegalPage lang="en" title="Privacy Policy" updated="Last updated: July 16, 2026">
      <P>
        MiAgentIA (&quot;we&quot;) provides AI voice and WhatsApp agents and omnichannel
        communication dashboards for businesses. This policy explains what data we collect, how
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

      <H2>6. Retention and security</H2>
      <P>
        We keep data for as long as the service relationship exists or as needed for the purposes
        described. We use encryption in transit (HTTPS), access controls, and secure storage of
        credentials and tokens.
      </P>

      <H2>7. Data deletion and access revocation</H2>
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

      <H2>8. Your rights</H2>
      <P>
        You can request access, correction, or deletion of your personal data, and object to
        certain uses, by writing to {site.email}. If you contacted us on WhatsApp, you can also
        ask us there to stop contacting you.
      </P>

      <H2>9. Minors</H2>
      <P>
        Our services are aimed at businesses and are not designed for people under 18. We do not
        knowingly collect data from minors.
      </P>

      <H2>10. Changes to this policy</H2>
      <P>
        If we change this policy, we will publish the new version on this page with its update
        date. Significant changes are notified to active clients.
      </P>

      <H2>11. Contact</H2>
      <P>MiAgentIA · {site.email} · www.miagentia.com</P>
    </LegalPage>
  )
}
