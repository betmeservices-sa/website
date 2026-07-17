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
    <LegalPage lang="en" title="Terms of Service" updated="Last updated: July 16, 2026">
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
        integrations) is the one agreed in your proposal or purchased plan.
      </P>

      <H2>2. Accounts and authorized access</H2>
      <UL
        items={[
          'You own your accounts and assets (Facebook pages, Instagram accounts, WhatsApp numbers, phone lines). MiAgentIA never claims ownership over them.',
          'You grant us access through each platform’s official mechanisms (for example, Meta OAuth) solely to provide the service.',
          'You can revoke that access at any time from your account settings; features that depend on it will stop working.',
          'You are responsible for keeping credentials secure and ensuring your team uses the dashboard according to these terms.',
        ]}
      />

      <H2>3. Acceptable use</H2>
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

      <H2>4. Artificial intelligence and supervision</H2>
      <P>
        AI agents generate automatic replies that may contain errors. The service is configured
        with rules and limits agreed with you, but business supervision is yours: you must review
        the operation, keep your catalog information correct, and escalate to humans when
        appropriate. AI replies are not legal, medical, or financial advice.
      </P>

      <H2>5. Payments</H2>
      <P>
        Prices, currency, billing cycle, and plan contents are those in your proposal or
        purchased plan. Third-party charges derived from your operation (for example, WhatsApp
        Business conversations billed by Meta or telephony minutes) follow those providers'
        rates, unless agreed otherwise in the proposal.
      </P>

      <H2>6. Intellectual property</H2>
      <P>
        MiAgentIA's software, dashboards, and materials belong to us or our licensors. Your data,
        your brands, and the content of your conversations are yours. You grant us a license to
        process them solely to provide the service to you.
      </P>

      <H2>7. Availability</H2>
      <P>
        We work to keep the service continuously available, but it also depends on third-party
        platforms (Meta, AI providers, telephony, and hosting), so we do not guarantee
        uninterrupted availability. Planned maintenance is announced with reasonable notice.
      </P>

      <H2>8. Limitation of liability</H2>
      <P>
        To the extent permitted by law, MiAgentIA's total liability for claims arising from the
        service is limited to the amount paid by the client in the three months prior to the
        event giving rise to the claim, and we are not liable for indirect damages, lost profits,
        or data loss caused by third parties.
      </P>

      <H2>9. Termination</H2>
      <P>
        You may terminate the service as agreed in your proposal or plan. Upon termination, we
        revoke and delete the access tokens to your accounts and, at your request, delete stored
        data (see the Privacy Policy, data deletion section).
      </P>

      <H2>10. Governing law</H2>
      <P>
        These terms are governed by the laws of the Republic of El Salvador, without prejudice to
        protections that apply in the client's country.
      </P>

      <H2>11. Contact</H2>
      <P>MiAgentIA · {site.email} · www.miagentia.com</P>
    </LegalPage>
  )
}
