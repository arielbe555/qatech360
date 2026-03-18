"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
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
// LATAM SVG MAP
// ================================================================
function LatamMap() {
  const countries = [
    { name: "México", cx: 110, cy: 140 },
    { name: "Colombia", cx: 160, cy: 230 },
    { name: "Brasil", cx: 230, cy: 270 },
    { name: "Argentina", cx: 190, cy: 380 },
    { name: "Chile", cx: 170, cy: 360 },
    { name: "Perú", cx: 160, cy: 290 },
  ];

  return (
    <svg viewBox="0 0 380 480" fill="none" className="w-full max-w-xs mx-auto">
      {/* Simplified LATAM silhouette */}
      <path
        d="M95,80 L130,75 L155,90 L165,110 L150,130 L145,160 L155,185 L148,210 L155,225 L162,240 L175,255 L185,270 L210,265 L240,258 L255,270 L260,285 L250,305 L235,320 L220,335 L210,355 L200,375 L195,395 L185,415 L175,430 L165,420 L158,400 L160,380 L155,360 L148,345 L140,330 L135,315 L138,295 L130,280 L125,260 L120,240 L115,220 L108,200 L100,175 L95,155 L88,130 L92,110 L95,80z"
        fill="#111111"
        stroke="#2A2A2A"
        strokeWidth="1"
      />

      {/* Coverage dots with pulse */}
      {countries.map((c, i) => (
        <g key={i}>
          <circle cx={c.cx} cy={c.cy} r="12" fill="#0070F3" opacity="0.1">
            <animate attributeName="r" values="12;20;12" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.1;0;0.1" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
          </circle>
          <circle cx={c.cx} cy={c.cy} r="5" fill="#0070F3" />
          <circle cx={c.cx} cy={c.cy} r="2" fill="white" />
          <text x={c.cx + 9} y={c.cy + 4} fill="#A0A0A0" fontSize="8" fontWeight="500">{c.name}</text>
        </g>
      ))}

      {/* Connection lines between countries */}
      {countries.map((c, i) =>
        countries.slice(i + 1, i + 3).map((c2, j) => (
          <line
            key={`${i}-${j}`}
            x1={c.cx}
            y1={c.cy}
            x2={c2.cx}
            y2={c2.cy}
            stroke="#0070F3"
            strokeWidth="0.5"
            strokeDasharray="4 3"
            opacity="0.3"
          />
        ))
      )}
    </svg>
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
              className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-8"
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
