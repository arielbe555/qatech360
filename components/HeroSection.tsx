"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  heroContainer,
  heroBadge,
  heroTitle,
  heroSubtitle,
  heroCtas,
  heroStats,
} from "@/lib/animations";
import { ThreatMapBackground } from "./ThreatMapBackground";

// ================================================================
// ANIMATED COUNTER HOOK
// ================================================================
function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(easeOutQuart(progress) * target));
      if (progress < 1) requestAnimationFrame(tick);
      else setCount(target);
    };

    requestAnimationFrame(tick);
  }, [target, duration, start]);

  return count;
}

// ================================================================
// LIVE THREAT COUNTER
// ================================================================
function LiveThreatCounter() {
  const [count, setCount] = useState(247);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const increment = Math.floor(Math.random() * 3) + 1;
      setCount((c) => c + increment);
      setFlash(true);
      setTimeout(() => setFlash(false), 300);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl border border-[rgba(255,51,102,0.25)] bg-[rgba(255,51,102,0.08)] backdrop-blur-sm"
    >
      {/* Live indicator */}
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF3366] opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF3366]" />
      </span>
      <span className="text-sm font-medium text-[#9CA3AF]">
        Amenazas bloqueadas hoy:
      </span>
      <motion.span
        key={count}
        animate={flash ? { scale: [1, 1.2, 1], color: ["#FF3366", "#FF3366", "#FF6B00"] } : {}}
        transition={{ duration: 0.3 }}
        className="text-sm font-bold tabular-nums text-[#FF3366]"
        style={{ minWidth: "3ch", display: "inline-block", textAlign: "right" }}
      >
        {count.toLocaleString()}
      </motion.span>
    </motion.div>
  );
}

// ================================================================
// HERO STAT ITEM
// ================================================================
interface HeroStatProps {
  value: string;
  label: string;
  suffix?: string;
  color?: "primary" | "cyan" | "accent";
}

function HeroStat({ value, label, suffix = "", color = "primary" }: HeroStatProps) {
  const colorMap = {
    primary: "text-[#0070F3]",
    cyan:    "text-[#00D4FF]",
    accent:  "text-[#00FF88]",
  };

  return (
    <div className="flex flex-col items-center gap-1 px-6 py-4 rounded-xl border border-[rgba(55,65,81,0.6)] bg-[rgba(17,24,39,0.6)] backdrop-blur-sm min-w-[100px]">
      <span className={`text-2xl font-extrabold tabular-nums ${colorMap[color]}`}>
        {value}{suffix}
      </span>
      <span className="text-xs font-medium text-[#6B7280] text-center leading-tight">{label}</span>
    </div>
  );
}

