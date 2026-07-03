# MiAgentIA · Soluciones Inteligentes

Landing premium para la agencia de agentes de IA (voz + WhatsApp).

- **Stack:** Next.js 16 (App Router) + React 19 + Tailwind v4 + Framer Motion + GSAP + Lenis
- **Bilingüe:** ES (default) / EN con toggle en la navbar (persistido en localStorage)
- **Demos visuales:** llamada de voz simulada (orbe + transcripción) y chat estilo WhatsApp scripteado. Sin APIs.
- **Dev:** `npm run dev` (puerto 4200). En esta máquina, lanzar con `Start-Process node "node_modules\next\dist\bin\next dev -p 4200"`.

## Editar datos de contacto

`lib/site.ts`: número de WhatsApp, email y link de agenda (placeholders).

## Contenido

Todo el copy vive en `lib/content.ts` (diccionario ES/EN). Las cifras de la sección "Impacto" son ilustrativas y están etiquetadas como tales.
