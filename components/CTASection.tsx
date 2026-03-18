"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ctaContainer, ctaItem, viewportOnce } from "@/lib/animations";

// ================================================================
// SHIELD ICON (large)
// ================================================================
function LargeShieldIcon() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="text-[#0070F3]"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="m9 12 2 2 4-4" strokeWidth="2" stroke="#00D4FF"/>
    </svg>
  );
}

// ================================================================
// FEATURE BULLET
// ================================================================
function CtaBullet({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-[#D1D5DB]">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00FF88" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      {text}
    </div>
  );
}

// ================================================================
// CTA SECTION
// ================================================================
export function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden section-py"
      aria-labelledby="cta-title"
    >
      {/* Planisferio background — mundo cibernético */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <Image
          src="/images/backgrounds/planisferio.png"
          alt=""
          fill
          className="object-cover object-center"
          style={{ opacity: 0.30, mixBlendMode: "screen" }}
        />
      </div>

      {/* Animated gradient background (parallax) */}
      <motion.div
        aria-hidden="true"
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Main gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(10,14,26,0.9) 0%, rgba(13,24,41,0.85) 40%, rgba(7,16,32,0.85) 60%, rgba(10,10,10,0.92) 100%)",
          }}
        />
        {/* Glow orbs */}
        <div
          className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px]"
          style={{
            background: "radial-gradient(ellipse, rgba(0,112,243,0.25) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-[400px] h-[300px]"
          style={{
            background: "radial-gradient(ellipse, rgba(0,212,255,0.14) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px]"
          style={{
            background: "radial-gradient(ellipse, rgba(0,255,136,0.06) 0%, transparent 70%)",
          }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,112,243,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,112,243,0.07) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </motion.div>

      {/* Scan lines */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(0,112,243,0.5), rgba(0,212,255,0.4), transparent)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(0,112,243,0.4), rgba(0,212,255,0.3), transparent)",
        }}
      />

      <div className="container-qatech relative z-10">
        <motion.div
          variants={ctaContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Icon */}
          <motion.div
            variants={ctaItem}
            className="flex justify-center mb-6"
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 20px rgba(0,112,243,0.4), 0 0 60px rgba(0,112,243,0.15)",
                  "0 0 40px rgba(0,112,243,0.7), 0 0 100px rgba(0,112,243,0.3)",
                  "0 0 20px rgba(0,112,243,0.4), 0 0 60px rgba(0,112,243,0.15)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-20 h-20 rounded-2xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, rgba(0,112,243,0.2) 0%, rgba(0,212,255,0.1) 100%)",
                border: "1px solid rgba(0,112,243,0.3)",
              }}
            >
              <LargeShieldIcon />
            </motion.div>
          </motion.div>

          {/* Badge */}
          <motion.div variants={ctaItem} className="flex justify-center mb-5">
            <span className="badge badge-primary">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0070F3] animate-pulse" />
              Empieza hoy — 15 días gratis
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            variants={ctaItem}
            id="cta-title"
            className="heading-display text-white mb-5"
          >
            Su empresa merece{" "}
            <span className="text-gradient-animated">
              seguridad de nivel enterprise
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={ctaItem}
            className="body-lg text-[#9CA3AF] mb-8 max-w-xl mx-auto"
          >
            Únase a las 50+ empresas de LATAM que ya protegen sus activos digitales con qatech360.
            Onboarding en 15 minutos, sin tarjeta de crédito.
          </motion.p>

          {/* Feature bullets */}
          <motion.div
            variants={ctaItem}
            className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-10"
          >
            <CtaBullet text="Sin tarjeta de crédito" />
            <CtaBullet text="Cancelar cuando quieras" />
            <CtaBullet text="Onboarding en 15 minutos" />
            <CtaBullet text="Soporte 24/7 en español" />
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={ctaItem}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/trial"
                className="btn-primary text-base px-9 py-4 rounded-xl inline-flex"
                style={{ fontSize: "1rem" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                Iniciar Prueba Gratis
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/demo"
                className="btn-secondary text-base px-9 py-4 rounded-xl inline-flex"
                style={{ fontSize: "1rem" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"/>
                  <polygon points="10,8 16,12 10,16 10,8"/>
                </svg>
                Ver Demo de 5 Minutos
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust note */}
          <motion.div
            variants={ctaItem}
            className="mt-10 flex flex-wrap justify-center items-center gap-4 opacity-60"
          >
            {[
              { icon: "🔒", text: "Datos cifrados end-to-end" },
              { icon: "🇱🇦", text: "Infraestructura en LATAM" },
              { icon: "📋", text: "SOC 2 Tipo II certificado" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-1.5 text-xs text-[#9CA3AF]">
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Floating particles decorative */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            aria-hidden="true"
            className="absolute rounded-full pointer-events-none"
            style={{
              width: `${4 + (i % 3) * 3}px`,
              height: `${4 + (i % 3) * 3}px`,
              background: i % 2 === 0 ? "rgba(0,112,243,0.4)" : "rgba(0,212,255,0.3)",
              left: `${10 + i * 15}%`,
              top: `${20 + ((i * 13) % 60)}%`,
            }}
            animate={{
              y: [0, -20 - i * 4, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4 + i * 0.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </section>
  );
}

export default CTASection;
