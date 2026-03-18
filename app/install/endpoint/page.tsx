"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import {
  staggerContainer,
  staggerContainerSlow,
  staggerItem,
  slideUp,
  slideUpLarge,
  scaleIn,
  sectionReveal,
  viewportOnce,
  viewportEarly,
  cardHover,
  buttonVariants,
} from "@/lib/animations";

// ================================================================
// CONSTANTS
// ================================================================
const TOKEN_REGEX = /^qt360_[a-zA-Z0-9]{16,48}$/;
const DOWNLOAD_BASE = "/api/download/agent";

type OsId = "windows" | "macos" | "linux-deb" | "linux-rpm";

// ================================================================
// INLINE SVG ICONS
// ================================================================

function ShieldInstallIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="url(#shieldGrad)" />
      <path d="M12 8v5" strokeWidth="2" stroke="#00D4FF" />
      <path d="M12 13l-2-2" strokeWidth="2" stroke="#00D4FF" />
      <path d="M12 13l2-2" strokeWidth="2" stroke="#00D4FF" />
      <path d="M12 16v1" strokeWidth="2" stroke="#00FF88" strokeLinecap="round" />
      <defs>
        <linearGradient id="shieldGrad" x1="4" y1="2" x2="20" y2="22">
          <stop stopColor="#0070F3" />
          <stop offset="1" stopColor="#00D4FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function CheckCircleIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#00FF88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
      <path d="m9 12 2 2 4-4" />
      <circle cx="12" cy="12" r="10" fill="none" />
    </svg>
  );
}

function XCircleIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#FF3B3B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  );
}

function DownloadIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function TerminalIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

function CopyIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckSmallIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#00FF88" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ChevronDownIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function ArrowRightIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function ServerIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  );
}

function AlertTriangleIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function NetworkIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="2" width="6" height="6" rx="1" />
      <rect x="16" y="16" width="6" height="6" rx="1" />
      <rect x="2" y="16" width="6" height="6" rx="1" />
      <path d="M5 16v-4h14v4" />
      <path d="M12 12V8" />
    </svg>
  );
}

// ================================================================
// OS SVG LOGOS
// ================================================================

function WindowsLogo() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M0 3.5l9.9-1.4v9.5H0V3.5zm11.1-1.5L24 0v11.6H11.1V2zm0 10.8H24V24l-12.9-1.8V12.8zM0 12.6h9.9v9.3L0 20.5v-7.9z" fill="#00D4FF" />
    </svg>
  );
}

function MacOSLogo() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" fill="#A0A0A0" />
    </svg>
  );
}

function LinuxLogo() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12.5 2c-1.6 0-2.9 1.8-2.9 3.3 0 .7.2 1.4.4 2-.8.5-1.6 1.3-2 2.3-.7 1.5-.8 3.3-.1 4.8.3.6.7 1.2 1.1 1.6-.5.8-.8 1.6-.8 2.3 0 .7.1 1.2.3 1.6.4.8 1.2 1.3 2 1.6.8.3 1.8.5 2.8.5s2-.2 2.8-.5c.8-.3 1.5-.8 2-1.6.2-.4.3-.9.3-1.6 0-.7-.3-1.5-.8-2.3.4-.4.8-1 1.1-1.6.7-1.5.5-3.3-.1-4.8-.5-1-.9-1.8-2-2.3.3-.6.4-1.3.4-2C16.4 3.8 15.1 2 13.5 2h-1z" fill="#FFB800" />
      <circle cx="11.5" cy="5.5" r=".8" fill="#0A0A0A" />
      <circle cx="13.5" cy="5.5" r=".8" fill="#0A0A0A" />
      <path d="M11 7.5s.5.5 1.5.5 1.5-.5 1.5-.5" stroke="#0A0A0A" strokeWidth=".5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// ================================================================
// OS DATA
// ================================================================

interface OsOption {
  id: OsId;
  name: string;
  subtitle: string;
  versions: string;
  fileSize: string;
  extension: string;
  icon: React.ReactNode;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  glowShadow: string;
}

