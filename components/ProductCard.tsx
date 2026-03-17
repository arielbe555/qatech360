"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { staggerContainer, staggerItem } from "@/lib/animations";

// ================================================================
// TYPES
// ================================================================
export interface ProductCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  href?: string;
  badge?: string;
  badgeVariant?: "primary" | "accent" | "warning" | "danger";
  accentColor?: "primary" | "cyan" | "accent";
  index?: number;
}

// ================================================================
// CHECK ICON
// ================================================================
function CheckIcon({ color = "#00FF88" }: { color?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="flex-shrink-0 mt-0.5"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// ================================================================
// ARROW ICON
// ================================================================
function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

// ================================================================
// COLOR MAPS
// ================================================================
const accentColorMap = {
  primary: {
    iconBg:     "rgba(0, 112, 243, 0.12)",
    iconBorder: "rgba(0, 112, 243, 0.2)",
    iconText:   "#0070F3",
    checkColor: "#00D4FF",
    glowColor:  "rgba(0, 112, 243, 0.12)",
    borderHover:"rgba(0, 112, 243, 0.45)",
    linkColor:  "#60A5FA",
  },
  cyan: {
    iconBg:     "rgba(0, 212, 255, 0.1)",
    iconBorder: "rgba(0, 212, 255, 0.2)",
    iconText:   "#00D4FF",
    checkColor: "#00D4FF",
    glowColor:  "rgba(0, 212, 255, 0.1)",
    borderHover:"rgba(0, 212, 255, 0.4)",
    linkColor:  "#67E8F9",
  },
  accent: {
    iconBg:     "rgba(0, 255, 136, 0.08)",
    iconBorder: "rgba(0, 255, 136, 0.18)",
    iconText:   "#00FF88",
    checkColor: "#00FF88",
    glowColor:  "rgba(0, 255, 136, 0.08)",
    borderHover:"rgba(0, 255, 136, 0.35)",
    linkColor:  "#4ADE80",
  },
};

const badgeVariantMap = {
  primary: "badge-primary",
  accent:  "badge-accent",
  warning: "badge-warning",
  danger:  "badge-danger",
};

// ================================================================
// PRODUCT CARD
// ================================================================
export function ProductCard({
  icon,
  title,
  description,
  features,
  href = "#",
  badge,
  badgeVariant = "primary",
  accentColor = "primary",
  index = 0,
}: ProductCardProps) {
  const colors = accentColorMap[accentColor];

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.19, 1, 0.22, 1] }}
      whileHover="hover"
      animate="rest"
      className="relative group rounded-2xl border border-[#374151] bg-[#111827] overflow-hidden flex flex-col"
      style={{ transition: "border-color 0.3s ease, box-shadow 0.3s ease" }}
    >
      {/* Hover glow layer */}
      <motion.div
        variants={{
          rest:  { opacity: 0 },
          hover: { opacity: 1 },
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 0%, ${colors.glowColor} 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Animated border gradient on hover */}
      <motion.div
        variants={{
          rest:  { opacity: 0 },
          hover: { opacity: 1 },
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${colors.borderHover} 0%, transparent 60%)`,
          padding: "1px",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
          maskComposite: "exclude",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 p-6 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          {/* Icon */}
          <motion.div
            variants={{
              rest:  { scale: 1, rotate: 0 },
              hover: { scale: 1.08, rotate: 4 },
            }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="flex items-center justify-center w-12 h-12 rounded-xl border"
            style={{
              background: colors.iconBg,
              borderColor: colors.iconBorder,
              color: colors.iconText,
            }}
          >
            {icon}
          </motion.div>

          {/* Badge */}
          {badge && (
            <span className={`badge ${badgeVariantMap[badgeVariant]}`}>
              {badge}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-2 leading-tight">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-[#9CA3AF] leading-relaxed mb-5 flex-1">
          {description}
        </p>

        {/* Features list */}
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-2 mb-6"
        >
          {features.map((feature, i) => (
            <motion.li
              key={i}
              variants={staggerItem}
              className="flex items-start gap-2.5 text-sm text-[#D1D5DB]"
            >
              <CheckIcon color={colors.checkColor} />
              <span>{feature}</span>
            </motion.li>
          ))}
        </motion.ul>

        {/* CTA link */}
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 group/link mt-auto"
          style={{ color: colors.linkColor }}
          aria-label={`Ver más sobre ${title}`}
        >
          <span className="group-hover/link:underline underline-offset-2">
            Conocer más
          </span>
          <motion.span
            variants={{
              rest:  { x: 0 },
              hover: { x: 3 },
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <ArrowIcon />
          </motion.span>
        </Link>
      </div>

      {/* Bottom shimmer line on hover */}
      <motion.div
        variants={{
          rest:  { scaleX: 0, originX: 0 },
          hover: { scaleX: 1, originX: 0 },
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="h-[2px] w-full"
        style={{
          background: `linear-gradient(90deg, ${colors.iconText}, transparent)`,
        }}
        aria-hidden="true"
      />
    </motion.article>
  );
}

// ================================================================
// PRODUCTS SECTION (grid of cards)
// ================================================================
const PRODUCTS: ProductCardProps[] = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Endpoint Detection & Response",
    description: "Monitoreo continuo de todos sus endpoints con IA que detecta comportamientos anómalos en milisegundos.",
    features: [
      "Detección basada en comportamiento + firmas",
      "Respuesta automática a incidentes",
      "Forensics y timeline de ataques",
      "Compatible con Windows, macOS, Linux",
    ],
    badge: "Core",
    badgeVariant: "primary",
    accentColor: "primary",
    href: "/platform/edr",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: "SIEM + SOAR Inteligente",
    description: "Correlación de eventos en tiempo real con respuesta automatizada que reduce el MTTR en un 80%.",
    features: [
      "Correlación multi-fuente con ML",
      "Playbooks de respuesta automatizada",
      "Más de 300 integraciones",
      "Dashboards personalizables",
    ],
    badge: "Popular",
    badgeVariant: "accent",
    accentColor: "cyan",
    href: "/platform/siem",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35"/>
      </svg>
    ),
    title: "Threat Intelligence",
    description: "Base de datos propia de amenazas en LATAM actualizada en tiempo real, enriquecida con feeds globales.",
    features: [
      "IOCs específicos para LATAM",
      "Threat hunting proactivo",
      "Informes de amenazas semanales",
      "API de inteligencia de amenazas",
    ],
    badge: "Nuevo",
    badgeVariant: "warning",
    accentColor: "accent",
    href: "/platform/threat-intel",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    title: "Cloud Security Posture",
    description: "Visibilidad y control completo sobre su infraestructura cloud: AWS, Azure, GCP y ambientes híbridos.",
    features: [
      "Inventario automático de activos cloud",
      "Detección de misconfiguraciones",
      "Cumplimiento CIS Benchmarks",
      "Integración con CI/CD pipelines",
    ],
    accentColor: "primary",
    href: "/platform/cloud",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    title: "Gestión de Vulnerabilidades",
    description: "Escaneo continuo, priorización por riesgo real y seguimiento de remediación con SLA garantizado.",
    features: [
      "Escaneo autenticado y no autenticado",
      "CVSS + contexto de explotabilidad",
      "Integración con ticketing",
      "Reportes para ejecutivos y técnicos",
    ],
    accentColor: "cyan",
    href: "/platform/vuln",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    title: "Compliance Automatizado",
    description: "Mantén el cumplimiento de ISO 27001, SOC 2, PCI-DSS y regulaciones LATAM sin esfuerzo manual.",
    features: [
      "Controles pre-mapeados para LATAM",
      "Evidencias automáticas para auditorías",
      "Brecha de cumplimiento en tiempo real",
      "Exportación de reportes para auditores",
    ],
    badge: "Enterprise",
    badgeVariant: "primary",
    accentColor: "accent",
    href: "/platform/compliance",
  },
];

export function ProductsSection() {
  return (
    <section
      className="section-py relative bg-[#0A0A0A]"
      aria-labelledby="products-title"
    >
      {/* Background accent */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid opacity-30 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(0,112,243,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="container-qatech relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          className="text-center mb-16"
        >
          <span className="badge badge-primary mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0070F3]" />
            Plataforma Unificada
          </span>
          <h2 id="products-title" className="heading-1 text-white mt-4 mb-4">
            Todo lo que necesita para{" "}
            <span className="text-gradient">proteger su negocio</span>
          </h2>
          <p className="body-lg text-[#9CA3AF] max-w-2xl mx-auto">
            Una plataforma integrada que cubre todo el ciclo de vida de la seguridad —
            desde la detección hasta la remediación — sin herramientas fragmentadas.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.title} {...product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductCard;
