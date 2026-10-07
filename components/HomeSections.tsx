// Composición de la landing (compartida por / y /en).
import Hero from '@/components/sections/Hero'
import Omnichannel from '@/components/sections/Omnichannel'
import Services from '@/components/sections/Services'
import Sofia from '@/components/sections/Sofia'
import Planes from '@/components/sections/Planes'
import VoiceDemo from '@/components/sections/VoiceDemo'
import WhatsAppDemo from '@/components/sections/WhatsAppDemo'
import HybridModel from '@/components/sections/HybridModel'
import HowItWorks from '@/components/sections/HowItWorks'
import Industries from '@/components/sections/Industries'
import Results from '@/components/sections/Results'
import Faq from '@/components/sections/Faq'
import FinalCta from '@/components/sections/FinalCta'

export default function HomeSections() {
  return (
    <>
      <Hero />
      <Omnichannel />
      <Services />
      <Sofia />
      <VoiceDemo />
      <WhatsAppDemo />
      <HybridModel />
      <Planes />
      <HowItWorks />
      <Industries />
      <Results />
      <Faq />
      <FinalCta />
    </>
  )
}
