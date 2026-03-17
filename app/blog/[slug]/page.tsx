"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

// ================================================================
// TYPES
// ================================================================
interface RelatedArticle {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  categoryType: "danger" | "primary" | "warning" | "accent";
}

// ================================================================
// DATA
// ================================================================
const ARTICLE = {
  slug: "ransomware-latam-2025",
  title: "Ransomware en LATAM 2025: El año más violento de la historia",
  description:
    "Los ataques de ransomware en América Latina aumentaron un 340% durante 2025. Analizamos los grupos más activos, los sectores más golpeados, los países con mayor riesgo y las estrategias concretas para defender tu organización.",
  category: "Ransomware",
  categoryType: "danger" as const,
  author: {
    name: "Carlos Méndez",
    role: "Director de Inteligencia de Amenazas — qatech360",
    bio: "Carlos tiene más de 12 años de experiencia en ciberseguridad ofensiva y defensiva. Fue analista de amenazas en el CERT de Argentina y ha respondido más de 200 incidentes de ransomware en la región. Es CISSP, CISM y contribuidor activo al proyecto MITRE ATT&CK.",
  },
  date: "12 de marzo de 2025",
  readTime: "8 min",
  toc: [
    { id: "panorama-2025", label: "El panorama en 2025" },
    { id: "grupos-activos", label: "Grupos activos en LATAM" },
    { id: "paises-afectados", label: "Países más afectados" },
    { id: "sectores-objetivo", label: "Sectores objetivo" },
    { id: "anatomia-ataque", label: "Anatomía de un ataque" },
    { id: "como-protegerse", label: "Cómo protegerse" },
    { id: "recomendaciones", label: "Recomendaciones técnicas" },
    { id: "conclusion", label: "Conclusión" },
  ],
};

const RELATED: RelatedArticle[] = [
  {
    slug: "medusa-bancos-argentinos",
    title: "Cómo el grupo Medusa atacó 3 bancos argentinos en 72 horas",
    category: "Amenazas LATAM",
    date: "8 Mar 2025",
    readTime: "11 min",
    categoryType: "danger",
  },
  {
    slug: "edr-vs-antivirus",
    title: "EDR vs Antivirus: Por qué tu empresa necesita cambiar hoy",
    category: "EDR/XDR",
    date: "1 Mar 2025",
    readTime: "7 min",
    categoryType: "primary",
  },
  {
    slug: "threat-hunting-guia",
    title: "Guía definitiva de Threat Hunting para equipos pequeños",
    category: "Guías técnicas",
    date: "22 Ene 2025",
    readTime: "16 min",
    categoryType: "accent",
  },
];

// ================================================================
// AUTHOR AVATAR
// ================================================================
function AuthorAvatarLarge() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="32" fill="rgba(0,112,243,0.2)" />
      <circle cx="32" cy="32" r="31" stroke="#0070F3" strokeWidth="1" strokeOpacity="0.4" />
      <circle cx="32" cy="24" r="10" fill="#0070F3" fillOpacity="0.5" />
      <ellipse cx="32" cy="50" rx="16" ry="10" fill="#0070F3" fillOpacity="0.3" />
      <text x="32" y="28" textAnchor="middle" fontSize="14" fontWeight="700" fill="#60A5FA" fontFamily="Inter, sans-serif">
        CM
      </text>
    </svg>
  );
}

