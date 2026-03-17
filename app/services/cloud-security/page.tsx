"use client";

import { motion, useInView } from "framer-motion";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

// ─── Animated counter ────────────────────────────────────────────────────────
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
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = 0;
          const end = target;
          const duration = 2000;
          const startTime = performance.now();
          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(parseFloat((start + (end - start) * eased).toFixed(decimals)));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, decimals]);

  return (
    <span ref={ref}>
      {prefix}{decimals > 0 ? count.toFixed(decimals) : count.toLocaleString()}{suffix}
    </span>
  );
}

// ─── Cloud Architecture SVG ───────────────────────────────────────────────────
function CloudArchitectureSVG() {
  return (
    <svg viewBox="0 0 600 320" className="w-full max-w-2xl mx-auto" aria-label="Arquitectura multi-cloud monitoreada por qatech360">
      <defs>
        <filter id="cloud-glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <linearGradient id="hub-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0070F3" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* Connection lines */}
      <line x1="120" y1="60" x2="280" y2="150" stroke="#0070F3" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.7" />
      <line x1="300" y1="60" x2="300" y2="130" stroke="#00D4FF" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.7" />
      <line x1="480" y1="60" x2="320" y2="150" stroke="#0070F3" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.7" />

      {/* Output lines */}
      <line x1="300" y1="190" x2="300" y2="260" stroke="#00FF88" strokeWidth="2" strokeDasharray="4 3" opacity="0.8" />

      {/* AWS Cloud */}
      <rect x="50" y="20" width="140" height="75" rx="12" fill="#1A1A1A" stroke="#FF9900" strokeWidth="1.5" />
      <text x="120" y="42" textAnchor="middle" fill="#FF9900" fontSize="11" fontWeight="700">AWS</text>
      <text x="120" y="58" textAnchor="middle" fill="#A0A0A0" fontSize="9">CloudTrail</text>
      <text x="120" y="71" textAnchor="middle" fill="#A0A0A0" fontSize="9">GuardDuty</text>
      <text x="120" y="84" textAnchor="middle" fill="#A0A0A0" fontSize="9">SecurityHub</text>

      {/* Azure Cloud */}
      <rect x="230" y="20" width="140" height="75" rx="12" fill="#1A1A1A" stroke="#0078D4" strokeWidth="1.5" />
      <text x="300" y="42" textAnchor="middle" fill="#0078D4" fontSize="11" fontWeight="700">Azure</text>
      <text x="300" y="58" textAnchor="middle" fill="#A0A0A0" fontSize="9">Activity Log</text>
      <text x="300" y="71" textAnchor="middle" fill="#A0A0A0" fontSize="9">Defender Alerts</text>
      <text x="300" y="84" textAnchor="middle" fill="#A0A0A0" fontSize="9">Entra ID</text>

      {/* GCP Cloud */}
      <rect x="410" y="20" width="140" height="75" rx="12" fill="#1A1A1A" stroke="#4285F4" strokeWidth="1.5" />
      <text x="480" y="42" textAnchor="middle" fill="#4285F4" fontSize="11" fontWeight="700">GCP</text>
      <text x="480" y="58" textAnchor="middle" fill="#A0A0A0" fontSize="9">Cloud Audit Logs</text>
      <text x="480" y="71" textAnchor="middle" fill="#A0A0A0" fontSize="9">Security Command</text>
      <text x="480" y="84" textAnchor="middle" fill="#A0A0A0" fontSize="9">Center</text>

      {/* qatech360 Hub */}
      <rect x="200" y="130" width="200" height="70" rx="14" fill="url(#hub-grad)" />
      <text x="300" y="155" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="800">qatech360</text>
      <text x="300" y="172" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">Motor de Análisis Cloud</text>
      <text x="300" y="188" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">Correlación · Alertas · Remediación</text>

      {/* SOC Output */}
      <rect x="210" y="265" width="180" height="45" rx="10" fill="#111111" stroke="#00FF88" strokeWidth="1.5" />
      <text x="300" y="285" textAnchor="middle" fill="#00FF88" fontSize="11" fontWeight="700">SOC LATAM 24/7</text>
      <text x="300" y="300" textAnchor="middle" fill="#A0A0A0" fontSize="9">Alertas · Respuesta · Informes</text>

      {/* Data flow arrows */}
      <polygon points="297,127 303,127 300,132" fill="#0070F3" />
      <polygon points="297,258 303,258 300,263" fill="#00FF88" />
    </svg>
  );
}

