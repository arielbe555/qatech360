"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { statsContainer, statItem, viewportOnce } from "@/lib/animations";

// ================================================================
// COUNT-UP HOOK
// ================================================================
function useCountUp(target: number, duration = 1800, startAnimation: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!startAnimation) return;

    const startTime = performance.now();

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      setValue(Math.round(easedProgress * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration, startAnimation]);

  return value;
}

// ================================================================
// STAT TYPES
// ================================================================
export interface StatItem {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  description?: string;
  color?: "primary" | "cyan" | "accent" | "warning";
  icon?: React.ReactNode;
  isDecimal?: boolean; // for 99.9%
  decimalValue?: string; // literal string like "99.9"
}

// ================================================================
// SINGLE STAT CARD
// ================================================================
function StatCard({
  stat,
  startAnimation,
  index,
}: {
  stat: StatItem;
  startAnimation: boolean;
  index: number;
}) {
  const count = useCountUp(stat.isDecimal ? 0 : stat.value, 1800, startAnimation);

  const colorMap = {
    primary: {
      text:       "text-[#0070F3]",
      glow:       "rgba(0, 112, 243, 0.3)",
      bg:         "rgba(0, 112, 243, 0.06)",
      border:     "rgba(0, 112, 243, 0.15)",
      iconBg:     "rgba(0, 112, 243, 0.12)",
      iconBorder: "rgba(0, 112, 243, 0.2)",
      iconColor:  "#0070F3",
      divider:    "#0070F3",
    },
    cyan: {
      text:       "text-[#00D4FF]",
      glow:       "rgba(0, 212, 255, 0.3)",
      bg:         "rgba(0, 212, 255, 0.05)",
      border:     "rgba(0, 212, 255, 0.15)",
      iconBg:     "rgba(0, 212, 255, 0.1)",
      iconBorder: "rgba(0, 212, 255, 0.2)",
      iconColor:  "#00D4FF",
      divider:    "#00D4FF",
    },
    accent: {
      text:       "text-[#00FF88]",
      glow:       "rgba(0, 255, 136, 0.25)",
      bg:         "rgba(0, 255, 136, 0.05)",
      border:     "rgba(0, 255, 136, 0.12)",
      iconBg:     "rgba(0, 255, 136, 0.08)",
      iconBorder: "rgba(0, 255, 136, 0.15)",
      iconColor:  "#00FF88",
      divider:    "#00FF88",
    },
    warning: {
      text:       "text-[#FF6B00]",
      glow:       "rgba(255, 107, 0, 0.25)",
      bg:         "rgba(255, 107, 0, 0.05)",
      border:     "rgba(255, 107, 0, 0.12)",
      iconBg:     "rgba(255, 107, 0, 0.08)",
      iconBorder: "rgba(255, 107, 0, 0.15)",
      iconColor:  "#FF6B00",
      divider:    "#FF6B00",
    },
  };

  const c = colorMap[stat.color ?? "primary"];

  return (
    <motion.div
      variants={statItem}
      className="relative flex flex-col items-center text-center rounded-2xl border p-6 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${c.bg} 0%, rgba(17, 24, 39, 0.8) 100%)`,
        borderColor: c.border,
      }}
      whileHover={{
        y: -4,
        boxShadow: `0 20px 40px -12px rgba(0,0,0,0.5), 0 0 30px ${c.glow}`,
        borderColor: c.border.replace("0.15", "0.35"),
        transition: { duration: 0.25, ease: "easeOut" },
      }}
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 0%, ${c.glow.replace("0.3", "0.08")} 0%, transparent 70%)`,
        }}
      />

      {/* Icon */}
      {stat.icon && (
        <div
          className="relative flex items-center justify-center w-12 h-12 rounded-xl border mb-4"
          style={{
            background: c.iconBg,
            borderColor: c.iconBorder,
            color: c.iconColor,
          }}
        >
          {stat.icon}
        </div>
      )}

      {/* Value */}
      <div className="relative flex items-baseline justify-center gap-0.5 mb-1">
        {stat.prefix && (
          <span className={`text-2xl font-extrabold tabular-nums ${c.text}`}>
            {stat.prefix}
          </span>
        )}
        <motion.span
          className={`text-5xl font-extrabold tabular-nums leading-none ${c.text}`}
          style={{
            textShadow: `0 0 30px ${c.glow}`,
          }}
        >
          {stat.isDecimal ? (startAnimation ? stat.decimalValue : "0") : count.toLocaleString()}
        </motion.span>
        {stat.suffix && (
          <span className={`text-2xl font-extrabold tabular-nums ${c.text}`}>
            {stat.suffix}
          </span>
        )}
      </div>

      {/* Label */}
      <p className="text-sm font-semibold text-white mt-2">{stat.label}</p>

      {/* Description */}
      {stat.description && (
        <p className="text-xs text-[#6B7280] mt-1.5 leading-relaxed">
          {stat.description}
        </p>
      )}

      {/* Bottom divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={startAnimation ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1, delay: index * 0.1 + 0.5, ease: "easeOut" }}
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${c.divider}, transparent)`,
          transformOrigin: "left",
        }}
        aria-hidden="true"
      />
    </motion.div>
  );
}

// ================================================================
// STATS DATA
// ================================================================
const STATS: StatItem[] = [
  {
    value: 15,
    suffix: " min",
    label: "Onboarding Express",
    description: "De cero a protección total en 15 minutos. Sin servidores, sin configuraciones complejas.",
    color: "cyan",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    value: 999, // shown as 99.9
    suffix: "%",
    label: "Uptime Garantizado",
    description: "SLA de 99.9% de disponibilidad respaldado contractualmente con créditos automáticos.",
    color: "accent",
    isDecimal: true,
    decimalValue: "99.9",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
  {
    value: 247,
    suffix: "+",
    label: "Amenazas Bloqueadas / Día",
    description: "Promedio diario de amenazas neutralizadas automáticamente antes del impacto.",
    color: "warning",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    value: 50,
    suffix: "+",
    label: "Empresas Protegidas",
    description: "Líderes de LATAM confían en qatech360 para proteger sus activos digitales más críticos.",
    color: "primary",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
];

// ================================================================
// STATS COUNTER SECTION
// ================================================================
export function StatsCounter() {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative section-py overflow-hidden"
      aria-labelledby="stats-title"
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,112,243,0.04) 0%, rgba(0,212,255,0.02) 50%, transparent 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid opacity-20 pointer-events-none"
      />

      {/* Scan line */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(0,112,243,0.4), rgba(0,212,255,0.3), transparent)",
          top: 0,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(0,112,243,0.4), rgba(0,212,255,0.3), transparent)",
          bottom: 0,
        }}
      />

      <div className="container-qatech relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
          className="text-center mb-14"
        >
          <span className="badge badge-accent mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
            Métricas en Tiempo Real
          </span>
          <h2 id="stats-title" className="heading-1 text-white mt-4">
            Resultados que{" "}
            <span className="text-gradient">hablan por sí solos</span>
          </h2>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          variants={statsContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {STATS.map((stat, i) => (
            <StatCard
              key={stat.label}
              stat={stat}
              startAnimation={started}
              index={i}
            />
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ delay: 0.6 }}
          className="text-center text-xs text-[#6B7280] mt-8"
        >
          * Métricas basadas en datos agregados de todos los clientes activos. Actualización: Marzo 2026.
        </motion.p>
      </div>
    </section>
  );
}

export default StatsCounter;
