// ── Datos de contacto y enlaces. Placeholders editables:
//    cámbialos por los reales cuando los tengas. ──
export const site = {
  name: 'MiAgentIA',
  // WhatsApp: número en formato internacional sin "+" ni espacios.
  whatsapp: '50370000000',
  whatsappMsg: 'Hola MiAgentIA, quiero una demo de los agentes de IA.',
  email: 'hola@miagentia.com',
  // Enlace de agenda (Calendly, GHL, etc.). Placeholder = ancla al form.
  booking: '#empezar',
}

export function waLink(msg = site.whatsappMsg) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`
}
