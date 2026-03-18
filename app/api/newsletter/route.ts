import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "qatech360 <noreply@qatech360.com>";
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
    const { email, honeypot } = body;

    if (honeypot) return NextResponse.json({ success: true });

    // ── Input length limit ──
    if (email && email.length > 254) {
      return NextResponse.json({ success: false, error: "Email inválido." }, { status: 400 });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, error: "Email inválido." }, { status: 400 });
    }

    await getResend().emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: "¡Bienvenido al newsletter de qatech360! 🛡️",
      html: `<!DOCTYPE html><html><body style="background:#0A0A0A;font-family:sans-serif;padding:40px 16px;text-align:center;">
        <div style="max-width:480px;margin:0 auto;background:#111827;border-radius:12px;padding:32px;border:1px solid #1F2937;">
          <p style="font-size:28px;margin:0 0 8px;">🛡️</p>
          <h1 style="color:#FFFFFF;font-size:20px;margin:0 0 12px;">¡Ya eres parte de qatech360!</h1>
          <p style="color:#9CA3AF;font-size:14px;line-height:1.6;margin:0 0 24px;">
            Recibirás las últimas amenazas para LATAM, guías de cumplimiento y noticias de la plataforma.
          </p>
          <a href="https://qatech360.com" style="display:inline-block;background:#0070F3;color:#FFFFFF;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;">Visitar qatech360.com</a>
          <p style="color:#4B5563;font-size:11px;margin:24px 0 0;">Si no solicitaste esta suscripción, ignora este email.</p>
        </div>
      </body></html>`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[newsletter] error:", err);
    return NextResponse.json({ success: false, error: "Error interno." }, { status: 500 });
  }
}