// ================================================================
// SHARE BUTTON
// ================================================================
function ShareButtons() {
  const [copied, setCopied] = useState(false);
  const url = "https://qatech360.com/blog/ransomware-latam-2025";
  const title = "Ransomware en LATAM 2025: El año más violento de la historia";

  const copyLink = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-content-muted text-sm">Compartir:</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 glass rounded-lg flex items-center justify-center hover:border-brand-primary/40 hover:text-white transition-all text-content-muted"
        aria-label="Compartir en X / Twitter"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M12.6 1.5h2.3l-5 5.7 5.9 7.8H11.2L7.7 10.1 3.7 15H1.4l5.4-6.1L1 1.5h4.9l3.2 4.2 3.5-4.2zm-.8 12.3h1.3L4.2 2.8H2.8l9 11z" fill="currentColor" />
        </svg>
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 glass rounded-lg flex items-center justify-center hover:border-brand-primary/40 hover:text-white transition-all text-content-muted"
        aria-label="Compartir en LinkedIn"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M13.6 1H2.4C1.6 1 1 1.6 1 2.4v11.2c0 .8.6 1.4 1.4 1.4h11.2c.8 0 1.4-.6 1.4-1.4V2.4c0-.8-.6-1.4-1.4-1.4zM5.4 12.8H3.2V6.4h2.2v6.4zm-1.1-7.3c-.7 0-1.3-.6-1.3-1.3s.6-1.3 1.3-1.3 1.3.6 1.3 1.3-.6 1.3-1.3 1.3zm9.5 7.3h-2.2V9.6c0-.8-.3-1.3-1-1.3-.5 0-.9.3-1.1.8-.1.1-.1.4-.1.6v3.1H7.2V6.4h2.2v.9c.3-.5.9-1.1 2-1.1 1.5 0 2.6 1 2.6 3v3.6z" fill="currentColor" />
        </svg>
      </a>
      <button
        onClick={copyLink}
        className="w-9 h-9 glass rounded-lg flex items-center justify-center hover:border-brand-primary/40 hover:text-white transition-all text-content-muted"
        aria-label="Copiar enlace"
      >
        {copied ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8l4 4 6-7" stroke="#00FF88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="5" y="5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M11 5V3.5A1.5 1.5 0 009.5 2h-6A1.5 1.5 0 002 3.5v6A1.5 1.5 0 003.5 11H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )}
      </button>
    </div>
  );
}

