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
const MISSION_VALUES = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 3L4 9v9c0 6 5 11 12 13 7-2 12-7 12-13V9L16 3z" stroke="#0070F3" strokeWidth="2" strokeLinejoin="round" />
        <path d="M11 16l4 4 7-7" stroke="#0070F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Misión",
    text: "Democratizar la ciberseguridad empresarial para las empresas latinoamericanas, entregando protección de nivel Fortune 500 con precios transparentes, soporte en español y onboarding en 15 minutos.",
    color: "#0070F3",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="12" stroke="#00D4FF" strokeWidth="2" />
        <path d="M16 8v8l5 3" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Visión",
    text: "Ser la plataforma de seguridad de referencia en América Latina para 2030, con presencia en los 20 principales mercados de la región y más de 500,000 endpoints protegidos.",
    color: "#00D4FF",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <polygon points="16,4 20,12 28,13 22,19 23,28 16,24 9,28 10,19 4,13 12,12" stroke="#00FF88" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
    title: "Valores",
    text: "Transparencia total. Excelencia técnica. Enfoque en el cliente. Orgullo latinoamericano. Operamos con los más altos estándares éticos en cada decisión que tomamos.",
    color: "#00FF88",
  },
];

const TIMELINE = [
  { year: "2020", event: "Fundación en Ciudad de México. Primer equipo de 4 ingenieros de seguridad." },
  { year: "2021", event: "Lanzamiento del primer SOC LATAM con cobertura en GMT-6 y GMT-5." },
  { year: "2022", event: "Alcanzamos 1,000 endpoints protegidos. Serie Seed cerrada con inversores LATAM." },
  { year: "2023", event: "Expansión a Brasil y Colombia. Cumplimiento LGPD y Ley 1581." },
  { year: "2024", event: "50,000 endpoints protegidos. 200+ empresas clientes. Lanzamiento de XDR." },
  { year: "2025", event: "Plataforma completa: 12 servicios, cobertura en 6 países, SOC 24/7/365." },
];

const TEAM = [
  { name: "Alejandro Torres", role: "CEO & Co-Fundador", country: "🇲🇽", initials: "AT", color: "#0070F3" },
  { name: "María Castillo", role: "CTO & Co-Fundadora", country: "🇨🇴", initials: "MC", color: "#00D4FF" },
  { name: "Roberto Ferreira", role: "CISO", country: "🇧🇷", initials: "RF", color: "#00FF88" },
  { name: "Sofía Mendoza", role: "Head of SOC", country: "🇦🇷", initials: "SM", color: "#FFB800" },
  { name: "Diego Vargas", role: "Sales Director", country: "🇨🇱", initials: "DV", color: "#0070F3" },
  { name: "Valeria Quispe", role: "Customer Success Lead", country: "🇵🇪", initials: "VQ", color: "#00D4FF" },
];

const NUMBERS = [
  { value: "50K+", label: "Endpoints protegidos" },
  { value: "200+", label: "Empresas clientes" },
  { value: "6", label: "Países con cobertura" },
  { value: "24/7", label: "SOC activo" },
];

const CERTS = [
  { name: "ISO 27001", sub: "Information Security" },
  { name: "SOC 2 Type II", sub: "Security & Availability" },
  { name: "PCI-DSS", sub: "Qualified Security Assessor" },
  { name: "Open Source Leader", sub: "Certified Integration" },
];

