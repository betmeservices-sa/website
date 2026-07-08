# Propuesta comercial por cliente — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Una plantilla reutilizable de propuesta comercial: una página web privada por cliente (`/propuesta/<slug>`), en español, que se lee en 3 minutos y cierra la venta después de la llamada de descubrimiento.

**Architecture:** Un tipo `Proposal` en `lib/proposals/` es el único contrato y actúa como checklist en tiempo de compilación (tuplas de longitud fija + campos obligatorios). Cada propiedad se llena en un archivo `.ts` por cliente. Una ruta dinámica server-rendered (`app/propuesta/[slug]/`) resuelve el slug contra un registro y compone seis componentes presentacionales en `components/proposal/`. La página no usa `SiteShell` (sin navbar ni footer de marketing): un solo CTA, cero fugas.

**Tech Stack:** Next.js 16.2.1 (App Router, Server Components), React 19, Tailwind v4, Framer Motion + GSAP (vía los componentes existentes `SplitText` y `AnimatedContent`). Sin runner de tests (el repo no tiene ninguno; ver Global Constraints).

## Global Constraints

- **Next.js 16.2.1**: `params` en rutas dinámicas es `Promise<...>` y **debe** hacerse `await`. Antes de escribir la ruta, leer `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/page.md` y `.../dynamic-routes.md`. AGENTS.md manda: no asumir APIs de memoria.
- **Sin em-dashes** (—) en ningún lado: código, copy o comentarios. Usar coma, punto, dos puntos o paréntesis.
- **No fabricar cifras.** El contenido de ejemplo (`excel-motors-demo.ts`) lleva nombres inventados y montos como `$XXX`. Toda métrica declara su `fuente`. No presentar el ejemplo como caso real.
- **Sin indicador de scroll** en ninguna portada/hero.
- **No hay test runner** en el repo (`package.json` solo tiene `dev`, `build`, `lint`, `start`). No se agrega uno: sería scope creep contra un codebase sin tests, y esta feature es presentacional. La verificación es en tiempo de compilación (`npx tsc --noEmit`, `npm run build`), lint (`npm run lint`), un check deliberado de "romper un campo obligatorio" (el contrato central), y verificación manual en el navegador.
- **Alias de imports:** `@/` = raíz del proyecto (ej. `@/lib/site`, `@/components/ui/Button`).
- **Reusar el sistema visual existente.** Clases/tokens ya en uso y permitidos: `text-grad`, `glass`, `border-grad`, `bg-bg-card`, `bg-bg-soft`, `text-ink`, `text-muted`, `text-bg`, `text-cyan`/`text-violet`/`text-magenta`, `[background:var(--grad)]`, `aurora-blob aurora-3`, `font-display`. Iconos disponibles en `components/ui/Icon.tsx` (usar solo estos nombres): `phone whatsapp calendar filter plug globe tooth car home cart fork briefcase arrow check sparkle bolt mail chevron plus bot user`.
- **Arrancar dev server (Windows):** `Start-Process node "node_modules\next\dist\bin\next dev -p 4200"` en PowerShell. El shim de npm muere en background de Bash. Puerto 4200.
- **Commits frecuentes**, uno por tarea. Terminar cada mensaje de commit con:
  `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`

---

## File Structure

```
lib/proposals/
  types.ts                 # NUEVO. El tipo Proposal. Único contrato.
  index.ts                 # NUEVO. Registro slug -> Proposal + helpers.
  excel-motors-demo.ts     # NUEVO. Propuesta de ejemplo (placeholder, borrable).

app/propuesta/[slug]/
  page.tsx                 # NUEVO. Server component: resuelve slug, metadata noindex.
  not-found.tsx            # NUEVO. 404 con marca.

components/proposal/
  ProposalPage.tsx         # NUEVO. Compone el shell + las seis secciones.
  Cover.tsx                # NUEVO. Sección 1.
  Diagnostico.tsx          # NUEVO. Sección 2.
  AgentSpec.tsx            # NUEVO. Sección 3.
  ScopeGrid.tsx            # NUEVO. Sección 4.
  Investment.tsx           # NUEVO. Sección 5.
  Kickoff.tsx              # NUEVO. Sección 6.

app/robots.ts              # MODIFICAR. Añadir disallow /propuesta/.
public/robots.txt          # ELIMINAR. Código muerto (verificado contra prod).
```

Cada componente de sección recibe solo su rebanada del tipo `Proposal`; ninguno importa el registro ni conoce rutas. Se entienden y prueban por separado.

---

### Task 1: Contrato de datos + propuesta de ejemplo

**Files:**
- Create: `lib/proposals/types.ts`
- Create: `lib/proposals/index.ts`
- Create: `lib/proposals/excel-motors-demo.ts`

