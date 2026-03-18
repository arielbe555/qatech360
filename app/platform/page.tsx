"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

// ================================================================
// CONSTANTS
// ================================================================
const STATS = [
  { value: "50K+", label: "Endpoints Protegidos" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "4.8 min", label: "MTTR Promedio" },
  { value: "2M+", label: "Amenazas Bloqueadas/Mes" },
];

const FEATURE_PILLARS = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="14" stroke="#0070F3" strokeWidth="2" />
        <path d="M10 16l4 4 8-8" stroke="#0070F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Detección",
    desc: "Correlación de eventos en tiempo real con más de 2,000 reglas listas y mapeo MITRE ATT&CK.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4L4 10v8c0 5.5 5 10.7 12 13 7-2.3 12-7.5 12-13v-8L16 4z" stroke="#00FF88" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    title: "Respuesta",
    desc: "Playbooks automatizados y analistas SOC LATAM disponibles 24/7 para contener incidentes en minutos.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="8" width="24" height="16" rx="2" stroke="#00D4FF" strokeWidth="2" />
        <path d="M4 13h24" stroke="#00D4FF" strokeWidth="2" />
        <circle cx="9" cy="20" r="2" fill="#00D4FF" />
      </svg>
    ),
    title: "Cumplimiento",
    desc: "PCI-DSS, HIPAA, GDPR, SOC2, NOM-151 y LGPD automatizados. Reportes listos para auditoría.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="4" fill="#FFB800" />
        <path d="M16 4v4M16 24v4M4 16h4M24 16h4M7.5 7.5l2.8 2.8M21.7 21.7l2.8 2.8M7.5 24.5l2.8-2.8M21.7 10.3l2.8-2.8" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Inteligencia",
    desc: "Feed propietario de amenazas LATAM actualizado cada hora. Enriquecimiento con VirusTotal y MISP.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="3" y="3" width="11" height="11" rx="2" stroke="#0070F3" strokeWidth="2" />
        <rect x="18" y="3" width="11" height="11" rx="2" stroke="#0070F3" strokeWidth="2" />
        <rect x="3" y="18" width="11" height="11" rx="2" stroke="#0070F3" strokeWidth="2" />
        <rect x="18" y="18" width="11" height="11" rx="2" stroke="#00D4FF" strokeWidth="2" />
      </svg>
    ),
    title: "Visibilidad",
    desc: "Panel unificado con dashboards interactivos. Visualiza toda tu infraestructura desde un solo lugar.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M6 16h4l3-8 4 16 3-10 2 2h4" stroke="#00FF88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Automatización",
    desc: "Respuesta activa en milisegundos: bloqueo de IPs, cuarentena de archivos y aislamiento de endpoints.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Instala el agente en 15 minutos",
    desc: "Un solo comando curl en cualquier servidor Linux, Windows o macOS. Sin reboots. Sin complejidad.",
    color: "#0070F3",
  },
  {
    step: "02",
    title: "Detección de amenazas en tiempo real",
    desc: "El motor de correlación analiza miles de eventos por segundo y prioriza los incidentes críticos.",
    color: "#00D4FF",
  },
  {
    step: "03",
    title: "Respuesta y reporte",
    desc: "Nuestro SOC LATAM actúa en minutos. Recibes informes ejecutivos en español con cada incidente.",
    color: "#00FF88",
  },
];

