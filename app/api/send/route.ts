import { NextResponse } from 'next/server';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

function createSupabaseAdmin(url: string, key: string): SupabaseClient {
  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function checkSupabaseServerKey(key: string): string | null {
  const k = key.trim();
  if (k.startsWith('sb_publishable_')) {
    return 'SUPABASE_SECRET is the Publishable key. Use the Secret key (sb_secret_…) or service_role JWT.';
  }
  if (k.startsWith('sb_secret_')) return null;

  const parts = k.split('.');
  if (parts.length !== 3 || !k.startsWith('eyJ')) return null;

  try {
    const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8')) as {
      role?: string;
    };
    if (payload.role === 'service_role') return null;
    if (payload.role === 'anon') {
      return 'SUPABASE_SECRET is the anon JWT. Use the service_role JWT or a Secret key (sb_secret_…).';
    }
    return `SUPABASE_SECRET JWT role is "${payload.role ?? 'unknown'}". Use service_role or sb_secret_*.`;
  } catch {
    return 'Could not parse SUPABASE_SECRET. Use the Secret key or Legacy service_role JWT.';
  }
}

function getResendFromEmail(): string | undefined {
  return (process.env.CONTACT_FORM_FROM_EMAIL ?? process.env.RESEND_FROM_EMAIL)?.trim() || undefined;
}

function getResendToEmail(): string | undefined {
  return (
    process.env.CONTACT_FORM_NOTIFICATION_EMAIL ??
    process.env.RESEND_TO_EMAIL ??
    process.env.RESEND_ADMIN_EMAIL
  )?.trim() || undefined;
}

function getResendAdminBcc(primaryTo: string): string[] {
  const admin = process.env.RESEND_ADMIN_EMAIL?.trim();
  if (!admin) return [];
  if (admin.toLowerCase() === primaryTo.toLowerCase()) return [];
  return [admin];
}

type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  company: string;
  interest: string;
  message: string;
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0;
}

function parsePayload(body: unknown): ContactPayload | null {
  if (!body || typeof body !== 'object') return null;
  const o = body as Record<string, unknown>;

  if (
    !isNonEmptyString(o.name) ||
    !isNonEmptyString(o.email) ||
    !isNonEmptyString(o.phone) ||
    !isNonEmptyString(o.message)
  ) {
    return null;
  }

  return {
    name: String(o.name).trim(),
    email: String(o.email).trim(),
    phone: String(o.phone).trim(),
    company: typeof o.company === 'string' ? o.company.trim() : '',
    interest: typeof o.interest === 'string' ? o.interest.trim() : '',
    message: String(o.message).trim(),
  };
}

function buildPlainText(payload: ContactPayload): string {
  return [
    'New BKH Group website enquiry',
    '',
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    `Company: ${payload.company || 'Not provided'}`,
    `Interest: ${payload.interest || 'Not provided'}`,
    '',
    'Message:',
    payload.message,
  ].join('\n');
}

function buildHtml(payload: ContactPayload): string {
  return `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#191510;">
      <h1 style="font-size:22px;margin:0 0 16px;">New BKH Group website enquiry</h1>
      <table style="width:100%;border-collapse:collapse;font-size:15px;">
        <tr><td style="padding:8px 0;color:#5f554a;">Name</td><td style="padding:8px 0;">${escapeHtml(payload.name)}</td></tr>
        <tr><td style="padding:8px 0;color:#5f554a;">Email</td><td style="padding:8px 0;">${escapeHtml(payload.email)}</td></tr>
        <tr><td style="padding:8px 0;color:#5f554a;">Phone</td><td style="padding:8px 0;">${escapeHtml(payload.phone)}</td></tr>
        <tr><td style="padding:8px 0;color:#5f554a;">Company</td><td style="padding:8px 0;">${escapeHtml(payload.company || 'Not provided')}</td></tr>
        <tr><td style="padding:8px 0;color:#5f554a;">Interest</td><td style="padding:8px 0;">${escapeHtml(payload.interest || 'Not provided')}</td></tr>
      </table>
      <p style="margin:24px 0 8px;font-size:12px;font-weight:600;color:#5f554a;text-transform:uppercase;letter-spacing:0.07em;">Message</p>
      <p style="margin:0;font-size:15px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(payload.message)}</p>
    </div>
  `;
}

export async function POST(request: Request) {
  let payload: ContactPayload | null = null;

  try {
    const body = await request.json();
    payload = parsePayload(body);
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (!payload) {
    return NextResponse.json({ error: 'Please complete the required fields.' }, { status: 400 });
  }

  const supabaseUrl = process.env.SUPABASE_URL?.trim();
  const supabaseKey = process.env.SUPABASE_SECRET?.trim();
  const resendKey = process.env.RESEND_API_KEY?.trim();
  const fromEmail = getResendFromEmail();
  const toEmail = getResendToEmail();

  const results: { supabase?: string; email?: string } = {};

  if (supabaseUrl && supabaseKey) {
    const keyError = checkSupabaseServerKey(supabaseKey);
    if (keyError) {
      console.error(keyError);
      results.supabase = 'skipped_invalid_key';
    } else {
      try {
        const supabase = createSupabaseAdmin(supabaseUrl, supabaseKey);
        const { error } = await supabase.from('contact_enquiries_bkh').insert({
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          company: payload.company || null,
          interest: payload.interest || null,
          message: payload.message,
        });
        results.supabase = error ? 'failed' : 'ok';
        if (error) console.error('Supabase insert failed:', error.message);
      } catch (err) {
        results.supabase = 'failed';
        console.error('Supabase error:', err);
      }
    }
  }

  if (resendKey && fromEmail && toEmail) {
    try {
      const emailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [toEmail],
          bcc: getResendAdminBcc(toEmail),
          subject: `BKH Group enquiry from ${payload.name}`,
          text: buildPlainText(payload),
          html: buildHtml(payload),
          reply_to: payload.email,
        }),
      });
      results.email = emailRes.ok ? 'ok' : 'failed';
      if (!emailRes.ok) {
        console.error('Resend failed:', await emailRes.text());
      }
    } catch (err) {
      results.email = 'failed';
      console.error('Resend error:', err);
    }
  }

  return NextResponse.json({ ok: true, results });
}
