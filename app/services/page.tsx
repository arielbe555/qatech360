"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

// ================================================================
// TYPES
// ================================================================
type Category = "todos" | "deteccion" | "proteccion" | "cumplimiento" | "respuesta" | "inteligencia";

interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  desc: string;
  category: Category;
  badge?: "popular" | "nuevo" | "enterprise";
  icon: React.ReactNode;
}

// ================================================================
// ICONS — inline SVGs
// ================================================================
const SiemIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect x="2" y="2" width="24" height="24" rx="4" stroke="#0070F3" strokeWidth="1.5" />
    <path d="M6 19l4-6 4 4 3-5 3 7" stroke="#0070F3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EdrIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect x="3" y="5" width="22" height="16" rx="2" stroke="#00D4FF" strokeWidth="1.5" />
    <path d="M9 23h10M14 21v2" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="14" cy="13" r="3" stroke="#00D4FF" strokeWidth="1.5" />
  </svg>
);

const XdrIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="11" stroke="#0070F3" strokeWidth="1.5" />
    <path d="M8 14h12M14 8v12" stroke="#0070F3" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="14" cy="14" r="3" fill="#0070F3" />
  </svg>
);

const VulnIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M14 3L4 8v8c0 5 4.5 9 10 11 5.5-2 10-6 10-11V8L14 3z" stroke="#FFB800" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M14 11v4M14 17v1" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const CloudIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M21 19a5 5 0 000-10 5.002 5.002 0 00-9.8 1.5A4 4 0 107 19h14z" stroke="#00D4FF" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const ComplianceIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect x="5" y="3" width="18" height="22" rx="2" stroke="#00FF88" strokeWidth="1.5" />
    <path d="M9 9h10M9 13h10M9 17h6" stroke="#00FF88" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M14 20l2 2 4-4" stroke="#00FF88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ThreatIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="4" stroke="#FFB800" strokeWidth="1.5" />
    <path d="M14 4v3M14 21v3M4 14h3M21 14h3M7.05 7.05l2.12 2.12M18.83 18.83l2.12 2.12M7.05 20.95l2.12-2.12M18.83 9.17l2.12-2.12" stroke="#FFB800" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IncidentIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M14 4l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6l2-6z" stroke="#FF3B3B" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const FimIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M6 4h10l6 6v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="#00D4FF" strokeWidth="1.5" />
    <path d="M16 4v6h6" stroke="#00D4FF" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M10 14l2 2 4-4" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LogIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect x="3" y="3" width="22" height="22" rx="3" stroke="#0070F3" strokeWidth="1.5" />
    <path d="M8 9h12M8 13h12M8 17h8" stroke="#0070F3" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ContainerIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect x="3" y="10" width="7" height="7" rx="1" stroke="#00FF88" strokeWidth="1.5" />
    <rect x="11" y="10" width="7" height="7" rx="1" stroke="#00FF88" strokeWidth="1.5" />
    <rect x="19" y="10" width="7" height="7" rx="1" stroke="#00FF88" strokeWidth="1.5" />
    <rect x="3" y="3" width="7" height="5" rx="1" stroke="#00FF88" strokeWidth="1.5" />
    <rect x="11" y="3" width="7" height="5" rx="1" stroke="#00FF88" strokeWidth="1.5" />
    <path d="M3 21c0 1.5 10 4 22 0" stroke="#00FF88" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ActiveResponseIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M14 3l2 7h7l-6 4 2 7-5-4-5 4 2-7-6-4h7l2-7z" stroke="#FFB800" strokeWidth="1.5" strokeLinejoin="round" fill="#FFB800" fillOpacity="0.2" />
  </svg>
);

