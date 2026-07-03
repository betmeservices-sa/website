import { Inter, Space_Grotesk } from 'next/font/google'

// Cuerpo y UI
export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// Titulares · geométrica tech, ecos del logotipo
export const space = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})
