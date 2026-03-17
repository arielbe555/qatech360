"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const painPoints = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <circle cx="24" cy="18" r="8" stroke="#FF3B3B" strokeWidth="2" />
        <path d="M8 40c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="#FF3B3B" strokeWidth="2" strokeLinecap="round" />
        <path d="M32 14l4-4M36 14l-4-4" stroke="#FF3B3B" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "Sin equipo de seguridad propio",
    desc: "El 74% de las PyMEs en LATAM no tiene un profesional de ciberseguridad dedicado. Los ataques no esperan a que tengas equipo.",
    color: "#FF3B3B",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="8" y="20" width="32" height="24" rx="2" stroke="#FFB800" strokeWidth="2" />
        <path d="M16 20V14a8 8 0 0116 0v6" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" />
        <path d="M22 30l2 2 4-4" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Presupuesto limitado",
    desc: "Las soluciones enterprise como CrowdStrike cuestan $8–15 USD por endpoint por mes, más implementación. Inaccesible para una PyME.",
    color: "#FFB800",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M12 12h24v4l-8 8v12l-8-4v-8L12 16v-4z" stroke="#A0A0A0" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="24" cy="36" r="3" fill="#A0A0A0" opacity="0.6" />
      </svg>
    ),
    title: "Regulaciones complejas",
    desc: "PCI-DSS, NOM-151, ISO 27001 — los requerimientos de cumplimiento son cada vez más exigentes para cualquier empresa que procese datos.",
    color: "#A0A0A0",
  },
];

const onboardingSteps = [
  {
    step: "01",
    title: "Instala el agente",
    desc: "Un solo comando en terminal. Compatible con Windows, Linux y macOS. Sin reinicios, sin interrupciones.",
    time: "5 min",
    code: "curl -s https://install.qatech360.com | bash",
    color: "#0070F3",
  },
  {
    step: "02",
    title: "Dashboard listo",
    desc: "En segundos, tu entorno aparece en el dashboard en español. Visibilidad completa de todos tus endpoints.",
    time: "5 min",
    color: "#00D4FF",
  },
  {
    step: "03",
    title: "SOC activado",
    desc: "Nuestro equipo LATAM comienza a monitorear. Si hay una amenaza, te avisamos en español — inmediatamente.",
    time: "5 min",
    color: "#00FF88",
  },
];

const faqs = [
  {
    q: "¿Necesito un equipo de IT para usar qatech360?",
    a: "No. qatech360 está diseñado para PyMEs sin equipo de seguridad. Nuestro SOC 24/7 hace el trabajo pesado. Tú solo recibes alertas y reportes claros en español.",
  },
  {
    q: "¿Puedo cancelar cuando quiera?",
    a: "Sí. No hay contratos anuales obligatorios en el plan Inicial. Cancela en cualquier momento desde tu dashboard, sin penalizaciones.",
  },
  {
    q: "¿El soporte es realmente en español?",
    a: "100%. Nuestros analistas SOC, documentación, alertas, reportes y soporte técnico están completamente en español. Somos una empresa LATAM.",
  },
  {
    q: "¿Qué pasa si mi empresa crece y necesito más endpoints?",
    a: "Puedes agregar endpoints adicionales por $3 USD/endpoint/mes, o subir al plan Profesional (100 endpoints, $399/mes) con un clic desde tu panel.",
  },
];

