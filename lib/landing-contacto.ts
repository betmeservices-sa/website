import { readFileSync } from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'

// Contacto de las landings de conferencia (public/sandra.html, public/andrea.html).
//
// UNA SOLA FUENTE: los datos de cada persona viven en el CONFIG.contact de su
// HTML, que es lo que se edita al hacer o corregir la landing. El .vcf de
// /<persona>/contacto.vcf se arma en el build leyendo ese mismo CONFIG, así que
// cambiar el teléfono en el HTML cambia también el archivo del contacto.
//
// El formato es copia exacta del buildVcf() que trae cada HTML: el archivo que
// abre el iPhone es idéntico al que la página armaría por su cuenta.

type Contacto = {
  firstName: string
  lastName: string
  org?: string
  title?: string
  phoneMobile?: string
  phoneWhatsapp?: string
  email?: string
  url?: string
  note?: string
}

// Saca el objeto de `var CONFIG = { ... }` respetando cadenas y comentarios, y
// lo evalúa aislado (solo trae literales). Corre en el build, sobre archivos
// del propio repo.
function configDe(html: string, archivo: string): { contact: Contacto } {
  const inicio = html.indexOf('var CONFIG')
  const abre = inicio < 0 ? -1 : html.indexOf('{', inicio)
  if (abre < 0) throw new Error(`${archivo}: no tiene "var CONFIG = { ... }"`)
  let nivel = 0
  let cadena = ''
  for (let i = abre; i < html.length; i++) {
    const ch = html[i]
    if (cadena) {
      if (ch === '\\') i++
      else if (ch === cadena) cadena = ''
    } else if (ch === '"' || ch === "'" || ch === '`') {
      cadena = ch
    } else if (ch === '/' && html[i + 1] === '/') {
      const fin = html.indexOf('\n', i)
      if (fin < 0) break
      i = fin
    } else if (ch === '/' && html[i + 1] === '*') {
      const fin = html.indexOf('*/', i + 2)
      if (fin < 0) break
      i = fin + 1
    } else if (ch === '{') {
      nivel++
    } else if (ch === '}' && --nivel === 0) {
      return vm.runInNewContext(`(${html.slice(abre, i + 1)})`, Object.create(null), { timeout: 1000 })
    }
  }
  throw new Error(`${archivo}: el CONFIG no cierra`)
}

function esc(s: unknown) {
  return String(s || '')
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;')
}

function vcardDe(c: Contacto) {
  const L = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:' + esc(c.lastName) + ';' + esc(c.firstName) + ';;;',
    'FN:' + esc(c.firstName + ' ' + c.lastName),
    'ORG:' + esc(c.org),
    'TITLE:' + esc(c.title),
    'TEL;TYPE=CELL,VOICE:' + c.phoneMobile,
  ]
  if (c.phoneWhatsapp && c.phoneWhatsapp !== c.phoneMobile) L.push('TEL;TYPE=WORK,VOICE:' + c.phoneWhatsapp)
  L.push('EMAIL;TYPE=INTERNET,WORK:' + c.email, 'URL:' + c.url, 'NOTE:' + esc(c.note), 'END:VCARD')
  // El vCard pide CRLF.
  return L.join('\r\n') + '\r\n'
}

// Respuesta del .vcf para el HTML indicado (ruta dentro de public/). Se sirve
// inline y como text/vcard: así Safari en iPhone abre la ficha con "Crear
// contacto nuevo" en vez de bajar un archivo.
export function respuestaVcard(htmlEnPublic: string) {
  const archivo = path.join(process.cwd(), 'public', htmlEnPublic)
  const c = configDe(readFileSync(archivo, 'utf8'), htmlEnPublic).contact
  // Nombre de archivo en ASCII (sin tildes) para que la cabecera no dependa
  // de cómo cada navegador decodifica caracteres especiales.
  const nombre = `${c.firstName}-${c.lastName}`
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^A-Za-z0-9]+/g, '-')
  return new Response(vcardDe(c), {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': `inline; filename="${nombre}.vcf"`,
    },
  })
}
