"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

// ================================================================
// ICONS
// ================================================================
const BookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const TerminalIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" />
  </svg>
);

const SearchIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="6 3 11 8 6 13" />
  </svg>
);

const PlayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

// ================================================================
// TYPES
// ================================================================
interface FaqItem {
  q: string;
  a: string;
}

// ================================================================
// DATA
// ================================================================
const DOC_CATEGORIES = [
  {
    id: "quickstart",
    title: "Inicio Rápido",
    description: "Instalá el agente y empezá a detectar amenazas en menos de 15 minutos.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    color: "#00FF88",
    articles: 8,
    href: "#quickstart",
  },
  {
    id: "siem",
    title: "SIEM y Logs",
    description: "Correlación de eventos, reglas personalizadas, retención y búsqueda full-text.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    color: "#0070F3",
    articles: 14,
    href: "#siem",
  },
  {
    id: "edr",
    title: "EDR y Endpoints",
    description: "Configuración del agente, análisis de comportamiento y respuesta automatizada.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8m-4-4v4" />
      </svg>
    ),
    color: "#00D4FF",
    articles: 12,
    href: "#edr",
  },
  {
    id: "vuln",
    title: "Gestión de Vulnerabilidades",
    description: "Escaneo CVE, priorización por CVSS y flujos de remediación.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    color: "#FFB800",
    articles: 9,
    href: "#vuln",
  },
  {
    id: "compliance",
    title: "Cumplimiento",
    description: "PCI-DSS, HIPAA, NOM-151, LGPD: generación automática de informes de auditoría.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    color: "#00FF88",
    articles: 11,
    href: "#compliance",
  },
  {
    id: "api",
    title: "API Reference",
    description: "Endpoints REST, autenticación, ejemplos en cURL, Python y JavaScript.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    color: "#0070F3",
    articles: 17,
    href: "#api",
  },
];

const POPULAR_GUIDES = [
  { title: "Instalar agente en 15 minutos", time: "15 min", badge: "Inicio Rápido", color: "#00FF88", href: "#" },
  { title: "Configurar alertas en Slack", time: "8 min", badge: "Integraciones", color: "#0070F3", href: "#" },
  { title: "Generar informe PCI-DSS automático", time: "5 min", badge: "Cumplimiento", color: "#FFB800", href: "#" },
  { title: "Integrar AWS CloudTrail", time: "20 min", badge: "Cloud", color: "#00D4FF", href: "#" },
  { title: "Crear reglas de correlación personalizadas", time: "30 min", badge: "SIEM", color: "#0070F3", href: "#" },
  { title: "Conectar Active Directory / LDAP", time: "25 min", badge: "Identidad", color: "#00D4FF", href: "#" },
];

const FAQS: FaqItem[] = [
  {
    q: "¿En qué sistemas operativos funciona el agente?",
    a: "El agente qatech360 es compatible con Windows 10/11/Server 2016+, macOS 12 Monterey+, y distribuciones Linux como Ubuntu 18.04+, Debian 10+, CentOS 7+, RHEL 7+, Amazon Linux 2, y Fedora 33+.",
  },
  {
    q: "¿Cuántos recursos consume el agente en producción?",
    a: "El agente está optimizado para impacto mínimo: consume menos de 10 MB de RAM en reposo, menos del 1% de CPU en operación normal, y menos del 3% durante escaneos de vulnerabilidades programados.",
  },
  {
    q: "¿Puedo usar la API para integrar qatech360 con mi SIEM existente?",
    a: "Sí. La API REST permite consultar alertas, agentes, eventos y métricas. Soporta webhooks para notificaciones en tiempo real. La documentación completa con ejemplos en Python, JavaScript y cURL está disponible en la sección API Reference.",
  },
  {
    q: "¿Cómo funciona la retención de logs?",
    a: "Los logs se almacenan en un sistema de capas hot/warm/cold. Los últimos 30 o 90 días (según plan) están disponibles para búsqueda instantánea. El almacenamiento cold extiende la retención hasta 7 años para requerimientos de cumplimiento. Todos los logs tienen sellado SHA-256 para integridad forense.",
  },
  {
    q: "¿Existe soporte para despliegues on-premise?",
    a: "Sí, en el plan Enterprise. Podemos desplegar el stack completo en tu infraestructura privada con soporte completo. Los planes Starter y Professional usan infraestructura gestionada por qatech360 en data centers LATAM (Brasil y Colombia).",
  },
];