// ================================================================
// LATAM COVERAGE MAP — real planisphere image
// ================================================================
function LatamMap() {
  return (
    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
      <Image
        src="/images/backgrounds/planisferio.png"
        alt="Mapa de cobertura qatech360 en América Latina — México, Colombia, Brasil, Argentina, Chile, Perú"
        fill
        className="object-cover object-center"
        style={{ opacity: 0.85 }}
      />
      {/* Teal overlay to harmonize with dark theme */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(0,112,243,0.15) 0%, rgba(0,212,255,0.08) 50%, rgba(0,0,0,0.4) 100%)",
        }}
      />
      {/* Coverage indicator dots */}
      {[
        { label: "🇲🇽 México", x: "22%", y: "28%", color: "#0070F3" },
        { label: "🇨🇴 Colombia", x: "30%", y: "46%", color: "#00D4FF" },
        { label: "🇧🇷 Brasil", x: "42%", y: "55%", color: "#00FF88" },
        { label: "🇦🇷 Argentina", x: "36%", y: "75%", color: "#FFB800" },
        { label: "🇨🇱 Chile", x: "30%", y: "72%", color: "#00D4FF" },
        { label: "🇵🇪 Perú", x: "28%", y: "57%", color: "#0070F3" },
      ].map((dot, i) => (
        <div
          key={i}
          className="absolute flex items-center gap-1.5"
          style={{ left: dot.x, top: dot.y }}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
              style={{ backgroundColor: dot.color, animationDelay: `${i * 0.5}s` }}
            />
            <span
              className="relative inline-flex rounded-full h-2.5 w-2.5"
              style={{ backgroundColor: dot.color }}
            />
          </span>
          <span className="text-[10px] font-semibold text-white drop-shadow-lg" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}>
            {dot.label}
          </span>
        </div>
      ))}
      {/* SOC badge */}
      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-[#111]/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[#00FF88]/30">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF88] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF88]" />
        </span>
        <span className="text-[#00FF88] text-[10px] font-mono font-bold">SOC ACTIVO 24/7</span>
      </div>
    </div>
  );
}

