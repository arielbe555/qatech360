"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonialSlide, viewportOnce } from "@/lib/animations";

// ================================================================
// TYPES
// ================================================================
interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  country: string;
  flag: string;
  avatar: string;
  rating: number;
  quote: string;
  highlight: string;
}

// ================================================================
// DATA
// ================================================================
const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Carlos Mendoza",
    role: "CISO",
    company: "Banco Nacional de Bolivia",
    country: "Bolivia",
    flag: "🇧🇴",
    avatar: "CM",
    rating: 5,
    quote: "qatech360 transformó completamente nuestra postura de seguridad. En los primeros 30 días detectaron y neutralizaron 3 intentos de intrusión avanzados que nuestras herramientas anteriores no habían detectado. El onboarding fue sorprendentemente rápido.",
    highlight: "3 intrusiones bloqueadas en el primer mes",
  },
  {
    id: 2,
    name: "Ana Paula Ferreira",
    role: "Head of IT Security",
    company: "TechCorp Brasil",
    country: "Brasil",
    flag: "🇧🇷",
    avatar: "AF",
    rating: 5,
    quote: "La diferencia con otras plataformas que evaluamos (incluyendo SentinelOne) es que qatech360 entiende el contexto LATAM. Sus analistas del SOC hablan español y portugués, conocen las regulaciones locales y el MTTR bajo de 4 horas a 12 minutos.",
    highlight: "MTTR reducido de 4h a 12 minutos",
  },
  {
    id: 3,
    name: "Diego Vásquez",
    role: "Director de Tecnología",
    company: "Grupo Retail México",
    country: "México",
    flag: "🇲🇽",
    avatar: "DV",
    rating: 5,
    quote: "Evaluamos 6 plataformas antes de elegir qatech360. El factor decisivo fue el precio-calidad y el soporte local. Para cumplir con PCI-DSS, su módulo de compliance automatizado nos ahorró meses de trabajo. ROI positivo en el primer trimestre.",
    highlight: "ROI positivo en el primer trimestre",
  },
  {
    id: 4,
    name: "Valentina Torres",
    role: "Security Manager",
    company: "Fintech Colombia",
    country: "Colombia",
    flag: "🇨🇴",
    avatar: "VT",
    rating: 5,
    quote: "Como fintech regulada, necesitábamos una solución que cumpliera con la SFC. qatech360 no solo cumple, sino que automatiza la generación de evidencias para auditorías. El equipo de implementación fue excepcional — sentimos que tenemos un CISO virtual dedicado.",
    highlight: "Cumplimiento SFC automatizado",
  },
  {
    id: 5,
    name: "Roberto Alvarado",
    role: "VP de Infraestructura",
    company: "Aerolíneas del Pacífico",
    country: "Perú",
    flag: "🇵🇪",
    avatar: "RA",
    rating: 5,
    quote: "Nuestra industria no permite interrupciones. El SLA de 99.9% de qatech360 no es solo papel — llevan 18 meses sin un solo minuto de downtime no planificado. Y cuando hay alertas críticas, la respuesta del SOC es inmediata, no en horas.",
    highlight: "18 meses sin downtime no planificado",
  },
];

// ================================================================
// STAR RATING
// ================================================================
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < rating ? "#FF6B00" : "none"}
          stroke={i < rating ? "#FF6B00" : "#4B5563"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  );
}

