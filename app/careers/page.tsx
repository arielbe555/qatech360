"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const benefits = [
  {
    title: "Trabajo 100% remoto en LATAM",
    desc: "Trabaja desde donde quieras — Ciudad de México, Bogotá, São Paulo, Buenos Aires. No hay oficina obligatoria. Horarios flexibles dentro de tu zona horaria.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <circle cx="20" cy="20" r="14" stroke="#0070F3" strokeWidth="1.5" />
        <path d="M6 20h28M20 6c-4 4-6 8.7-6 14s2 10 6 14M20 6c4 4 6 8.7 6 14s-2 10-6 14" stroke="#0070F3" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    color: "#0070F3",
  },
  {
    title: "Equipo técnico de élite",
    desc: "Trabaja junto a ingenieros y analistas de seguridad con experiencia en Fortune 500, agencias gubernamentales y startups de ciberseguridad de clase mundial.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <circle cx="14" cy="14" r="6" stroke="#00FF88" strokeWidth="1.5" />
        <circle cx="26" cy="14" r="6" stroke="#00FF88" strokeWidth="1.5" />
        <path d="M4 34c0-5.523 4.477-10 10-10M26 24c5.523 0 10 4.477 10 10" stroke="#00FF88" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 26c-1.333 1.333-2 3-2 5" stroke="#00FF88" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M22 26c1.333 1.333 2 3 2 5" stroke="#00FF88" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    color: "#00FF88",
  },
  {
    title: "Impacto real en LATAM",
    desc: "Tu trabajo protege a empresas y organizaciones reales en México, Colombia, Brasil y toda la región. No construyes features vacíos — construyes seguridad que importa.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <path d="M20 4l12 5v10c0 8-6 14-12 17C14 33 8 27 8 19V9l12-5z" stroke="#00D4FF" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M14 20l4 4 8-8" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: "#00D4FF",
  },
  {
    title: "Crecimiento acelerado",
    desc: "Somos una startup de hipercrecimiento. Las carreras aquí avanzan más rápido que en corporaciones. Si eres bueno, te lo reconocemos rápido.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <path d="M6 32l8-10 6 4 8-14 6 8" stroke="#FFB800" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M30 14h6v6" stroke="#FFB800" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: "#FFB800",
  },
];

const openPositions = [
  {
    title: "Senior Security Engineer",
    department: "Ingeniería",
    location: "Remoto LATAM",
    type: "Tiempo completo",
    desc: "Diseña y mantiene la infraestructura de detección de amenazas. Expertise en plataformas SIEM/XDR, Elasticsearch y reglas de correlación.",
    color: "#FF3B3B",
  },
  {
    title: "SOC Analyst (L2/L3)",
    department: "Operaciones SOC",
    location: "Remoto LATAM",
    type: "Tiempo completo",
    desc: "Triaje e investigación de incidentes de seguridad para clientes en LATAM. Disponibilidad para turnos rotativos 24/7.",
    color: "#0070F3",
  },
  {
    title: "Frontend Developer",
    department: "Producto",
    location: "Remoto LATAM",
    type: "Tiempo completo",
    desc: "Construye la experiencia del portal de clientes con Next.js, TypeScript y Tailwind. Pasión por UX y performance.",
    color: "#00D4FF",
  },
  {
    title: "Backend Engineer",
    department: "Ingeniería",
    location: "Remoto LATAM",
    type: "Tiempo completo",
    desc: "Desarrolla la capa de APIs, ingestión de eventos y automatización de respuestas. Node.js, Go o Rust.",
    color: "#00FF88",
  },
  {
    title: "Sales Engineer LATAM",
    department: "Ventas",
    location: "México / Colombia",
    type: "Tiempo completo",
    desc: "Traduce capacidades técnicas en valor de negocio para prospectos enterprise. Experiencia en ventas técnicas B2B.",
    color: "#FFB800",
  },
  {
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Remoto LATAM",
    type: "Tiempo completo",
    desc: "Asegura el éxito de nuestros clientes post-onboarding. Guía la adopción, mide el valor y gestiona renovaciones.",
    color: "#00D4FF",
  },
];

const hiringSteps = [
  {
    step: "01",
    title: "Aplicación",
    desc: "Envía tu CV y una nota breve sobre por qué quieres unirte. Sin formularios interminables — un email es suficiente.",
  },
  {
    step: "02",
    title: "Entrevista técnica",
    desc: "Llamada de 45 min con el equipo técnico. Conversamos sobre tu experiencia y cómo piensas sobre los problemas.",
  },
  {
    step: "03",
    title: "Prueba práctica",
    desc: "Un desafío técnico real (pagado) de 3-4 horas. Sin ejercicios de algoritmos — problemas del mundo real que resolverías en el trabajo.",
  },
  {
    step: "04",
    title: "Oferta",
    desc: "Si todo fluye bien, hacemos una oferta en menos de 48 horas. Sin procesos eternos ni comités interminables.",
  },
];

