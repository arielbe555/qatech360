"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // AnimatePresence used in FAQ
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

// ================================================================
// ICONS
// ================================================================
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="10" fill="rgba(0,255,136,0.15)" />
    <path d="M8 12l3 3 5-5" stroke="#00FF88" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="10" fill="rgba(255,51,102,0.1)" />
    <path d="M9 9l6 6M15 9l-6 6" stroke="#FF3366" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const PartialIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="10" fill="rgba(255,107,0,0.15)" />
    <path d="M8 12h8" stroke="#FF6B00" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const ChevronDown = ({ open }: { open: boolean }) => (
  <svg
    width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}
    aria-hidden="true"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

// ================================================================
// DATA
// ================================================================
const PLANS = [
  {
    id: "trial",
    name: "FREE TRIAL",
    tagline: "Conocé la plataforma sin riesgo",
    monthlyPrice: 0,
    annualPrice: 0,
    annualTotal: 0,
    unit: "15 días gratis",
    badge: null,
    badgeColor: null,
    highlight: false,
    minEndpoints: "Sin límite",
    maxEndpoints: "Hasta 50",
    ctaLabel: "Empezar prueba gratis",
    ctaHref: "/trial",
    ctaVariant: "secondary",
    color: "#9CA3AF",
    features: [
      { label: "EDR Completo", included: true },
      { label: "Detección IA", included: true },
      { label: "Dashboard en tiempo real", included: true },
      { label: "Alertas básicas", included: true },
      { label: "Soporte por email", included: true },
      { label: "SIEM básico", included: "partial" },
      { label: "Threat Intelligence", included: "partial" },
      { label: "Cumplimiento/Compliance", included: false },
      { label: "SOC 24/7", included: false },
      { label: "API Access", included: false },
      { label: "Multi-tenancy", included: false },
      { label: "SLA garantizado", included: false },
    ],
  },
  {
    id: "essential",
    name: "ESSENTIAL",
    tagline: "Para equipos que empiezan a escalar",
    monthlyPrice: null,
    annualPrice: null,
    annualTotal: null,
    unit: "",
    badge: null,
    badgeColor: null,
    highlight: false,
    minEndpoints: "10",
    maxEndpoints: "100",
    ctaLabel: "Comenzar ahora",
    ctaHref: "/trial",
    ctaVariant: "secondary",
    color: "#0070F3",
    features: [
      { label: "EDR Completo", included: true },
      { label: "Detección IA", included: true },
      { label: "Dashboard en tiempo real", included: true },
      { label: "Alertas básicas", included: true },
      { label: "Soporte por email", included: true },
      { label: "SIEM básico", included: true },
      { label: "Threat Intelligence", included: "partial" },
      { label: "Cumplimiento/Compliance", included: "partial" },
      { label: "SOC 24/7", included: false },
      { label: "API Access", included: false },
      { label: "Multi-tenancy", included: false },
      { label: "SLA garantizado", included: false },
    ],
  },
  {
    id: "professional",
    name: "PROFESSIONAL",
    tagline: "La elección de equipos de seguridad",
    monthlyPrice: null,
    annualPrice: null,
    annualTotal: null,
    unit: "",
    badge: "MAS POPULAR",
    badgeColor: "#00FF88",
    highlight: true,
    minEndpoints: "10",
    maxEndpoints: "500",
    ctaLabel: "Empezar ahora",
    ctaHref: "/trial",
    ctaVariant: "primary",
    color: "#00D4FF",
    features: [
      { label: "EDR Completo", included: true },
      { label: "Detección IA", included: true },
      { label: "Dashboard en tiempo real", included: true },
      { label: "Alertas avanzadas + correlación", included: true },
      { label: "Soporte prioritario 8x5", included: true },
      { label: "SIEM completo", included: true },
      { label: "Threat Intelligence", included: true },
      { label: "Cumplimiento/Compliance", included: true },
      { label: "SOC 24/7", included: "partial" },
      { label: "API Access", included: true },
      { label: "Multi-tenancy", included: false },
      { label: "SLA garantizado", included: true },
    ],
  },
  {
    id: "enterprise",
    name: "ENTERPRISE",
    tagline: "Máxima protección sin compromisos",
    monthlyPrice: null,
    annualPrice: null,
    annualTotal: null,
    unit: "",
    badge: "ENTERPRISE",
    badgeColor: "#FF6B00",
    highlight: false,
    minEndpoints: "100+",
    maxEndpoints: "Sin límite",
    ctaLabel: "Hablar con ventas",
    ctaHref: "/contact",
    ctaVariant: "secondary",
    color: "#FF6B00",
    features: [
      { label: "EDR Completo", included: true },
      { label: "Detección IA", included: true },
      { label: "Dashboard en tiempo real", included: true },
      { label: "Alertas avanzadas + correlación", included: true },
      { label: "Soporte dedicado 24/7", included: true },
      { label: "SIEM completo + custom rules", included: true },
      { label: "Threat Intelligence premium", included: true },
      { label: "Cumplimiento multi-framework", included: true },
      { label: "SOC 24/7 full", included: true },
      { label: "API Access ilimitado", included: true },
      { label: "Multi-tenancy", included: true },
      { label: "SLA 99.99% garantizado", included: true },
    ],
  },
];

