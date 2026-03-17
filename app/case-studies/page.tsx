"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

// ================================================================
// ICONS
// ================================================================
const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

const TrendDown = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00FF88" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" /><polyline points="17 18 23 18 23 12" />
  </svg>
);

// ================================================================
// LATAM MAP (inline SVG, simplified)
// ================================================================
function LatamMap() {
  const cities = [
    { cx: 230, cy: 200, label: "Ciudad de México" },
    { cx: 180, cy: 280, label: "Guatemala" },
    { cx: 200, cy: 320, label: "Bogotá" },
    { cx: 175, cy: 370, label: "Lima" },
    { cx: 310, cy: 300, label: "Caracas" },
    { cx: 340, cy: 410, label: "Brasilia" },
    { cx: 300, cy: 490, label: "São Paulo" },
    { cx: 230, cy: 510, label: "Buenos Aires" },
    { cx: 220, cy: 460, label: "Santiago" },
    { cx: 270, cy: 510, label: "Montevideo" },
    { cx: 250, cy: 360, label: "La Paz" },
  ];

  return (
    <div className="relative flex justify-center">
      <svg
        viewBox="0 0 500 600"
        className="w-full max-w-sm opacity-80"
        aria-label="Mapa de América Latina con clientes qatech360"
        role="img"
      >
        {/* Simplified continent shape */}
        <defs>
          <radialGradient id="cityGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0070F3" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Continent outline — Mexico + Central + South America approximate */}
        <path
          d="M200,80 L240,70 L270,90 L280,110 L260,130 L270,150 L250,165 L240,155 L230,170
             L215,175 L200,165 L195,180 L185,190 L175,210 L165,230 L160,250 L155,270
             L160,290 L155,310 L160,330 L155,350 L160,370 L155,390 L158,410 L160,430
             L165,450 L170,470 L185,490 L200,510 L215,520 L225,530 L235,525 L245,535
             L255,530 L265,520 L280,510 L290,500 L300,490 L310,470 L320,450 L325,430
             L330,410 L340,390 L350,370 L355,350 L360,330 L355,310 L358,290 L350,270
             L345,250 L340,230 L335,210 L325,195 L318,180 L315,165 L320,150 L315,130
             L300,110 L285,90 L270,85 L255,80 Z"
          fill="rgba(0,112,243,0.06)"
          stroke="rgba(0,112,243,0.25)"
          strokeWidth="1.5"
        />

        {/* Grid lines */}
        {[100, 200, 300, 400, 500].map((y) => (
          <line key={`h${y}`} x1="100" y1={y} x2="400" y2={y} stroke="rgba(0,112,243,0.06)" strokeWidth="1" strokeDasharray="4,8" />
        ))}
        {[150, 250, 350].map((x) => (
          <line key={`v${x}`} x1={x} y1="60" x2={x} y2="560" stroke="rgba(0,112,243,0.06)" strokeWidth="1" strokeDasharray="4,8" />
        ))}

        {/* City dots with pulse */}
        {cities.map((city, i) => (
          <g key={city.label} filter="url(#glow)">
            {/* Outer pulse ring */}
            <circle
              cx={city.cx}
              cy={city.cy}
              r="12"
              fill="none"
              stroke="#0070F3"
              strokeWidth="1"
              opacity="0.3"
            >
              <animate attributeName="r" values="8;16;8" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0;0.4" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
            {/* Inner dot */}
            <circle cx={city.cx} cy={city.cy} r="4" fill="#00D4FF" opacity="0.9" />
            <circle cx={city.cx} cy={city.cy} r="2" fill="white" />
          </g>
        ))}

        {/* City labels — show only a few */}
        {[cities[0], cities[3], cities[6], cities[7]].map((city) => (
          <text
            key={`label-${city.label}`}
            x={city.cx + 8}
            y={city.cy + 4}
            fill="rgba(156,163,175,0.8)"
            fontSize="9"
            fontFamily="sans-serif"
          >
            {city.label}
          </text>
        ))}
      </svg>
    </div>
  );
}

