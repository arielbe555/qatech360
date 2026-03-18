import { NextRequest, NextResponse } from "next/server";
import { sendMail, isMailerConfigured, GMAIL_USER } from "@/lib/mailer";
import { contactConfirmationEmail, contactNotificationEmail } from "@/lib/email-templates";

const TEAM_EMAIL = process.env.GMAIL_USER ?? "qatech360@gmail.com";

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

    // ── Anti-bot: honeypot ──
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

    // ── Check config ──
    if (!isMailerConfigured()) {
      console.error("[contact] GMAIL_APP_PASSWORD not set!");
      return NextResponse.json(
        { success: false, error: "Error de configuración del servidor." },
        { status: 500 }
      );
    }

    // ── 1. Confirmation email to user ──
    await sendMail({
      to: email,
      subject: "Recibimos tu consulta — qatech360",
      html: contactConfirmationEmail(name),
    });

    // ── 2. Notification to team ──
    await sendMail({
      to: TEAM_EMAIL,
      subject: `[Contacto] ${subject ?? "Nueva consulta"} — ${company ?? "Sin empresa"}`,
      html: contactNotificationEmail({
        name,
        email,
        company: company ?? "—",
        country: country ?? "—",
        subject: subject ?? "Sin asunto",
        message,
      }),
      replyTo: email,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[contact] error:", msg);
    return NextResponse.json(
      { success: false, error: "No se pudo enviar el mensaje. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