// ================================================================
// TABLE OF CONTENTS (STICKY SIDEBAR)
// ================================================================
function TableOfContents() {
  return (
    <nav className="card-base sticky top-24">
      <h4 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="1" y="2" width="12" height="1.5" rx="0.75" fill="#0070F3" />
          <rect x="1" y="6" width="9" height="1.5" rx="0.75" fill="#0070F3" />
          <rect x="1" y="10" width="10" height="1.5" rx="0.75" fill="#0070F3" />
        </svg>
        Contenido
      </h4>
      <ul className="space-y-1">
        {ARTICLE.toc.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="block text-content-muted text-xs py-1.5 px-2 rounded hover:text-brand-primary hover:bg-brand-primary/5 transition-all"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-5 pt-5 border-t border-border-subtle">
        <ShareButtons />
      </div>
    </nav>
  );
}

// ================================================================
// PAGE COMPONENT
// ================================================================
export default function BlogArticlePage() {
  return (
    <div className="min-h-screen bg-bg-base">
      <NavBar />

      {/* ── ARTICLE HEADER ────────────────────────────────────── */}
      <section className="relative pt-28 pb-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero-radial pointer-events-none opacity-50" />

        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-content-muted text-sm mb-6">
              <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-content-secondary truncate max-w-xs">Ransomware LATAM 2025</span>
            </nav>

            <span className="badge badge-danger mb-4 inline-flex">{ARTICLE.category}</span>

            <h1 className="text-display-md md:text-display-lg text-white leading-tight mb-5">
              {ARTICLE.title}
            </h1>

            <p className="text-content-secondary text-lg md:text-xl mb-8 leading-relaxed">
              {ARTICLE.description}
            </p>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-6 mb-10">
              <div className="flex items-center gap-3">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="20" fill="rgba(0,112,243,0.2)" />
                  <text x="20" y="25" textAnchor="middle" fontSize="12" fontWeight="700" fill="#60A5FA" fontFamily="Inter">CM</text>
                </svg>
                <div>
                  <p className="text-white text-sm font-semibold">{ARTICLE.author.name}</p>
                  <p className="text-content-muted text-xs">Director de Inteligencia de Amenazas</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-content-muted">
                <span className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <rect x="2" y="3" width="12" height="11" rx="2" stroke="#6B7280" strokeWidth="1.5" />
                    <path d="M5 1v3M11 1v3M2 7h12" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  {ARTICLE.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6.5" stroke="#6B7280" strokeWidth="1.5" />
                    <path d="M8 5v3.5l2 1.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  {ARTICLE.readTime} de lectura
                </span>
              </div>
              <div className="ml-auto hidden md:block">
                <ShareButtons />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── HERO IMAGE ────────────────────────────────────────── */}
      <div className="section-container pb-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-12"
          style={{
            background: "linear-gradient(135deg, rgba(255,51,102,0.5) 0%, rgba(255,107,0,0.3) 30%, rgba(10,10,10,0.95) 70%, #0A0A0A 100%)",
          }}
        >
          <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />
          {/* Decorative blobs */}
          <div className="absolute top-8 left-12 w-40 h-40 rounded-full bg-brand-danger opacity-20 blur-3xl animate-pulse" />
          <div className="absolute bottom-8 right-12 w-56 h-56 rounded-full bg-brand-warning opacity-15 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          {/* Central icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" opacity="0.35">
              <path d="M60 10L20 30v25c0 25 17 48 40 55 23-7 40-30 40-55V30L60 10z" stroke="#FF3366" strokeWidth="2.5" fill="rgba(255,51,102,0.1)" />
              <path d="M45 58l10 10 20-20" stroke="#FF6B00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 3" />
              <circle cx="60" cy="60" r="45" stroke="#FF3366" strokeWidth="1" strokeDasharray="6 4" opacity="0.5" />
              <circle cx="60" cy="60" r="30" stroke="#FF6B00" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
            </svg>
          </div>
          {/* Stats overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-3">
            {[
              { label: "Ataques en LATAM", value: "+340%" },
              { label: "Países afectados", value: "18" },
              { label: "Rescate promedio", value: "$2.1M" },
            ].map((stat) => (
              <div key={stat.label} className="glass px-4 py-2 rounded-lg">
                <p className="text-brand-danger font-bold text-sm">{stat.value}</p>
                <p className="text-content-muted text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── MAIN CONTENT + SIDEBAR ────────────────────────────── */}
      <div className="section-container pb-24">
        <div className="flex flex-col xl:flex-row gap-10">

          {/* ── ARTICLE BODY ─── */}
          <article className="flex-1 min-w-0 prose-custom">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-10 text-content-secondary leading-relaxed"
            >

              {/* Section 1 */}
              <section id="panorama-2025">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-1 h-7 bg-gradient-danger rounded-full inline-block shrink-0" />
                  El panorama en 2025: un antes y un después
                </h2>
                <p className="mb-4">
                  El año 2025 quedará grabado en los registros de ciberseguridad latinoamericana como el período de mayor actividad de ransomware que la región haya experimentado. Según datos consolidados de múltiples fuentes de inteligencia, los ataques confirmados en América Latina crecieron un <strong className="text-white">340% interanual</strong>, superando incluso las proyecciones más pesimistas publicadas a fines de 2024.
                </p>
                <p className="mb-4">
                  La confluencia de varios factores explica esta escalada sin precedentes: la madurez operativa de grupos que antes solo apuntaban a Norteamérica y Europa, la adopción acelerada de infraestructura cloud mal configurada en la región, la escasez de talento en ciberseguridad defensiva, y la percepción —muchas veces correcta— de que las empresas latinoamericanas pagan rescates con menor resistencia legal que sus pares europeas.
                </p>
                <p>
                  El impacto económico total de los incidentes de ransomware en LATAM durante 2025 se estima en <strong className="text-white">USD 4.700 millones</strong>, considerando rescates pagados, tiempos de recuperación, multas regulatorias y pérdida de negocio. Esta cifra representa casi el triple del impacto estimado en 2023.
                </p>

                {/* Highlight box */}
                <div className="mt-5 p-5 rounded-xl border border-brand-danger/30 bg-brand-danger/5">
                  <div className="flex gap-3">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 mt-0.5">
                      <path d="M10 2L2 17h16L10 2z" fill="rgba(255,51,102,0.2)" stroke="#FF3366" strokeWidth="1.5" strokeLinejoin="round" />
                      <path d="M10 8v4M10 14.5v.5" stroke="#FF3366" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <p className="text-sm text-content-secondary">
                      <strong className="text-brand-danger">Dato crítico:</strong> El tiempo promedio entre la intrusión inicial y el despliegue del ransomware bajó de 14 días (2023) a apenas <strong className="text-white">4.2 días</strong> en 2025, dejando ventanas de detección extremadamente reducidas.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2 */}
              <section id="grupos-activos">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-1 h-7 bg-gradient-danger rounded-full inline-block shrink-0" />
                  Grupos activos en LATAM
                </h2>
                <p className="mb-6">
                  El ecosistema de ransomware-as-a-service (RaaS) que opera en América Latina en 2025 está dominado por cinco grupos principales, cada uno con TTPs diferenciadas y objetivos sectoriales específicos.
                </p>

                <div className="space-y-4">
                  {[
                    {
                      name: "Medusa",
                      color: "#FF3366",
                      description: "Activo en LATAM desde 2023, Medusa escaló sus operaciones en 2025 enfocándose en el sector financiero argentino, brasileño y colombiano. Su modelo de doble extorsión incluye publicación de datos en su dark-web blog si el rescate no se paga en 7 días. Han comprometido más de 45 organizaciones en la región solo en el primer trimestre.",
                      ttps: ["Phishing spear", "ProxyLogon/ProxyShell", "Cobalt Strike", "AnyDesk abuse"],
                    },
                    {
                      name: "LockBit 3.0",
                      color: "#FF6B00",
                      description: "A pesar de la operación Cronos de 2024 que desmanteló parte de su infraestructura, LockBit 3.0 resurgió en 2025 con affiliates latinoamericanos más activos que nunca. Sus ataques en México y Brasil incluyeron hospitales, plantas manufactureras y entidades gubernamentales.",
                      ttps: ["RDP brute force", "Credential stuffing", "PsExec", "WMI lateral movement"],
                    },
                    {
                      name: "BlackCat / ALPHV",
                      color: "#9333EA",
                      description: "El grupo abandonó oficialmente su operación en marzo 2024 tras el ataque a Change Healthcare, pero varios affiliates se reorganizaron bajo nuevas marcas que conservan el ransomware ALPHV/BlackCat. En LATAM continúan activos bajo aliases como 'ShadowCat', principalmente en Chile y Perú.",
                      ttps: ["Living off the land", "Azure AD abuse", "Exfil to Mega.nz", "Intermittent encryption"],
                    },
                    {
                      name: "Cl0p",
                      color: "#0070F3",
                      description: "Especialista en ataques a cadenas de suministro de software, Cl0p explotó vulnerabilidades en productos ampliamente usados en LATAM (MOVEit, GoAnywhere) para comprometer docenas de empresas simultáneamente sin necesidad de acceso directo a las víctimas finales.",
                      ttps: ["Zero-day exploitation", "Supply chain", "MFT software abuse", "Mass exploitation"],
                    },
                  ].map((group) => (
                    <div key={group.name} className="card-base">
                      <div className="flex items-start gap-4">
                        <div
                          className="w-10 h-10 rounded-lg shrink-0 flex items-center justify-center font-bold text-sm text-white"
                          style={{ background: `${group.color}25`, border: `1px solid ${group.color}40` }}
                        >
                          {group.name[0]}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold mb-2" style={{ color: group.color }}>
                            {group.name}
                          </h3>
                          <p className="text-sm mb-3">{group.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {group.ttps.map((ttp) => (
                              <span key={ttp} className="px-2 py-1 bg-bg-elevated text-content-muted text-xs rounded-md border border-border-subtle">
                                {ttp}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 3 */}
              <section id="paises-afectados">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-1 h-7 bg-gradient-danger rounded-full inline-block shrink-0" />
                  Países más afectados
                </h2>
                <p className="mb-5">
                  La distribución geográfica de los ataques refleja tanto el tamaño económico de los países como sus capacidades de defensa cibernética relativa.
                </p>
                <div className="space-y-3">
                  {[
                    { country: "Brasil", pct: 38, incidents: 847 },
                    { country: "México", pct: 22, incidents: 491 },
                    { country: "Argentina", pct: 14, incidents: 312 },
                    { country: "Colombia", pct: 9, incidents: 201 },
                    { country: "Chile", pct: 7, incidents: 156 },
                    { country: "Perú", pct: 5, incidents: 112 },
                    { country: "Otros", pct: 5, incidents: 111 },
                  ].map((item) => (
                    <div key={item.country} className="flex items-center gap-4">
                      <span className="text-content-secondary text-sm w-20 shrink-0">{item.country}</span>
                      <div className="flex-1 bg-bg-elevated rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.1 }}
                          className="h-full rounded-full"
                          style={{ background: "linear-gradient(90deg, #FF3366, #FF6B00)" }}
                        />
                      </div>
                      <span className="text-brand-danger font-semibold text-sm w-12 text-right shrink-0">{item.pct}%</span>
                      <span className="text-content-muted text-xs w-20 text-right shrink-0 hidden sm:block">{item.incidents} casos</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 4 */}
              <section id="sectores-objetivo">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-1 h-7 bg-gradient-danger rounded-full inline-block shrink-0" />
                  Sectores objetivo
                </h2>
                <p className="mb-5">
                  Los atacantes en 2025 han reforzado su preferencia por sectores con alta presión operativa para pagar rápidamente, datos sensibles de alto valor y, en muchos casos, capacidades defensivas por debajo del promedio.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: "Salud y hospitales", risk: "CRÍTICO", icon: "🏥", detail: "Presión máxima por continuidad, datos de pacientes de alto valor" },
                    { name: "Servicios financieros", risk: "CRÍTICO", icon: "🏦", detail: "Múltiples vectores: BEC, VPN vulnerables, APIs expuestas" },
                    { name: "Manufactura", risk: "ALTO", icon: "🏭", detail: "Convergencia IT/OT amplía superficie de ataque" },
                    { name: "Gobierno", risk: "ALTO", icon: "🏛️", detail: "Sistemas legacy, presupuestos bajos, alta visibilidad" },
                    { name: "Educación", risk: "ALTO", icon: "🎓", detail: "Redes abiertas, usuarios sin entrenamiento" },
                    { name: "Retail y logística", risk: "MEDIO", icon: "📦", detail: "Supply chains complejas, puntos de venta vulnerables" },
                  ].map((sector) => (
                    <div key={sector.name} className="card-base flex items-start gap-3 p-4">
                      <span className="text-2xl">{sector.icon}</span>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white font-semibold text-sm">{sector.name}</span>
                          <span className={`badge text-xs px-2 py-0.5 ${sector.risk === "CRÍTICO" ? "badge-danger" : "badge-warning"}`}>
                            {sector.risk}
                          </span>
                        </div>
                        <p className="text-content-muted text-xs">{sector.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 5 */}
              <section id="anatomia-ataque">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-1 h-7 bg-gradient-danger rounded-full inline-block shrink-0" />
                  Anatomía de un ataque moderno
                </h2>
                <p className="mb-5">
                  El ciclo de ataque de ransomware moderno sigue un patrón bien documentado por el framework MITRE ATT&CK. Entender cada fase es fundamental para interrumpir la kill chain antes del cifrado final.
                </p>
                <div className="space-y-3">
                  {[
                    { phase: "01", name: "Initial Access", desc: "Phishing con adjuntos maliciosos, explotación de VPNs vulnerables (Cisco, Fortinet), RDP expuesto al exterior. En 2025, el 67% de los accesos iniciales en LATAM fueron vía credenciales compradas en mercados underground." },
                    { phase: "02", name: "Persistence", desc: "Instalación de webshells, creación de cuentas administrativas, modificación de tareas programadas. Los atacantes aseguran múltiples puntos de retorno antes de avanzar." },
                    { phase: "03", name: "Lateral Movement", desc: "PsExec, WMI, BloodHound para mapear Active Directory, pass-the-hash, Kerberoasting. El objetivo es comprometer el Domain Controller para máxima propagación." },
                    { phase: "04", name: "Exfiltración", desc: "Antes de cifrar, los datos son exfiltrados a servidores controlados por los atacantes. Este paso habilita la doble extorsión: pagar o ver los datos publicados." },
                    { phase: "05", name: "Ransomware Deployment", desc: "El cifrado final se ejecuta típicamente en horarios de baja actividad (madrugada, fines de semana). En minutos, miles de endpoints quedan inoperativos." },
                  ].map((step, i) => (
                    <div key={step.phase} className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-xl bg-brand-danger/20 border border-brand-danger/30 flex items-center justify-center shrink-0">
                        <span className="text-brand-danger text-xs font-bold">{step.phase}</span>
                      </div>
                      <div className="flex-1 pb-4 border-b border-border-subtle last:border-0">
                        <h4 className="text-white font-semibold text-sm mb-1">{step.name}</h4>
                        <p className="text-content-muted text-sm">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Inline CTA */}
              <div className="rounded-2xl overflow-hidden relative"
                style={{ background: "linear-gradient(135deg, rgba(0,112,243,0.15) 0%, rgba(0,212,255,0.08) 100%)" }}>
                <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20 pointer-events-none" />
                <div className="relative p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-1">
                    <div className="badge badge-primary mb-3 w-fit">Protección contra ransomware</div>
                    <h3 className="text-white font-bold text-xl mb-2">
                      ¿Tu empresa está protegida contra ransomware?
                    </h3>
                    <p className="text-content-secondary text-sm">
                      Evaluamos tu postura de seguridad contra las técnicas usadas por Medusa, LockBit y BlackCat. Resultado en 48 horas.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 shrink-0">
                    <Link href="/trial" className="btn-primary">
                      Evaluación gratuita
                    </Link>
                    <Link href="/platform" className="btn-secondary text-center">
                      Ver plataforma
                    </Link>
                  </div>
                </div>
              </div>

              {/* Section 6 */}
              <section id="como-protegerse">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-1 h-7 bg-gradient-primary rounded-full inline-block shrink-0" />
                  Cómo protegerse: estrategia en capas
                </h2>
                <p className="mb-5">
                  No existe una bala de plata contra el ransomware. La defensa efectiva requiere múltiples capas de control, cada una diseñada para interrumpir la kill chain en distintas fases del ataque.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      layer: "Prevención",
                      color: "#00FF88",
                      items: ["MFA obligatorio en todos los accesos", "Parcheo acelerado (SLA < 72h)", "Segmentación de red", "Email filtering avanzado", "Disable RDP externo"],
                    },
                    {
                      layer: "Detección",
                      color: "#0070F3",
                      items: ["EDR en 100% de endpoints", "SIEM con reglas LATAM-específicas", "Network traffic analysis", "Monitoreo AD 24/7", "Honeypots internos"],
                    },
                    {
                      layer: "Recuperación",
                      color: "#FF6B00",
                      items: ["Backups offline testeados", "Plan de IR documentado", "Retainer con empresa de IR", "RTO/RPO definidos", "Comunicación de crisis"],
                    },
                  ].map((layer) => (
                    <div key={layer.layer} className="card-base">
                      <h4 className="font-bold text-sm mb-3" style={{ color: layer.color }}>
                        {layer.layer}
                      </h4>
                      <ul className="space-y-2">
                        {layer.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-content-muted">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5">
                              <circle cx="7" cy="7" r="6" stroke={layer.color} strokeWidth="1" strokeOpacity="0.5" />
                              <path d="M4.5 7l2 2 3-3" stroke={layer.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 7 */}
              <section id="recomendaciones">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-1 h-7 bg-gradient-primary rounded-full inline-block shrink-0" />
                  Recomendaciones técnicas específicas
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      title: "Implementar MFA resistente a phishing",
                      detail: "Las soluciones TOTP estándar son bypasseables mediante AiTM proxies. Migrar a FIDO2/WebAuthn o certificados de dispositivo. Microsoft Authenticator con Conditional Access es una opción razonable para entornos Azure.",
                    },
                    {
                      title: "Deshabilitar NTLM y forzar Kerberos",
                      detail: "NTLM relay y pass-the-hash siguen siendo vectores primarios de lateral movement. Usar GPO para deshabilitar NTLMv1, restringir NTLMv2 a casos específicos y habilitar Protected Users security group en AD.",
                    },
                    {
                      title: "Regla 3-2-1-1-0 para backups",
                      detail: "3 copias, 2 medios distintos, 1 offsite, 1 air-gapped/offline. El cero representa 'cero backups sin verificar'. Los grupos de ransomware apuntan activamente a los sistemas de backup antes de cifrar.",
                    },
                    {
                      title: "EDR con capacidad de rollback",
                      detail: "Soluciones como SentinelOne, CrowdStrike Falcon y el agente qatech360 pueden revertir cambios realizados por ransomware antes de que el cifrado sea completo. Este feature puede ser la diferencia entre un incidente menor y uno catastrófico.",
                    },
                  ].map((rec, i) => (
                    <div key={i} className="card-base border-l-2 border-l-brand-primary">
                      <h4 className="text-white font-semibold text-sm mb-2">{rec.title}</h4>
                      <p className="text-content-muted text-sm">{rec.detail}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Conclusion */}
              <section id="conclusion">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-1 h-7 bg-gradient-accent rounded-full inline-block shrink-0" />
                  Conclusión
                </h2>
                <p className="mb-4">
                  El ransomware en América Latina ha alcanzado un nivel de sofisticación y volumen que ya no permite respuestas reactivas. Las organizaciones que sobrevivieron intactas en 2025 no fueron las que no fueron atacadas — fueron las que tenían controles suficientemente maduros para interrumpir la kill chain antes del cifrado.
                </p>
                <p className="mb-4">
                  La pregunta ya no es <em className="text-white">"si"</em> tu organización será atacada, sino <em className="text-white">"cuándo"</em> y <em className="text-white">"qué tan preparada estás"</em>. Invertir en detección temprana, respuesta a incidentes y controles preventivos robustos tiene un ROI medible: el costo promedio de un incidente de ransomware es 80 veces superior al costo anual de una solución de seguridad adecuada.
                </p>
                <p>
                  En qatech360 monitoreamos continuamente la actividad de los grupos más relevantes para LATAM y actualizamos nuestras reglas de detección en tiempo real. Si querés saber cómo tu organización se compara con el benchmark de la industria, solicitá nuestra evaluación de seguridad gratuita.
                </p>
              </section>

            </motion.div>
          </article>

          {/* ── STICKY SIDEBAR ─── */}
          <aside className="xl:w-72 shrink-0">
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <TableOfContents />
            </motion.div>
          </aside>
        </div>

        {/* ── AUTHOR BIO ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 card-base flex flex-col sm:flex-row gap-6"
        >
          <div className="shrink-0">
            <AuthorAvatarLarge />
          </div>
          <div>
            <p className="text-content-muted text-xs uppercase tracking-widest mb-1">Sobre el autor</p>
            <h3 className="text-white font-bold text-lg mb-1">{ARTICLE.author.name}</h3>
            <p className="text-brand-primary text-sm mb-3">{ARTICLE.author.role}</p>
            <p className="text-content-secondary text-sm">{ARTICLE.author.bio}</p>
          </div>
        </motion.div>

        {/* ── RELATED ARTICLES ────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <h2 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
            <span className="w-1 h-5 bg-gradient-hero rounded-full inline-block" />
            Artículos relacionados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RELATED.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="card-base group block"
              >
                <div
                  className="h-32 rounded-lg mb-4 relative overflow-hidden"
                  style={{
                    background:
                      article.categoryType === "danger"
                        ? "linear-gradient(135deg, rgba(255,51,102,0.3), rgba(17,24,39,1))"
                        : article.categoryType === "warning"
                        ? "linear-gradient(135deg, rgba(255,107,0,0.3), rgba(17,24,39,1))"
                        : article.categoryType === "accent"
                        ? "linear-gradient(135deg, rgba(0,255,136,0.2), rgba(17,24,39,1))"
                        : "linear-gradient(135deg, rgba(0,112,243,0.3), rgba(17,24,39,1))",
                  }}
                >
                  <div className="absolute bottom-2 left-2">
                    <span className={`badge ${
                      article.categoryType === "danger" ? "badge-danger" :
                      article.categoryType === "warning" ? "badge-warning" :
                      article.categoryType === "accent" ? "badge-accent" : "badge-primary"
                    }`}>
                      {article.category}
                    </span>
                  </div>
                </div>
                <h3 className="text-white font-semibold text-sm leading-snug group-hover:text-gradient-primary transition-all line-clamp-2 mb-3">
                  {article.title}
                </h3>
                <div className="flex items-center justify-between text-xs text-content-muted">
                  <span>{article.date}</span>
                  <span>{article.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* ── MOBILE SHARE ──────────────────────────────────── */}
        <div className="md:hidden mt-10 card-base flex items-center justify-between">
          <span className="text-white font-semibold text-sm">¿Te gustó el artículo?</span>
          <ShareButtons />
        </div>
      </div>

      <Footer />
    </div>
  );
}
