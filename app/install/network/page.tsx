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
} from "@/lib/animations";

// ================================================================
// INLINE SVG ICONS
// ================================================================

function NetworkIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="8" r="5" stroke="url(#netGrad)" strokeWidth="2" />
      <circle cx="8" cy="36" r="5" stroke="url(#netGrad)" strokeWidth="2" />
      <circle cx="24" cy="36" r="5" stroke="url(#netGrad)" strokeWidth="2" />
      <circle cx="40" cy="36" r="5" stroke="url(#netGrad)" strokeWidth="2" />
      <path d="M24 13v18" stroke="#00D4FF" strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M11 33L21 13" stroke="#00D4FF" strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M37 33L27 13" stroke="#00D4FF" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="24" cy="8" r="2.5" fill="#0070F3" />
      <circle cx="8" cy="36" r="2.5" fill="#00FF88" />
      <circle cx="24" cy="36" r="2.5" fill="#00FF88" />
      <circle cx="40" cy="36" r="2.5" fill="#00FF88" />
      <defs>
        <linearGradient id="netGrad" x1="0" y1="0" x2="48" y2="48">
          <stop stopColor="#0070F3" />
          <stop offset="1" stopColor="#00D4FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function TokenIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="4" y="8" width="32" height="24" rx="4" stroke="#0070F3" strokeWidth="1.5" />
      <path d="M4 16h32" stroke="#2A2A2A" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="2" fill="#00D4FF" />
      <rect x="8" y="22" width="16" height="3" rx="1.5" fill="#0070F3" fillOpacity="0.3" />
      <rect x="8" y="27" width="10" height="2" rx="1" fill="#2A2A2A" />
      <path d="M30 22l2 2 4-4" stroke="#00FF88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldDeployIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M24 4L6 12v12c0 11.1 7.7 21.5 18 24 10.3-2.5 18-12.9 18-24V12L24 4z" stroke="url(#shieldDGrad)" strokeWidth="2" fill="none" />
      <path d="M24 4L6 12v12c0 11.1 7.7 21.5 18 24 10.3-2.5 18-12.9 18-24V12L24 4z" fill="#0070F3" fillOpacity="0.08" />
      <path d="M16 24l5 5 11-11" stroke="#00FF88" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <linearGradient id="shieldDGrad" x1="6" y1="4" x2="42" y2="40">
          <stop stopColor="#0070F3" />
          <stop offset="1" stopColor="#00D4FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function WindowsIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M3 7.5L14 6v9.5H3V7.5z" fill="#0070F3" />
      <path d="M15.5 5.8L29 4v11.5H15.5V5.8z" fill="#0070F3" />
      <path d="M3 17h11v9.5L3 24.5V17z" fill="#00D4FF" />
      <path d="M15.5 17H29v11.5L15.5 26.2V17z" fill="#00D4FF" />
    </svg>
  );
}

function LinuxIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <ellipse cx="16" cy="14" rx="7" ry="9" stroke="#FFB800" strokeWidth="1.5" fill="none" />
      <circle cx="13" cy="12" r="1.2" fill="#FFFFFF" />
      <circle cx="19" cy="12" r="1.2" fill="#FFFFFF" />
      <path d="M13 16c1 1.5 5 1.5 6 0" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />
      <path d="M10 22c-2 1-4 3-3 5 1 1 3 0 5-1" stroke="#FFB800" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M22 22c2 1 4 3 3 5-1 1-3 0-5-1" stroke="#FFB800" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function AppleIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M22 11c-1.5-1.8-4-2-5-2-1.5 0-2.5.8-3.5.8S11 9 9.5 9C7 9 4 11 4 15.5 4 20 7.5 27 10 27c1 0 2-.7 3.5-.7S16 27 17.5 27c2.5 0 5-5 5.5-6.5-3-.8-3.5-5-.5-6.5C23 12.5 22.5 11.5 22 11z" fill="#A0A0A0" />
      <path d="M19 4c-2 .5-4 2.5-3.5 5 2 0 4-2 3.5-5z" fill="#A0A0A0" />
    </svg>
  );
}

function ServerIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="6" y="4" width="28" height="10" rx="2" stroke="#0070F3" strokeWidth="1.5" />
      <rect x="6" y="16" width="28" height="10" rx="2" stroke="#0070F3" strokeWidth="1.5" />
      <rect x="6" y="28" width="28" height="10" rx="2" stroke="#00D4FF" strokeWidth="1.5" />
      <circle cx="11" cy="9" r="1.5" fill="#00FF88" />
      <circle cx="11" cy="21" r="1.5" fill="#00FF88" />
      <circle cx="11" cy="33" r="1.5" fill="#FFB800" />
      <rect x="16" y="8" width="12" height="2" rx="1" fill="#2A2A2A" />
      <rect x="16" y="20" width="12" height="2" rx="1" fill="#2A2A2A" />
      <rect x="16" y="32" width="12" height="2" rx="1" fill="#2A2A2A" />
    </svg>
  );
}

function GPOIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="4" y="6" width="32" height="28" rx="3" stroke="#0070F3" strokeWidth="1.5" />
      <path d="M4 14h32" stroke="#2A2A2A" strokeWidth="1.5" />
      <circle cx="10" cy="10" r="1.5" fill="#FF3B3B" />
      <circle cx="15" cy="10" r="1.5" fill="#FFB800" />
      <circle cx="20" cy="10" r="1.5" fill="#00FF88" />
      <path d="M10 20h8" stroke="#0070F3" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 24h12" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 28h6" stroke="#A0A0A0" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="26" y="18" width="6" height="6" rx="1" stroke="#00FF88" strokeWidth="1" />
      <path d="M28 21l1 1 2-2" stroke="#00FF88" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AnsibleIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="16" stroke="#FFB800" strokeWidth="1.5" />
      <path d="M20 10v20" stroke="#FFB800" strokeWidth="2" />
      <path d="M20 10l8 14H14" stroke="#FFB800" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="20" cy="10" r="2" fill="#FFB800" />
      <circle cx="14" cy="24" r="2" fill="#00D4FF" />
      <circle cx="28" cy="24" r="2" fill="#00D4FF" />
      <circle cx="20" cy="30" r="2" fill="#00FF88" />
    </svg>
  );
}

function MDMIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="10" y="4" width="20" height="32" rx="3" stroke="#A0A0A0" strokeWidth="1.5" />
      <rect x="12" y="8" width="16" height="22" rx="1" fill="#111111" />
      <circle cx="20" cy="34" r="1.5" fill="#A0A0A0" />
      <path d="M16 14l3 3 5-5" stroke="#00FF88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="15" y="22" width="10" height="2" rx="1" fill="#0070F3" fillOpacity="0.4" />
      <rect x="15" y="26" width="6" height="2" rx="1" fill="#00D4FF" fillOpacity="0.3" />
    </svg>
  );
}

function SCCMIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="4" y="8" width="14" height="10" rx="2" stroke="#0070F3" strokeWidth="1.5" />
      <rect x="22" y="8" width="14" height="10" rx="2" stroke="#0070F3" strokeWidth="1.5" />
      <rect x="4" y="22" width="14" height="10" rx="2" stroke="#00D4FF" strokeWidth="1.5" />
      <rect x="22" y="22" width="14" height="10" rx="2" stroke="#00D4FF" strokeWidth="1.5" />
      <path d="M18 13h4" stroke="#00FF88" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 27h4" stroke="#00FF88" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11 18v4" stroke="#00FF88" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M29 18v4" stroke="#00FF88" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="11" cy="13" r="2" fill="#0070F3" fillOpacity="0.4" />
      <circle cx="29" cy="13" r="2" fill="#0070F3" fillOpacity="0.4" />
      <circle cx="11" cy="27" r="2" fill="#00D4FF" fillOpacity="0.4" />
      <circle cx="29" cy="27" r="2" fill="#00D4FF" fillOpacity="0.4" />
    </svg>
  );
}

function FirewallIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="4" y="6" width="32" height="28" rx="3" stroke="#FFB800" strokeWidth="1.5" />
      <path d="M4 14h32" stroke="#2A2A2A" strokeWidth="1" />
      <path d="M4 22h32" stroke="#2A2A2A" strokeWidth="1" />
      <path d="M20 14v20" stroke="#2A2A2A" strokeWidth="1" />
      <circle cx="12" cy="10" r="1.5" fill="#FFB800" />
      <path d="M12 18l2 2 3-3" stroke="#00FF88" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M28 18l-1.5 1.5L28 21" stroke="#FF3B3B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25 18l1.5 1.5L25 21" stroke="#FF3B3B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 26l2 2 3-3" stroke="#00FF88" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M28 26l2 2 3-3" stroke="#00FF88" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
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

function CheckIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#00FF88" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
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

function ClockIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function RefreshIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="23 4 23 10 17 10" />
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
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

// ================================================================
// DATA
// ================================================================

const STEPS = [
  {
    number: "01",
    title: "Genera tu token corporativo",
    description:
      "Desde el portal de qatech360, genera un token de despliegue asociado a tu organización. Podés crear tokens por sede, departamento o proyecto.",
    icon: <TokenIcon size={36} />,
  },
  {
    number: "02",
    title: "Elegí el método de despliegue",
    description:
      "Seleccioná la herramienta que ya usás en tu infraestructura: GPO, SCCM, Ansible, SSH masivo, MDM, o scripts personalizados.",
    icon: <ServerIcon size={36} />,
  },
  {
    number: "03",
    title: "Ejecutá el despliegue remoto",
    description:
      "Lanzá el script o política desde tu consola central. El agente qatech360 se descarga, instala y registra automáticamente en cada endpoint.",
    icon: <NetworkIcon size={36} />,
  },
  {
    number: "04",
    title: "Verificá conexiones en el dashboard",
    description:
      "Monitoreá en tiempo real cuántos agentes se conectaron exitosamente. Identificá fallos y reintentalos con un clic.",
    icon: <ShieldDeployIcon size={36} />,
  },
];

