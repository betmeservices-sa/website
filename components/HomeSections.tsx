// Composición de la landing (compartida por / y /en).
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
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
      <Services />
      <VoiceDemo />
      <WhatsAppDemo />
      <HybridModel />
      <HowItWorks />
      <Industries />
      <Results />
      <Faq />
      <FinalCta />
    </>
  )
}
