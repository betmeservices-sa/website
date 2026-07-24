import type { Metadata } from 'next'

// Página privada: no está enlazada desde ningún lado del sitio, no aparece
// en el sitemap, y queda bloqueada en robots.txt. Solo es accesible para
// quien reciba este link directamente. El slug es un token aleatorio, no
// una ruta adivinable.
export const metadata: Metadata = {
  title: 'Seguridad y privacidad de tus datos',
  robots: { index: false, follow: false },
  alternates: { canonical: '/confianza-5da3ff939845' },
}

export default function Page() {
  return (
    <>
      <style>{`
        .cf-page{
          --bg:#05050A; --bg-soft:#0A0A14; --bg-card:#0D0D18; --bg-card-2:#111120;
          --line: rgba(255,255,255,.08); --line-strong: rgba(255,255,255,.14);
          --cyan:#22D3EE; --cyan-soft:#67E8F9; --violet:#8B5CF6; --magenta:#E879F9;
          --ink:#EDEDF5; --muted:#9A9AB0; --muted-dim:#6E6E82;
          --amber:#F0B84B; --amber-soft:#3A2E14;
          --grad: linear-gradient(120deg, #22D3EE 0%, #8B5CF6 48%, #E879F9 100%);
          --display: -apple-system, "Segoe UI Semibold", "Segoe UI", "Century Gothic", Futura, sans-serif;
          --body: -apple-system, "Segoe UI", Inter, Helvetica, Arial, sans-serif;
          background:var(--bg); color:var(--ink);
          font-family:var(--body); -webkit-font-smoothing:antialiased;
          overflow-x:hidden;
        }
        .cf-page *{box-sizing:border-box;}
        .cf-page ::selection{ background: rgba(139,92,246,.35); color:#fff; }

        .cf-page .wrap{ max-width:1080px; margin:0 auto; padding:0 24px; }
        .cf-page section{ position:relative; }

        .cf-page .hero{ padding:96px 0 64px; overflow:hidden; }
        .cf-page .hero::before{
          content:""; position:absolute; inset:-20% -10% auto -10%; height:70%;
          background:radial-gradient(60% 60% at 30% 20%, rgba(34,211,238,.16), transparent 65%),
                     radial-gradient(50% 50% at 80% 10%, rgba(232,121,249,.14), transparent 65%);
          pointer-events:none;
        }
        .cf-page .eyebrow{
          display:inline-flex; align-items:center; gap:8px;
          font-family:var(--display); font-size:12px; letter-spacing:.14em; text-transform:uppercase;
          color:var(--cyan-soft); border:1px solid var(--line-strong); border-radius:999px;
          padding:7px 14px; background:rgba(255,255,255,.02);
        }
        .cf-page .eyebrow .dot{ width:6px;height:6px;border-radius:50%;background:var(--cyan); box-shadow:0 0 10px var(--cyan);}
        .cf-page h1{
          font-family:var(--display); font-weight:700; letter-spacing:-.01em;
          font-size:clamp(30px,4.4vw,54px); line-height:1.08; margin:22px 0 0; text-wrap:balance;
        }
        .cf-page h1 .grad{
          background:var(--grad); -webkit-background-clip:text; background-clip:text; color:transparent;
        }
        .cf-page .lead{ font-size:clamp(16px,1.6vw,19px); line-height:1.7; color:var(--muted); max-width:56ch; margin:22px 0 0; }

        .cf-page .scope-row{ display:flex; flex-wrap:wrap; gap:10px; margin-top:28px; }
        .cf-page .pill{
          font-family:var(--body); font-size:13px; color:var(--ink);
          border:1px solid var(--line-strong); border-radius:999px; padding:8px 14px;
          background:var(--bg-card);
        }
        .cf-page .pill b{ color:var(--cyan-soft); font-weight:600; }

        .cf-page .section-head{ margin-bottom:34px; }
        .cf-page .kicker{ font-family:var(--display); font-size:12px; letter-spacing:.14em; text-transform:uppercase; color:var(--muted-dim); }
        .cf-page h2{ font-family:var(--display); font-weight:700; font-size:clamp(22px,2.6vw,32px); line-height:1.22; margin:8px 0 0; text-wrap:balance; }
        .cf-page .sub{ color:var(--muted); font-size:15.5px; line-height:1.7; margin:10px 0 0; max-width:60ch; }

        .cf-page .band{ padding:64px 0; border-top:1px solid var(--line); }

        .cf-page .grid4{ display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-top:8px; }
        @media (max-width:920px){ .cf-page .grid4{ grid-template-columns:repeat(2,1fr); } }
        @media (max-width:520px){ .cf-page .grid4{ grid-template-columns:1fr; } }
        .cf-page .card{
          background:var(--bg-card); border:1px solid var(--line); border-radius:14px;
          padding:22px 20px;
        }
        .cf-page .card .ic{ color:var(--cyan); margin-bottom:14px; }
        .cf-page .card h3{ font-family:var(--display); font-size:15.5px; font-weight:600; margin:0 0 8px; color:var(--ink); }
        .cf-page .card p{ font-size:13.5px; line-height:1.6; color:var(--muted); margin:0; }

        .cf-page .roles{ display:flex; flex-direction:column; gap:12px; margin-top:8px; }
        .cf-page .role{
          display:grid; grid-template-columns:150px 1fr auto; align-items:center; gap:18px;
          background:var(--bg-card); border:1px solid var(--line); border-radius:12px; padding:16px 20px;
        }
        @media (max-width:640px){ .cf-page .role{ grid-template-columns:1fr; gap:8px; } }
        .cf-page .role .who{ font-family:var(--display); font-weight:700; font-size:14.5px; }
        .cf-page .role.superadmin .who{ color:var(--magenta); }
        .cf-page .role.admin .who{ color:var(--violet); }
        .cf-page .role.agente .who{ color:var(--cyan-soft); }
        .cf-page .role .desc{ font-size:13.5px; color:var(--muted); }
        .cf-page .role .cap{ display:flex; gap:6px; flex-wrap:wrap; justify-content:flex-end; }
        @media (max-width:640px){ .cf-page .role .cap{ justify-content:flex-start; } }
        .cf-page .cap-tag{
          font-size:11.5px; font-family:var(--body); border-radius:999px; padding:4px 10px;
          border:1px solid var(--line-strong); color:var(--muted);
        }
        .cf-page .cap-tag.yes{ color:#7CE0A8; border-color:rgba(124,224,168,.35); background:rgba(124,224,168,.06); }
        .cf-page .cap-tag.no{ color:#F29A9A; border-color:rgba(242,154,154,.3); background:rgba(242,154,154,.05); }

        .cf-page .timeline{ position:relative; margin-top:44px; padding-top:10px; }
        .cf-page .tl-line{
          position:absolute; top:29px; left:0; right:0; height:2px;
          background:linear-gradient(90deg, var(--cyan) 0%, var(--violet) 45%, var(--line) 45%, var(--line) 100%);
        }
        .cf-page .tl-points{ display:grid; grid-template-columns:1fr 1fr 1fr; gap:20px; position:relative; }
        @media (max-width:720px){ .cf-page .tl-points{ grid-template-columns:1fr; } .cf-page .tl-line{ display:none; } }
        .cf-page .tl-point{ padding-top:0; }
        .cf-page .tl-dot{
          width:18px; height:18px; border-radius:50%; background:var(--bg);
          border:2px solid var(--cyan); margin-bottom:16px; position:relative; z-index:1;
        }
        .cf-page .tl-point:nth-child(2) .tl-dot{ border-color:var(--violet); }
        .cf-page .tl-point:nth-child(3) .tl-dot{ border-color:var(--muted-dim); background:var(--bg-card); }
        .cf-page .tl-day{ font-family:var(--display); font-size:12px; letter-spacing:.08em; text-transform:uppercase; color:var(--muted-dim); margin-bottom:6px; }
        .cf-page .tl-title{ font-family:var(--display); font-weight:700; font-size:16px; margin-bottom:8px; }
        .cf-page .tl-desc{ font-size:13.5px; line-height:1.65; color:var(--muted); max-width:32ch; }

        .cf-page .limits{ display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-top:8px; }
        @media (max-width:720px){ .cf-page .limits{ grid-template-columns:1fr; } }
        .cf-page .limit{
          display:flex; gap:14px; align-items:flex-start;
          background:var(--bg-card); border:1px solid var(--line); border-radius:12px; padding:18px 20px;
        }
        .cf-page .limit .ic{ color:var(--amber); flex:none; margin-top:2px; }
        .cf-page .limit h3{ font-family:var(--display); font-size:14.5px; font-weight:600; margin:0 0 6px; }
        .cf-page .limit p{ font-size:13.5px; line-height:1.6; color:var(--muted); margin:0; }

        .cf-page .split{ display:grid; grid-template-columns:1fr 1fr; gap:1px; margin-top:8px; background:var(--line); border:1px solid var(--line); border-radius:14px; overflow:hidden; }
        @media (max-width:720px){ .cf-page .split{ grid-template-columns:1fr; } }
        .cf-page .split-col{ background:var(--bg-card); padding:26px 24px; }
        .cf-page .split-col.you{ border-top:2px solid var(--cyan); }
        .cf-page .split-col.us{ border-top:2px solid var(--violet); }
        .cf-page .split-kicker{ font-family:var(--display); font-size:11.5px; letter-spacing:.12em; text-transform:uppercase; margin-bottom:14px; }
        .cf-page .split-col.you .split-kicker{ color:var(--cyan-soft); }
        .cf-page .split-col.us .split-kicker{ color:var(--violet); }
        .cf-page .split-col ul{ margin:0; padding:0; list-style:none; display:flex; flex-direction:column; gap:12px; }
        .cf-page .split-col li{ font-size:14px; line-height:1.6; color:var(--muted); padding-left:18px; position:relative; }
        .cf-page .split-col li::before{ content:"—"; position:absolute; left:0; color:var(--muted-dim); }
        .cf-page .split-note{
          margin-top:16px; font-size:13px; line-height:1.6; color:var(--muted-dim);
          border:1px solid var(--line); border-radius:12px; padding:14px 18px; background:var(--bg-card);
        }
        .cf-page .split-note b{ color:var(--ink); }

        .cf-page .foot{
          padding:56px 0 80px; border-top:1px solid var(--line);
          display:flex; justify-content:space-between; align-items:flex-end; gap:24px; flex-wrap:wrap;
        }
        .cf-page .foot .note{ font-size:13px; color:var(--muted-dim); max-width:52ch; line-height:1.6; }
        .cf-page .foot .links{ display:flex; gap:10px; flex-wrap:wrap; }
        .cf-page .foot a{
          font-family:var(--display); font-size:13px; color:var(--ink); text-decoration:none;
          border:1px solid var(--line-strong); border-radius:999px; padding:9px 16px;
          transition:border-color .15s, color .15s;
        }
        .cf-page .foot a:hover{ border-color:var(--cyan); color:var(--cyan-soft); }
        .cf-page .foot a:focus-visible{ outline:2px solid var(--cyan); outline-offset:2px; }

        @media (prefers-reduced-motion: no-preference){
          .cf-page .reveal{ animation:cf-rise .6s ease-out both; }
        }
        @keyframes cf-rise{ from{opacity:0; transform:translateY(10px);} to{opacity:1; transform:translateY(0);} }
      `}</style>

      <div className="cf-page">
        <div className="wrap">
          <section className="hero reveal">
            <span className="eyebrow"><span className="dot"></span>Seguridad y privacidad</span>
            <h1>Cómo cuidamos los datos<br />que pasan por <span className="grad">MiAgentIA</span></h1>
            <p className="lead">Un resumen claro, sin letra pequeña, de los controles de acceso, autenticación y manejo de información que aplican a tu cuenta y a las conversaciones de tus clientes.</p>
            <div className="scope-row">
              <span className="pill">Disponible en <b>El Salvador y Guatemala</b></span>
              <span className="pill">Operado por <b>BetMe Services</b></span>
              <span className="pill">Rige el <b>Contrato de Servicio</b> firmado con tu empresa</span>
            </div>
          </section>

          <section className="band">
            <div className="section-head">
              <div className="kicker">Controles activos</div>
              <h2>Cuatro capas de protección sobre tu cuenta</h2>
              <p className="sub">Aplican desde el primer día, sin configuración adicional de tu parte.</p>
            </div>
            <div className="grid4">
              <div className="card">
                <div className="ic"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg></div>
                <h3>Doble factor obligatorio</h3>
                <p>Todas las cuentas del Panel requieren una app autenticadora además de la contraseña — nadie entra solo con clave.</p>
              </div>
              <div className="card">
                <div className="ic"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/></svg></div>
                <h3>Reautenticación diaria</h3>
                <p>Las sesiones expiran cada 24 horas. Cada persona vuelve a iniciar sesión todos los días, sin excepción.</p>
              </div>
              <div className="card">
                <div className="ic"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="2.6"/></svg></div>
                <h3>Mínimo privilegio</h3>
                <p>Cada persona —de tu equipo o del nuestro— ve solo lo necesario para su función, nunca todo por defecto.</p>
              </div>
              <div className="card">
                <div className="ic"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 4h16v6H4z"/><path d="M4 14h10v6H4z"/><path d="M17 14l3 3-3 3" /></svg></div>
                <h3>Bitácora de auditoría</h3>
                <p>Cada acceso y cada descarga queda registrada, con fecha y usuario.</p>
              </div>
            </div>
          </section>

          <section className="band">
            <div className="section-head">
              <div className="kicker">Dentro de tu cuenta</div>
              <h2>No todos tus usuarios ven ni pueden lo mismo</h2>
              <p className="sub">Tú decides quién ocupa cada rol dentro del Panel. Así se reparten los permisos por defecto.</p>
            </div>
            <div className="roles">
              <div className="role superadmin">
                <div className="who">Super Administrador</div>
                <div className="desc">Ve todas las conversaciones de la cuenta y configura los demás roles.</div>
                <div className="cap"><span className="cap-tag yes">Puede descargar grabaciones</span></div>
              </div>
              <div className="role admin">
                <div className="who">Administrador</div>
                <div className="desc">Ve conversaciones, contactos y estadísticas de su área.</div>
                <div className="cap"><span className="cap-tag no">No descarga grabaciones</span></div>
              </div>
              <div className="role agente">
                <div className="who">Agente / Usuario</div>
                <div className="desc">Ve solo las conversaciones asignadas a su propio trabajo.</div>
                <div className="cap"><span className="cap-tag no">No descarga grabaciones</span></div>
              </div>
            </div>
          </section>

          <section className="band">
            <div className="section-head">
              <div className="kicker">Ciclo de vida del dato</div>
              <h2>Qué pasa con una llamada después de atenderla</h2>
              <p className="sub">El audio completo no se queda para siempre — se reduce automáticamente a lo esencial.</p>
            </div>
            <div className="timeline">
              <div className="tl-line"></div>
              <div className="tl-points">
                <div className="tl-point">
                  <div className="tl-dot"></div>
                  <div className="tl-day">Día 0</div>
                  <div className="tl-title">Ocurre la conversación</div>
                  <div className="tl-desc">Se guardan el audio, la transcripción completa y los metadatos de la llamada o el chat de WhatsApp.</div>
                </div>
                <div className="tl-point">
                  <div className="tl-dot"></div>
                  <div className="tl-day">Días 1–90</div>
                  <div className="tl-title">Disponible en su forma íntegra</div>
                  <div className="tl-desc">El Super Administrador puede consultar y descargar el audio y la transcripción completa.</div>
                </div>
                <div className="tl-point">
                  <div className="tl-dot"></div>
                  <div className="tl-day">Día 90+</div>
                  <div className="tl-title">Solo queda el Resumen</div>
                  <div className="tl-desc">El audio y la transcripción completa se eliminan. En el perfil del cliente permanece únicamente un resumen generado por IA.</div>
                </div>
              </div>
            </div>
          </section>

          <section className="band">
            <div className="section-head">
              <div className="kicker">Límites, con toda intención</div>
              <h2>Lo que decidimos no hacer</h2>
              <p className="sub">Tan importante como lo que protegemos es lo que restringimos por diseño.</p>
            </div>
            <div className="limits">
              <div className="limit">
                <div className="ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3v12M6 9l6 6 6-6"/><path d="M4 19h16"/></svg></div>
                <div><h3>No vendemos ni compartimos tus datos</h3><p>Ningún dato se usa con fines de publicidad de terceros, ni se vende bajo ninguna circunstancia.</p></div>
              </div>
              <div className="limit">
                <div className="ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a4 4 0 0 1 8 0v2"/><circle cx="12" cy="13.5" r="1.4"/></svg></div>
                <div><h3>No entrenamos modelos propios con tu información</h3><p>Las conversaciones se procesan para responderte, no para mejorar modelos de terceros.</p></div>
              </div>
              <div className="limit">
                <div className="ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3l3 6 6 1-4.5 4.5L17.5 21 12 17.5 6.5 21l1-6.5L3 10l6-1z"/></svg></div>
                <div><h3>No cualquiera descarga grabaciones</h3><p>Solo el Super Administrador de tu cuenta puede exportar audio o transcripciones completas.</p></div>
              </div>
              <div className="limit">
                <div className="ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 21s7-6.5 7-11a7 7 0 1 0-14 0c0 4.5 7 11 7 11Z"/><circle cx="12" cy="10" r="2.4"/></svg></div>
                <div><h3>No operamos fuera de El Salvador y Guatemala</h3><p>Por ahora, el servicio está disponible únicamente para negocios de estos dos países.</p></div>
              </div>
            </div>
          </section>

          <section className="band">
            <div className="section-head">
              <div className="kicker">Cómo se reparte la responsabilidad</div>
              <h2>Tú decides qué dice el agente. Nosotros operamos la tecnología.</h2>
              <p className="sub">MiAgentIA es la infraestructura; las reglas de tu negocio las pones tú.</p>
            </div>
            <div className="split">
              <div className="split-col you">
                <div className="split-kicker">Tú defines</div>
                <ul>
                  <li>El guion, el tono y los límites del agente.</li>
                  <li>A quién, cuándo y con qué frecuencia contactar.</li>
                  <li>El cumplimiento de las normas propias de tu sector (cobros, horarios de contacto, consentimiento de tus clientes).</li>
                  <li>Cuándo el agente debe pasar la conversación a una persona de tu equipo.</li>
                </ul>
              </div>
              <div className="split-col us">
                <div className="split-kicker">Nosotros operamos</div>
                <ul>
                  <li>La infraestructura, la disponibilidad y la seguridad del Panel.</li>
                  <li>La configuración inicial del agente según las reglas que tú nos des.</li>
                  <li>El soporte técnico y los cambios de configuración que solicites.</li>
                  <li>No supervisamos ni intervenimos en el contenido de tus conversaciones.</li>
                </ul>
              </div>
            </div>
            <p className="split-note">Si un cliente te pregunta directamente si está hablando con una inteligencia artificial, el agente <b>responde con la verdad</b>.</p>
          </section>

          <section className="foot">
            <p className="note">Esto es un resumen orientativo para clientes. La Política de Privacidad, los Términos de Servicio y el Contrato de Prestación de Servicios firmado son los documentos que rigen legalmente esta relación.</p>
            <div className="links">
              <a href="https://www.miagentia.com/privacidad" target="_blank" rel="noopener noreferrer">Política de privacidad</a>
              <a href="https://www.miagentia.com/terminos" target="_blank" rel="noopener noreferrer">Términos de servicio</a>
              <a href="mailto:hola@miagentia.com">Escribir a MiAgentIA</a>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
