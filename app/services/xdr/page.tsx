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

// ─── XDR Correlation SVG Hero ─────────────────────────────────────────────────
function XDRCorrelationSVG() {
  return (
    <svg viewBox="0 0 480 320" className="w-full max-w-lg mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Source signals */}
      {[
        { x: 40, y: 60, label: "Endpoint", color: "#0070F3", icon: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9" },
        { x: 40, y: 140, label: "Red", color: "#00D4FF", icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" },
        { x: 40, y: 220, label: "Cloud", color: "#00FF88", icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" },
        { x: 40, y: 300, label: "Identidad", color: "#FFB800", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
      ].map((src) => (
        <g key={src.label}>
          {/* Signal box */}
          <rect x={src.x - 36} y={src.y - 20} width="72" height="40" rx="8" fill="#1A1A1A" stroke={src.color} strokeWidth="1" opacity="0.8" />
          <text x={src.x} y={src.y + 5} textAnchor="middle" fill={src.color} fontSize="10" fontFamily="system-ui" fontWeight="600">{src.label}</text>
          {/* Connecting line to central engine */}
          <line x1={src.x + 36} y1={src.y} x2="220" y2="170" stroke={src.color} strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
          {/* Moving dot on line */}
          <circle r="3" fill={src.color} opacity="0.8">
            <animateMotion dur={`${1.5 + src.y / 200}s`} repeatCount="indefinite">
              <mpath href={`#path-${src.label}`} />
            </animateMotion>
          </circle>
          <path id={`path-${src.label}`} d={`M${src.x + 36},${src.y} L220,170`} />
        </g>
      ))}

      {/* Central Correlation Engine */}
      <circle cx="280" cy="170" r="58" fill="#111111" stroke="#0070F3" strokeWidth="2" />
      <circle cx="280" cy="170" r="46" fill="#0A0A0A" stroke="#0070F3" strokeWidth="0.5" opacity="0.4" />
      <circle cx="280" cy="170" r="34" fill="#111111" stroke="#0070F3" strokeWidth="0.3" opacity="0.2" />
      <text x="280" y="162" textAnchor="middle" fill="#0070F3" fontSize="9" fontWeight="700" fontFamily="system-ui">Motor de</text>
      <text x="280" y="174" textAnchor="middle" fill="#0070F3" fontSize="9" fontWeight="700" fontFamily="system-ui">Correlación</text>
      <text x="280" y="188" textAnchor="middle" fill="#00FF88" fontSize="8" fontFamily="system-ui">XDR</text>

      {/* Output - Unified incident */}
      <rect x="370" y="135" width="100" height="70" rx="8" fill="#1A1A1A" stroke="#FF3B3B" strokeWidth="1.5" />
      <line x1="338" y1="170" x2="370" y2="170" stroke="#FF3B3B" strokeWidth="1.5" />
      <rect x="378" y="143" width="84" height="8" rx="3" fill="#FF3B3B" opacity="0.2" />
      <text x="382" y="150" fill="#FF3B3B" fontSize="7" fontWeight="700" fontFamily="system-ui">INCIDENTE UNIFICADO</text>
      <text x="378" y="163" fill="#A0A0A0" fontSize="7" fontFamily="system-ui">4 señales correlacionadas</text>
      <text x="378" y="174" fill="#A0A0A0" fontSize="7" fontFamily="system-ui">APT — Lateral movement</text>
      <text x="378" y="185" fill="#666666" fontSize="6.5" fontFamily="system-ui">MTTR estimado: 4.2 min</text>
      <circle cx="450" cy="195" r="8" fill="#00FF88" opacity="0.15" stroke="#00FF88" strokeWidth="1" />
      <text x="450" y="199" textAnchor="middle" fill="#00FF88" fontSize="8" fontFamily="system-ui">✓</text>
    </svg>
  );
}

// ─── Before/After Silos ────────────────────────────────────────────────────────
function SilosVsXDR() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Before: siloed */}
      <div className="bg-[#111111] border border-[#FF3B3B]/20 rounded-xl p-6">
        <div className="text-[#FF3B3B] font-semibold mb-4 flex items-center gap-2">
          <span className="text-lg">✕</span>
          Sin XDR — herramientas aisladas
        </div>
        <div className="space-y-3">
          {["EDR: 12 alertas sin contexto", "Firewall: 3 conexiones sospechosas", "CASB: acceso inusual a S3", "IAM: login desde nueva IP", "SIEM: sin correlación entre capas"].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 rounded-full bg-[#FF3B3B]/60 flex-shrink-0" />
              <span className="text-[#666666]">{item}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-[#2A2A2A] text-[#666666] text-xs">
          Resultado: analista investiga cada herramienta por separado. MTTR: 4+ horas.
        </div>
      </div>

      {/* After: XDR unified */}
      <div className="bg-[#111111] border border-[#00FF88]/20 rounded-xl p-6">
        <div className="text-[#00FF88] font-semibold mb-4 flex items-center gap-2">
          <span className="text-lg">✓</span>
          Con XDR — vista unificada
        </div>
        <div className="bg-[#0A0A0A] rounded-lg p-4 mb-4 border border-[#2A2A2A]">
          <div className="text-[#FF3B3B] text-xs font-bold mb-2">INCIDENTE #2847 — APT Lateral Movement</div>
          <div className="space-y-1.5 text-xs text-[#A0A0A0]">
            <div>08:14:22 Login sospechoso — IP: 45.33.32.156</div>
            <div>08:14:35 Nuevo proceso: powershell.exe -encoded</div>
            <div>08:14:41 Conexión saliente a C2: 185.220.x.x</div>
            <div>08:14:58 Exfiltración intentada — S3 bucket: prod-data</div>
          </div>
        </div>
        <div className="text-[#00FF88] text-xs">
          Resultado: 1 incidente, cadena de ataque completa, MTTR: 4.2 minutos.
        </div>
      </div>
    </div>
  );
}

// ─── XDR Architecture SVG ─────────────────────────────────────────────────────
function XDRArchSVG() {
  const layers = [
    { label: "Endpoints", color: "#0070F3" },
    { label: "Red / Firewall", color: "#00D4FF" },
    { label: "Cloud (AWS/GCP/Azure)", color: "#00FF88" },
    { label: "Identidad / IAM", color: "#FFB800" },
  ];

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <div className="flex flex-wrap justify-center gap-3 w-full">
        {layers.map((layer) => (
          <div
            key={layer.label}
            className="px-5 py-2.5 rounded-lg text-sm font-medium border"
            style={{ backgroundColor: `${layer.color}12`, borderColor: `${layer.color}30`, color: layer.color }}
          >
            {layer.label}
          </div>
        ))}
      </div>
      <div className="text-[#2A2A2A] text-2xl">↓</div>
      <div className="bg-[#1A1A1A] border border-[#0070F3]/30 rounded-xl px-8 py-4 text-center">
        <div className="text-[#0070F3] font-bold text-lg">Motor de Correlación XDR</div>
        <div className="text-[#666666] text-xs mt-1">Análisis cross-layer + MITRE ATT&CK mapping</div>
      </div>
      <div className="text-[#2A2A2A] text-2xl">↓</div>
      <div className="flex flex-wrap justify-center gap-3">
        {[
          { label: "Línea de tiempo unificada", color: "#00D4FF" },
          { label: "Causa raíz automática", color: "#00FF88" },
          { label: "Respuesta automatizada", color: "#FFB800" },
        ].map((out) => (
          <div
            key={out.label}
            className="px-4 py-2 rounded-lg text-xs font-medium border"
            style={{ backgroundColor: `${out.color}12`, borderColor: `${out.color}30`, color: out.color }}
          >
            {out.label}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Incident Timeline SVG ────────────────────────────────────────────────────
function IncidentTimelineSVG() {
  const events = [
    { time: "08:14:22", type: "Acceso inicial", detail: "Login sospechoso — IP rusa, fuerza bruta SSH", color: "#FFB800", mitre: "T1110" },
    { time: "08:14:35", type: "Ejecución", detail: "powershell.exe -EncodedCommand ejecutado", color: "#FF6B35", mitre: "T1059.001" },
    { time: "08:14:41", type: "C2 Communication", detail: "Conexión saliente a 185.220.x.x (TOR exit)", color: "#FF3B3B", mitre: "T1071" },
    { time: "08:14:58", type: "Exfiltración", detail: "Intento de subida a S3 bucket externo — BLOQUEADO", color: "#FF3B3B", mitre: "T1537" },
    { time: "08:15:06", type: "XDR Response", detail: "Endpoint aislado · IP bloqueada · Analista notificado", color: "#00FF88", mitre: "Respuesta" },
  ];

  return (
    <div className="space-y-4">
      {events.map((ev, i) => (
        <motion.div
          key={ev.time}
          className="flex gap-4 items-start"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
        >
          <div className="flex flex-col items-center flex-shrink-0">
            <div
              className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-bold"
              style={{ borderColor: ev.color, backgroundColor: `${ev.color}12`, color: ev.color }}
            >
              {i + 1}
            </div>
            {i < events.length - 1 && <div className="w-px h-8 bg-[#2A2A2A] mt-1" />}
          </div>
          <div className="flex-1 bg-[#111111] border border-[#2A2A2A] rounded-lg p-4 min-w-0">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
              <div className="font-semibold text-sm" style={{ color: ev.color }}>{ev.type}</div>
              <div className="flex items-center gap-2">
                <span className="text-[#666666] text-xs font-mono">{ev.time}</span>
                <span
                  className="px-2 py-0.5 rounded text-xs font-mono"
                  style={{ backgroundColor: `${ev.color}15`, color: ev.color }}
                >
                  {ev.mitre}
                </span>
              </div>
            </div>
            <div className="text-[#A0A0A0] text-sm">{ev.detail}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Feature Grid ─────────────────────────────────────────────────────────────
const xdrFeatures = [
  { title: "Reconstrucción de cadena de ataque", desc: "Ve el ataque completo, de principio a fin, en una sola línea de tiempo cross-layer.", icon: "M13 10V3L4 14h7v7l9-11h-7z", color: "#0070F3" },
  { title: "Análisis de causa raíz automático", desc: "XDR identifica el vector inicial de entrada y muestra el camino completo de propagación.", icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7", color: "#00D4FF" },
  { title: "Integraciones SOAR", desc: "Conecta con PagerDuty, Slack, Jira y ServiceNow. Tickets automáticos por cada incidente P1.", icon: "M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z", color: "#00FF88" },
  { title: "Workspace de threat hunting", desc: "Consultas KQL/SQL sobre todos tus datos de seguridad. Caza amenazas dormidas antes de que actúen.", icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z", color: "#FFB800" },
  { title: "API para SIEM/SOAR", desc: "Exporta incidentes, alertas e IOCs vía REST API. Integra con tu SIEM existente en minutos.", icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4", color: "#FF6B35" },
  { title: "MTTR promedio <5 minutos", desc: "Detección + correlación + respuesta automatizada. El tiempo entre amenaza y contención cae un 90%.", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", color: "#0070F3" },
];

// ─── SOAR Integrations ────────────────────────────────────────────────────────
const soarIntegrations = [
  { name: "PagerDuty", desc: "Alertas P1/P2 con escalado automático", color: "#00D4FF" },
  { name: "Slack", desc: "Notificaciones en canal #soc-alerts", color: "#0070F3" },
  { name: "Jira", desc: "Tickets automáticos con timeline del incidente", color: "#00FF88" },
  { name: "ServiceNow", desc: "CMDB enrichment + ITSM integration", color: "#FFB800" },
];

// ─── XDR vs EDR vs SIEM comparison ───────────────────────────────────────────
const comparisonRows = [
  { feature: "Cobertura", xdr: "Endpoint + Red + Cloud + Identidad", edr: "Solo endpoints", siem: "Logs de cualquier fuente" },
  { feature: "Correlación automática", xdr: "Cross-layer nativa", edr: "Solo endpoint", siem: "Manual con reglas" },
  { feature: "Causa raíz automática", xdr: "Sí", edr: "Parcial", siem: "No" },
  { feature: "Respuesta activa", xdr: "Cross-layer", edr: "Solo endpoint", siem: "Vía integraciones" },
  { feature: "MTTR típico", xdr: "<5 minutos", edr: "<15 minutos", siem: "1–4 horas" },
  { feature: "Ideal para", xdr: "APT, ataques multi-etapa", edr: "Malware, ransomware", siem: "Compliance, forensics" },
];

// ─── PAGE ────────────────────────────────────────────────────────────────────
export default function XDRPage() {
  const archRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <NavBar />

      {/* ── 1. HERO ───────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-16 overflow-hidden">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,112,243,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,112,243,0.06) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] rounded-full bg-[#0070F3] opacity-8 blur-[150px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto w-full">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0070F3]/30 bg-[#0070F3]/10 text-[#0070F3] text-sm font-medium mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
            Servicio Activo — XDR
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                XDR —{" "}
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(90deg, #0070F3, #00D4FF)" }}
                >
                  Detección y Respuesta Extendida
                </span>
              </motion.h1>
              <motion.p
                className="text-[#A0A0A0] text-lg md:text-xl leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Endpoint + Red + Cloud + Identidad — un solo incidente, un solo panel.
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Link
                  href="/demo"
                  className="px-7 py-3 rounded-lg bg-[#0070F3] hover:bg-[#0050D0] text-white font-semibold transition-all duration-200 shadow-[0_0_24px_rgba(0,112,243,0.4)] hover:shadow-[0_0_40px_rgba(0,112,243,0.6)]"
                >
                  Ver XDR en acción
                </Link>
                <Link
                  href="/trial"
                  className="px-7 py-3 rounded-lg border border-[#2A2A2A] hover:border-[#0070F3]/40 text-[#A0A0A0] hover:text-white font-semibold transition-all duration-200"
                >
                  Prueba gratuita
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <XDRCorrelationSVG />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. STATS ──────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 border-t border-[#2A2A2A]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: 5, suffix: " min", label: "MTTR promedio", prefix: "<" },
            { value: 4, suffix: " capas", label: "Cobertura cross-layer" },
            { value: 100, suffix: "%", label: "Cobertura MITRE ATT&CK" },
            { value: 90, suffix: "%", label: "Reducción de MTTR" },
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

      {/* ── 3. BEFORE/AFTER ───────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#111111] border-y border-[#2A2A2A]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">El problema con las soluciones aisladas</h2>
            <p className="text-[#A0A0A0] max-w-xl mx-auto">
              5 herramientas distintas, 5 dashboards, 0 contexto compartido. XDR lo unifica todo.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SilosVsXDR />
          </motion.div>
        </div>
      </section>

      {/* ── 4. ARCHITECTURE ───────────────────────────────────────────────── */}
      <section className="py-20 px-6" ref={archRef}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Arquitectura XDR</h2>
            <p className="text-[#A0A0A0] max-w-xl mx-auto">
              Todas las fuentes alimentan un único motor de correlación que produce incidentes, no alertas.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <XDRArchSVG />
          </motion.div>
        </div>
      </section>

      {/* ── 5. FEATURE GRID ───────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#111111] border-y border-[#2A2A2A]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Capacidades XDR</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {xdrFeatures.map((feat, i) => (
              <motion.div
                key={feat.title}
                className="bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#0070F3]/30 rounded-xl p-6 transition-all duration-300"
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

      {/* ── 6. INCIDENT TIMELINE ──────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ejemplo de incidente correlacionado</h2>
            <p className="text-[#A0A0A0] max-w-xl mx-auto">
              Un ataque APT real reconstruido en su totalidad por el motor XDR en menos de 45 segundos.
            </p>
          </motion.div>
          <div className="max-w-2xl mx-auto">
            <IncidentTimelineSVG />
          </div>
        </div>
      </section>

      {/* ── 7. SOAR INTEGRATIONS ──────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#111111] border-y border-[#2A2A2A]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Integraciones SOAR</h2>
            <p className="text-[#A0A0A0]">Conecta tu stack existente. Los incidentes fluyen automáticamente.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {soarIntegrations.map((integration, i) => (
              <motion.div
                key={integration.name}
                className="bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#0070F3]/30 rounded-xl p-6 text-center transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div
                  className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                  style={{ backgroundColor: `${integration.color}15`, border: `1px solid ${integration.color}30` }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={integration.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <div className="font-semibold text-white mb-1">{integration.name}</div>
                <div className="text-[#666666] text-xs">{integration.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. THREAT HUNTING WORKSPACE ───────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="grid lg:grid-cols-2 gap-10 items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Workspace de threat hunting</h2>
              <p className="text-[#A0A0A0] leading-relaxed mb-6">
                No esperes a que las alertas lleguen. Caza amenazas dormidas usando consultas directas sobre todos tus datos de seguridad. Sintaxis KQL familiar, datos de todas las capas.
              </p>
              <ul className="space-y-3 text-sm text-[#A0A0A0]">
                {[
                  "Búsquedas KQL sobre datos cross-layer",
                  "Plantillas de hunt para TTPs conocidas",
                  "Compartir hunts entre analistas del equipo",
                  "Scheduling de hunts recurrentes",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-[#0070F3]/10 border border-[#0070F3]/30 flex items-center justify-center flex-shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0070F3]" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#0A0A0A] rounded-xl border border-[#2A2A2A] p-5 font-mono text-xs">
              <div className="text-[#666666] mb-3 text-xs flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#0070F3] animate-pulse" />
                Threat Hunt — Lateral Movement Detection
              </div>
              <div className="space-y-1 text-[#A0A0A0]">
                <div><span className="text-[#00D4FF]">network_events</span></div>
                <div><span className="text-[#0070F3]">| where</span> <span className="text-[#00FF88]">dest_port in</span> (445, 135, 5985)</div>
                <div><span className="text-[#0070F3]">| where</span> src_host != dest_host</div>
                <div><span className="text-[#0070F3]">| join kind=inner</span> (</div>
                <div className="ml-4"><span className="text-[#00D4FF]">process_events</span></div>
                <div className="ml-4"><span className="text-[#0070F3]">| where</span> parent_name == <span className="text-[#FFB800]">"winlogon.exe"</span></div>
                <div>) <span className="text-[#0070F3]">on</span> host</div>
                <div><span className="text-[#0070F3]">| summarize</span> count() <span className="text-[#0070F3]">by</span> src_host, dest_host</div>
                <div><span className="text-[#0070F3]">| where</span> count_ &gt; 5</div>
              </div>
              <div className="mt-4 pt-3 border-t border-[#2A2A2A]">
                <div className="text-[#00FF88]">3 equipos con movimiento lateral detectado</div>
                <div className="text-[#666666] mt-1">Tiempo de ejecución: 0.87s · 2.4TB escaneados</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 9. COMPARISON TABLE ───────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#111111] border-y border-[#2A2A2A]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">XDR vs EDR vs SIEM</h2>
            <p className="text-[#A0A0A0]">¿Cuándo usar cada uno? ¿Por qué XDR los une a todos?</p>
          </motion.div>
          <motion.div
            className="overflow-x-auto rounded-xl border border-[#2A2A2A]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#2A2A2A] bg-[#111111]">
                  <th className="text-left px-5 py-4 text-[#A0A0A0] font-medium">Característica</th>
                  <th className="px-5 py-4 text-[#0070F3] font-semibold text-center">XDR</th>
                  <th className="px-5 py-4 text-[#A0A0A0] font-medium text-center">EDR</th>
                  <th className="px-5 py-4 text-[#A0A0A0] font-medium text-center">SIEM</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? "bg-[#0A0A0A]" : "bg-[#111111]/50"}>
                    <td className="px-5 py-3.5 text-[#A0A0A0]">{row.feature}</td>
                    <td className="px-5 py-3.5 text-center text-[#00FF88] font-medium">{row.xdr}</td>
                    <td className="px-5 py-3.5 text-center text-[#666666]">{row.edr}</td>
                    <td className="px-5 py-3.5 text-center text-[#666666]">{row.siem}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ── 10. CTA ───────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0070F3]/8 via-transparent to-[#00D4FF]/5 pointer-events-none" />
        <motion.div
          className="relative max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Ve XDR en acción{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #0070F3, #00D4FF)" }}>
              en vivo
            </span>
          </h2>
          <p className="text-[#A0A0A0] text-lg mb-8">
            30 minutos. Verás cómo un ataque APT completo se detecta y contiene en tiempo real.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/demo"
              className="px-10 py-4 rounded-lg bg-[#0070F3] hover:bg-[#0050D0] text-white font-semibold text-lg transition-all duration-200 shadow-[0_0_40px_rgba(0,112,243,0.4)] hover:shadow-[0_0_60px_rgba(0,112,243,0.6)]"
            >
              Solicitar demo en vivo
            </Link>
            <Link
              href="/trial"
              className="px-10 py-4 rounded-lg border border-[#2A2A2A] hover:border-[#0070F3]/40 text-[#A0A0A0] hover:text-white font-semibold text-lg transition-all duration-200"
            >
              Prueba gratuita 14 días
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
