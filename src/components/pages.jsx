import React from 'react'
import { RoofScene } from './shared'
import { FAQ, FinanceCalc, QuoteForm } from './forms'
import { CTA, Footer } from './home-sections'

export const ServicesPage = ({ palette, fontPair, setPage }) => {
  const services = [
    { id: 'roofing',  t: 'Roofing',              d: 'Full replacement or targeted repair. Tear-off down to deck, inspection, new ice/water, underlayment, drip edge, starter strip, shingle or metal, ridge vent. 50-year material + 25-year workmanship warranty.', price: 'from $8,400', dur: '1–3 days', mat: 'GAF, Owens Corning, IKO, CertainTeed, Metal' },
    { id: 'windows',  t: 'Windows',               d: 'Full-frame and insert replacements. Double & triple-pane glass, low-E coatings, foam-packed jambs, proper flashing tape. Old sashes hauled away, trim re-wrapped, and the house is tighter and quieter before dinner.', price: 'from $485/window', dur: '1–2 days', mat: 'Andersen, Pella, Marvin, ProVia' },
    { id: 'gutters',  t: 'Gutters',               d: 'Seamless aluminum run on-site to the exact length of your eave. 5" standard, 6" for steeper roofs. Hidden hangers every 24", leaf guards optional, downspouts tied into existing drainage. Fascia & soffit repair bundled in.', price: 'from $9/ft', dur: '1 day', mat: 'Aluminum, copper (custom)' },
    { id: 'siding',   t: 'Siding',                d: "Vinyl, fiber cement, LP SmartSide, or cedar. Full tear-off, inspection for rot, new house-wrap, proper flashing around every window and door, and the trim is wrapped in aluminum so you're not painting in five years.", price: 'from $6.80/sqft', dur: '4–8 days', mat: 'James Hardie, LP SmartSide, CertainTeed vinyl, Cedar' },
    { id: 'concrete', t: 'Residential concrete',  d: 'Driveways, walkways, patios, steps, and stoops. Proper excavation and sub-base compaction, rebar or fiber-reinforced, 4000-psi pour, broom or stamped finish, sealed before we leave.', price: 'from $8/sqft', dur: '2–4 days', mat: '4000-psi concrete, rebar, stamped finishes' },
    { id: 'storm',    t: 'Storm response',         d: 'Free detailed post-storm inspection and a written scope of work. Same-day tarp-up on active leaks. Repair or replace once the plan is set — usually within the week.', price: 'Free inspection', dur: 'Same-day response', mat: 'Matched to existing' },
  ]
  return (
    <div>
      <section style={{ padding: '120px 40px 60px' }}>
        <div style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, opacity: 0.55 }}>Services</div>
        <h1 style={{ fontFamily: fontPair.display, fontSize: 'clamp(56px, 8vw, 120px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.94, margin: '16px 0 0', maxWidth: '14ch' }}>
          Everything<br />outside <em style={{ fontStyle: 'italic', color: palette.accent }}>your house.</em>
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.55, opacity: 0.75, maxWidth: 560, marginTop: 28 }}>
          Roofing is how we started. Windows, gutters, siding, and the concrete under your feet are how we finish the job. Same crew, same project manager, one warranty packet.
        </p>
      </section>
      <section style={{ padding: '40px 40px 100px' }}>
        <div style={{ display: 'grid', gap: 16 }}>
          {services.map((s, i) => (
            <div key={s.t} onClick={() => setPage(`service:${s.id}`)}
              style={{ padding: 32, background: palette.surface, border: `1.5px solid ${palette.ink}`, borderRadius: 20, display: 'grid', gridTemplateColumns: '80px 1.4fr 1fr auto', gap: 32, alignItems: 'center', cursor: 'pointer', transition: 'transform 0.15s, box-shadow 0.15s' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${palette.ink}15` }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div style={{ fontFamily: fontPair.display, fontSize: 48, fontWeight: 800, color: palette.accent, letterSpacing: '-0.04em' }}>{String(i + 1).padStart(2, '0')}</div>
              <div>
                <h3 style={{ fontFamily: fontPair.display, fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 8px' }}>{s.t}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.55, opacity: 0.75, margin: 0 }}>{s.d}</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[['Starting at', s.price], ['Duration', s.dur], ['Materials', s.mat]].map(([k, v]) => (
                  <div key={k} style={{ gridColumn: k === 'Materials' ? '1 / 3' : 'auto' }}>
                    <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.5, fontWeight: 700 }}>{k}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, marginTop: 2 }}>{v}</div>
                  </div>
                ))}
              </div>
              <button onClick={(e) => { e.stopPropagation(); setPage(`service:${s.id}`) }} style={{ padding: '12px 18px', background: palette.ink, color: palette.surface, border: 'none', borderRadius: 999, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
                Learn more →
              </button>
            </div>
          ))}
        </div>
      </section>
      <CTA palette={palette} fontPair={fontPair} setPage={setPage} />
      <Footer palette={palette} fontPair={fontPair} />
    </div>
  )
}

export const ProjectsPage = ({ palette, fontPair, setPage }) => {
  const [filter, setFilter] = React.useState('All')
  const cats = ['All', 'Replacement', 'Repair', 'Storm', 'Commercial']
  const projects = [
    { id: '0142', n: 'Willow Creek Colonial', cat: 'Replacement', sqft: '3,400', dur: '1 day', mat: 'GAF Timberline HDZ' },
    { id: '0138', n: 'Maple Ave Ranch', cat: 'Storm', sqft: '2,100', dur: '1 day', mat: 'Owens Corning Duration' },
    { id: '0135', n: 'Riverside Townhomes', cat: 'Commercial', sqft: '8,200', dur: '5 days', mat: 'TPO membrane' },
    { id: '0131', n: 'Oak Hollow Victorian', cat: 'Replacement', sqft: '4,100', dur: '1 day', mat: 'Standing-seam metal' },
    { id: '0127', n: 'Brookdale Cape Cod', cat: 'Repair', sqft: '1,800', dur: '6 hrs', mat: 'Matched shingle' },
    { id: '0122', n: 'Mill District Duplex', cat: 'Replacement', sqft: '2,800', dur: '1 day', mat: 'CertainTeed Landmark' },
  ]
  const filtered = filter === 'All' ? projects : projects.filter(p => p.cat === filter)
  return (
    <div>
      <section style={{ padding: '120px 40px 60px' }}>
        <div style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, opacity: 0.55 }}>Projects</div>
        <h1 style={{ fontFamily: fontPair.display, fontSize: 'clamp(56px, 8vw, 120px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.94, margin: '16px 0 0' }}>
          1,840 roofs<br /><em style={{ fontStyle: 'italic', color: palette.accent }}>and counting.</em>
        </h1>
      </section>
      <section style={{ padding: '0 40px 40px' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {cats.map(c => (
            <button key={c} onClick={() => setFilter(c)} style={{ padding: '10px 18px', background: filter === c ? palette.ink : 'transparent', color: filter === c ? palette.surface : palette.ink, border: `1.5px solid ${palette.ink}`, borderRadius: 999, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>{c}</button>
          ))}
        </div>
      </section>
      <section style={{ padding: '20px 40px 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
          {filtered.map((p, i) => (
            <div key={p.id} style={{ background: palette.surface, border: `1.5px solid ${palette.ink}`, borderRadius: 20, overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = ''}
            >
              <div style={{ aspectRatio: '16/10', background: palette.bg }}>
                <RoofScene palette={palette} variant={i % 2 === 0 ? 'a' : 'b'} id={p.id} />
              </div>
              <div style={{ padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, opacity: 0.55, fontWeight: 700 }}>#{p.id}</div>
                  <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, padding: '3px 8px', background: palette.accent, color: '#fff', borderRadius: 4 }}>{p.cat}</div>
                </div>
                <h3 style={{ fontFamily: fontPair.display, fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 16px' }}>{p.n}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, paddingTop: 16, borderTop: `1px solid ${palette.ink}15` }}>
                  {[['Sq ft', p.sqft], ['Duration', p.dur], ['Material', p.mat]].map(([k, v]) => (
                    <div key={k}>
                      <div style={{ fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.55, fontWeight: 700 }}>{k}</div>
                      <div style={{ fontSize: 13, fontWeight: 700, marginTop: 2 }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <CTA palette={palette} fontPair={fontPair} setPage={setPage} />
      <Footer palette={palette} fontPair={fontPair} />
    </div>
  )
}

export const FinancingPage = ({ palette, fontPair, setPage }) => (
  <div>
    <section style={{ padding: '120px 40px 60px' }}>
      <div style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, opacity: 0.55 }}>Financing</div>
      <h1 style={{ fontFamily: fontPair.display, fontSize: 'clamp(56px, 8vw, 120px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.94, margin: '16px 0 0' }}>
        A new roof,<br /><em style={{ fontStyle: 'italic', color: palette.accent }}>not a new stressor.</em>
      </h1>
    </section>
    <section style={{ padding: '40px 40px 80px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {[
          { t: '0%, zero payments for 18 months', d: 'No interest, no payments for 18 months. Pay the balance in full before then and you pay zero interest — ever.', tag: 'Most popular' },
          { t: '6.99% fixed, up to 10 yrs', d: 'Low fixed rate, predictable monthly. Roll the whole project in.', tag: 'Lowest payment' },
          { t: 'Cash discount', d: 'Pay upfront (check or wire) and we take 3% off the written quote.', tag: 'Save 3%' },
        ].map((p, i) => (
          <div key={p.t} style={{ padding: 32, background: i === 1 ? palette.ink : palette.surface, color: i === 1 ? palette.surface : palette.ink, border: `1.5px solid ${palette.ink}`, borderRadius: 20 }}>
            <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, padding: '3px 8px', background: palette.accent, color: '#fff', borderRadius: 4, display: 'inline-block' }}>{p.tag}</div>
            <h3 style={{ fontFamily: fontPair.display, fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', margin: '20px 0 12px' }}>{p.t}</h3>
            <p style={{ fontSize: 14.5, lineHeight: 1.6, opacity: 0.8, margin: 0 }}>{p.d}</p>
          </div>
        ))}
      </div>
    </section>
    <section style={{ padding: '40px 40px 120px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: fontPair.display, fontSize: 'clamp(36px, 4.5vw, 60px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1, margin: 0 }}>
            Ballpark your <em style={{ fontStyle: 'italic', color: palette.accent }}>monthly</em>.
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.6, opacity: 0.75, marginTop: 20 }}>Drag the sliders — this is our 6.99% fixed product. Soft credit pull for pre-qualification.</p>
        </div>
        <div style={{ padding: 32, background: palette.surface, border: `1.5px solid ${palette.ink}`, borderRadius: 20 }}>
          <FinanceCalc palette={palette} />
        </div>
      </div>
    </section>
    <CTA palette={palette} fontPair={fontPair} setPage={setPage} />
    <Footer palette={palette} fontPair={fontPair} />
  </div>
)

export const AboutPage = ({ palette, fontPair, setPage }) => (
  <div>
    <section style={{ padding: '120px 40px 60px' }}>
      <div style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, opacity: 0.55 }}>About</div>
      <h1 style={{ fontFamily: fontPair.display, fontSize: 'clamp(56px, 8vw, 120px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.94, margin: '16px 0 0', maxWidth: '14ch' }}>
        Dad started it<br />in <em style={{ fontStyle: 'italic', color: palette.accent }}>'09</em>, we're still at it.
      </h1>
    </section>
    <section style={{ padding: '40px 40px 100px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }}>
        <div style={{ aspectRatio: '4/5', background: palette.surface, border: `1.5px solid ${palette.ink}`, borderRadius: 20, overflow: 'hidden' }}>
          <RoofScene palette={palette} photo="crew-ladder" />
        </div>
        <div style={{ position: 'sticky', top: 100 }}>
          <p style={{ fontSize: 22, lineHeight: 1.45, margin: 0, letterSpacing: '-0.01em' }}>
            Ray Marek bought a used F-250 and a nail gun in 2009. By 2011 his two sons were on the crew. Today Roofs-N-More is fifteen full-time employees, two supervisors, one office manager (Mom), and a golden retriever named Shingle.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.6, opacity: 0.75, marginTop: 20 }}>
            We're not the biggest roofer in the tri-county. We don't want to be. We want to do 300 jobs a year, do them right, and have the same people on the crew in five years.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginTop: 40, paddingTop: 32, borderTop: `1.5px solid ${palette.ink}15` }}>
            {[['Founded', '2009'], ['Crew', '15 full-time'], ['Roofs done', '1,840+'], ['Review avg', '4.9 / 5.0']].map(([k, v]) => (
              <div key={k}>
                <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.55, fontWeight: 700 }}>{k}</div>
                <div style={{ fontFamily: fontPair.display, fontSize: 36, fontWeight: 800, letterSpacing: '-0.02em', marginTop: 4 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    <CTA palette={palette} fontPair={fontPair} setPage={setPage} />
    <Footer palette={palette} fontPair={fontPair} />
  </div>
)

export const QuotePage = ({ palette, fontPair, setPage, initialService = '' }) => {
  const serviceLabels = { roofing: 'Roofing', windows: 'Windows', gutters: 'Gutters', siding: 'Siding', concrete: 'Residential concrete', storm: 'Storm response', bundle: 'Multiple / bundle' }
  return (
    <div>
      <section style={{ padding: '120px 40px 40px' }}>
        <div style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, opacity: 0.55 }}>Free estimate</div>
        <h1 style={{ fontFamily: fontPair.display, fontSize: 'clamp(56px, 8vw, 120px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.94, margin: '16px 0 0', maxWidth: '14ch' }}>
          Four questions.<br /><em style={{ fontStyle: 'italic', color: palette.accent }}>Real number</em> back.
        </h1>
        {initialService && serviceLabels[initialService] && (
          <div style={{ marginTop: 24, display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 14px 8px 8px', background: palette.surface, border: `1.5px solid ${palette.ink}`, borderRadius: 999, fontSize: 13 }}>
            <span style={{ padding: '4px 10px', background: palette.accent, color: '#fff', borderRadius: 999, fontWeight: 800, letterSpacing: '0.04em', fontSize: 11, textTransform: 'uppercase' }}>Pre-filled</span>
            <span style={{ fontWeight: 700 }}>{serviceLabels[initialService]}</span>
            <button onClick={() => setPage('quote')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: palette.ink, opacity: 0.5, fontSize: 16, padding: 0, marginRight: 6, fontFamily: 'inherit' }}>×</button>
          </div>
        )}
      </section>
      <section style={{ padding: '40px 40px 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 60, alignItems: 'start' }}>
          <div style={{ padding: 40, background: palette.surface, border: `1.5px solid ${palette.ink}`, borderRadius: 24 }}>
            <QuoteForm palette={palette} initialService={initialService} />
          </div>
          <div style={{ position: 'sticky', top: 100 }}>
            <h3 style={{ fontFamily: fontPair.display, fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 24px' }}>What happens next</h3>
            {[
              { n: '01', t: 'We get your form', d: 'Instant email confirmation. Your info stays with us — never sold, never spammed.' },
              { n: '02', t: 'Call within 24 hrs', d: 'A real person (not a call center) calls to schedule the on-site visit.' },
              { n: '03', t: 'Written estimate', d: 'Emailed within 48 hours of the visit. Plain English, line-item, no mystery charges.' },
              { n: '04', t: 'No pressure', d: "Take a week to think. We don't do the 'sign-today discount' thing. The price is the price." },
            ].map((s) => (
              <div key={s.n} style={{ display: 'flex', gap: 16, padding: '18px 0', borderBottom: `1px solid ${palette.ink}15` }}>
                <div style={{ fontFamily: fontPair.display, fontSize: 20, fontWeight: 800, color: palette.accent, letterSpacing: '-0.02em', minWidth: 40 }}>{s.n}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{s.t}</div>
                  <div style={{ fontSize: 13.5, lineHeight: 1.55, opacity: 0.7 }}>{s.d}</div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 24, padding: 20, background: palette.ink, color: palette.surface, borderRadius: 14 }}>
              <div style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.7, fontWeight: 700, marginBottom: 6 }}>Emergency leak?</div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>Call (832) 991-0928</div>
              <div style={{ fontSize: 13, opacity: 0.7, marginTop: 4 }}>Same-day tarp-up, 7 days a week.</div>
            </div>
          </div>
        </div>
      </section>
      <Footer palette={palette} fontPair={fontPair} />
    </div>
  )
}

const SERVICE_DETAILS = {
  roofing: {
    id: 'roofing', label: 'Roofing', num: '01', tag: 'Flagship', photo: 'project-craftsman',
    heroA: "The roof we're", heroB: 'known for.',
    heroSub: 'Replacements, repairs, and storm response — most homes finished in a single day.',
    intro: "Roofing is how we started, and it's still 60% of what we do. Whether you need a full tear-off and replace, a targeted repair, or a post-storm inspection, the same lead foreman is on your roof from start to finish.",
    price: 'from $8,400', dur: '1–3 days', warranty: '50-yr material + 25-yr workmanship',
    deliverables: ['Tear-off down to the decking (or overlay if code allows)', 'Deck inspection — replace any rotted sheathing at cost, not markup', 'New ice-and-water shield at eaves, valleys, and penetrations', 'Synthetic underlayment — no more 30lb felt', 'Drip edge on every eave and rake', 'Starter strip, shingles or metal panels, ridge vent, pipe boots', 'Dumpster drop, magnet-sweep of the yard, ridge walk with you'],
    materials: [{ brand: 'GAF', range: 'Timberline HDZ, Grand Sequoia' }, { brand: 'Owens Corning', range: 'Duration, TruDefinition' }, { brand: 'IKO', range: 'Dynasty, Cambridge' }, { brand: 'CertainTeed', range: 'Landmark, Presidential' }, { brand: 'Metal', range: 'Standing-seam, stone-coated steel' }],
    faqs: [{ q: 'How long does a full replacement take?', a: 'Almost every residential roof we do finishes in a single day. Tear-off at 7am, new roof installed, yard swept by 5–6pm.' }, { q: 'What if you find rotted decking?', a: "We replace it at our cost on the sheathing — no surprise markup. We document every board with photos before it's covered." }, { q: 'Do you work with insurance?', a: "Yes — we document everything with drone footage and ground photos, write the scope in the format adjusters expect, and we'll meet your adjuster on the roof if you want us to." }],
  },
  windows: {
    id: 'windows', label: 'Windows', num: '02', tag: 'Efficient', photo: 'editorial-house',
    heroA: 'Windows done', heroB: 'tight.',
    heroSub: 'Full-frame and insert replacements — the house is quieter before dinner.',
    intro: 'A good window install is 20% glass and 80% what happens around it: flashing tape, foam at the jambs, properly wrapped trim.',
    price: 'from $485/window', dur: '1–2 days (full house)', warranty: 'Manufacturer + 25-yr workmanship',
    deliverables: ['Measure, photograph, and spec each opening', 'Remove old sashes and frames (full-frame) or sashes only (insert)', 'Inspect rough openings for rot and repair as needed', 'Flashing tape at sill and jambs, self-adhered head flash', 'Set new window plumb and square, low-expansion foam at perimeter', 'Re-wrap exterior trim in coil stock (no painting in 5 yrs)', 'Interior casing reinstalled and caulked, old windows hauled away'],
    materials: [{ brand: 'Andersen', range: '400, A-Series' }, { brand: 'Pella', range: 'Lifestyle, Impervia' }, { brand: 'Marvin', range: 'Elevate, Essential' }, { brand: 'ProVia', range: 'Endure, Aspect' }],
    faqs: [{ q: 'Full-frame or insert?', a: "Insert (pocket) replacement saves money and time if your existing frames are sound. Full-frame is the right call if there's rot or if you're changing sizes." }, { q: 'Can you do it in winter?', a: "Yes — we work one window at a time, never leaving an opening open for long. We'll pause if it's below 20°F for sealant performance." }, { q: 'How much energy will I actually save?', a: "Replacing single-pane aluminum with modern double-pane low-E typically cuts heating/cooling load 15–25%." }],
  },
  gutters: {
    id: 'gutters', label: 'Gutters', num: '03', tag: 'Seamless', photo: 'project-stone',
    heroA: "Gutters that don't", heroB: 'clog or sag.',
    heroSub: 'Seamless aluminum run on-site, to the inch of your eave.',
    intro: "Gutters look simple, but the details — hanger spacing, pitch, downspout sizing, where water actually lands — are what separate five-year gutters from twenty-five-year gutters.",
    price: 'from $9/linear ft', dur: '1 day', warranty: '20-yr material + 10-yr workmanship',
    deliverables: ['Run seamless aluminum on-site (no 10ft sections bolted together)', '5" standard, 6" K-style for steeper roofs or heavier pitches', 'Hidden hangers every 24" — no spike-and-ferrule', 'Proper pitch set with a laser level — 1/4" per 10 ft', 'Downspouts sized and placed to drain fast', 'Fascia inspected and repaired before install', 'Leaf guards available — micromesh or reverse-curve'],
    materials: [{ brand: 'Aluminum', range: '.027, .032 — 20+ color options' }, { brand: 'Copper', range: 'Custom, half-round or K-style' }, { brand: 'Leaf guards', range: 'LeafFilter, GutterGlove, MasterShield' }],
    faqs: [{ q: '5" or 6" gutters?', a: '5" handles most residential roofs fine. 6" is worth it for steeper pitches or larger roof areas — roughly 40% more capacity.' }, { q: 'Do leaf guards actually work?', a: "The good ones, yes — micromesh is our go-to. They're not maintenance-free but they keep 95%+ of leaves and debris out." }, { q: 'Will you repair fascia and soffit too?', a: "Yes — we catch it while we're up there. Rotted fascia gets cut out and replaced before the new gutter goes on." }],
  },
  siding: {
    id: 'siding', label: 'Siding', num: '04', tag: 'Full envelope', photo: 'about-modern',
    heroA: 'The whole envelope,', heroB: 'redone right.',
    heroSub: 'Vinyl, fiber cement, LP SmartSide, or cedar — down to the house-wrap.',
    intro: "Siding isn't just a skin. Done wrong it traps water and rots the sheathing behind it. We tear off to the wrap, inspect and flash every penetration, then install the material you actually wanted.",
    price: 'from $6.80/sqft', dur: '4–8 days', warranty: 'Manufacturer + 25-yr workmanship',
    deliverables: ['Full tear-off of existing siding', 'Inspect sheathing for rot, replace any soft boards', 'New house-wrap (Tyvek or equivalent), properly lapped and taped', 'Flashing tape around every window, door, and penetration', 'Install siding per manufacturer spec (nailing pattern, expansion gap)', 'Wrap trim in aluminum coil stock — no future painting', 'Caulk and paint touch-ups where needed'],
    materials: [{ brand: 'James Hardie', range: 'HardiePlank, HardieShingle' }, { brand: 'LP SmartSide', range: 'ExpertFinish, Trim & Fascia' }, { brand: 'CertainTeed', range: 'Monogram, Cedar Impressions' }, { brand: 'Cedar', range: 'Shingle, bevel, board-and-batten' }],
    faqs: [{ q: 'Fiber cement or vinyl?', a: "Fiber cement (Hardie) looks better, lasts 30+ years, and bumps resale value. It costs 50–80% more than vinyl. LP SmartSide splits the difference." }, { q: 'Will you match my trim color?', a: "Yes — we carry coil stock in 20+ colors and we'll pull manufacturer siding samples in natural light." }, { q: "Can you leave existing siding and just overlay?", a: "Generally no — overlay hides what's going on behind and usually shortens the siding's life. We'd rather do it once, right." }],
  },
  concrete: {
    id: 'concrete', label: 'Residential concrete', num: '05', tag: 'Flatwork', photo: 'project-framing',
    heroA: 'Flatwork that', heroB: 'stays flat.',
    heroSub: 'Driveways, walkways, patios, steps — built to last through the freeze-thaw.',
    intro: "Concrete fails because of what's underneath it, not what's on top. Proper excavation, compacted sub-base, and rebar where it matters.",
    price: 'from $8/sqft', dur: '2–4 days + cure', warranty: '5-yr workmanship (cracks beyond hairline)',
    deliverables: ['Excavate to proper depth (4–6" below finish grade)', '4" compacted crushed stone sub-base', 'Rebar grid or fiber-reinforced mix depending on load', '4000-psi pour, minimum 4" thick (driveways 5–6")', 'Broom finish, stamped, or exposed aggregate', 'Control joints cut within 24 hours', 'Cure sealer applied before we leave'],
    materials: [{ brand: 'Concrete', range: '4000-psi, air-entrained' }, { brand: 'Reinforcement', range: 'Rebar grid or macro-fiber' }, { brand: 'Finishes', range: 'Broom, stamped, exposed, smooth-trowel' }, { brand: 'Sealer', range: 'Solvent-based cure & seal' }],
    faqs: [{ q: 'How long before I can drive on it?', a: "7 days for cars, 14 days for heavy vehicles. Foot traffic is fine after 24 hours." }, { q: 'Will it crack?', a: "All concrete cracks — the question is whether you see them. Control joints give the cracks a place to go where they're not visible." }, { q: 'Stamped or broom finish?', a: "Broom for durability and slip resistance. Stamped for patios where the look matters. Stamped costs 40–60% more and needs resealing every 3–5 years." }],
  },
  storm: {
    id: 'storm', label: 'Storm response', num: '06', tag: 'Same-day', photo: 'crew-ladder',
    heroA: "When it's leaking", heroB: 'right now.',
    heroSub: 'Same-day tarp-up, written scope within 48 hours.',
    intro: "If there's water in your house, nothing else matters until there isn't. We dispatch a tarp crew same-day, then come back with a real inspection once things are dry.",
    price: 'Free inspection · tarp-up billed to insurance when possible', dur: 'Same-day tarp · repair within the week', warranty: 'Matched to repair or replacement warranty',
    deliverables: ['Same-day emergency tarp-up on active leaks', 'Detailed post-storm inspection with drone + ground photos', 'Written scope of work formatted for insurance adjusters', 'Meet your adjuster on the roof if helpful', 'Repair or full replacement once the plan is set', 'Matched shingles, flashing, and underlayment'],
    materials: [{ brand: 'Tarp', range: 'Heavy-duty reinforced poly' }, { brand: 'Repair', range: 'Matched to existing — we keep common brands in stock' }, { brand: 'Storm damage', range: 'Hail, wind, ice dam, tree strike' }],
    faqs: [{ q: 'How fast can you get there?', a: "Same day during business hours, usually within 2–3 hours. Call (832) 991-0928." }, { q: 'Do you handle insurance claims?', a: "We document everything and write the scope in the format your adjuster expects. You stay in control." }, { q: 'What if the damage turns out to be minor?', a: "Then we do a minor repair. We don't push replacements for damage that doesn't warrant them." }],
  },
  bundle: {
    id: 'bundle', label: 'Bundle & save', num: '07', tag: 'Package', photo: 'about-farmhouse',
    heroA: 'One crew.', heroB: 'One project manager.',
    heroSub: 'Bundle roofing with siding, windows, or gutters — usually 8–12% less.',
    intro: "If you're doing a roof and the gutters are sagging, or the siding needs help and the windows are drafty, it's cheaper to do it all while the crew is on-site.",
    price: 'Typically 8–12% off combined scope', dur: 'Scoped per project', warranty: 'Combined workmanship warranty',
    deliverables: ['Single project manager across every trade', 'One combined estimate with bundle pricing', "Sequenced schedule so trades don't step on each other", 'One mobilization, one dumpster, shared overhead', 'Single warranty packet covering all the work', 'One number to call if anything needs looking at'],
    materials: [{ brand: 'Any combination', range: 'Roofing + Siding + Windows + Gutters + Concrete' }],
    faqs: [{ q: 'Do I have to do it all at once?', a: "No — we can phase it. But if things happen within ~60 days, we can usually hold bundle pricing." }, { q: 'How much do I actually save?', a: "Usually 8–12% versus doing each project standalone. The savings come from shared mobilization, dumpster, permits, and overhead." }, { q: 'Where do I start?', a: "Tell us everything you're thinking about on the quote form, and we'll walk your house with you." }],
  },
}

export const ServiceDetailPage = ({ palette, fontPair, setPage, serviceId }) => {
  const svc = SERVICE_DETAILS[serviceId]
  if (!svc) {
    return (
      <div style={{ padding: '160px 40px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: fontPair.display, fontSize: 48 }}>Service not found</h1>
        <button onClick={() => setPage('services')} style={{ marginTop: 20, padding: '12px 24px', background: palette.ink, color: palette.surface, border: 'none', borderRadius: 999, fontWeight: 700, cursor: 'pointer' }}>All services →</button>
      </div>
    )
  }
  const goQuote = () => setPage(`quote:${svc.id}`)
  return (
    <div>
      <section style={{ padding: '120px 40px 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, opacity: 0.55, marginBottom: 12 }}>
          <button onClick={() => setPage('services')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', padding: 0, fontFamily: 'inherit', fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, opacity: 0.8 }}>← Services</button>
          <span>/</span>
          <span>{svc.num} · {svc.label}</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 60, alignItems: 'end' }}>
          <div>
            <h1 style={{ fontFamily: fontPair.display, fontSize: 'clamp(48px, 7vw, 104px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.95, margin: '8px 0 0', maxWidth: '14ch' }}>
              {svc.heroA}<br /><em style={{ fontStyle: 'italic', color: palette.accent }}>{svc.heroB}</em>
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.55, opacity: 0.75, maxWidth: 560, marginTop: 24 }}>{svc.heroSub}</p>
            <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
              <button onClick={goQuote} style={{ padding: '16px 26px', background: palette.accent, color: '#fff', border: 'none', borderRadius: 999, fontSize: 14, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: `4px 4px 0 ${palette.ink}` }}>
                Get a {svc.label.toLowerCase()} quote →
              </button>
              <a href="tel:8329910928" style={{ padding: '16px 26px', background: 'transparent', color: palette.ink, border: `1.5px solid ${palette.ink}`, borderRadius: 999, fontSize: 14, fontWeight: 700, textDecoration: 'none', fontFamily: 'inherit' }}>(832) 991-0928</a>
            </div>
          </div>
          <div style={{ aspectRatio: '4/5', borderRadius: 20, overflow: 'hidden', border: `1.5px solid ${palette.ink}` }}>
            <RoofScene palette={palette} photo={svc.photo} />
          </div>
        </div>
      </section>

      <section style={{ padding: '20px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, border: `1.5px solid ${palette.ink}`, borderRadius: 16, overflow: 'hidden', background: palette.surface }}>
          {[['Starting at', svc.price], ['Duration', svc.dur], ['Warranty', svc.warranty], ['Tag', svc.tag]].map(([k, v], i) => (
            <div key={k} style={{ padding: '20px 22px', borderRight: i < 3 ? `1.5px solid ${palette.ink}15` : 'none' }}>
              <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.5, fontWeight: 700 }}>{k}</div>
              <div style={{ fontSize: 15, fontWeight: 700, marginTop: 4 }}>{v}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '80px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 80 }}>
          <div>
            <div style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, opacity: 0.55 }}>What's included</div>
            <h2 style={{ fontFamily: fontPair.display, fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, margin: '12px 0 24px' }}>Every {svc.label.toLowerCase()} job includes.</h2>
            <p style={{ fontSize: 16, lineHeight: 1.65, opacity: 0.75, margin: 0 }}>{svc.intro}</p>
          </div>
          <div>
            {svc.deliverables.map((d, i) => (
              <div key={i} style={{ display: 'flex', gap: 18, padding: '16px 0', borderBottom: i < svc.deliverables.length - 1 ? `1px solid ${palette.ink}15` : 'none' }}>
                <div style={{ fontFamily: fontPair.display, fontSize: 14, fontWeight: 800, color: palette.accent, minWidth: 28, paddingTop: 2 }}>{String(i + 1).padStart(2, '0')}</div>
                <div style={{ fontSize: 15, lineHeight: 1.5 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 40px', background: palette.ink, color: palette.surface }}>
        <div style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, opacity: 0.6 }}>Materials we install</div>
        <h2 style={{ fontFamily: fontPair.display, fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, margin: '12px 0 40px', maxWidth: '20ch' }}>
          Brands we <em style={{ fontStyle: 'italic', color: palette.accent }}>stand behind.</em>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(svc.materials.length, 4)}, 1fr)`, gap: 20 }}>
          {svc.materials.map((m) => (
            <div key={m.brand} style={{ padding: 24, border: `1px solid ${palette.surface}22`, borderRadius: 14 }}>
              <div style={{ fontFamily: fontPair.display, fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>{m.brand}</div>
              <div style={{ fontSize: 13, opacity: 0.65, marginTop: 8, lineHeight: 1.5 }}>{m.range}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '100px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 80 }}>
          <div>
            <div style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, opacity: 0.55 }}>FAQ</div>
            <h2 style={{ fontFamily: fontPair.display, fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, margin: '12px 0 0' }}>Common questions.</h2>
          </div>
          <FAQ palette={palette} items={svc.faqs} />
        </div>
      </section>

      <section style={{ padding: '120px 40px', background: palette.accent, color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 900 }}>
          <div style={{ fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, opacity: 0.75 }}>Ready to start</div>
          <h2 style={{ fontFamily: fontPair.display, fontSize: 'clamp(48px, 7vw, 104px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.95, margin: '12px 0 24px' }}>
            Get a {svc.label.toLowerCase()} quote.
          </h2>
          <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
            <button onClick={goQuote} style={{ padding: '18px 28px', background: palette.ink, color: palette.surface, border: 'none', borderRadius: 999, fontSize: 14, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
              Start my {svc.label.toLowerCase()} quote →
            </button>
            <a href="tel:8329910928" style={{ padding: '18px 28px', background: 'transparent', color: '#fff', border: `1.5px solid #fff`, borderRadius: 999, fontSize: 14, fontWeight: 700, textDecoration: 'none', fontFamily: 'inherit' }}>Or call (832) 991-0928</a>
          </div>
        </div>
      </section>

      <Footer palette={palette} fontPair={fontPair} />
    </div>
  )
}
