"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const sections = [
  {
    id: "aceptacion",
    title: "1. Aceptación de los términos",
    content: [
      "Al acceder y usar la plataforma qatech360 (incluyendo el sitio web qatech360.com, la plataforma de seguridad, las APIs y cualquier aplicación asociada), aceptas quedar vinculado por estos Términos de Servicio. Si no estás de acuerdo con alguno de estos términos, no utilices nuestros servicios.",
      "Estos términos constituyen un acuerdo legal entre tú (o la empresa que representas) y qatech360 S.A. de C.V. Si aceptas en nombre de una empresa u otra entidad legal, declaras y garantizas que tienes la autoridad legal para vincular a dicha entidad a estos términos.",
      "qatech360 se reserva el derecho de modificar estos términos en cualquier momento. Te notificaremos sobre cambios materiales con al menos 30 días de anticipación por correo electrónico. El uso continuado del servicio después de dicha notificación constituirá aceptación de los nuevos términos.",
    ],
  },
  {
    id: "descripcion-servicio",
    title: "2. Descripción del servicio",
    content: [
      "qatech360 es una plataforma de ciberseguridad gestionada (MSSPaaS) que proporciona servicios de SIEM, EDR, XDR, gestión de vulnerabilidades, cumplimiento automatizado, inteligencia de amenazas y respuesta a incidentes, operados principalmente para empresas en América Latina.",
      "El servicio se presta a través de un agente de software instalado en los endpoints del cliente, combinado con una plataforma central de análisis y detección de amenazas con tecnología de detección qatech360. Los clientes acceden al servicio a través del portal en portal.qatech360.com.",
      "El alcance específico del servicio, los límites de endpoints, los niveles de soporte y los acuerdos de nivel de servicio (SLA) se definen en el plan contratado (Inicial, Profesional o Empresarial) y en cualquier orden de servicio aplicable.",
    ],
  },
  {
    id: "cuentas-acceso",
    title: "3. Cuentas y acceso",
    content: [
      "Para usar la plataforma, debes crear una cuenta con información precisa y completa. Eres responsable de mantener la confidencialidad de tus credenciales de acceso y de todas las actividades que ocurran bajo tu cuenta. Debes notificarnos inmediatamente ante cualquier uso no autorizado de tu cuenta.",
      "El administrador de tu organización puede crear cuentas de usuario adicionales para miembros de su equipo. Cada usuario debe tener sus propias credenciales únicas; el uso compartido de credenciales está prohibido. Puedes crear roles con permisos granulares para controlar el acceso a diferentes funciones de la plataforma.",
      "qatech360 se reserva el derecho de suspender o terminar cuentas que violen estos términos, presenten riesgo de seguridad, estén involucradas en actividades fraudulentas, o no realicen el pago en tiempo y forma según lo acordado.",
    ],
  },
  {
    id: "uso-aceptable",
    title: "4. Uso aceptable",
    content: [
      "Puedes usar qatech360 únicamente para monitorear y proteger infraestructura que sea de tu propiedad o que tengas autorización explícita por escrito para monitorear. Está estrictamente prohibido usar la plataforma para monitorear sistemas de terceros sin su consentimiento, realizar actividades de vigilancia ilegal o recopilar datos sin base legal.",
      "No debes intentar acceder a datos de otros clientes, realizar ingeniería inversa de la plataforma, usarla para distribuir malware, lanzar ataques a terceros, o sobrecargar intencionalmente la infraestructura del servicio. Tampoco puedes revender el acceso a la plataforma sin un acuerdo de partner autorizado.",
      "Nos reservamos el derecho de investigar cualquier uso que sospechemos viola estas disposiciones y de tomar las acciones apropiadas, incluyendo la suspensión inmediata del servicio, la preservación de evidencias y la notificación a las autoridades competentes si corresponde.",
    ],
  },
  {
    id: "propiedad-intelectual",
    title: "5. Propiedad intelectual",
    content: [
      "La plataforma qatech360, incluyendo su código fuente propietario, diseño, interfaces, documentación, logotipos y marcas, es propiedad de qatech360 S.A. de C.V. y está protegida por las leyes de propiedad intelectual aplicables. El servicio utiliza tecnología propia de qatech360 con componentes de código abierto.",
      "Al usar la plataforma, no adquieres ningún derecho de propiedad sobre ella. Se te otorga una licencia limitada, no exclusiva, no transferible para acceder y usar el servicio durante el período de vigencia de tu suscripción y únicamente para los fines descritos en estos términos.",
      "Los datos de seguridad que el cliente genera y que son procesados por la plataforma siguen siendo propiedad del cliente. qatech360 no tiene ningún derecho de propiedad sobre los datos de los endpoints, logs o alertas de los clientes. Al cancelar el servicio, los clientes pueden exportar sus datos durante un período de 30 días antes de la eliminación.",
    ],
  },
  {
    id: "limitacion-responsabilidad",
    title: "6. Limitación de responsabilidad",
    content: [
      "El servicio se proporciona 'tal como está' y 'según disponibilidad'. Si bien nos esforzamos por mantener la plataforma operativa y actualizada, no garantizamos que el servicio sea ininterrumpido, libre de errores o que detecte el 100% de las amenazas de seguridad. La ciberseguridad es un campo en constante evolución y ninguna solución ofrece protección absoluta.",
      "En la máxima medida permitida por la ley aplicable, qatech360 no será responsable por daños indirectos, incidentales, especiales, consecuentes o punitivos, incluyendo pérdida de ganancias, pérdida de datos, daño a la reputación o pérdida de negocio, que surjan del uso o la imposibilidad de uso del servicio.",
      "La responsabilidad total acumulada de qatech360 hacia el cliente por cualquier reclamación derivada de estos términos o del uso del servicio no excederá el monto total pagado por el cliente a qatech360 durante los 12 meses anteriores a la reclamación, o USD $10,000, la cantidad que sea mayor.",
    ],
  },
  {
    id: "sla-disponibilidad",
    title: "7. SLA y disponibilidad",
    content: [
      "qatech360 se compromete a mantener una disponibilidad mensual de la plataforma del 99.9% (excluyendo mantenimiento programado y circunstancias fuera de nuestro control). Las ventanas de mantenimiento programado se anunciarán con al menos 72 horas de anticipación y se realizarán preferentemente en horarios de bajo tráfico (1:00–5:00 AM, horario GMT-6).",
      "Los tiempos de respuesta del SOC varían según el plan contratado. Para incidentes de prioridad P1 (servicio inactivo o brecha activa), el tiempo de respuesta es de 4 horas en el plan Inicial, 1 hora en el plan Profesional y 15 minutos en el plan Empresarial. Los tiempos de respuesta se miden desde la detección del incidente por la plataforma.",
      "Para información detallada sobre niveles de servicio, definiciones de prioridades, créditos por incumplimiento y exclusiones, consulta nuestro Acuerdo de Nivel de Servicio completo en qatech360.com/legal/sla.",
    ],
  },
  {
    id: "cancelacion",
    title: "8. Cancelación",
    content: [
      "Puedes cancelar tu suscripción en cualquier momento desde el panel de administración de tu cuenta o enviando un correo a hola@qatech360.com con 30 días de anticipación. La cancelación entrará en vigor al final del período de facturación en curso, sin cargos por cancelación anticipada en planes mensuales.",
      "Los planes anuales pueden cancelarse en cualquier momento, pero no dan derecho a reembolso prorrateado del período no utilizado, salvo en casos de incumplimiento material de qatech360 de sus obligaciones bajo estos términos o el SLA aplicable.",
      "Tras la cancelación, tendrás acceso al servicio hasta el final del período de facturación pagado. Después de eso, tendrás 30 días adicionales para exportar tus datos. Pasado este período, tus datos serán eliminados de forma permanente de nuestros sistemas.",
    ],
  },
  {
    id: "ley-aplicable",
    title: "9. Ley aplicable",
    content: [
      "Estos términos se rigen por la legislación mexicana para clientes domiciliados en México (Código Civil Federal, Ley Federal de Protección al Consumidor, LFPDPPP). Para clientes en Colombia, aplica la legislación colombiana, incluyendo el Estatuto del Consumidor (Ley 1480) y la Ley 1581. Para clientes en Brasil, aplica el Código de Defesa do Consumidor y la LGPD.",
      "Cualquier controversia que surja de estos términos se resolverá primero a través de negociación directa. Si no se llega a un acuerdo en 30 días, la disputa se someterá a mediación. Si la mediación fracasa, la controversia se resolverá mediante arbitraje comercial conforme a las reglas del Centro de Mediación y Arbitraje de la Cámara Nacional de Comercio de la Ciudad de México.",
      "Para clientes en regiones donde la legislación local exija condiciones más favorables al consumidor, esas disposiciones aplicarán en la medida en que sean obligatorias por ley, sin que ello invalide el resto de estos términos.",
    ],
  },
  {
    id: "contacto",
    title: "10. Contacto",
    content: [
      "Para preguntas sobre estos términos de servicio, disputas contractuales o asuntos legales, contáctanos en legal@qatech360.com.",
      "Para soporte técnico del servicio: soporte@qatech360.com — disponible según el SLA de tu plan.",
      "Dirección postal: qatech360 S.A. de C.V., Ciudad de México, México. Estos Términos de Servicio entraron en vigor el 17 de marzo de 2026.",
    ],
  },
];

