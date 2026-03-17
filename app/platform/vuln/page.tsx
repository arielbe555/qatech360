"use client";
import { motion, useInView } from "framer-motion";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = (target / duration) * 16;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <circle cx="11" cy="11" r="8" stroke="#0070F3" strokeWidth="1.5" />
        <path d="M21 21l-4.35-4.35" stroke="#0070F3" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M11 8v3l2 2" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Detección de CVEs",
    desc: "Base de datos actualizada cada 6 horas con NVD + OSV. Más de 50,000 CVEs indexados y correlacionados con tus activos en tiempo real.",
    color: "#0070F3",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path d="M18 20V10M12 20V4M6 20v-6" stroke="#00FF88" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="18" cy="7" r="3" fill="#00FF8822" stroke="#00FF88" strokeWidth="1.5" />
      </svg>
    ),
    title: "Scoring CVSS 3.1",
    desc: "Puntuación estándar CVSS 3.1 con vector de ataque completo: AV, AC, PR, UI, S, C, I, A. Clasificación automática por criticidad.",
    color: "#00FF88",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" stroke="#FFB800" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    title: "Priorización EPSS",
    desc: "Integración con EPSS (Exploit Prediction Scoring System) para priorizar CVEs por probabilidad real de explotación activa en la naturaleza.",
    color: "#FFB800",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="#00D4FF" strokeWidth="1.5" />
        <path d="M9 12l2 2 4-4" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 9h18" stroke="#00D4FF" strokeWidth="1.5" opacity="0.4" />
      </svg>
    ),
    title: "Tickets auto en Jira",
    desc: "Creación automática de tickets de remediación en Jira o ServiceNow con CVE ID, severidad, activo afectado y pasos de corrección en español.",
    color: "#00D4FF",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <rect x="2" y="3" width="20" height="14" rx="2" stroke="#0070F3" strokeWidth="1.5" />
        <path d="M8 21h8M12 17v4" stroke="#0070F3" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M6 8h4M6 11h8" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      </svg>
    ),
    title: "Dashboard ejecutivo",
    desc: "Resumen ejecutivo de riesgo con tendencias mensuales, distribución por severidad y porcentaje de activos sin parche. Exportable a PDF.",
    color: "#0070F3",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#FF3B3B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13.73 21a2 2 0 01-3.46 0" stroke="#FF3B3B" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="18" cy="5" r="3" fill="#FF3B3B" opacity="0.9" />
      </svg>
    ),
    title: "Alertas zero-day",
    desc: "Notificación inmediata cuando se publica un CVE crítico que afecta a tus activos. Alerta push, email y Slack antes de que el parche exista.",
    color: "#FF3B3B",
  },
];

const severityLevels = [
  { label: "Crítica", range: "CVSS 9.0–10.0", color: "#FF3B3B", bg: "#FF3B3B22", width: "85%", count: 12 },
  { label: "Alta", range: "CVSS 7.0–8.9", color: "#FFB800", bg: "#FFB80022", width: "65%", count: 34 },
  { label: "Media", range: "CVSS 4.0–6.9", color: "#0070F3", bg: "#0070F322", width: "50%", count: 87 },
  { label: "Baja", range: "CVSS 0.1–3.9", color: "#00FF88", bg: "#00FF8822", width: "35%", count: 143 },
];

