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

// ─── Search Interface Mockup ──────────────────────────────────────────────────
function SearchMockup() {
  return (
    <div className="bg-[#0A0A0A] rounded-xl border border-[#2A2A2A] overflow-hidden font-mono text-xs">
      <div className="flex items-center gap-2 px-4 py-3 bg-[#111111] border-b border-[#2A2A2A]">
        <div className="w-3 h-3 rounded-full bg-[#FF3B3B]" />
        <div className="w-3 h-3 rounded-full bg-[#FFB800]" />
        <div className="w-3 h-3 rounded-full bg-[#00FF88]" />
        <span className="ml-2 text-[#666666]">qatech360 — Búsqueda de logs</span>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 bg-[#111111] border border-[#0070F3]/40 rounded-lg px-3 py-2 mb-4">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="2">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[#0070F3]">event.type:ssh AND user:root AND status:failed</span>
          <span className="ml-auto text-[#00FF88]">1,247 resultados · 0.8s</span>
        </div>
        <div className="space-y-2">
          {[
            { time: "03:15:22", host: "srv-prod-01", msg: "Failed password for root from 185.220.101.47 port 54231 ssh2", color: "#FF3B3B" },
            { time: "03:15:21", host: "srv-prod-01", msg: "Failed password for root from 185.220.101.47 port 54230 ssh2", color: "#FF3B3B" },
            { time: "03:15:20", host: "web-02", msg: "Failed password for root from 185.220.101.47 port 54229 ssh2", color: "#FFB800" },
            { time: "03:15:19", host: "web-02", msg: "Failed password for root from 185.220.101.47 port 54228 ssh2", color: "#FFB800" },
            { time: "03:15:18", host: "db-01", msg: "Failed password for root from 185.220.101.47 port 54227 ssh2", color: "#FF3B3B" },
          ].map((log, i) => (
            <div key={i} className="flex items-start gap-3 py-1.5 border-b border-[#1A1A1A] last:border-0">
              <span className="text-[#666666] w-16 flex-shrink-0">{log.time}</span>
              <span className="text-[#0070F3] w-20 flex-shrink-0">{log.host}</span>
              <span className="text-[#A0A0A0] flex-1 leading-relaxed">{log.msg}</span>
              <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: log.color }} />
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-[#2A2A2A] flex items-center justify-between text-[#666666]">
          <span>Buscado en 4.2 TB · 847M eventos</span>
          <span className="text-[#00FF88]">Brute force SSH — IP bloqueada ✓</span>
        </div>
      </div>
    </div>
  );
}

// ─── Log Sources ──────────────────────────────────────────────────────────────
const logSources = [
  { name: "Syslog / rsyslog", desc: "Logs del sistema Linux/Unix. Configuración con una línea en rsyslog.conf.", color: "#FFB800", icon: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" },
  { name: "Beats (Filebeat / Winlogbeat)", desc: "Recopila logs de archivos y Windows Event Log con el agente ligero Elastic Beats.", color: "#0070F3", icon: "M3 4h18M3 8h18M3 12h18M3 16h12" },
  { name: "API / HTTP endpoint", desc: "Envía logs desde tus aplicaciones vía REST API. Formato JSON libre con auto-parsing.", color: "#00D4FF", icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" },
  { name: "Amazon S3 / GCS", desc: "Ingestión automática desde buckets S3 y Google Cloud Storage para logs de cloud.", color: "#00FF88", icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" },
  { name: "SaaS webhooks", desc: "Recibe logs de Salesforce, GitHub, Okta, Slack y más de 200 SaaS via webhooks.", color: "#FF6B35", icon: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" },
];

// ─── Storage Tiers ────────────────────────────────────────────────────────────
const storageTiers = [
  {
    name: "Hot",
    retention: "90 días",
    storage: "NVMe SSD",
    desc: "Búsqueda full-text en milisegundos. Todos los campos indexados. Ideal para investigaciones activas.",
    color: "#FF3B3B",
    speed: "< 1s búsqueda",
  },
  {
    name: "Warm",
    retention: "1 año",
    storage: "SSD",
    desc: "Búsqueda en segundos. Índices comprimidos. Para investigaciones históricas y cumplimiento trimestral.",
    color: "#FFB800",
    speed: "< 5s búsqueda",
  },
  {
    name: "Cold",
    retention: "7 años",
    storage: "S3-compatible",
    desc: "Almacenamiento económico para retención legal y cumplimiento. Restauración bajo demanda en horas.",
    color: "#0070F3",
    speed: "Restauración bajo demanda",
  },
];

// ─── Features ─────────────────────────────────────────────────────────────────
const features = [
  { title: "500+ formatos de log", desc: "Auto-parsing para syslog, JSON, CSV, CEF, LEEF, Windows Event Log, Apache, Nginx y 490+ más.", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", color: "#0070F3" },
  { title: "Búsqueda full-text", desc: "Elasticsearch / OpenSearch bajo el capó. Busca en terabytes con queries KQL o Lucene en menos de 1 segundo.", icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z", color: "#00D4FF" },
  { title: "Almacenamiento por capas", desc: "Hot (90 días NVMe), Warm (1 año SSD), Cold (7 años S3). Migración automática según edad del log.", icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4", color: "#00FF88" },
  { title: "Retención configurable", desc: "Desde 30 días hasta 7 años. Configura retención diferenciada por tipo de log o fuente.", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", color: "#FFB800" },
  { title: "Sellado a prueba de manipulación", desc: "Cadena SHA-256 que sella cada lote de logs. Cualquier intento de modificación rompe la cadena y genera alerta.", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", color: "#FF3B3B" },
  { title: "Ingesta ilimitada", desc: "Sin límite de volumen de ingestión. Paga solo por retención y endpoints activos, no por GBs de logs.", icon: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12", color: "#00D4FF" },
];

// ─── Log Flow ─────────────────────────────────────────────────────────────────
const logFlowSteps = [
  { label: "Fuentes", desc: "Syslog, API, S3, SaaS", color: "#0070F3" },
  { label: "Colector", desc: "Agente + webhook receiver", color: "#00D4FF" },
  { label: "Parser", desc: "500+ formatos", color: "#FFB800" },
  { label: "Indexador", desc: "Elasticsearch", color: "#00FF88" },
  { label: "Búsqueda + Retención", desc: "Hot / Warm / Cold", color: "#FF3B3B" },
];

// ─── PAGE ────────────────────────────────────────────────────────────────────
export default function LogManagementPage() {
  const searchRef = useRef<HTMLDivElement>(null);
  useInView(searchRef, { once: true });

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
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#0070F3] opacity-8 blur-[140px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto w-full">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0070F3]/30 bg-[#0070F3]/10 text-[#0070F3] text-sm font-medium mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
            Servicio Activo — Gestión de Logs
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Gestión de Logs —{" "}
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(90deg, #0070F3, #00D4FF)" }}
                >
                  Centraliza, busca y retén logs de toda tu infraestructura
                </span>
              </motion.h1>
              <motion.p
                className="text-[#A0A0A0] text-lg md:text-xl leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Un solo lugar para todos tus logs. Búsqueda en terabytes en menos de 1 segundo. Retención hasta 7 años.
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
                  Centraliza tus logs hoy
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
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <SearchMockup />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. STATS ──────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 border-t border-[#2A2A2A]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: 500, suffix: "+", label: "Formatos soportados" },
            { value: 7, suffix: " años", label: "Retención máxima" },
            { value: 1, suffix: "s", label: "Búsqueda full-text", prefix: "<" },
            { value: 100, suffix: "%", label: "Ingesta sin límite" },
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

      {/* ── 3. LOG SOURCES ────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#111111] border-y border-[#2A2A2A]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Fuentes de ingestión</h2>
            <p className="text-[#A0A0A0] max-w-xl mx-auto">
              Conecta cualquier fuente de logs en minutos. Sin agentes adicionales en la mayoría de los casos.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {logSources.map((src, i) => (
              <motion.div
                key={src.name}
                className="bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#0070F3]/30 rounded-xl p-6 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${src.color}18`, border: `1px solid ${src.color}30` }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={src.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={src.icon} />
                  </svg>
                </div>
                <h3 className="font-semibold text-white mb-2">{src.name}</h3>
                <p className="text-[#666666] text-sm leading-relaxed">{src.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. LOG FLOW ───────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pipeline de logs</h2>
            <p className="text-[#A0A0A0]">Cada log pasa por un pipeline de 5 etapas antes de quedar disponible para búsqueda.</p>
          </motion.div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            {logFlowSteps.map((step, i) => (
              <div key={step.label} className="flex flex-col md:flex-row items-center gap-4">
                <motion.div
                  className="flex flex-col items-center text-center max-w-[130px]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-3 font-bold text-lg border-2"
                    style={{ backgroundColor: `${step.color}15`, borderColor: `${step.color}50`, color: step.color }}
                  >
                    {i + 1}
                  </div>
                  <div className="font-semibold text-white text-sm mb-1">{step.label}</div>
                  <div className="text-[#666666] text-xs">{step.desc}</div>
                </motion.div>
                {i < logFlowSteps.length - 1 && (
                  <div className="hidden md:block text-[#2A2A2A] text-2xl">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. STORAGE TIERS ──────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#111111] border-y border-[#2A2A2A]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Almacenamiento por capas</h2>
            <p className="text-[#A0A0A0] max-w-xl mx-auto">
              Migración automática entre capas según la edad del log. Optimiza costo vs rendimiento de búsqueda.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {storageTiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6"
                style={{ borderTopColor: tier.color, borderTopWidth: 3 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="font-bold text-2xl mb-1" style={{ color: tier.color }}>{tier.name}</div>
                <div className="text-[#666666] text-sm mb-4">{tier.storage}</div>
                <div
                  className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
                  style={{ backgroundColor: `${tier.color}15`, color: tier.color }}
                >
                  {tier.retention}
                </div>
                <p className="text-[#A0A0A0] text-sm leading-relaxed mb-4">{tier.desc}</p>
                <div className="text-xs font-mono" style={{ color: tier.color }}>{tier.speed}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. SEARCH & TAMPER-EVIDENT ────────────────────────────────────── */}
      <section className="py-20 px-6" ref={searchRef}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="grid lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Búsqueda en terabytes en segundos</h2>
              <p className="text-[#A0A0A0] leading-relaxed mb-6">
                Elasticsearch bajo el capó. Escribe una query KQL o en lenguaje natural y obtén resultados en menos de un segundo, incluso en años de logs históricos.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  { query: 'event.type:ssh AND status:failed AND count:>50', desc: "Detecta brute force SSH" },
                  { query: 'source.ip:185.220.101.47 AND @timestamp:[now-7d TO now]', desc: "Historial de una IP" },
                  { query: 'user:root AND process:*curl* AND destination.port:443', desc: "Exfiltración sospechosa" },
                ].map((ex) => (
                  <div key={ex.query} className="bg-[#111111] border border-[#2A2A2A] rounded-lg p-3">
                    <div className="font-mono text-xs text-[#0070F3] mb-1">{ex.query}</div>
                    <div className="text-[#666666] text-xs">{ex.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Logs a prueba de manipulación</h3>
              <p className="text-[#A0A0A0] text-sm leading-relaxed mb-6">
                Cada lote de logs se sella con una cadena SHA-256. Si alguien modifica un log histórico, la cadena se rompe y se genera una alerta inmediata. Esencial para evidencia forense y auditorías.
              </p>
              <div className="bg-[#0A0A0A] rounded-xl border border-[#2A2A2A] p-4 font-mono text-xs space-y-2">
                <div className="text-[#666666] mb-2">Cadena de custodia — Lote 2026-03-17T03:00:00Z</div>
                {[
                  { label: "Lote anterior", hash: "d8f3a2c9...1b4e", color: "#0070F3" },
                  { label: "Hash eventos", hash: "a3f2c1d8...9b0f", color: "#00D4FF" },
                  { label: "Hash sellado", hash: "e9b0f7a2...c1d8", color: "#00FF88" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="text-[#666666] w-28">{item.label}:</span>
                    <span style={{ color: item.color }}>{item.hash}</span>
                  </div>
                ))}
                <div className="pt-2 border-t border-[#2A2A2A] text-[#00FF88]">
                  ✓ Cadena íntegra — no modificado
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 7. FEATURE GRID ───────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#111111] border-y border-[#2A2A2A]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Capacidades de la plataforma</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => (
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

      {/* ── 8. CTA ────────────────────────────────────────────────────────── */}
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
            Centraliza todos tus logs{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #0070F3, #00D4FF)" }}>
              hoy mismo
            </span>
          </h2>
          <p className="text-[#A0A0A0] text-lg mb-8">
            14 días gratis. Ingestión ilimitada. Búsqueda disponible en menos de 5 minutos.
          </p>
          <Link
            href="/trial"
            className="inline-block px-10 py-4 rounded-lg bg-[#0070F3] hover:bg-[#0050D0] text-white font-semibold text-lg transition-all duration-200 shadow-[0_0_40px_rgba(0,112,243,0.4)] hover:shadow-[0_0_60px_rgba(0,112,243,0.6)]"
          >
            Centraliza tus logs hoy
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
