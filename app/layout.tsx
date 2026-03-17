import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// ================================================================
// FONTS
// ================================================================
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// ================================================================
// METADATA
// ================================================================
export const metadata: Metadata = {
  metadataBase: new URL("https://qatech360.com"),
  title: {
    default: "qatech360 — Plataforma de Ciberseguridad para LATAM",
    template: "%s | qatech360",
  },
  description:
    "Proteja su empresa con IA de próxima generación. qatech360 detecta, analiza y neutraliza amenazas cibernéticas en tiempo real. Onboarding en 15 minutos. Cobertura para toda LATAM.",
  keywords: [
    "ciberseguridad LATAM",
    "EDR",
    "SIEM",
    "SOC 24/7",
    "seguridad empresarial",
    "threat detection",
    "endpoint security",
    "cloud security",
    "compliance ISO 27001",
    "qatech360",
  ],
  authors: [{ name: "qatech360", url: "https://qatech360.com" }],
  creator: "qatech360",
  publisher: "qatech360",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_419",
    url: "https://qatech360.com",
    siteName: "qatech360",
    title: "qatech360 — Ciberseguridad de próxima generación para LATAM",
    description:
      "EDR, SIEM, SOC 24/7 y Threat Intelligence en una sola plataforma. Onboarding en 15 minutos. Prueba gratis 15 días.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "qatech360 — Plataforma de Ciberseguridad para LATAM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "qatech360 — Ciberseguridad de próxima generación para LATAM",
    description:
      "EDR, SIEM, SOC 24/7 y Threat Intelligence en una sola plataforma. Prueba gratis 15 días.",
    images: ["/og-image.jpg"],
    creator: "@qatech360",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#0070F3" }],
  },
  manifest: "/site.webmanifest",
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#0070F3",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "dark",
};

// ================================================================
// ROOT LAYOUT
// ================================================================
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} dark`} suppressHydrationWarning>
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "qatech360",
              applicationCategory: "SecurityApplication",
              description:
                "Plataforma de ciberseguridad de próxima generación para LATAM con EDR, SIEM, SOC 24/7 y Threat Intelligence.",
              url: "https://qatech360.com",
              offers: {
                "@type": "Offer",
                price: "299",
                priceCurrency: "USD",
                priceValidUntil: "2027-12-31",
              },
              operatingSystem: "SaaS",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                ratingCount: "50",
                bestRating: "5",
              },
            }),
          }}
        />
      </head>
      <body className="bg-[#0A0A0A] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
