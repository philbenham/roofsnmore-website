const serviceLinks = [
  { label: 'Roof Replacement',         href: 'roofing.html',  icon: 'hammer' },
  { label: 'Energy-Efficient Siding',  href: 'siding.html',   icon: 'shield' },
  { label: 'Energy-Efficient Windows', href: 'windows.html',  icon: 'star' },
  { label: 'Gutter Installation',      href: 'gutters.html',  icon: 'storm' },
];

const Header = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'var(--rnm-cream)',
      borderBottom: '2.5px solid var(--rnm-ink)',
      padding: '12px 32px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <img src="assets/logo-mascot.png" alt="Roofs-N-More" style={{ width: 52, height: 52 }} />
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <div style={{ fontFamily: 'var(--rnm-font-display)', fontWeight: 700, fontSize: 22, color: 'var(--rnm-ink)' }}>Roofs-N-More</div>
          <div style={{ fontFamily: 'var(--rnm-font-body)', fontWeight: 700, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--rnm-ink-mute)', marginTop: 3 }}>Kemah, TX · Licensed &amp; Insured</div>
        </div>
      </div>
      <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
        <a href="index.html" style={{ fontFamily: 'var(--rnm-font-display)', fontWeight: 600, fontSize: 16, color: 'var(--rnm-ink)', textDecoration: 'none' }}>Home</a>
        {/* Services dropdown */}
        <div style={{ position: 'relative' }}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <a href="services.html" style={{ fontFamily: 'var(--rnm-font-display)', fontWeight: 600, fontSize: 16, color: 'var(--rnm-ink)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            Services <Icon name="chevron-down" size={14} />
          </a>
          {open && (
            <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', paddingTop: 10, zIndex: 100, minWidth: 240 }}>
            <div style={{
              background: '#fff',
              border: '2.5px solid var(--rnm-ink)', borderRadius: 16,
              boxShadow: '5px 6px 0 var(--rnm-ink)',
              padding: '8px 0',
            }}>
              {serviceLinks.map((s, i) => (
                <a key={s.href} href={s.href} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 18px',
                  fontFamily: 'var(--rnm-font-display)', fontWeight: 600, fontSize: 15,
                  color: 'var(--rnm-ink)', textDecoration: 'none',
                  borderBottom: i < serviceLinks.length - 1 ? '1.5px solid var(--rnm-line)' : 'none',
                }}>
                  <span style={{
                    width: 32, height: 32, borderRadius: 8, display: 'grid', placeItems: 'center',
                    background: i % 2 === 0 ? 'var(--rnm-orange-soft)' : 'var(--rnm-blue-soft)',
                    border: '2px solid var(--rnm-ink)', flexShrink: 0,
                  }}>
                    <Icon name={s.icon} size={16} stroke={2.5} />
                  </span>
                  {s.label}
                </a>
              ))}
            </div>
            </div>
          )}
        </div>
        {/* Other nav links */}
        {[
          { label: 'About', href: 'about-us.html' },
          { label: 'Portfolio', href: 'portfolio.html' },
          { label: 'Blog', href: 'blog.html' },
          { label: 'Contact', href: 'contact.html' },
        ].map(l => (
          <a key={l.label} href={l.href} style={{ fontFamily: 'var(--rnm-font-display)', fontWeight: 600, fontSize: 16, color: 'var(--rnm-ink)', textDecoration: 'none' }}>{l.label}</a>
        ))}
      </nav>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <a href="tel:8329910928" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--rnm-font-display)', fontWeight: 600, fontSize: 16, whiteSpace: 'nowrap' }}>
          <Icon name="phone" size={18} /> 832-991-0928
        </a>
        <a href="https://quote.roofsnmore.com/s/59b06a" style={{ textDecoration: 'none' }}><Button variant="primary" size="sm">Free AI estimate</Button></a>
      </div>
    </header>
  );
};

window.Header = Header;
