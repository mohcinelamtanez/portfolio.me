import { NextResponse } from "next/server";

export const runtime = "edge";

interface ContactPayload {
  name?: string;
  email?: string;
  message?: string;
  /** Honeypot: hidden from humans, only bots fill it in. */
  website?: string;
  /** Milliseconds between the form being displayed and submitted. */
  elapsedMs?: number;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ---------- Anti-spam ----------

/** Humans need a few seconds to fill in three fields; scripts post instantly. */
const MIN_FILL_TIME_MS = 3000;

/**
 * Best-effort rate limit: 3 messages per IP every 10 minutes.
 * The counter lives in the memory of the running edge instance, so it resets on
 * cold starts and isn't shared between regions. It stops bursts from a single
 * client; for a strict global limit, use a shared store (e.g. Upstash Redis)
 * or Vercel's WAF rate-limiting rules.
 */
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const hitsByIp = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hitsByIp.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) {
    hitsByIp.set(ip, recent);
    return true;
  }
  recent.push(now);
  hitsByIp.set(ip, recent);

  // Keep the map from growing forever on a long-lived instance.
  if (hitsByIp.size > 5000) {
    for (const [key, times] of hitsByIp) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) hitsByIp.delete(key);
    }
  }
  return false;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { name, email, message, website, elapsedMs } = body;

  // Bots get a normal-looking success so they don't learn they were filtered out.
  const filledHoneypot = typeof website === "string" && website.trim() !== "";
  const tooFast = typeof elapsedMs !== "number" || elapsedMs < MIN_FILL_TIME_MS;
  if (filledHoneypot || tooFast) {
    console.warn("[contact] submission dropped as spam", { filledHoneypot, tooFast });
    return NextResponse.json({ ok: true });
  }

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "name, email, and message are required." }, { status: 422 });
  }

  if (name.length > 100 || email.length > 254 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "A valid name and email address are required." }, { status: 422 });
  }

  if (message.length > 5000) {
    return NextResponse.json({ error: "Message is too long." }, { status: 422 });
  }

  if (isRateLimited(clientIp(request))) {
    return NextResponse.json({ error: "Too many messages. Please try again later." }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.CONTACT_FROM_EMAIL; // e.g. "Portfolio <portfolio@yourdomain.dev>"
  const toAddress = process.env.CONTACT_TO_EMAIL;     // e.g. "you@yourdomain.dev"

  if (!apiKey || !fromAddress || !toAddress) {
    console.error("[contact] missing Resend config (RESEND_API_KEY / CONTACT_FROM_EMAIL / CONTACT_TO_EMAIL)");
    return NextResponse.json({ error: "Server is not configured to send messages." }, { status: 500 });
  }

  // Keep the subject on a single line whatever the visitor typed.
  const safeName = name.trim().replace(/[\r\n]+/g, " ");

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
        subject: `Portfolio contact from ${safeName}`,
        text: `From: ${safeName} <${email.trim()}>\n\n${message}`,
        reply_to: email.trim(),
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
