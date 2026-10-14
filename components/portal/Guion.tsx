'use client'

// Formulario del guion. Es lo que se le pregunta al cliente para poder
// escribir al agente: para qué lo quiere, qué tiene que lograr, con qué se
// conecta y qué NO debe hacer.
//
// Las respuestas de acá deciden el alcance, así que las que mueven el precio
// son obligatorias y el resto no. Se guarda mientras se escribe: el cliente
// puede cerrar y volver.

import { useRouter } from 'next/navigation'
import {
  CALENDARIOS,
  CANALES,
  CRMS,
  IDIOMAS,
  OBJETIVOS,
  OBJETIVO_OTRO,
  PRECIO_OBJETIVO,
  TONOS,
  USOS,
  dinero,
  objetivosExtra,
} from './catalogo'
import { guionCompleto, usePortal } from './estado'
import { Area, Avanzar, Barra, Campo, Fichas, Lista, Opcion, Titulo } from './piezas'

export default function Guion() {
  const router = useRouter()
  const { estado, setGuion, set } = usePortal()
  const g = estado.guion
  const listo = guionCompleto(g)
  const extra = objetivosExtra(g.objetivos)

  function alternar(campo: 'canales' | 'idiomas' | 'objetivos', valor: string) {
    const previo = g[campo]
    setGuion({
      [campo]: previo.includes(valor) ? previo.filter((x) => x !== valor) : [...previo, valor],
    })
  }

  function seguir() {
    set({ guionListo: true })
    router.push('/portal/funciones')
  }

  return (
    <>
      <Titulo
        eyebrow="Paso 2 de 5"
        bajada="Con esto escribimos el guion del agente. No hace falta que esté perfecto: lo repasamos juntos en la llamada de arranque."
      >
        Cuéntanos qué tiene que <span className="text-grad">hacer tu agente</span>.
      </Titulo>

      <Bloque titulo="Tu negocio">
        <div className="grid gap-4 sm:grid-cols-2">
          <Campo etiqueta="Empresa" valor={g.empresa} onChange={(v) => setGuion({ empresa: v })} placeholder="Nombre con el que te conocen" />
          <Campo etiqueta="Quién nos escribe" valor={g.contacto} onChange={(v) => setGuion({ contacto: v })} placeholder="Nombre y cargo" />
          <Campo etiqueta="Correo" tipo="email" valor={g.email} onChange={(v) => setGuion({ email: v })} placeholder="tu@empresa.com" />
          <Campo etiqueta="WhatsApp" valor={g.whatsapp} onChange={(v) => setGuion({ whatsapp: v })} placeholder="Con código de país" />
        </div>
      </Bloque>

      <Bloque titulo="Para qué lo vas a usar">
        <div className="grid gap-3 sm:grid-cols-3">
          {USOS.map((u) => (
            <Opcion
              key={u.id}
              activa={g.uso === u.id}
              onClick={() => setGuion({ uso: u.id })}
              titulo={u.nombre}
              desc={u.desc}
            />
          ))}
        </div>
      </Bloque>

      <Bloque
        titulo="Qué tiene que lograr"
        nota={`Elige los que apliquen. El primero va dentro de la implementación; cada objetivo más suma ${dinero(PRECIO_OBJETIVO)}, porque es otro guion que escribir y probar.`}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {OBJETIVOS.map((o) => (
            <Opcion
              key={o.id}
              activa={g.objetivos.includes(o.id)}
              onClick={() => alternar('objetivos', o.id)}
              titulo={o.nombre}
            />
          ))}
          <Opcion
            activa={g.objetivos.includes(OBJETIVO_OTRO)}
            onClick={() => alternar('objetivos', OBJETIVO_OTRO)}
            titulo="Otro"
          />
        </div>

        {/* El campo aparece solo si marcó Otro: en blanco no se puede escribir
            un guion ni cobrarlo, así que la barra de abajo no deja seguir. */}
        {g.objetivos.includes(OBJETIVO_OTRO) && (
          <div className="mt-3">
            <Campo
              etiqueta="Cuál"
              valor={g.objetivoOtro}
              onChange={(v) => setGuion({ objetivoOtro: v })}
              placeholder="Lo que tiene que lograr, en tus palabras"
            />
          </div>
        )}

        {extra > 0 && (
          <p className="mt-5 flex flex-wrap items-center gap-2 text-sm text-muted">
            <span className="rounded-full border border-cyan/40 bg-cyan/10 px-2.5 py-1 text-xs text-ink">
              {g.objetivos.length} objetivos
            </span>
            suman {dinero(extra * PRECIO_OBJETIVO)} a la implementación.
          </p>
        )}
      </Bloque>

      <Bloque titulo="Canales e integraciones">
        <div className="space-y-6">
          <Fichas etiqueta="Por dónde te escriben" opciones={CANALES} elegidas={g.canales} onToggle={(v) => alternar('canales', v)} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Lista etiqueta="CRM" valor={g.crm} onChange={(v) => setGuion({ crm: v })} opciones={CRMS} />
            <Lista etiqueta="Calendario" valor={g.calendario} onChange={(v) => setGuion({ calendario: v })} opciones={CALENDARIOS} />
          </div>
        </div>
      </Bloque>

      <Bloque titulo="Cómo habla">
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Lista etiqueta="Tono" valor={g.tono} onChange={(v) => setGuion({ tono: v })} opciones={[...TONOS]} />
            <Campo etiqueta="Horario de atención" valor={g.horario} onChange={(v) => setGuion({ horario: v })} placeholder="Lun a vie, 8am a 6pm" />
          </div>
          <Fichas etiqueta="Idiomas" opciones={IDIOMAS} elegidas={g.idiomas} onToggle={(v) => alternar('idiomas', v)} />
          <Area
            etiqueta="Qué NO debe hacer"
            valor={g.queNoHace}
            onChange={(v) => setGuion({ queNoHace: v })}
            placeholder="Por ejemplo: no da descuentos, no habla de la competencia, no promete fechas de entrega."
          />
          <Area
            etiqueta="Algo más que debamos saber"
            valor={g.notas}
            onChange={(v) => setGuion({ notas: v })}
            placeholder="Las tres preguntas que más te hacen, lo que siempre se te cae, cómo cobras."
            filas={2}
          />
        </div>
      </Bloque>

      <Barra
        izquierda={
          <p className="text-sm text-muted">
            {listo
              ? 'Listo. Ahora elige qué sabe hacer.'
              : g.objetivos.includes(OBJETIVO_OTRO) && !g.objetivoOtro.trim()
                ? 'Escribe cuál es ese otro objetivo.'
                : 'Falta empresa, contacto, correo, uso, al menos un objetivo y al menos un canal.'}
          </p>
        }
      >
        <Avanzar onClick={seguir} disabled={!listo}>
          Elegir funciones
        </Avanzar>
      </Barra>
    </>
  )
}

function Bloque({
  titulo,
  nota,
  children,
}: {
  titulo: string
  nota?: string
  children: React.ReactNode
}) {
  return (
    <section className="mt-10 border-t border-white/5 pt-8">
      <h2 className="font-display text-lg font-semibold text-ink">{titulo}</h2>
      {nota && <p className="mt-1.5 text-sm text-muted">{nota}</p>}
      <div className="mt-5">{children}</div>
    </section>
  )
}
