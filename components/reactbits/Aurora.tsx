'use client'

// Aurora — telón de fondo de glows cian/violeta/magenta con bokeh flotante.
// Los glows grandes son estáticos (fill-rate 0 por frame); la vida la dan
// las esferas bokeh en float. Barato y premium.
export default function Aurora({ dots = true }: { dots?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="aurora-blob aurora-1 animate-drift" />
      <div className="aurora-blob aurora-2 animate-drift" style={{ animationDelay: '-6s' }} />
      <div className="aurora-blob aurora-3 animate-drift" style={{ animationDelay: '-11s' }} />
      {dots && (
        <>
          <span className="absolute left-[12%] top-[28%] h-2 w-2 rounded-full bg-cyan/80 blur-[1px] animate-float" />
          <span className="absolute right-[16%] top-[22%] h-1.5 w-1.5 rounded-full bg-magenta/80 animate-float" style={{ animationDelay: '-2s' }} />
          <span className="absolute left-[24%] bottom-[24%] h-1.5 w-1.5 rounded-full bg-violet/80 animate-float" style={{ animationDelay: '-4s' }} />
          <span className="absolute right-[28%] bottom-[30%] h-2 w-2 rounded-full bg-cyan-soft/70 blur-[1px] animate-float" style={{ animationDelay: '-3s' }} />
        </>
      )}
    </div>
  )
}
