# CLAUDE.md — qatech360.com

> **Purpose:** This file provides complete project context for Claude Code (VS Code) to build the qatech360.com website from scratch without additional clarification. Read every section carefully before generating any code.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Design System](#3-design-system)
4. [File Structure](#4-file-structure)
5. [Services Catalog](#5-services-catalog)
6. [Pricing Structure](#6-pricing-structure)
7. [Pages & Components](#7-pages--components)
8. [Copy Guidelines](#8-copy-guidelines)
9. [Competitive Context](#9-competitive-context)
10. [API & Integrations](#10-api--integrations)
11. [SEO Strategy](#11-seo-strategy)
12. [Development Conventions](#12-development-conventions)
13. [Environment Variables](#13-environment-variables)
14. [Deployment](#14-deployment)

---

## 1. Project Overview

### What is qatech360.com?

qatech360.com is a **managed cybersecurity platform targeting the Latin American (LATAM) market**. It provides enterprise-grade security operations powered by Wazuh (open-source SIEM/XDR) delivered as a managed service. The platform competes directly with CrowdStrike and SentinelOne but differentiates through:

- **Native Spanish support** — all dashboards, alerts, documentation, and onboarding are in Spanish by default.
- **LATAM-first pricing** — transparent tiered pricing denominated in USD with regional payment methods (Mercado Pago, bank transfer, invoicing in MXN/BRL/COP/ARS/CLP).
- **15-minute onboarding** — a single agent installation script deploys full protection.
- **Open-source transparency** — built on Wazuh, clients can audit what runs on their infrastructure.
- **Dedicated LATAM SOC** — security analysts in GMT-6 / GMT-3 time zones covering Mexico, Colombia, Brazil, Argentina, Chile, Peru.

### Business Model

- **SaaS / MSSPaaS** — monthly subscriptions per endpoint tier.
- **Add-on services** — professional IR (Incident Response), compliance audits, custom playbooks.
- **Onboarding packages** — one-time setup fees for large enterprise onboarding.

### Target Customers

| Segment | Employees | Endpoints | Pain |
|---|---|---|---|
| SMB | 10–100 | 10–200 | No dedicated IT/security team |
| Mid-market | 100–1,000 | 200–2,000 | Compliance requirements (PCI, HIPAA) |
| Enterprise | 1,000+ | 2,000+ | Multi-cloud, complex environments |
| Government / Public sector | any | any | Local data sovereignty, Spanish docs |

### Geographic Focus

Primary markets: **Mexico, Colombia, Brazil, Argentina, Chile, Peru**
Secondary markets: Costa Rica, Ecuador, Uruguay, Panama, Dominican Republic

### Existing Infrastructure

- Production Wazuh cluster on a dedicated server running Docker.
- Wazuh version: **4.9.x** (latest stable as of project start).
- The **website** lives on a **separate server** — it is purely a marketing/sales/lead-generation site that communicates with back-end APIs.
- The website does NOT host the Wazuh dashboard directly; it links to a separate client portal subdomain (`portal.qatech360.com`).

---

## 2. Tech Stack

### Website (this project)

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 14.2.x (App Router) | Framework — SSR + SSG + API Routes |
| React | 18.3.x | UI library |
| TypeScript | 5.4.x | Type safety |
| Tailwind CSS | 3.4.x | Utility-first styling |
| Framer Motion | 11.x | Animations and transitions |
| shadcn/ui | latest (canary OK) | Accessible component primitives |
| Radix UI | via shadcn | Headless component behavior |
| Lucide React | 0.400.x | Icon set |
| Zod | 3.x | Schema validation (forms, API responses) |
| React Hook Form | 7.x | Form state management |
| next-intl | 3.x | i18n (ES primary, EN secondary) |
| next-seo | 6.x | SEO meta management |
| Resend | 3.x | Transactional email (contact forms, demos) |
| Vercel Analytics | 1.x | Page analytics |
| Posthog | latest | Product analytics + session replay |
| Prisma | 5.x | ORM (optional, for lead capture DB) |
| PlanetScale / Supabase | latest | Database for leads |

### Package Manager

```
pnpm 9.x
```

### Node version

```
Node.js 20.x LTS (use .nvmrc or .node-version file)
```

### `package.json` scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "format": "prettier --write .",
    "analyze": "ANALYZE=true next build"
  }
}
```

### `next.config.mjs` key settings

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['portal.qatech360.com', 'cdn.qatech360.com'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizeCss: true,
  },
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        {
          key: 'Content-Security-Policy',
          value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' *.vercel-insights.com *.posthog.com; style-src 'self' 'unsafe-inline'; img-src * blob: data:; font-src 'self'; connect-src *",
        },
      ],
    },
  ],
}
export default nextConfig
```

---

## 3. Design System

### Brand Philosophy

The visual identity positions qatech360 as **modern, technical, trustworthy, and Latin American**. The palette deliberately avoids CrowdStrike red and SentinelOne purple/violet. The dark background conveys security/stealth; the electric blue conveys precision and technology.

### Color Tokens

```css
:root {
  /* Primary */
  --color-primary:        #0070F3;   /* Electric Blue — CTAs, links, active states */
  --color-primary-dark:   #0050D0;   /* Hover state for primary */
  --color-primary-light:  #3B82F6;   /* Lighter shade, secondary text accents */

  /* Secondary */
  --color-secondary:      #00D4FF;   /* Cyan — hero gradients, highlights */
  --color-secondary-dark: #00A8CC;   /* Hover for secondary */

  /* Accent */
  --color-accent:         #00FF88;   /* Success Green — positive indicators, badges */
  --color-accent-warn:    #FFB800;   /* Warning Amber */
  --color-accent-danger:  #FF3B3B;   /* Danger Red — critical alerts only */

  /* Backgrounds */
  --color-bg-base:        #0A0A0A;   /* Root background */
  --color-bg-surface:     #111111;   /* Cards, panels */
  --color-bg-elevated:    #1A1A1A;   /* Dropdowns, modals */
  --color-bg-border:      #2A2A2A;   /* Default borders */
  --color-bg-border-light:#333333;   /* Subtle borders */

  /* Text */
  --color-text-primary:   #FFFFFF;   /* Headings, important text */
  --color-text-secondary: #A0A0A0;   /* Body copy, descriptions */
  --color-text-muted:     #666666;   /* Placeholders, disabled */
  --color-text-inverse:   #0A0A0A;   /* Text on light backgrounds */

  /* Gradients */
  --gradient-hero:        linear-gradient(135deg, #0070F3 0%, #00D4FF 100%);
  --gradient-card:        linear-gradient(145deg, #111111 0%, #1A1A1A 100%);
  --gradient-glow-blue:   radial-gradient(ellipse at center, rgba(0,112,243,0.3) 0%, transparent 70%);
  --gradient-glow-cyan:   radial-gradient(ellipse at center, rgba(0,212,255,0.2) 0%, transparent 70%);
  --gradient-text-hero:   linear-gradient(90deg, #FFFFFF 0%, #00D4FF 50%, #0070F3 100%);

  /* Spacing scale (matches Tailwind) */
  --space-1:  0.25rem;   /* 4px */
  --space-2:  0.5rem;    /* 8px */
  --space-3:  0.75rem;   /* 12px */
  --space-4:  1rem;      /* 16px */
  --space-6:  1.5rem;    /* 24px */
  --space-8:  2rem;      /* 32px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-24: 6rem;      /* 96px */

  /* Border radius */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   16px;
  --radius-2xl:  24px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-card:       0 4px 24px rgba(0,0,0,0.4);
  --shadow-glow-blue:  0 0 40px rgba(0,112,243,0.4);
  --shadow-glow-cyan:  0 0 40px rgba(0,212,255,0.3);
  --shadow-glow-green: 0 0 20px rgba(0,255,136,0.3);

  /* Typography */
  --font-heading: 'Inter', system-ui, -apple-system, sans-serif;
  --font-body:    system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono:    'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;

  /* Font sizes */
  --text-xs:   0.75rem;   /* 12px */
  --text-sm:   0.875rem;  /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg:   1.125rem;  /* 18px */
  --text-xl:   1.25rem;   /* 20px */
  --text-2xl:  1.5rem;    /* 24px */
  --text-3xl:  1.875rem;  /* 30px */
  --text-4xl:  2.25rem;   /* 36px */
  --text-5xl:  3rem;      /* 48px */
  --text-6xl:  3.75rem;   /* 60px */
  --text-7xl:  4.5rem;    /* 72px */

  /* Animation timings */
  --transition-fast:   150ms ease;
  --transition-base:   250ms ease;
  --transition-slow:   400ms ease;
  --transition-spring: 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### Tailwind Config Extension

```js
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0070F3',
          dark: '#0050D0',
          light: '#3B82F6',
        },
        secondary: {
          DEFAULT: '#00D4FF',
          dark: '#00A8CC',
        },
        accent: {
          DEFAULT: '#00FF88',
          warn: '#FFB800',
          danger: '#FF3B3B',
        },
        bg: {
          base: '#0A0A0A',
          surface: '#111111',
          elevated: '#1A1A1A',
          border: '#2A2A2A',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#A0A0A0',
          muted: '#666666',
        },
      },
      fontFamily: {
        heading: ['Inter', 'system-ui', 'sans-serif'],
        body: ['system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #0070F3 0%, #00D4FF 100%)',
        'gradient-card': 'linear-gradient(145deg, #111111 0%, #1A1A1A 100%)',
        'gradient-text': 'linear-gradient(90deg, #FFFFFF 0%, #00D4FF 50%, #0070F3 100%)',
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'card': '0 4px 24px rgba(0,0,0,0.4)',
        'glow-blue': '0 0 40px rgba(0,112,243,0.4)',
        'glow-cyan': '0 0 40px rgba(0,212,255,0.3)',
        'glow-green': '0 0 20px rgba(0,255,136,0.3)',
        'glow-blue-sm': '0 0 16px rgba(0,112,243,0.3)',
      },
      animation: {
        'gradient-x': 'gradient-x 4s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'scan-line': 'scan-line 3s linear infinite',
        'counter': 'counter 2s ease-out forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'slide-up': 'slide-up 0.5s ease-out forwards',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}
export default config
```

### Component Variants Reference

#### Button variants

```tsx
// variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
// size: 'sm' | 'md' | 'lg' | 'xl'

// Primary — electric blue fill
className="bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-all duration-200 shadow-glow-blue-sm hover:shadow-glow-blue"

// Secondary — cyan fill
className="bg-secondary hover:bg-secondary-dark text-bg-base font-semibold rounded-lg transition-all duration-200"

// Outline — bordered
className="border border-primary text-primary hover:bg-primary/10 font-semibold rounded-lg transition-all duration-200"

// Ghost — no border
className="text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-lg transition-all duration-200"
```

#### Card variants

```tsx
// Default dark card
className="bg-bg-surface border border-bg-border rounded-xl p-6 shadow-card hover:border-primary/40 transition-all duration-300"

// Glowing card (featured)
className="bg-bg-surface border border-primary/30 rounded-xl p-6 shadow-glow-blue hover:shadow-glow-blue transition-all duration-300"

// Gradient border card
className="relative rounded-xl p-[1px] bg-gradient-to-br from-primary to-secondary"
// inner: className="bg-bg-surface rounded-xl p-6"
```

#### Badge variants

```tsx
// Status active
className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20"

// Status warning
className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-accent-warn/10 text-accent-warn border border-accent-warn/20"

// Label/tag
className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
```

### Framer Motion Variants (reusable)

```ts
// src/lib/motion.ts
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' },
}

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.4 },
}

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut' },
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
}

export const slideInLeft = {
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: 'easeOut' },
}

export const slideInRight = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: 'easeOut' },
}
```

---

## 4. File Structure

```
qatech360-web/
├── .env.local                    # Local environment variables (git-ignored)
├── .env.example                  # Example env vars (committed)
├── .nvmrc                        # Node version: 20
├── .gitignore
├── .eslintrc.json
├── .prettierrc
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── pnpm-lock.yaml
├── CLAUDE.md                     # This file
│
├── public/
│   ├── favicon.ico
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── apple-touch-icon.png
│   ├── og-image.png              # 1200x630 OG image
│   ├── og-image-es.png           # Spanish OG image
│   ├── logo.svg
│   ├── logo-dark.svg
│   ├── logo-light.svg
│   ├── robots.txt
│   ├── sitemap.xml               # Auto-generated or static
│   ├── manifest.json             # PWA manifest
│   └── images/
│       ├── hero-dashboard.png    # Dashboard mockup
│       ├── hero-shield.svg       # Shield graphic
│       ├── wazuh-logo.png
│       ├── partners/
│       │   ├── aws.svg
│       │   ├── azure.svg
│       │   └── gcp.svg
│       └── screenshots/
│           ├── dashboard-main.png
│           ├── alerts-view.png
│           └── compliance-view.png
│
├── src/
│   ├── app/                      # Next.js 14 App Router
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Home page (/)
│   │   ├── globals.css           # Global styles
│   │   ├── not-found.tsx         # 404 page
│   │   ├── error.tsx             # Error boundary
│   │   ├── loading.tsx           # Global loading UI
│   │   │
│   │   ├── (marketing)/          # Route group — marketing pages
│   │   │   ├── layout.tsx        # Marketing layout (navbar + footer)
│   │   │   ├── about/
│   │   │   │   └── page.tsx      # /about — Quiénes somos
│   │   │   ├── contact/
│   │   │   │   └── page.tsx      # /contact — Contacto
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx      # /blog — Blog index
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx  # /blog/[slug]
│   │   │   ├── careers/
│   │   │   │   └── page.tsx      # /careers — Trabaja con nosotros
│   │   │   └── legal/
│   │   │       ├── privacy/
│   │   │       │   └── page.tsx  # /legal/privacy
│   │   │       ├── terms/
│   │   │       │   └── page.tsx  # /legal/terms
│   │   │       └── sla/
│   │   │           └── page.tsx  # /legal/sla
│   │   │
│   │   ├── (product)/            # Route group — product pages
│   │   │   ├── layout.tsx
│   │   │   ├── platform/
│   │   │   │   └── page.tsx      # /platform — Plataforma overview
│   │   │   ├── services/
│   │   │   │   ├── page.tsx      # /services — Todos los servicios
│   │   │   │   ├── siem/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── edr/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── xdr/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── vulnerability-management/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── cloud-security/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── compliance/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── threat-intelligence/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── incident-response/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── file-integrity/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── log-management/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── container-security/
   │   │   │   │   └── page.tsx
│   │   │   │   └── active-response/
│   │   │   │       └── page.tsx
│   │   │   └── integrations/
│   │   │       └── page.tsx      # /integrations
│   │   │
│   │   ├── (conversion)/         # Route group — conversion pages
│   │   │   ├── pricing/
│   │   │   │   └── page.tsx      # /pricing
│   │   │   ├── demo/
│   │   │   │   └── page.tsx      # /demo — Solicitar demo
│   │   │   ├── trial/
│   │   │   │   └── page.tsx      # /trial — Free trial
│   │   │   └── onboarding/
│   │   │       └── page.tsx      # /onboarding — Steps guide
│   │   │
│   │   ├── (solutions)/          # Route group — vertical solutions
│   │   │   ├── solutions/
│   │   │   │   ├── page.tsx      # /solutions
│   │   │   │   ├── pyme/
│   │   │   │   │   └── page.tsx  # /solutions/pyme — SMB
│   │   │   │   ├── enterprise/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── fintech/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── salud/
│   │   │   │   │   └── page.tsx  # Healthcare
│   │   │   │   ├── gobierno/
│   │   │   │   │   └── page.tsx  # Government
│   │   │   │   └── retail/
│   │   │   │       └── page.tsx
│   │   │
│   │   └── api/                  # API Routes
│   │       ├── contact/
│   │       │   └── route.ts      # POST /api/contact
│   │       ├── demo/
│   │       │   └── route.ts      # POST /api/demo
│   │       ├── newsletter/
│   │       │   └── route.ts      # POST /api/newsletter
│   │       └── health/
│   │           └── route.ts      # GET /api/health
│   │
│   ├── components/
│   │   ├── ui/                   # shadcn/ui base components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── select.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── navigation-menu.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── accordion.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── toaster.tsx
│   │   │   ├── tooltip.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── sheet.tsx         # Mobile nav drawer
│   │   │   ├── progress.tsx
│   │   │   └── skeleton.tsx
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar.tsx        # Main navigation
│   │   │   ├── Footer.tsx        # Site footer
│   │   │   ├── MobileNav.tsx     # Mobile hamburger nav
│   │   │   └── AnnouncementBar.tsx  # Top announcement strip
│   │   │
│   │   ├── sections/             # Full-width page sections
│   │   │   ├── HeroSection.tsx          # Home hero
│   │   │   ├── TrustBar.tsx             # Logos / "trusted by"
│   │   │   ├── StatsSection.tsx         # Animated stats counter
│   │   │   ├── ServicesGrid.tsx         # Services cards grid
│   │   │   ├── PlatformOverview.tsx     # Platform diagram section
│   │   │   ├── HowItWorks.tsx           # 3-step process
│   │   │   ├── PricingSection.tsx       # Pricing tiers
│   │   │   ├── TestimonialsSection.tsx  # Customer testimonials
│   │   │   ├── ComplianceSection.tsx    # Compliance frameworks
│   │   │   ├── CTASection.tsx           # Mid-page CTA banner
│   │   │   ├── BlogPreview.tsx          # Latest blog posts
│   │   │   ├── FAQSection.tsx           # FAQ accordion
│   │   │   ├── IntegrationsGrid.tsx     # Technology logos
│   │   │   ├── ComparisonTable.tsx      # vs CrowdStrike/S1
│   │   │   ├── ThreatMapSection.tsx     # Live threat map visual
│   │   │   └── OnboardingSteps.tsx      # 15-min onboarding demo
│   │   │
│   │   ├── cards/
│   │   │   ├── ServiceCard.tsx          # Individual service card
│   │   │   ├── PricingCard.tsx          # Pricing tier card
│   │   │   ├── BlogCard.tsx             # Blog post preview card
│   │   │   ├── TestimonialCard.tsx      # Testimonial card
│   │   │   ├── StatCard.tsx             # Animated stat counter card
│   │   │   ├── IntegrationCard.tsx      # Integration logo card
│   │   │   └── FeatureCard.tsx          # Feature highlight card
│   │   │
│   │   ├── forms/
│   │   │   ├── ContactForm.tsx          # General contact form
│   │   │   ├── DemoRequestForm.tsx      # Demo scheduling form
│   │   │   ├── TrialSignupForm.tsx      # Free trial signup
│   │   │   └── NewsletterForm.tsx       # Email newsletter
│   │   │
│   │   ├── common/
│   │   │   ├── GradientText.tsx         # Gradient text wrapper
│   │   │   ├── GlowButton.tsx           # Button with glow effect
│   │   │   ├── SectionHeader.tsx        # Reusable section title + subtitle
│   │   │   ├── AnimatedCounter.tsx      # Number counter animation
│   │   │   ├── ParticleBackground.tsx   # Particle canvas background
│   │   │   ├── GridBackground.tsx       # Subtle grid pattern bg
│   │   │   ├── CybersecurityIcons.tsx   # Custom security SVG icons
│   │   │   ├── LanguageToggle.tsx       # ES/EN switcher
│   │   │   ├── ThemeProvider.tsx        # Dark theme context
│   │   │   └── ScrollProgress.tsx      # Top scroll progress bar
│   │   │
│   │   └── analytics/
│   │       ├── PostHogProvider.tsx
│   │       └── VercelAnalytics.tsx
│   │
│   ├── lib/
│   │   ├── motion.ts             # Framer Motion variants
│   │   ├── utils.ts              # cn() utility, helpers
│   │   ├── constants.ts          # App-wide constants
│   │   ├── seo.ts                # SEO helper functions
│   │   ├── email.ts              # Resend email helpers
│   │   └── validations.ts       # Zod schemas
│   │
│   ├── hooks/
│   │   ├── useInView.ts          # Intersection Observer hook
│   │   ├── useCounter.ts         # Animated counter hook
│   │   ├── useMediaQuery.ts      # Responsive breakpoints
│   │   └── useScrollY.ts         # Scroll position hook
│   │
│   ├── types/
│   │   ├── index.ts              # Global type exports
│   │   ├── services.ts           # Service type definitions
│   │   ├── pricing.ts            # Pricing type definitions
│   │   └── blog.ts               # Blog post types
│   │
│   ├── data/
│   │   ├── services.ts           # Services catalog data
│   │   ├── pricing.ts            # Pricing plans data
│   │   ├── testimonials.ts       # Testimonials data
│   │   ├── faqs.ts               # FAQ data
│   │   ├── integrations.ts       # Integrations list
│   │   ├── stats.ts              # Platform stats data
│   │   └── nav.ts                # Navigation structure
│   │
│   ├── content/                  # MDX content (blog, docs)
│   │   └── blog/
│   │       ├── introduccion-siem-latam.mdx
│   │       └── pci-dss-guia-2025.mdx
│   │
│   └── i18n/
│       ├── es.json               # Spanish strings (primary)
│       └── en.json               # English strings (secondary)
```

---

## 5. Services Catalog

Each service is powered by Wazuh capabilities, rebranded under the qatech360 umbrella. Use these descriptions verbatim in the site copy.

### Service Data Structure

```ts
// src/types/services.ts
export interface Service {
  id: string
  slug: string
  name: string
  nameEs: string
  tagline: string
  taglineEs: string
  description: string
  descriptionEs: string
  icon: string          // Lucide icon name
  category: 'detection' | 'protection' | 'compliance' | 'intelligence' | 'response'
  features: string[]
  featuresEs: string[]
  useCases: string[]
  wazuhCapability: string  // underlying Wazuh module
  available: boolean
  comingSoon?: boolean
  badge?: 'popular' | 'new' | 'enterprise'
}
```

### Complete Services List

```ts
// src/data/services.ts

export const services: Service[] = [
  {
    id: 'siem',
    slug: 'siem',
    name: 'SIEM',
    nameEs: 'SIEM',
    tagline: 'Security Information & Event Management',
    taglineEs: 'Gestión de Información y Eventos de Seguridad',
    description: 'Centralize logs from all your infrastructure and detect threats in real time. Our SIEM correlates events across servers, endpoints, networks, and cloud services to surface critical incidents before they become breaches.',
    descriptionEs: 'Centraliza logs de toda tu infraestructura y detecta amenazas en tiempo real. Nuestro SIEM correlaciona eventos entre servidores, endpoints, redes y servicios cloud para detectar incidentes críticos antes de que se conviertan en brechas.',
    icon: 'BarChart3',
    category: 'detection',
    features: [
      'Real-time log aggregation from 100+ sources',
      'Out-of-the-box correlation rules (2,000+)',
      'Custom rule builder (Sigma-compatible)',
      'Alert prioritization with MITRE ATT&CK mapping',
      'Interactive dashboards and threat timelines',
      'Retention: 90 days hot, 1 year cold storage',
    ],
    featuresEs: [
      'Agregación de logs en tiempo real de más de 100 fuentes',
      'Reglas de correlación listas para usar (2,000+)',
      'Constructor de reglas personalizadas (compatible con Sigma)',
      'Priorización de alertas con mapeo MITRE ATT&CK',
      'Dashboards interactivos y líneas de tiempo de amenazas',
      'Retención: 90 días hot, 1 año almacenamiento cold',
    ],
    useCases: ['Threat detection', 'Compliance reporting', 'Forensic investigation'],
    wazuhCapability: 'wazuh-manager log analysis + Elasticsearch',
    available: true,
    badge: 'popular',
  },
  {
    id: 'edr',
    slug: 'edr',
    name: 'EDR',
    nameEs: 'EDR',
    tagline: 'Endpoint Detection & Response',
    taglineEs: 'Detección y Respuesta en Endpoints',
    description: 'Deploy a lightweight agent on Windows, Linux, or macOS endpoints to detect malware, ransomware, and anomalous behavior. Respond to threats in seconds with automated playbooks or manual analyst actions.',
    descriptionEs: 'Despliega un agente ligero en endpoints Windows, Linux o macOS para detectar malware, ransomware y comportamiento anómalo. Responde a amenazas en segundos con playbooks automatizados o acciones manuales del analista.',
    icon: 'Monitor',
    category: 'protection',
    features: [
      'Agent size: <10 MB, <1% CPU overhead',
      'Windows, Linux (Debian/RHEL/Ubuntu), macOS support',
      'Behavioral analysis + signature-based detection',
      'Ransomware rollback (shadow copy integration)',
      'Process tree visualization',
      'Remote shell for live response',
      'Automatic quarantine of malicious files',
    ],
    featuresEs: [
      'Tamaño del agente: <10 MB, <1% de overhead de CPU',
      'Soporte para Windows, Linux (Debian/RHEL/Ubuntu), macOS',
      'Análisis de comportamiento + detección basada en firmas',
      'Rollback de ransomware (integración con shadow copy)',
      'Visualización del árbol de procesos',
      'Shell remoto para respuesta en vivo',
      'Cuarentena automática de archivos maliciosos',
    ],
    useCases: ['Malware detection', 'Ransomware protection', 'Insider threat'],
    wazuhCapability: 'wazuh-agent + syscollector + syscheck',
    available: true,
    badge: 'popular',
  },
  {
    id: 'xdr',
    slug: 'xdr',
    name: 'XDR',
    nameEs: 'XDR',
    tagline: 'Extended Detection & Response',
    taglineEs: 'Detección y Respuesta Extendida',
    description: 'Unify threat detection across endpoints, network, cloud, and identity. XDR correlates signals from all your security layers into a single incident view, dramatically reducing MTTR.',
    descriptionEs: 'Unifica la detección de amenazas en endpoints, red, cloud e identidad. XDR correlaciona señales de todas tus capas de seguridad en una vista de incidente única, reduciendo drásticamente el MTTR.',
    icon: 'Network',
    category: 'detection',
    features: [
      'Cross-layer attack chain reconstruction',
      'Automated root cause analysis',
      'SOAR integrations (PagerDuty, Slack, Jira)',
      'Mean Time to Respond < 5 minutes',
      'Threat hunting workspace',
      'API for SIEM/SOAR integration',
    ],
    featuresEs: [
      'Reconstrucción de cadena de ataque entre capas',
      'Análisis automático de causa raíz',
      'Integraciones SOAR (PagerDuty, Slack, Jira)',
      'Tiempo medio de respuesta < 5 minutos',
      'Espacio de trabajo para threat hunting',
      'API para integración con SIEM/SOAR',
    ],
    useCases: ['APT detection', 'Supply chain attacks', 'Zero-day response'],
    wazuhCapability: 'wazuh-manager + integrations framework',
    available: true,
  },
  {
    id: 'fim',
    slug: 'file-integrity',
    name: 'File Integrity Monitoring',
    nameEs: 'Monitoreo de Integridad de Archivos',
    tagline: 'Know the moment a critical file changes',
    taglineEs: 'Sabe el momento exacto en que un archivo crítico cambia',
    description: 'Monitor file system changes on servers and endpoints. Instantly detect unauthorized modifications to system binaries, configuration files, and sensitive data — essential for PCI-DSS and HIPAA.',
    descriptionEs: 'Monitorea cambios del sistema de archivos en servidores y endpoints. Detecta instantáneamente modificaciones no autorizadas en binarios del sistema, archivos de configuración y datos sensibles — esencial para PCI-DSS e HIPAA.',
    icon: 'FileSearch',
    category: 'compliance',
    features: [
      'Real-time file change detection (inotify/Windows FSFilter)',
      'SHA-256/MD5 hash comparison',
      'Pre-built profiles for /etc, /bin, /sbin, Windows System32',
      'Diff view showing exact content changes',
      'Scheduled integrity scans',
      'Audit trail with user attribution',
    ],
    featuresEs: [
      'Detección de cambios en tiempo real (inotify/Windows FSFilter)',
      'Comparación de hash SHA-256/MD5',
      'Perfiles predefinidos para /etc, /bin, /sbin, Windows System32',
      'Vista diff mostrando cambios exactos de contenido',
      'Escaneos de integridad programados',
      'Rastro de auditoría con atribución de usuario',
    ],
    useCases: ['PCI-DSS Req. 11.5', 'HIPAA §164.312(c)', 'Rootkit detection'],
    wazuhCapability: 'wazuh syscheck module',
    available: true,
  },
  {
    id: 'vuln-mgmt',
    slug: 'vulnerability-management',
    name: 'Vulnerability Management',
    nameEs: 'Gestión de Vulnerabilidades',
    tagline: 'Find and fix weaknesses before attackers do',
    taglineEs: 'Encuentra y corrige debilidades antes que los atacantes',
    description: 'Continuously scan all your endpoints for known CVEs. Prioritize by CVSS score, exploitability, and asset criticality. Get remediation guidance in Spanish with estimated fix time.',
    descriptionEs: 'Escanea continuamente todos tus endpoints en busca de CVEs conocidos. Prioriza por puntaje CVSS, explotabilidad y criticidad del activo. Recibe guía de remediación en español con tiempo estimado de corrección.',
    icon: 'ShieldAlert',
    category: 'protection',
    features: [
      'CVE database updated every 6 hours (NVD + OSV)',
      'Prioritization: CVSS 3.1 + EPSS (exploit probability)',
      'Asset-based risk scoring',
      'Remediation tickets auto-created in Jira/ServiceNow',
      'Executive risk dashboard',
      'Zero-day advisory notifications',
    ],
    featuresEs: [
      'Base de datos CVE actualizada cada 6 horas (NVD + OSV)',
      'Priorización: CVSS 3.1 + EPSS (probabilidad de exploit)',
      'Puntuación de riesgo basada en activos',
      'Tickets de remediación creados automáticamente en Jira/ServiceNow',
      'Dashboard ejecutivo de riesgo',
      'Notificaciones de aviso zero-day',
    ],
    useCases: ['Continuous vulnerability assessment', 'Patch prioritization', 'Risk reporting'],
    wazuhCapability: 'wazuh vulnerability-detector module',
    available: true,
    badge: 'popular',
  },
  {
    id: 'cloud-security',
    slug: 'cloud-security',
    name: 'Cloud Security',
    nameEs: 'Seguridad en la Nube',
    tagline: 'Protect AWS, Azure, and GCP environments',
    taglineEs: 'Protege entornos AWS, Azure y GCP',
    description: 'Monitor your cloud infrastructure for misconfigurations, suspicious API calls, and compliance violations. Integrates natively with AWS CloudTrail, Azure Activity Log, and GCP Audit Logs.',
    descriptionEs: 'Monitorea tu infraestructura cloud en busca de configuraciones incorrectas, llamadas API sospechosas y violaciones de cumplimiento. Se integra nativamente con AWS CloudTrail, Azure Activity Log y GCP Audit Logs.',
    icon: 'Cloud',
    category: 'protection',
    features: [
      'AWS: CloudTrail, GuardDuty, SecurityHub, S3 access logs',
      'Azure: Activity Log, Defender alerts, Entra ID sign-ins',
      'GCP: Cloud Audit Logs, Security Command Center',
      'CIS Benchmark scanning (AWS/Azure/GCP)',
      'Misconfiguration auto-remediation',
      'Multi-account / multi-tenant support',
    ],
    featuresEs: [
      'AWS: CloudTrail, GuardDuty, SecurityHub, logs de acceso S3',
      'Azure: Activity Log, alertas de Defender, inicios de sesión Entra ID',
      'GCP: Cloud Audit Logs, Security Command Center',
      'Escaneo CIS Benchmark (AWS/Azure/GCP)',
      'Auto-remediación de configuraciones incorrectas',
      'Soporte multi-cuenta / multi-tenant',
    ],
    useCases: ['Cloud posture management', 'IAM monitoring', 'Data exfiltration detection'],
    wazuhCapability: 'wazuh AWS/Azure/GCP integration modules',
    available: true,
  },
  {
    id: 'compliance',
    slug: 'compliance',
    name: 'Compliance Automation',
    nameEs: 'Automatización de Cumplimiento',
    tagline: 'PCI-DSS, HIPAA, GDPR, SOC2 — automated',
    taglineEs: 'PCI-DSS, HIPAA, GDPR, SOC2 — automatizados',
    description: 'Map every security control to your compliance framework. Generate audit-ready reports in minutes, not weeks. Our LATAM compliance team also covers NOM-151 (Mexico) and LGPD (Brazil).',
    descriptionEs: 'Mapea cada control de seguridad a tu marco de cumplimiento. Genera informes listos para auditoría en minutos, no semanas. Nuestro equipo de cumplimiento LATAM también cubre NOM-151 (México) y LGPD (Brasil).',
    icon: 'ClipboardCheck',
    category: 'compliance',
    features: [
      'Frameworks: PCI-DSS 4.0, HIPAA, GDPR, SOC2, ISO 27001',
      'LATAM-specific: NOM-151, LGPD, Ley 1581 (Colombia)',
      'Automated evidence collection',
      'One-click audit reports (PDF/Excel)',
      'Remediation tracking per control',
      'Compliance trend dashboard (monthly)',
    ],
    featuresEs: [
      'Marcos: PCI-DSS 4.0, HIPAA, GDPR, SOC2, ISO 27001',
      'Específico LATAM: NOM-151, LGPD, Ley 1581 (Colombia)',
      'Recolección automática de evidencias',
      'Informes de auditoría con un clic (PDF/Excel)',
      'Seguimiento de remediación por control',
      'Dashboard de tendencia de cumplimiento (mensual)',
    ],
    useCases: ['PCI certification', 'HIPAA compliance', 'GDPR readiness', 'SOC2 audit prep'],
    wazuhCapability: 'wazuh CIS/PCI/HIPAA SCA policies',
    available: true,
    badge: 'enterprise',
  },
  {
    id: 'threat-intel',
    slug: 'threat-intelligence',
    name: 'Threat Intelligence',
    nameEs: 'Inteligencia de Amenazas',
    tagline: 'Context-enriched alerts with global threat data',
    taglineEs: 'Alertas enriquecidas con datos globales de amenazas',
    description: 'Enrich every security event with threat intelligence from MISP, VirusTotal, AbuseIPDB, and our proprietary LATAM threat feed. Know the actor, the campaign, and the recommended countermeasure.',
    descriptionEs: 'Enriquece cada evento de seguridad con inteligencia de amenazas de MISP, VirusTotal, AbuseIPDB y nuestro feed propietario de amenazas LATAM. Conoce el actor, la campaña y la contramedida recomendada.',
    icon: 'Crosshair',
    category: 'intelligence',
    features: [
      'MISP integration (bidirectional IOC sharing)',
      'VirusTotal file/URL/IP enrichment',
      'AbuseIPDB reputation scoring',
      'Proprietary LATAM threat feed (updated hourly)',
      'MITRE ATT&CK tactic tagging',
      'Threat actor profiles (20+ LATAM-active groups)',
    ],
    featuresEs: [
      'Integración MISP (compartición bidireccional de IOC)',
      'Enriquecimiento de archivo/URL/IP con VirusTotal',
      'Puntuación de reputación AbuseIPDB',
      'Feed propietario de amenazas LATAM (actualizado por hora)',
      'Etiquetado de tácticas MITRE ATT&CK',
      'Perfiles de actores de amenaza (20+ grupos activos en LATAM)',
    ],
    useCases: ['Proactive threat hunting', 'IOC blocking', 'Incident context'],
    wazuhCapability: 'wazuh integrations (VirusTotal, MISP)',
    available: true,
  },
  {
    id: 'log-mgmt',
    slug: 'log-management',
    name: 'Log Management',
    nameEs: 'Gestión de Logs',
    tagline: 'Centralized, searchable, compliant log storage',
    taglineEs: 'Almacenamiento centralizado, buscable y conforme de logs',
    description: 'Collect, parse, and store logs from any source — servers, firewalls, databases, applications, SaaS. Search across terabytes in seconds with full-text indexing. Retain for compliance.',
    descriptionEs: 'Recopila, analiza y almacena logs de cualquier fuente: servidores, firewalls, bases de datos, aplicaciones, SaaS. Busca entre terabytes en segundos con indexación de texto completo. Retiene para cumplimiento.',
    icon: 'Database',
    category: 'detection',
    features: [
      'Ingestion: syslog, beats, API, S3, SaaS webhooks',
      'Auto-parsing for 500+ log formats',
      'Full-text search (Elasticsearch / OpenSearch)',
      'Hot/warm/cold tiered storage',
      'Retention: configurable 30 days – 7 years',
      'Tamper-evident log sealing (SHA-256 chain)',
    ],
    featuresEs: [
      'Ingestión: syslog, beats, API, S3, webhooks SaaS',
      'Análisis automático para más de 500 formatos de log',
      'Búsqueda de texto completo (Elasticsearch / OpenSearch)',
      'Almacenamiento por capas hot/warm/cold',
      'Retención: configurable de 30 días a 7 años',
      'Sellado de logs a prueba de manipulación (cadena SHA-256)',
    ],
    useCases: ['Forensic investigation', 'Compliance evidence', 'Operational troubleshooting'],
    wazuhCapability: 'wazuh-manager + OpenSearch/Elasticsearch',
    available: true,
  },
  {
    id: 'incident-response',
    slug: 'incident-response',
    name: 'Incident Response',
    nameEs: 'Respuesta a Incidentes',
    tagline: 'Human analysts + automated playbooks, 24/7',
    taglineEs: 'Analistas humanos + playbooks automatizados, 24/7',
    description: 'When an alert fires, our LATAM SOC team jumps in. We triage, investigate, contain, and eradicate threats — in Spanish, in your time zone, with full post-incident reports.',
    descriptionEs: 'Cuando se dispara una alerta, nuestro equipo del SOC LATAM actúa. Hacemos triage, investigación, contención y erradicación de amenazas — en español, en tu zona horaria, con informes completos post-incidente.',
    icon: 'Siren',
    category: 'response',
    features: [
      '24/7/365 SOC coverage (LATAM time zones)',
      'SLA: P1 response < 15 min, P2 < 1 hour',
      'Spanish-language communication throughout',
      'Automated playbooks for common scenarios',
      'Full incident timeline and chain-of-custody report',
      'Executive summary in Spanish + technical appendix',
    ],
    featuresEs: [
      'Cobertura SOC 24/7/365 (zonas horarias LATAM)',
      'SLA: Respuesta P1 < 15 min, P2 < 1 hora',
      'Comunicación en español durante todo el proceso',
      'Playbooks automatizados para escenarios comunes',
      'Línea de tiempo completa del incidente e informe de cadena de custodia',
      'Resumen ejecutivo en español + apéndice técnico',
    ],
    useCases: ['Ransomware response', 'Data breach containment', 'APT eradication'],
    wazuhCapability: 'wazuh active-response + SOC team',
    available: true,
    badge: 'enterprise',
  },
  {
    id: 'container-security',
    slug: 'container-security',
    name: 'Container Security',
    nameEs: 'Seguridad de Contenedores',
    tagline: 'Secure Docker and Kubernetes workloads',
    taglineEs: 'Asegura workloads de Docker y Kubernetes',
    description: 'Monitor Docker containers and Kubernetes clusters for runtime threats, image vulnerabilities, and configuration drift. Detect container escape attempts and privilege escalation in real time.',
    descriptionEs: 'Monitorea contenedores Docker y clústeres Kubernetes en busca de amenazas en tiempo de ejecución, vulnerabilidades de imágenes y deriva de configuración. Detecta intentos de escape de contenedores y escalada de privilegios en tiempo real.',
    icon: 'Container',
    category: 'protection',
    features: [
      'Docker daemon event monitoring',
      'Kubernetes audit log analysis',
      'Image vulnerability scanning (Trivy integration)',
      'Runtime syscall anomaly detection',
      'Container escape attempt detection',
      'Kubernetes RBAC misconfiguration alerts',
    ],
    featuresEs: [
      'Monitoreo de eventos del daemon Docker',
      'Análisis de logs de auditoría de Kubernetes',
      'Escaneo de vulnerabilidades de imágenes (integración Trivy)',
      'Detección de anomalías de syscall en tiempo de ejecución',
      'Detección de intentos de escape de contenedor',
      'Alertas de configuración incorrecta de Kubernetes RBAC',
    ],
    useCases: ['K8s security', 'DevSecOps', 'Container runtime protection'],
    wazuhCapability: 'wazuh docker listener + K8s integration',
    available: true,
    badge: 'new',
  },
  {
    id: 'active-response',
    slug: 'active-response',
    name: 'Active Response',
    nameEs: 'Respuesta Activa',
    tagline: 'Block threats automatically before damage is done',
    taglineEs: 'Bloquea amenazas automáticamente antes de que ocurra el daño',
    description: 'Configure automated countermeasures that execute within milliseconds of threat detection. Block IPs at the firewall, quarantine files, kill malicious processes, and disable compromised accounts — all without human delay.',
    descriptionEs: 'Configura contramedidas automatizadas que se ejecutan en milisegundos tras la detección de amenazas. Bloquea IPs en el firewall, pone archivos en cuarentena, mata procesos maliciosos y deshabilita cuentas comprometidas — todo sin demora humana.',
    icon: 'Zap',
    category: 'response',
    features: [
      'IP blocking (iptables, Windows Firewall, Palo Alto, Fortinet)',
      'Automatic file quarantine',
      'Process termination',
      'User account lockout (AD/LDAP)',
      'Network isolation of compromised endpoint',
      'Custom Python/Bash script execution',
    ],
    featuresEs: [
      'Bloqueo de IP (iptables, Windows Firewall, Palo Alto, Fortinet)',
      'Cuarentena automática de archivos',
      'Terminación de procesos',
      'Bloqueo de cuenta de usuario (AD/LDAP)',
      'Aislamiento de red del endpoint comprometido',
      'Ejecución de scripts Python/Bash personalizados',
    ],
    useCases: ['Brute force blocking', 'Malware containment', 'Account takeover prevention'],
    wazuhCapability: 'wazuh active-response module',
    available: true,
  },
]
```

---

## 6. Pricing Structure

### Philosophy

- Transparent pricing published on the website (competitor differentiator — CrowdStrike/S1 require sales calls).
- Pricing in USD. Add footnote: "Facturación disponible en MXN, BRL, COP, ARS, CLP."
- Annual billing = 2 months free (16.7% discount).
- All plans include 15-minute onboarding, Spanish support, and LATAM SOC alerts.

### Pricing Tiers

```ts
// src/data/pricing.ts

export const pricingPlans = [
  {
    id: 'starter',
    name: 'Starter',
    nameEs: 'Inicial',
    tagline: 'For small businesses taking their first security steps',
    taglineEs: 'Para pequeñas empresas dando sus primeros pasos en seguridad',
    price: {
      monthly: 149,
      annual: 1490,   // ~$124/mo
      currency: 'USD',
    },
    endpoints: 25,
    highlight: false,
    badge: null,
    features: [
      '25 endpoints included',
      'SIEM + Log Management',
      'EDR (Windows/Linux/macOS)',
      'File Integrity Monitoring',
      'Vulnerability Management',
      'Email + Slack alerting',
      '30-day log retention',
      'Business hours support (9am–6pm, Mon–Fri)',
      'Spanish-language dashboard',
      '15-minute guided onboarding',
      'Standard SLA: 4h response',
    ],
    featuresEs: [
      '25 endpoints incluidos',
      'SIEM + Gestión de Logs',
      'EDR (Windows/Linux/macOS)',
      'Monitoreo de Integridad de Archivos',
      'Gestión de Vulnerabilidades',
      'Alertas por Email + Slack',
      '30 días de retención de logs',
      'Soporte en horario hábil (9am–6pm, Lun–Vie)',
      'Dashboard en español',
      'Onboarding guiado en 15 minutos',
      'SLA estándar: respuesta en 4h',
    ],
    cta: 'Start Free Trial',
    ctaEs: 'Iniciar Prueba Gratis',
    trialDays: 14,
  },
  {
    id: 'professional',
    name: 'Professional',
    nameEs: 'Profesional',
    tagline: 'For growing companies that need 24/7 protection',
    taglineEs: 'Para empresas en crecimiento que necesitan protección 24/7',
    price: {
      monthly: 399,
      annual: 3990,   // ~$332/mo
      currency: 'USD',
    },
    endpoints: 100,
    highlight: true,
    badge: 'Most Popular',
    badgeEs: 'Más Popular',
    features: [
      '100 endpoints included',
      'Everything in Starter',
      'XDR (cross-layer correlation)',
      'Cloud Security (AWS + Azure + GCP)',
      'Compliance Automation (PCI-DSS, HIPAA)',
      'Threat Intelligence feed',
      'Active Response (automated blocking)',
      '90-day log retention',
      '24/7 SOC alerting (human review)',
      'Priority support (1h SLA)',
      'Monthly executive report (PDF, Spanish)',
      'Dedicated onboarding engineer',
    ],
    featuresEs: [
      '100 endpoints incluidos',
      'Todo en Inicial',
      'XDR (correlación entre capas)',
      'Seguridad Cloud (AWS + Azure + GCP)',
      'Automatización de Cumplimiento (PCI-DSS, HIPAA)',
      'Feed de Inteligencia de Amenazas',
      'Respuesta Activa (bloqueo automatizado)',
      '90 días de retención de logs',
      'Alertas SOC 24/7 (revisión humana)',
      'Soporte prioritario (SLA 1h)',
      'Informe ejecutivo mensual (PDF, español)',
      'Ingeniero de onboarding dedicado',
    ],
    cta: 'Start Free Trial',
    ctaEs: 'Iniciar Prueba Gratis',
    trialDays: 14,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    nameEs: 'Empresarial',
    tagline: 'For large organizations with complex security requirements',
    taglineEs: 'Para grandes organizaciones con requisitos de seguridad complejos',
    price: {
      monthly: null,    // Custom
      annual: null,
      currency: 'USD',
      label: 'Custom',
      labelEs: 'Personalizado',
    },
    endpoints: 'Unlimited',
    highlight: false,
    badge: 'Enterprise',
    features: [
      'Unlimited endpoints',
      'Everything in Professional',
      'Dedicated LATAM SOC team',
      'Container Security (Docker/K8s)',
      'Incident Response (IR) retainer',
      'Custom compliance frameworks (NOM-151, LGPD)',
      'Multi-tenant management',
      '1-year log retention (configurable)',
      'On-premise or hybrid deployment',
      'Custom SLA (P1 < 15 min)',
      'Executive QBRs (quarterly business reviews)',
      'API access for SIEM/SOAR integration',
      'White-glove onboarding (on-site available)',
    ],
    featuresEs: [
      'Endpoints ilimitados',
      'Todo en Profesional',
      'Equipo SOC LATAM dedicado',
      'Seguridad de Contenedores (Docker/K8s)',
      'Retención de Respuesta a Incidentes (IR)',
      'Marcos de cumplimiento personalizados (NOM-151, LGPD)',
      'Gestión multi-tenant',
      '1 año de retención de logs (configurable)',
      'Despliegue on-premise o híbrido',
      'SLA personalizado (P1 < 15 min)',
      'QBRs ejecutivos (revisiones trimestrales)',
      'Acceso API para integración SIEM/SOAR',
      'Onboarding completo (disponible presencial)',
    ],
    cta: 'Talk to Sales',
    ctaEs: 'Hablar con Ventas',
    trialDays: 0,
  },
]

// Add-on services (shown on pricing page)
export const addons = [
  {
    id: 'ir-retainer',
    name: 'IR Retainer',
    nameEs: 'Retención IR',
    description: 'Pre-purchased incident response hours. Guaranteed analyst availability.',
    descriptionEs: 'Horas de respuesta a incidentes pre-compradas. Disponibilidad garantizada de analistas.',
    price: 'From $500/mo',
    priceEs: 'Desde $500/mes',
  },
  {
    id: 'compliance-audit',
    name: 'Compliance Audit',
    nameEs: 'Auditoría de Cumplimiento',
    description: 'One-time or annual audit with certified auditors.',
    descriptionEs: 'Auditoría única o anual con auditores certificados.',
    price: 'From $1,500',
    priceEs: 'Desde $1,500',
  },
  {
    id: 'custom-playbooks',
    name: 'Custom Playbooks',
    nameEs: 'Playbooks Personalizados',
    description: 'Bespoke automation playbooks for your environment.',
    descriptionEs: 'Playbooks de automatización a medida para tu entorno.',
    price: 'From $800/set',
    priceEs: 'Desde $800/conjunto',
  },
  {
    id: 'extra-endpoints',
    name: 'Extra Endpoints',
    nameEs: 'Endpoints Adicionales',
    description: 'Per-endpoint pricing beyond plan limits.',
    descriptionEs: 'Precio por endpoint más allá de los límites del plan.',
    price: '$3/endpoint/mo',
    priceEs: '$3/endpoint/mes',
  },
]
```

---

## 7. Pages & Components

### Page Inventory

| URL | Component File | Priority | Description |
|---|---|---|---|
| `/` | `app/page.tsx` | P0 | Home — hero, stats, services grid, how it works, pricing preview, testimonials, CTA |
| `/platform` | `(product)/platform/page.tsx` | P0 | Platform overview with architecture diagram |
| `/services` | `(product)/services/page.tsx` | P0 | Services catalog grid |
| `/services/siem` | `(product)/services/siem/page.tsx` | P1 | SIEM detail page |
| `/services/edr` | `(product)/services/edr/page.tsx` | P1 | EDR detail page |
| `/services/xdr` | P1 | XDR detail page |
| `/services/vulnerability-management` | P1 | Vulnerability Management detail |
| `/services/cloud-security` | P1 | Cloud Security detail |
| `/services/compliance` | P1 | Compliance Automation detail |
| `/services/threat-intelligence` | P2 | Threat Intelligence detail |
| `/services/incident-response` | P1 | Incident Response detail |
| `/services/file-integrity` | P2 | FIM detail |
| `/services/log-management` | P2 | Log Management detail |
| `/services/container-security` | P2 | Container Security detail |
| `/services/active-response` | P2 | Active Response detail |
| `/pricing` | `(conversion)/pricing/page.tsx` | P0 | Pricing table with annual/monthly toggle |
| `/demo` | `(conversion)/demo/page.tsx` | P0 | Demo request form |
| `/trial` | `(conversion)/trial/page.tsx` | P0 | Free trial signup |
| `/about` | `(marketing)/about/page.tsx` | P1 | Team, mission, LATAM story |
| `/contact` | `(marketing)/contact/page.tsx` | P1 | Contact form + offices |
| `/solutions` | `(solutions)/solutions/page.tsx` | P1 | Solutions by vertical |
| `/solutions/pyme` | P1 | SMB solutions page |
| `/solutions/enterprise` | P2 | Enterprise solutions page |
| `/solutions/fintech` | P2 | Fintech vertical page |
| `/solutions/salud` | P2 | Healthcare vertical page |
| `/solutions/gobierno` | P2 | Government vertical page |
| `/blog` | `(marketing)/blog/page.tsx` | P2 | Blog index |
| `/blog/[slug]` | P2 | Blog post |
| `/integrations` | `(product)/integrations/page.tsx` | P2 | Integrations catalog |
| `/legal/privacy` | P3 | Privacy policy |
| `/legal/terms` | P3 | Terms of service |
| `/legal/sla` | P3 | Service Level Agreement |

### Home Page Section Order

```
1. AnnouncementBar (top strip: "Prueba gratuita 14 días — Sin tarjeta de crédito")
2. Navbar
3. HeroSection
4. TrustBar (logos: AWS, Azure, GCP, + client logos)
5. StatsSection (animated: endpoints protected, threats blocked/month, MTTR, uptime)
6. ServicesGrid
7. PlatformOverview (architecture diagram)
8. HowItWorks (3 steps: Deploy agent → Detect threats → Respond)
9. ComplianceSection (PCI-DSS, HIPAA, GDPR, SOC2, NOM-151, LGPD)
10. PricingSection (preview, link to full /pricing)
11. TestimonialsSection
12. ComparisonTable (qatech360 vs CrowdStrike vs SentinelOne)
13. CTASection (final CTA: start trial)
14. BlogPreview
15. FAQSection
16. Footer
```

### Key Components Detail

#### HeroSection

- Full-viewport height (`min-h-screen`)
- Grid background pattern overlay
- Left: H1 gradient text + subheading + two CTAs (primary: "Iniciar Prueba Gratis", secondary: "Ver Demo")
- Right: animated dashboard mockup (screenshot or custom SVG visualization)
- Floating badge: `"LATAM #1 Managed Security"` with green accent dot
- Bottom: scroll indicator arrow

#### StatsSection

Animate counters on scroll-into-view using `useCounter` hook + Intersection Observer.

```ts
// src/data/stats.ts
export const stats = [
  { value: 50000, suffix: '+', label: 'Endpoints Protegidos', labelEn: 'Endpoints Protected' },
  { value: 2400000, suffix: '+', label: 'Amenazas Bloqueadas/Mes', labelEn: 'Threats Blocked/Month', formatFn: (v) => `${(v/1000000).toFixed(1)}M+` },
  { value: 4.8, suffix: 'min', label: 'MTTR Promedio', labelEn: 'Avg. MTTR' },
  { value: 99.9, suffix: '%', label: 'Uptime SLA', labelEn: 'Uptime SLA' },
]
```

#### ComparisonTable

```ts
// Comparison data structure
const comparison = {
  categories: [
    { label: 'Idioma principal', qatech: 'Español nativo', crowdstrike: 'Inglés', sentinelone: 'Inglés' },
    { label: 'Mercado objetivo', qatech: 'LATAM', crowdstrike: 'Global (USA-first)', sentinelone: 'Global (USA-first)' },
    { label: 'Precios transparentes', qatech: true, crowdstrike: false, sentinelone: false },
    { label: 'Precio inicial (USD/mes)', qatech: '$149', crowdstrike: '~$8.99/endpoint/mo', sentinelone: '~$6.99/endpoint/mo' },
    { label: 'Onboarding', qatech: '15 minutos', crowdstrike: 'Days–weeks', sentinelone: 'Days–weeks' },
    { label: 'Open source core', qatech: true, crowdstrike: false, sentinelone: false },
    { label: 'SOC en zona horaria LATAM', qatech: true, crowdstrike: false, sentinelone: false },
    { label: 'Cumplimiento NOM-151 / LGPD', qatech: true, crowdstrike: false, sentinelone: false },
    { label: 'Prueba gratuita (sin tarjeta)', qatech: '14 días', crowdstrike: 'No', sentinelone: 'No' },
  ]
}
```

---

## 8. Copy Guidelines

### Brand Voice

- **Confident, not arrogant.** We know our product is excellent; we let the features speak.
- **Technical, but approachable.** Use correct security terminology (SIEM, EDR, MITRE ATT&CK) but always follow with plain-language explanations.
- **Warmly Latin American.** We are a LATAM company speaking to LATAM teams. Reference local regulations, time zones, and realities.
- **Urgency without fear-mongering.** Cybersecurity is urgent but we don't use scare tactics. Frame threats as solvable problems.

### Primary Language: Spanish (LATAM Spanish)

- Use `tú` (informal) not `usted` for UI copy and marketing.
- Avoid overly Spain-specific terms (e.g., use "computadora" not "ordenador", "seguridad cibernética" or "ciberseguridad").
- Technical terms stay in English when industry-standard: SIEM, EDR, XDR, SOC, MTTR, CVE, etc.

### Key Messages (Mensajes Clave)

```
HERO HEADLINE options (pick one per A/B test):
1. "Ciberseguridad de clase mundial, hecha para LATAM."
2. "Tu empresa merece seguridad empresarial — en español."
3. "Protege tu empresa en 15 minutos. Sin complicaciones."

SUBHEADLINE:
"Detección de amenazas 24/7, cumplimiento automatizado y respuesta a incidentes — con precios transparentes y soporte en español."

DIFFERENTIATOR TAGLINES:
- "En español, en tu zona horaria."
- "Onboarding en 15 minutos. No en 15 días."
- "El precio que ves es el precio que pagas."
- "Construido sobre Wazuh. Operado para LATAM."

CTA HIERARCHY:
Primary:   "Iniciar Prueba Gratis" → /trial
Secondary: "Ver Demo" → /demo
Tertiary:  "Hablar con Ventas" → /contact
```

### Tone by Section

| Section | Tone | Example |
|---|---|---|
| Hero | Bold, energizing | "Protege lo que construiste." |
| Feature descriptions | Technical, precise | "Correlación cross-layer con mapeo MITRE ATT&CK." |
| Pricing | Direct, reassuring | "Sin contratos anuales obligatorios. Cancela cuando quieras." |
| Testimonials | Peer-to-peer, authentic | Use real job titles: CTO, CISO, IT Manager |
| Blog | Educational, authoritative | Teach, don't sell |
| Error/404 | Friendly, helpful | "Algo salió mal. Nuestro equipo ya fue notificado." |

### Value Proposition Framework (StoryBrand-style)

```
PROBLEM: Las PyMEs y empresas medianas en LATAM no tienen acceso a seguridad
         empresarial asequible, en su idioma, adaptada a sus regulaciones locales.

SOLUTION: qatech360 entrega protección de nivel Fortune 500 a través de una
          plataforma gestionada en español, con precios transparentes y onboarding
          en 15 minutos.

STAKES:   Sin protección adecuada, un ataque de ransomware puede costarle a una
          empresa mediana $500,000 USD en promedio — más el daño reputacional.

GUIDE:    Nuestro equipo de expertos en seguridad LATAM está disponible 24/7
          para guiarte, no solo para enviarte alertas.
```

---

## 9. Competitive Context

### CrowdStrike (Rojo — "We Stop Breaches")

- **Strengths:** Industry-leading AI/ML, Falcon platform is best-in-class, massive threat intel database, strong brand recognition.
- **Weaknesses for LATAM customers:** English-only support, complex enterprise-first pricing, requires dedicated security team to operate, no LATAM-specific compliance, sales-cycle heavy.
- **How to counter:** "CrowdStrike es excelente — si tienes un equipo de 10 ingenieros de seguridad y $100k de presupuesto. Nosotros hacemos lo mismo, gestionado, en español, desde $149/mes."

### SentinelOne (Morado/Violeta — "Don't Just Stop Breaches")

- **Strengths:** Autonomous AI response (Singularity), strong EDR, good cloud security story, Purple AI (LLM for security).
- **Weaknesses for LATAM:** Same as CrowdStrike — English-first, no LATAM pricing/compliance, complex deployment.
- **How to counter:** "SentinelOne tiene buena IA. Nosotros también tenemos detección automática — y además tienes un analista humano LATAM revisando cada alerta crítica."

### qatech360 Positioning

- **Color:** Electric Blue (not red, not purple — ownable in the LATAM cybersecurity space).
- **Message:** "De LATAM, para LATAM" — we understand local reality.
- **Unique owned territory:** LATAM-native + transparent pricing + 15-min onboarding + open-source core.

### Messaging Don'ts

- Do NOT use "We Stop Breaches" (CrowdStrike trademark).
- Do NOT use "Don't Just Stop Breaches" (SentinelOne trademark).
- Avoid direct FUD (fear, uncertainty, doubt) campaigns. Lead with our strengths.

---

## 10. API & Integrations

### Internal APIs (Next.js API Routes)

```ts
// POST /api/contact
// Body: { name, email, company, phone?, country, message }
// Action: Send email via Resend + save to Supabase leads table

// POST /api/demo
// Body: { name, email, company, role, employees, country, preferredDate? }
// Action: Send email + create Cal.com booking + notify sales

// POST /api/newsletter
// Body: { email, language: 'es' | 'en' }
// Action: Add to Resend audience list

// GET /api/health
// Returns: { status: 'ok', timestamp: ISO8601 }
```

### External Integrations

#### Wazuh API (for live metrics on homepage)

```ts
// The Wazuh REST API is available at: process.env.WAZUH_API_URL
// Authentication: Bearer token via process.env.WAZUH_API_TOKEN

// Endpoint: GET /security/user/authenticate
// Endpoint: GET /agents (list + count active agents)
// Endpoint: GET /overview/agents (agent status summary)

// Use this data to populate live stats in StatsSection
// Cache with Next.js fetch cache: { next: { revalidate: 300 } } // 5 min cache
```

#### Resend (Email)

```ts
// Send contact form notifications to: hola@qatech360.com
// Send demo confirmations to: demos@qatech360.com
// Newsletter via Resend Audiences API

// Templates:
// - contact-notification.tsx (internal team notification)
// - contact-confirmation.tsx (user confirmation, Spanish)
// - demo-confirmation.tsx (user, Spanish)
// - demo-notification.tsx (internal, with full lead data)
```

#### Cal.com (Demo Scheduling)

```ts
// Embed Cal.com scheduling widget in /demo page
// Cal.com slug: qatech360/demo-30min
// Pre-fill form fields from DemoRequestForm state
```

#### PostHog (Analytics)

```ts
// Track events:
posthog.capture('cta_clicked', { cta_type: 'trial' | 'demo' | 'contact', source_page: string })
posthog.capture('pricing_plan_viewed', { plan_id: string, billing: 'monthly' | 'annual' })
posthog.capture('service_page_viewed', { service_id: string })
posthog.capture('form_submitted', { form_type: 'contact' | 'demo' | 'trial' | 'newsletter' })
posthog.capture('comparison_table_viewed', {})
```

#### Supabase (Lead Database)

```sql
-- leads table
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  type TEXT CHECK (type IN ('contact', 'demo', 'trial', 'newsletter')),
  name TEXT,
  email TEXT NOT NULL,
  company TEXT,
  role TEXT,
  phone TEXT,
  country TEXT,
  employees TEXT,
  message TEXT,
  source_page TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost'))
);
```

### Third-party Integration Display (shown on /integrations page)

```ts
// src/data/integrations.ts
export const integrations = [
  // Cloud providers
  { id: 'aws', name: 'Amazon Web Services', category: 'cloud', logo: '/images/partners/aws.svg' },
  { id: 'azure', name: 'Microsoft Azure', category: 'cloud', logo: '/images/partners/azure.svg' },
  { id: 'gcp', name: 'Google Cloud Platform', category: 'cloud', logo: '/images/partners/gcp.svg' },
  // SIEMs / SOAR
  { id: 'splunk', name: 'Splunk', category: 'siem', logo: '/images/partners/splunk.svg' },
  { id: 'pagerduty', name: 'PagerDuty', category: 'soar' },
  // Ticketing
  { id: 'jira', name: 'Jira', category: 'ticketing' },
  { id: 'servicenow', name: 'ServiceNow', category: 'ticketing' },
  // Communication
  { id: 'slack', name: 'Slack', category: 'communication' },
  { id: 'teams', name: 'Microsoft Teams', category: 'communication' },
  // Threat Intel
  { id: 'virustotal', name: 'VirusTotal', category: 'threat-intel' },
  { id: 'misp', name: 'MISP', category: 'threat-intel' },
  // Identity
  { id: 'okta', name: 'Okta', category: 'identity' },
  { id: 'azure-ad', name: 'Microsoft Entra ID', category: 'identity' },
  // Vulnerability
  { id: 'tenable', name: 'Tenable', category: 'vulnerability' },
]
```

---

## 11. SEO Strategy

### Target Keywords

#### Primary (High intent, Spanish)

| Keyword | Intent | Target Page |
|---|---|---|
| `plataforma de ciberseguridad` | Commercial | / |
| `seguridad cibernética para empresas` | Commercial | / |
| `SIEM para empresas México` | Transactional | /services/siem |
| `EDR empresas Colombia` | Transactional | /services/edr |
| `gestión de vulnerabilidades` | Commercial | /services/vulnerability-management |
| `cumplimiento PCI-DSS México` | Transactional | /services/compliance |
| `ciberseguridad LATAM` | Informational | / |
| `SIEM open source managed` | Commercial | /platform |
| `Wazuh managed service` | Transactional | /platform |
| `seguridad en la nube AWS Azure` | Commercial | /services/cloud-security |
| `respuesta a incidentes ciberseguridad` | Transactional | /services/incident-response |
| `monitoreo de seguridad 24/7` | Commercial | /platform |

#### Secondary (Competitor comparison)

| Keyword | Target Page |
|---|---|
| `alternativa CrowdStrike precio` | /pricing |
| `CrowdStrike vs SentinelOne LATAM` | /pricing (comparison section) |
| `seguridad empresarial barata` | /pricing |

#### Long-tail (Blog)

- "cómo implementar SIEM en una pyme"
- "qué es EDR y por qué lo necesitas"
- "requisitos PCI-DSS para ecommerce México 2025"
- "diferencias entre SIEM XDR EDR"
- "ciberseguridad para fintech Colombia regulaciones"

### Meta Tags Template

```tsx
// src/lib/seo.ts

export const defaultSEO = {
  defaultTitle: 'qatech360 — Ciberseguridad Gestionada para LATAM',
  titleTemplate: '%s | qatech360',
  description: 'Plataforma de seguridad cibernética gestionada para empresas en América Latina. SIEM, EDR, XDR, cumplimiento y respuesta a incidentes — en español, 24/7, desde $149/mes.',
  canonical: 'https://qatech360.com',
  openGraph: {
    type: 'website',
    locale: 'es_LA',
    url: 'https://qatech360.com',
    siteName: 'qatech360',
    images: [
      {
        url: 'https://qatech360.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'qatech360 — Ciberseguridad Gestionada para LATAM',
      },
    ],
  },
  twitter: {
    handle: '@qatech360',
    site: '@qatech360',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    { name: 'keywords', content: 'ciberseguridad, SIEM, EDR, XDR, seguridad nube, LATAM, México, Colombia, Brasil' },
    { name: 'author', content: 'qatech360' },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:locale:alternate', content: 'en_US' },
  ],
}

// Per-page metadata helper
export function generateMetadata(page: {
  title: string
  description: string
  canonical?: string
  noIndex?: boolean
}): Metadata {
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: page.canonical },
    robots: page.noIndex ? 'noindex, nofollow' : 'index, follow',
    openGraph: {
      title: page.title,
      description: page.description,
      images: ['/og-image.png'],
    },
  }
}
```

### robots.txt

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/

Sitemap: https://qatech360.com/sitemap.xml
```