export default function PymePage() {
  const heroRef = useRef(null);
  const painRef = useRef(null);
  const solutionRef = useRef(null);
  const stepsRef = useRef(null);
  const pricingRef = useRef(null);
  const testimonialRef = useRef(null);
  const faqRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const painInView = useInView(painRef, { once: true, margin: "-80px" });
  const solInView = useInView(solutionRef, { once: true, margin: "-80px" });
  const stepsInView = useInView(stepsRef, { once: true, margin: "-80px" });
  const pricingInView = useInView(pricingRef, { once: true, margin: "-80px" });
  const testimonialInView = useInView(testimonialRef, { once: true, margin: "-80px" });
  const faqInView = useInView(faqRef, { once: true, margin: "-80px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-80px" });

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const starterFeatures = [
    "25 endpoints incluidos",
    "SIEM + Gestión de Logs",
    "EDR (Windows / Linux / macOS)",
    "Monitoreo de Integridad de Archivos",
    "Gestión de Vulnerabilidades",
    "Alertas por Email + Slack",
    "30 días de retención de logs",
    "Soporte en horario hábil (Lun–Vie)",
    "Dashboard 100% en español",
    "SLA estándar: respuesta en 4h",
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <NavBar />

      {/* 1. HERO */}
      <section ref={heroRef} className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0070F3]/5 to-transparent" />
        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0070F3]/30 bg-[#0070F3]/10 text-[#0070F3] text-sm font-medium mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
            Solución para PyMEs
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold mb-4 leading-tight"
          >
            <span className="text-white">Seguridad Enterprise</span>{" "}
            <br />
            <span className="bg-gradient-to-r from-[#0070F3] to-[#00D4FF] bg-clip-text text-transparent">
              para PyMEs
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-[#A0A0A0] max-w-2xl mx-auto mb-4"
          >
            No necesitas un equipo de 10 ingenieros. Nosotros somos tu equipo.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center mb-10 text-sm"
          >
            {["Desde $149/mes", "Sin contratos anuales", "Onboarding en 15 minutos", "Prueba gratis 14 días"].map((t) => (
              <span key={t} className="flex items-center gap-1.5 text-[#A0A0A0]">
                <svg className="w-4 h-4 text-[#00FF88]" viewBox="0 0 16 16" fill="currentColor">
                  <path fillRule="evenodd" d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z" />
                </svg>
                {t}
              </span>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/trial" className="px-8 py-4 bg-[#0070F3] hover:bg-[#0050D0] text-white font-semibold rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(0,112,243,0.4)]">
              Empezar prueba gratuita
            </Link>
            <Link href="/demo" className="px-8 py-4 border border-[#2A2A2A] hover:border-[#0070F3]/40 text-[#A0A0A0] hover:text-white font-semibold rounded-lg transition-all duration-200">
              Ver demo
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. PAIN POINTS */}
      <section ref={painRef} className="py-20 px-4 bg-[#111111]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={painInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">El problema de las PyMEs</h2>
            <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
              Las PyMEs en LATAM son el blanco favorito de los ciberdelincuentes — exactamente porque creen que no tienen protección.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {painPoints.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                animate={painInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl"
              >
                <div className="mb-4">{p.icon}</div>
                <h3 className="font-bold text-white text-lg mb-2">{p.title}</h3>
                <p className="text-sm text-[#A0A0A0] leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SOLUTION */}
      <section ref={solutionRef} className="py-20 px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={solInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            La solución qatech360 para PyMEs
          </h2>
          <p className="text-[#A0A0A0] text-lg">
            Todo lo que necesitas, nada de lo que no necesitas. Simple, en español, y funcionando en 15 minutos.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={solInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="p-6 bg-[#111111] border border-[#0070F3]/30 rounded-xl shadow-[0_0_40px_rgba(0,112,243,0.1)]"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="px-3 py-1 rounded-full bg-[#0070F3]/10 border border-[#0070F3]/30 text-[#0070F3] text-sm font-semibold">
                Plan Starter
              </div>
              <span className="text-[#666666] text-sm">25 endpoints</span>
            </div>
            <div className="space-y-3">
              {starterFeatures.map((f) => (
                <div key={f} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#00FF88] flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#A0A0A0] text-sm">{f}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={solInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            {[
              { label: "Amenazas bloqueadas en promedio", value: "2.4M+/mes", icon: "🛡️" },
              { label: "MTTR promedio de nuestro SOC", value: "4.8 min", icon: "⚡" },
              { label: "Uptime garantizado", value: "99.9%", icon: "✅" },
              { label: "Tiempo de onboarding", value: "15 min", icon: "🚀" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-4 p-4 bg-[#111111] border border-[#2A2A2A] rounded-xl">
                <span className="text-2xl">{stat.icon}</span>
                <div className="flex-1">
                  <p className="text-xs text-[#666666]">{stat.label}</p>
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. ONBOARDING STEPS */}
      <section ref={stepsRef} className="py-20 px-4 bg-[#111111]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={stepsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Operativo en 15 minutos
            </h2>
            <p className="text-[#A0A0A0] text-lg">Tres pasos. Sin configuración compleja. Sin consultores externos.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {onboardingSteps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 30 }}
                animate={stepsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative p-6 bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl"
              >
                <div
                  className="text-5xl font-black mb-4 leading-none"
                  style={{ color: s.color + "20" }}
                >
                  {s.step}
                </div>
                <div className="absolute top-6 right-6 text-xs px-2 py-1 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] text-[#666666]">
                  {s.time}
                </div>
                <h3 className="font-bold text-white text-lg mb-2" style={{ color: s.color }}>
                  {s.title}
                </h3>
                <p className="text-sm text-[#A0A0A0] leading-relaxed mb-4">{s.desc}</p>
                {s.code && (
                  <div className="bg-[#111111] border border-[#2A2A2A] rounded-lg p-3 font-mono text-xs text-[#00FF88] break-all">
                    {s.code}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PRICING HIGHLIGHT */}
      <section ref={pricingRef} className="py-20 px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={pricingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative p-[1px] rounded-2xl bg-gradient-to-br from-[#0070F3] to-[#00D4FF]"
        >
          <div className="bg-[#111111] rounded-2xl p-10 text-center">
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#0070F3]/10 border border-[#0070F3]/30 text-[#0070F3] text-sm font-medium mb-6">
              Plan Starter — El más popular entre PyMEs
            </div>
            <div className="mb-6">
              <span className="text-7xl font-black text-white">$149</span>
              <span className="text-[#A0A0A0] text-xl">/mes</span>
            </div>
            <p className="text-[#A0A0A0] mb-2">25 endpoints · 14 días gratis · Sin tarjeta de crédito</p>
            <p className="text-xs text-[#666666] mb-8">Facturación disponible en MXN, BRL, COP, ARS, CLP</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/trial" className="px-10 py-4 bg-[#0070F3] hover:bg-[#0050D0] text-white font-bold rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(0,112,243,0.4)] text-lg">
                Iniciar prueba gratuita
              </Link>
              <Link href="/pricing" className="px-10 py-4 border border-[#2A2A2A] hover:border-[#0070F3]/40 text-[#A0A0A0] hover:text-white font-semibold rounded-lg transition-all duration-200">
                Ver todos los planes
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 6. TESTIMONIAL */}
      <section ref={testimonialRef} className="py-20 px-4 bg-[#111111]">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={testimonialInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="p-8 bg-[#0A0A0A] border border-[#2A2A2A] rounded-2xl"
          >
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-[#FFB800]" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <blockquote className="text-lg text-white leading-relaxed mb-6">
              "Llevaba años buscando una solución de seguridad que mi empresa pudiera pagar y que realmente funcionara.
              Con qatech360 tuvimos todo funcionando en menos de 20 minutos. La primera semana ya detectaron un intento
              de phishing dirigido a nuestra dirección. El soporte en español hace toda la diferencia."
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#0070F3]/20 border border-[#0070F3]/30 flex items-center justify-center text-[#0070F3] font-bold text-lg">
                RG
              </div>
              <div>
                <p className="font-semibold text-white">Roberto García</p>
                <p className="text-sm text-[#0070F3]">IT Manager · Distribuidora Alfa (52 empleados)</p>
                <p className="text-xs text-[#666666]">Ciudad de México, México</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section ref={faqRef} className="py-20 px-4 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={faqInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Preguntas frecuentes</h2>
          <p className="text-[#A0A0A0]">Las dudas más comunes de otras PyMEs como la tuya.</p>
        </motion.div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={faqInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-[#111111] border border-[#2A2A2A] rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-medium text-white pr-4">{faq.q}</span>
                <svg
                  className={`w-5 h-5 text-[#666666] flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                  viewBox="0 0 20 20" fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5 text-[#A0A0A0] text-sm leading-relaxed border-t border-[#2A2A2A] pt-4">
                  {faq.a}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* 8. CTA */}
      <section ref={ctaRef} className="py-24 px-4 bg-[#111111]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Protege tu empresa hoy
            </h2>
            <p className="text-[#A0A0A0] text-xl mb-8">
              14 días gratis. Sin tarjeta de crédito. Cancela cuando quieras.
            </p>
            <Link
              href="/trial"
              className="inline-block px-12 py-5 bg-[#0070F3] hover:bg-[#0050D0] text-white font-bold rounded-lg text-lg transition-all duration-200 shadow-[0_0_30px_rgba(0,112,243,0.5)]"
            >
              Iniciar prueba gratuita
            </Link>
            <p className="text-[#666666] text-sm mt-4">
              Sin tarjeta de crédito · Onboarding en 15 minutos · Soporte en español
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
