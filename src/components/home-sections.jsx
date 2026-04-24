import React from 'react'
import { RoofScene, BeforeAfter } from './shared'
import { FinanceCalc, FAQ } from './forms'

export const TrustBar = ({ palette }) => (
  <section style={{ padding: '20px 40px', borderTop: `1.5px solid ${palette.ink}15`, borderBottom: `1.5px solid ${palette.ink}15`, background: palette.surface }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' }}>
      {['GAF Master Elite', 'Owens Corning Preferred', 'IKO Shield Pro', 'CertainTeed SELECT', 'Greater Houston Local'].map((b) => (
        <div key={b} style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.04em', opacity: 0.55 }}>
          <span style={{ fontFamily: 'ui-monospace, monospace', opacity: 0.5, marginRight: 8 }}>★</span>{b}
        </div>
      ))}
    </div>
  </section>
)

export const ServicesGrid = ({ palette, fontPair, setPage }) => {
  const services = [
    { id: 'roofing',   t: 'Roofing',              d: 'Full replacements, repairs, and storm response. Tear-off, deck inspection, premium shingle or metal, 50-yr material warranty.', tag: 'Flagship',      emoji: '01' },
    { id: 'windows',   t: 'Windows',               d: 'Energy-efficient replacement windows — double & triple-pane vinyl, fiberglass, and wood-clad. Clean install, no drafty corners.', tag: 'Efficient',    emoji: '02' },
    { id: 'gutters',   t: 'Gutters',               d: 'Seamless 5" and 6" aluminum run on-site to the inch. Leaf guards, downspouts, fascia wrap — nothing clogs, nothing sags.', tag: 'Seamless',       emoji: '03' },
    { id: 'siding',    t: 'Siding',                d: "Vinyl, fiber cement, LP SmartSide, and cedar. Tear-off, house-wrap, trim, and fresh gables — the whole envelope redone right.", tag: 'Full envelope', emoji: '04' },
    { id: 'concrete',  t: 'Residential concrete',  d: 'Driveways, walkways, patios, and steps. Proper sub-base, rebar where it matters, broom or stamped finish. Cured hard, not hasty.', tag: 'Flatwork',   emoji: '05' },
    { id: 'bundle',    t: 'Bundle & save',          d: 'Pairing roofing with siding, windows, or gutters? Same crew, same project manager, one combined estimate — usually 8–12% less.', tag: 'Package',    emoji: '06' },
  ]
  return (
    <section style={{ padding: '100px 40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, gap: 40 }}>
        <div>
          <div style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, opacity: 0.55 }}>What we do</div>
          <h2 style={{ fontFamily: fontPair.display, fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1, margin: '12px 0 0', maxWidth: '18ch' }}>
            Six specialties,<br /><em style={{ fontStyle: 'italic', color: palette.accent }}>one crew</em> that owns the outcome.
          </h2>
        </div>
        <button onClick={() => setPage('services')} style={{ padding: '14px 22px', background: 'transparent', border: `1.5px solid ${palette.ink}`, color: palette.ink, borderRadius: 999, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
          All services →
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: `1.5px solid ${palette.ink}`, borderRadius: 20, overflow: 'hidden', background: palette.surface }}>
        {services.map((s, i) => (
          <div key={s.t} onClick={() => setPage(`service:${s.id}`)}
            style={{ padding: 32, borderRight: (i % 3 !== 2) ? `1.5px solid ${palette.ink}15` : 'none', borderBottom: i < 3 ? `1.5px solid ${palette.ink}15` : 'none', transition: 'background 0.2s', cursor: 'pointer', position: 'relative' }}
            onMouseEnter={(e) => e.currentTarget.style.background = palette.bg}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
              <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, opacity: 0.5, fontWeight: 700 }}>— {s.emoji}</div>
              <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, padding: '3px 8px', background: palette.accent, color: '#fff', borderRadius: 4 }}>{s.tag}</div>
            </div>
            <h3 style={{ fontFamily: fontPair.display, fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 10px' }}>{s.t}</h3>
            <p style={{ fontSize: 14, lineHeight: 1.55, opacity: 0.7, margin: 0 }}>{s.d}</p>
            <div style={{ marginTop: 20, fontSize: 12, fontWeight: 700, letterSpacing: '0.04em' }}>Learn more →</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export const Process = ({ palette, fontPair }) => {
  const steps = [
    { n: '01', t: 'Get your instant quote', d: "Most customers arrive here after using our online roof quote app — two minutes, real number, no back-and-forth. Haven't used it yet? Start there." },
    { n: '02', t: 'Free on-site visit', d: 'A real roofer climbs up, measures, photographs, and walks you through what we see — same or next day. This is when we lock in your quote.' },
    { n: '03', t: 'Order materials & schedule', d: "We order your shingles, flashing, and underlayment, then schedule your install date around your calendar and the weather." },
    { n: '04', t: 'One-day install', d: 'Dumpster dropped, yard tarped, tear-off at 7am. Every home finishes in a single day — magnet-sweep the lawn, walk the roof with you, hand you the warranty paperwork. Done.' },
  ]
  return (
    <section style={{ padding: '100px 40px', background: palette.ink, color: palette.surface }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, gap: 40 }}>
        <div>
          <div style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, opacity: 0.55 }}>How it works</div>
          <h2 style={{ fontFamily: fontPair.display, fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1, margin: '12px 0 0' }}>
            From quote to cleanup,<br />in <em style={{ fontStyle: 'italic', color: palette.accent }}>four honest steps.</em>
          </h2>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, position: 'relative' }}>
        <div style={{ position: 'absolute', top: 30, left: '12.5%', right: '12.5%', height: 1, background: `${palette.surface}33`, zIndex: 0 }} />
        {steps.map((s) => (
          <div key={s.n} style={{ padding: '0 16px', position: 'relative', zIndex: 1 }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: palette.accent, color: '#fff', display: 'grid', placeItems: 'center', fontFamily: fontPair.display, fontSize: 20, fontWeight: 800, marginBottom: 20, letterSpacing: '-0.02em' }}>{s.n}</div>
            <h3 style={{ fontFamily: fontPair.display, fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 8px' }}>{s.t}</h3>
            <p style={{ fontSize: 13.5, lineHeight: 1.55, opacity: 0.7, margin: 0 }}>{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export const ProjectsFeature = ({ palette, fontPair, setPage }) => (
  <section style={{ padding: '100px 40px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, gap: 40 }}>
      <div>
        <div style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, opacity: 0.55 }}>Recent work</div>
        <h2 style={{ fontFamily: fontPair.display, fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1, margin: '12px 0 0' }}>
          Drag to see<br /><em style={{ fontStyle: 'italic', color: palette.accent }}>the difference.</em>
        </h2>
      </div>
      <button onClick={() => setPage('projects')} style={{ padding: '14px 22px', background: 'transparent', border: `1.5px solid ${palette.ink}`, color: palette.ink, borderRadius: 999, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
        Full gallery →
      </button>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 }}>
      <BeforeAfter palette={palette} />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 28, border: `1.5px solid ${palette.ink}`, borderRadius: 16, background: palette.surface }}>
        <div>
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, opacity: 0.55, fontWeight: 700, marginBottom: 12 }}>Project #0142 — Willow Creek</div>
          <h3 style={{ fontFamily: fontPair.display, fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 12px' }}>34 sq. Full tear-off + ridge vent upgrade</h3>
          <p style={{ fontSize: 14, lineHeight: 1.6, opacity: 0.75, margin: 0 }}>
            Post-hail full tear-off. 3-tab shingles replaced with architectural 50-year, new drip edge and step flashing, added 22ft of ridge vent. One-day job, like every home we do.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 28, paddingTop: 24, borderTop: `1px solid ${palette.ink}22` }}>
          {[['Material', 'GAF Timberline'], ['Duration', '1 day'], ['Warranty', '50 yrs']].map(([k, v]) => (
            <div key={k}>
              <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.55, fontWeight: 700 }}>{k}</div>
              <div style={{ fontSize: 15, fontWeight: 700, marginTop: 2 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
)

export const Testimonials = ({ palette, fontPair }) => {
  const [idx, setIdx] = React.useState(0)
  const reviews = [
    { q: "They showed up at 7 on the dot, were off the roof by sundown, and the lawn was cleaner than when they started. One day, start to finish.", n: 'Marjorie K.', l: 'The Woodlands' },
    { q: "Quote was exactly what we paid. No surprise charges, no ghosting. Just... professionals doing what they said they'd do.", n: 'Derek & Anh P.', l: 'Katy' },
    { q: "They were the only crew who actually climbed up to check before giving me a number. The quote was detailed and matched the final invoice exactly.", n: 'Tomás R.', l: 'League City' },
    { q: "I got three quotes. They weren't the cheapest but they were the only ones who climbed up there before quoting. Easy choice.", n: 'Janine W.', l: 'Sugar Land' },
  ]
  React.useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % reviews.length), 5500)
    return () => clearInterval(id)
  }, [])
  return (
    <section style={{ padding: '100px 40px', background: palette.secondary, color: palette.surface }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 40 }}>
        <div style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, opacity: 0.8 }}>★ 4.9 from 486 customer reviews</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {reviews.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} style={{ width: i === idx ? 28 : 8, height: 8, borderRadius: 4, border: 'none', background: i === idx ? palette.surface : `${palette.surface}55`, transition: 'all 0.3s', cursor: 'pointer', padding: 0 }} />
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', minHeight: 240 }}>
        <blockquote key={idx} style={{ fontFamily: fontPair.display, fontSize: 'clamp(28px, 3.6vw, 52px)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.15, margin: 0, maxWidth: '22ch', animation: 'fade-up 0.6s ease' }}>
          "{reviews[idx].q}"
        </blockquote>
      </div>
      <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 44, height: 44, borderRadius: '50%', background: palette.accent, display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: 15 }}>
          {reviews[idx].n.split(' ').map(w => w[0]).join('').slice(0, 2)}
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15 }}>{reviews[idx].n}</div>
          <div style={{ fontSize: 13, opacity: 0.7 }}>{reviews[idx].l} · Verified customer</div>
        </div>
      </div>
      <style>{`@keyframes fade-up { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }`}</style>
    </section>
  )
}