### Structured Data (JSON-LD)

Add to root layout for Organization schema:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "qatech360",
  "url": "https://qatech360.com",
  "logo": "https://qatech360.com/logo.png",
  "description": "Plataforma de ciberseguridad gestionada para empresas en América Latina",
  "areaServed": ["MX", "CO", "BR", "AR", "CL", "PE"],
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "hola@qatech360.com",
    "contactType": "customer service",
    "availableLanguage": "Spanish"
  },
  "sameAs": [
    "https://twitter.com/qatech360",
    "https://linkedin.com/company/qatech360"
  ]
}
```

---

## 12. Development Conventions

### TypeScript

- Use `interface` for object shapes (not `type` for plain objects).
- Use `type` for unions, intersections, and utility types.
- No `any`. Use `unknown` if type is truly unknown, then narrow.
- All API response types must be defined in `/src/types/`.
- Enable strict mode in `tsconfig.json`.

### Component Conventions

```tsx
// Component file structure:
// 1. Imports (React, third-party, internal — in that order, separated by blank line)
// 2. Type/interface definitions (local to file)
// 3. Constants (outside component)
// 4. Component function (named export, not default for most components)
// 5. Default export at bottom if needed for page components

// Naming:
// - Components: PascalCase (HeroSection.tsx)
// - Hooks: camelCase with 'use' prefix (useCounter.ts)
// - Utilities: camelCase (formatDate.ts)
// - Constants: SCREAMING_SNAKE_CASE
// - CSS classes: kebab-case (in globals.css)
// - Files: PascalCase for components, camelCase for utils/hooks/data

