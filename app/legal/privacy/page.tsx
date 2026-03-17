"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const sections = [
  {
    id: "datos-recopilamos",
    title: "1. Qué datos recopilamos",
    content: [
      "Recopilamos información que tú nos proporcionas directamente al registrarte, solicitar una demo, completar formularios de contacto o suscribirte a nuestro boletín. Esto incluye nombre completo, dirección de correo electrónico, nombre de empresa, cargo, número de teléfono y país.",
      "También recopilamos datos técnicos de manera automática cuando usas nuestro sitio web: dirección IP, tipo de navegador, sistema operativo, páginas visitadas, tiempo en el sitio y la URL desde la que llegaste. Esta información se recopila mediante cookies y herramientas de análisis como PostHog.",
      "Si eres cliente de la plataforma, recopilamos datos de uso de la plataforma, logs de eventos de seguridad de tu infraestructura, configuraciones y preferencias de alertas. Estos datos técnicos son procesados exclusivamente para la prestación del servicio de ciberseguridad contratado.",
    ],
  },
  {
    id: "uso-datos",
    title: "2. Cómo usamos los datos",
    content: [
      "Usamos tus datos de contacto para comunicarnos contigo sobre el servicio, enviarte actualizaciones, confirmaciones de solicitudes, respuestas a tus consultas y, con tu consentimiento, nuestro boletín de ciberseguridad. Nunca vendemos tu información personal a terceros.",
      "Los datos técnicos de tu infraestructura son usados exclusivamente para proveer el servicio de detección y respuesta a amenazas. Nuestros analistas del SOC pueden acceder a esta información únicamente para investigar incidentes de seguridad relacionados con tu cuenta.",
      "Usamos datos agregados y anonimizados para mejorar nuestra plataforma, desarrollar nuevas funciones y publicar estadísticas generales del panorama de amenazas en LATAM. Estos informes nunca incluyen datos identificables de clientes individuales.",
    ],
  },
  {
    id: "compartimos",
    title: "3. Con quién compartimos datos",
    content: [
      "Compartimos datos con proveedores de servicios que nos ayudan a operar la plataforma, incluyendo Resend (envío de correos transaccionales), Supabase (base de datos), Vercel (hosting), PostHog (analíticas de producto) y Cal.com (agendado de demos). Todos estos proveedores están sujetos a acuerdos de procesamiento de datos que cumplen con GDPR y LGPD.",
      "No compartimos datos de clientes con gobiernos, agencias de inteligencia ni terceros no autorizados, salvo cuando sea requerido por una orden judicial válida emitida por un tribunal competente. En ese caso, te notificaremos con la mayor celeridad posible, a menos que una disposición legal nos lo prohíba.",
      "En caso de fusión, adquisición o venta de activos, tus datos podrían transferirse al nuevo propietario, quien estará obligado a respetar los términos de esta política de privacidad o a notificarte antes de cualquier cambio en el tratamiento.",
    ],
  },
  {
    id: "retencion",
    title: "4. Retención de datos",
    content: [
      "Conservamos tus datos de contacto mientras mantengas una relación activa con qatech360 (como cliente, prospecto o suscriptor) y durante un período adicional de 3 años después de finalizar dicha relación, salvo que solicites su eliminación antes.",
      "Los datos técnicos de seguridad de la plataforma se retienen según el plan contratado: 30 días en el plan Inicial, 90 días en el plan Profesional y hasta 1 año (configurable) en el plan Empresarial. Una vez vencido el período de retención, los datos se eliminan de forma permanente e irrecuperable.",
      "Los registros de acceso y auditoría del sistema pueden retenerse por hasta 7 años para cumplir con obligaciones legales, fiscales o regulatorias aplicables en los países donde operamos (México, Colombia, Brasil, Argentina, Chile, Perú).",
    ],
  },
  {
    id: "derechos",
    title: "5. Derechos del usuario (RGPD / LGPD / LFPDPPP)",
    content: [
      "De acuerdo con el Reglamento General de Protección de Datos (RGPD), la Lei Geral de Proteção de Dados de Brasil (LGPD) y la Ley Federal de Protección de Datos Personales en Posesión de Particulares de México (LFPDPPP), tienes los siguientes derechos: acceso a tus datos personales, rectificación de datos inexactos, cancelación o supresión de tus datos, oposición al tratamiento y portabilidad de datos.",
      "Para ejercer cualquiera de estos derechos, envía un correo electrónico a privacidad@qatech360.com indicando tu nombre, el derecho que deseas ejercer y la información específica a la que se refiere tu solicitud. Responderemos en un plazo máximo de 15 días hábiles para solicitudes LFPDPPP y 30 días para solicitudes RGPD/LGPD.",
      "Si no quedas satisfecho con nuestra respuesta, tienes derecho a presentar una reclamación ante la autoridad de protección de datos competente en tu país: el INAI en México, la Superintendencia de Industria y Comercio en Colombia, o la ANPD en Brasil.",
    ],
  },
  {
    id: "cookies",
    title: "6. Cookies",
    content: [
      "Utilizamos cookies esenciales para el funcionamiento del sitio (sesión, preferencias de idioma), cookies analíticas a través de PostHog para entender cómo se usa el sitio, y cookies de funcionalidad para recordar tus preferencias. No utilizamos cookies de publicidad ni de rastreo entre sitios.",
      "Puedes controlar las cookies a través de la configuración de tu navegador. Ten en cuenta que deshabilitar cookies esenciales puede afectar el funcionamiento del sitio. Las cookies analíticas son opcionales y puedes rechazarlas sin afectar tu experiencia de navegación.",
      "Utilizamos localStorage del navegador para almacenar preferencias de usuario como el idioma seleccionado. Esta información nunca se comparte con terceros y solo existe en tu dispositivo.",
    ],
  },
  {
    id: "seguridad",
    title: "7. Seguridad",
    content: [
      "Protegemos tus datos con las mismas medidas que recomendamos a nuestros clientes: cifrado en tránsito (TLS 1.3), cifrado en reposo (AES-256), autenticación multifactor para el acceso interno a sistemas que contienen datos de clientes, y controles de acceso basados en el principio de privilegio mínimo.",
      "Realizamos auditorías de seguridad y pruebas de penetración periódicas sobre nuestra propia infraestructura. En caso de una brecha de seguridad que afecte datos personales, notificaremos a los usuarios afectados y a las autoridades competentes en los plazos que exige la ley (72 horas para RGPD, sin demora indebida para LGPD y LFPDPPP).",
      "Nuestros empleados con acceso a datos de clientes firman acuerdos de confidencialidad y reciben capacitación periódica en protección de datos. El acceso a datos de producción está restringido y auditado de forma continua.",
    ],
  },
  {
    id: "contacto",
    title: "8. Contacto",
    content: [
      "Si tienes preguntas sobre esta política de privacidad, deseas ejercer tus derechos o tienes alguna preocupación sobre el tratamiento de tus datos, puedes contactarnos en cualquier momento.",
      "Correo electrónico de privacidad: privacidad@qatech360.com — Para solicitudes de derechos ARCO, eliminación de datos o consultas generales sobre privacidad.",
      "Domicilio: qatech360 S.A. de C.V., Ciudad de México, México. Esta política fue actualizada por última vez el 17 de marzo de 2026 y puede actualizarse periódicamente. Te notificaremos por correo electrónico ante cambios significativos.",
    ],
  },
];

export default function PrivacyPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Política de Privacidad</h1>
            <p className="text-[#A0A0A0]">Última actualización: 17 de marzo de 2026</p>
            <p className="text-[#A0A0A0] mt-4 max-w-2xl">
              En qatech360 nos tomamos la privacidad de tus datos muy en serio. Esta política explica qué datos recopilamos, cómo los usamos y cuáles son tus derechos — en lenguaje claro, sin jerga legal.
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
            <ul className="space-y-2">
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
              transition={{ duration: 0.5, delay: i * 0.05 }}
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