// ================================================================
// DATA
// ================================================================
type IncludedValue = boolean | "partial" | string;

interface CaseStudy {
  id: string;
  logo: string;
  company: string;
  industry: string;
  country: string;
  challenge: string;
  metric: string;
  metricLabel: string;
  href: string;
}

const CASE_STUDIES: CaseStudy[] = [
  { id: "1", logo: "BC", company: "Banco Cooperativo Regional", industry: "Finanzas", country: "Argentina", challenge: "Ransomware activo en 3 sucursales simultáneas", metric: "0", metricLabel: "brechas en 18 meses", href: "#case-banco" },
  { id: "2", logo: "CM", company: "Clínica Santa María", industry: "Salud", country: "Colombia", challenge: "Accesos no autorizados a registros de pacientes", metric: "↓98%", metricLabel: "alertas falsas positivas", href: "#case-clinica" },
  { id: "3", logo: "EA", company: "Exportadora Los Andes", industry: "Manufactura", country: "Chile", challenge: "Supply chain attack en sistemas OT/SCADA", metric: "↓85%", metricLabel: "tiempo de detección", href: "#case-andes" },
  { id: "4", logo: "GT", company: "GovTech Municipalidad Capital", industry: "Gobierno", country: "México", challenge: "Phishing masivo contra empleados públicos", metric: "↓94%", metricLabel: "incidentes de phishing", href: "#" },
  { id: "5", logo: "RP", company: "Retail Plus SA", industry: "Retail", country: "Perú", challenge: "Compromiso de puntos de venta (POS) en 50 tiendas", metric: "PCI-DSS", metricLabel: "certificado en 60 días", href: "#" },
  { id: "6", logo: "TS", company: "TechSystems Latam", industry: "Tecnología", country: "Brasil", challenge: "Crypto-mining oculto en servidores cloud", metric: "↓70%", metricLabel: "costos de infraestructura", href: "#" },
  { id: "7", logo: "EP", company: "Empresa Provincial de Energía", industry: "Gobierno", country: "Argentina", challenge: "Vulnerabilidades en infraestructura crítica SCADA", metric: "48h", metricLabel: "tiempo de respuesta → 4min", href: "#" },
  { id: "8", logo: "SU", company: "Salud Universal SA", industry: "Salud", country: "México", challenge: "Cumplimiento NOM-024 y protección datos clínicos", metric: "ISO 27001", metricLabel: "en 90 días", href: "#" },
  { id: "9", logo: "MF", company: "MicroFinanzas del Sur", industry: "Finanzas", country: "Uruguay", challenge: "Fraude interno y exfiltración de datos de clientes", metric: "$2.1M", metricLabel: "pérdidas evitadas", href: "#" },
];

