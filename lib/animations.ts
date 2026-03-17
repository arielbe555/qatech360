/**
 * qatech360 — Framer Motion Animation Variants & Utilities
 * Centralized animation library for consistent motion design
 */

import type { Variants, Transition } from "framer-motion";

// ================================================================
// 1. BASE TRANSITIONS
// ================================================================

export const transitions = {
  fast: { duration: 0.15, ease: [0.4, 0, 0.2, 1] } as Transition,
  normal: { duration: 0.25, ease: [0.4, 0, 0.2, 1] } as Transition,
  slow: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } as Transition,
  spring: { type: "spring", stiffness: 300, damping: 30 } as Transition,
  springBounce: { type: "spring", stiffness: 400, damping: 20 } as Transition,
  easeOut: { duration: 0.35, ease: [0.19, 1, 0.22, 1] } as Transition,
  easeOutSlow: { duration: 0.6, ease: [0.19, 1, 0.22, 1] } as Transition,
};

// ================================================================
// 2. FADE VARIANTS
// ================================================================

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitions.normal,
  },
  exit: {
    opacity: 0,
    transition: transitions.fast,
  },
};

export const fadeInSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitions.easeOutSlow,
  },
};

// ================================================================
// 3. SLIDE VARIANTS
// ================================================================

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.easeOut,
  },
  exit: {
    opacity: 0,
    y: 16,
    transition: transitions.fast,
  },
};

export const slideUpLarge: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] },
  },
};

export const slideDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.easeOut,
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: transitions.fast,
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.easeOut,
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.easeOut,
  },
};

// ================================================================
// 4. SCALE VARIANTS
// ================================================================

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.spring,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: transitions.fast,
  },
};

export const scaleInBounce: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.springBounce,
  },
};

export const scalePop: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.03 },
  tap: { scale: 0.97 },
};

// ================================================================
// 5. STAGGER CONTAINER VARIANTS
// ================================================================

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// ================================================================
// 6. STAGGER CHILDREN (used with staggerContainer)
// ================================================================

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.easeOut,
  },
};

export const staggerItemLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.easeOut,
  },
};

export const staggerItemScale: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.spring,
  },
};

// ================================================================
// 7. HERO-SPECIFIC VARIANTS
// ================================================================

export const heroContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

export const heroBadge: Variants = {
  hidden: { opacity: 0, y: -12, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.19, 1, 0.22, 1] },
  },
};

export const heroTitle: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] },
  },
};

export const heroSubtitle: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1], delay: 0.1 },
  },
};

export const heroCtas: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1], delay: 0.2 },
  },
};

export const heroStats: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1], delay: 0.4 },
  },
};

// ================================================================
// 8. CARD HOVER VARIANTS
// ================================================================

export const cardHover: Variants = {
  rest: {
    y: 0,
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.4), 0 2px 4px -2px rgba(0,0,0,0.3)",
    borderColor: "rgba(55, 65, 81, 1)",
  },
  hover: {
    y: -4,
    boxShadow: "0 20px 40px -12px rgba(0,0,0,0.6), 0 0 40px rgba(0,112,243,0.12)",
    borderColor: "rgba(0, 112, 243, 0.4)",
    transition: transitions.spring,
  },
};

export const cardIconHover: Variants = {
  rest: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: transitions.springBounce,
  },
};

// ================================================================
// 9. NAVIGATION VARIANTS
// ================================================================

export const navVariants: Variants = {
  top: {
    backgroundColor: "rgba(10, 10, 10, 0)",
    borderBottomColor: "rgba(55, 65, 81, 0)",
    backdropFilter: "blur(0px)",
  },
  scrolled: {
    backgroundColor: "rgba(10, 10, 10, 0.85)",
    borderBottomColor: "rgba(55, 65, 81, 0.5)",
    backdropFilter: "blur(20px)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export const mobileMenuVariants: Variants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] },
  },
  open: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.3, ease: [0, 0, 0.2, 1] },
  },
};

export const hamburgerTopLine: Variants = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: 45, y: 6 },
};

export const hamburgerMiddleLine: Variants = {
  closed: { opacity: 1, x: 0 },
  open: { opacity: 0, x: -10 },
};

export const hamburgerBottomLine: Variants = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: -45, y: -6 },
};

export const megaMenuVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -8,
    scale: 0.98,
    transition: { duration: 0.15, ease: [0.4, 0, 1, 1] },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: [0, 0, 0.2, 1] },
  },
};

// ================================================================
// 10. COUNTER ANIMATION
// ================================================================

export const counterVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] },
  },
};

// ================================================================
// 11. TESTIMONIAL / CAROUSEL VARIANTS
// ================================================================

export const testimonialSlide = {
  enter: (direction: number): object => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.97,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.19, 1, 0.22, 1] },
  },
  exit: (direction: number): object => ({
    x: direction < 0 ? 80 : -80,
    opacity: 0,
    scale: 0.97,
    transition: { duration: 0.3, ease: [0.4, 0, 1, 1] },
  }),
};

// ================================================================
// 12. PRICING VARIANTS
// ================================================================

export const pricingContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

export const pricingCard: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] },
  },
};

export const featuredPricingCard: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] },
  },
};

// ================================================================
// 13. PARTICLE / BACKGROUND VARIANTS
// ================================================================

export const particleFade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.5, ease: "easeOut" },
  },
};

// ================================================================
// 14. SECTION REVEAL (Viewport-triggered)
// ================================================================

export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] },
  },
};

export const sectionRevealLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] },
  },
};

export const sectionRevealRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] },
  },
};

// ================================================================
// 15. VIEWPORT OPTIONS (used with whileInView)
// ================================================================

export const viewportOnce = { once: true, margin: "-80px" };
export const viewportRepeat = { once: false, margin: "-80px" };
export const viewportEarly = { once: true, margin: "-20px" };

// ================================================================
// 16. BUTTON INTERACTION VARIANTS
// ================================================================

export const buttonVariants: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: transitions.spring,
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
};

export const buttonGlowVariants: Variants = {
  rest: {
    boxShadow: "0 0 20px rgba(0,112,243,0.4), 0 4px 15px rgba(0,112,243,0.3)",
  },
  hover: {
    boxShadow: "0 0 35px rgba(0,112,243,0.7), 0 8px 25px rgba(0,112,243,0.5)",
    transition: transitions.normal,
  },
};

// ================================================================
// 17. STATS / COUNTER SECTION
// ================================================================

export const statsContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const statItem: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] },
  },
};

// ================================================================
// 18. CTA SECTION
// ================================================================

export const ctaContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const ctaItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] },
  },
};

// ================================================================
// 19. UTILITIES
// ================================================================

/**
 * Creates a stagger container with custom timing
 */
export function createStagger(staggerDelay = 0.1, initialDelay = 0.1): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  };
}

/**
 * Creates a slide-up variant with custom distance and duration
 */
export function createSlideUp(y = 24, duration = 0.5): Variants {
  return {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: [0.19, 1, 0.22, 1] },
    },
  };
}

/**
 * Creates a delay variant for specific elements in a stagger
 */
export function withDelay(variants: Variants, delay: number): Variants {
  const visible = variants.visible;
  if (!visible || typeof visible === "function") return variants;
  return {
    ...variants,
    visible: {
      ...visible,
      transition: {
        ...(typeof visible === "object" && "transition" in visible
          ? (visible.transition as object)
          : {}),
        delay,
      },
    },
  };
}
