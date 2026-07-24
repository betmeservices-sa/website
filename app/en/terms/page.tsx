import type { Metadata } from 'next'
import LegalPage, { H2, P, UL } from '@/components/LegalPage'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'MiAgentIA terms of service: AI voice and WhatsApp agents, omnichannel dashboards, acceptable use, and responsibilities.',
  alternates: {
    canonical: '/en/terms',
    languages: { es: '/terminos', en: '/en/terms' },
  },
}

export default function Page() {
  return (
    <LegalPage lang="en" title="Terms of Service" updated="Last updated: July 24, 2026">
      <P>
        These terms govern the use of MiAgentIA services: AI voice and WhatsApp agents,
        omnichannel communication dashboards, and related services. By purchasing or using the
        service you accept these terms.
      </P>

      <H2>1. The service</H2>
      <P>
        MiAgentIA designs, configures, and operates AI agents that handle conversations and calls
        from your business's end customers, plus dashboards where your team manages those
        conversations, contacts, posts, and statistics. The specific scope (channels, volumes,
        integrations) is the one agreed in your proposal or purchased plan. At this time, the
        service is available to businesses in El Salvador and Guatemala.
      </P>

      <H2>2. Accounts and authorized access</H2>
      <UL
        items={[
          'You own your accounts and assets (Facebook pages, Instagram accounts, WhatsApp numbers, phone lines). MiAgentIA never claims ownership over them.',
          'You grant us access through each platform’s official mechanisms (for example, Meta OAuth) solely to provide the service.',
          'You can revoke that access at any time from your account settings; features that depend on it will stop working.',
          'You are responsible for keeping credentials secure, enabling two-factor authentication via an authenticator app on the dashboard, and ensuring your team uses it according to these terms.',
        ]}
      />

      <H2>3. Nature of the service and responsibility for its use</H2>
      <P>
        MiAgentIA is a technology infrastructure provider built on artificial intelligence: we are
        not a telecommunications operator, a collections agency, or legal, medical, or financial
        advisors, and we are not a party to the commercial relationship between your business and
        your own end customers. You define the agent's scripts, limits, and contact policies, and
        you are solely responsible for: complying with the regulations applicable to your own
        industry (consumer protection, debt collection, telemarketing, contact hours, and the
        like); the content and consequences of the conversations the agent holds following your
        instructions; and having the legal basis to contact your end customers, including
        honoring their requests not to be contacted. We do not monitor, filter, or analyze the
        content of your conversations beyond what is strictly necessary to operate and support
        the service.
      </P>

      <H2>4. Acceptable use</H2>
      <UL
        items={[
          'No spam, harassment, fraud, or illegal or misleading content.',
          'Comply with the policies of connected platforms (Meta, WhatsApp Business), including messaging rules such as the 24-hour window and approved templates.',
          'Have the legal basis required to contact your end customers and process their data.',
          'Do not attempt to breach the security of the service or use it to build a competing product.',
        ]}
      />
      <P>
        We may suspend the service if its use puts third parties, the connected platforms, or
        MiAgentIA at risk, notifying you and explaining the reason.
      </P>

      <H2>5. Artificial intelligence and supervision</H2>
      <P>
        AI agents generate automatic replies that may contain errors. The service is configured
        with rules and limits agreed with you, but business supervision is yours: you must review
        the operation, keep your catalog information correct, and escalate to humans when
        appropriate. AI replies are not legal, medical, or financial advice. If an end customer
        directly asks whether they are speaking with an AI, the agent answers truthfully; we do
        not proactively disclose this by default unless you instruct us to or your market
        requires it.
      </P>

      <H2>6. Payments</H2>
      <P>
        Prices, currency, billing cycle, and plan contents are those in your proposal or
        purchased plan. Third-party charges derived from your operation (for example, WhatsApp
        Business conversations billed by Meta or telephony minutes) follow those providers'
        rates, unless agreed otherwise in the proposal.
      </P>

      <H2>7. Intellectual property</H2>
      <P>
        MiAgentIA's software, dashboards, and materials belong to us or our licensors. Your data,
        your brands, and the content of your conversations are yours. You grant us a license to
        process them solely to provide the service to you.
      </P>

      <H2>8. Availability</H2>
      <P>
        We work to keep the service continuously available, but it also depends on third-party
        platforms (Meta, AI providers, telephony, and hosting), so we do not guarantee
        uninterrupted availability. Planned maintenance is announced with reasonable notice.
      </P>

      <H2>9. Limitation of liability</H2>
      <P>
        To the extent permitted by law, and without prejudice to section 3, MiAgentIA's total
        liability for claims arising from the service is limited to the amount paid by the client
        in the three months prior to the event giving rise to the claim. We are not liable for
        indirect damages, lost profits, regulatory penalties arising from your use of the
        service, or data loss caused by third parties.
      </P>

      <H2>10. Termination</H2>
      <P>
        You may terminate the service as agreed in your proposal or plan. Upon termination, we
        revoke and delete the access tokens to your accounts and, at your request, delete stored
        data (see the Privacy Policy, data deletion section).
      </P>

      <H2>11. Governing law</H2>
      <P>
        These terms are governed by the laws of the Republic of El Salvador, without prejudice to
        protections that apply in the client's country.
      </P>

      <H2>12. Contact</H2>
      <P>MiAgentIA · {site.email} · www.miagentia.com</P>
    </LegalPage>
  )
}