const VIDEO_TUTORIALS = [
  {
    title: "Onboarding completo en 15 minutos",
    duration: "14:32",
    views: "12.4k",
    gradient: "from-[rgba(0,112,243,0.4)] to-[rgba(0,212,255,0.2)]",
  },
  {
    title: "Configurar tu primer dashboard SIEM",
    duration: "22:10",
    views: "8.1k",
    gradient: "from-[rgba(0,255,136,0.3)] to-[rgba(0,212,255,0.15)]",
  },
  {
    title: "Crear playbooks de respuesta automatizada",
    duration: "18:47",
    views: "6.7k",
    gradient: "from-[rgba(255,184,0,0.3)] to-[rgba(255,107,0,0.15)]",
  },
];

// ================================================================
// INSTALL TABS
// ================================================================
const INSTALL_TABS = ["Linux (Ubuntu/Debian)", "Linux (RHEL/CentOS)", "Windows", "macOS"] as const;
type InstallTab = typeof INSTALL_TABS[number];

const INSTALL_COMMANDS: Record<InstallTab, string> = {
  "Linux (Ubuntu/Debian)": `# Descarga e instala el agente con un solo comando
curl -s https://packages.qatech360.com/install.sh | sudo bash -s -- --agent

# Verifica el estado del agente
sudo systemctl status qatech360-agent

# El agente se conecta automáticamente al manager
# Deberías ver "Active: active (running)" en verde`,

  "Linux (RHEL/CentOS)": `# Importa la clave GPG del repositorio
sudo rpm --import https://packages.qatech360.com/gpg-key.asc

# Instala el agente via RPM
sudo rpm -i https://packages.qatech360.com/agent-latest.x86_64.rpm

# Habilita e inicia el servicio
sudo systemctl enable qatech360-agent
sudo systemctl start qatech360-agent`,

  "Windows": `# Ejecuta en PowerShell como Administrador

# Descarga el instalador MSI
Invoke-WebRequest -Uri "https://packages.qatech360.com/agent-latest.msi" \`
  -OutFile "$env:TEMP\\qatech360-agent.msi"

# Instala silenciosamente
Start-Process msiexec.exe -Wait \`
  -ArgumentList "/i $env:TEMP\\qatech360-agent.msi /quiet"

# Verifica el servicio
Get-Service -Name "qatech360-agent" | Select-Object Status, DisplayName`,

  "macOS": `# Instala usando Homebrew
brew tap qatech360/security
brew install qatech360-agent

# O descarga el paquete pkg directamente
curl -O https://packages.qatech360.com/agent-latest.pkg
sudo installer -pkg agent-latest.pkg -target /

# Inicia el agente
sudo launchctl load /Library/LaunchDaemons/com.qatech360.agent.plist`,
};

// ================================================================
// FAQ ACCORDION ITEM
// ================================================================
function FaqItem({ faq, index }: { faq: FaqItem; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="bg-[#111111] border border-[#2A2A2A] rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-[rgba(0,112,243,0.04)] transition-colors"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-white pr-4">{faq.q}</span>
        <svg
          width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0070F3"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s", flexShrink: 0 }}
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="overflow-hidden"
        >
          <p className="px-6 pb-5 text-sm text-[#9CA3AF] leading-relaxed">{faq.a}</p>
        </motion.div>
      )}
    </motion.div>
  );
}

