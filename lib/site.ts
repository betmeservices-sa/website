// ── Datos de contacto y enlaces. ──
export const site = {
  name: 'MiAgentIA',
  // WhatsApp: número en formato internacional sin "+" ni espacios.
  whatsapp: '50376294980',
  whatsappMsg: 'Hola MiAgentIA, quiero una demo de los agentes de IA.',
  email: 'hola@miagentia.com',
  // Enlace de agenda (Calendly, GHL, etc.). Placeholder = ancla al form.
  booking: '#empezar',
}

export function waLink(msg = site.whatsappMsg) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`
}
