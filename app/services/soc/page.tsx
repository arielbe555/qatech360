"use client";

import { motion, useMotionValue, useSpring, animate } from "framer-motion";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

// ─── Animated counter ────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const controls = animate(0, target, {
            duration: 2,
            ease: "easeOut",
            onUpdate: (v) => setCount(Math.floor(v)),
          });
          return () => controls.stop();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

// ─── SOC Diagram SVG ─────────────────────────────────────────────────────────
function SOCDiagram() {
  const nodes = [
    { id: "data", x: 80, y: 160, label: "Datos", color: "#0070F3" },
    { id: "detect", x: 240, y: 80, label: "Detección", color: "#00D4FF" },
    { id: "analyst", x: 400, y: 160, label: "Analista", color: "#00FF88" },
    { id: "response", x: 560, y: 80, label: "Respuesta", color: "#FF6B00" },
    { id: "resolve", x: 720, y: 160, label: "Resolución", color: "#00FF88" },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 820 260" className="w-full max-w-3xl mx-auto" aria-label="SOC workflow diagram">
        {/* Connecting lines */}
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#374151" />
          </marker>
          <filter id="glow-blue">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Lines */}
        <line x1="120" y1="160" x2="220" y2="120" stroke="#374151" strokeWidth="1.5" markerEnd="url(#arrow)" strokeDasharray="4 2" />
        <line x1="280" y1="100" x2="380" y2="140" stroke="#374151" strokeWidth="1.5" markerEnd="url(#arrow)" strokeDasharray="4 2" />
        <line x1="440" y1="160" x2="540" y2="100" stroke="#374151" strokeWidth="1.5" markerEnd="url(#arrow)" strokeDasharray="4 2" />
        <line x1="600" y1="100" x2="700" y2="140" stroke="#374151" strokeWidth="1.5" markerEnd="url(#arrow)" strokeDasharray="4 2" />

        {/* Data streams */}
        {[0, 1, 2, 3].map((i) => (
          <motion.circle
            key={i}
            r="4"
            fill="#0070F3"
            opacity="0.7"
            animate={{
              cx: [80 + i * 160, 240 + i * 160],
              cy: [160 - (i % 2) * 80, 80 + (i % 2) * 80],
            }}
            transition={{ duration: 2, delay: i * 0.5, repeat: Infinity, repeatDelay: 1 }}
          />
        ))}

        {/* Nodes */}
        {nodes.map((node, idx) => (
          <g key={node.id}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="38"
              fill={`${node.color}18`}
              stroke={node.color}
              strokeWidth="1.5"
              animate={{ r: [38, 44, 38] }}
              transition={{ duration: 2.5, delay: idx * 0.4, repeat: Infinity, ease: "easeInOut" }}
              filter="url(#glow-blue)"
            />
            <circle cx={node.x} cy={node.y} r="26" fill="#111827" stroke={node.color} strokeWidth="2" />
            {/* Step number */}
            <text x={node.x} y={node.y + 1} textAnchor="middle" dominantBaseline="middle" fill={node.color} fontSize="14" fontWeight="700">{idx + 1}</text>
            <text x={node.x} y={node.y + 52} textAnchor="middle" fill="#9CA3AF" fontSize="11" fontWeight="500">{node.label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// ─── Analyst Profile ──────────────────────────────────────────────────────────
function AnalystAvatar({ initials, color }: { initials: string; color: string }) {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" aria-hidden="true">
      <circle cx="40" cy="40" r="40" fill={`${color}20`} />
      <circle cx="40" cy="40" r="39" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="40" cy="30" r="14" fill={`${color}40`} />
      <ellipse cx="40" cy="68" rx="22" ry="14" fill={`${color}40`} />
      <text x="40" y="33" textAnchor="middle" dominantBaseline="middle" fill={color} fontSize="13" fontWeight="700">{initials}</text>
    </svg>
  );
}

const analysts = [
  {
    name: "Carlos Mendoza",
    initials: "CM",
    color: "#0070F3",
    role: "Lead SOC Analyst",
    certs: ["CISSP", "CEH", "GCIA"],
    specialty: "Threat Hunting & APT Analysis",
    experience: "9 años",
  },
  {
    name: "Andrea Torres",
    initials: "AT",
    color: "#00D4FF",
    role: "Incident Responder",
    certs: ["GCIH", "ECIH", "CEH"],
    specialty: "Incident Response & Malware Analysis",
    experience: "7 años",
  },
  {
    name: "Diego Reyes",
    initials: "DR",
    color: "#00FF88",
    role: "Threat Intelligence",
    certs: ["GCTI", "CTIA", "OSCP"],
    specialty: "Dark Web Intel & IoC Enrichment",
    experience: "6 años",
  },
];

// ─── SLA Table ────────────────────────────────────────────────────────────────
const slaLevels = [
  { severity: "Crítico", color: "#FF3366", bg: "rgba(255,51,102,0.1)", border: "rgba(255,51,102,0.3)", sla: "< 15 min", action: "Escalado inmediato + contención", icon: "🔴" },
  { severity: "Alto", color: "#FF6B00", bg: "rgba(255,107,0,0.1)", border: "rgba(255,107,0,0.3)", sla: "< 1 hora", action: "Análisis completo + remediación", icon: "🟠" },
  { severity: "Medio", color: "#FFD700", bg: "rgba(255,215,0,0.1)", border: "rgba(255,215,0,0.3)", sla: "< 4 horas", action: "Investigación + reporte detallado", icon: "🟡" },
  { severity: "Bajo", color: "#00FF88", bg: "rgba(0,255,136,0.1)", border: "rgba(0,255,136,0.3)", sla: "< 24 horas", action: "Documentación + recomendaciones", icon: "🟢" },
];

// ─── Onboarding Steps ─────────────────────────────────────────────────────────
const onboardingSteps = [
  { step: 1, title: "Kickoff Call", desc: "Reunión de 1 hora para entender tu infraestructura y objetivos de seguridad.", time: "Hora 0", color: "#0070F3" },
  { step: 2, title: "Deployment de Sensores", desc: "Instalación de agentes en endpoints, servidores y red en < 2 horas.", time: "Hora 2–6", color: "#00D4FF" },
  { step: 3, title: "Integración SIEM", desc: "Conexión de fuentes de log: firewall, AD, cloud, aplicaciones críticas.", time: "Hora 6–24", color: "#00FF88" },
  { step: 4, title: "Calibración de Reglas", desc: "Ajuste de alertas para tu entorno específico. Reducción de falsos positivos al 95%.", time: "Día 2", color: "#FF6B00" },
  { step: 5, title: "SOC Activo", desc: "Monitoreo 24/7 operacional. Recibes primer reporte en las primeras 48h.", time: "Hora 72", color: "#00FF88" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function SOCPage() {
  const [activeMetric, setActiveMetric] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setActiveMetric((p) => (p + 1) % 3), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="bg-[#0A0A0A] min-h-screen">
      <NavBar />

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-24">
        {/* Grid background */}
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-40" />
        {/* Radial glow */}
        <div className="absolute inset-0 bg-gradient-hero-radial" />
        {/* Scan line */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="w-full h-px bg-gradient-to-r from-transparent via-[#0070F3]/60 to-transparent"
            animate={{ y: ["0vh", "100vh"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="section-container relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="badge badge-primary mb-6 inline-flex">
              <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
              SOC Operacional · 24/7/365
            </span>
            <h1 className="text-display-xl font-black text-white mb-6 leading-tight">
              Tu SOC.{" "}
              <span className="text-gradient-primary">Sin contratar</span>
              <br />un equipo entero.
            </h1>
            <p className="text-xl text-[#9CA3AF] mb-10 max-w-2xl mx-auto">
              Un Centro de Operaciones de Seguridad de clase mundial, operado por analistas certificados, disponible desde el primer día. Sin CAPEX, sin headcount, sin excusas.
            </p>

            {/* Live Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10">
              {[
                { label: "Amenazas detectadas hoy", value: 14837, suffix: "", color: "#FF3366" },
                { label: "Tiempo promedio de respuesta", value: 11, suffix: " min", color: "#00FF88" },
                { label: "Uptime garantizado", value: 99.99, suffix: "%", color: "#00D4FF" },
              ].map((m, i) => (
                <motion.div
                  key={i}
                  className="glass rounded-xl p-4 border border-[#374151]"
                  animate={{ borderColor: activeMetric === i ? m.color : "#374151" }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: m.color }} />
                    <span className="text-xs text-[#9CA3AF] uppercase tracking-wider">{m.label}</span>
                  </div>
                  <div className="text-3xl font-black" style={{ color: m.color }}>
                    <AnimatedCounter target={m.value} suffix={m.suffix} />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary text-base px-8 py-4">
                Activar mi SOC ahora
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
              <Link href="#pricing" className="btn-secondary text-base px-8 py-4">
                Ver precios MDR
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SOC VISUALIZATION ─────────────────────────────────────────────────── */}
      <section className="py-20 relative">
        <div className="section-container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-display-md font-bold text-white mb-4">
              Cómo funciona tu <span className="text-gradient-primary">SOC en tiempo real</span>
            </h2>
            <p className="text-[#9CA3AF] max-w-xl mx-auto">
              Cada evento de seguridad pasa por un flujo validado y auditado de detección, análisis y respuesta.
            </p>
          </motion.div>
          <motion.div
            className="glass rounded-2xl p-8 border border-[#374151]"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SOCDiagram />
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-8">
              {["Logs, endpoints, red", "ML + reglas SIEM", "Triage en vivo", "Contención automatizada", "Cierre + ticket"].map((desc, i) => (
                <div key={i} className="text-center">
                  <div className="text-xs text-[#9CA3AF] mt-2">{desc}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TEAM ──────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#111827]/50">
        <div className="section-container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-display-md font-bold text-white mb-4">
              El equipo detrás de <span className="text-gradient-accent">tu seguridad</span>
            </h2>
            <p className="text-[#9CA3AF] max-w-xl mx-auto">
              Analistas Tier 2 y Tier 3 certificados internacionalmente, trabajando en turnos rotativos 24/7.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {analysts.map((a, i) => (
              <motion.div
                key={a.name}
                className="card-base text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="flex justify-center mb-4">
                  <AnalystAvatar initials={a.initials} color={a.color} />
                </div>
                <h3 className="text-white font-bold text-lg mb-1">{a.name}</h3>
                <p className="text-sm font-semibold mb-3" style={{ color: a.color }}>{a.role}</p>
                <p className="text-[#9CA3AF] text-sm mb-4">{a.specialty}</p>
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {a.certs.map((c) => (
                    <span key={c} className="badge badge-primary text-xs">{c}</span>
                  ))}
                </div>
                <div className="glass rounded-lg px-3 py-2 text-sm text-[#9CA3AF]">
                  <span className="text-white font-semibold">{a.experience}</span> de experiencia
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SLA TABLE ─────────────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="section-container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-display-md font-bold text-white mb-4">
              SLA garantizado <span className="text-gradient-primary">por contrato</span>
            </h2>
            <p className="text-[#9CA3AF] max-w-xl mx-auto">
              Tiempos de respuesta comprometidos contractualmente. No promesas de marketing.
            </p>
          </motion.div>
          <div className="space-y-4 max-w-3xl mx-auto">
            {slaLevels.map((level, i) => (
              <motion.div
                key={level.severity}
                className="rounded-xl p-5 border flex flex-col sm:flex-row sm:items-center gap-4"
                style={{ backgroundColor: level.bg, borderColor: level.border }}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-center gap-3 min-w-[160px]">
                  <span className="text-2xl" aria-hidden="true">{level.icon}</span>
                  <div>
                    <div className="font-bold text-white">{level.severity}</div>
                    <div className="text-2xl font-black" style={{ color: level.color }}>{level.sla}</div>
                  </div>
                </div>
                <div className="flex-1 text-[#9CA3AF] text-sm">{level.action}</div>
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00FF88" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                  <span className="text-[#00FF88] text-xs font-semibold">Garantizado</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COST COMPARISON ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#111827]/50">
        <div className="section-container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-display-md font-bold text-white mb-4">
              El costo de <span className="text-gradient-danger">no tener</span> un SOC
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Internal SOC */}
            <motion.div
              className="rounded-2xl p-8 border border-[#FF3366]/30 bg-[#FF3366]/5"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#FF3366]/20 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF3366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                </div>
                <h3 className="text-white font-bold text-lg">SOC Interno</h3>
              </div>
              <div className="space-y-3 mb-6">
                {[
                  ["3 analistas Tier 1", "$180,000/año"],
                  ["2 analistas Tier 2", "$160,000/año"],
                  ["1 manager SOC", "$95,000/año"],
                  ["Herramientas SIEM + EDR", "$60,000/año"],
                  ["Capacitación anual", "$25,000/año"],
                ].map(([item, cost]) => (
                  <div key={item} className="flex justify-between items-center text-sm">
                    <span className="text-[#9CA3AF]">{item}</span>
                    <span className="text-[#FF3366] font-semibold">{cost}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#FF3366]/30 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold">Total anual</span>
                  <span className="text-3xl font-black text-[#FF3366]">$520,000</span>
                </div>
                <p className="text-xs text-[#9CA3AF] mt-2">*Sin contar rotación de personal, overhead de RRHH</p>
              </div>
            </motion.div>

            {/* qatech360 MDR */}
            <motion.div
              className="rounded-2xl p-8 border border-[#00FF88]/30 bg-[#00FF88]/5 relative overflow-hidden"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-4 right-4">
                <span className="badge badge-accent">Recomendado</span>
              </div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#00FF88]/20 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00FF88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                </div>
                <h3 className="text-white font-bold text-lg">qatech360 MDR</h3>
              </div>
              <div className="space-y-3 mb-6">
                {[
                  ["SOC 24/7 completo", "Incluido"],
                  ["Threat hunting proactivo", "Incluido"],
                  ["SIEM + EDR enterprise", "Incluido"],
                  ["Respuesta a incidentes", "Incluido"],
                  ["Reportes ejecutivos", "Incluido"],
                ].map(([item, cost]) => (
                  <div key={item} className="flex justify-between items-center text-sm">
                    <span className="text-[#9CA3AF]">{item}</span>
                    <span className="text-[#00FF88] font-semibold flex items-center gap-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                      {cost}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#00FF88]/30 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold">Desde</span>
                  <div className="text-right">
                    <div className="text-3xl font-black text-[#00FF88]">$8</div>
                    <div className="text-xs text-[#9CA3AF]">por empleado / mes</div>
                  </div>
                </div>
                <p className="text-xs text-[#9CA3AF] mt-2">*Empresa de 100 empleados = $800/mes = $9,600/año</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-3 glass rounded-full px-8 py-4 border border-[#00FF88]/30">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00FF88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
              <span className="text-white font-bold text-lg">Ahorro promedio: <span className="text-[#00FF88] text-2xl font-black">$510,400/año</span></span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 24/7 COVERAGE ─────────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="section-container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-display-md font-bold text-white mb-4">
              Cobertura <span className="text-gradient-primary">24/7/365</span> global
            </h2>
            <p className="text-[#9CA3AF] max-w-xl mx-auto">
              Tres centros operativos para cobertura sin brechas. Turnos rotativos que garantizan analistas frescos en cada guardia.
            </p>
          </motion.div>

          {/* World map SVG */}
          <motion.div
            className="glass rounded-2xl p-8 border border-[#374151]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <svg viewBox="0 0 800 380" className="w-full max-w-4xl mx-auto" aria-label="Global coverage map">
              {/* Simplified world outline */}
              <rect width="800" height="380" fill="#0A0A0A" rx="12" />
              <text x="400" y="190" textAnchor="middle" fill="#1F2937" fontSize="120" fontWeight="900" opacity="0.15">LATAM</text>

              {/* Grid lines */}
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <line key={`h${i}`} x1="0" y1={i * 60} x2="800" y2={i * 60} stroke="#1F2937" strokeWidth="0.5" />
              ))}
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                <line key={`v${i}`} x1={i * 66} y1="0" x2={i * 66} y2="380" stroke="#1F2937" strokeWidth="0.5" />
              ))}

              {/* SOC Locations */}
              {[
                { x: 200, y: 180, label: "CDMX", time: "UTC-6", color: "#0070F3" },
                { x: 370, y: 230, label: "Bogotá", time: "UTC-5", color: "#00D4FF" },
                { x: 450, y: 280, label: "São Paulo", time: "UTC-3", color: "#00FF88" },
              ].map((loc) => (
                <g key={loc.label}>
                  <motion.circle
                    cx={loc.x} cy={loc.y} r="24"
                    fill={`${loc.color}15`}
                    stroke={loc.color}
                    strokeWidth="1"
                    animate={{ r: [24, 36, 24], opacity: [0.6, 0.2, 0.6] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <circle cx={loc.x} cy={loc.y} r="8" fill={loc.color} />
                  <text x={loc.x} y={loc.y - 30} textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="700">{loc.label}</text>
                  <text x={loc.x} y={loc.y - 16} textAnchor="middle" fill="#9CA3AF" fontSize="10">{loc.time}</text>
                </g>
              ))}

              {/* Connection lines */}
              <line x1="200" y1="180" x2="370" y2="230" stroke="#0070F3" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
              <line x1="370" y1="230" x2="450" y2="280" stroke="#00D4FF" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
            </svg>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
              {[
                { shift: "Turno Día", hours: "06:00 – 14:00", analysts: 4, color: "#FFD700" },
                { shift: "Turno Tarde", hours: "14:00 – 22:00", analysts: 4, color: "#0070F3" },
                { shift: "Turno Noche", hours: "22:00 – 06:00", analysts: 3, color: "#00D4FF" },
              ].map((s) => (
                <div key={s.shift} className="bg-[#111827] rounded-xl p-4 border border-[#374151] text-center">
                  <div className="text-sm font-semibold" style={{ color: s.color }}>{s.shift}</div>
                  <div className="text-white font-bold mt-1">{s.hours}</div>
                  <div className="text-[#9CA3AF] text-sm mt-1">{s.analysts} analistas activos</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ONBOARDING ────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#111827]/50">
        <div className="section-container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-display-md font-bold text-white mb-4">
              Operacional en <span className="text-gradient-accent">72 horas</span>
            </h2>
            <p className="text-[#9CA3AF] max-w-xl mx-auto">
              Proceso de onboarding más rápido del mercado. Sin meses de implementación, sin consultores externos.
            </p>
          </motion.div>
          <div className="relative">
            <div className="hidden md:block absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#374151] to-transparent" />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {onboardingSteps.map((step, i) => (
                <motion.div
                  key={step.step}
                  className="relative text-center"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div
                    className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-black border-2 relative z-10"
                    style={{ backgroundColor: `${step.color}20`, borderColor: step.color, color: step.color }}
                  >
                    {step.step}
                  </div>
                  <div className="glass rounded-xl p-4 border border-[#374151]">
                    <div className="badge badge-primary mb-2 mx-auto" style={{ display: "inline-flex" }}>{step.time}</div>
                    <h3 className="text-white font-bold text-sm mb-2">{step.title}</h3>
                    <p className="text-[#9CA3AF] text-xs leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-20">
        <div className="section-container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-display-md font-bold text-white mb-4">
              Precios <span className="text-gradient-primary">MDR transparentes</span>
            </h2>
            <p className="text-[#9CA3AF] max-w-xl mx-auto">Sin cargos ocultos. Sin compromisos mínimos de 3 años. Sin sorpresas.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "MDR Essentials",
                price: "$8",
                unit: "/ empleado / mes",
                desc: "Para equipos de hasta 250 personas",
                color: "#0070F3",
                features: ["EDR gestionado 24/7", "SIEM cloud incluido", "Respuesta a incidentes Tier 1", "SLA crítico < 30 min", "Reporte mensual ejecutivo"],
                cta: "Empezar prueba gratis",
              },
              {
                name: "MDR Pro",
                price: "$14",
                unit: "/ empleado / mes",
                desc: "Para empresas medianas 250–2,000",
                color: "#00D4FF",
                highlight: true,
                features: ["Todo en Essentials", "Threat hunting proactivo", "SLA crítico < 15 min", "CISO virtual mensual", "Inteligencia de amenazas", "API para integraciones"],
                cta: "Solicitar demo",
              },
              {
                name: "MDR Enterprise",
                price: "Custom",
                unit: "",
                desc: "Grandes empresas y grupos corporativos",
                color: "#00FF88",
                features: ["Todo en Pro", "Analista dedicado", "SLA crítico < 5 min", "Data residency LATAM", "Red team trimestral", "SLAs contractuales personalizados"],
                cta: "Hablar con ventas",
              },
            ].map((plan, i) => (
              <motion.div
                key={plan.name}
                className={`rounded-2xl p-8 border ${plan.highlight ? "border-[#00D4FF]/50 shadow-glow-cyan" : "border-[#374151]"} bg-[#111827] relative overflow-hidden`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                {plan.highlight && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0070F3] to-[#00D4FF]" />
                )}
                {plan.highlight && (
                  <div className="absolute top-4 right-4">
                    <span className="badge badge-primary">Popular</span>
                  </div>
                )}
                <h3 className="text-white font-bold text-xl mb-2">{plan.name}</h3>
                <p className="text-[#9CA3AF] text-sm mb-6">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-5xl font-black" style={{ color: plan.color }}>{plan.price}</span>
                  <span className="text-[#9CA3AF] text-sm ml-1">{plan.unit}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[#9CA3AF]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00FF88" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={plan.highlight ? "btn-primary w-full justify-center" : "btn-secondary w-full justify-center"}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-b from-[#111827]/50 to-[#0A0A0A]">
        <div className="section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-display-md font-bold text-white mb-6">
              ¿Sigues sin SOC? <span className="text-gradient-danger">Cada minuto cuenta.</span>
            </h2>
            <p className="text-[#9CA3AF] text-xl mb-8 max-w-xl mx-auto">
              El tiempo promedio de detección sin MDR es de <strong className="text-white">197 días</strong>. Con qatech360: 11 minutos.
            </p>
            <Link href="/contact" className="btn-primary text-lg px-10 py-5">
              Activar SOC — Gratis 30 días
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
