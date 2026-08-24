// Imprime el documento del kickoff a PDF con el Chrome o el Edge que ya está
// instalado, en vez de sumar una dependencia de 300 MB para generar una hoja.
//
// El contenido y los estilos viven en kickoff-html.mjs, que es el mismo origen
// del que sale la versión de Word.
//
// Uso: npx tsx scripts/kickoff-pdf.mjs [carpeta de destino]

import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { homedir, tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

import { CLIENTE, construirDocumento } from './kickoff-html.mjs'

const { html, listos, totalPuntos, sinDefinir } = construirDocumento()

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
console.log(`${listos} de ${totalPuntos} accesos listos · ${sinDefinir} puntos sin definir`)
