# Propuesta comercial por cliente (plantilla web)

Fecha: 2026-07-08
Estado: diseño aprobado, pendiente de plan de implementación

## Problema

MiAgentIA no tiene un formato de propuesta. Hoy la venta se queda en la llamada de
descubrimiento y no hay un artefacto que cierre.

La propuesta se envía **después** de la llamada, cuando el prospecto ya vio los demos de
voz y de WhatsApp. Repetirlos sería decirle "no te escuché". Después de la llamada nadie
compra por asombro: compra por precisión, por la sensación de que el trabajo ya empezó y
solo falta firmar.

Las dos objeciones reales que frenan el sí (según la experiencia del usuario, no supuestas):

1. **"¿De verdad funciona en MI negocio?"** Creen en la tecnología, dudan de su caso.
2. **"¿En qué me estoy metiendo?"** Miedo al tiempo, al caos, a la implementación.

El precio no es el cuello de botella. La propuesta no necesita defender el precio, necesita
demostrar comprensión específica y quitar riesgo de ejecución.

## Objetivo

Una plantilla reutilizable: una página web por cliente, se lee en 3 minutos, y cada sección
existe para matar una de esas dos objeciones o para hacer trivial decir que sí.

## No objetivos (YAGNI)

- Sin demos de voz ni de WhatsApp. Ya los vieron.
- Sin versión en inglés. Los prospectos son SV y GT. Si cae uno en inglés, se duplica el
  archivo de datos.
- Sin exportación a PDF. Sin cuenta regresiva. Sin calculadora de ROI interactiva.
- Sin CMS ni panel de administración. Una propuesta es un archivo `.ts`.
- Sin autenticación. El slug no adivinable más `noindex` es suficiente para este contenido.

## Las seis secciones

Cada sección tiene un trabajo. Si no lo tiene, no va.

| # | Sección | Trabajo que hace |
|---|---------|------------------|
| 1 | Portada | Contexto y validez. Su nombre, su frase, la fecha límite. |
| 2 | Lo que vimos | Prueba de que escuchaste. Tres hechos suyos. |
| 3 | Tu agente, ya diseñado | Mata la objeción 1. Parece que ya lo construiste. |
| 4 | Qué incluye / qué necesitamos de ti | Mata la objeción 2. Contraparte explícita en horas. |
| 5 | Inversión | Dos opciones. Insignia "sin permanencia, mes a mes". |
| 6 | Arranque | Cuatro pasos con fechas. Un solo botón. |

### 1. Portada

Nombre del cliente en grande, la frase de su dolor **en sus palabras**, y "Válida hasta el X".
Fecha de validez estática, sin cuenta regresiva animada: eso huele a truco y aquí el objetivo
es credibilidad.

### 2. Lo que vimos

Exactamente tres hechos que el cliente dijo en la llamada. Tres, no cinco. La restricción es
del tipo (una tupla), no de la disciplina del autor.

Opcionalmente, un número: su aritmética, no la nuestra, con los insumos a la vista.

> "Nos dijiste que se pierden 40 llamadas al mes y que tu ticket promedio es de $600.
> Eso son $24,000 al mes que no entran."

El tipo obliga a declarar el origen del dato (`fuente: 'dicho por el cliente, 3 de julio'`).
Así la regla de no fabricar cifras queda cableada en el compilador, no en la memoria.

### 3. Tu agente, ya diseñado

No es una lista de servicios. Es una ficha de trabajo:

- **Identidad:** nombre del agente, canales, idioma, horario.
- **Tabla `situación real → qué hace tu agente`:** con los casos y objeciones que él mencionó.
- **Qué NO hace:** límites explícitos.
- **Cuándo pasa a un humano:** la regla de escalada.

El bloque de límites es deliberado. Admitir lo que el agente no hace compra más confianza que
prometer todo, y es la diferencia entre un documento de trabajo y un folleto. Un demo lo copia
cualquiera con Vapi; esta ficha solo la escribe quien estuvo en la llamada.

### 4. Qué incluye / qué necesitamos de ti

Dos columnas. La izquierda, el alcance. La derecha, la contraparte del cliente con las **horas
suyas explícitas** ("2 horas en total"). El miedo a implementar casi nunca es al costo: es al
tiempo y al desorden. Nombrar el número lo desactiva.

### 5. Inversión

Exactamente dos opciones (tupla de 2), cada una con setup y mensual. Insignia visible:
**sin permanencia, mes a mes**.

Setup y mensual son campos **obligatorios** del tipo. Si se olvidan, el type check falla antes
de que el link se pueda enviar. El compilador es el checklist.

### 6. Arranque

Cuatro pasos con fechas reales y un único CTA: "Aprobar y arrancar", que abre WhatsApp con el
mensaje ya redactado vía `waLink()` de `lib/site.ts`.

Un solo botón en toda la página. Cualquier otra salida es una fuga.

## Arquitectura

Unidades pequeñas, cada una con un propósito, entendibles sin leer sus internos.

