/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly RESEND_API_KEY: string;
  readonly PUBLIC_TEAMLEADER_BOOKING_URL: string;
  readonly PUBLIC_CONTACT_PHONE: string;
  readonly PUBLIC_CONTACT_EMAIL: string;
  readonly PUBLIC_WHATSAPP_NUMBER: string;
  readonly PUBLIC_ANALYTICS_DOMAIN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