// ================================================================
// PAGE COMPONENT
// ================================================================
export default function AboutPage() {
  const numbersRef = useRef(null);
  const numbersInView = useInView(numbersRef, { once: true });

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <NavBar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Planisferio background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <Image
            src="/images/backgrounds/planisferio.png"
            alt=""
            fill
            className="object-cover object-center"
            style={{ opacity: 0.09, mixBlendMode: "luminosity" }}
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.2) 50%, rgba(10,10,10,0.9) 100%)",
            }}
          />
        </div>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#0070F3]/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00FF88]/40 bg-[#00FF88]/10 text-[#00FF88] text-sm font-medium mb-6">
              Fundada en LATAM · Para LATAM
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              De LATAM,{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(90deg,#00D4FF,#0070F3)",
                }}
              >
                para LATAM
              </span>
            </h1>
            <p className="text-xl text-[#A0A0A0] max-w-3xl mx-auto leading-relaxed">
              Somos el equipo de seguridad que las empresas latinoamericanas merecían. Nacimos en México en 2020 con una misión clara: llevar ciberseguridad de clase mundial a toda América Latina, en español, al precio justo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── MISSION / VISION / VALUES ─────────────────────────── */}
      <section className="py-24 px-6 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {MISSION_VALUES.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-8 hover:border-[#0070F3]/40 transition-all duration-300"
              >
                <div className="mb-5">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3" style={{ color: item.color }}>
                  {item.title}
                </h3>
                <p className="text-[#A0A0A0] leading-relaxed text-sm">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ──────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Nuestra historia</h2>
            <p className="text-[#A0A0A0]">Cinco años construyendo la plataforma de seguridad que LATAM necesitaba.</p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#0070F3] via-[#00D4FF] to-transparent" />

            {TIMELINE.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex items-start gap-8 mb-10 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#0070F3] border-2 border-[#0A0A0A] z-10" />

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />

                <div
                  className={`flex-1 ml-16 md:ml-0 ${
                    i % 2 === 0 ? "md:pr-12" : "md:pl-12"
                  }`}
                >
                  <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5 hover:border-[#0070F3]/40 transition-all duration-300">
                    <span className="text-[#0070F3] font-bold text-lg">{item.year}</span>
                    <p className="text-[#A0A0A0] text-sm mt-1 leading-relaxed">{item.event}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ──────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">El equipo</h2>
            <p className="text-[#A0A0A0]">Ingenieros de seguridad, analistas SOC y especialistas de cumplimiento — todos de LATAM.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-6 flex items-center gap-4 hover:border-[#0070F3]/40 transition-all duration-300"
              >
                {/* Avatar */}
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0"
                  style={{
                    background: member.color + "22",
                    color: member.color,
                    border: `2px solid ${member.color}44`,
                  }}
                >
                  {member.initials}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-bold text-sm">{member.name}</p>
                    <span className="text-base">{member.country}</span>
                  </div>
                  <p className="text-[#A0A0A0] text-xs">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COVERAGE MAP ──────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0070F3]/40 bg-[#0070F3]/10 text-[#00D4FF] text-sm font-medium mb-6">
                Cobertura LATAM
              </span>
              <h2 className="text-4xl font-bold mb-6">SOC en tu zona horaria</h2>
              <p className="text-[#A0A0A0] leading-relaxed mb-8">
                Nuestro Centro de Operaciones de Seguridad opera desde México y Brasil, cubriendo todos los husos horarios de América Latina. Cuando se dispara una alerta crítica, un analista humano que habla tu idioma ya está investigando.
              </p>
              <div className="space-y-3">
                {[
                  { flag: "🇲🇽", country: "México", tz: "GMT-6 / GMT-5" },
                  { flag: "🇨🇴", country: "Colombia / Perú", tz: "GMT-5" },
                  { flag: "🇧🇷", country: "Brasil / Argentina", tz: "GMT-3" },
                  { flag: "🇨🇱", country: "Chile", tz: "GMT-4" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <span className="text-xl">{item.flag}</span>
                    <span className="text-[#A0A0A0]">{item.country}</span>
                    <span className="text-[#666] ml-auto font-mono">{item.tz}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden border border-[#2A2A2A] shadow-[0_0_60px_rgba(0,112,243,0.2)]"
            >
              <LatamMap />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── NUMBERS ───────────────────────────────────────────── */}
      <section ref={numbersRef} className="py-16 px-6 bg-[#0D0D0D] border-y border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {NUMBERS.map((num, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={numbersInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-bold text-[#0070F3] mb-2">{num.value}</p>
                <p className="text-[#A0A0A0] text-sm">{num.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPEN SOURCE ───────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">Tecnología Transparente</h2>
            <p className="text-[#A0A0A0] leading-relaxed mb-8">
              Creemos en la transparencia. Por eso construimos nuestra plataforma con tecnología de código abierto, el enfoque más auditado del mundo en SIEM/XDR. Tus equipos pueden revisar cada línea de código que corre en tu infraestructura. Sin cajas negras.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ────────────────────────────────────── */}
      <section className="py-16 px-6 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl font-bold mb-2">Certificaciones y reconocimientos</h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-6">
            {CERTS.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-[#111111] border border-[#2A2A2A] rounded-xl px-8 py-5 text-center hover:border-[#0070F3]/40 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-[#0070F3]/10 border border-[#0070F3]/30 flex items-center justify-center mx-auto mb-3">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2L12.5 7h5.5l-4.5 3.3 1.7 5.2L10 13l-5.2 2.5 1.7-5.2L2 7h5.5L10 2z" fill="#0070F3" opacity="0.5" stroke="#0070F3" strokeWidth="0.5" />
                  </svg>
                </div>
                <p className="font-bold text-sm">{cert.name}</p>
                <p className="text-[#666] text-xs mt-0.5">{cert.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTAs ──────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-6"
          >
            <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-8 hover:border-[#0070F3]/40 transition-all duration-300">
              <h3 className="text-xl font-bold mb-3">¿Quieres ser parte del equipo?</h3>
              <p className="text-[#A0A0A0] text-sm mb-5">
                Trabajamos remoto desde cualquier país de LATAM. Buscamos ingenieros apasionados por la seguridad.
              </p>
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 px-6 py-2.5 border border-[#0070F3] text-[#0070F3] hover:bg-[#0070F3]/10 rounded-lg text-sm font-medium transition-all duration-200"
              >
                Ver oportunidades
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="#0070F3" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </Link>
            </div>

            <div className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-8 hover:border-[#00FF88]/40 transition-all duration-300">
              <h3 className="text-xl font-bold mb-3">¿Tienes preguntas?</h3>
              <p className="text-[#A0A0A0] text-sm mb-5">
                Nuestro equipo responde en menos de 2 horas hábiles. Siempre en español, siempre en tu zona horaria.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#00FF88] hover:bg-[#00D4FF] text-[#0A0A0A] rounded-lg text-sm font-bold transition-all duration-200"
              >
                Habla con nosotros
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
