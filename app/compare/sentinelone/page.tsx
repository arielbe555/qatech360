"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

// ================================================================
// ICONS
// ================================================================
const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="10" fill="rgba(0,255,136,0.15)" />
    <path d="M8 12l3 3 5-5" stroke="#00FF88" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="10" fill="rgba(255,59,59,0.12)" />
    <path d="M9 9l6 6M15 9l-6 6" stroke="#FF3B3B" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const BothIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="10" fill="rgba(0,112,243,0.12)" />
    <path d="M8 12l3 3 5-5" stroke="#0070F3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BrainIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0070F3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9.5 2A2.5 2.5 0 0112 4.5v15a2.5 2.5 0 01-2.5 2.5h-2A2.5 2.5 0 015 19.5v-15A2.5 2.5 0 017.5 2h2z" />
    <path d="M14.5 2A2.5 2.5 0 0117 4.5v15a2.5 2.5 0 01-2.5 2.5h-2" />
    <path d="M8 7h2M8 12h2M8 17h2M14 7h2M14 12h2M14 17h2" />
  </svg>
);

const UsersIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87" />
    <path d="M16 3.13a4 4 0 010 7.75" />
  </svg>
);

const GlobeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00FF88" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00FF88" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

// ================================================================
// DATA
// ================================================================
const COMPARISON_ROWS = [
  { feature: "Idioma principal", qa: "Español nativo", s1: "Inglés", qaGood: true, s1Good: false, both: false },
  { feature: "Precio transparente", qa: "Precios accesibles y transparentes", s1: "No (requiere cotización)", qaGood: true, s1Good: false, both: false },
  { feature: "Analistas humanos LATAM 24/7", qa: "✅", s1: "❌", qaGood: true, s1Good: false, both: false },
  { feature: "Onboarding", qa: "15 minutos", s1: "Días / semanas", qaGood: true, s1Good: false, both: false },
  { feature: "Open source core", qa: "Wazuh", s1: "Propietario", qaGood: true, s1Good: false, both: false },
  { feature: "Cumplimiento NOM-151 / LGPD", qa: "✅", s1: "❌", qaGood: true, s1Good: false, both: false },
  { feature: "Prueba gratuita sin tarjeta", qa: "14 días", s1: "No", qaGood: true, s1Good: false, both: false },
  { feature: "Precio inicial", qa: "Precios accesibles LATAM", s1: "Requiere cotización enterprise", qaGood: true, s1Good: false, both: false },
  { feature: "Container Security", qa: "✅", s1: "✅", qaGood: true, s1Good: true, both: true },
  { feature: "Compliance Automation LATAM", qa: "✅", s1: "❌", qaGood: true, s1Good: false, both: false },
];

const SOC_ADVANTAGES = [
  {
    icon: <BrainIcon />,
    title: "IA automática que nunca descansa",
    description:
      "Como la plataforma autónoma, nuestra plataforma usa detección automática de comportamiento anómalo impulsada por modelos de machine learning. Correlación cross-layer, mapeo MITRE ATT&CK, respuesta activa automatizada.",
  },
  {
    icon: <UsersIcon />,
    title: "Más ojos humanos LATAM 24/7",
    description:
      "Donde el competidor de IA autónoma termina (la alerta), nosotros empezamos. Cada alerta crítica tiene un analista LATAM que la revisa, triagea y te llama en español. Sin bots, sin scripts de respuesta genéricos.",
  },
  {
    icon: <GlobeIcon />,
    title: "Contexto regional que la IA no tiene",
    description:
      "Nuestro feed de inteligencia de amenazas LATAM cubre grupos de ransomware activos en México, Colombia, Brasil y Argentina. Sentine... usa inteligencia global — nosotros también, pero además la local.",
  },
];

