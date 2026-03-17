"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

type Category = "todos" | "cloud" | "soar" | "ticketing" | "comunicacion" | "threat-intel" | "identidad";

const integrationsList = [
  {
    id: "aws",
    name: "Amazon Web Services",
    shortName: "AWS",
    category: "cloud" as Category,
    color: "#FF9900",
    desc: "CloudTrail, GuardDuty, SecurityHub, S3 access logs y más. Monitoreo nativo de tu infraestructura AWS.",
  },
  {
    id: "azure",
    name: "Microsoft Azure",
    shortName: "AZ",
    category: "cloud" as Category,
    color: "#0078D4",
    desc: "Activity Log, Microsoft Defender, Entra ID sign-ins y Azure Monitor. Integración nativa sin agentes adicionales.",
  },
  {
    id: "gcp",
    name: "Google Cloud Platform",
    shortName: "GCP",
    category: "cloud" as Category,
    color: "#4285F4",
    desc: "Cloud Audit Logs, Security Command Center y Cloud Pub/Sub. Visibilidad completa de tu infraestructura GCP.",
  },
  {
    id: "pagerduty",
    name: "PagerDuty",
    shortName: "PD",
    category: "soar" as Category,
    color: "#06AC38",
    desc: "Crea incidentes y escala alertas críticas a tu equipo on-call. Integración bidireccional con el estado del incidente.",
  },
  {
    id: "splunk",
    name: "Splunk",
    shortName: "SP",
    category: "soar" as Category,
    color: "#FF6900",
    desc: "Envía eventos y alertas a tu instancia Splunk existente. Compatible con Splunk Enterprise y Splunk Cloud.",
  },
  {
    id: "jira",
    name: "Jira",
    shortName: "JI",
    category: "ticketing" as Category,
    color: "#0052CC",
    desc: "Crea tickets de seguridad automáticamente en tus proyectos Jira. Sincronización de estado bidireccional.",
  },
  {
    id: "servicenow",
    name: "ServiceNow",
    shortName: "SN",
    category: "ticketing" as Category,
    color: "#00B140",
    desc: "Integración con ITSM de ServiceNow. Incidentes de seguridad mapeados a tickets con prioridad automática.",
  },
  {
    id: "slack",
    name: "Slack",
    shortName: "SL",
    category: "comunicacion" as Category,
    color: "#4A154B",
    desc: "Notificaciones de alertas en canales Slack. Comandos slash para consultar el estado de tu plataforma.",
  },
  {
    id: "teams",
    name: "Microsoft Teams",
    shortName: "MT",
    category: "comunicacion" as Category,
    color: "#5059C9",
    desc: "Cards adaptables en Teams con detalles de alertas. Aprobación de respuestas activas directamente desde Teams.",
  },
  {
    id: "virustotal",
    name: "VirusTotal",
    shortName: "VT",
    category: "threat-intel" as Category,
    color: "#3949AB",
    desc: "Enriquecimiento automático de IPs, hashes y URLs en cada alerta. Reputación y análisis en tiempo real.",
  },
  {
    id: "misp",
    name: "MISP",
    shortName: "MI",
    category: "threat-intel" as Category,
    color: "#E53935",
    desc: "Integración bidireccional con tu instancia MISP. Comparte y recibe IOCs del ecosistema de inteligencia.",
  },
  {
    id: "okta",
    name: "Okta",
    shortName: "OK",
    category: "identidad" as Category,
    color: "#007DC1",
    desc: "Monitoreo de eventos de autenticación Okta. Detección de credential stuffing y anomalías de acceso.",
  },
  {
    id: "entraid",
    name: "Microsoft Entra ID",
    shortName: "EA",
    category: "identidad" as Category,
    color: "#0078D4",
    desc: "Integración con Azure Active Directory. Alertas de inicios de sesión sospechosos y cambios de privilegios.",
  },
  {
    id: "tenable",
    name: "Tenable",
    shortName: "TE",
    category: "threat-intel" as Category,
    color: "#00BFB3",
    desc: "Importa resultados de escaneos Tenable Nessus para correlacionar vulnerabilidades con alertas de seguridad.",
  },
];

const categories: { id: Category; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "cloud", label: "Cloud" },
  { id: "soar", label: "SOAR" },
  { id: "ticketing", label: "Ticketing" },
  { id: "comunicacion", label: "Comunicación" },
  { id: "threat-intel", label: "Threat Intel" },
  { id: "identidad", label: "Identidad" },
];