const OS_OPTIONS: OsOption[] = [
  {
    id: "windows",
    name: "Windows",
    subtitle: "Instalador ejecutable",
    versions: "Windows 10/11, Server 2016+",
    fileSize: "12 MB",
    extension: ".exe",
    icon: <WindowsLogo />,
    accentColor: "#00D4FF",
    accentBg: "rgba(0,212,255,0.08)",
    accentBorder: "rgba(0,212,255,0.25)",
    glowShadow: "0 0 30px rgba(0,212,255,0.15)",
  },
  {
    id: "macos",
    name: "macOS",
    subtitle: "Paquete de instalación",
    versions: "macOS 12 Monterey+",
    fileSize: "15 MB",
    extension: ".pkg",
    icon: <MacOSLogo />,
    accentColor: "#A0A0A0",
    accentBg: "rgba(160,160,160,0.06)",
    accentBorder: "rgba(160,160,160,0.2)",
    glowShadow: "0 0 30px rgba(160,160,160,0.1)",
  },
  {
    id: "linux-deb",
    name: "Linux (DEB)",
    subtitle: "Debian / Ubuntu",
    versions: "Ubuntu 20+, Debian 11+",
    fileSize: "8 MB",
    extension: ".deb",
    icon: <LinuxLogo />,
    accentColor: "#FFB800",
    accentBg: "rgba(255,184,0,0.06)",
    accentBorder: "rgba(255,184,0,0.2)",
    glowShadow: "0 0 30px rgba(255,184,0,0.1)",
  },
  {
    id: "linux-rpm",
    name: "Linux (RPM)",
    subtitle: "RHEL / CentOS / Amazon Linux",
    versions: "RHEL 8+, CentOS 8+, AL2",
    fileSize: "8 MB",
    extension: ".rpm",
    icon: <LinuxLogo />,
    accentColor: "#FF6B00",
    accentBg: "rgba(255,107,0,0.06)",
    accentBorder: "rgba(255,107,0,0.2)",
    glowShadow: "0 0 30px rgba(255,107,0,0.1)",
  },
];

// ================================================================
// INSTALLATION STEPS DATA
// ================================================================

interface InstallStep {
  number: string;
  title: string;
  description: string;
  code?: string;
  isTerminal?: boolean;
  note?: string;
}

function getInstallSteps(token: string, os: OsId): InstallStep[] {
  const safeToken = token || "qt360_xxxxxxxxxxxxxxxxxx";

  switch (os) {
    case "windows":
      return [
        { number: "01", title: "Descargar el instalador", description: "Hacé clic en el botón de descarga de arriba para obtener el archivo .exe del agente." },
        { number: "02", title: "Ejecutar como Administrador", description: "Hacé clic derecho sobre el archivo descargado y seleccioná \"Ejecutar como administrador\".", note: "El instalador requiere permisos elevados para registrar el servicio del sistema." },
        { number: "03", title: "Pegar el token", description: "Cuando el instalador lo solicite, pegá tu token de conexión:", code: safeToken, isTerminal: false },
        { number: "04", title: "Verificar conexión", description: "El instalador mostrará un indicador verde cuando el agente se conecte exitosamente al panel de qatech360.", note: "Si ves un indicador rojo, verificá la conexión a internet y que los puertos 1514/1515 estén abiertos." },
      ];
    case "macos":
      return [
        { number: "01", title: "Descargar el paquete", description: "Hacé clic en el botón de descarga para obtener el archivo .pkg." },
        { number: "02", title: "Instalar el paquete", description: "Abrí el archivo descargado y seguí el asistente de instalación. Es posible que debas permitir la instalación en Preferencias del Sistema > Privacidad y Seguridad." },
        { number: "03", title: "Configurar el agente", description: "Abrí Terminal y ejecutá el siguiente comando:", code: `sudo qatech360-agent configure --token ${safeToken}`, isTerminal: true },
        { number: "04", title: "Iniciar el servicio", description: "Iniciá el agente y verificá que esté corriendo:", code: `sudo qatech360-agent start\nsudo qatech360-agent status`, isTerminal: true },
      ];
    case "linux-deb":
      return [
        { number: "01", title: "Descargar el paquete", description: "Descargá el paquete .deb desde la terminal:", code: "wget https://downloads.qatech360.com/agent/qatech360-agent_latest_amd64.deb", isTerminal: true },
        { number: "02", title: "Instalar con dpkg", description: "Instalá el paquete descargado:", code: "sudo dpkg -i qatech360-agent_latest_amd64.deb", isTerminal: true },
        { number: "03", title: "Configurar el token", description: "Conectá el agente a tu cuenta de qatech360:", code: `sudo qatech360-agent configure --token ${safeToken}`, isTerminal: true },
        { number: "04", title: "Iniciar el servicio", description: "Habilitá e iniciá el agente:", code: "sudo systemctl enable qatech360-agent\nsudo systemctl start qatech360-agent", isTerminal: true },
      ];
    case "linux-rpm":
      return [
        { number: "01", title: "Descargar el paquete", description: "Descargá el paquete .rpm desde la terminal:", code: "wget https://downloads.qatech360.com/agent/qatech360-agent_latest.x86_64.rpm", isTerminal: true },
        { number: "02", title: "Instalar con yum", description: "Instalá el paquete descargado:", code: "sudo yum install -y ./qatech360-agent_latest.x86_64.rpm", isTerminal: true },
        { number: "03", title: "Configurar el token", description: "Conectá el agente a tu cuenta de qatech360:", code: `sudo qatech360-agent configure --token ${safeToken}`, isTerminal: true },
        { number: "04", title: "Iniciar el servicio", description: "Habilitá e iniciá el agente:", code: "sudo systemctl enable qatech360-agent\nsudo systemctl start qatech360-agent", isTerminal: true },
      ];
  }
}