// Props interface naming:
interface HeroSectionProps {
  // always suffix with Props
}

// Always destructure props:
export function HeroSection({ title, subtitle, ctaText }: HeroSectionProps) { ... }
```

### File Naming Rules

| Type | Convention | Example |
|---|---|---|
| Page component | `page.tsx` | `app/(marketing)/about/page.tsx` |
| Layout | `layout.tsx` | `app/(marketing)/layout.tsx` |
| Section component | PascalCase | `HeroSection.tsx` |
| Card component | PascalCase | `ServiceCard.tsx` |
| Form component | PascalCase | `ContactForm.tsx` |
| UI primitive | PascalCase | `button.tsx` (shadcn style) |
| Hook | camelCase | `useCounter.ts` |
| Utility | camelCase | `formatCurrency.ts` |
| Data file | camelCase | `services.ts` |
| Type file | camelCase | `services.ts` |
| i18n file | ISO code | `es.json`, `en.json` |

### Import Order (enforced by ESLint)

```ts
// 1. React and Next.js
import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

// 2. Third-party libraries
import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'

// 3. Internal — absolute paths (@/)
import { Button } from '@/components/ui/button'
import { fadeInUp } from '@/lib/motion'
import { services } from '@/data/services'
import type { Service } from '@/types/services'
```

### Path Aliases (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/types/*": ["./src/types/*"],
      "@/data/*": ["./src/data/*"],
      "@/content/*": ["./src/content/*"]
    }
  }
}
```

