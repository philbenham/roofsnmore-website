const { useState } = React;

const Icon = ({ name, size = 24, stroke = 2.5, color = 'currentColor' }) => {
  const paths = {
    phone: <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.1-8.7A2 2 0 014.1 2h3a2 2 0 012 1.7 12.8 12.8 0 00.7 2.8 2 2 0 01-.5 2.1L8 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.5 12.8 12.8 0 002.8.7A2 2 0 0122 17z"/>,
    menu: <><path d="M3 6h18"/><path d="M3 12h18"/><path d="M3 18h18"/></>,
    home: <><path d="M3 12L12 3l9 9"/><path d="M5 10v10h14V10"/><path d="M10 20v-5h4v5"/></>,
    hammer: <><path d="M15 12l-8 8-3-3 8-8"/><path d="M12 9l7-7 3 3-7 7z"/><path d="M12 9l3 3"/></>,
    storm: <><path d="M19 16.9A5 5 0 0018 7h-1.3A8 8 0 104 15"/><path d="M13 11l-4 6h3l-1 4 4-6h-3l1-4z"/></>,
    shield: <><path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3z"/><path d="M9 12l2 2 4-4"/></>,
    star: <path d="M12 2l3 7 7 .5-5.5 4.5 2 7L12 17l-6.5 4 2-7L2 9.5 9 9z"/>,
    arrow: <><path d="M5 12h14"/><path d="M13 5l7 7-7 7"/></>,
    check: <path d="M20 6L9 17l-5-5"/>,
    users: <><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/><circle cx="17" cy="7" r="3"/><path d="M21 21v-2a4 4 0 00-3-3.8"/></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></>,
    quote: <path d="M7 7h4v4H7V7zm0 4c0 4 0 6-4 6m14-10h4v4h-4V7zm0 4c0 4 0 6-4 6"/>,
    map: <><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></>,
    clock: <><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>,
    'chevron-down': <path d="M6 9l6 6 6-6"/>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
};

const Button = ({ children, variant = 'primary', size = 'md', onClick, as = 'button' }) => {
  const base = {
    fontFamily: 'var(--rnm-font-display)', fontWeight: 600,
    border: '3px solid var(--rnm-ink)', borderRadius: 999,
    cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
    boxShadow: '4px 5px 0 var(--rnm-ink)',
    transition: 'all 160ms cubic-bezier(0.34,1.56,0.64,1)',
    whiteSpace: 'nowrap',
  };
  const sizes = { sm: { fontSize: 14, padding: '8px 16px', borderWidth: 2.5, boxShadow: '2px 3px 0 var(--rnm-ink)' }, md: { fontSize: 17, padding: '13px 24px' }, lg: { fontSize: 19, padding: '16px 30px' }, };
  const variants = {
    primary:   { background: 'var(--rnm-orange)', color: '#fff' },
    secondary: { background: 'var(--rnm-blue)', color: '#fff' },
    ghost:     { background: '#fff', color: 'var(--rnm-ink)' },
    ink:       { background: 'var(--rnm-ink)', color: '#fff' },
  };
  const [hov, setHov] = useState(false);
  const [prs, setPrs] = useState(false);
  const hoverStyle = hov && !prs ? { transform: 'translate(-2px, -2px)', boxShadow: '6px 8px 0 var(--rnm-ink)' } : {};
  const pressStyle = prs ? { transform: 'translate(2px, 3px)', boxShadow: '0 0 0 var(--rnm-ink)' } : {};
  const Tag = as;
  return (
    <Tag
      style={{ ...base, ...sizes[size], ...variants[variant], ...hoverStyle, ...pressStyle }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => { setHov(false); setPrs(false); }}
      onMouseDown={() => setPrs(true)} onMouseUp={() => setPrs(false)}
      onClick={onClick}
    >
      {children}
    </Tag>
  );
};

const Hand = ({ children, rotate = -3, color = 'var(--rnm-orange-dark)' }) => (
  <span style={{
    fontFamily: 'var(--rnm-font-hand)', fontWeight: 700, fontSize: '1.4em',
    color, transform: `rotate(${rotate}deg)`, display: 'inline-block',
  }}>{children}</span>
);

Object.assign(window, { Icon, Button, Hand });