// ================================================================
// VERIFICATION DATA
// ================================================================

interface VerificationItem {
  os: string;
  command: string;
  description: string;
}

const VERIFICATIONS: VerificationItem[] = [
  { os: "Windows", command: 'sc query "qatech360-agent"', description: "Verificá en el panel de Servicios de Windows o ejecutá en PowerShell como Administrador:" },
  { os: "macOS", command: "sudo qatech360-agent status", description: "Ejecutá en Terminal:" },
  { os: "Linux", command: "sudo systemctl status qatech360-agent", description: "Ejecutá en la terminal:" },
];

// ================================================================
// SYSTEM REQUIREMENTS
// ================================================================

interface SysReq {
  label: string;
  minimum: string;
  recommended: string;
}

const SYS_REQS: SysReq[] = [
  { label: "CPU", minimum: "1 core (x86_64 / ARM64)", recommended: "2+ cores" },
  { label: "RAM", minimum: "256 MB disponible", recommended: "512 MB disponible" },
  { label: "Disco", minimum: "100 MB libre", recommended: "500 MB libre" },
  { label: "Red", minimum: "HTTPS saliente (puertos 1514, 1515)", recommended: "Conexión estable > 1 Mbps" },
  { label: "OS", minimum: "Ver versiones soportadas arriba", recommended: "Última versión estable del OS" },
];

// ================================================================
// FAQ DATA
// ================================================================