const MISSING_FEATURES = [
  {
    title: "Soporte y documentación en inglés",
    description:
      "El portal de Sentine..., la documentación técnica, los playbooks de respuesta y la comunicación del equipo de soporte son en inglés. Para equipos LATAM esto implica barreras operativas reales.",
  },
  {
    title: "Sin cobertura de regulaciones locales",
    description:
      "NOM-151 en México, LGPD en Brasil, Ley 1581 en Colombia. Sentine... no ofrece mapeo nativo de controles para estas regulaciones. Necesitás un equipo especializado para construirlo manualmente.",
  },
  {
    title: "Precios opacos, sin transparencia",
    description:
      "Para obtener un precio de Sentine... necesitás pasar por un proceso de ventas. Sin publicar precios, la comparación es imposible y el proceso de compra consume tiempo valioso de tu equipo.",
  },
  {
    title: "SOC en zonas horarias USA/EMEA",
    description:
      "Cuando ocurre un incidente a las 3am en Buenos Aires, el equipo de soporte de Sentine... está en San Francisco (GMT-7) o en Europa. Los tiempos de respuesta en incidentes P1 lo reflejan.",
  },
  {
    title: "Complejidad de deployment enterprise",
    description:
      "Sentine... está diseñado para organizaciones enterprise con equipos de IT maduros. El proceso de deployment y tuning inicial requiere semanas de trabajo especializado que muchas PyMEs LATAM no pueden costear.",
  },
  {
    title: "Sin prueba gratuita real",
    description:
      "Sentine... no ofrece una prueba gratuita sin proceso de ventas previo. Con qatech360 podés activar 14 días completos en minutos, sin tarjeta de crédito y sin hablar con nadie.",
  },
];

const MIGRATION_STEPS = [
  {
    step: "01",
    title: "Instalación paralela sin downtime",
    description:
      "El agente qatech360 se instala en paralelo con Sentine.... Ambos conviven sin conflictos. Durante esta fase nuestro equipo verifica que todas las fuentes de datos estén correctamente integradas y configuradas para tu entorno específico.",
    time: "Día 1",
  },
  {
    step: "02",
    title: "Validación de cobertura y afinamiento",
    description:
      "En 24 horas verificamos cobertura de endpoints, cloud, red y SaaS. Ajustamos reglas de detección y umbrales de alerta para minimizar falsos positivos. Tu equipo recibe entrenamiento del dashboard en español.",
    time: "Día 1–2",
  },
  {
    step: "03",
    title: "Activación SOC y retiro del agente anterior",
    description:
      "Con cobertura validada, nuestro SOC LATAM activa monitoreo 24/7 completo. Desinstalás el agente anterior. La migración está completa. Tiempo total del proceso: menos de 48 horas sin interrupciones.",
    time: "Día 2",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Usábamos la plataforma autónoma y era buena técnicamente, pero todo en inglés y el soporte tardaba horas. Con qatech360 tenemos el mismo nivel de detección automática y encima un analista nos llama cuando hay algo crítico. En español, en nuestro horario.",
    name: "Valentina Torres",
    title: "CISO — Fintech Argentina",
    initials: "VT",
  },
  {
    quote:
      "La diferencia clave para nosotros fue el cumplimiento LGPD. Sentine... no tiene ese mapeo nativo — con qatech360 lo tenemos out of the box y generamos los reportes de auditoría en un clic.",
    name: "Ricardo Fonseca",
    title: "CTO — Healthcare Brasil",
    initials: "RF",
  },
  {
    quote:
      "El precio de Sentine... para 150 endpoints era mucho más de lo que podíamos invertir, sin incluir el trabajo de configuración. Con qatech360 ahorramos significativamente, todo incluido, y el onboarding lo hicieron ellos en dos días.",
    name: "Sofía Vargas",
    title: "IT Director — Retail México",
    initials: "SV",
  },
];