// ================================================================
// HERO SECTION
// ================================================================
export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 60]);

  // Trigger counter animation after mount
  useEffect(() => {
    const timer = setTimeout(() => setStatsVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0A0A0A]"
      aria-label="Hero — qatech360 Plataforma de Ciberseguridad"
    >
      {/* ── Background layers ── */}

      {/* Threat map canvas */}
      <ThreatMapBackground
        className="absolute inset-0 w-full h-full"
        nodeCount={70}
        connectionDistance={180}
        threatFrequency={1800}
      />

      {/* Shield watermark — floating behind hero content */}
      <motion.div
        aria-hidden="true"
        className="absolute right-[-5%] top-[5%] w-[55vw] max-w-[700px] pointer-events-none select-none"
        animate={{ y: [0, -18, 0], opacity: [0.07, 0.12, 0.07] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/images/backgrounds/shield.png"
          alt=""
          width={700}
          height={420}
          className="w-full h-auto"
          style={{
            mixBlendMode: "screen",
            filter: "saturate(0.6) brightness(0.5)",
          }}
          priority
        />
      </motion.div>

      {/* Radial glow top */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 55% at 50% -5%, rgba(0,112,243,0.28) 0%, transparent 65%), " +
            "radial-gradient(ellipse 45% 35% at 80% 15%, rgba(0,212,255,0.12) 0%, transparent 55%)",
        }}
      />

      {/* Grid pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid opacity-40"
      />

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: "linear-gradient(to top, #0A0A0A 0%, transparent 100%)",
        }}
      />

      {/* ── Content ── */}
      <motion.div
        className="relative z-10 container-qatech text-center flex flex-col items-center gap-8 pt-24 pb-20"
        style={{ opacity, y }}
        variants={heroContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Live badge */}
        <motion.div variants={heroBadge}>
          <LiveThreatCounter />
        </motion.div>

        {/* Eyebrow */}
        <motion.div variants={heroBadge} className="-mt-2">
          <span className="badge badge-primary text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0070F3] animate-pulse" />
            Plataforma de Ciberseguridad para LATAM
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          variants={heroTitle}
          className="heading-display text-white max-w-4xl px-4"
        >
          Proteja su empresa con{" "}
          <span className="text-gradient-animated">
            IA de próxima generación
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={heroSubtitle}
          className="body-lg text-[#9CA3AF] max-w-2xl px-4"
        >
          qatech360 detecta, analiza y neutraliza amenazas cibernéticas en{" "}
          <strong className="text-white font-semibold">tiempo real</strong> —
          antes de que afecten su negocio. Onboarding en{" "}
          <strong className="text-[#00D4FF] font-semibold">15 minutos</strong>,
          protección de nivel enterprise desde el día 1.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={heroCtas}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/trial"
              className="btn-primary text-base px-8 py-4 rounded-xl"
              style={{ fontSize: "1rem" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              Prueba Gratis 15 Días
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/demo"
              className="btn-secondary text-base px-8 py-4 rounded-xl"
              style={{ fontSize: "1rem" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/>
                <polygon points="10,8 16,12 10,16 10,8"/>
              </svg>
              Ver Demo en Vivo
            </Link>
          </motion.div>
        </motion.div>

        {/* Trust signals */}
        <motion.p variants={heroSubtitle} className="text-xs text-[#6B7280]">
          Sin tarjeta de crédito · Configuración en minutos · Cancela cuando quieras
        </motion.p>

        {/* Stats row */}
        <motion.div
          variants={heroStats}
          className="flex flex-wrap justify-center gap-3 mt-4"
        >
          <HeroStat value="15min" label="Onboarding" color="cyan" />
          <HeroStat value="99.9%" label="Uptime SLA" color="accent" />
          <HeroStat value="50+" label="Clientes activos" color="primary" />
          <HeroStat value="< 1s" label="Detección" color="cyan" />
        </motion.div>

        {/* Dashboard screenshot — producto real */}
        <motion.div
          variants={heroStats}
          className="relative w-full max-w-4xl mt-4"
        >
          {/* Outer glow frame */}
          <div
            className="absolute -inset-[1px] rounded-2xl pointer-events-none"
            style={{
              background: "linear-gradient(135deg, rgba(0,112,243,0.6) 0%, rgba(0,212,255,0.4) 50%, rgba(0,255,136,0.2) 100%)",
            }}
          />
          {/* Screenshot */}
          <Image
            src="/images/screenshots/dashboard.png"
            alt="Panel de Seguridad SOC de qatech360 — alertas críticas, agentes activos y amenazas bloqueadas en tiempo real"
            width={1200}
            height={740}
            className="relative rounded-2xl w-full h-auto"
            style={{
              boxShadow: "0 0 80px rgba(0,112,243,0.45), 0 0 160px rgba(0,212,255,0.15), 0 40px 80px rgba(0,0,0,0.6)",
            }}
            priority
          />
          {/* Bottom fade so it blends into the page */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#0A0A0A]/70 via-transparent to-transparent pointer-events-none" />
          {/* LIVE badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-[#111]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#00FF88]/30 shadow-[0_0_12px_rgba(0,255,136,0.2)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF88] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF88]" />
            </span>
            <span className="text-[#00FF88] text-[11px] font-mono font-bold tracking-wider">LIVE</span>
          </div>
          {/* Corner accent lines */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#0070F3]/60 rounded-tl-2xl pointer-events-none" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#0070F3]/60 rounded-tr-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#00D4FF]/40 rounded-bl-2xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#00D4FF]/40 rounded-br-2xl pointer-events-none" />
        </motion.div>

        {/* Logos / social proof */}
        <motion.div
          variants={heroStats}
          className="flex flex-col items-center gap-3 mt-2"
        >
          <p className="text-xs font-medium text-[#6B7280] uppercase tracking-widest">
            Con la confianza de empresas líderes en LATAM
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 opacity-40 grayscale hover:opacity-60 transition-opacity duration-300">
            {/* Placeholder logos — replace with real <Image> components */}
            {["Banco Nacional", "TechCorp MX", "Grupo Alfa", "Fintech BO", "Retail AR"].map((name) => (
              <span key={name} className="text-sm font-semibold text-[#9CA3AF] tracking-wide">
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-[10px] font-medium text-[#6B7280] uppercase tracking-widest">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-[rgba(55,65,81,0.6)] flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-[#0070F3]" />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
