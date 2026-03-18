"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

// ================================================================
// TYPES
// ================================================================
type WebinarStatus = "upcoming" | "recorded";
type FilterTab = "Todos" | "Próximos" | "Grabados" | "Por tema";

interface Webinar {
  id: string;
  title: string;
  speaker: string;
  role: string;
  company: string;
  date: string;
  time: string;
  duration: string;
  status: WebinarStatus;
  topic: string;
  gradientFrom: string;
  gradientTo: string;
  iconColor: string;
}

// ================================================================
// DATA
// ================================================================
const WEBINARS: Webinar[] = [
  {
    id: "ransomware-detection",
    title: "Cómo detectar ransomware antes de que se ejecute",
    speaker: "Carlos Méndez",
    role: "Lead Threat Analyst",
    company: "qatech360",
    date: "25 Mar 2026",
    time: "6:00 PM GMT-6 / 8:00 PM GMT-3",
    duration: "60 min",
    status: "upcoming",
    topic: "Amenazas",
    gradientFrom: "rgba(255,51,102,0.35)",
    gradientTo: "rgba(10,10,10,1)",
    iconColor: "#FF3366",
  },
  {
    id: "pci-dss-2025",
    title: "PCI-DSS 4.0 en LATAM: Lo que tu empresa debe cumplir ya",
    speaker: "María González",
    role: "Compliance Manager",
    company: "qatech360",
    date: "8 Abr 2026",
    time: "5:00 PM GMT-5 / 7:00 PM GMT-3",
    duration: "75 min",
    status: "upcoming",
    topic: "Cumplimiento",
    gradientFrom: "rgba(255,184,0,0.3)",
    gradientTo: "rgba(10,10,10,1)",
    iconColor: "#FFB800",
  },
  {
    id: "qatech360-deployment",
    title: "Despliegue avanzado de qatech360: arquitectura para 500+ endpoints",
    speaker: "Diego Morales",
    role: "Solutions Architect",
    company: "qatech360",
    date: "15 Abr 2026",
    time: "6:00 PM GMT-6 / 8:00 PM GMT-3",
    duration: "90 min",
    status: "upcoming",
    topic: "Plataforma",
    gradientFrom: "rgba(0,112,243,0.35)",
    gradientTo: "rgba(10,10,10,1)",
    iconColor: "#0070F3",
  },
  {
    id: "mitre-attack-pyme",
    title: "MITRE ATT&CK para PyMEs: guía práctica sin jerga técnica",
    speaker: "Ana Torres",
    role: "Security Educator",
    company: "qatech360",
    date: "5 Feb 2026",
    time: "5:00 PM GMT-5",
    duration: "55 min",
    status: "recorded",
    topic: "Amenazas",
    gradientFrom: "rgba(0,212,255,0.3)",
    gradientTo: "rgba(10,10,10,1)",
    iconColor: "#00D4FF",
  },
  {
    id: "cloud-security-aws",
    title: "Seguridad en AWS: los 10 errores que más explotan los atacantes",
    speaker: "Lucas Fernández",
    role: "Cloud Security Engineer",
    company: "qatech360",
    date: "18 Ene 2026",
    time: "6:00 PM GMT-6",
    duration: "65 min",
    status: "recorded",
    topic: "Cloud",
    gradientFrom: "rgba(0,255,136,0.25)",
    gradientTo: "rgba(10,10,10,1)",
    iconColor: "#00FF88",
  },
  {
    id: "ir-playbooks",
    title: "Playbooks de respuesta a incidentes: automatizar sin perder control",
    speaker: "Valentina Ruiz",
    role: "IR Team Lead",
    company: "qatech360",
    date: "10 Dic 2025",
    time: "7:00 PM GMT-3",
    duration: "70 min",
    status: "recorded",
    topic: "Respuesta",
    gradientFrom: "rgba(255,107,0,0.3)",
    gradientTo: "rgba(10,10,10,1)",
    iconColor: "#FF6B00",
  },
];

const FEATURED_WEBINAR = WEBINARS[0];

const PAST_WEBINARS = [
  {
    title: "Zero Trust para empresas sin presupuesto de Fortune 500",
    date: "3 Nov 2025",
    views: "4.2k",
    duration: "58 min",
    gradientFrom: "rgba(0,112,243,0.3)",
    gradientTo: "rgba(10,10,10,1)",
  },
  {
    title: "SIEM open source vs comercial: análisis honesto de costos",
    date: "15 Oct 2025",
    views: "3.8k",
    duration: "72 min",
    gradientFrom: "rgba(0,255,136,0.2)",
    gradientTo: "rgba(10,10,10,1)",
  },
  {
    title: "Incident Response: caso real de ataque a fintech colombiana",
    date: "22 Sep 2025",
    views: "6.1k",
    duration: "90 min",
    gradientFrom: "rgba(255,51,102,0.25)",
    gradientTo: "rgba(10,10,10,1)",
  },
];