const platforms = [
  {
    name: "Windows",
    versions: "Server 2016/2019/2022, Win 10/11",
    color: "#0070F3",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path d="M3 5.5L10.5 4.5V11.5H3V5.5Z" fill="#0070F3" opacity="0.8" />
        <path d="M11.5 4.35L21 3V11.5H11.5V4.35Z" fill="#0070F3" />
        <path d="M3 12.5H10.5V19.5L3 18.5V12.5Z" fill="#0070F3" opacity="0.8" />
        <path d="M11.5 12.5H21V21L11.5 19.65V12.5Z" fill="#0070F3" />
      </svg>
    ),
  },
  {
    name: "Linux",
    versions: "Debian, Ubuntu, RHEL, CentOS, Amazon Linux",
    color: "#FFB800",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <circle cx="12" cy="8" r="4" stroke="#FFB800" strokeWidth="1.5" />
        <path d="M8 12c-2 1-3 3-3 5h14c0-2-1-4-3-5" stroke="#FFB800" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="9" cy="7" r="1" fill="#FFB800" />
        <circle cx="15" cy="7" r="1" fill="#FFB800" />
        <path d="M10 9.5c.5.5 1 .7 2 .7s1.5-.2 2-.7" stroke="#FFB800" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "macOS",
    versions: "Ventura, Sonoma, Sequoia",
    color: "#9CA3AF",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path d="M12 3C8 3 5 6 5 10c0 5 4 9 7 11 3-2 7-6 7-11 0-4-3-7-7-7z" stroke="#9CA3AF" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M12 7c-1.5 0-3 1.5-3 3s1.5 3 3 3 3-1.5 3-3-1.5-3-3-3z" stroke="#9CA3AF" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    name: "Contenedores",
    versions: "Docker, Kubernetes, OpenShift",
    color: "#00D4FF",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <rect x="2" y="10" width="4" height="4" rx="0.5" fill="#00D4FF" opacity="0.7" />
        <rect x="7" y="10" width="4" height="4" rx="0.5" fill="#00D4FF" opacity="0.85" />
        <rect x="12" y="10" width="4" height="4" rx="0.5" fill="#00D4FF" />
        <rect x="7" y="5" width="4" height="4" rx="0.5" fill="#00D4FF" opacity="0.6" />
        <rect x="12" y="5" width="4" height="4" rx="0.5" fill="#00D4FF" opacity="0.75" />
        <path d="M2 16h20M18 14c1.5-.5 3-1.5 3-3" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      </svg>
    ),
  },
];

const integrations = [
  {
    name: "Jira",
    desc: "Tickets automáticos por CVE",
    color: "#0070F3",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M12 2L2 12l10 10 10-10L12 2z" stroke="#0070F3" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M12 7l-5 5 5 5" stroke="#0070F3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "ServiceNow",
    desc: "ITSM integrado",
    color: "#00FF88",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <circle cx="12" cy="12" r="9" stroke="#00FF88" strokeWidth="1.5" />
        <path d="M8 12h8M12 8v8" stroke="#00FF88" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Tenable",
    desc: "Correlación de escaneos",
    color: "#FFB800",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M12 3l9 5v8l-9 5-9-5V8l9-5z" stroke="#FFB800" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="3" stroke="#FFB800" strokeWidth="1.5" />
      </svg>
    ),
  },
];

const complianceFrameworks = [
  {
    name: "PCI-DSS",
    req: "Requisito 6.3",
    desc: "Gestión de vulnerabilidades de software y sistemas",
    color: "#0070F3",
  },
  {
    name: "ISO 27001",
    req: "A.12.6.1",
    desc: "Gestión de vulnerabilidades técnicas",
    color: "#00D4FF",
  },
  {
    name: "SOC 2",
    req: "CC7.1",
    desc: "Evaluación de vulnerabilidades de sistemas",
    color: "#00FF88",
  },
  {
    name: "NIST",
    req: "ID.RA-1",
    desc: "Identificación de vulnerabilidades de activos",
    color: "#FFB800",
  },
];

const scanSteps = [
  { step: "01", label: "Escanear", desc: "Agente ligero detecta paquetes instalados", color: "#0070F3" },
  { step: "02", label: "Detectar", desc: "Cruza con base CVE actualizada cada 6h", color: "#00D4FF" },
  { step: "03", label: "Puntuar", desc: "CVSS 3.1 + EPSS calculados por activo", color: "#FFB800" },
  { step: "04", label: "Remediar", desc: "Ticket automático + guía de corrección", color: "#00FF88" },
];

