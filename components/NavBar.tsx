"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import {
  navVariants,
  mobileMenuVariants,
  hamburgerTopLine,
  hamburgerMiddleLine,
  hamburgerBottomLine,
  megaMenuVariants,
  staggerContainer,
  staggerItem,
} from "@/lib/animations";

// ================================================================
// TYPES
// ================================================================
interface NavItem {
  label: string;
  href?: string;
  children?: MegaMenuSection[];
}

interface MegaMenuSection {
  title: string;
  items: MegaMenuItem[];
}

interface MegaMenuItem {
  icon: React.ReactNode;
  label: string;
  description: string;
  href: string;
  badge?: string;
}

// ================================================================
// ICONS
// ================================================================
const ShieldIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const ChevronDown = ({ size = 14, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

// ================================================================
// NAV DATA
// ================================================================
const NAV_ITEMS: NavItem[] = [
  {
    label: "Plataforma",
    children: [
      {
        title: "Detección & Respuesta",
        items: [
          {
            icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
            label: "Threat Detection",
            description: "IA que detecta amenazas antes del impacto",
            href: "/platform/detection",
            badge: "Nuevo",
          },
          {
            icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
            label: "EDR Avanzado",
            description: "Endpoint Detection & Response en tiempo real",
            href: "/platform/edr",
          },
          {
            icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
            label: "SIEM Inteligente",
            description: "Correlación de eventos con ML",
            href: "/platform/siem",
          },
        ],
      },
      {
        title: "Gestión & Cumplimiento",
        items: [
          {
            icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="11" width="6" height="6"/><path d="M14.5 4h-5l-1 3H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1"/><path d="M14.5 4h-5l-1 3h7l-1-3z"/></svg>,
            label: "Vulnerability Mgmt",
            description: "Escáner y priorización de vulnerabilidades",
            href: "/platform/vuln",
          },
          {
            icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
            label: "Compliance",
            description: "ISO 27001, SOC 2, PCI-DSS automatizado",
            href: "/platform/compliance",
          },
        ],
      },
    ],
  },
  {
    label: "Servicios",
    children: [
      {
        title: "Servicios Gestionados",
        items: [
          {
            icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
            label: "SOC 24/7",
            description: "Centro de operaciones de seguridad siempre activo",
            href: "/services/soc",
            badge: "Popular",
          },
          {
            icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
            label: "Consultoría",
            description: "Expertos en seguridad para su equipo",
            href: "/services/consulting",
          },
          {
            icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
            label: "Pen Testing",
            description: "Pruebas de penetración certificadas",
            href: "/services/pentest",
          },
        ],
      },
    ],
  },
  { label: "Precios", href: "/pricing" },
  {
    label: "Por qué qatech360",
    children: [
      {
        title: "Nuestra Ventaja",
        items: [
          {
            icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
            label: "vs CrowdStrike",
            description: "Comparable en capacidades, 40% más económico",
            href: "/compare/crowdstrike",
          },
          {
            icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
            label: "vs SentinelOne",
            description: "Mejor adaptado al contexto LATAM",
            href: "/compare/sentinelone",
          },
          {
            icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
            label: "Casos de Éxito",
            description: "50+ empresas protegidas en LATAM",
            href: "/case-studies",
          },
        ],
      },
    ],
  },
  {
    label: "Recursos",
    children: [
      {
        title: "Aprende",
        items: [
          {
            icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
            label: "Blog de Seguridad",
            description: "Artículos, amenazas y mejores prácticas",
            href: "/blog",
          },
          {
            icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
            label: "Documentación",
            description: "Guías técnicas y API reference",
            href: "/docs",
          },
          {
            icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>,
            label: "Webinars",
            description: "Sesiones en vivo con expertos",
            href: "/webinars",
          },
        ],
      },
    ],
  },
];

// ================================================================
// MEGA MENU
// ================================================================
function MegaMenu({ sections }: { sections: MegaMenuSection[] }) {
  return (
    <motion.div
      variants={megaMenuVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 glass-strong rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] min-w-[500px] max-w-[700px] p-5 border border-[rgba(55,65,81,0.5)]"
      style={{ zIndex: 100 }}
    >
      <div className={`grid gap-6 ${sections.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-[#6B7280] mb-3 px-2">
              {section.title}
            </h3>
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-0.5"
            >
              {section.items.map((item) => (
                <motion.li key={item.label} variants={staggerItem}>
                  <Link
                    href={item.href}
                    className="flex items-start gap-3 px-3 py-2.5 rounded-xl group hover:bg-[rgba(0,112,243,0.08)] transition-colors duration-150"
                  >
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-[rgba(0,112,243,0.1)] border border-[rgba(0,112,243,0.15)] flex items-center justify-center text-[#0070F3] group-hover:bg-[rgba(0,112,243,0.2)] transition-colors">
                      {item.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white group-hover:text-[#60A5FA] transition-colors">
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className="badge badge-primary text-[9px] py-0.5 px-1.5">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#6B7280] mt-0.5 line-clamp-1">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ================================================================
// MOBILE NAV ITEM
// ================================================================
function MobileNavItem({ item, onClose }: { item: NavItem; onClose: () => void }) {
  const [open, setOpen] = useState(false);
  const allItems = item.children?.flatMap((s) => s.items) ?? [];

  if (!item.children) {
    return (
      <Link
        href={item.href ?? "#"}
        onClick={onClose}
        className="block px-4 py-3 text-base font-medium text-[#9CA3AF] hover:text-white hover:bg-[rgba(31,41,55,0.6)] rounded-xl transition-colors"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-[#9CA3AF] hover:text-white hover:bg-[rgba(31,41,55,0.6)] rounded-xl transition-colors"
      >
        {item.label}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden pl-4 space-y-1 mt-1"
          >
            {allItems.map((sub) => (
              <li key={sub.label}>
                <Link
                  href={sub.href}
                  onClick={onClose}
                  className="block px-4 py-2.5 text-sm text-[#9CA3AF] hover:text-white hover:bg-[rgba(31,41,55,0.5)] rounded-lg transition-colors"
                >
                  {sub.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

// ================================================================
// NAVBAR
// ================================================================
export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const menuTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 20);
  });

  // Close menu on route change / outside click
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleMenuEnter = (label: string) => {
    if (menuTimerRef.current) clearTimeout(menuTimerRef.current);
    setActiveMenu(label);
  };

  const handleMenuLeave = () => {
    menuTimerRef.current = setTimeout(() => setActiveMenu(null), 120);
  };

  return (
    <>
      <motion.nav
        variants={navVariants}
        animate={scrolled ? "scrolled" : "top"}
        className="fixed top-0 left-0 right-0 z-[50] transition-colors"
        role="navigation"
        aria-label="Navegación principal"
      >
        <div className="container-qatech flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 flex-shrink-0 focus-ring"
            aria-label="qatech360 — Inicio"
          >
            <motion.span
              className="flex items-center justify-center w-9 h-9 rounded-xl glow-primary"
              style={{
                background: "linear-gradient(135deg, #0070F3 0%, #00D4FF 100%)",
              }}
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <ShieldIcon size={20} />
            </motion.span>
            <span className="text-xl font-extrabold tracking-tight">
              <span className="text-white">qatech</span>
              <span className="text-gradient">360</span>
            </span>
          </Link>

          {/* Desktop nav items */}
          <ul className="hidden lg:flex items-center gap-1" role="menubar">
            {NAV_ITEMS.map((item) => (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && handleMenuEnter(item.label)}
                onMouseLeave={handleMenuLeave}
                role="none"
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className="nav-link flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-[rgba(31,41,55,0.5)] transition-colors"
                    role="menuitem"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    className="nav-link flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-[rgba(31,41,55,0.5)] transition-colors cursor-pointer"
                    aria-haspopup="true"
                    aria-expanded={activeMenu === item.label}
                    role="menuitem"
                  >
                    {item.label}
                    <motion.span
                      animate={{ rotate: activeMenu === item.label ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown />
                    </motion.span>
                  </button>
                )}
                {/* Mega menu */}
                <AnimatePresence>
                  {item.children && activeMenu === item.label && (
                    <MegaMenu sections={item.children} />
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/login" className="btn-ghost text-sm px-4 py-2">
              Iniciar sesión
            </Link>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href="/trial" className="btn-primary text-sm px-5 py-2.5">
                <ShieldIcon size={15} />
                Prueba Gratis 15 Días
              </Link>
            </motion.div>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] rounded-lg hover:bg-[rgba(31,41,55,0.5)] transition-colors focus-ring"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
          >
            <motion.span
              variants={hamburgerTopLine}
              animate={mobileOpen ? "open" : "closed"}
              transition={{ duration: 0.25 }}
              className="w-5 h-0.5 bg-white rounded-full block origin-center"
            />
            <motion.span
              variants={hamburgerMiddleLine}
              animate={mobileOpen ? "open" : "closed"}
              transition={{ duration: 0.2 }}
              className="w-5 h-0.5 bg-white rounded-full block"
            />
            <motion.span
              variants={hamburgerBottomLine}
              animate={mobileOpen ? "open" : "closed"}
              transition={{ duration: 0.25 }}
              className="w-5 h-0.5 bg-white rounded-full block origin-center"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[45]"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 35 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm z-[48] bg-[#0D1117] border-l border-[rgba(55,65,81,0.5)] flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label="Menú de navegación"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between h-16 px-4 border-b border-[rgba(55,65,81,0.4)]">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2"
                >
                  <span
                    className="flex items-center justify-center w-8 h-8 rounded-lg"
                    style={{ background: "linear-gradient(135deg, #0070F3 0%, #00D4FF 100%)" }}
                  >
                    <ShieldIcon size={16} />
                  </span>
                  <span className="text-lg font-extrabold">
                    <span className="text-white">qatech</span>
                    <span className="text-gradient">360</span>
                  </span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[rgba(31,41,55,0.6)] text-[#9CA3AF] hover:text-white transition-colors"
                  aria-label="Cerrar menú"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>

              {/* Nav items */}
              <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
                {NAV_ITEMS.map((item) => (
                  <MobileNavItem
                    key={item.label}
                    item={item}
                    onClose={() => setMobileOpen(false)}
                  />
                ))}
              </nav>

              {/* CTAs */}
              <div className="px-4 py-4 border-t border-[rgba(55,65,81,0.4)] flex flex-col gap-3">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="btn-secondary w-full justify-center text-sm"
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/trial"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary w-full justify-center text-sm"
                >
                  <ShieldIcon size={15} />
                  Prueba Gratis 15 Días
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default NavBar;