**Interfaces:**
- Produces:
  - `type Proposal` (y tipos auxiliares `Canal`, `Metrica`, `Flujo`, `Opcion`, `Paso`) desde `@/lib/proposals/types`.
  - `getProposal(slug: string): Proposal | undefined` y `allProposalSlugs(): string[]` desde `@/lib/proposals`.
  - `excelMotors: Proposal` desde `@/lib/proposals/excel-motors-demo`.

- [ ] **Step 1: Escribir el tipo (contrato)**

Create `lib/proposals/types.ts`:

```ts
// Contrato único de una propuesta. Las tuplas de longitud fija (hechos,
// opciones, arranque) y los campos obligatorios (setup, mensual) mantienen
// la propuesta corta: violarlos es un error de compilación, no una
// convención que se erosiona.

export type Canal = 'voz' | 'whatsapp'

export type Metrica = {
  insumos: string[]        // los datos que dio el cliente, a la vista
  resultado: string        // su aritmética, no la nuestra
  fuente: string           // de dónde salió el dato (regla no-fabricar)
}

export type Flujo = { situacion: string; respuesta: string }

export type Opcion = {
  nombre: string
  setup: string            // obligatorio
  mensual: string          // obligatorio
  incluye: string[]
  recomendada?: boolean
}

export type Paso = { paso: string; fecha: string }

export type Proposal = {
  slug: string
  cliente: { nombre: string; industria: string; contacto: string }
  validaHasta: string      // ISO 'YYYY-MM-DD'
  fraseDolor: string       // en las palabras del cliente

  diagnostico: {
    hechos: [string, string, string]   // exactamente tres
    metrica?: Metrica
  }

  agente: {
    nombre: string
    canales: Canal[]
    idioma: string
    horario: string
    flujos: Flujo[]
    limites: [string, string, ...string[]]  // al menos dos
    escalada: string
  }

  alcance: {
    incluye: string[]
    contraparte: { item: string; horas?: string }[]
  }

  inversion: {
    opciones: [Opcion, Opcion]   // exactamente dos
    nota: string
  }

  arranque: [Paso, Paso, Paso, Paso]  // exactamente cuatro
}
```

- [ ] **Step 2: Escribir el registro y helpers**

Create `lib/proposals/index.ts`:

```ts
import type { Proposal } from './types'
import { excelMotors } from './excel-motors-demo'

// Cada propuesta nueva se agrega a esta lista.
const list: Proposal[] = [excelMotors]

const bySlug: Record<string, Proposal> = Object.fromEntries(
  list.map((p) => [p.slug, p]),
)

export function getProposal(slug: string): Proposal | undefined {
  return bySlug[slug]
}

export function allProposalSlugs(): string[] {
  return list.map((p) => p.slug)
}
```

- [ ] **Step 3: Escribir la propuesta de ejemplo**

Create `lib/proposals/excel-motors-demo.ts`:

