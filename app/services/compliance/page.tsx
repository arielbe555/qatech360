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

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

// ─── Compliance Gauge SVG ─────────────────────────────────────────────────────
function ComplianceGaugeSVG() {
  const score = 93;
  const circumference = 2 * Math.PI * 70;
  const offset = circumference * (1 - score / 100);

  return (
    <svg viewBox="0 0 260 180" className="w-full max-w-xs mx-auto" aria-label="Indicador de cumplimiento al 93%">
      <defs>
        <linearGradient id="gauge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0070F3" />
          <stop offset="100%" stopColor="#00FF88" />
        </linearGradient>
      </defs>
      {/* Background arc */}
      <circle
        cx="130" cy="130" r="70"
        fill="none"
        stroke="#1A1A1A"
        strokeWidth="14"
        strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
        strokeDashoffset={circumference * 0.125}
        strokeLinecap="round"
        transform="rotate(-90 130 130)"
      />
      {/* Score arc */}
      <motion.circle
        cx="130" cy="130" r="70"
        fill="none"
        stroke="url(#gauge-grad)"
        strokeWidth="14"
        strokeDasharray={`${circumference * 0.75 * (score / 100)} ${circumference}`}
        strokeDashoffset={circumference * 0.125}
        strokeLinecap="round"
        transform="rotate(-90 130 130)"
        initial={{ strokeDasharray: `0 ${circumference}` }}
        animate={{ strokeDasharray: `${circumference * 0.75 * (score / 100)} ${circumference}` }}
        transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
      />
      {/* Score text */}
      <text x="130" y="125" textAnchor="middle" fill="#FFFFFF" fontSize="34" fontWeight="900">{score}%</text>
      <text x="130" y="148" textAnchor="middle" fill="#A0A0A0" fontSize="11">Cumplimiento Global</text>
      {/* Min/Max labels */}
      <text x="56" y="160" textAnchor="middle" fill="#666666" fontSize="10">0%</text>
      <text x="204" y="160" textAnchor="middle" fill="#666666" fontSize="10">100%</text>
    </svg>
  );
}

