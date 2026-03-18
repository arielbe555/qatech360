/**
 * qatech360 — Homepage
 * Next.js 14 App Router · Full landing page
 *
 * Section order:
 *  1. NavBar          — sticky navigation with mega-menu
 *  2. HeroSection     — threat map + counter + CTAs
 *  3. StatsCounter    — 4 animated metric cards
 *  4. ProductsSection — 6 product/service cards
 *  5. HowItWorks      — 3-step process (inline)
 *  6. PricingSection  — 3 tiers + toggle
 *  7. TestimonialsSection — carousel with 5 testimonials
 *  8. CTASection      — final conversion
 *  9. Footer          — links, legal, social
 */

import { Suspense } from "react";
import Image from "next/image";
import { NavBar } from "@/components/NavBar";
import { HeroSection } from "@/components/HeroSection";
import { StatsCounter } from "@/components/StatsCounter";
import { ProductsSection } from "@/components/ProductCard";
import { PricingSection } from "@/components/PricingSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CTASection } from "@/components/CTASection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { Footer } from "@/components/Footer";
import CyberWorldMap from "@/components/CyberWorldMap";

// ================================================================
// PAGE
// ================================================================
export default function HomePage() {
  return (
    <>
      {/* Navigation */}
      <NavBar />

      <main>
        {/* 1. Hero */}
        <div className="relative">
          {/* Video background — mapa cibernético animado */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-[0.55] pointer-events-none"
            aria-hidden="true"
          >
            <source src="/images/videos/planivideo.mp4" type="video/mp4" />
          </video>
          {/* Planisferio static fallback + depth layer */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <Image
              src="/images/backgrounds/planisferio.png"
              alt=""
              fill
              className="object-cover"
              style={{ opacity: 0.18, mixBlendMode: "screen" }}
              priority
            />
          </div>
          {/* CyberWorldMap SVG — decorative overlay nodes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <CyberWorldMap className="w-full h-full opacity-20" />
          </div>
          <HeroSection />
        </div>

        {/* Divider */}
        <div className="divider-gradient" aria-hidden="true" />

        {/* 2. Stats */}
        <StatsCounter />

        {/* Divider */}
        <div className="divider-gradient" aria-hidden="true" />

        {/* 3. Products */}
        <ProductsSection />

        {/* Divider */}
        <div className="divider-gradient" aria-hidden="true" />

        {/* 4. How it works */}
        <HowItWorksSection />

        {/* Divider */}
        <div className="divider-gradient" aria-hidden="true" />

        {/* 5. Pricing */}
        <PricingSection />

        {/* Divider */}
        <div className="divider-gradient" aria-hidden="true" />

        {/* 6. Testimonials */}
        <TestimonialsSection />

        {/* Divider */}
        <div className="divider-gradient" aria-hidden="true" />

        {/* 7. Final CTA */}
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
