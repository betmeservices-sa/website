// Flujogramas de la página "Cómo funciona".
//
// SVG escrito a mano, sin librerías: son tres diagramas fijos, y una librería
// de grafos pesaría más que ellos. Cada uno lleva su viewBox y escala solo, así
// que en el teléfono se leen sin scroll horizontal.
//
// Los textos NO viven aquí: entran por props desde cada ruta, que es lo que
// permite tener la página en español y en inglés sin duplicar el dibujo.
//
// SVG no corta el texto en varias líneas por su cuenta, por eso cada etiqueta
// es un arreglo de líneas y no una cadena suelta.

type Tono = 'cliente' | 'nuestro' | 'tercero' | 'persona'

const TONOS: Record<Tono, { borde: string; fondo: string; texto: string }> = {
  // Lo que pasa del lado del cliente o de las plataformas: cian.
  cliente: { borde: 'rgba(34,211,238,0.45)', fondo: 'rgba(34,211,238,0.08)', texto: '#67E8F9' },
  // Lo que hace nuestro sistema: violeta.
  nuestro: { borde: 'rgba(139,92,246,0.5)', fondo: 'rgba(139,92,246,0.10)', texto: '#C4B5FD' },
  // Piezas de terceros (Meta, los proveedores de IA): gris con poco brillo, para
  // que se distingan de lo nuestro de un vistazo.
  tercero: { borde: 'rgba(255,255,255,0.14)', fondo: 'rgba(255,255,255,0.03)', texto: '#9A9AB0' },
  // Cuando entra una persona de carne y hueso: magenta.
  persona: { borde: 'rgba(232,121,249,0.5)', fondo: 'rgba(232,121,249,0.10)', texto: '#F5D0FE' },
}

