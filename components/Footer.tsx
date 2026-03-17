"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";

// ================================================================
// FOOTER DATA
// ================================================================
const FOOTER_LINKS = [
  {
    title: "Plataforma",
    links: [
      { label: "EDR Avanzado",             href: "/platform/edr" },
      { label: "SIEM Inteligente",         href: "/platform/siem" },
      { label: "Threat Intelligence",      href: "/platform/threat-intel" },
      { label: "Cloud Security",           href: "/platform/cloud" },
      { label: "Gestión de Vulnerabilidades", href: "/platform/vuln" },
      { label: "Compliance Automatizado",  href: "/platform/compliance" },
    ],
  },
  {
    title: "Servicios",
    links: [
      { label: "SOC 24/7",         href: "/services/soc" },
      { label: "Consultoría",      href: "/services/consulting" },
      { label: "Pen Testing",      href: "/services/pentest" },
      { label: "CISO Virtual",     href: "/services/virtual-ciso" },
      { label: "Training",         href: "/services/training" },
      { label: "Incident Response",href: "/services/ir" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre nosotros",  href: "/about" },
      { label: "Equipo",          href: "/team" },
      { label: "Blog",            href: "/blog" },
      { label: "Webinars",        href: "/webinars" },
      { label: "Partners",        href: "/partners" },
      { label: "Carreras",        href: "/careers", badge: "Contratando" },
    ],
  },
  {
    title: "Soporte",
    links: [
      { label: "Documentación",   href: "/docs" },
      { label: "API Reference",   href: "/docs/api" },
      { label: "Estado del sistema", href: "https://status.qatech360.com", external: true },
      { label: "Centro de ayuda", href: "/help" },
      { label: "Contacto",        href: "/contact" },
      { label: "SLA",             href: "/legal/sla" },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/qatech360",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://twitter.com/qatech360",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/qatech360",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@qatech360",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#0A0A0A"/>
      </svg>
    ),
  },
];

// ================================================================
// FOOTER
// ================================================================
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#080C14] border-t border-[rgba(55,65,81,0.4)]" role="contentinfo" aria-label="Pie de página">
      {/* Background gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 20% 0%, rgba(0,112,243,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="container-qatech relative z-10">
        {/* Top section: Brand + Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 py-16 border-b border-[rgba(55,65,81,0.3)]">
          {/* Brand column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5 group focus-ring rounded-lg" aria-label="qatech360 — Inicio">
              <span
                className="flex items-center justify-center w-9 h-9 rounded-xl transition-transform group-hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #0070F3 0%, #00D4FF 100%)",
                  boxShadow: "0 0 20px rgba(0,112,243,0.3)",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </span>
              <span className="text-xl font-extrabold tracking-tight">
                <span className="text-white">qatech</span>
                <span
                  style={{
                    background: "linear-gradient(135deg, #0070F3, #00D4FF)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >360</span>
              </span>
            </Link>

            <p className="text-sm text-[#9CA3AF] leading-relaxed mb-6 max-w-[260px]">
              Plataforma de ciberseguridad de próxima generación para empresas en LATAM. Protección enterprise, precio accesible.
            </p>

            {/* Social links */}
            <div className="flex gap-2" aria-label="Redes sociales">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg border border-[rgba(55,65,81,0.5)] bg-[rgba(31,41,55,0.4)] flex items-center justify-center text-[#6B7280] hover:text-[#0070F3] hover:border-[rgba(0,112,243,0.4)] hover:bg-[rgba(0,112,243,0.08)] transition-all duration-200 focus-ring"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Contact */}
            <div className="mt-6 space-y-2">
              <a href="mailto:hola@qatech360.com" className="flex items-center gap-2 text-xs text-[#6B7280] hover:text-[#9CA3AF] transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                hola@qatech360.com
              </a>
              <a href="https://wa.me/59170000000" className="flex items-center gap-2 text-xs text-[#6B7280] hover:text-[#9CA3AF] transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.9a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 3H6.6a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 10.7a16 16 0 0 0 6 6l.94-.94a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                +591 700 00000
              </a>
            </div>
          </div>

          {/* Links columns */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.title} className="lg:col-span-1">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#9CA3AF] mb-4">
                {col.title}
              </h3>
              <ul className="space-y-2.5" role="list">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-white transition-colors duration-150 group"
                      {...("external" in link && link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      <span className="group-hover:translate-x-0.5 transition-transform duration-150">
                        {link.label}
                      </span>
                      {"badge" in link && link.badge && (
                        <span className="badge badge-accent text-[9px] py-0 px-1.5">
                          {link.badge}
                        </span>
                      )}
                      {"external" in link && link.external && (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="opacity-50">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                          <polyline points="15 3 21 3 21 9"/>
                          <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-7">
          <p className="text-xs text-[#6B7280]">
            © {currentYear} qatech360. Todos los derechos reservados.
            {" "}Hecho con 💙 para LATAM.
          </p>
          <nav aria-label="Navegación legal" className="flex flex-wrap gap-5">
            {[
              { label: "Privacidad",     href: "/legal/privacy" },
              { label: "Términos",       href: "/legal/terms" },
              { label: "Cookies",        href: "/legal/cookies" },
              { label: "SLA",            href: "/legal/sla" },
              { label: "Seguridad",      href: "/legal/security" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs text-[#6B7280] hover:text-[#9CA3AF] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Certifications bar */}
        <div className="flex flex-wrap justify-center gap-4 pb-8 opacity-40">
          {["ISO 27001 Certified", "SOC 2 Type II", "PCI-DSS Level 1", "GDPR Compliant", "LGPD Brasil"].map((cert) => (
            <span key={cert} className="text-[10px] font-medium text-[#9CA3AF] border border-[rgba(55,65,81,0.4)] rounded px-2 py-1">
              {cert}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
