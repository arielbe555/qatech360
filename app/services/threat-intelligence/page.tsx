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

// ─── IOC Enrichment Flow ─────────────────────────────────────────────────────
function IOCEnrichmentFlow() {
  const steps = [
    { label: "Alerta", color: "#FF3B3B", icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" },
    { label: "VirusTotal", color: "#0070F3", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
    { label: "AbuseIPDB", color: "#00D4FF", icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" },
    { label: "MISP", color: "#FFB800", icon: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" },
    { label: "Feed LATAM", color: "#00FF88", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { label: "Alerta enriquecida", color: "#00FF88", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  ];

  return (
    <div className="w-full overflow-x-auto py-4">
      <div className="flex items-center justify-center gap-2 min-w-max mx-auto px-4">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center gap-2">
            <motion.div
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-2 border"
                style={{ backgroundColor: `${step.color}18`, borderColor: `${step.color}40` }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={step.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={step.icon} />
                </svg>
              </div>
              <span className="text-xs font-medium text-[#A0A0A0] max-w-[70px] leading-tight text-center">{step.label}</span>
            </motion.div>
            {i < steps.length - 1 && (
              <div className="text-[#2A2A2A] text-xl font-light mb-4">→</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Intelligence Sources ─────────────────────────────────────────────────────
const intelligenceSources = [
  {
    name: "MISP",
    desc: "Intercambio bidireccional de IOCs con la comunidad global de seguridad. Comparte y recibe indicadores en tiempo real.",
    detail: "Bidireccional · Formato STIX/TAXII · Comunidad global",
    color: "#FFB800",
    icon: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z",
  },
  {
    name: "VirusTotal",
    desc: "Verificación de hashes, URLs e IPs contra más de 70 motores antivirus y bases de datos de reputación.",
    detail: "70+ motores · Hashes/URLs/IPs · Tiempo real",
    color: "#0070F3",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
  {
    name: "AbuseIPDB",
    desc: "Puntuación de reputación de IPs con historial de actividad maliciosa reportado por la comunidad mundial.",
    detail: "Reputación IP · Historial de abuso · Score 0-100",
    color: "#00D4FF",
    icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
  },
  {
    name: "Feed Propietario LATAM",
    desc: "Nuestro propio feed de inteligencia enfocado en amenazas activas en América Latina, actualizado cada hora.",
    detail: "Exclusivo LATAM · Actualización horaria · Español",
    color: "#00FF88",
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

// ─── MITRE ATT&CK Tactics Strip ───────────────────────────────────────────────
const mitreTactics = [
  { tactic: "Reconocimiento", id: "TA0043", techniques: 21, color: "#FF3B3B" },
  { tactic: "Acceso inicial", id: "TA0001", techniques: 41, color: "#FF6B35" },
  { tactic: "Ejecución", id: "TA0002", techniques: 68, color: "#FFB800" },
  { tactic: "Persistencia", id: "TA0003", techniques: 53, color: "#00D4FF" },
  { tactic: "Exfiltración", id: "TA0010", techniques: 19, color: "#0070F3" },
  { tactic: "Impacto", id: "TA0040", techniques: 13, color: "#00FF88" },
];

// ─── Threat Actor Profiles ─────────────────────────────────────────────────────
const threatActors = [
  { alias: "GrupoFinanciero-MX", sector: "Finanzas", country: "México", ttp: "Phishing + RAT", color: "#FF3B3B" },
  { alias: "BancoTrojan-CO", sector: "Banca", country: "Colombia", ttp: "Banking trojan", color: "#FF6B35" },
  { alias: "RansomLATAM-BR", sector: "Manufactura", country: "Brasil", ttp: "Ransomware", color: "#FFB800" },
  { alias: "GobiernoAPT-AR", sector: "Gobierno", country: "Argentina", ttp: "Spear phishing", color: "#00D4FF" },
  { alias: "EcomCarding-CL", sector: "Retail", country: "Chile", ttp: "Credit card skimming", color: "#0070F3" },
  { alias: "InfraHack-PE", sector: "Energía", country: "Perú", ttp: "ICS/SCADA attacks", color: "#00FF88" },
];

// ─── Feature Grid ─────────────────────────────────────────────────────────────
const features = [
  { title: "Integración MISP", desc: "Intercambio bidireccional de IOCs. Contribuye al ecosistema global y recibe inteligencia fresca automáticamente.", icon: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z", color: "#FFB800" },
  { title: "Enriquecimiento VirusTotal", desc: "Cada hash, URL e IP en tus alertas se verifica automáticamente contra 70+ motores antivirus.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", color: "#0070F3" },
  { title: "Puntuación AbuseIPDB", desc: "Reputación en tiempo real de cada IP que aparece en tus logs. Bloqueo automático de IPs con score alto.", icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z", color: "#00D4FF" },
  { title: "Feed propietario LATAM", desc: "Inteligencia exclusiva de amenazas activas en América Latina. Actualizada cada hora por nuestro equipo SOC.", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "#00FF88" },
  { title: "Etiquetado MITRE ATT&CK", desc: "Cada alerta enriquecida incluye la táctica, técnica y sub-técnica correspondiente del framework MITRE.", icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7", color: "#FFB800" },
  { title: "Perfiles de actores de amenaza", desc: "20+ grupos de amenaza activos en LATAM documentados con TTPs, sectores objetivo y indicadores conocidos.", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", color: "#FF3B3B" },
];

// ─── PAGE ────────────────────────────────────────────────────────────────────
export default function ThreatIntelligencePage() {
  const matrixRef = useRef<HTMLDivElement>(null);
  useInView(matrixRef, { once: true });

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
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-[#0070F3] opacity-8 blur-[140px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto w-full">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0070F3]/30 bg-[#0070F3]/10 text-[#0070F3] text-sm font-medium mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
            Servicio Activo — Inteligencia de Amenazas
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Inteligencia de Amenazas —{" "}
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(90deg, #0070F3, #00D4FF)" }}
                >
                  Cada alerta enriquecida con contexto global + feed LATAM
                </span>
              </motion.h1>
              <motion.p
                className="text-[#A0A0A0] text-lg md:text-xl leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Conoce el actor, la campaña y la contramedida recomendada — antes de que el analista abra el ticket.
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
                  Activa Threat Intelligence
                </Link>
                <Link
                  href="/demo"
                  className="px-7 py-3 rounded-lg border border-[#2A2A2A] hover:border-[#0070F3]/40 text-[#A0A0A0] hover:text-white font-semibold transition-all duration-200"
                >
                  Ver demo
                </Link>
              </motion.div>
            </div>

            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-[#FF3B3B] animate-pulse" />
                  <span className="text-[#FF3B3B] text-xs font-bold tracking-wider">ALERTA ENRIQUECIDA</span>
                </div>
                <div className="font-semibold text-white mb-3">Conexión a C2 detectada — 185.220.101.47</div>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  {[
                    { label: "VirusTotal", value: "47/70 detectado", color: "#FF3B3B" },
                    { label: "AbuseIPDB", value: "Score: 97/100", color: "#FF3B3B" },
                    { label: "Actor", value: "RansomLATAM-BR", color: "#FFB800" },
                    { label: "Táctica", value: "T1071 — C2", color: "#00D4FF" },
                    { label: "MISP IOC", value: "Confirmado en 12 orgs", color: "#0070F3" },
                    { label: "Feed LATAM", value: "Activo en Brasil/MX", color: "#00FF88" },
                  ].map((item) => (
                    <div key={item.label} className="bg-[#0A0A0A] rounded px-3 py-2">
                      <div className="text-[#666666] mb-0.5">{item.label}</div>
                      <div style={{ color: item.color }}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. STATS ──────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 border-t border-[#2A2A2A]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: 20, suffix: "+", label: "Grupos activos LATAM" },
            { value: 1, suffix: "h", label: "Actualización del feed", prefix: "c/" },
            { value: 3, suffix: " feeds", label: "Fuentes de inteligencia" },
            { value: 70, suffix: "+", label: "Motores VirusTotal" },
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

      {/* ── 3. IOC ENRICHMENT FLOW ────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#111111] border-y border-[#2A2A2A]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Flujo de enriquecimiento de IOCs</h2>
            <p className="text-[#A0A0A0] max-w-xl mx-auto">
              Cada alerta se enriquece automáticamente en milisegundos antes de llegar al analista.
            </p>
          </motion.div>
          <IOCEnrichmentFlow />
        </div>
      </section>

      {/* ── 4. INTELLIGENCE SOURCES ───────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Fuentes de inteligencia</h2>
            <p className="text-[#A0A0A0]">Cuatro feeds integrados que trabajan en conjunto para darte contexto completo.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {intelligenceSources.map((src, i) => (
              <motion.div
                key={src.name}
                className="bg-[#111111] border border-[#2A2A2A] hover:border-[#0070F3]/30 rounded-xl p-6 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${src.color}18`, border: `1px solid ${src.color}30` }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={src.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d={src.icon} />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-2" style={{ color: src.color }}>{src.name}</h3>
                    <p className="text-[#A0A0A0] text-sm leading-relaxed mb-3">{src.desc}</p>
                    <div className="text-[#666666] text-xs font-mono">{src.detail}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. FEED LATAM ─────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#111111] border-y border-[#2A2A2A]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="grid lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/20 text-[#00FF88] text-xs font-semibold mb-4">
                EXCLUSIVO qatech360
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Feed propietario LATAM</h2>
              <p className="text-[#A0A0A0] leading-relaxed mb-6">
                Nuestro equipo SOC monitorea constantemente amenazas específicas de América Latina: troyanos bancarios en español, campañas de phishing imitando bancos locales, y grupos de ransomware activos en la región.
              </p>
              <ul className="space-y-3">
                {[
                  "Actores de amenaza dirigidos a LATAM documentados",
                  "Troyanos bancarios: Grandoreiro, Casbaneiro, Guildma",
                  "Campañas de phishing bancario en español",
                  "Infraestructura C2 activa en IPs regionales",
                  "Indicadores de compromiso actualizados cada hora",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#A0A0A0] text-sm">
                    <div className="w-4 h-4 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00FF88]" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#0A0A0A] rounded-xl border border-[#2A2A2A] p-5 font-mono text-xs">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#2A2A2A]">
                <div className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
                <span className="text-[#A0A0A0]">Feed LATAM — Últimos IOCs</span>
              </div>
              <div className="space-y-2.5">
                {[
                  { type: "HASH", value: "a3f2c1d8e9b0f7a2...", campaign: "Grandoreiro-MX-2026", color: "#FF3B3B" },
                  { type: "IP", value: "181.65.44.233", campaign: "BancoTrojan-CO C2", color: "#FF6B35" },
                  { type: "DOMAIN", value: "bancomer-seguro[.]com", campaign: "Phishing BBVA MX", color: "#FFB800" },
                  { type: "URL", value: "hxxp://update-sat[.]mx/...", campaign: "SAT MX phishing", color: "#FFB800" },
                  { type: "IP", value: "189.121.87.44", campaign: "RansomLATAM-BR C2", color: "#FF3B3B" },
                ].map((ioc) => (
                  <div key={ioc.value} className="flex items-center gap-2 py-1 border-b border-[#1A1A1A] last:border-0">
                    <span
                      className="px-1.5 py-0.5 rounded text-xs font-bold w-14 text-center"
                      style={{ backgroundColor: `${ioc.color}15`, color: ioc.color }}
                    >
                      {ioc.type}
                    </span>
                    <span className="text-[#A0A0A0] flex-1 truncate">{ioc.value}</span>
                    <span className="text-[#666666] text-xs">{ioc.campaign}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 6. MITRE ATT&CK TACTICS ───────────────────────────────────────── */}
      <section className="py-20 px-6" ref={matrixRef}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Cobertura MITRE ATT&CK</h2>
            <p className="text-[#A0A0A0] max-w-xl mx-auto">
              Cada alerta enriquecida se mapea automáticamente al framework global de tácticas y técnicas adversariales.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {mitreTactics.map((item, i) => (
              <motion.div
                key={item.id}
                className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5"
                style={{ borderLeftColor: item.color, borderLeftWidth: 3 }}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <div className="text-xs text-[#666666] mb-1 font-mono">{item.id}</div>
                <div className="font-semibold text-white text-sm mb-2">{item.tactic}</div>
                <div className="text-3xl font-bold" style={{ color: item.color }}>{item.techniques}</div>
                <div className="text-[#666666] text-xs mt-0.5">técnicas cubiertas</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. THREAT ACTOR PROFILES ──────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#111111] border-y border-[#2A2A2A]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Perfiles de actores de amenaza LATAM</h2>
            <p className="text-[#A0A0A0] max-w-xl mx-auto">
              Identificamos y documentamos grupos activos en la región para que sepas a quién te enfrentas.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {threatActors.map((actor, i) => (
              <motion.div
                key={actor.alias}
                className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: actor.color }} />
                  <span className="font-mono text-sm font-bold" style={{ color: actor.color }}>{actor.alias}</span>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Sector objetivo</span>
                    <span className="text-[#A0A0A0]">{actor.sector}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">País principal</span>
                    <span className="text-[#A0A0A0]">{actor.country}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">TTP principal</span>
                    <span className="text-[#A0A0A0]">{actor.ttp}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. FEATURE GRID ───────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Capacidades de inteligencia</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => (
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

      {/* ── 9. CTA ────────────────────────────────────────────────────────── */}
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
            Activa Threat Intelligence{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #0070F3, #00D4FF)" }}>
              hoy mismo
            </span>
          </h2>
          <p className="text-[#A0A0A0] text-lg mb-8">
            14 días gratis. Cada alerta incluye contexto completo desde el primer día.
          </p>
          <Link
            href="/trial"
            className="inline-block px-10 py-4 rounded-lg bg-[#0070F3] hover:bg-[#0050D0] text-white font-semibold text-lg transition-all duration-200 shadow-[0_0_40px_rgba(0,112,243,0.4)] hover:shadow-[0_0_60px_rgba(0,112,243,0.6)]"
          >
            Activa Threat Intelligence
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
