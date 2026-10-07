import { cookieDeSalida } from '@/lib/panel-leads-sesion'

// Botón «Salir» del panel /leads: borra la cookie y vuelve a la pantalla de clave.
export async function POST() {
  return new Response(null, {
    status: 303,
    headers: { Location: '/leads', 'Set-Cookie': cookieDeSalida() },
  })
}