const FEATURED_CASES = [
  {
    id: "banco",
    logo: "BC",
    company: "Banco Cooperativo Regional",
    industry: "Finanzas",
    country: "Argentina",
    size: "450 empleados · 12 sucursales",
    color: "#0070F3",
    challenge: `El Banco Cooperativo Regional operaba con una combinación de antivirus legacy y firewalls de perímetro que no detectaban amenazas modernas. En el primer trimestre de 2024, sufrieron 3 intentos de ransomware simultáneos en sucursales de distintas provincias, con acceso comprometido a cuentas de servicio con privilegios elevados.

El equipo de IT de 5 personas era incapaz de correlacionar eventos distribuidos. Los falsos positivos consumían el 70% del tiempo del equipo, dejando amenazas reales sin respuesta oportuna. El regulatorio BCRA exigía además cumplimiento con la Comunicación A 7724.`,
    solution: `Implementamos qatech360 Professional con cobertura de los 180 endpoints del banco en un fin de semana. La migración desde el antivirus legacy fue transparente para los usuarios. El SIEM integrado comenzó a correlacionar eventos de todos los sistemas bancarios (core, cajeros, portales web) en la misma plataforma.

En las primeras 48 horas, la IA detectó 2 cuentas de servicio con comportamiento anómalo (movimiento lateral hacia Active Directory). El SOC de qatech360 intervino automáticamente, conteniendo el incidente antes de que llegara a sistemas core. Se generó el reporte de cumplimiento BCRA en 4 horas.`,
    metrics: [
      { value: "0", label: "Brechas de seguridad", sublabel: "en 18 meses" },
      { value: "98%", label: "Reducción falsos positivos", sublabel: "de 400 a 8 alertas/día" },
      { value: "4 min", label: "Tiempo de contención", sublabel: "antes era +48 horas" },
      { value: "$890K", label: "Pérdidas evitadas estimadas", sublabel: "ROI del primer año" },
    ],
    quote: "Antes teníamos miedo de que un ransomware nos dejara fuera de servicio durante días. Con qatech360, el equipo de SOC contenía incidentes mientras nosotros dormíamos. El banco nunca tuvo que declarar un incidente ante el BCRA.",
    quotePerson: "Ing. Roberto Sánchez",
    quoteRole: "CISO · Banco Cooperativo Regional",
    timeline: [
      { phase: "Semana 1", event: "Deployment en 180 endpoints" },
      { phase: "Semana 2", event: "Baseline de comportamiento establecido" },
      { phase: "Semana 3", event: "Primer incidente contenido automáticamente" },
      { phase: "Mes 2", event: "Certificación BCRA A-7724 completada" },
    ],
  },
  {
    id: "clinica",
    logo: "CM",
    company: "Clínica Santa María",
    industry: "Salud",
    country: "Colombia",
    size: "820 empleados · 3 sedes",
    color: "#00FF88",
    challenge: `La clínica manejaba registros de más de 200,000 pacientes en sistemas legados Windows Server 2008. Una auditoría interna reveló que 14 cuentas de usuario tenían acceso sin restricciones a la base de datos de historias clínicas, y que varios intentos de exfiltración de datos habían pasado desapercibidos durante meses.

La regulación colombiana (Resolución 2654 de 2019) exigía protección activa de datos de salud. El hospital también debía demostrar controles ante aseguradoras y el Ministerio de Salud.`,
    solution: `Desplegamos qatech360 Essential en las 3 sedes con integración directa al sistema HIS (Hospital Information System). El módulo de UEBA (User and Entity Behavior Analytics) mapeó los patrones de acceso legítimos en 72 horas y comenzó a detectar desviaciones inmediatamente.

Implementamos microsegmentación de la red médica, separando equipos clínicos de administración. Se configuraron políticas de Data Loss Prevention específicas para archivos con datos de salud (identificación automática por patrones de CEDULAs y diagnósticos CIE-10).`,
    metrics: [
      { value: "↓98%", label: "Alertas falsas positivas", sublabel: "foco en amenazas reales" },
      { value: "12", label: "Amenazas internas detectadas", sublabel: "en los primeros 30 días" },
      { value: "100%", label: "Cumplimiento Res. 2654", sublabel: "auditoría aprobada" },
      { value: "15 min", label: "Onboarding completo", sublabel: "por sede" },
    ],
    quote: "Nuestros pacientes confían en que sus datos están protegidos. Con qatech360 no solo cumplimos con la normativa: tenemos visibilidad total de quién accede a qué información y cuándo. Eso no tiene precio.",
    quotePerson: "Dra. Carolina Medina",
    quoteRole: "Directora de Tecnología · Clínica Santa María",
    timeline: [
      { phase: "Día 1", event: "Instalación en 220 equipos médicos" },
      { phase: "Día 3", event: "UEBA baseline completado" },
      { phase: "Semana 2", event: "12 amenazas internas identificadas y documentadas" },
      { phase: "Mes 3", event: "Auditoría Ministerio de Salud aprobada" },
    ],
  },
  {
    id: "andes",
    logo: "EA",
    company: "Exportadora Los Andes",
    industry: "Manufactura",
    country: "Chile",
    size: "1,200 empleados · 4 plantas",
    color: "#FF6B00",
    challenge: `La exportadora operaba maquinaria industrial conectada a sistemas SCADA/OT en 4 plantas de producción. En marzo de 2024, un ataque de supply chain comprometió el proveedor de actualizaciones del software de control, inyectando código malicioso que intentó detener líneas de producción.

El tiempo de detección promedio superaba las 36 horas. Un paro de producción de 24 horas representaba pérdidas de aproximadamente $400,000 USD. La empresa no tenía visibilidad de los sistemas OT desde la perspectiva de seguridad.`,
    solution: `Implementamos qatech360 Enterprise con el módulo OT/ICS especializado. A diferencia de soluciones tradicionales, el agente operaba en modo "read-only" en sistemas SCADA críticos para no interferir con los procesos industriales, monitoreando el tráfico de red con sensores pasivos.

Se integró con el SIEM de la empresa para correlacionar eventos IT y OT en una única vista. El Threat Hunting automatizado identificó el patrón del supply chain attack y lo bloqueó en todos los sistemas en menos de 8 minutos.`,
    metrics: [
      { value: "↓85%", label: "Tiempo de detección", sublabel: "de 36h a 4 minutos" },
      { value: "8 min", label: "Contención del ataque SC", sublabel: "sin paro de producción" },
      { value: "$1.2M", label: "Pérdida evitada estimada", sublabel: "en paros de planta" },
      { value: "4 plantas", label: "Integración OT/IT", sublabel: "vista unificada" },
    ],
    quote: "Nos atacaron por el proveedor de software, no directamente. Eso era imposible de detectar con herramientas tradicionales. El módulo OT de qatech360 detectó el comportamiento anómalo en la red industrial y lo detuvo antes de que llegara a los PLCs. Fue determinante.",
    quotePerson: "Fernando Vargas",
    quoteRole: "Director de Operaciones TI · Exportadora Los Andes",
    timeline: [
      { phase: "Semana 1-2", event: "Deployment pasivo en redes OT/IT" },
      { phase: "Semana 3", event: "Integración SIEM y dashboards unificados" },
      { phase: "Mes 2", event: "Supply chain attack detectado y bloqueado" },
      { phase: "Mes 3", event: "SOC 24/7 full operativo para las 4 plantas" },
    ],
  },
];