// ================================================================
// PAGE COMPONENT
// ================================================================
export default function DocsPage() {
  const [activeTab, setActiveTab] = useState<InstallTab>("Linux (Ubuntu/Debian)");
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <NavBar />

      {/* Fixed background */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 40% at 50% -10%, rgba(0,112,243,0.18) 0%, transparent 70%)" }}
        />
      </div>

      <main className="relative z-10">

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section ref={heroRef} className="pt-28 pb-16 px-4 border-b border-[#2A2A2A]">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(0,112,243,0.3)] bg-[rgba(0,112,243,0.08)] text-[#0070F3] text-xs font-semibold mb-6">
                <BookIcon />
                Documentación
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-white mb-5 leading-tight">
                Centro de{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg, #0070F3 0%, #00D4FF 100%)" }}
                >
                  Documentación
                </span>
              </h1>
              <p className="text-[#9CA3AF] text-lg mb-10 max-w-2xl mx-auto">
                Todo lo que necesitás para empezar, crecer y dominar la plataforma qatech360. Guías técnicas, referencias de API y tutoriales en español.
              </p>

              {/* Search bar */}
              <div className="relative max-w-xl mx-auto">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]">
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  placeholder="Buscar en la documentación..."
                  className="w-full pl-12 pr-4 py-4 bg-[#111111] border border-[#2A2A2A] rounded-xl text-white placeholder:text-[#6B7280] focus:outline-none focus:border-[#0070F3] focus:ring-1 focus:ring-[rgba(0,112,243,0.3)] transition-all text-sm"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] text-xs font-mono">
                  ⌘K
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── QUICK START ───────────────────────────────────────── */}
        <section id="quickstart" className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-1 h-6 rounded-full bg-[#00FF88] inline-block" />
                <h2 className="text-3xl font-bold text-white">Instalación del Agente</h2>
              </div>
              <p className="text-[#9CA3AF] text-base ml-4">
                Copia y pega el comando para tu sistema operativo. El agente se configura solo en menos de 2 minutos.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="bg-[#111111] border border-[#2A2A2A] rounded-2xl overflow-hidden"
            >
              {/* Tab bar */}
              <div className="flex overflow-x-auto border-b border-[#2A2A2A] scrollbar-none">
                {INSTALL_TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-shrink-0 px-5 py-3.5 text-sm font-medium transition-all border-b-2 ${
                      activeTab === tab
                        ? "border-[#0070F3] text-[#0070F3] bg-[rgba(0,112,243,0.06)]"
                        : "border-transparent text-[#9CA3AF] hover:text-white hover:bg-[#1A1A1A]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Code block */}
              <div className="relative p-6">
                <button
                  onClick={() => navigator.clipboard?.writeText(INSTALL_COMMANDS[activeTab])}
                  className="absolute top-4 right-4 px-3 py-1.5 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-xs text-[#9CA3AF] hover:text-white hover:border-[#0070F3] transition-all flex items-center gap-1.5"
                  aria-label="Copiar comando"
                >
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                    <rect x="5" y="5" width="9" height="9" rx="1.5" /><path d="M3 11H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v1" />
                  </svg>
                  Copiar
                </button>
                <pre className="overflow-x-auto text-sm font-mono leading-relaxed">
                  {INSTALL_COMMANDS[activeTab].split("\n").map((line, i) => (
                    <div key={i} className={line.startsWith("#") ? "text-[#6B7280]" : "text-[#00D4FF]"}>
                      {line || "\u00A0"}
                    </div>
                  ))}
                </pre>
              </div>

              {/* Footer hint */}
              <div className="px-6 py-4 bg-[rgba(0,255,136,0.04)] border-t border-[rgba(0,255,136,0.12)] flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <circle cx="8" cy="8" r="7" fill="rgba(0,255,136,0.15)" />
                  <path d="M8 5v4M8 11v.5" stroke="#00FF88" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span className="text-xs text-[#00FF88]">
                  El agente se conecta automáticamente al manager de qatech360. No requiere configuración adicional.
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── DOCUMENTATION CATEGORIES ─────────────────────────── */}
        <section className="py-4 pb-20 px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="mb-10"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-1 h-6 rounded-full bg-[#0070F3] inline-block" />
                <h2 className="text-3xl font-bold text-white">Todas las Categorías</h2>
              </div>
              <p className="text-[#9CA3AF] ml-4">Navega por módulo o usa la búsqueda para encontrar exactamente lo que necesitás.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {DOC_CATEGORIES.map((cat, i) => (
                <motion.a
                  key={cat.id}
                  href={cat.href}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                  className="group bg-[#111111] border border-[#2A2A2A] rounded-xl p-6 hover:border-[rgba(0,112,243,0.4)] hover:bg-[#1A1A1A] transition-all duration-300 flex flex-col gap-4 cursor-pointer"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${cat.color}18`, color: cat.color }}
                  >
                    {cat.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-base mb-1.5 group-hover:text-[#0070F3] transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-[#9CA3AF] text-sm leading-relaxed">{cat.description}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#6B7280]">{cat.articles} artículos</span>
                    <span className="text-[#0070F3] flex items-center gap-1 text-xs font-medium group-hover:gap-2 transition-all">
                      Ver guías <ChevronRight />
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* ── POPULAR GUIDES ────────────────────────────────────── */}
        <section className="py-16 px-4 border-t border-[#2A2A2A]">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="flex items-center justify-between mb-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Guías Populares</h2>
                <p className="text-[#9CA3AF] text-sm">Las guías más consultadas por nuestros clientes.</p>
              </div>
              <Link
                href="/docs/all"
                className="hidden sm:flex items-center gap-1.5 text-sm text-[#0070F3] hover:text-[#00D4FF] transition-colors font-medium"
              >
                Ver todas <ChevronRight />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {POPULAR_GUIDES.map((guide, i) => (
                <motion.a
                  key={guide.title}
                  href={guide.href}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="group flex items-center gap-4 bg-[#111111] border border-[#2A2A2A] rounded-xl px-5 py-4 hover:border-[rgba(0,112,243,0.4)] hover:bg-[#1A1A1A] transition-all duration-200"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${guide.color}18`, color: guide.color }}
                  >
                    <TerminalIcon />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-semibold group-hover:text-[#0070F3] transition-colors truncate">{guide.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ background: `${guide.color}18`, color: guide.color }}
                      >
                        {guide.badge}
                      </span>
                      <span className="text-xs text-[#6B7280]">{guide.time} lectura</span>
                    </div>
                  </div>
                  <ChevronRight />
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* ── API REFERENCE PREVIEW ─────────────────────────────── */}
        <section id="api" className="py-20 px-4 border-t border-[#2A2A2A]">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid lg:grid-cols-2 gap-10 items-center"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.08)] text-[#00D4FF] text-xs font-semibold mb-5">
                  API Reference
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Integra qatech360 con tu stack existente
                </h2>
                <p className="text-[#9CA3AF] mb-6 leading-relaxed">
                  La API REST de qatech360 te permite consultar alertas, gestionar agentes, obtener métricas y configurar reglas desde cualquier plataforma. Compatible con cualquier lenguaje de programación.
                </p>
                <ul className="space-y-3 mb-8">
                  {["Autenticación Bearer Token", "Rate limiting: 1000 req/min", "Webhooks para eventos en tiempo real", "SDKs oficiales: Python, JavaScript, Go"].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-[#D1D5DB]">
                      <ShieldCheckIcon />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="#api"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0070F3] hover:bg-[#0050D0] text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  Ver API Reference <ChevronRight />
                </Link>
              </div>

              {/* Code sample */}
              <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3 border-b border-[#2A2A2A] bg-[#1A1A1A]">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#28CA41]" />
                  </div>
                  <span className="text-xs text-[#6B7280] font-mono">GET /api/v1/alerts</span>
                </div>
                <pre className="p-5 text-xs font-mono leading-relaxed overflow-x-auto">
                  <div className="text-[#6B7280]"># Listar alertas críticas del último día</div>
                  <div className="text-[#00D4FF] mt-2">curl -X GET \</div>
                  <div className="text-[#00D4FF]">{"  "}&quot;https://api.qatech360.com/v1/alerts?severity=critical&limit=10&since=24h&quot; \</div>
                  <div className="text-[#9CA3AF]">{"  "}-H <span className="text-[#00FF88]">&quot;Authorization: Bearer TU_TOKEN&quot;</span> \</div>
                  <div className="text-[#9CA3AF]">{"  "}-H <span className="text-[#00FF88]">&quot;Content-Type: application/json&quot;</span></div>
                  <div className="text-[#6B7280] mt-3"># Respuesta</div>
                  <div className="text-[#9CA3AF]">{"{"}</div>
                  <div className="text-[#9CA3AF]">{"  "}<span className="text-[#00D4FF]">&quot;total&quot;</span>: <span className="text-[#FFB800]">3</span>,</div>
                  <div className="text-[#9CA3AF]">{"  "}<span className="text-[#00D4FF]">&quot;alerts&quot;</span>: [{"{"}</div>
                  <div className="text-[#9CA3AF]">{"    "}<span className="text-[#00D4FF]">&quot;id&quot;</span>: <span className="text-[#00FF88]">&quot;a-7f3k2&quot;</span>,</div>
                  <div className="text-[#9CA3AF]">{"    "}<span className="text-[#00D4FF]">&quot;severity&quot;</span>: <span className="text-[#FF3366]">&quot;critical&quot;</span>,</div>
                  <div className="text-[#9CA3AF]">{"    "}<span className="text-[#00D4FF]">&quot;rule&quot;</span>: <span className="text-[#00FF88]">&quot;Brute force SSH detectado&quot;</span></div>
                  <div className="text-[#9CA3AF]">{"  "}{"}"}{"]"}</div>
                  <div className="text-[#9CA3AF]">{"}"}</div>
                </pre>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── VIDEO TUTORIALS ───────────────────────────────────── */}
        <section className="py-20 px-4 border-t border-[#2A2A2A]">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl font-bold text-white mb-3">Tutoriales en Video</h2>
              <p className="text-[#9CA3AF]">Aprende viendo. Todos los tutoriales están disponibles en español.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {VIDEO_TUTORIALS.map((video, i) => (
                <motion.div
                  key={video.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="group cursor-pointer"
                >
                  {/* Thumbnail */}
                  <div className={`relative h-40 rounded-xl overflow-hidden mb-4 bg-gradient-to-br ${video.gradient} border border-[#2A2A2A]`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-[rgba(0,112,243,0.4)] transition-all duration-300 text-white pl-1">
                        <PlayIcon />
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/60 rounded px-2 py-0.5 text-xs text-white font-mono">
                      {video.duration}
                    </div>
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-[#0070F3] transition-colors">{video.title}</h3>
                  <p className="text-[#6B7280] text-xs">{video.views} visualizaciones</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <section className="py-20 px-4 border-t border-[#2A2A2A]">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl font-bold text-white mb-3">Preguntas Frecuentes</h2>
              <p className="text-[#9CA3AF]">Las dudas técnicas más comunes de nuestros clientes.</p>
            </motion.div>
            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <FaqItem key={i} faq={faq} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA ────────────────────────────────────────── */}
        <section className="py-16 px-4 border-t border-[#2A2A2A]">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <p className="text-[#9CA3AF] text-lg mb-2">¿No encontraste lo que buscabas?</p>
              <h2 className="text-2xl font-bold text-white mb-6">Habla con nuestro equipo de soporte</h2>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0070F3] hover:bg-[#0050D0] text-white font-semibold rounded-lg transition-colors"
                >
                  Contactar soporte
                </Link>
                <a
                  href="https://wa.me/59170000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#111111] border border-[#2A2A2A] hover:border-[#0070F3] text-white font-semibold rounded-lg transition-all"
                >
                  WhatsApp 24/7
                </a>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
