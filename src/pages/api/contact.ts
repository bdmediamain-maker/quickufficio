import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

const FROM = 'noreply@quickufficio.com';
const TO = 'info@quickufficio.com';

const sanitize = (s: string | null) => (s ?? '').toString().trim().slice(0, 4000);

export const POST: APIRoute = async ({ request, redirect }) => {
  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return new Response('Invalid form data', { status: 400 });
  }

  // Honeypot
  if (sanitize(data.get('company_website') as string | null)) {
    return redirect('/contatti?error=spam', 303);
  }

  const nome = sanitize(data.get('nome') as string | null);
  const email = sanitize(data.get('email') as string | null);
  const telefono = sanitize(data.get('telefono') as string | null);
  const settore = sanitize(data.get('settore') as string | null);
  const messaggio = sanitize(data.get('messaggio') as string | null);
  const origin = sanitize(data.get('origin') as string | null);
  const gdpr = data.get('gdpr');

  if (!nome || !email || !messaggio || !gdpr) {
    return redirect('/contatti?error=missing', 303);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return redirect('/contatti?error=email', 303);
  }

  const resendKey = import.meta.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: FROM,
        to: TO,
        replyTo: email,
        subject: `Nuovo contatto: ${nome}${settore ? ` (${settore})` : ''}`,
        html: `
          <h2>Nuovo messaggio dal sito</h2>
          <ul style="font-family:sans-serif;line-height:1.7;">
            <li><strong>Nome:</strong> ${nome}</li>
            <li><strong>Email:</strong> <a href="mailto:${email}">${email}</a></li>
            ${telefono ? `<li><strong>Telefono:</strong> <a href="tel:${telefono.replace(/\s+/g, '')}">${telefono}</a></li>` : ''}
            ${settore ? `<li><strong>Settore:</strong> ${settore}</li>` : ''}
            <li><strong>Origine:</strong> ${origin || 'n/a'}</li>
          </ul>
          <p><strong>Messaggio:</strong></p>
          <p style="white-space:pre-wrap;background:#F5EDF7;padding:1em;border-radius:8px;">${messaggio.replace(/\n/g, '<br/>')}</p>
        `,
      });
    } catch (e) {
      console.error('[contact] resend send failed', e);
    }
  } else {
    console.warn('[contact] RESEND_API_KEY non configurata — email skipped');
    console.log('[contact] data', { nome, email, telefono, settore, messaggio, origin });
  }

  return redirect('/contatti?sent=1', 303);
};
