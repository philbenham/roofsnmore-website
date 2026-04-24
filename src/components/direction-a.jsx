import React from 'react'
import { RoofScene } from './shared'
import { TrustBar, ServicesGrid, Process, ProjectsFeature, Testimonials, FinancingTeaser, ServiceArea, FAQSection, CTA, Footer } from './home-sections'
import { ServicesPage, ProjectsPage, FinancingPage, AboutPage, QuotePage, ServiceDetailPage } from './pages'

const SERVICE_IDS = ['roofing','windows','gutters','siding','concrete','bundle','storm']
const PATH_TO_PAGE = {
  '/': 'home',
  '/services': 'services',
  '/projects': 'projects',
  '/portfolio': 'projects',
  '/financing': 'financing',
  '/about': 'about',
  '/about-us': 'about',
  '/contact': 'quote',
  '/quote': 'quote',
}
const PAGE_TO_PATH = {
  home: '/', services: '/services', projects: '/projects',
  financing: '/financing', about: '/about-us', quote: '/quote',
}
const pageFromUrl = () => {
  if (typeof window === 'undefined') return 'home'
  const path = window.location.pathname.replace(/\/$/, '') || '/'
  if (PATH_TO_PAGE[path]) return PATH_TO_PAGE[path]
  const seg = path.slice(1)
  if (SERVICE_IDS.includes(seg)) return 'service:' + seg
  const params = new URLSearchParams(window.location.search)
  const p = params.get('p')
  if (p) return p
  return 'home'
}
const pathForPage = (page) => {
  if (page.startsWith('service:')) return '/' + page.split(':')[1]
  if (page.startsWith('quote:')) return '/quote?service=' + page.split(':')[1]
  return PAGE_TO_PATH[page] || '/'
}

const SERVICE_NAV = [
  { id: 'roofing',  label: 'Roofing',             desc: 'Replacement, repair & storm' },
  { id: 'windows',  label: 'Windows',              desc: 'Full-frame & insert replacements' },
  { id: 'gutters',  label: 'Gutters',              desc: 'Seamless aluminum, leaf guards' },
  { id: 'siding',   label: 'Siding',               desc: 'Vinyl, Hardie, LP SmartSide' },
  { id: 'concrete', label: 'Residential Concrete', desc: 'Driveways, patios, walkways' },
  { id: 'storm',    label: 'Storm Response',       desc: 'Same-day tarp-up & inspection' },
  { id: 'bundle',   label: 'Bundle & Save',        desc: 'Combine services, save 8–12%' },
]

