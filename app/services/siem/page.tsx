"use client";

import { motion, useInView } from "framer-motion";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

// ─── Animated Counter ────────────────────────────────────────────────────────
function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  decimals = 0,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 2000;
          const step = 16;
          const increment = target / (duration / step);
          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              start = target;
              clearInterval(timer);
            }
            setCount(parseFloat(start.toFixed(decimals)));
          }, step);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, decimals]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString("es-MX")}
      {suffix}
    </span>
  );
}

// ─── Log Stream SVG ──────────────────────────────────────────────────────────
function LogStreamSVG() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => (prev + 1) % 120);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const logs = [
    { severity: "#FF3B3B", msg: "CRITICAL  [2026-03-17 03:14:52]  Brute force detectado — 192.168.1.45" },
    { severity: "#FFB800", msg: "WARNING   [2026-03-17 03:14:51]  Escaneo de puertos — src: 10.0.0.12" },
    { severity: "#00FF88", msg: "INFO      [2026-03-17 03:14:50]  Login exitoso — user: jlopez@corp.mx" },
    { severity: "#0070F3", msg: "DEBUG     [2026-03-17 03:14:49]  Regla 5501 evaluada — sin coincidencia" },
    { severity: "#FF3B3B", msg: "CRITICAL  [2026-03-17 03:14:48]  Malware detectado — agent: srv-prod-02" },
    { severity: "#FFB800", msg: "WARNING   [2026-03-17 03:14:47]  Cambio en /etc/passwd — host: web-01" },
    { severity: "#00FF88", msg: "INFO      [2026-03-17 03:14:46]  Agente conectado — endpoint: laptop-mx05" },
    { severity: "#0070F3", msg: "DEBUG     [2026-03-17 03:14:45]  Correlación aplicada — 3 eventos" },
    { severity: "#FF3B3B", msg: "CRITICAL  [2026-03-17 03:14:44]  Escalada de privilegios — PID 4823" },
    { severity: "#FFB800", msg: "WARNING   [2026-03-17 03:14:43]  Conexión TOR detectada — 10.0.0.88" },
  ];

  return (
    <div className="w-full h-64 bg-[#0A0A0A] rounded-xl border border-[#2A2A2A] overflow-hidden font-mono text-xs relative">
      <div className="absolute top-0 left-0 right-0 h-6 bg-[#111111] border-b border-[#2A2A2A] flex items-center px-3 gap-2">
        <div className="w-3 h-3 rounded-full bg-[#FF3B3B]" />
        <div className="w-3 h-3 rounded-full bg-[#FFB800]" />
        <div className="w-3 h-3 rounded-full bg-[#00FF88]" />
        <span className="ml-2 text-[#666666]">qatech360 — Log Stream en vivo</span>
      </div>
      <div
        className="mt-6 px-3 py-2 space-y-1.5 transition-transform"
        style={{ transform: `translateY(-${(offset / 120) * 16}px)` }}
      >
        {[...logs, ...logs].map((log, i) => (
          <div key={i} className="flex gap-2 items-center whitespace-nowrap">
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: log.severity }}
            />
            <span style={{ color: log.severity === "#00FF88" || log.severity === "#0070F3" ? "#A0A0A0" : log.severity }}>
              {log.msg}
            </span>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
    </div>
  );
}