const DEPLOYMENT_METHODS = [
  {
    id: "gpo",
    title: "Active Directory / GPO",
    subtitle: "Windows — Directiva de Grupo",
    description:
      "Desplegá el agente qatech360 en toda tu flota Windows usando una GPO de inicio de equipo. El script descarga el MSI, lo instala silenciosamente con tu token y arranca el servicio.",
    icon: <GPOIcon size={44} />,
    osIcon: <WindowsIcon size={24} />,
    osLabel: "Windows",
    code: `# qatech360-deploy-gpo.ps1
# Ejecutar como GPO de inicio de equipo (Computer Startup Script)

$Token = "qt360_TU_TOKEN_CORPORATIVO"
$Server = "manager.qatech360.com"
$MsiUrl = "https://cdn.qatech360.com/agent/qatech360-agent-latest.msi"
$TempPath = "$env:TEMP\\qatech360-agent.msi"

# Verificar si ya esta instalado
if (Get-Service -Name "qatech360-agent" -ErrorAction SilentlyContinue) {
    Write-Host "Agente qatech360 ya instalado. Saliendo."
    exit 0
}

# Descargar MSI
Write-Host "Descargando agente qatech360..."
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
Invoke-WebRequest -Uri $MsiUrl -OutFile $TempPath -UseBasicParsing

# Instalar silenciosamente
Write-Host "Instalando agente qatech360..."
Start-Process msiexec.exe -ArgumentList @(
    "/i", $TempPath,
    "/qn",
    "QATECH_MANAGER=$Server",
    "QATECH_TOKEN=$Token",
    "QATECH_GROUP=default"
) -Wait -NoNewWindow

# Iniciar servicio
Start-Service -Name "qatech360-agent"
Write-Host "Agente qatech360 instalado y conectado."`,
    lang: "powershell",
  },
  {
    id: "sccm",
    title: "SCCM / Intune",
    subtitle: "Microsoft Endpoint Manager",
    description:
      "Empaquetá el agente qatech360 como aplicación en Microsoft Endpoint Configuration Manager o Intune. Ideal para organizaciones que ya gestionan sus dispositivos con estas herramientas.",
    icon: <SCCMIcon size={44} />,
    osIcon: <WindowsIcon size={24} />,
    osLabel: "Windows MDM",
    code: `<!-- qatech360-app-deployment.xml -->
<!-- Configuración para SCCM / Intune App Deployment -->

<ApplicationDeployment>
  <Application>
    <Name>qatech360 Security Agent</Name>
    <Publisher>qatech360</Publisher>
    <Version>4.9.x</Version>
  </Application>

  <InstallCommand>
    msiexec /i "qatech360-agent.msi" /qn
      QATECH_MANAGER="manager.qatech360.com"
      QATECH_TOKEN="qt360_TU_TOKEN_CORPORATIVO"
      QATECH_GROUP="default"
  </InstallCommand>

  <UninstallCommand>
    msiexec /x "qatech360-agent.msi" /qn
  </UninstallCommand>

  <DetectionRule>
    <Type>Registry</Type>
    <Path>HKLM\\SOFTWARE\\qatech360</Path>
    <ValueName>AgentVersion</ValueName>
    <Operator>GreaterThanOrEqual</Operator>
    <Value>4.9.0</Value>
  </DetectionRule>

  <Requirements>
    <OS>Windows 10/11, Windows Server 2016+</OS>
    <DiskSpace>50MB</DiskSpace>
    <RAM>128MB</RAM>
  </Requirements>
</ApplicationDeployment>`,
    lang: "xml",
  },
  {
    id: "ansible",
    title: "Ansible / SSH",
    subtitle: "Linux — Automatización remota",
    description:
      "Usá un playbook de Ansible para desplegar el agente en cientos de servidores Linux simultáneamente. Compatible con Debian, Ubuntu, RHEL, CentOS y Amazon Linux.",
    icon: <AnsibleIcon size={44} />,
    osIcon: <LinuxIcon size={24} />,
    osLabel: "Linux",
    code: `# qatech360-deploy.yml
# Ansible Playbook — Despliegue masivo de agente qatech360
# Ejecutar: ansible-playbook -i inventory.ini qatech360-deploy.yml

---
- name: Desplegar agente qatech360 en flota Linux
  hosts: all
  become: yes
  vars:
    qatech_token: "qt360_TU_TOKEN_CORPORATIVO"
    qatech_manager: "manager.qatech360.com"
    qatech_group: "default"

  tasks:
    - name: Verificar si el agente ya esta instalado
      stat:
        path: /var/ossec/bin/qatech360-control
      register: agent_check

    - name: Agregar repositorio qatech360 (Debian/Ubuntu)
      when:
        - ansible_os_family == "Debian"
        - not agent_check.stat.exists
      block:
        - apt_key:
            url: https://cdn.qatech360.com/key/GPG-KEY-QATECH360
            state: present
        - apt_repository:
            repo: "deb https://cdn.qatech360.com/apt stable main"
            state: present
        - apt:
            name: qatech360-agent
            state: latest
            update_cache: yes

    - name: Agregar repositorio qatech360 (RHEL/CentOS)
      when:
        - ansible_os_family == "RedHat"
        - not agent_check.stat.exists
      block:
        - yum_repository:
            name: qatech360
            description: qatech360 Agent Repository
            baseurl: https://cdn.qatech360.com/yum/
            gpgcheck: yes
            gpgkey: https://cdn.qatech360.com/key/GPG-KEY-QATECH360
        - yum:
            name: qatech360-agent
            state: latest

    - name: Configurar agente
      template:
        src: qatech360-agent.conf.j2
        dest: /var/ossec/etc/ossec.conf
      notify: restart qatech360

    - name: Registrar agente con token
      command: >
        /var/ossec/bin/agent-auth
        -m {{ qatech_manager }}
        -P {{ qatech_token }}
        -G {{ qatech_group }}
      when: not agent_check.stat.exists

    - name: Habilitar e iniciar servicio
      systemd:
        name: qatech360-agent
        enabled: yes
        state: started

  handlers:
    - name: restart qatech360
      systemd:
        name: qatech360-agent
        state: restarted`,
    lang: "yaml",
  },
  {
    id: "mdm",
    title: "macOS MDM",
    subtitle: "Jamf / Mosyle / Kandji",
    description:
      "Distribuí el paquete .pkg del agente qatech360 a través de tu plataforma MDM de Apple. Pre-configurá el token y servidor en el perfil de configuración.",
    icon: <MDMIcon size={44} />,
    osIcon: <AppleIcon size={24} />,
    osLabel: "macOS",
    code: `<?xml version="1.0" encoding="UTF-8"?>
<!-- Perfil de configuración MDM para qatech360 Agent -->
<!-- Compatible con Jamf Pro, Mosyle, Kandji -->

<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>PayloadType</key>
  <string>Configuration</string>
  <key>PayloadDisplayName</key>
  <string>qatech360 Security Agent</string>
  <key>PayloadIdentifier</key>
  <string>com.qatech360.agent.config</string>
  <key>PayloadVersion</key>
  <integer>1</integer>

  <key>PayloadContent</key>
  <array>
    <dict>
      <key>PayloadType</key>
      <string>com.qatech360.agent</string>

      <!-- Configuracion del agente -->
      <key>QATECH_MANAGER</key>
      <string>manager.qatech360.com</string>
      <key>QATECH_TOKEN</key>
      <string>qt360_TU_TOKEN_CORPORATIVO</string>
      <key>QATECH_GROUP</key>
      <string>default</string>

      <!-- Permisos requeridos (Full Disk Access) -->
      <key>SystemExtensionAllowed</key>
      <true/>
      <key>AllowedTeamIdentifiers</key>
      <array>
        <string>QATECH360ID</string>
      </array>
    </dict>
  </array>
</dict>
</plist>

# Comando de instalacion post-perfil (Jamf Script):
#!/bin/bash
PKG_URL="https://cdn.qatech360.com/agent/qatech360-agent-latest.pkg"
curl -sLo /tmp/qatech360.pkg "$PKG_URL"
installer -pkg /tmp/qatech360.pkg -target /
rm -f /tmp/qatech360.pkg
/Library/qatech360/bin/agent-auth \\
  -m manager.qatech360.com \\
  -P "qt360_TU_TOKEN_CORPORATIVO" \\
  -G "default"
/Library/qatech360/bin/qatech360-control start`,
    lang: "xml",
  },
];

