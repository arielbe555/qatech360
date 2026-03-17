"use client";

import { useRef, useState, useEffect } from "react";
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

const ShieldIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0070F3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const ClockIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00D4FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const TagIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00FF88" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A0A0A0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

// ================================================================
// DATA
// ================================================================
const COMPARISON_ROWS = [
  { feature: "Idioma principal", qa: "Español nativo", cs: "Inglés", qaGood: true, csGood: false },
  { feature: "Mercado objetivo", qa: "LATAM", cs: "Global (USA-first)", qaGood: true, csGood: false },
  { feature: "Precio transparente", qa: "Sí, desde $149/mes", cs: "No (requiere llamada de ventas)", qaGood: true, csGood: false },
  { feature: "Onboarding", qa: "15 minutos", cs: "Días / semanas", qaGood: true, csGood: false },
  { feature: "Open source core", qa: "Wazuh", cs: "Propietario", qaGood: true, csGood: false },
  { feature: "SOC en zona horaria LATAM", qa: "✅", cs: "❌", qaGood: true, csGood: false },
  { feature: "Cumplimiento NOM-151 / LGPD", qa: "✅", cs: "❌", qaGood: true, csGood: false },
  { feature: "Prueba gratuita sin tarjeta", qa: "14 días", cs: "No", qaGood: true, csGood: false },
  { feature: "Precio inicial (USD/mes)", qa: "$149 / mes", cs: "~$8.99 / endpoint / mes", qaGood: true, csGood: false },
  { feature: "SLA P1", qa: "15 minutos", cs: "Varía", qaGood: true, csGood: null },
];

const REASONS = [
  {
    icon: <ShieldIcon />,
    title: "Protección sin sacrificar el idioma",
    description:
      "Todos los dashboards, alertas, playbooks y reportes ejecutivos están en español LATAM. Nuestro equipo SOC se comunica contigo en tu idioma — no en inglés técnico con traductor automático.",
  },
  {
    icon: <ClockIcon />,
    title: "Operacional en 15 minutos, no en 15 días",
    description:
      "CrowdStrike requiere un equipo de ingeniería para el deployment y ajuste inicial. Con qatech360, instalas un agente ligero, y el sistema empieza a detectar amenazas de inmediato, sin configuración compleja.",
  },
  {
    icon: <TagIcon />,
    title: "El precio que ves es el precio que pagas",
    description:
      "Sin llamadas de ventas para obtener una cotización. Sin sorpresas en la factura. $149/mes para 25 endpoints, $399/mes para 100. Facturación disponible en MXN, BRL, COP, ARS y CLP.",
  },
];

const MIGRATION_STEPS = [
  {
    step: "01",
    title: "Instala el agente qatech360 en paralelo",
    description:
      "Descarga e instala el agente qatech360 en tus endpoints mientras CrowdStrike sigue corriendo. No hay downtime ni conflictos — ambos agentes coexisten sin problemas durante la migración.",
  },
  {
    step: "02",
    title: "Valida cobertura durante 7 días",
    description:
      "Nuestro equipo de onboarding revisa con vos que todas las fuentes de datos estén correctamente integradas: endpoints, cloud, red, SaaS. Configuramos las reglas de detección adaptadas a tu entorno.",
  },
  {
    step: "03",
    title: "Remueve CrowdStrike y activa protección completa",
    description:
      "Una vez validado, desinstalás el agente CrowdStrike. Nuestro SOC activa la cobertura 24/7 completa. Tiempo total del proceso: menos de 48 horas sin interrupciones operativas.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Pagábamos más de $14,000 USD al año por CrowdStrike para 80 endpoints, en inglés, con soporte que tardaba horas. Con qatech360 pagamos $400/mes, todo en español, y cuando tuvimos un incidente a las 2am un analista mexicano nos llamó en 8 minutos.",
    name: "Carlos Méndez",
    title: "CTO — FinTech México",
    initials: "CM",
  },
  {
    quote:
      "La migración desde CrowdStrike tomó dos días. No un mes, dos días. El equipo de qatech360 hizo todo el trabajo pesado y el dashboard en español es infinitamente más útil para presentarle al directorio.",
    name: "Ana Salcedo",
    title: "CISO — Retail Colombia",
    initials: "AS",
  },
  {
    quote:
      "Lo que me convenció fue la transparencia de precios. Con CrowdStrike nunca sabíamos cuánto íbamos a pagar el mes siguiente. qatech360 es precio fijo, en pesos colombianos si querés, sin letra chica.",
    name: "Diego Rojas",
    title: "IT Manager — Manufactura Colombia",
    initials: "DR",
  },
];

