"use client";

import { motion, useInView } from "framer-motion";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

// ─── Animated Counter ────────────────────────────────────────────────────────
function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  decimals = 0,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 2000;
          const step = 16;
          const increment = target / (duration / step);
          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              start = target;
              clearInterval(timer);
            }
            setCount(parseFloat(start.toFixed(decimals)));
          }, step);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, decimals]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString("es-MX")}
      {suffix}
    </span>
  );
}

// ─── Protected Endpoints SVG Hero ─────────────────────────────────────────────
function EndpointShieldSVG() {
  return (
    <svg viewBox="0 0 480 340" className="w-full max-w-lg mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Connection lines */}
      <line x1="240" y1="170" x2="100" y2="100" stroke="#0070F3" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
      <line x1="240" y1="170" x2="240" y2="60" stroke="#0070F3" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
      <line x1="240" y1="170" x2="380" y2="100" stroke="#0070F3" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />

      {/* Laptop endpoint */}
      <rect x="60" y="70" width="80" height="55" rx="4" fill="#1A1A1A" stroke="#2A2A2A" strokeWidth="1.5" />
      <rect x="66" y="76" width="68" height="40" rx="2" fill="#0A0A0A" />
      <rect x="72" y="80" width="56" height="28" rx="1" fill="#111111" />
      {/* laptop screen content */}
      <rect x="76" y="84" width="20" height="2" rx="1" fill="#0070F3" opacity="0.7" />
      <rect x="76" y="88" width="35" height="1.5" rx="0.75" fill="#2A2A2A" />
      <rect x="76" y="92" width="28" height="1.5" rx="0.75" fill="#2A2A2A" />
      <rect x="76" y="96" width="32" height="1.5" rx="0.75" fill="#2A2A2A" />
      <rect x="50" y="125" width="100" height="3" rx="1.5" fill="#2A2A2A" />
      {/* Shield badge - laptop */}
      <circle cx="100" cy="70" r="12" fill="#0A0A0A" stroke="#00FF88" strokeWidth="1.5" />
      <path d="M100 63 L106 66 L106 72 C106 75 103 77 100 78 C97 77 94 75 94 72 L94 66 Z" fill="#00FF88" opacity="0.3" />
      <path d="M100 63 L106 66 L106 72 C106 75 103 77 100 78 C97 77 94 75 94 72 L94 66 Z" stroke="#00FF88" strokeWidth="1" />
      <text x="100" y="89" textAnchor="middle" fill="#A0A0A0" fontSize="9" fontFamily="system-ui">Laptop</text>

      {/* Server endpoint - top center */}
      <rect x="204" y="20" width="72" height="60" rx="4" fill="#1A1A1A" stroke="#2A2A2A" strokeWidth="1.5" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="210" y={28 + i * 13} width="60" height="9" rx="2" fill="#111111" />
          <circle cx="217" cy={32.5 + i * 13} r="2" fill={i === 0 ? "#00FF88" : "#2A2A2A"} />
          <rect x="222" y={30 + i * 13} width="30" height="1.5" rx="0.75" fill="#2A2A2A" />
          <rect x="222" y={33 + i * 13} width="20" height="1.5" rx="0.75" fill="#1A1A1A" />
        </g>
      ))}
      {/* Shield badge - server */}
      <circle cx="240" cy="18" r="12" fill="#0A0A0A" stroke="#00FF88" strokeWidth="1.5" />
      <path d="M240 11 L246 14 L246 20 C246 23 243 25 240 26 C237 25 234 23 234 20 L234 14 Z" fill="#00FF88" opacity="0.3" />
      <path d="M240 11 L246 14 L246 20 C246 23 243 25 240 26 C237 25 234 23 234 20 L234 14 Z" stroke="#00FF88" strokeWidth="1" />
      <text x="240" y="92" textAnchor="middle" fill="#A0A0A0" fontSize="9" fontFamily="system-ui">Servidor</text>

      {/* Workstation endpoint - right */}
      <rect x="340" y="65" width="80" height="65" rx="4" fill="#1A1A1A" stroke="#2A2A2A" strokeWidth="1.5" />
      <rect x="348" y="72" width="64" height="45" rx="2" fill="#111111" />
      <rect x="352" y="76" width="56" height="37" rx="1" fill="#0A0A0A" />
      <rect x="356" y="80" width="20" height="2" rx="1" fill="#00D4FF" opacity="0.7" />
      <rect x="356" y="84" width="38" height="1.5" rx="0.75" fill="#2A2A2A" />
      <rect x="356" y="88" width="30" height="1.5" rx="0.75" fill="#2A2A2A" />
      <rect x="356" y="92" width="34" height="1.5" rx="0.75" fill="#2A2A2A" />
      <rect x="356" y="96" width="28" height="1.5" rx="0.75" fill="#2A2A2A" />
      <rect x="358" y="102" width="44" height="6" rx="1" fill="#1A1A1A" />
      <rect x="360" y="117" width="40" height="10" rx="2" fill="#1A1A1A" />
      {/* Shield badge - workstation */}
      <circle cx="380" cy="62" r="12" fill="#0A0A0A" stroke="#00FF88" strokeWidth="1.5" />
      <path d="M380 55 L386 58 L386 64 C386 67 383 69 380 70 C377 69 374 67 374 64 L374 58 Z" fill="#00FF88" opacity="0.3" />
      <path d="M380 55 L386 58 L386 64 C386 67 383 69 380 70 C377 69 374 67 374 64 L374 58 Z" stroke="#00FF88" strokeWidth="1" />
      <text x="380" y="142" textAnchor="middle" fill="#A0A0A0" fontSize="9" fontFamily="system-ui">Workstation</text>

      {/* Central hub - wazuh manager */}
      <circle cx="240" cy="190" r="44" fill="#111111" stroke="#0070F3" strokeWidth="1.5" opacity="0.9" />
      <circle cx="240" cy="190" r="36" fill="#0A0A0A" stroke="#0070F3" strokeWidth="0.5" opacity="0.5" />
      <text x="240" y="183" textAnchor="middle" fill="#0070F3" fontSize="9" fontWeight="600" fontFamily="system-ui">qatech360</text>
      <text x="240" y="196" textAnchor="middle" fill="#A0A0A0" fontSize="8" fontFamily="system-ui">wazuh-manager</text>
      <text x="240" y="208" textAnchor="middle" fill="#00FF88" fontSize="8" fontFamily="system-ui">● PROTEGIDO</text>

      {/* Pulse rings */}
      <circle cx="240" cy="190" r="52" stroke="#0070F3" strokeWidth="0.5" opacity="0.2" strokeDasharray="3 3" />
      <circle cx="240" cy="190" r="60" stroke="#0070F3" strokeWidth="0.3" opacity="0.1" strokeDasharray="2 4" />

      {/* Alert output */}
      <rect x="150" y="256" width="180" height="60" rx="8" fill="#1A1A1A" stroke="#FF3B3B" strokeWidth="1" />
      <line x1="240" y1="234" x2="240" y2="256" stroke="#FF3B3B" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
      <rect x="158" y="262" width="60" height="7" rx="3.5" fill="#FF3B3B" opacity="0.2" />
      <text x="162" y="269" fill="#FF3B3B" fontSize="7" fontWeight="700" fontFamily="system-ui">ALERTA CRÍTICA</text>
      <text x="158" y="280" fill="#A0A0A0" fontSize="7" fontFamily="system-ui">Ransomware — agent: laptop-mx05</text>
      <text x="158" y="291" fill="#666666" fontSize="6.5" fontFamily="system-ui">PID 4823 · T1486 · Acción: BLOQUEADO</text>
      <circle cx="316" cy="270" r="7" fill="#00FF88" opacity="0.15" stroke="#00FF88" strokeWidth="1" />
      <text x="316" y="274" textAnchor="middle" fill="#00FF88" fontSize="8" fontFamily="system-ui">✓</text>
    </svg>
  );
}