const TOKEN_FEATURES = [
  {
    title: "Tokens por sede o departamento",
    description:
      "Creá tokens independientes para cada oficina, sucursal o equipo. Los agentes se auto-clasifican al registrarse.",
  },
  {
    title: "Expiración configurable",
    description:
      "Establecé una fecha de vencimiento para tokens de despliegue temporales. Ideal para proyectos con plazo fijo.",
  },
  {
    title: "Rotación de tokens",
    description:
      "Rotá tokens sin afectar agentes ya registrados. Solo los nuevos despliegues necesitan el token actualizado.",
  },
  {
    title: "Uso y auditoría",
    description:
      "Visualizá cuántas veces se usó cada token, desde qué IPs, y cuántos agentes se registraron con él.",
  },
];

const NETWORK_REQUIREMENTS = [
  {
    port: "1514",
    protocol: "TCP",
    direction: "Salida",
    purpose: "Comunicación del agente con el motor qatech360",
    firewallExample: "iptables -A OUTPUT -p tcp --dport 1514 -d manager.qatech360.com -j ACCEPT",
    required: true,
  },
  {
    port: "1515",
    protocol: "TCP",
    direction: "Salida",
    purpose: "Registro y enrolamiento de agentes nuevos",
    firewallExample: "iptables -A OUTPUT -p tcp --dport 1515 -d manager.qatech360.com -j ACCEPT",
    required: true,
  },
  {
    port: "443",
    protocol: "HTTPS",
    direction: "Salida",
    purpose: "API, actualizaciones y descarga de paquetes",
    firewallExample: "iptables -A OUTPUT -p tcp --dport 443 -d cdn.qatech360.com -j ACCEPT",
    required: true,
  },
  {
    port: "514",
    protocol: "UDP/TCP",
    direction: "Salida",
    purpose: "Syslog forwarding (opcional, para dispositivos de red)",
    firewallExample: "iptables -A OUTPUT -p udp --dport 514 -d manager.qatech360.com -j ACCEPT",
    required: false,
  },
];

const SUPPORTED_PLATFORMS = [
  { name: "Windows Server", versions: "2016 / 2019 / 2022", icon: <WindowsIcon size={28} />, color: "#0070F3" },
  { name: "Windows Desktop", versions: "10 / 11", icon: <WindowsIcon size={28} />, color: "#0070F3" },
  { name: "Ubuntu", versions: "20.04 / 22.04 / 24.04", icon: <LinuxIcon size={28} />, color: "#FFB800" },
  { name: "RHEL / CentOS", versions: "7 / 8 / 9", icon: <LinuxIcon size={28} />, color: "#FF3B3B" },
  { name: "Debian", versions: "10 / 11 / 12", icon: <LinuxIcon size={28} />, color: "#A0A0A0" },
  { name: "macOS", versions: "12 / 13 / 14 / 15", icon: <AppleIcon size={28} />, color: "#A0A0A0" },
  { name: "Amazon Linux", versions: "2 / 2023", icon: <LinuxIcon size={28} />, color: "#FFB800" },
];

