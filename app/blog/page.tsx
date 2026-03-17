"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

// ================================================================
// TYPES
// ================================================================
interface Article {
  slug: string;
  title: string;
  description: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  categoryType: "danger" | "primary" | "warning" | "accent";
}

// ================================================================
// DATA
// ================================================================
const CATEGORIES = [
  "Todos",
  "Amenazas LATAM",
  "EDR/XDR",
  "Compliance",
  "Cloud Security",
  "Ransomware",
  "Guías técnicas",
];

const ARTICLES: Article[] = [
  {
    slug: "ransomware-latam-2025",
    title: "Ransomware en LATAM 2025: El año más violento de la historia",
    description:
      "Los ataques de ransomware en América Latina aumentaron un 340% en 2025. Analizamos los grupos más activos, los sectores más afectados y cómo preparar tu empresa.",
    category: "Ransomware",
    author: "Carlos Méndez",
    date: "12 Mar 2025",
    readTime: "8 min",
    categoryType: "danger",
  },
  {
    slug: "medusa-bancos-argentinos",
    title: "Cómo el grupo Medusa atacó 3 bancos argentinos en 72 horas",
    description:
      "Análisis forense del ataque coordinado que comprometió infraestructura crítica financiera en Argentina durante enero de 2025.",
    category: "Amenazas LATAM",
    author: "Ana Torres",
    date: "8 Mar 2025",
    readTime: "11 min",
    categoryType: "danger",
  },
  {
    slug: "pci-dss-v4",
    title: "PCI-DSS v4.0: Todo lo que tu empresa financiera necesita saber",
    description:
      "La nueva versión del estándar ya está en vigencia. Revisamos los cambios críticos, los nuevos requisitos y el roadmap de cumplimiento para 2025.",
    category: "Compliance",
    author: "María González",
    date: "5 Mar 2025",
    readTime: "13 min",
    categoryType: "warning",
  },
  {
    slug: "edr-vs-antivirus",
    title: "EDR vs Antivirus: Por qué tu empresa necesita cambiar hoy",
    description:
      "Los antivirus tradicionales detectan menos del 40% de las amenazas modernas. Te explicamos por qué el EDR es la única defensa real en 2025.",
    category: "EDR/XDR",
    author: "Lucas Fernández",
    date: "1 Mar 2025",
    readTime: "7 min",
    categoryType: "primary",
  },
  {
    slug: "apt-latam-top10",
    title: "Los 10 grupos APT más activos en América Latina",
    description:
      "Mapeamos las tácticas, técnicas y procedimientos de los grupos de amenaza persistente avanzada que operan activamente en la región.",
    category: "Amenazas LATAM",
    author: "Carlos Méndez",
    date: "25 Feb 2025",
    readTime: "15 min",
    categoryType: "danger",
  },
  {
    slug: "gdpr-empresas-latam",
    title: "GDPR para empresas LATAM con clientes en Europa",
    description:
      "Si tu empresa procesa datos de ciudadanos europeos, el GDPR te aplica sin importar dónde operes. Guía práctica de cumplimiento.",
    category: "Compliance",
    author: "Valentina Ruiz",
    date: "20 Feb 2025",
    readTime: "10 min",
    categoryType: "warning",
  },
  {
    slug: "zero-trust-sin-budget",
    title: "Cómo implementar Zero Trust en tu empresa sin un presupuesto enorme",
    description:
      "Zero Trust no requiere millones en infraestructura. Te mostramos cómo adoptar el modelo con herramientas open source y SaaS accesibles.",
    category: "Guías técnicas",
    author: "Diego Morales",
    date: "15 Feb 2025",
    readTime: "12 min",
    categoryType: "accent",
  },
  {
    slug: "supply-chain-attacks",
    title: "Supply chain attacks: La amenaza que tu antivirus no puede detectar",
    description:
      "Los ataques a cadenas de suministro de software son la nueva frontera del cibercrimen. Analizamos los casos más relevantes y cómo mitigarlos.",
    category: "Amenazas LATAM",
    author: "Ana Torres",
    date: "10 Feb 2025",
    readTime: "9 min",
    categoryType: "danger",
  },
  {
    slug: "wazuh-vs-splunk",
    title: "Wazuh vs Splunk: Comparativa honesta para 2025",
    description:
      "Comparamos ambas plataformas SIEM en términos de costo, capacidades de detección, curva de aprendizaje y escalabilidad para equipos LATAM.",
    category: "EDR/XDR",
    author: "Lucas Fernández",
    date: "5 Feb 2025",
    readTime: "14 min",
    categoryType: "primary",
  },
  {
    slug: "costo-breach-pyme-argentina",
    title: "El verdadero costo de un breach para una PyME en Argentina",
    description:
      "Más allá del rescate: multas regulatorias, daño reputacional, pérdida de clientes y costos operativos. El análisis financiero completo.",
    category: "Amenazas LATAM",
    author: "María González",
    date: "1 Feb 2025",
    readTime: "8 min",
    categoryType: "danger",
  },
  {
    slug: "aws-misconfiguraciones",
    title: "5 misconfiguraciones de AWS que los hackers explotan activamente",
    description:
      "S3 públicos, IAM permisivos, Security Groups abiertos: revisamos las configuraciones incorrectas más frecuentes en entornos cloud LATAM.",
    category: "Cloud Security",
    author: "Diego Morales",
    date: "28 Ene 2025",
    readTime: "11 min",
    categoryType: "warning",
  },
  {
    slug: "threat-hunting-guia",
    title: "Guía definitiva de Threat Hunting para equipos pequeños",
    description:
      "No necesitás un SOC de 20 personas para hacer threat hunting efectivo. Metodología, herramientas y playbooks para equipos de 2-5 personas.",
    category: "Guías técnicas",
    author: "Carlos Méndez",
    date: "22 Ene 2025",
    readTime: "16 min",
    categoryType: "accent",
  },
];