// ================================================================
// SERVICES DATA
// ================================================================
const SERVICES: ServiceItem[] = [
  {
    id: "siem",
    slug: "siem",
    name: "SIEM",
    desc: "Centraliza logs y detecta amenazas en tiempo real con correlación de eventos y mapeo MITRE ATT&CK.",
    category: "deteccion",
    badge: "popular",
    icon: <SiemIcon />,
  },
  {
    id: "edr",
    slug: "edr",
    name: "EDR",
    desc: "Agente ligero para Windows, Linux y macOS. Detecta malware, ransomware y comportamiento anómalo.",
    category: "proteccion",
    badge: "popular",
    icon: <EdrIcon />,
  },
  {
    id: "xdr",
    slug: "xdr",
    name: "XDR",
    desc: "Correlación cross-layer entre endpoints, red, cloud e identidad. MTTR inferior a 5 minutos.",
    category: "deteccion",
    icon: <XdrIcon />,
  },
  {
    id: "vuln-mgmt",
    slug: "vulnerability-management",
    name: "Gestión de Vulnerabilidades",
    desc: "Escaneo continuo de CVEs con priorización por CVSS 3.1 y probabilidad de exploit (EPSS).",
    category: "proteccion",
    badge: "popular",
    icon: <VulnIcon />,
  },
  {
    id: "cloud-security",
    slug: "cloud-security",
    name: "Seguridad en la Nube",
    desc: "Monitoreo de AWS, Azure y GCP. Detecta configuraciones incorrectas y llamadas API sospechosas.",
    category: "proteccion",
    icon: <CloudIcon />,
  },
  {
    id: "compliance",
    slug: "compliance",
    name: "Automatización de Cumplimiento",
    desc: "PCI-DSS, HIPAA, GDPR, SOC2, NOM-151 y LGPD. Reportes listos para auditoría en minutos.",
    category: "cumplimiento",
    badge: "enterprise",
    icon: <ComplianceIcon />,
  },
  {
    id: "threat-intel",
    slug: "threat-intelligence",
    name: "Inteligencia de Amenazas",
    desc: "Feed propietario LATAM, integración con VirusTotal y MISP. Alertas enriquecidas con contexto.",
    category: "inteligencia",
    icon: <ThreatIcon />,
  },
  {
    id: "incident-response",
    slug: "incident-response",
    name: "Respuesta a Incidentes",
    desc: "SOC LATAM 24/7. SLA P1 < 15 min. Comunicación en español con informes ejecutivos completos.",
    category: "respuesta",
    badge: "enterprise",
    icon: <IncidentIcon />,
  },
  {
    id: "fim",
    slug: "file-integrity",
    name: "Monitoreo de Integridad de Archivos",
    desc: "Detecta cambios no autorizados en archivos críticos del sistema. Esencial para PCI-DSS e HIPAA.",
    category: "cumplimiento",
    icon: <FimIcon />,
  },
  {
    id: "log-mgmt",
    slug: "log-management",
    name: "Gestión de Logs",
    desc: "Centraliza logs de 500+ formatos. Búsqueda de texto completo. Retención configurable hasta 7 años.",
    category: "deteccion",
    icon: <LogIcon />,
  },
  {
    id: "container-security",
    slug: "container-security",
    name: "Seguridad de Contenedores",
    desc: "Monitoreo de Docker y Kubernetes. Detecta escapes de contenedor y escalada de privilegios.",
    category: "proteccion",
    badge: "nuevo",
    icon: <ContainerIcon />,
  },
  {
    id: "active-response",
    slug: "active-response",
    name: "Respuesta Activa",
    desc: "Bloqueo automático de IPs, cuarentena de archivos y aislamiento de endpoints en milisegundos.",
    category: "respuesta",
    icon: <ActiveResponseIcon />,
  },
];

const CATEGORIES: { id: Category; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "deteccion", label: "Detección" },
  { id: "proteccion", label: "Protección" },
  { id: "cumplimiento", label: "Cumplimiento" },
  { id: "respuesta", label: "Respuesta" },
  { id: "inteligencia", label: "Inteligencia" },
];

const CATEGORY_COLORS: Record<Category, string> = {
  todos: "#0070F3",
  deteccion: "#0070F3",
  proteccion: "#00D4FF",
  cumplimiento: "#00FF88",
  respuesta: "#FF3B3B",
  inteligencia: "#FFB800",
};

const BADGE_STYLES: Record<string, string> = {
  popular: "bg-[#0070F3]/10 text-[#0070F3] border-[#0070F3]/30",
  nuevo: "bg-[#00FF88]/10 text-[#00FF88] border-[#00FF88]/30",
  enterprise: "bg-[#FFB800]/10 text-[#FFB800] border-[#FFB800]/30",
};

const BADGE_LABELS: Record<string, string> = {
  popular: "Popular",
  nuevo: "Nuevo",
  enterprise: "Enterprise",
};

// Quiz data
const QUIZ_QUESTIONS = [
  {
    id: "size",
    question: "¿Cuántos endpoints tiene tu empresa?",
    options: ["Menos de 25", "25 – 100", "100 – 500", "500+"],
  },
  {
    id: "industry",
    question: "¿En qué industria operas?",
    options: ["Fintech / Banca", "Salud", "E-commerce / Retail", "Gobierno", "Tecnología / SaaS", "Otra"],
  },
  {
    id: "concern",
    question: "¿Cuál es tu mayor preocupación de seguridad?",
    options: ["Ransomware", "Cumplimiento regulatorio", "Visibilidad de amenazas", "Protección en la nube"],
  },
];

