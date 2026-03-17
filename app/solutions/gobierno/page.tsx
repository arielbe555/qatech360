"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const threats = [
  {
    title: "APTs de Estado-Nación",
    desc: "Grupos patrocinados por estados extranjeros atacan infraestructura crítica gubernamental con técnicas de intrusión persistente. Mapeamos tácticas con MITRE ATT&CK y detectamos movimiento lateral en redes clasificadas.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <circle cx="20" cy="20" r="14" stroke="#FF3B3B" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="8" stroke="#FF3B3B" strokeWidth="1" strokeDasharray="2 2" />
        <path d="M20 6v28M6 20h28" stroke="#FF3B3B" strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="20" cy="20" r="3" fill="#FF3B3B" fillOpacity="0.4" />
      </svg>
    ),
    color: "#FF3B3B",
  },
  {
    title: "Ransomware en servicios públicos",
    desc: "Ataques de ransomware que paralizan servicios de trámites ciudadanos, registros civiles y sistemas de recaudación. Detección temprana y respuesta automatizada antes de que el cifrado avance.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <rect x="10" y="18" width="20" height="16" rx="2" stroke="#FFB800" strokeWidth="1.5" />
        <path d="M14 18v-4a6 6 0 0112 0v4" stroke="#FFB800" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="20" cy="26" r="2" fill="#FFB800" />
        <path d="M20 28v3" stroke="#FFB800" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    color: "#FFB800",
  },
  {
    title: "Robo de datos ciudadanos",
    desc: "Bases de datos con información de millones de ciudadanos — RFC, CURP, datos fiscales, registros electorales — son objetivos de alta prioridad. Monitoreo de accesos y alertas ante exfiltración masiva.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <ellipse cx="20" cy="14" rx="12" ry="6" stroke="#0070F3" strokeWidth="1.5" />
        <path d="M8 14v6c0 3.314 5.373 6 12 6s12-2.686 12-6v-6" stroke="#0070F3" strokeWidth="1.5" />
        <path d="M8 20v6c0 3.314 5.373 6 12 6s12-2.686 12-6v-6" stroke="#0070F3" strokeWidth="1.5" />
        <path d="M28 28l6-6M30 28l4-4" stroke="#FF3B3B" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    color: "#0070F3",
  },
  {
    title: "Ataques a infraestructura crítica",
    desc: "Redes eléctricas, sistemas de agua, transporte y telecomunicaciones gubernamentales son objetivos de ataques ciberfísicos. Detección de anomalías en sistemas OT/ICS integrada con nuestra plataforma.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <path d="M20 4l4 8h8l-6.5 6 2.5 8L20 22l-8 4 2.5-8L8 12h8l4-8z" stroke="#00D4FF" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="20" cy="20" r="3" fill="#00D4FF" fillOpacity="0.3" stroke="#00D4FF" strokeWidth="1" />
      </svg>
    ),
    color: "#00D4FF",
  },
];

const compliances = [
  {
    name: "NOM-151",
    region: "México",
    desc: "Norma Oficial Mexicana para conservación de mensajes de datos y digitalización de documentos. Cadena de custodia digital para auditorías gubernamentales.",
    color: "#00FF88",
  },
  {
    name: "Ley 1712",
    region: "Colombia",
    desc: "Ley de Transparencia y del Derecho de Acceso a la Información Pública. Trazabilidad de accesos a información oficial y reportes de incidentes.",
    color: "#0070F3",
  },
  {
    name: "LGPD — Setor Público",
    region: "Brasil",
    desc: "Ley General de Protección de Datos aplicada al sector público. Protección de datos de ciudadanos y reporte obligatorio de incidentes a la ANPD.",
    color: "#00D4FF",
  },
  {
    name: "Decreto 2364",
    region: "Colombia",
    desc: "Regulación de firma electrónica para entidades públicas. Integridad de documentos digitales y cadena de evidencia cibernética.",
    color: "#FFB800",
  },
];