const COMPARISON_FEATURES = [
  { category: "Detección y Respuesta", features: [
    { name: "EDR (Endpoint Detection & Response)", trial: true, essential: true, pro: true, enterprise: true },
    { name: "Detección con IA / ML", trial: true, essential: true, pro: true, enterprise: true },
    { name: "Análisis de comportamiento (UEBA)", trial: false, essential: "partial", pro: true, enterprise: true },
    { name: "Threat Hunting automatizado", trial: false, essential: false, pro: true, enterprise: true },
    { name: "Respuesta automática a incidentes", trial: false, essential: "partial", pro: true, enterprise: true },
    { name: "Forensics y análisis post-mortem", trial: false, essential: false, pro: true, enterprise: true },
  ]},
  { category: "SIEM & Logs", features: [
    { name: "SIEM integrado", trial: "partial", essential: true, pro: true, enterprise: true },
    { name: "Retención de logs", trial: "7 días", essential: "30 días", pro: "90 días", enterprise: "1 año" },
    { name: "Correlación de eventos", trial: false, essential: "partial", pro: true, enterprise: true },
    { name: "Reglas SIEM personalizadas", trial: false, essential: false, pro: true, enterprise: true },
  ]},
  { category: "Threat Intelligence", features: [
    { name: "Feeds de amenazas globales", trial: "partial", essential: "partial", pro: true, enterprise: true },
    { name: "IOC matching en tiempo real", trial: false, essential: true, pro: true, enterprise: true },
    { name: "Dark web monitoring", trial: false, essential: false, pro: "partial", enterprise: true },
    { name: "Integración con MITRE ATT&CK", trial: false, essential: "partial", pro: true, enterprise: true },
  ]},
  { category: "Compliance y Reportes", features: [
    { name: "ISO 27001", trial: false, essential: "partial", pro: true, enterprise: true },
    { name: "SOC 2 Type II", trial: false, essential: false, pro: true, enterprise: true },
    { name: "PCI-DSS", trial: false, essential: false, pro: "partial", enterprise: true },
    { name: "Reportes automáticos", trial: false, essential: "partial", pro: true, enterprise: true },
    { name: "Auditoría de accesos", trial: false, essential: true, pro: true, enterprise: true },
  ]},
  { category: "Infraestructura", features: [
    { name: "Endpoints cubiertos", trial: "Hasta 50", essential: "10-100", pro: "10-500", enterprise: "Ilimitado" },
    { name: "Cloud workloads", trial: false, essential: "partial", pro: true, enterprise: true },
    { name: "Contenedores / Kubernetes", trial: false, essential: false, pro: true, enterprise: true },
    { name: "Multi-cloud", trial: false, essential: false, pro: "partial", enterprise: true },
  ]},
  { category: "Soporte", features: [
    { name: "Soporte por email", trial: true, essential: true, pro: true, enterprise: true },
    { name: "Soporte telefónico", trial: false, essential: false, pro: true, enterprise: true },
    { name: "SOC 24/7 incluido", trial: false, essential: false, pro: "partial", enterprise: true },
    { name: "Customer Success Manager", trial: false, essential: false, pro: false, enterprise: true },
    { name: "Onboarding asistido", trial: false, essential: false, pro: true, enterprise: true },
    { name: "SLA garantizado", trial: false, essential: false, pro: "99.9%", enterprise: "99.99%" },
  ]},
  { category: "Integraciones y API", features: [
    { name: "API REST", trial: false, essential: false, pro: true, enterprise: true },
    { name: "Webhooks", trial: false, essential: "partial", pro: true, enterprise: true },
    { name: "SIEM de terceros (Splunk, QRadar)", trial: false, essential: false, pro: true, enterprise: true },
    { name: "SSO / SAML 2.0", trial: false, essential: false, pro: true, enterprise: true },
    { name: "Multi-tenancy", trial: false, essential: false, pro: false, enterprise: true },
  ]},
];