// ================================================================
// AVATAR
// ================================================================
function Avatar({ initials, color }: { initials: string; color: string }) {
  return (
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
      style={{
        background: `linear-gradient(135deg, ${color} 0%, ${color}99 100%)`,
      }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

const AVATAR_COLORS = ["#0070F3", "#00D4FF", "#00FF88", "#FF6B00", "#7B5EA7"];

// ================================================================
// TESTIMONIALS SECTION
// ================================================================
export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const total = TESTIMONIALS.length;

  const goTo = useCallback((index: number, dir: number) => {
    setDirection(dir);
    setCurrent(index);
  }, []);

  const next = useCallback(() => {
    goTo((current + 1) % total, 1);
  }, [current, total, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + total) % total, -1);
  }, [current, total, goTo]);

  // Auto-play
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, paused]);

  const testimonial = TESTIMONIALS[current];

  return (
    <section
      className="section-py relative bg-[#0A0A0A] overflow-hidden"
      aria-labelledby="testimonials-title"
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(0,112,243,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="container-qatech relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="badge badge-accent mb-4">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#00FF88" stroke="none" aria-hidden="true">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            Clientes Reales, Resultados Reales
          </span>
          <h2 id="testimonials-title" className="heading-1 text-white mt-4 mb-4">
            Lo que dicen los CISOs{" "}
            <span className="text-gradient">de LATAM</span>
          </h2>
          <p className="body-lg text-[#9CA3AF] max-w-xl mx-auto">
            Más de 50 empresas en 8 países confían en qatech360 para proteger sus activos digitales.
          </p>
        </motion.div>

        {/* Testimonial carousel */}
        <div
          className="max-w-3xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Main card */}
          <div className="relative h-auto">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={testimonialSlide}
                initial="enter"
                animate="center"
                exit="exit"
                className="relative rounded-2xl border border-[rgba(55,65,81,0.6)] bg-[#111827] p-8"
              >
                {/* Gradient border top */}
                <div
                  aria-hidden="true"
                  className="absolute top-0 left-8 right-8 h-px"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(0,112,243,0.5), rgba(0,212,255,0.4), transparent)",
                  }}
                />

                {/* Quote icon */}
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="rgba(0,112,243,0.3)"
                  aria-hidden="true"
                  className="mb-4"
                >
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
                </svg>

                {/* Highlight badge */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[rgba(0,255,136,0.08)] border border-[rgba(0,255,136,0.2)] mb-5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse flex-shrink-0" />
                  <span className="text-xs font-semibold text-[#00FF88]">
                    {testimonial.highlight}
                  </span>
                </motion.div>

                {/* Quote */}
                <blockquote>
                  <p className="text-[#D1D5DB] text-base leading-relaxed mb-6 italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <Avatar
                      initials={testimonial.avatar}
                      color={AVATAR_COLORS[testimonial.id % AVATAR_COLORS.length]}
                    />
                    <div>
                      <p className="text-sm font-bold text-white">{testimonial.name}</p>
                      <p className="text-xs text-[#9CA3AF]">
                        {testimonial.role} · {testimonial.company}
                      </p>
                      <p className="text-xs text-[#6B7280] mt-0.5">
                        {testimonial.flag} {testimonial.country}
                      </p>
                    </div>
                  </div>
                  <StarRating rating={testimonial.rating} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex gap-2" role="tablist" aria-label="Testimonios">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, i > current ? 1 : -1)}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Testimonio ${i + 1}`}
                  className="h-1.5 rounded-full transition-all duration-300 focus-ring"
                  style={{
                    width: i === current ? "24px" : "6px",
                    background: i === current
                      ? "linear-gradient(90deg, #0070F3, #00D4FF)"
                      : "rgba(55, 65, 81, 0.8)",
                  }}
                />
              ))}
            </div>

            {/* Arrow buttons */}
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={prev}
                aria-label="Testimonio anterior"
                className="w-10 h-10 rounded-xl border border-[rgba(55,65,81,0.6)] bg-[rgba(31,41,55,0.5)] flex items-center justify-center text-[#9CA3AF] hover:text-white hover:border-[rgba(0,112,243,0.4)] hover:bg-[rgba(0,112,243,0.1)] transition-colors focus-ring"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={next}
                aria-label="Siguiente testimonio"
                className="w-10 h-10 rounded-xl border border-[rgba(55,65,81,0.6)] bg-[rgba(31,41,55,0.5)] flex items-center justify-center text-[#9CA3AF] hover:text-white hover:border-[rgba(0,112,243,0.4)] hover:bg-[rgba(0,112,243,0.1)] transition-colors focus-ring"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Avatar strip — all clients */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center gap-4 mt-16"
        >
          <div className="flex -space-x-2">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.id}
                className="w-9 h-9 rounded-full border-2 border-[#0A0A0A] flex items-center justify-center text-xs font-bold text-white"
                style={{
                  background: `linear-gradient(135deg, ${AVATAR_COLORS[i % AVATAR_COLORS.length]}, ${AVATAR_COLORS[(i + 1) % AVATAR_COLORS.length]}99)`,
                  zIndex: TESTIMONIALS.length - i,
                }}
                title={t.name}
                aria-hidden="true"
              >
                {t.avatar}
              </div>
            ))}
            <div
              className="w-9 h-9 rounded-full border-2 border-[#0A0A0A] bg-[#1F2937] flex items-center justify-center text-[10px] font-bold text-[#9CA3AF]"
              aria-hidden="true"
            >
              +45
            </div>
          </div>
          <p className="text-xs text-[#6B7280] text-center">
            <span className="text-[#9CA3AF] font-medium">50+ empresas</span> en{" "}
            <span className="text-[#9CA3AF] font-medium">8 países</span> de LATAM confían en qatech360
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
