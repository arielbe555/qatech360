"use client";
import { motion, AnimatePresence } from "framer-motion";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { useState, useEffect } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const integrations = [
  { name: "AWS CloudTrail", color: "#FF9900", abbr: "AWS" },
  { name: "Microsoft Azure", color: "#0078D4", abbr: "Azure" },
  { name: "Google Cloud", color: "#4285F4", abbr: "GCP" },
  { name: "Office 365", color: "#D83B01", abbr: "O365" },
  { name: "Fortinet", color: "#EE3124", abbr: "FTN" },
  { name: "Cisco ASA / FTD", color: "#1BA0D7", abbr: "Cisco" },
  { name: "Palo Alto NGFW", color: "#FA5A1F", abbr: "PA" },
  { name: "Crowd... (EDR)", color: "#E82127", abbr: "CS" },
  { name: "Okta IAM", color: "#007DC1", abbr: "Okta" },
  { name: "Splunk (forward)", color: "#FF6D00", abbr: "SPL" },
  { name: "Windows Event", color: "#00BCF2", abbr: "WEV" },
  { name: "Linux Syslog", color: "#F7C948", abbr: "SYS" },
  { name: "Kubernetes", color: "#326CE5", abbr: "K8s" },
  { name: "Cloudflare", color: "#F48120", abbr: "CF" },
  { name: "Zscaler", color: "#005DAB", abbr: "ZSC" },
  { name: "ServiceNow", color: "#81B5A1", abbr: "SNow" },
];

const useCases = [
  {
    title: "Ransomware Stage Detection",
    before: "El equipo de seguridad recibe una llamada de IT a los 3 días. El backup fue cifrado.",
    after: "SIEM detecta los 6 pasos del kill chain en tiempo real. Contención automática en T+87ms.",
    icon: "🔴",
  },
  {
    title: "Credential Stuffing Attack",
    before: "15,000 intentos de login pasan desapercibidos. Un atacante accede a 40 cuentas.",
    after: "Motor de correlación detecta la anomalía en el minuto 1. IP bloqueada, cuentas protegidas.",
    icon: "🔑",
  },
  {
    title: "Insider Threat — Data Exfil",
    before: "Un empleado extrae 50GB de datos durante semanas sin que nadie lo note.",
    after: "UEBA detecta desviación del baseline en el día 1. DLP alert + manager notificado.",
    icon: "👤",
  },
  {
    title: "Supply Chain Compromise",
    before: "Librería maliciosa en producción durante 30 días. Se descubre por un cliente.",
    after: "Behavioral analysis detecta el C2 callback en el primer build. Rollback inmediato.",
    icon: "📦",
  },
];

const retentionPlans = [
  {
    name: "Starter",
    retention: "30 días hot",
    events: "500M/día",
    search: "< 2s",
    price: "Consultar",
    featured: false,
  },
  {
    name: "Professional",
    retention: "90 días hot + 1 año cold",
    events: "5B/día",
    search: "< 1s",
    price: "Consultar",
    featured: true,
  },
  {
    name: "Enterprise",
    retention: "1 año hot + 7 años cold",
    events: "Ilimitado",
    search: "< 500ms",
    price: "Consultar",
    featured: false,
  },
];

