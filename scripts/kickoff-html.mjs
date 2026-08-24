// El documento del kickoff, en HTML, a partir de los MISMOS datos que muestra
// la página. No hay una segunda copia del contenido: si mañana cambia una
// respuesta en checklist-yali.ts, cambian el PDF y el Word.
//
// De acá salen los dos formatos. Word y Chrome no entienden lo mismo, así que
// el modo `word` cambia lo que Word no sabe dibujar (degradados, esquinas
// redondeadas, pseudo elementos) por su equivalente plano. Todo lo demás,
// incluido el fondo negro, es igual en los dos.

import { FEEDBACK_YALI, GRUPOS_YALI } from '../components/onboarding/checklist-yali.ts'

export const CLIENTE = 'Yali Hospitality'
export const FECHA_LLAMADA = '24 de agosto de 2026'

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

export function construirDocumento({ word = false } = {}) {
  let cuerpo = ''
  let totalPuntos = 0
  let listos = 0
  const sinResponder = []

  for (const g of [...GRUPOS_YALI, FEEDBACK_YALI]) {
    cuerpo += `<div class="grupo${g.feedback ? ' feedback' : ''}">
      <div class="cabecera">
        <h2>${esc(g.titulo)}</h2>${g.urgente ? '<span class="chip">Primero esto</span>' : ''}
      </div>
      <p class="intro">${esc(g.intro)}</p>`

    for (const t of g.tareas ?? []) {
      totalPuntos++
      if (t.hecho) listos++
      cuerpo += `<div class="punto ${t.hecho ? 'ok' : 'pendiente'}">
        <h3><span class="marca">${t.hecho ? '&#10003;' : '&bull;'}</span>${esc(t.titulo)}</h3>
        <p class="etiquetas">
          <span class="quien">${QUIEN[t.quien]}</span>
          <span class="estado">${t.hecho ? 'Listo' : 'Pendiente'}</span>
        </p>
        <p class="porque">${esc(t.porque)}</p>`
      if (t.pasos?.length) {
        cuerpo += `<ol>${t.pasos.map((x) => `<li>${esc(x)}</li>`).join('')}</ol>`
      }
      if (t.respuesta) {
        cuerpo += `<div class="respuesta"><p class="etiqueta">${esc(t.nota ?? 'Cómo quedó')}</p>${parrafos(t.respuesta)}</div>`
      } else if (t.nota) {
        sinResponder.push(t.nota)
        cuerpo += `<div class="vacio"><p class="etiqueta">${esc(t.nota)}</p><p>Falta esta respuesta.</p></div>`
      }
      cuerpo += `</div>`
    }

    for (const d of g.decisiones ?? []) {
      cuerpo += `<div class="punto ${g.feedback || d.respuesta ? '' : 'pendiente'}">
        <h3>${esc(d.pregunta)}</h3>`
      if (!g.feedback && !d.respuesta) {
        cuerpo += '<p class="etiquetas"><span class="estado">Falta definir</span></p>'
      }
      if (d.pista) cuerpo += `<p class="porque">${esc(d.pista)}</p>`

      if (g.feedback) {
        // Renglones en blanco: esto es para escribir encima, no algo que
        // estemos esperando de vuelta.
        cuerpo += `<div class="renglones">${'<p class="renglon">&nbsp;</p>'.repeat(d.filas ?? 3)}</div>`
      } else if (d.respuesta) {
        cuerpo += `<div class="respuesta">${parrafos(d.respuesta)}</div>`
      } else {
        sinResponder.push(d.pregunta)
        cuerpo += `<div class="vacio"><p>Falta esta respuesta.</p></div>`
      }
      cuerpo += `</div>`
    }
    cuerpo += `</div>`
  }

  const pendientes = sinResponder.length
    ? `<div class="grupo falta">
        <div class="cabecera"><h2>Lo que falta decidir</h2></div>
        <p class="intro">Son ${sinResponder.length} puntos. Todo lo demás ya quedó definido en la llamada.</p>
        <ul>${sinResponder.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
      </div>`
    : ''

  // Word no dibuja degradados ni esquinas redondeadas: donde Chrome pone el
  // filo de color, Word pone una línea sólida, y las esquinas quedan rectas.
  const filo = word
    ? 'border-top: 2px solid #22D3EE;'
    : 'border-top: 0;'
  const radio = word ? '0' : '16px'

  const cabezaWord = word
    ? `<!--[if gte mso 9]><xml>
      <w:WordDocument><w:View>Print</w:View><w:DisplayBackgroundShape/></w:WordDocument>
    </xml><![endif]-->`
    : ''

  // El fondo negro de una hoja de Word solo aparece con esto. Sin el
  // DisplayBackgroundShape de arriba, Word lo ignora en vista de impresion.
  const fondoWord = word ? '<v:background fill="t" fillcolor="#05050A"/>' : ''

  const html = `<!doctype html><html lang="es"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:w="urn:schemas-microsoft-com:office:word"
  xmlns:o="urn:schemas-microsoft-com:office:office"><head>
<meta charset="utf-8">
<title>Kickoff · ${CLIENTE}</title>
${cabezaWord}
${word ? '' : `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">`}
<style>
  /* Margen cero: es lo unico que deja que el negro llegue al borde de la hoja.
     El aire lo pone el padding de .hoja, que se mantiene pagina tras pagina. */
  @page { size: letter; margin: ${word ? '14mm 13mm' : '0'}; ${word ? 'mso-page-orientation: portrait;' : ''} }

  * { box-sizing: border-box; }

  body {
    margin: 0; padding: 0;
    background: #05050A; color: #EDEDF5;
    font-family: ${word ? 'Inter, Calibri, sans-serif' : 'Inter, "Segoe UI", system-ui, sans-serif'};
    font-size: ${word ? '10.5pt' : '10.2pt'}; line-height: 1.5;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }

  .hoja { padding: ${word ? '0' : '14mm 13mm'}; }

  /* ---- portada ---- */
  .portada {
    position: relative; overflow: hidden;
    border: 1px solid #23232F; border-radius: ${word ? '0' : '20px'};
    ${word ? 'border-top: 3px solid #8B5CF6;' : ''}
    background: #0D0D18;
    padding: 26px; margin-bottom: 20px;
  }
  ${word ? '' : `.portada::before {
    content: ''; position: absolute; left: 0; right: 0; top: 0; height: 2px;
    background: linear-gradient(120deg, #22D3EE 0%, #8B5CF6 48%, #E879F9 100%);
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
  .portada > *:not(.aurora) { position: relative; }`}
  .marca-arriba {
    font-size: 8pt; font-weight: 600; text-transform: uppercase;
    letter-spacing: .16em; color: #67E8F9; margin: 0 0 12px;
  }
  h1 {
    font-family: ${word ? 'Inter, Calibri, sans-serif' : '"Space Grotesk", Inter, system-ui, sans-serif'};
    font-size: 26pt; font-weight: 700; line-height: 1.08; letter-spacing: -.5px;
    margin: 0 0 12px; color: #EDEDF5;
  }
  .grad {
    ${word
      ? 'color: #67E8F9;'
      : `background: linear-gradient(120deg, #22D3EE 0%, #8B5CF6 48%, #E879F9 100%);
    -webkit-background-clip: text; background-clip: text; color: transparent;`}
  }
  .sub { color: #9A9AB0; font-size: 10pt; margin: 0; }
  .contador { margin: 16px 0 0; }
  .dato {
    display: inline-block; margin-right: 8px;
    border: 1px solid #23232F; border-radius: ${word ? '0' : '999px'};
    padding: 4px 12px; font-size: 8.6pt; font-weight: 600; color: #EDEDF5;
    background: #12121D;
  }
  .dato b { color: #67E8F9; }
  .dato.falta b { color: #E879F9; }

  .aviso {
    border: 1px solid #3D2E63; border-radius: ${word ? '0' : '14px'};
    background: #15112A;
    padding: 13px 16px; font-size: 9.6pt; color: #CFC9E8; margin: 0 0 22px;
  }
  .aviso strong { color: #EDEDF5; }

  /* ---- secciones ---- */
  .grupo { margin-bottom: 22px; }
  .cabecera {
    padding-bottom: 7px; margin-bottom: 8px;
    border-bottom: 1px solid #23232F;
    page-break-after: avoid; break-after: avoid;
  }
  h2 {
    display: inline; font-family: ${word ? 'Inter, Calibri, sans-serif' : '"Space Grotesk", Inter, system-ui, sans-serif'};
    font-size: 15pt; font-weight: 600; letter-spacing: -.2px; margin: 0; color: #EDEDF5;
  }
  .chip {
    margin-left: 9px;
    border: 1px solid #1E4E5C; border-radius: ${word ? '0' : '999px'};
    padding: 2px 9px; font-size: 7.6pt; font-weight: 700;
    text-transform: uppercase; letter-spacing: .07em; color: #67E8F9;
  }
  .intro { color: #9A9AB0; font-size: 9.4pt; margin: 0 0 12px; page-break-after: avoid; break-after: avoid; }

  /* ---- puntos ---- */
  .punto {
    position: relative; overflow: hidden;
    break-inside: avoid; page-break-inside: avoid;
    border: 1px solid #23232F; border-radius: ${radio};
    ${filo}
    background: #0D0D18;
    padding: 15px 17px; margin-bottom: 10px;
  }
  ${word ? '.punto.pendiente { border-top-color: #E879F9; }' : `.punto::before {
    content: ''; position: absolute; left: 0; right: 0; top: 0; height: 1px;
    background: linear-gradient(120deg, #22D3EE 0%, #8B5CF6 48%, #E879F9 100%); opacity: .45;
  }
  .punto.pendiente::before { opacity: .85; }`}
  h3 {
    font-family: ${word ? 'Inter, Calibri, sans-serif' : '"Space Grotesk", Inter, system-ui, sans-serif'};
    font-size: 11.4pt; font-weight: 600; margin: 0 0 7px; letter-spacing: -.1px; color: #EDEDF5;
  }
  .marca { font-weight: 700; margin-right: 8px; color: #22D3EE; }
  .pendiente .marca { color: #E879F9; }
  .etiquetas { margin: 0 0 8px; }
  .quien, .estado {
    display: inline-block; margin-right: 6px;
    font-size: 7.6pt; font-weight: 700; text-transform: uppercase;
    letter-spacing: .07em; padding: 2.5px 8px; border-radius: ${word ? '0' : '999px'};
    border: 1px solid #23232F; color: #9A9AB0;
  }
  .ok .estado { color: #67E8F9; border-color: #1E4E5C; }
  .pendiente .estado { color: #E879F9; border-color: #5A2F63; }
  .porque { color: #9A9AB0; font-size: 9.4pt; margin: 0 0 8px; }
  ol { margin: 0 0 9px; padding-left: 18px; color: #9A9AB0; font-size: 9.4pt; }
  ol li { margin-bottom: 3px; }

  .respuesta {
    border-left: 2px solid #22D3EE;
    background: #121220;
    border-radius: ${word ? '0' : '0 10px 10px 0'}; padding: 10px 14px;
  }
  .respuesta p { margin: 0 0 6px; }
  .respuesta p:last-child { margin-bottom: 0; }
  .vacio {
    border-left: 2px solid #E879F9;
    background: #1C1226;
    border-radius: ${word ? '0' : '0 10px 10px 0'}; padding: 10px 14px; color: #F0C7F7;
  }
  .vacio p { margin: 0; font-size: 9.4pt; }
  .etiqueta {
    font-size: 7.6pt; font-weight: 700; text-transform: uppercase;
    letter-spacing: .09em; color: #9A9AB0; margin: 0 0 5px;
  }

  /* ---- espacio para escribir ---- */
  .feedback .cabecera { border-bottom-color: #1E4E5C; }
  .renglones { margin-top: 4px; }
  .renglon {
    margin: 0; padding: 0; height: 21px; line-height: 21px;
    border-bottom: 1px solid #262633;
  }

  /* ---- cierre ---- */
  .falta { break-inside: avoid; page-break-inside: avoid; }
  .falta .cabecera { border-bottom-color: #5A2F63; }
  .falta ul {
    margin: 0; padding: 15px 17px 15px 34px; font-size: 9.8pt;
    border: 1px solid #45274D; border-radius: ${word ? '0' : '16px'};
    background: #170F1E;
  }
  .falta li { margin-bottom: 5px; }
  .falta li:last-child { margin-bottom: 0; }

  .pie {
    margin-top: 22px; padding-top: 12px; border-top: 1px solid #23232F;
    color: #6E6E80; font-size: 8.4pt;
  }
</style></head><body>${fondoWord}<div class="hoja">
  <div class="portada">
    ${word ? '' : '<div class="aurora"></div><div class="aurora dos"></div>'}
    <p class="marca-arriba">MiAgentIA &middot; kickoff</p>
    <h1>Kickoff de<br><span class="grad">${esc(CLIENTE)}</span></h1>
    <p class="sub">Lo que se acordó en la llamada del ${FECHA_LLAMADA}</p>
    <p class="contador">
      <span class="dato"><b>${listos}</b> de ${totalPuntos} accesos listos</span>
      <span class="dato falta"><b>${sinResponder.length}</b> puntos sin definir</span>
    </p>
  </div>

  <p class="aviso"><strong>Esto no hay que llenarlo.</strong> Ya está escrito con lo que se
  habló en la llamada. Lo que necesitamos es que lo lean, corrijan lo que haya quedado mal y
  completen los puntos marcados en magenta, que son los que quedaron sin definir. Al final hay
  espacio para lo que nos quieran decir.</p>

  ${cuerpo}
  ${pendientes}
  <p class="pie">Documento interno de ${esc(CLIENTE)} y MiAgentIA. Generado del checklist de kickoff.</p>
</div></body></html>`

  return { html, listos, totalPuntos, sinDefinir: sinResponder.length }
}
