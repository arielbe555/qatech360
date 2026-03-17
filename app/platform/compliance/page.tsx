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

const frameworks = [
  {
    name: "PCI-DSS 4.0",
    category: "Pagos",
    desc: "Estándar de seguridad para tarjetas de pago. Aplica a cualquier empresa que procese, almacene o transmita datos de tarjetas.",
    controls: 256,
    color: "#0070F3",
    badge: "Global",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <rect x="2" y="5" width="20" height="14" rx="2" stroke="#0070F3" strokeWidth="1.5" />
        <path d="M2 10h20" stroke="#0070F3" strokeWidth="1.5" />
        <circle cx="6" cy="15" r="1.5" fill="#0070F3" opacity="0.7" />
        <rect x="10" y="13.5" width="8" height="3" rx="1" fill="#0070F320" stroke="#0070F3" strokeWidth="0.75" />
      </svg>
    ),
  },
  {
    name: "HIPAA",
    category: "Salud",
    desc: "Protección de información de salud electrónica en EE.UU. y empresas que operan con entidades cubiertas.",
    controls: 178,
    color: "#00FF88",
    badge: "Healthcare",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#00FF88" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 12h6M12 9v6" stroke="#00FF88" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "GDPR",
    category: "Privacidad",
    desc: "Reglamento europeo de protección de datos. Aplica a cualquier empresa que procese datos de ciudadanos de la UE.",
    controls: 99,
    color: "#00D4FF",
    badge: "Europa / Global",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <circle cx="12" cy="12" r="9" stroke="#00D4FF" strokeWidth="1.5" />
        <path d="M12 8v4l3 2" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7.5 5.5C9 4 10.9 3 12 3" stroke="#00D4FF" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
  },
  {
    name: "SOC 2",
    category: "Auditoría",
    desc: "Marco de auditoría para proveedores de servicios tecnológicos. Evalúa controles de seguridad, disponibilidad y confidencialidad.",
    controls: 64,
    color: "#FFB800",
    badge: "SaaS / Tech",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path d="M9 11l3 3L22 4" stroke="#FFB800" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="#FFB800" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "ISO 27001",
    category: "Internacional",
    desc: "Norma internacional de gestión de seguridad de la información. Aplicable a organizaciones de cualquier sector y tamaño.",
    controls: 114,
    color: "#A78BFA",
    badge: "Global",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <circle cx="12" cy="12" r="9" stroke="#A78BFA" strokeWidth="1.5" />
        <path d="M12 7v5l4 2" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8.5 16.5c1 .7 2.2 1 3.5 1s2.5-.3 3.5-1" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      </svg>
    ),
  },
  {
    name: "NOM-151",
    category: "México",
    desc: "Norma Oficial Mexicana para conservación de mensajes de datos y digitalización de documentos con valor probatorio.",
    controls: 42,
    color: "#FF3B3B",
    badge: "México",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="#FF3B3B" strokeWidth="1.5" />
        <path d="M8 9h8M8 13h5" stroke="#FF3B3B" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M3 8h18" stroke="#FF3B3B" strokeWidth="1" opacity="0.4" />
        <circle cx="17" cy="17" r="3" fill="#FF3B3B20" stroke="#FF3B3B" strokeWidth="1" />
        <path d="M16 17l.7.7 1.3-1.4" stroke="#FF3B3B" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "LGPD",
    category: "Brasil",
    desc: "Lei Geral de Proteção de Dados del Brasil. Equivalente al GDPR europeo para datos de ciudadanos brasileños.",
    controls: 65,
    color: "#00FF88",
    badge: "Brasil",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path d="M12 3l9 5v8l-9 5-9-5V8l9-5z" stroke="#00FF88" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke="#00FF88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Ley 1581",
    category: "Colombia",
    desc: "Ley colombiana de protección de datos personales. Regula el tratamiento de información personal de ciudadanos colombianos.",
    controls: 38,
    color: "#FFB800",
    badge: "Colombia",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#FFB800" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="9" cy="7" r="4" stroke="#FFB800" strokeWidth="1.5" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" stroke="#FFB800" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        <path d="M16 3.13a4 4 0 010 7.75" stroke="#FFB800" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      </svg>
    ),
  },
];

