/**
 * Edita un documento protegido de `public/` sin romper el cifrado.
 *
 * Los documentos privados (propuestas, portales) van cifrados en el HTML:
 * PBKDF2-SHA256 250k + AES-256-GCM, y el navegador los abre con la contraseña.
 * Para cambiar una línea hay que descifrar, editar y volver a cifrar; hacerlo a
 * mano es la forma más rápida de dejar un archivo que ya no abre.
 *
 * Este script hace el viaje completo y VERIFICA el resultado antes de escribir:
 * vuelve a descifrar lo que acaba de cifrar y compara. Si no cuadra, no toca el
 * archivo.
 *
 * Uso:
 *   node scripts/editar-protegido.mjs <archivo> <contraseña> --ver
 *   node scripts/editar-protegido.mjs <archivo> <contraseña> --buscar "texto"
 *   node scripts/editar-protegido.mjs <archivo> <contraseña> --cambiar "viejo" "nuevo"
 */
import fs from "node:fs";
import crypto from "node:crypto";

const [archivo, password, modo, a, b] = process.argv.slice(2);
if (!archivo || !password || !modo) {
  console.error("faltan argumentos. Ver el encabezado del script.");
  process.exit(1);
}

const html = fs.readFileSync(archivo, "utf8");
const m = html.match(/CFG\s*=\s*(\{[\s\S]*?\})\s*[;,]/);
if (!m) {
  console.error("no se encontró el bloque CFG: ¿es un documento protegido?");
  process.exit(1);
}
const cfg = JSON.parse(m[1].replace(/([{,])(\w+):/g, '$1"$2":'));

function clave(salt) {
  return crypto.pbkdf2Sync(password, salt, cfg.iter, 32, "sha256");
}

function descifrar() {
  const salt = Buffer.from(cfg.salt, "base64");
  const iv = Buffer.from(cfg.iv, "base64");
  const ct = Buffer.from(cfg.ct, "base64");
  const d = crypto.createDecipheriv("aes-256-gcm", clave(salt), iv);
  d.setAuthTag(ct.subarray(ct.length - 16));
  return Buffer.concat([d.update(ct.subarray(0, ct.length - 16)), d.final()]).toString("utf8");
}

let contenido;
try {
  contenido = descifrar();
} catch {
  console.error("contraseña incorrecta: el documento no abrió.");
  process.exit(1);
}

if (modo === "--ver") {
  console.log(contenido);
  process.exit(0);
}

if (modo === "--buscar") {
  const texto = contenido.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  const i = texto.toLowerCase().indexOf((a ?? "").toLowerCase());
  if (i < 0) {
    console.log(`no aparece "${a}"`);
    process.exit(1);
  }
  console.log("..." + texto.slice(Math.max(0, i - 200), i + 300) + "...");
  process.exit(0);
}

if (modo !== "--cambiar") {
  console.error(`modo desconocido: ${modo}`);
  process.exit(1);
}

const veces = contenido.split(a).length - 1;
if (veces === 0) {
  console.error(`no se encontró el texto a cambiar:\n  ${a}`);
  process.exit(1);
}
if (veces > 1) {
  console.error(`el texto aparece ${veces} veces; usá un fragmento más específico.`);
  process.exit(1);
}
const nuevo = contenido.replace(a, b);

// Se cifra con salt e iv NUEVOS. Reusarlos con otro contenido bajo la misma
// clave es justo lo que AES-GCM prohíbe.
const salt = crypto.randomBytes(Buffer.from(cfg.salt, "base64").length);
const iv = crypto.randomBytes(12);
const c = crypto.createCipheriv("aes-256-gcm", clave(salt), iv);
const ct = Buffer.concat([c.update(nuevo, "utf8"), c.final(), c.getAuthTag()]);

const cfgNuevo = { ...cfg, salt: salt.toString("base64"), iv: iv.toString("base64"), ct: ct.toString("base64") };

// Verificación: se descifra lo recién cifrado ANTES de escribir. Un documento
// que no abre es peor que uno con la línea vieja.
const d2 = crypto.createDecipheriv("aes-256-gcm", clave(salt), iv);
d2.setAuthTag(ct.subarray(ct.length - 16));
const vuelta = Buffer.concat([d2.update(ct.subarray(0, ct.length - 16)), d2.final()]).toString("utf8");
if (vuelta !== nuevo) {
  console.error("la verificación falló: no se escribe nada.");
  process.exit(1);
}

fs.writeFileSync(archivo, html.replace(m[1], JSON.stringify(cfgNuevo)), "utf8");
console.log("listo. Round-trip verificado.");
console.log(`  antes: ${a.slice(0, 90)}`);
console.log(`  ahora: ${b.slice(0, 90)}`);
