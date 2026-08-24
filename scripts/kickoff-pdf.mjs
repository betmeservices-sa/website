// Arma el documento imprimible del kickoff a partir de los MISMOS datos que
// muestra la página. No hay una segunda copia del contenido: si mañana cambia
// una respuesta en checklist-yali.ts, cambia el PDF.
//
// Va con la identidad del sitio (negro, cian, violeta, magenta) y no con la
// típica hoja blanca. Eso obliga a dos cosas: margen de página en cero, porque
// si no Chrome deja un marco blanco alrededor del fondo negro, y
// print-color-adjust exacto, porque por defecto el navegador tira los fondos a
// la basura al imprimir.
//
// Se imprime con el Chrome o el Edge que ya está instalado, en vez de sumar una
// dependencia de 300 MB para generar una hoja.
//
// Uso: npx tsx scripts/kickoff-pdf.mjs [carpeta de destino]

import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { homedir, tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

// El origen es un .ts, por eso este script se corre con tsx.
import { GRUPOS_YALI } from '../components/onboarding/checklist-yali.ts'

const CLIENTE = 'Yali Hospitality'
const FECHA_LLAMADA = '24 de agosto de 2026'
const QUIEN = {
  ellos: 'Lo hacen ustedes',
  nosotros: 'Lo hacemos nosotros',
  juntos: 'Lo definimos juntos',
}

const esc = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

// Los saltos de línea de las respuestas son parte del contenido: separan
// bloques ("RESUELVE SOLA:" / "PASA A RESERVAS:") y se pierden si se colapsan.
const parrafos = (s = '') =>
  esc(s)
    .split('\n')
    .filter((l) => l.trim())
    .map((l) => `<p>${l}</p>`)
    .join('')

let cuerpo = ''
let totalPuntos = 0
let listos = 0
const sinResponder = []

for (const g of GRUPOS_YALI) {
  cuerpo += `<section class="grupo">
    <div class="cabecera">
      <h2>${esc(g.titulo)}</h2>
      ${g.urgente ? '<span class="chip">Primero esto</span>' : ''}
    </div>
    <p class="intro">${esc(g.intro)}</p>`

  for (const t of g.tareas ?? []) {
    totalPuntos++
    if (t.hecho) listos++
    cuerpo += `<article class="punto ${t.hecho ? 'ok' : 'pendiente'}">
      <h3><span class="marca">${t.hecho ? '&#10003;' : '&bull;'}</span>${esc(t.titulo)}</h3>
      <div class="etiquetas">
        <span class="quien">${QUIEN[t.quien]}</span>
        <span class="estado">${t.hecho ? 'Listo' : 'Pendiente'}</span>
      </div>
      <p class="porque">${esc(t.porque)}</p>`
    if (t.pasos?.length) {
      cuerpo += `<ol>${t.pasos.map((x) => `<li>${esc(x)}</li>`).join('')}</ol>`
    }
    if (t.respuesta) {
      cuerpo += `<div class="respuesta"><span class="etiqueta">${esc(t.nota ?? 'Cómo quedó')}</span>${parrafos(t.respuesta)}</div>`
    } else if (t.nota) {
      sinResponder.push(t.nota)
      cuerpo += `<div class="vacio"><span class="etiqueta">${esc(t.nota)}</span><p>Falta esta respuesta.</p></div>`
    }
    cuerpo += `</article>`
  }

  for (const d of g.decisiones ?? []) {
    cuerpo += `<article class="punto ${d.respuesta ? '' : 'pendiente'}">
      <h3>${esc(d.pregunta)}</h3>
      ${d.respuesta ? '' : '<div class="etiquetas"><span class="estado">Falta definir</span></div>'}`
    if (d.pista) cuerpo += `<p class="porque">${esc(d.pista)}</p>`
    if (d.respuesta) {
      cuerpo += `<div class="respuesta">${parrafos(d.respuesta)}</div>`
    } else {
      sinResponder.push(d.pregunta)
      cuerpo += `<div class="vacio"><p>Falta esta respuesta.</p></div>`
    }
    cuerpo += `</article>`
  }
  cuerpo += `</section>`
}

const pendientes = sinResponder.length
  ? `<section class="grupo falta">
      <div class="cabecera"><h2>Lo que falta decidir</h2></div>
      <p class="intro">Son ${sinResponder.length} puntos. Todo lo demás ya quedó definido en la llamada.</p>
      <ul>${sinResponder.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
    </section>`
  : ''

const html = `<!doctype html><html lang="es"><head><meta charset="utf-8">
<title>Kickoff · ${CLIENTE}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
<style>
  /* Margen cero: es lo unico que deja que el negro llegue al borde de la hoja.
     El aire lo pone el padding de .hoja, que se mantiene pagina tras pagina. */
  @page { size: letter; margin: 0; }

  :root {
    --bg: #05050A;
    --bg-card: #0D0D18;
    --line: rgba(255,255,255,0.08);
    --ink: #EDEDF5;
    --muted: #9A9AB0;
    --cyan: #22D3EE;
    --cyan-soft: #67E8F9;
    --magenta: #E879F9;
    --grad: linear-gradient(120deg, #22D3EE 0%, #8B5CF6 48%, #E879F9 100%);
  }

  * { box-sizing: border-box; }

  html, body {
    margin: 0; padding: 0;
    background: var(--bg); color: var(--ink);
    font-family: Inter, "Segoe UI", system-ui, sans-serif;
    font-size: 10.2pt; line-height: 1.55;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }

  .hoja { padding: 14mm 13mm; }

  /* ---- portada ---- */
  .portada {
    position: relative; overflow: hidden;
    border: 1px solid var(--line); border-radius: 20px;
    background: var(--bg-card);
    padding: 26px 26px 24px; margin-bottom: 20px;
  }
  .portada::before {
    content: ''; position: absolute; left: 0; right: 0; top: 0; height: 2px;
    background: var(--grad);
  }
  .aurora {
    position: absolute; width: 320px; height: 320px; border-radius: 50%;
    background: radial-gradient(circle, rgba(139,92,246,0.32), transparent 62%);
    top: -175px; right: -85px;
  }
  .aurora.dos {
    background: radial-gradient(circle, rgba(34,211,238,0.20), transparent 62%);
    top: auto; bottom: -195px; right: auto; left: -110px; width: 290px; height: 290px;
  }
  .portada > *:not(.aurora) { position: relative; }
  .marca-arriba {
    font-size: 8pt; font-weight: 600; text-transform: uppercase;
    letter-spacing: .16em; color: var(--cyan-soft); margin: 0 0 12px;
  }
  h1 {
    font-family: "Space Grotesk", Inter, system-ui, sans-serif;
    font-size: 27pt; font-weight: 700; line-height: 1.06; letter-spacing: -.5px;
    margin: 0 0 12px;
  }
  .grad {
    background: var(--grad);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .sub { color: var(--muted); font-size: 10pt; margin: 0; }
  .contador { margin-top: 16px; }
  .dato {
    display: inline-block; margin-right: 8px;
    border: 1px solid var(--line); border-radius: 999px;
    padding: 4px 12px; font-size: 8.6pt; font-weight: 600; color: var(--ink);
    background: rgba(255,255,255,0.03);
  }
  .dato b { color: var(--cyan-soft); }
  .dato.falta b { color: var(--magenta); }

  .aviso {
    border: 1px solid rgba(139,92,246,0.30); border-radius: 14px;
    background: rgba(139,92,246,0.09);
    padding: 13px 16px; font-size: 9.6pt; color: #CFC9E8; margin: 0 0 22px;
  }
  .aviso strong { color: var(--ink); }

  /* ---- secciones ---- */
  .grupo { margin-bottom: 22px; }
  .cabecera {
    padding-bottom: 7px; margin-bottom: 8px;
    border-bottom: 1px solid var(--line);
    break-after: avoid;
  }
  h2 {
    display: inline; font-family: "Space Grotesk", Inter, system-ui, sans-serif;
    font-size: 15pt; font-weight: 600; letter-spacing: -.2px; margin: 0;
  }
  .chip {
    margin-left: 9px; vertical-align: 2px;
    border: 1px solid rgba(34,211,238,0.35); border-radius: 999px;
    padding: 2px 9px; font-size: 7.6pt; font-weight: 700;
    text-transform: uppercase; letter-spacing: .07em; color: var(--cyan-soft);
  }
  .intro { color: var(--muted); font-size: 9.4pt; margin: 0 0 12px; break-after: avoid; }

  /* ---- puntos ---- */
  .punto {
    position: relative; overflow: hidden;
    break-inside: avoid; page-break-inside: avoid;
    border: 1px solid var(--line); border-radius: 16px;
    background: var(--bg-card);
    padding: 15px 17px; margin-bottom: 10px;
  }
  .punto::before {
    content: ''; position: absolute; left: 0; right: 0; top: 0; height: 1px;
    background: var(--grad); opacity: .45;
  }
  .punto.pendiente::before { opacity: .85; }
  h3 {
    font-family: "Space Grotesk", Inter, system-ui, sans-serif;
    font-size: 11.4pt; font-weight: 600; margin: 0 0 7px; letter-spacing: -.1px;
  }
  .marca { font-weight: 700; margin-right: 8px; color: var(--cyan); }
  .pendiente .marca { color: var(--magenta); }
  .etiquetas { margin: 0 0 8px; }
  .quien, .estado {
    display: inline-block; margin-right: 6px;
    font-size: 7.6pt; font-weight: 700; text-transform: uppercase;
    letter-spacing: .07em; padding: 2.5px 8px; border-radius: 999px;
    border: 1px solid var(--line); color: var(--muted);
  }
  .ok .estado { color: var(--cyan-soft); border-color: rgba(34,211,238,0.35); }
  .pendiente .estado { color: var(--magenta); border-color: rgba(232,121,249,0.35); }
  .porque { color: var(--muted); font-size: 9.4pt; margin: 0 0 8px; }
  ol { margin: 0 0 9px; padding-left: 18px; color: var(--muted); font-size: 9.4pt; }
  ol li { margin-bottom: 3px; }
  ol li::marker { color: var(--cyan); font-weight: 600; }

  .respuesta {
    border-left: 2px solid var(--cyan);
    background: rgba(255,255,255,0.035);
    border-radius: 0 10px 10px 0; padding: 10px 14px;
  }
  .respuesta p { margin: 0 0 6px; }
  .respuesta p:last-child { margin-bottom: 0; }
  .vacio {
    border-left: 2px solid var(--magenta);
    background: rgba(232,121,249,0.08);
    border-radius: 0 10px 10px 0; padding: 10px 14px; color: #F0C7F7;
  }
  .vacio p { margin: 0; font-size: 9.4pt; }
  .etiqueta {
    display: block; font-size: 7.6pt; font-weight: 700; text-transform: uppercase;
    letter-spacing: .09em; color: var(--muted); margin-bottom: 5px;
  }

  /* ---- cierre ---- */
  .falta { break-inside: avoid; }
  .falta .cabecera { border-bottom-color: rgba(232,121,249,0.35); }
  .falta ul {
    margin: 0; padding: 15px 17px 15px 34px; font-size: 9.8pt;
    border: 1px solid rgba(232,121,249,0.25); border-radius: 16px;
    background: rgba(232,121,249,0.06);
  }
  .falta li { margin-bottom: 5px; }
  .falta li::marker { color: var(--magenta); }
  .falta li:last-child { margin-bottom: 0; }

  footer {
    margin-top: 22px; padding-top: 12px; border-top: 1px solid var(--line);
    color: #6E6E80; font-size: 8.4pt;
  }
</style></head><body><div class="hoja">
  <header class="portada">
    <div class="aurora"></div>
    <div class="aurora dos"></div>
    <p class="marca-arriba">MiAgentIA &middot; kickoff</p>
    <h1>Kickoff de<br><span class="grad">${esc(CLIENTE)}</span></h1>
    <p class="sub">Lo que se acordó en la llamada del ${FECHA_LLAMADA}</p>
    <div class="contador">
      <span class="dato"><b>${listos}</b> de ${totalPuntos} accesos listos</span>
      <span class="dato falta"><b>${sinResponder.length}</b> puntos sin definir</span>
    </div>
  </header>

  <p class="aviso"><strong>Esto no hay que llenarlo.</strong> Ya está escrito con lo que se
  habló en la llamada. Lo que necesitamos es que lo lean, corrijan lo que haya quedado mal y
  completen los puntos marcados en magenta, que son los que quedaron sin definir. Con eso
  armamos a Sofía tal cual.</p>

  ${cuerpo}
  ${pendientes}
  <footer>Documento interno de ${esc(CLIENTE)} y MiAgentIA. Generado del checklist de kickoff.</footer>
</div></body></html>`

const destino = process.argv[2] || join(homedir(), 'Downloads')
if (!existsSync(destino)) mkdirSync(destino, { recursive: true })

// GUARDAR_HTML deja el intermedio para poder revisar la maquetacion sin tener
// que abrir el PDF. El PDF sale del MISMO archivo, asi que lo que se ve ahi es
// exactamente lo que se imprime.
const temporal = process.env.GUARDAR_HTML || join(tmpdir(), `kickoff-yali-${process.pid}.html`)
writeFileSync(temporal, html, 'utf8')

const pdf = join(destino, `Kickoff - ${CLIENTE}.pdf`)
const navegadores = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
].filter((p) => existsSync(p))

if (!navegadores.length) {
  console.error('No encontré Chrome ni Edge. El HTML quedó en:', temporal)
  process.exit(1)
}

// Perfil aparte: sin esto, un Chrome ya abierto se roba el proceso y el PDF
// nunca se escribe. El presupuesto de tiempo virtual es para que le alcance a
// bajar las fuentes antes de imprimir.
const perfil = join(tmpdir(), `perfil-pdf-${process.pid}`)
try {
  execFileSync(navegadores[0], [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    `--user-data-dir=${perfil}`,
    '--virtual-time-budget=10000',
    '--no-pdf-header-footer',
    `--print-to-pdf=${pdf}`,
    pathToFileURL(temporal).href,
  ], { stdio: 'pipe', timeout: 180000 })
} finally {
  rmSync(perfil, { recursive: true, force: true })
  if (!process.env.GUARDAR_HTML) rmSync(temporal, { force: true })
}

if (!existsSync(pdf)) {
  console.error('El navegador no escribió el PDF.')
  process.exit(1)
}
console.log('PDF:', pdf)
console.log(`${listos} de ${totalPuntos} accesos listos · ${sinResponder.length} puntos sin definir`)