// ─── Process Tree SVG ─────────────────────────────────────────────────────────
function ProcessTreeSVG() {
  return (
    <div className="bg-[#0A0A0A] rounded-xl border border-[#2A2A2A] p-6 font-mono text-xs">
      <div className="text-[#666666] mb-4 text-xs">Árbol de procesos — Incidente detectado 03:14:52</div>
      <div className="space-y-1">
        {/* Root process - legitimate */}
        <div className="flex items-center gap-2 text-[#A0A0A0]">
          <span className="text-[#0070F3]">●</span>
          <span>explorer.exe</span>
          <span className="text-[#666666]">PID: 1024</span>
          <span className="ml-auto px-2 py-0.5 rounded bg-[#00FF88]/10 text-[#00FF88]">LIMPIO</span>
        </div>
        {/* Child - suspicious */}
        <div className="flex items-center gap-2 text-[#A0A0A0] ml-6">
          <span className="text-[#666666]">└─</span>
          <span className="text-[#FFB800]">cmd.exe</span>
          <span className="text-[#666666]">PID: 2847</span>
          <span className="ml-auto px-2 py-0.5 rounded bg-[#FFB800]/10 text-[#FFB800]">SOSPECHOSO</span>
        </div>
        {/* Grandchild - malicious */}
        <div className="flex items-center gap-2 ml-12">
          <span className="text-[#666666]">└─</span>
          <span className="text-[#FF3B3B] font-bold">svch0st.exe</span>
          <span className="text-[#666666]">PID: 4823</span>
          <span className="ml-auto px-2 py-0.5 rounded bg-[#FF3B3B]/10 text-[#FF3B3B]">MALWARE</span>
        </div>
        {/* Children of malicious */}
        <div className="ml-20 space-y-1">
          <div className="flex items-center gap-2 text-[#FF3B3B]">
            <span className="text-[#666666]">├─</span>
            <span>vssadmin.exe delete shadows</span>
          </div>
          <div className="flex items-center gap-2 text-[#FF3B3B]">
            <span className="text-[#666666]">├─</span>
            <span>cipher.exe /E /A /S:C:\Users\</span>
          </div>
          <div className="flex items-center gap-2 text-[#FF3B3B]">
            <span className="text-[#666666]">└─</span>
            <span>powershell.exe -enc [base64]</span>
          </div>
        </div>
        {/* Action taken */}
        <div className="mt-4 pt-4 border-t border-[#2A2A2A] flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
          <span className="text-[#00FF88]">Acción tomada:</span>
          <span className="text-[#A0A0A0]">PID 4823 terminado · Archivos en cuarentena · IP origen bloqueada</span>
        </div>
      </div>
    </div>
  );
}

