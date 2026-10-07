// Composición de la landing (compartida por / y /en).
import Hero from '@/components/sections/Hero'
import Omnichannel from '@/components/sections/Omnichannel'
import Sofia from '@/components/sections/Sofia'
import Planes from '@/components/sections/Planes'
import Industries from '@/components/sections/Industries'
import Faq from '@/components/sections/Faq'

export default function HomeSections() {
  return (
    <>
      <Hero />
      <Omnichannel />
      <Sofia />
      <Planes />
      <Industries />
      <Faq />
    </>
  )
}