const TOPICS = ["Todos los temas", "Amenazas", "Cumplimiento", "Cloud", "Plataforma", "Respuesta"];

const FILTER_TABS: FilterTab[] = ["Todos", "Próximos", "Grabados", "Por tema"];

// ================================================================
// WEBINAR ICON SVG
// ================================================================
function WebinarThumbIcon({ color }: { color: string }) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <circle cx="22" cy="22" r="21" stroke={color} strokeWidth="1.5" strokeOpacity="0.4" />
      <circle cx="22" cy="22" r="16" fill={`${color}18`} />
      <polygon points="18,15 32,22 18,29" fill={color} fillOpacity="0.9" />
    </svg>
  );
}

// ================================================================
// CALENDAR SVG
// ================================================================
function CalendarIllustration() {
  return (
    <svg width="160" height="140" viewBox="0 0 160 140" fill="none" aria-hidden="true">
      <rect x="10" y="20" width="140" height="110" rx="10" fill="rgba(0,112,243,0.1)" stroke="rgba(0,112,243,0.3)" strokeWidth="1.5" />
      <rect x="10" y="20" width="140" height="32" rx="10" fill="rgba(0,112,243,0.2)" />
      <rect x="10" y="40" width="140" height="12" fill="rgba(0,112,243,0.2)" />
      <circle cx="40" cy="14" r="7" fill="none" stroke="#0070F3" strokeWidth="2" />
      <line x1="40" y1="7" x2="40" y2="21" stroke="#0070F3" strokeWidth="2" />
      <circle cx="120" cy="14" r="7" fill="none" stroke="#0070F3" strokeWidth="2" />
      <line x1="120" y1="7" x2="120" y2="21" stroke="#0070F3" strokeWidth="2" />
      {[0,1,2,3,4,5,6].map((col) => (
        [0,1,2,3].map((row) => {
          const x = 22 + col * 18;
          const y = 68 + row * 16;
          const isHighlighted = col === 3 && row === 0;
          return (
            <rect
              key={`${col}-${row}`}
              x={x - 5} y={y - 5} width="10" height="10" rx="2"
              fill={isHighlighted ? "#0070F3" : "rgba(255,255,255,0.06)"}
            />
          );
        })
      ))}
      <circle cx="80" cy="68" r="12" fill="rgba(0,112,243,0.2)" stroke="#00D4FF" strokeWidth="1.5" />
      <polygon points="76,63 88,68 76,73" fill="#00D4FF" />
    </svg>
  );
}