const OS_CARDS = [
  {
    name: "Windows",
    versions: "Server 2016+ / Win 10+",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="4" y="4" width="15" height="15" fill="#0070F3" />
        <rect x="21" y="4" width="15" height="15" fill="#0070F3" />
        <rect x="4" y="21" width="15" height="15" fill="#0070F3" />
        <rect x="21" y="21" width="15" height="15" fill="#0070F3" />
      </svg>
    ),
  },
  {
    name: "Linux",
    versions: "Debian, RHEL, Ubuntu, CentOS",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <ellipse cx="20" cy="14" rx="8" ry="10" stroke="#00FF88" strokeWidth="2" />
        <circle cx="16" cy="13" r="2" fill="#00FF88" />
        <circle cx="24" cy="13" r="2" fill="#00FF88" />
        <path d="M12 26c0-4 4-8 8-8s8 4 8 8c0 2-2 4-4 4H16c-2 0-4-2-4-4z" stroke="#00FF88" strokeWidth="2" />
        <path d="M14 30l-4 4M26 30l4 4" stroke="#00FF88" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "macOS",
    versions: "Monterey, Ventura, Sonoma",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M28 8c-2 0-4 1-5 3-1-2-3-3-5-3-4 0-7 3-7 8 0 6 5 14 12 16 7-2 12-10 12-16 0-5-3-8-7-8z" stroke="#A0A0A0" strokeWidth="2" fill="none" />
      </svg>
    ),
  },
  {
    name: "Containers",
    versions: "Docker, Kubernetes",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="4" y="16" width="8" height="8" rx="1" stroke="#00D4FF" strokeWidth="2" />
        <rect x="14" y="16" width="8" height="8" rx="1" stroke="#00D4FF" strokeWidth="2" />
        <rect x="24" y="16" width="8" height="8" rx="1" stroke="#00D4FF" strokeWidth="2" />
        <rect x="4" y="8" width="8" height="6" rx="1" stroke="#00D4FF" strokeWidth="2" />
        <rect x="14" y="8" width="8" height="6" rx="1" stroke="#00D4FF" strokeWidth="2" />
        <path d="M4 28c0 2 14 6 32 0" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

const INTEGRATIONS = [
  { name: "AWS", color: "#FFB800" },
  { name: "Azure", color: "#0070F3" },
  { name: "GCP", color: "#00FF88" },
  { name: "Slack", color: "#00D4FF" },
  { name: "Jira", color: "#0070F3" },
  { name: "PagerDuty", color: "#00FF88" },
  { name: "VirusTotal", color: "#00D4FF" },
  { name: "MISP", color: "#FF3B3B" },
];

// ================================================================
// PAGE COMPONENT
// ================================================================
export default function PlatformPage() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true });

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <NavBar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
        {/* Planisferio background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <Image
            src="/images/backgrounds/planisferio.png"
            alt=""
            fill
            className="object-cover object-center"
            style={{ opacity: 0.1, mixBlendMode: "luminosity" }}
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.3) 50%, rgba(10,10,10,0.85) 100%)",
            }}
          />
        </div>
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0070F3]/10 via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0070F3]/40 bg-[#0070F3]/10 text-[#00D4FF] text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
              Plataforma activa · 50K+ endpoints protegidos
            </span>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Una plataforma.{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(90deg,#fff 0%,#00D4FF 50%,#0070F3 100%)",
                }}
              >
                Protección total.
              </span>
            </h1>

            <p className="text-xl text-[#A0A0A0] max-w-3xl mx-auto mb-10">
              Seguridad enterprise-grade, gestionada por expertos LATAM. SIEM + EDR + XDR + Cumplimiento en un solo panel.
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-16">
              <Link
                href="/trial"
                className="px-8 py-4 bg-[#0070F3] hover:bg-[#0050D0] text-white font-semibold rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(0,112,243,0.4)]"
              >
                Comenzar prueba de 14 días
              </Link>
              <Link
                href="/demo"
                className="px-8 py-4 border border-[#2A2A2A] hover:border-[#0070F3]/60 text-[#A0A0A0] hover:text-white font-semibold rounded-lg transition-all duration-200"
              >
                Ver Demo
              </Link>
            </div>
          </motion.div>

          {/* Dashboard screenshot — producto real */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="relative mx-auto max-w-5xl"
          >
            {/* Outer glow border */}
            <div
              className="absolute -inset-[1px] rounded-2xl pointer-events-none"
              style={{
                background: "linear-gradient(135deg, rgba(0,112,243,0.7) 0%, rgba(0,212,255,0.5) 50%, rgba(0,255,136,0.25) 100%)",
              }}
            />
            <Image
              src="/images/screenshots/dashboard.png"
              alt="Panel de Seguridad qatech360 — SIEM, EDR y XDR unificados en un solo dashboard"
              width={1200}
              height={740}
              className="relative rounded-2xl w-full h-auto"
              style={{
                boxShadow: "0 0 100px rgba(0,112,243,0.5), 0 0 200px rgba(0,212,255,0.15), 0 60px 120px rgba(0,0,0,0.7)",
              }}
              priority
            />
            {/* Fade bottom */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent pointer-events-none" />
            {/* LIVE badge */}
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-[#111]/85 backdrop-blur-md px-3 py-2 rounded-full border border-[#00FF88]/30 shadow-[0_0_16px_rgba(0,255,136,0.25)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF88] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00FF88]" />
              </span>
              <span className="text-[#00FF88] text-xs font-mono font-bold tracking-wider">EN VIVO</span>
            </div>
            {/* Stat pill overlays */}
            <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-[#111]/85 backdrop-blur-md px-4 py-2 rounded-xl border border-[#0070F3]/30">
              <span className="text-[#0070F3] font-bold text-lg">840</span>
              <span className="text-[#A0A0A0] text-xs">Agentes activos</span>
            </div>
            <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-[#111]/85 backdrop-blur-md px-4 py-2 rounded-xl border border-[#FF3B3B]/30">
              <span className="text-[#FF3B3B] font-bold text-lg">1.2M+</span>
              <span className="text-[#A0A0A0] text-xs">Amenazas bloqueadas</span>
            </div>
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-[#0070F3]/70 rounded-tl-2xl pointer-events-none" />
            <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-[#0070F3]/70 rounded-tr-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-[#00D4FF]/50 rounded-bl-2xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-[#00D4FF]/50 rounded-br-2xl pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────── */}
      <section ref={statsRef} className="py-16 border-y border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-bold text-[#0070F3] mb-2">{stat.value}</p>
                <p className="text-[#A0A0A0] text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ARCHITECTURE DIAGRAM ───────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Arquitectura de la Plataforma</h2>
            <p className="text-[#A0A0A0] max-w-2xl mx-auto">
              Flujo de datos end-to-end: desde tus fuentes hasta alertas procesables en segundos.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-8 overflow-x-auto"
          >
            <svg viewBox="0 0 800 200" fill="none" className="w-full min-w-[600px]">
              {/* Stages */}
              {[
                { x: 30, label: "Fuentes de Datos", sub: "Servers·Endpoints·Cloud", color: "#666" },
                { x: 180, label: "Agentes qatech360", sub: "Recolección y envío", color: "#0070F3" },
                { x: 340, label: "Motor qatech360", sub: "Correlación y análisis", color: "#00D4FF" },
                { x: 500, label: "OpenSearch", sub: "Indexación y búsqueda", color: "#FFB800" },
                { x: 660, label: "qatech360 Dashboard", sub: "Visibilidad unificada", color: "#00FF88" },
              ].map((stage, i) => (
                <g key={i}>
                  <rect x={stage.x} y="60" width="120" height="70" rx="8" fill="#1A1A1A" stroke={stage.color} strokeWidth="1.5" />
                  <text x={stage.x + 60} y="92" textAnchor="middle" fill="white" fontSize="10" fontWeight="700">{stage.label}</text>
                  <text x={stage.x + 60} y="110" textAnchor="middle" fill="#666" fontSize="8">{stage.sub}</text>
                  {i < 4 && (
                    <path
                      d={`M${stage.x + 124} 95 L${stage.x + 174} 95`}
                      stroke={stage.color}
                      strokeWidth="2"
                      markerEnd="url(#arrow)"
                    />
                  )}
                </g>
              ))}

              {/* Output nodes */}
              {[
                { x: 660, y: 155, label: "Alertas", color: "#FF3B3B" },
                { x: 720, y: 155, label: "Reportes", color: "#00FF88" },
                { x: 780, y: 155, label: "SOAR", color: "#00D4FF" },
              ].map((out, i) => (
                <g key={i}>
                  <rect x={out.x - 25} y={out.y} width="50" height="22" rx="4" fill={out.color + "22"} stroke={out.color} strokeWidth="1" />
                  <text x={out.x} y={out.y + 14} textAnchor="middle" fill={out.color} fontSize="8" fontWeight="600">{out.label}</text>
                </g>
              ))}

              <defs>
                <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" fill="#444" />
                </marker>
              </defs>
            </svg>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURE PILLARS ────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Seis pilares de seguridad</h2>
            <p className="text-[#A0A0A0]">Todo lo que necesitas, en una sola plataforma gestionada.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURE_PILLARS.map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-6 hover:border-[#0070F3]/40 transition-all duration-300"
              >
                <div className="mb-4">{pillar.icon}</div>
                <h3 className="text-xl font-bold mb-2">{pillar.title}</h3>
                <p className="text-[#A0A0A0] text-sm leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Cómo funciona</h2>
            <p className="text-[#A0A0A0]">De cero a protección completa en tres pasos.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative"
              >
                <div
                  className="text-7xl font-black mb-4 opacity-10"
                  style={{ color: step.color }}
                >
                  {step.step}
                </div>
                <div
                  className="w-1 h-12 mb-4 rounded-full"
                  style={{ background: step.color }}
                />
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-[#A0A0A0] text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AGENT INSTALL CODE ─────────────────────────────────── */}
      <section className="py-16 px-6 bg-[#0D0D0D]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold mb-3">Instalación en un comando</h2>
            <p className="text-[#A0A0A0]">Compatible con todos los sistemas operativos Linux en producción.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl overflow-hidden"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#2A2A2A] bg-[#111111]">
              <span className="w-3 h-3 rounded-full bg-[#FF3B3B]" />
              <span className="w-3 h-3 rounded-full bg-[#FFB800]" />
              <span className="w-3 h-3 rounded-full bg-[#00FF88]" />
              <span className="ml-3 text-[#666] text-xs font-mono">bash</span>
            </div>
            <pre className="p-6 text-sm font-mono overflow-x-auto">
              <code>
                <span className="text-[#666]"># Instalación del agente qatech360</span>{"\n"}
                <span className="text-[#00FF88]">curl</span>
                <span className="text-white"> -so qatech360-agent.sh \</span>{"\n"}
                <span className="text-[#A0A0A0]">  https://install.qatech360.com/agent.sh</span>{"\n\n"}
                <span className="text-[#666]"># Ejecutar con tu token de organización</span>{"\n"}
                <span className="text-[#00FF88]">sudo</span>
                <span className="text-white"> bash qatech360-agent.sh \</span>{"\n"}
                <span className="text-[#A0A0A0]">  --token </span>
                <span className="text-[#FFB800]">{"<TU_TOKEN_AQUI>"}</span>
                <span className="text-white"> \</span>{"\n"}
                <span className="text-[#A0A0A0]">  --manager manager.qatech360.com \</span>{"\n"}
                <span className="text-[#A0A0A0]">  --group production</span>{"\n\n"}
                <span className="text-[#666]"># Verificar estado del agente</span>{"\n"}
                <span className="text-[#00FF88]">systemctl</span>
                <span className="text-white"> status qatech360-agent</span>
              </code>
            </pre>
          </motion.div>

          <p className="text-center text-[#666] text-sm mt-4">
            Tiempo promedio de instalación: <span className="text-[#00FF88] font-semibold">12 minutos</span>
          </p>
        </div>
      </section>

      {/* ── INTEGRATIONS ──────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-3">Integraciones nativas</h2>
            <p className="text-[#A0A0A0]">Conecta con tu stack existente sin fricción.</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {INTEGRATIONS.map((int, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="px-6 py-3 bg-[#111111] border border-[#2A2A2A] rounded-full text-sm font-medium hover:border-[#0070F3]/50 transition-all duration-200"
                style={{ color: int.color }}
              >
                {int.name}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUPPORTED OS ──────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-3">Compatible con cualquier entorno</h2>
            <p className="text-[#A0A0A0]">Un agente ligero para todos tus sistemas.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {OS_CARDS.map((os, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-6 text-center hover:border-[#0070F3]/40 transition-all duration-300"
              >
                <div className="flex justify-center mb-4">{os.icon}</div>
                <h3 className="font-bold mb-1">{os.name}</h3>
                <p className="text-[#666] text-xs">{os.versions}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPEN SOURCE SECTION ────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00FF88]/40 bg-[#00FF88]/10 text-[#00FF88] text-sm font-medium mb-6">
              Transparencia Open Source
            </span>
            <h2 className="text-4xl font-bold mb-6">Tecnología Transparente</h2>
            <p className="text-[#A0A0A0] text-lg leading-relaxed mb-8">
              Nuestra plataforma utiliza tecnología de código abierto de nivel empresarial, el enfoque SIEM/XDR más auditado del mundo.
              Tus equipos de seguridad pueden revisar exactamente qué corre en tu infraestructura.
              Sin cajas negras. Sin dependencia de un proveedor único.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              {[
                { title: "Auditable", desc: "El núcleo de nuestra plataforma es de código abierto. Tus auditores pueden verificarlo." },
                { title: "Sin lock-in", desc: "Si decides migrar, tus datos y configuraciones son portables. Tu infraestructura, tus reglas." },
                { title: "Comunidad activa", desc: "Más de 10 millones de descargas. Vulnerabilidades corregidas en horas, no semanas." },
              ].map((item, i) => (
                <div key={i} className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5">
                  <h3 className="font-bold text-[#00FF88] mb-2">{item.title}</h3>
                  <p className="text-[#A0A0A0] text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#0070F3]/20 via-[#0A0A0A] to-[#00D4FF]/10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">¿Listo para proteger tu empresa?</h2>
            <p className="text-[#A0A0A0] text-lg mb-8">
              Comienza tu prueba de 14 días sin tarjeta de crédito. Onboarding en 15 minutos.
            </p>
            <Link
              href="/trial"
              className="inline-block px-10 py-4 bg-[#0070F3] hover:bg-[#0050D0] text-white font-bold text-lg rounded-lg transition-all duration-200 shadow-[0_0_40px_rgba(0,112,243,0.4)]"
            >
              Comenzar prueba de 14 días →
            </Link>
            <p className="text-[#666] text-sm mt-4">Sin tarjeta de crédito · Sin contratos · Cancela cuando quieras</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
