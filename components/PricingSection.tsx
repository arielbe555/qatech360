"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { pricingContainer, pricingCard, featuredPricingCard, viewportOnce } from "@/lib/animations";

// ================================================================
// TYPES
// ================================================================
interface PricingFeature {
  text: string;
  included: boolean;
  tooltip?: string;
}

interface PricingTier {
  id: string;
  name: string;
  badge?: string;
  description: string;
  features: PricingFeature[];
  cta: string;
  ctaHref: string;
  featured?: boolean;
  color: "default" | "primary" | "accent";
}

// ================================================================
// CHECK / X ICONS
// ================================================================
function FeatureIcon({ included }: { included: boolean }) {
  if (included) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00FF88" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-shrink-0 mt-0.5">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-shrink-0 mt-0.5">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}

// ================================================================
// PRICING DATA
// ================================================================
const TIERS: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Protección esencial para PYMEs y startups que comienzan su journey de seguridad.",
    features: [
      { text: "Hasta 25 endpoints",       included: true },
      { text: "EDR básico",               included: true },
      { text: "Dashboard de seguridad",   included: true },
      { text: "Alertas en tiempo real",   included: true },
      { text: "Soporte por email 8x5",    included: true },
      { text: "Onboarding guiado",        included: true },
      { text: "SIEM Inteligente",         included: false },
      { text: "SOC 24/7",                 included: false },
      { text: "Threat Intelligence",      included: false },
      { text: "Compliance automatizado",  included: false },
    ],
    cta: "Solicitar información",
    ctaHref: "/contact?plan=starter",
    color: "default",
  },
  {
    id: "business",
    name: "Business",
    badge: "Más popular",
    description: "La opción preferida por medianas empresas que requieren protección avanzada y SOC dedicado.",
    features: [
      { text: "Hasta 150 endpoints",          included: true },
      { text: "EDR avanzado + UEBA",          included: true },
      { text: "SIEM Inteligente",             included: true },
      { text: "SOC 24/7 con analistas",       included: true },
      { text: "Threat Intelligence básica",   included: true },
      { text: "Compliance: ISO 27001 / PCI",  included: true },
      { text: "Soporte prioritario 24/7",     included: true },
      { text: "API completa",                 included: true },
      { text: "Pen Testing (2/año)",          included: false },
      { text: "CISO virtual dedicado",        included: false },
    ],
    cta: "Solicitar información",
    ctaHref: "/contact?plan=business",
    featured: true,
    color: "primary",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Solución completa y a medida para grandes organizaciones y grupos corporativos en LATAM.",
    features: [
      { text: "Endpoints ilimitados",           included: true },
      { text: "EDR avanzado + UEBA + XDR",      included: true },
      { text: "SIEM + SOAR Enterprise",         included: true },
      { text: "SOC 24/7 dedicado",              included: true },
      { text: "Threat Intelligence Premium",    included: true },
      { text: "Compliance multi-framework",     included: true },
      { text: "Pen Testing ilimitado",          included: true },
      { text: "CISO virtual dedicado",          included: true },
      { text: "SLA personalizado",              included: true },
      { text: "On-prem / Private cloud",        included: true },
    ],
    cta: "Hablar con ventas",
    ctaHref: "/contact?plan=enterprise",
    color: "accent",
  },
];

