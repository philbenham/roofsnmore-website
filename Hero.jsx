const Hero = () => (
  <section style={{
    position: 'relative', padding: '72px 32px 96px',
    background: 'var(--rnm-cream)',
    borderBottom: '2.5px solid var(--rnm-ink)',
    overflow: 'hidden',
  }}>
    <div style={{ maxWidth: 1160, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 56, alignItems: 'center' }}>
      <div>
        <div style={{ display: 'inline-block', background: 'var(--rnm-orange)', color: '#fff', fontFamily: 'var(--rnm-font-display)', fontWeight: 600, fontSize: 14, padding: '6px 14px', borderRadius: 999, border: '2.5px solid var(--rnm-ink)', boxShadow: '3px 3px 0 var(--rnm-ink)', marginBottom: 24, transform: 'rotate(-2deg)', whiteSpace: 'nowrap' }}>
          Serving Greater Houston since 2015
        </div>
        <h1 style={{ fontFamily: 'var(--rnm-font-display)', fontWeight: 700, fontSize: 68, lineHeight: 1.0, letterSpacing: '-0.01em', color: 'var(--rnm-ink)', margin: 0, marginBottom: 20 }}>
          Houston's favorite <span style={{ color: 'var(--rnm-blue)', position: 'relative', display: 'inline-block' }}>expert roofing
            <svg viewBox="0 0 340 14" style={{ position: 'absolute', bottom: -8, left: 0, width: '100%', height: 14 }}>
              <path d="M4 10 Q 80 2, 170 7 T 336 6" fill="none" stroke="var(--rnm-orange)" strokeWidth="5" strokeLinecap="round"/>
            </svg>
          </span> crew.
        </h1>
        <p style={{ fontFamily: 'var(--rnm-font-body)', fontWeight: 600, fontSize: 19, color: 'var(--rnm-ink-soft)', lineHeight: 1.5, margin: '0 0 32px', maxWidth: 540 }}>
          Roofing, siding, windows, and gutters — done right by trained, friendly neighbors. Get an instant price range with our free AI estimator, no phone calls or personal info needed.
        </p>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
          <Button variant="primary" size="lg">Free AI instant estimate <Icon name="arrow" size={20} /></Button>
          <Button variant="ghost" size="lg">View our work</Button>
        </div>
        <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--rnm-ink-soft)', fontFamily: 'var(--rnm-font-body)', fontWeight: 700, fontSize: 14 }}>
            <Icon name="shield" size={20} color="var(--rnm-blue)" /> Licensed &amp; insured
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--rnm-ink-soft)', fontFamily: 'var(--rnm-font-body)', fontWeight: 700, fontSize: 14 }}>
            <div style={{ display: 'flex', gap: 1, color: 'var(--rnm-orange)' }}>
              {[0,1,2,3,4].map(i => <Icon key={i} name="star" size={18} />)}
            </div>
            5-star rated
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--rnm-ink-soft)', fontFamily: 'var(--rnm-font-body)', fontWeight: 700, fontSize: 14 }}>
            <Icon name="check" size={20} color="var(--rnm-blue)" /> 5★ rated
          </div>
        </div>
      </div>
      <div style={{ position: 'relative', display: 'grid', placeItems: 'center', minHeight: 440 }}>
        <div style={{ position: 'absolute', inset: '8px 20px 40px 0', background: 'var(--rnm-blue-soft)', border: '3.5px solid var(--rnm-ink)', borderRadius: 28, boxShadow: '8px 10px 0 var(--rnm-ink)', transform: 'rotate(-2deg)', overflow: 'hidden' }}>
          <img src="https://images.unsplash.com/photo-1632759145351-1d592919f522?w=800&q=80" alt="Residential roof in Houston" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <img src="assets/logo-mascot.png" alt="" style={{ position: 'absolute', bottom: -16, right: -8, width: 180, zIndex: 2, transform: 'rotate(6deg)' }} />
        <div style={{ position: 'absolute', top: 12, right: 16, zIndex: 3 }}>
          <div style={{ background: '#fff', border: '2.5px solid var(--rnm-ink)', borderRadius: 16, padding: '10px 14px', boxShadow: '4px 5px 0 var(--rnm-ink)', transform: 'rotate(4deg)' }}>
            <Hand rotate={0}>we pick up!</Hand>
            <div style={{ fontFamily: 'var(--rnm-font-display)', fontWeight: 700, fontSize: 14, marginTop: 2 }}>832-991-0928</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

window.Hero = Hero;
