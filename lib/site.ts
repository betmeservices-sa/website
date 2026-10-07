// ── Datos de contacto y enlaces. ──
export const site = {
  name: 'MiAgentIA',
  // UN SOLO número por canal, a propósito. Todo botón de WhatsApp del sitio
  // —hero, pie, CTA final, landings— cae en esta misma línea, que es donde
  // contesta Sofía. Si en algún momento se quiere separar la línea del equipo,
  // que sea una decisión explícita y no un segundo número que se cuela.
  // WhatsApp: formato internacional sin "+" ni espacios.
  whatsapp: '50375605872',
  whatsappMsg: 'Hola, quiero probar a Sofía.',
  // Voz: la línea donde contesta Sofía. No es el +503 2505 4600, que es la
  // del demo de Nissan.
  phone: '+50325054607',
  phoneLabel: '+503 2505 4607',
  email: 'hola@miagentia.com',
  // Enlace de agenda (Calendly, GHL, etc.). Placeholder = ancla al form.
  booking: '#empezar',
}

export function waLink(msg = site.whatsappMsg) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`
}
