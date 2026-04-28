const ALLOWED_ORIGINS = ['https://roofsnmore.com', 'https://www.roofsnmore.com'];

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    let data;
    try {
      data = await request.json();
    } catch {
      return new Response(JSON.stringify({ ok: false, error: 'Invalid JSON' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
      });
    }

    const ghlHeaders = {
      'Authorization': `Bearer ${env.GHL_API_KEY}`,
      'Content-Type': 'application/json',
      'Version': '2021-07-28',
    };

    // Create the contact
    const contactPayload = {
      locationId: env.GHL_LOCATION_ID,
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      email: data.email || '',
      phone: data.phone || '',
      postalCode: data.zip || '',
      tags: ['website-contact'],
      source: 'website-contact-form',
    };

    const contactRes = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: ghlHeaders,
      body: JSON.stringify(contactPayload),
    });

    if (!contactRes.ok) {
      const err = await contactRes.text();
      console.error('GHL contact create failed:', err);
      return new Response(JSON.stringify({ ok: false }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
      });
    }

    const { contact } = await contactRes.json();

    // Attach a note with the form details
    if (contact?.id) {
      const lines = [
        `SMS consent: ${data.smsConsent ? 'Yes (checked at submission)' : 'No'}`,
        `What they need: ${data.need || '—'}`,
        `Services: ${data.services || '—'}`,
        `Zip: ${data.zip || '—'}`,
        `Message: ${data.message || '—'}`,
      ];
      await fetch(`https://services.leadconnectorhq.com/contacts/${contact.id}/notes`, {
        method: 'POST',
        headers: ghlHeaders,
        body: JSON.stringify({ body: lines.join('\n') }),
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
    });
  },
};
