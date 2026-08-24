// Arma el documento imprimible del onboarding a partir de los MISMOS datos que
// muestra la página. No hay una segunda copia del contenido: si mañana cambia
// una respuesta en checklist-yali.ts, cambia el PDF.
//
// Se imprime con el Chrome o el Edge que ya está instalado, en vez de sumar una
// dependencia de 300 MB para generar una hoja.
//
// Uso: node scripts/onboarding-pdf.mjs [carpeta de destino]

import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { homedir, tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

// El origen es un .ts, por eso este script se corre con tsx:
//   npx tsx scripts/onboarding-pdf.mjs
import { GRUPOS_YALI } from '../components/onboarding/checklist-yali.ts'

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
let sinResponder = []

for (const g of GRUPOS_YALI) {
  cuerpo += `<section class="grupo"><h2>${esc(g.titulo)}</h2><p class="intro">${esc(g.intro)}</p>`

  for (const t of g.tareas ?? []) {
    totalPuntos++
    if (t.hecho) listos++
    cuerpo += `<article class="punto ${t.hecho ? 'ok' : 'pendiente'}">
      <h3><span class="marca">${t.hecho ? '&#10003;' : ''}</span>${esc(t.titulo)}
        <em class="quien">${QUIEN[t.quien]}</em>
        <em class="estado">${t.hecho ? 'Listo' : 'Pendiente'}</em>
      </h3>
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
      <h3>${esc(d.pregunta)}${d.respuesta ? '' : '<em class="estado">Falta definir</em>'}</h3>`
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
      <h2>Lo que falta decidir</h2>
      <p class="intro">Son ${sinResponder.length} puntos. Todo lo demás ya quedó definido en la llamada.</p>
      <ul>${sinResponder.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
    </section>`
  : ''

const html = `<!doctype html><html lang="es"><head><meta charset="utf-8">
<title>Puesta en marcha · Yali Hospitality</title>
<style>
  @page { size: letter; margin: 16mm 15mm 14mm; }
  * { box-sizing: border-box; }
  body {
    margin: 0; color: #16161d; background: #fff;
    font: 10.5pt/1.5 "Segoe UI", system-ui, sans-serif;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
  h1 { font-size: 21pt; margin: 0 0 4px; letter-spacing: -.4px; }
  .sub { color: #5b5b66; font-size: 10pt; margin: 0 0 2px; }
  .marco { border-left: 3px solid #7c3aed; padding-left: 12px; margin-bottom: 22px; }
  .aviso { background: #f6f4ff; border: 1px solid #ded7fb; border-radius: 7px;
           padding: 10px 13px; font-size: 9.8pt; color: #3f3a52; margin: 14px 0 24px; }
  .grupo { break-inside: auto; margin-bottom: 22px; }
  h2 { font-size: 13.5pt; margin: 0 0 3px; padding-bottom: 5px;
       border-bottom: 1.5px solid #16161d; break-after: avoid; }
  .intro { color: #5b5b66; font-size: 9.6pt; margin: 6px 0 12px; break-after: avoid; }
  .punto { break-inside: avoid; page-break-inside: avoid; margin-bottom: 13px;
           padding-bottom: 11px; border-bottom: 1px solid #ececf1; }
  .punto:last-child { border-bottom: 0; }
  h3 { font-size: 10.8pt; margin: 0 0 4px; font-weight: 650; }
  .marca { color: #15803d; font-weight: 700; margin-right: 6px; }
  .quien, .estado { font-style: normal; font-size: 8pt; font-weight: 600;
    text-transform: uppercase; letter-spacing: .04em; margin-left: 8px;
    padding: 1.5px 6px; border-radius: 4px; vertical-align: 1.5px; white-space: nowrap; }
  .quien { color: #4a4a56; background: #f1f1f5; }
  .estado { color: #7a5b00; background: #fdf3d4; }
  .ok .estado { color: #14532d; background: #dcfce7; }
  .porque { color: #5b5b66; font-size: 9.6pt; margin: 0 0 6px; }
  ol { margin: 0 0 7px; padding-left: 17px; color: #5b5b66; font-size: 9.6pt; }
  li { margin-bottom: 2px; }
  .respuesta { background: #f7f8fa; border-left: 2.5px solid #0891b2;
               padding: 8px 12px; border-radius: 0 6px 6px 0; }
  .respuesta p { margin: 0 0 5px; }
  .respuesta p:last-child { margin-bottom: 0; }
  .vacio { background: #fffaf0; border-left: 2.5px solid #d97706;
           padding: 8px 12px; border-radius: 0 6px 6px 0; color: #92400e; }
  .vacio p { margin: 0; font-size: 9.6pt; }
  .etiqueta { display: block; font-size: 8pt; font-weight: 700; text-transform: uppercase;
              letter-spacing: .05em; color: #6b7280; margin-bottom: 4px; }
  .falta { break-inside: avoid; }
  .falta h2 { border-bottom-color: #d97706; }
  .falta ul { margin: 0; padding-left: 17px; font-size: 9.8pt; }
  .falta li { margin-bottom: 4px; }
  footer { margin-top: 26px; padding-top: 10px; border-top: 1px solid #ececf1;
           color: #7a7a86; font-size: 8.8pt; }
</style></head><body>
  <div class="marco">
    <h1>Puesta en marcha de Yali Hospitality</h1>
    <p class="sub">Lo que se acordó en la llamada del ${FECHA_LLAMADA}</p>
    <p class="sub">MiAgentIA · ${listos} de ${totalPuntos} accesos listos</p>
  </div>
  <p class="aviso"><strong>Esto no hay que llenarlo.</strong> Ya está escrito con lo que se
  habló en la llamada. Lo que necesitamos es que lo lean, corrijan lo que haya quedado mal y
  completen los puntos marcados en naranja, que son los que quedaron sin definir. Con eso
  armamos a Sofía tal cual.</p>
  ${cuerpo}
  ${pendientes}
  <footer>Documento interno de Yali Hospitality y MiAgentIA. Generado del checklist de puesta en marcha.</footer>
</body></html>`

const destino = process.argv[2] || join(homedir(), 'Downloads')
if (!existsSync(destino)) mkdirSync(destino, { recursive: true })

// GUARDAR_HTML deja el intermedio para poder revisar la maquetacion sin tener
// que abrir el PDF. El PDF sale del MISMO archivo, asi que lo que se ve ahi es
// exactamente lo que se imprime.
const temporal = process.env.GUARDAR_HTML || join(tmpdir(), `onboarding-yali-${process.pid}.html`)
writeFileSync(temporal, html, 'utf8')

const pdf = join(destino, 'Puesta en marcha - Yali Hospitality.pdf')
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
// nunca se escribe.
const perfil = join(tmpdir(), `perfil-pdf-${process.pid}`)
try {
  execFileSync(navegadores[0], [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    `--user-data-dir=${perfil}`,
    '--no-pdf-header-footer',
    `--print-to-pdf=${pdf}`,
    pathToFileURL(temporal).href,
  ], { stdio: 'pipe', timeout: 120000 })
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