const FAQS = [
  {
    q: "Cuantos endpoints puedo desplegar simultaneamente?",
    a: "No hay limite tecnico. Hemos realizado despliegues de mas de 5,000 agentes en una sola operacion. La velocidad depende de tu infraestructura de red y la herramienta de despliegue. Con Ansible, por ejemplo, podes configurar la cantidad de hosts paralelos con el parametro 'forks'.",
  },
  {
    q: "Que pasa si un endpoint esta apagado durante el despliegue?",
    a: "Depende del metodo. Con GPO, la politica se aplicara la proxima vez que el equipo inicie. Con SCCM/Intune, el dispositivo recibira la tarea cuando vuelva a conectarse. Para Ansible, podes re-ejecutar el playbook: solo se instalara en los endpoints que aun no tengan el agente.",
  },
  {
    q: "Puedo desplegar sin acceso a internet en los endpoints?",
    a: "Si. Podes configurar un repositorio espejo interno (mirror) o copiar el paquete del agente a un servidor de archivos local. Solo necesitas que los endpoints tengan conectividad con tu motor qatech360 (puertos 1514 y 1515).",
  },
  {
    q: "Como actualizo los agentes masivamente despues de instalarlos?",
    a: "El motor qatech360 incluye gestion centralizada de actualizaciones. Desde el dashboard podes lanzar actualizaciones masivas por grupo, por sistema operativo o por sede. Los agentes se actualizan en segundo plano sin interrumpir su proteccion.",
  },
  {
    q: "Los tokens de despliegue son reutilizables?",
    a: "Si. Un token puede usarse para registrar multiples agentes hasta que expire o sea revocado. Recomendamos crear tokens separados por sede o departamento para mejor trazabilidad.",
  },
];

// ================================================================
// SUB-COMPONENTS
// ================================================================

