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

// ─── File Diff Mockup ─────────────────────────────────────────────────────────
function FileDiffMockup() {
  return (
    <div className="bg-[#0A0A0A] rounded-xl border border-[#2A2A2A] overflow-hidden font-mono text-xs">
      <div className="flex items-center gap-2 px-4 py-3 bg-[#111111] border-b border-[#2A2A2A]">
        <div className="w-3 h-3 rounded-full bg-[#FF3B3B]" />
        <div className="w-3 h-3 rounded-full bg-[#FFB800]" />
        <div className="w-3 h-3 rounded-full bg-[#00FF88]" />
        <span className="ml-2 text-[#666666]">/etc/sudoers — Cambio detectado 03:14:52</span>
        <span className="ml-auto text-[#FF3B3B] text-xs font-bold">ALERTA CRÍTICA</span>
      </div>
      <div className="p-4 space-y-0.5">
        <div className="text-[#666666] mb-2">@@ -15,6 +15,7 @@ Defaults env_reset</div>
        <div className="flex gap-3 text-[#A0A0A0]">
          <span className="w-6 text-right text-[#444444]">15</span>
          <span>root    ALL=(ALL:ALL) ALL</span>
        </div>
        <div className="flex gap-3 text-[#A0A0A0]">
          <span className="w-6 text-right text-[#444444]">16</span>
          <span>%sudo   ALL=(ALL:ALL) ALL</span>
        </div>
        <div className="flex gap-3 bg-[#FF3B3B]/8 rounded px-1">
          <span className="w-6 text-right text-[#FF3B3B]">-</span>
          <span className="text-[#FF3B3B]"># Defaults requiretty</span>
        </div>
        <div className="flex gap-3 bg-[#00FF88]/8 rounded px-1">
          <span className="w-6 text-right text-[#00FF88]">+</span>
          <span className="text-[#00FF88]">www-data ALL=(ALL) NOPASSWD: ALL</span>
        </div>
        <div className="flex gap-3 text-[#A0A0A0]">
          <span className="w-6 text-right text-[#444444]">17</span>
          <span>@includedir /etc/sudoers.d</span>
        </div>
      </div>
      <div className="px-4 py-3 bg-[#111111] border-t border-[#2A2A2A] flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs">
          <span className="text-[#666666]">Modificado por:</span>
          <span className="text-[#FFB800]">www-data (UID 33)</span>
          <span className="text-[#666666]">Hash anterior:</span>
          <span className="text-[#A0A0A0] font-mono">d8f3a2...c91b</span>
        </div>
        <span className="text-[#FF3B3B] font-bold text-xs">Escalada de privilegios</span>
      </div>
    </div>
  );
}

