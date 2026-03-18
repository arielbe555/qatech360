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

// ─── Response Timeline SVG ────────────────────────────────────────────────────
function ResponseTimelineHero() {
  return (
    <div className="bg-[#0A0A0A] rounded-xl border border-[#2A2A2A] p-5 font-mono text-xs space-y-3">
      <div className="flex items-center gap-2 pb-3 border-b border-[#2A2A2A]">
        <div className="w-2 h-2 rounded-full bg-[#FF3B3B] animate-pulse" />
        <span className="text-[#FF3B3B] font-bold tracking-wider">ALERTA ACTIVA</span>
        <span className="ml-auto text-[#666666]">03:14:52.441</span>
      </div>
      <div className="space-y-2.5">
        {[
          { time: "+0ms", action: "Alerta generada", status: "INICIO", color: "#FF3B3B" },
          { time: "+12ms", action: "Regla de respuesta evaluada", status: "MATCH", color: "#FFB800" },
          { time: "+23ms", action: "iptables DROP 185.220.101.47", status: "EJECUTADO", color: "#0070F3" },
          { time: "+31ms", action: "Proceso PID 4823 terminado", status: "EJECUTADO", color: "#0070F3" },
          { time: "+44ms", action: "Archivo svch0st.exe en cuarentena", status: "EJECUTADO", color: "#0070F3" },
          { time: "+67ms", action: "Endpoint aislado de red", status: "EJECUTADO", color: "#0070F3" },
          { time: "+89ms", action: "Analista SOC notificado", status: "LISTO", color: "#00FF88" },
        ].map((item) => (
          <div key={item.time} className="flex items-center gap-3">
            <span className="text-[#666666] w-14 flex-shrink-0">{item.time}</span>
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
            <span className="text-[#A0A0A0] flex-1">{item.action}</span>
            <span
              className="px-2 py-0.5 rounded text-xs font-bold"
              style={{ backgroundColor: `${item.color}15`, color: item.color }}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
      <div className="pt-3 border-t border-[#2A2A2A] flex items-center justify-between">
        <span className="text-[#666666]">Tiempo total de respuesta:</span>
        <span className="text-[#00FF88] font-bold text-base">89ms</span>
      </div>
    </div>
  );
}

// ─── Delay Cost Comparison ────────────────────────────────────────────────────
function DelayCostComparison() {
  const scenarios = [
    { label: "Respuesta manual", time: "~30 minutos", damage: "Alta — cifrado masivo posible", color: "#FF3B3B", barPct: 100 },
    { label: "Respuesta activa qatech360", time: "<100ms", damage: "Mínimo — amenaza contenida", color: "#00FF88", barPct: 1 },
  ];

  return (
    <div className="space-y-6">
      {scenarios.map((sc, i) => (
        <motion.div
          key={sc.label}
          className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5"
          style={{ borderLeftColor: sc.color, borderLeftWidth: 3 }}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, duration: 0.5 }}
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="font-semibold text-white mb-1">{sc.label}</div>
              <div className="text-[#666666] text-sm">{sc.damage}</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg" style={{ color: sc.color }}>{sc.time}</div>
              <div className="text-[#666666] text-xs">tiempo de respuesta</div>
            </div>
          </div>
          <div className="w-full h-2.5 bg-[#1A1A1A] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: sc.color }}
              initial={{ width: 0 }}
              whileInView={{ width: `${sc.barPct}%` }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 + 0.3, duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      ))}
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4 text-center">
        <div className="text-[#666666] text-xs mb-1">Impacto económico promedio de ransomware en empresa mediana LATAM</div>
        <div className="text-3xl font-bold text-[#FF3B3B]">Impacto millonario</div>
        <div className="text-[#666666] text-xs mt-1">En los 30 minutos que tarda la respuesta manual</div>
      </div>
    </div>
  );
}

// ─── Response Actions ─────────────────────────────────────────────────────────
const responseActions = [
  { title: "Bloqueo de IP", desc: "Bloquea automáticamente IPs maliciosas en iptables, nftables, Windows Firewall, Palo Alto y Fortinet.", icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z", color: "#FF3B3B" },
  { title: "Cuarentena de archivos", desc: "Mueve archivos maliciosos a un directorio cifrado y aislado. Restauración con un clic si es falso positivo.", icon: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4", color: "#FFB800" },
  { title: "Terminación de procesos", desc: "Mata el proceso malicioso en el endpoint remoto instantáneamente. Sin necesidad de acceso remoto manual.", icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636", color: "#0070F3" },
  { title: "Bloqueo de cuenta (AD/LDAP)", desc: "Deshabilita cuentas de usuario comprometidas en Active Directory o LDAP. Previene movimiento lateral.", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", color: "#00D4FF" },
  { title: "Aislamiento de red del endpoint", desc: "Desconecta completamente el endpoint comprometido de la red. Contiene la amenaza sin apagar la máquina.", icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "#00FF88" },
  { title: "Scripts personalizados", desc: "Ejecuta scripts Python o Bash en el endpoint como respuesta. Lógica de negocio específica para tu entorno.", icon: "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", color: "#FFB800" },
];

// ─── Trigger-Action Flow ──────────────────────────────────────────────────────
const triggerFlow = [
  { label: "Alerta disparada", desc: "Regla de SIEM o EDR", color: "#FF3B3B" },
  { label: "Match de regla", desc: "Playbook seleccionado", color: "#FFB800" },
  { label: "Respuesta activa ejecutada", desc: "En milisegundos", color: "#0070F3" },
  { label: "Log de auditoría", desc: "Trazabilidad completa", color: "#00FF88" },
];

// ─── Predefined Playbooks ─────────────────────────────────────────────────────
const playbooks = [
  { scenario: "Brute force SSH/RDP", trigger: "> 5 intentos fallidos / min", action: "IP bloqueada en iptables / Windows FW", color: "#FF3B3B" },
  { scenario: "Ransomware detectado", trigger: "Cifrado masivo de archivos", action: "Proceso terminado + endpoint aislado", color: "#FF6B35" },
  { scenario: "Malware identificado", trigger: "Hash en lista negra", action: "Proceso terminado + archivo en cuarentena", color: "#FFB800" },
  { scenario: "Account takeover", trigger: "Login desde IP sospechosa", action: "Cuenta bloqueada en AD/LDAP", color: "#0070F3" },
  { scenario: "Port scan detectado", trigger: "Escaneo de 100+ puertos", action: "IP origen bloqueada + alerta SOC", color: "#00D4FF" },
  { scenario: "Tráfico C2 detectado", trigger: "Conexión a IOC conocido", action: "IP bloqueada + alerta enriquecida", color: "#00FF88" },
];

// ─── Supported Firewalls ──────────────────────────────────────────────────────
const firewalls = ["iptables", "nftables", "Windows Firewall", "Palo Alto", "Fortinet FortiGate", "pfSense"];

// ─── PAGE ────────────────────────────────────────────────────────────────────
export default function ActiveResponsePage() {
  const playbooksRef = useRef<HTMLDivElement>(null);
  useInView(playbooksRef, { once: true });

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
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-[#0070F3] opacity-8 blur-[140px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto w-full">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0070F3]/30 bg-[#0070F3]/10 text-[#0070F3] text-sm font-medium mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
            Servicio Activo — Respuesta Activa
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Respuesta Activa —{" "}
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(90deg, #0070F3, #00D4FF)" }}
                >
                  Bloquea amenazas automáticamente en milisegundos
                </span>
              </motion.h1>
              <motion.p
                className="text-[#A0A0A0] text-lg md:text-xl leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Sin esperar a un analista. Sin intervención humana. La amenaza se bloquea antes de que causes daño — en menos de 100ms.
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
                  Activa respuesta automática
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
              <ResponseTimelineHero />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. STATS ──────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 border-t border-[#2A2A2A]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Tiempo de respuesta", display: "<100ms", value: 100 },
            { label: "Acciones de bloqueo", display: "6", value: 6 },
            { label: "Firewalls soportados", display: "6", value: 6 },
            { label: "Playbooks predefinidos", display: "6+", value: 6 },
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
                {stat.label === "Tiempo de respuesta" ? (
                  <span>&lt;100ms</span>
                ) : (
                  <AnimatedCounter target={stat.value} suffix={stat.display.includes("+") ? "+" : ""} />
                )}
              </div>
              <div className="text-[#A0A0A0] text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 3. DELAY COST COMPARISON ──────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#111111] border-y border-[#2A2A2A]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="grid lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">El costo de la demora humana</h2>
              <p className="text-[#A0A0A0] leading-relaxed mb-6">
                Un analista humano tarda en promedio 30 minutos en detectar y responder a una amenaza. En ese tiempo, el ransomware puede cifrar miles de archivos y propagarse por toda la red. La respuesta activa actúa en milisegundos.
              </p>
              <div className="space-y-3">
                {[
                  { label: "0 – 5 min", event: "Malware establece persistencia", color: "#FFB800" },
                  { label: "5 – 15 min", event: "Reconnaissance de la red interna", color: "#FF6B35" },
                  { label: "15 – 30 min", event: "Movimiento lateral a otros sistemas", color: "#FF3B3B" },
                  { label: "30 min", event: "Analista humano detecta el incidente", color: "#FF3B3B" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 text-sm">
                    <span className="font-mono text-[#666666] w-20 flex-shrink-0">{item.label}</span>
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <span style={{ color: item.color }}>{item.event}</span>
                  </div>
                ))}
              </div>
            </div>
            <DelayCostComparison />
          </motion.div>
        </div>
      </section>

      {/* ── 4. RESPONSE ACTIONS ───────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Acciones de respuesta disponibles</h2>
            <p className="text-[#A0A0A0]">Cada acción se ejecuta automáticamente al detectar la amenaza correspondiente.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {responseActions.map((action, i) => (
              <motion.div
                key={action.title}
                className="bg-[#111111] border border-[#2A2A2A] hover:border-[#0070F3]/30 rounded-xl p-6 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${action.color}18`, border: `1px solid ${action.color}30` }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={action.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={action.icon} />
                  </svg>
                </div>
                <h3 className="font-semibold text-white mb-2">{action.title}</h3>
                <p className="text-[#666666] text-sm leading-relaxed">{action.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. TRIGGER-ACTION FLOW ────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#111111] border-y border-[#2A2A2A]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Flujo de respuesta activa</h2>
          </motion.div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            {triggerFlow.map((step, i) => (
              <div key={step.label} className="flex flex-col md:flex-row items-center gap-4">
                <motion.div
                  className="flex flex-col items-center text-center max-w-[150px]"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                >
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-3 font-bold text-xl border-2"
                    style={{ backgroundColor: `${step.color}15`, borderColor: `${step.color}50`, color: step.color }}
                  >
                    {i + 1}
                  </div>
                  <div className="font-semibold text-white text-sm mb-1">{step.label}</div>
                  <div className="text-[#666666] text-xs">{step.desc}</div>
                </motion.div>
                {i < triggerFlow.length - 1 && (
                  <div className="hidden md:block text-[#2A2A2A] text-2xl">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. PREDEFINED PLAYBOOKS ───────────────────────────────────────── */}
      <section className="py-20 px-6" ref={playbooksRef}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Playbooks predefinidos</h2>
            <p className="text-[#A0A0A0] max-w-xl mx-auto">
              Listos para usar desde el primer día. Cada playbook se puede personalizar o extender con tus reglas específicas.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {playbooks.map((pb, i) => (
              <motion.div
                key={pb.scenario}
                className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: pb.color }} />
                  <span className="font-semibold text-sm text-white">{pb.scenario}</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="text-[#666666] flex-shrink-0">Trigger:</span>
                    <span className="text-[#A0A0A0]">{pb.trigger}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#666666] flex-shrink-0">Acción:</span>
                    <span style={{ color: pb.color }}>{pb.action}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. SUPPORTED FIREWALLS ────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#111111] border-y border-[#2A2A2A]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Firewalls soportados para bloqueo de IP</h2>
            <p className="text-[#A0A0A0]">Bloqueo nativo en los firewalls más usados en LATAM.</p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-3">
            {firewalls.map((fw, i) => (
              <motion.div
                key={fw}
                className="px-5 py-2.5 bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#0070F3]/40 rounded-lg text-[#A0A0A0] hover:text-white font-semibold text-sm transition-all duration-200"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
              >
                {fw}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. AUDIT LOG ──────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="grid lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Auditoría completa de cada acción</h2>
              <p className="text-[#A0A0A0] leading-relaxed mb-6">
                Cada respuesta activa genera un registro inmutable con el contexto completo: qué alerta la disparó, qué acción se tomó, en qué endpoint, a qué hora y cuál fue el resultado.
              </p>
              <ul className="space-y-3">
                {[
                  "Registro completo de alerta → acción → resultado",
                  "Trazabilidad para equipos de compliance",
                  "Revierte acciones desde el mismo log",
                  "Evidencia forense en formato estándar",
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
            <div className="bg-[#0A0A0A] rounded-xl border border-[#2A2A2A] p-5 font-mono text-xs">
              <div className="text-[#666666] mb-3">Audit log — Respuesta activa</div>
              <div className="space-y-3">
                {[
                  { field: "ID", value: "AR-2026031703145200", color: "#0070F3" },
                  { field: "Timestamp", value: "2026-03-17T03:14:52.441Z", color: "#A0A0A0" },
                  { field: "Trigger", value: "rule:5710 — SSH Brute force", color: "#FF3B3B" },
                  { field: "Acción", value: "host-deny (iptables DROP)", color: "#FFB800" },
                  { field: "Target IP", value: "185.220.101.47", color: "#A0A0A0" },
                  { field: "Endpoint", value: "srv-prod-01 (192.168.1.10)", color: "#A0A0A0" },
                  { field: "Resultado", value: "EXITOSO — IP bloqueada", color: "#00FF88" },
                  { field: "Revertir en", value: "3600s (auto-unblock)", color: "#666666" },
                ].map((item) => (
                  <div key={item.field} className="flex gap-3">
                    <span className="text-[#666666] w-24 flex-shrink-0">{item.field}:</span>
                    <span style={{ color: item.color }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
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
            Responde en milisegundos,{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #0070F3, #00D4FF)" }}>
              no en horas
            </span>
          </h2>
          <p className="text-[#A0A0A0] text-lg mb-8">
            Playbooks activos desde la primera hora. Sin configuración compleja.
          </p>
          <Link
            href="/trial"
            className="inline-block px-10 py-4 rounded-lg bg-[#0070F3] hover:bg-[#0050D0] text-white font-semibold text-lg transition-all duration-200 shadow-[0_0_40px_rgba(0,112,243,0.4)] hover:shadow-[0_0_60px_rgba(0,112,243,0.6)]"
          >
            Activa respuesta automática
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
