'use client'

// Flujogramas animados de la página "Cómo funciona".
//
// SVG escrito a mano, sin librerías de grafos: son tres diagramas fijos y una
// librería pesaría más que ellos. La animación es CSS (ver globals.css, bloque
// "Flujogramas animados") y arranca cuando el diagrama entra en pantalla.
//
// Cómo se orquesta: cada pieza recibe un `paso`, y de ahí sale su retraso. El
// cuadro del paso N aparece, su flecha se dibuja, y recién entonces aparece el
// siguiente. Después queda un "cometa" recorriendo cada línea en bucle.
//
// Los textos NO viven aquí: entran por props desde cada ruta, que es lo que
// permite tener la página en español y en inglés sin duplicar el dibujo.
//
// SVG no corta el texto en varias líneas por su cuenta, por eso cada etiqueta
// es un arreglo de líneas y no una cadena suelta.

import { useEffect, useRef, useState } from 'react'

type Tono = 'cliente' | 'nuestro' | 'tercero' | 'persona'

const TONOS: Record<Tono, { borde: string; fondo: string; texto: string; neon: string }> = {
  // Lo que pasa del lado del cliente o de las plataformas: cian.
  cliente: {
    borde: 'rgba(34,211,238,0.45)',
    fondo: 'rgba(34,211,238,0.08)',
    texto: '#67E8F9',
    neon: '#22D3EE',
  },
  // Lo que hace nuestro sistema: violeta.
  nuestro: {
    borde: 'rgba(139,92,246,0.5)',
    fondo: 'rgba(139,92,246,0.10)',
    texto: '#C4B5FD',
    neon: '#8B5CF6',
  },
  // Piezas de terceros (Meta, los proveedores de IA): gris con poco brillo,
  // para que se distingan de lo nuestro de un vistazo.
  tercero: {
    borde: 'rgba(255,255,255,0.14)',
    fondo: 'rgba(255,255,255,0.03)',
    texto: '#9A9AB0',
    neon: '#67E8F9',
  },
  // Cuando entra una persona de carne y hueso: magenta.
  persona: {
    borde: 'rgba(232,121,249,0.5)',
    fondo: 'rgba(232,121,249,0.10)',
    texto: '#F5D0FE',
    neon: '#E879F9',
  },
}

/** Cadencia de la secuencia. Un "paso" = un cuadro y su flecha. */
const PASO_S = 0.5
const retrasoCaja = (paso: number) => `${(paso * PASO_S).toFixed(2)}s`
// La flecha sale a media entrada del cuadro del que nace: se siente encadenado
// en vez de por turnos.
const retrasoLinea = (paso: number) => `${(paso * PASO_S + 0.28).toFixed(2)}s`

function Defs({ id }: { id: string }) {
  return (
    <defs>
      <marker
        id={`${id}-punta`}
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,255,255,0.35)" />
      </marker>
    </defs>
  )
}

const ANCHO = 280
const ALTO = 62

function Caja({
  x,
  y,
  lineas,
  paso,
  tono = 'nuestro',
  ancho = ANCHO,
  alto = ALTO,
  operador,
}: {
  x: number
  y: number
  lineas: string[]
  paso: number
  tono?: Tono
  ancho?: number
  alto?: number
  /**
   * "Quién lo opera", DENTRO del recuadro. Iba debajo y la flecha de bajada le
   * pasaba por encima, porque el espacio entre cajas es justo por donde va.
   */
  operador?: string
}) {
  const c = TONOS[tono]
  const cx = x + ancho / 2
  // El bloque de texto se centra vertical: 15px de interlineado por línea. Con
  // operador se sube un poco, para que el renglón extra quede dentro.
  const desplace = operador ? -10 : 0
  const inicio = y + alto / 2 - ((lineas.length - 1) * 15) / 2 + 5 + desplace
  return (
    <g className="fx-caja" style={{ animationDelay: retrasoCaja(paso) }}>
      <rect
        x={x}
        y={y}
        width={ancho}
        height={alto}
        rx={14}
        fill={c.fondo}
        stroke={c.borde}
        strokeWidth={1}
      />
      {lineas.map((l, i) => (
        <text
          key={i}
          x={cx}
          y={inicio + i * 15}
          textAnchor="middle"
          className="text-[12.5px]"
          fill={c.texto}
        >
          {l}
        </text>
      ))}
      {operador && (
        <text
          x={cx}
          y={y + alto - 13}
          textAnchor="middle"
          className="text-[10.5px] uppercase tracking-[0.08em]"
          fill="rgba(154,154,176,0.7)"
        >
          {operador}
        </text>
      )}
    </g>
  )
}

