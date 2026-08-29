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

  // Plug in a transactional email provider here (e.g. Resend, Postmark, SES).
  // Kept provider-agnostic and unauthenticated in this template so it builds
  // without requiring secrets — wire up your provider's SDK/API in this block.
  //
  // Example (Resend):
  // await fetch("https://api.resend.com/emails", {
  //   method: "POST",
  //   headers: {
  //     Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     from: "portfolio@yourdomain.dev",
  //     to: "you@yourdomain.dev",
  //     subject: `Portfolio contact from ${name}`,
  //     text: message,
  //     reply_to: email,
  //   }),
  // });

  console.log("[contact] new message", { name, email, length: message.length });

  return NextResponse.json({ ok: true });
}