```ts
import type { Proposal } from './types'

// ⚠️ EJEMPLO / PLACEHOLDER. Nombres y cifras INVENTADOS para probar la
// plantilla. No es un cliente ni un caso real, ni un testimonio. Los montos
// son $XXX a propósito: hay que llenarlos antes de enviar. Borrar este
// archivo (y quitarlo de lib/proposals/index.ts) cuando entre la primera
// propuesta real.
export const excelMotors: Proposal = {
  slug: 'excel-motors-7f3a',
  cliente: { nombre: 'Excel Motors', industria: 'Venta de autos', contacto: 'Carlos Méndez' },
  validaHasta: '2026-07-22',
  fraseDolor:
    '"Los fines de semana entran un montón de mensajes por los anuncios y no damos abasto; para el lunes ya se enfriaron."',

  diagnostico: {
    hechos: [
      'Reciben más de 200 mensajes al mes por WhatsApp desde sus anuncios, y responden a mano cuando alguien tiene un rato.',
      'Fuera de horario (noches y fines de semana) nadie contesta, justo cuando llega el mayor volumen.',
      'Hoy no hay forma de saber cuántas visitas al piso de ventas se pierden por responder tarde.',
    ],
    metrica: {
      insumos: ['~40 conversaciones sin respuesta al mes', 'ticket promedio de $8,000', 'cierre estimado del 5%'],
      resultado:
        'Cada mes se enfrían unos 40 prospectos. Aun con un cierre conservador, son 2 ventas (cerca de $16,000) que se van solo por no contestar a tiempo.',
      fuente:
        'Cifras dichas por el cliente en la llamada del 7 de julio; el cierre es un estimado conservador, no una garantía.',
    },
  },

  agente: {
    nombre: 'Andrea',
    canales: ['whatsapp', 'voz'],
    idioma: 'Español',
    horario: '24 horas, todos los días',
    flujos: [
      { situacion: 'Llega un mensaje preguntando por un modelo', respuesta: 'Responde al instante con precio, disponibilidad y opciones de financiamiento, y toma los datos del prospecto.' },
      { situacion: 'El prospecto quiere ver el auto', respuesta: 'Ofrece horarios y agenda la visita al piso de ventas directo en el calendario del equipo.' },
      { situacion: 'Pregunta por financiamiento o enganche', respuesta: 'Explica las opciones con la información que ustedes carguen y, si el interés es serio, pasa la conversación a un asesor.' },
      { situacion: 'Escribe a las 11 de la noche un domingo', respuesta: 'Atiende igual que a mediodía un martes: nunca se queda sin respuesta.' },
    ],
    limites: [
      'No cierra la venta ni negocia el precio final: eso lo hace su asesor.',
      'No inventa promociones ni datos; solo usa la información que ustedes carguen.',
      'No aprueba créditos; recopila la información y la pasa a su equipo.',
    ],
    escalada:
      'Cuando el prospecto está listo para comprar o pide hablar con una persona, Andrea transfiere la conversación a un asesor con todo el contexto ya capturado.',
  },

  alcance: {
    incluye: [
      'Agente de WhatsApp entrenado con su inventario, precios y preguntas frecuentes.',
      'Agente de voz para atender llamadas entrantes con el mismo cerebro.',
      'Agenda de visitas conectada al calendario de su equipo, con recordatorios.',
      'Transferencia a un asesor humano con el historial de la conversación.',
      'Ajustes durante las primeras 2 semanas según lo que veamos en conversaciones reales.',
    ],
    contraparte: [
      { item: 'Una llamada para cargar inventario, precios y preguntas frecuentes', horas: '1 hora' },
      { item: 'Acceso a su número de WhatsApp Business y a su calendario', horas: '30 min' },
      { item: 'Revisar y aprobar el guion del agente antes de salir en vivo', horas: '30 min' },
    ],
  },

  inversion: {
    opciones: [
      {
        nombre: 'Solo WhatsApp',
        setup: '$XXX (pago único)',
        mensual: '$XXX / mes',
        incluye: ['Agente de WhatsApp 24/7', 'Agenda de visitas y recordatorios', 'Transferencia a asesor', 'Soporte y ajustes'],
      },
      {
        nombre: 'WhatsApp + Voz',
        setup: '$XXX (pago único)',
        mensual: '$XXX / mes',
        incluye: ['Todo lo de Solo WhatsApp', 'Agente de voz para llamadas entrantes', 'Un solo cerebro para chat y llamada'],
        recomendada: true,
      },
    ],
    nota: 'Sin permanencia, mes a mes. Cancela cuando quieras.',
  },

  arranque: [
    { paso: 'Aprobación y llamada de arranque', fecha: 'Día 1' },
    { paso: 'Cargamos y entrenamos a Andrea con su información', fecha: 'Días 2 a 4' },
    { paso: 'Revisan y aprueban el guion', fecha: 'Día 5' },
    { paso: 'Andrea sale en vivo y empieza a atender', fecha: 'Día 7' },
  ],
}
```

- [ ] **Step 4: Verificar que compila**

Run: `npx tsc --noEmit`
Expected: sin errores.

- [ ] **Step 5: Verificar el contrato-como-checklist (el corazón del diseño)**

Editar temporalmente `lib/proposals/excel-motors-demo.ts`: borrar la línea `mensual: '$XXX / mes',` de la primera opción.
Run: `npx tsc --noEmit`
Expected: **FALLA** con un error tipo `Property 'mensual' is missing in type ... but required in type 'Opcion'`.
Luego **restaurar** la línea y correr `npx tsc --noEmit` de nuevo → sin errores.

Si el paso no falla, el compilador no está actuando como checklist y el diseño no se sostiene: revisar el tipo antes de seguir.

- [ ] **Step 6: Commit**

```bash
git add lib/proposals/
git commit -m "feat(propuesta): contrato de datos Proposal + propuesta de ejemplo"
```

---

### Task 2: Ruta privada + privacidad + limpieza

Hace la ruta accesible y verificable (renderiza, `noindex`, 404 en slug desconocido, robots la bloquea) con un cuerpo mínimo provisional. El cuerpo real (ProposalPage) se conecta en la Task 3.

**Files:**
- Create: `app/propuesta/[slug]/page.tsx`
- Create: `app/propuesta/[slug]/not-found.tsx`
- Modify: `app/robots.ts`
- Delete: `public/robots.txt`
- Test: verificación manual en navegador + `curl`.