// ─── OS Support Badges ────────────────────────────────────────────────────────
const osPlatforms = [
  {
    name: "Windows",
    color: "#0070F3",
    versions: ["Windows 7 SP1", "Windows 10", "Windows 11", "Server 2012 R2+", "Server 2016", "Server 2019", "Server 2022"],
  },
  {
    name: "Linux",
    color: "#FFB800",
    versions: ["Ubuntu 18.04+", "Debian 9+", "RHEL 7+", "CentOS 7+", "Amazon Linux 2", "openSUSE 15+", "Fedora 33+"],
  },
  {
    name: "macOS",
    color: "#A0A0A0",
    versions: ["macOS 12 Monterey", "macOS 13 Ventura", "macOS 14 Sonoma", "macOS 15+"],
  },
];

// ─── Detection capabilities ───────────────────────────────────────────────────
const capabilities = [
  { title: "Detección de malware", desc: "Análisis de comportamiento + firmas. Detecta malware conocido y variantes polimórficas nunca vistas.", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z", color: "#FF3B3B" },
  { title: "Rollback de ransomware", desc: "Integración con shadow copies de Windows y snapshots LVM en Linux para restaurar archivos cifrados.", icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15", color: "#FFB800" },
  { title: "Árbol de procesos", desc: "Visualización completa de la cadena proceso padre → hijo. Identifica procesos inusualmente ejecutados.", icon: "M3 7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z", color: "#0070F3" },
  { title: "Shell remoto en vivo", desc: "Conéctate al endpoint comprometido sin salir del panel. Investiga en tiempo real sin interrumpir al usuario.", icon: "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", color: "#00D4FF" },
  { title: "Cuarentena de archivos", desc: "Mueve automáticamente archivos sospechosos a cuarentena cifrada. Restauración con un clic si es falso positivo.", icon: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4", color: "#00FF88" },
  { title: "Anomalías de comportamiento", desc: "Baseline de comportamiento normal por endpoint. Detecta desviaciones: nueva conexión de red, proceso inusual, acceso a rutas sensibles.", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", color: "#FF6B35" },
];

// ─── Alert Card Component ──────────────────────────────────────────────────────
function AlertCardSVG() {
  return (
    <div className="bg-[#0A0A0A] rounded-xl border border-[#FF3B3B]/30 p-6 shadow-[0_0_30px_rgba(255,59,59,0.1)]">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-[#FF3B3B] animate-pulse" />
            <span className="text-[#FF3B3B] font-bold text-sm tracking-wide">ALERTA CRÍTICA</span>
          </div>
          <div className="text-white font-semibold text-lg">Ransomware detectado y bloqueado</div>
        </div>
        <div className="px-3 py-1 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/20 text-[#00FF88] text-xs font-semibold">
          BLOQUEADO
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4 font-mono text-xs">
        {[
          { label: "Proceso", value: "svch0st.exe" },
          { label: "PID", value: "4823" },
          { label: "Ruta", value: "C:\\Temp\\svch0st.exe" },
          { label: "Hash SHA256", value: "a3f2c1...e8b9d0" },
          { label: "Endpoint", value: "laptop-mx05" },
          { label: "Usuario", value: "jlopez@corp.mx" },
          { label: "Táctica MITRE", value: "T1486 — Data Encrypted" },
          { label: "Severidad", value: "CRÍTICA (CVSS 9.8)" },
        ].map((item) => (
          <div key={item.label} className="bg-[#111111] rounded-lg px-3 py-2">
            <div className="text-[#666666] mb-0.5">{item.label}</div>
            <div className={`text-[#A0A0A0] ${item.label === "Severidad" ? "text-[#FF3B3B]" : ""}`}>{item.value}</div>
          </div>
        ))}
      </div>
      <div className="bg-[#00FF88]/5 border border-[#00FF88]/20 rounded-lg p-3">
        <div className="text-[#00FF88] text-xs font-semibold mb-1">Acción tomada automáticamente:</div>
        <div className="text-[#A0A0A0] text-xs space-y-0.5">
          <div>✓ Proceso PID 4823 terminado</div>
          <div>✓ 47 archivos .enc movidos a cuarentena</div>
          <div>✓ Endpoint aislado de la red</div>
          <div>✓ Analista SOC notificado — 14 segundos tras detección</div>
        </div>
      </div>
    </div>
  );
}

// ─── Response comparison ──────────────────────────────────────────────────────
const responseComparison = [
  { aspect: "Tiempo de detección", automated: "<5 segundos", manual: "15–60 minutos" },
  { aspect: "Tiempo de respuesta", automated: "<30 segundos", manual: "1–4 horas" },
  { aspect: "Disponibilidad", automated: "24/7/365", manual: "Horario laboral" },
  { aspect: "Consistencia", automated: "100% reproducible", manual: "Varía por analista" },
  { aspect: "Falsos positivos", automated: "Revisión automática + analista", manual: "Manual completo" },
  { aspect: "Documentación", automated: "Automática y completa", manual: "Depende del analista" },
];

// ─── PAGE ────────────────────────────────────────────────────────────────────
export default function EDRPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <NavBar />

      {/* ── 1. HERO ───────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-16 overflow-hidden">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,112,243,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,112,243,0.06) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[#0070F3] opacity-8 blur-[140px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto w-full">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0070F3]/30 bg-[#0070F3]/10 text-[#0070F3] text-sm font-medium mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
            Servicio Activo — EDR
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                EDR —{" "}
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(90deg, #0070F3, #00D4FF)" }}
                >
                  Detección y Respuesta en Endpoints
                </span>
              </motion.h1>
              <motion.p
                className="text-[#A0A0A0] text-lg md:text-xl leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Un agente ligero. Protección completa. En cada endpoint Windows, Linux y macOS.
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Link
                  href="/trial"
                  className="px-7 py-3 rounded-lg bg-[#0070F3] hover:bg-[#0050D0] text-white font-semibold transition-all duration-200 shadow-[0_0_24px_rgba(0,112,243,0.4)] hover:shadow-[0_0_40px_rgba(0,112,243,0.6)]"
                >
                  Instalar agente gratis
                </Link>
                <Link
                  href="/demo"
                  className="px-7 py-3 rounded-lg border border-[#2A2A2A] hover:border-[#0070F3]/40 text-[#A0A0A0] hover:text-white font-semibold transition-all duration-200"
                >
                  Ver demo
                </Link>
              </motion.div>
            </div>

            <motion.div
              ref={heroRef}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <EndpointShieldSVG />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. STATS ──────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 border-t border-[#2A2A2A]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: 10, suffix: " MB", label: "Tamaño del agente", prefix: "<" },
            { value: 1, suffix: "%", label: "Overhead de CPU", prefix: "<" },
            { value: 3, suffix: " SO", label: "Plataformas soportadas" },
            { value: 30, suffix: "s", label: "Tiempo de respuesta", prefix: "<" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-[#0070F3] mb-2">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} prefix={stat.prefix ?? ""} />
              </div>
              <div className="text-[#A0A0A0] text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 3. AGENT ARCHITECTURE ─────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#111111] border-y border-[#2A2A2A]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Arquitectura del agente</h2>
            <p className="text-[#A0A0A0] max-w-xl mx-auto">
              Un agente minimalista en el endpoint, todo el procesamiento pesado en el servidor.
            </p>
          </motion.div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 flex-wrap">
            {[
              { label: "Endpoint Agent", desc: "<10 MB, <1% CPU", color: "#0070F3" },
              { label: "→", desc: "", color: "transparent" },
              { label: "Análisis conductual", desc: "Behavioral engine", color: "#00D4FF" },
              { label: "→", desc: "", color: "transparent" },
              { label: "wazuh-manager", desc: "Correlación + reglas", color: "#00FF88" },
              { label: "→", desc: "", color: "transparent" },
              { label: "Alerta / Respuesta", desc: "Bloqueo automático", color: "#FFB800" },
            ].map((step, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                {step.desc ? (
                  <div
                    className="px-4 py-3 rounded-xl border text-sm font-medium min-w-[130px]"
                    style={{
                      backgroundColor: `${step.color}12`,
                      borderColor: `${step.color}30`,
                      color: step.color,
                    }}
                  >
                    {step.label}
                    <div className="text-[#666666] text-xs mt-0.5 font-normal">{step.desc}</div>
                  </div>
                ) : (
                  <div className="text-[#2A2A2A] text-2xl font-light hidden md:block">{step.label}</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. DETECTION CAPABILITIES ─────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Capacidades de detección</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                className="bg-[#111111] border border-[#2A2A2A] hover:border-[#0070F3]/30 rounded-xl p-6 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${cap.color}18`, border: `1px solid ${cap.color}30` }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={cap.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={cap.icon} />
                  </svg>
                </div>
                <h3 className="font-semibold text-white mb-2">{cap.title}</h3>
                <p className="text-[#666666] text-sm leading-relaxed">{cap.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. PROCESS TREE ───────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#111111] border-y border-[#2A2A2A]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="grid lg:grid-cols-2 gap-10 items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Árbol de procesos en tiempo real</h2>
              <p className="text-[#A0A0A0] leading-relaxed mb-6">
                Visualiza exactamente cómo se propagó un ataque: qué proceso lo inició, qué hijos creó y qué acciones tomó cada uno. En segundos, tienes el contexto completo del incidente.
              </p>
              <ul className="space-y-3">
                {["Procesos maliciosos resaltados en rojo", "Conexiones de red por proceso", "Archivos creados/modificados por proceso", "Hash SHA-256 verificado en tiempo real"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[#A0A0A0] text-sm">
                    <div className="w-4 h-4 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/30 flex items-center justify-center flex-shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00FF88]" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <ProcessTreeSVG />
          </motion.div>
        </div>
      </section>

      {/* ── 6. OS SUPPORT ─────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Soporte de sistemas operativos</h2>
            <p className="text-[#A0A0A0]">Un agente único para toda tu infraestructura heterogénea.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {osPlatforms.map((os, i) => (
              <motion.div
                key={os.name}
                className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="font-bold text-lg mb-4" style={{ color: os.color }}>{os.name}</div>
                <ul className="space-y-2">
                  {os.versions.map((v) => (
                    <li key={v} className="flex items-center gap-2 text-sm text-[#A0A0A0]">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: os.color }} />
                      {v}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. RANSOMWARE PROTECTION ──────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#111111] border-y border-[#2A2A2A]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Protección anti-ransomware</h2>
            <p className="text-[#A0A0A0] max-w-xl mx-auto">Del cifrado masivo a la restauración completa en minutos.</p>
          </motion.div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            {[
              { step: "1", label: "Detección", desc: "Cifrado masivo de archivos detectado en <5s", color: "#FF3B3B" },
              { step: "2", label: "Contención", desc: "Proceso bloqueado, endpoint aislado de red", color: "#FFB800" },
              { step: "3", label: "Shadow Copy", desc: "Snapshot automático activado antes del cifrado", color: "#0070F3" },
              { step: "4", label: "Rollback", desc: "Archivos restaurados desde snapshot íntegro", color: "#00FF88" },
            ].map((step, i) => (
              <div key={step.step} className="flex flex-col md:flex-row items-center gap-4">
                <motion.div
                  className="flex flex-col items-center text-center max-w-[140px]"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg mb-3 border-2"
                    style={{ backgroundColor: `${step.color}15`, borderColor: `${step.color}50`, color: step.color }}
                  >
                    {step.step}
                  </div>
                  <div className="font-semibold text-sm text-white mb-1">{step.label}</div>
                  <div className="text-[#666666] text-xs">{step.desc}</div>
                </motion.div>
                {i < 3 && <div className="hidden md:block text-[#2A2A2A] text-2xl">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. REAL ALERT EXAMPLE ─────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="grid lg:grid-cols-2 gap-10 items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Alerta real del EDR</h2>
              <p className="text-[#A0A0A0] leading-relaxed mb-6">
                Cuando el EDR detecta una amenaza, genera una alerta estructurada con todo el contexto necesario para actuar en segundos — sin necesidad de buscar en múltiples herramientas.
              </p>
              <div className="space-y-3 text-sm text-[#A0A0A0]">
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full bg-[#0070F3]/10 border border-[#0070F3]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0070F3]" />
                  </div>
                  Proceso sospechoso, ruta, hash y PID incluidos
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full bg-[#0070F3]/10 border border-[#0070F3]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0070F3]" />
                  </div>
                  Táctica MITRE ATT&CK identificada automáticamente
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 rounded-full bg-[#0070F3]/10 border border-[#0070F3]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0070F3]" />
                  </div>
                  Acciones de respuesta tomadas, sin intervención humana
                </div>
              </div>
            </div>
            <AlertCardSVG />
          </motion.div>
        </div>
      </section>

      {/* ── 9. RESPONSE COMPARISON ────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#111111] border-y border-[#2A2A2A]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Respuesta automática vs manual</h2>
          </motion.div>
          <motion.div
            className="overflow-x-auto rounded-xl border border-[#2A2A2A]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#2A2A2A] bg-[#111111]">
                  <th className="text-left px-5 py-4 text-[#A0A0A0] font-medium">Aspecto</th>
                  <th className="px-5 py-4 text-[#0070F3] font-semibold text-center">Playbook automatizado</th>
                  <th className="px-5 py-4 text-[#A0A0A0] font-medium text-center">Respuesta manual</th>
                </tr>
              </thead>
              <tbody>
                {responseComparison.map((row, i) => (
                  <tr key={row.aspect} className={i % 2 === 0 ? "bg-[#0A0A0A]" : "bg-[#111111]/50"}>
                    <td className="px-5 py-3.5 text-[#A0A0A0]">{row.aspect}</td>
                    <td className="px-5 py-3.5 text-center text-[#00FF88] font-medium">{row.automated}</td>
                    <td className="px-5 py-3.5 text-center text-[#666666]">{row.manual}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ── 10. CTA ───────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0070F3]/8 via-transparent to-[#00D4FF]/5 pointer-events-none" />
        <motion.div
          className="relative max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Instala el agente en{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #0070F3, #00D4FF)" }}>
              15 minutos
            </span>
          </h2>
          <p className="text-[#A0A0A0] text-lg mb-8">
            Un comando. Protección inmediata. Sin reinicio del sistema.
          </p>
          <div className="bg-[#111111] border border-[#2A2A2A] rounded-lg px-6 py-3 font-mono text-sm text-[#00FF88] mb-8 text-left">
            curl -s https://install.qatech360.com | bash -s -- --key TU_CLAVE
          </div>
          <Link
            href="/trial"
            className="inline-block px-10 py-4 rounded-lg bg-[#0070F3] hover:bg-[#0050D0] text-white font-semibold text-lg transition-all duration-200 shadow-[0_0_40px_rgba(0,112,243,0.4)] hover:shadow-[0_0_60px_rgba(0,112,243,0.6)]"
          >
            Iniciar prueba gratuita
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