### Animation Guidelines

- Use `motion.div` from Framer Motion for scroll-triggered animations.
- Always use `initial` + `whileInView` + `viewport={{ once: true }}` for section entry animations.
- Keep animation durations: fast UI feedback = 150–200ms, section enters = 400–600ms, hero = 600–800ms.
- Use `useReducedMotion()` hook to respect `prefers-reduced-motion`.

```tsx
// Pattern for scroll-triggered sections:
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-100px' }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
>
  ...
</motion.div>
```

### Form Conventions

```tsx
// Always use React Hook Form + Zod:
const schema = z.object({
  email: z.string().email('Ingresa un email válido'),
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
})

const form = useForm<z.infer<typeof schema>>({
  resolver: zodResolver(schema),
  defaultValues: { email: '', name: '' },
})
```

### Error Handling

```tsx
// API routes: always return structured error responses
return NextResponse.json(
  { success: false, error: 'Descripción del error' },
  { status: 400 }
)

// Client-side: use toast for user feedback (Spanish messages)
toast.error('Ocurrió un error. Por favor intenta de nuevo.')
toast.success('¡Mensaje enviado! Te contactaremos pronto.')
```

### Accessibility

- All interactive elements must have `aria-label` or visible text.
- Color contrast: minimum 4.5:1 for normal text, 3:1 for large text (WCAG AA).
- Keyboard navigation must work for all forms and modals.
- Use semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<header>`, `<footer>`.
- All images must have descriptive `alt` text in Spanish.

---

## 13. Environment Variables

### `.env.example`

```bash
# ============================================================
# qatech360.com — Environment Variables
# Copy to .env.local for local development
# ============================================================

