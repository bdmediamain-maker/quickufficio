import type { APIRoute } from 'astro';
import { Resend } from 'resend';

// API endpoint, on-demand rendered (non statico)
export const prerender = false;

const TEAMLEADER_FALLBACK = 'https://cloud.teamleader.eu/quickufficiocom-srls/bookings/u/perottinosergio/';
const FROM = 'noreply@quickufficio.com';
const TO = 'info@quickufficio.com';

const sanitize = (s: string | null) => (s ?? '').toString().trim().slice(0, 1000);

export const POST: APIRoute = async ({ request, redirect }) => {
  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return new Response('Invalid form data', { status: 400 });
  }

  // Honeypot anti-spam
  if (sanitize(data.get('company_website') as string | null)) {
    return redirect('/prenota-demo?error=spam', 303);
  }

  const nome = sanitize(data.get('nome') as string | null);
  const email = sanitize(data.get('email') as string | null);
  const telefono = sanitize(data.get('telefono') as string | null);
  const tipo = sanitize(data.get('tipo_struttura') as string | null);
  const note = sanitize(data.get('note') as string | null);
  const origin = sanitize(data.get('origin') as string | null);
  const gdpr = data.get('gdpr');

  // Validation minimal
  if (!nome || !email || !telefono || !tipo || !gdpr) {
    return redirect('/prenota-demo?error=missing', 303);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return redirect('/prenota-demo?error=email', 303);
  }

  // 1. Notify Sergio via Resend (fire-and-forget if key not set in dev)
  const resendKey = import.meta.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: FROM,
        to: TO,
        replyTo: email,
        subject: `Nuova pre-qualifica demo: ${nome} (${tipo})`,
        html: `
          <h2>Nuova pre-qualifica demo da ${nome}</h2>
          <ul style="font-family:sans-serif;line-height:1.7;">
            <li><strong>Nome:</strong> ${nome}</li>
            <li><strong>Email:</strong> <a href="mailto:${email}">${email}</a></li>
            <li><strong>Telefono:</strong> <a href="tel:${telefono.replace(/\s+/g, '')}">${telefono}</a></li>
            <li><strong>Tipo struttura:</strong> ${tipo}</li>
            <li><strong>Origine:</strong> ${origin || 'n/a'}</li>
          </ul>
          ${note ? `<p><strong>Note:</strong><br/>${note.replace(/\n/g, '<br/>')}</p>` : ''}
          <hr/>
          <p style="color:#888;font-size:.85em;">L'utente è stato reindirizzato su TeamLeader per scegliere lo slot.</p>
        `,
      });
    } catch (e) {
      console.error('[booking-prequalify] resend send failed', e);
      // Non bloccare l'utente: procedi al redirect
    }
  } else {
    console.warn('[booking-prequalify] RESEND_API_KEY non configurata — email skipped');
    console.log('[booking-prequalify] prequalify data', { nome, email, telefono, tipo, origin });
  }

  // 2. Redirect a TeamLeader con query params precompilati
  const baseUrl = import.meta.env.PUBLIC_TEAMLEADER_BOOKING_URL || TEAMLEADER_FALLBACK;
  const tlUrl = new URL(baseUrl);
  const [firstName, ...rest] = nome.split(/\s+/);
  const lastName = rest.join(' ');
  tlUrl.searchParams.set('firstname', firstName);
  if (lastName) tlUrl.searchParams.set('lastname', lastName);
  tlUrl.searchParams.set('email', email);
  tlUrl.searchParams.set('phone', telefono);

  return redirect(tlUrl.toString(), 303);
};
