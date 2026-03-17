"use client";
import { motion, AnimatePresence } from "framer-motion";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

// Terminal simulation
const terminalLines = [
  { delay: 0, text: "$ qaedr --monitor --realtime", color: "#9CA3AF" },
  { delay: 600, text: "[+] Agente v3.4.1 iniciado — PID 1337", color: "#00FF88" },
  { delay: 1200, text: "[*] Monitoreando 1,204 procesos activos...", color: "#9CA3AF" },
  { delay: 2000, text: "[!] ALERTA: Proceso sospechoso detectado", color: "#FF6B00" },
  { delay: 2400, text: "    → cmd.exe spawned by OUTLOOK.EXE", color: "#FF3366" },
  { delay: 2800, text: "    → Técnica: T1566.001 Spearphishing", color: "#FF3366" },
  { delay: 3200, text: "[+] Proceso aislado en 87ms", color: "#00FF88" },
  { delay: 3600, text: "[+] Snapshot de memoria capturado", color: "#00FF88" },
  { delay: 4000, text: "[+] IOCs enviados a Threat Intelligence", color: "#00D4FF" },
  { delay: 4400, text: "[+] Ticket creado: INC-20240317-0042", color: "#0070F3" },
  { delay: 4800, text: "[✓] Contención completada — Tiempo: 87ms", color: "#00FF88" },
];

function Terminal() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  useEffect(() => {
    const timers = terminalLines.map((line, i) =>
      setTimeout(() => setVisibleLines((prev) => [...prev, i]), line.delay)
    );
    const reset = setTimeout(() => setVisibleLines([]), 6000);
    return () => { timers.forEach(clearTimeout); clearTimeout(reset); };
  }, [visibleLines]);

  useEffect(() => {
    if (visibleLines.length === 0) {
      const t = setTimeout(() => {
        const timers = terminalLines.map((line, i) =>
          setTimeout(() => setVisibleLines((prev) => [...prev, i]), line.delay)
        );
        return () => timers.forEach(clearTimeout);
      }, 800);
      return () => clearTimeout(t);
    }
  }, [visibleLines]);

  return (
    <div className="bg-[#0D1117] border border-[#374151] rounded-2xl overflow-hidden font-mono">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[#374151] bg-[#111827]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#FF3366]" />
          <div className="w-3 h-3 rounded-full bg-[#FF6B00]" />
          <div className="w-3 h-3 rounded-full bg-[#00FF88]" />
        </div>
        <span className="text-xs text-[#6B7280] ml-2">qaEDR Terminal — Respuesta en Vivo</span>
        <div className="ml-auto flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
          <span className="text-xs text-[#00FF88]">LIVE</span>
        </div>
      </div>
      <div className="p-4 space-y-1 min-h-[300px]">
        {terminalLines.map((line, i) => (
          <div
            key={i}
            className="text-sm leading-relaxed transition-all duration-200"
            style={{
              opacity: visibleLines.includes(i) ? 1 : 0,
              transform: visibleLines.includes(i) ? "translateX(0)" : "translateX(-8px)",
              color: line.color,
            }}
          >
            {line.text}
          </div>
        ))}
        <span
          className="inline-block w-2 h-4 bg-[#0070F3] ml-0.5 animate-blink"
          style={{ verticalAlign: "text-bottom" }}
        />
      </div>
    </div>
  );
}

