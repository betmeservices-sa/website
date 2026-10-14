import Guion from '@/components/portal/Guion'
import Puerta from '@/components/portal/Puerta'

export default function GuionPage() {
  return (
    <Puerta paso="guion">
      <Guion />
    </Puerta>
  )
}
