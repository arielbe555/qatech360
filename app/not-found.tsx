"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

// ================================================================
// SHIELD + MAGNIFIER ILLUSTRATION
// ================================================================
function ShieldMagnifierIllustration() {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Escudo con lupa y signo de interrogación"
      role="img"
    >
      {/* Outer glow ring */}
      <circle cx="100" cy="100" r="90" stroke="rgba(0,112,243,0.12)" strokeWidth="1" />
      <circle cx="100" cy="100" r="75" stroke="rgba(0,112,243,0.08)" strokeWidth="1" />

      {/* Shield body */}
      <path
        d="M100 28 L148 48 L148 96 C148 128 124 154 100 164 C76 154 52 128 52 96 L52 48 Z"
        fill="rgba(0,112,243,0.1)"
        stroke="rgba(0,112,243,0.45)"
        strokeWidth="2"
      />
      {/* Shield inner highlight */}
      <path
        d="M100 40 L138 57 L138 96 C138 122 118 144 100 153 C82 144 62 122 62 96 L62 57 Z"
        fill="rgba(0,112,243,0.06)"
        stroke="rgba(0,212,255,0.25)"
        strokeWidth="1"
      />

      {/* Question mark */}
      <text
        x="90"
        y="112"
        fontSize="40"
        fontWeight="900"
        fill="rgba(0,212,255,0.6)"
        fontFamily="Inter, system-ui, sans-serif"
      >
        ?
      </text>

      {/* Magnifying glass handle */}
      <line
        x1="140"
        y1="148"
        x2="162"
        y2="170"
        stroke="#0070F3"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* Magnifying glass circle */}
      <circle
        cx="122"
        cy="133"
        r="22"
        fill="rgba(0,18,40,0.7)"
        stroke="#0070F3"
        strokeWidth="3"
      />
      {/* Lens glare */}
      <circle
        cx="115"
        cy="127"
        r="5"
        fill="rgba(0,212,255,0.3)"
      />

      {/* Animated scan arc (decorative) */}
      <path
        d="M78 90 Q100 70 122 90"
        stroke="rgba(0,255,136,0.3)"
        strokeWidth="1.5"
        strokeDasharray="4 3"
        fill="none"
      />

      {/* Corner dots */}
      <circle cx="52" cy="48" r="3" fill="#0070F3" fillOpacity="0.5" />
      <circle cx="148" cy="48" r="3" fill="#0070F3" fillOpacity="0.5" />
      <circle cx="100" cy="164" r="3" fill="#00D4FF" fillOpacity="0.5" />
    </svg>
  );
}

// ================================================================
// ANIMATED GLOW ORB
// ================================================================
function GlowOrb({ size, x, y, color, delay }: { size: number; x: string; y: string; color: string; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: "blur(60px)",
        transform: "translate(-50%, -50%)",
      }}
      animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.15, 1] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

// ================================================================
// QUICK LINK CARD
// ================================================================
interface QuickLink {
  label: string;
  href: string;
  description: string;
  iconPath: string;
}

const QUICK_LINKS: QuickLink[] = [
  {
    label: "Inicio",
    href: "/",
    description: "Vuelve a la página principal",
    iconPath: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    label: "Plataforma",
    href: "/platform",
    description: "Conoce todas las capacidades",
    iconPath: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18",
  },
  {
    label: "Precios",
    href: "/pricing",
    description: "Planes transparentes desde $149",
    iconPath: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    label: "Contacto",
    href: "/contact",
    description: "Habla con nuestro equipo",
    iconPath: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
];

// ================================================================
// PAGE COMPONENT
// ================================================================
export default function NotFound() {
  const contentRef = useRef(null);
  const contentInView = useInView(contentRef, { once: true, margin: "-50px" });

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col">
      <NavBar />

      {/* Animated background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <GlowOrb size={500} x="20%" y="30%" color="rgba(0,112,243,0.18)" delay={0} />
        <GlowOrb size={400} x="80%" y="60%" color="rgba(0,212,255,0.12)" delay={1.5} />
        <GlowOrb size={300} x="50%" y="80%" color="rgba(0,112,243,0.1)" delay={2.5} />
      </div>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-24" ref={contentRef}>
        <div className="max-w-2xl w-full mx-auto text-center">

          {/* Giant 404 gradient text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={contentInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <span
              className="block text-[160px] md:text-[200px] font-black leading-none bg-clip-text text-transparent select-none"
              style={{ backgroundImage: "linear-gradient(135deg, #0070F3 0%, #00D4FF 60%, #0070F3 100%)" }}
              aria-label="Error 404"
            >
              404
            </span>
          </motion.div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex justify-center mb-8 -mt-6"
          >
            <ShieldMagnifierIllustration />
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Página no encontrada
          </motion.h1>

          {/* Friendly message */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="text-[#9CA3AF] text-lg mb-10 leading-relaxed max-w-lg mx-auto"
          >
            Parece que esta página se fue a investigar una alerta.
            Nuestro equipo ya fue notificado.
          </motion.p>

          {/* Search bar (UI only) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.42 }}
            className="relative max-w-md mx-auto mb-12"
          >
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="¿Qué estabas buscando?"
              className="w-full pl-11 pr-4 py-3.5 bg-[#111111] border border-[#2A2A2A] rounded-xl text-white placeholder:text-[#6B7280] focus:outline-none focus:border-[#0070F3] focus:ring-1 focus:ring-[rgba(0,112,243,0.3)] transition-all text-sm"
              aria-label="Buscar en el sitio"
            />
          </motion.div>

          {/* Quick links grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.5 }}
          >
            <p className="text-[#6B7280] text-sm uppercase tracking-widest font-semibold mb-5">
              Links útiles
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {QUICK_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={contentInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.55 + i * 0.07 }}
                >
                  <Link
                    href={link.href}
                    className="group flex flex-col items-center gap-3 bg-[#111111] border border-[#2A2A2A] rounded-xl p-4 hover:border-[rgba(0,112,243,0.5)] hover:bg-[#1A1A1A] transition-all duration-200"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[rgba(0,112,243,0.1)] flex items-center justify-center text-[#0070F3] group-hover:bg-[rgba(0,112,243,0.2)] transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d={link.iconPath} />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold group-hover:text-[#0070F3] transition-colors">{link.label}</p>
                      <p className="text-[#6B7280] text-xs mt-0.5 leading-tight">{link.description}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Back home CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={contentInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.85 }}
            className="mt-10"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-[#9CA3AF] hover:text-white transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="10 13 5 8 10 3" />
              </svg>
              Volver al inicio
            </Link>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
