import { NextResponse } from "next/server";

export const runtime = "edge";

interface ContactPayload {
  name?: string;
  email?: string;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { name, email, message } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "name, email, and message are required." }, { status: 422 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "A valid email address is required." }, { status: 422 });
  }

  if (message.length > 5000) {
    return NextResponse.json({ error: "Message is too long." }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.CONTACT_FROM_EMAIL; // e.g. "Portfolio <portfolio@yourdomain.dev>"
  const toAddress = process.env.CONTACT_TO_EMAIL;     // e.g. "you@yourdomain.dev"

  if (!apiKey || !fromAddress || !toAddress) {
    console.error("[contact] missing Resend config (RESEND_API_KEY / CONTACT_FROM_EMAIL / CONTACT_TO_EMAIL)");
    return NextResponse.json({ error: "Server is not configured to send messages." }, { status: 500 });
  }

  try {
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: toAddress,
        subject: `Portfolio contact from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
        reply_to: email,
      }),
    });

    if (!resendRes.ok) {
      const errBody = await resendRes.text();
      console.error("[contact] Resend error", resendRes.status, errBody);
      return NextResponse.json({ error: "Failed to send message." }, { status: 502 });
    }
  } catch (err) {
    console.error("[contact] Resend request failed", err);
    return NextResponse.json({ error: "Failed to send message." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}