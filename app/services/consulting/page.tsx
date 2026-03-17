"use client";

import { motion } from "framer-motion";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { useState } from "react";

// ─── Floating code background ─────────────────────────────────────────────────
const codeLines = [
  "import { SecurityAudit } from '@qatech360/core';",
  "const audit = new SecurityAudit({ scope: 'full' });",
  "await audit.runMaturityAssessment();",
  "const gaps = audit.getControlGaps();",
  "console.log(`Risk score: ${gaps.score}`);",
  "export class VirtualCISO extends Advisor {",
  "  async buildRoadmap(framework: 'NIST' | 'ISO') {",
  "    return this.prioritize(gaps, budget);",
  "  }",
  "}",
  "// Compliance: SOC2 | ISO 27001 | PCI-DSS",
  "const posture = await getSecurityPosture();",
];

function CodeBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
      {codeLines.map((line, i) => (
        <motion.div
          key={i}
          className="absolute text-[#0070F3]/10 font-mono text-sm whitespace-nowrap"
          style={{ top: `${(i * 9) % 100}%`, left: `${(i * 13) % 70}%` }}
          animate={{ opacity: [0.05, 0.18, 0.05], x: [0, 20, 0] }}
          transition={{ duration: 6 + i, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
        >
          {line}
        </motion.div>
      ))}
    </div>
  );
}

// ─── Consulting Areas ─────────────────────────────────────────────────────────
const areas = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: "Madurez de Seguridad",
    subtitle: "Security Maturity Assessment",
    desc: "Evaluamos tu postura de seguridad contra frameworks internacionales (NIST CSF, CIS Controls, ISO 27001). Identificamos brechas, priorizamos controles y entregamos un roadmap ejecutable.",
    deliverables: ["Informe de madurez (puntuación 1-5)", "Mapa de brechas por dominio", "Roadmap priorizado 12-24 meses", "Benchmarking vs industria"],
    color: "#0070F3",
    duration: "2–4 semanas",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="4" /><path d="M20 21a8 8 0 1 0-16 0" /><path d="M12 12v9" /><path d="M8 17h8" />
      </svg>
    ),
    title: "CISO Virtual",
    subtitle: "Virtual CISO as a Service",
    desc: "Un Chief Information Security Officer experimentado disponible part-time o full-time. Estrategia, gobierno, gestión de riesgo y representación ante el board — sin el costo de un CISO interno.",
    deliverables: ["Política de seguridad corporativa", "Programa de gestión de riesgos", "Presentaciones al Directorio", "Mentoring del equipo TI"],
    color: "#00D4FF",
    duration: "Continuo (mensual)",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: "Arquitectura de Seguridad",
    subtitle: "Security Architecture Design",
    desc: "Diseñamos tu arquitectura de seguridad desde cero o mejoramos la existente. Zero Trust, segmentación de red, hardening de cloud, integración de controles en el pipeline de desarrollo.",
    deliverables: ["Diagrama de arquitectura objetivo", "Diseño Zero Trust Network", "Cloud Security Architecture", "Guías de hardening específicas"],
    color: "#00FF88",
    duration: "3–8 semanas",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    title: "Preparación para Compliance",
    subtitle: "Compliance Readiness",
    desc: "Preparación para auditorías de SOC 2 Type II, ISO 27001, PCI-DSS, HIPAA y regulaciones locales de cada país LATAM. Reducimos el tiempo de certificación en un 60%.",
    deliverables: ["Gap analysis regulatorio", "Documentación de controles", "Pre-auditoría interna", "Acompañamiento en auditoría externa"],
    color: "#FF6B00",
    duration: "4–12 semanas",
  },
];

// ─── Methodology phases ───────────────────────────────────────────────────────
const phases = [
  { phase: 1, name: "Discovery", icon: "🔍", desc: "Entrevistas con stakeholders, inventario de activos, revisión de documentación existente.", weeks: "Sem 1–2", color: "#0070F3" },
  { phase: 2, name: "Assessment", icon: "📊", desc: "Evaluación técnica, escaneos, revisión de controles, análisis de brechas.", weeks: "Sem 2–4", color: "#00D4FF" },
  { phase: 3, name: "Roadmap", icon: "🗺️", desc: "Priorización de iniciativas por riesgo e impacto. Plan de acción detallado con métricas.", weeks: "Sem 4–5", color: "#00FF88" },
  { phase: 4, name: "Implementation", icon: "⚙️", desc: "Ejecución de controles prioritarios con soporte técnico y gestión de cambio.", weeks: "Sem 5–12", color: "#FF6B00" },
  { phase: 5, name: "Training", icon: "🎓", desc: "Capacitación del equipo interno. Transferencia de conocimiento. KPIs de seguridad.", weeks: "Sem 10–12", color: "#FF3366" },
  { phase: 6, name: "Review", icon: "✅", desc: "Validación de mejoras, medición de madurez post-proyecto, ajuste del roadmap.", weeks: "Sem 12+", color: "#00FF88" },
];

