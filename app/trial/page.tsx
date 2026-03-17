"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

// ================================================================
// ICONS
// ================================================================
const CheckCircle = ({ color = "#00FF88" }: { color?: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="10" fill={`${color}20`} />
    <path d="M8 12l3 3 5-5" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const ChevronDown = ({ open }: { open: boolean }) => (
  <svg
    width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}
    aria-hidden="true"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

// ================================================================
// DATA
// ================================================================
const BENEFITS = [
  { title: "EDR & detección con IA activado", delay: 0 },
  { title: "Dashboard de amenazas en tiempo real", delay: 0.1 },
  { title: "Hasta 50 endpoints protegidos", delay: 0.2 },
  { title: "SIEM básico configurado", delay: 0.3 },
  { title: "Alertas por email y SMS", delay: 0.4 },
  { title: "Reportes de postura de seguridad", delay: 0.5 },
  { title: "Soporte onboarding incluido", delay: 0.6 },
];

const MOCK_CLIENTS = [
  { initials: "BC", name: "Banco Continental", country: "Perú" },
  { initials: "TS", name: "TechSystems SA", country: "Argentina" },
  { initials: "CM", name: "Clínica Metropolitana", country: "Colombia" },
];

const ONBOARDING_STEPS = [
  {
    step: "01",
    title: "Registrate",
    description: "Completás el formulario en menos de 2 minutos. Sin tarjeta de crédito.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
  {
    step: "02",
    title: "Instalá el agente",
    description: "Descargás el agente para Windows, Linux o macOS. Instalación en menos de 5 minutos.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/>
      </svg>
    ),
  },
  {
    step: "03",
    title: "Configuración automática",
    description: "La IA aprende el comportamiento de tu red y establece baselines en las primeras 24h.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M12 2v2m0 18v-2m8-8h-2M4 12H2m14.07 7.07l-1.41-1.41M6.34 17.66l-1.41 1.41"/>
      </svg>
    ),
  },
  {
    step: "04",
    title: "¡Estás protegido!",
    description: "Tu equipo recibe el primer reporte de seguridad. El SOC queda monitoreando en tiempo real.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
];

const TRUST_BADGES = [
  { label: "ISO 27001", icon: "🏅" },
  { label: "SOC 2 Type II", icon: "✅" },
  { label: "GDPR Compliant", icon: "🔒" },
  { label: "SSL Secured", icon: "🛡️" },
];

const TRIAL_FAQS = [
  {
    q: "¿El trial es realmente gratuito?",
    a: "Sí, completamente. Ni siquiera pedimos tarjeta de crédito. Los 15 días de prueba son sin compromiso y sin cargo.",
  },
  {
    q: "¿Qué pasa cuando termina el trial?",
    a: "Recibirás un email 3 días antes. Si elegís continuar, pasás al plan que mejor se adapte. Si no hacés nada, tu cuenta se suspende automáticamente sin ningún cargo.",
  },
  {
    q: "¿Puedo extender el período de prueba?",
    a: "En casos especiales (empresas con más de 100 endpoints, evaluaciones formales o licitaciones) podemos extender el trial hasta 30 días. Hablá con nuestro equipo.",
  },
  {
    q: "¿Se instala en todos los sistemas operativos?",
    a: "Sí. El agente qatech360 es compatible con Windows 10/11/Server, macOS 12+, y distribuciones Linux (Ubuntu, CentOS, RHEL, Debian).",
  },
  {
    q: "¿Mis datos están seguros durante el trial?",
    a: "Absolutamente. Todos los datos se procesan en infraestructura con data centers en LATAM (Brasil y Colombia). Cumplimos con LGPD, GDPR y la normativa local de cada país.",
  },
];

const COUNTRIES = [
  "Argentina", "México", "Colombia", "Chile", "Perú", "Brasil", "Uruguay",
  "Ecuador", "Paraguay", "Bolivia", "Venezuela", "Panamá", "Costa Rica",
  "Guatemala", "Honduras", "El Salvador", "República Dominicana",
  "Puerto Rico", "España", "Otro",
];

const INDUSTRIES = [
  "Tecnología / Software",
  "Finanzas y Banca",
  "Salud y Hospitales",
  "Gobierno y Sector Público",
  "Manufactura",
  "Retail / Comercio",
  "Educación",
  "Energía y Utilities",
  "Telecomunicaciones",
  "Servicios Profesionales",
  "Otro",
];

// ================================================================
// MAIN PAGE
// ================================================================
export default function TrialPage() {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    country: "",
    endpoints: "",
    industry: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "El nombre es requerido";
    if (!form.email.includes("@")) errs.email = "Email válido requerido";
    if (!form.company.trim()) errs.company = "La empresa es requerida";
    if (!form.country) errs.country = "Seleccioná tu país";
    if (!form.endpoints) errs.endpoints = "Seleccioná un rango";
    if (!form.industry) errs.industry = "Seleccioná tu industria";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const inputClass = (field: string) =>
    `w-full bg-[#1F2937] border ${errors[field] ? "border-[#FF3366]" : "border-[#374151]"} text-white rounded-xl px-4 py-3 text-sm placeholder-[#6B7280] focus:outline-none focus:border-[#0070F3] focus:ring-1 focus:ring-[#0070F3] transition-colors`;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <NavBar />

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,112,243,0.2) 0%, transparent 70%)" }}
        />
      </div>

      <main className="relative z-10 pt-20">

        {/* ── HERO BAR ── */}
        <div className="bg-[rgba(0,255,136,0.08)] border-b border-[rgba(0,255,136,0.15)] py-3 px-4 text-center">
          <p className="text-sm text-[#00FF88] font-semibold">
            <span className="inline-block w-2 h-2 rounded-full bg-[#00FF88] animate-pulse mr-2" />
            ¡Oferta activa! 15 días gratis + 30 días de garantía de devolución
          </p>
        </div>

        {/* ── SPLIT LAYOUT ── */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

              {/* LEFT: FORM */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="mb-8">
                  <span className="badge badge-primary mb-4">Trial gratuito · 15 días</span>
                  <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                    Iniciá tu prueba<br />
                    <span className="text-gradient-primary">gratuita ahora.</span>
                  </h1>
                  <p className="text-[#9CA3AF] text-lg">
                    Configuración en 15 minutos. Sin tarjeta de crédito.
                  </p>
                </div>

                {!submitted ? (
                  <form
                    onSubmit={handleSubmit}
                    className="glass-strong rounded-2xl p-8 space-y-5"
                    noValidate
                  >
                    {/* Nombre */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-white mb-1.5">
                        Nombre completo <span className="text-[#FF3366]">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Ej: María González"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={inputClass("name")}
                        autoComplete="name"
                      />
                      {errors.name && <p className="text-xs text-[#FF3366] mt-1">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-white mb-1.5">
                        Email empresarial <span className="text-[#FF3366]">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="nombre@empresa.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={inputClass("email")}
                        autoComplete="email"
                      />
                      {errors.email && <p className="text-xs text-[#FF3366] mt-1">{errors.email}</p>}
                    </div>

                    {/* Empresa */}
                    <div>
                      <label htmlFor="company" className="block text-sm font-semibold text-white mb-1.5">
                        Empresa <span className="text-[#FF3366]">*</span>
                      </label>
                      <input
                        id="company"
                        type="text"
                        placeholder="Nombre de tu empresa"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        className={inputClass("company")}
                        autoComplete="organization"
                      />
                      {errors.company && <p className="text-xs text-[#FF3366] mt-1">{errors.company}</p>}
                    </div>

                    {/* País + Endpoints */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="country" className="block text-sm font-semibold text-white mb-1.5">
                          País <span className="text-[#FF3366]">*</span>
                        </label>
                        <select
                          id="country"
                          value={form.country}
                          onChange={(e) => setForm({ ...form, country: e.target.value })}
                          className={inputClass("country")}
                        >
                          <option value="">Seleccionar...</option>
                          {COUNTRIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                        {errors.country && <p className="text-xs text-[#FF3366] mt-1">{errors.country}</p>}
                      </div>

                      <div>
                        <label htmlFor="endpoints" className="block text-sm font-semibold text-white mb-1.5">
                          Endpoints <span className="text-[#FF3366]">*</span>
                        </label>
                        <select
                          id="endpoints"
                          value={form.endpoints}
                          onChange={(e) => setForm({ ...form, endpoints: e.target.value })}
                          className={inputClass("endpoints")}
                        >
                          <option value="">Rango...</option>
                          <option value="1-10">1 – 10</option>
                          <option value="11-50">11 – 50</option>
                          <option value="51-200">51 – 200</option>
                          <option value="200+">200+</option>
                        </select>
                        {errors.endpoints && <p className="text-xs text-[#FF3366] mt-1">{errors.endpoints}</p>}
                      </div>
                    </div>

                    {/* Industria */}
                    <div>
                      <label htmlFor="industry" className="block text-sm font-semibold text-white mb-1.5">
                        Industria <span className="text-[#FF3366]">*</span>
                      </label>
                      <select
                        id="industry"
                        value={form.industry}
                        onChange={(e) => setForm({ ...form, industry: e.target.value })}
                        className={inputClass("industry")}
                      >
                        <option value="">Seleccionar industria...</option>
                        {INDUSTRIES.map((ind) => (
                          <option key={ind} value={ind}>{ind}</option>
                        ))}
                      </select>
                      {errors.industry && <p className="text-xs text-[#FF3366] mt-1">{errors.industry}</p>}
                    </div>

                    {/* Teléfono opcional */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-white mb-1.5">
                        Teléfono <span className="text-[#6B7280] font-normal">(opcional)</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="+54 11 0000 0000"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={inputClass("phone")}
                        autoComplete="tel"
                      />
                    </div>

                    <button type="submit" className="btn-primary w-full py-4 text-base justify-center">
                      <ShieldIcon />
                      Iniciar mi prueba gratuita →
                    </button>

                    <p className="text-center text-xs text-[#6B7280]">
                      Sin tarjeta de crédito. Sin compromiso. Cancelá cuando quieras.
                    </p>

                    <p className="text-center text-xs text-[#6B7280]">
                      Al registrarte, aceptás nuestros{" "}
                      <Link href="/legal/terms" className="text-[#0070F3] hover:underline">Términos</Link>
                      {" "}y{" "}
                      <Link href="/legal/privacy" className="text-[#0070F3] hover:underline">Política de Privacidad</Link>.
                    </p>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="glass-strong rounded-2xl p-10 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-[rgba(0,255,136,0.15)] border border-[rgba(0,255,136,0.3)] flex items-center justify-center mx-auto mb-6">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M20 6L9 17l-5-5" stroke="#00FF88" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-black text-white mb-3">¡Listo, {form.name.split(" ")[0]}!</h2>
                    <p className="text-[#9CA3AF] mb-6">
                      Revisá tu bandeja de entrada en <span className="text-white font-semibold">{form.email}</span>.
                      En los próximos 2 minutos recibirás tus credenciales.
                    </p>
                    <div className="space-y-3 text-left">
                      {["Email de bienvenida con tus accesos", "Enlace de descarga del agente", "Tu Customer Success Manager asignado"].map((item) => (
                        <div key={item} className="flex items-center gap-3">
                          <CheckCircle />
                          <span className="text-sm text-[#D1D5DB]">{item}</span>
                        </div>
                      ))}
                    </div>
                    <Link href="https://app.qatech360.com" className="btn-primary mt-8 inline-flex">
                      Ir al dashboard →
                    </Link>
                  </motion.div>
                )}
              </motion.div>

              {/* RIGHT: BENEFITS */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="space-y-8"
              >
                {/* 15 min checklist */}
                <div className="glass rounded-2xl p-8">
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className="text-[#00D4FF]">⚡</span>
                    Lo que obtenés en 15 minutos
                  </h2>
                  <ul className="space-y-4">
                    {BENEFITS.map((benefit) => (
                      <motion.li
                        key={benefit.title}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: benefit.delay }}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle />
                        <span className="text-sm text-[#D1D5DB]">{benefit.title}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Client logos */}
                <div className="glass rounded-2xl p-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#6B7280] mb-4">
                    Ya confían en qatech360
                  </p>
                  <div className="flex gap-4">
                    {MOCK_CLIENTS.map((client) => (
                      <div key={client.name} className="flex-1 text-center">
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-black text-lg mx-auto mb-2"
                          style={{ background: "linear-gradient(135deg, #0070F3 0%, #00D4FF 100%)" }}
                        >
                          {client.initials}
                        </div>
                        <p className="text-xs font-semibold text-white leading-tight">{client.name}</p>
                        <p className="text-xs text-[#6B7280]">{client.country}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Guarantee */}
                <div className="rounded-2xl p-6 border border-[rgba(0,112,243,0.3)]" style={{ background: "rgba(0,112,243,0.06)" }}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[rgba(0,112,243,0.15)] flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0070F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm mb-1">Garantía de 30 días</p>
                      <p className="text-[#9CA3AF] text-xs leading-relaxed">
                        Si no te convence la plataforma en los primeros 30 días de un plan pago, te devolvemos el 100% del dinero. Sin preguntas.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-4 glass rounded-xl p-5">
                  <div className="text-center flex-shrink-0">
                    <p className="text-3xl font-black text-white">4.9</p>
                    <div className="flex gap-0.5 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FF6B00" aria-hidden="true">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">Calificado por nuestros clientes</p>
                    <p className="text-[#9CA3AF] text-xs">+200 reseñas verificadas en G2 y Capterra</p>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="grid grid-cols-4 gap-3">
                  {TRUST_BADGES.map((badge) => (
                    <div key={badge.label} className="glass rounded-xl p-3 text-center">
                      <div className="text-xl mb-1">{badge.icon}</div>
                      <p className="text-[10px] font-semibold text-[#9CA3AF] leading-tight">{badge.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── ONBOARDING STEPS ── */}
        <section className="py-20 px-4 border-t border-[rgba(55,65,81,0.3)]">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                Cómo funciona el <span className="text-gradient-primary">onboarding</span>
              </h2>
              <p className="text-[#9CA3AF] text-lg max-w-2xl mx-auto">
                Del formulario a la protección completa en menos de 15 minutos.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6 relative">
              {/* Connecting line */}
              <div
                aria-hidden="true"
                className="absolute top-10 left-[12.5%] right-[12.5%] h-px hidden md:block"
                style={{ background: "linear-gradient(90deg, transparent, #0070F3 20%, #0070F3 80%, transparent)" }}
              />

              {ONBOARDING_STEPS.map((step, idx) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="text-center relative"
                >
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5 text-[#0070F3] border border-[rgba(0,112,243,0.3)] relative z-10"
                    style={{ background: "rgba(0,112,243,0.1)" }}
                  >
                    {step.icon}
                  </div>
                  <div className="text-xs font-black text-[#0070F3] mb-2 tracking-widest">{step.step}</div>
                  <h3 className="text-white font-bold text-base mb-2">{step.title}</h3>
                  <p className="text-[#9CA3AF] text-sm leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIAL ── */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-strong rounded-2xl p-8 md:p-12 text-center"
            >
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#FF6B00" aria-hidden="true">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-xl text-white font-medium leading-relaxed mb-6 italic">
                "Empecé con el trial sin muchas expectativas. A los 3 días ya teníamos detectados 2 intentos de movimiento lateral que nuestro antivirus no había visto. Hoy somos clientes Professional."
              </blockquote>
              <div className="flex items-center justify-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-black"
                  style={{ background: "linear-gradient(135deg, #00D4FF 0%, #0070F3 100%)" }}
                >
                  JP
                </div>
                <div className="text-left">
                  <p className="text-white font-semibold">Jorge Pereira</p>
                  <p className="text-[#6B7280] text-sm">IT Manager · Exportadora Los Ceibos · Chile</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-16 px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl font-bold text-white mb-3">
                Preguntas sobre el <span className="text-gradient-accent">trial</span>
              </h2>
            </motion.div>

            <div className="space-y-3">
              {TRIAL_FAQS.map((faq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.07 }}
                  className="glass rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-[rgba(0,112,243,0.04)] transition-colors"
                    aria-expanded={openFaq === idx}
                  >
                    <span className="text-sm font-semibold text-white pr-4">{faq.q}</span>
                    <ChevronDown open={openFaq === idx} />
                  </button>
                  <AnimatePresence>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-sm text-[#9CA3AF] leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA ── */}
        <section className="py-16 px-4 border-t border-[rgba(55,65,81,0.3)]">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-[#9CA3AF] mb-4">¿Tenés dudas? Hablá con nuestro equipo.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="mailto:hola@qatech360.com" className="btn-secondary">
                hola@qatech360.com
              </a>
              <a href="https://wa.me/59170000000" target="_blank" rel="noopener noreferrer" className="btn-ghost border border-[#374151]">
                WhatsApp
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
