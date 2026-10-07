'use client'

import { useEffect } from 'react'

/**
 * Interruptor de VISTA PREVIA del movimiento.
 *
 * Windows y macOS tienen un ajuste de accesibilidad que apaga las
 * animaciones, y el sitio lo respeta (prefers-reduced-motion). El problema
 * práctico: en una máquina con ese ajuste activo es imposible revisar el
 * diseño, porque no se mueve nada.
 *
 * Con ?motion=1 se marca <html data-motion="on"> y las reglas de
 * reduced-motion se saltan. Queda guardado en la sesión para no tener que
 * repetir el parámetro al navegar. Con ?motion=0 se apaga.
 *
 * Esto NO cambia lo que ve un visitante real: nadie llega con ese parámetro,
 * así que para todos los demás el respeto a reduced-motion sigue intacto.
 */
export default function MotionPreview() {
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('motion')
    if (q === '1') sessionStorage.setItem('motion-preview', '1')
    if (q === '0') sessionStorage.removeItem('motion-preview')
    if (sessionStorage.getItem('motion-preview') === '1') {
      document.documentElement.dataset.motion = 'on'
    } else {
      delete document.documentElement.dataset.motion
    }
  }, [])
  return null
}