// ================================================================
// WEBINAR CARD
// ================================================================
function WebinarCard({ webinar, index }: { webinar: Webinar; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className="group bg-[#111111] border border-[#2A2A2A] rounded-xl overflow-hidden hover:border-[rgba(0,112,243,0.4)] transition-all duration-300 flex flex-col"
    >
      {/* Thumbnail */}
      <div
        className="h-36 relative overflow-hidden flex-shrink-0"
        style={{ background: `linear-gradient(135deg, ${webinar.gradientFrom} 0%, ${webinar.gradientTo} 100%)` }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <WebinarThumbIcon color={webinar.iconColor} />
        </div>
        {/* Status badge */}
        <div className="absolute top-3 left-3">
          {webinar.status === "upcoming" ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[rgba(0,255,136,0.12)] text-[#00FF88] border border-[rgba(0,255,136,0.25)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
              Próximo
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[rgba(0,112,243,0.12)] text-[#0070F3] border border-[rgba(0,112,243,0.25)]">
              Grabado
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3 bg-black/60 rounded px-2 py-0.5 text-xs text-white font-mono">
          {webinar.duration}
        </div>
        {/* Topic tag */}
        <div className="absolute bottom-3 left-3">
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium border"
            style={{ color: webinar.iconColor, borderColor: `${webinar.iconColor}40`, background: `${webinar.iconColor}12` }}
          >
            {webinar.topic}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <h3 className="text-white font-semibold text-sm leading-snug group-hover:text-[#0070F3] transition-colors line-clamp-2">
          {webinar.title}
        </h3>
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black flex-shrink-0"
            style={{ background: `linear-gradient(135deg, ${webinar.iconColor} 0%, rgba(0,0,0,0.5) 100%)` }}
          >
            {webinar.speaker.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <p className="text-white text-xs font-semibold">{webinar.speaker}</p>
            <p className="text-[#6B7280] text-xs">{webinar.role}</p>
          </div>
        </div>

        <div className="text-xs text-[#9CA3AF] flex items-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <rect x="1" y="2" width="14" height="13" rx="2" /><path d="M1 6h14M5 1v2M11 1v2" />
          </svg>
          {webinar.date}
          {webinar.status === "upcoming" && (
            <span className="ml-2 text-[#6B7280]">· {webinar.time}</span>
          )}
        </div>

        <div className="mt-auto pt-3 border-t border-[#2A2A2A]">
          {webinar.status === "upcoming" ? (
            <button className="w-full py-2.5 bg-[#0070F3] hover:bg-[#0050D0] text-white text-sm font-semibold rounded-lg transition-colors">
              Registrarse gratis
            </button>
          ) : (
            <button className="w-full py-2.5 bg-[#1A1A1A] hover:bg-[rgba(0,112,243,0.1)] border border-[#2A2A2A] hover:border-[rgba(0,112,243,0.4)] text-[#9CA3AF] hover:text-white text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <polygon points="4 2 13 8 4 14" />
              </svg>
              Ver grabación
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ================================================================
// PAGE COMPONENT
// ================================================================
export default function WebinarsPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("Todos");
  const [activeTopic, setActiveTopic] = useState("Todos los temas");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const filtered = WEBINARS.filter((w) => {
    if (activeTab === "Próximos") return w.status === "upcoming";
    if (activeTab === "Grabados") return w.status === "recorded";
    if (activeTab === "Por tema") return activeTopic === "Todos los temas" || w.topic === activeTopic;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <NavBar />

      {/* Fixed background glow */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 40% at 60% -5%, rgba(0,112,243,0.15) 0%, transparent 70%)" }}
        />
      </div>

      <main className="relative z-10">

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section ref={heroRef} className="pt-28 pb-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.08)] text-[#00D4FF] text-xs font-semibold mb-6">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <rect x="1" y="2" width="14" height="13" rx="2" /><path d="M1 6h14M5 1v2M11 1v2" />
                </svg>
                Webinars y Eventos
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-white mb-5 leading-tight">
                Webinars y{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg, #0070F3 0%, #00D4FF 100%)" }}
                >
                  Eventos
                </span>
              </h1>
              <p className="text-[#9CA3AF] text-xl">
                Aprende de los mejores expertos en seguridad de LATAM. Sesiones en vivo, grabaciones y materiales descargables — todo en español.
              </p>
            </motion.div>

            {/* ── FEATURED UPCOMING WEBINAR ── */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="rounded-2xl overflow-hidden border border-[rgba(0,112,243,0.35)]"
              style={{ background: "linear-gradient(135deg, rgba(0,112,243,0.12) 0%, rgba(0,212,255,0.06) 100%)" }}
            >
              <div className="p-8 md:p-10 grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgba(0,255,136,0.12)] border border-[rgba(0,255,136,0.3)] text-[#00FF88] text-xs font-semibold mb-5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
                    Próximo Webinar
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-snug">
                    {FEATURED_WEBINAR.title}
                  </h2>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#0070F3" strokeWidth="1.5" aria-hidden="true">
                        <rect x="1" y="2" width="14" height="13" rx="2" /><path d="M1 6h14M5 1v2M11 1v2" />
                      </svg>
                      {FEATURED_WEBINAR.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#0070F3" strokeWidth="1.5" aria-hidden="true">
                        <circle cx="8" cy="8" r="6.5" /><path d="M8 4v4.5l3 2" strokeLinecap="round" />
                      </svg>
                      {FEATURED_WEBINAR.time}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#0070F3" strokeWidth="1.5" aria-hidden="true">
                        <path d="M8 1a5 5 0 1 0 0 10A5 5 0 0 0 8 1z" /><path d="M8 7v4M6 13h4" strokeLinecap="round" />
                      </svg>
                      Presentado por {FEATURED_WEBINAR.speaker} · {FEATURED_WEBINAR.role}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#0070F3" strokeWidth="1.5" aria-hidden="true">
                        <circle cx="8" cy="8" r="6.5" /><path d="M8 4.5v3.5l2.5 1.5" strokeLinecap="round" />
                      </svg>
                      {FEATURED_WEBINAR.duration} · Transmisión en vivo
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="px-6 py-3 bg-[#0070F3] hover:bg-[#0050D0] text-white font-semibold rounded-lg transition-colors">
                      Registrarme gratis
                    </button>
                    <button className="px-6 py-3 bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#0070F3] text-[#9CA3AF] hover:text-white font-semibold rounded-lg transition-all">
                      Agregar al calendario
                    </button>
                  </div>
                </div>
                <div className="flex justify-center">
                  <CalendarIllustration />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── WEBINARS GRID ─────────────────────────────────────── */}
        <section className="py-16 px-4 border-t border-[#2A2A2A]">
          <div className="max-w-6xl mx-auto">
            {/* Filter tabs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-[#0070F3] text-white shadow-[0_0_16px_rgba(0,112,243,0.3)]"
                      : "bg-[#111111] border border-[#2A2A2A] text-[#9CA3AF] hover:text-white hover:border-[rgba(0,112,243,0.4)]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </motion.div>

            {/* Topic sub-filter when "Por tema" is active */}
            {activeTab === "Por tema" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.25 }}
                className="flex flex-wrap gap-2 mb-8 overflow-hidden"
              >
                {TOPICS.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => setActiveTopic(topic)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      activeTopic === topic
                        ? "bg-[rgba(0,212,255,0.15)] border border-[rgba(0,212,255,0.4)] text-[#00D4FF]"
                        : "bg-[#1A1A1A] border border-[#2A2A2A] text-[#6B7280] hover:text-white"
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </motion.div>
            )}

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((webinar, i) => (
                  <WebinarCard key={webinar.id} webinar={webinar} index={i} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-[#6B7280]">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mx-auto mb-4 opacity-40" aria-hidden="true">
                  <circle cx="24" cy="24" r="22" stroke="#6B7280" strokeWidth="2" />
                  <path d="M24 16v8l5 4" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <p className="text-lg">No hay webinars para este filtro.</p>
                <button
                  onClick={() => setActiveTab("Todos")}
                  className="mt-3 text-[#0070F3] text-sm hover:underline"
                >
                  Ver todos
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── PAST WEBINARS ─────────────────────────────────────── */}
        <section className="py-16 px-4 border-t border-[#2A2A2A]">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="flex items-center justify-between mb-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Más grabaciones populares</h2>
                <p className="text-[#9CA3AF] text-sm">Más de 20 horas de contenido disponibles bajo demanda.</p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PAST_WEBINARS.map((w, i) => (
                <motion.div
                  key={w.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="group bg-[#111111] border border-[#2A2A2A] rounded-xl overflow-hidden hover:border-[rgba(0,112,243,0.4)] transition-all duration-300 cursor-pointer"
                >
                  <div
                    className="h-32 relative"
                    style={{ background: `linear-gradient(135deg, ${w.gradientFrom} 0%, ${w.gradientTo} 100%)` }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform text-white pl-0.5">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                          <polygon points="4 2 13 8 4 14" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 bg-black/60 rounded px-2 py-0.5 text-xs text-white font-mono">
                      {w.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-white text-sm font-semibold line-clamp-2 mb-2 group-hover:text-[#0070F3] transition-colors">{w.title}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[#6B7280] text-xs">{w.date}</span>
                      <span className="text-[#6B7280] text-xs">{w.views} vistas</span>
                    </div>
                    <button className="mt-3 w-full py-2 bg-[#1A1A1A] hover:bg-[rgba(0,112,243,0.1)] border border-[#2A2A2A] hover:border-[rgba(0,112,243,0.4)] text-[#9CA3AF] hover:text-white text-xs font-semibold rounded-lg transition-all">
                      Ver grabación
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── NEWSLETTER SIGNUP ─────────────────────────────────── */}
        <section className="py-20 px-4 border-t border-[#2A2A2A]">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-10"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(0,212,255,0.08)] border border-[rgba(0,212,255,0.3)] text-[#00D4FF] text-xs font-semibold mb-5">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M14 2H2l5 7v5l2 1v-6l5-7z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Invitaciones exclusivas
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Recibe invitaciones a próximos webinars
              </h3>
              <p className="text-[#9CA3AF] mb-8">
                Sin spam. Solo las invitaciones de los próximos eventos y acceso anticipado a las grabaciones.
              </p>

              {!subscribed ? (
                <form
                  onSubmit={(e) => { e.preventDefault(); if (email.includes("@")) setSubscribed(true); }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <input
                    type="email"
                    placeholder="tu@empresa.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 px-4 py-3 bg-[#1A1A1A] border border-[#2A2A2A] text-white placeholder:text-[#6B7280] rounded-lg focus:outline-none focus:border-[#0070F3] transition-colors text-sm"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#0070F3] hover:bg-[#0050D0] text-white font-semibold rounded-lg transition-colors whitespace-nowrap"
                  >
                    Suscribirme
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center justify-center gap-3 text-[#00FF88] py-3"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span className="font-semibold">¡Listo! Te avisaremos del próximo webinar.</span>
                </motion.div>
              )}
              <p className="text-[#6B7280] text-xs mt-4">
                Cancelá cuando quieras. Más de 2,400 profesionales de seguridad LATAM ya suscritos.
              </p>
            </motion.div>
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
              <h2 className="text-2xl font-bold text-white mb-3">
                ¿Quieres que capacitemos a tu equipo?
              </h2>
              <p className="text-[#9CA3AF] mb-6">
                Organizamos sesiones privadas y talleres in-house para equipos de seguridad en toda LATAM.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0070F3] hover:bg-[#0050D0] text-white font-semibold rounded-lg transition-colors"
              >
                Solicitar capacitación
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="6 3 11 8 6 13" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
