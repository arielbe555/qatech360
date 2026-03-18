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

const capabilities = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#0070F3" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M2 17l10 5 10-5" stroke="#0070F3" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M2 12l10 5 10-5" stroke="#00D4FF" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    title: "UEBA",
    desc: "Motor de análisis de comportamiento de usuarios y entidades. Detecta anomalías estadísticas en tiempo real con modelos ML actualizados cada hora.",
    color: "#0070F3",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <circle cx="12" cy="12" r="9" stroke="#FF3366" strokeWidth="1.5" />
        <path d="M12 8v5l3 2" stroke="#FF3366" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="12" r="2" fill="#FF3366" opacity="0.3" />
      </svg>
    ),
    title: "Zero-Day Detection",
    desc: "Identificación de amenazas desconocidas usando sandboxing dinámico y correlación de IoCs globales. Tiempo medio de detección: 2.4 segundos.",
    color: "#FF3366",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path d="M9.75 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V9.75" stroke="#00FF88" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M15 3l6 6-9 9-6-6 9-9z" stroke="#00FF88" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="18" cy="6" r="2" fill="#00FF88" opacity="0.4" />
      </svg>
    ),
    title: "Behavioral AI",
    desc: "Red neuronal profunda entrenada con 15 mil millones de eventos de seguridad. Precisión del 99.97% con tasa de falsos positivos menor al 0.003%.",
    color: "#00FF88",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <rect x="3" y="3" width="7" height="7" rx="1" stroke="#00D4FF" strokeWidth="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1" stroke="#00D4FF" strokeWidth="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1" stroke="#00D4FF" strokeWidth="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1" stroke="#00D4FF" opacity="0.4" strokeWidth="1.5" />
        <path d="M17.5 17.5l2 2" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "MITRE ATT&CK Mapping",
    desc: "Mapeo automático de cada alerta a las 14 tácticas y 196+ técnicas del framework MITRE ATT&CK v14. Visualización de kill chain completa.",
    color: "#00D4FF",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path d="M12 2l3 6.3 7 .7-5 4.9 1.18 7.1L12 17.77 5.82 21 7 13.9 2 9l7-.7L12 2z" stroke="#FF6B00" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    title: "Real-Time Blocking",
    desc: "Bloqueo automático en menos de 100ms desde la detección. Contención de procesos, redes y usuarios comprometidos sin intervención humana.",
    color: "#FF6B00",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path d="M3 12h18M12 3v18" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
        <circle cx="5" cy="5" r="2" fill="#FF3366" />
        <circle cx="12" cy="8" r="2" fill="#FF6B00" />
        <circle cx="19" cy="5" r="2" fill="#FF3366" />
        <circle cx="8" cy="14" r="2" fill="#0070F3" />
        <circle cx="16" cy="16" r="2" fill="#0070F3" />
        <circle cx="12" cy="19" r="2" fill="#00FF88" />
        <path d="M5 5l7 3 7-3M12 8l-4 6 4 3 4-3" stroke="#374151" strokeWidth="1" />
      </svg>
    ),
    title: "Kill Chain Visualization",
    desc: "Reconstrucción visual completa de la cadena de ataque con línea de tiempo, activos afectados y árbol de procesos interactivo.",
    color: "#9CA3AF",
  },
];

