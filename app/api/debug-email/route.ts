import { NextResponse } from "next/server";
import { Resend } from "resend";

// ⚠️ DEBUG ENDPOINT — Remove before production!
// Tests Resend API key and sends a simple test email

export async function GET() {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "qatech360 <soc@qatech.ar>";
  const teamEmail = process.env.RESEND_CONTACT_TO ?? "qatech360@gmail.com";

  const diagnostics: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    hasApiKey: !!apiKey,
    apiKeyPrefix: apiKey ? apiKey.substring(0, 8) + "..." : "NOT SET",
    fromEmail,
    teamEmail,
    resendContactTo: process.env.RESEND_CONTACT_TO ?? "NOT SET (using default)",
    resendDemoTo: process.env.RESEND_DEMO_TO ?? "NOT SET (using default)",
    resendFromEmail: process.env.RESEND_FROM_EMAIL ?? "NOT SET (using default)",
  };

  if (!apiKey) {
    return NextResponse.json({
      success: false,
      error: "RESEND_API_KEY is not configured",
      diagnostics,
    });
  }

  try {
    const resend = new Resend(apiKey);

    // Try sending a simple test email to the team
    const result = await resend.emails.send({
      from: fromEmail,
      to: [teamEmail],
      subject: "[DEBUG] Test email from qatech360 — " + new Date().toISOString(),
      html: `<h1>Test Email</h1><p>This is a debug test from the qatech360 API.</p><p>Timestamp: ${new Date().toISOString()}</p><p>From: ${fromEmail}</p><p>To: ${teamEmail}</p>`,
    });

    diagnostics.resendResponse = result;
    diagnostics.hasError = !!result.error;
    diagnostics.emailId = result.data?.id ?? null;

    if (result.error) {
      return NextResponse.json({
        success: false,
        error: `Resend API error: ${result.error.message}`,
        diagnostics,
      });
    }

    return NextResponse.json({
      success: true,
      message: `Test email sent to ${teamEmail}. Check inbox (and spam).`,
      emailId: result.data?.id,
      diagnostics,
    });
  } catch (err) {
    diagnostics.exception = err instanceof Error ? err.message : String(err);
    return NextResponse.json({
      success: false,
      error: "Exception thrown during email send",
      diagnostics,
    });
  }
}