const FEATURED_ARTICLE = ARTICLES[0];

const TRENDING_TOPICS = [
  "Ransomware LATAM",
  "PCI-DSS v4.0",
  "Zero Trust",
  "Threat Hunting",
  "EDR/XDR",
  "MITRE ATT&CK",
  "Cloud Security",
  "APT Groups",
  "SIEM",
  "Incident Response",
];

// ================================================================
// AUTHOR AVATAR SVG
// ================================================================
function AuthorAvatar({ name, size = 32 }: { name: string; size?: number }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
  const colors = ["#0070F3", "#00D4FF", "#00FF88", "#FF3366", "#FF6B00"];
  const color = colors[name.length % colors.length];
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill={color} fillOpacity="0.2" />
      <circle cx="16" cy="16" r="15" stroke={color} strokeWidth="1" strokeOpacity="0.4" />
      <text x="16" y="21" textAnchor="middle" fontSize="11" fontWeight="700" fill={color} fontFamily="Inter, sans-serif">
        {initials}
      </text>
    </svg>
  );
}

// ================================================================
// BADGE COMPONENT
// ================================================================
function CategoryBadge({ category, type }: { category: string; type: Article["categoryType"] }) {
  const classMap = {
    danger: "badge badge-danger",
    primary: "badge badge-primary",
    warning: "badge badge-warning",
    accent: "badge badge-accent",
  };
  return <span className={classMap[type]}>{category}</span>;
}

// ================================================================
// ARTICLE CARD
// ================================================================
function ArticleCard({ article, index }: { article: Article; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="card-base group flex flex-col h-full"
    >
      {/* Gradient thumbnail */}
      <div
        className="h-36 rounded-lg mb-4 overflow-hidden relative"
        style={{
          background:
            article.categoryType === "danger"
              ? "linear-gradient(135deg, rgba(255,51,102,0.3) 0%, rgba(17,24,39,1) 100%)"
              : article.categoryType === "warning"
              ? "linear-gradient(135deg, rgba(255,107,0,0.3) 0%, rgba(17,24,39,1) 100%)"
              : article.categoryType === "accent"
              ? "linear-gradient(135deg, rgba(0,255,136,0.2) 0%, rgba(17,24,39,1) 100%)"
              : "linear-gradient(135deg, rgba(0,112,243,0.3) 0%, rgba(17,24,39,1) 100%)",
        }}
      >
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />
        <div className="absolute bottom-3 left-3">
          <CategoryBadge category={article.category} type={article.categoryType} />
        </div>
      </div>

      <div className="flex flex-col flex-1 gap-3">
        <h3 className="text-white font-semibold text-base leading-snug group-hover:text-gradient-primary transition-all duration-200 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-content-secondary text-sm line-clamp-2 flex-1">{article.description}</p>

        <div className="flex items-center justify-between pt-3 border-t border-border-subtle">
          <div className="flex items-center gap-2">
            <AuthorAvatar name={article.author} size={24} />
            <span className="text-content-muted text-xs">{article.author}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-content-muted">
            <span>{article.date}</span>
            <span className="flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6.5" stroke="#6B7280" strokeWidth="1.5" />
                <path d="M8 5v3.5l2 1.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              {article.readTime}
            </span>
          </div>
        </div>

        <Link
          href={`/blog/${article.slug}`}
          className="text-brand-primary text-sm font-medium hover:text-brand-secondary transition-colors flex items-center gap-1 mt-1"
        >
          Leer
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </motion.article>
  );
}