export const FinancingTeaser = ({ palette, fontPair, setPage }) => (
  <section style={{ padding: '100px 40px' }}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
      <div>
        <div style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, opacity: 0.55 }}>Financing</div>
        <h2 style={{ fontFamily: fontPair.display, fontSize: 'clamp(36px, 4.5vw, 60px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1, margin: '12px 0 20px' }}>
          Spread it out.<br /><em style={{ fontStyle: 'italic', color: palette.accent }}>0%, zero payments for 18 months</em>, or fixed-rate up to 10 years.
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.6, opacity: 0.75, maxWidth: 500, margin: 0 }}>
          Qualified homeowners can roll the full project into a low monthly. Soft credit check — no hit to your score.
        </p>
        <button onClick={() => setPage('financing')} style={{ marginTop: 24, padding: '14px 22px', background: palette.ink, color: palette.surface, border: 'none', borderRadius: 999, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
          See financing options →
        </button>
      </div>
      <div style={{ padding: 28, background: palette.surface, border: `1.5px solid ${palette.ink}`, borderRadius: 20 }}>
        <FinanceCalc palette={palette} />
      </div>
    </div>
  </section>
)

export const ServiceArea = ({ palette, fontPair }) => {
  const [hovered, setHovered] = React.useState(null)
  const counties = [
    { id: 'montgomery', path: 'M30,4 L72,4 L74,28 L58,28 L50,26 L40,28 L28,28 Z' },
    { id: 'liberty',    path: 'M74,4 L96,4 L96,40 L78,42 L74,30 Z' },
    { id: 'waller',     path: 'M6,18 L28,28 L28,52 L12,52 L4,42 Z' },
    { id: 'harris',     path: 'M28,28 L40,28 L50,26 L58,28 L74,28 L78,42 L76,56 L64,64 L50,68 L36,64 L28,56 Z' },
    { id: 'chambers',   path: 'M76,56 L96,42 L96,74 L82,78 L74,70 Z' },
    { id: 'fortbend',   path: 'M12,52 L28,56 L36,64 L40,78 L30,92 L12,88 L4,70 Z' },
    { id: 'brazoria',   path: 'M30,92 L40,78 L50,68 L64,64 L66,82 L58,96 L42,96 Z' },
    { id: 'galveston',  path: 'M64,64 L76,56 L74,70 L82,78 L74,92 L66,82 Z' },
  ]
  const cities = [
    { n: 'Houston',       county: 'harris',     x: 50, y: 50, size: 'xl', jobs: 1284 },
    { n: 'Katy',          county: 'harris',     x: 33, y: 48, size: 'lg', jobs: 412 },
    { n: 'Cypress',       county: 'harris',     x: 40, y: 36, size: 'md', jobs: 288 },
    { n: 'Tomball',       county: 'harris',     x: 44, y: 30, size: 'md', jobs: 196 },
    { n: 'Humble',        county: 'harris',     x: 60, y: 36, size: 'md', jobs: 241 },
    { n: 'Baytown',       county: 'harris',     x: 72, y: 50, size: 'lg', jobs: 318 },
    { n: 'Pasadena',      county: 'harris',     x: 60, y: 58, size: 'md', jobs: 264 },
    { n: 'The Woodlands', county: 'montgomery', x: 52, y: 20, size: 'lg', jobs: 487 },
    { n: 'Conroe',        county: 'montgomery', x: 46, y: 14, size: 'md', jobs: 203 },
    { n: 'Sugar Land',    county: 'fortbend',   x: 26, y: 72, size: 'lg', jobs: 356 },
    { n: 'Richmond',      county: 'fortbend',   x: 18, y: 78, size: 'sm', jobs: 112 },
    { n: 'League City',   county: 'galveston',  x: 70, y: 72, size: 'lg', jobs: 298 },
    { n: 'Galveston',     county: 'galveston',  x: 74, y: 86, size: 'md', jobs: 142 },
    { n: 'Pearland',      county: 'brazoria',   x: 52, y: 76, size: 'lg', jobs: 274 },
    { n: 'Angleton',      county: 'brazoria',   x: 48, y: 90, size: 'sm', jobs: 68 },
    { n: 'Mont Belvieu',  county: 'chambers',   x: 82, y: 62, size: 'sm', jobs: 84 },
    { n: 'Liberty',       county: 'liberty',    x: 86, y: 22, size: 'sm', jobs: 72 },
    { n: 'Hempstead',     county: 'waller',     x: 14, y: 36, size: 'sm', jobs: 58 },
  ]
  const sizePx = { sm: 10, md: 14, lg: 20, xl: 28 }
  return (
    <section style={{ padding: '100px 40px', background: palette.surface, borderTop: `1.5px solid ${palette.ink}15`, borderBottom: `1.5px solid ${palette.ink}15` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, gap: 40 }}>
        <div>
          <div style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, opacity: 0.55 }}>Service area</div>
          <h2 style={{ fontFamily: fontPair.display, fontSize: 'clamp(36px, 4.5vw, 60px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1, margin: '12px 0 0' }}>
            Harris County<br />& <em style={{ fontStyle: 'italic', color: palette.accent }}>every county</em> touching it.
          </h2>
        </div>
        <div style={{ fontSize: 14, opacity: 0.7, maxWidth: 320 }}>Nine-county coverage across Greater Houston. Hover a pin for project count.</div>
      </div>
      <div style={{ position: 'relative', aspectRatio: '1 / 1', maxHeight: 620, border: `1.5px solid ${palette.ink}`, borderRadius: 20, overflow: 'hidden', background: palette.bg }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          {Array.from({ length: 20 }).map((_, i) => <line key={`v${i}`} x1={i * 5} y1="0" x2={i * 5} y2="100" stroke={palette.ink} strokeOpacity="0.05" strokeWidth="0.1" />)}
          {Array.from({ length: 20 }).map((_, i) => <line key={`h${i}`} x1="0" y1={i * 5} x2="100" y2={i * 5} stroke={palette.ink} strokeOpacity="0.05" strokeWidth="0.1" />)}
          <path d="M96,74 L96,100 L58,100 L66,82 L74,92 L82,78 Z" fill={palette.secondary} fillOpacity="0.08" />
          <text x="88" y="96" fontFamily="ui-monospace, monospace" fontSize="2.2" fill={palette.ink} fillOpacity="0.4" textAnchor="end" letterSpacing="0.2">GULF OF MEXICO</text>
          {counties.map((c) => {
            const isHarris = c.id === 'harris'
            return (
              <g key={c.id}>
                <path d={c.path} fill={isHarris ? palette.accent : palette.ink} fillOpacity={isHarris ? 0.14 : 0.04} stroke={palette.ink} strokeOpacity={isHarris ? 0.55 : 0.28} strokeWidth={isHarris ? 0.4 : 0.25} strokeLinejoin="round" />
              </g>
            )
          })}
          <text x="50" y="48" fontFamily="ui-monospace, monospace" fontSize="2.4" fontWeight="700" fill={palette.ink} textAnchor="middle" letterSpacing="0.3">HARRIS</text>
          <text x="50" y="18" fontFamily="ui-monospace, monospace" fontSize="2" fill={palette.ink} fillOpacity="0.55" textAnchor="middle" letterSpacing="0.25">MONTGOMERY</text>
          <text x="86" y="18" fontFamily="ui-monospace, monospace" fontSize="2" fill={palette.ink} fillOpacity="0.55" textAnchor="middle" letterSpacing="0.25">LIBERTY</text>
          <text x="14" y="42" fontFamily="ui-monospace, monospace" fontSize="2" fill={palette.ink} fillOpacity="0.55" textAnchor="middle" letterSpacing="0.25">WALLER</text>
          <text x="18" y="72" fontFamily="ui-monospace, monospace" fontSize="2" fill={palette.ink} fillOpacity="0.55" textAnchor="middle" letterSpacing="0.25">FORT BEND</text>
          <text x="48" y="86" fontFamily="ui-monospace, monospace" fontSize="2" fill={palette.ink} fillOpacity="0.55" textAnchor="middle" letterSpacing="0.25">BRAZORIA</text>
          <text x="72" y="78" fontFamily="ui-monospace, monospace" fontSize="2" fill={palette.ink} fillOpacity="0.55" textAnchor="middle" letterSpacing="0.25">GALVESTON</text>
          <text x="86" y="66" fontFamily="ui-monospace, monospace" fontSize="2" fill={palette.ink} fillOpacity="0.55" textAnchor="middle" letterSpacing="0.25">CHAMBERS</text>
        </svg>
        {cities.map((c) => {
          const px = sizePx[c.size]
          const isHQ = c.n === 'Houston'
          return (
            <div key={c.n} onMouseEnter={() => setHovered(c.n)} onMouseLeave={() => setHovered(null)} style={{ position: 'absolute', left: `${c.x}%`, top: `${c.y}%`, transform: 'translate(-50%, -50%)', cursor: 'pointer', zIndex: hovered === c.n ? 5 : 2 }}>
              <div style={{ width: px, height: px, borderRadius: '50%', background: isHQ ? palette.ink : palette.accent, border: `2px solid ${isHQ ? palette.surface : palette.ink}`, boxShadow: hovered === c.n ? `0 0 0 ${px * 0.6}px ${palette.accent}30` : `0 2px 6px ${palette.ink}22`, transition: 'box-shadow 0.2s' }} />
              {(c.size === 'lg' || c.size === 'xl') && (
                <div style={{ position: 'absolute', top: px + 4, left: '50%', transform: 'translateX(-50%)', fontSize: c.size === 'xl' ? 13 : 11, fontWeight: 800, color: palette.ink, whiteSpace: 'nowrap', textShadow: `0 0 4px ${palette.surface}, 0 0 8px ${palette.surface}`, pointerEvents: 'none', letterSpacing: '-0.01em' }}>{c.n}</div>
              )}
              <div style={{ position: 'absolute', bottom: px + 14, left: '50%', transform: 'translateX(-50%)', background: palette.ink, color: palette.surface, padding: '6px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap', opacity: hovered === c.n ? 1 : 0, pointerEvents: 'none', transition: 'opacity 0.15s', boxShadow: `0 4px 12px ${palette.ink}33` }}>
                {c.n} · {c.jobs} jobs
              </div>
            </div>
          )
        })}
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%) translateY(-30px)', pointerEvents: 'none' }}>
          <div style={{ padding: '3px 8px', background: palette.ink, color: palette.surface, fontSize: 9, fontWeight: 800, letterSpacing: '0.12em', borderRadius: 4 }}>HQ</div>
        </div>
        <div style={{ position: 'absolute', left: 16, bottom: 16, padding: '10px 14px', background: palette.surface, border: `1px solid ${palette.ink}22`, borderRadius: 10, fontSize: 11, display: 'flex', gap: 14, alignItems: 'center', boxShadow: `0 4px 12px ${palette.ink}11` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: palette.accent, border: `1.5px solid ${palette.ink}` }} />
            <span style={{ fontWeight: 700 }}>City we serve</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 14, height: 14, borderRadius: 3, background: palette.accent, opacity: 0.3, border: `1px solid ${palette.ink}44` }} />
            <span style={{ opacity: 0.7 }}>Harris County</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export const FAQSection = ({ palette, fontPair }) => (
  <section style={{ padding: '100px 40px' }}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 60 }}>
      <div>
        <div style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, opacity: 0.55 }}>FAQ</div>
        <h2 style={{ fontFamily: fontPair.display, fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1, margin: '12px 0 0' }}>
          The <em style={{ fontStyle: 'italic', color: palette.accent }}>real</em> questions people ask.
        </h2>
      </div>
      <FAQ palette={palette} items={[
        { q: 'How long does a roof replacement actually take?', a: "One day. Every residential tear-off and install finishes in a single day — we bring a second crew for larger homes so the number doesn't change. Weather can push it a day." },
        { q: "What's your warranty?", a: '50 years on the shingle (manufacturer-backed), 25 years on workmanship (us), and 10 years on repairs. All transferable once to a new homeowner.' },
        { q: "Why shouldn't I just hire the cheapest quote?", a: "The cheap quote usually skips the tear-off (shingles over shingles = voided manufacturer warranty), uses 3-tabs instead of architectural, and doesn't include the flashing or drip edge. Read the scope, not just the total." },
        { q: "Can you repair hail or storm damage?", a: "Yes. After a storm we'll come out for a free detailed inspection and give you a written scope documenting what we find. Emergency tarp service is available if the roof is actively leaking." },
      ]} />
    </div>
  </section>
)