# ----- App -----
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=qatech360

# ----- Wazuh API -----
# The Wazuh REST API endpoint (internal network address)
WAZUH_API_URL=https://wazuh.internal.qatech360.com:55000
WAZUH_API_TOKEN=your_wazuh_api_token_here
# OR use username/password auth:
WAZUH_API_USER=wazuh_api_user
WAZUH_API_PASSWORD=your_wazuh_api_password

# ----- Resend (Email) -----
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@qatech360.com
RESEND_CONTACT_TO=hola@qatech360.com
RESEND_DEMO_TO=demos@qatech360.com

# ----- Supabase (Lead Database) -----
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ----- PostHog (Analytics) -----
NEXT_PUBLIC_POSTHOG_KEY=phc_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# ----- Cal.com (Demo Scheduling) -----
NEXT_PUBLIC_CAL_LINK=qatech360/demo-30min

# ----- reCAPTCHA (Form Protection) -----
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LeXXXXXXXXXXXXXXXXXXXXXXXXXXX
RECAPTCHA_SECRET_KEY=6LeXXXXXXXXXXXXXXXXXXXXXXXXXXX

# ----- Feature Flags -----
NEXT_PUBLIC_ENABLE_BLOG=true
NEXT_PUBLIC_ENABLE_PRICING=true
NEXT_PUBLIC_MAINTENANCE_MODE=false

