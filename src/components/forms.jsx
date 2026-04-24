import React from 'react'

export const QuoteForm = ({ palette, compact = false, initialService = '' }) => {
  const [step, setStep] = React.useState(0)
  const [data, setData] = React.useState({
    service: initialService, material: '', homeType: '',
    sqft: '', timeline: '', name: '', email: '', phone: '', zip: '', address: '',
  })
  const [errors, setErrors] = React.useState({})
  const [submitted, setSubmitted] = React.useState(false)
  const [submitting, setSubmitting] = React.useState(false)
  const [submitError, setSubmitError] = React.useState('')

  const steps = [
    { key: 'service', label: 'Service' },
    { key: 'details', label: 'Details' },
    { key: 'timeline', label: 'Timeline' },
    { key: 'contact', label: 'Contact' },
  ]

  const update = (k, v) => {
    setData((d) => ({ ...d, [k]: v }))
    setErrors((e) => ({ ...e, [k]: null }))
  }

  const validate = (stepIdx) => {
    const e = {}
    if (stepIdx === 0 && !data.service) e.service = 'Pick a service to continue'
    if (stepIdx === 1) {
      if (!data.material) e.material = 'Choose a material'
      if (!data.homeType) e.homeType = 'Pick home type'
      if (!data.sqft || isNaN(+data.sqft) || +data.sqft < 100) e.sqft = 'Enter sqft (min 100)'
    }
    if (stepIdx === 2 && !data.timeline) e.timeline = 'Pick a timeline'
    if (stepIdx === 3) {
      if (!data.name || data.name.length < 2) e.name = 'Enter your name'
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) e.email = 'Enter a valid email'
      if (!/^[\d\s\-()+]{10,}$/.test(data.phone)) e.phone = 'Enter a valid phone'
      if (!/^\d{5}$/.test(data.zip)) e.zip = 'Enter a 5-digit ZIP'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const GHL_WEBHOOK_URL = (typeof window !== 'undefined' && window.RNM_CONFIG?.ghlWebhookUrl) || ''

  const submit = async () => {
    setSubmitError('')
    if (!GHL_WEBHOOK_URL) { setSubmitted(true); return }
    setSubmitting(true)
    try {
      const parts = (data.name || '').trim().split(/\s+/)
      const firstName = parts[0] || ''
      const lastName = parts.slice(1).join(' ') || ''
      const utm = (() => {
        try {
          const q = new URLSearchParams(window.location.search)
          return { utm_source: q.get('utm_source') || '', utm_medium: q.get('utm_medium') || '', utm_campaign: q.get('utm_campaign') || '' }
        } catch { return {} }
      })()
      const res = await fetch(GHL_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName, lastName, email: data.email, phone: data.phone,
          address1: data.address || '', postalCode: data.zip || '',
          source: 'website-quote-form',
          tags: ['web-lead', data.service ? ('svc-' + data.service) : ''].filter(Boolean),
          customField: {
            service_interest: data.service, material_preference: data.material,
            home_type: data.homeType, approx_sqft: data.sqft, timeline: data.timeline,
            page_url: typeof window !== 'undefined' ? window.location.href : '',
            ...utm,
          },
        }),
      })
      if (!res.ok) throw new Error('Webhook error ' + res.status)
      setSubmitted(true)
    } catch (err) {
      console.error(err)
      setSubmitError("Couldn't submit — call us at 832-991-0928 and we'll get you set up.")
    } finally {
      setSubmitting(false)
    }
  }

  const next = () => { if (validate(step)) { if (step === steps.length - 1) submit(); else setStep(step + 1) } }
  const back = () => setStep(Math.max(0, step - 1))

  const services = [
    { id: 'roofing', label: 'Roofing', desc: 'Replace, repair, or storm damage' },
    { id: 'windows', label: 'Windows', desc: 'Replacement windows, full-frame or insert' },
    { id: 'gutters', label: 'Gutters', desc: 'Seamless, guards, fascia, soffit' },
    { id: 'siding', label: 'Siding', desc: 'Vinyl, fiber cement, cedar, LP' },
    { id: 'concrete', label: 'Residential concrete', desc: 'Driveway, walkway, patio, steps' },
    { id: 'bundle', label: 'Multiple / bundle', desc: "Not sure — we'll help scope it" },
  ]
  const materials = ['Asphalt shingle', 'Metal standing-seam', 'Slate / tile', 'Flat / membrane']
  const homeTypes = ['Single family', 'Townhouse', 'Multi-family', 'Commercial']
  const timelines = ['Emergency (now)', 'Within 30 days', '1–3 months', 'Just planning']

  const inputStyle = (hasError) => ({
    width: '100%', padding: '14px 16px', background: palette.bg,
    border: `1.5px solid ${hasError ? '#c53030' : palette.ink}`,
    borderRadius: 10, fontSize: 15, color: palette.ink, fontFamily: 'inherit',
    outline: 'none', transition: 'border-color 0.15s',
  })
  const chipStyle = (active, error) => ({
    padding: '14px 16px',
    background: active ? palette.ink : palette.surface,
    color: active ? palette.surface : palette.ink,
    border: `1.5px solid ${error && !active ? '#c53030' : palette.ink}`,
    borderRadius: 10, cursor: 'pointer', fontSize: 14, fontWeight: 600,
    textAlign: 'left', transition: 'all 0.15s', fontFamily: 'inherit',
  })

  if (submitted) {
    return (
      <div style={{ padding: compact ? 24 : 40, textAlign: 'center', color: palette.ink }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: palette.accent, display: 'grid', placeItems: 'center', margin: '0 auto 20px' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={palette.surface} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
        <h3 style={{ fontSize: compact ? 24 : 32, fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>Quote request received</h3>
        <p style={{ marginTop: 12, fontSize: 15, opacity: 0.7, maxWidth: 380, marginLeft: 'auto', marginRight: 'auto' }}>
          Thanks {data.name.split(' ')[0]} — we'll call {data.phone} within 24 business hours with a scoped estimate.
        </p>
        <button onClick={() => { setSubmitted(false); setStep(0); setData({ service: '', material: '', homeType: '', sqft: '', timeline: '', name: '', email: '', phone: '', zip: '', address: '' }) }}
          style={{ marginTop: 24, padding: '10px 20px', background: 'transparent', border: `1.5px solid ${palette.ink}`, color: palette.ink, fontWeight: 600, borderRadius: 999, cursor: 'pointer', fontSize: 13 }}>
          Start another
        </button>
      </div>
    )
  }

  return (
    <div style={{ color: palette.ink }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
        {steps.map((s, i) => (
          <div key={s.key} style={{ flex: 1 }}>
            <div style={{ height: 3, background: i <= step ? palette.accent : `${palette.ink}22`, borderRadius: 2, transition: 'background 0.3s' }} />
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 6, opacity: i === step ? 1 : 0.5 }}>
              {String(i + 1).padStart(2, '0')} {s.label}
            </div>
          </div>
        ))}
      </div>

      {step === 0 && (
        <div>
          <h3 style={{ fontSize: compact ? 20 : 26, fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 4px' }}>What do you need?</h3>
          <p style={{ fontSize: 14, opacity: 0.65, margin: '0 0 20px' }}>Pick one — you can add more later.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {services.map((s) => (
              <button key={s.id} onClick={() => update('service', s.id)} style={{ ...chipStyle(data.service === s.id, errors.service), padding: 16, display: 'block' }}>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{s.label}</div>
                <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4, fontWeight: 500 }}>{s.desc}</div>
              </button>
            ))}
          </div>
          {errors.service && <div style={{ color: '#c53030', fontSize: 12, marginTop: 10, fontWeight: 600 }}>{errors.service}</div>}
        </div>
      )}

      {step === 1 && (
        <div>
          <h3 style={{ fontSize: compact ? 20 : 26, fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 4px' }}>Tell us about your home</h3>
          <p style={{ fontSize: 14, opacity: 0.65, margin: '0 0 20px' }}>Rough numbers are fine — we'll confirm on-site.</p>
          <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.6 }}>Material</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8, marginBottom: 16 }}>
            {materials.map((m) => <button key={m} onClick={() => update('material', m)} style={chipStyle(data.material === m, errors.material)}>{m}</button>)}
          </div>
          <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.6 }}>Home type</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8, marginBottom: 16 }}>
            {homeTypes.map((t) => <button key={t} onClick={() => update('homeType', t)} style={chipStyle(data.homeType === t, errors.homeType)}>{t}</button>)}
          </div>
          <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.6 }}>Approx. roof sqft</label>
          <input type="text" value={data.sqft} onChange={(e) => update('sqft', e.target.value.replace(/[^\d]/g, ''))} placeholder="e.g. 2400" style={{ ...inputStyle(errors.sqft), marginTop: 8 }} />
          {(errors.material || errors.homeType || errors.sqft) && <div style={{ color: '#c53030', fontSize: 12, marginTop: 10, fontWeight: 600 }}>{errors.material || errors.homeType || errors.sqft}</div>}
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 style={{ fontSize: compact ? 20 : 26, fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 4px' }}>When are you looking to start?</h3>
          <p style={{ fontSize: 14, opacity: 0.65, margin: '0 0 20px' }}>Emergencies get same-day tarp-up.</p>
          <div style={{ display: 'grid', gap: 8 }}>
            {timelines.map((t) => <button key={t} onClick={() => update('timeline', t)} style={chipStyle(data.timeline === t, errors.timeline)}>{t}</button>)}
          </div>
          {errors.timeline && <div style={{ color: '#c53030', fontSize: 12, marginTop: 10, fontWeight: 600 }}>{errors.timeline}</div>}
        </div>
      )}

      {step === 3 && (
        <div>
          <h3 style={{ fontSize: compact ? 20 : 26, fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 4px' }}>Where do we send it?</h3>
          <p style={{ fontSize: 14, opacity: 0.65, margin: '0 0 20px' }}>We text the estimate, then call to walk through it.</p>
          <div style={{ display: 'grid', gap: 10 }}>
            <input type="text" value={data.name} onChange={(e) => update('name', e.target.value)} placeholder="Full name" style={inputStyle(errors.name)} />
            {errors.name && <div style={{ color: '#c53030', fontSize: 12, fontWeight: 600, marginTop: -6 }}>{errors.name}</div>}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <input type="email" value={data.email} onChange={(e) => update('email', e.target.value)} placeholder="Email" style={inputStyle(errors.email)} />
              <input type="tel" value={data.phone} onChange={(e) => update('phone', e.target.value)} placeholder="Phone" style={inputStyle(errors.phone)} />
            </div>
            {(errors.email || errors.phone) && <div style={{ color: '#c53030', fontSize: 12, fontWeight: 600, marginTop: -6 }}>{errors.email || errors.phone}</div>}
            <input type="text" value={data.zip} onChange={(e) => update('zip', e.target.value.replace(/[^\d]/g, '').slice(0, 5))} placeholder="ZIP code" style={inputStyle(errors.zip)} />
            {errors.zip && <div style={{ color: '#c53030', fontSize: 12, fontWeight: 600, marginTop: -6 }}>{errors.zip}</div>}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
        {step > 0 && (
          <button onClick={back} style={{ padding: '14px 20px', background: 'transparent', border: `1.5px solid ${palette.ink}`, color: palette.ink, fontWeight: 700, borderRadius: 999, cursor: 'pointer', fontSize: 14, fontFamily: 'inherit' }}>Back</button>
        )}
        <button onClick={next} disabled={submitting} style={{ flex: 1, padding: '14px 20px', background: submitting ? palette.ink + '66' : palette.accent, border: `1.5px solid ${submitting ? palette.ink + '66' : palette.accent}`, color: '#fff', fontWeight: 800, borderRadius: 999, cursor: submitting ? 'wait' : 'pointer', fontSize: 14, letterSpacing: '0.02em', fontFamily: 'inherit', boxShadow: `4px 4px 0 ${palette.ink}`, transition: 'transform 0.08s, box-shadow 0.08s' }}
          onMouseDown={(e) => { if (!submitting) { e.currentTarget.style.transform = 'translate(2px, 2px)'; e.currentTarget.style.boxShadow = `2px 2px 0 ${palette.ink}` } }}
          onMouseUp={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `4px 4px 0 ${palette.ink}` }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `4px 4px 0 ${palette.ink}` }}
        >
          {submitting ? 'Sending…' : (step === steps.length - 1 ? 'Get my estimate →' : 'Continue →')}
        </button>
      </div>
      {submitError && <div style={{ marginTop: 14, padding: '10px 14px', background: '#fee', border: '1px solid #f99', borderRadius: 10, color: '#a00', fontSize: 13 }}>{submitError}</div>}
    </div>
  )
}

