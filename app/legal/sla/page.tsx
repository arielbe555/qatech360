"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const slaTable = [
  {
    plan: "Plan Inicial",
    planEn: "Starter",
    p1: "4 horas",
    p2: "8 horas",
    p3: "24 horas",
    p4: "48 horas",
    uptime: "99.9%",
    support: "Horario hábil",
    highlight: false,
  },
  {
    plan: "Plan Profesional",
    planEn: "Professional",
    p1: "1 hora",
    p2: "4 horas",
    p3: "8 horas",
    p4: "24 horas",
    uptime: "99.9%",
    support: "24/7/365",
    highlight: true,
  },
  {
    plan: "Plan Empresarial",
    planEn: "Enterprise",
    p1: "15 minutos",
    p2: "1 hora",
    p3: "4 horas",
    p4: "8 horas",
    uptime: "99.95%",
    support: "24/7/365 + SOC dedicado",
    highlight: false,
  },
];

const priorities = [
  {
    level: "P1",
    label: "Crítico",
    color: "#FF3B3B",
    description: "El servicio está completamente inactivo, hay una brecha de seguridad activa en curso, ransomware activo o un atacante con acceso a sistemas críticos.",
    examples: [
      "Ransomware activo cifrando sistemas",
      "Agente instalado completamente inoperativo",
      "Acceso confirmado de atacante a sistemas críticos",
      "Portal de la plataforma inaccesible por más de 30 minutos",
    ],
  },
  {
    level: "P2",
    label: "Alto",
    color: "#FFB800",
    description: "El servicio está degradado de forma significativa, hay actividad sospechosa con alta probabilidad de ser un incidente real, o funciones críticas no están disponibles.",
    examples: [
      "Múltiples alertas críticas sin confirmación de incidente",
      "Agente con errores en 20%+ de endpoints",
      "Alertas de cumplimiento no funcionando",
      "Dashboard lento o parcialmente inaccesible",
    ],
  },
  {
    level: "P3",
    label: "Medio",
    color: "#FFB800",
    description: "Problema menor que afecta a un solo usuario o una función secundaria. No hay impacto en la seguridad operativa.",
    examples: [
      "Alerta individual que requiere ajuste de regla",
      "Reporte de cumplimiento con datos incorrectos",
      "Problema de integración no crítica",
      "Consulta sobre configuración específica",
    ],
  },
  {
    level: "P4",
    label: "Informativo",
    color: "#666666",
    description: "Solicitud de información, mejora o cambio de configuración que no tiene impacto operativo inmediato.",
    examples: [
      "Solicitud de nueva funcionalidad",
      "Pregunta sobre documentación",
      "Cambio de configuración planificado",
      "Solicitud de capacitación",
    ],
  },
];

const exclusions = [
  {
    title: "Mantenimiento programado",
    desc: "Ventanas de mantenimiento anunciadas con al menos 72 horas de anticipación. Típicamente domingos entre 1:00 y 5:00 AM GMT-6.",
  },
  {
    title: "Fuerza mayor",
    desc: "Eventos fuera de nuestro control razonable: desastres naturales, apagones masivos de proveedores de internet, ataques DDoS de escala masiva.",
  },
  {
    title: "Problemas causados por el cliente",
    desc: "Interrupciones causadas por configuraciones incorrectas del cliente, desinstalación del agente, bloqueo de puertos requeridos por el cliente.",
  },
  {
    title: "Infraestructura del cliente",
    desc: "Problemas de conectividad en la red del cliente, fallos de hardware del cliente o cambios en el entorno del cliente que afecten al servicio.",
  },
];

const credits = [
  { uptime: "99.0% – 99.9%", credit: "10% del mes", desc: "Crédito aplicado en la próxima factura" },
  { uptime: "95.0% – 99.0%", credit: "25% del mes", desc: "Crédito aplicado en la próxima factura" },
  { uptime: "< 95.0%", credit: "50% del mes", desc: "Crédito aplicado en la próxima factura" },
];

