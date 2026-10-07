import { Inter, Schibsted_Grotesk } from 'next/font/google'

// Cuerpo y UI
export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// Titulares · grotesca moderna. Sustituye a Space Grotesk, cuyas letras de
// carácter (la G, la k, el 1) se habían vuelto el default de toda startup de
// IA. Schibsted mantiene un punto de personalidad en las terminaciones pero
// lee a empresa establecida, no a experimento.
export const display = Schibsted_Grotesk({
  subsets: ['latin'],
  variable: '--font-display-src',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})
