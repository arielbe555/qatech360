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

// ─── Trivy Scan Mockup ────────────────────────────────────────────────────────
function TrivyScanMockup() {
  return (
    <div className="bg-[#0A0A0A] rounded-xl border border-[#2A2A2A] overflow-hidden font-mono text-xs">
      <div className="flex items-center gap-2 px-4 py-3 bg-[#111111] border-b border-[#2A2A2A]">
        <div className="w-3 h-3 rounded-full bg-[#FF3B3B]" />
        <div className="w-3 h-3 rounded-full bg-[#FFB800]" />
        <div className="w-3 h-3 rounded-full bg-[#00FF88]" />
        <span className="ml-2 text-[#666666]">Trivy — Escaneo de imagen</span>
        <span className="ml-auto text-[#00D4FF]">nginx:1.24.0</span>
      </div>
      <div className="p-4 space-y-2">
        <div className="text-[#666666] mb-3">nginx:1.24.0 (debian 12.5)</div>
        {[
          { cve: "CVE-2024-7264", pkg: "curl", version: "7.88.1", fix: "8.9.0", severity: "#FF3B3B", label: "CRÍTICO" },
          { cve: "CVE-2024-5535", pkg: "openssl", version: "3.0.11", fix: "3.0.14", severity: "#FF6B35", label: "ALTO" },
          { cve: "CVE-2024-2236", pkg: "libgcrypt20", version: "1.10.1", fix: "1.11.0", severity: "#FFB800", label: "MEDIO" },
          { cve: "CVE-2023-52425", pkg: "libexpat1", version: "2.5.0", fix: "2.6.0", severity: "#FFB800", label: "MEDIO" },
          { cve: "CVE-2024-0727", pkg: "openssl", version: "3.0.11", fix: "3.0.13", severity: "#0070F3", label: "BAJO" },
        ].map((item) => (
          <div key={item.cve} className="flex items-center gap-2 py-1.5 border-b border-[#1A1A1A] last:border-0">
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.severity }} />
            <span className="text-[#A0A0A0] w-32 flex-shrink-0">{item.cve}</span>
            <span className="text-[#666666] w-20 flex-shrink-0">{item.pkg}</span>
            <span className="text-[#666666] flex-1">{item.version} → {item.fix}</span>
            <span
              className="px-2 py-0.5 rounded text-xs font-bold"
              style={{ backgroundColor: `${item.severity}15`, color: item.severity }}
            >
              {item.label}
            </span>
          </div>
        ))}
        <div className="pt-3 border-t border-[#2A2A2A] flex items-center justify-between">
          <span className="text-[#666666]">Total: 1 CRÍTICO · 1 ALTO · 2 MEDIO · 1 BAJO</span>
          <span className="text-[#FF3B3B] font-bold">Ticket Jira creado</span>
        </div>
      </div>
    </div>
  );
}