const complianceFeatures = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="#0070F3" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M8 10h8M8 14h5" stroke="#0070F3" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      </svg>
    ),
    title: "Recolección automática de evidencia",
    desc: "Captura continua de logs, configuraciones y eventos como evidencia lista para auditorías. Sin trabajo manual del equipo.",
    color: "#0070F3",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#00FF88" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="#00FF88" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Informes con un clic",
    desc: "Genera reportes de auditoría listos para entregar al auditor en formato PDF o Excel. En minutos, no en semanas.",
    color: "#00FF88",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" stroke="#00D4FF" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    title: "Mapeo de controles",
    desc: "Cada evento y configuración se mapea automáticamente al control de cumplimiento correspondiente en cada framework.",
    color: "#00D4FF",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <circle cx="12" cy="12" r="9" stroke="#FFB800" strokeWidth="1.5" />
        <path d="M12 7v5l3 2" stroke="#FFB800" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="12" r="2" fill="#FFB800" opacity="0.2" />
      </svg>
    ),
    title: "Marcos LATAM incluidos",
    desc: "NOM-151 México, LGPD Brasil y Ley 1581 Colombia están integrados de serie. Sin configuración adicional.",
    color: "#FFB800",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#A78BFA" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Seguimiento de remediación",
    desc: "Vista de brechas por control con estado de remediación, responsable asignado y fecha límite de cierre.",
    color: "#A78BFA",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path d="M18 20V10M12 20V4M6 20v-6" stroke="#00FF88" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M3 20h18" stroke="#00FF88" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
    title: "Dashboard de tendencias",
    desc: "Evolución mensual del porcentaje de cumplimiento por framework. Detecta regresiones antes de la auditoría.",
    color: "#00FF88",
  },
];

const flowSteps = [
  { step: "01", label: "Controles", desc: "Mapeo automático de 500+ controles activos", color: "#0070F3" },
  { step: "02", label: "Evidencia", desc: "Captura continua sin intervención manual", color: "#00D4FF" },
  { step: "03", label: "Informe", desc: "Generación en un clic en minutos", color: "#00FF88" },
  { step: "04", label: "Auditoría", desc: "Entrega al auditor lista para revisión", color: "#A78BFA" },
];

const latamFrameworks = [
  {
    country: "México",
    law: "NOM-151",
    desc: "Norma para conservación de mensajes de datos con validez jurídica. Exigida para contratos electrónicos, facturas y comunicaciones oficiales.",
    requirement: "Sellado de tiempo + integridad documental",
    color: "#FF3B3B",
    flagColors: ["#006847", "#FFFFFF", "#CE1126"],
    icon: (
      <svg viewBox="0 0 36 24" className="w-9 h-6">
        <rect width="12" height="24" fill="#006847" />
        <rect x="12" width="12" height="24" fill="#FFFFFF" />
        <rect x="24" width="12" height="24" fill="#CE1126" />
        <ellipse cx="18" cy="12" rx="3.5" ry="4" fill="#8B4513" opacity="0.7" />
      </svg>
    ),
  },
  {
    country: "Brasil",
    law: "LGPD",
    desc: "Lei Geral de Proteção de Dados. Equivalente al GDPR para datos de ciudadanos brasileños. Incluye requisitos de DPO y registros de tratamiento.",
    requirement: "Registros de tratamiento + notificación de brechas",
    color: "#00FF88",
    flagColors: ["#009C3B", "#FFDF00", "#002776"],
    icon: (
      <svg viewBox="0 0 36 24" className="w-9 h-6">
        <rect width="36" height="24" fill="#009C3B" />
        <polygon points="18,2 34,12 18,22 2,12" fill="#FFDF00" />
        <circle cx="18" cy="12" r="5" fill="#002776" />
        <path d="M13 12.5c1.5-2.5 4-4 7-3.5" stroke="#FFFFFF" strokeWidth="0.7" fill="none" />
      </svg>
    ),
  },
  {
    country: "Colombia",
    law: "Ley 1581",
    desc: "Ley de Protección de Datos Personales. Regula la recolección, almacenamiento y uso de datos de colombianos. Requiere autorización explícita.",
    requirement: "Autorización + Registro Nacional de Bases de Datos",
    color: "#FFB800",
    flagColors: ["#FCD116", "#003087", "#CE1126"],
    icon: (
      <svg viewBox="0 0 36 24" className="w-9 h-6">
        <rect width="36" height="10" fill="#FCD116" />
        <rect y="10" width="36" height="7" fill="#003087" />
        <rect y="17" width="36" height="7" fill="#CE1126" />
      </svg>
    ),
  },
];