export const FinanceCalc = ({ palette }) => {
  const [amount, setAmount] = React.useState(18000)
  const [months, setMonths] = React.useState(18)
  const apr = months === 18 ? 0 : 6.99
  const payment = apr === 0 ? amount / months : (amount * (apr / 100 / 12)) / (1 - Math.pow(1 + apr / 100 / 12, -months))

  return (
    <div style={{ color: palette.ink }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
        <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.6 }}>Project amount</label>
        <div style={{ fontSize: 20, fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>${amount.toLocaleString()}</div>
      </div>
      <input type="range" min="5000" max="60000" step="500" value={amount} onChange={(e) => setAmount(+e.target.value)} style={{ width: '100%', accentColor: palette.accent }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 20, marginBottom: 6 }}>
        <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.6 }}>Term</label>
        <div style={{ fontSize: 20, fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>{months} mo{months === 18 ? ' · 0% APR · no payments' : ''}</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
        {[18, 24, 36, 60, 84, 120].map((m) => {
          const isPromo = m === 18
          const active = months === m
          return (
            <button key={m} onClick={() => setMonths(m)} style={{ position: 'relative', padding: '8px 0', background: active ? palette.ink : 'transparent', color: active ? palette.surface : palette.ink, border: `1.5px solid ${isPromo ? palette.accent : palette.ink}`, borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
              {m}
              {isPromo && <span style={{ position: 'absolute', top: -7, right: -4, fontSize: 8, fontWeight: 800, letterSpacing: '0.08em', padding: '2px 5px', borderRadius: 3, background: palette.accent, color: '#fff' }}>0%</span>}
            </button>
          )
        })}
      </div>
      <div style={{ marginTop: 24, padding: 20, background: palette.ink, color: palette.surface, borderRadius: 14, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.6, fontWeight: 700 }}>{apr === 0 ? 'Payments' : 'Est. payment'}</div>
          <div style={{ fontSize: 11, opacity: 0.5, marginTop: 4 }}>{apr === 0 ? 'No payments, no interest for 18 months · pay in full to avoid interest' : `${apr}% APR · subject to credit`}</div>
        </div>
        <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>
          {apr === 0 ? <span>$0<span style={{ fontSize: 14, opacity: 0.6, fontWeight: 600 }}>/mo</span></span> : <span>${Math.round(payment)}<span style={{ fontSize: 14, opacity: 0.6, fontWeight: 600 }}>/mo</span></span>}
        </div>
      </div>
    </div>
  )
}

export const FAQ = ({ palette, items }) => {
  const [open, setOpen] = React.useState(0)
  return (
    <div style={{ borderTop: `1.5px solid ${palette.ink}` }}>
      {items.map((item, i) => (
        <div key={i} style={{ borderBottom: `1.5px solid ${palette.ink}` }}>
          <button onClick={() => setOpen(open === i ? -1 : i)} style={{ width: '100%', padding: '22px 0', background: 'transparent', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', color: palette.ink, fontFamily: 'inherit', textAlign: 'left' }}>
            <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em' }}>{item.q}</span>
            <span style={{ width: 32, height: 32, borderRadius: '50%', border: `1.5px solid ${palette.ink}`, display: 'grid', placeItems: 'center', flexShrink: 0, marginLeft: 20, transition: 'transform 0.3s', transform: open === i ? 'rotate(45deg)' : 'none' }}>
              <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 1 V13 M1 7 H13" stroke={palette.ink} strokeWidth="1.5" strokeLinecap="round" /></svg>
            </span>
          </button>
          <div style={{ maxHeight: open === i ? 200 : 0, overflow: 'hidden', transition: 'max-height 0.35s ease' }}>
            <p style={{ fontSize: 15, lineHeight: 1.6, opacity: 0.75, margin: '0 0 22px', maxWidth: 560 }}>{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