export const DirectionA = ({ palette, fontPair, heroVariant }) => {
  const [page, setPageRaw] = React.useState(pageFromUrl)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [servicesOpen, setServicesOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const scrollRef = React.useRef(null)
  const servicesRef = React.useRef(null)

  const setPage = React.useCallback((next) => {
    setPageRaw(next)
    try {
      const path = pathForPage(next)
      if (path !== window.location.pathname + window.location.search) {
        window.history.pushState({ page: next }, '', path)
      }
    } catch (e) { /* noop */ }
  }, [])

  React.useEffect(() => {
    const onPop = () => setPageRaw(pageFromUrl())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  React.useEffect(() => {
    const titles = {
      home: "Roofs-N-More | Houston Roofing, Siding, Windows & Gutters",
      services: "Our Services | Roofs-N-More",
      projects: "Our Work | Roofs-N-More",
      financing: "0% Financing for 18 Months | Roofs-N-More",
      about: "About Roofs-N-More | Family-Run Kemah Roofers Since 2015",
      quote: "Get a Free Quote | Roofs-N-More",
    }
    let t
    if (page.startsWith('service:')) {
      const svc = page.split(':')[1]
      const nice = svc.charAt(0).toUpperCase() + svc.slice(1)
      t = nice + " | Roofs-N-More Houston"
    } else {
      t = titles[page] || titles.home
    }
    document.title = t
  }, [page])

  React.useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => setScrolled(el.scrollTop > 40)
    el.addEventListener('scroll', onScroll)
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0
    setMenuOpen(false)
  }, [page])

  const navItems = ['Home', 'Services', 'Projects', 'Financing', 'About', 'Quote']

  return (
    <div style={{ width: '100%', height: '100%', background: palette.bg, color: palette.ink, fontFamily: fontPair.body, position: 'relative', overflow: 'hidden' }}>
      {/* Nav */}
      <nav style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50,
        padding: scrolled ? '14px 40px' : '22px 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? `${palette.bg}ee` : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? `1px solid ${palette.ink}15` : '1px solid transparent',
        transition: 'all 0.25s',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => setPage('home')}>
          <img src="assets/logo.png" alt="" style={{ width: 36, height: 36, objectFit: 'contain' }} />
          <div style={{ fontFamily: fontPair.display, fontWeight: 800, fontSize: 18, letterSpacing: '-0.02em', lineHeight: 1 }}>
            Roofs-N-More
            <div style={{ fontFamily: fontPair.body, fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.55, marginTop: 2, fontWeight: 600 }}>Est. 2009 · Family-run · Kemah, TX</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {navItems.slice(0, 5).map((n) => {
            const key = n.toLowerCase()
            const isActive = page === key || (key === 'services' && page.startsWith('service:'))
            if (key === 'services') {
              return (
                <div key={n} ref={servicesRef} style={{ position: 'relative' }}
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button onClick={() => setPage('services')} style={{
                    padding: '8px 14px', background: isActive ? palette.ink : 'transparent',
                    color: isActive ? palette.surface : palette.ink, border: 'none', borderRadius: 999,
                    fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                    transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: 4,
                  }}>
                    Services
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ opacity: 0.6, transition: 'transform 0.2s', transform: servicesOpen ? 'rotate(180deg)' : 'none' }}>
                      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {servicesOpen && (
                    <div style={{
                      position: 'absolute', top: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)',
                      background: palette.surface, border: `1.5px solid ${palette.ink}`, borderRadius: 16,
                      padding: 8, minWidth: 260, boxShadow: `4px 4px 0 ${palette.ink}`, zIndex: 200,
                    }}>
                      {SERVICE_NAV.map((svc) => {
                        const active = page === `service:${svc.id}`
                        return (
                          <button key={svc.id} onClick={() => { setPage(`service:${svc.id}`); setServicesOpen(false) }} style={{
                            width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                            padding: '10px 14px', background: active ? palette.ink : 'transparent',
                            color: active ? palette.surface : palette.ink, border: 'none', borderRadius: 10,
                            cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', transition: 'background 0.12s',
                          }}
                          onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = `${palette.ink}08` }}
                          onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent' }}
                          >
                            <span style={{ fontSize: 13, fontWeight: 700 }}>{svc.label}</span>
                            <span style={{ fontSize: 11, opacity: 0.55, marginTop: 1 }}>{svc.desc}</span>
                          </button>
                        )
                      })}
                      <div style={{ borderTop: `1px solid ${palette.ink}15`, margin: '6px 0 2px', padding: '8px 14px 4px' }}>
                        <button onClick={() => { setPage('services'); setServicesOpen(false) }} style={{
                          background: 'transparent', border: 'none', cursor: 'pointer',
                          fontFamily: 'inherit', fontSize: 11, fontWeight: 700,
                          color: palette.ink, opacity: 0.5, padding: 0,
                          letterSpacing: '0.08em', textTransform: 'uppercase',
                        }}>
                          View all services →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            }
            return (
              <button key={n} onClick={() => setPage(key)} style={{
                padding: '8px 14px', background: isActive ? palette.ink : 'transparent',
                color: isActive ? palette.surface : palette.ink, border: 'none', borderRadius: 999,
                fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s',
              }}>
                {n}
              </button>
            )
          })}
          <button onClick={() => setPage('quote')} style={{
            marginLeft: 8, padding: '10px 18px', background: palette.accent, color: '#fff',
            border: 'none', borderRadius: 999, fontSize: 13, fontWeight: 700, cursor: 'pointer',
            fontFamily: 'inherit', boxShadow: `3px 3px 0 ${palette.ink}`,
          }}>
            Free quote →
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 100, background: palette.ink, color: palette.surface, padding: 40, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 40 }}>
            <div style={{ fontFamily: fontPair.display, fontWeight: 800, fontSize: 20 }}>Menu</div>
            <button onClick={() => setMenuOpen(false)} style={{ background: 'transparent', border: 'none', color: palette.surface, fontSize: 24, cursor: 'pointer' }}>×</button>
          </div>
          {navItems.map((n) => (
            <React.Fragment key={n}>
              <button onClick={() => setPage(n.toLowerCase())} style={{
                padding: '16px 0', background: 'transparent', border: 'none',
                borderBottom: n === 'Services' ? 'none' : `1px solid ${palette.surface}22`,
                color: palette.surface, fontSize: 28, fontWeight: 700, textAlign: 'left',
                fontFamily: fontPair.display, cursor: 'pointer', letterSpacing: '-0.02em', width: '100%',
              }}>
                {n} →
              </button>
              {n === 'Services' && (
                <div style={{ paddingLeft: 16, borderBottom: `1px solid ${palette.surface}22`, marginBottom: 0 }}>
                  {SERVICE_NAV.map((svc) => (
                    <button key={svc.id} onClick={() => setPage(`service:${svc.id}`)} style={{
                      display: 'block', width: '100%', padding: '10px 0',
                      background: 'transparent', border: 'none', borderBottom: `1px solid ${palette.surface}11`,
                      color: palette.surface, fontSize: 16, fontWeight: 600,
                      textAlign: 'left', fontFamily: 'inherit', cursor: 'pointer', opacity: 0.75,
                    }}>
                      {svc.label}
                    </button>
                  ))}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Scroll container */}
      <div ref={scrollRef} style={{ height: '100%', overflowY: 'auto', overflowX: 'hidden', scrollBehavior: 'smooth' }}>
        {page === 'home' && <HomePage palette={palette} fontPair={fontPair} heroVariant={heroVariant} setPage={setPage} />}
        {page === 'services' && <ServicesPage palette={palette} fontPair={fontPair} setPage={setPage} />}
        {page === 'projects' && <ProjectsPage palette={palette} fontPair={fontPair} setPage={setPage} />}
        {page === 'financing' && <FinancingPage palette={palette} fontPair={fontPair} setPage={setPage} />}
        {page === 'about' && <AboutPage palette={palette} fontPair={fontPair} setPage={setPage} />}
        {page.startsWith('quote') && <QuotePage palette={palette} fontPair={fontPair} setPage={setPage} initialService={page.includes(':') ? page.split(':')[1] : ''} />}
        {page.startsWith('service:') && <ServiceDetailPage palette={palette} fontPair={fontPair} setPage={setPage} serviceId={page.split(':')[1]} />}
      </div>
    </div>
  )
}

const HomePage = ({ palette, fontPair, heroVariant, setPage }) => (
  <div>
    <Hero palette={palette} fontPair={fontPair} variant={heroVariant} setPage={setPage} />
    <TrustBar palette={palette} />
    <ServicesGrid palette={palette} fontPair={fontPair} setPage={setPage} />
    <Process palette={palette} fontPair={fontPair} />
    <ProjectsFeature palette={palette} fontPair={fontPair} setPage={setPage} />
    <Testimonials palette={palette} fontPair={fontPair} />
    <FinancingTeaser palette={palette} fontPair={fontPair} setPage={setPage} />
    <ServiceArea palette={palette} fontPair={fontPair} />
    <FAQSection palette={palette} fontPair={fontPair} />
    <CTA palette={palette} fontPair={fontPair} setPage={setPage} />
    <Footer palette={palette} fontPair={fontPair} />
  </div>
)

const Hero = ({ palette, fontPair, variant, setPage }) => {
  if (variant === 'split') return <HeroSplit palette={palette} fontPair={fontPair} setPage={setPage} />
  if (variant === 'editorial') return <HeroEditorial palette={palette} fontPair={fontPair} setPage={setPage} />
  return <HeroAnimated palette={palette} fontPair={fontPair} setPage={setPage} />
}

const HeroAnimated = ({ palette, fontPair, setPage }) => {
  const [tick, setTick] = React.useState(0)
  React.useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 3200)
    return () => clearInterval(id)
  }, [])
  const words = ['built to last.', 'done right.', 'storm-proof.', 'warrantied 50 yrs.']
  const word = words[tick % words.length]

  return (
    <section style={{ padding: '140px 40px 100px', position: 'relative', minHeight: '92vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 8, padding: '6px 14px', background: palette.surface, border: `1.5px solid ${palette.ink}`, borderRadius: 999, fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', marginBottom: 28 }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 0 3px #22c55e33' }} />
        Booking April · Storm-response crew on standby
      </div>
      <h1 style={{ fontFamily: fontPair.display, fontSize: 'clamp(64px, 10vw, 148px)', fontWeight: 800, letterSpacing: '-0.045em', lineHeight: 0.92, margin: 0, maxWidth: '11ch' }}>
        Roofs
        <br />
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 18 }}>
          <span style={{ display: 'inline-block', width: 'clamp(80px, 11vw, 160px)', height: 'clamp(80px, 11vw, 160px)', borderRadius: 999, background: palette.accent, position: 'relative', animation: 'hero-bob 4s ease-in-out infinite' }}>
            <svg viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
              <polygon points="20,58 50,28 80,58" fill="none" stroke="#fff" strokeWidth="5" strokeLinejoin="round" />
              <rect x="30" y="58" width="40" height="20" fill="none" stroke="#fff" strokeWidth="5" />
            </svg>
          </span>
          <em style={{ fontStyle: 'italic', fontWeight: 500, color: palette.secondary }}>{word.split('.')[0]}.</em>
        </span>
      </h1>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 48, gap: 40, flexWrap: 'wrap' }}>
        <p style={{ fontSize: 19, lineHeight: 1.5, maxWidth: 440, opacity: 0.8, margin: 0 }}>
          Family-run crews for roofing, windows, gutters, siding, and residential concrete — covering the tri-county area since 2009. We show up when we say, clean up before we leave, and stand behind every job.
        </p>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button onClick={() => setPage('quote')} style={{ padding: '18px 28px', background: palette.ink, color: palette.surface, border: 'none', borderRadius: 999, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.01em', boxShadow: `5px 5px 0 ${palette.accent}`, transition: 'all 0.15s' }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translate(-1px, -1px)'; e.currentTarget.style.boxShadow = `6px 6px 0 ${palette.accent}` }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `5px 5px 0 ${palette.accent}` }}
          >
            Get a free estimate →
          </button>
          <button onClick={() => setPage('projects')} style={{ padding: '18px 22px', background: 'transparent', color: palette.ink, border: `1.5px solid ${palette.ink}`, borderRadius: 999, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
            See our work
          </button>
        </div>
      </div>
      <div style={{ position: 'absolute', right: 40, top: 160, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-end' }}>
        <StatChip palette={palette} label="Roofs completed" value="1,840+" />
        <StatChip palette={palette} label="Customer rating" value="4.9 ★" delay={0.2} />
        <StatChip palette={palette} label="Avg response" value="24 hrs" delay={0.4} />
      </div>
      <style>{`
        @keyframes hero-bob { 0%,100% { transform: translateY(0) rotate(-3deg); } 50% { transform: translateY(-8px) rotate(3deg); } }
        @keyframes chip-in { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>
    </section>
  )
}

const StatChip = ({ palette, label, value, delay = 0 }) => (
  <div style={{ padding: '12px 16px', background: palette.surface, border: `1.5px solid ${palette.ink}`, borderRadius: 14, minWidth: 180, boxShadow: `3px 3px 0 ${palette.ink}`, animation: `chip-in 0.6s ${delay}s both ease-out` }}>
    <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.55, fontWeight: 700 }}>{label}</div>
    <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', marginTop: 2 }}>{value}</div>
  </div>
)

const HeroSplit = ({ palette, fontPair, setPage }) => (
  <section style={{ padding: '120px 40px 80px', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 60, alignItems: 'center', minHeight: '90vh' }}>
    <div>
      <div style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, opacity: 0.6, marginBottom: 18 }}>Residential · Commercial · Storm</div>
      <h1 style={{ fontFamily: fontPair.display, fontSize: 'clamp(48px, 6vw, 88px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.96, margin: 0 }}>
        The last roof<br />your house will<br />need, <em style={{ fontStyle: 'italic', color: palette.accent }}>probably ever.</em>
      </h1>
      <p style={{ fontSize: 18, lineHeight: 1.55, maxWidth: 460, opacity: 0.75, marginTop: 24 }}>
        50-year materials, a fifteen-person crew that's been together a decade, and a quote that actually matches your invoice. That's the whole pitch.
      </p>
      <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
        <button onClick={() => setPage('quote')} style={{ padding: '16px 24px', background: palette.accent, color: '#fff', border: 'none', borderRadius: 999, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', boxShadow: `4px 4px 0 ${palette.ink}` }}>Get my estimate →</button>
        <button style={{ padding: '16px 20px', background: 'transparent', color: palette.ink, border: `1.5px solid ${palette.ink}`, borderRadius: 999, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Call (832) 991-0928</button>
      </div>
    </div>
    <div style={{ aspectRatio: '4/5', borderRadius: 20, overflow: 'hidden', border: `1.5px solid ${palette.ink}`, background: palette.surface }}>
      <RoofScene palette={palette} photo="about-farmhouse" objectPosition="center" />
    </div>
  </section>
)

const HeroEditorial = ({ palette, fontPair, setPage }) => (
  <section style={{ padding: '130px 40px 60px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 40, flexWrap: 'wrap' }}>
      <div style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, opacity: 0.6 }}>№ 01 — The cover</div>
      <div style={{ fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, opacity: 0.6 }}>Spring 2026 edition</div>
    </div>
    <h1 style={{ fontFamily: fontPair.display, fontSize: 'clamp(72px, 13vw, 200px)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 0.9, margin: '20px 0 0' }}>
      A roof is<br /><em style={{ fontStyle: 'italic', color: palette.accent }}>a promise</em><br />in shingles.
    </h1>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 40, marginTop: 60, alignItems: 'end' }}>
      <p style={{ fontSize: 16, lineHeight: 1.6, opacity: 0.8, margin: 0 }}>
        We've been climbing ladders in this valley since 2009. In that time we've figured out that the difference between a good roof and a great one has almost nothing to do with the shingle brand — and everything to do with the hands nailing it down.
      </p>
      <div />
      <div style={{ textAlign: 'right' }}>
        <button onClick={() => setPage('quote')} style={{ padding: '16px 24px', background: palette.ink, color: palette.surface, border: 'none', borderRadius: 999, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Book a free visit →</button>
      </div>
    </div>
  </section>
)