export const CTA = ({ palette, fontPair, setPage }) => (
  <section style={{ padding: '120px 40px', background: palette.ink, color: palette.surface, position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', top: -100, right: -80, width: 400, height: 400, borderRadius: '50%', background: palette.accent, opacity: 0.15 }} />
    <div style={{ position: 'relative' }}>
      <h2 style={{ fontFamily: fontPair.display, fontSize: 'clamp(56px, 9vw, 140px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.95, margin: 0, maxWidth: '12ch' }}>
        Ready when<br />you are, <em style={{ fontStyle: 'italic', color: palette.accent }}>neighbor.</em>
      </h2>
      <div style={{ display: 'flex', gap: 14, marginTop: 40, alignItems: 'center', flexWrap: 'wrap' }}>
        <button onClick={() => setPage('quote')} style={{ padding: '18px 28px', background: palette.accent, color: '#fff', border: 'none', borderRadius: 999, fontSize: 15, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: `5px 5px 0 ${palette.surface}` }}>Get a free estimate →</button>
        <button style={{ padding: '18px 22px', background: 'transparent', color: palette.surface, border: `1.5px solid ${palette.surface}44`, borderRadius: 999, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Call (832) 991-0928</button>
        <div style={{ fontSize: 13, opacity: 0.7, marginLeft: 8 }}>A live human answers quickly during business hours</div>
      </div>
    </div>
  </section>
)

export const Footer = ({ palette, fontPair }) => (
  <footer style={{ padding: '60px 40px 40px', background: palette.bg, borderTop: `1.5px solid ${palette.ink}15` }}>
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40 }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/assets/logo.png" alt="" style={{ width: 44, height: 44, objectFit: 'contain' }} />
          <div style={{ fontFamily: fontPair.display, fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em' }}>Roofs-N-More</div>
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.6, opacity: 0.7, marginTop: 16, maxWidth: 360 }}>Family-run roofing & exteriors serving Greater Houston since 2009.</p>
      </div>
      {[
        { h: 'Services', l: ['Roofing', 'Windows', 'Gutters', 'Siding', 'Residential concrete'] },
        { h: 'Company', l: ['About', 'Crew', 'Reviews', 'Careers', 'Press'] },
        { h: 'Contact', l: ['(832) 991-0928', 'info@roofsnmore.com', '437 Holly Branch Ln., Kemah, TX 77565', 'Mon–Sat · 7a–7p'] },
      ].map((col) => (
        <div key={col.h}>
          <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, opacity: 0.55, marginBottom: 16 }}>{col.h}</div>
          {col.l.map((x) => <div key={x} style={{ fontSize: 14, padding: '6px 0', opacity: 0.85 }}>{x}</div>)}
        </div>
      ))}
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 48, paddingTop: 20, borderTop: `1px solid ${palette.ink}15`, fontSize: 12, opacity: 0.55 }}>
      <div>© 2026 Roofs-N-More LLC. All rights reserved.</div>
      <div>Privacy · Terms · Accessibility</div>
    </div>
  </footer>
)
