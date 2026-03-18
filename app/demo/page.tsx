"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

// ================================================================
// TYPES
// ================================================================
interface DemoFormState {
  nombre: string;
  apellido: string;
  email: string;
  empresa: string;
  cargo: string;
  pais: string;
  endpoints: string;
  mensaje: string;
}

// ================================================================
// CONSTANTS
// ================================================================
const COUNTRIES = [
  "México",
  "Colombia",
  "Brasil",
  "Argentina",
  "Chile",
  "Perú",
  "Costa Rica",
  "Ecuador",
  "Uruguay",
  "Panamá",
  "República Dominicana",
  "Otro",
];

const ENDPOINT_RANGES = ["Menos de 25", "25 – 100", "100 – 500", "500+"];

const DEMO_BENEFITS = [
  "Dashboard en vivo con alertas reales de seguridad",
  "Configuración y personalización de reglas de detección",
  "Informes de cumplimiento (PCI-DSS, HIPAA, NOM-151)",
  "Proceso de integración del agente en 15 minutos",
  "SOC LATAM en acción: flujo completo de respuesta a incidentes",
  "Preguntas y respuestas con un especialista de seguridad",
];

const TESTIMONIALS = [
  {
    quote:
      "En 30 minutos entendí exactamente por qué mis alertas de SIEM eran tan difíciles de gestionar. La demo fue reveladora.",
    author: "Carlos Ramírez",
    role: "CTO",
    company: "Fintech MX",
    initials: "CR",
    color: "#0070F3",
  },
  {
    quote:
      "El equipo nos mostró cómo cumplir con PCI-DSS en menos de una semana. No podía creer lo sencillo que era.",
    author: "Ana Lucía Herrera",
    role: "CISO",
    company: "Banco Digital CO",
    initials: "AH",
    color: "#00D4FF",
  },
  {
    quote:
      "Me impresionó que todo estuviera en español y que el analista conociera las regulaciones brasileñas. Cerramos en esa misma semana.",
    author: "Rafael Santos",
    role: "IT Manager",
    company: "E-Commerce BR",
    initials: "RS",
    color: "#00FF88",
  },
];

const FAQS = [
  {
    q: "¿Cuánto dura la demo?",
    a: "La demo dura aproximadamente 30 minutos. Comenzamos con un recorrido rápido de la plataforma y luego nos enfocamos en los casos de uso específicos de tu empresa.",
  },
  {
    q: "¿Necesito instalar algo antes de la demo?",
    a: "No. La demo se realiza sobre nuestro entorno de demostración. Solo necesitas un navegador y 30 minutos de tu tiempo.",
  },
  {
    q: "¿Es completamente gratuita?",
    a: "Sí, la demo es 100% gratuita y sin compromiso. Nuestro objetivo es que conozcas la plataforma antes de tomar cualquier decisión.",
  },
  {
    q: "¿Puedo invitar a mi equipo técnico?",
    a: "Por supuesto. Te recomendamos incluir a tu CTO, CISO o responsable de IT. Envíanos los correos al momento de agendar y los incluiremos en la invitación.",
  },
];

const EMPTY_FORM: DemoFormState = {
  nombre: "",
  apellido: "",
  email: "",
  empresa: "",
  cargo: "",
  pais: "",
  endpoints: "",
  mensaje: "",
};