export default function VulnPage() {
  const [activeSeverity, setActiveSeverity] = useState<number | null>(null);

  return (
    <main className="bg-[#0A0A0A] min-h-screen">
      <NavBar />

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,112,243,0.12)_0%,transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#FF3B3B] rounded-full opacity-[0.03] blur-[120px]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp} className="mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#FFB80015] text-[#FFB800] border border-[#FFB80030]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFB800] animate-pulse" />
                  Escaneo continuo 24/7
                </span>
              </motion.div>
              <motion.h1
                variants={fadeUp}
                className="text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight mb-6"
              >
                Gestión de{" "}
                <span className="bg-gradient-to-r from-[#FF3B3B] to-[#FFB800] bg-clip-text text-transparent">
                  Vulnerabilidades
                </span>
                <br />
                antes que el atacante
              </motion.h1>
              <motion.p variants={fadeUp} className="text-[#A0A0A0] text-lg leading-relaxed mb-10 max-w-xl">
                Detecta CVEs en todos tus endpoints de forma continua. Prioriza por
                CVSS 3.1 y probabilidad real de explotación (EPSS). Recibe guía de
                remediación en español con tiempo estimado de corrección.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                <Link
                  href="/trial"
                  className="inline-flex items-center gap-2 bg-[#0070F3] hover:bg-[#0050D0] text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(0,112,243,0.3)] hover:shadow-[0_0_40px_rgba(0,112,243,0.5)]"
                >
                  Detecta tus vulnerabilidades ahora
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-2 border border-[#2A2A2A] hover:border-[#0070F3] text-[#A0A0A0] hover:text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200"
                >
                  Ver demo en vivo
                </Link>
              </motion.div>
              <motion.div variants={fadeUp} className="flex gap-8 mt-10">
                {[
                  { val: "50K+", label: "CVEs indexados" },
                  { val: "6h", label: "Ciclo de actualización" },
                  { val: "EPSS", label: "Priorización inteligente" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-bold bg-gradient-to-r from-[#FF3B3B] to-[#FFB800] bg-clip-text text-transparent">{s.val}</div>
                    <div className="text-xs text-[#666666] mt-0.5">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Dashboard mockup */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(255,59,59,0.08)]">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-[#2A2A2A] bg-[#0A0A0A]">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#FF3B3B]" />
                    <div className="w-3 h-3 rounded-full bg-[#FFB800]" />
                    <div className="w-3 h-3 rounded-full bg-[#00FF88]" />
                  </div>
                  <span className="text-xs text-[#666666] ml-2 font-mono">qatech360 — Vulnerability Console</span>
                  <div className="ml-auto flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFB800] animate-pulse" />
                    <span className="text-xs text-[#FFB800] font-mono">SCANNING</span>
                  </div>
                </div>
                <div className="grid grid-cols-4 border-b border-[#2A2A2A]">
                  {[
                    { label: "Activos", val: "1,204", color: "#A0A0A0" },
                    { label: "CVEs activos", val: "276", color: "#FFB800" },
                    { label: "Críticos", val: "12", color: "#FF3B3B" },
                    { label: "Parcheados hoy", val: "8", color: "#00FF88" },
                  ].map((s) => (
                    <div key={s.label} className="p-3 border-r border-[#2A2A2A] last:border-r-0">
                      <div className="text-lg font-bold font-mono" style={{ color: s.color }}>{s.val}</div>
                      <div className="text-xs text-[#666666]">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="p-4 space-y-2">
                  <div className="text-xs text-[#666666] font-mono mb-3">TOP VULNERABILIDADES — PRIORIDAD</div>
                  {[
                    { cve: "CVE-2024-3094", score: "10.0", pkg: "xz-utils 5.6.0", epss: "94%", sev: "CRÍTICA" },
                    { cve: "CVE-2024-21762", score: "9.6", pkg: "FortiOS SSL-VPN", epss: "87%", sev: "CRÍTICA" },
                    { cve: "CVE-2024-1709", score: "9.8", pkg: "ConnectWise ScreenConnect", epss: "82%", sev: "CRÍTICA" },
                  ].map((v) => (
                    <div key={v.cve} className="flex items-center gap-3 p-3 rounded-lg bg-[#0A0A0A] border border-[#1A1A1A]">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FF3B3B20] text-[#FF3B3B] border border-[#FF3B3B30] shrink-0">
                        {v.sev}
                      </span>
                      <span className="text-xs font-mono text-[#00D4FF] shrink-0">{v.cve}</span>
                      <span className="text-xs text-[#666666] truncate">{v.pkg}</span>
                      <div className="ml-auto flex items-center gap-2 shrink-0">
                        <span className="text-xs font-bold text-[#FF3B3B]">{v.score}</span>
                        <span className="text-[10px] text-[#FFB800]">EPSS {v.epss}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 pb-4">
                  <div className="text-xs text-[#666666] mb-2">Distribución por severidad</div>
                  <div className="space-y-1.5">
                    {severityLevels.map((s) => (
                      <div key={s.label} className="flex items-center gap-2">
                        <span className="text-[10px] text-[#666666] w-10 shrink-0">{s.label}</span>
                        <div className="flex-1 h-1.5 bg-[#1A1A1A] rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: s.width }}
                            transition={{ duration: 1.2, delay: 0.5 }}
                            className="h-full rounded-full"
                            style={{ background: s.color }}
                          />
                        </div>
                        <span className="text-[10px] font-mono shrink-0" style={{ color: s.color }}>{s.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[#111111]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { target: 50000, suffix: "+", label: "CVEs en base de datos", sub: "NVD + OSV sincronizados" },
              { target: 6, suffix: "h", label: "Ciclo de actualización", sub: "Base de datos CVE" },
              { target: 99, suffix: ".1%", label: "Cobertura CVSS 3.1", sub: "Todos los CVEs puntuados" },
              { target: 100, suffix: "%", label: "Evidencia automática", sub: "Para auditorías de cumplimiento" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-8 text-center hover:border-[#FFB800] transition-colors"
              >
                <div className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#FF3B3B] to-[#FFB800] bg-clip-text text-transparent mb-2">
                  <AnimatedNumber target={stat.target} suffix={stat.suffix} />
                </div>
                <div className="font-semibold mb-1 text-sm">{stat.label}</div>
                <div className="text-xs text-[#666666]">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA (SCAN FLOW) ── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#0070F315] text-[#0070F3] border border-[#0070F330] mb-4">
                Arquitectura de escaneo
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-bold mb-4">
              De la detección a la{" "}
              <span className="text-[#00FF88]">remediación</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
              Cuatro etapas automáticas desde el escaneo hasta el ticket de corrección.
              El agente es liviano y el análisis ocurre en la nube.
            </motion.p>
          </motion.div>

          {/* Flow diagram */}
          <div className="relative">
            <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[#0070F3] via-[#FFB800] to-[#00FF88]" />
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {scanSteps.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="flex flex-col items-center text-center"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 relative z-10 font-bold text-xl font-mono"
                    style={{ background: `${step.color}15`, border: `1px solid ${step.color}40`, color: step.color }}
                  >
                    {step.step}
                  </div>
                  <h3 className="font-bold text-base mb-2" style={{ color: step.color }}>{step.label}</h3>
                  <p className="text-xs text-[#666666] leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* SVG diagram */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-16 bg-[#111111] border border-[#2A2A2A] rounded-2xl p-8"
          >
            <svg viewBox="0 0 800 200" className="w-full h-auto">
              {/* Endpoint */}
              <rect x="20" y="60" width="140" height="80" rx="8" fill="#1A1A1A" stroke="#2A2A2A" strokeWidth="1" />
              <text x="90" y="90" textAnchor="middle" fill="#A0A0A0" fontSize="11" fontFamily="monospace">Endpoint</text>
              <text x="90" y="108" textAnchor="middle" fill="#666666" fontSize="9">agente Wazuh</text>
              <rect x="35" y="120" width="110" height="10" rx="2" fill="#0070F330" />
              <rect x="35" y="120" width="88" height="10" rx="2" fill="#0070F3" />

              {/* Arrow 1 */}
              <path d="M162 100 L210 100" stroke="#0070F3" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#arrowBlue)" />
              <defs>
                <marker id="arrowBlue" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#0070F3" />
                </marker>
                <marker id="arrowCyan" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#00D4FF" />
                </marker>
                <marker id="arrowAmber" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#FFB800" />
                </marker>
                <marker id="arrowGreen" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#00FF88" />
                </marker>
              </defs>

              {/* CVE DB */}
              <rect x="210" y="60" width="140" height="80" rx="8" fill="#1A1A1A" stroke="#00D4FF40" strokeWidth="1" />
              <text x="280" y="90" textAnchor="middle" fill="#00D4FF" fontSize="11" fontFamily="monospace">Base CVE</text>
              <text x="280" y="108" textAnchor="middle" fill="#666666" fontSize="9">50,000+ vulns</text>
              <circle cx="280" cy="125" r="8" fill="#00D4FF20" stroke="#00D4FF40" strokeWidth="1" />
              <text x="280" y="129" textAnchor="middle" fill="#00D4FF" fontSize="8">↻</text>

              {/* Arrow 2 */}
              <path d="M352 100 L400 100" stroke="#00D4FF" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#arrowCyan)" />

              {/* Scoring */}
              <rect x="400" y="60" width="140" height="80" rx="8" fill="#1A1A1A" stroke="#FFB80040" strokeWidth="1" />
              <text x="470" y="90" textAnchor="middle" fill="#FFB800" fontSize="11" fontFamily="monospace">CVSS + EPSS</text>
              <text x="470" y="108" textAnchor="middle" fill="#666666" fontSize="9">priorización IA</text>
              <text x="470" y="128" textAnchor="middle" fill="#FF3B3B" fontSize="9" fontWeight="bold">9.8 CRÍTICO</text>

              {/* Arrow 3 */}
              <path d="M542 100 L590 100" stroke="#FFB800" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#arrowAmber)" />

              {/* Ticket */}
              <rect x="590" y="60" width="160" height="80" rx="8" fill="#1A1A1A" stroke="#00FF8840" strokeWidth="1" />
              <text x="670" y="90" textAnchor="middle" fill="#00FF88" fontSize="11" fontFamily="monospace">Ticket + Guía</text>
              <text x="670" y="108" textAnchor="middle" fill="#666666" fontSize="9">Jira / ServiceNow</text>
              <rect x="605" y="118" width="130" height="8" rx="2" fill="#00FF8820" />
              <rect x="605" y="118" width="105" height="8" rx="2" fill="#00FF88" />

              {/* Labels */}
              <text x="90" y="160" textAnchor="middle" fill="#666666" fontSize="8">01 Escanear</text>
              <text x="280" y="160" textAnchor="middle" fill="#666666" fontSize="8">02 Detectar</text>
              <text x="470" y="160" textAnchor="middle" fill="#666666" fontSize="8">03 Puntuar</text>
              <text x="670" y="160" textAnchor="middle" fill="#666666" fontSize="8">04 Remediar</text>
            </svg>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURE GRID ── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[#111111]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#0070F315] text-[#0070F3] border border-[#0070F330] mb-4">
                Capacidades del módulo
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-bold mb-4">
              Todo lo que necesitas para{" "}
              <span className="text-[#0070F3]">gestionar el riesgo</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6 hover:border-opacity-60 transition-all duration-300 group"
                style={{ borderColor: `${feat.color}20` }}
                whileHover={{ borderColor: feat.color + "50", y: -4 }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: `${feat.color}12`, border: `1px solid ${feat.color}25` }}
                >
                  {feat.icon}
                </div>
                <h3 className="text-lg font-bold mb-3">{feat.title}</h3>
                <p className="text-[#A0A0A0] text-sm leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CVSS SEVERITY BREAKDOWN ── */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#FF3B3B15] text-[#FF3B3B] border border-[#FF3B3B30] mb-4">
                Sistema de priorización
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl font-bold mb-4">
              Visualización de severidad{" "}
              <span className="text-[#FFB800]">por CVSS</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#A0A0A0] max-w-2xl mx-auto">
              No todos los CVEs son iguales. Ordena tu backlog por riesgo real
              combinando CVSS 3.1 con la probabilidad de explotación EPSS.
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              {severityLevels.map((level, i) => (
                <motion.div
                  key={level.label}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => setActiveSeverity(activeSeverity === i ? null : i)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold w-14" style={{ color: level.color }}>{level.label}</span>
                      <span className="text-xs text-[#666666]">{level.range}</span>
                    </div>
                    <span className="text-sm font-bold font-mono" style={{ color: level.color }}>{level.count} CVEs</span>
                  </div>
                  <div className="h-3 bg-[#1A1A1A] rounded-full overflow-hidden border border-[#2A2A2A]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: level.width }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                      className="h-full rounded-full relative overflow-hidden"
                      style={{ background: `linear-gradient(90deg, ${level.color}, ${level.color}88)` }}
                    >
                      <div className="absolute inset-0 animate-pulse opacity-30" style={{ background: level.color }} />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Donut-style SVG visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex justify-center"
            >
              <svg viewBox="0 0 280 280" className="w-64 h-64">
                <circle cx="140" cy="140" r="100" fill="none" stroke="#1A1A1A" strokeWidth="28" />
                {/* Critical 12/276 = 15.6% → 98deg */}
                <circle cx="140" cy="140" r="100" fill="none" stroke="#FF3B3B" strokeWidth="28"
                  strokeDasharray="98 530" strokeDashoffset="530" transform="rotate(-90 140 140)" opacity="0.9">
                  <animate attributeName="stroke-dashoffset" from="530" to="432" dur="1.2s" fill="freeze" />
                </circle>
                {/* High 34/276 = 27.4% → 171deg */}
                <circle cx="140" cy="140" r="100" fill="none" stroke="#FFB800" strokeWidth="28"
                  strokeDasharray="171 530" strokeDashoffset="432" transform="rotate(-90 140 140)" opacity="0.85">
                  <animate attributeName="stroke-dashoffset" from="432" to="261" dur="1.2s" begin="0.2s" fill="freeze" />
                </circle>
                {/* Medium 87/276 = 36.8% → 231deg */}
                <circle cx="140" cy="140" r="100" fill="none" stroke="#0070F3" strokeWidth="28"
                  strokeDasharray="231 530" strokeDashoffset="261" transform="rotate(-90 140 140)" opacity="0.8">
                  <animate attributeName="stroke-dashoffset" from="261" to="30" dur="1.2s" begin="0.4s" fill="freeze" />
                </circle>
                {/* Low remainder */}
                <circle cx="140" cy="140" r="100" fill="none" stroke="#00FF88" strokeWidth="28"
                  strokeDasharray="30 530" strokeDashoffset="30" transform="rotate(-90 140 140)" opacity="0.7">
                </circle>

                <text x="140" y="132" textAnchor="middle" fill="#FFFFFF" fontSize="28" fontWeight="800" fontFamily="monospace">276</text>
                <text x="140" y="154" textAnchor="middle" fill="#666666" fontSize="11" fontFamily="sans-serif">CVEs activos</text>
              </svg>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PLATAFORMAS SOPORTADAS ── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[#111111]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#00FF8815] text-[#00FF88] border border-[#00FF8830] mb-4">
                Cobertura multiplataforma
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl font-bold mb-4">
              Protege <span className="text-[#00FF88]">todo tu entorno</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {platforms.map((plat, i) => (
              <motion.div
                key={plat.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6 text-center hover:border-opacity-60 transition-all duration-300"
                whileHover={{ borderColor: plat.color + "50", y: -4 }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: `${plat.color}12`, border: `1px solid ${plat.color}25` }}
                >
                  {plat.icon}
                </div>
                <h3 className="font-bold text-base mb-2" style={{ color: plat.color }}>{plat.name}</h3>
                <p className="text-xs text-[#666666] leading-relaxed">{plat.versions}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTEGRATIONS ── */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#0070F315] text-[#0070F3] border border-[#0070F330] mb-4">
                Ecosistema de integraciones
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl font-bold mb-4">
              Conecta con tu stack actual
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {integrations.map((integ, i) => (
              <motion.div
                key={integ.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-6 text-center hover:border-[#0070F330] transition-all"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: `${integ.color}15`, border: `1px solid ${integ.color}30` }}>
                  {integ.icon}
                </div>
                <h3 className="font-bold mb-1" style={{ color: integ.color }}>{integ.name}</h3>
                <p className="text-xs text-[#666666]">{integ.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPLIANCE ── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[#111111]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#00D4FF15] text-[#00D4FF] border border-[#00D4FF30] mb-4">
                Cumplimiento regulatorio
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl font-bold mb-4">
              Satisface <span className="text-[#00D4FF]">múltiples marcos</span> de un golpe
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#A0A0A0] max-w-2xl mx-auto">
              La gestión de vulnerabilidades automatizada genera evidencia continua
              para PCI-DSS, ISO 27001, SOC 2 y NIST sin trabajo manual adicional.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {complianceFrameworks.map((fw, i) => (
              <motion.div
                key={fw.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#1A1A1A] border rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                style={{ borderColor: `${fw.color}30` }}
              >
                <div
                  className="text-xs font-bold px-2.5 py-1 rounded-full inline-flex mb-3"
                  style={{ background: `${fw.color}15`, color: fw.color, border: `1px solid ${fw.color}30` }}
                >
                  {fw.req}
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: fw.color }}>{fw.name}</h3>
                <p className="text-xs text-[#A0A0A0] leading-relaxed">{fw.desc}</p>
                <div className="mt-4 flex items-center gap-2 text-xs text-[#00FF88]">
                  <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
                    <path d="M13.5 4.5l-7 7L3 8" stroke="#00FF88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Evidencia automática
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,59,59,0.08)_0%,transparent_60%)]" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#00FF8815] text-[#00FF88] border border-[#00FF8830] mb-6">
                Prueba gratuita 14 días — Sin tarjeta de crédito
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-bold mb-6">
              Detecta tus vulnerabilidades ahora.
              <br />
              <span className="bg-gradient-to-r from-[#FF3B3B] to-[#FFB800] bg-clip-text text-transparent">
                Antes que los atacantes.
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#A0A0A0] text-lg mb-10 max-w-2xl mx-auto">
              Instala el agente en 5 minutos. Obtén tu primer reporte de vulnerabilidades
              en segundos. Prioriza, asigna y cierra CVEs — todo en español.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <Link
                href="/trial"
                className="inline-flex items-center gap-2 bg-[#0070F3] hover:bg-[#0050D0] text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(0,112,243,0.3)] hover:shadow-[0_0_40px_rgba(0,112,243,0.5)] text-lg"
              >
                Detecta tus vulnerabilidades ahora
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 border border-[#2A2A2A] hover:border-[#FFB800] text-[#A0A0A0] hover:text-[#FFB800] font-semibold px-8 py-4 rounded-lg transition-all duration-200 text-lg"
              >
                Ver planes y precios
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
