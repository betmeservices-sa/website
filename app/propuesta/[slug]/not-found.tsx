import Link from 'next/link'
import Logo from '@/components/ui/Logo'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <Logo className="h-8" />
      <p className="text-muted">Esta propuesta no existe o el enlace ya no está disponible.</p>
      <Link href="/" className="text-sm text-cyan hover:underline">Ir a MiAgentIA</Link>
    </div>
  )
}