interface FaqItem {
  question: string;
  answer: string;
  code?: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "El agente no conecta al servidor",
    answer: "Verificá que los puertos 1514 (comunicación) y 1515 (registro) estén abiertos en tu firewall. El agente necesita conexión HTTPS saliente hacia los servidores de qatech360.",
    code: "# Verificar conectividad (Linux/macOS)\ncurl -v https://connect.qatech360.com:1515\n\n# Windows PowerShell\nTest-NetConnection connect.qatech360.com -Port 1515",
  },
  {
    question: "Token inválido o expirado",
    answer: "Los tokens tienen una validez de 24 horas después de ser generados. Podés generar uno nuevo desde tu panel de qatech360 en Configuración > Agentes > Generar nuevo token.",
  },
  {
    question: "Permiso denegado al instalar",
    answer: "El agente requiere permisos de administrador/root para instalarse correctamente. En Windows, ejecutá como Administrador. En Linux/macOS, usá sudo.",
    code: "# Linux/macOS — verificar permisos\nsudo -v\n\n# Windows — abrir PowerShell como Admin\nStart-Process powershell -Verb RunAs",
  },
  {
    question: "El endpoint no aparece en el dashboard",
    answer: "Después de instalar, el agente puede tardar hasta 60 segundos en registrarse y aparecer en tu panel. Verificá que el servicio esté corriendo y que la resolución DNS funcione correctamente.",
    code: "# Verificar estado del agente\nsudo qatech360-agent status\n\n# Verificar DNS\nnslookup connect.qatech360.com",
  },
  {
    question: "Cómo desinstalar el agente",
    answer: "Podés desinstalar el agente completamente desde cada sistema operativo:",
    code: '# Windows (PowerShell como Admin)\n& "C:\\Program Files\\qatech360\\uninstall.exe" /S\n\n# macOS\nsudo /Library/qatech360/uninstall.sh\n\n# Linux (DEB)\nsudo dpkg -r qatech360-agent\n\n# Linux (RPM)\nsudo yum remove qatech360-agent',
  },
];

// ================================================================
// CODE BLOCK COMPONENT
// ================================================================