// ─── Automation Flow SVG ──────────────────────────────────────────────────────
function AutomationFlowSVG() {
  const steps = [
    { label: "Controles\nDefinidos", icon: "📋", color: "#0070F3" },
    { label: "Evidencia\nRecolectada", icon: "🔍", color: "#00D4FF" },
    { label: "Mapeo\nAutomático", icon: "⚡", color: "#00FF88" },
    { label: "Informe PDF\nGenerado", icon: "📄", color: "#FFB800" },
  ];

  return (
    <svg viewBox="0 0 640 140" className="w-full max-w-2xl mx-auto" aria-label="Flujo de automatización de cumplimiento">
      <defs>
        <marker id="flow-arr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#2A2A2A" />
        </marker>
      </defs>
      {steps.map((step, i) => {
        const x = 40 + i * 155;
        const label = step.label.split("\n");
        return (
          <g key={step.label}>
            <rect x={x} y="20" width="120" height="90" rx="12" fill="#111111" stroke={step.color} strokeWidth="1.5" strokeOpacity="0.6" />
            <text x={x + 60} y="50" textAnchor="middle" fontSize="22">{step.icon}</text>
            <text x={x + 60} y="76" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="700">{label[0]}</text>
            <text x={x + 60} y="90" textAnchor="middle" fill="#A0A0A0" fontSize="10">{label[1]}</text>
            <text x={x + 60} y="124" textAnchor="middle" fill={step.color} fontSize="10" fontWeight="700">Paso {i + 1}</text>
            {i < steps.length - 1 && (
              <line
                x1={x + 120} y1="65"
                x2={x + 155} y2="65"
                stroke="#2A2A2A" strokeWidth="2"
                markerEnd="url(#flow-arr)"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}

// ─── Report Preview SVG ───────────────────────────────────────────────────────
function ReportPreviewSVG() {
  const controls = [
    { name: "Req 1.1 — Firewall Rules", status: "PASS", color: "#00FF88" },
    { name: "Req 1.2 — Network Segmentation", status: "PASS", color: "#00FF88" },
    { name: "Req 2.1 — Default Passwords", status: "PASS", color: "#00FF88" },
    { name: "Req 3.4 — PAN Encryption", status: "FAIL", color: "#FF3B3B" },
    { name: "Req 6.3 — Vulnerability Mgmt", status: "PASS", color: "#00FF88" },
    { name: "Req 8.3 — MFA Enforcement", status: "WARN", color: "#FFB800" },
    { name: "Req 10.1 — Audit Logging", status: "PASS", color: "#00FF88" },
    { name: "Req 11.5 — File Integrity", status: "PASS", color: "#00FF88" },
  ];

  return (
    <svg viewBox="0 0 540 320" className="w-full max-w-xl mx-auto" aria-label="Vista previa de informe PCI-DSS">
      <rect x="0" y="0" width="540" height="320" rx="14" fill="#111111" stroke="#2A2A2A" strokeWidth="1.5" />
      {/* Header */}
      <rect x="0" y="0" width="540" height="48" rx="14" fill="#0070F3" fillOpacity="0.15" />
      <rect x="0" y="30" width="540" height="18" fill="#0070F3" fillOpacity="0.15" />
      <text x="20" y="20" fill="#FFFFFF" fontSize="12" fontWeight="800">Informe PCI-DSS 4.0 — Empresa Ejemplo S.A.</text>
      <text x="20" y="36" fill="#A0A0A0" fontSize="9">Generado: 17 Mar 2026 · Período: Ene–Mar 2026 · qatech360</text>
      {/* Score summary */}
      <rect x="380" y="58" width="140" height="50" rx="8" fill="#1A1A1A" />
      <text x="450" y="78" textAnchor="middle" fill="#00FF88" fontSize="20" fontWeight="900">87.5%</text>
      <text x="450" y="93" textAnchor="middle" fill="#A0A0A0" fontSize="9">Controles pasando</text>
      {/* Controls list */}
      {controls.map((ctrl, i) => (
        <g key={ctrl.name}>
          <rect x="16" y={62 + i * 31} width="354" height="24" rx="4" fill="#1A1A1A" />
          <text x="28" y={78 + i * 31} fill="#A0A0A0" fontSize="9">{ctrl.name}</text>
          <rect x={332} y={64 + i * 31} width="38" height="18" rx="4" fill={ctrl.color + "20"} />
          <text x={351} y={77 + i * 31} textAnchor="middle" fill={ctrl.color} fontSize="8" fontWeight="700">{ctrl.status}</text>
        </g>
      ))}
      <text x="16" y="310" fill="#666666" fontSize="8">Informe generado automáticamente por qatech360 · Confidencial</text>
    </svg>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────
export default function CompliancePage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const stats = [
    { value: 8, suffix: "", label: "Frameworks", sub: "PCI, HIPAA, GDPR, SOC2 y más" },
    { value: 500, suffix: "+", label: "Controles", sub: "Mapeados y automatizados" },
    { value: 5, suffix: " min", label: "Para tu informe", sub: "En lugar de semanas" },
    { value: 100, suffix: "%", label: "Evidencia automática", sub: "Sin recolección manual" },
  ];

  const frameworks = [
    { id: "pci", name: "PCI-DSS 4.0", region: "Global", color: "#0070F3", key: "Protección de datos de tarjeta de pago", reqs: "12 dominios · 251 controles" },
    { id: "hipaa", name: "HIPAA", region: "USA / Int.", color: "#00D4FF", key: "Protección de información médica (PHI)", reqs: "3 reglas · 72 controles" },
    { id: "gdpr", name: "GDPR", region: "Europa", color: "#00FF88", key: "Privacidad de datos personales UE", reqs: "11 capítulos · 99 artículos" },
    { id: "soc2", name: "SOC2 Type II", region: "Global", color: "#FFB800", key: "Seguridad, disponibilidad, confidencialidad", reqs: "5 principios de confianza" },
    { id: "iso", name: "ISO 27001", region: "Global", color: "#A0A0A0", key: "Sistema de gestión de seguridad", reqs: "Anexo A · 93 controles" },
    { id: "nom", name: "NOM-151", region: "México 🇲🇽", color: "#FF6B35", key: "Conservación de mensajes de datos MX", reqs: "Reglamento Federal" },
    { id: "lgpd", name: "LGPD", region: "Brasil 🇧🇷", color: "#009639", key: "Lei Geral de Proteção de Dados", reqs: "10 capítulos · 65 artículos" },
    { id: "ley", name: "Ley 1581", region: "Colombia 🇨🇴", color: "#CE1126", key: "Habeas data — protección datos personales CO", reqs: "Decreto 1377 de 2013" },
  ];

  const evidenceTypes = [
    { icon: "📋", title: "Evidencia de logs", desc: "Logs de auditoría exportados automáticamente y firmados con hash SHA-256 para validez forense." },
    { icon: "📸", title: "Capturas de configuración", desc: "Estado actual de configuraciones de seguridad tomado en el momento del escaneo." },
    { icon: "🔍", title: "Resultados de escaneos", desc: "Reportes de vulnerabilidades y cumplimiento en formatos aceptados por auditores." },
    { icon: "👥", title: "Revisiones de acceso", desc: "Inventario automatizado de usuarios, roles y permisos para revisión de acceso periódica." },
  ];

  const latamFrameworks = [
    {
      name: "NOM-151",
      country: "México 🇲🇽",
      color: "#FF6B35",
      desc: "La NOM-151 obliga a conservar mensajes de datos con constancia de conservación emitida por un PSC (Prestador de Servicios de Certificación). qatech360 genera, firma y almacena los mensajes de datos de seguridad con valor legal.",
      reqs: ["Conservación mínima 5 años", "Sellado de tiempo NOM compliant", "Cadena de custodia digital", "Exportación para PSC"],
    },
    {
      name: "LGPD",
      country: "Brasil 🇧🇷",
      color: "#009639",
      desc: "A Lei Geral de Proteção de Dados exige controles sobre tratamento de dados pessoais. qatech360 mapea accesos a dados pessoais, detecta vazamentos e gera relatórios de impacto (DPIA) automaticamente.",
      reqs: ["Mapeamento de dados pessoais", "Detecção de vazamentos (72h)", "Relatório DPIA automático", "Controle de acesso a dados"],
    },
    {
      name: "Ley 1581",
      country: "Colombia 🇨🇴",
      color: "#CE1126",
      desc: "La Ley Estatutaria 1581 y el Decreto 1377 requieren gestión del habeas data. qatech360 registra todos los accesos a datos personales, genera el Registro Nacional de Bases de Datos (RNBD) y detecta transferencias internacionales.",
      reqs: ["Aviso de privacidad auditable", "Registro de accesos (RNBD)", "Detección transferencias int.", "Alertas de incidente 24h"],
    },
  ];

  const features = [
    { icon: "🤖", title: "Recolección automática", desc: "Evidencia recolectada sin intervención humana, 24/7." },
    { icon: "📄", title: "Informes con un clic", desc: "PDF/Excel listos para auditor en menos de 5 minutos." },
    { icon: "📊", title: "Seguimiento de remediación", desc: "Tracking de cada control fallido hasta su corrección." },
    { icon: "🗺️", title: "Mapeo de controles", desc: "Un control cumple múltiples frameworks automáticamente." },
    { icon: "📈", title: "Tendencia mensual", desc: "Dashboard de evolución de cumplimiento mes a mes." },
    { icon: "🌐", title: "Multi-framework", desc: "Gestiona todos tus frameworks desde un solo panel." },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <NavBar />

      {/* ── 1. Hero ── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center gap-12 px-6 pt-24 pb-16 overflow-hidden max-w-7xl mx-auto"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0070F3]/8 via-transparent to-[#00FF88]/5" />

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={heroInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative z-10 flex-1 max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/30 text-[#00FF88] text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
            Cumplimiento Automatizado
          </span>
          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            Automatización de{" "}
            <span className="bg-gradient-to-r from-[#0070F3] to-[#00FF88] bg-clip-text text-transparent">
              Cumplimiento
            </span>
          </h1>
          <p className="text-xl text-[#A0A0A0] mb-10 leading-relaxed">
            PCI-DSS, HIPAA, GDPR, SOC2, NOM-151, LGPD — todos en una sola plataforma. Genera informes de auditoría en 5 minutos, no en 3 semanas.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/trial"
              className="px-8 py-4 bg-[#0070F3] hover:bg-[#0050D0] text-white font-bold rounded-xl transition-all duration-200 shadow-[0_0_30px_rgba(0,112,243,0.4)] hover:shadow-[0_0_50px_rgba(0,112,243,0.6)] text-lg"
            >
              Genera tu primer informe gratis
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
          initial={{ opacity: 0, x: 40 }}
          animate={heroInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 flex-1 max-w-sm"
        >
          <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-8">
            <ComplianceGaugeSVG />
            <div className="mt-6 space-y-2">
              {[
                { fw: "PCI-DSS 4.0", score: 95, color: "#0070F3" },
                { fw: "HIPAA", score: 91, color: "#00D4FF" },
                { fw: "GDPR", score: 89, color: "#00FF88" },
                { fw: "NOM-151", score: 98, color: "#FF6B35" },
              ].map((item) => (
                <div key={item.fw} className="flex items-center gap-3">
                  <span className="text-[#A0A0A0] text-xs w-20">{item.fw}</span>
                  <div className="flex-1 h-1.5 bg-[#1A1A1A] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.score}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.5 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                  <span className="text-xs font-bold" style={{ color: item.color }}>{item.score}%</span>
                </div>
              ))}
            </div>
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
              <div className="text-4xl font-black text-[#0070F3] mb-1">
                <AnimatedCounter target={s.value} suffix={s.suffix} />
              </div>
              <div className="text-white font-semibold text-sm mb-1">{s.label}</div>
              <div className="text-[#666666] text-xs">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 3. Framework Grid ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black mb-4">
              Frameworks de cumplimiento{" "}
              <span className="text-[#0070F3]">soportados</span>
            </h2>
            <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
              Cobre todos los marcos regulatorios relevantes para LATAM desde una sola plataforma.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {frameworks.map((fw, i) => (
              <motion.div
                key={fw.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 hover:border-[#0070F3]/40 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-black text-white text-lg group-hover:text-[#00D4FF] transition-colors">{fw.name}</span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ color: fw.color, backgroundColor: fw.color + "20" }}
                  >
                    {fw.region}
                  </span>
                </div>
                <p className="text-[#A0A0A0] text-xs leading-relaxed mb-3">{fw.key}</p>
                <p className="text-[#666666] text-xs">{fw.reqs}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. How Automation Works ── */}
      <section className="py-24 px-6 bg-[#111111]/50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black mb-4">
              Cómo funciona la{" "}
              <span className="text-[#00D4FF]">automatización</span>
            </h2>
            <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
              De controles definidos a informe PDF listo para auditor — completamente automático.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-8"
          >
            <AutomationFlowSVG />
          </motion.div>
        </div>
      </section>

      {/* ── 5. Evidence Types ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black mb-4">
              Tipos de{" "}
              <span className="text-[#0070F3]">evidencia recolectada</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {evidenceTypes.map((e, i) => (
              <motion.div
                key={e.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-6 hover:border-[#0070F3]/40 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{e.icon}</div>
                <h3 className="text-white font-bold mb-2">{e.title}</h3>
                <p className="text-[#A0A0A0] text-sm leading-relaxed">{e.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Report Preview ── */}
      <section className="py-24 px-6 bg-[#111111]/50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black mb-4">
              Informes{" "}
              <span className="text-[#00D4FF]">listos para auditoría</span>
            </h2>
            <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
              Exporta en PDF o Excel con un clic. Incluye resumen ejecutivo, estado por control y evidencia adjunta.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <ReportPreviewSVG />
          </motion.div>
        </div>
      </section>

      {/* ── 7. LATAM Compliance ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black mb-4">
              Cumplimiento LATAM{" "}
              <span className="text-[#0070F3]">especializado</span>
            </h2>
            <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
              Somos los únicos que cubrimos las regulaciones locales específicas de LATAM, no solo los marcos globales.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {latamFrameworks.map((fw, i) => (
              <motion.div
                key={fw.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-7 hover:border-[#0070F3]/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-black text-2xl" style={{ color: fw.color }}>{fw.name}</span>
                  <span className="text-lg">{fw.country.split(" ")[1]}</span>
                </div>
                <p className="text-[#A0A0A0] text-sm leading-relaxed mb-5">{fw.desc}</p>
                <ul className="space-y-2">
                  {fw.reqs.map((req) => (
                    <li key={req} className="flex items-center gap-2 text-sm">
                      <span style={{ color: fw.color }} className="text-xs">✓</span>
                      <span className="text-[#A0A0A0]">{req}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Feature Grid ── */}
      <section className="py-24 px-6 bg-[#111111]/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black mb-4">
              Todas las <span className="text-[#0070F3]">capacidades</span>
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

      {/* ── 9. Before / After ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black mb-4">
              Ahorra{" "}
              <span className="text-[#00FF88]">semanas de trabajo</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#FF3B3B]/5 border border-[#FF3B3B]/20 rounded-2xl p-8"
            >
              <div className="text-[#FF3B3B] font-black text-lg mb-6">Sin qatech360</div>
              <ul className="space-y-4">
                {[
                  "Recolección manual de evidencias: 2 semanas",
                  "Mapeo de controles en Excel: 3–5 días",
                  "Reuniones con el equipo de auditoría: 1 semana",
                  "Generación de informe PDF: 2–3 días",
                  "Correcciones post-revisión: 1 semana",
                  "Total: 3–6 semanas de trabajo intenso",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-[#FF3B3B] mt-0.5 flex-shrink-0">✗</span>
                    <span className="text-[#A0A0A0] text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#00FF88]/5 border border-[#00FF88]/20 rounded-2xl p-8"
            >
              <div className="text-[#00FF88] font-black text-lg mb-6">Con qatech360</div>
              <ul className="space-y-4">
                {[
                  "Evidencia recolectada automáticamente: continuo",
                  "Mapeo de controles: automático en tiempo real",
                  "Estado de auditoría visible en dashboard: siempre",
                  "Informe PDF generado: 5 minutos",
                  "Correcciones: alertas y guía instantánea",
                  "Total: menos de 1 hora al mes",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-[#00FF88] mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-[#A0A0A0] text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 10. CTA ── */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#0070F3]/10 via-transparent to-[#00FF88]/5">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Genera tu primer informe{" "}
              <span className="text-[#00FF88]">gratis</span>
            </h2>
            <p className="text-[#A0A0A0] text-xl mb-10">
              Conecta tu infraestructura y ten tu primer informe de cumplimiento en 5 minutos.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/trial"
                className="px-10 py-4 bg-[#0070F3] hover:bg-[#0050D0] text-white font-bold rounded-xl transition-all duration-200 shadow-[0_0_40px_rgba(0,112,243,0.5)] text-lg"
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
