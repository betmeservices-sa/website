import Pago from '@/components/portal/Pago'
import Puerta from '@/components/portal/Puerta'

export default function PagoPage() {
  return (
    <Puerta paso="pago">
      <Pago />
    </Puerta>
  )
}
