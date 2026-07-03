import Hero from '@/components/sections/Hero'
import LogosMarquee from '@/components/sections/LogosMarquee'
import Services from '@/components/sections/Services'
import VoiceDemo from '@/components/sections/VoiceDemo'
import WhatsAppDemo from '@/components/sections/WhatsAppDemo'
import HowItWorks from '@/components/sections/HowItWorks'
import Industries from '@/components/sections/Industries'
import Results from '@/components/sections/Results'
import Plans from '@/components/sections/Plans'
import Faq from '@/components/sections/Faq'
import FinalCta from '@/components/sections/FinalCta'

export default function Home() {
  return (
    <>
      <Hero />
      <LogosMarquee />
      <Services />
      <VoiceDemo />
      <WhatsAppDemo />
      <HowItWorks />
      <Industries />
      <Results />
      <Plans />
      <Faq />
      <FinalCta />
    </>
  )
}
