import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // === qatech360 Core Brand Palette ===
        brand: {
          primary:   "#0070F3",   // Azul eléctrico
          secondary: "#00D4FF",   // Cian
          accent:    "#00FF88",   // Verde éxito
          warning:   "#FF6B00",   // Naranja
          danger:    "#FF3366",   // Rojo suave
        },
        // === Backgrounds ===
        bg: {
          base:     "#0A0A0A",   // Fondo principal (casi negro)
          card:     "#111827",   // Fondo cards
          elevated: "#1F2937",   // Fondo elevado / modals
          overlay:  "#374151",   // Overlays / bordes
        },
        // === Text ===
        content: {
          primary:   "#FFFFFF",
          secondary: "#9CA3AF",
          muted:     "#6B7280",
          inverse:   "#0A0A0A",
        },
        // === Borders ===
        border: {
          DEFAULT: "#374151",
          subtle:  "#1F2937",
          strong:  "#4B5563",
        },
        // === Semantic aliases (shadcn/ui compatibility) ===
        background:  "#0A0A0A",
        foreground:  "#FFFFFF",
        card: {
          DEFAULT:    "#111827",
          foreground: "#FFFFFF",
        },
        popover: {
          DEFAULT:    "#1F2937",
          foreground: "#FFFFFF",
        },
        primary: {
          DEFAULT:    "#0070F3",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT:    "#1F2937",
          foreground: "#9CA3AF",
        },
        muted: {
          DEFAULT:    "#1F2937",
          foreground: "#9CA3AF",
        },
        accent: {
          DEFAULT:    "#00FF88",
          foreground: "#0A0A0A",
        },
        destructive: {
          DEFAULT:    "#FF3366",
          foreground: "#FFFFFF",
        },
        input:   "#374151",
        ring:    "#0070F3",
      },

      // === Typography ===
      fontFamily: {
        sans:  ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono:  ["var(--font-jetbrains)", "JetBrains Mono", "Fira Code", "monospace"],
        display: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.625rem",  { lineHeight: "1rem" }],
        "display-2xl": ["4.5rem",  { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "800" }],
        "display-xl":  ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "800" }],
        "display-lg":  ["3rem",    { lineHeight: "1.15", letterSpacing: "-0.015em", fontWeight: "700" }],
        "display-md":  ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "700" }],
        "display-sm":  ["1.875rem",{ lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "600" }],
      },

      // === Spacing extras ===
      spacing: {
        "18":  "4.5rem",
        "22":  "5.5rem",
        "30":  "7.5rem",
        "34":  "8.5rem",
        "100": "25rem",
        "120": "30rem",
        "140": "35rem",
      },

      // === Border radius ===
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },

      // === Gradients (as backgroundImage) ===
      backgroundImage: {
        // Brand gradients
        "gradient-hero":        "linear-gradient(135deg, #0070F3 0%, #00D4FF 100%)",
        "gradient-hero-radial": "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,112,243,0.35) 0%, transparent 70%)",
        "gradient-card-hover":  "linear-gradient(135deg, rgba(0,112,243,0.20) 0%, rgba(0,212,255,0.10) 100%)",
        "gradient-accent":      "linear-gradient(135deg, #00FF88 0%, #00D4FF 100%)",
        "gradient-danger":      "linear-gradient(135deg, #FF3366 0%, #FF6B00 100%)",
        "gradient-dark":        "linear-gradient(180deg, #0A0A0A 0%, #111827 100%)",
        "gradient-section":     "linear-gradient(180deg, transparent 0%, rgba(0,112,243,0.05) 50%, transparent 100%)",
        // Border gradients (used via bg-clip-border trick)
        "gradient-border-primary": "linear-gradient(135deg, #0070F3, #00D4FF)",
        "gradient-border-accent":  "linear-gradient(135deg, #00FF88, #00D4FF)",
        // Mesh / noise (decorative)
        "noise": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
        // Grid pattern
        "grid-pattern": "linear-gradient(rgba(0,112,243,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,112,243,0.07) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid": "60px 60px",
      },

      // === Box shadows ===
      boxShadow: {
        "glow-primary":   "0 0 20px rgba(0,112,243,0.4), 0 0 60px rgba(0,112,243,0.15)",
        "glow-primary-lg":"0 0 40px rgba(0,112,243,0.5), 0 0 100px rgba(0,112,243,0.2)",
        "glow-cyan":      "0 0 20px rgba(0,212,255,0.4), 0 0 60px rgba(0,212,255,0.15)",
        "glow-accent":    "0 0 20px rgba(0,255,136,0.4), 0 0 60px rgba(0,255,136,0.15)",
        "glow-danger":    "0 0 20px rgba(255,51,102,0.4)",
        "card":           "0 4px 6px -1px rgba(0,0,0,0.4), 0 2px 4px -2px rgba(0,0,0,0.3)",
        "card-hover":     "0 20px 40px -12px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,112,243,0.2)",
        "card-glow":      "0 0 0 1px rgba(0,112,243,0.3), 0 20px 40px -12px rgba(0,0,0,0.6), 0 0 40px rgba(0,112,243,0.1)",
        "inset-glow":     "inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.2)",
        "button-primary": "0 0 20px rgba(0,112,243,0.4), 0 4px 15px rgba(0,112,243,0.3)",
        "button-primary-hover": "0 0 30px rgba(0,112,243,0.6), 0 8px 20px rgba(0,112,243,0.4)",
        "nav":            "0 1px 0 rgba(55,65,81,0.8), 0 4px 30px rgba(0,0,0,0.5)",
      },

      // === Keyframes ===
      keyframes: {
        // Pulse glow effect
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0,112,243,0.4), 0 0 60px rgba(0,112,243,0.15)" },
          "50%":      { boxShadow: "0 0 40px rgba(0,112,243,0.7), 0 0 100px rgba(0,112,243,0.3)" },
        },
        "pulse-glow-cyan": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0,212,255,0.3)" },
          "50%":      { boxShadow: "0 0 40px rgba(0,212,255,0.6), 0 0 80px rgba(0,212,255,0.2)" },
        },
        // Gradient shift
        "gradient-shift": {
          "0%":   { backgroundPosition: "0% 50%" },
          "50%":  { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        // Float up/down
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-12px)" },
        },
        // Scanning line (cybersecurity aesthetic)
        "scan-line": {
          "0%":   { transform: "translateY(-100%)", opacity: "0" },
          "10%":  { opacity: "1" },
          "90%":  { opacity: "1" },
          "100%": { transform: "translateY(100vh)", opacity: "0" },
        },
        // Number counting (CSS only fallback)
        "count-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        // Blink cursor
        "blink": {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
        // Rotate (for loading/shield icons)
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to:   { transform: "rotate(360deg)" },
        },
        // Shimmer (skeleton loading)
        "shimmer": {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        // Particle drift
        "drift": {
          "0%":   { transform: "translate(0, 0) scale(1)",   opacity: "0.6" },
          "33%":  { transform: "translate(30px, -20px) scale(1.1)", opacity: "1" },
          "66%":  { transform: "translate(-15px, -40px) scale(0.9)", opacity: "0.8" },
          "100%": { transform: "translate(0, 0) scale(1)",   opacity: "0.6" },
        },
        // Ripple
        "ripple": {
          "0%":   { transform: "scale(1)",   opacity: "0.6" },
          "100%": { transform: "scale(2.5)", opacity: "0" },
        },
        // Appear from bottom
        "slide-up-fade": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        // Alert / threat flash
        "threat-pulse": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.05)" },
        },
        // Border glow rotate
        "border-rotate": {
          "0%":   { backgroundPosition: "0% 50%"  },
          "100%": { backgroundPosition: "400% 50%" },
        },
        // Typewriter cursor
        "cursor-blink": {
          "0%, 49%":  { borderRightColor: "#0070F3" },
          "50%, 100%": { borderRightColor: "transparent" },
        },
      },

      // === Animation utilities ===
      animation: {
        "pulse-glow":        "pulse-glow 3s ease-in-out infinite",
        "pulse-glow-cyan":   "pulse-glow-cyan 3s ease-in-out infinite",
        "gradient-shift":    "gradient-shift 6s ease infinite",
        "float":             "float 6s ease-in-out infinite",
        "float-delayed":     "float 6s ease-in-out 2s infinite",
        "scan-line":         "scan-line 8s linear infinite",
        "blink":             "blink 1s step-end infinite",
        "spin-slow":         "spin-slow 8s linear infinite",
        "shimmer":           "shimmer 2s linear infinite",
        "drift":             "drift 8s ease-in-out infinite",
        "ripple":            "ripple 2s ease-out infinite",
        "slide-up-fade":     "slide-up-fade 0.5s ease-out forwards",
        "threat-pulse":      "threat-pulse 2s ease-in-out infinite",
        "border-rotate":     "border-rotate 4s linear infinite",
        "cursor-blink":      "cursor-blink 1s step-end infinite",
        "count-up":          "count-up 0.6s ease-out forwards",
      },

      // === Transitions ===
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
        "1200": "1200ms",
      },
      transitionTimingFunction: {
        "spring":       "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "smooth":       "cubic-bezier(0.4, 0, 0.2, 1)",
        "bounce-in":    "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        "ease-in-expo": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
        "ease-out-expo":"cubic-bezier(0.19, 1, 0.22, 1)",
      },

      // === Blur ===
      blur: {
        "xs": "2px",
        "4xl": "72px",
        "5xl": "96px",
      },

      // === Z-index scale ===
      zIndex: {
        "60": "60",
        "70": "70",
        "80": "80",
        "90": "90",
        "100": "100",
      },

      // === Max width ===
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },

      // === Aspect ratio ===
      aspectRatio: {
        "4/3": "4 / 3",
        "3/2": "3 / 2",
        "2/1": "2 / 1",
      },

      // === Screen breakpoints (matches standard + xl2) ===
      screens: {
        "3xl": "1920px",
      },
    },
  },
  plugins: [
    // Animate plugin equivalent (manual)
    function ({ addUtilities, addComponents, theme }: any) {
      // === Gradient text utility ===
      addUtilities({
        ".text-gradient-primary": {
          background: "linear-gradient(135deg, #0070F3 0%, #00D4FF 100%)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          "background-clip": "text",
        },
        ".text-gradient-accent": {
          background: "linear-gradient(135deg, #00FF88 0%, #00D4FF 100%)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          "background-clip": "text",
        },
        ".text-gradient-danger": {
          background: "linear-gradient(135deg, #FF3366 0%, #FF6B00 100%)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          "background-clip": "text",
        },
        // === Gradient borders ===
        ".border-gradient-primary": {
          border: "1px solid transparent",
          backgroundClip: "padding-box",
          position: "relative",
          "&::before": {
            content: "''",
            position: "absolute",
            inset: "-1px",
            borderRadius: "inherit",
            background: "linear-gradient(135deg, #0070F3, #00D4FF)",
            zIndex: "-1",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            "-webkit-mask-composite": "destination-out",
            "mask-composite": "exclude",
          },
        },
        // === Glass morphism ===
        ".glass": {
          background: "rgba(17, 24, 39, 0.6)",
          backdropFilter: "blur(16px)",
          "-webkit-backdrop-filter": "blur(16px)",
          border: "1px solid rgba(55, 65, 81, 0.5)",
        },
        ".glass-strong": {
          background: "rgba(17, 24, 39, 0.85)",
          backdropFilter: "blur(24px)",
          "-webkit-backdrop-filter": "blur(24px)",
          border: "1px solid rgba(55, 65, 81, 0.7)",
        },
        // === Noise overlay ===
        ".noise-overlay": {
          position: "relative",
          "&::after": {
            content: "''",
            position: "absolute",
            inset: "0",
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
            pointerEvents: "none",
            zIndex: "1",
          },
        },
        // === Scroll behavior ===
        ".scroll-smooth": { scrollBehavior: "smooth" },
        // === Truncate multiline ===
        ".line-clamp-2": { display: "-webkit-box", "-webkit-line-clamp": "2", "-webkit-box-orient": "vertical", overflow: "hidden" },
        ".line-clamp-3": { display: "-webkit-box", "-webkit-line-clamp": "3", "-webkit-box-orient": "vertical", overflow: "hidden" },
        // === Focus ring ===
        ".focus-ring": {
          "&:focus-visible": {
            outline: "2px solid #0070F3",
            outlineOffset: "2px",
            borderRadius: "4px",
          },
        },
      });

      // === Custom component classes ===
      addComponents({
        ".btn-primary": {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          padding: "0.75rem 1.75rem",
          borderRadius: "0.5rem",
          fontWeight: "600",
          fontSize: "0.9375rem",
          lineHeight: "1.5",
          color: "#FFFFFF",
          background: "linear-gradient(135deg, #0070F3 0%, #0095FF 100%)",
          boxShadow: "0 0 20px rgba(0,112,243,0.4), 0 4px 15px rgba(0,112,243,0.3)",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          cursor: "pointer",
          border: "none",
          textDecoration: "none",
          "&:hover": {
            background: "linear-gradient(135deg, #0080FF 0%, #00AAFF 100%)",
            boxShadow: "0 0 30px rgba(0,112,243,0.6), 0 8px 20px rgba(0,112,243,0.4)",
            transform: "translateY(-1px)",
          },
          "&:active": { transform: "translateY(0)" },
        },
        ".btn-secondary": {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          padding: "0.75rem 1.75rem",
          borderRadius: "0.5rem",
          fontWeight: "600",
          fontSize: "0.9375rem",
          lineHeight: "1.5",
          color: "#FFFFFF",
          background: "rgba(31, 41, 55, 0.8)",
          border: "1px solid rgba(55, 65, 81, 0.8)",
          backdropFilter: "blur(8px)",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          cursor: "pointer",
          textDecoration: "none",
          "&:hover": {
            background: "rgba(55, 65, 81, 0.8)",
            borderColor: "rgba(0,112,243,0.5)",
            boxShadow: "0 0 20px rgba(0,112,243,0.2)",
            transform: "translateY(-1px)",
          },
        },
        ".btn-ghost": {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          padding: "0.75rem 1.75rem",
          borderRadius: "0.5rem",
          fontWeight: "500",
          fontSize: "0.9375rem",
          color: "#9CA3AF",
          background: "transparent",
          border: "1px solid transparent",
          transition: "all 0.2s ease",
          cursor: "pointer",
          textDecoration: "none",
          "&:hover": {
            color: "#FFFFFF",
            background: "rgba(31, 41, 55, 0.6)",
            borderColor: "rgba(55, 65, 81, 0.6)",
          },
        },
        ".section-container": {
          maxWidth: "80rem",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          "@screen sm": { paddingLeft: "2rem", paddingRight: "2rem" },
          "@screen lg": { paddingLeft: "3rem", paddingRight: "3rem" },
        },
        ".card-base": {
          background: "#111827",
          border: "1px solid #374151",
          borderRadius: "1rem",
          padding: "1.5rem",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            borderColor: "rgba(0,112,243,0.4)",
            boxShadow: "0 20px 40px -12px rgba(0,0,0,0.6), 0 0 40px rgba(0,112,243,0.1)",
            transform: "translateY(-2px)",
          },
        },
        ".badge": {
          display: "inline-flex",
          alignItems: "center",
          gap: "0.375rem",
          padding: "0.25rem 0.75rem",
          borderRadius: "9999px",
          fontSize: "0.75rem",
          fontWeight: "600",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
        },
        ".badge-primary": {
          background: "rgba(0,112,243,0.15)",
          color: "#60A5FA",
          border: "1px solid rgba(0,112,243,0.3)",
        },
        ".badge-accent": {
          background: "rgba(0,255,136,0.1)",
          color: "#00FF88",
          border: "1px solid rgba(0,255,136,0.3)",
        },
        ".badge-warning": {
          background: "rgba(255,107,0,0.15)",
          color: "#FF6B00",
          border: "1px solid rgba(255,107,0,0.3)",
        },
        ".badge-danger": {
          background: "rgba(255,51,102,0.15)",
          color: "#FF3366",
          border: "1px solid rgba(255,51,102,0.3)",
        },
      });
    },
  ],
};

export default config;