// ================================================================
// PAGE COMPONENT
// ================================================================
export default function DemoPage() {
  const [form, setForm] = useState<DemoFormState>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const formRef = useRef(null);
  const formInView = useInView(formRef, { once: true });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.nombre} ${form.apellido}`.trim(),
          email: form.email,
          company: form.empresa,
          role: form.cargo,
          country: form.pais,
          endpoints: form.endpoints,
          message: form.mensaje,
          honeypot: "",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setForm(EMPTY_FORM);
      } else {
        setErrorMsg(data.error ?? "Ocurrió un error. Intentá de nuevo.");
      }
    } catch {
      setErrorMsg("Error de conexión. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <NavBar />

      {/* ── HERO + FORM ───────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0070F3]/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: copy */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0070F3]/40 bg-[#0070F3]/10 text-[#00D4FF] text-sm font-medium mb-6">
                Demo gratuita · Sin compromiso
              </span>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Solicita una{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(90deg,#00D4FF,#0070F3)",
                  }}
                >
                  Demo
                </span>
              </h1>
              <p className="text-xl text-[#A0A0A0] mb-10 leading-relaxed">
                Ve la plataforma en acción. 30 minutos. Sin compromiso. En español.
              </p>

              {/* Benefits */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-[#666] uppercase tracking-wider mb-4">
                  ¿Qué verás en la demo?
                </h3>
                {DEMO_BENEFITS.map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <svg
                      className="flex-shrink-0 mt-0.5"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <circle cx="10" cy="10" r="9" stroke="#00FF88" strokeWidth="1.5" />
                      <path
                        d="M6 10l3 3 5-5"
                        stroke="#00FF88"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-[#A0A0A0] text-sm">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: form */}
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, y: 30 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-8"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/40 flex items-center justify-center mx-auto mb-6">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <path
                        d="M10 20l8 8 12-16"
                        stroke="#00FF88"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">¡Solicitud recibida!</h3>
                  <p className="text-[#A0A0A0] leading-relaxed">
                    Te contactaremos en menos de{" "}
                    <span className="text-[#00FF88] font-semibold">2 horas hábiles</span> para agendar tu demo personalizada.
                  </p>
                  <p className="text-[#666] text-sm mt-4">Revisa tu bandeja de entrada — te enviaremos una confirmación a {form.email}</p>
                </motion.div>
              ) : (
                <>
                  <h2 className="text-xl font-bold mb-6">Solicitar Demo Gratis</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-[#A0A0A0] mb-1.5">Nombre *</label>
                        <input
                          type="text"
                          name="nombre"
                          required
                          value={form.nombre}
                          onChange={handleChange}
                          className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#0070F3] transition-colors"
                          placeholder="Juan"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-[#A0A0A0] mb-1.5">Apellido *</label>
                        <input
                          type="text"
                          name="apellido"
                          required
                          value={form.apellido}
                          onChange={handleChange}
                          className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#0070F3] transition-colors"
                          placeholder="García"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-[#A0A0A0] mb-1.5">Email empresarial *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#0070F3] transition-colors"
                        placeholder="juan@tuempresa.com"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-[#A0A0A0] mb-1.5">Empresa *</label>
                        <input
                          type="text"
                          name="empresa"
                          required
                          value={form.empresa}
                          onChange={handleChange}
                          className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#0070F3] transition-colors"
                          placeholder="Mi Empresa S.A."
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-[#A0A0A0] mb-1.5">Cargo *</label>
                        <input
                          type="text"
                          name="cargo"
                          required
                          value={form.cargo}
                          onChange={handleChange}
                          className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#0070F3] transition-colors"
                          placeholder="CTO / IT Manager"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-[#A0A0A0] mb-1.5">País *</label>
                        <select
                          name="pais"
                          required
                          value={form.pais}
                          onChange={handleChange}
                          className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#0070F3] transition-colors"
                        >
                          <option value="">Selecciona...</option>
                          {COUNTRIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-[#A0A0A0] mb-1.5">Nº de endpoints *</label>
                        <select
                          name="endpoints"
                          required
                          value={form.endpoints}
                          onChange={handleChange}
                          className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#0070F3] transition-colors"
                        >
                          <option value="">Selecciona...</option>
                          {ENDPOINT_RANGES.map((r) => (
                            <option key={r} value={r}>{r}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-[#A0A0A0] mb-1.5">Mensaje (opcional)</label>
                      <textarea
                        name="mensaje"
                        value={form.mensaje}
                        onChange={handleChange}
                        rows={3}
                        className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#0070F3] transition-colors resize-none"
                        placeholder="¿Hay algo específico que te gustaría ver en la demo?"
                      />
                    </div>

                    {errorMsg && (
                      <p className="text-[#FF3B3B] text-sm text-center bg-[#FF3B3B]/10 border border-[#FF3B3B]/20 rounded-lg px-4 py-2">
                        {errorMsg}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 bg-[#0070F3] hover:bg-[#0050D0] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(0,112,243,0.3)]"
                    >
                      {loading ? "Enviando..." : "Solicitar Demo Gratis →"}
                    </button>

                    <p className="text-center text-[#666] text-xs">
                      Al enviar este formulario aceptas nuestra{" "}
                      <Link href="/legal/privacy" className="text-[#0070F3] hover:underline">
                        Política de Privacidad
                      </Link>
                    </p>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-3">Lo que dicen quienes ya vieron la demo</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-6 hover:border-[#0070F3]/40 transition-all duration-300"
              >
                <p className="text-[#A0A0A0] text-sm leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ background: t.color + "22", color: t.color, border: `1px solid ${t.color}44` }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t.author}</p>
                    <p className="text-[#666] text-xs">
                      {t.role} · {t.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-3">Preguntas frecuentes</h2>
          </motion.div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-[#111111] border border-[#2A2A2A] rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-[#1A1A1A] transition-colors"
                >
                  <span className="font-medium text-sm">{faq.q}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="flex-shrink-0 ml-4 transition-transform duration-200"
                    style={{ transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)" }}
                  >
                    <path d="M3 6l5 5 5-5" stroke="#A0A0A0" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-[#A0A0A0] text-sm leading-relaxed border-t border-[#2A2A2A] pt-4">
                    {faq.a}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ALTERNATIVE CTAs ──────────────────────────────────── */}
      <section className="py-16 px-6 bg-[#0D0D0D] border-t border-[#2A2A2A]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl font-bold mb-2">¿Prefieres otro formato?</h2>
            <p className="text-[#A0A0A0] text-sm">Tenemos opciones para cada ritmo.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-6 text-center hover:border-[#0070F3]/40 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-[#0070F3]/10 border border-[#0070F3]/30 flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <polygon points="5,3 19,12 5,21" fill="#0070F3" />
                </svg>
              </div>
              <h3 className="font-bold mb-2">Prefiero ver un video</h3>
              <p className="text-[#A0A0A0] text-sm mb-4">Recorrido de 10 minutos de la plataforma a tu ritmo.</p>
              <Link
                href="/webinars"
                className="inline-block px-6 py-2.5 border border-[#0070F3] text-[#0070F3] hover:bg-[#0070F3]/10 rounded-lg text-sm font-medium transition-all duration-200"
              >
                Ver grabación →
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-6 text-center hover:border-[#00FF88]/40 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/30 flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="#00FF88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="font-bold mb-2">Quiero empezar directo</h3>
              <p className="text-[#A0A0A0] text-sm mb-4">Prueba gratuita de 14 días. Sin tarjeta de crédito.</p>
              <Link
                href="/trial"
                className="inline-block px-6 py-2.5 bg-[#00FF88] hover:bg-[#00D4FF] text-[#0A0A0A] rounded-lg text-sm font-bold transition-all duration-200"
              >
                Iniciar prueba gratis →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