# ----- Portal Link -----
NEXT_PUBLIC_PORTAL_URL=https://portal.qatech360.com
```

### Variable Usage by Context

| Variable | Used in | Access level |
|---|---|---|
| `WAZUH_API_URL` | `/api/health`, stats fetching | Server-only |
| `WAZUH_API_TOKEN` | Wazuh API calls | Server-only |
| `RESEND_API_KEY` | `/api/contact`, `/api/demo` | Server-only |
| `SUPABASE_SERVICE_ROLE_KEY` | API routes (write leads) | Server-only |
| `NEXT_PUBLIC_SUPABASE_URL` | Client (read-only queries) | Client-safe |
| `NEXT_PUBLIC_POSTHOG_KEY` | Analytics client | Client-safe |
| `NEXT_PUBLIC_APP_URL` | Canonical URLs, OG tags | Client-safe |

---

## 14. Deployment

### Option A: Vercel (Recommended for launch)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Set environment variables via Vercel dashboard or CLI:
vercel env add RESEND_API_KEY production
vercel env add WAZUH_API_TOKEN production
# ... (all vars from .env.example)
```

**Vercel project settings:**
- Framework: Next.js
- Build command: `pnpm build`
- Output directory: `.next`
- Install command: `pnpm install`
- Node.js version: 20.x
- Regions: `gru1` (São Paulo, Brazil) — closest to LATAM users

