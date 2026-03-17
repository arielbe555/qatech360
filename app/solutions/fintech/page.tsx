"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const threats = [
  {
    title: "Card Skimming Digital",
    desc: "Scripts maliciosos en formularios de pago capturan datos de tarjetas en tiempo real. Detectamos inyecciones de código en front-end y alertamos antes del daño.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <rect x="4" y="12" width="32" height="20" rx="3" stroke="#FF3B3B" strokeWidth="1.5" />
        <path d="M4 20h32" stroke="#FF3B3B" strokeWidth="1.5" />
        <circle cx="28" cy="28" r="4" stroke="#FF3B3B" strokeWidth="1.5" />
        <path d="M26.5 28l1 1 2-2" stroke="#FF3B3B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: "#FF3B3B",
  },
  {
    title: "Account Takeover (ATO)",
    desc: "Ataques de credential stuffing contra portales de clientes. Nuestro sistema detecta patrones de login anómalos y bloquea automáticamente.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <circle cx="20" cy="14" r="7" stroke="#FFB800" strokeWidth="1.5" />
        <path d="M6 36c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke="#FFB800" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M26 10l4-4M30 10l-4-4" stroke="#FFB800" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    color: "#FFB800",
  },
  {
    title: "Abuso de API",
    desc: "Llamadas masivas a APIs de transacciones, scraping de datos financieros, y explotación de endpoints no autenticados.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <rect x="8" y="8" width="10" height="10" rx="2" stroke="#A0A0A0" strokeWidth="1.5" />
        <rect x="22" y="8" width="10" height="10" rx="2" stroke="#A0A0A0" strokeWidth="1.5" />
        <rect x="8" y="22" width="10" height="10" rx="2" stroke="#A0A0A0" strokeWidth="1.5" />
        <rect x="22" y="22" width="10" height="10" rx="2" stroke="#FF3B3B" strokeWidth="1.5" />
        <path d="M18 13h4M18 27h4M13 18v4M27 18v4" stroke="#A0A0A0" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    color: "#A0A0A0",
  },
  {
    title: "Fraude Interno",
    desc: "Empleados con acceso privilegiado a sistemas de core bancario. Monitoreamos comportamiento inusual de usuarios con acceso a datos financieros.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <circle cx="20" cy="14" r="7" stroke="#0070F3" strokeWidth="1.5" />
        <path d="M6 36c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke="#0070F3" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M28 28l6 6M28 34l6-6" stroke="#FF3B3B" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    color: "#0070F3",
  },
  {
    title: "Exfiltración de Datos",
    desc: "Transferencias inusuales de bases de datos de clientes, archivos de transacciones o información de cuentas hacia destinos externos.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <path d="M20 8v16M14 18l6 6 6-6" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 30h24" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 34h24" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
    color: "#00D4FF",
  },
];

const complianceItems = [
  {
    name: "PCI-DSS 4.0",
    desc: "Procesamiento seguro de datos de tarjetas. Automatizamos 18 de los 30 requerimientos técnicos.",
    region: "Global",
    color: "#00FF88",
  },
  {
    name: "SOC 2 Tipo II",
    desc: "Disponibilidad, confidencialidad e integridad de datos. Reportes continuos, no solo anuales.",
    region: "Global",
    color: "#0070F3",
  },
  {
    name: "CNBV",
    desc: "Comisión Nacional Bancaria y de Valores de México. Circular 3/2012 y disposiciones de ciberseguridad.",
    region: "México",
    color: "#00D4FF",
  },
  {
    name: "SFC",
    desc: "Superintendencia Financiera de Colombia. Circular Externa 007 de 2018 sobre riesgo operativo.",
    region: "Colombia",
    color: "#FFB800",
  },
  {
    name: "BACEN",
    desc: "Banco Central de Brasil. Resolução CMN 4.893 sobre gestión continua de ciberseguridad.",
    region: "Brasil",
    color: "#A855F7",
  },
];

const pciAutomation = [
  { req: "Req. 10.2", desc: "Revisión automatizada de logs de acceso", automated: true },
  { req: "Req. 10.6", desc: "Análisis diario de logs de seguridad", automated: true },
  { req: "Req. 11.3", desc: "Evidencia de pruebas de penetración", automated: true },
  { req: "Req. 11.5", desc: "Monitoreo de integridad de archivos (FIM)", automated: true },
  { req: "Req. 12.4", desc: "Revisión de políticas de seguridad", automated: true },
  { req: "Req. 6.3", desc: "Escaneo de vulnerabilidades trimestral", automated: true },
];

