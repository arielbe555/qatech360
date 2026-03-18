import nodemailer from "nodemailer";

const GMAIL_USER = process.env.GMAIL_USER ?? "qatech360@gmail.com";
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD ?? "";

// Lazy-init transporter (avoids crash at build time)
let _transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!_transporter) {
    if (!GMAIL_APP_PASSWORD) {
      throw new Error("GMAIL_APP_PASSWORD is not configured");
    }
    _transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD,
      },
    });
  }
  return _transporter;
}

interface SendMailOptions {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendMail({ to, subject, html, replyTo }: SendMailOptions) {
  const transporter = getTransporter();
  const toArray = Array.isArray(to) ? to : [to];

  const info = await transporter.sendMail({
    from: `"qatech360" <${GMAIL_USER}>`,
    to: toArray.join(", "),
    subject,
    html,
    replyTo: replyTo ?? undefined,
  });

  console.log(`[mailer] sent to ${toArray.join(", ")} — messageId: ${info.messageId}`);
  return info;
}

export function isMailerConfigured(): boolean {
  return !!process.env.GMAIL_APP_PASSWORD;
}

export { GMAIL_USER };
