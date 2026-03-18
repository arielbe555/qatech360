import { NextResponse } from "next/server";
import { sendMail, isMailerConfigured, GMAIL_USER } from "@/lib/mailer";

// ⚠️ DEBUG ENDPOINT — Remove before production!

export async function GET() {
  const diagnostics: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    gmailUser: GMAIL_USER,
    hasAppPassword: isMailerConfigured(),
    appPasswordLength: process.env.GMAIL_APP_PASSWORD?.length ?? 0,
  };

  if (!isMailerConfigured()) {
    return NextResponse.json({
      success: false,
      error: "GMAIL_APP_PASSWORD is not configured in environment variables",
      diagnostics,
    });
  }

  try {
    const info = await sendMail({
      to: GMAIL_USER,
      subject: "[DEBUG] Test email from qatech360 — " + new Date().toISOString(),
      html: `<h1>✅ Test Email Funciona!</h1>
        <p>Este es un email de prueba del sistema qatech360.</p>
        <p>Timestamp: ${new Date().toISOString()}</p>
        <p>From: ${GMAIL_USER}</p>`,
    });

    diagnostics.messageId = info.messageId;
    diagnostics.response = info.response;

    return NextResponse.json({
      success: true,
      message: `Test email sent to ${GMAIL_USER}. Revisá tu inbox.`,
      diagnostics,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    diagnostics.error = msg;
    return NextResponse.json({
      success: false,
      error: msg,
      diagnostics,
    });
  }
}
