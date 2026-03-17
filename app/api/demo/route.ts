import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { demoConfirmationEmail, demoNotificationEmail } from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);
const TEAM_EMAIL = process.env.RESEND_DEMO_TO ?? "demos@qatech360.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "qatech360 <noreply@qatech360.com>";

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
    const { name, email, company, role, country, endpoints, message, honeypot } = body;

    // ── Anti-bot honeypot ──
    if (honeypot) {
      return NextResponse.json({ success: true });
    }

    // ── Input length limits ──
    if (name && name.length > 200) {
      return NextResponse.json({ success: false, error: "Nombre inválido." }, { status: 400 });
    }
    if (company && company.length > 200) {
      return NextResponse.json({ success: false, error: "Nombre de empresa inválido." }, { status: 400 });
    }
    if (message && message.length > 5000) {
      return NextResponse.json({ success: false, error: "Mensaje demasiado largo." }, { status: 400 });
    }
    if (role && role.length > 200) {
      return NextResponse.json({ success: false, error: "Cargo inválido." }, { status: 400 });
    }

    // ── Validation ──
    if (!name || !email || !company) {
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
      resend.emails.send({
        from: FROM_EMAIL,
        to: [email],
        subject: "¡Tu demo está confirmada! — qatech360",
        html: demoConfirmationEmail(name, company),
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: [TEAM_EMAIL],
        replyTo: email,
        subject: `[Demo] ${company} — ${name} (${country ?? "—"})`,
        html: demoNotificationEmail({
          name,
          email,
          company,
          role: role ?? "—",
          country: country ?? "—",
          endpoints: endpoints ?? "—",
          message,
        }),
      }),
    ]);

    if (confirmResult.status === "rejected") {
      console.error("[demo] confirmation error:", confirmResult.reason);
    }
    if (notifyResult.status === "rejected") {
      console.error("[demo] notification error:", notifyResult.reason);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[demo] unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "Error interno. Por favor intenta de nuevo." },
      { status: 500 }
    );
  }
}
