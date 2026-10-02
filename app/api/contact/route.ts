import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 12_000;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_MESSAGES = 5;
const attemptsByClient = new Map<string, { count: number; resetAt: number }>();
const CONTACT_RECIPIENTS = ["harsh-kumar@outlook.com", "grade.mohit@gmail.com"];

type ContactMessage = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown;
};

function isText(value: unknown): value is string {
  return typeof value === "string";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

function getClientKey(request: NextRequest) {
  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

function isRateLimited(clientKey: string) {
  const now = Date.now();
  for (const [key, attempt] of attemptsByClient) {
    if (attempt.resetAt <= now) attemptsByClient.delete(key);
  }
  const attempt = attemptsByClient.get(clientKey);
  if (attempt && attempt.resetAt > now && attempt.count >= RATE_LIMIT_MAX_MESSAGES) {
    return true;
  }
  attemptsByClient.set(
    clientKey,
    attempt && attempt.resetAt > now
      ? { ...attempt, count: attempt.count + 1 }
      : { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS },
  );
  return false;
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "The message is too large." }, { status: 413 });
  }

  let form: ContactMessage;
  try {
    form = await request.json();
  } catch {
    return NextResponse.json({ error: "The form submission is invalid." }, { status: 400 });
  }

  if (!form || typeof form !== "object" || Array.isArray(form)) {
    return NextResponse.json({ error: "The form submission is invalid." }, { status: 400 });
  }

  if (isText(form.website) && form.website.trim()) {
    return NextResponse.json({ error: "The form submission could not be accepted." }, { status: 400 });
  }

  const name = isText(form.name) ? form.name.trim() : "";
  const email = isText(form.email) ? form.email.trim() : "";
  const subject = isText(form.subject) ? form.subject.trim().replace(/[\r\n]+/g, " ") : "";
  const message = isText(form.message) ? form.message.trim() : "";
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    name.length < 1 || name.length > 100 ||
    email.length > 254 || !emailPattern.test(email) ||
    subject.length < 1 || subject.length > 120 ||
    message.length < 1 || message.length > 5000
  ) {
    return NextResponse.json({ error: "Check the form fields and try again." }, { status: 400 });
  }

  if (isRateLimited(getClientKey(request))) {
    return NextResponse.json(
      { error: "Too many messages have been sent. Please try again in 15 minutes." },
      { status: 429, headers: { "Retry-After": "900" } },
    );
  }

  const gmailUser = process.env.MAIL_USERNAME || process.env.GMAIL_USER || "grade.mohit@gmail.com";
  const gmailAppPassword = (process.env.MAIL_PASSWORD || process.env.GMAIL_APP_PASSWORD)?.replace(/\s/g, "");
  const smtpHost = process.env.MAIL_HOST || "smtp.gmail.com";
  const smtpPort = Number(process.env.MAIL_PORT || 587);
  const smtpEncryption = process.env.MAIL_ENCRYPTION || "tls";
  const senderAddress = process.env.MAIL_FROM_ADDRESS || gmailUser;
  const recipients = CONTACT_RECIPIENTS;
  const configuredFromName = process.env.MAIL_FROM_NAME?.trim();
  if (!gmailUser || !gmailAppPassword || !senderAddress) {
    console.error("Contact email is unavailable because Gmail SMTP credentials are not configured.");
    return NextResponse.json(
      { error: "The contact form is temporarily unavailable. Please email harsh-kumar@outlook.com directly." },
      { status: 503 },
    );
  }
  if (
    !Number.isInteger(smtpPort) || smtpPort < 1 || smtpPort > 65535 ||
    !["tls", "ssl"].includes(smtpEncryption.toLowerCase()) ||
    !emailPattern.test(senderAddress) ||
    !recipients.length || recipients.some((address) => !emailPattern.test(address))
  ) {
    console.error("Contact email is unavailable because the recipient configuration is invalid.");
    return NextResponse.json(
      { error: "The contact form is temporarily unavailable. Please email harsh-kumar@outlook.com directly." },
      { status: 503 },
    );
  }

  try {
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message).replace(/\r?\n/g, "<br>");
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpEncryption.toLowerCase() === "ssl",
      requireTLS: smtpEncryption.toLowerCase() === "tls",
      auth: { user: gmailUser, pass: gmailAppPassword },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });

    await transporter.sendMail({
      from: { name: configuredFromName || "Harsh Ki Baat", address: senderAddress },
      to: recipients,
      replyTo: { name, address: email },
      subject: `Website contact: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      html: `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:32px 12px;background-color:#f5f6f7;font-family:Arial,Helvetica,sans-serif;color:#252525;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;">
      <tr><td style="padding:24px 32px;background:#cc0000;color:#ffffff;">
        <div style="font-family:Georgia,serif;font-size:24px;font-weight:bold;letter-spacing:-.5px;">harsh ki baat</div>
        <div style="margin-top:7px;color:#ffe5e5;font-size:11px;font-weight:bold;letter-spacing:1.5px;">NEWS · VIEWS · CONVERSATIONS</div>
      </td></tr>
      <tr><td style="padding:32px;">
        <div style="margin-bottom:11px;color:#cc0000;font-size:11px;font-weight:bold;letter-spacing:1.4px;">NEW WEBSITE MESSAGE</div>
        <h1 style="margin:0 0 22px;font-family:Georgia,serif;font-size:28px;line-height:1.25;font-weight:normal;color:#252525;">${safeSubject}</h1>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 22px;border:1px solid #e5e7eb;background:#f8f9fa;">
          <tr><td style="padding:17px 19px;">
            <div style="margin-bottom:10px;color:#5f6368;font-size:12px;line-height:1.6;"><strong style="color:#343a40;">From:</strong> ${safeName} &lt;${safeEmail}&gt;</div>
            <div style="color:#252525;font-size:14px;line-height:1.8;white-space:normal;">${safeMessage}</div>
          </td></tr>
        </table>
        <p style="margin:0;color:#5f6368;font-size:13px;line-height:1.7;">Reply directly to this email to respond to ${safeName}.</p>
        <p style="margin:23px 0 0;"><a href="mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(`Re: ${subject}`)}" style="display:inline-block;padding:13px 19px;border-radius:4px;background:#cc0000;color:#ffffff;text-decoration:none;font-size:13px;font-weight:bold;">Reply to sender&nbsp; ↗</a></p>
      </td></tr>
      <tr><td style="padding:17px 32px;border-top:1px solid #e5e7eb;color:#74787d;font-size:11px;line-height:1.6;">Sent from the Harsh ki Baat website contact form.</td></tr>
    </table>
  </body>
</html>`,
    });

    let autoReplySent = true;
    try {
      await transporter.sendMail({
        from: { name: configuredFromName || "Harsh Ki Baat", address: senderAddress },
        to: { name, address: email },
        replyTo: { name: configuredFromName || "Harsh Ki Baat", address: senderAddress },
        subject: "Thanks for getting in touch with Harsh Ki Baat",
        text: [
          `Hello ${name},`,
          "",
          "Thank you for writing to Harsh Ki Baat. We’ve received your message and appreciate you taking the time to contact us.",
          "Our team will review it and get back to you if a response is needed.",
          "",
          `Your subject: ${subject}`,
          "",
          "Your message:",
          message,
          "",
          "Warm regards,",
          "Team Harsh Ki Baat",
          "https://harshkibaat.com",
        ].join("\n"),
        html: `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:32px 12px;background-color:#f5f6f7;font-family:Arial,Helvetica,sans-serif;color:#252525;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;">
      <tr><td style="padding:24px 32px;background:#cc0000;color:#ffffff;">
        <div style="font-family:Georgia,serif;font-size:24px;font-weight:bold;letter-spacing:-.5px;">harsh ki baat</div>
        <div style="margin-top:7px;color:#ffe5e5;font-size:11px;font-weight:bold;letter-spacing:1.5px;">NEWS · VIEWS · CONVERSATIONS</div>
      </td></tr>
      <tr><td style="padding:34px 32px 28px;">
        <div style="margin-bottom:12px;color:#cc0000;font-size:11px;font-weight:bold;letter-spacing:1.5px;">MESSAGE RECEIVED</div>
        <h1 style="margin:0 0 16px;font-family:Georgia,serif;font-size:29px;line-height:1.25;font-weight:normal;color:#252525;">Thank you for reaching out, ${safeName}.</h1>
        <p style="margin:0 0 22px;color:#52565a;font-size:15px;line-height:1.7;">We’ve received your message and appreciate you taking the time to write to us. Our team will review it and get back to you if a response is needed.</p>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 24px;border-left:3px solid #cc0000;background:#f8f9fa;">
          <tr><td style="padding:16px 18px;">
            <div style="margin-bottom:9px;color:#5f6368;font-size:11px;font-weight:bold;letter-spacing:1px;">YOUR MESSAGE · ${safeSubject}</div>
            <div style="color:#343a40;font-size:14px;line-height:1.7;">${safeMessage}</div>
          </td></tr>
        </table>
        <p style="margin:0;color:#52565a;font-size:14px;line-height:1.7;">Warm regards,<br><strong style="color:#252525;">Team Harsh Ki Baat</strong></p>
        <p style="margin:23px 0 0;"><a href="https://harshkibaat.com" style="display:inline-block;padding:13px 19px;border-radius:4px;background:#cc0000;color:#ffffff;text-decoration:none;font-size:13px;font-weight:bold;">Visit Harsh Ki Baat&nbsp; ↗</a></p>
      </td></tr>
      <tr><td style="padding:18px 32px;border-top:1px solid #e5e7eb;color:#74787d;font-size:11px;line-height:1.6;">This is an automatic confirmation that we received your message. Please reply to this email if you’d like to add anything.</td></tr>
    </table>
  </body>
</html>`,
      });
    } catch (error) {
      const code = error && typeof error === "object" && "code" in error &&
        typeof error.code === "string" ? error.code : "unknown";
      console.error(`Contact message was delivered, but the sender auto-reply failed (code: ${code}).`);
      autoReplySent = false;
    }

    return NextResponse.json({ ok: true, autoReplySent });
  } catch (error) {
    const code = error && typeof error === "object" && "code" in error &&
      typeof error.code === "string" ? error.code : "unknown";
    console.error(`A contact form message could not be delivered through Gmail SMTP (code: ${code}).`);
    return NextResponse.json(
      { error: "We could not send your message right now. Please try again or email us directly." },
      { status: 502 },
    );
  }
}
