"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const industries = [
  {
    slug: "pyme",
    label: "PyMEs y Startups",
    subtitle: "10–200 endpoints",
    description: "Protección enterprise para tu empresa, sin equipo de seguridad propio. Onboarding en 15 minutos.",
    compliance: "NOM-151 · ISO 27001",
    color: "#0070F3",
    svg: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="8" y="20" width="32" height="24" rx="2" stroke="#0070F3" strokeWidth="2" />
        <path d="M16 20V14a8 8 0 0116 0v6" stroke="#0070F3" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="32" r="3" fill="#0070F3" />
        <path d="M24 35v4" stroke="#0070F3" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    slug: "enterprise",
    label: "Enterprise",
    subtitle: "2,000+ endpoints",
    description: "SOC dedicado, SLA personalizado, despliegue híbrido y gestión multi-tenant para grandes organizaciones.",
    compliance: "SOC2 · ISO 27001 · PCI-DSS",
    color: "#00D4FF",
    svg: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="4" y="12" width="40" height="28" rx="2" stroke="#00D4FF" strokeWidth="2" />
        <path d="M4 20h40M16 12V8M32 12V8" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" />
        <rect x="12" y="26" width="8" height="8" rx="1" fill="#00D4FF" opacity="0.4" />
        <rect x="28" y="26" width="8" height="8" rx="1" fill="#00D4FF" opacity="0.4" />
        <rect x="20" y="26" width="8" height="8" rx="1" fill="#00D4FF" />
      </svg>
    ),
  },
  {
    slug: "fintech",
    label: "Fintech y Banca",
    subtitle: "PCI-DSS · CNBV · BACEN",
    description: "Cumplimiento PCI-DSS 4.0 automatizado, prevención de fraude y monitoreo de APIs financieras.",
    compliance: "PCI-DSS 4.0 · SOC2 · CNBV",
    color: "#00FF88",
    svg: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="6" y="14" width="36" height="24" rx="3" stroke="#00FF88" strokeWidth="2" />
        <path d="M6 22h36" stroke="#00FF88" strokeWidth="2" />
        <rect x="12" y="28" width="8" height="4" rx="1" fill="#00FF88" opacity="0.6" />
        <circle cx="36" cy="30" r="3" stroke="#00FF88" strokeWidth="2" />
        <path d="M24 8v6M20 10l4-4 4 4" stroke="#00FF88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    slug: "salud",
    label: "Sector Salud",
    subtitle: "HIPAA · NOM-024",
    description: "Protege datos de pacientes, EHR y dispositivos médicos conectados sin interrumpir la atención clínica.",
    compliance: "HIPAA · NOM-024-SSA3 · LGPD",
    color: "#FF3B3B",
    svg: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <circle cx="24" cy="24" r="18" stroke="#FF3B3B" strokeWidth="2" />
        <path d="M24 16v16M16 24h16" stroke="#FF3B3B" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    slug: "gobierno",
    label: "Gobierno",
    subtitle: "Soberanía de datos · APTs",
    description: "Detección de amenazas estado-nación, cumplimiento NOM-151 y despliegue on-premise para soberanía total.",
    compliance: "NOM-151 · Ley 1712 · LGPD",
    color: "#FFB800",
    svg: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M6 40h36M10 40V22M38 40V22M24 8l18 14H6L24 8z" stroke="#FFB800" strokeWidth="2" strokeLinejoin="round" />
        <rect x="20" y="30" width="8" height="10" rx="1" fill="#FFB800" opacity="0.5" />
      </svg>
    ),
  },
  {
    slug: "retail",
    label: "Retail y E-commerce",
    subtitle: "PCI-DSS · Protección de datos",
    description: "Seguridad para puntos de venta, plataformas e-commerce y cadenas de suministro digitales.",
    compliance: "PCI-DSS · ISO 27001",
    color: "#A855F7",
    svg: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M8 12h4l5 20h14l5-16H16" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="22" cy="38" r="2" fill="#A855F7" />
        <circle cx="34" cy="38" r="2" fill="#A855F7" />
        <path d="M30 20l-4 4-2-2" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const crossCapabilities = [
  { title: "SIEM Centralizado", desc: "Correlación de eventos de toda tu infraestructura, independientemente del sector.", icon: "📊" },
  { title: "EDR Multiplataforma", desc: "Agente ligero para Windows, Linux y macOS — menos del 1% de CPU.", icon: "💻" },
  { title: "XDR Unificado", desc: "Detección cruzada entre endpoint, red, cloud e identidad.", icon: "🔗" },
  { title: "SOC 24/7 LATAM", desc: "Analistas en tu zona horaria, comunicación en español.", icon: "🛡️" },
  { title: "Cumplimiento Automatizado", desc: "Reportes de auditoría listos en minutos, no semanas.", icon: "✅" },
  { title: "Respuesta Activa", desc: "Bloqueo automático de amenazas en milisegundos, antes del daño.", icon: "⚡" },
];

const specialists = [
  {
    name: "Carlos Mendoza",
    role: "Especialista Fintech & Banca",
    country: "Ciudad de México, MX",
    certs: "CISSP · PCI-QSA",
    color: "#00FF88",
  },
  {
    name: "Dra. Laura Restrepo",
    role: "Especialista Sector Salud",
    country: "Bogotá, CO",
    certs: "CISA · HIPAA Certified",
    color: "#0070F3",
  },
  {
    name: "Arq. Diego Vargas",
    role: "Especialista Gobierno & Infraestructura",
    country: "Lima, PE",
    certs: "CISM · ISO 27001 Lead Auditor",
    color: "#FFB800",
  },
];

export default function SolutionsPage() {
  const heroRef = useRef(null);
  const gridRef = useRef(null);
  const whyRef = useRef(null);
  const capRef = useRef(null);
  const specRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const gridInView = useInView(gridRef, { once: true, margin: "-80px" });
  const whyInView = useInView(whyRef, { once: true, margin: "-80px" });
  const capInView = useInView(capRef, { once: true, margin: "-80px" });
  const specInView = useInView(specRef, { once: true, margin: "-80px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <NavBar />

      {/* 1. HERO */}
      <section ref={heroRef} className="relative pt-32 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none%3E%3Cg fill=%23ffffff fill-opacity=0.03%3E%3Cpath d=M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#0070F3] opacity-5 blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0070F3]/30 bg-[#0070F3]/10 text-[#0070F3] text-sm font-medium mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
            Soluciones por Industria
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="text-white">La seguridad que</span>{" "}
            <span className="bg-gradient-to-r from-[#0070F3] to-[#00D4FF] bg-clip-text text-transparent">
              tu industria
            </span>{" "}
            <span className="text-white">necesita</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-[#A0A0A0] max-w-2xl mx-auto mb-10"
          >
            La misma protección enterprise, adaptada a tu sector y regulaciones locales.
            Desde PyMEs hasta gobiernos — en español, en tu zona horaria.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/demo"
              className="px-8 py-4 bg-[#0070F3] hover:bg-[#0050D0] text-white font-semibold rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(0,112,243,0.4)]"
            >
              Habla con un especialista
            </Link>
            <Link
              href="/trial"
              className="px-8 py-4 border border-[#2A2A2A] hover:border-[#0070F3]/40 text-[#A0A0A0] hover:text-white font-semibold rounded-lg transition-all duration-200"
            >
              Prueba gratis 14 días
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. INDUSTRY GRID */}
      <section ref={gridRef} className="py-20 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={gridInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Elige tu industria</h2>
          <p className="text-[#A0A0A0] text-lg">Soluciones preconfiguradas para los desafíos de tu sector.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                href={`/solutions/${ind.slug}`}
                className="group flex flex-col gap-4 p-6 bg-[#111111] border border-[#2A2A2A] rounded-xl hover:border-[#0070F3]/40 transition-all duration-300 h-full"
              >
                <div className="flex items-start justify-between">
                  <div className="p-3 rounded-lg bg-[#1A1A1A]">{ind.svg}</div>
                  <svg
                    className="w-5 h-5 text-[#666666] group-hover:text-[#0070F3] transition-colors duration-200 mt-1"
                    viewBox="0 0 20 20" fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#0070F3] transition-colors duration-200 mb-1">
                    {ind.label}
                  </h3>
                  <p className="text-sm text-[#666666] mb-3">{ind.subtitle}</p>
                  <p className="text-[#A0A0A0] text-sm leading-relaxed mb-4">{ind.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {ind.compliance.split(" · ").map((c) => (
                      <span
                        key={c}
                        className="text-xs px-2 py-0.5 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] text-[#666666]"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. ¿POR QUÉ LA INDUSTRIA IMPORTA? */}
      <section ref={whyRef} className="py-20 px-4 bg-[#111111]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={whyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Por qué la industria importa?
            </h2>
            <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
              El cumplimiento normativo no es universal. Cada sector tiene sus propios estándares,
              riesgos y reguladores. Una solución genérica nunca es suficiente.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                sector: "Fintech & Banca",
                regs: ["PCI-DSS 4.0", "CNBV (MX)", "SFC (CO)", "BACEN (BR)", "CMF (CL)"],
                risk: "Fraude financiero, robo de datos de tarjetas, acceso no autorizado a cuentas.",
                color: "#00FF88",
              },
              {
                sector: "Sector Salud",
                regs: ["HIPAA §164.312", "NOM-024-SSA3", "LGPD (salud)", "Res. 839 (CO)"],
                risk: "Robo de expedientes clínicos, ransomware en dispositivos médicos, violación HIPAA.",
                color: "#FF3B3B",
              },
              {
                sector: "Gobierno",
                regs: ["NOM-151 (MX)", "Ley 1712 (CO)", "LGPD (BR)", "Decreto 2364 (CO)"],
                risk: "APTs de estado-nación, ataques a infraestructura crítica, robo de datos ciudadanos.",
                color: "#FFB800",
              },
            ].map((item, i) => (
              <motion.div
                key={item.sector}
                initial={{ opacity: 0, y: 30 }}
                animate={whyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl"
              >
                <h3 className="font-bold text-white text-lg mb-4" style={{ color: item.color }}>
                  {item.sector}
                </h3>
                <div className="mb-4">
                  <p className="text-xs text-[#666666] uppercase tracking-wider mb-2">Regulaciones</p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.regs.map((r) => (
                      <span key={r} className="text-xs px-2 py-1 rounded bg-[#1A1A1A] border border-[#2A2A2A] text-[#A0A0A0]">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-[#A0A0A0] leading-relaxed">{item.risk}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CROSS-INDUSTRY CAPABILITIES */}
      <section ref={capRef} className="py-20 px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={capInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Capacidades compartidas en todas las industrias
          </h2>
          <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
            Una base sólida de seguridad para todos, con capas especializadas por sector.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {crossCapabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={capInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="p-5 bg-[#111111] border border-[#2A2A2A] rounded-xl flex gap-4 items-start"
            >
              <span className="text-2xl">{cap.icon}</span>
              <div>
                <h4 className="font-semibold text-white mb-1">{cap.title}</h4>
                <p className="text-sm text-[#A0A0A0]">{cap.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. SPECIALISTS */}
      <section ref={specRef} className="py-20 px-4 bg-[#111111]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={specInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Habla con un especialista de tu industria
            </h2>
            <p className="text-[#A0A0A0] text-lg">
              Nuestros expertos conocen tu sector, tus regulaciones y tus amenazas.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {specialists.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 30 }}
                animate={specInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl text-center"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 text-white"
                  style={{ backgroundColor: s.color + "20", border: `2px solid ${s.color}40` }}
                >
                  {s.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h4 className="font-bold text-white mb-1">{s.name}</h4>
                <p className="text-sm text-[#0070F3] mb-1">{s.role}</p>
                <p className="text-xs text-[#666666] mb-3">{s.country}</p>
                <div className="flex flex-wrap gap-1 justify-center mb-4">
                  {s.certs.split(" · ").map((c) => (
                    <span key={c} className="text-xs px-2 py-0.5 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] text-[#A0A0A0]">
                      {c}
                    </span>
                  ))}
                </div>
                <Link
                  href="/demo"
                  className="block w-full py-2.5 rounded-lg border border-[#2A2A2A] hover:border-[#0070F3]/40 text-[#A0A0A0] hover:text-white text-sm font-medium transition-all duration-200"
                >
                  Agendar reunión
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA */}
      <section ref={ctaRef} className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="p-10 bg-[#111111] border border-[#0070F3]/20 rounded-2xl shadow-[0_0_60px_rgba(0,112,243,0.1)]"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Listo para proteger tu organización?
            </h2>
            <p className="text-[#A0A0A0] text-lg mb-8">
              Solicita una demo personalizada con nuestro especialista de tu industria.
              Sin compromiso. En español. En tu zona horaria.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/demo"
                className="px-8 py-4 bg-[#0070F3] hover:bg-[#0050D0] text-white font-semibold rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(0,112,243,0.4)]"
              >
                Solicitar Demo
              </Link>
              <Link
                href="/trial"
                className="px-8 py-4 border border-[#2A2A2A] hover:border-[#0070F3]/40 text-[#A0A0A0] hover:text-white font-semibold rounded-lg transition-all duration-200"
              >
                Prueba 14 días gratis
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
