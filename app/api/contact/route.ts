import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactConfirmationEmail, contactNotificationEmail } from "@/lib/email-templates";

const TEAM_EMAIL = process.env.RESEND_CONTACT_TO ?? "qatech360@gmail.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "qatech360 <soc@qatech.ar>";
const getResend = () => new Resend(process.env.RESEND_API_KEY);

// ── Rate limiting ──
const rateMap = new Map<string, { count: number; reset: number }>();
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + 60_000 });
    return true;
  }
  if (entry.count >= 5) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: "Demasiadas solicitudes. Intenta en 1 minuto." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, company, country, subject, message, honeypot } = body;

    // ── Anti-bot: honeypot field must be empty ──
    if (honeypot) {
      return NextResponse.json({ success: true });
    }

    // ── Input length limits ──
    if (name && name.length > 200) {
      return NextResponse.json({ success: false, error: "Nombre inválido." }, { status: 400 });
    }
    if (message && message.length > 5000) {
      return NextResponse.json({ success: false, error: "Mensaje demasiado largo." }, { status: 400 });
    }
    if (subject && subject.length > 300) {
      return NextResponse.json({ success: false, error: "Asunto demasiado largo." }, { status: 400 });
    }
    if (company && company.length > 200) {
      return NextResponse.json({ success: false, error: "Nombre de empresa inválido." }, { status: 400 });
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

    // ── Check API key is configured ──
    if (!process.env.RESEND_API_KEY) {
      console.error("[contact] RESEND_API_KEY is not set!");
      return NextResponse.json(
        { success: false, error: "Error de configuración del servidor." },
        { status: 500 }
      );
    }

    const resend = getResend();
    const errors: string[] = [];

    // ── 1. Send confirmation email to user ──
    const confirmResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: "Recibimos tu consulta — qatech360",
      html: contactConfirmationEmail(name),
    });

    if (confirmResult.error) {
      console.error("[contact] confirmation email error:", JSON.stringify(confirmResult.error));
      errors.push(`confirm: ${confirmResult.error.message}`);
    } else {
      console.log("[contact] confirmation email sent:", confirmResult.data?.id);
    }

    // ── 2. Send notification email to team ──
    const notifyResult = await resend.emails.send({
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
    });

    if (notifyResult.error) {
      console.error("[contact] notification email error:", JSON.stringify(notifyResult.error));
      errors.push(`notify: ${notifyResult.error.message}`);
    } else {
      console.log("[contact] notification email sent:", notifyResult.data?.id);
    }

    // ── Return result based on actual email status ──
    if (errors.length === 2) {
      // Both emails failed
      return NextResponse.json(
        { success: false, error: "No se pudo enviar el mensaje. Intenta de nuevo.", debug: errors },
        { status: 500 }
      );
    }

    if (errors.length === 1) {
      // One email failed but the other succeeded — still report success to user
      console.warn("[contact] partial failure:", errors);
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
