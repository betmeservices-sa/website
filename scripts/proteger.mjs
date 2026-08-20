/**
 * Publica un HTML como documento protegido en `public/`.
 *
 * Hasta ahora solo existía `editar-protegido.mjs`, que cambia una línea de un
 * documento que YA estaba cifrado. Este crea uno nuevo: toma un HTML suelto, lo
 * cifra con la misma receta (PBKDF2-SHA256 250k + AES-256-GCM) y lo mete dentro
 * de la misma portada con candado que usan las propuestas.
 *
 * La portada abre el contenido en un iframe desde un blob, así que el documento
 * sigue siendo una página completa: sus scripts corren y sus fuentes cargan.
 *
 * El nombre lleva un sufijo al azar a propósito. El buscador no lo va a
 * encontrar (la portada es noindex) y adivinar la URL no sirve de nada sin la
 * contraseña, pero un nombre adivinable es una invitación de más.
 *
 * Uso:
 *   node scripts/proteger.mjs <archivo.html> <contraseña> <prefijo> [--boton "Ver el registro"]
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const args = process.argv.slice(2);
const [fuente, password, prefijo] = args;
if (!fuente || !password || !prefijo) {
  console.error("uso: node scripts/proteger.mjs <archivo.html> <contraseña> <prefijo> [--boton texto]");
  process.exit(1);
}
const iBoton = args.indexOf("--boton");
const boton = iBoton > -1 ? args[iBoton + 1] : "Abrir documento";

const contenido = fs.readFileSync(fuente, "utf8");

// La portada sale de un documento ya publicado: es la misma para todos y no
// tiene sentido mantener dos copias que se puedan desincronizar.
const MOLDE = "public/yali-propuesta-d6c5d46bd219.html";
const molde = fs.readFileSync(MOLDE, "utf8");
const mCfg = molde.match(/var CFG\s*=\s*(\{[\s\S]*?\})\s*;/);
if (!mCfg) {
  console.error(`no se encontró el bloque CFG en ${MOLDE}`);
  process.exit(1);
}
const cfgViejo = JSON.parse(mCfg[1].replace(/([{,])(\w+):/g, '$1"$2":'));

const iter = cfgViejo.iter ?? 250000;
const salt = crypto.randomBytes(Buffer.from(cfgViejo.salt, "base64").length);
const iv = crypto.randomBytes(12);
const clave = crypto.pbkdf2Sync(password, salt, iter, 32, "sha256");
const c = crypto.createCipheriv("aes-256-gcm", clave, iv);
const ct = Buffer.concat([c.update(contenido, "utf8"), c.final(), c.getAuthTag()]);

// Verificación antes de escribir: se descifra lo recién cifrado y se compara.
// Un documento que no abre es peor que no haberlo publicado.
const d = crypto.createDecipheriv("aes-256-gcm", clave, iv);
d.setAuthTag(ct.subarray(ct.length - 16));
const vuelta = Buffer.concat([d.update(ct.subarray(0, ct.length - 16)), d.final()]).toString("utf8");
if (vuelta !== contenido) {
  console.error("la verificación falló: no se escribe nada.");
  process.exit(1);
}

const cfg = { salt: salt.toString("base64"), iv: iv.toString("base64"), ct: ct.toString("base64"), iter };
let html = molde.replace(mCfg[1], JSON.stringify(cfg));
html = html.replace(">Ver propuesta<", ">" + boton + "<");
html = html.replace("btn.textContent='Ver propuesta'", "btn.textContent='" + boton.replace(/'/g, "\\'") + "'");

const nombre = `${prefijo}-${crypto.randomBytes(6).toString("hex")}.html`;
const destino = path.join("public", nombre);
if (fs.existsSync(destino)) {
  console.error(`ya existe ${destino}`);
  process.exit(1);
}
fs.writeFileSync(destino, html, "utf8");

console.log("publicado: " + destino);
console.log("  contenido " + (Buffer.byteLength(contenido) / 1024).toFixed(0) + " KB, cifrado " + (Buffer.byteLength(html) / 1024).toFixed(0) + " KB");
console.log("  round-trip verificado");
console.log("  https://www.miagentia.com/" + nombre);