// ─── Flow Step SVG ───────────────────────────────────────────────────────────
function FlowDiagramSVG() {
  const steps = [
    { label: "Ingesta", desc: "100+ fuentes", color: "#0070F3", icon: "M3 4h18M3 8h18M3 12h18M3 16h12" },
    { label: "Normalización", desc: "Parsing automático", color: "#00D4FF", icon: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" },
    { label: "Correlación", desc: "2000+ reglas", color: "#00FF88", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
    { label: "Alerta", desc: "MITRE ATT&CK", color: "#FFB800", icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full">
      {steps.map((step, i) => (
        <div key={step.label} className="flex flex-col md:flex-row items-center gap-4">
          <motion.div
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3 border"
              style={{
                backgroundColor: `${step.color}18`,
                borderColor: `${step.color}40`,
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={step.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d={step.icon} />
              </svg>
            </div>
            <div className="font-semibold text-white text-sm">{step.label}</div>
            <div className="text-[#666666] text-xs mt-0.5">{step.desc}</div>
          </motion.div>
          {i < steps.length - 1 && (
            <div className="hidden md:block text-[#2A2A2A] text-2xl mx-1">→</div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── MITRE ATT&CK mini matrix ────────────────────────────────────────────────
const mitreTactics = [
  { tactic: "Reconocimiento", id: "TA0043", count: 21, color: "#FF3B3B" },
  { tactic: "Acceso inicial", id: "TA0001", count: 41, color: "#FF6B35" },
  { tactic: "Ejecución", id: "TA0002", count: 68, color: "#FFB800" },
  { tactic: "Persistencia", id: "TA0003", count: 53, color: "#00D4FF" },
  { tactic: "Escalada privilegios", id: "TA0004", count: 37, color: "#0070F3" },
  { tactic: "Exfiltración", id: "TA0010", count: 19, color: "#00FF88" },
];

// ─── Log Sources ─────────────────────────────────────────────────────────────
const logSources = [
  "AWS CloudTrail", "Azure Activity Log", "GCP Audit Logs", "Nginx / Apache",
  "Windows Event Log", "Linux Syslog", "Palo Alto Firewall", "Cisco ASA",
  "Fortinet FortiGate", "Office 365", "Google Workspace", "Kubernetes Audit",
  "Docker Events", "MySQL / PostgreSQL", "Okta / Entra ID",
];

// ─── Use Case Cards ───────────────────────────────────────────────────────────
const useCases = [
  {
    title: "Detección de ransomware",
    icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
    color: "#FF3B3B",
    desc: "Correlaciona patrones de cifrado masivo, creación de archivos .enc y notas de rescate en segundos. Activa respuesta automática antes de que se propague.",
    tags: ["Regla: mass_encryption", "MITRE T1486", "Respuesta: <5s"],
  },
  {
    title: "Cumplimiento PCI-DSS",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    color: "#00FF88",
    desc: "Genera evidencias automáticas para los requisitos 10.2–10.7. Mapea cada evento de log a los controles PCI-DSS 4.0 sin trabajo manual.",
    tags: ["PCI-DSS 10.2", "Evidencia automática", "Reporte PDF"],
  },
  {
    title: "Investigación forense",
    icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    color: "#00D4FF",
    desc: "Reconstruye la línea de tiempo completa de un incidente con logs inmutables y sellados SHA-256. Búsqueda full-text en terabytes en menos de 2 segundos.",
    tags: ["Log inmutable", "SHA-256 chain", "Búsqueda <2s"],
  },
];

// ─── Comparison Table Data ────────────────────────────────────────────────────
const comparisonRows = [
  { feature: "Fuentes de log soportadas", qatech: "100+", splunk: "100+", elk: "Manual" },
  { feature: "Reglas correlación listas", qatech: "2,000+", splunk: "500+ (licencia)", elk: "Ninguna" },
  { feature: "Gestión gestionada", qatech: "Sí (MSSP)", splunk: "No", elk: "No" },
  { feature: "Soporte en español", qatech: "Nativo", splunk: "No", elk: "No" },
  { feature: "Mapeo MITRE ATT&CK", qatech: "Sí, automático", splunk: "Sí", elk: "Manual" },
  { feature: "Precio inicial USD/mes", qatech: "$149", splunk: "~$2,000", elk: "Infraestructura propia" },
  { feature: "Retención incluida", qatech: "90 días hot / 1 año cold", splunk: "Configurable (costoso)", elk: "Tu disco" },
  { feature: "Onboarding", qatech: "15 minutos", splunk: "Semanas", elk: "Meses" },
];

// ─── PAGE ────────────────────────────────────────────────────────────────────
export default function SIEMPage() {
  const statsRef = useRef<HTMLDivElement>(null);
  const matrixRef = useRef<HTMLDivElement>(null);
  const matrixInView = useInView(matrixRef, { once: true });

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <NavBar />

      {/* ── 1. HERO ───────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-16 overflow-hidden">
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,112,243,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,112,243,0.07) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#0070F3] opacity-10 blur-[120px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto w-full">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0070F3]/30 bg-[#0070F3]/10 text-[#0070F3] text-sm font-medium mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
            Servicio Activo — SIEM
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                SIEM —{" "}
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(90deg, #0070F3, #00D4FF)" }}
                >
                  Gestión de Información y Eventos de Seguridad
                </span>
              </motion.h1>
              <motion.p
                className="text-[#A0A0A0] text-lg md:text-xl leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Centraliza todos tus logs. Detecta amenazas en tiempo real. Responde antes de que sea tarde.
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Link
                  href="/trial"
                  className="px-7 py-3 rounded-lg bg-[#0070F3] hover:bg-[#0050D0] text-white font-semibold transition-all duration-200 shadow-[0_0_24px_rgba(0,112,243,0.4)] hover:shadow-[0_0_40px_rgba(0,112,243,0.6)]"
                >
                  Activar SIEM gratis
                </Link>
                <Link
                  href="/demo"
                  className="px-7 py-3 rounded-lg border border-[#2A2A2A] hover:border-[#0070F3]/40 text-[#A0A0A0] hover:text-white font-semibold transition-all duration-200"
                >
                  Ver demo en vivo
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <LogStreamSVG />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. STATS ──────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 border-t border-[#2A2A2A]" ref={statsRef}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: 100, suffix: "+", label: "Fuentes de logs" },
            { value: 2000, suffix: "+", label: "Reglas predefinidas" },
            { value: 90, suffix: " días", label: "Retención hot" },
            { value: 5, suffix: "s", label: "Detección promedio", prefix: "<" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-[#0070F3] mb-2">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} prefix={stat.prefix ?? ""} />
              </div>
              <div className="text-[#A0A0A0] text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 3. PIPELINE FLOW ──────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#111111] border-y border-[#2A2A2A]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Qué hace nuestro SIEM?</h2>
            <p className="text-[#A0A0A0] max-w-xl mx-auto">
              Cada evento pasa por un pipeline de cuatro etapas antes de convertirse en una alerta accionable.
            </p>
          </motion.div>
          <FlowDiagramSVG />
        </div>
      </section>

      {/* ── 4. FEATURE GRID ───────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Capacidades del SIEM</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Agregación en tiempo real", desc: "Ingesta de logs desde servidores, endpoints, firewalls, cloud y SaaS en milisegundos.", icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4", color: "#0070F3" },
              { title: "Reglas Sigma compatibles", desc: "Importa y exporta reglas de correlación estándar Sigma. Más de 2,000 incluidas de fábrica.", icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4", color: "#00D4FF" },
              { title: "Mapeo MITRE ATT&CK", desc: "Cada alerta se etiqueta automáticamente con táctica, técnica y sub-técnica del framework.", icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7", color: "#00FF88" },
              { title: "Dashboards interactivos", desc: "Visualizaciones en tiempo real: mapa de calor de amenazas, top atacantes, tendencias horarias.", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", color: "#FFB800" },
              { title: "Búsqueda full-text", desc: "Busca en terabytes de logs históricos en menos de 2 segundos con Elasticsearch/OpenSearch.", icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z", color: "#0070F3" },
              { title: "Retención 1 año cold", desc: "Hot: 90 días. Cold: hasta 1 año. Los logs se sellan con SHA-256 para garantizar integridad.", icon: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4", color: "#00D4FF" },
            ].map((feat, i) => (
              <motion.div
                key={feat.title}
                className="bg-[#111111] border border-[#2A2A2A] hover:border-[#0070F3]/30 rounded-xl p-6 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${feat.color}18`, border: `1px solid ${feat.color}30` }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={feat.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={feat.icon} />
                  </svg>
                </div>
                <h3 className="font-semibold text-white mb-2">{feat.title}</h3>
                <p className="text-[#666666] text-sm leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. MITRE ATT&CK MATRIX ────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#111111] border-y border-[#2A2A2A]" ref={matrixRef}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">MITRE ATT&CK integrado</h2>
            <p className="text-[#A0A0A0] max-w-xl mx-auto">
              Cobertura automática de las tácticas más críticas. Cada regla está mapeada al framework global.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {mitreTactics.map((item, i) => (
              <motion.div
                key={item.id}
                className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-5"
                style={{ borderLeftColor: item.color, borderLeftWidth: 3 }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={matrixInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <div className="text-xs text-[#666666] mb-1 font-mono">{item.id}</div>
                <div className="font-semibold text-white text-sm mb-2">{item.tactic}</div>
                <div className="text-3xl font-bold" style={{ color: item.color }}>
                  {item.count}
                </div>
                <div className="text-[#666666] text-xs mt-0.5">técnicas cubiertas</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. LOG SOURCES ────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Compatibilidad de fuentes</h2>
            <p className="text-[#A0A0A0]">Conecta cualquier fuente en minutos. Sin agentes adicionales.</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {logSources.map((source, i) => (
              <motion.div
                key={source}
                className="bg-[#111111] border border-[#2A2A2A] hover:border-[#0070F3]/30 rounded-lg px-3 py-2.5 text-center text-sm text-[#A0A0A0] hover:text-white transition-all duration-200"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
              >
                {source}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. USE CASES ──────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#111111] border-y border-[#2A2A2A]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Casos de uso reales</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {useCases.map((uc, i) => (
              <motion.div
                key={uc.title}
                className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${uc.color}18`, border: `1px solid ${uc.color}30` }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={uc.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={uc.icon} />
                  </svg>
                </div>
                <h3 className="font-semibold text-white mb-2">{uc.title}</h3>
                <p className="text-[#666666] text-sm leading-relaxed mb-4">{uc.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {uc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full text-xs font-mono"
                      style={{ backgroundColor: `${uc.color}12`, color: uc.color }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. COMPARISON TABLE ───────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              qatech360 SIEM vs alternativas
            </h2>
          </motion.div>
          <motion.div
            className="overflow-x-auto rounded-xl border border-[#2A2A2A]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#2A2A2A]">
                  <th className="text-left px-5 py-4 text-[#A0A0A0] font-medium bg-[#111111]">Característica</th>
                  <th className="px-5 py-4 text-[#0070F3] font-semibold bg-[#111111] text-center">qatech360</th>
                  <th className="px-5 py-4 text-[#A0A0A0] font-medium bg-[#111111] text-center">Splunk</th>
                  <th className="px-5 py-4 text-[#A0A0A0] font-medium bg-[#111111] text-center">ELK propio</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? "bg-[#0A0A0A]" : "bg-[#111111]/50"}>
                    <td className="px-5 py-3.5 text-[#A0A0A0]">{row.feature}</td>
                    <td className="px-5 py-3.5 text-center text-[#00FF88] font-medium">{row.qatech}</td>
                    <td className="px-5 py-3.5 text-center text-[#666666]">{row.splunk}</td>
                    <td className="px-5 py-3.5 text-center text-[#666666]">{row.elk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ── 9. MODULE INTEGRATIONS ────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#111111] border-y border-[#2A2A2A]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Integrado con toda la plataforma</h2>
            <p className="text-[#A0A0A0]">El SIEM recibe datos de todos los módulos y los enriquece automáticamente.</p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: "EDR", href: "/services/edr", desc: "Eventos de endpoints", color: "#0070F3" },
              { name: "Threat Intelligence", href: "/services/threat-intelligence", desc: "Enriquecimiento de IOCs", color: "#00D4FF" },
              { name: "Compliance", href: "/services/compliance", desc: "Evidencias automáticas", color: "#00FF88" },
              { name: "XDR", href: "/services/xdr", desc: "Correlación cross-layer", color: "#FFB800" },
              { name: "Cloud Security", href: "/services/cloud-security", desc: "Logs AWS/Azure/GCP", color: "#FF6B35" },
            ].map((mod, i) => (
              <motion.div
                key={mod.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={mod.href}
                  className="flex flex-col items-center bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#0070F3]/30 rounded-xl p-5 min-w-[140px] text-center transition-all duration-300 group"
                >
                  <div
                    className="w-8 h-8 rounded-full mb-3"
                    style={{ backgroundColor: `${mod.color}20`, border: `2px solid ${mod.color}40` }}
                  />
                  <div className="font-semibold text-sm group-hover:text-[#0070F3] transition-colors">{mod.name}</div>
                  <div className="text-[#666666] text-xs mt-1">{mod.desc}</div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. CTA ───────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0070F3]/10 via-transparent to-[#00D4FF]/5 pointer-events-none" />
        <motion.div
          className="relative max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Activa tu SIEM{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #0070F3, #00D4FF)" }}>
              ahora mismo
            </span>
          </h2>
          <p className="text-[#A0A0A0] text-lg mb-8">
            14 días gratis. Sin tarjeta de crédito. Onboarding en 15 minutos.
          </p>
          <Link
            href="/trial"
            className="inline-block px-10 py-4 rounded-lg bg-[#0070F3] hover:bg-[#0050D0] text-white font-semibold text-lg transition-all duration-200 shadow-[0_0_40px_rgba(0,112,243,0.4)] hover:shadow-[0_0_60px_rgba(0,112,243,0.6)]"
          >
            Iniciar prueba gratuita
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