const FAQS = [
  {
    q: "¿Hay contrato mínimo de permanencia?",
    a: "No. Todos nuestros planes son sin contrato mínimo. Podés cancelar en cualquier momento con reembolso proporcional del tiempo no usado.",
  },
  {
    q: "¿Puedo cancelar cuando quiera?",
    a: "Sí, absolutamente. Si cancelás dentro de los primeros 30 días, recibís un reembolso completo. Después de ese período, el acceso continúa hasta el fin del período contratado.",
  },
  {
    q: "¿Qué incluye el trial gratuito?",
    a: "El trial incluye acceso completo a las funciones del plan Professional: EDR completo, SIEM, Threat Intelligence, hasta 50 endpoints, y soporte prioritario. Sin tarjeta de crédito requerida.",
  },
  {
    q: "¿Puedo pagar en moneda local?",
    a: "Sí. Para clientes en Argentina, Brasil, México, Colombia, Chile y Perú ofrecemos facturación en moneda local. Contáctanos para más detalles sobre opciones de pago disponibles en tu país.",
  },
  {
    q: "¿Qué pasa si supero el número de endpoints contratados?",
    a: "Te notificamos automáticamente cuando llegás al 80% del límite. Podés escalar el plan en cualquier momento de forma instantánea. Contáctanos para ajustar tu plan según tus necesidades.",
  },
  {
    q: "¿Hay condiciones especiales para startups o instituciones educativas?",
    a: "Sí. Tenemos el programa qatech360 for Good con condiciones especiales para ONGs, instituciones académicas y startups con menos de 2 años. Escribinos a hola@qatech360.com.",
  },
  {
    q: "¿Qué opciones de facturación están disponibles?",
    a: "Ofrecemos facturación mensual y anual. Para Enterprise, también ofrecemos facturación trimestral. Contáctanos para conocer las opciones disponibles para tu empresa.",
  },
  {
    q: "¿Cómo obtengo una cotización?",
    a: "Todos nuestros planes se cotizan según las necesidades específicas de tu empresa: volumen de endpoints, servicios requeridos, industria y requerimientos de cumplimiento. Pedí tu cotización sin compromiso desde /contact.",
  },
];

const INDUSTRIES = [
  { name: "Gobierno y Sector Público", discount: "Consultar", note: "Licitaciones y contratos marco" },
  { name: "Salud y Hospitales", discount: "Consultar", note: "HIPAA + protección de datos de pacientes" },
  { name: "Finanzas y Bancos", discount: "Consultar", note: "PCI-DSS + SWIFT CSP incluido" },
];