export default function FintechPage() {
  const heroRef = useRef(null);
  const threatsRef = useRef(null);
  const complianceRef = useRef(null);
  const protectionRef = useRef(null);
  const pciRef = useRef(null);
  const caseRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const threatsInView = useInView(threatsRef, { once: true, margin: "-80px" });
  const compInView = useInView(complianceRef, { once: true, margin: "-80px" });
  const protInView = useInView(protectionRef, { once: true, margin: "-80px" });
  const pciInView = useInView(pciRef, { once: true, margin: "-80px" });
  const caseInView = useInView(caseRef, { once: true, margin: "-80px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <NavBar />

      {/* 1. HERO */}
      <section ref={heroRef} className="relative pt-32 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00FF88]/5 via-transparent to-[#0070F3]/5" />
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00FF88]/30 bg-[#00FF88]/10 text-[#00FF88] text-sm font-medium mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
              Solución Fintech y Banca
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
            >
              Seguridad para{" "}
              <span className="bg-gradient-to-r from-[#00FF88] to-[#00D4FF] bg-clip-text text-transparent">
                Fintech y Banca Digital
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-[#A0A0A0] mb-8"
            >
              PCI-DSS, prevención de fraude y cumplimiento regulatorio — automatizados.
              Tu plataforma financiera protegida 24/7 por especialistas que entienden el sector.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/demo" className="px-8 py-4 bg-[#00FF88] hover:bg-[#00D4A0] text-[#0A0A0A] font-bold rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(0,255,136,0.3)]">
                Habla con el especialista Fintech
              </Link>
              <Link href="/trial" className="px-8 py-4 border border-[#2A2A2A] hover:border-[#00FF88]/40 text-[#A0A0A0] hover:text-white font-semibold rounded-lg transition-all duration-200">
                Prueba 14 días
              </Link>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center"
          >
            {/* Fintech security SVG */}
            <svg viewBox="0 0 320 280" fill="none" className="w-full max-w-sm">
              <rect x="60" y="40" width="200" height="130" rx="12" fill="#111111" stroke="#2A2A2A" strokeWidth="1.5" />
              <rect x="60" y="40" width="200" height="36" rx="12" fill="#1A1A1A" />
              <path d="M72 58h12M90 54h40" stroke="#00FF88" strokeWidth="2" strokeLinecap="round" />
              <rect x="80" y="92" width="60" height="8" rx="2" fill="#2A2A2A" />
              <rect x="80" y="106" width="100" height="6" rx="2" fill="#2A2A2A" opacity="0.6" />
              <rect x="80" y="118" width="80" height="6" rx="2" fill="#2A2A2A" opacity="0.4" />
              <rect x="80" y="130" width="90" height="20" rx="4" fill="#00FF88" opacity="0.15" stroke="#00FF88" strokeWidth="1" />
              <text x="88" y="144" fill="#00FF88" fontSize="10" fontFamily="monospace">Pago seguro ✓</text>
              <circle cx="200" cy="200" r="50" fill="#111111" stroke="#00FF88" strokeWidth="1.5" />
              <path d="M200 175v25l15 10" stroke="#00FF88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M178 200c0-12.15 9.85-22 22-22s22 9.85 22 22-9.85 22-22 22-22-9.85-22-22z" stroke="#00FF88" strokeWidth="1" opacity="0.3" />
              <circle cx="200" cy="200" r="6" fill="#00FF88" />
              <path d="M120 170l20 20M150 165l-10 25" stroke="#0070F3" strokeWidth="1" opacity="0.4" />
              <path d="M60 170l-20 20M260 170l20 20" stroke="#2A2A2A" strokeWidth="1" />
              <text x="170" y="262" fill="#666666" fontSize="9" fontFamily="sans-serif">Monitoreo 24/7</text>
            </svg>
          </motion.div>
        </div>
      </section>

      {/* 2. THREATS */}
      <section ref={threatsRef} className="py-20 px-4 bg-[#111111]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={threatsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Amenazas específicas del sector Fintech
            </h2>
            <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
              Las plataformas financieras son el objetivo más lucrativo para los ciberdelincuentes.
              Conocemos cada vector de ataque.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {threats.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 25 }}
                animate={threatsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-5 bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl"
              >
                <div className="p-2 rounded-lg bg-[#1A1A1A] inline-block mb-4">{t.icon}</div>
                <h3 className="font-bold text-white mb-2">{t.title}</h3>
                <p className="text-sm text-[#A0A0A0] leading-relaxed">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. COMPLIANCE */}
      <section ref={complianceRef} className="py-20 px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={compInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Cumplimiento regulatorio Fintech
          </h2>
          <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
            Cobertura para todos los reguladores financieros de la región LATAM.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {complianceItems.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 25 }}
              animate={compInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="p-5 bg-[#111111] border border-[#2A2A2A] rounded-xl"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-white text-lg">{c.name}</span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ backgroundColor: c.color + "20", color: c.color, border: `1px solid ${c.color}40` }}
                >
                  {c.region}
                </span>
              </div>
              <p className="text-sm text-[#A0A0A0] leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. HOW WE PROTECT */}
      <section ref={protectionRef} className="py-20 px-4 bg-[#111111]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={protInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Cómo protegemos tu plataforma
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Monitoreo de APIs",
                desc: "Cada llamada a tus APIs financieras es analizada. Detectamos rate limiting abuse, scraping automatizado y endpoints mal configurados.",
                icon: "🔌",
              },
              {
                title: "Detección de Anomalías en Transacciones",
                desc: "Baseline de comportamiento por usuario. Alerta inmediata cuando un patrón transaccional se desvía estadísticamente del histórico.",
                icon: "📊",
              },
              {
                title: "Monitoreo de Accesos Privilegiados",
                desc: "Todo acceso de administradores a sistemas de core bancario queda auditado. Alerta en tiempo real sobre accesos fuera de horario o desde IPs inusuales.",
                icon: "🔑",
              },
              {
                title: "Verificación de Cifrado",
                desc: "Monitoreo continuo de certificados TLS, configuraciones de cifrado en tránsito y en reposo, y detección de downgrade attacks.",
                icon: "🔒",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                animate={protInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl flex gap-4"
              >
                <span className="text-3xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-[#A0A0A0] leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PCI-DSS AUTOMATION */}
      <section ref={pciRef} className="py-20 px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={pciInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Automatización PCI-DSS 4.0
          </h2>
          <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
            Automatizamos los requerimientos técnicos más complejos y costosos de PCI-DSS.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pciAutomation.map((p, i) => (
            <motion.div
              key={p.req}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={pciInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-start gap-4 p-4 bg-[#111111] border border-[#2A2A2A] rounded-xl"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/30 flex items-center justify-center">
                <svg className="w-4 h-4 text-[#00FF88]" viewBox="0 0 16 16" fill="currentColor">
                  <path fillRule="evenodd" d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z" />
                </svg>
              </div>
              <div>
                <span className="text-xs font-mono text-[#0070F3] mb-0.5 block">{p.req}</span>
                <p className="text-sm text-[#A0A0A0]">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. CASE STUDY */}
      <section ref={caseRef} className="py-20 px-4 bg-[#111111]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={caseInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="p-8 bg-[#0A0A0A] border border-[#00FF88]/20 rounded-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/20 text-[#00FF88] text-xs font-medium mb-6">
              Caso de Éxito
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              De cero a PCI-DSS certificado en 30 días
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {[
                { label: "Tiempo de certificación", before: "6-9 meses", after: "30 días", color: "#00FF88" },
                { label: "Costo de auditoría", before: "$80,000 USD", after: "$12,000 USD", color: "#0070F3" },
                { label: "Requerimientos automatizados", before: "0%", after: "60%", color: "#00D4FF" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-4 bg-[#111111] rounded-xl border border-[#2A2A2A]">
                  <p className="text-xs text-[#666666] mb-2">{stat.label}</p>
                  <p className="text-sm line-through text-[#666666] mb-1">{stat.before}</p>
                  <p className="text-xl font-bold" style={{ color: stat.color }}>{stat.after}</p>
                </div>
              ))}
            </div>
            <blockquote className="text-[#A0A0A0] italic border-l-2 border-[#00FF88] pl-4 mb-4">
              "Implementamos qatech360 a mediados de enero. Para el 15 de febrero ya teníamos el reporte PCI-DSS listo
              para el auditor. Lo que normalmente toma medio año, lo hicimos en cuatro semanas."
            </blockquote>
            <p className="text-sm text-[#666666]">— CTO, Fintech de pagos B2B · Ciudad de México, México · 120 empleados</p>
          </motion.div>
        </div>
      </section>

      {/* 7. CTA */}
      <section ref={ctaRef} className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Habla con nuestro especialista Fintech
            </h2>
            <p className="text-[#A0A0A0] text-lg mb-8">
              30 minutos. Sin pitch de ventas. Solo una conversación técnica sobre tu plataforma y tus requerimientos de cumplimiento.
            </p>
            <Link
              href="/demo"
              className="inline-block px-12 py-5 bg-[#00FF88] hover:bg-[#00D4A0] text-[#0A0A0A] font-bold rounded-lg text-lg transition-all duration-200 shadow-[0_0_30px_rgba(0,255,136,0.3)]"
            >
              Agendar reunión con especialista
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