/** Rombo de decisión. cx/cy es su CENTRO, no su esquina. */
function Rombo({
  cx,
  cy,
  lineas,
  paso,
  rx = 132,
  ry = 52,
}: {
  cx: number
  cy: number
  lineas: string[]
  paso: number
  rx?: number
  ry?: number
}) {
  const inicio = cy - ((lineas.length - 1) * 15) / 2 + 5
  return (
    <g className="fx-caja" style={{ animationDelay: retrasoCaja(paso) }}>
      <path
        d={`M ${cx} ${cy - ry} L ${cx + rx} ${cy} L ${cx} ${cy + ry} L ${cx - rx} ${cy} Z`}
        fill="rgba(34,211,238,0.06)"
        stroke="rgba(34,211,238,0.4)"
        strokeWidth={1}
      />
      {lineas.map((l, i) => (
        <text
          key={i}
          x={cx}
          y={inicio + i * 15}
          textAnchor="middle"
          className="text-[12.5px]"
          fill="#A5F3FC"
        >
          {l}
        </text>
      ))}
    </g>
  )
}

/**
 * Conector. Se dibuja solo y después queda un cometa recorriéndolo.
 * `punta={false}` para los tramos que desembocan en otro tramo: la punta va una
 * sola vez, donde el recorrido termina de verdad.
 */
function Flecha({
  d,
  id,
  paso,
  color = '#22D3EE',
  punta = true,
  etiqueta,
}: {
  d: string
  id: string
  paso: number
  color?: string
  punta?: boolean
  etiqueta?: { x: number; y: number; texto: string }
}) {
  const retraso = retrasoLinea(paso)
  return (
    <g>
      <path
        className="fx-linea"
        style={{ animationDelay: retraso }}
        d={d}
        pathLength={1}
        fill="none"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth={1.5}
        markerEnd={punta ? `url(#${id}-punta)` : undefined}
      />
      {/* El neón son dos trazos del mismo color: uno ancho y translúcido que
          hace de halo, y el brillante encima. Sale más barato que un filtro. */}
      <path
        className="fx-halo"
        style={{ animationDelay: `${(parseFloat(retraso) + 0.4).toFixed(2)}s` }}
        d={d}
        pathLength={1}
        fill="none"
        stroke={color}
        strokeOpacity={0.28}
        strokeWidth={9}
        strokeLinecap="round"
      />
      <path
        className="fx-cometa"
        // Arranca cuando la línea ya terminó de dibujarse.
        style={{ animationDelay: `${(parseFloat(retraso) + 0.4).toFixed(2)}s` }}
        d={d}
        pathLength={1}
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      {etiqueta && (
        <text
          className="fx-caja"
          style={{ animationDelay: retraso }}
          x={etiqueta.x}
          y={etiqueta.y}
          textAnchor="middle"
          fill="rgba(237,237,245,0.75)"
          fontSize={11}
          fontWeight={600}
        >
          {etiqueta.texto}
        </text>
      )}
    </g>
  )
}

/**
 * Marco común. Dispara la secuencia cuando el diagrama entra en pantalla: si
 * arrancara al montar, el usuario se perdería la animación de los diagramas de
 * más abajo, que es justo donde está la explicación.
 */
