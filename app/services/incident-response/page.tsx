"use client";

import { motion, useInView } from "framer-motion";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
}: {
  target: number;
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const startTime = performance.now();
          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(target * eased));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

// ─── Pulse Timer SVG ─────────────────────────────────────────────────────────
function PulseTimerSVG() {
  return (
    <div className="relative w-64 h-64 mx-auto">
      {/* Outer pulsing rings */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-[#0070F3]/40"
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-4 rounded-full border-2 border-[#00D4FF]/30"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      />
      {/* Inner circle */}
      <div className="absolute inset-8 rounded-full bg-gradient-to-br from-[#0070F3]/20 to-[#00D4FF]/10 border border-[#0070F3]/40 flex flex-col items-center justify-center">
        <div className="text-[#FF3B3B] text-xs font-bold uppercase tracking-widest mb-1">Prioridad 1</div>
        <div className="text-white text-4xl font-black leading-none">&lt;15</div>
        <div className="text-[#00D4FF] text-lg font-bold">minutos</div>
        <div className="text-[#666666] text-xs mt-1">tiempo de respuesta</div>
      </div>
    </div>
  );
}

// ─── IR Process SVG ───────────────────────────────────────────────────────────
function IRProcessSVG() {
  const steps = [
    { label: "Alerta", icon: "🔔", color: "#FF3B3B", desc: "Detección automática" },
    { label: "Triage", icon: "🔍", color: "#FFB800", desc: "Clasificación P1-P4" },
    { label: "Investigación", icon: "🧩", color: "#0070F3", desc: "Análisis forense" },
    { label: "Contención", icon: "🛡️", color: "#00D4FF", desc: "Aislamiento rápido" },
    { label: "Erradicación", icon: "🔥", color: "#00FF88", desc: "Eliminar amenaza" },
    { label: "Reporte", icon: "📋", color: "#A0A0A0", desc: "Informe completo" },
  ];

  return (
    <svg viewBox="0 0 720 160" className="w-full max-w-3xl mx-auto" aria-label="Proceso de respuesta a incidentes">
      <defs>
        <marker id="ir-arr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#2A2A2A" />
        </marker>
      </defs>
      {steps.map((step, i) => {
        const x = 12 + i * 118;
        return (
          <g key={step.label}>
            <rect x={x} y="20" width="106" height="110" rx="10" fill="#111111" stroke={step.color} strokeWidth="1.5" strokeOpacity="0.5" />
            <text x={x + 53} y="52" textAnchor="middle" fontSize="24">{step.icon}</text>
            <text x={x + 53} y="74" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="800">{step.label}</text>
            <text x={x + 53} y="90" textAnchor="middle" fill="#666666" fontSize="8">{step.desc}</text>
            <text x={x + 53} y="118" textAnchor="middle" fill={step.color} fontSize="9" fontWeight="700">Paso {i + 1}</text>
            {i < steps.length - 1 && (
              <line
                x1={x + 106} y1="75"
                x2={x + 118} y2="75"
                stroke="#2A2A2A" strokeWidth="2"
                markerEnd="url(#ir-arr)"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}

// ─── SOC Map SVG ─────────────────────────────────────────────────────────────
function SOCMapSVG() {
  const cities = [
    { name: "México", tz: "GMT-6", x: 155, y: 145, color: "#0070F3" },
    { name: "Colombia / Perú", tz: "GMT-5", x: 225, y: 210, color: "#00D4FF" },
    { name: "Chile", tz: "GMT-4", x: 215, y: 295, color: "#00FF88" },
    { name: "Brasil / Argentina", tz: "GMT-3", x: 290, y: 255, color: "#FFB800" },
  ];

  return (
    <svg viewBox="0 0 480 380" className="w-full max-w-sm mx-auto" aria-label="Mapa de cobertura SOC LATAM">
      <defs>
        <radialGradient id="map-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0070F3" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0070F3" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Map background placeholder — LATAM outline simplified */}
      <rect x="0" y="0" width="480" height="380" rx="16" fill="#111111" />
      {/* Simplified LATAM landmass */}
      <path
        d="M 140 80 L 200 70 L 260 90 L 280 130 L 300 110 L 320 130 L 310 170 L 290 180 L 310 210 L 300 250 L 270 310 L 240 340 L 200 350 L 180 310 L 160 270 L 140 230 L 120 200 L 100 170 L 110 140 Z"
        fill="#1A1A1A"
        stroke="#2A2A2A"
        strokeWidth="1"
      />

      {/* SOC coverage glow */}
      <ellipse cx="225" cy="220" rx="100" ry="120" fill="url(#map-glow)" />

      {/* City dots */}
      {cities.map((city) => (
        <g key={city.name}>
          <motion.circle
            cx={city.x} cy={city.y} r="6"
            fill={city.color}
            opacity="0.9"
            animate={{ r: [5, 8, 5], opacity: [0.9, 0.5, 0.9] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <circle cx={city.x} cy={city.y} r="3" fill={city.color} />
          <text x={city.x + 12} y={city.y - 4} fill="#FFFFFF" fontSize="9" fontWeight="700">{city.name}</text>
          <text x={city.x + 12} y={city.y + 8} fill="#666666" fontSize="8">{city.tz}</text>
        </g>
      ))}

      {/* Label */}
      <rect x="8" y="330" width="200" height="40" rx="8" fill="#1A1A1A" />
      <circle cx="24" cy="350" r="5" fill="#00FF88" opacity="0.9" />
      <text x="36" y="347" fill="#FFFFFF" fontSize="10" fontWeight="700">SOC LATAM — 24/7/365</text>
      <text x="36" y="361" fill="#666666" fontSize="8">Analistas en todas las zonas horarias</text>
    </svg>
  );
}

// ─── Report Preview SVG ───────────────────────────────────────────────────────
function IRReportSVG() {
  return (
    <svg viewBox="0 0 520 300" className="w-full max-w-xl mx-auto" aria-label="Vista previa de informe post-incidente">
      <rect x="0" y="0" width="520" height="300" rx="14" fill="#111111" stroke="#2A2A2A" strokeWidth="1.5" />
      {/* Header */}
      <rect x="0" y="0" width="520" height="46" rx="14" fill="#FF3B3B" fillOpacity="0.12" />
      <rect x="0" y="28" width="520" height="18" fill="#FF3B3B" fillOpacity="0.12" />
      <text x="18" y="20" fill="#FFFFFF" fontSize="12" fontWeight="800">Informe Post-Incidente #IR-2026-0312</text>
      <text x="18" y="36" fill="#A0A0A0" fontSize="9">Severidad: P1 · Tipo: Ransomware · Duración: 2h 17min · Resuelto</text>

      {/* Executive Summary box */}
      <rect x="16" y="58" width="230" height="90" rx="8" fill="#1A1A1A" />
      <text x="28" y="76" fill="#00D4FF" fontSize="10" fontWeight="700">Resumen Ejecutivo</text>
      <text x="28" y="92" fill="#A0A0A0" fontSize="8">Vector: Phishing → macro Excel</text>
      <text x="28" y="106" fill="#A0A0A0" fontSize="8">Activos afectados: 3 endpoints</text>
      <text x="28" y="120" fill="#A0A0A0" fontSize="8">Datos exfiltrados: 0 (contenido a tiempo)</text>
      <text x="28" y="134" fill="#00FF88" fontSize="8" fontWeight="700">Estado: Completamente resuelto ✓</text>

      {/* Timeline */}
      <rect x="260" y="58" width="244" height="90" rx="8" fill="#1A1A1A" />
      <text x="272" y="76" fill="#00D4FF" fontSize="10" fontWeight="700">Línea de Tiempo</text>
      {[
        ["09:14", "Alerta SIEM — macro maliciosa"],
        ["09:17", "Triage SOC — P1 declarado"],
        ["09:22", "Endpoint aislado (red)"],
        ["09:45", "Malware eliminado"],
        ["11:31", "Sistemas restaurados"],
      ].map(([time, event], i) => (
        <g key={time}>
          <text x={272} y={90 + i * 13} fill="#666666" fontSize="7.5">{time}</text>
          <text x={310} y={90 + i * 13} fill="#A0A0A0" fontSize="7.5">{event}</text>
        </g>
      ))}

      {/* Recommendations */}
      <rect x="16" y="162" width="488" height="60" rx="8" fill="#1A1A1A" />
      <text x="28" y="180" fill="#FFB800" fontSize="10" fontWeight="700">Recomendaciones</text>
      <text x="28" y="195" fill="#A0A0A0" fontSize="8">1. Habilitar macro blocking en Microsoft 365 · 2. Capacitación anti-phishing Q2 · 3. MFA en todos los endpoints</text>
      <text x="28" y="210" fill="#A0A0A0" fontSize="8">4. Segmentación de red área finanzas · 5. Revisión de política de ejecución PowerShell</text>

      {/* Signatures */}
      <rect x="16" y="234" width="488" height="50" rx="8" fill="#0070F3" fillOpacity="0.06" />
      <text x="28" y="252" fill="#666666" fontSize="8">Analista SOC: Carlos M. · Revisor: Ana L. · Aprobado por CISO: Sí</text>
      <text x="28" y="268" fill="#666666" fontSize="8">Informe generado automáticamente + revisado por analista | qatech360 LATAM SOC</text>
      <circle cx="498" cy="252" r="4" fill="#00FF88" />
      <text x="490" y="268" fill="#00FF88" fontSize="7" textAnchor="middle">Firmado</text>
    </svg>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────
export default function IncidentResponsePage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const stats = [
    { label: "Cobertura", value: "24/7", sub: "365 días al año" },
    { label: "SLA P1", value: "<15", sub: "minutos de respuesta" },
    { label: "SLA P2", value: "<1h", sub: "hora garantizada" },
    { label: "Idioma", value: "100%", sub: "en español" },
  ];

  const slaTiers = [
    {
      priority: "P1 — Crítico",
      response: "< 15 min",
      color: "#FF3B3B",
      examples: ["Ransomware activo", "Brecha de datos confirmada", "APT detectado", "Sistemas de producción caídos"],
    },
    {
      priority: "P2 — Alto",
      response: "< 1 hora",
      color: "#FFB800",
      examples: ["Malware detectado (no activo)", "Acceso no autorizado sospechoso", "Exfiltración de datos posible", "Escalada de privilegios"],
    },
    {
      priority: "P3 — Medio",
      response: "< 4 horas",
      color: "#0070F3",
      examples: ["Violación de política de seguridad", "Múltiples intentos fallidos de acceso", "Anomalía de comportamiento de usuario", "Vulnerabilidad crítica sin explotar"],
    },
    {
      priority: "P4 — Bajo",
      response: "< 24 horas",
      color: "#A0A0A0",
      examples: ["Alertas informativas", "Revisión de logs de rutina", "Optimización de reglas", "Reportes programados"],
    },
  ];

  const playbooks = [
    { icon: "🔐", name: "Ransomware", steps: "Aislar → Snapshot → Analizar → Restaurar → Hardening" },
    { icon: "🎣", name: "Phishing", steps: "Bloquear dominio → Revocar sesiones → Analizar alcance → Notificar" },
    { icon: "📤", name: "Exfiltración de datos", steps: "Cortar transferencia → Identificar origen → Forensia → Reporte" },
    { icon: "💪", name: "Fuerza bruta", steps: "Bloquear IP → Lockout cuenta → Resetear credenciales → MFA" },
    { icon: "🕵️", name: "Insider threat", steps: "Suspender acceso → Preservar evidencia → Investigar → Legal" },
    { icon: "🌊", name: "DDoS", steps: "Activar scrubbing → Rate limiting → ISP notify → Post-análisis" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <NavBar />

      {/* ── 1. Hero ── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center gap-12 px-6 pt-24 pb-16 overflow-hidden max-w-7xl mx-auto"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF3B3B]/8 via-transparent to-[#0070F3]/5" />

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={heroInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative z-10 flex-1 max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF3B3B]/10 border border-[#FF3B3B]/30 text-[#FF3B3B] text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-[#FF3B3B] animate-pulse" />
            SOC LATAM 24/7
          </span>
          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            Respuesta a{" "}
            <span className="bg-gradient-to-r from-[#FF3B3B] via-[#FFB800] to-[#0070F3] bg-clip-text text-transparent">
              Incidentes
            </span>
          </h1>
          <p className="text-xl text-[#A0A0A0] mb-10 leading-relaxed">
            Cuando ocurre un incidente, cada minuto cuenta. Nuestro SOC LATAM responde en menos de 15 minutos — en español, en tu zona horaria, con analistas humanos.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 bg-[#FF3B3B] hover:bg-[#CC2020] text-white font-bold rounded-xl transition-all duration-200 shadow-[0_0_30px_rgba(255,59,59,0.4)] text-lg"
            >
              Hablar con el equipo SOC
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 border border-[#2A2A2A] hover:border-[#0070F3]/50 text-[#A0A0A0] hover:text-white font-semibold rounded-xl transition-all duration-200 text-lg"
            >
              Contratar IR Retainer
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={heroInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 flex-1 max-w-sm"
        >
          <PulseTimerSVG />
          <div className="mt-6 text-center">
            <p className="text-[#666666] text-sm">Tiempo de respuesta garantizado por SLA</p>
          </div>
        </motion.div>
      </section>

      {/* ── 2. Stats ── */}
      <section className="py-20 px-6 border-y border-[#2A2A2A]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-black text-[#0070F3] mb-1">{s.value}</div>
              <div className="text-white font-semibold text-sm mb-1">{s.label}</div>
              <div className="text-[#666666] text-xs">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 3. SLA Tiers ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black mb-4">
              Niveles de{" "}
              <span className="text-[#0070F3]">prioridad y SLA</span>
            </h2>
            <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
              Cada incidente se clasifica automáticamente y recibe la respuesta proporcional a su severidad.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {slaTiers.map((tier, i) => (
              <motion.div
                key={tier.priority}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-6 hover:border-[#0070F3]/30 transition-all duration-300"
              >
                <div className="text-sm font-bold mb-2" style={{ color: tier.color }}>{tier.priority}</div>
                <div className="text-3xl font-black text-white mb-4">{tier.response}</div>
                <ul className="space-y-2">
                  {tier.examples.map((ex) => (
                    <li key={ex} className="flex items-start gap-2">
                      <span style={{ color: tier.color }} className="text-xs mt-0.5 flex-shrink-0">•</span>
                      <span className="text-[#A0A0A0] text-xs">{ex}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. IR Process ── */}
      <section className="py-24 px-6 bg-[#111111]/50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black mb-4">
              ¿Qué hacemos cuando se{" "}
              <span className="text-[#FF3B3B]">activa una alerta?</span>
            </h2>
            <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
              Nuestro proceso de 6 pasos garantiza una respuesta sistemática y documentada en cada incidente.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-8 overflow-x-auto"
          >
            <IRProcessSVG />
          </motion.div>
        </div>
      </section>

      {/* ── 5. SOC Coverage Map ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row gap-12 items-center"
          >
            <div className="flex-1">
              <span className="text-[#00D4FF] text-sm font-bold uppercase tracking-widest mb-4 block">Cobertura SOC</span>
              <h2 className="text-4xl font-black mb-6">
                Analistas en{" "}
                <span className="text-[#0070F3]">tu zona horaria</span>
              </h2>
              <p className="text-[#A0A0A0] text-lg mb-8 leading-relaxed">
                Nuestro SOC LATAM tiene analistas distribuidos en las principales zonas horarias de América Latina. Cuando ocurre un incidente a las 3 AM en México, hay un analista despierto y disponible.
              </p>
              <div className="space-y-3">
                {[
                  { tz: "GMT-6", zone: "México", flag: "🇲🇽", hours: "Cobertura 24/7" },
                  { tz: "GMT-5", zone: "Colombia · Perú · Ecuador", flag: "🇨🇴", hours: "Cobertura 24/7" },
                  { tz: "GMT-4", zone: "Chile · Venezuela · Bolivia", flag: "🇨🇱", hours: "Cobertura 24/7" },
                  { tz: "GMT-3", zone: "Brasil · Argentina · Uruguay", flag: "🇧🇷", hours: "Cobertura 24/7" },
                ].map((item) => (
                  <div key={item.tz} className="flex items-center gap-4 bg-[#111111] border border-[#2A2A2A] rounded-lg px-4 py-3">
                    <span className="text-xl">{item.flag}</span>
                    <div className="flex-1">
                      <div className="text-white text-sm font-semibold">{item.zone}</div>
                      <div className="text-[#666666] text-xs">{item.tz}</div>
                    </div>
                    <span className="text-[#00FF88] text-xs font-bold">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 max-w-sm"
            >
              <SOCMapSVG />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 6. Playbooks ── */}
      <section className="py-24 px-6 bg-[#111111]/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black mb-4">
              Playbooks{" "}
              <span className="text-[#0070F3]">automatizados</span>
            </h2>
            <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
              Para los escenarios más comunes, la respuesta automática comienza en milisegundos. El analista humano supervisa y ajusta.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {playbooks.map((pb, i) => (
              <motion.div
                key={pb.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-6 hover:border-[#0070F3]/40 transition-all duration-300 group"
              >
                <div className="text-3xl mb-4">{pb.icon}</div>
                <h3 className="text-white font-bold mb-3 group-hover:text-[#00D4FF] transition-colors">
                  Playbook: {pb.name}
                </h3>
                <p className="text-[#666666] text-xs font-mono leading-relaxed">{pb.steps}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Report Preview ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black mb-4">
              Informe{" "}
              <span className="text-[#00D4FF]">post-incidente completo</span>
            </h2>
            <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
              Cada incidente resulta en un informe detallado con resumen ejecutivo, línea de tiempo técnica y recomendaciones de mejora.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <IRReportSVG />
          </motion.div>
        </div>
      </section>

      {/* ── 8. IR Retainer ── */}
      <section className="py-24 px-6 bg-[#111111]/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#0070F3]/15 to-[#00D4FF]/5 border border-[#0070F3]/30 rounded-2xl p-10"
          >
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="flex-1">
                <span className="text-[#0070F3] text-sm font-bold uppercase tracking-widest mb-3 block">Add-on Empresarial</span>
                <h2 className="text-3xl font-black mb-4">IR Retainer</h2>
                <p className="text-[#A0A0A0] leading-relaxed mb-6">
                  Pre-compra horas de respuesta a incidentes con analistas dedicados garantizados. Cuando ocurre el incidente, tu equipo tiene acceso inmediato a expertos sin esperar asignación.
                </p>
                <ul className="space-y-3">
                  {[
                    "Horas pre-compradas (no caducan en 12 meses)",
                    "Analista senior asignado a tu cuenta",
                    "SLA P1 garantizado en 10 minutos (vs. 15)",
                    "Acceso a playbooks personalizados para tu entorno",
                    "Revisión trimestral de postura de seguridad",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="text-[#00FF88] flex-shrink-0">✓</span>
                      <span className="text-[#A0A0A0] text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-shrink-0 text-center">
                <div className="bg-[#111111] border border-[#0070F3]/30 rounded-2xl p-8 mb-4">
                  <div className="text-[#A0A0A0] text-sm mb-2">Precio</div>
                  <div className="text-2xl font-black text-white mb-1">Consultar</div>
                  <div className="text-[#A0A0A0] text-xs">Adaptado a tu organización</div>
                </div>
                <Link
                  href="/contact"
                  className="block px-8 py-3 bg-[#0070F3] hover:bg-[#0050D0] text-white font-bold rounded-xl transition-all duration-200 text-sm"
                >
                  Solicitar información
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 9. Testimonial ── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-10"
          >
            <div className="text-[#FFB800] text-3xl mb-6">&#8220;</div>
            <blockquote className="text-xl text-white leading-relaxed mb-8">
              A las 2:47 AM del martes recibimos una alerta de ransomware en nuestros servidores de producción. En menos de 12 minutos, el equipo de qatech360 había aislado los endpoints afectados, identificado el vector de entrada y comenzado la remediación. El daño fue mínimo. Sin qatech360, habríamos perdido días de datos y semanas de trabajo.
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0070F3] to-[#00D4FF] flex items-center justify-center text-white font-black text-lg">
                JR
              </div>
              <div>
                <div className="text-white font-bold">Juan Ramírez</div>
                <div className="text-[#666666] text-sm">CISO · Fintech Colombia · 350 empleados</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 10. CTA ── */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#FF3B3B]/5 via-transparent to-[#0070F3]/10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              El siguiente incidente{" "}
              <span className="text-[#FF3B3B]">ya está en camino</span>
            </h2>
            <p className="text-[#A0A0A0] text-xl mb-10">
              No esperes a que ocurra un incidente para buscar ayuda. Ten a nuestro equipo SOC LATAM listo antes de que lo necesites.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="px-10 py-4 bg-[#FF3B3B] hover:bg-[#CC2020] text-white font-bold rounded-xl transition-all duration-200 shadow-[0_0_40px_rgba(255,59,59,0.4)] text-lg"
              >
                Hablar con el equipo SOC
              </Link>
              <Link
                href="/pricing"
                className="px-10 py-4 border border-[#2A2A2A] hover:border-[#0070F3]/50 text-[#A0A0A0] hover:text-white font-semibold rounded-xl transition-all duration-200 text-lg"
              >
                Contratar IR Retainer
              </Link>
            </div>
            <p className="mt-6 text-[#666666] text-sm">Activación inmediata · Sin contratos largos obligatorios</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