**Interfaces:**
- Consumes: `getProposal`, `allProposalSlugs` de `@/lib/proposals`; `type Proposal` de `@/lib/proposals/types`.
- Produces: la ruta `/propuesta/[slug]`. El default export de `page.tsx` renderiza (provisionalmente) el nombre del cliente; la Task 3 lo reemplaza por `<ProposalPage proposal={proposal} />`.

- [ ] **Step 1: Leer los docs de Next 16 (obligatorio, ver Global Constraints)**

Run: leer `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/page.md` (sección `params`) y confirmar que `params` es `Promise` y se hace `await`.

- [ ] **Step 2: Escribir la ruta con cuerpo provisional**

Create `app/propuesta/[slug]/page.tsx`:

```tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProposal, allProposalSlugs } from '@/lib/proposals'

// Prerenderiza solo los slugs conocidos; cualquier otro da 404 (sin ISR).
export const dynamicParams = false

export function generateStaticParams() {
  return allProposalSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params
  const p = getProposal(slug)
  const nombre = p?.cliente.nombre ?? 'Cliente'
  return {
    title: `Propuesta para ${nombre}`,
    // Documento privado: fuera del índice. Anula el canonical heredado del
    // layout raíz (que apunta al home) con uno propio.
    robots: { index: false, follow: false },
    alternates: { canonical: `/propuesta/${slug}` },
  }
}

export default async function Page(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const proposal = getProposal(slug)
  if (!proposal) notFound()

  // Cuerpo provisional (se reemplaza en la Task 3 por <ProposalPage/>).
  return <main className="p-10 text-ink">Propuesta para {proposal.cliente.nombre}</main>
}
```

- [ ] **Step 3: Escribir el 404 con marca**

Create `app/propuesta/[slug]/not-found.tsx`:

```tsx
import Link from 'next/link'
import Logo from '@/components/ui/Logo'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <Logo className="h-8" />
      <p className="text-muted">Esta propuesta no existe o el enlace ya no está disponible.</p>
      <Link href="/" className="text-sm text-cyan hover:underline">Ir a MiAgentIA</Link>
    </div>
  )
}
```

- [ ] **Step 4: Bloquear /propuesta/ en robots**

Modify `app/robots.ts` — cambiar la línea `rules`:

```ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/propuesta/' },
    sitemap: 'https://www.miagentia.com/sitemap.xml',
    host: 'https://www.miagentia.com',
  }
}
```

Nota: `app/sitemap.ts` es una lista estática de URLs y no incluye `/propuesta/*`, así que no requiere cambios.

- [ ] **Step 5: Borrar el robots.txt muerto**

`public/robots.txt` nunca se sirvió (prod devuelve la línea `Host:`, que solo genera `app/robots.ts`). Borrarlo para que nadie edite el archivo equivocado.

Run: `git rm public/robots.txt`

- [ ] **Step 6: Verificar en el navegador**

Arrancar dev (PowerShell): `Start-Process node "node_modules\next\dist\bin\next dev -p 4200"`
- Abrir `http://localhost:4200/propuesta/excel-motors-7f3a` → muestra "Propuesta para Excel Motors".
- Abrir `http://localhost:4200/propuesta/no-existe` → página 404 con el logo.

Run (verificar noindex y robots):
```bash
curl -s http://localhost:4200/propuesta/excel-motors-7f3a | grep -i "noindex"
curl -s http://localhost:4200/robots.txt
```
Expected: el primero encuentra `content="noindex..."`; el segundo contiene `Disallow: /propuesta/`.

- [ ] **Step 7: Build limpio**

Run: `npm run build`
Expected: build exitoso; en el output, `/propuesta/[slug]` aparece como ruta prerenderizada (SSG) con el slug de ejemplo.

- [ ] **Step 8: Commit**

```bash
git add app/propuesta app/robots.ts
git commit -m "feat(propuesta): ruta privada [slug] con noindex + 404, bloqueo en robots, borra robots.txt muerto"
```

---

### Task 3: Shell + secciones 1-3 (la parte de "te escuchamos")

Crea el shell de la página y las tres primeras secciones (Portada, Lo que vimos, Tu agente ya diseñado), y conecta `ProposalPage` a la ruta reemplazando el cuerpo provisional.

**Files:**
- Create: `components/proposal/ProposalPage.tsx`
- Create: `components/proposal/Cover.tsx`
- Create: `components/proposal/Diagnostico.tsx`
- Create: `components/proposal/AgentSpec.tsx`
- Modify: `app/propuesta/[slug]/page.tsx` (reemplazar el cuerpo provisional)