// ================================================================
// PAGE
// ================================================================
export default function CompareSentinelOnePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const socRef = useRef<HTMLDivElement>(null);
  const missingRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const migrationRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const tableInView = useInView(tableRef, { once: true, margin: "-60px" });
  const socInView = useInView(socRef, { once: true, margin: "-60px" });
  const missingInView = useInView(missingRef, { once: true, margin: "-60px" });
  const pricingInView = useInView(pricingRef, { once: true, margin: "-60px" });
  const featuresInView = useInView(featuresRef, { once: true, margin: "-60px" });
  const migrationInView = useInView(migrationRef, { once: true, margin: "-60px" });
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: "-60px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-60px" });

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <NavBar />

      {/* ── 1. HERO ── */}
      <section
        ref={heroRef}
        className="relative min-h-[60vh] flex flex-col justify-center items-center text-center px-6 pt-28 pb-20 overflow-hidden"
      >
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        {/* Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#0070F3] opacity-10 rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0070F3]/10 border border-[#0070F3]/30 text-[#0070F3] text-sm font-medium mb-6">
            Comparación directa
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-5 leading-tight">
            <span className="text-white">qatech360</span>{" "}
            <span className="text-[#A0A0A0]">vs</span>{" "}
            <span className="text-[#8B5CF6]">Sentine...</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#A0A0A0] mb-8 leading-relaxed">
            Detección autónoma + analistas humanos LATAM — lo mejor de ambos mundos
          </p>
          <p className="text-base text-[#666666] max-w-xl mx-auto mb-10">
            La plataforma autónoma tiene IA avanzada. Nosotros también — y además tenés un analista humano LATAM revisando cada alerta crítica, en tu idioma, en tu zona horaria, con contexto regional que ningún modelo global tiene.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/trial"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-[#0070F3] hover:bg-[#0050D0] text-white font-semibold transition-colors duration-200 shadow-[0_0_20px_rgba(0,112,243,0.3)]"
            >
              Iniciar prueba gratis — 14 días
              <ArrowRightIcon />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg border border-[#2A2A2A] hover:border-[#0070F3]/40 text-[#A0A0A0] hover:text-white font-semibold transition-all duration-200"
            >
              Ver precios
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── 2. COMPARISON TABLE ── */}
      <section ref={tableRef} className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={tableInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Comparación feature a feature</h2>
            <p className="text-[#A0A0A0] text-lg">Sin marketing, sin letra chica. Solo los hechos.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={tableInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="overflow-x-auto rounded-2xl border border-[#2A2A2A]"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#2A2A2A]">
                  <th className="text-left px-6 py-4 text-[#666666] font-medium w-1/3">Característica</th>
                  <th className="text-center px-6 py-4 w-1/3">
                    <span className="inline-flex items-center gap-2 text-[#0070F3] font-bold text-base">
                      <span className="w-2 h-2 rounded-full bg-[#0070F3] inline-block" />
                      qatech360
                    </span>
                  </th>
                  <th className="text-center px-6 py-4 w-1/3">
                    <span className="inline-flex items-center gap-2 text-[#8B5CF6] font-bold text-base">
                      <span className="w-2 h-2 rounded-full bg-[#8B5CF6] inline-block" />
                      Sentine...
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <motion.tr
                    key={row.feature}
                    initial={{ opacity: 0, x: -10 }}
                    animate={tableInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
                    className={`border-b border-[#2A2A2A] last:border-0 ${
                      i % 2 === 0 ? "bg-[#0A0A0A]" : "bg-[#111111]"
                    }`}
                  >
                    <td className="px-6 py-4 text-[#A0A0A0] font-medium">{row.feature}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center gap-2">
                        {row.both ? <BothIcon /> : <CheckIcon />}
                        <span className="text-white font-medium">{row.qa}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center gap-2">
                        {row.both ? (
                          <BothIcon />
                        ) : row.s1Good === false ? (
                          <XIcon />
                        ) : (
                          <CheckIcon />
                        )}
                        <span className="text-[#A0A0A0]">{row.s1}</span>
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ── 3. IA + HUMAN SOC ── */}
      <section ref={socRef} className="py-20 px-6 bg-[#111111] border-t border-b border-[#2A2A2A]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={socInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              IA automática + ojos humanos LATAM
            </h2>
            <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
              La plataforma autónoma confía en IA autónoma. Nosotros también — y le sumamos analistas reales en tu zona horaria.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SOC_ADVANTAGES.map((adv, i) => (
              <motion.div
                key={adv.title}
                initial={{ opacity: 0, y: 30 }}
                animate={socInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-2xl p-7 hover:border-[#0070F3]/30 transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1A1A1A] flex items-center justify-center mb-5 border border-[#2A2A2A]">
                  {adv.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{adv.title}</h3>
                <p className="text-[#A0A0A0] text-sm leading-relaxed">{adv.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Human SOC stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={socInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { value: "< 15 min", label: "SLA P1 respuesta humana" },
              { value: "24/7/365", label: "Cobertura SOC LATAM" },
              { value: "GMT-6/GMT-3", label: "Zonas horarias cubiertas" },
              { value: "Español", label: "Idioma de comunicación" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-5 text-center"
              >
                <div className="text-[#0070F3] font-bold text-xl mb-1">{stat.value}</div>
                <div className="text-[#666666] text-xs">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 4. WHAT SENTINELONE DOESN'T TELL YOU ── */}
      <section ref={missingRef} className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={missingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Lo que Sentine... no te dice
            </h2>
            <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
              Capacidades técnicas excelentes. Realidad operativa para LATAM — otra historia.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MISSING_FEATURES.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={missingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-6 flex gap-4 hover:border-[#FF3B3B]/20 transition-colors duration-300"
              >
                <div className="flex-shrink-0 mt-0.5">
                  <XIcon />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-[#A0A0A0] text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. PRICING COMPARISON ── */}
      <section ref={pricingRef} className="py-20 px-6 bg-[#111111] border-t border-b border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={pricingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ahorro significativo para LATAM
            </h2>
            <p className="text-[#A0A0A0] text-lg">Protección enterprise a precios accesibles para la región.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={pricingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <div className="bg-[#0A0A0A] border border-[#0070F3]/30 rounded-xl p-6 text-center">
              <div className="text-[#0070F3] font-bold text-lg mb-2">qatech360</div>
              <div className="text-[#00FF88] font-bold text-2xl mb-1">Consultar</div>
              <p className="text-[#666666] text-xs">Precios accesibles LATAM</p>
            </div>
            <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-6 text-center">
              <div className="text-[#8B5CF6] font-bold text-lg mb-2">Sentine... Core</div>
              <div className="text-[#A0A0A0] font-bold text-2xl mb-1">Cotización enterprise</div>
              <p className="text-[#666666] text-xs">Requiere proceso de ventas</p>
            </div>
            <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-6 text-center">
              <div className="text-[#6D28D9] font-bold text-lg mb-2">Sentine... Complete</div>
              <div className="text-[#A0A0A0] font-bold text-2xl mb-1">Cotización enterprise</div>
              <p className="text-[#666666] text-xs">Requiere proceso de ventas</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={pricingInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="p-5 bg-[#0A0A0A] rounded-xl border border-[#2A2A2A] text-center"
          >
            <p className="text-[#A0A0A0] text-sm mb-4">
              Las empresas que migran a qatech360 reportan un ahorro significativo en su inversión anual de ciberseguridad.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0070F3] hover:bg-[#0050D0] text-white font-semibold transition-colors duration-200 shadow-[0_0_20px_rgba(0,112,243,0.3)]"
            >
              Solicitar cotización personalizada
              <ArrowRightIcon />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 6. FEATURE DEEP-DIVE ── */}
      <section ref={featuresRef} className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              6 áreas donde qatech360 gana
            </h2>
            <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
              Más allá de la detección automática, estos son los diferenciadores que importan en LATAM.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "🌎",
                title: "Compliance LATAM nativo",
                description:
                  "NOM-151 (México), LGPD (Brasil) y Ley 1581 (Colombia) mapeados out of the box. Reportes de auditoría generados en un clic, en español.",
              },
              {
                icon: "💬",
                title: "SOC en español, tu zona horaria",
                description:
                  "Analistas en GMT-6 y GMT-3. Cuando hay un incidente a medianoche en CDMX o Bogotá, hay alguien despierto que habla tu idioma y entiende tu contexto.",
              },
              {
                icon: "⚡",
                title: "Onboarding en 15 minutos",
                description:
                  "Un script, un agente, protección activa. No días de configuración ni semanas de tuning. Nuestro equipo configura las reglas para tu entorno el primer día.",
              },
              {
                icon: "💰",
                title: "Precio fijo transparente",
                description:
                  "Sabés exactamente cuánto vas a pagar antes de hablar con nadie. Sin sorpresas, sin add-ons ocultos, facturación en tu moneda local.",
              },
              {
                icon: "🔍",
                title: "Feed de amenazas LATAM",
                description:
                  "Inteligencia de grupos activos en México, Colombia, Brasil, Argentina y Chile. Contexto regional que los feeds globales del competidor autónomo no cubren con la misma profundidad.",
              },
              {
                icon: "🧪",
                title: "Prueba gratuita real",
                description:
                  "14 días completos, todos los features, sin tarjeta de crédito, sin llamadas de ventas previas. Empezá a detectar amenazas hoy.",
              },
            ].map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 25 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-6 hover:border-[#0070F3]/30 transition-colors duration-300"
              >
                <div className="text-3xl mb-4">{feat.icon}</div>
                <h3 className="text-white font-bold text-base mb-2">{feat.title}</h3>
                <p className="text-[#A0A0A0] text-sm leading-relaxed">{feat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. MIGRATION ── */}
      <section ref={migrationRef} className="py-20 px-6 bg-[#111111] border-t border-b border-[#2A2A2A]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={migrationInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Migrá en 48 horas</h2>
            <p className="text-[#A0A0A0] text-lg">Sin downtime. Sin pérdida de cobertura. Nuestro equipo lo gestiona.</p>
          </motion.div>

          <div className="relative">
            {/* Connector line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#0070F3] via-[#00D4FF] to-transparent hidden md:block" />

            <div className="space-y-8">
              {MIGRATION_STEPS.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={migrationInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  className="flex gap-6 items-start"
                >
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-[#0070F3]/10 border border-[#0070F3]/30 flex flex-col items-center justify-center z-10">
                    <span className="text-[#0070F3] font-bold text-base leading-none">{step.step}</span>
                    <span className="text-[#0070F3]/60 text-xs mt-0.5">{step.time}</span>
                  </div>
                  <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-2xl p-6 flex-1 hover:border-[#0070F3]/30 transition-colors duration-300">
                    <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                    <p className="text-[#A0A0A0] text-sm leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={migrationInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-10 p-6 bg-[#0A0A0A] rounded-2xl border border-[#00FF88]/20 flex gap-4 items-start"
          >
            <div className="flex-shrink-0 mt-0.5">
              <ShieldCheckIcon />
            </div>
            <div>
              <p className="text-white font-semibold mb-1">Garantía de cobertura durante la migración</p>
              <p className="text-[#A0A0A0] text-sm">
                Si durante el proceso de migración detectamos cualquier gap de cobertura, pausamos el retiro del agente anterior hasta resolverlo. Tu seguridad nunca queda comprometida.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 8. TESTIMONIALS ── */}
      <section ref={testimonialsRef} className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Lo que dicen los equipos que migraron
            </h2>
            <p className="text-[#A0A0A0] text-lg">CISOs y directores IT de LATAM que eligieron qatech360.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-7 flex flex-col justify-between hover:border-[#0070F3]/30 transition-colors duration-300"
              >
                <div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, s) => (
                      <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="#FFB800" aria-hidden="true">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-[#A0A0A0] text-sm leading-relaxed italic mb-6">"{t.quote}"</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0070F3]/20 border border-[#0070F3]/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#0070F3] text-xs font-bold">{t.initials}</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-[#666666] text-xs">{t.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. FAQ ── */}
      <section className="py-20 px-6 bg-[#111111] border-t border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Preguntas frecuentes</h2>
          </motion.div>
          <div className="space-y-4">
            {[
              {
                q: "¿qatech360 tiene las mismas capacidades de IA que la plataforma autónoma?",
                a: "Tenemos detección automática de comportamiento, correlación cross-layer y respuesta activa automatizada — los casos de uso centrales de la plataforma autónoma. Sentine... tiene un LLM nativo que nosotros no replicamos. Para el 95% de empresas LATAM, nuestras capacidades de detección son equivalentes o superiores en contexto regional.",
              },
              {
                q: "¿Puedo probar qatech360 sin cancelar mi plataforma actual?",
                a: "Sí. La prueba gratuita de 14 días está diseñada para eso. Instalás el agente en un subconjunto de endpoints y comparás la detección y cobertura en paralelo antes de tomar ninguna decisión.",
              },
              {
                q: "¿Qué pasa con mis datos e histórico de la plataforma anterior?",
                a: "Los datos de tu plataforma anterior son tuyos. Podemos ayudarte a exportar logs históricos e importarlos a nuestro sistema de Log Management para mantener continuidad de evidencia para cumplimiento.",
              },
              {
                q: "¿La respuesta activa automatizada es igual de rápida que la del competidor?",
                a: "Sí. Nuestro módulo de Active Response ejecuta contramedidas en milisegundos: bloqueo de IP, cuarentena de archivos, terminación de procesos, aislamiento de endpoint. La diferencia es que además tenés un analista humano revisando el contexto.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-6"
              >
                <h3 className="text-white font-semibold mb-2">{item.q}</h3>
                <p className="text-[#A0A0A0] text-sm leading-relaxed">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. CTA ── */}
      <section ref={ctaRef} className="py-24 px-6 border-t border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/30 text-[#00FF88] text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
              Sin tarjeta de crédito requerida
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Prueba qatech360 gratis<br />
              <span className="text-[#0070F3]">14 días completos</span>
            </h2>
            <p className="text-[#A0A0A0] text-lg mb-10 max-w-xl mx-auto">
              IA automática + analistas humanos LATAM. Detección en tiempo real, soporte en español, precio transparente. Empezá hoy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/trial"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl bg-[#0070F3] hover:bg-[#0050D0] text-white font-bold text-lg transition-colors duration-200 shadow-[0_0_30px_rgba(0,112,243,0.4)]"
              >
                Iniciar prueba gratis
                <ArrowRightIcon />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl border border-[#2A2A2A] hover:border-[#0070F3]/40 text-[#A0A0A0] hover:text-white font-semibold transition-all duration-200"
              >
                Ver demo en vivo
              </Link>
            </div>
            <p className="text-[#666666] text-sm mt-6">
              ¿Preguntas sobre la migración?{" "}
              <Link href="/contact" className="text-[#0070F3] hover:text-[#00D4FF] transition-colors">
                Hablá con nuestro equipo
              </Link>
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