// ─── Monitored Paths ──────────────────────────────────────────────────────────
const monitoredPaths = [
  { path: "/etc", desc: "Configuración del sistema", files: "380+ archivos", color: "#FF3B3B", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" },
  { path: "/bin, /sbin", desc: "Binarios del sistema", files: "1,200+ archivos", color: "#FFB800", icon: "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { path: "/usr/bin", desc: "Binarios de usuario", files: "2,400+ archivos", color: "#0070F3", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
  { path: "/lib, /lib64", desc: "Librerías compartidas", files: "5,000+ archivos", color: "#00D4FF", icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" },
  { path: "Windows System32", desc: "Archivos críticos Windows", files: "3,800+ archivos", color: "#00FF88", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
];

// ─── FIM Scenarios ────────────────────────────────────────────────────────────
const scenarios = [
  {
    title: "Rootkit modifica binarios del sistema",
    desc: "Un rootkit reemplaza /bin/ls con una versión maliciosa que oculta procesos. FIM detecta el cambio de hash SHA-256 en milisegundos y alerta al equipo SOC.",
    icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
    color: "#FF3B3B",
    tag: "Rootkit",
  },
  {
    title: "Cambio no autorizado en /etc/sudoers",
    desc: "Un atacante que obtuvo acceso a un servidor web agrega www-data a sudoers para escalar privilegios. FIM detecta el cambio y muestra el diff exacto con atribución de usuario.",
    icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
    color: "#FFB800",
    tag: "Escalada de privilegios",
  },
  {
    title: "Ransomware cifra archivos en batch",
    desc: "El ransomware empieza a cifrar archivos en /home y /var. FIM detecta la creación masiva de archivos .enc y la modificación simultánea de cientos de archivos, activando respuesta automática.",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    color: "#0070F3",
    tag: "Ransomware",
  },
];

// ─── Features ─────────────────────────────────────────────────────────────────
const features = [
  { title: "Detección en tiempo real", desc: "Usa inotify en Linux y Windows FSFilter para detectar cambios de archivos en el momento exacto en que ocurren.", icon: "M13 10V3L4 14h7v7l9-11h-7z", color: "#0070F3" },
  { title: "Hash SHA-256 y MD5", desc: "Comparación criptográfica de cada archivo. Un byte modificado genera una diferencia de hash detectable inmediatamente.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", color: "#00D4FF" },
  { title: "inotify + Windows FSFilter", desc: "Monitoreo nativo del kernel en Linux y Windows. Sin polling periódico — detección verdaderamente en tiempo real.", icon: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2", color: "#00FF88" },
  { title: "Vista diff del cambio", desc: "Muestra exactamente qué líneas se agregaron, modificaron o eliminaron. No solo 'el archivo cambió' sino qué cambió exactamente.", icon: "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", color: "#FFB800" },
  { title: "Escaneos programados", desc: "Además de la detección en tiempo real, ejecuta escaneos de integridad completos en el horario que definas.", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", color: "#FF3B3B" },
  { title: "Atribución de usuario", desc: "Cada cambio incluye el usuario del sistema operativo, el proceso que realizó el cambio y la hora exacta con timezone.", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", color: "#00D4FF" },
];

// ─── Detection Flow ───────────────────────────────────────────────────────────
const detectionFlow = [
  { step: "Cambio", desc: "Archivo modificado, creado o eliminado", color: "#FF3B3B" },
  { step: "Hash", desc: "Comparación SHA-256 instantánea", color: "#FFB800" },
  { step: "Diff", desc: "Análisis de contenido cambiado", color: "#0070F3" },
  { step: "Alerta + Atribución", desc: "Quién, qué, cuándo — en el mismo evento", color: "#00FF88" },
];

// ─── Compliance ───────────────────────────────────────────────────────────────
const complianceItems = [
  { name: "PCI-DSS Req. 11.5", desc: "Monitoreo de integridad de archivos en el entorno de datos del titular de tarjeta", color: "#0070F3" },
  { name: "HIPAA §164.312(c)(1)", desc: "Controles de integridad para datos de salud electrónicos protegidos (ePHI)", color: "#00D4FF" },
  { name: "ISO 27001 A.12.4", desc: "Registro de eventos y monitoreo de administradores y operadores del sistema", color: "#00FF88" },
];

// ─── PAGE ────────────────────────────────────────────────────────────────────
export default function FileIntegrityPage() {
  const flowRef = useRef<HTMLDivElement>(null);
  useInView(flowRef, { once: true });

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
            Servicio Activo — Monitoreo de Integridad de Archivos
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Monitoreo de Integridad de Archivos —{" "}
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(90deg, #0070F3, #00D4FF)" }}
                >
                  Sabe exactamente qué cambió, quién y cuándo
                </span>
              </motion.h1>
              <motion.p
                className="text-[#A0A0A0] text-lg md:text-xl leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Detección en tiempo real de cambios en archivos críticos del sistema. Esencial para PCI-DSS e HIPAA.
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
                  Activa FIM en tus servidores
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
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <FileDiffMockup />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. STATS ──────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 border-t border-[#2A2A2A]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: 0, suffix: "ms", label: "Latencia de detección", prefix: "<100" },
            { value: 100, suffix: "+", label: "Perfiles predefinidos" },
            { value: 256, suffix: "-bit", label: "Hash SHA", prefix: "" },
            { value: 5, suffix: " normas", label: "Marcos de cumplimiento" },
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
                {stat.prefix === "<100" ? (
                  <span>&lt;100ms</span>
                ) : (
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} prefix={stat.prefix ?? ""} />
                )}
              </div>
              <div className="text-[#A0A0A0] text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 3. WHY FIM MATTERS ────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#111111] border-y border-[#2A2A2A]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Por qué importa el FIM?</h2>
            <p className="text-[#A0A0A0] max-w-xl mx-auto">
              Los atacantes modifican archivos del sistema para mantener acceso, escalar privilegios y ocultar su presencia. FIM los atrapa en el acto.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {scenarios.map((sc, i) => (
              <motion.div
                key={sc.title}
                className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${sc.color}18`, border: `1px solid ${sc.color}30` }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={sc.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={sc.icon} />
                  </svg>
                </div>
                <span
                  className="inline-block px-2 py-0.5 rounded text-xs font-bold mb-3"
                  style={{ backgroundColor: `${sc.color}15`, color: sc.color }}
                >
                  {sc.tag}
                </span>
                <h3 className="font-semibold text-white mb-2 text-sm">{sc.title}</h3>
                <p className="text-[#666666] text-sm leading-relaxed">{sc.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. DETECTION FLOW ─────────────────────────────────────────────── */}
      <section className="py-20 px-6" ref={flowRef}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Flujo de detección</h2>
          </motion.div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            {detectionFlow.map((step, i) => (
              <div key={step.step} className="flex flex-col md:flex-row items-center gap-4">
                <motion.div
                  className="flex flex-col items-center text-center max-w-[140px]"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                >
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-3 text-xl font-bold border-2"
                    style={{ backgroundColor: `${step.color}15`, borderColor: `${step.color}50`, color: step.color }}
                  >
                    {i + 1}
                  </div>
                  <div className="font-semibold text-white text-sm mb-1">{step.step}</div>
                  <div className="text-[#666666] text-xs leading-relaxed">{step.desc}</div>
                </motion.div>
                {i < detectionFlow.length - 1 && (
                  <div className="hidden md:block text-[#2A2A2A] text-2xl">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. DIFF VIEW ──────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#111111] border-y border-[#2A2A2A]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="grid lg:grid-cols-2 gap-10 items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Vista diff del cambio exacto</h2>
              <p className="text-[#A0A0A0] leading-relaxed mb-6">
                No solo te decimos que un archivo cambió. Te mostramos exactamente qué líneas se agregaron (verde) y cuáles se eliminaron (rojo), quién hizo el cambio y desde qué proceso.
              </p>
              <ul className="space-y-3">
                {[
                  "Líneas añadidas marcadas en verde",
                  "Líneas eliminadas marcadas en rojo",
                  "Atribución de usuario y proceso",
                  "Timestamp exacto con zona horaria",
                  "Hash antes y después del cambio",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[#A0A0A0] text-sm">
                    <div className="w-4 h-4 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/30 flex items-center justify-center flex-shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00FF88]" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <FileDiffMockup />
          </motion.div>
        </div>
      </section>

      {/* ── 6. MONITORED PATHS ────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Rutas monitoreadas por defecto</h2>
            <p className="text-[#A0A0A0]">Más de 100 perfiles predefinidos para sistemas Linux y Windows. Activos desde el primer minuto.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {monitoredPaths.map((path, i) => (
              <motion.div
                key={path.path}
                className="bg-[#111111] border border-[#2A2A2A] hover:border-[#0070F3]/30 rounded-xl p-5 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${path.color}18`, border: `1px solid ${path.color}30` }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={path.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={path.icon} />
                  </svg>
                </div>
                <div className="font-mono font-bold text-sm mb-1" style={{ color: path.color }}>{path.path}</div>
                <div className="text-[#A0A0A0] text-xs mb-1">{path.desc}</div>
                <div className="text-[#666666] text-xs">{path.files}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. FEATURE GRID ───────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#111111] border-y border-[#2A2A2A]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Capacidades del FIM</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                className="bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#0070F3]/30 rounded-xl p-6 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${feat.color}18`, border: `1px solid ${feat.color}30` }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={feat.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={feat.icon} />
                  </svg>
                </div>
                <h3 className="font-semibold text-white mb-2">{feat.title}</h3>
                <p className="text-[#666666] text-sm leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. COMPLIANCE ─────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Cumplimiento normativo</h2>
            <p className="text-[#A0A0A0] max-w-xl mx-auto">
              FIM es un requisito explícito en los principales marcos de seguridad y privacidad.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {complianceItems.map((item, i) => (
              <motion.div
                key={item.name}
                className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-6"
                style={{ borderLeftColor: item.color, borderLeftWidth: 3 }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
              >
                <div className="font-bold text-lg mb-2" style={{ color: item.color }}>{item.name}</div>
                <p className="text-[#A0A0A0] text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. CTA ────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0070F3]/10 via-transparent to-[#00D4FF]/5 pointer-events-none" />
        <motion.div
          className="relative max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Monitorea la integridad{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #0070F3, #00D4FF)" }}>
              de tus servidores
            </span>
          </h2>
          <p className="text-[#A0A0A0] text-lg mb-8">
            14 días gratis. Detección activa desde el minuto de instalación.
          </p>
          <Link
            href="/trial"
            className="inline-block px-10 py-4 rounded-lg bg-[#0070F3] hover:bg-[#0050D0] text-white font-semibold text-lg transition-all duration-200 shadow-[0_0_40px_rgba(0,112,243,0.4)] hover:shadow-[0_0_60px_rgba(0,112,243,0.6)]"
          >
            Activa FIM en tus servidores
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