/** Defs compartidos: las puntas de flecha tienen que existir dentro de cada SVG. */
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
  tono = 'nuestro',
  ancho = ANCHO,
  alto = ALTO,
  operador,
}: {
  x: number
  y: number
  lineas: string[]
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
  const desplace = operador ? -9 : 0
  const inicio = y + alto / 2 - ((lineas.length - 1) * 15) / 2 + 5 + desplace
  return (
    <g>
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
  rx = 132,
  ry = 52,
}: {
  cx: number
  cy: number
  lineas: string[]
  rx?: number
  ry?: number
}) {
  const inicio = cy - ((lineas.length - 1) * 15) / 2 + 5
  return (
    <g>
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

function Flecha({ d, id, etiqueta }: { d: string; id: string; etiqueta?: { x: number; y: number; texto: string } }) {
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth={1.5}
        markerEnd={`url(#${id}-punta)`}
      />
      {etiqueta && (
        <text
          x={etiqueta.x}
          y={etiqueta.y}
          textAnchor="middle"
          className="text-[11px] font-semibold"
          fill="rgba(237,237,245,0.75)"
        >
          {etiqueta.texto}
        </text>
      )}
    </g>
  )
}

/** Marco común: título accesible + SVG que escala al ancho disponible. */
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
  return (
    // min-w: en un teléfono, dejar que el SVG se encoja al ancho de la pantalla
    // vuelve las etiquetas ilegibles. Mejor que conserve un tamaño mínimo y que
    // el diagrama, no la página, sea el que se desliza de lado.
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
      <Caja x={X} y={16} lineas={t.cliente} tono="cliente" />
      <Flecha id={id} d={`M ${cx} 78 L ${cx} 122`} />

      <Caja x={X} y={124} lineas={t.entrega} tono="tercero" />
      <Flecha id={id} d={`M ${cx} 186 L ${cx} 230`} />

      <Caja x={X} y={232} lineas={t.recibe} />
      <Flecha id={id} d={`M ${cx} 294 L ${cx} 330`} />

      <Rombo cx={cx} cy={388} lineas={t.decision} />

      {/* Sí: sigue derecho hacia la IA */}
      <Flecha
        id={id}
        d={`M ${cx} 440 L ${cx} 486`}
        etiqueta={{ x: cx + 16, y: 468, texto: t.si }}
      />
      <Caja x={X} y={488} lineas={t.redacta} />
      <Flecha id={id} d={`M ${cx} 550 L ${cx} 596`} />

      {/* No: se va a la bandeja y vuelve a entrar abajo */}
      <Flecha
        id={id}
        d={`M ${X + ANCHO} 388 L ${XR} 388`}
        etiqueta={{ x: (X + ANCHO + XR) / 2, y: 376, texto: t.no }}
      />
      <Caja x={XR} y={357} lineas={t.bandeja} tono="persona" />
      <Flecha id={id} d={`M ${XR + ANCHO / 2} 419 L ${XR + ANCHO / 2} 629 L ${X + ANCHO + 4} 629`} />

      <Caja x={X} y={598} lineas={t.respuesta} tono="cliente" />
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
  const X = 60
  const cx = X + ANCHO / 2
  const ALTO_CAPA = 78 // más alta que las demás: lleva el "quién lo opera" dentro
  const XN = 410 // columna de la nota lateral

  // La capa de la plataforma es la que responde la pregunta del firewall, así
  // que la nota se ancla a su centro.
  const yPlataforma = 214
  const cyPlataforma = yPlataforma + ALTO_CAPA / 2

  return (
    <Lienzo id={id} titulo={t.titulo} ancho={760} alto={512}>
      <Caja x={X} y={16} lineas={t.internet} tono="cliente" alto={44} />
      <Flecha id={id} d={`M ${cx} 60 L ${cx} 94`} />

      <Caja x={X} y={98} lineas={t.meta} tono="tercero" alto={ALTO_CAPA} operador={t.metaPie} />
      <Flecha id={id} d={`M ${cx} 176 L ${cx} 210`} />

      <Caja
        x={X}
        y={yPlataforma}
        lineas={t.plataforma}
        tono="tercero"
        alto={ALTO_CAPA}
        operador={t.plataformaPie}
      />
      <Flecha id={id} d={`M ${cx} 292 L ${cx} 326`} />

      <Caja
        x={X}
        y={330}
        lineas={t.nosotros}
        tono="nuestro"
        alto={ALTO_CAPA}
        operador={t.nosotrosPie}
      />
      <Flecha id={id} d={`M ${cx} 408 L ${cx} 442`} />

      <Caja x={X} y={446} lineas={t.destino} tono="cliente" alto={44} />

      {/* La aclaración que responde "¿cuál es su firewall?", apuntando a la capa
          de la plataforma, que es donde vive de verdad. */}
      <Flecha id={id} d={`M ${XN - 4} ${cyPlataforma} L ${X + ANCHO + 6} ${cyPlataforma}`} />
      <g>
        <rect
          x={XN}
          y={cyPlataforma - 43}
          width={290}
          height={86}
          rx={14}
          fill="rgba(255,255,255,0.03)"
          stroke="rgba(255,255,255,0.10)"
          strokeDasharray="4 4"
        />
        {t.nota.map((l, i) => (
          <text
            key={i}
            x={XN + 145}
            y={cyPlataforma - 24 + i * 16}
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
      <Caja x={X} y={16} lineas={t.entrada} tono="cliente" alto={48} />
      <Flecha id={id} d={`M ${cx} 64 L ${cx} 112`} />

      {bloques.map((b, i) => {
        const cyRombo = b.y + 62 + 58
        const ultimo = i === bloques.length - 1
        return (
          <g key={i}>
            <Caja x={X} y={b.y} lineas={b.lineas} tono="tercero" />
            <Flecha id={id} d={`M ${cx} ${b.y + 62} L ${cx} ${cyRombo - 46}`} />
            <Rombo cx={cx} cy={cyRombo} lineas={t.decision} rx={120} ry={46} />

            {/* Sí: sale a la derecha hasta el bus. SIN punta: la punta va una
                sola vez, donde el bus entra a la caja de respuesta. Ponerla acá
                dejaba flechas huérfanas apuntando a mitad de la línea. */}
            <path
              d={`M ${cx + 120} ${cyRombo} L ${BUS} ${cyRombo}`}
              fill="none"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth={1.5}
            />
            <text
              x={cx + 146}
              y={cyRombo - 10}
              textAnchor="middle"
              className="text-[11px] font-semibold"
              fill="rgba(237,237,245,0.75)"
            >
              {t.si}
            </text>

            {/* No: baja al siguiente proveedor, o a la persona si ya no quedan */}
            <Flecha
              id={id}
              d={`M ${cx} ${cyRombo + 46} L ${cx} ${ultimo ? 698 : b.y + 184}`}
              etiqueta={{ x: cx + 16, y: cyRombo + 68, texto: t.no }}
            />
          </g>
        )
      })}

      {/* El bus: una sola bajada desde el primer "sí" hasta la respuesta. */}
      <Flecha id={id} d={`M ${BUS} ${bloques[0].y + 120} L ${BUS} 698`} />

      <Caja x={X} y={702} lineas={t.humano} tono="persona" />
      <Caja x={460} y={702} lineas={t.salida} tono="cliente" ancho={280} />
    </Lienzo>
  )
}