```
lib/proposals/
  types.ts              # el tipo Proposal. Único contrato.
  index.ts              # registro slug -> Proposal
  excel-motors-demo.ts  # propuesta de ejemplo (placeholder, borrable)

app/propuesta/[slug]/
  page.tsx              # server component: resuelve slug, compone secciones
  not-found.tsx         # slug inexistente

components/proposal/
  Cover.tsx
  Diagnostico.tsx
  AgentSpec.tsx
  ScopeGrid.tsx
  Investment.tsx
  Kickoff.tsx
```

Cada componente recibe solo su rebanada del tipo `Proposal`. Ninguno importa el registro ni
sabe de rutas. Se pueden entender y probar por separado.

### Modelo de datos

```ts
// lib/proposals/types.ts
export type Proposal = {
  cliente: { nombre: string; industria: string; contacto: string }
  validaHasta: string              // ISO, ej. '2026-07-22'
  fraseDolor: string               // en sus palabras

  diagnostico: {
    hechos: [string, string, string]         // exactamente tres
    metrica?: { insumos: string[]; resultado: string; fuente: string }
  }

  agente: {
    nombre: string
    canales: ('voz' | 'whatsapp')[]
    idioma: string
    horario: string
    flujos: { situacion: string; respuesta: string }[]
    limites: [string, string, ...string[]]   // al menos dos
    escalada: string
  }

  alcance: {
    incluye: string[]
    contraparte: { item: string; horas?: string }[]
  }

  inversion: {
    opciones: [Opcion, Opcion]               // exactamente dos
    nota: string
  }

  arranque: [Paso, Paso, Paso, Paso]         // exactamente cuatro
}

type Opcion = {
  nombre: string
  setup: string       // obligatorio
  mensual: string     // obligatorio
  incluye: string[]
  recomendada?: boolean
}

type Paso = { paso: string; fecha: string }
```

Las tuplas de longitud fija (`hechos`, `opciones`, `arranque`) son el mecanismo que mantiene la
propuesta corta. No es una convención documentada que se erosiona: es un error de compilación.

### Ruta y privacidad

- `app/propuesta/[slug]/page.tsx`, con `generateStaticParams()` desde el registro.
- Slug no adivinable, ej. `excel-motors-7f3a`. Sin autenticación.
- `export const metadata` con `robots: { index: false, follow: false }` en la página.
- Excluida de `app/sitemap.ts` (es una lista estática, no toca nada).
- `disallow: '/propuesta/'` en `app/robots.ts`.

### Limpieza incluida

`public/robots.txt` y `app/robots.ts` coexisten hoy en el repo. Verificado contra producción:
`https://www.miagentia.com/robots.txt` devuelve una línea `Host:`, que solo genera
`app/robots.ts`. Por lo tanto `public/robots.txt` nunca se ha servido y es código muerto.

Se elimina como parte de este trabajo, porque toca exactamente la misma preocupación que
estamos modificando (bloquear `/propuesta`) y dejarlo garantiza que alguien edite el archivo
equivocado la próxima vez. No se toca nada más del repo.

### Estética

Reusa el sistema existente: gradiente cian → violeta → magenta, Framer Motion sobrio, la
tipografía y los tokens actuales.

- `SplitText` con la prop `wordClassName` para el texto con gradiente. Aplicar `text-grad` en el
  padre mientras los hijos animan con `filter`/`transform` rompe `background-clip: text`.
- Sin indicador de scroll en la portada.
- El impacto viene de que la página es corta y de que todo dice el nombre del cliente. No de
  efectos.

## Verificación

1. `npx tsc --noEmit` y `npm run build` limpios.
2. Quitar `setup` de una opción en el archivo de ejemplo debe **romper el build**. Ese es el
   contrato central del diseño; si no falla, el compilador no es el checklist y el diseño no
   se sostiene.
3. `/propuesta/excel-motors-7f3a` renderiza las seis secciones.
4. El HTML de esa ruta contiene `noindex`.
5. `/robots.txt` servido contiene `Disallow: /propuesta/`.
6. Un slug inexistente da 404.
7. El botón "Aprobar y arrancar" abre WhatsApp con el mensaje prellenado y el nombre correcto.

Verificación manual en el navegador, puerto 4200:
`Start-Process node "node_modules\next\dist\bin\next dev -p 4200"` (el shim de npm muere en
background de Bash).

## Riesgos

- **Next 16 tiene cambios de API respecto al conocimiento previo.** Leer
  `node_modules/next/dist/docs/` antes de escribir la ruta dinámica y la metadata. En
  particular `params` en rutas dinámicas y `generateMetadata`.
- **El contenido de ejemplo es placeholder.** `excel-motors-demo.ts` lleva nombres inventados y
  cifras inventadas. No debe presentarse como caso real ni como testimonio. Se borra cuando
  entre el primer cliente de verdad.

## Decisiones descartadas

- **Repetir los demos de voz y chat.** El cliente ya los vio.
- **Calculadora de ROI interactiva.** Alarga la página y empuja a fabricar cifras.
- **Tres planes de precio.** Dos bastan y el precio no es la objeción.
- **Piloto pagado o setup diferido.** Se eligió "sin permanencia, mes a mes": desarma el mismo
  miedo y cuesta mucho menos ofrecerlo.