**Interfaces:**
- Consumes: `type Proposal` de `@/lib/proposals/types`; componentes existentes `@/components/reactbits/SplitText`, `@/components/reactbits/AnimatedContent`, `@/components/ui/Eyebrow`, `@/components/ui/Icon`, `@/components/ui/Logo` (default), `@/lib/site` (`site`).
  - `SplitText` props: `{ text: string; className?: string; wordClassName?: string; delay?: number; as?: 'h1'|'h2'|'span'|'p' }`. El gradiente va en `wordClassName` (no en el padre) o rompe `background-clip: text`.
  - `AnimatedContent` props: `{ children; className?; delay?: number }` (reveal en scroll).
  - `Eyebrow`: `{ children }` renderiza la etiqueta superior.
  - `Icon`: `{ name: string; className?: string }`.
  - `Logo` (default export): `{ className?; showText?: boolean }`.
- Produces: `ProposalPage` (default) de `@/components/proposal/ProposalPage`, que renderiza (por ahora) Cover + Diagnostico + AgentSpec. La Task 4 le añade tres secciones más.

- [ ] **Step 1: Cover (sección 1)**

Create `components/proposal/Cover.tsx`:

```tsx
import SplitText from '@/components/reactbits/SplitText'
import Eyebrow from '@/components/ui/Eyebrow'
import type { Proposal } from '@/lib/proposals/types'

const fmtFecha = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('es-ES', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

export default function Cover({ proposal }: { proposal: Proposal }) {
  return (
    <section className="relative flex min-h-[68vh] flex-col justify-center py-16">
      <Eyebrow>Propuesta · {proposal.cliente.industria}</Eyebrow>
      <SplitText
        as="h1"
        text={proposal.cliente.nombre}
        className="mt-6 font-display text-5xl font-semibold tracking-tight sm:text-7xl"
        wordClassName="text-grad"
      />
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
        {proposal.fraseDolor}
      </p>
      <p className="mt-8 text-sm text-muted">
        Preparada para {proposal.cliente.contacto} · Válida hasta el {fmtFecha(proposal.validaHasta)}
      </p>
    </section>
  )
}
```

- [ ] **Step 2: Diagnostico (sección 2)**

Create `components/proposal/Diagnostico.tsx`:

```tsx
import AnimatedContent from '@/components/reactbits/AnimatedContent'
import Eyebrow from '@/components/ui/Eyebrow'
import Icon from '@/components/ui/Icon'
import type { Proposal } from '@/lib/proposals/types'

export default function Diagnostico({ data }: { data: Proposal['diagnostico'] }) {
  return (
    <section className="border-t border-white/5 py-16 sm:py-20">
      <Eyebrow>Lo que vimos</Eyebrow>
      <div className="mt-8 space-y-4">
        {data.hechos.map((h, i) => (
          <AnimatedContent key={i} delay={i * 0.1}>
            <div className="flex gap-4 rounded-2xl border border-white/10 bg-bg-card p-5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full [background:var(--grad)] text-sm font-semibold text-bg">
                {i + 1}
              </span>
              <p className="text-ink">{h}</p>
            </div>
          </AnimatedContent>
        ))}
      </div>

      {data.metrica && (
        <AnimatedContent delay={0.3}>
          <div className="mt-6 rounded-2xl border-grad glass p-6 sm:p-8">
            <div className="flex flex-wrap gap-2">
              {data.metrica.insumos.map((x, i) => (
                <span key={i} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-muted">
                  {x}
                </span>
              ))}
            </div>
            <p className="mt-4 flex items-start gap-3 text-lg font-medium text-ink sm:text-xl">
              <Icon name="bolt" className="mt-1 h-5 w-5 shrink-0 text-violet" />
              {data.metrica.resultado}
            </p>
            <p className="mt-3 text-xs text-muted">{data.metrica.fuente}</p>
          </div>
        </AnimatedContent>
      )}
    </section>
  )
}
```

- [ ] **Step 3: AgentSpec (sección 3)**

Create `components/proposal/AgentSpec.tsx`:

