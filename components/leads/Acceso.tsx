// Pantalla de clave del panel /leads. Formulario HTML plano: el POST va a
// /api/leads/acceso, que deja la cookie y vuelve aquí.
export default function Acceso({ error }: { error: boolean }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-4 text-ink">
      <form
        method="post"
        action="/api/leads/acceso"
        className="w-full max-w-sm rounded-2xl border border-line bg-bg-card p-7"
      >
        <p className="font-display text-xl font-semibold">Leads de conferencia</p>
        <p className="mt-1 text-sm text-muted">Panel del equipo de MiAgentIA.</p>

        <label htmlFor="clave" className="mt-6 block text-xs text-muted">
          Clave del equipo
        </label>
        <input
          id="clave"
          name="clave"
          type="password"
          autoComplete="current-password"
          required
          autoFocus
          className="mt-2 w-full rounded-xl border border-line bg-bg px-4 py-3 text-[16px] text-ink outline-none focus:border-cyan"
        />
        {error && <p className="mt-3 text-sm text-magenta">Esa clave no es. Inténtalo de nuevo.</p>}

        <button
          type="submit"
          className="mt-5 w-full rounded-xl bg-[linear-gradient(90deg,#22D3EE,#E879F9)] py-3 font-semibold text-bg"
        >
          Entrar
        </button>
      </form>
    </main>
  )
}
