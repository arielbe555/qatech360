"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

// ================================================================
// TYPES
// ================================================================
interface ContactFormState {
  nombre: string;
  email: string;
  empresa: string;
  pais: string;
  asunto: string;
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

const SUBJECTS = [
  "Solicitar una Demo",
  "Soporte Técnico",
  "Información de Ventas",
  "Alianzas Estratégicas",
  "Prensa / Medios",
  "Otro",
];

const CONTACT_CHANNELS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#0070F3" strokeWidth="1.5" />
        <polyline points="22,6 12,13 2,6" stroke="#0070F3" strokeWidth="1.5" />
      </svg>
    ),
    label: "Contacto General",
    value: "hola@qatech360.com",
    href: "mailto:hola@qatech360.com",
    color: "#0070F3",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#00D4FF" strokeWidth="1.5" />
        <polyline points="22,6 12,13 2,6" stroke="#00D4FF" strokeWidth="1.5" />
      </svg>
    ),
    label: "Solicitar Demo",
    value: "demos@qatech360.com",
    href: "mailto:demos@qatech360.com",
    color: "#00D4FF",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#00FF88" strokeWidth="1.5" />
        <path d="M12 8v4l3 3" stroke="#00FF88" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: "Soporte Técnico",
    value: "soporte@qatech360.com",
    href: "mailto:soporte@qatech360.com",
    color: "#00FF88",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" stroke="#0070F3" strokeWidth="1.5" />
        <rect x="2" y="9" width="4" height="12" stroke="#0070F3" strokeWidth="1.5" />
        <circle cx="4" cy="4" r="2" stroke="#0070F3" strokeWidth="1.5" />
      </svg>
    ),
    label: "LinkedIn",
    value: "linkedin.com/company/qatech360",
    href: "https://linkedin.com/company/qatech360",
    color: "#0070F3",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" stroke="#00D4FF" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    label: "Twitter / X",
    value: "@qatech360",
    href: "https://twitter.com/qatech360",
    color: "#00D4FF",
  },
];

const OFFICE_HOURS = [
  { flag: "🇲🇽", location: "México", tz: "GMT-6", hours: "Lun–Vie 9am–6pm CST" },
  { flag: "🇨🇴", location: "Colombia / Perú", tz: "GMT-5", hours: "Lun–Vie 9am–6pm COT" },
  { flag: "🇧🇷", location: "Brasil / Argentina", tz: "GMT-3", hours: "Lun–Vie 9am–6pm BRT" },
  { flag: "🇨🇱", location: "Chile", tz: "GMT-4", hours: "Lun–Vie 9am–6pm CLT" },
];

const FAQS = [
  {
    q: "¿Cuánto tardan en responder?",
    a: "En horario hábil respondemos en menos de 2 horas. Para incidentes de seguridad activos, nuestro SOC responde en menos de 15 minutos (P1) o 1 hora (P2) según el SLA contratado.",
  },
  {
    q: "¿Puedo hablar con una persona real?",
    a: "Sí. Asignamos un Customer Success Manager dedicado a cada cliente desde el día de onboarding. No hay chatbots ni respuestas automáticas para consultas de seguridad.",
  },
  {
    q: "¿Atienden en todos los países de LATAM?",
    a: "Tenemos cobertura completa en México, Colombia, Brasil, Argentina, Chile y Perú. También atendemos a clientes en Costa Rica, Ecuador, Uruguay, Panamá y República Dominicana.",
  },
  {
    q: "¿Tienen oficinas físicas?",
    a: "Operamos de forma remota, lo que nos permite tener talento en toda LATAM. Nuestro equipo principal está distribuido entre Buenos Aires, Ciudad de México y São Paulo.",
  },
];

const EMPTY_FORM: ContactFormState = {
  nombre: "",
  email: "",
  empresa: "",
  pais: "",
  asunto: "",
  mensaje: "",
};

