// ================================================================
// qatech360 — Branded Email Templates
// ================================================================

const LOGO_URL = "https://qatech360.com/logo.svg";
const PRIMARY = "#0070F3";
const CYAN = "#00D4FF";
const BG_DARK = "#0A0A0A";
const BG_SURFACE = "#111827";
const BG_CARD = "#1F2937";
const TEXT_PRIMARY = "#FFFFFF";
const TEXT_SECONDARY = "#9CA3AF";
const ACCENT_GREEN = "#00FF88";

function baseLayout(content: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>qatech360</title>
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
</head>
<body style="margin:0;padding:0;background-color:${BG_DARK};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:${BG_DARK};min-height:100vh;">
    <tr><td align="center" style="padding:32px 16px;">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- HEADER -->
        <tr>
          <td style="background:linear-gradient(135deg,#0050D0 0%,#0070F3 50%,#00D4FF 100%);border-radius:16px 16px 0 0;padding:28px 32px;text-align:center;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center">
                  <img src="${LOGO_URL}" alt="qatech360 logo" width="48" height="48" style="display:inline-block;vertical-align:middle;margin-right:12px;"/>
                  <span style="display:inline-block;vertical-align:middle;font-size:26px;font-weight:900;color:#FFFFFF;letter-spacing:-0.5px;">
                    qatech<span style="color:#00D4FF;">360</span>
                  </span>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding-top:6px;">
                  <span style="font-size:12px;color:rgba(255,255,255,0.75);letter-spacing:2px;text-transform:uppercase;font-weight:600;">Ciberseguridad para LATAM</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- BODY -->
        <tr>
          <td style="background-color:${BG_SURFACE};padding:40px 32px;">
            ${content}
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="background-color:${BG_CARD};border-radius:0 0 16px 16px;padding:24px 32px;text-align:center;border-top:1px solid #374151;">
            <p style="margin:0 0 8px;font-size:13px;color:${TEXT_SECONDARY};">
              Protegiendo empresas en México · Colombia · Brasil · Argentina · Chile · Perú
            </p>
            <p style="margin:0 0 12px;font-size:12px;color:#4B5563;">
              <a href="https://qatech360.com" style="color:${PRIMARY};text-decoration:none;">qatech360.com</a>
              &nbsp;·&nbsp;
              <a href="mailto:hola@qatech360.com" style="color:${PRIMARY};text-decoration:none;">hola@qatech360.com</a>
              &nbsp;·&nbsp;
              <a href="https://qatech360.com/legal/privacy" style="color:#4B5563;text-decoration:none;">Privacidad</a>
            </p>
            <p style="margin:0;font-size:11px;color:#374151;">
              © ${new Date().getFullYear()} qatech360. Todos los derechos reservados.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ──────────────────────────────────────────────
// CONTACT: confirmation to the user
// ──────────────────────────────────────────────
export function contactConfirmationEmail(name: string): string {
  const content = `
    <h1 style="margin:0 0 8px;font-size:24px;font-weight:800;color:${TEXT_PRIMARY};">
      ¡Hola, ${name}! 👋
    </h1>
    <p style="margin:0 0 24px;font-size:16px;color:${TEXT_SECONDARY};line-height:1.6;">
      Recibimos tu mensaje y nos pondremos en contacto contigo <strong style="color:${TEXT_PRIMARY};">en menos de 2 horas hábiles</strong>.
    </p>

    <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#0070F310 0%,#00D4FF10 100%);border:1px solid #1D4ED8;border-radius:12px;margin-bottom:28px;">
      <tr><td style="padding:20px 24px;">
        <p style="margin:0 0 4px;font-size:12px;color:${TEXT_SECONDARY};text-transform:uppercase;letter-spacing:1px;font-weight:600;">Mientras esperas, explora</p>
        <p style="margin:0;font-size:15px;color:${TEXT_PRIMARY};font-weight:600;">Inicia tu prueba gratuita de 14 días — sin tarjeta de crédito</p>
      </td></tr>
    </table>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      <tr>
        <td style="padding:12px;background:${BG_CARD};border-radius:8px;border-left:3px solid ${ACCENT_GREEN};">
          <p style="margin:0;font-size:13px;color:${ACCENT_GREEN};font-weight:700;">✔ SOC 24/7/365 en tu zona horaria</p>
        </td>
      </tr>
      <tr><td style="height:8px;"></td></tr>
      <tr>
        <td style="padding:12px;background:${BG_CARD};border-radius:8px;border-left:3px solid ${ACCENT_GREEN};">
          <p style="margin:0;font-size:13px;color:${ACCENT_GREEN};font-weight:700;">✔ Onboarding en 15 minutos</p>
        </td>
      </tr>
      <tr><td style="height:8px;"></td></tr>
      <tr>
        <td style="padding:12px;background:${BG_CARD};border-radius:8px;border-left:3px solid ${ACCENT_GREEN};">
          <p style="margin:0;font-size:13px;color:${ACCENT_GREEN};font-weight:700;">✔ Soporte completo en español</p>
        </td>
      </tr>
    </table>

    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <a href="https://qatech360.com/trial" style="display:inline-block;background:linear-gradient(135deg,${PRIMARY} 0%,${CYAN} 100%);color:#FFFFFF;font-weight:700;font-size:15px;padding:14px 32px;border-radius:8px;text-decoration:none;letter-spacing:0.3px;">
            Iniciar Prueba Gratuita →
          </a>
        </td>
      </tr>
    </table>

    <hr style="border:none;border-top:1px solid #1F2937;margin:32px 0;"/>
    <p style="margin:0;font-size:13px;color:${TEXT_SECONDARY};line-height:1.6;">
      Si tienes una consulta urgente, escríbenos directamente a
      <a href="mailto:hola@qatech360.com" style="color:${PRIMARY};text-decoration:none;">hola@qatech360.com</a>
      o visita <a href="https://qatech360.com/contact" style="color:${PRIMARY};text-decoration:none;">qatech360.com/contact</a>.
    </p>
  `;
  return baseLayout(content);
}

// ──────────────────────────────────────────────
// CONTACT: internal notification to the team
// ──────────────────────────────────────────────
export function contactNotificationEmail(data: {
  name: string;
  email: string;
  company: string;
  country: string;
  subject: string;
  message: string;
}): string {
  const content = `
    <h1 style="margin:0 0 4px;font-size:20px;font-weight:800;color:${TEXT_PRIMARY};">
      🔔 Nueva consulta recibida
    </h1>
    <p style="margin:0 0 24px;font-size:14px;color:${TEXT_SECONDARY};">${new Date().toLocaleString("es-MX", { timeZone: "America/Mexico_City" })} (GMT-6)</p>

    <table width="100%" cellpadding="0" cellspacing="0" style="background:${BG_CARD};border-radius:12px;overflow:hidden;margin-bottom:24px;">
      ${[
        ["Nombre", data.name],
        ["Email", `<a href="mailto:${data.email}" style="color:${PRIMARY};">${data.email}</a>`],
        ["Empresa", data.company],
        ["País", data.country],
        ["Asunto", data.subject],
      ].map(([label, value], i) => `
        <tr style="background:${i % 2 === 0 ? BG_CARD : "#161D2A"};">
          <td style="padding:12px 16px;font-size:12px;color:${TEXT_SECONDARY};font-weight:600;text-transform:uppercase;letter-spacing:1px;width:100px;">${label}</td>
          <td style="padding:12px 16px;font-size:14px;color:${TEXT_PRIMARY};font-weight:500;">${value}</td>
        </tr>
      `).join("")}
    </table>

    <table width="100%" cellpadding="0" cellspacing="0" style="background:${BG_CARD};border-radius:12px;margin-bottom:24px;">
      <tr>
        <td style="padding:16px;font-size:12px;color:${TEXT_SECONDARY};font-weight:600;text-transform:uppercase;letter-spacing:1px;">Mensaje</td>
      </tr>
      <tr>
        <td style="padding:0 16px 16px;font-size:14px;color:${TEXT_PRIMARY};line-height:1.7;white-space:pre-wrap;">${data.message}</td>
      </tr>
    </table>

    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <a href="mailto:${data.email}?subject=Re: ${encodeURIComponent(data.subject)}" style="display:inline-block;background:${PRIMARY};color:#FFFFFF;font-weight:700;font-size:14px;padding:12px 28px;border-radius:8px;text-decoration:none;">
            Responder a ${data.name}
          </a>
        </td>
      </tr>
    </table>
  `;
  return baseLayout(content);
}

// ──────────────────────────────────────────────
// DEMO: confirmation to the user
// ──────────────────────────────────────────────
export function demoConfirmationEmail(name: string, company: string): string {
  const content = `
    <h1 style="margin:0 0 8px;font-size:24px;font-weight:800;color:${TEXT_PRIMARY};">
      ¡Demo solicitada, ${name}! 🚀
    </h1>
    <p style="margin:0 0 24px;font-size:16px;color:${TEXT_SECONDARY};line-height:1.6;">
      Recibimos tu solicitud para <strong style="color:${TEXT_PRIMARY};">${company}</strong>.
      Nuestro equipo te contactará en <strong style="color:${CYAN};">menos de 2 horas hábiles</strong> para coordinar la sesión.
    </p>

    <table width="100%" cellpadding="0" cellspacing="0" style="background:${BG_CARD};border-radius:12px;margin-bottom:28px;">
      <tr>
        <td style="padding:20px 24px;border-bottom:1px solid #1F2937;">
          <p style="margin:0 0 4px;font-size:11px;color:${TEXT_SECONDARY};text-transform:uppercase;letter-spacing:1px;">¿Qué verás en la demo?</p>
        </td>
      </tr>
      ${[
        "Dashboard en vivo con amenazas reales",
        "SIEM + EDR + XDR funcionando juntos",
        "Alertas MITRE ATT&CK en tiempo real",
        "Generación de informe de cumplimiento",
        "Onboarding: agente instalado en 15 min",
      ].map((item, i) => `
        <tr style="background:${i % 2 === 0 ? BG_CARD : "#161D2A"};">
          <td style="padding:12px 16px;font-size:14px;color:${TEXT_PRIMARY};">
            <span style="color:${ACCENT_GREEN};font-weight:700;margin-right:8px;">✔</span>${item}
          </td>
        </tr>
      `).join("")}
    </table>

    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <a href="https://qatech360.com/trial" style="display:inline-block;background:linear-gradient(135deg,${PRIMARY} 0%,${CYAN} 100%);color:#FFFFFF;font-weight:700;font-size:15px;padding:14px 32px;border-radius:8px;text-decoration:none;">
            Mientras tanto — prueba 14 días gratis →
          </a>
        </td>
      </tr>
    </table>

    <hr style="border:none;border-top:1px solid #1F2937;margin:32px 0;"/>
    <p style="margin:0;font-size:13px;color:${TEXT_SECONDARY};line-height:1.6;">
      ¿Tienes preguntas antes de la demo? Escríbenos a
      <a href="mailto:demos@qatech360.com" style="color:${PRIMARY};text-decoration:none;">demos@qatech360.com</a>
    </p>
  `;
  return baseLayout(content);
}

// ──────────────────────────────────────────────
// DEMO: internal notification
// ──────────────────────────────────────────────
export function demoNotificationEmail(data: {
  name: string;
  email: string;
  company: string;
  role: string;
  country: string;
  endpoints: string;
  message?: string;
}): string {
  const content = `
    <h1 style="margin:0 0 4px;font-size:20px;font-weight:800;color:${TEXT_PRIMARY};">
      🎯 Nueva solicitud de demo
    </h1>
    <p style="margin:0 0 24px;font-size:14px;color:${TEXT_SECONDARY};">${new Date().toLocaleString("es-MX", { timeZone: "America/Mexico_City" })}</p>

    <table width="100%" cellpadding="0" cellspacing="0" style="background:${BG_CARD};border-radius:12px;overflow:hidden;margin-bottom:24px;">
      ${[
        ["Nombre", data.name],
        ["Email", `<a href="mailto:${data.email}" style="color:${PRIMARY};">${data.email}</a>`],
        ["Empresa", data.company],
        ["Cargo", data.role],
        ["País", data.country],
        ["Endpoints", data.endpoints],
      ].map(([label, value], i) => `
        <tr style="background:${i % 2 === 0 ? BG_CARD : "#161D2A"};">
          <td style="padding:12px 16px;font-size:12px;color:${TEXT_SECONDARY};font-weight:600;text-transform:uppercase;letter-spacing:1px;width:110px;">${label}</td>
          <td style="padding:12px 16px;font-size:14px;color:${TEXT_PRIMARY};font-weight:500;">${value}</td>
        </tr>
      `).join("")}
      ${data.message ? `
        <tr>
          <td style="padding:12px 16px;font-size:12px;color:${TEXT_SECONDARY};font-weight:600;text-transform:uppercase;letter-spacing:1px;">Nota</td>
          <td style="padding:12px 16px;font-size:14px;color:${TEXT_PRIMARY};">${data.message}</td>
        </tr>
      ` : ""}
    </table>

    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <a href="mailto:${data.email}?subject=Demo qatech360 - ${encodeURIComponent(data.company)}" style="display:inline-block;background:${PRIMARY};color:#FFFFFF;font-weight:700;font-size:14px;padding:12px 28px;border-radius:8px;text-decoration:none;">
            Coordinar demo con ${data.name}
          </a>
        </td>
      </tr>
    </table>
  `;
  return baseLayout(content);
}

// ──────────────────────────────────────────────
// TRIAL: confirmation to the user
// ──────────────────────────────────────────────
export function trialConfirmationEmail(name: string): string {
  const content = `
    <h1 style="margin:0 0 8px;font-size:24px;font-weight:800;color:${TEXT_PRIMARY};">
      ¡Bienvenido a qatech360, ${name}! 🛡️
    </h1>
    <p style="margin:0 0 24px;font-size:16px;color:${TEXT_SECONDARY};line-height:1.6;">
      Tu prueba gratuita de <strong style="color:${CYAN};">14 días</strong> está lista.
      Nuestro equipo revisará tu solicitud y activará tu cuenta en los próximos 30 minutos.
    </p>

    <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#0070F315 0%,#00D4FF10 100%);border:1px solid #1D4ED8;border-radius:12px;margin-bottom:28px;">
      <tr><td style="padding:20px 24px;text-align:center;">
        <p style="margin:0 0 4px;font-size:28px;font-weight:900;color:${TEXT_PRIMARY};">14 días</p>
        <p style="margin:0;font-size:13px;color:${TEXT_SECONDARY};">Sin tarjeta de crédito · Cancela cuando quieras</p>
      </td></tr>
    </table>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      <tr><td style="font-size:14px;font-weight:700;color:${TEXT_PRIMARY};padding-bottom:12px;">Próximos pasos:</td></tr>
      ${[
        ["1", "Recibirás tus credenciales de acceso por email en ~30 min"],
        ["2", "Instala el agente en tu primer endpoint (guía en PDF adjunta)"],
        ["3", "Tu SOC LATAM comenzará a monitorear en tiempo real"],
        ["4", "Reunión de onboarding con tu ingeniero asignado (opcional)"],
      ].map(([num, step]) => `
        <tr>
          <td style="padding:0 0 10px;">
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="width:32px;height:32px;background:${PRIMARY};border-radius:50%;text-align:center;vertical-align:middle;font-size:14px;font-weight:800;color:#FFFFFF;">${num}</td>
                <td style="padding-left:12px;font-size:14px;color:${TEXT_PRIMARY};">${step}</td>
              </tr>
            </table>
          </td>
        </tr>
      `).join("")}
    </table>

    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <a href="https://app.qatech360.com" style="display:inline-block;background:linear-gradient(135deg,${PRIMARY} 0%,${CYAN} 100%);color:#FFFFFF;font-weight:700;font-size:15px;padding:14px 32px;border-radius:8px;text-decoration:none;">
            Ir al Panel de Control →
          </a>
        </td>
      </tr>
    </table>
  `;
  return baseLayout(content);
}