// ─── Container Threats ────────────────────────────────────────────────────────
const containerThreats = [
  { name: "Vulnerabilidades en imágenes", desc: "Imágenes base desactualizadas con CVEs conocidos. La mayoría de las brechas en K8s empiezan por aquí.", color: "#FF3B3B", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
  { name: "Escape de contenedor", desc: "Un proceso dentro de un contenedor aprovecha una vulnerabilidad del kernel para acceder al host subyacente.", color: "#FF6B35", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" },
  { name: "Escalada de privilegios", desc: "Contenedores corriendo como root o con capabilities innecesarias permiten que un atacante tome control del nodo.", color: "#FFB800", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
  { name: "Misconfiguraciones RBAC K8s", desc: "Service accounts con permisos excesivos, ClusterRoles con wildcard, o secretos expuestos en variables de entorno.", color: "#0070F3", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
  { name: "Movimiento lateral entre pods", desc: "Un pod comprometido ataca otros pods en el mismo namespace o cluster a través de la red interna de K8s.", color: "#00D4FF", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
];

// ─── Security Layers ──────────────────────────────────────────────────────────
const securityLayers = [
  { label: "Escaneo de imágenes", desc: "Trivy detecta CVEs antes del despliegue", color: "#0070F3", phase: "Build" },
  { label: "Monitoreo en runtime", desc: "Detección de anomalías en tiempo de ejecución", color: "#00D4FF", phase: "Runtime" },
  { label: "Políticas de red", desc: "Monitoreo de comunicación entre pods", color: "#FFB800", phase: "Network" },
  { label: "Auditoría RBAC", desc: "Detección de permisos excesivos y mal configurados", color: "#00FF88", phase: "IAM" },
];

// ─── Features ─────────────────────────────────────────────────────────────────
const features = [
  { title: "Monitoreo de eventos Docker", desc: "Eventos del daemon Docker: inicio/parada de contenedores, cambios de imagen, accesos a volúmenes sensibles.", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4", color: "#00D4FF" },
  { title: "Audit logs de Kubernetes", desc: "Análisis de los audit logs de la API de K8s. Detecta accesos anómalos, creación de roles peligrosos y llamadas sospechosas.", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4", color: "#0070F3" },
  { title: "Escaneo de imágenes con Trivy", desc: "Integración nativa con Trivy para escanear imágenes Docker en busca de CVEs, secretos y configuraciones inseguras.", icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z", color: "#FFB800" },
  { title: "Detección de anomalías syscall", desc: "Monitoreo de llamadas al sistema en tiempo de ejecución. Detecta comportamientos anómalos que indican compromiso del contenedor.", icon: "M13 10V3L4 14h7v7l9-11h-7z", color: "#FF3B3B" },
  { title: "Detección de escape de contenedor", desc: "Identifica intentos de acceso a recursos del host, mount de directorios sensibles del host, y uso de privilegios elevados.", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z", color: "#FF6B35" },
  { title: "Alertas de misconfiguraciones RBAC", desc: "Detecta service accounts con permisos de cluster-admin, ClusterRoles con wildcards, y secretos expuestos.", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", color: "#00FF88" },
];

// ─── RBAC Misconfigs ──────────────────────────────────────────────────────────
const rbacMisconfigs = [
  {
    title: "ClusterRole con wildcard",
    bad: `apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
rules:
- apiGroups: ["*"]
  resources: ["*"]
  verbs: ["*"]  # ← PELIGROSO`,
    risk: "Un pod comprometido puede acceder a cualquier recurso del cluster",
  },
  {
    title: "ServiceAccount con cluster-admin",
    bad: `apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
roleRef:
  name: cluster-admin  # ← EVITAR
subjects:
- kind: ServiceAccount
  name: app-sa`,
    risk: "Escalada total si el pod es comprometido",
  },
  {
    title: "Secreto como variable de entorno",
    bad: `env:
- name: DB_PASSWORD
  value: "mi-password-secreto"
  # ← Usar secretRef en su lugar
  # - secretKeyRef:
  #     name: db-secret
  #     key: password`,
    risk: "Secreto expuesto en logs y en la API de K8s",
  },
];

// ─── PAGE ────────────────────────────────────────────────────────────────────
export default function ContainerSecurityPage() {
  const trivyRef = useRef<HTMLDivElement>(null);
  useInView(trivyRef, { once: true });

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <NavBar />

      {/* ── 1. HERO ───────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-16 overflow-hidden">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,212,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.06) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[#00D4FF] opacity-5 blur-[140px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto w-full">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00D4FF]/30 bg-[#00D4FF]/10 text-[#00D4FF] text-sm font-medium mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
            Servicio Activo — Seguridad de Contenedores
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Seguridad de Contenedores —{" "}
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(90deg, #00D4FF, #0070F3)" }}
                >
                  Docker y Kubernetes protegidos en tiempo de ejecución
                </span>
              </motion.h1>
              <motion.p
                className="text-[#A0A0A0] text-lg md:text-xl leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Escaneo de imágenes, monitoreo runtime, auditoría RBAC y detección de escapes — todo integrado en el SIEM.
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
                  Protege tus contenedores
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
              <TrivyScanMockup />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. STATS ──────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 border-t border-[#2A2A2A]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: 2, suffix: " plataformas", label: "Docker + Kubernetes" },
            { value: 100, suffix: "+", label: "CVEs detectados en imágenes" },
            { value: 5, suffix: "s", label: "Detección de escape", prefix: "<" },
            { value: 50, suffix: "+", label: "Reglas RBAC predefinidas" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-[#00D4FF] mb-2">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} prefix={stat.prefix ?? ""} />
              </div>
              <div className="text-[#A0A0A0] text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 3. THREAT LANDSCAPE ───────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#111111] border-y border-[#2A2A2A]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Amenazas en entornos de contenedores</h2>
            <p className="text-[#A0A0A0] max-w-xl mx-auto">
              Los contenedores introducen una superficie de ataque única. Estas son las amenazas más comunes que cubrimos.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {containerThreats.map((threat, i) => (
              <motion.div
                key={threat.name}
                className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${threat.color}18`, border: `1px solid ${threat.color}30` }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={threat.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={threat.icon} />
                  </svg>
                </div>
                <h3 className="font-semibold text-white mb-2 text-sm">{threat.name}</h3>
                <p className="text-[#666666] text-sm leading-relaxed">{threat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. SECURITY LAYERS ────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Capas de seguridad</h2>
            <p className="text-[#A0A0A0]">Protección en cada fase del ciclo de vida del contenedor.</p>
          </motion.div>
          <div className="flex flex-col md:flex-row items-stretch justify-center gap-4">
            {securityLayers.map((layer, i) => (
              <motion.div
                key={layer.label}
                className="flex-1 bg-[#111111] border border-[#2A2A2A] rounded-xl p-6 text-center"
                style={{ borderTopColor: layer.color, borderTopWidth: 3 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div
                  className="inline-block px-2 py-0.5 rounded text-xs font-bold mb-3"
                  style={{ backgroundColor: `${layer.color}15`, color: layer.color }}
                >
                  {layer.phase}
                </div>
                <div className="font-semibold text-white mb-2 text-sm">{layer.label}</div>
                <div className="text-[#666666] text-xs">{layer.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. FEATURE GRID ───────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#111111] border-y border-[#2A2A2A]">
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
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                className="bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#00D4FF]/30 rounded-xl p-6 transition-all duration-300"
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

      {/* ── 6. RBAC MISCONFIGS ────────────────────────────────────────────── */}
      <section className="py-20 px-6" ref={trivyRef}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Misconfiguraciones RBAC comunes</h2>
            <p className="text-[#A0A0A0] max-w-xl mx-auto">
              Detectamos automáticamente estos patrones peligrosos en tus manifiestos de Kubernetes.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {rbacMisconfigs.map((mc, i) => (
              <motion.div
                key={mc.title}
                className="bg-[#111111] border border-[#2A2A2A] rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
              >
                <div className="px-4 py-3 bg-[#1A1A1A] border-b border-[#2A2A2A] flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#FF3B3B]" />
                  <span className="text-sm font-semibold text-white">{mc.title}</span>
                </div>
                <pre className="px-4 py-3 text-xs font-mono text-[#A0A0A0] overflow-x-auto leading-relaxed bg-[#0A0A0A]">
                  {mc.bad}
                </pre>
                <div className="px-4 py-3 bg-[#FF3B3B]/5 border-t border-[#FF3B3B]/20">
                  <div className="text-[#FF3B3B] text-xs font-semibold mb-1">Riesgo:</div>
                  <div className="text-[#A0A0A0] text-xs">{mc.risk}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. DEVSECOPS ──────────────────────────────────────────────────── */}
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/20 text-[#00FF88] text-xs font-semibold mb-4">
                DEVSECOPS
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Seguridad desplazada a la izquierda</h2>
              <p className="text-[#A0A0A0] leading-relaxed mb-6">
                Integra el escaneo de imágenes en tu pipeline de CI/CD. Detecta vulnerabilidades antes de que las imágenes lleguen a producción.
              </p>
              <ul className="space-y-3">
                {[
                  "Escaneo automático en cada push a registry",
                  "Bloqueo de imágenes con CVEs críticos en pipeline",
                  "Integración con GitHub Actions, GitLab CI, Jenkins",
                  "Política de admisión para K8s (OPA/Gatekeeper)",
                  "Alertas en Slack/Teams al equipo de desarrollo",
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
              <div className="text-[#666666] mb-3">Pipeline CI/CD — GitHub Actions</div>
              <div className="space-y-2">
                {[
                  { step: "1. Build", cmd: "docker build -t myapp:$SHA .", status: "✓", color: "#00FF88" },
                  { step: "2. Push", cmd: "docker push registry/myapp:$SHA", status: "✓", color: "#00FF88" },
                  { step: "3. Scan (Trivy)", cmd: "qatech360 scan myapp:$SHA", status: "!", color: "#FFB800" },
                  { step: "4. Gate", cmd: "if CRITICAL > 0: fail", status: "✗", color: "#FF3B3B" },
                  { step: "5. Deploy", cmd: "kubectl apply -f deploy.yaml", status: "—", color: "#666666" },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3 py-1.5">
                    <span style={{ color: item.color }} className="w-4 flex-shrink-0">{item.status}</span>
                    <div>
                      <div className="text-[#666666] text-xs mb-0.5">{item.step}</div>
                      <div className="text-[#A0A0A0]">{item.cmd}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-[#2A2A2A] text-[#FFB800]">
                ⚠ Pipeline detenido: 1 CVE CRÍTICO en nginx:1.24.0
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 8. CTA ────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/8 via-transparent to-[#0070F3]/5 pointer-events-none" />
        <motion.div
          className="relative max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Protege tus contenedores{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #00D4FF, #0070F3)" }}>
              en producción
            </span>
          </h2>
          <p className="text-[#A0A0A0] text-lg mb-8">
            14 días gratis. Monitoreo de Docker y K8s activo desde el primer día.
          </p>
          <Link
            href="/trial"
            className="inline-block px-10 py-4 rounded-lg bg-[#0070F3] hover:bg-[#0050D0] text-white font-semibold text-lg transition-all duration-200 shadow-[0_0_40px_rgba(0,112,243,0.4)] hover:shadow-[0_0_60px_rgba(0,112,243,0.6)]"
          >
            Protege tus contenedores
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
