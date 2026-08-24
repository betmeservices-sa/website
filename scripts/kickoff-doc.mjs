// Genera la versión editable del kickoff, en .docx de verdad.
//
// No es el truco de renombrar un HTML a .doc: eso abre en Word pero se rompe al
// reenviarlo y Google Docs lo importa mal. Acá lo convierte el propio Word, que
// ya está instalado en esta máquina, así que el archivo que sale es un .docx
// legítimo y se puede editar y comentar como cualquier otro.
//
// Si Word no estuviera, se avisa y queda el .htm, que Word abre igual.
//
// Uso: npx tsx scripts/kickoff-doc.mjs [carpeta de destino]

import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { homedir, tmpdir } from 'node:os'
import { join } from 'node:path'

import { CLIENTE, construirDocumento } from './kickoff-html.mjs'

const { html, listos, totalPuntos, sinDefinir } = construirDocumento({ word: true })

const destino = process.argv[2] || join(homedir(), 'Downloads')
if (!existsSync(destino)) mkdirSync(destino, { recursive: true })

// Extension .htm y no .html: es la que Word reconoce sin preguntar de que
// formato es el archivo al abrirlo.
const temporal = join(tmpdir(), `kickoff-yali-${process.pid}.htm`)
writeFileSync(temporal, html, 'utf8')

const docx = join(destino, `Kickoff - ${CLIENTE}.docx`)

// SaveAs2 con formato 16 es wdFormatDocumentDefault, o sea .docx.
// DisplayAlerts en cero para que no se cuelgue esperando un cuadro de dialogo,
// porque el proceso corre sin nadie mirando.
const ps = `
$ErrorActionPreference = 'Stop'
$word = $null
try {
  $word = New-Object -ComObject Word.Application
  $word.Visible = $false
  $word.DisplayAlerts = 0
  $doc = $word.Documents.Open('${temporal.replace(/'/g, "''")}', $false, $true)
  $doc.SaveAs2('${docx.replace(/'/g, "''")}', 16)
  $doc.Close()
  'ok'
} finally {
  # Sin parentesis vacios PowerShell se queja de que Quit espera una referencia.
  if ($word) { $word.Quit() }
}
`

try {
  execFileSync('powershell.exe', ['-NoProfile', '-NonInteractive', '-Command', ps], {
    stdio: 'pipe',
    timeout: 180000,
  })
} catch (e) {
  const salida = join(destino, `Kickoff - ${CLIENTE}.htm`)
  writeFileSync(salida, html, 'utf8')
  console.error('Word no pudo convertirlo:', e.stderr?.toString().trim() || e.message)
  console.error('Queda el archivo que Word abre igual:', salida)
  rmSync(temporal, { force: true })
  process.exit(1)
} finally {
  rmSync(temporal, { force: true })
}

if (!existsSync(docx)) {
  console.error('Word no escribió el documento.')
  process.exit(1)
}
console.log('DOCX:', docx)
console.log(`${listos} de ${totalPuntos} accesos listos · ${sinDefinir} puntos sin definir`)
