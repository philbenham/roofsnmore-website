const TrustStrip = () => {
  const items = [
    { icon: 'shield', text: 'Fully insured in Texas' },
    { icon: 'check',  text: '5-star rated by homeowners' },
    { icon: 'users',  text: 'Family-owned since 2015' },
    { icon: 'clock',  text: 'Most roofs done in 1 day' },
  ];
  return (
    <section style={{ background: 'var(--rnm-ink)', padding: '22px 32px', borderBottom: '2.5px solid var(--rnm-ink)' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', display: 'flex', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
        {items.map(it => (
          <div key={it.text} style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#fff', fontFamily: 'var(--rnm-font-display)', fontWeight: 600, fontSize: 16 }}>
            <div style={{ color: 'var(--rnm-orange)' }}><Icon name={it.icon} size={24} stroke={2.5} /></div>
            {it.text}
          </div>
        ))}
      </div>
    </section>
  );
};

const Services = () => {
  const items = [
    { icon: 'home',   title: 'Roof Replacement',       body: 'Full residential roof replacements using top-rated materials. We handle everything from tear-off to final inspection — no surprises.', img: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=640&q=80', img2x: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=1280&q=80', href: 'roofing.html' },
    { icon: 'shield', title: 'Energy-Efficient Siding', body: "Modern insulated siding that beautifies your home AND cuts your energy bills. Built for Houston's climate.", img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=640&q=80', img2x: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1280&q=80', href: 'siding.html' },
    { icon: 'home',   title: 'Energy-Efficient Windows', body: 'Replace drafty old windows with high-performance units that keep the Texas heat out and your cool air in.', img: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=640&q=80', img2x: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1280&q=80', href: 'windows.html' },
    { icon: 'storm',  title: 'Gutter Installation',    body: 'Protect your foundation and landscaping with seamless gutters that channel water away from your home.', img: 'https://images.unsplash.com/photo-1597047084897-51e81819a499?w=640&q=80', img2x: 'https://images.unsplash.com/photo-1597047084897-51e81819a499?w=1280&q=80', href: 'gutters.html' },
  ];
  return (
    <section id="services" style={{ padding: '96px 32px', background: 'var(--rnm-cream)' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <div style={{ fontFamily: 'var(--rnm-font-body)', fontWeight: 900, fontSize: 14, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--rnm-orange-dark)', marginBottom: 12 }}>WHAT WE DO</div>
        <h2 style={{ fontFamily: 'var(--rnm-font-display)', fontWeight: 700, fontSize: 52, lineHeight: 1.05, margin: '0 0 12px', maxWidth: 760 }}>Our home exterior services.</h2>
        <p style={{ fontFamily: 'var(--rnm-font-body)', fontWeight: 600, fontSize: 18, color: 'var(--rnm-ink-soft)', maxWidth: 680, margin: '0 0 48px' }}>Four core services designed to protect your home and boost its curb appeal — all done by our trained, friendly crew.</p>
        <div className="rnm-services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
          {items.map((s, i) => (
            <div key={s.title} style={{
              background: '#fff', border: '3px solid var(--rnm-ink)', borderRadius: 24,
              boxShadow: '5px 6px 0 var(--rnm-ink)', padding: 0, overflow: 'hidden',
              transform: `rotate(${[-0.8, 0.5, 0.8, -0.5][i]}deg)`,
            }}>
              <div style={{ height: 170, overflow: 'hidden', borderBottom: '3px solid var(--rnm-ink)', background: 'var(--rnm-blue-soft)' }}>
                <img src={s.img} srcSet={`${s.img} 1x, ${s.img2x} 2x`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.style.display = 'none'; }} />
              </div>
              <div style={{ padding: '24px 28px 26px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
                  <div style={{ width: 52, height: 52, background: ['var(--rnm-orange)','var(--rnm-blue)','var(--rnm-orange)','var(--rnm-blue)'][i], border: '2.5px solid var(--rnm-ink)', borderRadius: 14, boxShadow: '3px 3px 0 var(--rnm-ink)', display: 'grid', placeItems: 'center', color: '#fff' }}>
                    <Icon name={s.icon} size={26} stroke={2.8} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--rnm-font-display)', fontWeight: 700, fontSize: 24, margin: 0 }}>{s.title}</h3>
                </div>
                <p style={{ fontFamily: 'var(--rnm-font-body)', fontWeight: 600, fontSize: 15, color: 'var(--rnm-ink-soft)', lineHeight: 1.55, margin: '0 0 14px' }}>{s.body}</p>
                <a style={{ fontFamily: 'var(--rnm-font-display)', fontWeight: 700, fontSize: 15, color: 'var(--rnm-blue-dark)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }} href={s.href}>Learn more <Icon name="arrow" size={16} /></a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProofStrip = () => {
  const stats = [
    { n: '850+',  l: 'roofs installed' },
    { n: '10+',   l: 'years in business' },
    { n: '98%',   l: 'customer satisfaction' },
    { n: '5★',    l: 'average Google rating' },
  ];
  return (
    <section style={{ background: 'var(--rnm-blue)', padding: '56px 32px', borderTop: '3px solid var(--rnm-ink)', borderBottom: '3px solid var(--rnm-ink)' }}>
      <div className="rnm-proof-grid" style={{ maxWidth: 1160, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
        {stats.map(s => (
          <div key={s.l} style={{ textAlign: 'center', color: '#fff' }}>
            <div style={{ fontFamily: 'var(--rnm-font-display)', fontWeight: 700, fontSize: 64, lineHeight: 1 }}>{s.n}</div>
            <div style={{ fontFamily: 'var(--rnm-font-body)', fontWeight: 800, fontSize: 15, letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 8 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Testimonials = () => {
  const quotes = [
    { q: "From the free estimate to the final cleanup, every step of working with Roofs-N-More was professional and stress-free. They finished our roof in one day and it looks phenomenal.", by: 'David R.', where: 'Webster, TX' },
    { q: "They handled our entire insurance claim — inspection, adjuster meeting, supplements, everything. We just said yes and signed. Roof was done a week later.", by: 'Linda & Tom H.', where: 'Clear Lake, TX' },
    { q: "Got 3 bids. Roofs-N-More wasn't the cheapest — but they were the only ones who showed up on time, explained every line, and had local references I could actually call.", by: 'Carlos M.', where: 'Pearland, TX' },
  ];
  return (
    <section style={{ padding: '96px 32px', background: 'var(--rnm-sky)' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <div style={{ fontFamily: 'var(--rnm-font-body)', fontWeight: 900, fontSize: 14, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--rnm-orange-dark)', marginBottom: 12 }}>REAL REVIEWS</div>
        <h2 style={{ fontFamily: 'var(--rnm-font-display)', fontWeight: 700, fontSize: 52, margin: '0 0 12px', maxWidth: 720, lineHeight: 1.05 }}>What our customers are saying.</h2>
        <p style={{ fontFamily: 'var(--rnm-font-body)', fontWeight: 600, fontSize: 18, color: 'var(--rnm-ink-soft)', maxWidth: 620, margin: '0 0 48px' }}>Don't just take our word for it — hear from homeowners across the Houston area.</p>
        <div className="rnm-testimonials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {quotes.map((t, i) => (
            <div key={t.by} style={{
              background: '#fff', border: '3px solid var(--rnm-ink)', borderRadius: 24,
              boxShadow: '5px 6px 0 var(--rnm-ink)', padding: '28px',
              transform: `rotate(${[1, -1, 0.6][i]}deg)`,
            }}>
              <div style={{ display: 'flex', gap: 3, marginBottom: 14, color: 'var(--rnm-orange)' }}>
                {[0,1,2,3,4].map(i => <Icon key={i} name="star" size={18} />)}
              </div>
              <p style={{ fontFamily: 'var(--rnm-font-body)', fontWeight: 700, fontSize: 16, lineHeight: 1.45, color: 'var(--rnm-ink)', margin: '0 0 20px' }}>"{t.q}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderTop: '2px solid var(--rnm-line)', paddingTop: 14 }}>
                <div style={{ width: 42, height: 42, borderRadius: 999, background: 'var(--rnm-orange-soft)', border: '2.5px solid var(--rnm-ink)', display: 'grid', placeItems: 'center', fontFamily: 'var(--rnm-font-display)', fontWeight: 700, fontSize: 16 }}>{t.by[0]}</div>
                <div>
                  <div style={{ fontFamily: 'var(--rnm-font-display)', fontWeight: 700, fontSize: 15 }}>{t.by}</div>
                  <div style={{ fontFamily: 'var(--rnm-font-body)', fontWeight: 700, fontSize: 12, color: 'var(--rnm-ink-mute)' }}>{t.where}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceArea = () => {
  const cities = ['Houston', 'League City', 'Friendswood', 'Pearland', 'Kemah', 'Webster', 'Clear Lake', 'Seabrook', 'La Marque', 'Galveston', 'Pasadena', 'Alvin', 'Deer Park'];
  return (
    <section style={{ padding: '80px 32px', background: 'var(--rnm-cream)' }}>
      <div className="rnm-area-grid" style={{ maxWidth: 1160, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 56, alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: 'var(--rnm-font-body)', fontWeight: 900, fontSize: 14, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--rnm-orange-dark)', marginBottom: 12 }}>WE COME TO YOU</div>
          <h2 style={{ fontFamily: 'var(--rnm-font-display)', fontWeight: 700, fontSize: 44, lineHeight: 1.05, margin: '0 0 14px' }}>Serving the Greater Houston area.</h2>
          <p style={{ fontFamily: 'var(--rnm-font-body)', fontWeight: 600, fontSize: 17, color: 'var(--rnm-ink-soft)', margin: '0 0 20px' }}>Top-rated home exterior services throughout Southeast Texas. Don't see your city? Give us a call — we likely cover it.</p>
          <a href="tel:8329910928" style={{ textDecoration: 'none' }}><Button variant="secondary"><Icon name="phone" size={18} /> 832-991-0928</Button></a>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {cities.map((c, i) => (
            <div key={c} style={{
              background: i % 3 === 0 ? 'var(--rnm-orange-soft)' : i % 3 === 1 ? 'var(--rnm-blue-soft)' : '#fff',
              border: '2.5px solid var(--rnm-ink)', borderRadius: 999,
              padding: '10px 20px', fontFamily: 'var(--rnm-font-display)', fontWeight: 600, fontSize: 15,
              boxShadow: '3px 4px 0 var(--rnm-ink)',
              transform: `rotate(${(i % 2 === 0 ? -1 : 1.2)}deg)`,
            }}>{c}</div>
          ))}
        </div>
      </div>
    </section>
  );
};

const EstimateCTA = () => (
  <section id="contact" style={{ padding: '96px 32px', background: 'var(--rnm-orange)', borderTop: '3px solid var(--rnm-ink)', borderBottom: '3px solid var(--rnm-ink)', position: 'relative', overflow: 'hidden' }}>
    <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
      <img src="assets/logo-mascot.png" alt="" style={{ width: 140, marginBottom: 20 }} />
      <h2 style={{ fontFamily: 'var(--rnm-font-display)', fontWeight: 700, fontSize: 60, lineHeight: 1.02, color: '#fff', margin: '0 0 16px' }}>Ready to start your project?</h2>
      <p style={{ fontFamily: 'var(--rnm-font-body)', fontWeight: 700, fontSize: 19, color: '#fff', margin: '0 0 32px', opacity: 0.95, maxWidth: 620, marginInline: 'auto' }}>
        Use our free AI estimating tool to get an instant price range — no appointment or personal info needed to start.
      </p>
      <div style={{ display: 'inline-flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
        <a href="https://quote.roofsnmore.com/s/59b06a" style={{ textDecoration: 'none' }}><Button variant="ink" size="lg">Get my free AI estimate <Icon name="arrow" size={20} /></Button></a>
        <a href="tel:8329910928" style={{ textDecoration: 'none' }}><Button variant="ghost" size="lg"><Icon name="phone" size={18} /> 832-991-0928</Button></a>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer style={{ background: 'var(--rnm-ink)', color: '#fff', padding: '56px 32px 32px' }}>
    <div className="rnm-footer-grid" style={{ maxWidth: 1160, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.3fr 1fr 1fr 1fr', gap: 40 }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <img src="assets/logo-mascot.png" alt="" style={{ width: 52, height: 52, background: '#fff', borderRadius: 12, padding: 3 }} />
          <div style={{ fontFamily: 'var(--rnm-font-display)', fontWeight: 700, fontSize: 22 }}>Roofs-N-More</div>
        </div>
        <p style={{ fontFamily: 'var(--rnm-font-body)', fontWeight: 600, fontSize: 14, lineHeight: 1.55, opacity: 0.75, margin: 0 }}>Houston's trusted home exterior crew. Roofing, siding, windows, and gutters — done right.</p>
      </div>
      {[
        { t: 'Services', l: [
          { label: 'Roof Replacement', href: 'roofing.html' },
          { label: 'Energy-Efficient Siding', href: 'siding.html' },
          { label: 'Energy-Efficient Windows', href: 'windows.html' },
          { label: 'Gutter Installation', href: 'gutters.html' },
        ]},
        { t: 'Company', l: [
          { label: 'About Us', href: 'about-us.html' },
          { label: 'Portfolio', href: 'portfolio.html' },
          { label: 'Blog', href: 'blog.html' },
          { label: 'Contact', href: 'contact.html' },
          { label: 'Privacy Policy', href: 'privacy-policy.html' },
          { label: 'Terms & Conditions', href: 'terms-and-conditions.html' },
        ]},
        { t: 'Contact', l: [
          { label: '832-991-0928', href: 'tel:8329910928' },
          { label: '437 Holly Branch Ln', href: null },
          { label: 'Kemah, TX 77565', href: null },
          { label: 'Mon–Fri 8am–6pm', href: null },
          { label: 'Sat 9am–3pm', href: null },
        ]},
      ].map(col => (
        <div key={col.t}>
          <div style={{ fontFamily: 'var(--rnm-font-display)', fontWeight: 700, fontSize: 15, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--rnm-orange)', marginBottom: 14 }}>{col.t}</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
            {col.l.map(x => (
              <li key={x.label} style={{ fontFamily: 'var(--rnm-font-body)', fontWeight: 600, fontSize: 14, opacity: 0.85 }}>
                {x.href ? <a href={x.href} style={{ color: 'inherit', textDecoration: 'none' }}>{x.label}</a> : x.label}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div style={{ maxWidth: 1160, margin: '40px auto 0', paddingTop: 20, borderTop: '1.5px solid rgba(255,255,255,0.15)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontFamily: 'var(--rnm-font-body)', fontWeight: 700, fontSize: 12, opacity: 0.6 }}>
      <div>© 2026 Roofs-N-More LLC · Fully insured</div>
      <div>Made with hammers in Kemah, TX.</div>
    </div>
  </footer>
);

Object.assign(window, { TrustStrip, Services, ProofStrip, Testimonials, ServiceArea, EstimateCTA, Footer });