// ================================================================
// PAGE COMPONENT
// ================================================================
export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("todos");
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [quizDone, setQuizDone] = useState(false);

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const filtered =
    activeCategory === "todos"
      ? SERVICES
      : SERVICES.filter((s) => s.category === activeCategory);

  function handleQuizAnswer(answer: string) {
    const next = [...quizAnswers, answer];
    setQuizAnswers(next);
    if (quizStep < QUIZ_QUESTIONS.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      setQuizDone(true);
    }
  }

  function getRecommendation(): string {
    const [size, , concern] = quizAnswers;
    if (size === "Menos de 25") return "Plan Inicial — SIEM + EDR + FIM. Contáctanos para precios.";
    if (concern === "Cumplimiento regulatorio") return "Plan Profesional con Automatización de Cumplimiento";
    if (concern === "Protección en la nube") return "Plan Profesional con Seguridad en la Nube";
    return "Plan Profesional — protección 24/7 con XDR + SOC LATAM";
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <NavBar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-20 px-6 overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#0070F3]/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0070F3]/40 bg-[#0070F3]/10 text-[#00D4FF] text-sm font-medium mb-6">
              12 servicios de seguridad · Todos gestionados
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Todos nuestros servicios
            </h1>
            <p className="text-xl text-[#A0A0A0] max-w-2xl mx-auto">
              Seguridad completa para cada capa de tu infraestructura. Motor de detección propio, gestionado por expertos LATAM.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FILTER TABS + GRID ────────────────────────────────── */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-3 justify-center mb-12"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
                style={
                  activeCategory === cat.id
                    ? {
                        background: CATEGORY_COLORS[cat.id] + "22",
                        color: CATEGORY_COLORS[cat.id],
                        border: `1px solid ${CATEGORY_COLORS[cat.id]}55`,
                      }
                    : {
                        background: "#111111",
                        color: "#A0A0A0",
                        border: "1px solid #2A2A2A",
                      }
                }
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Services grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className="group bg-[#111111] border border-[#2A2A2A] rounded-xl p-6 hover:border-[#0070F3]/40 transition-all duration-300 flex flex-col"
              >
                {/* Top row: badge + category */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-xs font-medium px-2.5 py-0.5 rounded-full border"
                    style={{
                      background: CATEGORY_COLORS[service.category] + "15",
                      color: CATEGORY_COLORS[service.category],
                      borderColor: CATEGORY_COLORS[service.category] + "40",
                    }}
                  >
                    {CATEGORIES.find((c) => c.id === service.category)?.label}
                  </span>
                  {service.badge && (
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${BADGE_STYLES[service.badge]}`}
                    >
                      {BADGE_LABELS[service.badge]}
                    </span>
                  )}
                </div>

                {/* Icon */}
                <div className="mb-4">{service.icon}</div>

                {/* Content */}
                <h3 className="text-lg font-bold mb-2">{service.name}</h3>
                <p className="text-[#A0A0A0] text-sm leading-relaxed flex-1 mb-5">{service.desc}</p>

                {/* CTA */}
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-2 text-[#0070F3] text-sm font-medium hover:gap-3 transition-all duration-200"
                >
                  Ver más
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="#0070F3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUIZ ──────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#0D0D0D] border-y border-[#2A2A2A]">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-3">¿No sabes por dónde empezar?</h2>
            <p className="text-[#A0A0A0]">Responde 3 preguntas y te recomendamos el plan ideal para tu empresa.</p>
          </motion.div>

          <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-8">
            {quizDone ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/40 flex items-center justify-center mx-auto mb-6">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M8 16l6 6 10-12" stroke="#00FF88" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Nuestra recomendación</h3>
                <p className="text-[#00FF88] font-semibold text-lg mb-6">{getRecommendation()}</p>
                <div className="flex gap-4 justify-center">
                  <Link
                    href="/pricing"
                    className="px-6 py-2.5 bg-[#0070F3] hover:bg-[#0050D0] text-white font-semibold rounded-lg text-sm transition-all duration-200"
                  >
                    Ver planes y precios
                  </Link>
                  <button
                    onClick={() => { setQuizStep(0); setQuizAnswers([]); setQuizDone(false); }}
                    className="px-6 py-2.5 border border-[#2A2A2A] text-[#A0A0A0] hover:text-white rounded-lg text-sm transition-all duration-200"
                  >
                    Empezar de nuevo
                  </button>
                </div>
              </motion.div>
            ) : (
              <>
                {/* Progress */}
                <div className="flex gap-2 mb-8">
                  {QUIZ_QUESTIONS.map((_, i) => (
                    <div
                      key={i}
                      className="h-1 flex-1 rounded-full transition-all duration-300"
                      style={{ background: i <= quizStep ? "#0070F3" : "#2A2A2A" }}
                    />
                  ))}
                </div>

                <p className="text-sm text-[#666] mb-3">
                  Pregunta {quizStep + 1} de {QUIZ_QUESTIONS.length}
                </p>
                <h3 className="text-xl font-bold mb-6">
                  {QUIZ_QUESTIONS[quizStep].question}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {QUIZ_QUESTIONS[quizStep].options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleQuizAnswer(opt)}
                      className="px-4 py-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-sm text-left hover:border-[#0070F3]/50 hover:bg-[#0070F3]/10 hover:text-[#0070F3] transition-all duration-200"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── COMPARE PLANS CTA ─────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">¿Cuánto cuesta proteger tu empresa?</h2>
            <p className="text-[#A0A0A0] mb-8">
              Planes flexibles para cada necesidad. Contáctanos para conocer precios.
            </p>
            <Link
              href="/pricing"
              className="inline-block px-10 py-4 bg-[#0070F3] hover:bg-[#0050D0] text-white font-bold rounded-lg transition-all duration-200 shadow-[0_0_30px_rgba(0,112,243,0.3)]"
            >
              Comparar planes →
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