const sovereigntyOptions = [
  {
    title: "Cloud LATAM Region",
    desc: "Infraestructura en regiones cloud de São Paulo (gru1), Ciudad de México y Bogotá. Los datos nunca salen del país.",
    badge: "Más común",
    badgeColor: "#00FF88",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <path d="M10 24a6 6 0 010-12h2a8 8 0 0116 0h2a6 6 0 010 12" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M15 32v-8M20 32v-8M25 32v-8" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 32h16" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "On-Premise",
    desc: "Despliegue completo dentro de los datacenter propios de la entidad. Control total sobre la infraestructura, actualizaciones y datos.",
    badge: "Máxima soberanía",
    badgeColor: "#0070F3",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <rect x="6" y="10" width="28" height="20" rx="2" stroke="#0070F3" strokeWidth="1.5" />
        <path d="M6 18h28" stroke="#0070F3" strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="12" cy="14" r="2" fill="#0070F3" fillOpacity="0.4" />
        <circle cx="12" cy="25" r="2" fill="#00FF88" fillOpacity="0.8" />
        <path d="M16 25h12" stroke="#0070F3" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Híbrido",
    desc: "Telemetría procesada on-premise, dashboards y reportes en cloud regional privada. Balance entre rendimiento y soberanía.",
    badge: "Flexible",
    badgeColor: "#FFB800",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <rect x="4" y="16" width="14" height="12" rx="2" stroke="#FFB800" strokeWidth="1.5" />
        <path d="M22 10a8 8 0 018 8v4h2a4 4 0 010 8H22" stroke="#FFB800" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 22h4" stroke="#FFB800" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M20 20v4" stroke="#FFB800" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

const certifications = [
  { name: "ISO 27001", desc: "Sistema de gestión de seguridad de la información" },
  { name: "SOC 2 Type II", desc: "Controles de seguridad, disponibilidad y confidencialidad" },
  { name: "PCI-DSS 4.0", desc: "Para entidades que procesan pagos de ciudadanos" },
  { name: "NIST CSF 2.0", desc: "Framework de ciberseguridad del NIST aplicado al sector gobierno" },
  { name: "MITRE ATT&CK", desc: "Mapeo completo de tácticas y técnicas adversarias" },
  { name: "CIS Controls v8", desc: "18 controles críticos implementados y verificados" },
];

export default function GobiernoPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <NavBar />

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.02%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full bg-[#0070F3] opacity-[0.06] blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111111] border border-[#2A2A2A] text-sm text-[#0070F3] mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#0070F3] animate-pulse" />
            Sector Gobierno — Solución especializada
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          >
            Seguridad para el{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0070F3] to-[#00D4FF]">
              Sector Gobierno
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-[#A0A0A0] max-w-3xl mx-auto mb-10"
          >
            Soberanía de datos. Cumplimiento NOM-151. Protección APT. La plataforma de ciberseguridad diseñada para entidades públicas en México, Colombia, Brasil y toda LATAM.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/demo"
              className="px-8 py-4 bg-[#0070F3] hover:bg-[#0050D0] text-white font-semibold rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(0,112,243,0.4)] hover:shadow-[0_0_40px_rgba(0,112,243,0.6)]"
            >
              Agenda reunión con nuestro equipo
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 border border-[#2A2A2A] hover:border-[#0070F3]/40 text-[#A0A0A0] hover:text-white font-semibold rounded-lg transition-all duration-200"
            >
              Ver plan Empresarial
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Threats */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Amenazas al sector gubernamental</h2>
            <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
              Las entidades públicas enfrentan adversarios sofisticados con motivaciones políticas, económicas y de espionaje.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {threats.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#111111] border border-[#2A2A2A] hover:border-[#0070F3]/30 rounded-xl p-6 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-[#1A1A1A] flex-shrink-0">{t.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: t.color }}>{t.title}</h3>
                    <p className="text-[#A0A0A0] text-sm leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-24 px-6 bg-[#111111]/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Marco normativo gubernamental LATAM</h2>
            <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
              Cumplimiento automatizado para las principales regulaciones de datos en el sector público latinoamericano.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {compliances.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-6"
              >
                <div
                  className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 border"
                  style={{ color: c.color, borderColor: `${c.color}30`, backgroundColor: `${c.color}10` }}
                >
                  {c.name}
                </div>
                <p className="text-[#00D4FF] text-xs mb-3 font-medium">{c.region}</p>
                <p className="text-[#A0A0A0] text-sm leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Sovereignty */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Soberanía de datos —{" "}
              <span className="text-[#00FF88]">sin compromisos</span>
            </h2>
            <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
              Opciones de despliegue diseñadas para los requisitos de soberanía digital de entidades gubernamentales. Los datos de ciudadanos nunca salen del país.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {sovereigntyOptions.map((opt, i) => (
              <motion.div
                key={opt.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-8 text-center"
              >
                <div className="flex justify-center mb-5 p-4 rounded-xl bg-[#1A1A1A] w-fit mx-auto">
                  {opt.icon}
                </div>
                <div
                  className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 border"
                  style={{ color: opt.badgeColor, borderColor: `${opt.badgeColor}30`, backgroundColor: `${opt.badgeColor}10` }}
                >
                  {opt.badge}
                </div>
                <h3 className="text-xl font-bold mb-3">{opt.title}</h3>
                <p className="text-[#A0A0A0] text-sm leading-relaxed">{opt.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Everything in Spanish */}
      <section className="py-24 px-6 bg-[#111111]/50">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Todo en español.{" "}
                <span className="text-[#00D4FF]">Sin excepciones.</span>
              </h2>
              <p className="text-[#A0A0A0] mb-8 leading-relaxed">
                Las entidades gubernamentales no pueden depender de plataformas en inglés para tomar decisiones críticas. Cada alerta, reporte e instrucción llega en español claro.
              </p>
              <ul className="space-y-3">
                {[
                  "Alertas y notificaciones en español en tiempo real",
                  "Informes ejecutivos en PDF listos para presidencia o directivos",
                  "Comunicaciones de incidente completamente en español",
                  "Documentación técnica y playbooks en español",
                  "Soporte telefónico y por chat en tu zona horaria LATAM",
                  "Resúmenes para auditorías en formato requerido por la institución",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#A0A0A0]">
                    <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 flex-shrink-0 mt-0.5">
                      <circle cx="10" cy="10" r="9" stroke="#00D4FF" strokeWidth="1.5" />
                      <path d="M6.5 10l2.5 2.5 5-5" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
              className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-6 font-mono text-sm"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#FF3B3B]" />
                <span className="text-[#666666] text-xs">Alerta P1 — Movimiento Lateral Detectado</span>
              </div>
              <div className="space-y-2 text-xs">
                <p className="text-[#FF3B3B] font-semibold">ALERTA CRÍTICA — 14:32:07 GMT-6</p>
                <p className="text-[#A0A0A0]">Nivel: <span className="text-[#FF3B3B]">P1 — Respuesta inmediata</span></p>
                <p className="text-[#A0A0A0]">Servidor: <span className="text-white">srv-hacienda-01.gob.mx</span></p>
                <p className="text-[#A0A0A0]">Técnica: <span className="text-[#FFB800]">Movimiento lateral (T1021.002)</span></p>
                <p className="text-[#A0A0A0]">Marco: <span className="text-[#00D4FF]">MITRE ATT&CK — Lateral Movement</span></p>
                <div className="border-t border-[#2A2A2A] pt-3 mt-3">
                  <p className="text-[#00FF88] font-semibold">Acción recomendada:</p>
                  <p className="text-[#A0A0A0] mt-1">Aislar servidor de la red interna y notificar al CERT gubernamental. El analista Carlos M. del SOC LATAM está en línea.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Certificaciones y marcos que soportamos</h2>
            <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
              La plataforma está alineada con los principales estándares internacionales de seguridad para el sector público.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-6 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0070F3] to-[#00D4FF] flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                    <path d="M9 12l2 2 4-4M12 3l1.09 3.26L16 7.27l-2.91.23L12 11l-1.09-3.5L8 7.27l2.91-.01L12 3z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-[#0070F3]">{cert.name}</div>
                  <div className="text-[#A0A0A0] text-sm">{cert.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
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
              Protege la infraestructura pública de tu país
            </h2>
            <p className="text-[#A0A0A0] text-lg mb-10">
              Habla con nuestro equipo especializado en seguridad gubernamental. Sin compromiso, en español, en tu zona horaria.
            </p>
            <Link
              href="/demo"
              className="inline-block px-10 py-4 bg-[#0070F3] hover:bg-[#0050D0] text-white font-semibold rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(0,112,243,0.4)] hover:shadow-[0_0_40px_rgba(0,112,243,0.6)] text-lg"
            >
              Agenda reunión con nuestro equipo
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