// ─── Experts ──────────────────────────────────────────────────────────────────
const experts = [
  { name: "Laura Vásquez", role: "CISO Virtual Senior", years: 14, certs: ["CISSP", "CISM", "ISO 27001 LA"], color: "#0070F3", specialty: "Gobierno y estrategia de seguridad corporativa" },
  { name: "Miguel Ángel Ruiz", role: "Arquitecto de Seguridad", years: 11, certs: ["CCSP", "AWS Security", "TOGAF"], color: "#00D4FF", specialty: "Cloud security & Zero Trust architecture" },
  { name: "Valentina Ospina", role: "Compliance Lead", years: 9, certs: ["CISA", "QSA PCI-DSS", "ISO 27001 LA"], color: "#00FF88", specialty: "Auditorías SOC 2, ISO 27001, PCI-DSS" },
  { name: "Roberto Fuentes", role: "Security Strategist", years: 12, certs: ["CRISC", "CGEIT", "CISM"], color: "#FF6B00", specialty: "Gestión de riesgo y continuidad de negocio" },
];

// ─── ROI Cases ────────────────────────────────────────────────────────────────
const cases = [
  {
    company: "Fintech — 150 empleados",
    before: { score: "Madurez 1.2/5", risk: "Alto riesgo regulatorio", audit: "No certificado SOC 2" },
    after: { score: "Madurez 3.8/5", risk: "Riesgo moderado gestionado", audit: "SOC 2 Type II obtenido" },
    roi: "$1.2M en contratos desbloqueados",
    timeline: "6 meses",
    color: "#0070F3",
  },
  {
    company: "Retailer — 800 empleados",
    before: { score: "Sin CISO formal", risk: "Brecha de PCI-DSS", audit: "Multas pendientes" },
    after: { score: "vCISO activo", risk: "PCI-DSS compliant", audit: "Multas evitadas" },
    roi: "$340K ahorrados en multas",
    timeline: "4 meses",
    color: "#00FF88",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ConsultingPage() {
  const [formState, setFormState] = useState({ name: "", email: "", company: "", service: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  return (
    <main className="bg-[#0A0A0A] min-h-screen">
      <NavBar />

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-24">
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30" />
        <CodeBackground />
        <div className="absolute inset-0 bg-gradient-hero-radial" />

        <div className="section-container relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="badge badge-accent mb-6 inline-flex">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#00FF88" aria-hidden="true"><circle cx="12" cy="12" r="10" /></svg>
              Consultoría de Ciberseguridad
            </span>
            <h1 className="text-display-xl font-black text-white mb-6 leading-tight">
              Estrategia de seguridad
              <br />
              <span className="text-gradient-accent">a nivel Fortune 500.</span>
              <br />
              Para tu empresa LATAM.
            </h1>
            <p className="text-xl text-[#9CA3AF] mb-10 max-w-2xl mx-auto">
              Consultores con experiencia en las empresas más reguladas del mundo. Ahora disponibles para organizaciones medianas en América Latina.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#contact" className="btn-primary text-base px-8 py-4">
                Solicitar diagnóstico gratuito
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
              <Link href="#areas" className="btn-secondary text-base px-8 py-4">Ver servicios</Link>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-14">
              {[
                { val: "200+", label: "Proyectos LATAM", color: "#0070F3" },
                { val: "60%", label: "Menos tiempo en compliance", color: "#00D4FF" },
                { val: "4.9★", label: "Satisfacción clientes", color: "#00FF88" },
                { val: "12", label: "Regulaciones cubiertas", color: "#FF6B00" },
              ].map((s) => (
                <div key={s.label} className="glass rounded-xl p-4 border border-[#374151]">
                  <div className="text-3xl font-black" style={{ color: s.color }}>{s.val}</div>
                  <div className="text-xs text-[#9CA3AF] mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── AREAS ─────────────────────────────────────────────────────────────── */}
      <section id="areas" className="py-20">
        <div className="section-container">
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-display-md font-bold text-white mb-4">
              4 áreas de <span className="text-gradient-primary">consultoría especializada</span>
            </h2>
            <p className="text-[#9CA3AF] max-w-xl mx-auto">Cada proyecto termina con entregables concretos y medibles. No reportes que nadie lee.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {areas.map((area, i) => (
              <motion.div
                key={area.title}
                className="card-base group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -4 }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-all group-hover:scale-110" style={{ backgroundColor: `${area.color}15`, color: area.color }}>
                    {area.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl">{area.title}</h3>
                    <p className="text-sm" style={{ color: area.color }}>{area.subtitle}</p>
                  </div>
                </div>
                <p className="text-[#9CA3AF] text-sm leading-relaxed mb-6">{area.desc}</p>
                <div className="mb-4">
                  <div className="text-xs text-[#9CA3AF] uppercase tracking-wider mb-3 font-semibold">Entregables</div>
                  <ul className="space-y-2">
                    {area.deliverables.map((d) => (
                      <li key={d} className="flex items-center gap-2 text-sm text-[#9CA3AF]">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={area.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#374151]">
                  <span className="text-xs text-[#9CA3AF]">Duración típica</span>
                  <span className="badge badge-primary">{area.duration}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── METHODOLOGY ───────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#111827]/50">
        <div className="section-container">
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-display-md font-bold text-white mb-4">
              Metodología de <span className="text-gradient-primary">6 fases</span>
            </h2>
            <p className="text-[#9CA3AF] max-w-xl mx-auto">Proceso probado en más de 200 proyectos. Predecible, medible, entregable.</p>
          </motion.div>

          {/* Timeline horizontal */}
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-0 min-w-max mx-auto" style={{ maxWidth: "1000px" }}>
              {phases.map((phase, i) => (
                <motion.div
                  key={phase.phase}
                  className="flex-1 relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  {/* Connector */}
                  {i < phases.length - 1 && (
                    <div className="absolute top-8 left-1/2 w-full h-px bg-gradient-to-r from-[#374151] to-[#374151] z-0" />
                  )}
                  <div className="relative z-10 flex flex-col items-center px-3">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-2xl border-2 mb-4 bg-[#111827]"
                      style={{ borderColor: phase.color }}
                    >
                      {phase.icon}
                    </div>
                    <div className="text-center w-32">
                      <div className="font-bold text-white text-sm mb-1">{phase.name}</div>
                      <div className="text-xs mb-2" style={{ color: phase.color }}>{phase.weeks}</div>
                      <p className="text-[#9CA3AF] text-xs leading-relaxed">{phase.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERTS ───────────────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="section-container">
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-display-md font-bold text-white mb-4">
              Nuestros <span className="text-gradient-accent">expertos</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {experts.map((e, i) => (
              <motion.div
                key={e.name}
                className="card-base text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {/* Avatar */}
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-black border-2" style={{ backgroundColor: `${e.color}20`, borderColor: e.color, color: e.color }}>
                  {e.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <h3 className="text-white font-bold mb-1">{e.name}</h3>
                <p className="text-sm font-semibold mb-2" style={{ color: e.color }}>{e.role}</p>
                <p className="text-[#9CA3AF] text-xs mb-4 leading-relaxed">{e.specialty}</p>
                <div className="flex flex-wrap gap-1 justify-center mb-3">
                  {e.certs.map((c) => (
                    <span key={c} className="badge badge-primary text-xs" style={{ fontSize: "10px", padding: "2px 8px" }}>{c}</span>
                  ))}
                </div>
                <div className="text-xs text-[#9CA3AF]"><span className="font-bold text-white">{e.years} años</span> de experiencia</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROI CASES ─────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#111827]/50">
        <div className="section-container">
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-display-md font-bold text-white mb-4">
              Resultados <span className="text-gradient-primary">antes y después</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {cases.map((c, i) => (
              <motion.div
                key={c.company}
                className="rounded-2xl border border-[#374151] bg-[#111827] overflow-hidden"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="p-4 border-b border-[#374151]" style={{ backgroundColor: `${c.color}10` }}>
                  <span className="text-white font-bold">{c.company}</span>
                  <span className="ml-3 badge badge-primary">{c.timeline}</span>
                </div>
                <div className="grid grid-cols-2">
                  <div className="p-6 border-r border-[#374151]">
                    <div className="text-xs text-[#FF3366] uppercase tracking-wider font-bold mb-3">Antes</div>
                    {Object.values(c.before).map((val) => (
                      <div key={val} className="flex items-start gap-2 text-sm text-[#9CA3AF] mb-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF3366" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                        {val}
                      </div>
                    ))}
                  </div>
                  <div className="p-6">
                    <div className="text-xs uppercase tracking-wider font-bold mb-3" style={{ color: c.color }}>Después</div>
                    {Object.values(c.after).map((val) => (
                      <div key={val} className="flex items-start gap-2 text-sm text-[#9CA3AF] mb-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00FF88" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                        {val}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4 border-t border-[#374151] flex items-center justify-between" style={{ backgroundColor: `${c.color}08` }}>
                  <span className="text-[#9CA3AF] text-sm">ROI del proyecto</span>
                  <span className="font-black text-lg" style={{ color: c.color }}>{c.roi}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM ──────────────────────────────────────────────────────── */}
      <section id="contact" className="py-20">
        <div className="section-container">
          <div className="max-w-2xl mx-auto">
            <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-display-md font-bold text-white mb-4">
                Solicita tu <span className="text-gradient-accent">diagnóstico gratuito</span>
              </h2>
              <p className="text-[#9CA3AF]">Sin compromiso. Reunión de 45 minutos con un consultor senior.</p>
            </motion.div>
            <motion.form
              className="glass-strong rounded-2xl p-8 border border-[#374151] space-y-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#9CA3AF] mb-2" htmlFor="name">Nombre completo</label>
                  <input
                    id="name" name="name" type="text"
                    value={formState.name} onChange={handleChange}
                    placeholder="Juan García"
                    className="w-full bg-[#1F2937] border border-[#374151] rounded-lg px-4 py-3 text-white placeholder-[#6B7280] focus:outline-none focus:border-[#0070F3] focus:ring-1 focus:ring-[#0070F3] transition-colors text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#9CA3AF] mb-2" htmlFor="email">Email corporativo</label>
                  <input
                    id="email" name="email" type="email"
                    value={formState.email} onChange={handleChange}
                    placeholder="juan@empresa.com"
                    className="w-full bg-[#1F2937] border border-[#374151] rounded-lg px-4 py-3 text-white placeholder-[#6B7280] focus:outline-none focus:border-[#0070F3] focus:ring-1 focus:ring-[#0070F3] transition-colors text-sm"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#9CA3AF] mb-2" htmlFor="company">Empresa</label>
                <input
                  id="company" name="company" type="text"
                  value={formState.company} onChange={handleChange}
                  placeholder="Nombre de tu empresa"
                  className="w-full bg-[#1F2937] border border-[#374151] rounded-lg px-4 py-3 text-white placeholder-[#6B7280] focus:outline-none focus:border-[#0070F3] focus:ring-1 focus:ring-[#0070F3] transition-colors text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#9CA3AF] mb-2" htmlFor="service">Servicio de interés</label>
                <select
                  id="service" name="service"
                  value={formState.service} onChange={handleChange}
                  className="w-full bg-[#1F2937] border border-[#374151] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0070F3] focus:ring-1 focus:ring-[#0070F3] transition-colors text-sm"
                >
                  <option value="">Selecciona un servicio</option>
                  <option value="maturity">Madurez de Seguridad</option>
                  <option value="vciso">CISO Virtual</option>
                  <option value="architecture">Arquitectura de Seguridad</option>
                  <option value="compliance">Preparación para Compliance</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#9CA3AF] mb-2" htmlFor="message">¿Cuál es tu principal desafío de seguridad?</label>
                <textarea
                  id="message" name="message" rows={4}
                  value={formState.message} onChange={handleChange}
                  placeholder="Describe brevemente tu situación actual..."
                  className="w-full bg-[#1F2937] border border-[#374151] rounded-lg px-4 py-3 text-white placeholder-[#6B7280] focus:outline-none focus:border-[#0070F3] focus:ring-1 focus:ring-[#0070F3] transition-colors text-sm resize-none"
                />
              </div>
              <button type="submit" className="btn-primary w-full justify-center text-base py-4">
                Solicitar diagnóstico gratuito
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
              <p className="text-center text-xs text-[#6B7280]">Sin spam. Sin compromiso. Respuesta en menos de 24 horas hábiles.</p>
            </motion.form>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-b from-[#111827]/30 to-[#0A0A0A]">
        <div className="section-container text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-display-sm font-bold text-white mb-4">
              Tu empresa merece una estrategia de seguridad <span className="text-gradient-primary">profesional</span>
            </h2>
            <p className="text-[#9CA3AF] mb-6">Hablamos el miércoles. Para el viernes ya tienes un diagnóstico inicial.</p>
            <Link href="#contact" className="btn-primary text-base px-8 py-4">
              Empezar ahora — Es gratis
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
