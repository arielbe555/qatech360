"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const threats = [
  {
    title: "Ransomware en dispositivos médicos",
    desc: "Los equipos de imagen, monitores y sistemas de infusión corren software antiguo sin parches. Detectamos comportamiento anómalo y aislamos el dispositivo antes de que el ransomware se propague a la red clínica.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <rect x="6" y="8" width="28" height="20" rx="2" stroke="#FF3B3B" strokeWidth="1.5" />
        <path d="M14 28v4M26 28v4M10 32h20" stroke="#FF3B3B" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16 18l2 2 4-4" stroke="#FF3B3B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="30" cy="12" r="5" fill="#FF3B3B" fillOpacity="0.2" stroke="#FF3B3B" strokeWidth="1.5" />
        <path d="M30 10v2.5l1.5 1.5" stroke="#FF3B3B" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    color: "#FF3B3B",
  },
  {
    title: "Robo de expedientes clínicos",
    desc: "Los EHR/HIS contienen datos de alto valor en el mercado negro. Monitoreamos accesos a bases de datos, exportaciones masivas y transferencias anómalas de archivos DICOM o PDFs de expedientes.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <path d="M12 6h16l6 6v22H6V6h6z" stroke="#FFB800" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M28 6v6h6" stroke="#FFB800" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M14 18h12M14 23h8" stroke="#FFB800" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="28" cy="30" r="5" fill="#FFB800" fillOpacity="0.15" stroke="#FFB800" strokeWidth="1.5" />
        <path d="M26 30l1.5 1.5 3-3" stroke="#FFB800" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: "#FFB800",
  },
  {
    title: "Acceso interno no autorizado",
    desc: "El personal clínico con acceso legítimo puede consultar expedientes de pacientes fuera de su área. Detectamos accesos fuera de horario, consultas masivas y violaciones de privilegio mínimo.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <circle cx="20" cy="14" r="7" stroke="#0070F3" strokeWidth="1.5" />
        <path d="M6 36c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke="#0070F3" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M28 22l6 6M34 22l-6 6" stroke="#FF3B3B" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    color: "#0070F3",
  },
  {
    title: "Vulnerabilidades IoMT",
    desc: "Marcapasos, bombas de infusión y monitores conectados en red tienen interfaces expuestas. Escaneamos continuamente estos dispositivos, detectamos accesos no autorizados y reportamos CVEs aplicables.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <rect x="8" y="14" width="24" height="16" rx="2" stroke="#00D4FF" strokeWidth="1.5" />
        <path d="M12 22h4l2-4 3 8 2-5 2 3h3" stroke="#00FF88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="32" cy="10" r="3" fill="#FF3B3B" fillOpacity="0.2" stroke="#FF3B3B" strokeWidth="1.5" />
        <path d="M31 9.5l2 1M31 10.5l2-1" stroke="#FF3B3B" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
    color: "#00D4FF",
  },
];

const compliances = [
  {
    name: "HIPAA §164.312",
    region: "Estados Unidos / Global",
    desc: "Technical Safeguards para PHI electrónico. Cubrimos controles de acceso, auditoría, integridad y transmisión segura de registros de salud.",
    color: "#0070F3",
  },
  {
    name: "NOM-024-SSA3",
    region: "México",
    desc: "Norma Oficial Mexicana para sistemas de información de registro electrónico para la salud. Cumplimiento de confidencialidad y trazabilidad de expedientes.",
    color: "#00FF88",
  },
  {
    name: "LGPD — Dados de Saúde",
    region: "Brasil",
    desc: "Lei Geral de Proteção de Dados con tratamiento especial para datos sensibles de salud. Cobertura completa de bases legales, consentimiento y reporte de incidentes.",
    color: "#00D4FF",
  },
  {
    name: "Resolución 839",
    region: "Colombia",
    desc: "Marco de interoperabilidad e historia clínica electrónica del Ministerio de Salud. Trazabilidad de accesos y auditoría de modificaciones de registros clínicos.",
    color: "#FFB800",
  },
];