// ================================================================
// CUSTOM QUOTE CTA (replaces ROI Calculator)
// ================================================================
function CustomQuoteCTA() {
  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-strong rounded-2xl p-8 md:p-12 text-center"
        >
          <span className="badge badge-primary mb-4">Cotización personalizada</span>
          <h2 className="text-4xl font-bold text-white mb-4">
            Obtené una <span className="text-gradient-primary">propuesta a medida</span>
          </h2>
          <p className="text-[#9CA3AF] text-lg max-w-2xl mx-auto mb-8">
            Cada empresa tiene necesidades diferentes. Contáctanos para recibir una cotización personalizada según tu cantidad de endpoints, industria y requerimientos de cumplimiento.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary whitespace-nowrap text-base px-8 py-4">
              Solicitar cotización
            </Link>
            <Link href="/demo" className="btn-secondary whitespace-nowrap text-base px-8 py-4">
              Ver demo en vivo
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ================================================================
// FEATURE CELL
// ================================================================
function FeatureCell({ value }: { value: boolean | string }) {
  if (value === true) return <div className="flex justify-center"><CheckIcon /></div>;
  if (value === false) return <div className="flex justify-center"><XIcon /></div>;
  if (value === "partial") return <div className="flex justify-center"><PartialIcon /></div>;
  return <div className="text-xs text-center text-[#9CA3AF] px-1">{value}</div>;
}

// ================================================================
// COMPARISON TABLE
// ================================================================
function ComparisonTable() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["Detección y Respuesta"]);

  const toggle = (cat: string) => {
    setExpandedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Comparativa <span className="text-gradient-primary">completa de features</span>
          </h2>
          <p className="text-[#9CA3AF] text-lg">Sin letra chica. Todo visible de un vistazo.</p>
        </motion.div>

        <div className="glass-strong rounded-2xl overflow-hidden">
          {/* Header row */}
          <div className="grid grid-cols-5 bg-[#0A0A0A] border-b border-[#374151] sticky top-0 z-10">
            <div className="py-4 px-4 text-sm font-bold text-[#6B7280]">Feature</div>
            {["Trial", "Essential", "Pro", "Enterprise"].map((plan, i) => (
              <div key={plan} className={`py-4 px-3 text-center text-sm font-bold ${i === 2 ? "text-[#00D4FF]" : "text-white"}`}>
                {plan}
              </div>
            ))}
          </div>

          {COMPARISON_FEATURES.map((cat) => {
            const isOpen = expandedCategories.includes(cat.category);
            return (
              <div key={cat.category} className="border-b border-[rgba(55,65,81,0.4)] last:border-0">
                <button
                  onClick={() => toggle(cat.category)}
                  className="w-full grid grid-cols-5 py-4 px-4 hover:bg-[rgba(0,112,243,0.04)] transition-colors group"
                  aria-expanded={isOpen}
                >
                  <div className="col-span-5 flex items-center justify-between">
                    <span className="text-sm font-bold text-white">{cat.category}</span>
                    <ChevronDown open={isOpen} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      {cat.features.map((feat, idx) => (
                        <div
                          key={feat.name}
                          className={`grid grid-cols-5 py-3 px-4 ${idx % 2 === 0 ? "bg-[rgba(17,24,39,0.5)]" : ""} hover:bg-[rgba(0,112,243,0.03)]`}
                        >
                          <div className="text-sm text-[#9CA3AF] flex items-center">{feat.name}</div>
                          <FeatureCell value={feat.trial} />
                          <FeatureCell value={feat.essential} />
                          <div className="bg-[rgba(0,212,255,0.03)] rounded">
                            <FeatureCell value={feat.pro} />
                          </div>
                          <FeatureCell value={feat.enterprise} />
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 justify-center mt-6">
          <div className="flex items-center gap-2 text-xs text-[#9CA3AF]"><CheckIcon /> Incluido</div>
          <div className="flex items-center gap-2 text-xs text-[#9CA3AF]"><XIcon /> No incluido</div>
          <div className="flex items-center gap-2 text-xs text-[#9CA3AF]"><PartialIcon /> Parcial</div>
        </div>
      </div>
    </section>
  );
}

// ================================================================
// MAIN PAGE
// ================================================================
export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <NavBar />

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-hero-radial" />
      </div>

      <main className="relative z-10 pt-20">

        {/* ── HERO ── */}
        <section className="pt-20 pb-10 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="badge badge-primary mb-6">Planes flexibles</span>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-5 leading-tight">
              Inversión en seguridad,<br />
              <span className="text-gradient-primary">no en licencias</span>
            </h1>
            <p className="text-xl text-[#9CA3AF] max-w-2xl mx-auto mb-10">
              Precios claros, sin sorpresas. Escalá según tus necesidades con nuestros planes flexibles.
            </p>
          </motion.div>
        </section>

        {/* ── PRICING CARDS ── */}
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
              {PLANS.map((plan, idx) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`relative rounded-2xl p-7 flex flex-col transition-all duration-300 ${
                    plan.highlight
                      ? "bg-[#111827] border-2 border-[#0070F3] shadow-[0_0_40px_rgba(0,112,243,0.25)] scale-[1.02]"
                      : "bg-[#111827] border border-[#374151] hover:border-[rgba(0,112,243,0.4)] hover:shadow-card-hover"
                  }`}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <div
                      className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-black tracking-widest uppercase"
                      style={{ background: plan.badgeColor ?? "#0070F3", color: plan.id === "professional" ? "#0A0A0A" : "#fff" }}
                    >
                      {plan.badge}
                    </div>
                  )}

                  {/* Plan name */}
                  <div className="mb-6">
                    <h3 className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: plan.color }}>
                      {plan.name}
                    </h3>
                    <p className="text-[#9CA3AF] text-sm">{plan.tagline}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    {plan.annualPrice === 0 ? (
                      <div>
                        <span className="text-5xl font-black text-white">Gratis</span>
                        <p className="text-[#9CA3AF] text-sm mt-1">{plan.unit}</p>
                      </div>
                    ) : (
                      <div>
                        <span className="text-4xl font-black" style={{ color: plan.color }}>Consultar</span>
                        <p className="text-[#9CA3AF] text-sm mt-2">Precio según necesidades</p>
                      </div>
                    )}
                  </div>

                  {/* Endpoints */}
                  <div className="mb-5 py-2.5 px-3 bg-[#0A0A0A] rounded-lg border border-[#1F2937]">
                    <p className="text-xs text-[#6B7280]">Endpoints</p>
                    <p className="text-sm font-semibold text-white">{plan.minEndpoints} – {plan.maxEndpoints}</p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feat) => (
                      <li key={feat.label} className="flex items-center gap-2.5">
                        {feat.included === true ? <CheckIcon /> : feat.included === "partial" ? <PartialIcon /> : <XIcon />}
                        <span className={`text-sm ${feat.included === false ? "text-[#6B7280] line-through" : "text-[#D1D5DB]"}`}>
                          {feat.label}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="mt-auto pt-2">
                    <Link
                      href={plan.id === "trial" ? plan.ctaHref : "/contact"}
                      className={`block w-full text-center py-3.5 px-5 rounded-xl font-bold text-sm transition-all duration-300 ${
                        plan.ctaVariant === "primary"
                          ? "btn-primary"
                          : plan.id === "trial"
                          ? "bg-[rgba(0,255,136,0.1)] text-[#00FF88] border border-[rgba(0,255,136,0.3)] hover:bg-[rgba(0,255,136,0.2)]"
                          : "btn-secondary"
                      }`}
                    >
                      {plan.id === "trial" ? plan.ctaLabel : "Consultar precio"}
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="text-center text-[#6B7280] text-sm mt-6">
              Sin tarjeta de crédito para el trial. Todos los planes incluyen onboarding guiado.
            </p>
          </div>
        </section>

        {/* ── COMPARISON VS COMPETITORS ── */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl font-bold text-white mb-3">
                Por qué elegir <span className="text-gradient-primary">qatech360</span>
              </h2>
              <p className="text-[#9CA3AF]">Mismas capacidades enterprise. Precio LATAM.</p>
            </motion.div>

            <div className="glass-strong rounded-2xl overflow-hidden">
              <div className="grid grid-cols-4 bg-[#0A0A0A] border-b border-[#374151]">
                <div className="py-4 px-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider">Plataforma</div>
                <div className="py-4 px-4 text-center text-xs font-bold text-[#6B7280] uppercase tracking-wider">Precio</div>
                <div className="py-4 px-4 text-center text-xs font-bold text-[#6B7280] uppercase tracking-wider">Ventaja</div>
                <div className="py-4 px-4 text-center text-xs font-bold text-[#6B7280] uppercase tracking-wider">LATAM native</div>
              </div>
              {[
                { name: "qatech360", price: "Consultar", saving: "Accesible LATAM", latam: true, highlight: true },
                { name: "Crowd...", price: "Cotización enterprise", saving: "Requiere proceso de ventas", latam: false, highlight: false },
                { name: "Sentine...", price: "Cotización enterprise", saving: "Requiere proceso de ventas", latam: false, highlight: false },
                { name: "Microsoft Defender", price: "Cotización enterprise", saving: "Requiere proceso de ventas", latam: false, highlight: false },
              ].map((row) => (
                <div
                  key={row.name}
                  className={`grid grid-cols-4 py-4 px-4 border-t border-[rgba(55,65,81,0.4)] ${row.highlight ? "bg-[rgba(0,255,136,0.04)]" : ""}`}
                >
                  <div className={`font-semibold text-sm flex items-center gap-2 ${row.highlight ? "text-[#00FF88]" : "text-[#9CA3AF]"}`}>
                    {row.highlight && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#00FF88"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    )}
                    {row.name}
                  </div>
                  <div className={`text-center font-black text-sm ${row.highlight ? "text-[#00FF88]" : "text-[#9CA3AF]"}`}>{row.price}</div>
                  <div className={`text-center text-xs ${row.highlight ? "text-[#00FF88]" : "text-[#9CA3AF]"}`}>{row.saving}</div>
                  <div className="flex justify-center">
                    {row.latam ? <CheckIcon /> : <XIcon />}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-[#6B7280] mt-3">Contáctanos para obtener una cotización personalizada para tu empresa.</p>
          </div>
        </section>

        {/* ── FEATURE COMPARISON TABLE ── */}
        <ComparisonTable />

        {/* ── CUSTOM QUOTE CTA ── */}
        <CustomQuoteCTA />

        {/* ── SECTOR SOLUTIONS ── */}
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-white mb-3">
                Soluciones por <span className="text-gradient-accent">sector</span>
              </h2>
              <p className="text-[#9CA3AF]">Planes adaptados y certificaciones incluidas según tu industria.</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {INDUSTRIES.map((ind, idx) => (
                <motion.div
                  key={ind.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="card-base text-center p-8"
                >
                  <div className="text-4xl font-black text-[#00FF88] mb-3">{ind.discount}</div>
                  <h3 className="text-white font-bold text-lg mb-2">{ind.name}</h3>
                  <p className="text-[#9CA3AF] text-sm">{ind.note}</p>
                  <Link href="/contact" className="mt-6 btn-ghost text-sm inline-block">
                    Consultar condiciones →
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIAL ── */}
        <section className="py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-strong rounded-2xl p-8 md:p-12 text-center relative"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-2xl"
                style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,112,243,0.08) 0%, transparent 70%)" }}
              />
              <div className="relative">
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#FF6B00" aria-hidden="true">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  ))}
                </div>
                <blockquote className="text-xl text-white font-medium leading-relaxed mb-6">
                  "Evaluamos las plataformas líderes del mercado norteamericano. Ambas superaban nuestro presupuesto anual. Con qatech360 obtuvimos el mismo nivel de protección por menos de la mitad del costo. El ROI fue evidente en los primeros 90 días."
                </blockquote>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0070F3] flex items-center justify-center text-white font-black text-sm">
                    MR
                  </div>
                  <div className="text-left">
                    <p className="text-white font-semibold text-sm">Marcos Rodríguez</p>
                    <p className="text-[#6B7280] text-xs">CISO · Grupo Financiero Andino · Argentina</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-white mb-3">
                Preguntas <span className="text-gradient-primary">frecuentes</span>
              </h2>
            </motion.div>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="glass rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-[rgba(0,112,243,0.04)] transition-colors"
                    aria-expanded={openFaq === idx}
                  >
                    <span className="text-sm font-semibold text-white pr-4">{faq.q}</span>
                    <ChevronDown open={openFaq === idx} />
                  </button>
                  <AnimatePresence>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-sm text-[#9CA3AF] leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="glass-strong rounded-3xl p-12 relative overflow-hidden"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,112,243,0.12) 0%, transparent 70%)" }}
              />
              <div className="relative">
                <div className="inline-flex items-center gap-2 bg-[rgba(0,255,136,0.1)] border border-[rgba(0,255,136,0.2)] rounded-full px-4 py-1.5 text-[#00FF88] text-sm font-semibold mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
                  Oferta limitada
                </div>
                <h2 className="text-4xl font-black text-white mb-4">
                  Los primeros 30 días son gratis.
                </h2>
                <p className="text-xl text-[#9CA3AF] mb-8">Sin tarjeta de crédito. Sin compromiso. Cancela cuando quieras.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/trial" className="btn-primary text-base px-8 py-4">
                    Empezar prueba gratuita →
                  </Link>
                  <Link href="/contact" className="btn-secondary text-base px-8 py-4">
                    Hablar con ventas
                  </Link>
                </div>
                <p className="text-xs text-[#6B7280] mt-6">
                  ISO 27001 · SOC 2 Type II · GDPR · Datos en LATAM
                </p>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