function CodeBlock({ code, className = "" }: { code: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [code]);

  return (
    <div className={`relative group rounded-lg overflow-hidden ${className}`}>
      <div className="flex items-center justify-between px-4 py-2 bg-[#0A0A0A] border-b border-[#2A2A2A]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF3B3B]/60" aria-hidden="true" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFB800]/60" aria-hidden="true" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#00FF88]/60" aria-hidden="true" />
          </div>
          <span className="text-[11px] text-[#666666] font-mono ml-2">terminal</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 text-[11px] text-[#666666] hover:text-[#A0A0A0] rounded transition-colors"
          aria-label="Copiar comando"
        >
          {copied ? <CheckSmallIcon size={12} /> : <CopyIcon size={12} />}
          {copied ? "Copiado" : "Copiar"}
        </button>
      </div>
      <pre className="p-4 bg-[#0D0D0D] text-sm font-mono text-[#E5E5E5] overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// ================================================================
// FAQ ACCORDION ITEM
// ================================================================

function FaqAccordionItem({ item, index }: { item: FaqItem; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerItem}
      className="border border-[#2A2A2A] rounded-xl overflow-hidden hover:border-[#0070F3]/30 transition-colors"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-[#0070F3]/10 flex items-center justify-center text-xs font-mono font-bold text-[#0070F3]">
            {index + 1}
          </span>
          <span className="text-[15px] font-semibold text-white">{item.question}</span>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 text-[#666666]"
        >
          <ChevronDownIcon />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 space-y-3">
              <p className="text-sm text-[#A0A0A0] leading-relaxed pl-10">{item.answer}</p>
              {item.code && (
                <div className="pl-10">
                  <CodeBlock code={item.code} />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ================================================================
// MAIN PAGE COMPONENT
// ================================================================

export default function InstallEndpointPage() {
  const [token, setToken] = useState("");
  const [selectedOs, setSelectedOs] = useState<OsId>("windows");
  const [tokenTouched, setTokenTouched] = useState(false);

  const tokenValid = useMemo(() => TOKEN_REGEX.test(token), [token]);
  const tokenShowError = tokenTouched && token.length > 0 && !tokenValid;
  const tokenShowSuccess = tokenValid;

  const downloadUrl = useMemo(() => {
    if (!tokenValid) return "#";
    return `${DOWNLOAD_BASE}?os=${selectedOs}&token=${encodeURIComponent(token)}`;
  }, [tokenValid, selectedOs, token]);

  const steps = useMemo(() => getInstallSteps(token, selectedOs), [token, selectedOs]);

  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-[#0A0A0A]">

        {/* ============================================================
            SECTION 1 — HERO
            ============================================================ */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          {/* Background grid */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} aria-hidden="true" />
          {/* Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-[#0070F3]/[0.07] blur-[120px]" aria-hidden="true" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-6"
            >
              {/* Badge */}
              <motion.div variants={staggerItem} className="flex justify-center">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-[#0070F3]/10 text-[#0070F3] border border-[#0070F3]/20">
                  <ClockIcon />
                  Instalación en 5 minutos
                </span>
              </motion.div>

              {/* Title */}
              <motion.div variants={staggerItem} className="flex justify-center">
                <ShieldInstallIcon size={56} />
              </motion.div>
              <motion.h1
                variants={staggerItem}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight"
              >
                <span className="bg-gradient-to-r from-white via-[#00D4FF] to-[#0070F3] bg-clip-text text-transparent">
                  Instalar Agente qatech360
                </span>
              </motion.h1>
              <motion.p variants={staggerItem} className="text-lg sm:text-xl text-[#A0A0A0] max-w-2xl mx-auto leading-relaxed">
                Protegé este endpoint en minutos. Ingresá tu token, elegí tu sistema operativo,
                descargá e instalá el agente.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ============================================================
            SECTION 2 — TOKEN INPUT
            ============================================================ */}
        <section className="relative py-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={sectionReveal}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-8 h-8 rounded-lg bg-[#0070F3]/10 flex items-center justify-center text-xs font-mono font-bold text-[#0070F3]">1</span>
                <h2 className="text-xl font-bold text-white">Token de conexión</h2>
              </div>
              <p className="text-sm text-[#A0A0A0]">
                Encontrá tu token en el panel de qatech360:{" "}
                <span className="text-[#00D4FF] font-mono text-xs">Configuración &rarr; Agentes &rarr; Generar Token</span>
              </p>

              {/* Token input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="qt360_xxxxxxxxxxxxxxxxxx"
                  value={token}
                  onChange={(e) => {
                    setToken(e.target.value.trim());
                    if (!tokenTouched) setTokenTouched(true);
                  }}
                  onBlur={() => setTokenTouched(true)}
                  spellCheck={false}
                  autoComplete="off"
                  className={`
                    w-full px-5 py-4 rounded-xl bg-[#111111] border text-white font-mono text-base
                    placeholder:text-[#666666] outline-none transition-all duration-200
                    focus:ring-2 focus:ring-offset-0
                    ${tokenShowError
                      ? "border-[#FF3B3B]/50 focus:ring-[#FF3B3B]/30 focus:border-[#FF3B3B]/70"
                      : tokenShowSuccess
                        ? "border-[#00FF88]/50 focus:ring-[#00FF88]/30 focus:border-[#00FF88]/70"
                        : "border-[#2A2A2A] focus:ring-[#0070F3]/30 focus:border-[#0070F3]/50"
                    }
                  `}
                  aria-label="Token de conexión qatech360"
                />
                {/* Validation indicator */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  {tokenShowSuccess && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 25 }}>
                      <CheckCircleIcon />
                    </motion.div>
                  )}
                  {tokenShowError && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 25 }}>
                      <XCircleIcon />
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Validation messages */}
              <AnimatePresence>
                {tokenShowError && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="text-xs text-[#FF3B3B] flex items-center gap-1.5"
                  >
                    <XCircleIcon size={14} />
                    El token debe tener el formato qt360_ seguido de 16-48 caracteres alfanuméricos
                  </motion.p>
                )}
                {tokenShowSuccess && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="text-xs text-[#00FF88] flex items-center gap-1.5"
                  >
                    <CheckCircleIcon size={14} />
                    Token válido — seleccioná tu sistema operativo abajo
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* ============================================================
            SECTION 3 — OS SELECTOR
            ============================================================ */}
        <section className="relative py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainerSlow}
              className="space-y-8"
            >
              <motion.div variants={staggerItem} className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-[#0070F3]/10 flex items-center justify-center text-xs font-mono font-bold text-[#0070F3]">2</span>
                <h2 className="text-xl font-bold text-white">Seleccioná tu sistema operativo</h2>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {OS_OPTIONS.map((os) => {
                  const isSelected = selectedOs === os.id;
                  return (
                    <motion.div
                      key={os.id}
                      variants={staggerItem}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      onClick={() => setSelectedOs(os.id)}
                      className={`
                        relative cursor-pointer rounded-xl p-5 border transition-all duration-300 flex flex-col
                        ${isSelected
                          ? `bg-[#111111] border-[${os.accentColor}]`
                          : "bg-[#111111] border-[#2A2A2A] hover:border-[#444444]"
                        }
                      `}
                      style={{
                        borderColor: isSelected ? os.accentColor : undefined,
                        boxShadow: isSelected ? os.glowShadow : undefined,
                        background: isSelected ? `linear-gradient(135deg, #111111 0%, ${os.accentBg} 100%)` : undefined,
                      }}
                      role="radio"
                      aria-checked={isSelected}
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelectedOs(os.id); }}}
                    >
                      {/* Selected indicator */}
                      {isSelected && (
                        <motion.div
                          layoutId="os-selected"
                          className="absolute top-3 right-3"
                          initial={false}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        >
                          <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: `${os.accentColor}20`, border: `1.5px solid ${os.accentColor}` }}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={os.accentColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                          </div>
                        </motion.div>
                      )}

                      <div className="mb-4">{os.icon}</div>
                      <h3 className="text-base font-bold text-white mb-0.5">{os.name}</h3>
                      <p className="text-xs text-[#A0A0A0] mb-1">{os.subtitle}</p>
                      <p className="text-[11px] text-[#666666] mb-4">{os.versions}</p>

                      <div className="mt-auto space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[#666666] font-mono">{os.extension}</span>
                          <span className="text-[#A0A0A0]">{os.fileSize}</span>
                        </div>
                        <a
                          href={tokenValid ? `${DOWNLOAD_BASE}?os=${os.id}&token=${encodeURIComponent(token)}` : "#"}
                          onClick={(e) => { if (!tokenValid) e.preventDefault(); }}
                          className={`
                            w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200
                            ${tokenValid
                              ? "bg-[#0070F3] hover:bg-[#0050D0] text-white shadow-[0_0_20px_rgba(0,112,243,0.3)] hover:shadow-[0_0_30px_rgba(0,112,243,0.5)]"
                              : "bg-[#1A1A1A] text-[#666666] cursor-not-allowed"
                            }
                          `}
                          aria-disabled={!tokenValid}
                        >
                          <DownloadIcon size={16} />
                          {tokenValid ? `Descargar ${os.extension}` : "Ingresá token primero"}
                        </a>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============================================================
            SECTION 4 — INSTALLATION STEPS (Tab-based)
            ============================================================ */}
        <section className="relative py-20">
          {/* Subtle divider */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2A2A2A] to-transparent" aria-hidden="true" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={sectionReveal}
              className="space-y-8"
            >
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-[#0070F3]/10 flex items-center justify-center text-xs font-mono font-bold text-[#0070F3]">3</span>
                <h2 className="text-xl font-bold text-white">Pasos de instalación</h2>
              </div>

              {/* OS Tabs */}
              <div className="flex flex-wrap gap-2" role="tablist">
                {OS_OPTIONS.map((os) => (
                  <button
                    key={os.id}
                    role="tab"
                    aria-selected={selectedOs === os.id}
                    onClick={() => setSelectedOs(os.id)}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${selectedOs === os.id
                        ? "bg-[#0070F3]/15 text-[#0070F3] border border-[#0070F3]/30"
                        : "bg-[#111111] text-[#A0A0A0] border border-[#2A2A2A] hover:border-[#444444] hover:text-white"
                      }
                    `}
                  >
                    <span className="scale-50 origin-left">{os.icon}</span>
                    {os.name}
                  </button>
                ))}
              </div>

              {/* Steps */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedOs}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  {steps.map((step, i) => (
                    <div key={i} className="relative flex gap-4">
                      {/* Timeline line */}
                      {i < steps.length - 1 && (
                        <div className="absolute left-[19px] top-10 bottom-0 w-px bg-gradient-to-b from-[#0070F3]/40 to-[#2A2A2A]" aria-hidden="true" />
                      )}

                      {/* Step number */}
                      <div className="flex-shrink-0 relative z-10 w-10 h-10 rounded-full bg-[#0070F3]/10 border border-[#0070F3]/30 flex items-center justify-center text-xs font-mono font-bold text-[#0070F3]">
                        {step.number}
                      </div>

                      {/* Step content */}
                      <div className="flex-1 pb-8 space-y-3">
                        <h3 className="text-base font-semibold text-white">{step.title}</h3>
                        <p className="text-sm text-[#A0A0A0] leading-relaxed">{step.description}</p>

                        {step.code && step.isTerminal && (
                          <CodeBlock code={step.code} />
                        )}

                        {step.code && !step.isTerminal && (
                          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#111111] border border-[#2A2A2A] font-mono text-sm text-[#00D4FF]">
                            {step.code}
                          </div>
                        )}

                        {step.note && (
                          <div className="flex items-start gap-2 px-4 py-3 rounded-lg bg-[#FFB800]/5 border border-[#FFB800]/15">
                            <AlertTriangleIcon size={16} />
                            <p className="text-xs text-[#FFB800]/80 leading-relaxed">{step.note}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* ============================================================
            SECTION 5 — VERIFICATION
            ============================================================ */}
        <section className="relative py-20">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2A2A2A] to-transparent" aria-hidden="true" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainerSlow}
              className="space-y-8"
            >
              <motion.div variants={staggerItem} className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-[#00FF88]/10 flex items-center justify-center text-xs font-mono font-bold text-[#00FF88]">4</span>
                <h2 className="text-xl font-bold text-white">Verificar la instalación</h2>
              </motion.div>

              <motion.p variants={staggerItem} className="text-sm text-[#A0A0A0]">
                Confirmá que el agente está corriendo correctamente en tu endpoint.
              </motion.p>

              <div className="space-y-4">
                {VERIFICATIONS.map((v, i) => (
                  <motion.div
                    key={i}
                    variants={staggerItem}
                    className="rounded-xl bg-[#111111] border border-[#2A2A2A] p-5 space-y-3"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">{v.os}</span>
                      <span className="text-[11px] text-[#666666]">&mdash; {v.description}</span>
                    </div>
                    <CodeBlock code={v.command} />
                  </motion.div>
                ))}
              </div>

              {/* Dashboard notice */}
              <motion.div
                variants={staggerItem}
                className="flex items-start gap-4 p-5 rounded-xl bg-[#00FF88]/[0.04] border border-[#00FF88]/15"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#00FF88]/10 flex items-center justify-center">
                  <CheckCircleIcon />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white mb-1">Verificación en el Dashboard</p>
                  <p className="text-sm text-[#A0A0A0] leading-relaxed">
                    En <span className="text-[#00FF88] font-medium">60 segundos</span> después de iniciar el agente, verás el endpoint aparecer en tu panel de qatech360 con estado
                    {" "}<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#00FF88]/10 text-[#00FF88] border border-[#00FF88]/20">Conectado</span>.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ============================================================
            SECTION 6 — SYSTEM REQUIREMENTS
            ============================================================ */}
        <section className="relative py-20">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2A2A2A] to-transparent" aria-hidden="true" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={sectionReveal}
              className="space-y-8"
            >
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-[#0070F3]/10 flex items-center justify-center">
                  <ServerIcon size={16} />
                </span>
                <h2 className="text-xl font-bold text-white">Requisitos del sistema</h2>
              </div>

              {/* Requirements table */}
              <div className="rounded-xl border border-[#2A2A2A] overflow-hidden">
                <div className="grid grid-cols-3 bg-[#111111] border-b border-[#2A2A2A]">
                  <div className="px-5 py-3 text-xs font-semibold text-[#A0A0A0] uppercase tracking-wider">Recurso</div>
                  <div className="px-5 py-3 text-xs font-semibold text-[#A0A0A0] uppercase tracking-wider">Mínimo</div>
                  <div className="px-5 py-3 text-xs font-semibold text-[#A0A0A0] uppercase tracking-wider">Recomendado</div>
                </div>
                {SYS_REQS.map((req, i) => (
                  <div
                    key={i}
                    className={`grid grid-cols-3 ${i < SYS_REQS.length - 1 ? "border-b border-[#2A2A2A]" : ""} ${i % 2 === 0 ? "bg-[#0A0A0A]" : "bg-[#0D0D0D]"}`}
                  >
                    <div className="px-5 py-4 text-sm font-medium text-white">{req.label}</div>
                    <div className="px-5 py-4 text-sm text-[#A0A0A0]">{req.minimum}</div>
                    <div className="px-5 py-4 text-sm text-[#A0A0A0]">{req.recommended}</div>
                  </div>
                ))}
              </div>

              {/* Performance note */}
              <div className="flex items-start gap-3 px-5 py-4 rounded-xl bg-[#0070F3]/[0.04] border border-[#0070F3]/15">
                <div className="flex-shrink-0 mt-0.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0070F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                </div>
                <p className="text-sm text-[#A0A0A0] leading-relaxed">
                  El agente qatech360 está diseñado para ser ultraligero:{" "}
                  <span className="text-white font-medium">&lt;1% de uso de CPU</span> y{" "}
                  <span className="text-white font-medium">&lt;50 MB de RAM</span> en operación normal.
                  No impacta el rendimiento de tus aplicaciones.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============================================================
            SECTION 7 — TROUBLESHOOTING FAQ
            ============================================================ */}
        <section className="relative py-20">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2A2A2A] to-transparent" aria-hidden="true" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={sectionReveal}
              className="space-y-8"
            >
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-[#FFB800]/10 flex items-center justify-center">
                  <AlertTriangleIcon size={16} />
                </span>
                <h2 className="text-xl font-bold text-white">Solución de problemas</h2>
              </div>
              <p className="text-sm text-[#A0A0A0]">
                Respuestas a los problemas más comunes durante la instalación del agente.
              </p>

              <div className="space-y-3">
                {FAQ_ITEMS.map((item, i) => (
                  <FaqAccordionItem key={i} item={item} index={i} />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============================================================
            SECTION 8 — CTA: Multiple endpoints
            ============================================================ */}
        <section className="relative py-24">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2A2A2A] to-transparent" aria-hidden="true" />
          {/* Glow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#0070F3]/[0.06] blur-[100px]" aria-hidden="true" />

          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={staggerContainerSlow}
              className="space-y-6"
            >
              <motion.div variants={staggerItem} className="flex justify-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0070F3]/20 to-[#00D4FF]/10 border border-[#0070F3]/20 flex items-center justify-center">
                  <NetworkIcon size={28} />
                </div>
              </motion.div>

              <motion.h2 variants={staggerItem} className="text-2xl sm:text-3xl font-bold text-white">
                ¿Necesitás instalar en múltiples equipos?
              </motion.h2>

              <motion.p variants={staggerItem} className="text-[#A0A0A0] text-base max-w-xl mx-auto leading-relaxed">
                Desplegá el agente en toda tu red con instalación masiva, scripts de despliegue
                automatizado, integración con GPO, Ansible, Puppet o tu herramienta de MDM favorita.
              </motion.p>

              <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                <Link
                  href="/install/network"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#0070F3] hover:bg-[#0050D0] text-white font-semibold text-sm transition-all duration-200 shadow-[0_0_20px_rgba(0,112,243,0.4)] hover:shadow-[0_0_35px_rgba(0,112,243,0.6)]"
                >
                  Instalación masiva
                  <ArrowRightIcon size={16} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-[#2A2A2A] hover:border-[#0070F3]/40 text-[#A0A0A0] hover:text-white font-semibold text-sm transition-all duration-200"
                >
                  Hablar con un ingeniero
                </Link>
              </motion.div>

              {/* Trust badges */}
              <motion.div variants={staggerItem} className="flex flex-wrap justify-center gap-6 pt-6 text-xs text-[#666666]">
                <span className="flex items-center gap-1.5">
                  <CheckCircleIcon size={14} />
                  Soporte en español 24/7
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircleIcon size={14} />
                  Sin límite de endpoints
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircleIcon size={14} />
                  Zero-touch deployment
                </span>
              </motion.div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}