const assets = [
  {
    title: "EHR / HIS",
    desc: "Historia clínica electrónica y sistemas de información hospitalaria. Monitoreo de accesos, exportaciones y modificaciones no autorizadas.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <rect x="6" y="4" width="22" height="28" rx="2" stroke="#00D4FF" strokeWidth="1.5" />
        <path d="M10 12h14M10 17h14M10 22h8" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M24 26l4 4 8-8" stroke="#00FF88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "PACS / DICOM",
    desc: "Archivos de imagen médica: radiografías, tomografías, resonancias. Detectamos accesos no autorizados y exfiltración de estudios de imagen.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <rect x="4" y="8" width="32" height="26" rx="2" stroke="#0070F3" strokeWidth="1.5" />
        <circle cx="20" cy="21" r="7" stroke="#0070F3" strokeWidth="1.5" />
        <circle cx="20" cy="21" r="3" fill="#0070F3" fillOpacity="0.3" stroke="#0070F3" strokeWidth="1" />
        <path d="M8 8V6M32 8V6" stroke="#0070F3" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Sistema de Farmacia",
    desc: "Órdenes de medicamentos, inventarios y dispensación automatizada. Alertas ante accesos fuera de horario o modificaciones de dosis en el sistema.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <rect x="10" y="4" width="20" height="32" rx="3" stroke="#00FF88" strokeWidth="1.5" />
        <path d="M16 14h8M16 20h8M16 26h5" stroke="#00FF88" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M20 8v4M18 10h4" stroke="#00FF88" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Dispositivos IoMT",
    desc: "Monitores de signos vitales, bombas de infusión, ventiladores y equipos de imagen conectados en red. Inventario automático y detección de anomalías de red.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <rect x="8" y="14" width="24" height="16" rx="2" stroke="#FFB800" strokeWidth="1.5" />
        <path d="M12 22h4l2-4 3 8 2-5 2 3h3" stroke="#FFB800" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="20" cy="8" r="3" stroke="#FFB800" strokeWidth="1.5" />
        <path d="M20 11v3" stroke="#FFB800" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

const testimonials = [
  {
    quote: "Implementamos qatech360 en 47 computadoras del hospital en menos de dos horas. El agente no interfirió con ningún equipo médico y al día siguiente ya teníamos visibilidad total de nuestra red clínica.",
    name: "Dr. Alejandro Morales",
    role: "Director de TI",
    org: "Hospital Ángeles, Ciudad de México",
    initials: "AM",
  },
  {
    quote: "Necesitábamos cumplir con la Resolución 839 y LGPD para nuestras operaciones en Colombia y Brasil. qatech360 nos generó el informe de auditoría en minutos, algo que antes tardábamos semanas en preparar manualmente.",
    name: "Laura Castellanos",
    role: "CISO",
    org: "Clínica Palermo, Bogotá",
    initials: "LC",
  },
];

export default function SaludPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <NavBar />

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.02%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#0070F3] opacity-[0.07] blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111111] border border-[#2A2A2A] text-sm text-[#00FF88] mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
            Sector Salud — Solución especializada
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          >
            Seguridad para el{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0070F3] to-[#00D4FF]">
              Sector Salud
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-[#A0A0A0] max-w-3xl mx-auto mb-10"
          >
            Protege datos de pacientes sin interrumpir la atención. Detección de amenazas especializada para hospitales, clínicas y redes de salud — en español, 24/7, con cumplimiento HIPAA, NOM-024 y LGPD.
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
              Demo para sector salud
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 border border-[#2A2A2A] hover:border-[#0070F3]/40 text-[#A0A0A0] hover:text-white font-semibold rounded-lg transition-all duration-200"
            >
              Ver precios
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Amenazas específicas del sector salud</h2>
            <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
              Los hospitales son el tercer sector más atacado en LATAM. Estas son las amenazas que enfrentas hoy.
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Cumplimiento normativo para salud</h2>
            <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
              Generamos evidencias y reportes de auditoría automáticamente para cada marco regulatorio.
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
                className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-6 text-center"
              >
                <div
                  className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 border"
                  style={{ color: c.color, borderColor: `${c.color}30`, backgroundColor: `${c.color}10` }}
                >
                  {c.name}
                </div>
                <p className="text-[#A0A0A0] text-xs mb-3">{c.region}</p>
                <p className="text-[#A0A0A0] text-sm leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* No interruption */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Protección sin interrumpir{" "}
                <span className="text-[#00FF88]">la atención</span>
              </h2>
              <p className="text-[#A0A0A0] mb-8 leading-relaxed">
                En entornos clínicos, cada segundo importa. Nuestro agente fue diseñado para operar en silencio, sin afectar el rendimiento de los sistemas médicos.
              </p>
              <ul className="space-y-4">
                {[
                  "Agente ligero: menos de 10 MB, menos del 1% de CPU",
                  "Sin reinicio requerido para la instalación",
                  "Compatible con software clínico certificado (Epic, Mediware, HL7)",
                  "Despliegue silencioso vía GPO o script — sin intervención del usuario",
                  "Modo auditoría disponible para entornos de alta criticidad",
                  "Soporte para Windows XP/7 legacy (aún comunes en equipos médicos)",
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
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-[#FF3B3B]" />
                <div className="w-3 h-3 rounded-full bg-[#FFB800]" />
                <div className="w-3 h-3 rounded-full bg-[#00FF88]" />
                <span className="text-[#666666] text-xs ml-2">Monitor de recursos — Servidor clínico</span>
              </div>
              <div className="space-y-4">
                {[
                  { label: "CPU — Agente qatech360", pct: 0.8, color: "#00FF88" },
                  { label: "CPU — Epic EHR", pct: 12, color: "#0070F3" },
                  { label: "RAM — Agente qatech360", pct: 1.2, color: "#00D4FF" },
                  { label: "RAM — Aplicaciones clínicas", pct: 68, color: "#0070F3" },
                  { label: "Disk I/O — Agente", pct: 0.3, color: "#00FF88" },
                ].map((m) => (
                  <div key={m.label}>
                    <div className="flex justify-between text-xs text-[#A0A0A0] mb-1">
                      <span>{m.label}</span>
                      <span style={{ color: m.color }}>{m.pct}%</span>
                    </div>
                    <div className="h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.min(m.pct * 1.4, 100)}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: m.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[#666666] text-xs mt-6 text-center">Overhead real medido en despliegue hospitalario</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Critical assets */}
      <section className="py-24 px-6 bg-[#111111]/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Activos críticos que protegemos</h2>
            <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
              Cobertura especializada para cada componente de tu infraestructura de salud digital.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {assets.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#111111] border border-[#2A2A2A] hover:border-[#0070F3]/30 rounded-xl p-6 text-center transition-all duration-300 group"
              >
                <div className="flex justify-center mb-4 p-3 rounded-xl bg-[#1A1A1A] w-fit mx-auto group-hover:bg-[#0070F3]/10 transition-colors">
                  {a.icon}
                </div>
                <h3 className="font-semibold mb-2">{a.title}</h3>
                <p className="text-[#A0A0A0] text-sm leading-relaxed">{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-[#111111] to-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-10 text-center"
          >
            <h2 className="text-3xl font-bold mb-6">El costo real de no protegerse</h2>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="text-4xl font-bold text-[#FF3B3B] mb-2">$10.9M</div>
                <p className="text-[#A0A0A0] text-sm">Costo promedio de una brecha en salud (IBM 2024)</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#FFB800] mb-2">236 días</div>
                <p className="text-[#A0A0A0] text-sm">Tiempo promedio para detectar una brecha sin SIEM</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#00FF88] mb-2">desde $149</div>
                <p className="text-[#A0A0A0] text-sm">Costo mensual de protección completa con qatech360</p>
              </div>
            </div>
            <p className="text-[#A0A0A0] text-sm max-w-2xl mx-auto">
              Una sola brecha en el sector salud cuesta en promedio 73,000 veces más que un año de protección con qatech360 Plan Profesional. El ROI es inmediato.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-[#111111]/50">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            Lo que dicen nuestros clientes del sector salud
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-8"
              >
                <p className="text-[#A0A0A0] leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0070F3] to-[#00D4FF] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-[#A0A0A0] text-sm">{t.role}</div>
                    <div className="text-[#666666] text-xs">{t.org}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Protege a tus pacientes y tu institución
            </h2>
            <p className="text-[#A0A0A0] text-lg mb-10">
              Agenda una demo de 30 minutos con nuestro equipo especializado en sector salud. Sin compromiso.
            </p>
            <Link
              href="/demo"
              className="inline-block px-10 py-4 bg-[#0070F3] hover:bg-[#0050D0] text-white font-semibold rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(0,112,243,0.4)] hover:shadow-[0_0_40px_rgba(0,112,243,0.6)] text-lg"
            >
              Demo para sector salud
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