const INDUSTRY_SECTORS = [
  { name: "Finanzas", clients: 18, icon: "🏦", color: "#0070F3" },
  { name: "Salud", clients: 12, icon: "🏥", color: "#00FF88" },
  { name: "Manufactura", clients: 8, icon: "🏭", color: "#FF6B00" },
  { name: "Gobierno", clients: 7, icon: "🏛️", color: "#00D4FF" },
  { name: "Tecnología", clients: 11, icon: "💻", color: "#9CA3AF" },
  { name: "Retail", clients: 5, icon: "🛍️", color: "#FF3366" },
];

const FILTERS = ["Todos", "Finanzas", "Salud", "Manufactura", "Gobierno", "Tecnología", "Retail"];

// ================================================================
// COMPANY LOGO PLACEHOLDER
// ================================================================
function CompanyLogo({ initials, color }: { initials: string; color: string }) {
  return (
    <div
      className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0"
      style={{ background: `linear-gradient(135deg, ${color}40 0%, ${color}20 100%)`, border: `1px solid ${color}30` }}
    >
      <span style={{ color }}>{initials}</span>
    </div>
  );
}

// ================================================================
// MAIN PAGE
// ================================================================
export default function CaseStudiesPage() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [expandedCase, setExpandedCase] = useState<string | null>(null);

  const filtered = activeFilter === "Todos"
    ? CASE_STUDIES
    : CASE_STUDIES.filter((c) => c.industry === activeFilter);

  const industryColors: Record<string, string> = {
    Finanzas: "#0070F3",
    Salud: "#00FF88",
    Manufactura: "#FF6B00",
    Gobierno: "#00D4FF",
    Tecnología: "#9CA3AF",
    Retail: "#FF3366",
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <NavBar />

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(0,212,255,0.08) 0%, transparent 60%)" }}
        />
      </div>

      <main className="relative z-10 pt-20">

        {/* ── HERO + MAP ── */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <span className="badge badge-accent mb-6">Casos de éxito</span>
                <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
                  <span className="text-gradient-accent">50+ empresas</span><br />
                  LATAM protegidas.
                </h1>
                <p className="text-xl text-[#9CA3AF] mb-8 leading-relaxed">
                  Desde bancos cooperativos en Argentina hasta clínicas en Colombia y plantas industriales en Chile. Resultados reales, medibles, en tiempo récord.
                </p>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    { value: "50+", label: "Empresas protegidas" },
                    { value: "8", label: "Países en LATAM" },
                    { value: "99.9%", label: "Uptime garantizado" },
                  ].map((stat) => (
                    <div key={stat.label} className="glass rounded-xl p-4 text-center">
                      <p className="text-2xl font-black text-gradient-primary mb-1">{stat.value}</p>
                      <p className="text-xs text-[#9CA3AF]">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <Link href="/trial" className="btn-primary">
                  Convertite en el próximo caso de éxito →
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <LatamMap />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── FILTERS + GRID ── */}
        <section className="py-16 px-4 border-t border-[rgba(55,65,81,0.3)]">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap gap-3 mb-10"
              role="group"
              aria-label="Filtrar por industria"
            >
              {FILTERS.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    activeFilter === filter
                      ? "bg-[#0070F3] text-white shadow-[0_0_20px_rgba(0,112,243,0.4)]"
                      : "bg-[#111827] text-[#9CA3AF] border border-[#374151] hover:border-[rgba(0,112,243,0.4)] hover:text-white"
                  }`}
                  aria-pressed={activeFilter === filter}
                >
                  {filter}
                </button>
              ))}
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {filtered.map((cs, idx) => {
                  const color = industryColors[cs.industry] ?? "#0070F3";
                  return (
                    <motion.article
                      key={cs.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.07 }}
                      className="card-base group flex flex-col"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <CompanyLogo initials={cs.logo} color={color} />
                        <span
                          className="badge text-xs"
                          style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}
                        >
                          {cs.industry}
                        </span>
                      </div>

                      <h3 className="text-white font-bold text-base mb-1">{cs.company}</h3>
                      <p className="text-[#6B7280] text-xs mb-3 flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                        </svg>
                        {cs.country}
                      </p>

                      <p className="text-[#9CA3AF] text-sm mb-4 flex-1 leading-relaxed">{cs.challenge}</p>

                      <div className="bg-[#0A0A0A] rounded-xl p-3 mb-4 flex items-center gap-2">
                        <TrendDown />
                        <div>
                          <span className="text-lg font-black" style={{ color }}>{cs.metric}</span>
                          <span className="text-xs text-[#9CA3AF] ml-2">{cs.metricLabel}</span>
                        </div>
                      </div>

                      <a
                        href={cs.href}
                        className="flex items-center gap-2 text-sm font-semibold text-[#0070F3] hover:text-[#00D4FF] transition-colors group-hover:gap-3"
                        aria-label={`Leer caso completo de ${cs.company}`}
                      >
                        Leer caso completo <ArrowRight />
                      </a>
                    </motion.article>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ── FEATURED CASES ── */}
        <section className="py-20 px-4 border-t border-[rgba(55,65,81,0.3)]">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                Casos de éxito <span className="text-gradient-primary">detallados</span>
              </h2>
              <p className="text-[#9CA3AF] text-lg max-w-2xl mx-auto">
                Historia completa: el desafío, la solución y los resultados medibles.
              </p>
            </motion.div>

            <div className="space-y-8">
              {FEATURED_CASES.map((fc, idx) => {
                const isOpen = expandedCase === fc.id;
                return (
                  <motion.div
                    key={fc.id}
                    id={`case-${fc.id}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="glass-strong rounded-2xl overflow-hidden"
                    style={{ borderColor: isOpen ? `${fc.color}40` : undefined }}
                  >
                    {/* Header */}
                    <button
                      onClick={() => setExpandedCase(isOpen ? null : fc.id)}
                      className="w-full p-8 flex items-center justify-between gap-6 hover:bg-[rgba(0,112,243,0.03)] transition-colors text-left"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-5">
                        <div
                          className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black flex-shrink-0"
                          style={{ background: `${fc.color}20`, border: `2px solid ${fc.color}40`, color: fc.color }}
                        >
                          {fc.logo}
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-3 mb-1">
                            <h3 className="text-xl font-bold text-white">{fc.company}</h3>
                            <span
                              className="badge text-xs"
                              style={{ background: `${fc.color}15`, color: fc.color, border: `1px solid ${fc.color}30` }}
                            >
                              {fc.industry}
                            </span>
                            <span className="text-[#6B7280] text-xs">{fc.country}</span>
                          </div>
                          <p className="text-[#9CA3AF] text-sm">{fc.size}</p>
                        </div>
                      </div>

                      {/* Key metrics preview */}
                      <div className="hidden md:flex gap-6 items-center flex-shrink-0">
                        {fc.metrics.slice(0, 2).map((m) => (
                          <div key={m.label} className="text-center">
                            <p className="text-2xl font-black" style={{ color: fc.color }}>{m.value}</p>
                            <p className="text-xs text-[#6B7280]">{m.sublabel}</p>
                          </div>
                        ))}
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 flex-shrink-0"
                          style={{ background: `${fc.color}20`, transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={fc.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </div>
                      </div>
                    </button>

                    {/* Expanded content */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="overflow-hidden"
                        >
                          <div className="px-8 pb-8 border-t border-[rgba(55,65,81,0.4)]">

                            {/* 4 metrics */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8">
                              {fc.metrics.map((m) => (
                                <div
                                  key={m.label}
                                  className="rounded-xl p-4 text-center"
                                  style={{ background: `${fc.color}08`, border: `1px solid ${fc.color}20` }}
                                >
                                  <p className="text-3xl font-black mb-1" style={{ color: fc.color }}>{m.value}</p>
                                  <p className="text-xs font-semibold text-white mb-0.5">{m.label}</p>
                                  <p className="text-xs text-[#6B7280]">{m.sublabel}</p>
                                </div>
                              ))}
                            </div>

                            <div className="grid md:grid-cols-2 gap-8 mb-8">
                              {/* Challenge */}
                              <div>
                                <h4 className="text-sm font-bold uppercase tracking-widest text-[#FF3366] mb-4 flex items-center gap-2">
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                                  </svg>
                                  El desafío
                                </h4>
                                {fc.challenge.split("\n\n").map((para, i) => (
                                  <p key={i} className="text-[#9CA3AF] text-sm leading-relaxed mb-3">{para}</p>
                                ))}
                              </div>

                              {/* Solution */}
                              <div>
                                <h4 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: fc.color }}>
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                  </svg>
                                  La solución
                                </h4>
                                {fc.solution.split("\n\n").map((para, i) => (
                                  <p key={i} className="text-[#9CA3AF] text-sm leading-relaxed mb-3">{para}</p>
                                ))}
                              </div>
                            </div>

                            {/* Quote */}
                            <div
                              className="rounded-2xl p-6 mb-8 relative"
                              style={{ background: `${fc.color}08`, border: `1px solid ${fc.color}20` }}
                            >
                              <div className="text-5xl font-black leading-none mb-3 opacity-30" style={{ color: fc.color }}>"</div>
                              <blockquote className="text-white font-medium leading-relaxed mb-4 italic">
                                {fc.quote}
                              </blockquote>
                              <div className="flex items-center gap-3">
                                <div
                                  className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm"
                                  style={{ background: `${fc.color}30`, color: fc.color }}
                                >
                                  {fc.logo}
                                </div>
                                <div>
                                  <p className="text-white font-semibold text-sm">{fc.quotePerson}</p>
                                  <p className="text-[#6B7280] text-xs">{fc.quoteRole}</p>
                                </div>
                              </div>
                            </div>

                            {/* Timeline */}
                            <div>
                              <h4 className="text-sm font-bold uppercase tracking-widest text-[#6B7280] mb-5">Timeline de implementación</h4>
                              <div className="flex flex-col sm:flex-row gap-0">
                                {fc.timeline.map((t, i) => (
                                  <div key={i} className="flex-1 relative">
                                    <div className="flex sm:flex-col items-start sm:items-center sm:text-center gap-4 sm:gap-0">
                                      <div className="flex items-center sm:flex-col w-full">
                                        <div
                                          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 text-xs font-black"
                                          style={{ background: fc.color, color: "#0A0A0A" }}
                                        >
                                          {i + 1}
                                        </div>
                                        {i < fc.timeline.length - 1 && (
                                          <div className="flex-1 h-px sm:h-0 sm:w-full mx-2 sm:mx-0 my-0 sm:my-0" style={{ background: `${fc.color}30` }} />
                                        )}
                                      </div>
                                      <div className="sm:mt-3">
                                        <p className="text-xs font-bold mb-1" style={{ color: fc.color }}>{t.phase}</p>
                                        <p className="text-xs text-[#9CA3AF] leading-relaxed">{t.event}</p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── INDUSTRIES ── */}
        <section className="py-20 px-4 border-t border-[rgba(55,65,81,0.3)]">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-white mb-4">
                Protección para <span className="text-gradient-accent">cada sector</span>
              </h2>
              <p className="text-[#9CA3AF] max-w-xl mx-auto">
                Soluciones adaptadas a las regulaciones y amenazas específicas de cada industria.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {INDUSTRY_SECTORS.map((sector, idx) => (
                <motion.div
                  key={sector.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="card-base p-6 text-center group hover:scale-[1.02]"
                >
                  <div className="text-3xl mb-3">{sector.icon}</div>
                  <h3 className="text-white font-bold mb-1">{sector.name}</h3>
                  <p className="text-3xl font-black mb-1" style={{ color: sector.color }}>{sector.clients}</p>
                  <p className="text-[#6B7280] text-xs">empresas protegidas</p>

                  {/* Mini logo grid */}
                  <div className="mt-4 flex justify-center gap-1.5 flex-wrap">
                    {[...Array(Math.min(sector.clients, 6))].map((_, i) => (
                      <div
                        key={i}
                        className="w-5 h-5 rounded-md"
                        style={{ background: `${sector.color}${20 + i * 10}` }}
                        aria-hidden="true"
                      />
                    ))}
                    {sector.clients > 6 && (
                      <div className="w-5 h-5 rounded-md bg-[#374151] flex items-center justify-center text-[8px] text-[#6B7280]">
                        +{sector.clients - 6}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="glass-strong rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,255,136,0.07) 0%, transparent 70%)" }}
              />
              <div className="relative">
                {/* Shield icon */}
                <div
                  className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 text-[#00FF88]"
                  style={{ background: "rgba(0,255,136,0.1)", border: "2px solid rgba(0,255,136,0.3)" }}
                >
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <path d="M9 12l2 2 4-4"/>
                  </svg>
                </div>

                <h2 className="text-4xl md:text-5xl font-black text-white mb-5">
                  ¿Querés ser el<br />
                  <span className="text-gradient-accent">próximo caso de éxito?</span>
                </h2>
                <p className="text-xl text-[#9CA3AF] mb-10 max-w-2xl mx-auto">
                  Empezá con el trial gratuito hoy. En 15 minutos tu empresa está protegida. En 30 días, tenés resultados medibles.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Link href="/trial" className="btn-primary text-base px-8 py-4">
                    Iniciar prueba gratuita →
                  </Link>
                  <Link href="/pricing" className="btn-secondary text-base px-8 py-4">
                    Ver precios
                  </Link>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-6">
                  {[
                    { value: "15 min", label: "para estar protegido" },
                    { value: "0$", label: "tarjeta requerida" },
                    { value: "30 días", label: "garantía de devolución" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-2xl font-black text-white">{stat.value}</p>
                      <p className="text-xs text-[#6B7280]">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