const operationModes = [
  {
    id: "prevent",
    label: "PREVENT",
    color: "#00FF88",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M12 2l7 4v6c0 4.42-3.08 8.56-7 9.93C8.08 20.56 5 16.42 5 12V6l7-4z" stroke="#00FF88" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke="#00FF88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Prevención Proactiva",
    desc: "El agente bloquea amenazas antes de que se ejecuten usando análisis estático y dinámico. Machine Learning local detecta malware desconocido sin firmas, con modelos actualizados cada 6 horas.",
    features: [
      "Bloqueo de malware sin firma (ML local)",
      "Prevención de exploits en memoria",
      "Control de ejecución de scripts",
      "Application whitelisting inteligente",
      "Análisis de macros de Office",
    ],
  },
  {
    id: "detect",
    label: "DETECT",
    color: "#0070F3",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <circle cx="11" cy="11" r="8" stroke="#0070F3" strokeWidth="1.5" />
        <path d="M21 21l-4.35-4.35" stroke="#0070F3" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="11" cy="11" r="3" stroke="#0070F3" strokeWidth="1.5" opacity="0.5" />
      </svg>
    ),
    title: "Detección Comportamental",
    desc: "Motor UEBA analiza el comportamiento de usuarios, procesos y redes en tiempo real. Detecta técnicas de evasión, living-off-the-land attacks y movimiento lateral que los antivirus tradicionales pierden.",
    features: [
      "UEBA — Análisis de comportamiento de entidades",
      "Detección de Living-off-the-Land (LOLBins)",
      "Mapeo automático a MITRE ATT&CK",
      "Correlación de eventos multi-host",
      "Baselining automático por rol/departamento",
    ],
  },
  {
    id: "respond",
    label: "RESPOND",
    color: "#FF3366",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke="#FF3366" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    title: "Respuesta Automática",
    desc: "Playbooks automatizados contienen amenazas en milisegundos. Aísla hosts, mata procesos, revoca credenciales y reconstruye el sistema — todo sin intervención humana ni downtime.",
    features: [
      "Aislamiento de red en < 100ms",
      "Kill de procesos maliciosos inmediato",
      "Revocación automática de credenciales",
      "Rollback de cambios en el sistema",
      "Forensic snapshot antes de contención",
    ],
  },
];

const platforms = [
  { os: "Windows", versions: "7, 8, 10, 11, Server 2008+", icon: "⊞", supported: true },
  { os: "Linux", versions: "Ubuntu, RHEL, CentOS, Debian, Amazon Linux", icon: "🐧", supported: true },
  { os: "macOS", versions: "10.14 Mojave hasta 14 Sonoma", icon: "⌘", supported: true },
  { os: "Android", versions: "8.0+ (Enterprise MDM)", icon: "📱", supported: true },
  { os: "iOS", versions: "14+ (con supervisión MDM)", icon: "📲", supported: true },
  { os: "ChromeOS", versions: "Managed devices (Q1 2025)", icon: "◉", supported: false },
];

const responseTimeline = [
  { time: "T+0ms", event: "Proceso malicioso iniciado", color: "#FF3366", icon: "⚡" },
  { time: "T+12ms", event: "Telemetría capturada (syscall hook)", color: "#FF6B00", icon: "📡" },
  { time: "T+34ms", event: "Análisis ML local — MALICIOUS (98.7%)", color: "#FF6B00", icon: "🧠" },
  { time: "T+52ms", event: "Correlación con base de datos de amenazas", color: "#0070F3", icon: "🔗" },
  { time: "T+67ms", event: "Decisión de respuesta tomada", color: "#0070F3", icon: "⚖" },
  { time: "T+87ms", event: "Proceso kill + red aislada + snapshot", color: "#00FF88", icon: "🛡" },
  { time: "T+120ms", event: "Alerta enviada + ticket creado automáticamente", color: "#00FF88", icon: "✓" },
];

const performanceData = [
  { metric: "CPU overhead (idle)", qatech: "0.1%", crowdstrike: "1.2%", sentinel: "0.8%" },
  { metric: "CPU overhead (scan activo)", qatech: "2.1%", crowdstrike: "8.5%", sentinel: "5.3%" },
  { metric: "RAM footprint", qatech: "45 MB", crowdstrike: "180 MB", sentinel: "120 MB" },
  { metric: "Tiempo detección (ms)", qatech: "87ms", crowdstrike: "340ms", sentinel: "220ms" },
  { metric: "Tamaño instalador", qatech: "12 MB", crowdstrike: "47 MB", sentinel: "38 MB" },
];