**Custom domain setup:**
1. Add `qatech360.com` and `www.qatech360.com` in Vercel Domains.
2. Update DNS: `A` record → `76.76.21.21` (Vercel), `CNAME www` → `cname.vercel-dns.com`.
3. Enable automatic HTTPS (Let's Encrypt, auto-renewed by Vercel).

### Option B: Docker (Self-hosted server)

```dockerfile
# Dockerfile
FROM node:20-alpine AS base

# Dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN corepack enable pnpm && pnpm build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

```yaml
# docker-compose.yml (website only — separate from Wazuh server)
version: '3.8'

services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    env_file:
      - .env.production
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--spider", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - /etc/letsencrypt:/etc/letsencrypt:ro
    depends_on:
      - web
    restart: unless-stopped
```

```nginx
# nginx.conf
server {
    listen 80;
    server_name qatech360.com www.qatech360.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name qatech360.com www.qatech360.com;

    ssl_certificate /etc/letsencrypt/live/qatech360.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/qatech360.com/privkey.pem;

    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    location / {
        proxy_pass http://web:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  lint-and-type-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'pnpm' }
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm type-check

  deploy:
    needs: lint-and-type-check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### Post-deployment Checklist

```
[ ] All environment variables set in production
[ ] Custom domain configured and SSL active
[ ] /api/health returns { "status": "ok" }
[ ] robots.txt accessible at /robots.txt
[ ] sitemap.xml accessible at /sitemap.xml
[ ] Contact form sends email (test with real submission)
[ ] Demo form creates Cal.com booking
[ ] PostHog tracking events firing (check PostHog dashboard)
[ ] OG image renders correctly (use opengraph.xyz to test)
[ ] Google Search Console domain verified
[ ] Uptime monitoring configured (e.g., BetterUptime, UptimeRobot)
[ ] Error tracking configured (Sentry optional but recommended)
[ ] Core Web Vitals: LCP < 2.5s, CLS < 0.1, FID < 100ms (run Lighthouse)
[ ] Mobile responsive on iPhone SE (375px) and up
[ ] Dark mode only (no light mode toggle needed for this project)
[ ] All CTAs link to correct pages
[ ] Canonical URLs correct (no duplicate content)
[ ] Spanish language set as default (html lang="es")
```

---

## Quick Reference

### Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server locally
pnpm start

# Run linter
pnpm lint

# Type check (no emit)
pnpm type-check

# Add shadcn component
pnpx shadcn@latest add button

# Analyze bundle
pnpm analyze
```

### Key URLs

| URL | Purpose |
|---|---|
| `https://qatech360.com` | Main website |
| `https://portal.qatech360.com` | Client portal (Wazuh dashboard) |
| `https://wazuh.internal.qatech360.com:55000` | Wazuh API (internal) |
| `hola@qatech360.com` | General contact |
| `demos@qatech360.com` | Demo requests |
| `soporte@qatech360.com` | Technical support |

### Color Quick Reference

```
Primary Blue:    #0070F3
Cyan:            #00D4FF
Accent Green:    #00FF88
Warning:         #FFB800
Danger:          #FF3B3B
Background:      #0A0A0A
Surface:         #111111
Elevated:        #1A1A1A
Border:          #2A2A2A
Text Primary:    #FFFFFF
Text Secondary:  #A0A0A0
```

---

*Last updated: 2026-03-17 — qatech360.com CLAUDE.md v1.0*