```tsx
import AnimatedContent from '@/components/reactbits/AnimatedContent'
import Eyebrow from '@/components/ui/Eyebrow'
import Icon from '@/components/ui/Icon'
import type { Canal, Proposal } from '@/lib/proposals/types'

const canalInfo: Record<Canal, { icon: string; label: string }> = {
  voz: { icon: 'phone', label: 'Voz / llamadas' },
  whatsapp: { icon: 'whatsapp', label: 'WhatsApp' },
}

export default function AgentSpec({ agente }: { agente: Proposal['agente'] }) {
  return (
    <section className="border-t border-white/5 py-16 sm:py-20">
      <Eyebrow>Tu agente, ya diseñado</Eyebrow>
      <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        Te presentamos a <span className="text-grad">{agente.nombre}</span>
      </h2>

      {/* Ficha */}
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-bg-card p-5">
          <p className="text-xs uppercase tracking-wider text-muted">Canales</p>
          <div className="mt-2 flex flex-col gap-1.5">
            {agente.canales.map((c) => (
              <span key={c} className="inline-flex items-center gap-1.5 text-sm text-ink">
                <Icon name={canalInfo[c].icon} className="h-4 w-4 text-cyan" />
                {canalInfo[c].label}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-bg-card p-5">
          <p className="text-xs uppercase tracking-wider text-muted">Idioma</p>
          <p className="mt-2 text-sm text-ink">{agente.idioma}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-bg-card p-5">
          <p className="text-xs uppercase tracking-wider text-muted">Disponible</p>
          <p className="mt-2 text-sm text-ink">{agente.horario}</p>
        </div>
      </div>

      {/* Flujos: situación real -> qué hace */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
        {agente.flujos.map((f, i) => (
          <AnimatedContent key={i} delay={i * 0.08}>
            <div className="grid gap-1 border-b border-white/5 bg-bg-card p-5 last:border-0 sm:grid-cols-[1fr_1.4fr] sm:gap-6">
              <p className="text-sm font-medium text-muted">{f.situacion}</p>
              <p className="flex items-start gap-2 text-sm text-ink">
                <Icon name="arrow" className="mt-1 h-3.5 w-3.5 shrink-0 text-violet" />
                {f.respuesta}
              </p>
            </div>
          </AnimatedContent>
        ))}
      </div>

      {/* Qué NO hace + cuándo entra el humano */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-bg-card p-6">
          <p className="text-sm font-semibold text-ink">Qué no hace</p>
          <ul className="mt-3 space-y-2">
            {agente.limites.map((l, i) => (
              <li key={i} className="flex gap-2 text-sm text-muted">
                <span className="text-magenta">·</span>{l}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border-grad glass p-6">
          <p className="flex items-center gap-2 text-sm font-semibold text-ink">
            <Icon name="user" className="h-4 w-4 text-cyan" />Cuándo entra tu equipo
          </p>
          <p className="mt-3 text-sm text-muted">{agente.escalada}</p>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: ProposalPage (shell) con las tres primeras secciones**

Create `components/proposal/ProposalPage.tsx`:

```tsx
import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import { site } from '@/lib/site'
import type { Proposal } from '@/lib/proposals/types'
import Cover from './Cover'
import Diagnostico from './Diagnostico'
import AgentSpec from './AgentSpec'

export default function ProposalPage({ proposal }: { proposal: Proposal }) {
  return (
    <div className="relative min-h-screen">
      <div className="aurora-blob aurora-3 opacity-30" />

      <header className="relative mx-auto flex max-w-4xl items-center justify-between px-5 py-6 sm:px-8">
        <Link href="/" aria-label="MiAgentIA"><Logo className="h-7" /></Link>
        <span className="text-xs uppercase tracking-[0.2em] text-muted">Propuesta</span>
      </header>

      <main className="relative mx-auto max-w-4xl px-5 sm:px-8">
        <Cover proposal={proposal} />
        <Diagnostico data={proposal.diagnostico} />
        <AgentSpec agente={proposal.agente} />
      </main>

      <footer className="relative mx-auto max-w-4xl px-5 py-10 text-center text-xs text-muted sm:px-8">
        MiAgentIA · <a href={`mailto:${site.email}`} className="hover:text-ink">{site.email}</a>
      </footer>
    </div>
  )
}
```

- [ ] **Step 5: Conectar ProposalPage a la ruta**

Modify `app/propuesta/[slug]/page.tsx` — reemplazar el `import` provisional y el cuerpo del default export:

Añadir el import arriba (junto a los otros):
```tsx
import ProposalPage from '@/components/proposal/ProposalPage'
```

Reemplazar el `return` provisional del componente `Page`:
```tsx
  if (!proposal) notFound()
  return <ProposalPage proposal={proposal} />
```
(borrar la línea del `<main>...Propuesta para...` provisional).

- [ ] **Step 6: Verificar (compila + navegador)**

Run: `npx tsc --noEmit`
Expected: sin errores.

Con el dev server en 4200, abrir `http://localhost:4200/propuesta/excel-motors-7f3a`:
- Portada con "Excel Motors" en gradiente (animación palabra por palabra, sin que se corte el color).
- "Lo que vimos": 3 tarjetas numeradas + el bloque de métrica con sus insumos y la fuente.
- "Tu agente, ya diseñado": ficha de 3 columnas, tabla de flujos, bloque "Qué no hace" + "Cuándo entra tu equipo".
- Sin navbar ni footer de marketing; solo logo arriba y contacto abajo.
- Sin indicador de scroll.

- [ ] **Step 7: Commit**

```bash
git add components/proposal/ProposalPage.tsx components/proposal/Cover.tsx components/proposal/Diagnostico.tsx components/proposal/AgentSpec.tsx app/propuesta/[slug]/page.tsx
git commit -m "feat(propuesta): shell + secciones portada, diagnostico y ficha del agente"
```

