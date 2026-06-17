import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

const FROM = 'noreply@quickufficio.com';
const TO = 'info@quickufficio.com';

const sanitize = (s: string | null) => (s ?? '').toString().trim().slice(0, 200);

export const POST: APIRoute = async ({ request, redirect }) => {
  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return new Response('Invalid form data', { status: 400 });
  }

  const email = sanitize(data.get('email') as string | null);
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return redirect('/?newsletter=error', 303);
  }

  const resendKey = import.meta.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: FROM,
        to: TO,
        subject: `Nuova iscrizione newsletter: ${email}`,
        html: `<p>Nuovo iscritto: <strong>${email}</strong></p><p>Aggiungilo a MailerLite/Brevo.</p>`,
      });
    } catch (e) {
      console.error('[newsletter] resend send failed', e);
    }
  } else {
    console.log('[newsletter] new subscriber:', email);
  }

  return redirect('/?newsletter=ok', 303);
};