const timelineSteps = [
  {
    step: "01",
    title: "Ingesta de telemetría",
    desc: "Captura 10,000+ eventos/seg por endpoint",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="#0070F3" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Enriquecimiento contextual",
    desc: "CTI global + histórico del activo",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" stroke="#00D4FF" strokeWidth="1.5" />
        <path d="M12 8v4l3 2" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Motor de correlación IA",
    desc: "15 modelos ML ejecutados en paralelo",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" stroke="#00FF88" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    step: "04",
    title: "Scoring de riesgo",
    desc: "Priorización automática 0-100",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M18 20V10M12 20V4M6 20v-6" stroke="#FF6B00" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    step: "05",
    title: "Respuesta & Alerta",
    desc: "Bloqueo + notificación en &lt;3s total",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="#FF3366" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M22 4L12 14.01l-3-3" stroke="#FF3366" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const comparisonFeatures = [
  { feature: "Detección en tiempo real", qatech: true, crowdstrike: true, sentinel: true },
  { feature: "Zero-day sin firmas", qatech: true, crowdstrike: true, sentinel: true },
  { feature: "MITRE ATT&CK v14 completo", qatech: true, crowdstrike: false, sentinel: true },
  { feature: "Detección < 3 segundos", qatech: true, crowdstrike: false, sentinel: false },
  { feature: "Kill Chain visual interactiva", qatech: true, crowdstrike: true, sentinel: false },
  { feature: "UEBA integrado (sin addon)", qatech: true, crowdstrike: false, sentinel: false },
  { feature: "Falsos positivos < 0.003%", qatech: true, crowdstrike: false, sentinel: false },
  { feature: "API REST completa", qatech: true, crowdstrike: true, sentinel: true },
  { feature: "Precio transparente publicado", qatech: true, crowdstrike: false, sentinel: false },
  { feature: "Soporte 24/7 incluido", qatech: true, crowdstrike: false, sentinel: true },
];

const mitrePhases = [
  { name: "Reconocimiento", color: "#FF3366", techniques: 10 },
  { name: "Desarrollo de recursos", color: "#FF6B00", techniques: 7 },
  { name: "Acceso inicial", color: "#FF6B00", techniques: 9 },
  { name: "Ejecución", color: "#FF6B00", techniques: 12 },
  { name: "Persistencia", color: "#0070F3", techniques: 19 },
  { name: "Escalada de privilegios", color: "#0070F3", techniques: 13 },
  { name: "Evasión de defensa", color: "#00D4FF", techniques: 42 },
  { name: "Acceso a credenciales", color: "#00D4FF", techniques: 17 },
  { name: "Descubrimiento", color: "#00FF88", techniques: 30 },
  { name: "Movimiento lateral", color: "#00FF88", techniques: 9 },
  { name: "Recolección", color: "#00FF88", techniques: 17 },
  { name: "C&C", color: "#9CA3AF", techniques: 16 },
  { name: "Exfiltración", color: "#9CA3AF", techniques: 9 },
  { name: "Impacto", color: "#9CA3AF", techniques: 14 },
];

export default function DetectionPage() {
  const [activeAlert, setActiveAlert] = useState(0);
  const alerts = [
    { severity: "CRITICAL", msg: "Ransomware payload detected on WORKSTATION-042", time: "00:00:01" },
    { severity: "HIGH", msg: "Lateral movement via SMB from 192.168.1.87", time: "00:00:02" },
    { severity: "CRITICAL", msg: "Credential dump attempt — lsass.exe", time: "00:00:03" },
    { severity: "MEDIUM", msg: "Suspicious PowerShell encoded command", time: "00:00:04" },
  ];

  useEffect(() => {
    const t = setInterval(() => setActiveAlert((p) => (p + 1) % alerts.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <main className="bg-[#0A0A0A] min-h-screen">
      <NavBar />

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero-radial" />
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.03]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0070F3] rounded-full opacity-[0.04] blur-[120px]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp} className="mb-6">
                <span className="badge badge-primary">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0070F3] animate-pulse" />
                  Powered by AI
                </span>
              </motion.div>
              <motion.h1
                variants={fadeUp}
                className="text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight mb-6"
              >
                Detecta amenazas{" "}
                <span className="text-gradient-primary">3 segundos</span>
                <br />
                antes que el daño
              </motion.h1>
              <motion.p variants={fadeUp} className="text-[#9CA3AF] text-lg leading-relaxed mb-10 max-w-xl">
                El motor de detección de amenazas más rápido del mercado. IA
                comportamental con 15 modelos en paralelo, cobertura MITRE ATT&CK
                completa y bloqueo automático — sin necesidad de firmas.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                <Link href="/contact" className="btn-primary">
                  Solicitar demo en vivo
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link href="/platform" className="btn-secondary">
                  Ver documentación técnica
                </Link>
              </motion.div>
              <motion.div variants={fadeUp} className="flex gap-8 mt-10">
                {[
                  { val: "99.97%", label: "Precisión detección" },
                  { val: "<3s", label: "Tiempo detección" },
                  { val: "0.003%", label: "Falsos positivos" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-bold text-gradient-primary">{s.val}</div>
                    <div className="text-xs text-[#6B7280] mt-0.5">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Dashboard Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="bg-[#111827] border border-[#374151] rounded-2xl overflow-hidden shadow-glow-primary">
                {/* Topbar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-[#374151] bg-[#0D1117]">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#FF3366]" />
                    <div className="w-3 h-3 rounded-full bg-[#FF6B00]" />
                    <div className="w-3 h-3 rounded-full bg-[#00FF88]" />
                  </div>
                  <span className="text-xs text-[#6B7280] ml-2 font-mono">qatech360 — Threat Detection Console</span>
                  <div className="ml-auto flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
                    <span className="text-xs text-[#00FF88] font-mono">LIVE</span>
                  </div>
                </div>
                {/* Stats row */}
                <div className="grid grid-cols-4 border-b border-[#374151]">
                  {[
                    { label: "Eventos/seg", val: "12,847", color: "#0070F3" },
                    { label: "Amenazas hoy", val: "3", color: "#FF3366" },
                    { label: "Bloqueadas", val: "3", color: "#00FF88" },
                    { label: "Hosts activos", val: "1,204", color: "#9CA3AF" },
                  ].map((s) => (
                    <div key={s.label} className="p-3 border-r border-[#374151] last:border-r-0">
                      <div className="text-lg font-bold font-mono" style={{ color: s.color }}>{s.val}</div>
                      <div className="text-xs text-[#6B7280]">{s.label}</div>
                    </div>
                  ))}
                </div>
                {/* Alert feed */}
                <div className="p-4 space-y-2">
                  <div className="text-xs text-[#6B7280] font-mono mb-3">ALERT FEED — REAL TIME</div>
                  {alerts.map((a, i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: i === activeAlert ? 1 : 0.35, scale: i === activeAlert ? 1 : 0.99 }}
                      transition={{ duration: 0.4 }}
                      className="flex items-start gap-3 p-3 rounded-xl bg-[#0D1117] border border-[#1F2937]"
                    >
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full mt-0.5 shrink-0"
                        style={{
                          background: a.severity === "CRITICAL" ? "rgba(255,51,102,0.15)" : a.severity === "HIGH" ? "rgba(255,107,0,0.15)" : "rgba(0,112,243,0.15)",
                          color: a.severity === "CRITICAL" ? "#FF3366" : a.severity === "HIGH" ? "#FF6B00" : "#60A5FA",
                          border: `1px solid ${a.severity === "CRITICAL" ? "rgba(255,51,102,0.3)" : a.severity === "HIGH" ? "rgba(255,107,0,0.3)" : "rgba(0,112,243,0.3)"}`,
                        }}
                      >
                        {a.severity}
                      </span>
                      <span className="text-xs text-[#9CA3AF] leading-relaxed">{a.msg}</span>
                      <span className="ml-auto text-xs font-mono text-[#374151] shrink-0">+{a.time}</span>
                    </motion.div>
                  ))}
                </div>
                {/* Mini chart */}
                <div className="px-4 pb-4">
                  <svg viewBox="0 0 400 80" className="w-full h-16">
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0070F3" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#0070F3" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,60 C40,55 60,30 80,35 C100,40 120,20 140,25 C160,30 180,15 200,18 C220,21 240,35 260,30 C280,25 300,10 320,15 C340,20 360,35 400,28 L400,80 L0,80 Z" fill="url(#chartGrad)" />
                    <path d="M0,60 C40,55 60,30 80,35 C100,40 120,20 140,25 C160,30 180,15 200,18 C220,21 240,35 260,30 C280,25 300,10 320,15 C340,20 360,35 400,28" fill="none" stroke="#0070F3" strokeWidth="2" />
                    <circle cx="200" cy="18" r="4" fill="#FF3366" className="animate-ping" style={{ transformOrigin: "200px 18px" }} />
                    <circle cx="200" cy="18" r="3" fill="#FF3366" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE: CÓMO DETECTAMOS ── */}
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
              <span className="badge badge-accent mb-4">Arquitectura de detección</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-bold mb-4">
              Cómo detectamos en{" "}
              <span className="text-gradient-primary">3 segundos</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#9CA3AF] text-lg max-w-2xl mx-auto">
              Un pipeline de detección de 5 etapas que procesa millones de eventos
              simultáneamente y responde antes que el atacante complete su siguiente paso.
            </motion.p>
          </motion.div>

          <div className="relative">
            {/* Connection line */}
            <div className="absolute top-10 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#0070F3] to-transparent hidden lg:block" />
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {timelineSteps.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="w-20 h-20 rounded-2xl bg-[#111827] border border-[#374151] flex items-center justify-center mb-4 relative z-10 hover:border-[#0070F3] transition-colors">
                    <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-[#0070F3] flex items-center justify-center text-xs font-bold font-mono">
                      {step.step}
                    </div>
                    {step.icon}
                  </div>
                  <h3 className="font-semibold text-sm mb-2">{step.title}</h3>
                  <p
                    className="text-xs text-[#6B7280] leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: step.desc }}
                  />
                  {i < timelineSteps.length - 1 && (
                    <div className="hidden lg:block absolute right-0 top-10 translate-x-1/2 z-20">
                      <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-[#374151]">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES GRID ── */}
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
              <span className="badge badge-primary mb-4">Capacidades core</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-bold mb-4">
              6 tecnologías que{" "}
              <span className="text-gradient-primary">ningún otro integra</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card-base group"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: `${cap.color}15`, border: `1px solid ${cap.color}30` }}
                >
                  {cap.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{cap.title}</h3>
                <p className="text-[#9CA3AF] text-sm leading-relaxed">{cap.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
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
              <span className="badge badge-warning mb-4">Comparativa de mercado</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl font-bold mb-4">
              qatech360 vs{" "}
              <span className="text-gradient-primary">la competencia</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#111827] border border-[#374151] rounded-2xl overflow-hidden"
          >
            <div className="grid grid-cols-4 bg-[#0D1117] border-b border-[#374151]">
              <div className="p-4 font-semibold text-sm text-[#6B7280]">Funcionalidad</div>
              <div className="p-4 font-bold text-sm text-center text-[#0070F3] border-l border-[#374151]">
                <span className="text-gradient-primary">qatech360</span>
              </div>
              <div className="p-4 font-semibold text-sm text-center text-[#9CA3AF] border-l border-[#374151]">Crowd...</div>
              <div className="p-4 font-semibold text-sm text-center text-[#9CA3AF] border-l border-[#374151]">Sentine...</div>
            </div>
            {comparisonFeatures.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-4 border-b border-[#1F2937] last:border-b-0 ${i % 2 === 0 ? "bg-transparent" : "bg-[#0D1117]/30"}`}
              >
                <div className="p-4 text-sm text-[#9CA3AF]">{row.feature}</div>
                <div className="p-4 flex justify-center items-center border-l border-[#1F2937]">
                  {row.qatech ? (
                    <svg viewBox="0 0 20 20" fill="#00FF88" className="w-5 h-5">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 20 20" fill="#FF3366" className="w-5 h-5">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="p-4 flex justify-center items-center border-l border-[#1F2937]">
                  {row.crowdstrike ? (
                    <svg viewBox="0 0 20 20" fill="#00FF88" className="w-5 h-5">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                      <circle cx="10" cy="10" r="8" stroke="#374151" strokeWidth="1.5" />
                      <path d="M7 10h6" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  )}
                </div>
                <div className="p-4 flex justify-center items-center border-l border-[#1F2937]">
                  {row.sentinel ? (
                    <svg viewBox="0 0 20 20" fill="#00FF88" className="w-5 h-5">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                      <circle cx="10" cy="10" r="8" stroke="#374151" strokeWidth="1.5" />
                      <path d="M7 10h6" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.025]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { target: 99, suffix: ".97%", label: "Tasa de detección", sub: "Probado en Red Team independiente" },
              { target: 3, suffix: "s", label: "Tiempo medio de detección", sub: "Desde telemetría hasta alerta" },
              { target: 15000000000, suffix: "+", label: "Eventos analizados/día", sub: "En toda la red de clientes" },
              { target: 196, suffix: "+", label: "Técnicas MITRE cubiertas", sub: "ATT&CK v14 completo" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#111827] border border-[#374151] rounded-2xl p-8 text-center hover:border-[#0070F3] transition-colors group"
              >
                <div className="text-5xl font-extrabold text-gradient-primary mb-2 stat-number">
                  <AnimatedNumber target={stat.target} suffix={stat.suffix} />
                </div>
                <div className="font-semibold mb-1">{stat.label}</div>
                <div className="text-xs text-[#6B7280]">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MITRE ATT&CK ── */}
      <section className="py-24 relative overflow-hidden">
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
              <span className="badge badge-danger mb-4">Framework MITRE ATT&CK</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl font-bold mb-4">
              Cobertura{" "}
              <span className="text-gradient-primary">100% de tácticas</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#9CA3AF] max-w-2xl mx-auto">
              Cada alerta se enriquece automáticamente con su táctica, técnica y
              sub-técnica MITRE correspondiente. Visualiza el contexto completo del ataque.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {mitrePhases.map((phase, i) => (
              <motion.div
                key={phase.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-[#111827] border border-[#374151] rounded-xl p-3 text-center hover:border-opacity-60 transition-all cursor-pointer group"
                style={{ borderColor: `${phase.color}30` }}
                whileHover={{ borderColor: phase.color, y: -3 }}
              >
                <div className="text-xl font-bold font-mono mb-1" style={{ color: phase.color }}>
                  {phase.techniques}
                </div>
                <div className="text-[10px] text-[#6B7280] leading-tight">{phase.name}</div>
                <div className="text-[9px] mt-1" style={{ color: phase.color }}>técnicas</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            {[
              { color: "#FF3366", label: "Pre-compromise" },
              { color: "#FF6B00", label: "Initial access & Execution" },
              { color: "#0070F3", label: "Persistence & Privilege" },
              { color: "#00D4FF", label: "Defense evasion & Discovery" },
              { color: "#00FF88", label: "Lateral movement & Collection" },
              { color: "#9CA3AF", label: "Exfiltration & Impact" },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm" style={{ background: l.color }} />
                <span className="text-xs text-[#6B7280]">{l.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero-radial opacity-50" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <span className="badge badge-accent mb-6">Empieza gratis 14 días</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-bold mb-6">
              El atacante ya está dentro.
              <br />
              <span className="text-gradient-primary">¿Cuánto tardas en saberlo?</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#9CA3AF] text-lg mb-10 max-w-2xl mx-auto">
              El tiempo medio de permanencia de un atacante es de 21 días.
              Con qatech360 Threat Detection, lo detectas en 3 segundos.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                Activar detección ahora
              </Link>
              <Link href="/pricing" className="btn-secondary text-lg px-8 py-4">
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
