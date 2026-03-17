"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const challenges = [
  {
    title: "Miles de endpoints distribuidos",
    desc: "Gestión centralizada de 1,000 a 100,000+ endpoints en múltiples oficinas, países y nubes. Un solo dashboard con visibilidad completa.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <circle cx="20" cy="20" r="4" stroke="#0070F3" strokeWidth="1.5" />
        <circle cx="8" cy="8" r="3" stroke="#0070F3" strokeWidth="1.5" />
        <circle cx="32" cy="8" r="3" stroke="#0070F3" strokeWidth="1.5" />
        <circle cx="8" cy="32" r="3" stroke="#0070F3" strokeWidth="1.5" />
        <circle cx="32" cy="32" r="3" stroke="#0070F3" strokeWidth="1.5" />
        <path d="M11 11l6 6M29 11l-6 6M11 29l6-6M29 29l-6-6" stroke="#0070F3" strokeWidth="1" strokeDasharray="2 2" />
      </svg>
    ),
    color: "#0070F3",
  },
  {
    title: "Entornos multi-nube complejos",
    desc: "AWS, Azure, GCP y nubes privadas operando en simultáneo. Visibilidad unificada con correlación cross-cloud y detección de amenazas entre plataformas.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <path d="M8 22a5 5 0 010-10h2a7 7 0 0114 0h2a5 5 0 010 10" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 22v8M20 22v8M26 22v8" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 30h20" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    color: "#00D4FF",
  },
  {
    title: "Cumplimiento normativo múltiple",
    desc: "PCI-DSS, ISO 27001, SOC2, HIPAA, GDPR, NOM-151 y LGPD simultáneamente. Mapeo automático de controles y evidencias para cada marco regulatorio.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <path d="M20 4l12 5v10c0 8-6 14-12 17C14 33 8 27 8 19V9l12-5z" stroke="#00FF88" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M14 20l4 4 8-8" stroke="#00FF88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: "#00FF88",
  },
  {
    title: "Múltiples equipos y subsidiarias",
    desc: "Estructura multi-tenant para gestionar filiales, unidades de negocio y equipos con aislamiento de datos pero visibilidad consolidada para el equipo de seguridad central.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <rect x="14" y="4" width="12" height="8" rx="2" stroke="#FFB800" strokeWidth="1.5" />
        <rect x="4" y="28" width="10" height="8" rx="2" stroke="#FFB800" strokeWidth="1.5" />
        <rect x="16" y="28" width="10" height="8" rx="2" stroke="#FFB800" strokeWidth="1.5" />
        <rect x="28" y="28" width="10" height="8" rx="2" stroke="#FFB800" strokeWidth="1.5" />
        <path d="M20 12v8M20 20H9v8M20 20h14v8" stroke="#FFB800" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    color: "#FFB800",
  },
];

const enterpriseFeatures = [
  { feature: "Endpoints", value: "Ilimitados", icon: "∞" },
  { feature: "SOC dedicado LATAM", value: "Equipo nombrado", icon: "👥" },
  { feature: "Container Security", value: "Docker + K8s", icon: "🐳" },
  { feature: "IR Retainer", value: "Incluido", icon: "🚨" },
  { feature: "Multi-tenant", value: "Subsidiarias ilimitadas", icon: "🏢" },
  { feature: "Retención de logs", value: "1 año (configurable)", icon: "📦" },
  { feature: "SLA P1", value: "< 15 minutos", icon: "⚡" },
  { feature: "QBRs ejecutivos", value: "Trimestral", icon: "📊" },
  { feature: "API Access", value: "SIEM/SOAR completo", icon: "🔌" },
  { feature: "Onboarding", value: "White-glove presencial", icon: "🤝" },
  { feature: "Cumplimiento custom", value: "NOM-151, LGPD, más", icon: "📋" },
  { feature: "Despliegue", value: "Cloud / On-prem / Híbrido", icon: "🌐" },
];

const integrations = [
  { name: "Okta", cat: "SSO / Identidad", color: "#007DC1" },
  { name: "Entra ID", cat: "SSO / Identidad", color: "#0078D4" },
  { name: "ServiceNow", cat: "ITSM", color: "#00C853" },
  { name: "Jira", cat: "ITSM", color: "#0052CC" },
  { name: "Splunk", cat: "SIEM externo", color: "#FF6900" },
  { name: "PagerDuty", cat: "SOAR / Alertas", color: "#06AC38" },
  { name: "Slack", cat: "Comunicación", color: "#4A154B" },
  { name: "Teams", cat: "Comunicación", color: "#5059C9" },
];