function CodeBlock({ code, lang }: { code: string; lang: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative rounded-lg overflow-hidden border border-[#2A2A2A] bg-[#0A0A0A]">
      <div className="flex items-center justify-between px-4 py-2 bg-[#111111] border-b border-[#2A2A2A]">
        <span className="text-xs font-mono text-[#A0A0A0] uppercase tracking-wider">{lang}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-[#A0A0A0] hover:text-white transition-colors px-2 py-1 rounded hover:bg-[#1A1A1A]"
          aria-label="Copiar codigo"
        >
          <CopyIcon size={14} />
          {copied ? "Copiado!" : "Copiar"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-[#A0A0A0] max-h-[420px] overflow-y-auto scrollbar-thin">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      variants={staggerItem}
      className="border border-[#2A2A2A] rounded-xl overflow-hidden bg-[#111111] hover:border-[#0070F3]/30 transition-colors"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left px-6 py-5 gap-4"
        aria-expanded={open}
      >
        <span className="flex items-center gap-3">
          <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#0070F3]/10 text-[#0070F3] text-xs font-bold flex items-center justify-center">
            {index + 1}
          </span>
          <span className="text-white font-medium text-base">{q}</span>
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 text-[#A0A0A0]"
        >
          <ChevronDownIcon size={20} />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="overflow-hidden"
      >
        <p className="px-6 pb-5 text-[#A0A0A0] leading-relaxed text-sm pl-16">{a}</p>
      </motion.div>
    </motion.div>
  );
}

// ================================================================
// MAIN PAGE
// ================================================================

export default function NetworkDeployPage() {
  const [activeMethod, setActiveMethod] = useState("gpo");

  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden">
        {/* ============== HERO ============== */}
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          {/* Background grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }}
          />
          {/* Glow effects */}
          <div className="absolute top-20 left-1/4 w-[600px] h-[600px] rounded-full bg-[#0070F3] opacity-[0.06] blur-[120px] pointer-events-none" />
          <div className="absolute top-40 right-1/4 w-[400px] h-[400px] rounded-full bg-[#00D4FF] opacity-[0.04] blur-[100px] pointer-events-none" />

          <div className="relative max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0070F3]/10 border border-[#0070F3]/20 text-[#00D4FF] text-sm font-medium mb-6"
            >
              <NetworkIcon size={18} />
              Despliegue corporativo
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            >
              Despliegue Masivo{" "}
              <span className="bg-gradient-to-r from-[#0070F3] via-[#00D4FF] to-[#0070F3] bg-clip-text text-transparent">
                en Red
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg sm:text-xl text-[#A0A0A0] max-w-3xl mx-auto mb-10 leading-relaxed"
            >
              Instalá el agente qatech360 en cientos o miles de endpoints desde una consola central.
              Usá las herramientas que ya tenés — GPO, SCCM, Ansible o MDM — para proteger toda tu infraestructura en minutos.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.div variants={buttonVariants} initial="rest" whileHover="hover" whileTap="tap">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-[#0070F3] hover:bg-[#0050D0] text-white font-semibold transition-colors shadow-[0_0_20px_rgba(0,112,243,0.4)]"
                >
                  Solicitar asistencia de despliegue
                  <ArrowRightIcon size={18} />
                </Link>
              </motion.div>
              <Link
                href="/install/endpoint"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg border border-[#2A2A2A] hover:border-[#0070F3]/40 text-[#A0A0A0] hover:text-white font-medium transition-colors"
              >
                Instalar en un solo endpoint
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ============== HOW IT WORKS ============== */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={sectionReveal}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Como funciona el{" "}
                <span className="text-[#00D4FF]">despliegue masivo</span>
              </h2>
              <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
                Cuatro pasos para proteger toda tu infraestructura desde una consola central.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainerSlow}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.number}
                  variants={staggerItem}
                  className="relative p-6 rounded-xl bg-[#111111] border border-[#2A2A2A] hover:border-[#0070F3]/30 transition-all group"
                >
                  {/* Connector line */}
                  {i < STEPS.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-[#0070F3]/40 to-transparent" />
                  )}
                  <div className="flex items-start gap-4 mb-4">
                    <span className="flex-shrink-0 text-3xl font-bold bg-gradient-to-br from-[#0070F3] to-[#00D4FF] bg-clip-text text-transparent">
                      {step.number}
                    </span>
                    <div className="mt-1 text-[#0070F3] group-hover:text-[#00D4FF] transition-colors">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-[#A0A0A0] text-sm leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ============== DEPLOYMENT METHODS ============== */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A]">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#2A2A2A] to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#2A2A2A] to-transparent" />

          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={sectionReveal}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Metodos de{" "}
                <span className="bg-gradient-to-r from-[#0070F3] to-[#00D4FF] bg-clip-text text-transparent">
                  despliegue
                </span>
              </h2>
              <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
                Usá la herramienta que ya tenés en tu infraestructura. Cada metodo incluye scripts listos para copiar y ejecutar.
              </p>
            </motion.div>

            {/* Method tabs */}
            <motion.div
              variants={slideUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="flex flex-wrap justify-center gap-3 mb-10"
            >
              {DEPLOYMENT_METHODS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setActiveMethod(m.id)}
                  className={`flex items-center gap-2.5 px-5 py-3 rounded-lg border text-sm font-medium transition-all ${
                    activeMethod === m.id
                      ? "bg-[#0070F3]/10 border-[#0070F3]/40 text-white shadow-[0_0_20px_rgba(0,112,243,0.15)]"
                      : "bg-[#111111] border-[#2A2A2A] text-[#A0A0A0] hover:border-[#0070F3]/20 hover:text-white"
                  }`}
                >
                  {m.osIcon}
                  {m.title}
                </button>
              ))}
            </motion.div>

            {/* Active method detail */}
            {DEPLOYMENT_METHODS.filter((m) => m.id === activeMethod).map((method) => (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-5 gap-8"
              >
                {/* Description */}
                <div className="lg:col-span-2 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-[#0070F3]/10 border border-[#0070F3]/20">
                      {method.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{method.title}</h3>
                      <p className="text-sm text-[#A0A0A0]">{method.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-[#A0A0A0] leading-relaxed mb-6">{method.description}</p>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-sm text-[#A0A0A0]">
                      <CheckIcon size={16} />
                      <span>Instalacion silenciosa sin intervencion del usuario</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#A0A0A0]">
                      <CheckIcon size={16} />
                      <span>Token de registro pre-configurado</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#A0A0A0]">
                      <CheckIcon size={16} />
                      <span>Auto-inicio del servicio de proteccion</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#A0A0A0]">
                      <CheckIcon size={16} />
                      <span>Deteccion de instalaciones previas (idempotente)</span>
                    </div>
                  </div>
                </div>

                {/* Code block */}
                <div className="lg:col-span-3">
                  <CodeBlock code={method.code} lang={method.lang} />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ============== TOKEN MANAGEMENT ============== */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={sectionReveal}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Gestion de{" "}
                <span className="text-[#00D4FF]">tokens</span>
                {" "}de despliegue
              </h2>
              <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
                Controlá el acceso a tu plataforma con tokens seguros, auditables y con alcance granular.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Features */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="space-y-6"
              >
                {TOKEN_FEATURES.map((feat, i) => (
                  <motion.div
                    key={i}
                    variants={staggerItem}
                    className="flex items-start gap-4 p-4 rounded-xl bg-[#111111] border border-[#2A2A2A] hover:border-[#0070F3]/20 transition-colors"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#0070F3]/10 flex items-center justify-center text-[#0070F3] font-bold text-sm">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{feat.title}</h3>
                      <p className="text-[#A0A0A0] text-sm leading-relaxed">{feat.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Token UI Mockup */}
              <motion.div
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-br from-[#0070F3]/10 to-[#00D4FF]/5 rounded-2xl blur-xl" />
                <div className="relative rounded-xl border border-[#2A2A2A] bg-[#111111] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
                  {/* Title bar */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-[#0A0A0A] border-b border-[#2A2A2A]">
                    <div className="w-3 h-3 rounded-full bg-[#FF3B3B]" />
                    <div className="w-3 h-3 rounded-full bg-[#FFB800]" />
                    <div className="w-3 h-3 rounded-full bg-[#00FF88]" />
                    <span className="ml-3 text-xs text-[#666666] font-mono">portal.qatech360.com/tokens</span>
                  </div>
                  {/* Content */}
                  <div className="p-5 space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-white">Tokens de despliegue</span>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-[#0070F3]/10 text-[#0070F3] border border-[#0070F3]/20">
                        + Crear token
                      </span>
                    </div>

                    {/* Token rows */}
                    {[
                      { name: "Sede Buenos Aires", token: "qt360_ba_prod_7f3k...x9m2", agents: 342, status: "activo", color: "#00FF88" },
                      { name: "Sede Mexico DF", token: "qt360_mx_prod_a2b8...t4n1", agents: 518, status: "activo", color: "#00FF88" },
                      { name: "Desarrollo (temp)", token: "qt360_dev_temp_p9q1...w3r5", agents: 24, status: "expira en 3d", color: "#FFB800" },
                    ].map((row, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A]"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white font-medium truncate">{row.name}</p>
                          <p className="text-xs text-[#666666] font-mono truncate mt-0.5">{row.token}</p>
                        </div>
                        <div className="flex items-center gap-4 ml-4">
                          <div className="text-right">
                            <p className="text-sm font-semibold text-white">{row.agents}</p>
                            <p className="text-[10px] text-[#666666]">agentes</p>
                          </div>
                          <span
                            className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                            style={{
                              color: row.color,
                              backgroundColor: `${row.color}15`,
                              border: `1px solid ${row.color}30`,
                            }}
                          >
                            {row.status}
                          </span>
                        </div>
                      </div>
                    ))}

                    {/* Summary */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#2A2A2A]">
                      <span className="text-xs text-[#666666]">Total agentes registrados</span>
                      <span className="text-sm font-bold text-[#00D4FF]">884</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============== REAL-TIME MONITORING ============== */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A]">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#2A2A2A] to-transparent" />

          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={sectionReveal}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Monitoreo de despliegue{" "}
                <span className="text-[#00FF88]">en tiempo real</span>
              </h2>
              <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
                Observá el progreso de cada despliegue, identificá errores y reintentá todo desde el dashboard.
              </p>
            </motion.div>

            <motion.div
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-to-br from-[#0070F3]/8 to-[#00FF88]/5 rounded-2xl blur-xl" />
                <div className="relative rounded-xl border border-[#2A2A2A] bg-[#111111] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
                  {/* Title bar */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-[#0A0A0A] border-b border-[#2A2A2A]">
                    <div className="w-3 h-3 rounded-full bg-[#FF3B3B]" />
                    <div className="w-3 h-3 rounded-full bg-[#FFB800]" />
                    <div className="w-3 h-3 rounded-full bg-[#00FF88]" />
                    <span className="ml-3 text-xs text-[#666666] font-mono">portal.qatech360.com/deploy/monitor</span>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-white">Despliegue: Sede Central - Windows</h3>
                        <div className="flex items-center gap-2 mt-1 text-sm text-[#A0A0A0]">
                          <ClockIcon size={14} />
                          <span>Iniciado hace 12 min</span>
                          <span className="text-[#2A2A2A]">|</span>
                          <span className="text-[#00FF88]">En progreso</span>
                        </div>
                      </div>
                      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FFB800]/10 border border-[#FFB800]/20 text-[#FFB800] text-sm font-medium hover:bg-[#FFB800]/20 transition-colors">
                        <RefreshIcon size={14} />
                        Reintentar fallidos
                      </button>
                    </div>

                    {/* Progress bar */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-[#A0A0A0]">Progreso total</span>
                        <span className="text-sm font-semibold text-white">847 / 1,000 endpoints</span>
                      </div>
                      <div className="w-full h-4 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-[#0070F3] to-[#00D4FF]"
                          initial={{ width: "0%" }}
                          whileInView={{ width: "84.7%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                        />
                      </div>
                    </div>

                    {/* Stats grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {[
                        { label: "Exitosos", value: "812", color: "#00FF88", pct: "81.2%" },
                        { label: "En progreso", value: "35", color: "#00D4FF", pct: "3.5%" },
                        { label: "Fallidos", value: "18", color: "#FF3B3B", pct: "1.8%" },
                        { label: "Pendientes", value: "135", color: "#FFB800", pct: "13.5%" },
                      ].map((stat) => (
                        <div key={stat.label} className="p-4 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A]">
                          <p className="text-2xl font-bold" style={{ color: stat.color }}>
                            {stat.value}
                          </p>
                          <p className="text-xs text-[#666666] mt-1">{stat.label}</p>
                          <p className="text-[10px] text-[#A0A0A0] mt-0.5">{stat.pct}</p>
                        </div>
                      ))}
                    </div>

                    {/* Agent status grid */}
                    <div>
                      <p className="text-sm text-[#A0A0A0] mb-3">Estado de agentes (vista resumida)</p>
                      <div className="flex flex-wrap gap-1">
                        {Array.from({ length: 100 }).map((_, i) => {
                          let color = "#00FF88"; // success
                          if (i >= 81 && i < 85) color = "#00D4FF"; // in progress
                          if (i >= 85 && i < 87) color = "#FF3B3B"; // failed
                          if (i >= 87) color = "#2A2A2A"; // pending
                          return (
                            <div
                              key={i}
                              className="w-2 h-2 rounded-[2px]"
                              style={{ backgroundColor: color, opacity: i >= 87 ? 0.4 : 0.8 }}
                            />
                          );
                        })}
                      </div>
                      <div className="flex items-center gap-4 mt-3 text-[10px] text-[#666666]">
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-[2px] bg-[#00FF88] opacity-80" /> Exitoso
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-[2px] bg-[#00D4FF] opacity-80" /> En progreso
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-[2px] bg-[#FF3B3B] opacity-80" /> Fallido
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-[2px] bg-[#2A2A2A] opacity-40" /> Pendiente
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============== NETWORK REQUIREMENTS ============== */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={sectionReveal}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 mb-4">
                <FirewallIcon size={32} />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Requisitos de{" "}
                <span className="text-[#FFB800]">red</span>
              </h2>
              <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
                Configurá tu firewall para permitir la comunicacion entre los agentes y el motor qatech360.
              </p>
            </motion.div>

            <motion.div
              variants={slideUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="overflow-x-auto"
            >
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#2A2A2A]">
                    <th className="px-4 py-4 text-xs font-semibold text-[#A0A0A0] uppercase tracking-wider">Puerto</th>
                    <th className="px-4 py-4 text-xs font-semibold text-[#A0A0A0] uppercase tracking-wider">Protocolo</th>
                    <th className="px-4 py-4 text-xs font-semibold text-[#A0A0A0] uppercase tracking-wider">Direccion</th>
                    <th className="px-4 py-4 text-xs font-semibold text-[#A0A0A0] uppercase tracking-wider">Proposito</th>
                    <th className="px-4 py-4 text-xs font-semibold text-[#A0A0A0] uppercase tracking-wider">Requerido</th>
                  </tr>
                </thead>
                <tbody>
                  {NETWORK_REQUIREMENTS.map((req, i) => (
                    <tr
                      key={req.port}
                      className="border-b border-[#2A2A2A]/50 hover:bg-[#111111] transition-colors"
                    >
                      <td className="px-4 py-4">
                        <span className="font-mono text-[#00D4FF] font-semibold text-lg">{req.port}</span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="px-2.5 py-1 rounded-md bg-[#1A1A1A] text-xs font-mono text-[#A0A0A0] border border-[#2A2A2A]">
                          {req.protocol}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-[#A0A0A0]">{req.direction}</td>
                      <td className="px-4 py-4 text-sm text-[#A0A0A0]">{req.purpose}</td>
                      <td className="px-4 py-4">
                        {req.required ? (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-[#00FF88]">
                            <CheckIcon size={14} /> Si
                          </span>
                        ) : (
                          <span className="text-xs text-[#666666]">Opcional</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            {/* Firewall examples */}
            <motion.div
              variants={slideUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="mt-10"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Ejemplo de reglas de firewall (iptables)</h3>
              <CodeBlock
                code={NETWORK_REQUIREMENTS.map((r) => `# ${r.purpose}\n${r.firewallExample}`).join("\n\n")}
                lang="bash"
              />
            </motion.div>
          </div>
        </section>

        {/* ============== SUPPORTED PLATFORMS ============== */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A]">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#2A2A2A] to-transparent" />

          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={sectionReveal}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Plataformas{" "}
                <span className="bg-gradient-to-r from-[#0070F3] to-[#00D4FF] bg-clip-text text-transparent">
                  compatibles
                </span>
              </h2>
              <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
                El agente qatech360 se ejecuta en los principales sistemas operativos de servidor y escritorio.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {SUPPORTED_PLATFORMS.map((platform) => (
                <motion.div
                  key={platform.name}
                  variants={staggerItem}
                  className="flex flex-col items-center text-center p-5 rounded-xl bg-[#111111] border border-[#2A2A2A] hover:border-[#0070F3]/30 transition-all group"
                >
                  <div className="mb-3 group-hover:scale-110 transition-transform">{platform.icon}</div>
                  <h3 className="text-white font-semibold text-sm mb-1">{platform.name}</h3>
                  <p className="text-xs text-[#666666] font-mono">{platform.versions}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ============== FAQ ============== */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <motion.div
              variants={sectionReveal}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Preguntas frecuentes
              </h2>
              <p className="text-[#A0A0A0] text-lg">
                Sobre despliegue masivo en red
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="space-y-3"
            >
              {FAQS.map((faq, i) => (
                <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ============== CTA ============== */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#2A2A2A] to-transparent" />
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[#0070F3] opacity-[0.04] blur-[120px]" />
          </div>

          <motion.div
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative max-w-3xl mx-auto text-center"
          >
            <div className="p-10 rounded-2xl bg-gradient-to-b from-[#111111] to-[#0A0A0A] border border-[#2A2A2A] shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-2xl bg-[#0070F3]/10 border border-[#0070F3]/20">
                  <NetworkIcon size={48} />
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Necesitas ayuda con el despliegue?
              </h2>
              <p className="text-[#A0A0A0] text-lg max-w-xl mx-auto mb-8 leading-relaxed">
                Nuestro equipo de ingenieros te asiste en el despliegue masivo de agentes en toda tu infraestructura.
                Sin costo adicional en planes empresariales.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.div variants={buttonVariants} initial="rest" whileHover="hover" whileTap="tap">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-[#0070F3] hover:bg-[#0050D0] text-white font-semibold transition-colors shadow-[0_0_20px_rgba(0,112,243,0.4)]"
                  >
                    Contactar equipo de despliegue
                    <ArrowRightIcon size={18} />
                  </Link>
                </motion.div>
                <Link
                  href="/install/endpoint"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg border border-[#2A2A2A] hover:border-[#0070F3]/40 text-[#A0A0A0] hover:text-white font-medium transition-colors"
                >
                  Instalacion individual
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
