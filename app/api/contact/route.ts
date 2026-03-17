import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactConfirmationEmail, contactNotificationEmail } from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);
const TEAM_EMAIL = process.env.RESEND_CONTACT_TO ?? "hola@qatech360.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "qatech360 <noreply@qatech360.com>";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, country, subject, message, honeypot } = body;

    // ── Anti-bot: honeypot field must be empty ──
    if (honeypot) {
      // Silently accept but don't process (bot trap)
      return NextResponse.json({ success: true });
    }

    // ── Validation ──
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Faltan campos obligatorios." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Email inválido." },
        { status: 400 }
      );
    }

    // ── Send emails in parallel ──
    const [confirmResult, notifyResult] = await Promise.allSettled([
      // 1. Confirmation to the user
      resend.emails.send({
        from: FROM_EMAIL,
        to: [email],
        subject: "Recibimos tu consulta — qatech360",
        html: contactConfirmationEmail(name),
      }),
      // 2. Internal notification to the team
      resend.emails.send({
        from: FROM_EMAIL,
        to: [TEAM_EMAIL],
        replyTo: email,
        subject: `[Contacto] ${subject ?? "Nueva consulta"} — ${company ?? "Sin empresa"}`,
        html: contactNotificationEmail({
          name,
          email,
          company: company ?? "—",
          country: country ?? "—",
          subject: subject ?? "Sin asunto",
          message,
        }),
      }),
    ]);

    // Log any errors server-side (don't expose to client)
    if (confirmResult.status === "rejected") {
      console.error("[contact] confirmation email error:", confirmResult.reason);
    }
    if (notifyResult.status === "rejected") {
      console.error("[contact] notification email error:", notifyResult.reason);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "Error interno. Por favor intenta de nuevo." },
      { status: 500 }
    );
  }
}