---

### Task 4: Secciones 4-6 (la parte del cierre) + verificación final

Añade Alcance, Inversión y Arranque, con el único CTA de la página.

**Files:**
- Create: `components/proposal/ScopeGrid.tsx`
- Create: `components/proposal/Investment.tsx`
- Create: `components/proposal/Kickoff.tsx`
- Modify: `components/proposal/ProposalPage.tsx` (montar las tres nuevas secciones)

**Interfaces:**
- Consumes: `type Proposal` de `@/lib/proposals/types`; `@/components/ui/Eyebrow`, `@/components/ui/Icon`, `@/components/ui/Button` (default), `waLink` de `@/lib/site`.
  - `Button` (default export) props: `{ children; href?: string; variant?: 'primary'|'ghost'; className? }`. Con `href` que empieza con `http` abre en pestaña nueva con `rel="noopener noreferrer"`.
  - `waLink(msg?: string): string` construye el enlace de WhatsApp al número real del negocio.
- Produces: nada nuevo hacia afuera; completa `ProposalPage` con las seis secciones.

- [ ] **Step 1: ScopeGrid (sección 4)**

Create `components/proposal/ScopeGrid.tsx`:

```tsx
import Eyebrow from '@/components/ui/Eyebrow'
import Icon from '@/components/ui/Icon'
import type { Proposal } from '@/lib/proposals/types'

export default function ScopeGrid({ alcance }: { alcance: Proposal['alcance'] }) {
  return (
    <section className="border-t border-white/5 py-16 sm:py-20">
      <div className="grid gap-10 sm:grid-cols-2">
        <div>
          <Eyebrow>Qué incluye</Eyebrow>
          <ul className="mt-6 space-y-3">
            {alcance.incluye.map((x, i) => (
              <li key={i} className="flex gap-3 text-sm text-ink">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />{x}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Eyebrow>Qué necesitamos de ti</Eyebrow>
          <ul className="mt-6 space-y-3">
            {alcance.contraparte.map((c, i) => (
              <li key={i} className="flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-bg-card p-4 text-sm">
                <span className="text-ink">{c.item}</span>
                {c.horas && (
                  <span className="shrink-0 rounded-full [background:var(--grad)] px-2.5 py-0.5 text-xs font-semibold text-bg">
                    {c.horas}
                  </span>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted">
            Eso es todo lo que necesitamos de tu lado. Del resto nos encargamos nosotros.
          </p>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Investment (sección 5)**

Create `components/proposal/Investment.tsx`:

```tsx
import Eyebrow from '@/components/ui/Eyebrow'
import Icon from '@/components/ui/Icon'
import type { Proposal } from '@/lib/proposals/types'

