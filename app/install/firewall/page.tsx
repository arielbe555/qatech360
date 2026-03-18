"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
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
  heroContainer,
  heroTitle,
  heroSubtitle,
  heroCtas,
  ctaContainer,
  ctaItem,
} from "@/lib/animations";

// ================================================================
// INLINE SVG ICONS
// ================================================================

function ShieldFirewallIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="url(#fwShieldGrad)" />
      <rect x="8" y="9" width="8" height="6" rx="1" stroke="#00D4FF" strokeWidth="1.5" fill="none" />
      <line x1="8" y1="11.5" x2="16" y2="11.5" stroke="#00D4FF" strokeWidth="1" opacity="0.5" />
      <line x1="8" y1="13" x2="16" y2="13" stroke="#00D4FF" strokeWidth="1" opacity="0.5" />
      <circle cx="12" cy="12" r="0.5" fill="#00FF88" />
      <defs>
        <linearGradient id="fwShieldGrad" x1="4" y1="2" x2="20" y2="22">
          <stop stopColor="#0070F3" />
          <stop offset="1" stopColor="#00D4FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function PortIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#0070F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <line x1="6" y1="10" x2="6" y2="14" />
      <line x1="10" y1="10" x2="10" y2="14" />
      <line x1="14" y1="10" x2="14" y2="14" />
      <line x1="18" y1="10" x2="18" y2="14" />
    </svg>
  );
}

function ArrowRightIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function CopyIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#00FF88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ChevronDownIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
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

function AlertIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function NetworkIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="2" width="6" height="6" rx="1" />
      <rect x="2" y="16" width="6" height="6" rx="1" />
      <rect x="16" y="16" width="6" height="6" rx="1" />
      <path d="M12 8v4" />
      <path d="M5 16v-2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

function GlobeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

// ================================================================
// CODE BLOCK COMPONENT
// ================================================================