// ─── Posture Dashboard SVG ────────────────────────────────────────────────────
function PostureDashboardSVG() {
  const providers = [
    { name: "AWS", score: 87, color: "#FF9900", risks: ["S3 público", "MFA off"] },
    { name: "Azure", score: 94, color: "#0078D4", risks: ["Logging off"] },
    { name: "GCP", score: 91, color: "#4285F4", risks: ["IAM over"] },
  ];

  return (
    <svg viewBox="0 0 640 280" className="w-full max-w-2xl mx-auto" aria-label="Dashboard de postura multi-cloud">
      <rect x="0" y="0" width="640" height="280" rx="16" fill="#111111" stroke="#2A2A2A" strokeWidth="1.5" />
      <text x="24" y="30" fill="#FFFFFF" fontSize="13" fontWeight="700">Postura Cloud — Vista General</text>
      <text x="24" y="46" fill="#A0A0A0" fontSize="10">Última actualización: hace 3 minutos</text>
      <circle cx="600" cy="28" r="5" fill="#00FF88" opacity="0.9" />
      <text x="612" y="32" fill="#00FF88" fontSize="9">LIVE</text>

      {providers.map((p, i) => {
        const x = 24 + i * 205;
        const scoreAngle = (p.score / 100) * 251;
        const r = 38;
        const cx2 = x + 90;
        const cy2 = 145;
        const startAngle = -220;
        const toRad = (deg: number) => (deg * Math.PI) / 180;
        const x1 = cx2 + r * Math.cos(toRad(startAngle));
        const y1 = cy2 + r * Math.sin(toRad(startAngle));
        const x2 = cx2 + r * Math.cos(toRad(startAngle + scoreAngle));
        const y2 = cy2 + r * Math.sin(toRad(startAngle + scoreAngle));
        const large = scoreAngle > 180 ? 1 : 0;
        return (
          <g key={p.name}>
            <rect x={x} y="60" width="190" height="200" rx="10" fill="#1A1A1A" stroke="#2A2A2A" strokeWidth="1" />
            <text x={cx2} y="90" textAnchor="middle" fill={p.color} fontSize="12" fontWeight="800">{p.name}</text>
            {/* Arc background */}
            <path
              d={`M ${cx2 + r * Math.cos(toRad(startAngle))} ${cy2 + r * Math.sin(toRad(startAngle))} A ${r} ${r} 0 1 1 ${cx2 + r * Math.cos(toRad(startAngle + 251))} ${cy2 + r * Math.sin(toRad(startAngle + 251))}`}
              fill="none" stroke="#2A2A2A" strokeWidth="7" strokeLinecap="round"
            />
            {/* Score arc */}
            <path
              d={`M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`}
              fill="none" stroke={p.color} strokeWidth="7" strokeLinecap="round"
            />
            <text x={cx2} y={cy2 + 5} textAnchor="middle" fill="#FFFFFF" fontSize="18" fontWeight="800">{p.score}%</text>
            <text x={cx2} y={cy2 + 18} textAnchor="middle" fill="#A0A0A0" fontSize="8">CIS Score</text>
            {p.risks.map((risk, ri) => (
              <g key={ri}>
                <circle cx={x + 16} cy={192 + ri * 18} r="3" fill="#FFB800" />
                <text x={x + 26} y={196 + ri * 18} fill="#A0A0A0" fontSize="9">{risk}</text>
              </g>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

// ─── Exfiltration Scenario SVG ────────────────────────────────────────────────
function ExfiltrationSVG() {
  return (
    <svg viewBox="0 0 580 200" className="w-full max-w-xl mx-auto" aria-label="Escenario de detección de exfiltración de datos">
      <defs>
        <marker id="arr2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#FF3B3B" />
        </marker>
        <marker id="arr3" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#00FF88" />
        </marker>
      </defs>
      {/* Attacker */}
      <rect x="10" y="70" width="90" height="50" rx="8" fill="#1A1A1A" stroke="#FF3B3B" strokeWidth="1.5" />
      <text x="55" y="91" textAnchor="middle" fill="#FF3B3B" fontSize="9" fontWeight="700">Atacante</text>
      <text x="55" y="104" textAnchor="middle" fill="#A0A0A0" fontSize="8">IP: 45.33.x.x</text>
      <text x="55" y="114" textAnchor="middle" fill="#A0A0A0" fontSize="8">TOR Exit Node</text>

      {/* Arrow attacker -> API */}
      <line x1="100" y1="95" x2="175" y2="95" stroke="#FF3B3B" strokeWidth="1.5" markerEnd="url(#arr2)" />
      <text x="137" y="88" textAnchor="middle" fill="#FF3B3B" fontSize="8">API calls</text>

      {/* AWS S3 */}
      <rect x="175" y="60" width="100" height="70" rx="8" fill="#1A1A1A" stroke="#FF9900" strokeWidth="1.5" />
      <text x="225" y="82" textAnchor="middle" fill="#FF9900" fontSize="10" fontWeight="700">AWS S3</text>
      <text x="225" y="96" textAnchor="middle" fill="#A0A0A0" fontSize="8">GetObject x847</text>
      <text x="225" y="108" textAnchor="middle" fill="#A0A0A0" fontSize="8">en 2 minutos</text>
      <text x="225" y="120" textAnchor="middle" fill="#FF3B3B" fontSize="8" fontWeight="700">4.2 GB transferidos</text>

      {/* Arrow S3 -> qatech */}
      <line x1="275" y1="95" x2="345" y2="95" stroke="#0070F3" strokeWidth="1.5" strokeDasharray="5 3" />
      <text x="310" y="88" textAnchor="middle" fill="#0070F3" fontSize="8">CloudTrail</text>

      {/* qatech360 detection */}
      <rect x="345" y="55" width="120" height="80" rx="8" fill="#0070F3" fillOpacity="0.15" stroke="#0070F3" strokeWidth="1.5" />
      <text x="405" y="78" textAnchor="middle" fill="#0070F3" fontSize="10" fontWeight="700">qatech360</text>
      <text x="405" y="93" textAnchor="middle" fill="#A0A0A0" fontSize="8">Anomalía detectada</text>
      <text x="405" y="106" textAnchor="middle" fill="#00FF88" fontSize="8" fontWeight="700">ALERTA P1</text>
      <text x="405" y="119" textAnchor="middle" fill="#A0A0A0" fontSize="8">Bloqueo en 43s</text>

      {/* Arrow to block */}
      <line x1="465" y1="95" x2="530" y2="95" stroke="#00FF88" strokeWidth="1.5" markerEnd="url(#arr3)" />
      {/* Block indicator */}
      <rect x="530" y="70" width="45" height="50" rx="6" fill="#00FF88" fillOpacity="0.1" stroke="#00FF88" strokeWidth="1.5" />
      <text x="552" y="89" textAnchor="middle" fill="#00FF88" fontSize="9" fontWeight="700">IP</text>
      <text x="552" y="102" textAnchor="middle" fill="#00FF88" fontSize="9" fontWeight="700">Bloqueada</text>
      <text x="552" y="112" textAnchor="middle" fill="#A0A0A0" fontSize="7">Automático</text>

      {/* Labels */}
      <text x="290" y="175" textAnchor="middle" fill="#666666" fontSize="10">Detección de exfiltración via CloudTrail — Respuesta automática en &lt;60 seg</text>
    </svg>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────
export default function CloudSecurityPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const stats = [
    { value: 3, suffix: "", label: "Nubes soportadas", sub: "AWS · Azure · GCP" },
    { value: 100, suffix: "+", label: "Controles CIS", sub: "Benchmark automatizado" },
    { value: 60, suffix: " seg", label: "Detección", sub: "Tiempo real de alertas" },
    { value: 95, suffix: "%", label: "Auto-remediación", sub: "Sin intervención manual" },
  ];

  const coverageMatrix = [
    {
      provider: "AWS",
      color: "#FF9900",
      services: ["CloudTrail — Auditoría de API", "GuardDuty — Detección de amenazas", "SecurityHub — Postura central", "S3 Access Logs — Acceso a objetos", "VPC Flow Logs — Tráfico de red", "IAM Access Analyzer — Permisos"],
    },
    {
      provider: "Azure",
      color: "#0078D4",
      services: ["Activity Log — Operaciones", "Microsoft Defender — Alertas", "Microsoft Entra ID — Identidad", "Storage Audit Logs — Almacenamiento", "NSG Flow Logs — Red", "Policy Compliance — Políticas"],
    },
    {
      provider: "GCP",
      color: "#4285F4",
      services: ["Cloud Audit Logs — Administración", "Security Command Center — Hallazgos", "VPC Flow Logs — Tráfico", "Cloud Storage Audit — Objetos", "IAM Recommender — Permisos", "Threat Detection — Anomalías"],
    },
  ];

  const misconfigs = [
    { title: "S3 Bucket Público", severity: "Crítico", color: "#FF3B3B", desc: "Datos expuestos a internet sin autenticación. Detección inmediata y bloqueo automático." },
    { title: "MFA Desactivado", severity: "Alto", color: "#FFB800", desc: "Cuentas de consola sin segundo factor. Alerta de cumplimiento y notificación al usuario." },
    { title: "Security Group 0.0.0.0/0", severity: "Crítico", color: "#FF3B3B", desc: "Puerto abierto a todo internet. Cierre automático disponible con Active Response." },
    { title: "IAM Overprivileged", severity: "Alto", color: "#FFB800", desc: "Roles con permisos '*' innecesarios. Recomendación de principio de mínimo privilegio." },
    { title: "Logging Desactivado", severity: "Medio", color: "#0070F3", desc: "CloudTrail/Activity Log apagado. Sin trazabilidad de acciones. Detección y habilitación." },
    { title: "Encriptación Off", severity: "Alto", color: "#FFB800", desc: "Buckets o discos sin cifrado en reposo. Incumplimiento de PCI-DSS y GDPR detectado." },
  ];

  const features = [
    { icon: "📋", title: "Análisis CloudTrail", desc: "Cada llamada API registrada, correlacionada y alertada si es anómala." },
    { icon: "⚡", title: "Alertas Misconfiguration", desc: "Detecta 200+ tipos de configuraciones incorrectas en tiempo real." },
    { icon: "🔧", title: "Auto-remediación", desc: "Corrige automáticamente misconfiguraciones de bajo riesgo sin intervención." },
    { icon: "🏢", title: "Multi-cuenta / Multi-tenant", desc: "Gestiona cientos de cuentas cloud desde un solo panel." },
    { icon: "🆔", title: "Monitoreo IAM", desc: "Detecta escalada de privilegios, claves comprometidas y accesos sospechosos." },
    { icon: "📤", title: "Detección de Exfiltración", desc: "Alerta cuando se transfieren volúmenes anómalos de datos fuera de tu nube." },
  ];

  const archTypes = [
    { name: "IaaS", desc: "VMs, Redes, Almacenamiento", icon: "🖥️" },
    { name: "PaaS", desc: "Bases de datos, Funciones, APIs", icon: "⚙️" },
    { name: "Serverless", desc: "Lambda, Functions, Cloud Run", icon: "⚡" },
    { name: "Kubernetes", desc: "EKS, AKS, GKE, self-managed", icon: "🐳" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <NavBar />

      {/* ── 1. Hero ── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden"
      >
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0070F3]/10 via-transparent to-[#00D4FF]/5" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative z-10 text-center max-w-4xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0070F3]/10 border border-[#0070F3]/30 text-[#00D4FF] text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
            Seguridad Multi-Cloud
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            Seguridad en{" "}
            <span className="bg-gradient-to-r from-[#0070F3] via-[#00D4FF] to-[#00FF88] bg-clip-text text-transparent">
              la Nube
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-[#A0A0A0] max-w-2xl mx-auto mb-10">
            Protege AWS, Azure y GCP. Detecta configuraciones incorrectas antes de que sean una brecha.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/trial"
              className="px-8 py-4 bg-[#0070F3] hover:bg-[#0050D0] text-white font-bold rounded-xl transition-all duration-200 shadow-[0_0_30px_rgba(0,112,243,0.4)] hover:shadow-[0_0_50px_rgba(0,112,243,0.6)] text-lg"
            >
              Conectar mi nube gratis
            </Link>
            <Link
              href="/demo"
              className="px-8 py-4 border border-[#2A2A2A] hover:border-[#0070F3]/50 text-[#A0A0A0] hover:text-white font-semibold rounded-xl transition-all duration-200 text-lg"
            >
              Ver demo
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 w-full max-w-2xl"
        >
          <CloudArchitectureSVG />
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
              <div className="text-4xl font-black text-[#0070F3] mb-1">
                <AnimatedCounter target={s.value} suffix={s.suffix} />
              </div>
              <div className="text-white font-semibold text-sm mb-1">{s.label}</div>
              <div className="text-[#666666] text-xs">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 3. Coverage Matrix ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black mb-4">
              Cobertura{" "}
              <span className="text-[#00D4FF]">Multi-Cloud</span>
            </h2>
            <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
              Integración nativa con los tres grandes proveedores de nube. Sin agentes adicionales.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {coverageMatrix.map((col, i) => (
              <motion.div
                key={col.provider}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-6 hover:border-[#0070F3]/30 transition-all duration-300"
              >
                <div
                  className="text-2xl font-black mb-5 pb-4 border-b border-[#2A2A2A]"
                  style={{ color: col.color }}
                >
                  {col.provider}
                </div>
                <ul className="space-y-3">
                  {col.services.map((svc) => (
                    <li key={svc} className="flex items-start gap-3">
                      <span className="text-[#00FF88] mt-0.5 flex-shrink-0">✓</span>
                      <span className="text-[#A0A0A0] text-sm">{svc}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Misconfigurations ── */}
      <section className="py-24 px-6 bg-[#111111]/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black mb-4">
              Configuraciones incorrectas{" "}
              <span className="text-[#0070F3]">más comunes</span>
            </h2>
            <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
              Estas son las misconfiguraciones que detectamos y corregimos diariamente en entornos LATAM.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {misconfigs.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 hover:border-[#0070F3]/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-white text-sm">{m.title}</h3>
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full border"
                    style={{ color: m.color, borderColor: m.color + "40", backgroundColor: m.color + "15" }}
                  >
                    {m.severity}
                  </span>
                </div>
                <p className="text-[#A0A0A0] text-sm leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CIS Benchmark ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row gap-12 items-center"
          >
            <div className="flex-1">
              <span className="text-[#00D4FF] text-sm font-bold uppercase tracking-widest mb-4 block">
                CIS Benchmark
              </span>
              <h2 className="text-4xl font-black mb-6">
                Escaneo de cumplimiento{" "}
                <span className="text-[#0070F3]">automatizado</span>
              </h2>
              <p className="text-[#A0A0A0] text-lg mb-8 leading-relaxed">
                Ejecutamos controles CIS Benchmark para AWS, Azure y GCP de forma continua. Cada control tiene un estado (Pass/Fail), prioridad y guía de remediación en español.
              </p>
              <div className="space-y-4">
                {[
                  { check: "CIS AWS Foundations Benchmark v3.0", status: "247 controles", color: "#00FF88" },
                  { check: "CIS Azure Security Benchmark v3.0", status: "230 controles", color: "#00FF88" },
                  { check: "CIS Google Cloud Benchmark v2.0", status: "194 controles", color: "#00FF88" },
                  { check: "NIST CSF 2.0 Mapping", status: "Incluido", color: "#00D4FF" },
                ].map((item) => (
                  <div key={item.check} className="flex items-center justify-between bg-[#111111] rounded-lg px-4 py-3 border border-[#2A2A2A]">
                    <span className="text-[#A0A0A0] text-sm">{item.check}</span>
                    <span className="text-xs font-bold" style={{ color: item.color }}>{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 max-w-sm">
              <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-6">
                <div className="text-center mb-6">
                  <div className="text-5xl font-black text-[#00FF88] mb-1">
                    <AnimatedCounter target={671} suffix="" />
                  </div>
                  <div className="text-[#A0A0A0] text-sm">Controles CIS totales</div>
                </div>
                {[
                  { label: "Pasando", value: 89, color: "#00FF88" },
                  { label: "Fallando", value: 7, color: "#FF3B3B" },
                  { label: "N/A", value: 4, color: "#666666" },
                ].map((bar) => (
                  <div key={bar.label} className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#A0A0A0]">{bar.label}</span>
                      <span style={{ color: bar.color }}>{bar.value}%</span>
                    </div>
                    <div className="h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${bar.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: bar.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 6. Feature Grid ── */}
      <section className="py-24 px-6 bg-[#111111]/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black mb-4">
              Capacidades <span className="text-[#0070F3]">incluidas</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-6 hover:border-[#0070F3]/40 transition-all duration-300 group"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-white font-bold mb-2 group-hover:text-[#00D4FF] transition-colors">{f.title}</h3>
                <p className="text-[#A0A0A0] text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Exfiltration Detection ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black mb-4">
              Detección de{" "}
              <span className="text-[#FF3B3B]">exfiltración de datos</span>
            </h2>
            <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
              Cuando un atacante extrae datos de tu nube, lo detectamos en segundos y lo bloqueamos automáticamente.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-8"
          >
            <ExfiltrationSVG />
          </motion.div>
        </div>
      </section>

      {/* ── 8. Posture Dashboard ── */}
      <section className="py-24 px-6 bg-[#111111]/50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black mb-4">
              Dashboard de postura{" "}
              <span className="text-[#00D4FF]">multi-cloud</span>
            </h2>
            <p className="text-[#A0A0A0] text-lg">
              Vista unificada de tu puntuación CIS en todos los proveedores.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <PostureDashboardSVG />
          </motion.div>
        </div>
      </section>

      {/* ── 9. Compatible con tu arquitectura ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black mb-4">
              Compatible con{" "}
              <span className="text-[#0070F3]">tu arquitectura</span>
            </h2>
            <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
              Ya sea que uses máquinas virtuales, funciones serverless o Kubernetes, lo cubrimos todo.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {archTypes.map((a, i) => (
              <motion.div
                key={a.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-6 text-center hover:border-[#00D4FF]/40 transition-all duration-300"
              >
                <div className="text-4xl mb-3">{a.icon}</div>
                <div className="text-white font-bold mb-1">{a.name}</div>
                <div className="text-[#666666] text-xs">{a.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. CTA ── */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#0070F3]/10 via-transparent to-[#00D4FF]/5">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Conecta tu nube en{" "}
              <span className="text-[#00D4FF]">15 minutos</span>
            </h2>
            <p className="text-[#A0A0A0] text-xl mb-10">
              Sin agentes. Sin complejidad. Solo conecta tu cuenta cloud y empieza a ver amenazas de inmediato.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/trial"
                className="px-10 py-4 bg-[#0070F3] hover:bg-[#0050D0] text-white font-bold rounded-xl transition-all duration-200 shadow-[0_0_40px_rgba(0,112,243,0.5)] hover:shadow-[0_0_60px_rgba(0,112,243,0.7)] text-lg"
              >
                Iniciar prueba gratis — 14 días
              </Link>
              <Link
                href="/contact"
                className="px-10 py-4 border border-[#2A2A2A] hover:border-[#0070F3]/50 text-[#A0A0A0] hover:text-white font-semibold rounded-xl transition-all duration-200 text-lg"
              >
                Hablar con un experto
              </Link>
            </div>
            <p className="mt-6 text-[#666666] text-sm">Sin tarjeta de crédito · Cancela cuando quieras</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