// ================================================================
// PAGE COMPONENT
// ================================================================
export default function ContactPage() {
  const [form, setForm] = useState<ContactFormState>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const formRef = useRef(null);
  const formInView = useInView(formRef, { once: true });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <NavBar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-8 px-6 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-[#0070F3]/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00FF88]/40 bg-[#00FF88]/10 text-[#00FF88] text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
              SOC activo 24/7/365
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Contáctanos</h1>
            <p className="text-xl text-[#A0A0A0] max-w-2xl mx-auto leading-relaxed">
              Estamos en tu zona horaria. Respuesta garantizada en menos de{" "}
              <span className="text-white font-semibold">2 horas hábiles</span>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FORM + SIDE INFO ──────────────────────────────────── */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form — 3 cols */}
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, y: 30 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="lg:col-span-3 bg-[#111111] border border-[#2A2A2A] rounded-2xl p-8"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-center py-16"
                >
                  <div className="w-20 h-20 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/40 flex items-center justify-center mx-auto mb-6">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <path d="M10 20l8 8 12-16" stroke="#00FF88" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">¡Mensaje enviado!</h3>
                  <p className="text-[#A0A0A0] leading-relaxed">
                    Nos pondremos en contacto pronto. En horario hábil respondemos en menos de{" "}
                    <span className="text-[#00FF88] font-semibold">2 horas</span>.
                  </p>
                  <p className="text-[#666] text-sm mt-3">
                    Te enviamos una copia de tu mensaje a {form.email}
                  </p>
                </motion.div>
              ) : (
                <>
                  <h2 className="text-xl font-bold mb-6">Envíanos un mensaje</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm text-[#A0A0A0] mb-1.5">Nombre completo *</label>
                        <input
                          type="text"
                          name="nombre"
                          required
                          value={form.nombre}
                          onChange={handleChange}
                          className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#0070F3] transition-colors"
                          placeholder="Juan García"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-[#A0A0A0] mb-1.5">Email *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#0070F3] transition-colors"
                          placeholder="juan@empresa.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm text-[#A0A0A0] mb-1.5">Empresa</label>
                        <input
                          type="text"
                          name="empresa"
                          value={form.empresa}
                          onChange={handleChange}
                          className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#0070F3] transition-colors"
                          placeholder="Mi Empresa S.A."
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-[#A0A0A0] mb-1.5">País *</label>
                        <select
                          name="pais"
                          required
                          value={form.pais}
                          onChange={handleChange}
                          className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#0070F3] transition-colors"
                        >
                          <option value="">Selecciona tu país...</option>
                          {COUNTRIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-[#A0A0A0] mb-1.5">Asunto *</label>
                      <select
                        name="asunto"
                        required
                        value={form.asunto}
                        onChange={handleChange}
                        className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#0070F3] transition-colors"
                      >
                        <option value="">¿En qué podemos ayudarte?</option>
                        {SUBJECTS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm text-[#A0A0A0] mb-1.5">Mensaje *</label>
                      <textarea
                        name="mensaje"
                        required
                        value={form.mensaje}
                        onChange={handleChange}
                        rows={5}
                        className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#0070F3] transition-colors resize-none"
                        placeholder="Cuéntanos sobre tu empresa y qué tipo de seguridad estás buscando..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-[#0070F3] hover:bg-[#0050D0] text-white font-semibold rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(0,112,243,0.3)]"
                    >
                      Enviar mensaje →
                    </button>

                    <p className="text-center text-[#666] text-xs">
                      Al enviar aceptas nuestra{" "}
                      <Link href="/legal/privacy" className="text-[#0070F3] hover:underline">
                        Política de Privacidad
                      </Link>
                    </p>
                  </form>
                </>
              )}
            </motion.div>

            {/* Side info — 2 cols */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Quick stats */}
              <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-6">
                <h3 className="text-sm font-semibold text-[#666] uppercase tracking-wider mb-4">
                  Por qué contactarnos
                </h3>
                {[
                  { icon: "⚡", text: "Respuesta en menos de 2h hábiles" },
                  { icon: "🇪🇸", text: "Siempre en español" },
                  { icon: "🕐", text: "En tu zona horaria LATAM" },
                  { icon: "👤", text: "Una persona real, no un bot" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 mb-3 last:mb-0">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-[#A0A0A0] text-sm">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Channels */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-[#666] uppercase tracking-wider">
                  Otras formas de contactarnos
                </h3>
                {CONTACT_CHANNELS.map((ch, i) => (
                  <a
                    key={i}
                    href={ch.href}
                    target={ch.href.startsWith("http") ? "_blank" : undefined}
                    rel={ch.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-3 bg-[#111111] border border-[#2A2A2A] rounded-lg px-4 py-3 hover:border-[#0070F3]/40 transition-all duration-200 group"
                  >
                    <div className="flex-shrink-0">{ch.icon}</div>
                    <div>
                      <p className="text-xs text-[#666]">{ch.label}</p>
                      <p className="text-sm font-medium group-hover:text-[#0070F3] transition-colors">
                        {ch.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── OFFICE HOURS ──────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-3">Horario de atención</h2>
            <p className="text-[#A0A0A0]">Cubrimos todos los husos horarios de América Latina.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {OFFICE_HOURS.map((office, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-6 text-center hover:border-[#0070F3]/40 transition-all duration-300"
              >
                <div className="text-4xl mb-3">{office.flag}</div>
                <h3 className="font-bold text-sm mb-1">{office.location}</h3>
                <p className="text-[#0070F3] text-xs font-mono mb-2">{office.tz}</p>
                <p className="text-[#A0A0A0] text-xs">{office.hours}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOC 24/7 ──────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-[#0070F3]/15 via-[#111111] to-[#00D4FF]/10 border border-[#0070F3]/30 rounded-2xl p-8 md:p-12 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/40 flex items-center justify-center mx-auto mb-6">
              <span className="w-4 h-4 rounded-full bg-[#00FF88] animate-pulse" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Cobertura SOC 24/7/365</h2>
            <p className="text-[#A0A0A0] max-w-2xl mx-auto leading-relaxed">
              Fuera del horario de atención comercial, nuestro Centro de Operaciones de Seguridad sigue activo. Cualquier alerta crítica en tu infraestructura es detectada, triageada y contenida por nuestros analistas — sin importar la hora.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8 text-center">
              {[
                { label: "Respuesta P1", value: "< 15 min", color: "#FF3B3B" },
                { label: "Respuesta P2", value: "< 1 hora", color: "#FFB800" },
                { label: "Disponibilidad", value: "99.9%", color: "#00FF88" },
              ].map((sla, i) => (
                <div key={i} className="bg-[#111111] rounded-xl p-4 border border-[#2A2A2A]">
                  <p className="text-2xl font-bold mb-1" style={{ color: sla.color }}>
                    {sla.value}
                  </p>
                  <p className="text-[#666] text-xs">{sla.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#0D0D0D]">
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

      {/* ── BOTTOM CTA ────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-4">¿Prefieres ver la plataforma primero?</h2>
            <p className="text-[#A0A0A0] mb-8">
              Agenda una demo gratuita de 30 minutos o inicia tu prueba de 14 días sin tarjeta de crédito.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/demo"
                className="px-8 py-3.5 bg-[#0070F3] hover:bg-[#0050D0] text-white font-semibold rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(0,112,243,0.3)]"
              >
                Solicitar demo gratuita →
              </Link>
              <Link
                href="/trial"
                className="px-8 py-3.5 border border-[#2A2A2A] hover:border-[#0070F3]/60 text-[#A0A0A0] hover:text-white font-semibold rounded-lg transition-all duration-200"
              >
                Iniciar prueba de 14 días
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