export default function TermsPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <NavBar />

      {/* Hero */}
      <section ref={heroRef} className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111111] border border-[#2A2A2A] text-sm text-[#A0A0A0] mb-6">
              Legal
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Términos de Servicio</h1>
            <p className="text-[#A0A0A0]">Última actualización: 17 de marzo de 2026</p>
            <p className="text-[#A0A0A0] mt-4 max-w-2xl">
              Estos términos regulan el uso de la plataforma qatech360. Los hemos escrito de forma clara para que sepas exactamente cuáles son tus derechos y obligaciones, y los nuestros.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Table of contents */}
      <section className="pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-6"
          >
            <h2 className="font-semibold text-[#A0A0A0] text-sm mb-4 uppercase tracking-wider">Contenido</h2>
            <ul className="space-y-2 columns-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-[#0070F3] hover:text-[#00D4FF] text-sm transition-colors duration-200"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Sections */}
      <section className="pb-24 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {sections.map((s, i) => (
            <motion.div
              key={s.id}
              id={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-8"
            >
              <h2 className="text-xl font-bold mb-6 text-[#0070F3]">{s.title}</h2>
              <div className="space-y-4">
                {s.content.map((para, pi) => (
                  <p key={pi} className="text-[#A0A0A0] leading-relaxed text-sm">
                    {para}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