function CodeBlock({ code, title, language = "cli" }: { code: string; title?: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="rounded-xl overflow-hidden border border-[#2A2A2A] bg-[#0A0A0A] my-4">
      {title && (
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#111111] border-b border-[#2A2A2A]">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#FF3B3B]/60" />
              <span className="w-3 h-3 rounded-full bg-[#FFB800]/60" />
              <span className="w-3 h-3 rounded-full bg-[#00FF88]/60" />
            </div>
            <span className="text-xs text-[#A0A0A0] ml-2 font-mono">{title}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#666666] uppercase tracking-wider font-mono">{language}</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-2 py-1 rounded text-xs text-[#A0A0A0] hover:text-white hover:bg-[#1A1A1A] transition-colors"
              aria-label="Copiar al portapapeles"
            >
              {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
              {copied ? "Copiado" : "Copiar"}
            </button>
          </div>
        </div>
      )}
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
        <code className="text-[#E0E0E0] font-mono whitespace-pre">{code}</code>
      </pre>
    </div>
  );
}

// ================================================================
// PORT TABLE DATA
// ================================================================

const ports = [
  {
    port: "1514",
    protocol: "TCP",
    direction: "Endpoint \u2192 Servidor",
    description: "Comunicaci\u00f3n del agente qatech360 (env\u00edo de eventos y logs)",
    required: true,
  },
  {
    port: "1515",
    protocol: "TCP",
    direction: "Endpoint \u2192 Servidor",
    description: "Registro inicial de agentes (enrollment)",
    required: true,
  },
  {
    port: "443",
    protocol: "HTTPS/TCP",
    direction: "Endpoint \u2192 Cloud",
    description: "API REST, actualizaciones de firmas y reglas",
    required: true,
  },
  {
    port: "55000",
    protocol: "HTTPS/TCP",
    direction: "Admin \u2192 Servidor",
    description: "API de gesti\u00f3n y administraci\u00f3n",
    required: false,
  },
];

// ================================================================
// FIREWALL GUIDES
// ================================================================

interface FirewallGuide {
  id: string;
  brand: string;
  subtitle: string;
  icon: () => JSX.Element;
  color: string;
  sections: {
    title: string;
    description: string;
    code: string;
    codeTitle: string;
    language: string;
  }[];
  notes?: string[];
}

const firewallGuides: FirewallGuide[] = [
  {
    id: "fortinet",
    brand: "Fortinet / FortiGate",
    subtitle: "FortiOS 6.x / 7.x",
    icon: () => (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="#DA291C" fillOpacity="0.15" />
        <path d="M8 16h4v-4h4v4h4v-4h4v4h-4v4h-4v-4h-4v4H8v-4z" fill="#DA291C" />
      </svg>
    ),
    color: "#DA291C",
    sections: [
      {
        title: "1. Crear objetos de direcci\u00f3n",
        description: "Define la direcci\u00f3n IP del servidor qatech360 como objeto de red en FortiGate.",
        codeTitle: "fortigate-cli",
        language: "fortios",
        code: `config firewall address
  edit "qatech360-server"
    set type ipmask
    set subnet 10.0.1.100/32
    set comment "Servidor qatech360 - Motor de detecci\u00f3n"
  next
  edit "qatech360-cloud"
    set type fqdn
    set fqdn "cloud.qatech360.com"
    set comment "qatech360 Cloud API"
  next
end`,
      },
      {
        title: "2. Crear servicios personalizados",
        description: "Define los puertos espec\u00edficos utilizados por el agente qatech360.",
        codeTitle: "fortigate-cli",
        language: "fortios",
        code: `config firewall service custom
  edit "qatech360-agent"
    set protocol TCP
    set tcp-portrange 1514
    set comment "Comunicaci\u00f3n agente qatech360"
  next
  edit "qatech360-enroll"
    set protocol TCP
    set tcp-portrange 1515
    set comment "Registro agentes qatech360"
  next
  edit "qatech360-api"
    set protocol TCP
    set tcp-portrange 55000
    set comment "API de gesti\u00f3n qatech360"
  next
end`,
      },
      {
        title: "3. Crear pol\u00edtica de firewall",
        description: "Permite el tr\u00e1fico desde la red interna hacia el servidor qatech360.",
        codeTitle: "fortigate-cli",
        language: "fortios",
        code: `config firewall policy
  edit 100
    set name "allow-qatech360-agent"
    set srcintf "lan"
    set dstintf "wan"
    set srcaddr "all"
    set dstaddr "qatech360-server" "qatech360-cloud"
    set service "qatech360-agent" "qatech360-enroll" "HTTPS"
    set action accept
    set logtraffic all
    set comments "Permitir tr\u00e1fico del agente qatech360"
    set schedule "always"
    set status enable
  next
  edit 101
    set name "allow-qatech360-admin"
    set srcintf "lan"
    set dstintf "wan"
    set srcaddr "all"
    set dstaddr "qatech360-server"
    set service "qatech360-api"
    set action accept
    set logtraffic all
    set comments "Acceso API gesti\u00f3n qatech360 (solo admin)"
    set schedule "always"
    set status enable
  next
end`,
      },
    ],
    notes: [
      "Reemplaza 10.0.1.100 con la IP real de tu servidor qatech360.",
      'Aseg\u00farate de que la pol\u00edtica est\u00e9 posicionada antes de cualquier regla "deny all".',
      "Para ambientes HA, aplica la configuraci\u00f3n en el nodo primario; se sincronizar\u00e1 autom\u00e1ticamente.",
    ],
  },
  {
    id: "cisco",
    brand: "Cisco ASA / Firepower",
    subtitle: "ASA 9.x / Firepower Threat Defense",
    icon: () => (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="#049FD9" fillOpacity="0.15" />
        <path d="M6 16c2-4 4-6 6-6s4 2 4 6-2 6-4 6-4-2-6-6z" fill="#049FD9" fillOpacity="0.6" />
        <path d="M16 16c2-4 4-6 6-6s4 2 4 6-2 6-4 6-4-2-6-6z" fill="#049FD9" />
      </svg>
    ),
    color: "#049FD9",
    sections: [
      {
        title: "1. Definir objetos de red y servicio",
        description: "Crea los grupos de objetos para el servidor qatech360 y los puertos requeridos.",
        codeTitle: "cisco-asa-cli",
        language: "cisco-ios",
        code: `! Objetos de red
object-group network qatech360-servers
  description Servidores qatech360
  network-object host 10.0.1.100

object network qatech360-cloud
  fqdn cloud.qatech360.com

! Objetos de servicio
object-group service qatech360-services tcp
  description Servicios del agente qatech360
  port-object eq 1514
  port-object eq 1515
  port-object eq 443

object-group service qatech360-admin tcp
  description API de gesti\u00f3n qatech360
  port-object eq 55000`,
      },
      {
        title: "2. Crear ACL (Access Control List)",
        description: "Define las reglas de acceso que permiten el tr\u00e1fico del agente qatech360.",
        codeTitle: "cisco-asa-cli",
        language: "cisco-ios",
        code: `! Permitir tr\u00e1fico del agente
access-list inside_out extended permit tcp \\
  any \\
  object-group qatech360-servers \\
  object-group qatech360-services \\
  log informational

! Permitir tr\u00e1fico a qatech360 Cloud
access-list inside_out extended permit tcp \\
  any \\
  object qatech360-cloud \\
  eq https \\
  log informational

! Permitir API de gesti\u00f3n (restringir a admin)
access-list inside_out extended permit tcp \\
  host 10.0.0.50 \\
  object-group qatech360-servers \\
  object-group qatech360-admin \\
  log informational`,
      },
      {
        title: "3. Aplicar ACL a la interfaz",
        description: "Asocia la lista de acceso a la interfaz interna.",
        codeTitle: "cisco-asa-cli",
        language: "cisco-ios",
        code: `! Aplicar la ACL a la interfaz inside
access-group inside_out in interface inside

! Verificar la configuraci\u00f3n
show access-list inside_out
show running-config access-list`,
      },
    ],
    notes: [
      "Para Firepower (FTD), usa FlexConfig o la interfaz FMC para las mismas reglas.",
      "Si usas NAT, aseg\u00farate de que las reglas de NAT no interfieran con el tr\u00e1fico.",
      "Reemplaza 10.0.0.50 con la IP de tu estaci\u00f3n de administraci\u00f3n.",
    ],
  },
  {
    id: "huawei",
    brand: "Huawei USG",
    subtitle: "USG6000 / USG9500 Series",
    icon: () => (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="#CF0A2C" fillOpacity="0.15" />
        <path d="M16 6c-4 3-8 7-8 12 0 3 2 5 4 6 1-2 2-4 4-4s3 2 4 4c2-1 4-3 4-6 0-5-4-9-8-12z" fill="#CF0A2C" fillOpacity="0.8" />
      </svg>
    ),
    color: "#CF0A2C",
    sections: [
      {
        title: "1. Crear conjunto de direcciones IP",
        description: "Define la direcci\u00f3n del servidor qatech360 en la configuraci\u00f3n del USG.",
        codeTitle: "huawei-usg-cli",
        language: "huawei",
        code: `system-view

ip address-set qatech360-server type object
  address 0 10.0.1.100 mask 32
  description "Servidor motor qatech360"
quit

ip address-set qatech360-cloud type object
  address 0 range 203.0.113.10 203.0.113.20
  description "Rango IP qatech360 Cloud"
quit`,
      },
      {
        title: "2. Crear objetos de servicio",
        description: "Define los servicios personalizados para los puertos del agente qatech360.",
        codeTitle: "huawei-usg-cli",
        language: "huawei",
        code: `ip service-set qatech360-agent type object
  service 0 protocol tcp destination-port 1514
  description "Puerto comunicaci\u00f3n agente"
quit

ip service-set qatech360-enroll type object
  service 0 protocol tcp destination-port 1515
  description "Puerto registro de agentes"
quit

ip service-set qatech360-api type object
  service 0 protocol tcp destination-port 55000
  description "Puerto API de gesti\u00f3n"
quit`,
      },
      {
        title: "3. Configurar pol\u00edtica de seguridad",
        description: "Crea las reglas de seguridad entre zonas para permitir el tr\u00e1fico.",
        codeTitle: "huawei-usg-cli",
        language: "huawei",
        code: `security-policy
  rule name allow-qatech360-agent
    description "Permitir comunicaci\u00f3n agente qatech360"
    source-zone trust
    destination-zone untrust
    destination-address address-set qatech360-server
    destination-address address-set qatech360-cloud
    service qatech360-agent
    service qatech360-enroll
    service https
    action permit
  quit

  rule name allow-qatech360-admin
    description "Permitir API gesti\u00f3n qatech360"
    source-zone trust
    destination-zone untrust
    source-address 10.0.0.50 mask 255.255.255.255
    destination-address address-set qatech360-server
    service qatech360-api
    action permit
  quit
quit`,
      },
    ],
    notes: [
      "Verifica las zonas de seguridad (trust/untrust) con: display zone",
      "Para alta disponibilidad VRRP, aplica en ambos nodos.",
      "Los cambios requieren commit confirm en versiones recientes de VRP.",
    ],
  },
  {
    id: "paloalto",
    brand: "Palo Alto Networks",
    subtitle: "PAN-OS 10.x / 11.x",
    icon: () => (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="#FA582D" fillOpacity="0.15" />
        <path d="M8 8h6v6H8V8z" fill="#FA582D" />
        <path d="M18 8h6v6h-6V8z" fill="#FA582D" fillOpacity="0.7" />
        <path d="M8 18h6v6H8v-6z" fill="#FA582D" fillOpacity="0.7" />
        <path d="M18 18h6v6h-6v-6z" fill="#FA582D" fillOpacity="0.4" />
      </svg>
    ),
    color: "#FA582D",
    sections: [
      {
        title: "1. Crear objetos de direcci\u00f3n",
        description: "Define los objetos de direcci\u00f3n para el servidor y cloud de qatech360.",
        codeTitle: "panos-cli",
        language: "panos",
        code: `set address qatech360-server ip-netmask 10.0.1.100/32
set address qatech360-server description "Servidor qatech360"

set address qatech360-cloud fqdn cloud.qatech360.com
set address qatech360-cloud description "qatech360 Cloud API"

set address-group qatech360-destinations static \\
  [ qatech360-server qatech360-cloud ]`,
      },
      {
        title: "2. Crear objetos de servicio",
        description: "Define los servicios personalizados con los puertos requeridos.",
        codeTitle: "panos-cli",
        language: "panos",
        code: `set service qatech360-agent protocol tcp port 1514
set service qatech360-agent description "Agente qatech360"

set service qatech360-enroll protocol tcp port 1515
set service qatech360-enroll description "Enrollment qatech360"

set service qatech360-api protocol tcp port 55000
set service qatech360-api description "API qatech360"

set service-group qatech360-services members \\
  [ qatech360-agent qatech360-enroll service-https ]`,
      },
      {
        title: "3. Crear pol\u00edtica de seguridad",
        description: "Define la pol\u00edtica que permite el tr\u00e1fico desde la zona trust hacia los servidores qatech360.",
        codeTitle: "panos-cli",
        language: "panos",
        code: `set rulebase security rules allow-qatech360 \\
  from trust \\
  to untrust \\
  source any \\
  destination qatech360-destinations \\
  service qatech360-services \\
  application any \\
  action allow \\
  log-start yes \\
  log-end yes \\
  log-setting default \\
  description "Permitir tr\u00e1fico agente qatech360"

! Aplicar cambios
commit`,
      },
    ],
    notes: [
      "Usa Panorama para desplegar la pol\u00edtica en m\u00faltiples firewalls simult\u00e1neamente.",
      "Para App-ID, crea una Custom Application si deseas un control m\u00e1s granular.",
      "Recuerda hacer commit despu\u00e9s de cada cambio de configuraci\u00f3n.",
    ],
  },
  {
    id: "pfsense",
    brand: "pfSense / OPNsense",
    subtitle: "pfSense CE 2.7+ / OPNsense 24.x",
    icon: () => (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="#212121" fillOpacity="0.3" />
        <circle cx="16" cy="16" r="8" stroke="#A0A0A0" strokeWidth="2" fill="none" />
        <path d="M16 8v16" stroke="#A0A0A0" strokeWidth="1.5" />
        <path d="M8 16h16" stroke="#A0A0A0" strokeWidth="1.5" />
        <circle cx="16" cy="16" r="3" fill="#A0A0A0" fillOpacity="0.3" />
      </svg>
    ),
    color: "#333333",
    sections: [
      {
        title: "1. Crear Alias (Objetos de Red)",
        description: "Desde la interfaz web: Firewall > Aliases. O desde la consola shell:",
        codeTitle: "pfsense-shell",
        language: "shell",
        code: `# En pfSense, los alias se crean desde la GUI:
# Firewall > Aliases > IP > Add
#
# Nombre: qatech360_server
# Tipo: Host(s)
# IP: 10.0.1.100
#
# Nombre: qatech360_cloud
# Tipo: Host(s)
# IP/FQDN: cloud.qatech360.com
#
# Nombre: qatech360_ports
# Tipo: Port(s)
# Puertos: 1514, 1515, 443, 55000

# Tambi\u00e9n puedes verificar con pfctl desde consola:
pfctl -t qatech360_server -T show`,
      },
      {
        title: "2. Crear reglas de firewall",
        description: "Desde Firewall > Rules > LAN. O equivalente en pfctl:",
        codeTitle: "pfsense-rules",
        language: "pf.conf",
        code: `# Regla pfctl equivalente (referencia):
# Permitir tr\u00e1fico del agente qatech360
pass out on egress proto tcp \\
  from <lan_network> \\
  to <qatech360_server> \\
  port { 1514, 1515 } \\
  flags S/SA keep state \\
  label "qatech360-agent"

# Permitir HTTPS a qatech360 Cloud
pass out on egress proto tcp \\
  from <lan_network> \\
  to <qatech360_cloud> \\
  port 443 \\
  flags S/SA keep state \\
  label "qatech360-cloud"

# Permitir API de gesti\u00f3n (restringir IP admin)
pass out on egress proto tcp \\
  from 10.0.0.50 \\
  to <qatech360_server> \\
  port 55000 \\
  flags S/SA keep state \\
  label "qatech360-admin"`,
      },
      {
        title: "3. Configurar NAT si es necesario",
        description: "Si el servidor qatech360 est\u00e1 detr\u00e1s de NAT, configura port forwarding.",
        codeTitle: "pfsense-nat",
        language: "pf.conf",
        code: `# NAT Port Forwarding (si el servidor est\u00e1 en la DMZ):
# Firewall > NAT > Port Forward > Add
#
# Interface: WAN
# Protocol: TCP
# Dest. port range: 1514 to 1515
# Redirect target IP: 10.0.1.100
# Redirect target port: 1514
#
# Equivalente pfctl:
rdr on egress proto tcp \\
  from any to (egress) \\
  port { 1514, 1515 } -> 10.0.1.100`,
      },
    ],
    notes: [
      "En OPNsense, la interfaz es similar: Firewall > Rules > [interfaz].",
      "Aseg\u00farate de colocar las reglas ANTES de cualquier regla de bloqueo.",
      "Recuerda aplicar cambios despu\u00e9s de cada modificaci\u00f3n.",
    ],
  },
  {
    id: "mikrotik",
    brand: "MikroTik RouterOS",
    subtitle: "RouterOS 6.x / 7.x",
    icon: () => (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="#293239" fillOpacity="0.3" />
        <circle cx="16" cy="16" r="9" stroke="#0097D1" strokeWidth="2" fill="none" />
        <circle cx="16" cy="16" r="4" fill="#0097D1" fillOpacity="0.4" />
        <circle cx="16" cy="16" r="1.5" fill="#0097D1" />
      </svg>
    ),
    color: "#0097D1",
    sections: [
      {
        title: "1. Crear address list",
        description: "Define la direcci\u00f3n del servidor qatech360 en el address list de MikroTik.",
        codeTitle: "mikrotik-cli",
        language: "routeros",
        code: `/ip firewall address-list
add address=10.0.1.100 list=qatech360-servers \\
  comment="Servidor motor qatech360"
add address=cloud.qatech360.com list=qatech360-servers \\
  comment="qatech360 Cloud"`,
      },
      {
        title: "2. Crear reglas de firewall",
        description: "Agrega las reglas de filtrado que permiten el tr\u00e1fico del agente qatech360.",
        codeTitle: "mikrotik-cli",
        language: "routeros",
        code: `/ip firewall filter

# Permitir comunicaci\u00f3n del agente (puerto 1514)
add chain=forward action=accept protocol=tcp \\
  dst-address-list=qatech360-servers dst-port=1514 \\
  comment="qatech360 - Comunicaci\u00f3n agente" \\
  place-before=0

# Permitir registro de agentes (puerto 1515)
add chain=forward action=accept protocol=tcp \\
  dst-address-list=qatech360-servers dst-port=1515 \\
  comment="qatech360 - Enrollment" \\
  place-before=1

# Permitir HTTPS (actualizaciones y API cloud)
add chain=forward action=accept protocol=tcp \\
  dst-address-list=qatech360-servers dst-port=443 \\
  comment="qatech360 - HTTPS Cloud" \\
  place-before=2

# Permitir API de gesti\u00f3n (solo admin)
add chain=forward action=accept protocol=tcp \\
  src-address=10.0.0.50 \\
  dst-address-list=qatech360-servers dst-port=55000 \\
  comment="qatech360 - API admin" \\
  place-before=3`,
      },
      {
        title: "3. NAT (si aplica)",
        description: "Si necesitas NAT para redirigir tr\u00e1fico al servidor qatech360.",
        codeTitle: "mikrotik-cli",
        language: "routeros",
        code: `/ip firewall nat

# Destination NAT para tr\u00e1fico entrante (si el servidor
# qatech360 est\u00e1 en red interna)
add chain=dstnat action=dst-nat protocol=tcp \\
  dst-port=1514-1515 \\
  to-addresses=10.0.1.100 \\
  comment="NAT qatech360 agent ports"

# Verificar reglas
/ip firewall filter print where comment~"qatech360"
/ip firewall nat print where comment~"qatech360"`,
      },
    ],
    notes: [
      "Usa place-before para asegurar que las reglas est\u00e9n antes de drop/reject.",
      "En RouterOS 7, la sintaxis es compatible pero revisa con /ip/firewall/filter.",
      "Para Winbox, navega a IP > Firewall > Filter Rules.",
    ],
  },
];

// ================================================================
// FAQ DATA
// ================================================================

const faqs = [
  {
    question: "\u00bfQu\u00e9 pasa si mi firewall no est\u00e1 en esta lista?",
    answer:
      "Los puertos y direcciones requeridos son los mismos independientemente del fabricante. Necesitas permitir tr\u00e1fico TCP saliente a los puertos 1514, 1515 y 443 hacia tu servidor qatech360. Cont\u00e1ctanos y te ayudaremos con la configuraci\u00f3n espec\u00edfica de tu equipo.",
  },
  {
    question: "\u00bfEs necesario abrir el puerto 55000?",
    answer:
      "El puerto 55000 es para la API de gesti\u00f3n y solo es necesario si administras el servidor qatech360 desde la red local. Para los endpoints que env\u00edan eventos, solo necesitas los puertos 1514, 1515 y 443. Recomendamos restringir el 55000 a IPs de administradores.",
  },
  {
    question: "\u00bfPuedo usar NAT con el agente qatech360?",
    answer:
      "S\u00ed, el agente qatech360 funciona correctamente detr\u00e1s de NAT. El agente establece conexiones salientes (TCP) hacia el servidor, por lo que solo necesitas permitir el tr\u00e1fico saliente. Si tu servidor qatech360 est\u00e1 detr\u00e1s de NAT, configura port forwarding para los puertos 1514 y 1515.",
  },
  {
    question: "\u00bfNecesito configurar reglas para UDP?",
    answer:
      "No. El agente qatech360 utiliza exclusivamente TCP para toda la comunicaci\u00f3n. No es necesario abrir puertos UDP. Esto simplifica la configuraci\u00f3n del firewall y proporciona comunicaci\u00f3n confiable con confirmaci\u00f3n de entrega.",
  },
  {
    question: "\u00bfC\u00f3mo verifico que la comunicaci\u00f3n est\u00e1 funcionando?",
    answer:
      'Despu\u00e9s de configurar el firewall, puedes verificar la conectividad con telnet (por ejemplo: telnet 10.0.1.100 1514) o curl para HTTPS. Tambi\u00e9n puedes revisar los logs del firewall filtrando por las reglas de qatech360. En la secci\u00f3n "Verificaci\u00f3n" de esta p\u00e1gina encontrar\u00e1s todos los comandos necesarios.',
  },
];

// ================================================================
// MAIN PAGE COMPONENT
// ================================================================

export default function FirewallPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeGuide, setActiveGuide] = useState<string>("fortinet");

  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden">
        {/* ====== HERO SECTION ====== */}
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          {/* Background effects */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full opacity-20"
              style={{ background: "radial-gradient(ellipse at center, rgba(0,112,243,0.3) 0%, transparent 70%)" }} />
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <motion.div
            className="relative max-w-5xl mx-auto text-center"
            variants={heroContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={heroCtas} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0070F3]/30 bg-[#0070F3]/10 text-sm text-[#0070F3] mb-6">
              <ShieldFirewallIcon size={18} />
              <span>Gu\u00eda de Instalaci\u00f3n</span>
            </motion.div>

            <motion.h1
              variants={heroTitle}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Configuraci\u00f3n de{" "}
              <span className="bg-clip-text text-transparent" style={{
                backgroundImage: "linear-gradient(90deg, #FFFFFF 0%, #00D4FF 50%, #0070F3 100%)",
              }}>
                Firewall
              </span>
            </motion.h1>

            <motion.p
              variants={heroSubtitle}
              className="text-lg sm:text-xl text-[#A0A0A0] max-w-3xl mx-auto mb-8 leading-relaxed"
            >
              Gu\u00edas paso a paso para habilitar la comunicaci\u00f3n del agente qatech360
              en tu infraestructura de red. Compatible con los principales fabricantes.
            </motion.p>

            <motion.div variants={heroCtas} className="flex flex-wrap justify-center gap-3">
              <Link href="/install/endpoint" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0070F3] hover:bg-[#0050D0] text-white font-semibold transition-all duration-200 shadow-[0_0_20px_rgba(0,112,243,0.4)] hover:shadow-[0_0_35px_rgba(0,112,243,0.6)]">
                <TerminalIcon size={18} />
                Instalar Agente
              </Link>
              <a href="#puertos" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#2A2A2A] hover:border-[#0070F3]/40 text-[#A0A0A0] hover:text-white font-semibold transition-all duration-200">
                Ver Puertos Requeridos
                <ArrowRightIcon size={16} />
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* ====== PORTS TABLE ====== */}
        <section id="puertos" className="relative py-20 px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-5xl mx-auto"
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00D4FF]/10 text-[#00D4FF] text-sm font-medium mb-4">
                <PortIcon size={16} />
                Puertos Requeridos
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Puertos y Protocolos</h2>
              <p className="text-[#A0A0A0] max-w-2xl mx-auto">
                Estos son los puertos que debes habilitar en tu firewall para que el agente qatech360
                se comunique correctamente con el servidor.
              </p>
            </div>

            <motion.div
              className="rounded-xl border border-[#2A2A2A] overflow-hidden bg-[#111111]"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {/* Table header */}
              <div className="grid grid-cols-12 gap-2 px-4 sm:px-6 py-4 bg-[#0A0A0A] border-b border-[#2A2A2A] text-xs sm:text-sm font-semibold text-[#A0A0A0] uppercase tracking-wider">
                <div className="col-span-2">Puerto</div>
                <div className="col-span-2">Protocolo</div>
                <div className="col-span-3">Direcci\u00f3n</div>
                <div className="col-span-4">Descripci\u00f3n</div>
                <div className="col-span-1 text-center">Req.</div>
              </div>
              {/* Table rows */}
              {ports.map((port, i) => (
                <motion.div
                  key={port.port}
                  variants={staggerItem}
                  className={`grid grid-cols-12 gap-2 px-4 sm:px-6 py-4 items-center ${
                    i < ports.length - 1 ? "border-b border-[#2A2A2A]/60" : ""
                  } hover:bg-[#1A1A1A]/50 transition-colors`}
                >
                  <div className="col-span-2">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#0070F3]/10 text-[#0070F3] font-mono font-bold text-sm">
                      {port.port}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-sm text-[#00D4FF] font-mono">{port.protocol}</span>
                  </div>
                  <div className="col-span-3 text-sm text-[#A0A0A0]">{port.direction}</div>
                  <div className="col-span-4 text-sm text-[#E0E0E0]">{port.description}</div>
                  <div className="col-span-1 flex justify-center">
                    {port.required ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#00FF88]/10 text-[#00FF88] border border-[#00FF88]/20">
                        S\u00ed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#FFB800]/10 text-[#FFB800] border border-[#FFB800]/20">
                        Opc.
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Info box */}
            <motion.div
              className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A]"
              variants={slideUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <AlertIcon size={20} />
              <p className="text-sm text-[#A0A0A0] leading-relaxed">
                <strong className="text-[#FFB800]">Importante:</strong> El puerto 55000 solo es necesario para
                administraci\u00f3n. Recomendamos restringir el acceso a este puerto \u00fanicamente a las IPs
                de los administradores del sistema. Los endpoints solo requieren puertos 1514, 1515 y 443.
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* ====== NETWORK DIAGRAM ====== */}
        <section className="relative py-16 px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-5xl mx-auto"
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">Diagrama de Red</h2>
              <p className="text-[#A0A0A0]">Flujo de tr\u00e1fico entre tus endpoints y el motor qatech360</p>
            </div>

            <motion.div
              className="rounded-xl border border-[#2A2A2A] bg-[#111111] p-6 sm:p-8 overflow-x-auto"
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <svg viewBox="0 0 900 320" className="w-full min-w-[600px] h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Background grid */}
                <defs>
                  <pattern id="netGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#2A2A2A" strokeWidth="0.5" opacity="0.4" />
                  </pattern>
                  <linearGradient id="arrowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0070F3" />
                    <stop offset="100%" stopColor="#00D4FF" />
                  </linearGradient>
                  <linearGradient id="arrowGradGreen" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00FF88" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#00FF88" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <rect width="900" height="320" fill="#0A0A0A" rx="8" />
                <rect width="900" height="320" fill="url(#netGrid)" rx="8" />

                {/* === Corporate LAN === */}
                <rect x="30" y="40" width="200" height="240" rx="12" fill="#111111" stroke="#2A2A2A" strokeWidth="1.5" />
                <text x="130" y="70" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="600">Red Corporativa</text>
                <text x="130" y="88" textAnchor="middle" fill="#A0A0A0" fontSize="10">LAN / VLAN</text>

                {/* Endpoints */}
                <rect x="55" y="105" width="60" height="45" rx="6" fill="#1A1A1A" stroke="#2A2A2A" />
                <text x="85" y="123" textAnchor="middle" fill="#A0A0A0" fontSize="8">Windows</text>
                <text x="85" y="140" textAnchor="middle" fill="#0070F3" fontSize="8" fontWeight="600">Agente</text>

                <rect x="130" y="105" width="60" height="45" rx="6" fill="#1A1A1A" stroke="#2A2A2A" />
                <text x="160" y="123" textAnchor="middle" fill="#A0A0A0" fontSize="8">Linux</text>
                <text x="160" y="140" textAnchor="middle" fill="#0070F3" fontSize="8" fontWeight="600">Agente</text>

                <rect x="55" y="165" width="60" height="45" rx="6" fill="#1A1A1A" stroke="#2A2A2A" />
                <text x="85" y="183" textAnchor="middle" fill="#A0A0A0" fontSize="8">macOS</text>
                <text x="85" y="200" textAnchor="middle" fill="#0070F3" fontSize="8" fontWeight="600">Agente</text>

                <rect x="130" y="165" width="60" height="45" rx="6" fill="#1A1A1A" stroke="#2A2A2A" />
                <text x="160" y="183" textAnchor="middle" fill="#A0A0A0" fontSize="8">Servidor</text>
                <text x="160" y="200" textAnchor="middle" fill="#0070F3" fontSize="8" fontWeight="600">Agente</text>

                {/* Admin workstation */}
                <rect x="80" y="225" width="80" height="35" rx="6" fill="#1A1A1A" stroke="#FFB800" strokeWidth="1" strokeDasharray="3 3" />
                <text x="120" y="246" textAnchor="middle" fill="#FFB800" fontSize="8" fontWeight="500">Admin (API)</text>

                {/* === Firewall === */}
                <rect x="310" y="80" width="120" height="160" rx="12" fill="#111111" stroke="#0070F3" strokeWidth="2" />
                <rect x="310" y="80" width="120" height="160" rx="12" fill="#0070F3" fillOpacity="0.05" />
                <text x="370" y="130" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="700">FIREWALL</text>

                {/* Firewall icon */}
                <rect x="350" y="145" width="40" height="30" rx="4" fill="none" stroke="#0070F3" strokeWidth="1.5" />
                <line x1="350" y1="155" x2="390" y2="155" stroke="#0070F3" strokeWidth="1" opacity="0.5" />
                <line x1="350" y1="165" x2="390" y2="165" stroke="#0070F3" strokeWidth="1" opacity="0.5" />
                <circle cx="360" cy="160" r="2" fill="#00FF88" />
                <circle cx="370" cy="160" r="2" fill="#00FF88" />
                <circle cx="380" cy="160" r="2" fill="#FFB800" />

                <text x="370" y="200" textAnchor="middle" fill="#A0A0A0" fontSize="9">Reglas de Acceso</text>
                <text x="370" y="215" textAnchor="middle" fill="#0070F3" fontSize="8">Puertos: 1514, 1515</text>
                <text x="370" y="228" textAnchor="middle" fill="#0070F3" fontSize="8">443, 55000</text>

                {/* === Internet === */}
                <ellipse cx="545" cy="160" rx="55" ry="55" fill="#1A1A1A" stroke="#2A2A2A" strokeWidth="1.5" />
                <text x="545" y="155" textAnchor="middle" fill="#A0A0A0" fontSize="13" fontWeight="500">Internet</text>
                <text x="545" y="172" textAnchor="middle" fill="#666666" fontSize="9">WAN</text>

                {/* === qatech360 Cloud === */}
                <rect x="660" y="40" width="210" height="240" rx="12" fill="#111111" stroke="#00D4FF" strokeWidth="1.5" />
                <rect x="660" y="40" width="210" height="240" rx="12" fill="#00D4FF" fillOpacity="0.03" />
                <text x="765" y="70" textAnchor="middle" fill="#00D4FF" fontSize="13" fontWeight="600">qatech360 Cloud</text>
                <text x="765" y="88" textAnchor="middle" fill="#A0A0A0" fontSize="10">Infraestructura Segura</text>

                {/* Server boxes */}
                <rect x="685" y="105" width="160" height="40" rx="6" fill="#1A1A1A" stroke="#0070F3" strokeWidth="1" />
                <text x="765" y="121" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="500">Motor de Detecci\u00f3n</text>
                <text x="765" y="137" textAnchor="middle" fill="#0070F3" fontSize="8">Puertos 1514 / 1515</text>

                <rect x="685" y="155" width="160" height="40" rx="6" fill="#1A1A1A" stroke="#00D4FF" strokeWidth="1" />
                <text x="765" y="171" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="500">API Cloud</text>
                <text x="765" y="187" textAnchor="middle" fill="#00D4FF" fontSize="8">Puerto 443 (HTTPS)</text>

                <rect x="685" y="205" width="160" height="40" rx="6" fill="#1A1A1A" stroke="#00FF88" strokeWidth="1" />
                <text x="765" y="221" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="500">API de Gesti\u00f3n</text>
                <text x="765" y="237" textAnchor="middle" fill="#00FF88" fontSize="8">Puerto 55000 (HTTPS)</text>

                {/* Status badge */}
                <rect x="715" y="255" width="100" height="20" rx="10" fill="#00FF88" fillOpacity="0.1" stroke="#00FF88" strokeWidth="0.5" />
                <circle cx="735" cy="265" r="3" fill="#00FF88" />
                <text x="770" y="269" textAnchor="middle" fill="#00FF88" fontSize="8" fontWeight="500">Operativo 24/7</text>

                {/* === Arrows === */}
                {/* LAN to Firewall */}
                <line x1="230" y1="140" x2="305" y2="140" stroke="url(#arrowGrad)" strokeWidth="2" filter="url(#glow)" />
                <polygon points="305,135 315,140 305,145" fill="#0070F3" />
                <text x="267" y="133" textAnchor="middle" fill="#0070F3" fontSize="8">TCP</text>

                {/* Admin to Firewall */}
                <path d="M 160 240 L 240 240 Q 270 240 270 210 L 270 175 Q 270 160 290 160 L 310 160" stroke="#FFB800" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
                <polygon points="305,155 315,160 305,165" fill="#FFB800" />
                <text x="280" y="198" textAnchor="middle" fill="#FFB800" fontSize="7">55000</text>

                {/* Firewall to Internet */}
                <line x1="430" y1="160" x2="487" y2="160" stroke="url(#arrowGrad)" strokeWidth="2" />
                <polygon points="485,155 495,160 485,165" fill="#00D4FF" />

                {/* Internet to qatech360 */}
                <line x1="600" y1="160" x2="655" y2="160" stroke="url(#arrowGrad)" strokeWidth="2" />
                <polygon points="653,155 663,160 653,165" fill="#00D4FF" />

                {/* Port labels on arrows */}
                <rect x="440" y="115" width="50" height="18" rx="4" fill="#0070F3" fillOpacity="0.15" />
                <text x="465" y="128" textAnchor="middle" fill="#0070F3" fontSize="8" fontWeight="500">1514</text>

                <rect x="440" y="135" width="50" height="18" rx="4" fill="#0070F3" fillOpacity="0.15" />
                <text x="465" y="148" textAnchor="middle" fill="#0070F3" fontSize="8" fontWeight="500">1515</text>

                <rect x="440" y="175" width="50" height="18" rx="4" fill="#00D4FF" fillOpacity="0.15" />
                <text x="465" y="188" textAnchor="middle" fill="#00D4FF" fontSize="8" fontWeight="500">443</text>

                {/* Legend */}
                <rect x="30" y="295" width="840" height="1" fill="#2A2A2A" />
                <line x1="50" y1="310" x2="80" y2="310" stroke="#0070F3" strokeWidth="2" />
                <text x="90" y="314" fill="#A0A0A0" fontSize="9">Tr\u00e1fico Agente (TCP)</text>
                <line x1="230" y1="310" x2="260" y2="310" stroke="#FFB800" strokeWidth="1.5" strokeDasharray="4 3" />
                <text x="270" y="314" fill="#A0A0A0" fontSize="9">Tr\u00e1fico Admin (HTTPS)</text>
                <circle cx="430" cy="310" r="4" fill="#00FF88" />
                <text x="445" y="314" fill="#A0A0A0" fontSize="9">Conexi\u00f3n Activa</text>
                <circle cx="580" cy="310" r="4" fill="#FFB800" />
                <text x="595" y="314" fill="#A0A0A0" fontSize="9">Opcional</text>
              </svg>
            </motion.div>
          </motion.div>
        </section>

        {/* ====== FIREWALL GUIDES ====== */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full opacity-10"
              style={{ background: "radial-gradient(ellipse at center, rgba(0,212,255,0.3) 0%, transparent 70%)" }} />
          </div>

          <motion.div
            className="relative max-w-5xl mx-auto"
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00FF88]/10 text-[#00FF88] text-sm font-medium mb-4">
                <NetworkIcon size={16} />
                Gu\u00edas por Fabricante
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Configuraci\u00f3n por Marca de Firewall
              </h2>
              <p className="text-[#A0A0A0] max-w-2xl mx-auto">
                Selecciona tu fabricante de firewall para ver las instrucciones espec\u00edficas
                de configuraci\u00f3n con comandos CLI listos para copiar y pegar.
              </p>
            </div>

            {/* Brand tabs */}
            <motion.div
              className="flex flex-wrap justify-center gap-2 mb-10"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {firewallGuides.map((guide) => (
                <motion.button
                  key={guide.id}
                  variants={staggerItem}
                  onClick={() => setActiveGuide(guide.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 border ${
                    activeGuide === guide.id
                      ? "bg-[#0070F3]/15 border-[#0070F3]/50 text-white shadow-[0_0_16px_rgba(0,112,243,0.2)]"
                      : "bg-[#111111] border-[#2A2A2A] text-[#A0A0A0] hover:border-[#0070F3]/30 hover:text-white"
                  }`}
                >
                  {guide.icon()}
                  <span className="hidden sm:inline">{guide.brand}</span>
                  <span className="sm:hidden">{guide.brand.split(" ")[0]}</span>
                </motion.button>
              ))}
            </motion.div>

            {/* Active guide content */}
            {firewallGuides
              .filter((g) => g.id === activeGuide)
              .map((guide) => (
                <motion.div
                  key={guide.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                >
                  {/* Guide header */}
                  <div className="flex items-center gap-4 mb-8 p-5 rounded-xl bg-[#111111] border border-[#2A2A2A]">
                    <div className="flex-shrink-0">{guide.icon()}</div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{guide.brand}</h3>
                      <p className="text-sm text-[#A0A0A0]">{guide.subtitle}</p>
                    </div>
                  </div>

                  {/* Guide steps */}
                  <div className="space-y-8">
                    {guide.sections.map((section, i) => (
                      <motion.div
                        key={i}
                        className="relative"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: i * 0.1 }}
                      >
                        {/* Step connector */}
                        {i < guide.sections.length - 1 && (
                          <div className="absolute left-[18px] top-[44px] bottom-[-32px] w-[2px] bg-gradient-to-b from-[#0070F3]/40 to-transparent hidden sm:block" />
                        )}

                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#0070F3]/15 border border-[#0070F3]/30 flex items-center justify-center text-sm font-bold text-[#0070F3] mt-0.5">
                            {i + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-lg font-semibold text-white mb-2">{section.title}</h4>
                            <p className="text-sm text-[#A0A0A0] mb-4 leading-relaxed">{section.description}</p>
                            <CodeBlock
                              code={section.code}
                              title={section.codeTitle}
                              language={section.language}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Notes */}
                  {guide.notes && guide.notes.length > 0 && (
                    <div className="mt-8 p-5 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A]">
                      <h4 className="text-sm font-semibold text-[#FFB800] mb-3 flex items-center gap-2">
                        <AlertIcon size={16} />
                        Notas Importantes
                      </h4>
                      <ul className="space-y-2">
                        {guide.notes.map((note, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-[#A0A0A0]">
                            <span className="text-[#FFB800] mt-0.5 flex-shrink-0">&bull;</span>
                            {note}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              ))}
          </motion.div>
        </section>

        {/* ====== VERIFICATION SECTION ====== */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#111111]/50">
          <motion.div
            className="max-w-5xl mx-auto"
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00FF88]/10 text-[#00FF88] text-sm font-medium mb-4">
                <CheckIcon size={16} />
                Verificaci\u00f3n
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Verificar Conectividad</h2>
              <p className="text-[#A0A0A0] max-w-2xl mx-auto">
                Despu\u00e9s de configurar tu firewall, ejecuta estos comandos para confirmar
                que la comunicaci\u00f3n con qatech360 funciona correctamente.
              </p>
            </div>

            <motion.div
              className="grid gap-6 sm:grid-cols-2"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {/* Test 1: Telnet */}
              <motion.div variants={staggerItem} className="rounded-xl bg-[#111111] border border-[#2A2A2A] p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#0070F3]" />
                  <h4 className="text-sm font-semibold text-white">Probar puerto del agente (1514)</h4>
                </div>
                <CodeBlock
                  code={`# Desde un endpoint en la red local:
telnet 10.0.1.100 1514

# Resultado esperado:
# Connected to 10.0.1.100.
# Escape character is '^]'.

# Si falla, el firewall est\u00e1 bloqueando el puerto.`}
                  title="test-agent-port"
                  language="bash"
                />
              </motion.div>

              {/* Test 2: Enrollment */}
              <motion.div variants={staggerItem} className="rounded-xl bg-[#111111] border border-[#2A2A2A] p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#0070F3]" />
                  <h4 className="text-sm font-semibold text-white">Probar puerto de registro (1515)</h4>
                </div>
                <CodeBlock
                  code={`# Verificar que el puerto de enrollment responde:
telnet 10.0.1.100 1515

# Alternativa con netcat:
nc -zv 10.0.1.100 1515

# Resultado esperado:
# Connection to 10.0.1.100 1515 port [tcp/*] succeeded!`}
                  title="test-enroll-port"
                  language="bash"
                />
              </motion.div>

              {/* Test 3: HTTPS API */}
              <motion.div variants={staggerItem} className="rounded-xl bg-[#111111] border border-[#2A2A2A] p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#00D4FF]" />
                  <h4 className="text-sm font-semibold text-white">Probar API de gesti\u00f3n (55000)</h4>
                </div>
                <CodeBlock
                  code={`# Verificar la API de gesti\u00f3n:
curl -vk https://10.0.1.100:55000/

# Resultado esperado (HTTP 200 o 401):
# < HTTP/1.1 200 OK
# {
#   "data": {
#     "title": "qatech360 API",
#     "api_version": "4.x.x"
#   }
# }`}
                  title="test-api"
                  language="bash"
                />
              </motion.div>

              {/* Test 4: Cloud */}
              <motion.div variants={staggerItem} className="rounded-xl bg-[#111111] border border-[#2A2A2A] p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#00D4FF]" />
                  <h4 className="text-sm font-semibold text-white">Probar conectividad al Cloud</h4>
                </div>
                <CodeBlock
                  code={`# Verificar HTTPS al cloud de qatech360:
curl -vI https://cloud.qatech360.com

# Verificar resoluci\u00f3n DNS:
nslookup cloud.qatech360.com

# Resultado esperado:
# HTTP/2 200
# server: qatech360-edge`}
                  title="test-cloud"
                  language="bash"
                />
              </motion.div>
            </motion.div>

            {/* Troubleshooting */}
            <motion.div
              className="mt-10"
              variants={slideUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <h3 className="text-xl font-bold mb-6">Soluci\u00f3n de Problemas Comunes</h3>
              <div className="space-y-4">
                {[
                  {
                    issue: "Connection timed out",
                    cause: "El firewall est\u00e1 bloqueando el tr\u00e1fico o la IP del servidor es incorrecta.",
                    fix: "Verifica que las reglas del firewall est\u00e9n activas y en el orden correcto. Confirma la IP del servidor qatech360 con tu equipo.",
                  },
                  {
                    issue: "Connection refused",
                    cause: "El servicio qatech360 no est\u00e1 ejecut\u00e1ndose en el puerto indicado.",
                    fix: "El firewall permite el tr\u00e1fico, pero el servicio no est\u00e1 activo. Contacta al equipo de soporte qatech360.",
                  },
                  {
                    issue: "Certificate error (SSL/TLS)",
                    cause: "El certificado del servidor no es reconocido o ha expirado.",
                    fix: "Si usas inspecci\u00f3n SSL en tu firewall (DPI/SSL Decryption), agrega el servidor qatech360 a la lista de exclusi\u00f3n para evitar interferencia con la comunicaci\u00f3n cifrada.",
                  },
                  {
                    issue: "Conexi\u00f3n intermitente",
                    cause: "NAT din\u00e1mico con timeout de sesi\u00f3n bajo o inspecci\u00f3n de paquetes interfiriendo.",
                    fix: "Aumenta el timeout TCP a 3600 segundos para las conexiones qatech360. Desactiva DPI/IPS para el tr\u00e1fico hacia el servidor qatech360.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-[#0A0A0A] border border-[#2A2A2A] p-5 hover:border-[#0070F3]/30 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF3B3B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="15" y1="9" x2="9" y2="15" />
                          <line x1="9" y1="9" x2="15" y2="15" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-white mb-1 font-mono">{item.issue}</h4>
                        <p className="text-xs text-[#A0A0A0] mb-2">
                          <strong className="text-[#FFB800]">Causa:</strong> {item.cause}
                        </p>
                        <p className="text-xs text-[#A0A0A0]">
                          <strong className="text-[#00FF88]">Soluci\u00f3n:</strong> {item.fix}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ====== FAQ SECTION ====== */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto"
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Preguntas Frecuentes</h2>
              <p className="text-[#A0A0A0]">Dudas comunes sobre la configuraci\u00f3n de firewall para qatech360</p>
            </div>

            <motion.div
              className="space-y-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="rounded-xl border border-[#2A2A2A] bg-[#111111] overflow-hidden transition-colors hover:border-[#0070F3]/30"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                    aria-expanded={openFaq === i}
                  >
                    <span className="text-sm sm:text-base font-medium text-white pr-4">{faq.question}</span>
                    <span
                      className={`flex-shrink-0 text-[#A0A0A0] transition-transform duration-200 ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    >
                      <ChevronDownIcon size={18} />
                    </span>
                  </button>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                      className="px-5 pb-4"
                    >
                      <p className="text-sm text-[#A0A0A0] leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ====== CTA SECTION ====== */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-15"
              style={{ background: "radial-gradient(ellipse at center, rgba(0,112,243,0.4) 0%, transparent 70%)" }} />
          </div>

          <motion.div
            className="relative max-w-3xl mx-auto"
            variants={ctaContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <div className="text-center rounded-2xl p-8 sm:p-12 bg-gradient-to-br from-[#111111] to-[#1A1A1A] border border-[#2A2A2A] shadow-[0_0_60px_rgba(0,112,243,0.15)]">
              <motion.div variants={ctaItem}>
                <ShieldFirewallIcon size={56} />
              </motion.div>
              <motion.h2 variants={ctaItem} className="text-2xl sm:text-3xl font-bold mt-4 mb-3">
                \u00bfNecesit\u00e1s ayuda configurando tu firewall?
              </motion.h2>
              <motion.p variants={ctaItem} className="text-[#A0A0A0] mb-8 max-w-lg mx-auto leading-relaxed">
                Nuestro equipo de ingenieros puede guiarte paso a paso en la configuraci\u00f3n de tu
                firewall o realizarla remotamente. Soporte en espa\u00f1ol, en tu zona horaria.
              </motion.p>
              <motion.div variants={ctaItem} className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-[#0070F3] hover:bg-[#0050D0] text-white font-semibold transition-all duration-200 shadow-[0_0_20px_rgba(0,112,243,0.4)] hover:shadow-[0_0_35px_rgba(0,112,243,0.7)]"
                >
                  Contactar Soporte
                  <ArrowRightIcon size={16} />
                </Link>
                <Link
                  href="/install/endpoint"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border border-[#2A2A2A] hover:border-[#0070F3]/40 text-[#A0A0A0] hover:text-white font-semibold transition-all duration-200"
                >
                  <TerminalIcon size={16} />
                  Instalar Agente
                </Link>
              </motion.div>

              {/* Quick links */}
              <motion.div variants={ctaItem} className="mt-8 pt-6 border-t border-[#2A2A2A] flex flex-wrap justify-center gap-6 text-sm">
                <Link href="/docs" className="text-[#A0A0A0] hover:text-[#0070F3] transition-colors flex items-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                  Documentaci\u00f3n
                </Link>
                <Link href="/install/endpoint" className="text-[#A0A0A0] hover:text-[#0070F3] transition-colors flex items-center gap-1">
                  <TerminalIcon size={14} />
                  Gu\u00eda de Instalaci\u00f3n
                </Link>
                <Link href="/demo" className="text-[#A0A0A0] hover:text-[#0070F3] transition-colors flex items-center gap-1">
                  <GlobeIcon size={14} />
                  Solicitar Demo
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
