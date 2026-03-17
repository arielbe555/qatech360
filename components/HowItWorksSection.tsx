"use client";

import { motion } from "framer-motion";
import { staggerContainerSlow, viewportOnce } from "@/lib/animations";

// ================================================================
// STEP DATA
// ================================================================
const STEPS = [
  {
    number: "01",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
        <path d="M7 8h10M7 12h5"/>
      </svg>
    ),
    title: "Conecta en 15 minutos",
    description:
      "Instale el agente ligero en sus endpoints o conecte mediante API. Sin servidores propios, sin configuraciones complejas. Compatible con Windows, macOS, Linux y los principales proveedores cloud.",
    color: "primary",
    detail: "Instalación silent | Zero-touch deployment | MDM compatible",
  },
  {
    number: "02",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35"/>
        <path d="M11 7v4l2 2"/>
      </svg>
    ),
    title: "IA detecta y analiza",
    description:
      "Nuestra IA de comportamiento analiza millones de eventos en tiempo real. Detecta amenazas conocidas Y desconocidas (zero-days) correlacionando señales de todos sus activos digitales.",
    color: "cyan",
    detail: "< 1 segundo de detección | 99.7% tasa de detección | 0.01% falsos positivos",
  },
  {
    number: "03",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10" strokeWidth="2"/>
      </svg>
    ),
    title: "Neutraliza automáticamente",
    description:
      "Los playbooks de respuesta automatizada contienen y eliminan amenazas en segundos. Su SOC 24/7 interviene cuando se requiere acción humana, con contexto completo del incidente.",
    color: "accent",
    detail: "MTTR < 12 min | Contención automática | Rollback de sistemas",
  },
];

// ================================================================
// COLOR MAP
// ================================================================
const colorMap = {
  primary: {
    text:       "text-[#0070F3]",
    bg:         "rgba(0, 112, 243, 0.1)",
    border:     "rgba(0, 112, 243, 0.2)",
    glow:       "rgba(0, 112, 243, 0.15)",
    number:     "text-[#0070F3]",
    connector:  "#0070F3",
    detailBg:   "rgba(0, 112, 243, 0.06)",
    detailBorder:"rgba(0, 112, 243, 0.15)",
  },
  cyan: {
    text:       "text-[#00D4FF]",
    bg:         "rgba(0, 212, 255, 0.08)",
    border:     "rgba(0, 212, 255, 0.2)",
    glow:       "rgba(0, 212, 255, 0.12)",
    number:     "text-[#00D4FF]",
    connector:  "#00D4FF",
    detailBg:   "rgba(0, 212, 255, 0.05)",
    detailBorder:"rgba(0, 212, 255, 0.15)",
  },
  accent: {
    text:       "text-[#00FF88]",
    bg:         "rgba(0, 255, 136, 0.07)",
    border:     "rgba(0, 255, 136, 0.18)",
    glow:       "rgba(0, 255, 136, 0.1)",
    number:     "text-[#00FF88]",
    connector:  "#00FF88",
    detailBg:   "rgba(0, 255, 136, 0.04)",
    detailBorder:"rgba(0, 255, 136, 0.12)",
  },
};

// ================================================================
// STEP CARD
// ================================================================
function StepCard({
  step,
  index,
  isLast,
}: {
  step: (typeof STEPS)[0];
  index: number;
  isLast: boolean;
}) {
  const c = colorMap[step.color as keyof typeof colorMap];

  return (
    <div className="relative flex flex-col items-center">
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: index * 0.15, ease: [0.19, 1, 0.22, 1] }}
        whileHover={{ y: -4 }}
        className="relative w-full rounded-2xl border p-7 bg-[#111827] overflow-hidden"
        style={{
          borderColor: c.border,
        }}
      >
        {/* Glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${c.glow} 0%, transparent 70%)`,
          }}
        />

        {/* Step number (large watermark) */}
        <div
          aria-hidden="true"
          className={`absolute top-4 right-6 text-7xl font-black opacity-[0.06] leading-none select-none ${c.number}`}
        >
          {step.number}
        </div>

        <div className="relative z-10">
          {/* Icon */}
          <div
            className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl border mb-5 ${c.text}`}
            style={{ background: c.bg, borderColor: c.border }}
          >
            {step.icon}
          </div>

          {/* Step indicator */}
          <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${c.text}`}>
            Paso {step.number}
          </p>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-3 leading-tight">
            {step.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-[#9CA3AF] leading-relaxed mb-5">
            {step.description}
          </p>

          {/* Technical detail */}
          <div
            className="text-xs font-mono text-[#6B7280] px-3 py-2 rounded-lg"
            style={{ background: c.detailBg, border: `1px solid ${c.detailBorder}` }}
          >
            {step.detail.split(" | ").map((detail, i) => (
              <span key={detail}>
                {i > 0 && <span className="mx-2 text-[#4B5563]">·</span>}
                <span>{detail}</span>
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Connector arrow (between cards, desktop) */}
      {!isLast && (
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.15 + 0.4, ease: "easeOut" }}
          aria-hidden="true"
          className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-[calc(100%+1px)] z-20 items-center"
          style={{ width: "calc(var(--gap, 1.5rem) + 2px)" }}
        >
          <div
            className="flex-1 h-px"
            style={{
              background: `linear-gradient(90deg, ${c.connector}, ${colorMap[STEPS[index + 1]?.color as keyof typeof colorMap]?.connector})`,
              opacity: 0.4,
            }}
          />
          <svg
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            style={{ color: colorMap[STEPS[index + 1]?.color as keyof typeof colorMap]?.connector, opacity: 0.5 }}
          >
            <polyline points="1 1 7 6 1 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      )}
    </div>
  );
}

// ================================================================
// HOW IT WORKS SECTION
// ================================================================
export function HowItWorksSection() {
  return (
    <section
      className="section-py relative bg-[#0A0A0A]"
      aria-labelledby="how-title"
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(0,212,255,0.12) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container-qatech relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          className="text-center mb-16"
        >
          <span className="badge badge-primary mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0070F3]" />
            Cómo Funciona
          </span>
          <h2 id="how-title" className="heading-1 text-white mt-4 mb-4">
            De 0 a protegido en{" "}
            <span className="text-gradient">tres pasos</span>
          </h2>
          <p className="body-lg text-[#9CA3AF] max-w-xl mx-auto">
            Sin servidores, sin configuraciones complejas, sin consultores caros.
            Nuestro proceso está diseñado para ser simple y rápido.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 [--gap:1.5rem]"
        >
          {STEPS.map((step, i) => (
            <StepCard
              key={step.number}
              step={step}
              index={i}
              isLast={i === STEPS.length - 1}
            />
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center items-center gap-8 mt-14 pt-10 border-t border-[rgba(55,65,81,0.3)]"
        >
          {[
            { value: "< 1 seg", label: "Tiempo de detección promedio" },
            { value: "12 min",  label: "MTTR promedio de respuesta" },
            { value: "99.7%",  label: "Tasa de detección de amenazas" },
          ].map((metric) => (
            <div key={metric.label} className="flex flex-col items-center text-center">
              <span className="text-2xl font-extrabold text-gradient tabular-nums">
                {metric.value}
              </span>
              <span className="text-xs text-[#6B7280] mt-1 max-w-[140px]">
                {metric.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
