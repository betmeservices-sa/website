import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { listarLeads, type Lead } from '@/lib/leads'
import { COOKIE_PANEL, sesionValida } from '@/lib/panel-leads-sesion'
import Acceso from '@/components/leads/Acceso'
import PanelLeads from '@/components/leads/PanelLeads'

// Panel del equipo: los datos que la gente deja en /sandra y /andrea (el
// formulario «Déjanos tus datos» y las llamadas demo que pidieron). Entra con
// la clave compartida PANEL_LEADS_CLAVE; fuera del índice y bloqueada en robots.
export const metadata: Metadata = {
  title: 'Leads de conferencia',
  robots: { index: false, follow: false, nocache: true },
  referrer: 'no-referrer',
  alternates: { canonical: '/leads' },
}

// Día de hoy en El Salvador como yyyy-mm-dd: la página y el cliente lo usan
// para decir «Hoy» en vez de la fecha, y se calcula aquí para que el HTML del
// servidor y el del navegador coincidan.
const fmtDiaSV = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'America/El_Salvador',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ clave?: string }>
}) {
  const jar = await cookies()
  if (!sesionValida(jar.get(COOKIE_PANEL)?.value)) {
    const { clave } = await searchParams
    return <Acceso error={clave === 'mal'} />
  }

  let leads: Lead[] = []
  let error = false
  try {
    leads = await listarLeads()
  } catch (e) {
    console.error('[leads] no se pudo listar', e)
    error = true
  }
  return <PanelLeads inicial={leads} errorInicial={error} hoyInicial={fmtDiaSV.format(new Date())} />
}
