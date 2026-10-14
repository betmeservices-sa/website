import Listo from '@/components/portal/Listo'
import Puerta from '@/components/portal/Puerta'

export default function ListoPage() {
  return (
    <Puerta paso="listo">
      <Listo />
    </Puerta>
  )
}
