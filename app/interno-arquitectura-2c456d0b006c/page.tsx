import type { Metadata } from 'next'

// Ficha técnica INTERNA. Slug aleatorio, noindex y bloqueada en robots: se
// comparte por enlace directo con nuestro equipo o con el area de tecnologia de
// un cliente que quiera el detalle.
//
// A diferencia de /como-funciona, aca NO se suaviza nada: los numeros son los
// que estan en el codigo, y lo que no existe se dice que no existe.
//
// Solo en español a proposito. La publica es bilingue porque la ven prospectos;
// esta la ve nuestro equipo, y mantener dos copias de una ficha con constantes
// es la forma mas facil de que una quede desactualizada.
export const metadata: Metadata = {
  title: 'Arquitectura · interno',
  robots: { index: false, follow: false },
  alternates: { canonical: '/interno-arquitectura-2c456d0b006c' },
}

const MONO = 'font-mono text-[12.5px] text-cyan-soft'

function Seccion({
  n,
  titulo,
  intro,
  children,
}: {
  n: string
  titulo: string
  intro?: string
  children: React.ReactNode
}) {
  return (
    <section className="border-t border-white/[0.07] py-12">
      <div className="mb-6 flex gap-4">
        <span className="font-mono text-[13px] text-[var(--text-3)] text-muted">{n}</span>
        <div>
          <h2 className="font-display text-xl font-semibold text-ink">{titulo}</h2>
          {intro && <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-muted">{intro}</p>}
        </div>
      </div>
      <div className="pl-0 sm:pl-10">{children}</div>
    </section>
  )
}

function Tabla({ cols, filas }: { cols: string[]; filas: React.ReactNode[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] border-collapse text-left text-[13.5px]">
        <thead>
          <tr className="border-b border-white/10">
            {cols.map((c) => (
              <th
                key={c}
                className="py-2 pr-4 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-muted"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filas.map((f, i) => (
            <tr key={i} className="border-b border-white/[0.05] align-top">
              {f.map((celda, j) => (
                <td key={j} className="py-2.5 pr-4 leading-relaxed text-muted">
                  {celda}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function C({ children }: { children: React.ReactNode }) {
  return <code className={MONO}>{children}</code>
}

/** Un paso del turno, con su reloj a la izquierda. */
function Paso({ t, titulo, children }: { t: string; titulo: string; children: React.ReactNode }) {
  return (
    <div className="relative flex gap-4 pb-6 last:pb-0">
      <div className="flex flex-col items-center">
        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-cyan" />
        <span className="mt-1 w-px flex-1 bg-white/10" />
      </div>
      <div className="-mt-1 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-3">
          <span className="font-mono text-[12px] text-cyan-soft">{t}</span>
          <h3 className="font-display text-[15px] font-semibold text-ink">{titulo}</h3>
        </div>
        <p className="mt-1.5 max-w-2xl text-[13.5px] leading-relaxed text-muted">{children}</p>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <main className="min-h-screen bg-bg">
      <div className="mx-auto max-w-4xl px-5 pb-24 pt-16 sm:px-8">
        {/* Cabecera propia: esta pagina no lleva el nav de marketing, para que se
            note de entrada que no es material de venta. */}
        <header className="border-b border-white/10 pb-8">
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-magenta/40 bg-magenta/10 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-magenta">
              Interno
            </span>
            <span className="font-mono text-[11px] text-muted">no compartir sin criterio</span>
          </div>
          <h1 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Arquitectura del agente de WhatsApp
          </h1>
          <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-muted">
            Los números de esta página salen del código, no de una presentación. Si algo acá no
            coincide con lo que hace el sistema, el error está en esta página y hay que corregirla.
          </p>
          <p className="mt-4 font-mono text-[12px] text-muted">
            repo <C>centro-comunicacion-demo</C> · última revisión 2026-08-18
          </p>
        </header>

        <Seccion
          n="01"
          titulo="El turno, con los tiempos reales"
          intro="Desde que Meta entrega el mensaje hasta que sale la respuesta. Los tiempos son los de lib/ai-reply.ts."
        >
          <Paso t="0 ms" titulo="Llega el webhook y se responde 200 de inmediato">
            Se valida la firma <C>x-hub-signature-256</C> (HMAC SHA-256 del cuerpo crudo, comparada
            con <C>timingSafeEqual</C>) y recién ahí se procesa. El trabajo pesado corre dentro de{' '}
            <C>after()</C>, después del 200, porque Meta reintenta si tardás en contestarle.
          </Paso>
          <Paso t="0 ms" titulo="Se resuelve el tenant y se guarda el mensaje">
            El tenant sale del <C>phone_number_id</C> del payload. Imagen, documento, audio y sticker
            se guardan como adjunto; el caption de una foto viaja pegado al texto con la marca{' '}
            <C>[imagen]</C>.
          </Paso>
          <Paso t="0 → 5 s" titulo="Silencio">
            No se le muestra nada al contacto. Es la ventana para que quien escribe de a poco termine
            su idea. Si entra otro mensaje, este turno se retira sin haber dado señales.
          </Paso>
          <Paso t="5 s" titulo="¿Sigo siendo el último mensaje?">
            Se relee la conversación. Si el último ya no es el disparador, o si un humano escribió
            (su mensaje sería <C>direccion=out</C>), el turno termina acá.
          </Paso>
          <Paso t="5 s" titulo="Indicador de escribiendo">
            Recién ahora. Meta lo apaga solo a los 25 s, así que el presupuesto se gasta en el modelo
            y no esperando. Efecto secundario: también marca el mensaje como leído.
          </Paso>
          <Paso t="5 → 12 s" titulo="Resto de la espera, aleatorio">
            El total cae uniforme en el rango, para que no conteste siempre al mismo ritmo. Se vuelve
            a mirar si sigue siendo el último, porque pudo entrar algo durante este tramo.
          </Paso>
          <Paso t="~12 s" titulo="Barandas, y solo después el modelo">
            <C>lib/sucursal-gate.ts</C> decide con funciones puras: pregunta de sucursal obligatoria,
            reintentos y tope de mensajes. Esos textos son fijos y cuestan cero tokens. Si la
            decisión es responder, ahí sí se baja la imagen (si hay) y se llama al modelo.
          </Paso>
          <Paso t="~12 s +" titulo="Se envía, se guarda y se registra el consumo">
            La respuesta se guarda como saliente y se escribe una fila en <C>ai_uso_tokens</C>. Todo
            esto vive dentro de <C>maxDuration = 60</C>.
          </Paso>
        </Seccion>

        <Seccion
          n="02"
          titulo="Ventanas y topes"
          intro="Todos los límites que aplican a una conversación, con su valor real y quién lo impone."
        >
          <Tabla
            cols={['Límite', 'Valor', 'Se ajusta con', 'Lo impone']}
            filas={[
              [
                'Silencio antes de contestar',
                <C key="a">5 s</C>,
                <C key="b">AI_DELAY_MIN_MS</C>,
                'Nosotros',
              ],
              [
                'Espera máxima total',
                <C key="a">12 s</C>,
                <C key="b">AI_DELAY_MAX_MS</C>,
                'Nosotros',
              ],
              [
                'Corte de sesión',
                <C key="a">4 h</C>,
                <C key="b">AI_SESSION_GAP_HORAS</C>,
                'Nosotros',
              ],
              [
                'Mensajes del agente por conversación',
                <C key="a">10</C>,
                <span key="b">
                  <C>ai.limiteMensajes</C> por tenant
                </span>,
                'Nosotros',
              ],
              [
                'Duración de la función',
                <C key="a">60 s</C>,
                <C key="b">maxDuration</C>,
                'Plataforma',
              ],
              ['Indicador de escribiendo', <C key="a">25 s</C>, '—', 'Meta'],
              ['Texto libre tras el último mensaje', <C key="a">24 h</C>, '—', 'Meta'],
              ['Retención del mensaje en Cloud API', <C key="a">30 días</C>, '—', 'Meta'],
            ]}
          />
          <p className="mt-4 max-w-2xl text-[13.5px] leading-relaxed text-muted">
            El tope de 10 cuenta la pregunta de sucursal dentro del presupuesto (
            <C>PREGUNTA_SUCURSAL_CUENTA = true</C>). Al llegar, el agente cierra, la conversación
            pasa a una persona y la IA queda apagada <em>para ese chat</em>: el interruptor global no
            se toca.
          </p>
        </Seccion>

        <Seccion
          n="03"
          titulo="Aislamiento"
          intro="Qué separa a un cliente de otro y qué separa a un extraño del sistema."
        >
          <Tabla
            cols={['Capa', 'Mecanismo']}
            filas={[
              [
                'Entrada del webhook',
                <>
                  HMAC SHA-256 sobre el cuerpo crudo, comparado en tiempo constante. Sin firma
                  válida, <C>401</C> y no se procesa.
                </>,
              ],
              [
                'Ruteo por tenant',
                <>
                  <C>phone_number_id</C> del payload contra la config de cada tenant. Cada fila
                  guarda su <C>tenant</C>.
                </>,
              ],
              [
                'Lectura de datos',
                <>
                  RLS en Postgres. La regla está en la base, no en la consulta ni en la pantalla.
                </>,
              ],
              [
                'Acceso al panel',
                <>
                  Cookie de sesión firmada, HttpOnly. TOTP opcional (RFC 6238, paso de 30 s,
                  tolerancia de ±1 ventana) que se enciende con <C>TOTP_2FA=on</C>.
                </>,
              ],
              [
                'Contraseñas',
                <>
                  <C>LOGIN_PASSWORDS</C> en variable de entorno manda sobre las del repo. Si falta,
                  se cae a las del código y avisa por consola en producción.
                </>,
              ],
              [
                'Contenido entrante',
                <>
                  El texto del contacto nunca es instrucción. Aplica igual a las imágenes: una
                  captura con texto es contenido, no una orden.
                </>,
              ],
            ]}
          />
          <p className="mt-4 max-w-2xl text-[13.5px] leading-relaxed text-muted">
            Las contraseñas de demo viven en el repo, que es público. Mientras siga así, la única
            puerta real es <C>LOGIN_PASSWORDS</C>.
          </p>
        </Seccion>

        <Seccion
          n="04"
          titulo="Medición de costo"
          intro="Cómo se calcula lo que sale en el panel, y por qué no es una estimación."
        >
          <p className="max-w-2xl text-[13.5px] leading-relaxed text-muted">
            Cada respuesta escribe una fila con los <strong>cuatro</strong> campos de <C>usage</C>,
            porque se cobran distinto: entrada sin caché, escritura de caché (
            <C>1.25x</C> a 5 min, <C>2x</C> a 1 h), lectura de caché (<C>0.1x</C>) y salida. El error
            clásico es reportar <C>input_tokens</C> como si fuera el prompt completo; el prompt es la
            suma de los tres de entrada.
          </p>
          <p className="mt-3 max-w-2xl text-[13.5px] leading-relaxed text-muted">
            El reparto entre texto e imagen sale de llamar <C>count_tokens</C> dos veces, con y sin
            el bloque de la foto, y restar. No hay estimación por caracteres. Y se guarda el{' '}
            <strong>modelo</strong> de cada fila más el costo ya calculado, porque cambiar{' '}
            <C>AI_MODEL</C> mañana invalidaría cualquier recálculo del histórico.
          </p>

          <h3 className="mt-6 mb-3 font-display text-[14px] font-semibold text-ink">
            Tarifas vigentes, por millón de tokens
          </h3>
          <Tabla
            cols={['Modelo', 'Entrada', 'Salida', 'Nota']}
            filas={[
              [<C key="a">claude-haiku-4-5</C>, '$1.00', '$5.00', 'El que corre por defecto'],
              [
                <C key="a">claude-sonnet-5</C>,
                '$3.00',
                '$15.00',
                'Promo $2 / $10 hasta el 31 ago 2026',
              ],
              [<C key="a">claude-opus-5</C>, '$5.00', '$25.00', '—'],
            ]}
          />
          <p className="mt-4 max-w-2xl text-[13.5px] leading-relaxed text-muted">
            Un modelo sin tarifa conocida no inventa un costo: queda en cero y marcado. Si mañana se
            suma un proveedor nuevo, hay que agregarlo a <C>PRECIOS_POR_MILLON</C> o el consumo se
            va a ver más barato de lo que es.
          </p>
        </Seccion>

        <Seccion
          n="05"
          titulo="Modos de falla"
          intro="Qué pasa cuando algo se cae, y qué termina viendo el contacto."
        >
          <Tabla
            cols={['Qué falla', 'Qué hace el sistema', 'Qué ve el contacto']}
            filas={[
              [
                'El modelo no responde',
                'El turno se cae. Hoy no hay reintento con otro proveedor.',
                'Silencio.',
              ],
              [
                'WhatsApp caído',
                'Nada que hacer, es el canal. Meta entrega al volver.',
                'Su mensaje sale como no entregado y llega después.',
              ],
              [
                'Supabase sin configurar',
                'Los stores caen a memoria. En serverless cada invocación arranca vacía.',
                'El agente contesta, pero el panel se ve en cero.',
              ],
              [
                'Migración sin correr',
                <>
                  La lectura traga el error y devuelve vacío. Se ve idéntico a &quot;todavía no hay
                  datos&quot;.
                </>,
                'Nada raro. Ese es el problema.',
              ],
              [
                'Se pasa de 60 s',
                'La función se corta a mitad del turno.',
                'Silencio, o una respuesta que nunca se guardó.',
              ],
              [
                'Llega dos veces el mismo mensaje',
                <>
                  El chequeo de &quot;sigo siendo el último&quot; hace que solo uno conteste.
                </>,
                'Una sola respuesta.',
              ],
            ]}
          />
        </Seccion>

        <Seccion
          n="06"
          titulo="Lo que no está construido"
          intro="Esta sección existe para que nadie prometa en una reunión algo que todavía no corre."
        >
          <div className="rounded-xl border border-magenta/25 bg-magenta/[0.06] p-5">
            <h3 className="font-display text-[15px] font-semibold text-ink">
              Cadena de respaldo entre proveedores de IA
            </h3>
            <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-muted">
              La página comercial la describe en presente. En el código no existe: hay un solo
              cliente de Anthropic y si falla, el turno se cae en silencio. Para construirlo hay que
              envolver la llamada en una cadena con detección de fallo y timeout, y sumar las
              tarifas de Google y OpenAI a <C>PRECIOS_POR_MILLON</C>, o el consumo de un turno
              servido por el respaldo se registraría en cero.
            </p>
          </div>
          <ul className="mt-5 space-y-2.5 text-[13.5px] leading-relaxed text-muted">
            <li>
              <strong className="text-ink">Segundo factor apagado por defecto.</strong> Existe y
              funciona, pero solo se activa con <C>TOTP_2FA=on</C>.
            </li>
            <li>
              <strong className="text-ink">Sin tabla de migraciones.</strong> El esquema se aplica a
              mano, así que un <C>.sql</C> en el repo no garantiza que exista en la base.
            </li>
            <li>
              <strong className="text-ink">Solo se le manda la imagen del último mensaje.</strong>{' '}
              Es a propósito: mandar todo el historial multiplicaría la entrada en cada turno.
            </li>
            <li>
              <strong className="text-ink">Audio y documentos no se leen.</strong> Se guardan como
              adjunto y los atiende una persona.
            </li>
          </ul>
        </Seccion>

        <footer className="border-t border-white/[0.07] pt-8">
          <p className="text-[13px] leading-relaxed text-muted">
            Si cambiás una constante en el código, cambiala también acá en el mismo commit. Una
            ficha técnica desactualizada es peor que no tenerla, porque la gente le cree.
          </p>
        </footer>
      </div>
    </main>
  )
}