export default function EnterprisePage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <NavBar />

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.02%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />
        <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] rounded-full bg-[#0070F3] opacity-[0.07] blur-[130px] pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111111] border border-[#2A2A2A] text-sm text-[#FFB800] mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#FFB800] animate-pulse" />
            Plan Empresarial
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          >
            Seguridad{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0070F3] to-[#00D4FF]">
              Enterprise
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-[#A0A0A0] max-w-3xl mx-auto mb-10"
          >
            Para organizaciones con entornos complejos, multi-nube y requisitos estrictos. Endpoints ilimitados, SOC LATAM dedicado y SLA P1 de menos de 15 minutos.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/contact"
              className="px-8 py-4 bg-[#0070F3] hover:bg-[#0050D0] text-white font-semibold rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(0,112,243,0.4)] hover:shadow-[0_0_40px_rgba(0,112,243,0.6)]"
            >
              Hablar con un ejecutivo de ventas
            </Link>
            <Link
              href="/demo"
              className="px-8 py-4 border border-[#2A2A2A] hover:border-[#0070F3]/40 text-[#A0A0A0] hover:text-white font-semibold rounded-lg transition-all duration-200"
            >
              Solicitar demo
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Challenges */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Diseñado para la complejidad enterprise</h2>
            <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
              Las organizaciones grandes enfrentan desafíos de seguridad únicos. Los resolvemos todos desde una sola plataforma.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {challenges.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#111111] border border-[#2A2A2A] hover:border-[#0070F3]/30 rounded-xl p-6 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-[#1A1A1A] flex-shrink-0">{c.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: c.color }}>{c.title}</h3>
                    <p className="text-[#A0A0A0] text-sm leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-24 px-6 bg-[#111111]/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Todo incluido en el plan Empresarial</h2>
            <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
              Sin límites, sin sorpresas en la factura. Precio personalizado según tu organización.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {enterpriseFeatures.map((f, i) => (
              <motion.div
                key={f.feature}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 flex items-center gap-4"
              >
                <div className="text-2xl flex-shrink-0">{f.icon}</div>
                <div>
                  <div className="text-[#A0A0A0] text-xs">{f.feature}</div>
                  <div className="font-semibold text-[#0070F3]">{f.value}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dedicated SOC */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Tu equipo SOC{" "}
                <span className="text-[#00FF88]">dedicado</span>
              </h2>
              <p className="text-[#A0A0A0] mb-8 leading-relaxed">
                No eres un número de ticket. Con el plan Enterprise, tienes analistas LATAM asignados exclusivamente a tu organización. Los conoces por nombre, ellos conocen tu infraestructura.
              </p>
              <ul className="space-y-4">
                {[
                  "Equipo de 2-4 analistas nombrados asignados a tu cuenta",
                  "Reunión mensual de revisión de seguridad con tu CTO/CISO",
                  "Canal de comunicación directo (Slack, Teams o email dedicado)",
                  "Escalación directa sin pasar por tiers de soporte general",
                  "Cobertura 24/7/365 con handoffs documentados",
                  "Informes ejecutivos personalizados para tu junta directiva",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#A0A0A0]">
                    <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 flex-shrink-0 mt-0.5">
                      <circle cx="10" cy="10" r="9" stroke="#00FF88" strokeWidth="1.5" />
                      <path d="M6.5 10l2.5 2.5 5-5" stroke="#00FF88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-8"
            >
              <h3 className="font-semibold text-[#A0A0A0] text-sm mb-6">Tu equipo SOC asignado</h3>
              {[
                { name: "Carlos Mendoza", role: "Lead Analyst — LATAM", location: "Ciudad de México", status: "En turno", color: "#00FF88" },
                { name: "Ana Rodríguez", role: "Threat Hunter", location: "Bogotá", status: "En turno", color: "#00FF88" },
                { name: "Bruno Ferreira", role: "Incident Responder", location: "São Paulo", status: "Disponible", color: "#00D4FF" },
                { name: "Valeria Torres", role: "Compliance Analyst", location: "Buenos Aires", status: "Turno noche", color: "#FFB800" },
              ].map((analyst) => (
                <div key={analyst.name} className="flex items-center gap-4 py-3 border-b border-[#2A2A2A] last:border-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0070F3] to-[#00D4FF] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {analyst.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{analyst.name}</div>
                    <div className="text-[#666666] text-xs">{analyst.role} — {analyst.location}</div>
                  </div>
                  <div
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ color: analyst.color, backgroundColor: `${analyst.color}15`, border: `1px solid ${analyst.color}30` }}
                  >
                    {analyst.status}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-24 px-6 bg-[#111111]/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Integraciones enterprise</h2>
            <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
              Se integra con el stack tecnológico que ya tienes. SSO, ITSM, SIEM externo, SOAR y más.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {integrations.map((intg, i) => (
              <motion.div
                key={intg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 flex items-center gap-4"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ backgroundColor: intg.color }}
                >
                  {intg.name[0]}
                </div>
                <div>
                  <div className="font-medium text-sm">{intg.name}</div>
                  <div className="text-[#666666] text-xs">{intg.cat}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case study */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-[#111111] to-[#1A1A1A] border border-[#0070F3]/20 rounded-2xl p-10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="px-3 py-1 bg-[#0070F3]/10 border border-[#0070F3]/20 rounded-full text-[#0070F3] text-xs font-semibold">
                Caso de éxito
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4">
              Manufacturera argentina de 500 empleados — desplegado en 72 horas
            </h3>
            <p className="text-[#A0A0A0] mb-8 leading-relaxed">
              Una empresa manufacturera en Rosario con plantas en Argentina, Chile y Brasil necesitaba protección para 850 endpoints en tres países, cumplimiento LGPD para sus operaciones en Brasil y visibilidad unificada para su CISO. El proceso completo de onboarding, incluyendo la integración con su Active Directory on-premise y la configuración de alertas personalizadas para su entorno OT/IT, tomó menos de 72 horas.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { label: "Tiempo de despliegue", value: "72 horas", color: "#00FF88" },
                { label: "Endpoints protegidos", value: "850+", color: "#0070F3" },
                { label: "Reducción de MTTR", value: "87%", color: "#00D4FF" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}</div>
                  <div className="text-[#A0A0A0] text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-[#111111]/50">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Habla con nuestro equipo enterprise
            </h2>
            <p className="text-[#A0A0A0] text-lg mb-10">
              Precio personalizado según tu organización. Sin contratos trampa. Cancela cuando quieras.
            </p>
            <Link
              href="/contact"
              className="inline-block px-10 py-4 bg-[#0070F3] hover:bg-[#0050D0] text-white font-semibold rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(0,112,243,0.4)] hover:shadow-[0_0_40px_rgba(0,112,243,0.6)] text-lg"
            >
              Hablar con un ejecutivo de ventas
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