// ================================================================
// PAGE COMPONENT
// ================================================================
export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");

  const filtered =
    activeCategory === "Todos"
      ? ARTICLES
      : ARTICLES.filter((a) => a.category === activeCategory);

  const searched = searchQuery
    ? filtered.filter(
        (a) =>
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filtered;

  return (
    <div className="min-h-screen bg-bg-base">
      <NavBar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero-radial pointer-events-none" />
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30 pointer-events-none" />

        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="badge badge-primary mb-6 mx-auto w-fit">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <circle cx="5" cy="5" r="4" fill="#0070F3" />
                <circle cx="5" cy="5" r="2" fill="#00D4FF" className="animate-ping" />
              </svg>
              Blog de Seguridad
            </div>

            <h1 className="text-display-lg text-white mb-4">
              Inteligencia de amenazas{" "}
              <span className="text-gradient-primary">para tu empresa</span>
            </h1>
            <p className="text-content-secondary text-lg mb-8">
              Análisis profundos, guías técnicas y threat intelligence del panorama de ciberseguridad en LATAM.
            </p>

            {/* Search bar */}
            <div className="relative max-w-xl mx-auto">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-content-muted">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <circle cx="9" cy="9" r="6.5" stroke="#9CA3AF" strokeWidth="1.5" />
                  <path d="M14 14l4 4" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Buscar artículos, amenazas, guías..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-bg-card border border-border-DEFAULT rounded-xl text-white placeholder:text-content-muted focus:outline-none focus:border-brand-primary focus:shadow-glow-primary transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <div className="section-container pb-24">
        <div className="flex flex-col xl:flex-row gap-10">
          {/* ── MAIN CONTENT ─────────────────────────────────── */}
          <div className="flex-1 min-w-0">

            {/* ── FEATURED ARTICLE ─── */}
            {activeCategory === "Todos" && !searchQuery && (
              <motion.section
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-12"
              >
                <h2 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-gradient-hero rounded-full inline-block" />
                  Artículo destacado
                </h2>
                <Link href={`/blog/${FEATURED_ARTICLE.slug}`} className="group block">
                  <div className="card-base overflow-hidden p-0">
                    {/* Hero gradient image */}
                    <div className="relative h-64 md:h-80 overflow-hidden">
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255,51,102,0.4) 0%, rgba(255,107,0,0.2) 40%, rgba(10,10,10,0.9) 100%)",
                        }}
                      />
                      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-25" />
                      {/* Decorative elements */}
                      <div className="absolute top-6 right-6 w-32 h-32 rounded-full bg-brand-danger opacity-10 blur-3xl" />
                      <div className="absolute bottom-6 left-6 w-24 h-24 rounded-full bg-brand-warning opacity-15 blur-2xl" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" opacity="0.15">
                          <rect x="10" y="10" width="60" height="60" rx="8" stroke="#FF3366" strokeWidth="2" />
                          <path d="M40 25v20M30 45h20" stroke="#FF3366" strokeWidth="3" strokeLinecap="round" />
                          <circle cx="40" cy="40" r="28" stroke="#FF6B00" strokeWidth="1" strokeDasharray="4 4" />
                        </svg>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <CategoryBadge category={FEATURED_ARTICLE.category} type={FEATURED_ARTICLE.categoryType} />
                      </div>
                    </div>

                    <div className="p-6 md:p-8">
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-gradient-primary transition-all">
                        {FEATURED_ARTICLE.title}
                      </h2>
                      <p className="text-content-secondary text-base mb-5 max-w-2xl">
                        {FEATURED_ARTICLE.description}
                      </p>
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <AuthorAvatar name={FEATURED_ARTICLE.author} size={36} />
                          <div>
                            <p className="text-white text-sm font-medium">{FEATURED_ARTICLE.author}</p>
                            <p className="text-content-muted text-xs">
                              {FEATURED_ARTICLE.date} · {FEATURED_ARTICLE.readTime} de lectura
                            </p>
                          </div>
                        </div>
                        <span className="flex items-center gap-2 text-brand-primary font-semibold text-sm group-hover:gap-3 transition-all">
                          Leer artículo
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.section>
            )}

            {/* ── CATEGORY FILTERS ─── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-brand-primary text-white shadow-glow-primary"
                      : "glass text-content-secondary hover:text-white hover:border-brand-primary/40"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>

            {/* ── ARTICLES GRID ─── */}
            {searched.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searched.map((article, i) => (
                  <ArticleCard key={article.slug} article={article} index={i} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-content-muted">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mx-auto mb-4 opacity-40">
                  <circle cx="24" cy="24" r="22" stroke="#6B7280" strokeWidth="2" />
                  <path d="M16 24h16M24 16v16" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <p className="text-lg">No se encontraron artículos</p>
                <button onClick={() => { setSearchQuery(""); setActiveCategory("Todos"); }} className="mt-3 text-brand-primary text-sm hover:underline">
                  Limpiar filtros
                </button>
              </div>
            )}

            {/* ── NEWSLETTER ─── */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-16 rounded-2xl overflow-hidden relative"
              style={{ background: "linear-gradient(135deg, rgba(0,112,243,0.15) 0%, rgba(0,212,255,0.08) 100%)" }}
            >
              <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20 pointer-events-none" />
              <div className="relative p-8 md:p-12 text-center">
                <div className="badge badge-primary mb-4 mx-auto w-fit">Newsletter semanal</div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Amenazas LATAM en tu bandeja de entrada
                </h3>
                <p className="text-content-secondary mb-6 max-w-lg mx-auto">
                  Cada semana: las amenazas más críticas de la región, análisis de grupos APT y guías técnicas accionables.
                </p>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <input
                    type="email"
                    placeholder="tu@empresa.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3 bg-bg-card border border-border-DEFAULT rounded-lg text-white placeholder:text-content-muted focus:outline-none focus:border-brand-primary transition-colors"
                  />
                  <button type="submit" className="btn-primary whitespace-nowrap">
                    Suscribirme
                  </button>
                </form>
                <p className="text-content-muted text-xs mt-3">Sin spam. Cancelá cuando quieras.</p>
              </div>
            </motion.section>
          </div>

          {/* ── SIDEBAR ──────────────────────────────────────── */}
          <aside className="xl:w-72 shrink-0 space-y-6">

            {/* Trending topics */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="card-base"
            >
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 12l4-4 3 3 5-7" stroke="#0070F3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Trending
              </h3>
              <div className="flex flex-wrap gap-2">
                {TRENDING_TOPICS.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => setSearchQuery(topic)}
                    className="px-3 py-1.5 glass text-content-secondary text-xs rounded-lg hover:text-brand-primary hover:border-brand-primary/40 transition-all"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Recent posts */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="card-base"
            >
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="2" width="12" height="12" rx="2" stroke="#0070F3" strokeWidth="1.5" />
                  <path d="M5 6h6M5 9h4" stroke="#0070F3" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Recientes
              </h3>
              <div className="space-y-4">
                {ARTICLES.slice(0, 5).map((a) => (
                  <Link
                    key={a.slug}
                    href={`/blog/${a.slug}`}
                    className="flex gap-3 group"
                  >
                    <div
                      className="w-14 h-14 rounded-lg shrink-0"
                      style={{
                        background:
                          a.categoryType === "danger"
                            ? "linear-gradient(135deg, rgba(255,51,102,0.4), rgba(17,24,39,1))"
                            : a.categoryType === "warning"
                            ? "linear-gradient(135deg, rgba(255,107,0,0.4), rgba(17,24,39,1))"
                            : "linear-gradient(135deg, rgba(0,112,243,0.4), rgba(17,24,39,1))",
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-medium line-clamp-2 group-hover:text-brand-primary transition-colors">
                        {a.title}
                      </p>
                      <p className="text-content-muted text-xs mt-1">{a.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Tags cloud */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="card-base"
            >
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 9l5-7 5 7H2z" stroke="#00FF88" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M6 14h4" stroke="#00FF88" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Medusa", "LockBit", "MITRE", "SOC", "OSINT", "CTI", "IR", "Phishing", "CVE", "Malware", "APT", "DDoS", "BEC", "MFA"].map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-bg-elevated border border-border-subtle text-content-muted text-xs rounded-md hover:text-white hover:border-brand-primary/40 cursor-pointer transition-all">
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* CTA box */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="rounded-xl overflow-hidden"
              style={{ background: "linear-gradient(135deg, #0070F3 0%, #00D4FF 100%)" }}
            >
              <div className="p-5">
                <h3 className="text-white font-bold text-base mb-2">
                  ¿Tu empresa está protegida?
                </h3>
                <p className="text-white/80 text-sm mb-4">
                  Evaluación de seguridad gratuita en 15 minutos.
                </p>
                <Link href="/trial" className="block w-full text-center py-2.5 bg-white text-brand-primary font-semibold text-sm rounded-lg hover:bg-gray-100 transition-colors">
                  Empezar gratis
                </Link>
              </div>
            </motion.div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}
