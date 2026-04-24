const serviceLinks = [
  { label: 'Roof Replacement',         href: 'roofing.html',  icon: 'hammer' },
  { label: 'Energy-Efficient Siding',  href: 'siding.html',   icon: 'shield' },
  { label: 'Energy-Efficient Windows', href: 'windows.html',  icon: 'star' },
  { label: 'Gutter Installation',      href: 'gutters.html',  icon: 'storm' },
];

const Header = () => {
  const [svcOpen, setSvcOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const closeMobile = () => { setMobileOpen(false); setSvcOpen(false); };

  const handleSvcClick = (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      setSvcOpen(o => !o);
    }
  };

  return (
    <header className="rnm-header" style={{ position: 'sticky', top: 0, zIndex: 50 }}>
      <a className="brand" href="index.html">
        <img src="assets/logo-mascot.png" alt="Roofs-N-More" style={{ width: 52, height: 52 }} />
        <div>
          <div className="name">Roofs-N-More</div>
          <div className="sub">Kemah, TX · Licensed &amp; Insured</div>
        </div>
      </a>
      <nav className={`rnm-nav${mobileOpen ? ' open' : ''}`}>
        <a href="index.html" onClick={closeMobile}>Home</a>
        <div
          className={`nav-dropdown${svcOpen ? ' open' : ''}`}
          onMouseEnter={() => { if (window.innerWidth > 768) setSvcOpen(true); }}
          onMouseLeave={() => { if (window.innerWidth > 768) setSvcOpen(false); }}
        >
          <a href="services.html" onClick={handleSvcClick}>
            Services <Icon name="chevron-down" size={14} />
          </a>
          <div className="dropdown-panel" style={{ display: svcOpen ? 'block' : 'none' }}>
            <div className="dropdown-panel-inner">
              {serviceLinks.map((s, i) => (
                <a key={s.href} href={s.href} onClick={closeMobile}>
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
        </div>
        {[
          { label: 'About', href: 'about-us.html' },
          { label: 'Portfolio', href: 'portfolio.html' },
          { label: 'Blog', href: 'blog.html' },
          { label: 'Contact', href: 'contact.html' },
        ].map(l => (
          <a key={l.label} href={l.href} onClick={closeMobile}>{l.label}</a>
        ))}
      </nav>
      <div className="rnm-header-cta">
        <a className="phone" href="tel:8329910928">
          <Icon name="phone" size={18} /> 832-991-0928
        </a>
        <a href="https://quote.roofsnmore.com/s/59b06a" style={{ textDecoration: 'none' }}>
          <Button variant="primary" size="sm">Free AI estimate</Button>
        </a>
        <button className="rnm-nav-toggle" aria-label="Open menu" aria-expanded={String(mobileOpen)}
          onClick={() => setMobileOpen(o => !o)}>
          {mobileOpen ? '\u2715' : '\u2630'}
        </button>
      </div>
    </header>
  );
};

window.Header = Header;