export default function SLAPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <NavBar />

      {/* Hero */}
      <section ref={heroRef} className="pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111111] border border-[#2A2A2A] text-sm text-[#A0A0A0] mb-6">
              Legal
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Acuerdo de Nivel de Servicio (SLA)</h1>
            <p className="text-[#A0A0A0]">Vigente desde: 17 de marzo de 2026</p>
            <p className="text-[#A0A0A0] mt-4 max-w-2xl">
              Nuestros compromisos de disponibilidad, tiempos de respuesta y créditos por incumplimiento. Sin letra chica.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Uptime commitment */}
      <section className="pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-[#111111] to-[#1A1A1A] border border-[#0070F3]/20 rounded-2xl p-8 text-center mb-8"
          >
            <h2 className="text-2xl font-bold mb-4">Compromiso de disponibilidad</h2>
            <div className="flex items-center justify-center gap-12 flex-wrap">
              <div>
                <div className="text-5xl font-bold text-[#00FF88]">99.9%</div>
                <div className="text-[#A0A0A0] text-sm mt-1">Planes Inicial y Profesional</div>
              </div>
              <div className="text-[#2A2A2A] text-4xl">/</div>
              <div>
                <div className="text-5xl font-bold text-[#0070F3]">99.95%</div>
                <div className="text-[#A0A0A0] text-sm mt-1">Plan Empresarial</div>
              </div>
            </div>
            <p className="text-[#A0A0A0] text-sm mt-6 max-w-xl mx-auto">
              99.9% mensual equivale a un máximo de 43 minutos de inactividad no programada por mes. 99.95% equivale a un máximo de 21 minutos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SLA Table */}
      <section className="pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Tiempos de respuesta por plan</h2>
            <p className="text-[#A0A0A0]">Tiempo medido desde la detección del incidente por la plataforma.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="overflow-x-auto"
          >
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#2A2A2A]">
                  <th className="text-left py-4 px-4 text-[#A0A0A0] text-sm font-medium">Plan</th>
                  <th className="text-center py-4 px-4 text-[#FF3B3B] text-sm font-medium">P1 (Crítico)</th>
                  <th className="text-center py-4 px-4 text-[#FFB800] text-sm font-medium">P2 (Alto)</th>
                  <th className="text-center py-4 px-4 text-[#A0A0A0] text-sm font-medium">P3 (Medio)</th>
                  <th className="text-center py-4 px-4 text-[#666666] text-sm font-medium">P4 (Info)</th>
                  <th className="text-center py-4 px-4 text-[#00FF88] text-sm font-medium">Soporte</th>
                </tr>
              </thead>
              <tbody>
                {slaTable.map((row, i) => (
                  <motion.tr
                    key={row.plan}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className={`border-b border-[#2A2A2A] ${row.highlight ? "bg-[#0070F3]/5" : ""}`}
                  >
                    <td className="py-5 px-4">
                      <div className="font-semibold">{row.plan}</div>
                      {row.highlight && (
                        <div className="text-xs text-[#0070F3] mt-0.5">Más popular</div>
                      )}
                    </td>
                    <td className="text-center py-5 px-4 text-[#FF3B3B] font-semibold">{row.p1}</td>
                    <td className="text-center py-5 px-4 text-[#FFB800] font-semibold">{row.p2}</td>
                    <td className="text-center py-5 px-4 text-[#A0A0A0]">{row.p3}</td>
                    <td className="text-center py-5 px-4 text-[#666666]">{row.p4}</td>
                    <td className="text-center py-5 px-4 text-[#00FF88] text-sm">{row.support}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* Priority definitions */}
      <section className="py-24 px-6 bg-[#111111]/50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Definición de prioridades</h2>
            <p className="text-[#A0A0A0]">
              La prioridad inicial es asignada automáticamente por la plataforma y puede ser ajustada por el cliente o el analista del SOC.
            </p>
          </motion.div>
          <div className="space-y-6">
            {priorities.map((p, i) => (
              <motion.div
                key={p.level}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-6"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-14 h-14 rounded-xl flex flex-col items-center justify-center flex-shrink-0 font-bold"
                    style={{ backgroundColor: `${p.color}15`, border: `1px solid ${p.color}30`, color: p.color }}
                  >
                    <span className="text-lg leading-none">{p.level}</span>
                    <span className="text-[10px] mt-0.5">{p.label}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-[#A0A0A0] mb-4 text-sm leading-relaxed">{p.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {p.examples.map((ex) => (
                        <span
                          key={ex}
                          className="text-xs px-3 py-1 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] text-[#A0A0A0]"
                        >
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Credits */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Política de créditos por incumplimiento</h2>
            <p className="text-[#A0A0A0] max-w-2xl mx-auto">
              Si no cumplimos con el uptime comprometido en un mes, automáticamente aplicamos un crédito en tu próxima factura. No necesitas solicitarlo.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {credits.map((c, i) => (
              <motion.div
                key={c.uptime}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-6 text-center"
              >
                <div className="text-[#A0A0A0] text-sm mb-3">Disponibilidad mensual</div>
                <div className="text-xl font-bold text-white mb-4">{c.uptime}</div>
                <div className="text-3xl font-bold text-[#0070F3] mb-2">{c.credit}</div>
                <div className="text-[#666666] text-xs">{c.desc}</div>
              </motion.div>
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-[#666666] text-xs text-center mt-6"
          >
            Los créditos se calculan como porcentaje del monto mensual del plan, excluyendo add-ons y servicios de implementación.
          </motion.p>
        </div>
      </section>

      {/* Exclusions */}
      <section className="py-24 px-6 bg-[#111111]/50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Exclusiones del SLA</h2>
            <p className="text-[#A0A0A0]">
              Las siguientes situaciones no cuentan como tiempo de inactividad para el cálculo de uptime.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {exclusions.map((excl, i) => (
              <motion.div
                key={excl.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-6"
              >
                <h3 className="font-semibold mb-2">{excl.title}</h3>
                <p className="text-[#A0A0A0] text-sm leading-relaxed">{excl.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-4">¿Dudas sobre el SLA?</h2>
            <p className="text-[#A0A0A0] mb-8">
              Para reportar una violación del SLA, solicitar un crédito o hacer preguntas sobre este acuerdo, contáctanos directamente.
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-4 bg-[#111111] border border-[#2A2A2A] rounded-xl">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#0070F3]">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="text-[#0070F3] font-medium">sla@qatech360.com</span>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
