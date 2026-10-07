// ── Datos de contacto y enlaces. ──
export const site = {
  name: 'MiAgentIA',
  // WhatsApp: número en formato internacional sin "+" ni espacios.
  whatsapp: '50376294980',
  whatsappMsg: 'Hola MiAgentIA, quiero una demo de los agentes de IA.',
  // Línea donde contesta Sofía. No es la del demo de Nissan (…4600).
  phone: '+50325054607',
  phoneLabel: '+503 2505 4607',
  email: 'hola@miagentia.com',
  // Enlace de agenda (Calendly, GHL, etc.). Placeholder = ancla al form.
  booking: '#empezar',
}

export function waLink(msg = site.whatsappMsg) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`
}