const perks = [
  {
    icon: "💰",
    title: "Salario competitivo",
    desc: "Benchmarking constante con el mercado. Pagamos en USD independientemente de tu país.",
  },
  {
    icon: "🌎",
    title: "Equipo distribuido",
    desc: "Todo remoto, todo asíncrono cuando es posible. Sin viajes de negocios obligatorios.",
  },
  {
    icon: "📈",
    title: "Stock options",
    desc: "Participación en el crecimiento de la empresa. Si qatech360 crece, tú creces con nosotros.",
  },
  {
    icon: "🏖️",
    title: "Días libres flexibles",
    desc: "Vacaciones ilimitadas reales. Confiamos en que sabes cuándo necesitas descansar.",
  },
  {
    icon: "🎓",
    title: "Presupuesto certificaciones",
    desc: "$2,000 USD/año para certificaciones de seguridad (CISSP, CEH, AWS Security, etc.).",
  },
  {
    icon: "💻",
    title: "Equipo de trabajo",
    desc: "MacBook Pro o ThinkPad según tu preferencia. Presupuesto adicional para setup de home office.",
  },
];

export default function CareersPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <NavBar />

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[65vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.02%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[#00FF88] opacity-[0.04] blur-[130px] pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111111] border border-[#2A2A2A] text-sm text-[#00FF88] mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
            6 posiciones abiertas
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          >
            Trabaja con nosotros —{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF88] to-[#00D4FF]">
              construye el futuro
            </span>{" "}
            de la ciberseguridad en LATAM
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-[#A0A0A0] max-w-3xl mx-auto mb-10"
          >
            Somos un equipo pequeño, técnico y ambicioso. Protegemos a miles de empresas en LATAM y apenas estamos empezando. ¿Te unes?
          </motion.p>
          <motion.a
            href="#posiciones"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-block px-8 py-4 bg-[#0070F3] hover:bg-[#0050D0] text-white font-semibold rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(0,112,243,0.4)] hover:shadow-[0_0_40px_rgba(0,112,243,0.6)]"
          >
            Ver posiciones abiertas
          </motion.a>
        </div>
      </section>

      {/* Why qatech360 */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Por qué qatech360</h2>
            <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
              No somos una corporación. Somos un equipo que construye algo que no existía: ciberseguridad de clase mundial, hecha para LATAM.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#111111] border border-[#2A2A2A] hover:border-[#0070F3]/30 rounded-xl p-6 text-center transition-all duration-300 group"
              >
                <div className="flex justify-center mb-4 p-4 rounded-xl bg-[#1A1A1A] w-fit mx-auto group-hover:bg-[#0070F3]/10 transition-colors">
                  {b.icon}
                </div>
                <h3 className="font-semibold mb-2" style={{ color: b.color }}>{b.title}</h3>
                <p className="text-[#A0A0A0] text-sm leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture / LATAM map */}
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
                Un equipo distribuido por{" "}
                <span className="text-[#00D4FF]">toda LATAM</span>
              </h2>
              <p className="text-[#A0A0A0] mb-6 leading-relaxed">
                Nuestro equipo trabaja desde seis países. Nos reunimos en video dos veces por semana, compartimos conocimiento en un canal de Slack siempre activo, y nos encontramos en persona una vez al año para un retiro de equipo.
              </p>
              <p className="text-[#A0A0A0] mb-8 leading-relaxed">
                Valoramos la claridad sobre la presencia, los resultados sobre las horas, y la comunicación escrita sobre las reuniones interminables. Si eres autónomo y comunicas bien, encajarás perfectamente.
              </p>
              <div className="flex flex-wrap gap-2">
                {["México", "Colombia", "Brasil", "Argentina", "Chile", "Perú"].map((country) => (
                  <span
                    key={country}
                    className="px-3 py-1.5 rounded-full text-sm border border-[#2A2A2A] text-[#A0A0A0] bg-[#111111]"
                  >
                    {country}
                  </span>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Simplified LATAM map visualization */}
              <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-8 relative overflow-hidden">
                <svg viewBox="0 0 280 360" fill="none" className="w-full max-w-xs mx-auto opacity-60">
                  {/* Simplified LATAM outline */}
                  <path d="M80 20 L140 15 L170 30 L180 50 L160 70 L170 90 L150 110 L160 140 L140 160 L150 190 L130 220 L140 250 L120 280 L100 310 L80 340 L60 320 L50 290 L70 260 L60 230 L80 200 L70 170 L90 140 L80 110 L100 90 L90 70 L100 50 Z" stroke="#2A2A2A" strokeWidth="1.5" fill="none" />
                  {/* City dots */}
                  <circle cx="120" cy="75" r="5" fill="#0070F3" />
                  <text x="128" y="78" fontSize="8" fill="#A0A0A0">Ciudad de México</text>
                  <circle cx="115" cy="140" r="5" fill="#00FF88" />
                  <text x="123" y="143" fontSize="8" fill="#A0A0A0">Bogotá</text>
                  <circle cx="145" cy="195" r="5" fill="#00D4FF" />
                  <text x="153" y="198" fontSize="8" fill="#A0A0A0">São Paulo</text>
                  <circle cx="105" cy="240" r="5" fill="#FFB800" />
                  <text x="113" y="243" fontSize="8" fill="#A0A0A0">Buenos Aires</text>
                  <circle cx="95" cy="210" r="5" fill="#0070F3" />
                  <text x="103" y="213" fontSize="8" fill="#A0A0A0">Santiago</text>
                  <circle cx="115" cy="165" r="5" fill="#00FF88" />
                  <text x="123" y="168" fontSize="8" fill="#A0A0A0">Lima</text>
                </svg>
                <div className="absolute top-4 right-4 flex flex-col gap-1">
                  {[
                    { color: "#0070F3", label: "Ingeniería" },
                    { color: "#00FF88", label: "SOC" },
                    { color: "#00D4FF", label: "Producto" },
                    { color: "#FFB800", label: "Ventas" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2 text-xs text-[#A0A0A0]">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Open positions */}
      <section id="posiciones" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Posiciones abiertas</h2>
            <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
              Actualmente buscamos personas increíbles para estos roles. Todos son remotos en LATAM.
            </p>
          </motion.div>
          <div className="space-y-4">
            {openPositions.map((pos, i) => (
              <motion.div
                key={pos.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-[#111111] border border-[#2A2A2A] hover:border-[#0070F3]/30 rounded-xl p-6 transition-all duration-300 group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{pos.title}</h3>
                      <span
                        className="text-xs px-3 py-1 rounded-full font-medium"
                        style={{ color: pos.color, backgroundColor: `${pos.color}15`, border: `1px solid ${pos.color}30` }}
                      >
                        {pos.department}
                      </span>
                    </div>
                    <p className="text-[#A0A0A0] text-sm mb-3">{pos.desc}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-[#666666]">
                      <span className="flex items-center gap-1">
                        <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
                          <circle cx="8" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M2 14c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        {pos.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
                          <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M5 3V2M11 3V2M2 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        {pos.type}
                      </span>
                    </div>
                  </div>
                  <a
                    href={`mailto:careers@qatech360.com?subject=Aplicación: ${pos.title}`}
                    className="flex-shrink-0 px-6 py-3 bg-[#1A1A1A] hover:bg-[#0070F3] border border-[#2A2A2A] hover:border-[#0070F3] text-[#A0A0A0] hover:text-white font-medium rounded-lg transition-all duration-200 text-sm"
                  >
                    Aplicar
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring process */}
      <section className="py-24 px-6 bg-[#111111]/50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestro proceso</h2>
            <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
              Rápido, transparente y respetuoso de tu tiempo. Del primer email a la oferta en menos de 2 semanas.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-6 relative">
            <div className="hidden md:block absolute top-8 left-1/8 right-1/8 h-px bg-gradient-to-r from-transparent via-[#2A2A2A] to-transparent" />
            {hiringSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="text-center relative"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0070F3] to-[#00D4FF] flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-[#A0A0A0] text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Beneficios y ventajas</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((perk, i) => (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-6 flex items-start gap-4"
              >
                <span className="text-3xl flex-shrink-0">{perk.icon}</span>
                <div>
                  <h3 className="font-semibold mb-1">{perk.title}</h3>
                  <p className="text-[#A0A0A0] text-sm leading-relaxed">{perk.desc}</p>
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
              ¿No ves tu rol ideal?
            </h2>
            <p className="text-[#A0A0A0] text-lg mb-10">
              Siempre estamos buscando personas excepcionales. Si crees que puedes aportar algo único a qatech360, envíanos tu CV con una nota sobre qué harías aquí.
            </p>
            <a
              href="mailto:careers@qatech360.com?subject=Candidatura espontánea"
              className="inline-block px-10 py-4 bg-[#0070F3] hover:bg-[#0050D0] text-white font-semibold rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(0,112,243,0.4)] hover:shadow-[0_0_40px_rgba(0,112,243,0.6)] text-lg"
            >
              Envíanos tu CV — careers@qatech360.com
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
