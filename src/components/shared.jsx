import React from 'react'

export const RoofMark = ({ size = 32, color = 'currentColor', accent }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{ display: 'block' }}>
    <path d="M6 26 L24 10 L42 26 L42 40 L6 40 Z" stroke={color} strokeWidth="3" strokeLinejoin="round" fill="none" />
    <path d="M24 10 L24 40" stroke={color} strokeWidth="3" />
    <path d="M6 26 L42 26" stroke={accent || color} strokeWidth="3" />
    <rect x="20" y="30" width="8" height="10" stroke={color} strokeWidth="2.5" fill="none" />
  </svg>
)

export const ROOF_PHOTOS = {
  'hero-crew':          'assets/photos/hero-crew.jpg',
  'hero-solo':          'assets/photos/hero-solo.png',
  'editorial-house':    'assets/photos/editorial-house.jpg',
  'project-craftsman':  'assets/photos/project-craftsman.jpg',
  'project-stone':      'assets/photos/project-stone.jpg',
  'project-framing':    'assets/photos/project-framing.jpg',
  'crew-tile':          'assets/photos/crew-tile.jpg',
  'crew-tile-2':        'assets/photos/crew-tile-2.jpg',
  'crew-ladder':        'assets/photos/crew-ladder.jpg',
  'about-farmhouse':    'assets/photos/about-farmhouse.jpg',
  'about-modern':       'assets/photos/about-modern.jpg',
}

const POOL_A = ['project-craftsman', 'editorial-house', 'project-stone', 'about-farmhouse', 'about-modern']
const POOL_B = ['hero-crew', 'crew-tile', 'crew-tile-2', 'crew-ladder', 'project-framing']

export const RoofScene = ({ palette = {}, variant = 'a', photo, id, objectPosition = 'center' }) => {
  const { ink = '#111' } = palette
  let src
  if (photo && ROOF_PHOTOS[photo]) {
    src = ROOF_PHOTOS[photo]
  } else {
    const pool = variant === 'b' ? POOL_B : POOL_A
    let idx = 0
    if (id) {
      let h = 0
      for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0
      idx = Math.abs(h) % pool.length
    }
    src = ROOF_PHOTOS[pool[idx]]
  }
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: palette.bg || '#eeeae3' }}>
      <img
        src={src}
        alt=""
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition, display: 'block' }}
        loading="lazy"
      />
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `linear-gradient(180deg, transparent 55%, ${ink}22 100%)`,
      }} />
    </div>
  )
}

export const BeforeAfter = ({ palette }) => {
  const [pos, setPos] = React.useState(50)
  const ref = React.useRef(null)
  const dragging = React.useRef(false)

  const onMove = (clientX) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const p = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100))
    setPos(p)
  }
  React.useEffect(() => {
    const m = (e) => dragging.current && onMove(e.clientX)
    const u = () => (dragging.current = false)
    const tm = (e) => dragging.current && onMove(e.touches[0].clientX)
    window.addEventListener('mousemove', m)
    window.addEventListener('mouseup', u)
    window.addEventListener('touchmove', tm)
    window.addEventListener('touchend', u)
    return () => {
      window.removeEventListener('mousemove', m)
      window.removeEventListener('mouseup', u)
      window.removeEventListener('touchmove', tm)
      window.removeEventListener('touchend', u)
    }
  }, [])

  const ink = palette.ink
  return (
    <div
      ref={ref}
      onMouseDown={(e) => { dragging.current = true; onMove(e.clientX) }}
      onTouchStart={(e) => { dragging.current = true; onMove(e.touches[0].clientX) }}
      style={{
        position: 'relative', width: '100%', aspectRatio: '16 / 9',
        borderRadius: 12, overflow: 'hidden', border: `1.5px solid ${ink}`,
        cursor: 'ew-resize', userSelect: 'none', background: palette.bg,
      }}
    >
      <div style={{ position: 'absolute', inset: 0 }}>
        <RoofScene palette={palette} photo="project-craftsman" />
        <div style={{ position: 'absolute', top: 12, right: 14, background: palette.ink, color: palette.surface, padding: '4px 10px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', borderRadius: 4, zIndex: 2 }}>AFTER</div>
      </div>
      <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <div style={{ width: '100%', height: '100%', filter: 'grayscale(0.4) brightness(0.85) contrast(1.05)' }}>
          <RoofScene palette={palette} photo="project-craftsman" />
        </div>
        <div style={{ position: 'absolute', top: 12, left: 14, background: palette.surface, color: palette.ink, padding: '4px 10px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', borderRadius: 4, border: `1px solid ${palette.ink}`, zIndex: 2 }}>BEFORE</div>
      </div>
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${pos}%`, width: 2, background: palette.surface, boxShadow: `0 0 0 1px ${palette.ink}` }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 40, height: 40, borderRadius: '50%', background: palette.surface, border: `2px solid ${palette.ink}`, display: 'grid', placeItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={palette.ink} strokeWidth="2.5">
            <path d="M15 6l-6 6 6 6M9 6l6 6-6 6" />
          </svg>
        </div>
      </div>
    </div>
  )
}