function Lienzo({
  id,
  titulo,
  alto,
  ancho,
  children,
}: {
  id: string
  titulo: string
  ancho: number
  alto: number
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        // Una sola vez: repetir la secuencia en cada scroll marea.
        if (e.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className={`fx${visible ? ' fx-on' : ''}`}>
      {/* min-w: en un teléfono, dejar que el SVG se encoja al ancho de la
          pantalla vuelve las etiquetas ilegibles. Mejor que conserve un tamaño
          mínimo y que el diagrama, no la página, sea el que se desliza. */}
      <svg
        viewBox={`0 0 ${ancho} ${alto}`}
        role="img"
        aria-label={titulo}
        className="w-full min-w-[600px] font-sans"
        style={{ maxHeight: alto }}
      >
        <title>{titulo}</title>
        <Defs id={id} />
        {children}
      </svg>
    </div>
  )
}

// ── 1. Recorrido de un mensaje ────────────────────────────────────────────────

export interface TextosRecorrido {
  titulo: string
  cliente: string[]
  entrega: string[]
  recibe: string[]
  decision: string[]
  redacta: string[]
  bandeja: string[]
  respuesta: string[]
  si: string
  no: string
}

export function FlujoRecorrido({ t }: { t: TextosRecorrido }) {
  const id = 'recorrido'
  const X = 60 // columna principal
  const XR = 440 // columna de la rama
  const cx = X + ANCHO / 2

  return (
    <Lienzo id={id} titulo={t.titulo} ancho={760} alto={700}>
      <Caja x={X} y={16} lineas={t.cliente} tono="cliente" paso={0} />
      <Flecha id={id} d={`M ${cx} 78 L ${cx} 122`} paso={0} />

      <Caja x={X} y={124} lineas={t.entrega} tono="tercero" paso={1} />
      <Flecha id={id} d={`M ${cx} 186 L ${cx} 230`} paso={1} />

      <Caja x={X} y={232} lineas={t.recibe} paso={2} />
      <Flecha id={id} d={`M ${cx} 294 L ${cx} 330`} paso={2} color="#8B5CF6" />

      <Rombo cx={cx} cy={388} lineas={t.decision} paso={3} />

      {/* Sí: sigue derecho hacia la IA */}
      <Flecha
        id={id}
        d={`M ${cx} 440 L ${cx} 486`}
        paso={4}
        color="#8B5CF6"
        etiqueta={{ x: cx + 16, y: 468, texto: t.si }}
      />
      <Caja x={X} y={488} lineas={t.redacta} paso={4} />
      <Flecha id={id} d={`M ${cx} 550 L ${cx} 596`} paso={5} color="#8B5CF6" />

      {/* No: se va a la bandeja y vuelve a entrar abajo */}
      <Flecha
        id={id}
        d={`M ${X + ANCHO} 388 L ${XR} 388`}
        paso={4}
        color="#E879F9"
        etiqueta={{ x: (X + ANCHO + XR) / 2, y: 376, texto: t.no }}
      />
      <Caja x={XR} y={357} lineas={t.bandeja} tono="persona" paso={5} />
      <Flecha
        id={id}
        d={`M ${XR + ANCHO / 2} 419 L ${XR + ANCHO / 2} 629 L ${X + ANCHO + 4} 629`}
        paso={6}
        color="#E879F9"
      />

      <Caja x={X} y={598} lineas={t.respuesta} tono="cliente" paso={6} />
    </Lienzo>
  )
}

// ── 2. Capas de seguridad ─────────────────────────────────────────────────────

export interface TextosSeguridad {
  titulo: string
  internet: string[]
  meta: string[]
  metaPie: string
  plataforma: string[]
  plataformaPie: string
  nosotros: string[]
  nosotrosPie: string
  destino: string[]
  nota: string[]
}

export function FlujoSeguridad({ t }: { t: TextosSeguridad }) {
  const id = 'seguridad'
  const X = 30
  // Cajas MÁS ANCHAS que en los otros diagramas: cada capa tiene que decir qué
  // te da, no solo cómo se llama, y eso no cabe en 280px.
  const ANCHO_CAPA = 400
  const ALTO_CAPA = 92
  const cx = X + ANCHO_CAPA / 2
  const XN = 460 // columna de la nota lateral

  // La capa de la plataforma es la que responde la pregunta del firewall, así
  // que la nota se ancla a su centro.
  const yPlataforma = 226
  const cyPlataforma = yPlataforma + ALTO_CAPA / 2

  return (
    <Lienzo id={id} titulo={t.titulo} ancho={760} alto={560}>
      <Caja x={X} y={16} lineas={t.internet} tono="cliente" ancho={ANCHO_CAPA} alto={44} paso={0} />
      <Flecha id={id} d={`M ${cx} 60 L ${cx} 96`} paso={0} />

      <Caja
        x={X}
        y={100}
        lineas={t.meta}
        tono="tercero"
        ancho={ANCHO_CAPA}
        alto={ALTO_CAPA}
        operador={t.metaPie}
        paso={1}
      />
      <Flecha id={id} d={`M ${cx} 192 L ${cx} 222`} paso={1} />

      <Caja
        x={X}
        y={yPlataforma}
        lineas={t.plataforma}
        tono="tercero"
        ancho={ANCHO_CAPA}
        alto={ALTO_CAPA}
        operador={t.plataformaPie}
        paso={2}
      />
      <Flecha id={id} d={`M ${cx} 318 L ${cx} 348`} paso={2} color="#8B5CF6" />

      <Caja
        x={X}
        y={352}
        lineas={t.nosotros}
        tono="nuestro"
        ancho={ANCHO_CAPA}
        alto={ALTO_CAPA}
        operador={t.nosotrosPie}
        paso={3}
      />
      <Flecha id={id} d={`M ${cx} 444 L ${cx} 480`} paso={3} color="#8B5CF6" />

      <Caja x={X} y={484} lineas={t.destino} tono="cliente" ancho={ANCHO_CAPA} alto={44} paso={4} />

      {/* La aclaración que responde "¿cuál es su firewall?", apuntando a la capa
          de la plataforma, que es donde vive de verdad. */}
      <Flecha
        id={id}
        d={`M ${XN - 4} ${cyPlataforma} L ${X + ANCHO_CAPA + 6} ${cyPlataforma}`}
        paso={5}
      />
      <g className="fx-caja" style={{ animationDelay: retrasoCaja(5) }}>
        <rect
          x={XN}
          y={cyPlataforma - 52}
          width={272}
          height={104}
          rx={14}
          fill="rgba(255,255,255,0.03)"
          stroke="rgba(255,255,255,0.10)"
          strokeDasharray="4 4"
        />
        {t.nota.map((l, i) => (
          <text
            key={i}
            x={XN + 136}
            y={cyPlataforma - 33 + i * 16}
            textAnchor="middle"
            className="text-[11.5px]"
            fill="rgba(154,154,176,0.95)"
          >
            {l}
          </text>
        ))}
      </g>
    </Lienzo>
  )
}

// ── 3. Fallback entre proveedores de IA ───────────────────────────────────────

export interface TextosFallback {
  titulo: string
  entrada: string[]
  principal: string[]
  respaldo1: string[]
  respaldo2: string[]
  decision: string[]
  humano: string[]
  salida: string[]
  si: string
  no: string
}

export function FlujoFallback({ t }: { t: TextosFallback }) {
  const id = 'fallback'
  const X = 40
  const cx = X + ANCHO / 2
  const BUS = 600 // línea vertical donde se juntan todos los "sí"

  // Tres bloques idénticos (proveedor + "¿respondió?"), uno debajo del otro.
  const bloques = [
    { y: 116, lineas: t.principal },
    { y: 300, lineas: t.respaldo1 },
    { y: 484, lineas: t.respaldo2 },
  ]

  return (
    <Lienzo id={id} titulo={t.titulo} ancho={780} alto={790}>
      <Caja x={X} y={16} lineas={t.entrada} tono="cliente" alto={48} paso={0} />
      <Flecha id={id} d={`M ${cx} 64 L ${cx} 112`} paso={0} />

      {bloques.map((b, i) => {
        const cyRombo = b.y + 62 + 58
        const ultimo = i === bloques.length - 1
        // Cada proveedor ocupa dos pasos: su caja y su rombo.
        const pasoCaja = 1 + i * 2
        const pasoRombo = pasoCaja + 1
        return (
          <g key={i}>
            <Caja x={X} y={b.y} lineas={b.lineas} tono="tercero" paso={pasoCaja} />
            <Flecha id={id} d={`M ${cx} ${b.y + 62} L ${cx} ${cyRombo - 46}`} paso={pasoCaja} />
            <Rombo cx={cx} cy={cyRombo} lineas={t.decision} paso={pasoRombo} rx={120} ry={46} />

            {/* Sí: sale a la derecha hasta el bus. Sin punta: la punta va una
                sola vez, donde el bus entra a la caja de respuesta. */}
            <Flecha
              id={id}
              d={`M ${cx + 120} ${cyRombo} L ${BUS} ${cyRombo}`}
              paso={pasoRombo}
              color="#22D3EE"
              punta={false}
              etiqueta={{ x: cx + 146, y: cyRombo - 10, texto: t.si }}
            />

            {/* No: baja al siguiente proveedor, o a la persona si ya no quedan */}
            <Flecha
              id={id}
              d={`M ${cx} ${cyRombo + 46} L ${cx} ${ultimo ? 698 : b.y + 184}`}
              paso={pasoRombo}
              color={ultimo ? '#E879F9' : '#22D3EE'}
              etiqueta={{ x: cx + 16, y: cyRombo + 68, texto: t.no }}
            />
          </g>
        )
      })}

      {/* El bus: una sola bajada desde el primer "sí" hasta la respuesta. */}
      <Flecha id={id} d={`M ${BUS} ${bloques[0].y + 120} L ${BUS} 698`} paso={7} />

      <Caja x={X} y={702} lineas={t.humano} tono="persona" paso={7} />
      <Caja x={460} y={702} lineas={t.salida} tono="cliente" ancho={280} paso={7} />
    </Lienzo>
  )
}

// ── 4. Una llamada de voz ─────────────────────────────────────────────────────

export interface TextosVoz {
  titulo: string
  cliente: string[]
  entra: string[]
  escucha: string[]
  entiende: string[]
  decision: string[]
  contesta: string[]
  transfiere: string[]
  cierre: string[]
  si: string
  no: string
}

export function FlujoVoz({ t }: { t: TextosVoz }) {
  const id = 'voz'
  const X = 60
  const XR = 440
  const cx = X + ANCHO / 2

  return (
    <Lienzo id={id} titulo={t.titulo} ancho={760} alto={790}>
      <Caja x={X} y={16} lineas={t.cliente} tono="cliente" paso={0} />
      <Flecha id={id} d={`M ${cx} 78 L ${cx} 122`} paso={0} />

      <Caja x={X} y={124} lineas={t.entra} tono="tercero" paso={1} />
      <Flecha id={id} d={`M ${cx} 186 L ${cx} 230`} paso={1} />

      <Caja x={X} y={232} lineas={t.escucha} paso={2} />
      <Flecha id={id} d={`M ${cx} 294 L ${cx} 338`} paso={2} color="#8B5CF6" />

      <Caja x={X} y={340} lineas={t.entiende} paso={3} />
      <Flecha id={id} d={`M ${cx} 402 L ${cx} 438`} paso={3} color="#8B5CF6" />

      <Rombo cx={cx} cy={496} lineas={t.decision} paso={4} />

      {/* Sí: sigue hablando con el cliente */}
      <Flecha
        id={id}
        d={`M ${cx} 548 L ${cx} 594`}
        paso={5}
        color="#8B5CF6"
        etiqueta={{ x: cx + 16, y: 576, texto: t.si }}
      />
      <Caja x={X} y={596} lineas={t.contesta} paso={5} />
      <Flecha id={id} d={`M ${cx} 658 L ${cx} 704`} paso={6} color="#8B5CF6" />

      {/* No: la llamada pasa a una persona y vuelve a caer en el mismo cierre */}
      <Flecha
        id={id}
        d={`M ${X + ANCHO} 496 L ${XR} 496`}
        paso={5}
        color="#E879F9"
        etiqueta={{ x: (X + ANCHO + XR) / 2, y: 484, texto: t.no }}
      />
      <Caja x={XR} y={465} lineas={t.transfiere} tono="persona" paso={6} />
      <Flecha
        id={id}
        d={`M ${XR + ANCHO / 2} 527 L ${XR + ANCHO / 2} 737 L ${X + ANCHO + 4} 737`}
        paso={7}
        color="#E879F9"
      />

      <Caja x={X} y={706} lineas={t.cierre} tono="cliente" paso={7} />
    </Lienzo>
  )
}