export default function SiemPage() {
  const [barHeights, setBarHeights] = useState([40, 65, 30, 80, 55, 70, 45, 90, 60, 75, 35, 85]);
  const [alertPulse, setAlertPulse] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setBarHeights((prev) => prev.map(() => 25 + Math.floor(Math.random() * 70)));
      setAlertPulse((p) => !p);
    }, 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <main className="bg-[#0A0A0A] min-h-screen">
      <NavBar />

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero-radial" />
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.03]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp} className="mb-6">
                <span className="badge badge-primary">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0070F3] animate-pulse" />
                  qatech360 SIEM
                </span>
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight mb-6">
                El SIEM que Splunk
                <br />
                <span className="text-gradient-primary">debería haber sido</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-[#9CA3AF] text-lg leading-relaxed mb-10 max-w-xl">
                Ingesta unificada de 150+ fuentes, correlación en tiempo real con IA
                y búsqueda 150x más rápida que Splunk. Sin licencias por volumen.
                Sin sorpresas en la factura.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                <Link href="/contact" className="btn-primary">
                  Solicitar demo SIEM
                </Link>
                <Link href="/platform" className="btn-secondary">
                  Calcular ROI
                </Link>
              </motion.div>
              <motion.div variants={fadeUp} className="flex gap-8 mt-10">
                {[
                  { val: "150x", label: "Más rápido que Splunk" },
                  { val: "150+", label: "Integraciones nativas" },
                  { val: "< 1s", label: "Latencia de búsqueda" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-bold text-gradient-primary">{s.val}</div>
                    <div className="text-xs text-[#6B7280] mt-0.5">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* SIEM Dashboard Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="bg-[#111827] border border-[#374151] rounded-2xl overflow-hidden shadow-glow-primary">
                {/* Topbar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-[#374151] bg-[#0D1117]">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#FF3366]" />
                    <div className="w-3 h-3 rounded-full bg-[#FF6B00]" />
                    <div className="w-3 h-3 rounded-full bg-[#00FF88]" />
                  </div>
                  <span className="text-xs text-[#6B7280] ml-2 font-mono">qatech360 SIEM Dashboard</span>
                  <div className="ml-auto flex items-center gap-3">
                    <span className="text-xs text-[#6B7280] font-mono">Últimas 24h</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 border-b border-[#374151]">
                  {[
                    { label: "Eventos ingeridos", val: "4.7B", color: "#0070F3" },
                    { label: "Alertas generadas", val: "847", color: "#FF6B00" },
                    { label: "Incidentes críticos", val: "3", color: "#FF3366" },
                  ].map((s) => (
                    <div key={s.label} className="p-4 border-r border-[#374151] last:border-r-0 text-center">
                      <div className="text-2xl font-bold font-mono" style={{ color: s.color }}>{s.val}</div>
                      <div className="text-xs text-[#6B7280]">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Bar chart */}
                <div className="p-4">
                  <div className="text-xs text-[#6B7280] font-mono mb-3">EVENTOS POR HORA (últimas 12h)</div>
                  <div className="flex items-end gap-1 h-20">
                    {barHeights.map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t transition-all duration-700"
                        style={{
                          height: `${h}%`,
                          background: `linear-gradient(to top, #0070F3, #00D4FF)`,
                          opacity: i === barHeights.length - 1 ? 1 : 0.6,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Alert list */}
                <div className="px-4 pb-4 space-y-2">
                  {[
                    { sev: "CRITICAL", msg: "Multiple failed logins — admin@corp.com", src: "Office 365" },
                    { sev: "HIGH", msg: "Outbound DNS tunneling detected", src: "Cisco FW" },
                    { sev: "MEDIUM", msg: "New S3 bucket made public", src: "AWS CloudTrail" },
                  ].map((a, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-2 rounded-lg text-xs"
                      style={{
                        background: alertPulse && i === 0 ? "rgba(255,51,102,0.08)" : "transparent",
                        border: "1px solid #1F2937",
                      }}
                    >
                      <span
                        className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                        style={{
                          background: i === 0 ? "rgba(255,51,102,0.15)" : i === 1 ? "rgba(255,107,0,0.15)" : "rgba(0,112,243,0.15)",
                          color: i === 0 ? "#FF3366" : i === 1 ? "#FF6B00" : "#60A5FA",
                        }}
                      >
                        {a.sev}
                      </span>
                      <span className="text-[#9CA3AF] truncate flex-1">{a.msg}</span>
                      <span className="text-[#374151] shrink-0">{a.src}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── INGESTA UNIVERSAL ── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-section" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp}>
              <span className="badge badge-accent mb-4">Ingesta universal</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-bold mb-4">
              Conecta{" "}
              <span className="text-gradient-primary">todo tu stack</span>
              {" "}en minutos
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#9CA3AF] text-lg max-w-2xl mx-auto">
              150+ conectores nativos pre-configurados. Normalización automática a esquema ECS.
              Sin parsers personalizados ni configuración manual.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {integrations.map((integ, i) => (
              <motion.div
                key={integ.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="bg-[#111827] border border-[#374151] rounded-xl p-3 flex flex-col items-center justify-center gap-2 hover:border-opacity-60 transition-all cursor-pointer aspect-square"
                style={{ borderColor: `${integ.color}30` }}
                whileHover={{ borderColor: integ.color, scale: 1.05 }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold font-mono"
                  style={{ background: `${integ.color}20`, color: integ.color }}
                >
                  {integ.abbr}
                </div>
                <span className="text-[9px] text-[#6B7280] text-center leading-tight">{integ.name}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <Link href="/contact" className="btn-ghost text-[#9CA3AF]">
              Ver todas las 150+ integraciones →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── MOTOR DE CORRELACIÓN ── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.025]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp}>
              <span className="badge badge-primary mb-4">Motor de correlación</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl font-bold mb-4">
              De datos crudos a{" "}
              <span className="text-gradient-primary">inteligencia accionable</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-center">
            {[
              {
                step: "1",
                title: "Ingesta",
                desc: "Logs raw de 150+ fuentes, cualquier formato",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
                    <path d="M20 16V7a2 2 0 00-2-2H6a2 2 0 00-2 2v9m16 0l-4-4m4 4l-4 4M4 16l4-4m-4 4l4 4" stroke="#0070F3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                color: "#0070F3",
              },
              {
                step: "2",
                title: "Normalización",
                desc: "ECS schema — campo estandarizado en < 10ms",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
                    <path d="M4 6h16M4 12h16M4 18h10" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ),
                color: "#00D4FF",
              },
              {
                step: "3",
                title: "Enriquecimiento",
                desc: "CTI + GeoIP + Asset DB + User context",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
                    <circle cx="12" cy="12" r="10" stroke="#00FF88" strokeWidth="1.5" />
                    <path d="M12 8v4l3 2" stroke="#00FF88" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ),
                color: "#00FF88",
              },
              {
                step: "4",
                title: "Correlación IA",
                desc: "Reglas + ML models + MITRE mapping en paralelo",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
                    <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" stroke="#FF6B00" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                ),
                color: "#FF6B00",
              },
              {
                step: "5",
                title: "Alerta & Acción",
                desc: "Ticket + notificación + respuesta automática",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="#FF3366" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M22 4L12 14.01l-3-3" stroke="#FF3366" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ),
                color: "#FF3366",
              },
            ].map((node, i) => (
              <div key={node.step} className="flex flex-col items-center relative">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="bg-[#111827] border border-[#374151] rounded-2xl p-5 text-center w-full"
                  style={{ borderColor: `${node.color}30` }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-4"
                    style={{ background: `${node.color}15` }}
                  >
                    {node.icon}
                  </div>
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mx-auto mb-2"
                    style={{ background: node.color }}
                  >
                    {node.step}
                  </div>
                  <h3 className="font-bold mb-2">{node.title}</h3>
                  <p className="text-xs text-[#6B7280] leading-relaxed">{node.desc}</p>
                </motion.div>
                {i < 4 && (
                  <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
                    <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                      <path d="M3 10h14M12 4l6 6-6 6" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VELOCIDAD vs SPLUNK ── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-section" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp}>
              <span className="badge badge-warning mb-4">Benchmark de velocidad</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl font-bold mb-4">
              <span className="text-gradient-primary">150x más rápido</span> que Splunk
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#9CA3AF] max-w-xl mx-auto">
              Búsqueda sobre 1 billón de eventos. Arquitectura columnar distribuida con
              compresión inteligente y caché predictivo.
            </motion.p>
          </motion.div>

          <div className="space-y-5">
            {[
              { product: "qatech360 SIEM", time: 0.8, unit: "segundos", color: "#0070F3", pct: 1 },
              { product: "Elastic SIEM", time: 45, unit: "segundos", color: "#00D4FF", pct: 30 },
              { product: "Microsoft Sentinel", time: 78, unit: "segundos", color: "#9CA3AF", pct: 52 },
              { product: "Splunk Enterprise", time: 120, unit: "segundos", color: "#FF6B00", pct: 80 },
            ].map((row, i) => (
              <motion.div
                key={row.product}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-44 text-sm font-medium text-right shrink-0">{row.product}</div>
                <div className="flex-1 bg-[#111827] rounded-full h-10 overflow-hidden border border-[#374151]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${row.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: i * 0.15, ease: "easeOut" }}
                    className="h-full rounded-full flex items-center px-4"
                    style={{ background: `linear-gradient(90deg, ${row.color}90, ${row.color})`, minWidth: "80px" }}
                  >
                    <span className="text-sm font-bold text-white">{row.time}s</span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-xs text-[#6B7280] mt-6 text-center">
            * Búsqueda full-text sobre 1B eventos en entorno AWS EC2 idéntico. Benchmark independiente Q3 2024.
          </p>
        </div>
      </section>

      {/* ── USE CASES ── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.025]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp}>
              <span className="badge badge-danger mb-4">Casos de uso reales</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl font-bold mb-4">
              Antes y después{" "}
              <span className="text-gradient-primary">con qatech360 SIEM</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {useCases.map((uc, i) => (
              <motion.div
                key={uc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#111827] border border-[#374151] rounded-2xl overflow-hidden"
              >
                <div className="flex items-center gap-3 p-5 border-b border-[#374151]">
                  <span className="text-2xl">{uc.icon}</span>
                  <h3 className="font-bold text-lg">{uc.title}</h3>
                </div>
                <div className="grid grid-cols-2 divide-x divide-[#374151]">
                  <div className="p-5">
                    <div className="text-xs font-bold text-[#FF3366] uppercase tracking-wider mb-3">Sin qatech360</div>
                    <p className="text-sm text-[#9CA3AF] leading-relaxed">{uc.before}</p>
                  </div>
                  <div className="p-5 bg-[#0070F3]/5">
                    <div className="text-xs font-bold text-[#00FF88] uppercase tracking-wider mb-3">Con qatech360</div>
                    <p className="text-sm text-[#9CA3AF] leading-relaxed">{uc.after}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RETENTION PLANS ── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-section" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp}>
              <span className="badge badge-accent mb-4">Retención de datos</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl font-bold mb-4">
              Retención flexible,{" "}
              <span className="text-gradient-primary">precios transparentes</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#9CA3AF] max-w-xl mx-auto">
              Sin cargos por volumen de eventos. Precio mensual predecible.
              El fin de las facturas de Splunk de 6 cifras.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {retentionPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="badge badge-primary">Más popular</span>
                  </div>
                )}
                <div
                  className="bg-[#111827] border rounded-2xl p-7 h-full"
                  style={{
                    borderColor: plan.featured ? "#0070F3" : "#374151",
                    boxShadow: plan.featured ? "0 0 40px rgba(0,112,243,0.15)" : "none",
                  }}
                >
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-3xl font-extrabold text-gradient-primary mb-6">
                    {plan.price}
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: "Retención", val: plan.retention },
                      { label: "Eventos/día", val: plan.events },
                      { label: "Velocidad búsqueda", val: plan.search },
                    ].map((row) => (
                      <div key={row.label} className="flex justify-between text-sm border-b border-[#1F2937] pb-2">
                        <span className="text-[#6B7280]">{row.label}</span>
                        <span className="font-medium">{row.val}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/contact"
                    className={`mt-6 w-full text-center block py-3 rounded-xl font-semibold transition-all ${plan.featured ? "btn-primary" : "btn-secondary"}`}
                  >
                    Solicitar información
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero-radial opacity-50" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-bold mb-6">
              Deja de pagar de más.
              <br />
              <span className="text-gradient-primary">Empieza a ver más.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#9CA3AF] text-lg mb-10 max-w-2xl mx-auto">
              Migración desde Splunk, QRadar o Elastic en menos de 48 horas.
              Nuestro equipo de ingeniería te acompaña en cada paso.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                Solicitar información
              </Link>
              <Link href="/contact" className="btn-secondary text-lg px-8 py-4">
                Comparar con Splunk
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