const quickstarts = [
  {
    title: "Conectar Slack",
    time: "2 min",
    steps: ["Ir a Configuración → Notificaciones", "Seleccionar 'Slack'", "Pegar tu Webhook URL", "Guardar y probar"],
    color: "#4A154B",
  },
  {
    title: "Conectar Jira",
    time: "5 min",
    steps: ["Generar API token en Jira", "Ir a Integraciones → Ticketing", "Ingresar URL, email y token", "Mapear proyectos y prioridades"],
    color: "#0052CC",
  },
  {
    title: "Conectar AWS",
    time: "10 min",
    steps: ["Crear IAM Role con permisos de lectura", "Ir a Integraciones → Cloud → AWS", "Ingresar ARN del Role", "Seleccionar regiones a monitorear"],
    color: "#FF9900",
  },
];

export default function IntegrationsPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const [activeCategory, setActiveCategory] = useState<Category>("todos");
  const [requestEmail, setRequestEmail] = useState("");
  const [requestMessage, setRequestMessage] = useState("");
  const [requestSent, setRequestSent] = useState(false);

  const filtered = activeCategory === "todos"
    ? integrationsList
    : integrationsList.filter((i) => i.category === activeCategory);

  function handleRequestSubmit(e: React.FormEvent) {
    e.preventDefault();
    setRequestSent(true);
    setRequestEmail("");
    setRequestMessage("");
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <NavBar />

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.02%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[#0070F3] opacity-[0.06] blur-[140px] pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          >
            Integraciones —{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0070F3] to-[#00D4FF]">
              conecta tu stack
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-xl text-[#A0A0A0] max-w-2xl mx-auto mb-8"
          >
            qatech360 se conecta con tu stack. Sin reemplazar lo que ya tienes — amplifica las herramientas que tu equipo ya conoce.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex items-center justify-center gap-4 text-sm text-[#A0A0A0]"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00FF88]" />
              14+ integraciones nativas
            </span>
            <span className="text-[#2A2A2A]">|</span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0070F3]" />
              API REST completa
            </span>
            <span className="text-[#2A2A2A]">|</span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00D4FF]" />
              Webhooks configurables
            </span>
          </motion.div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-2 justify-center mb-12"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                  activeCategory === cat.id
                    ? "bg-[#0070F3] border-[#0070F3] text-white"
                    : "bg-transparent border-[#2A2A2A] text-[#A0A0A0] hover:border-[#0070F3]/40 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((intg, i) => (
              <motion.div
                key={intg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-[#111111] border border-[#2A2A2A] hover:border-[#0070F3]/30 rounded-xl p-6 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ backgroundColor: intg.color }}
                  >
                    {intg.shortName}
                  </div>
                  <div>
                    <h3 className="font-semibold">{intg.name}</h3>
                    <span
                      className="inline-block text-xs px-2 py-0.5 rounded-full mt-1"
                      style={{
                        color: intg.color,
                        backgroundColor: `${intg.color}15`,
                        border: `1px solid ${intg.color}30`,
                      }}
                    >
                      {categories.find((c) => c.id === intg.category)?.label}
                    </span>
                  </div>
                </div>
                <p className="text-[#A0A0A0] text-sm leading-relaxed mb-4">{intg.desc}</p>
                <Link
                  href="/docs"
                  className="text-[#0070F3] text-sm hover:text-[#00D4FF] transition-colors duration-200 flex items-center gap-1"
                >
                  Ver docs
                  <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* REST API */}
      <section className="py-24 px-6 bg-[#111111]/50">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                API REST{" "}
                <span className="text-[#00D4FF]">completa</span>
              </h2>
              <p className="text-[#A0A0A0] mb-8 leading-relaxed">
                Accede a todos tus datos de seguridad programáticamente. La API de qatech360 es RESTful, documentada en OpenAPI 3.0 y disponible desde el plan Profesional.
              </p>
              <ul className="space-y-3">
                {[
                  "Autenticación via Bearer Token o API Key",
                  "Rate limit: 1,000 req/min en plan Profesional",
                  "Webhooks para eventos en tiempo real",
                  "SDK disponible en Python, Node.js y Go",
                  "Documentación interactiva (Swagger UI)",
                  "Soporte para filtros avanzados y paginación",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#A0A0A0]">
                    <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 flex-shrink-0 mt-0.5">
                      <circle cx="10" cy="10" r="9" stroke="#00D4FF" strokeWidth="1.5" />
                      <path d="M6.5 10l2.5 2.5 5-5" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl overflow-hidden"
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[#2A2A2A] bg-[#111111]">
                <div className="w-3 h-3 rounded-full bg-[#FF3B3B]" />
                <div className="w-3 h-3 rounded-full bg-[#FFB800]" />
                <div className="w-3 h-3 rounded-full bg-[#00FF88]" />
                <span className="text-[#666666] text-xs ml-2 font-mono">terminal</span>
              </div>
              <div className="p-6 font-mono text-sm space-y-2">
                <p className="text-[#666666]"># Obtener alertas de las últimas 24 horas</p>
                <p className="text-[#00FF88]">curl -X GET \</p>
                <p className="text-[#A0A0A0] pl-4">"https://api.qatech360.com/v1/alerts" \</p>
                <p className="text-[#A0A0A0] pl-4">-H <span className="text-[#FFB800]">"Authorization: Bearer $API_TOKEN"</span> \</p>
                <p className="text-[#A0A0A0] pl-4">-G \</p>
                <p className="text-[#A0A0A0] pl-4">-d <span className="text-[#FFB800]">"severity=high"</span> \</p>
                <p className="text-[#A0A0A0] pl-4">-d <span className="text-[#FFB800]">"from=2026-03-16T00:00:00Z"</span></p>
                <div className="border-t border-[#2A2A2A] pt-3 mt-3">
                  <p className="text-[#666666]">{"// Respuesta:"}</p>
                  <p className="text-[#A0A0A0]">{"{"}</p>
                  <p className="text-[#A0A0A0] pl-4"><span className="text-[#00D4FF]">"total"</span>: 47,</p>
                  <p className="text-[#A0A0A0] pl-4"><span className="text-[#00D4FF]">"alerts"</span>: [...]</p>
                  <p className="text-[#A0A0A0] pl-4"><span className="text-[#00D4FF]">"next_cursor"</span>: <span className="text-[#FFB800]">"eyJp..."</span></p>
                  <p className="text-[#A0A0A0]">{"}"}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quickstarts */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Guías de inicio rápido</h2>
            <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
              Conecta tus herramientas más usadas en minutos con nuestras guías paso a paso.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {quickstarts.map((qs, i) => (
              <motion.div
                key={qs.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-semibold">{qs.title}</h3>
                  <span
                    className="text-xs px-3 py-1 rounded-full font-medium"
                    style={{ color: qs.color, backgroundColor: `${qs.color}15`, border: `1px solid ${qs.color}30` }}
                  >
                    {qs.time}
                  </span>
                </div>
                <ol className="space-y-3">
                  {qs.steps.map((step, si) => (
                    <li key={step} className="flex items-start gap-3 text-sm text-[#A0A0A0]">
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: `${qs.color}20`, color: qs.color }}
                      >
                        {si + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Request integration */}
      <section className="py-24 px-6 bg-[#111111]/50">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              ¿No encuentras tu herramienta?
            </h2>
            <p className="text-[#A0A0A0]">
              Cuéntanos qué necesitas y nuestro equipo de integraciones lo evaluará en menos de 48 horas.
            </p>
          </motion.div>
          {requestSent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#111111] border border-[#00FF88]/30 rounded-xl p-8 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-[#00FF88]/10 flex items-center justify-center mx-auto mb-4">
                <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
                  <circle cx="16" cy="16" r="14" stroke="#00FF88" strokeWidth="2" />
                  <path d="M10 16l4 4 8-8" stroke="#00FF88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#00FF88]">¡Solicitud enviada!</h3>
              <p className="text-[#A0A0A0]">Nuestro equipo revisará tu solicitud y te responderá en menos de 48 horas hábiles.</p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onSubmit={handleRequestSubmit}
              className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-8 space-y-5"
            >
              <div>
                <label className="block text-sm font-medium text-[#A0A0A0] mb-2">Tu email</label>
                <input
                  type="email"
                  required
                  value={requestEmail}
                  onChange={(e) => setRequestEmail(e.target.value)}
                  placeholder="tu@empresa.com"
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white placeholder-[#666666] focus:outline-none focus:border-[#0070F3] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#A0A0A0] mb-2">¿Qué herramienta necesitas integrar?</label>
                <textarea
                  required
                  value={requestMessage}
                  onChange={(e) => setRequestMessage(e.target.value)}
                  placeholder="Ej: Necesitamos integración con Wiz para correlacionar hallazgos de cloud security..."
                  rows={4}
                  className="w-full bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white placeholder-[#666666] focus:outline-none focus:border-[#0070F3] transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#0070F3] hover:bg-[#0050D0] text-white font-semibold rounded-lg transition-all duration-200"
              >
                Enviar solicitud
              </button>
            </motion.form>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">
              ¿Listo para conectar tu stack?
            </h2>
            <p className="text-[#A0A0A0] text-lg mb-10">
              Consulta la documentación técnica completa de todas las integraciones.
            </p>
            <Link
              href="/docs"
              className="inline-block px-10 py-4 bg-[#0070F3] hover:bg-[#0050D0] text-white font-semibold rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(0,112,243,0.4)] hover:shadow-[0_0_40px_rgba(0,112,243,0.6)] text-lg"
            >
              Ver documentación completa
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