export default function EdrPage() {
  const [activeMode, setActiveMode] = useState("prevent");
  const activeData = operationModes.find((m) => m.id === activeMode)!;

  return (
    <main className="bg-[#0A0A0A] min-h-screen">
      <NavBar />

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero-radial" />
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.03]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#0070F3] rounded-full opacity-[0.04] blur-[100px]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp} className="mb-6">
                <span className="badge badge-danger">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF3366] animate-pulse" />
                  Endpoint Protect — EDR
                </span>
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight mb-6">
                Un agente.{" "}
                <span className="text-gradient-primary">Protección</span>
                <br />
                total del endpoint.
              </motion.h1>
              <motion.p variants={fadeUp} className="text-[#9CA3AF] text-lg leading-relaxed mb-10 max-w-xl">
                El agente EDR más ligero del mercado: 45MB de RAM, 0.1% CPU en reposo.
                Previene, detecta y responde en 87ms — en Windows, Linux, macOS, Android e iOS.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                <Link href="/contact" className="btn-primary">
                  Descargar agente gratis
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link href="/platform" className="btn-secondary">
                  Ver ficha técnica
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Terminal />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ARCHITECTURE DIAGRAM ── */}
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
              <span className="badge badge-primary mb-4">Arquitectura</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-bold mb-4">
              Un agente,{" "}
              <span className="text-gradient-primary">protección total</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#111827] border border-[#374151] rounded-2xl p-8"
          >
            <svg viewBox="0 0 900 360" className="w-full max-w-4xl mx-auto">
              {/* Endpoint box */}
              <rect x="20" y="80" width="200" height="200" rx="16" fill="#1F2937" stroke="#374151" strokeWidth="1" />
              <text x="120" y="108" fill="#9CA3AF" fontSize="11" textAnchor="middle" fontFamily="monospace">ENDPOINT</text>
              <rect x="40" y="120" width="160" height="28" rx="6" fill="#111827" stroke="#374151" />
              <text x="120" y="139" fill="#0070F3" fontSize="10" textAnchor="middle" fontFamily="monospace">Kernel Driver</text>
              <rect x="40" y="156" width="160" height="28" rx="6" fill="#111827" stroke="#374151" />
              <text x="120" y="175" fill="#00D4FF" fontSize="10" textAnchor="middle" fontFamily="monospace">User-Space Agent</text>
              <rect x="40" y="192" width="160" height="28" rx="6" fill="#111827" stroke="#374151" />
              <text x="120" y="211" fill="#00FF88" fontSize="10" textAnchor="middle" fontFamily="monospace">ML Engine (local)</text>
              <rect x="40" y="228" width="160" height="28" rx="6" fill="#111827" stroke="#374151" />
              <text x="120" y="247" fill="#FF6B00" fontSize="10" textAnchor="middle" fontFamily="monospace">Response Module</text>

              {/* Arrow right */}
              <path d="M220 180 L320 180" stroke="#374151" strokeWidth="1.5" strokeDasharray="4" markerEnd="url(#arr)" />
              <defs>
                <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" fill="#374151" />
                </marker>
              </defs>
              <text x="270" y="170" fill="#6B7280" fontSize="9" textAnchor="middle" fontFamily="monospace">TLS 1.3</text>
              <text x="270" y="192" fill="#6B7280" fontSize="9" textAnchor="middle" fontFamily="monospace">Encrypted</text>

              {/* Cloud box */}
              <rect x="320" y="60" width="260" height="240" rx="16" fill="#1F2937" stroke="#0070F3" strokeWidth="1" strokeOpacity="0.5" />
              <text x="450" y="88" fill="#0070F3" fontSize="11" textAnchor="middle" fontFamily="monospace">qatech360 CLOUD</text>
              <rect x="340" y="100" width="220" height="30" rx="6" fill="#111827" stroke="#0070F3" strokeOpacity="0.3" />
              <text x="450" y="120" fill="#60A5FA" fontSize="10" textAnchor="middle" fontFamily="monospace">Threat Intelligence Feed</text>
              <rect x="340" y="138" width="220" height="30" rx="6" fill="#111827" stroke="#374151" />
              <text x="450" y="158" fill="#9CA3AF" fontSize="10" textAnchor="middle" fontFamily="monospace">Correlation Engine (AI)</text>
              <rect x="340" y="176" width="220" height="30" rx="6" fill="#111827" stroke="#374151" />
              <text x="450" y="196" fill="#9CA3AF" fontSize="10" textAnchor="middle" fontFamily="monospace">SIEM Integration Layer</text>
              <rect x="340" y="214" width="220" height="30" rx="6" fill="#111827" stroke="#374151" />
              <text x="450" y="234" fill="#9CA3AF" fontSize="10" textAnchor="middle" fontFamily="monospace">Case Management</text>
              <rect x="340" y="252" width="220" height="30" rx="6" fill="#111827" stroke="#374151" />
              <text x="450" y="272" fill="#9CA3AF" fontSize="10" textAnchor="middle" fontFamily="monospace">Reporting & Compliance</text>

              {/* Arrow right 2 */}
              <path d="M580 180 L660 180" stroke="#374151" strokeWidth="1.5" strokeDasharray="4" markerEnd="url(#arr)" />

              {/* SOC box */}
              <rect x="660" y="80" width="200" height="200" rx="16" fill="#1F2937" stroke="#374151" strokeWidth="1" />
              <text x="760" y="108" fill="#9CA3AF" fontSize="11" textAnchor="middle" fontFamily="monospace">SOC ANALYST</text>
              <rect x="680" y="120" width="160" height="28" rx="6" fill="#111827" stroke="#374151" />
              <text x="760" y="139" fill="#00FF88" fontSize="10" textAnchor="middle" fontFamily="monospace">Alert Dashboard</text>
              <rect x="680" y="156" width="160" height="28" rx="6" fill="#111827" stroke="#374151" />
              <text x="760" y="175" fill="#9CA3AF" fontSize="10" textAnchor="middle" fontFamily="monospace">Investigation Tools</text>
              <rect x="680" y="192" width="160" height="28" rx="6" fill="#111827" stroke="#374151" />
              <text x="760" y="211" fill="#9CA3AF" fontSize="10" textAnchor="middle" fontFamily="monospace">Remote Response</text>
              <rect x="680" y="228" width="160" height="28" rx="6" fill="#111827" stroke="#374151" />
              <text x="760" y="247" fill="#9CA3AF" fontSize="10" textAnchor="middle" fontFamily="monospace">Reporting</text>

              {/* Labels */}
              <text x="270" y="340" fill="#374151" fontSize="9" textAnchor="middle" fontFamily="monospace">Bidireccional · &lt;50ms latencia</text>
              <text x="620" y="340" fill="#374151" fontSize="9" textAnchor="middle" fontFamily="monospace">Console Web / API REST / SIEM</text>
            </svg>
          </motion.div>
        </div>
      </section>

      {/* ── 3 MODOS DE OPERACIÓN ── */}
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
              <span className="badge badge-accent mb-4">Tres modos de operación</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-bold mb-4">
              Previene. Detecta.{" "}
              <span className="text-gradient-primary">Responde.</span>
            </motion.h2>
          </motion.div>

          {/* Tabs */}
          <div className="flex justify-center gap-3 mb-10">
            {operationModes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setActiveMode(mode.id)}
                className="px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300"
                style={{
                  background: activeMode === mode.id ? `${mode.color}20` : "#111827",
                  border: `1px solid ${activeMode === mode.id ? mode.color : "#374151"}`,
                  color: activeMode === mode.id ? mode.color : "#9CA3AF",
                }}
              >
                {mode.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeMode}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="bg-[#111827] border border-[#374151] rounded-2xl p-8"
              style={{ borderColor: `${activeData.color}30` }}
            >
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ background: `${activeData.color}15`, border: `1px solid ${activeData.color}30` }}
                    >
                      {activeData.icon}
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: activeData.color }}>
                        Modo {activeData.label}
                      </div>
                      <h3 className="text-2xl font-bold">{activeData.title}</h3>
                    </div>
                  </div>
                  <p className="text-[#9CA3AF] leading-relaxed mb-8">{activeData.desc}</p>
                  <Link href="/contact" className="btn-primary">
                    Activar este modo
                  </Link>
                </div>
                <ul className="space-y-4">
                  {activeData.features.map((feat, i) => (
                    <motion.li
                      key={feat}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="flex items-center gap-3"
                    >
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: `${activeData.color}20` }}
                      >
                        <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                          <path d="M2 6l2.5 2.5L10 3" stroke={activeData.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="text-[#9CA3AF] text-sm">{feat}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── COMPATIBILITY ── */}
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
              <span className="badge badge-primary mb-4">Compatibilidad</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl font-bold mb-4">
              Cubre{" "}
              <span className="text-gradient-primary">cada plataforma</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
            {platforms.map((p, i) => (
              <motion.div
                key={p.os}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-[#111827] border border-[#374151] rounded-2xl p-6 flex items-start gap-4 hover:border-[#0070F3] transition-colors"
                style={{ opacity: p.supported ? 1 : 0.6 }}
              >
                <div className="text-3xl">{p.icon}</div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold">{p.os}</h3>
                    {p.supported ? (
                      <span className="badge badge-accent text-[10px]">Disponible</span>
                    ) : (
                      <span className="badge badge-warning text-[10px]">Próximamente</span>
                    )}
                  </div>
                  <p className="text-xs text-[#6B7280]">{p.versions}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PERFORMANCE COMPARISON ── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-[0.025]" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp}>
              <span className="badge badge-warning mb-4">Benchmark de rendimiento</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl font-bold mb-4">
              El agente más{" "}
              <span className="text-gradient-primary">ligero y rápido</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#111827] border border-[#374151] rounded-2xl overflow-hidden"
          >
            <div className="grid grid-cols-4 bg-[#0D1117] border-b border-[#374151]">
              <div className="p-4 text-sm font-semibold text-[#6B7280]">Métrica</div>
              <div className="p-4 text-sm font-bold text-center text-[#0070F3] border-l border-[#374151]">
                <span className="text-gradient-primary">qatech360</span>
              </div>
              <div className="p-4 text-sm font-semibold text-center text-[#9CA3AF] border-l border-[#374151]">CrowdStrike</div>
              <div className="p-4 text-sm font-semibold text-center text-[#9CA3AF] border-l border-[#374151]">SentinelOne</div>
            </div>
            {performanceData.map((row, i) => (
              <div
                key={row.metric}
                className={`grid grid-cols-4 border-b border-[#1F2937] last:border-b-0 ${i % 2 === 0 ? "" : "bg-[#0D1117]/30"}`}
              >
                <div className="p-4 text-sm text-[#9CA3AF]">{row.metric}</div>
                <div className="p-4 text-sm text-center font-bold text-[#00FF88] border-l border-[#1F2937]">{row.qatech}</div>
                <div className="p-4 text-sm text-center text-[#6B7280] border-l border-[#1F2937]">{row.crowdstrike}</div>
                <div className="p-4 text-sm text-center text-[#6B7280] border-l border-[#1F2937]">{row.sentinel}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── RESPONSE TIMELINE ── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-section" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp}>
              <span className="badge badge-danger mb-4">Respuesta automática</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl font-bold mb-4">
              Del ataque a la contención{" "}
              <span className="text-gradient-primary">en 87ms</span>
            </motion.h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#FF3366] via-[#0070F3] to-[#00FF88]" />
            <div className="space-y-6">
              {responseTimeline.map((item, i) => (
                <motion.div
                  key={item.time}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-6 ml-16 relative"
                >
                  <div
                    className="absolute -left-10 w-4 h-4 rounded-full border-2 border-[#0A0A0A] flex items-center justify-center"
                    style={{ background: item.color, top: "4px" }}
                  />
                  <div className="bg-[#111827] border border-[#374151] rounded-xl p-4 flex-1 hover:border-[#0070F3] transition-colors">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-mono text-xs font-bold" style={{ color: item.color }}>{item.time}</span>
                      <span className="text-sm">{item.icon}</span>
                    </div>
                    <p className="text-[#9CA3AF] text-sm">{item.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-6">
          <motion.blockquote
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#111827] border border-[#374151] rounded-2xl p-10 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-hero-radial opacity-30" />
            <div className="relative z-10">
              <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10 mx-auto mb-6 opacity-40">
                <path d="M10 20c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10S10 25.52 10 20zm10-6a6 6 0 100 12A6 6 0 0020 14z" fill="#0070F3" />
              </svg>
              <p className="text-xl lg:text-2xl font-medium leading-relaxed mb-8 text-white">
                "Migré de CrowdStrike a qatech360 EDR. El impacto en CPU bajó de 8.5% a 2.1% y la velocidad de detección mejoró 4x. Además, el precio es 60% menor con más funcionalidades incluidas."
              </p>
              <div>
                <div className="font-bold">Alejandro Martínez</div>
                <div className="text-[#6B7280] text-sm">CISO — Grupo Financiero Andino</div>
              </div>
            </div>
          </motion.blockquote>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero-radial opacity-50" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp}>
              <span className="badge badge-accent mb-6">Gratis 14 días · Sin tarjeta</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-bold mb-6">
              Protege tus endpoints{" "}
              <span className="text-gradient-primary">hoy mismo</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#9CA3AF] text-lg mb-10 max-w-2xl mx-auto">
              Deploy en menos de 5 minutos. Compatible con tu RMM/MDM existente.
              Soporte en español 24/7 incluido.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                Descargar agente EDR
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="/pricing" className="btn-secondary text-lg px-8 py-4">
                Ver precios
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