// ================================================================
// PRICING CARD
// ================================================================
function PricingCard({
  tier,
  index,
}: {
  tier: PricingTier;
  index: number;
}) {
  return (
    <motion.div
      variants={tier.featured ? featuredPricingCard : pricingCard}
      className={`relative flex flex-col rounded-2xl border overflow-hidden ${
        tier.featured ? "lg:-mt-4 lg:-mb-4" : ""
      }`}
      style={{
        background: tier.featured
          ? "linear-gradient(135deg, rgba(0,112,243,0.08) 0%, rgba(0,212,255,0.04) 100%)"
          : tier.color === "accent"
          ? "linear-gradient(135deg, rgba(0,255,136,0.04) 0%, #111827 100%)"
          : "#111827",
        borderColor: tier.featured
          ? "transparent"
          : tier.color === "accent"
          ? "rgba(0,255,136,0.2)"
          : "#374151",
      }}
      whileHover={{
        y: tier.featured ? 0 : -4,
        transition: { type: "spring", stiffness: 400, damping: 25 },
      }}
    >
      {/* Featured gradient border */}
      {tier.featured && (
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            padding: "1.5px",
            background: "linear-gradient(135deg, #0070F3, #00D4FF)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "destination-out",
            maskComposite: "exclude",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          }}
        />
      )}

      {/* Featured top glow */}
      {tier.featured && (
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 80% at 50% -10%, rgba(0,112,243,0.25) 0%, transparent 70%)",
          }}
        />
      )}

      <div className="relative z-10 p-7 flex flex-col flex-1">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-white">{tier.name}</h3>
            {tier.badge && (
              <span className="badge badge-primary text-[10px]">
                <span className="w-1 h-1 rounded-full bg-[#0070F3] animate-pulse" />
                {tier.badge}
              </span>
            )}
          </div>
          <p className="text-sm text-[#9CA3AF] leading-relaxed">{tier.description}</p>
        </div>

        {/* Price */}
        <div className="mb-6 pb-6 border-b border-[rgba(55,65,81,0.5)]">
          <div className="text-center py-2">
            <span className={`text-3xl font-extrabold ${tier.featured ? "text-gradient" : "text-white"}`}>
              Consultar
            </span>
            <p className="text-sm text-[#9CA3AF] mt-1">Cotización personalizada para tu empresa</p>
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-2.5 mb-8 flex-1">
          {tier.features.map((feature, i) => (
            <li
              key={i}
              className={`flex items-start gap-2.5 text-sm ${
                feature.included ? "text-[#D1D5DB]" : "text-[#4B5563]"
              }`}
            >
              <FeatureIcon included={feature.included} />
              <span>{feature.text}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            href={tier.ctaHref}
            className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-200 ${
              tier.featured
                ? "btn-primary"
                : tier.color === "accent"
                ? "text-[#00FF88] border border-[rgba(0,255,136,0.3)] bg-[rgba(0,255,136,0.06)] hover:bg-[rgba(0,255,136,0.12)] hover:border-[rgba(0,255,136,0.5)]"
                : "btn-secondary"
            }`}
          >
            {tier.cta}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ================================================================
// PRICING SECTION
// ================================================================
export function PricingSection() {
  return (
    <section
      className="section-py relative bg-[#0A0A0A]"
      id="pricing"
      aria-labelledby="pricing-title"
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid opacity-30 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(0,112,243,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="container-qatech relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          className="text-center mb-12"
        >
          <span className="badge badge-primary mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0070F3]" />
            Planes de Seguridad
          </span>
          <h2 id="pricing-title" className="heading-1 text-white mt-4 mb-4">
            Inversión en seguridad,{" "}
            <span className="text-gradient">no en licencias</span>
          </h2>
          <p className="body-lg text-[#9CA3AF] max-w-xl mx-auto">
            Planes flexibles adaptados a tu empresa. Contáctanos para una cotización personalizada sin compromiso.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <motion.div
          variants={pricingContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch lg:items-start"
        >
          {TIERS.map((tier, i) => (
            <PricingCard
              key={tier.id}
              tier={tier}
              index={i}
            />
          ))}
        </motion.div>

        {/* Enterprise note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.4 }}
          className="text-center mt-14 p-6 rounded-2xl border border-[rgba(55,65,81,0.4)] bg-[rgba(17,24,39,0.4)]"
        >
          <p className="text-[#9CA3AF] text-sm">
            ¿Necesita una solución personalizada?{" "}
            <Link
              href="/contact"
              className="text-[#60A5FA] hover:text-[#0070F3] font-medium underline underline-offset-2 transition-colors"
            >
              Hable con nuestro equipo
            </Link>
            {" "}— diseñamos la arquitectura de seguridad ideal para su organización.
          </p>
        </motion.div>

        {/* Logos / security badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-6 mt-12 opacity-50"
        >
          {["ISO 27001", "SOC 2 Type II", "PCI-DSS", "GDPR", "LGPD Brasil"].map((cert) => (
            <span
              key={cert}
              className="text-xs font-semibold text-[#9CA3AF] border border-[rgba(55,65,81,0.5)] rounded-lg px-3 py-1.5"
            >
              {cert}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default PricingSection;