// ================================================================
// ANIMATED COUNTER
// ================================================================
function AnimatedBar({ value, max, color, label }: { value: number; max: number; color: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-white font-medium">{label}</span>
        <span style={{ color }} className="font-bold">${value.toLocaleString()}</span>
      </div>
      <div className="h-8 bg-[#1A1A1A] rounded-lg overflow-hidden border border-[#2A2A2A]">
        <motion.div
          className="h-full rounded-lg flex items-center pl-3 text-xs font-bold text-white"
          style={{ backgroundColor: color, width: inView ? `${(value / max) * 100}%` : "0%" }}
          initial={{ width: "0%" }}
          animate={inView ? { width: `${(value / max) * 100}%` } : { width: "0%" }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        >
          {inView && `$${value.toLocaleString()}/año`}
        </motion.div>
      </div>
    </div>
  );
}

// ================================================================
// PAGE
// ================================================================
export default function CompareCrowdstrikePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const reasonsRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<HTMLDivElement>(null);
  const migrationRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const tableInView = useInView(tableRef, { once: true, margin: "-60px" });
  const reasonsInView = useInView(reasonsRef, { once: true, margin: "-60px" });
  const contextInView = useInView(contextRef, { once: true, margin: "-60px" });
  const migrationInView = useInView(migrationRef, { once: true, margin: "-60px" });
  const pricingInView = useInView(pricingRef, { once: true, margin: "-60px" });
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: "-60px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-60px" });

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <NavBar />

      {/* ── 1. HERO ── */}
      <section ref={heroRef} className="relative min-h-[60vh] flex flex-col justify-center items-center text-center px-6 pt-28 pb-20 overflow-hidden">
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
            <span className="text-[#FF3B3B]">CrowdStrike</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#A0A0A0] mb-8 leading-relaxed">
            Protección de nivel Fortune 500 — sin el precio Fortune 500
          </p>
          <p className="text-base text-[#666666] max-w-xl mx-auto mb-10">
            CrowdStrike es una plataforma excelente diseñada para corporaciones globales con equipos de seguridad dedicados. Si tu empresa opera en LATAM y busca protección en español, precio transparente y onboarding rápido — hay una mejor opción.
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
                    <span className="inline-flex items-center gap-2 text-[#FF3B3B] font-bold text-base">
                      <span className="w-2 h-2 rounded-full bg-[#FF3B3B] inline-block" />
                      CrowdStrike
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
                    className={`border-b border-[#2A2A2A] last:border-0 ${i % 2 === 0 ? "bg-[#0A0A0A]" : "bg-[#111111]"}`}
                  >
                    <td className="px-6 py-4 text-[#A0A0A0] font-medium">{row.feature}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center gap-2">
                        {row.qaGood && <CheckIcon />}
                        <span className="text-white font-medium">{row.qa}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center gap-2">
                        {row.csGood === false && <XIcon />}
                        <span className="text-[#A0A0A0]">{row.cs}</span>
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ── 3. REASONS ── */}
      <section ref={reasonsRef} className="py-20 px-6 bg-[#111111] border-t border-b border-[#2A2A2A]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={reasonsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Por qué las empresas LATAM eligen qatech360?
            </h2>
            <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
              No es que CrowdStrike sea malo. Es que no fue construido para vos.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REASONS.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 30 }}
                animate={reasonsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-2xl p-7 hover:border-[#0070F3]/30 transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1A1A1A] flex items-center justify-center mb-5 border border-[#2A2A2A]">
                  {r.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{r.title}</h3>
                <p className="text-[#A0A0A0] text-sm leading-relaxed">{r.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. HONEST CONTEXT ── */}
      <section ref={contextRef} className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={contextInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#0070F3] to-[#00D4FF] rounded-l-2xl" />
              <div className="pl-4">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  "CrowdStrike es excelente... si tenés un equipo de 10 ingenieros de seguridad y $100k de presupuesto."
                </h2>
                <div className="space-y-4 text-[#A0A0A0] leading-relaxed">
                  <p>
                    CrowdStrike Falcon es una de las plataformas de ciberseguridad más avanzadas del mundo. Fue construida para las Fortune 500 de Estados Unidos, con equipos de security operations completos y presupuestos de siete cifras.
                  </p>
                  <p>
                    Para una empresa mediana en México, Colombia o Brasil — con un equipo de IT de 3 personas, regulaciones locales específicas y soporte que necesita ser en español — CrowdStrike es un Ferrari para quien necesita una camioneta todoterreno confiable.
                  </p>
                  <p>
                    <strong className="text-white">Nosotros hacemos lo mismo, gestionado, en español, desde $149/mes.</strong> Y no necesitás un equipo dedicado de seguridad para operarlo — el nuestro lo hace por vos.
                  </p>
                </div>
                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { label: "Precio inicial", qa: "$149/mes", cs: "~$1,080/mes*" },
                    { label: "Onboarding", qa: "15 minutos", cs: "2–4 semanas" },
                    { label: "Idioma SOC", qa: "Español", cs: "Inglés" },
                    { label: "NOM-151 / LGPD", qa: "Incluido", cs: "No disponible" },
                  ].map((item) => (
                    <div key={item.label} className="text-center">
                      <div className="text-[#666666] text-xs uppercase tracking-wider mb-2">{item.label}</div>
                      <div className="text-[#00FF88] font-bold text-sm">{item.qa}</div>
                      <div className="text-[#666666] text-xs line-through mt-1">{item.cs}</div>
                    </div>
                  ))}
                </div>
                <p className="text-[#666666] text-xs mt-4">* Estimado para 120 endpoints al precio de lista CrowdStrike Falcon Go.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 5. PRICING COMPARISON VISUAL ── */}
      <section ref={pricingRef} className="py-20 px-6 bg-[#111111] border-t border-b border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={pricingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Costo anual — 100 endpoints
            </h2>
            <p className="text-[#A0A0A0] text-lg">Comparación de costo total para 100 endpoints, facturación anual.</p>
          </motion.div>

          <div className="space-y-5">
            <AnimatedBar value={3990} max={14000} color="#0070F3" label="qatech360 Professional (anual)" />
            <AnimatedBar value={10788} max={14000} color="#FF3B3B" label="CrowdStrike Falcon Go (estimado)" />
            <AnimatedBar value={13200} max={14000} color="#FF6B00" label="CrowdStrike Falcon Pro (estimado)" />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={pricingInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 p-5 bg-[#0A0A0A] rounded-xl border border-[#2A2A2A] text-center"
          >
            <p className="text-[#A0A0A0] text-sm">
              Ahorro promedio al migrar a qatech360 Professional:{" "}
              <span className="text-[#00FF88] font-bold text-lg">$6,798 USD / año</span>
            </p>
            <p className="text-[#666666] text-xs mt-2">
              Precios CrowdStrike son estimados de lista pública. El costo real puede variar según el contrato negociado.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 6. MIGRATION GUIDE ── */}
      <section ref={migrationRef} className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={migrationInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Migra desde CrowdStrike en 48 horas
            </h2>
            <p className="text-[#A0A0A0] text-lg">Sin downtime. Sin pérdida de cobertura. Nuestro equipo lo hace por vos.</p>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
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
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-[#0070F3]/10 border border-[#0070F3]/30 flex items-center justify-center z-10">
                    <span className="text-[#0070F3] font-bold text-lg">{step.step}</span>
                  </div>
                  <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-6 flex-1 hover:border-[#0070F3]/30 transition-colors duration-300">
                    <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                    <p className="text-[#A0A0A0] text-sm leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. TESTIMONIALS ── */}
      <section ref={testimonialsRef} className="py-20 px-6 bg-[#111111] border-t border-b border-[#2A2A2A]">
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
            <p className="text-[#A0A0A0] text-lg">CTOs y CISOs de LATAM que tomaron la decisión.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-2xl p-7 flex flex-col justify-between hover:border-[#0070F3]/30 transition-colors duration-300"
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

      {/* ── 8. FAQ ── */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Preguntas frecuentes sobre la migración</h2>
          </motion.div>
          <div className="space-y-4">
            {[
              {
                q: "¿Pierdo cobertura durante la migración?",
                a: "No. El proceso de migración tiene una fase de coexistencia donde ambos agentes corren en paralelo. Sólo retirás CrowdStrike una vez que validamos que qatech360 tiene cobertura completa.",
              },
              {
                q: "¿qatech360 tiene las mismas capacidades que CrowdStrike Falcon?",
                a: "Cubrimos los casos de uso críticos: EDR, SIEM, XDR, Vulnerability Management, Cloud Security y Compliance. CrowdStrike tiene capacidades adicionales de IA propietaria — pero para el 95% de empresas LATAM, qatech360 ofrece protección suficiente con mejor soporte local.",
              },
              {
                q: "¿Qué pasa con mis datos históricos de CrowdStrike?",
                a: "Los logs históricos de CrowdStrike pertenecen a tu organización. Podemos ayudarte a exportarlos y, si querés, importarlos al sistema de Log Management de qatech360 para mantener continuidad de evidencia.",
              },
              {
                q: "¿Puedo probar qatech360 sin cancelar CrowdStrike?",
                a: "Sí. La prueba gratuita de 14 días está diseñada exactamente para eso. Instalás el agente en un subconjunto de endpoints y comparás resultados antes de tomar ninguna decisión.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-6"
              >
                <h3 className="text-white font-semibold mb-2">{item.q}</h3>
                <p className="text-[#A0A0A0] text-sm leading-relaxed">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. CTA ── */}
      <section ref={ctaRef} className="py-24 px-6 bg-[#111111] border-t border-[#2A2A2A]">
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
              Instalá el agente en tus endpoints y empezá a detectar amenazas en 15 minutos. Sin compromiso, sin tarjeta de crédito.
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
