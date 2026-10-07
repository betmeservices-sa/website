// ── Datos de contacto y enlaces. ──
export const site = {
  name: 'MiAgentIA',
  // WhatsApp: número en formato internacional sin "+" ni espacios.
  //
  // Son DOS líneas distintas y no hay que mezclarlas:
  //   whatsapp      → donde contesta el equipo (ventas, soporte, pie de página)
  //   whatsappSofia → donde contesta SOFÍA, para que el visitante la pruebe
  // Si se usa la de ventas en el botón de "pruébala", el visitante cree que
  // está hablando con el agente y le contesta una persona.
  whatsapp: '50376294980',
  whatsappMsg: 'Hola MiAgentIA, quiero una demo de los agentes de IA.',
  whatsappSofia: '50375605872',
  // Línea donde contesta Sofía por voz. No es la del demo de Nissan (…4600).
  phone: '+50325054607',
  phoneLabel: '+503 2505 4607',
  email: 'hola@miagentia.com',
  // Enlace de agenda (Calendly, GHL, etc.). Placeholder = ancla al form.
  booking: '#empezar',
}

export function waLink(msg = site.whatsappMsg) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`
}

// Para los botones que prometen hablar con Sofía, no con el equipo.
export function waSofiaLink(msg = 'Hola Sofía, quiero probarte.') {
  return `https://wa.me/${site.whatsappSofia}?text=${encodeURIComponent(msg)}`
}