const complianceDashboard = [
  { name: "PCI-DSS 4.0", pct: 94, color: "#0070F3" },
  { name: "ISO 27001", pct: 88, color: "#A78BFA" },
  { name: "GDPR", pct: 91, color: "#00D4FF" },
  { name: "SOC 2", pct: 85, color: "#FFB800" },
  { name: "HIPAA", pct: 97, color: "#00FF88" },
  { name: "NOM-151", pct: 100, color: "#FF3B3B" },
];

export default function CompliancePage() {
  const [activeFramework, setActiveFramework] = useState<number | null>(null);

  return (
    <main className="bg-[#0A0A0A] min-h-screen">
      <NavBar />

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(0,112,243,0.1)_0%,transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#00FF88] rounded-full opacity-[0.03] blur-[150px]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp} className="mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#00FF8815] text-[#00FF88] border border-[#00FF8830]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
                  Evidencia continua 24/7
                </span>
              </motion.div>
              <motion.h1
                variants={fadeUp}
                className="text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight mb-6"
              >
                Automatización de{" "}
                <span className="bg-gradient-to-r from-[#0070F3] to-[#00D4FF] bg-clip-text text-transparent">
                  Cumplimiento
                </span>
                <br />
                en una sola plataforma
              </motion.h1>
              <motion.p variants={fadeUp} className="text-[#A0A0A0] text-lg leading-relaxed mb-10 max-w-xl">
                PCI-DSS 4.0, HIPAA, GDPR, SOC 2, ISO 27001 — y los marcos exclusivos
                de LATAM: NOM-151, LGPD y Ley 1581. Evidencia automática, informes
                en minutos, sin trabajo manual.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-2 bg-[#0070F3] hover:bg-[#0050D0] text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(0,112,243,0.3)] hover:shadow-[0_0_40px_rgba(0,112,243,0.5)]"
                >
                  Ver demo de cumplimiento
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link
                  href="/trial"
                  className="inline-flex items-center gap-2 border border-[#2A2A2A] hover:border-[#00FF88] text-[#A0A0A0] hover:text-[#00FF88] font-semibold px-6 py-3 rounded-lg transition-all duration-200"
                >
                  Iniciar prueba gratis
                </Link>
              </motion.div>
              <motion.div variants={fadeUp} className="flex gap-8 mt-10">
                {[
                  { val: "8", label: "Frameworks integrados" },
                  { val: "500+", label: "Controles automatizados" },
                  { val: "~5min", label: "Informe listo" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-bold bg-gradient-to-r from-[#0070F3] to-[#00D4FF] bg-clip-text text-transparent">{s.val}</div>
                    <div className="text-xs text-[#666666] mt-0.5">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Compliance dashboard mockup */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(0,255,136,0.06)]">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-[#2A2A2A] bg-[#0A0A0A]">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#FF3B3B]" />
                    <div className="w-3 h-3 rounded-full bg-[#FFB800]" />
                    <div className="w-3 h-3 rounded-full bg-[#00FF88]" />
                  </div>
                  <span className="text-xs text-[#666666] ml-2 font-mono">qatech360 — Compliance Console</span>
                  <div className="ml-auto flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
                    <span className="text-xs text-[#00FF88] font-mono">COMPLIANT</span>
                  </div>
                </div>
                <div className="grid grid-cols-4 border-b border-[#2A2A2A]">
                  {[
                    { label: "Frameworks", val: "8", color: "#0070F3" },
                    { label: "Controles", val: "500+", color: "#00D4FF" },
                    { label: "Cumplimiento", val: "93%", color: "#00FF88" },
                    { label: "Brechas", val: "14", color: "#FFB800" },
                  ].map((s) => (
                    <div key={s.label} className="p-3 border-r border-[#2A2A2A] last:border-r-0">
                      <div className="text-lg font-bold font-mono" style={{ color: s.color }}>{s.val}</div>
                      <div className="text-xs text-[#666666]">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="p-4 space-y-3">
                  <div className="text-xs text-[#666666] font-mono mb-2">CUMPLIMIENTO POR FRAMEWORK</div>
                  {complianceDashboard.map((fw, i) => (
                    <div key={fw.name} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-[#A0A0A0]">{fw.name}</span>
                        <span className="text-xs font-mono font-bold" style={{ color: fw.color }}>{fw.pct}%</span>
                      </div>
                      <div className="h-1.5 bg-[#1A1A1A] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${fw.pct}%` }}
                          transition={{ duration: 1.2, delay: 0.4 + i * 0.1 }}
                          className="h-full rounded-full"
                          style={{ background: fw.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 pb-4 pt-1">
                  <div className="flex items-center gap-2 bg-[#00FF8810] border border-[#00FF8825] rounded-lg px-3 py-2">
                    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 shrink-0">
                      <path d="M13 4L6.5 10.5 3 7" stroke="#00FF88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-xs text-[#00FF88]">Próxima auditoría PCI-DSS — Informe listo</span>
                    <span className="ml-auto text-[10px] text-[#00FF88] font-mono">2 min</span>
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
              { target: 8, suffix: "", label: "Frameworks integrados", sub: "Global + LATAM" },
              { target: 500, suffix: "+", label: "Controles automatizados", sub: "Sin intervención manual" },
              { target: 5, suffix: "min", label: "Tiempo para informe", sub: "Antes eran semanas" },
              { target: 100, suffix: "%", label: "Evidencia automática", sub: "Lista para auditoría" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-8 text-center hover:border-[#0070F330] transition-colors"
              >
                <div className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#0070F3] to-[#00D4FF] bg-clip-text text-transparent mb-2">
                  <AnimatedNumber target={stat.target} suffix={stat.suffix} />
                </div>
                <div className="font-semibold mb-1 text-sm">{stat.label}</div>
                <div className="text-xs text-[#666666]">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FRAMEWORKS GRID ── */}
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
                Frameworks soportados
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-bold mb-4">
              Un solo panel para{" "}
              <span className="text-[#0070F3]">todos tus marcos</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
              Incluye tanto los estándares globales como los marcos regulatorios
              específicos de América Latina. Sin configuración adicional.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {frameworks.map((fw, i) => (
              <motion.div
                key={fw.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                onClick={() => setActiveFramework(activeFramework === i ? null : i)}
                className="bg-[#111111] border rounded-xl p-5 cursor-pointer transition-all duration-300 hover:shadow-lg"
                style={{
                  borderColor: activeFramework === i ? fw.color + "60" : `${fw.color}20`,
                  boxShadow: activeFramework === i ? `0 0 20px ${fw.color}15` : undefined,
                }}
                whileHover={{ y: -4 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: `${fw.color}12`, border: `1px solid ${fw.color}25` }}
                  >
                    {fw.icon}
                  </div>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: `${fw.color}15`, color: fw.color, border: `1px solid ${fw.color}30` }}
                  >
                    {fw.badge}
                  </span>
                </div>
                <h3 className="font-bold text-base mb-1" style={{ color: fw.color }}>{fw.name}</h3>
                <p className="text-xs text-[#666666] leading-relaxed mb-3">{fw.category}</p>
                {activeFramework === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <p className="text-xs text-[#A0A0A0] leading-relaxed mb-2">{fw.desc}</p>
                    <div className="text-xs font-mono" style={{ color: fw.color }}>{fw.controls} controles</div>
                  </motion.div>
                )}
                <div className="flex items-center gap-1.5 mt-2">
                  <div className="flex-1 h-1 bg-[#1A1A1A] rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ background: fw.color, width: "100%" }} />
                  </div>
                  <span className="text-[10px] text-[#666666]">{fw.controls} ctrls</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA (FLOW) ── */}
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
                Flujo de automatización
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl font-bold mb-4">
              De los controles a la{" "}
              <span className="text-[#00FF88]">auditoría aprobada</span>
            </motion.h2>
          </motion.div>

          <div className="relative mb-16">
            <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[#0070F3] via-[#00D4FF] via-[#00FF88] to-[#A78BFA]" />
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {flowSteps.map((step, i) => (
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

          {/* SVG flow diagram */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-8"
          >
            <svg viewBox="0 0 800 180" className="w-full h-auto">
              <defs>
                <marker id="a1" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#0070F3" />
                </marker>
                <marker id="a2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#00D4FF" />
                </marker>
                <marker id="a3" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#00FF88" />
                </marker>
              </defs>

              {/* Box 1: Controles */}
              <rect x="10" y="50" width="160" height="80" rx="8" fill="#111111" stroke="#0070F340" strokeWidth="1" />
              <text x="90" y="82" textAnchor="middle" fill="#0070F3" fontSize="11" fontFamily="monospace" fontWeight="bold">Controles</text>
              <text x="90" y="98" textAnchor="middle" fill="#666666" fontSize="9">PCI · HIPAA · GDPR</text>
              <text x="90" y="114" textAnchor="middle" fill="#666666" fontSize="9">ISO · SOC2 · NOM-151</text>

              {/* Arrow 1 */}
              <path d="M172 90 L215 90" stroke="#0070F3" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#a1)" />

              {/* Box 2: Evidencia */}
              <rect x="215" y="50" width="160" height="80" rx="8" fill="#111111" stroke="#00D4FF40" strokeWidth="1" />
              <text x="295" y="82" textAnchor="middle" fill="#00D4FF" fontSize="11" fontFamily="monospace" fontWeight="bold">Evidencia</text>
              <text x="295" y="98" textAnchor="middle" fill="#666666" fontSize="9">Logs + configs + eventos</text>
              <text x="295" y="114" textAnchor="middle" fill="#666666" fontSize="9">captura continua</text>

              {/* Arrow 2 */}
              <path d="M377 90 L420 90" stroke="#00D4FF" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#a2)" />

              {/* Box 3: Informe */}
              <rect x="420" y="50" width="160" height="80" rx="8" fill="#111111" stroke="#00FF8840" strokeWidth="1" />
              <text x="500" y="82" textAnchor="middle" fill="#00FF88" fontSize="11" fontFamily="monospace" fontWeight="bold">Informe</text>
              <text x="500" y="98" textAnchor="middle" fill="#666666" fontSize="9">PDF · Excel generados</text>
              <text x="500" y="114" textAnchor="middle" fill="#666666" fontSize="9">en menos de 5 minutos</text>

              {/* Arrow 3 */}
              <path d="M582 90 L625 90" stroke="#00FF88" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#a3)" />

              {/* Box 4: Auditoría */}
              <rect x="625" y="50" width="160" height="80" rx="8" fill="#111111" stroke="#A78BFA40" strokeWidth="1" />
              <text x="705" y="82" textAnchor="middle" fill="#A78BFA" fontSize="11" fontFamily="monospace" fontWeight="bold">Auditoría</text>
              <text x="705" y="98" textAnchor="middle" fill="#00FF88" fontSize="9">✓ Aprobada</text>
              <text x="705" y="114" textAnchor="middle" fill="#666666" fontSize="9">sin retrasos ni estrés</text>

              {/* Labels */}
              <text x="90" y="148" textAnchor="middle" fill="#444" fontSize="8">500+ controles mapeados</text>
              <text x="295" y="148" textAnchor="middle" fill="#444" fontSize="8">Automática, sin intervención</text>
              <text x="500" y="148" textAnchor="middle" fill="#444" fontSize="8">1 clic, formato auditor</text>
              <text x="705" y="148" textAnchor="middle" fill="#444" fontSize="8">Listo para entregar</text>
            </svg>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURE GRID ── */}
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
                Capacidades del módulo
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-bold mb-4">
              Todo lo necesario para{" "}
              <span className="text-[#0070F3]">pasar tu próxima auditoría</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {complianceFeatures.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-6 transition-all duration-300"
                style={{ borderColor: `${feat.color}15` }}
                whileHover={{ borderColor: feat.color + "40", y: -4 }}
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

      {/* ── COMPLIANCE DASHBOARD VISUALIZATION ── */}
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
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#A78BFA15] text-[#A78BFA] border border-[#A78BFA30] mb-4">
                Vista del panel
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl font-bold mb-4">
              Tu estado de cumplimiento,{" "}
              <span className="text-[#A78BFA]">de un vistazo</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl overflow-hidden"
          >
            <div className="flex items-center gap-2 px-5 py-4 border-b border-[#2A2A2A] bg-[#111111]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF3B3B]" />
                <div className="w-3 h-3 rounded-full bg-[#FFB800]" />
                <div className="w-3 h-3 rounded-full bg-[#00FF88]" />
              </div>
              <span className="text-xs text-[#666666] font-mono ml-2">Compliance Overview — Marzo 2026</span>
              <div className="ml-auto">
                <span className="text-xs bg-[#00FF8815] text-[#00FF88] border border-[#00FF8825] px-2.5 py-0.5 rounded-full">93% global</span>
              </div>
            </div>
            <div className="p-6 grid lg:grid-cols-2 gap-8">
              {/* Bar chart */}
              <div>
                <div className="text-xs text-[#666666] font-mono mb-4">CUMPLIMIENTO POR FRAMEWORK (%)</div>
                <div className="space-y-4">
                  {complianceDashboard.map((fw, i) => (
                    <div key={fw.name}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-sm font-medium text-[#A0A0A0]">{fw.name}</span>
                        <span className="text-sm font-bold font-mono" style={{ color: fw.color }}>{fw.pct}%</span>
                      </div>
                      <div className="h-3 bg-[#111111] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${fw.pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                          className="h-full rounded-full relative overflow-hidden"
                          style={{ background: `linear-gradient(90deg, ${fw.color}cc, ${fw.color})` }}
                        >
                          <div
                            className="absolute inset-0"
                            style={{
                              background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
                            }}
                          />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SVG radial summary */}
              <div className="flex flex-col items-center justify-center">
                <svg viewBox="0 0 240 240" className="w-52 h-52">
                  <circle cx="120" cy="120" r="90" fill="none" stroke="#1A1A1A" strokeWidth="2" />
                  <circle cx="120" cy="120" r="70" fill="none" stroke="#2A2A2A" strokeWidth="22" />
                  {/* 93% arc */}
                  <circle cx="120" cy="120" r="70" fill="none" stroke="url(#compGrad)" strokeWidth="22"
                    strokeDasharray="410 440" strokeDashoffset="110" transform="rotate(-90 120 120)" strokeLinecap="round">
                    <animate attributeName="stroke-dasharray" from="0 440" to="410 440" dur="1.5s" fill="freeze" />
                  </circle>
                  <defs>
                    <linearGradient id="compGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0070F3" />
                      <stop offset="50%" stopColor="#00D4FF" />
                      <stop offset="100%" stopColor="#00FF88" />
                    </linearGradient>
                  </defs>
                  <text x="120" y="110" textAnchor="middle" fill="#FFFFFF" fontSize="32" fontWeight="800" fontFamily="monospace">93%</text>
                  <text x="120" y="132" textAnchor="middle" fill="#666666" fontSize="11">cumplimiento global</text>
                  <text x="120" y="150" textAnchor="middle" fill="#00FF88" fontSize="10">8 frameworks activos</text>
                </svg>
                <div className="grid grid-cols-3 gap-3 mt-4 w-full">
                  {[
                    { label: "En regla", val: "486", color: "#00FF88" },
                    { label: "Brecha", val: "14", color: "#FFB800" },
                    { label: "Crítico", val: "0", color: "#FF3B3B" },
                  ].map((s) => (
                    <div key={s.label} className="bg-[#111111] rounded-lg p-2 text-center border border-[#2A2A2A]">
                      <div className="text-lg font-bold font-mono" style={{ color: s.color }}>{s.val}</div>
                      <div className="text-[10px] text-[#666666]">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── LATAM COMPLIANCE ── */}
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
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#FFB80015] text-[#FFB800] border border-[#FFB80030] mb-4">
                De LATAM, para LATAM
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl font-bold mb-4">
              Regulaciones <span className="text-[#FFB800]">locales</span> incluidas
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#A0A0A0] max-w-2xl mx-auto">
              Somos el único proveedor de ciberseguridad gestionada que incluye
              de serie los marcos regulatorios de México, Brasil y Colombia.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {latamFrameworks.map((lf, i) => (
              <motion.div
                key={lf.country}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="bg-[#111111] border rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                style={{ borderColor: `${lf.color}25` }}
                whileHover={{ borderColor: lf.color + "50", y: -4 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded overflow-hidden shadow-lg">{lf.icon}</div>
                  <div>
                    <h3 className="font-bold text-base" style={{ color: lf.color }}>{lf.country}</h3>
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ background: `${lf.color}15`, color: lf.color, border: `1px solid ${lf.color}30` }}
                    >
                      {lf.law}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-[#A0A0A0] leading-relaxed mb-4">{lf.desc}</p>
                <div
                  className="flex items-start gap-2 rounded-lg px-3 py-2.5"
                  style={{ background: `${lf.color}08`, border: `1px solid ${lf.color}20` }}
                >
                  <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 mt-0.5 shrink-0">
                    <path d="M13 4L6.5 10.5 3 7" stroke={lf.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-xs leading-relaxed" style={{ color: lf.color }}>{lf.requirement}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL / CISO QUOTE ── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[#111111]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,112,243,0.06)_0%,transparent_60%)]" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#0070F315] text-[#0070F3] border border-[#0070F330] mb-4">
                Tu próxima auditoría en 5 minutos
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl font-bold mb-4">
              Lo que dicen nuestros{" "}
              <span className="text-[#0070F3]">CISOs</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative bg-[#1A1A1A] border border-[#0070F330] rounded-2xl p-8 lg:p-12"
          >
            {/* Quote mark */}
            <div className="absolute top-6 left-8 text-[80px] leading-none text-[#0070F3] opacity-20 font-serif select-none">"</div>

            <blockquote className="relative z-10">
              <p className="text-xl lg:text-2xl text-[#FFFFFF] leading-relaxed font-medium mb-8">
                "Antes, preparar la evidencia para la auditoría PCI-DSS nos tomaba
                tres semanas de trabajo intenso de dos personas. Con qatech360,
                la última auditoría la cerramos en una tarde. El auditor recibió
                el PDF directamente desde el panel. Sin idas y venidas, sin
                faltante de evidencia. Fue la primera auditoría sin estrés en
                cinco años."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#0070F320] border border-[#0070F340] flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="#0070F3" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="12" cy="7" r="4" stroke="#0070F3" strokeWidth="1.5" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-white">Carlos Mendoza</div>
                  <div className="text-sm text-[#666666]">CISO — Fintech, Ciudad de México</div>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} viewBox="0 0 16 16" fill="#FFB800" className="w-4 h-4">
                      <path d="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.4l-3.7 1.9.7-4.1-3-2.9 4.2-.7z" />
                    </svg>
                  ))}
                </div>
              </div>
            </blockquote>

            {/* Decorative glow */}
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#0070F3] rounded-full opacity-[0.04] blur-[60px] pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,136,0.07)_0%,transparent_60%)]" />
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
              Tu próxima auditoría,
              <br />
              <span className="bg-gradient-to-r from-[#0070F3] to-[#00D4FF] bg-clip-text text-transparent">
                lista en 5 minutos.
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#A0A0A0] text-lg mb-10 max-w-2xl mx-auto">
              Conecta tus activos, activa los frameworks que necesitas y genera
              tu primer informe de cumplimiento antes de terminar el café.
              En español, con soporte LATAM incluido.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 bg-[#0070F3] hover:bg-[#0050D0] text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(0,112,243,0.3)] hover:shadow-[0_0_40px_rgba(0,112,243,0.5)] text-lg"
              >
                Ver demo de cumplimiento
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 border border-[#2A2A2A] hover:border-[#00D4FF] text-[#A0A0A0] hover:text-[#00D4FF] font-semibold px-8 py-4 rounded-lg transition-all duration-200 text-lg"
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