export default function Investment({ inversion }: { inversion: Proposal['inversion'] }) {
  return (
    <section className="border-t border-white/5 py-16 sm:py-20">
      <Eyebrow>Inversión</Eyebrow>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {inversion.opciones.map((o, i) => (
          <div
            key={i}
            className={`relative rounded-2xl p-6 sm:p-7 ${
              o.recomendada ? 'border-grad glass' : 'border border-white/10 bg-bg-card'
            }`}
          >
            {o.recomendada && (
              <span className="absolute -top-3 left-6 rounded-full [background:var(--grad)] px-3 py-1 text-xs font-semibold text-bg">
                Recomendada
              </span>
            )}
            <h3 className="font-display text-xl font-semibold text-ink">{o.nombre}</h3>
            <div className="mt-4 space-y-1">
              <p className="text-2xl font-semibold text-ink">{o.mensual}</p>
              <p className="text-sm text-muted">más {o.setup} de implementación</p>
            </div>
            <ul className="mt-5 space-y-2">
              {o.incluye.map((x, j) => (
                <li key={j} className="flex gap-2 text-sm text-muted">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />{x}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-5 flex items-center gap-2 text-sm font-medium text-ink">
        <Icon name="sparkle" className="h-4 w-4 text-violet" />{inversion.nota}
      </p>
    </section>
  )
}
```

- [ ] **Step 3: Kickoff (sección 6, único CTA)**

Create `components/proposal/Kickoff.tsx`:

```tsx
import Button from '@/components/ui/Button'
import Eyebrow from '@/components/ui/Eyebrow'
import Icon from '@/components/ui/Icon'
import { waLink } from '@/lib/site'
import type { Proposal } from '@/lib/proposals/types'

export default function Kickoff({ proposal }: { proposal: Proposal }) {
  const msg = `Hola MiAgentIA, somos ${proposal.cliente.nombre}. Aprobamos la propuesta, ¿cómo arrancamos?`
  return (
    <section className="border-t border-white/5 py-16 sm:py-24">
      <Eyebrow>Cómo arrancamos</Eyebrow>
      <ol className="mt-8 space-y-3">
        {proposal.arranque.map((p, i) => (
          <li key={i} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-bg-card p-5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full [background:var(--grad)] text-sm font-semibold text-bg">
              {i + 1}
            </span>
            <span className="flex-1 text-ink">{p.paso}</span>
            <span className="shrink-0 text-sm font-medium text-muted">{p.fecha}</span>
          </li>
        ))}
      </ol>

      <div className="mt-10 flex flex-col items-center gap-5 rounded-3xl border-grad glass p-10 text-center">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          ¿Le damos vida a {proposal.agente.nombre}?
        </h2>
        <Button href={waLink(msg)} className="text-base">
          <Icon name="whatsapp" className="h-5 w-5" />Aprobar y arrancar
        </Button>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Montar las tres secciones en ProposalPage**

Modify `components/proposal/ProposalPage.tsx`:

Añadir los imports (junto a los de Cover/Diagnostico/AgentSpec):
```tsx
import ScopeGrid from './ScopeGrid'
import Investment from './Investment'
import Kickoff from './Kickoff'
```

Dentro del `<main>`, después de `<AgentSpec .../>`, añadir:
```tsx
        <ScopeGrid alcance={proposal.alcance} />
        <Investment inversion={proposal.inversion} />
        <Kickoff proposal={proposal} />
```

- [ ] **Step 5: Verificar (compila + lint + build)**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: los tres sin errores; `/propuesta/[slug]` prerenderizada en el output del build.

- [ ] **Step 6: Verificación manual completa en navegador**

Con el dev server en 4200, `http://localhost:4200/propuesta/excel-motors-7f3a`:
- Las seis secciones en orden: Portada → Lo que vimos → Tu agente → Qué incluye/necesitamos → Inversión (2 opciones, "WhatsApp + Voz" con insignia Recomendada, nota "sin permanencia") → Cómo arrancamos (4 pasos con fechas).
- Un solo botón en toda la página: "Aprobar y arrancar". Al pulsarlo abre `wa.me/50376294980` en pestaña nueva con el mensaje "Hola MiAgentIA, somos Excel Motors. Aprobamos la propuesta, ¿cómo arrancamos?".
- Revisar que NO haya em-dashes en el render.
- `http://localhost:4200/propuesta/no-existe` sigue dando 404.

- [ ] **Step 7: Commit**

```bash
git add components/proposal/ScopeGrid.tsx components/proposal/Investment.tsx components/proposal/Kickoff.tsx components/proposal/ProposalPage.tsx
git commit -m "feat(propuesta): secciones alcance, inversion y arranque con CTA unico a WhatsApp"
```

---

## Notas de cierre

- **Para crear una propuesta nueva:** copiar `lib/proposals/excel-motors-demo.ts` a `lib/proposals/<cliente>.ts`, cambiar el `slug` por uno no adivinable (ej. `<cliente>-<4 hex>`), llenar los campos, y agregar el import + la entrada a la lista en `lib/proposals/index.ts`. El type check obliga a completar setup y mensual.
- **Antes de mandar cualquier propuesta real:** reemplazar los `$XXX` por montos reales y confirmar que cada `metrica.fuente` es verdad (regla no-fabricar).
- **Borrar el ejemplo** (`excel-motors-demo.ts` + su entrada en `index.ts`) cuando ya no se necesite.
- **Deploy:** la ruta se prerenderiza en el build; con hacer push a `main` (Vercel) queda en producción. El enlace se comparte por WhatsApp; al ser `noindex` + bloqueada en robots, no aparece en buscadores.

## Self-review (hecho)

- **Cobertura del spec:** portada (Task 3), diagnóstico + métrica con fuente (Task 3), ficha del agente + "qué no hace" + escalada (Task 3), alcance/contraparte con horas (Task 4), inversión 2 opciones + "sin permanencia" (Task 4), arranque 4 pasos + CTA único (Task 4), ruta privada noindex + slug no adivinable + robots disallow + exclusión de sitemap + borrar robots.txt muerto (Task 2), contrato-como-checklist con prueba de ruptura (Task 1). Sin español/inglés: solo ES. Sin demos de voz/chat. Todo cubierto.
- **Sin placeholders de plan:** todo el código está completo; los `$XXX` del ejemplo son contenido intencional, no huecos del plan.
- **Consistencia de tipos:** `Proposal`, `Canal`, `Opcion`, `getProposal`, `allProposalSlugs`, `waLink`, `site.email` usados igual en todas las tareas; props de cada sección coinciden con las rebanadas del tipo definidas en la Task 1.
