#!/bin/bash
###############################################################################
# ARCLANE GLOBAL — Project Scaffolder
# -----------------------------------------------------------------------------
# Project   : ARCLANE GLOBAL — Intelligent Solutions. Global Impact.
# Target IDE: Cursor / VS Code (any Node 18+ environment)
# Stack     : Next.js 14 (App Router) + React 18 + TypeScript
#             Tailwind CSS 3.4 + Framer Motion 11
#             three.js 0.164 + @react-three/fiber + @react-three/drei + postprocessing
#             gsap 3.12 · lucide-react (icons)
# Deploy    : Netlify / Vercel / Cloudflare Pages compatible
# -----------------------------------------------------------------------------
# Usage:   chmod +x setup.sh && ./setup.sh
###############################################################################

set -e

PROJECT_NAME="arclane-global"

printf "\n\033[1;35m▶  Initializing Project: %s ...\033[0m\n\n" "$PROJECT_NAME"

# 1. Create project directory & cd in
if [ -d "$PROJECT_NAME" ]; then
  echo "⚠️  Directory '$PROJECT_NAME' already exists. Aborting."
  exit 1
fi
mkdir -p "$PROJECT_NAME"
cd "$PROJECT_NAME"

# 2. package.json
echo "📦  Writing package.json ..."
cat > package.json <<'EOF'
{
  "name": "arclane-global",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev -H 0.0.0.0 -p 3000",
    "build": "next build",
    "start": "next start -H 0.0.0.0 -p 3000",
    "preview": "next start -H 0.0.0.0 -p 3000",
    "lint": "next lint"
  },
  "dependencies": {
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "next": "14.2.5",
    "three": "0.164.1",
    "@react-three/fiber": "8.16.6",
    "@react-three/drei": "9.105.6",
    "@react-three/postprocessing": "2.16.2",
    "framer-motion": "11.2.10",
    "gsap": "3.12.5",
    "lucide-react": "^0.395.0"
  },
  "devDependencies": {
    "@types/node": "20.14.2",
    "@types/react": "18.3.3",
    "@types/react-dom": "18.3.0",
    "@types/three": "0.164.0",
    "autoprefixer": "10.4.19",
    "postcss": "8.4.38",
    "tailwindcss": "3.4.4",
    "typescript": "5.4.5"
  }
}
EOF

# 3. Next.js build-tool config
echo "⚙️   Writing next.config.js ..."
cat > next.config.js <<'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  productionBrowserSourceMaps: false,
  experimental: {
    optimizePackageImports: ["framer-motion", "@react-three/drei"],
  },
  transpilePackages: ["three"],
};
module.exports = nextConfig;
EOF

echo "⚙️   Writing tsconfig.json ..."
cat > tsconfig.json <<'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": false,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF

cat > next-env.d.ts <<'EOF'
/// <reference types="next" />
/// <reference types="next/image-types/global" />
EOF

# .gitignore
echo "📝  Writing .gitignore ..."
cat > .gitignore <<'EOF'
# Dependencies
node_modules/
.pnp
.pnp.js

# Next.js
.next/
out/
build/

# Runtime
pids
*.pid
*.seed
*.pid.lock

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Env
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/
.cursor/
*.swp
.DS_Store

# PM2
.pm2/

# Misc
*.tar.gz
*.zip
*.bak
*.backup

# TypeScript
*.tsbuildinfo
next-env.d.ts
EOF

# 4. Tailwind & PostCSS
echo "🎨  Writing tailwind.config.ts ..."
cat > tailwind.config.ts <<'EOF'
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#050507",
        "bg-elevated": "#0a0a0f",
        accent: {
          DEFAULT: "#ff2d55",
          soft: "#ff4d8d",
          glow: "#ff6b9d",
          deep: "#d10037",
        },
        // Legacy compatibility — keep arc-* working for any leftover usage
        "arc-black": "#050507",
        "arc-deep": "#0a0a0f",
        "arc-red": "#ff2d55",
        "arc-pink": "#ff4d8d",
        "arc-glow": "#ff6b9d",
        "arc-white": "#ffffff",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Instrument Serif", "Times New Roman", "serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        // Display sizes
        "display-2xl": ["clamp(3.5rem, 9vw, 8rem)", { lineHeight: "0.95", letterSpacing: "-0.045em" }],
        "display-xl": ["clamp(3rem, 7vw, 6rem)", { lineHeight: "1.0", letterSpacing: "-0.04em" }],
        "display-lg": ["clamp(2.5rem, 5.5vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.035em" }],
        "display-md": ["clamp(2rem, 4vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
      },
      animation: {
        "fade-up": "fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
        "float-y": "float 6s ease-in-out infinite",
        "subtle-pulse": "subtle-pulse 2s ease-in-out infinite",
        ticker: "ticker 60s linear infinite",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "subtle-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      maxWidth: {
        wide: "1440px",
        narrow: "1140px",
      },
    },
  },
  plugins: [],
};

export default config;
EOF

echo "🎨  Writing postcss.config.js ..."
cat > postcss.config.js <<'EOF'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
EOF

# 5. Environment variables
echo "🔐  Writing .env ..."
cat > .env <<'EOF'
# ARCLANE GLOBAL — Environment Variables
NEXT_PUBLIC_APP_NAME="ARCLANE GLOBAL"
NEXT_PUBLIC_APP_VERSION="3.1.4"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_API_BASE_URL="https://api.arclane.global"
NEXT_PUBLIC_CONTACT_EMAIL="hello@arclane.global"
EOF

cat > .env.example <<'EOF'
NEXT_PUBLIC_APP_NAME="ARCLANE GLOBAL"
NEXT_PUBLIC_APP_VERSION="3.1.4"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_API_BASE_URL="https://api.arclane.global"
NEXT_PUBLIC_CONTACT_EMAIL="hello@arclane.global"
EOF

# 6. Source directories
echo "📂  Creating app/ + components/ directories ..."
mkdir -p app components public

# ============================================================
# app/ — Next.js App Router entry files
# ============================================================
echo "   ✏️  writing app/layout.tsx"
cat > 'app/layout.tsx' <<'EOF_LAYOUT_TSX_1B9B32'
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ARCLANE GLOBAL — Intelligent Solutions. Global Impact.",
  description:
    "ARCLANE GLOBAL — Engineering next-generation AI ecosystems, cloud infrastructure, and premium digital experiences. A futuristic AI operating system for the modern enterprise.",
  keywords: [
    "AI ecosystem",
    "cloud infrastructure",
    "enterprise AI",
    "ERP",
    "premium branding",
    "futuristic web development",
  ],
};

export const viewport: Viewport = {
  themeColor: "#020205",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-bg text-white antialiased">{children}</body>
    </html>
  );
}
EOF_LAYOUT_TSX_1B9B32

echo "   ✏️  writing app/page.tsx"
cat > 'app/page.tsx' <<'EOF_PAGE_TSX_807257'
"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

// Ambient WebGL background — client only, very lightweight
const Background = dynamic(() => import("@/components/Background"), {
  ssr: false,
  loading: () => null,
});

/* ----------------------------------------------------
 * Scroll progress bar
 * --------------------------------------------------*/
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, #ff2d55, #ff4d8d, rgba(255,255,255,0.6))",
        boxShadow: "0 0 12px rgba(255,45,85,0.6)",
      }}
    />
  );
}

/* ----------------------------------------------------
 * Manifesto — refreshed with new design language
 * --------------------------------------------------*/
function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  const VALUES = [
    {
      k: "Intelligent",
      v: "Every system we ship has embedded learning loops. Adaptive, predictive, self-optimising from sprint one — not bolted on as a feature.",
    },
    {
      k: "Immersive",
      v: "Cinematic interfaces and motion-led experiences that make complex products feel inevitable. Craft as a competitive moat.",
    },
    {
      k: "Enterprise",
      v: "Built for global scale — multi-region cloud, SOC 2 / ISO 27001 by default, and infrastructure that compounds with usage.",
    },
  ];

  return (
    <section
      ref={ref}
      id="manifesto"
      className="relative py-28 sm:py-32 lg:py-40 overflow-hidden"
    >
      <div className="ambient-glow ambient-glow--left" />

      <div className="container-wide px-6 lg:px-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mb-16 lg:mb-20"
        >
          <span className="pill mb-6 inline-flex">
            <span className="text-accent">◆</span>
            Manifesto
          </span>
          <h2 className="text-h1 text-display-xl gradient-text">
            We don't build software.{" "}
            <span className="font-serif italic text-white/85 font-normal">
              We architect intelligent ecosystems
            </span>{" "}
            that learn, evolve and scale at the speed of vision.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {VALUES.map((item, i) => (
            <motion.div
              key={item.k}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.08 }}
              className="glass-card p-7 lg:p-8"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="font-mono text-[10px] text-white/35 tracking-widest">
                  0{i + 1}
                </span>
                <span className="h-px w-8 bg-white/15" />
                <span className="text-xs font-medium text-accent-soft tracking-wide uppercase">
                  {item.k}
                </span>
              </div>
              <p className="text-white/65 text-[15px] leading-relaxed">
                {item.v}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------
 * Marquee — refined
 * --------------------------------------------------*/
function Marquee() {
  const items = [
    "ARCLANE GLOBAL",
    "AI ECOSYSTEMS",
    "CLOUD INFRASTRUCTURE",
    "ENTERPRISE TRANSFORMATION",
    "NEURAL INTELLIGENCE",
    "PREMIUM ENGINEERING",
    "EST. 2026",
  ];
  const loop = [...items, ...items];

  return (
    <div className="relative border-y border-white/[0.06] py-7 lg:py-8 overflow-hidden bg-bg-elevated/40 backdrop-blur-sm">
      <div className="flex ticker-track whitespace-nowrap">
        {loop.map((item, i) => (
          <div
            key={i}
            className="inline-flex items-center gap-6 lg:gap-8 px-6 lg:px-8 text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-white/90"
          >
            <span>{item}</span>
            <span className="text-accent text-xl">◆</span>
          </div>
        ))}
      </div>

      {/* Edge fades */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-bg to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-bg to-transparent pointer-events-none" />
    </div>
  );
}

/* ----------------------------------------------------
 * MAIN PAGE
 * --------------------------------------------------*/
export default function Page() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="relative min-h-screen bg-bg overflow-x-hidden">
      <ScrollProgress />
      <Navigation />

      {/* Ambient background WebGL — sits behind content (low opacity, not in hero) */}
      {mounted && <Background />}

      {/* Hero */}
      <Hero />

      {/* Manifesto / values */}
      <Manifesto />

      {/* Brand marquee */}
      <Marquee />

      {/* Services — bento + alternating deep-dives */}
      <Services />

      {/* Process / 04 phases */}
      <Process />

      {/* Stats / impact numbers */}
      <Stats />

      {/* Testimonials + logo wall */}
      <Testimonials />

      {/* FAQ accordion */}
      <FAQ />

      {/* CTA */}
      <CTASection />

      {/* Footer with newsletter */}
      <Footer />
    </main>
  );
}
EOF_PAGE_TSX_807257

echo "   ✏️  writing app/globals.css"
cat > 'app/globals.css' <<'EOF_GLOBALS_CSS_4581D8'
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400;500&display=swap");

/* ===========================================
   DESIGN TOKENS
   =========================================== */
:root {
  /* Surfaces */
  --bg: #050507;
  --bg-elevated: #0a0a0f;
  --bg-overlay: rgba(10, 10, 15, 0.7);

  /* Text */
  --text-primary: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --text-muted: rgba(255, 255, 255, 0.45);
  --text-subtle: rgba(255, 255, 255, 0.3);

  /* Accent */
  --accent: #ff2d55;
  --accent-soft: #ff4d8d;
  --accent-glow: #ff6b9d;
  --accent-deep: #d10037;

  /* Borders */
  --border: rgba(255, 255, 255, 0.08);
  --border-strong: rgba(255, 255, 255, 0.16);

  /* Spacing scale (used via Tailwind too) */
  --section-y: 7rem;

  /* Shadows */
  --shadow-glow: 0 0 80px rgba(255, 45, 85, 0.25);
}

/* ===========================================
   BASE
   =========================================== */
* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

html,
body {
  margin: 0;
  padding: 0;
  background: var(--bg);
  color: var(--text-primary);
  font-family: "Inter", system-ui, -apple-system, sans-serif;
  font-feature-settings: "ss01", "cv11";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  overflow-x: hidden;
}

::selection {
  background: rgba(255, 45, 85, 0.4);
  color: #fff;
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 45, 85, 0.4);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 45, 85, 0.7);
}

/* ===========================================
   TYPOGRAPHY
   =========================================== */
.font-serif {
  font-family: "Instrument Serif", "Times New Roman", serif;
  font-weight: 400;
  letter-spacing: -0.01em;
}

.font-mono {
  font-family: "JetBrains Mono", monospace;
}

/* Display text (giant hero) */
.text-display {
  font-family: "Inter", sans-serif;
  font-weight: 500;
  letter-spacing: -0.045em;
  line-height: 0.95;
}

/* Section headings */
.text-h1 {
  font-family: "Inter", sans-serif;
  font-weight: 500;
  letter-spacing: -0.035em;
  line-height: 1.0;
}

.text-h2 {
  font-family: "Inter", sans-serif;
  font-weight: 500;
  letter-spacing: -0.025em;
  line-height: 1.1;
}

/* Eyebrow / kicker */
.eyebrow {
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.eyebrow-accent {
  color: var(--accent);
}

/* Holographic gradient text — refined */
.gradient-text {
  background: linear-gradient(
    180deg,
    #ffffff 0%,
    #ffffff 60%,
    rgba(255, 255, 255, 0.4) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.gradient-accent {
  background: linear-gradient(135deg, #ffffff 0%, #ff6b9d 50%, #ff2d55 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* ===========================================
   LAYOUT UTILITIES
   =========================================== */
.container-wide {
  max-width: 1440px;
  margin-inline: auto;
  padding-inline: clamp(1.5rem, 5vw, 4rem);
}

.container-narrow {
  max-width: 1140px;
  margin-inline: auto;
  padding-inline: clamp(1.5rem, 5vw, 4rem);
}

.section-y {
  padding-block: clamp(4rem, 10vw, 9rem);
}

/* ===========================================
   GLASS SURFACES (refined hierarchy)
   =========================================== */
.glass {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.04) 0%,
    rgba(255, 255, 255, 0.015) 100%
  );
  backdrop-filter: blur(20px) saturate(160%);
  -webkit-backdrop-filter: blur(20px) saturate(160%);
  border: 1px solid var(--border);
  border-radius: 16px;
}

.glass-strong {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.06) 0%,
    rgba(255, 255, 255, 0.02) 100%
  );
  backdrop-filter: blur(32px) saturate(200%);
  -webkit-backdrop-filter: blur(32px) saturate(200%);
  border: 1px solid var(--border-strong);
  border-radius: 20px;
}

.glass-card {
  position: relative;
  background: rgba(255, 255, 255, 0.025);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--border);
  border-radius: 20px;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.glass-card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(255, 255, 255, 0.04) 30%,
    rgba(255, 255, 255, 0) 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.glass-card:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

/* ===========================================
   BUTTONS — Refined
   =========================================== */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  padding: 0.75rem 1.5rem;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.01em;
  border-radius: 999px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  white-space: nowrap;
  border: 1px solid transparent;
  position: relative;
  overflow: hidden;
}

.btn-primary {
  background: linear-gradient(135deg, #ff2d55 0%, #ff4d8d 100%);
  color: #ffffff;
  box-shadow: 0 0 0 1px rgba(255, 45, 85, 0.4),
    0 8px 32px -8px rgba(255, 45, 85, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.25);
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 0 0 1px rgba(255, 45, 85, 0.6),
    0 12px 40px -8px rgba(255, 45, 85, 0.7),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.btn-primary::after {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.25),
    transparent
  );
  transition: left 0.6s ease;
}

.btn-primary:hover::after {
  left: 100%;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.04);
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(20px);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.25);
}

.btn-ghost {
  background: transparent;
  color: rgba(255, 255, 255, 0.7);
  border-color: transparent;
}

.btn-ghost:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.04);
}

/* Pill badge */
.pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.875rem;
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  backdrop-filter: blur(20px);
}

.pill-accent {
  background: rgba(255, 45, 85, 0.08);
  border-color: rgba(255, 45, 85, 0.25);
  color: #ff6b9d;
}

/* ===========================================
   DECORATIVE
   =========================================== */
.glow-red {
  text-shadow: 0 0 30px rgba(255, 45, 85, 0.5);
}

.grid-bg {
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.025) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
  background-size: 80px 80px;
  background-position: center center;
  mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  -webkit-mask-image: radial-gradient(
    ellipse at center,
    black 0%,
    transparent 70%
  );
}

.noise {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E");
  opacity: 0.04;
  pointer-events: none;
  mix-blend-mode: overlay;
}

.divider {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.12),
    transparent
  );
}

.divider-accent {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 45, 85, 0.4),
    transparent
  );
}

/* Ambient glow utility */
.ambient-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
  width: 540px;
  height: 540px;
  opacity: 0.5;
  background: radial-gradient(
    circle,
    rgba(255, 45, 85, 0.22) 0%,
    rgba(255, 77, 141, 0.08) 40%,
    transparent 70%
  );
  z-index: 0;
}

.ambient-glow--left {
  top: 10%;
  left: -160px;
}

.ambient-glow--right {
  top: 20%;
  right: -160px;
}

.ambient-glow--center {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 720px;
  height: 720px;
  opacity: 0.4;
}

/* Ticker animation */
@keyframes ticker {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.ticker-track {
  animation: ticker 60s linear infinite;
  display: flex;
  width: max-content;
}

/* Subtle pulse */
@keyframes subtle-pulse {
  0%,
  100% {
    opacity: 0.4;
  }
  50% {
    opacity: 1;
  }
}

.live-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ff2d55;
  box-shadow: 0 0 12px rgba(255, 45, 85, 0.8);
  animation: subtle-pulse 2s ease-in-out infinite;
}

/* Number — tabular */
.tabular {
  font-feature-settings: "tnum", "ss01";
  font-variant-numeric: tabular-nums;
}

/* Hide scrollbar but keep functionality */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  scrollbar-width: none;
}

/* ===========================================
   ANIMATIONS
   =========================================== */
@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(12px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-up {
  animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

.float-y {
  animation: float 6s ease-in-out infinite;
}

/* ===========================================
   MOBILE
   =========================================== */
@media (max-width: 768px) {
  :root {
    --section-y: 4.5rem;
  }
}
EOF_GLOBALS_CSS_4581D8

echo "   ✏️  writing app/icon.svg"
cat > 'app/icon.svg' <<'EOF_ICON_SVG'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ff1744"/>
      <stop offset="1" stop-color="#ff4d8d"/>
    </linearGradient>
  </defs>
  <rect width="32" height="32" rx="6" fill="#020205"/>
  <rect x="2" y="2" width="28" height="28" rx="5" fill="url(#g)"/>
  <text x="16" y="22" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="16" fill="#020205">A</text>
</svg>

EOF_ICON_SVG

# ============================================================
# components/ — All UI / 3D / sections
# ============================================================
echo "   ✏️  writing components/Background.tsx"
cat > 'components/Background.tsx' <<'EOF_BACKGROUND_TSX_3A3E3D'
"use client";

import { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ----------------------------------------------------
 * Drifting particle nebula for non-hero sections
 * --------------------------------------------------*/
function Nebula({ count = 600 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const c1 = new THREE.Color("#ff1744");
    const c2 = new THREE.Color("#ff4d8d");
    const c3 = new THREE.Color("#ffffff");
    const c4 = new THREE.Color("#ff6b9d");

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12 - 2;

      const pick = Math.random();
      const color =
        pick < 0.3 ? c1 : pick < 0.55 ? c2 : pick < 0.8 ? c4 : c3;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 0.04 + 0.01;
    }
    return { positions, colors, sizes };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    pointsRef.current.rotation.y = t * 0.015;
    pointsRef.current.rotation.x = Math.sin(t * 0.05) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={colors.length / 3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ----------------------------------------------------
 * Slow rotating wireframe planes (neural network feel)
 * --------------------------------------------------*/
function NeuralLattice() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.z = t * 0.04;
    groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.15;
  });

  return (
    <group ref={groupRef} position={[0, 0, -3]}>
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          rotation={[
            (i * Math.PI) / 4,
            (i * Math.PI) / 3,
            (i * Math.PI) / 5,
          ]}
        >
          <torusGeometry args={[6 + i * 0.8, 0.005, 8, 80]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? "#ff1744" : "#ff4d8d"}
            transparent
            opacity={0.15 - i * 0.02}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ----------------------------------------------------
 * Background canvas — lightweight, ambient
 * --------------------------------------------------*/
export default function Background() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "low-power",
      }}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <Nebula count={500} />
        <NeuralLattice />
      </Suspense>
    </Canvas>
  );
}
EOF_BACKGROUND_TSX_3A3E3D

echo "   ✏️  writing components/CTASection.tsx"
cat > 'components/CTASection.tsx' <<'EOF_CTASECTION_TSX_4FCF60'
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ----------------------------------------------------
 * CTA — closing conversion block
 * -------------------------------------------------- */

const INFO = [
  {
    label: "Email",
    value: "hello@arclane.global",
    href: "mailto:hello@arclane.global",
  },
  {
    label: "Response window",
    value: "Within 4 business hours",
    href: null,
  },
  {
    label: "Timezone coverage",
    value: "Follow-the-sun · 3 hubs",
    href: null,
  },
];

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section
      id="contact"
      className="relative py-28 sm:py-32 lg:py-40 overflow-hidden"
    >
      <div className="ambient-glow ambient-glow--center" />

      <div className="container-narrow px-6 lg:px-10 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Outer glow */}
          <div
            className="absolute -inset-6 sm:-inset-10 rounded-[2.5rem] pointer-events-none opacity-60"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 50%, rgba(255,45,85,0.18), transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          {/* Main panel */}
          <div className="relative glass-strong rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-12 lg:p-16 overflow-hidden">
            {/* Decorative grid */}
            <div
              className="absolute inset-0 opacity-[0.06] pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
                maskImage:
                  "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 75%)",
              }}
            />

            <div className="relative">
              {/* Eyebrow */}
              <div className="flex items-center justify-center gap-3 mb-8">
                <span className="pill">
                  <span className="live-dot" />
                  Now booking Q3 cohorts
                </span>
              </div>

              {/* Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.15 }}
                className="text-h1 text-display-xl gradient-text text-center mb-6"
              >
                Build the future{" "}
                <span className="font-serif italic text-white/85 font-normal">
                  with us.
                </span>
              </motion.h2>

              {/* Sub */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.25 }}
                className="text-white/55 text-lg sm:text-xl text-center max-w-2xl mx-auto leading-relaxed mb-10"
              >
                Tell us what you're trying to ship. We'll respond with a tailored
                proposal — usually inside the same business day.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.35 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14"
              >
                <a
                  href="mailto:hello@arclane.global"
                  className="btn btn-primary text-base px-7 py-3.5"
                >
                  Start a project
                  <span aria-hidden>→</span>
                </a>
                <a
                  href="#process"
                  className="btn btn-secondary text-base px-7 py-3.5"
                >
                  See the process
                </a>
              </motion.div>

              {/* Info row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.9, delay: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06]"
              >
                {INFO.map((item) => (
                  <div
                    key={item.label}
                    className="bg-bg-elevated/60 backdrop-blur-xl px-6 py-5 text-center"
                  >
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-mono mb-2">
                      {item.label}
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-white text-sm sm:text-base font-medium hover:text-accent transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-white text-sm sm:text-base font-medium">
                        {item.value}
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
EOF_CTASECTION_TSX_4FCF60

echo "   ✏️  writing components/FAQ.tsx"
cat > 'components/FAQ.tsx' <<'EOF_FAQ_TSX_BA1DB6'
"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ----------------------------------------------------
 * FAQ — Common enterprise objections, answered
 * Accordion with single-open behaviour
 * -------------------------------------------------- */

const FAQS = [
  {
    q: "How does engagement typically start?",
    a: "We begin with a 30-minute discovery call followed by a paid 2-week sprint zero. By the end of week two you have a product brief, design system v1, technical RFC and a fixed-scope SOW for the first production release.",
  },
  {
    q: "What does pricing look like at the engagement level?",
    a: "Most projects are sprint-priced (fortnightly fixed fee per pod) rather than billed by the hour. A typical pod runs $42–68K USD per fortnight. We also offer outcome-based retainers for long-running platform work.",
  },
  {
    q: "Do you work as an embedded team or as a vendor?",
    a: "Embedded by default. Your designers, engineers and PMs sit in your Slack, your standups and your repos. We've found this is the only reliable way to ship at the velocity our clients hire us for.",
  },
  {
    q: "What stack do you build on?",
    a: "TypeScript everywhere — Next.js / React on the front, Node / Bun / Hono on the edge, Postgres + Redis + a vector store on the data layer. For AI we ship on OpenAI, Anthropic, and self-hosted Llama depending on the privacy posture.",
  },
  {
    q: "Who owns the IP and the code?",
    a: "You do. Always. Source, designs, models, prompts — everything we produce is yours under a perpetual, royalty-free license from sprint one. No lock-in, no licensing games.",
  },
  {
    q: "How do you handle security and compliance?",
    a: "SOC 2 Type II, ISO 27001 and GDPR/HIPAA-ready engagements are standard. We can sign your MSA, DPA and BAA on day one and ship through your VPC if required.",
  },
];

function FAQItem({
  item,
  open,
  onToggle,
  i,
}: {
  item: { q: string; a: string };
  open: boolean;
  onToggle: () => void;
  i: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: i * 0.05 }}
      className="border-b border-white/[0.06] last:border-b-0"
    >
      <button
        onClick={onToggle}
        className="w-full text-left py-6 flex items-start justify-between gap-6 group"
        aria-expanded={open}
      >
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <span className="font-mono text-xs text-white/35 pt-1 shrink-0">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="text-lg sm:text-xl font-medium text-white group-hover:text-accent-soft transition-colors">
            {item.q}
          </span>
        </div>
        <span
          className={`shrink-0 mt-1 h-7 w-7 rounded-full grid place-items-center border border-white/15 transition-all ${
            open ? "bg-accent border-accent rotate-45" : "bg-white/[0.02]"
          }`}
          aria-hidden
        >
          <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none">
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="text-white"
            />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 pl-10 pr-12 text-white/60 text-[15px] leading-relaxed">
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section
      id="faq"
      className="relative py-28 sm:py-32 lg:py-36 overflow-hidden"
    >
      <div className="container-narrow px-6 lg:px-10 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-12 gap-10 mb-14 lg:mb-16"
        >
          <div className="lg:col-span-5">
            <span className="pill mb-6 inline-flex">
              <span className="text-accent">◆</span>
              FAQ
            </span>
            <h2 className="text-h1 text-display-lg gradient-text">
              The questions{" "}
              <span className="font-serif italic text-white/85 font-normal">
                every CTO
              </span>{" "}
              asks us.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 self-end">
            <p className="text-white/55 text-lg leading-relaxed">
              Six things we explain on every introductory call. If something
              else is on your mind, write to us — we'll get back inside the same
              business day.
            </p>
          </div>
        </motion.div>

        {/* Accordion */}
        <div className="glass-card px-6 sm:px-8">
          {FAQS.map((item, i) => (
            <FAQItem
              key={item.q}
              item={item}
              open={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
              i={i}
            />
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 text-sm">
          <div className="text-white/50">
            Can't find what you're looking for?
          </div>
          <a href="mailto:hello@arclane.global" className="btn btn-ghost">
            Email the team
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
EOF_FAQ_TSX_BA1DB6

echo "   ✏️  writing components/FloatingObjects.tsx"
cat > 'components/FloatingObjects.tsx' <<'EOF_FLOATINGOBJECTS_TSX_BFA872'
"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Float,
  MeshTransmissionMaterial,
  Trail,
  Sphere,
  Torus,
  Icosahedron,
  Octahedron,
} from "@react-three/drei";
import * as THREE from "three";

/* ----------------------------------------------------
 * Single floating glass cube
 * --------------------------------------------------*/
function GlassCube({
  position,
  scale = 1,
  speed = 1,
  color = "#ff1744",
}: {
  position: [number, number, number];
  scale?: number;
  speed?: number;
  color?: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x += 0.003 * speed;
    meshRef.current.rotation.y += 0.004 * speed;
    meshRef.current.position.y =
      position[1] + Math.sin(t * 0.6 * speed) * 0.3;
    meshRef.current.position.x =
      position[0] + Math.cos(t * 0.4 * speed) * 0.2;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <MeshTransmissionMaterial
        thickness={0.6}
        roughness={0.1}
        transmission={1}
        ior={1.3}
        chromaticAberration={0.04}
        backside
        color={color}
        attenuationColor="#ff4d8d"
        attenuationDistance={1.5}
      />
    </mesh>
  );
}

/* ----------------------------------------------------
 * Transparent rotating sphere
 * --------------------------------------------------*/
function GlassSphere({
  position,
  radius = 1,
  speed = 1,
}: {
  position: [number, number, number];
  radius?: number;
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.y += 0.002 * speed;
    meshRef.current.position.y =
      position[1] + Math.sin(t * 0.5 * speed) * 0.4;
  });

  return (
    <Sphere ref={meshRef} args={[radius, 64, 64]} position={position}>
      <MeshTransmissionMaterial
        thickness={1.2}
        roughness={0.05}
        transmission={1}
        ior={1.4}
        chromaticAberration={0.06}
        backside
        color="#ffffff"
        attenuationColor="#ff1744"
        attenuationDistance={2}
      />
    </Sphere>
  );
}

/* ----------------------------------------------------
 * Holographic Ring System (multiple energy rings)
 * --------------------------------------------------*/
function HolographicRings({
  position,
}: {
  position: [number, number, number];
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.z = t * 0.15;
    groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.3;
    groupRef.current.rotation.y = t * 0.1;
  });

  return (
    <group ref={groupRef} position={position}>
      <Torus args={[1.6, 0.015, 16, 100]}>
        <meshBasicMaterial color="#ff1744" transparent opacity={0.7} />
      </Torus>
      <Torus args={[2.0, 0.012, 16, 100]} rotation={[Math.PI / 3, 0, 0]}>
        <meshBasicMaterial color="#ff4d8d" transparent opacity={0.5} />
      </Torus>
      <Torus
        args={[2.4, 0.01, 16, 100]}
        rotation={[Math.PI / 2, Math.PI / 4, 0]}
      >
        <meshBasicMaterial color="#ff6b9d" transparent opacity={0.4} />
      </Torus>
      <Torus
        args={[2.8, 0.008, 16, 100]}
        rotation={[Math.PI / 5, Math.PI / 3, 0]}
      >
        <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
      </Torus>
    </group>
  );
}

/* ----------------------------------------------------
 * Central AI Core (icosahedron with inner glow)
 * --------------------------------------------------*/
function AICore({ position }: { position: [number, number, number] }) {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (outerRef.current) {
      outerRef.current.rotation.x = t * 0.15;
      outerRef.current.rotation.y = t * 0.1;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.3;
      innerRef.current.rotation.y = -t * 0.25;
      const pulse = 1 + Math.sin(t * 2) * 0.05;
      innerRef.current.scale.setScalar(pulse);
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = -t * 0.2;
      wireRef.current.rotation.z = t * 0.15;
    }
  });

  return (
    <group position={position}>
      {/* Outer glass shell */}
      <Icosahedron ref={outerRef} args={[1.4, 1]}>
        <MeshTransmissionMaterial
          thickness={0.5}
          roughness={0.05}
          transmission={1}
          ior={1.5}
          chromaticAberration={0.08}
          backside
          color="#ffffff"
          attenuationColor="#ff1744"
          attenuationDistance={1}
        />
      </Icosahedron>

      {/* Wireframe layer */}
      <Icosahedron ref={wireRef} args={[1.55, 2]}>
        <meshBasicMaterial
          color="#ff4d8d"
          wireframe
          transparent
          opacity={0.4}
        />
      </Icosahedron>

      {/* Inner glowing core */}
      <Icosahedron ref={innerRef} args={[0.6, 0]}>
        <meshStandardMaterial
          color="#ff1744"
          emissive="#ff1744"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </Icosahedron>

      {/* Point light from core */}
      <pointLight color="#ff1744" intensity={3} distance={8} decay={2} />
    </group>
  );
}

/* ----------------------------------------------------
 * Particle field (small floating points)
 * --------------------------------------------------*/
function ParticleField({ count = 250 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const c1 = new THREE.Color("#ff1744");
    const c2 = new THREE.Color("#ff4d8d");
    const c3 = new THREE.Color("#ffffff");
    for (let i = 0; i < count; i++) {
      // Spherical distribution — tighter for contained hero frame
      const r = 3.5 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const pick = Math.random();
      const color = pick < 0.4 ? c1 : pick < 0.75 ? c2 : c3;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    pointsRef.current.rotation.y = t * 0.02;
    pointsRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={colors.length / 3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ----------------------------------------------------
 * Orbiting trail particles around the core
 * --------------------------------------------------*/
function OrbitingTrails() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <OrbitingDot key={i} index={i} />
      ))}
    </>
  );
}

function OrbitingDot({ index }: { index: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const radius = 2.6 + index * 0.3;
  const speed = 0.6 - index * 0.1;
  const offset = (index * Math.PI * 2) / 3;

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + offset;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = Math.sin(t * 1.5) * 0.6;
  });

  return (
    <Trail
      width={0.5}
      length={5}
      color={index === 0 ? "#ff1744" : index === 1 ? "#ff4d8d" : "#ffffff"}
      attenuation={(t) => t * t}
    >
      <mesh ref={ref}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial
          color={index === 0 ? "#ff1744" : index === 1 ? "#ff4d8d" : "#ffffff"}
          toneMapped={false}
        />
      </mesh>
    </Trail>
  );
}

/* ----------------------------------------------------
 * Floating wireframe octahedron
 * --------------------------------------------------*/
function WireframeShape({
  position,
  size = 0.8,
  color = "#ff4d8d",
}: {
  position: [number, number, number];
  size?: number;
  color?: string;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = t * 0.2;
    ref.current.rotation.y = t * 0.3;
    ref.current.position.y = position[1] + Math.sin(t * 0.7) * 0.3;
  });

  return (
    <Octahedron ref={ref} args={[size, 0]} position={position}>
      <meshBasicMaterial color={color} wireframe transparent opacity={0.6} />
    </Octahedron>
  );
}

/* ----------------------------------------------------
 * Master export — combines all floating objects
 * Tuned to fit within the hero's RIGHT column (smaller frame)
 * --------------------------------------------------*/
export default function FloatingObjects() {
  return (
    <>
      {/* Central AI Core (the hero of the hero) */}
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.5}>
        <AICore position={[0, 0, 0]} />
      </Float>

      {/* Holographic Rings around core */}
      <HolographicRings position={[0, 0, 0]} />

      {/* Orbiting trails */}
      <OrbitingTrails />

      {/* Glass cubes — tighter positions, smaller, closer to center */}
      <Float speed={1} rotationIntensity={0.4} floatIntensity={0.6}>
        <GlassCube position={[-2.5, 1.2, -1]} scale={0.45} color="#ff1744" />
      </Float>
      <Float speed={1.3} rotationIntensity={0.5} floatIntensity={0.6}>
        <GlassCube position={[2.8, -0.8, -0.5]} scale={0.55} color="#ff4d8d" />
      </Float>
      <Float speed={0.9} rotationIntensity={0.4} floatIntensity={0.7}>
        <GlassCube position={[-2.2, -1.6, 0.5]} scale={0.35} color="#ffffff" />
      </Float>

      {/* Glass spheres — small accent orbs */}
      <Float speed={1.1} rotationIntensity={0.2} floatIntensity={0.4}>
        <GlassSphere position={[2.4, 1.6, -1.5]} radius={0.32} />
      </Float>
      <Float speed={0.8} rotationIntensity={0.3} floatIntensity={0.5}>
        <GlassSphere position={[-2.8, 0.2, 0.5]} radius={0.25} />
      </Float>

      {/* Wireframe accents */}
      <WireframeShape position={[-1.5, 2, 1.5]} size={0.3} color="#ff4d8d" />
      <WireframeShape position={[1.8, -2, 1]} size={0.35} color="#ff6b9d" />
      <WireframeShape position={[2, 2.4, -2]} size={0.25} color="#ffffff" />

      {/* Particle field (smaller, denser around center) */}
      <ParticleField count={200} />
    </>
  );
}
EOF_FLOATINGOBJECTS_TSX_BFA872

echo "   ✏️  writing components/Footer.tsx"
cat > 'components/Footer.tsx' <<'EOF_FOOTER_TSX_DC14B2'
"use client";

import { useState } from "react";

/* ----------------------------------------------------
 * Footer — info architecture + newsletter
 * -------------------------------------------------- */

const COLS = [
  {
    title: "Services",
    links: [
      { label: "Brand systems", href: "#services" },
      { label: "Web platforms", href: "#services" },
      { label: "Native apps", href: "#services" },
      { label: "AI engineering", href: "#services" },
      { label: "ERP suite", href: "#services" },
      { label: "Cloud infrastructure", href: "#services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Process", href: "#process" },
      { label: "Work", href: "#work" },
      { label: "FAQ", href: "#faq" },
      { label: "Careers", href: "#" },
      { label: "Press kit", href: "#" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "hello@arclane.global", href: "mailto:hello@arclane.global" },
      { label: "Book a call", href: "#contact" },
      { label: "Partnership", href: "mailto:partners@arclane.global" },
      { label: "Support", href: "mailto:support@arclane.global" },
    ],
  },
];

const SOCIALS = [
  { label: "LinkedIn", href: "#" },
  { label: "X / Twitter", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "Dribbble", href: "#" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setEmail("");
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <footer className="relative pt-24 lg:pt-28 pb-10 overflow-hidden border-t border-white/[0.06]">
      <div className="container-wide px-6 lg:px-10 relative z-10">
        {/* Top: brand + newsletter */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-16 lg:mb-20">
          {/* Brand block */}
          <div className="lg:col-span-5">
            <a
              href="#"
              className="inline-flex items-center gap-2.5 mb-6 group"
            >
              <span className="relative inline-grid place-items-center h-9 w-9 rounded-xl bg-gradient-to-br from-accent to-accent-soft shadow-lg shadow-accent/30">
                <span className="text-white font-bold text-sm">A</span>
                <span className="absolute inset-0 rounded-xl ring-1 ring-white/20" />
              </span>
              <span className="text-xl font-medium tracking-tight text-white">
                ARCLANE<span className="text-accent">.</span>
              </span>
            </a>
            <p className="text-white/55 text-base leading-relaxed max-w-md mb-8">
              An intelligence-first studio building the operating systems for
              tomorrow's category leaders. Independent. Global. Relentlessly
              shipping.
            </p>

            {/* Newsletter */}
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-mono mb-3">
                The Briefing · Monthly
              </div>
              <form
                onSubmit={submit}
                className="flex flex-col sm:flex-row gap-2 max-w-md"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="flex-1 bg-white/[0.03] border border-white/[0.08] rounded-full px-5 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-accent/40 focus:bg-white/[0.05] transition-all"
                  required
                />
                <button
                  type="submit"
                  className="btn btn-primary text-sm px-5 py-3 whitespace-nowrap"
                >
                  {sent ? "Subscribed ✓" : "Subscribe"}
                </button>
              </form>
              <div className="mt-3 text-xs text-white/35">
                One letter a month. Engineering, design and AI from the field.
                Unsubscribe anytime.
              </div>
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-10">
            {COLS.map((col) => (
              <div key={col.title}>
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-mono mb-4">
                  {col.title}
                </div>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm text-white/70 hover:text-white transition-colors"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Big wordmark */}
        <div className="relative mb-10 lg:mb-14 select-none pointer-events-none">
          <div
            className="text-[20vw] lg:text-[16vw] font-medium tracking-tighter leading-[0.85] text-transparent text-center"
            style={{
              WebkitTextStroke: "1px rgba(255,255,255,0.08)",
            }}
          >
            ARCLANE
          </div>
        </div>

        {/* Bottom strip */}
        <div className="flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between pt-8 border-t border-white/[0.06]">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/45">
            <span>© {new Date().getFullYear()} ARCLANE GLOBAL</span>
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Security
            </a>
            <span className="flex items-center gap-2">
              <span className="live-dot" />
              All systems operational
            </span>
          </div>

          <div className="flex items-center gap-5">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="text-xs text-white/50 hover:text-accent transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
EOF_FOOTER_TSX_DC14B2

echo "   ✏️  writing components/GlassCard.tsx"
cat > 'components/GlassCard.tsx' <<'EOF_GLASSCARD_TSX_4AF71B'
"use client";

import { useRef, useState, ReactNode, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  intensity?: number;
  enableTilt?: boolean;
  /* If true, card grows slightly on hover (default true) */
  enableLift?: boolean;
}

/**
 * Advanced glassmorphism card with:
 *  - frosted backdrop blur
 *  - holographic edge glow
 *  - mouse-tracked light reflection
 *  - 3D tilt on hover
 *  - animated scan line
 */
export default function GlassCard({
  children,
  className = "",
  glowColor = "#ff1744",
  intensity = 1,
  enableTilt = true,
  enableLift = true,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position tracked for reflection + tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smoothed values
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  // 3D tilt
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);

  // Reflection position
  const reflectionX = useTransform(smoothX, [-0.5, 0.5], ["0%", "100%"]);
  const reflectionY = useTransform(smoothY, [-0.5, 0.5], ["0%", "100%"]);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative group ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: enableTilt ? rotateX : 0,
        rotateY: enableTilt ? rotateY : 0,
        transformStyle: "preserve-3d",
        perspective: 1200,
      }}
      whileHover={enableLift ? { y: -4, scale: 1.01 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Outer holographic glow halo */}
      <div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${reflectionX.get()} ${reflectionY.get()}, ${glowColor}55, transparent 40%)`,
          filter: "blur(20px)",
        }}
      />

      {/* The glass card itself */}
      <div
        className="relative rounded-2xl overflow-hidden h-full"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: isHovered
            ? `0 20px 60px rgba(0,0,0,0.4), 0 0 60px ${glowColor}33, inset 0 0 30px rgba(255,255,255,0.03)`
            : `0 12px 40px rgba(0,0,0,0.3), inset 0 0 20px rgba(255,255,255,0.02)`,
          transition: "box-shadow 0.5s ease",
        }}
      >
        {/* Mouse-tracked reflection */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: useTransform(
              [smoothX, smoothY] as any,
              ([x, y]: number[]) =>
                `radial-gradient(400px circle at ${(x + 0.5) * 100}% ${
                  (y + 0.5) * 100
                }%, rgba(255,255,255,0.12), transparent 50%)`
            ),
          }}
        />

        {/* Top edge highlight */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
          }}
        />

        {/* Side neon edges (visible on hover) */}
        <div
          className="absolute left-0 top-0 bottom-0 w-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `linear-gradient(180deg, transparent, ${glowColor}, transparent)`,
            boxShadow: `0 0 10px ${glowColor}`,
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `linear-gradient(180deg, transparent, ${glowColor}, transparent)`,
            boxShadow: `0 0 10px ${glowColor}`,
          }}
        />

        {/* Animated scan line on hover */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ mixBlendMode: "screen" }}
        >
          <div
            className="absolute left-0 right-0 h-[2px] animate-scan-line"
            style={{
              background: `linear-gradient(90deg, transparent, ${glowColor}, transparent)`,
              boxShadow: `0 0 12px ${glowColor}`,
            }}
          />
        </div>

        {/* Holographic dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle, ${glowColor} 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />

        {/* Content */}
        <div className="relative z-10 h-full" style={{ transform: "translateZ(20px)" }}>
          {children}
        </div>
      </div>
    </motion.div>
  );
}
EOF_GLASSCARD_TSX_4AF71B

echo "   ✏️  writing components/Hero.tsx"
cat > 'components/Hero.tsx' <<'EOF_HERO_TSX_28B4A5'
"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border border-accent/30 border-t-accent animate-spin" />
    </div>
  ),
});

const TRUST_LOGOS = ["Helix", "Aurora", "Nimbus", "Obsidian", "Vanta", "Zenith"];

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div
        className="ambient-glow top-[10%] right-[-10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,45,85,0.18) 0%, transparent 60%)",
        }}
      />
      <div
        className="ambient-glow bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,77,141,0.10) 0%, transparent 60%)",
        }}
      />
      <div className="noise" />

      <div className="container-wide relative">
        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center mb-10"
        >
          <div className="pill pill-accent">
            <span className="live-dot" />
            <span>AI ecosystem · v3.1.4 · live</span>
          </div>
        </motion.div>

        {/* Hero text — centered, balanced */}
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-display text-display-2xl mb-8 gradient-text"
          >
            Intelligent solutions.
            <br />
            <span className="font-serif italic font-normal text-white/90">
              Global impact.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl mx-auto mb-12"
          >
            We engineer next-generation AI ecosystems, hyperscale cloud
            infrastructure, and premium digital experiences for enterprises
            ready to define the next decade.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <a href="#contact" className="btn btn-primary px-7 py-3.5">
              Launch your ecosystem
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path
                  d="M5 3l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a href="#services" className="btn btn-secondary px-7 py-3.5">
              Explore capabilities
            </a>
          </motion.div>
        </div>

        {/* 3D scene panel — contained below text, NOT overlapping */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 lg:mt-24 relative"
        >
          {/* Hero visual frame */}
          <div className="relative mx-auto max-w-5xl aspect-[16/10] sm:aspect-[16/9] lg:aspect-[2/1] rounded-3xl overflow-hidden glass-strong">
            {/* The 3D scene */}
            <div className="absolute inset-0">
              <Scene />
            </div>

            {/* HUD overlays on the scene */}
            <div className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg/60 backdrop-blur-md border border-white/10">
              <span className="live-dot" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/80">
                Neural.core / online
              </span>
            </div>

            <div className="absolute top-5 right-5 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-bg/60 backdrop-blur-md border border-white/10">
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/60">
                v3.1.4
              </span>
            </div>

            <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg/60 backdrop-blur-md border border-white/10">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/60">
                  Powered by Arclane OS
                </span>
              </div>

              {/* Mini stats inside the hero card */}
              <div className="hidden sm:flex items-center gap-5">
                {[
                  { v: "240+", k: "Clients" },
                  { v: "1.4K", k: "Models" },
                  { v: "99.99%", k: "Uptime" },
                ].map((s) => (
                  <div key={s.k} className="text-right">
                    <div className="text-base font-medium text-white tabular leading-none">
                      {s.v}
                    </div>
                    <div className="text-[9px] font-mono uppercase tracking-widest text-white/40 mt-1">
                      {s.k}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subtle scan line gradient overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, transparent 70%, rgba(0,0,0,0.4) 100%)",
              }}
            />
          </div>

          {/* Floating glow behind card */}
          <div
            className="absolute inset-x-10 -bottom-10 h-32 -z-10 opacity-60"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(255,45,85,0.4) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
        </motion.div>

        {/* Trusted by row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-20 lg:mt-24"
        >
          <p className="text-center text-[11px] font-mono uppercase tracking-[0.25em] text-white/40 mb-6">
            Trusted by industry leaders
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-60">
            {TRUST_LOGOS.map((logo) => (
              <span
                key={logo}
                className="text-lg font-serif italic text-white/50 hover:text-white/90 transition-colors cursor-default"
              >
                {logo}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-white/30"
      >
        <span>Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </section>
  );
}
EOF_HERO_TSX_28B4A5

echo "   ✏️  writing components/LiquidGlass.tsx"
cat > 'components/LiquidGlass.tsx' <<'EOF_LIQUIDGLASS_TSX_65CA19'
"use client";

import { ReactNode, useRef, useState, MouseEvent } from "react";
import { motion } from "framer-motion";

interface LiquidGlassProps {
  children: ReactNode;
  className?: string;
  rounded?: string;
  intensity?: "light" | "medium" | "strong";
  border?: boolean;
  hoverable?: boolean;
}

/**
 * Apple-style Liquid Glass surface
 * (lightweight version — no framer-motion useTransform arrays)
 *
 *  - True backdrop blur with high saturation
 *  - Inner refraction via layered gradients
 *  - CSS-variable based specular highlight that follows the cursor
 *  - Soft inner shadow + bright top edge ("light entry")
 *  - Optional 3D parallax on hover
 */
export default function LiquidGlass({
  children,
  className = "",
  rounded = "rounded-3xl",
  intensity = "medium",
  border = true,
  hoverable = true,
}: LiquidGlassProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    ref.current.style.setProperty("--mx", `${x}%`);
    ref.current.style.setProperty("--my", `${y}%`);
    // Subtle tilt via CSS vars
    const tx = ((y - 50) / 50) * 3;
    const ty = ((50 - x) / 50) * 3;
    ref.current.style.setProperty("--rx", `${tx}deg`);
    ref.current.style.setProperty("--ry", `${ty}deg`);
  }

  function handleLeave() {
    setHover(false);
    if (!ref.current) return;
    ref.current.style.setProperty("--mx", "50%");
    ref.current.style.setProperty("--my", "50%");
    ref.current.style.setProperty("--rx", "0deg");
    ref.current.style.setProperty("--ry", "0deg");
  }

  // Intensity presets
  const blurMap = { light: 16, medium: 24, strong: 40 };
  const satMap = { light: 140, medium: 180, strong: 220 };
  const blur = blurMap[intensity];
  const sat = satMap[intensity];

  return (
    <div
      ref={ref}
      className={`relative ${rounded} ${className}`}
      onMouseMove={hoverable ? handleMove : undefined}
      onMouseEnter={() => hoverable && setHover(true)}
      onMouseLeave={hoverable ? handleLeave : undefined}
      style={
        {
          transformStyle: "preserve-3d",
          perspective: "1400px",
          transform:
            "perspective(1400px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
          transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          "--mx": "50%",
          "--my": "50%",
        } as React.CSSProperties
      }
    >
      {/* ───── Layer 1: refracted backdrop ───── */}
      <div
        className={`absolute inset-0 ${rounded} overflow-hidden`}
        style={{
          backdropFilter: `blur(${blur}px) saturate(${sat}%) brightness(1.05)`,
          WebkitBackdropFilter: `blur(${blur}px) saturate(${sat}%) brightness(1.05)`,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 45%, rgba(255,255,255,0.08) 100%)",
        }}
      />

      {/* ───── Layer 2: inner refraction gradient ───── */}
      <div
        className={`absolute inset-0 ${rounded} pointer-events-none`}
        style={{
          background:
            "radial-gradient(120% 80% at 30% 0%, rgba(255,255,255,0.18) 0%, transparent 50%), radial-gradient(100% 100% at 100% 100%, rgba(255,77,141,0.10) 0%, transparent 60%)",
          mixBlendMode: "screen",
        }}
      />

      {/* ───── Layer 3: cursor-tracked specular highlight ───── */}
      <div
        className={`absolute inset-0 ${rounded} pointer-events-none transition-opacity duration-500`}
        style={{
          opacity: hover ? 1 : 0.4,
          background:
            "radial-gradient(40% 60% at var(--mx) var(--my), rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.06) 35%, transparent 70%)",
          mixBlendMode: "screen",
        }}
      />

      {/* ───── Layer 4: top edge "light entry" ───── */}
      <div
        className={`absolute inset-x-0 top-0 h-px ${rounded} pointer-events-none`}
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%)",
        }}
      />

      {/* ───── Layer 5: bottom shadow edge ───── */}
      <div
        className={`absolute inset-x-0 bottom-0 h-px ${rounded} pointer-events-none`}
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
        }}
      />

      {/* ───── Layer 6: side micro-bevels ───── */}
      <div
        className="absolute inset-y-3 left-0 w-px pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-y-3 right-0 w-px pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)",
        }}
      />

      {/* ───── Layer 7: border ring ───── */}
      {border && (
        <div
          className={`absolute inset-0 ${rounded} pointer-events-none`}
          style={{
            boxShadow:
              "inset 0 0 0 1px rgba(255,255,255,0.12), inset 0 1px 0 rgba(255,255,255,0.18), 0 24px 80px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,0,0,0.4)",
          }}
        />
      )}

      {/* ───── Layer 8: hover neon halo ───── */}
      <div
        className={`absolute -inset-px ${rounded} pointer-events-none transition-opacity duration-700`}
        style={{
          opacity: hover ? 1 : 0,
          boxShadow:
            "0 0 60px -10px rgba(255,23,68,0.4), 0 0 0 1px rgba(255,77,141,0.3)",
        }}
      />

      {/* ───── Content (lifted in Z for parallax) ───── */}
      <div
        className={`relative ${rounded}`}
        style={{ transform: "translateZ(40px)" }}
      >
        {children}
      </div>
    </div>
  );
}
EOF_LIQUIDGLASS_TSX_65CA19

echo "   ✏️  writing components/Navigation.tsx"
cat > 'components/Navigation.tsx' <<'EOF_NAVIGATION_TSX_B190F8'
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#work" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-2.5 bg-bg/70 backdrop-blur-xl border-b border-white/[0.06]"
            : "py-5"
        }`}
      >
        <div className="container-wide flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-accent to-accent-soft" />
              <div className="absolute inset-[1.5px] rounded-md bg-bg flex items-center justify-center">
                <span className="font-medium text-sm tracking-tight text-white">
                  A
                </span>
              </div>
              <div className="absolute -inset-1 rounded-lg bg-accent/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-[15px] font-medium tracking-tight text-white">
              Arclane
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-full px-2 py-1.5 backdrop-blur-xl">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-1.5 text-[13px] font-medium text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/[0.04]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden sm:inline-flex btn btn-primary !py-2 !px-4 text-[13px]"
            >
              Book a call
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden
              >
                <path
                  d="M4.5 3l3 3-3 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            {/* Mobile menu toggle */}
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center"
            >
              <div className="relative w-4 h-3">
                <span
                  className={`absolute inset-x-0 top-0 h-px bg-white transition-all ${
                    open ? "rotate-45 top-1.5" : ""
                  }`}
                />
                <span
                  className={`absolute inset-x-0 top-1.5 h-px bg-white transition-opacity ${
                    open ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`absolute inset-x-0 bottom-0 h-px bg-white transition-all ${
                    open ? "-rotate-45 bottom-1.5" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-bg/95 backdrop-blur-2xl"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative pt-24 px-6"
            >
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block py-4 text-3xl font-medium tracking-tight text-white border-b border-white/5"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn btn-primary w-full justify-center mt-8 py-4"
              >
                Book a call
              </a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
EOF_NAVIGATION_TSX_B190F8

echo "   ✏️  writing components/Process.tsx"
cat > 'components/Process.tsx' <<'EOF_PROCESS_TSX_7B4911'
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ----------------------------------------------------
 * Process — How we work
 * Linear/Stripe-grade craft: numbered rail + dense detail cards
 * -------------------------------------------------- */

type Phase = {
  n: string;
  title: string;
  sub: string;
  body: string;
  duration: string;
  outputs: string[];
};

const PHASES: Phase[] = [
  {
    n: "01",
    title: "Discover",
    sub: "Decode the business behind the brief.",
    body:
      "Strategy workshops, stakeholder interviews and a forensic audit of the current stack. We translate ambition into measurable product hypotheses before a single pixel is drawn.",
    duration: "1–2 weeks",
    outputs: ["Product North Star", "Audit & gap analysis", "Success metrics"],
  },
  {
    n: "02",
    title: "Architect",
    sub: "Map the system, not just the screens.",
    body:
      "Information architecture, data models, design tokens and brand foundations are built in parallel. Every decision is captured so engineering inherits a system, never a sketch.",
    duration: "2–3 weeks",
    outputs: ["Design system v1", "IA & data schema", "Interactive prototype"],
  },
  {
    n: "03",
    title: "Engineer",
    sub: "Ship in fortnightly waves, in production.",
    body:
      "Two-week sprints, shared backlog, no agency theatre. You see every commit. Quality is locked in with type-safety, automated tests and CI/CD from sprint one.",
    duration: "6–14 weeks",
    outputs: ["Production releases", "Test suite & CI/CD", "Live dashboards"],
  },
  {
    n: "04",
    title: "Amplify",
    sub: "Compound the launch into a flywheel.",
    body:
      "Post-launch we instrument, A/B test and iterate. Quarterly business reviews convert telemetry into roadmap so the product keeps paying back, year after year.",
    duration: "Ongoing",
    outputs: ["QBR & roadmap", "Experiment program", "On-call retainer"],
  },
];

function PhaseCard({ phase, i }: { phase: Phase; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div className="glass-card p-6 sm:p-7 lg:p-8 h-full flex flex-col">
        {/* Step header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-white/40">{phase.n}</span>
            <span className="h-px w-8 bg-white/15" />
            <span className="pill text-[10px]">
              <span className="live-dot" />
              {phase.duration}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-white mb-2">
          {phase.title}
        </h3>
        <p className="text-accent-soft text-sm font-medium mb-4">
          {phase.sub}
        </p>

        {/* Body */}
        <p className="text-white/60 text-[15px] leading-relaxed mb-6 flex-1">
          {phase.body}
        </p>

        {/* Outputs */}
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-white/35 mb-2.5 font-mono">
            Deliverables
          </div>
          <ul className="space-y-1.5">
            {phase.outputs.map((o) => (
              <li
                key={o}
                className="flex items-center gap-2.5 text-sm text-white/75"
              >
                <span className="text-accent text-xs">▸</span>
                {o}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default function Process() {
  const headRef = useRef<HTMLDivElement>(null);
  const headIn = useInView(headRef, { once: true, margin: "-20%" });

  return (
    <section
      id="process"
      className="relative py-28 sm:py-32 lg:py-40 overflow-hidden"
    >
      {/* Ambient backdrop */}
      <div className="ambient-glow ambient-glow--left" />

      <div className="container-wide px-6 lg:px-10 relative z-10">
        {/* Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headIn ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-16 lg:mb-20"
        >
          <span className="pill mb-6 inline-flex">
            <span className="text-accent">◆</span>
            How we work
          </span>
          <h2 className="text-h1 text-display-lg gradient-text mb-5">
            A predictable path from{" "}
            <span className="font-serif italic text-white/85 font-normal">
              first call
            </span>{" "}
            to compounding outcomes.
          </h2>
          <p className="text-white/55 text-lg leading-relaxed max-w-2xl">
            Four phases. Embedded teams. No black boxes. The same operating
            model that's shipped 240+ enterprise products in 37 countries.
          </p>
        </motion.div>

        {/* Phase grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {PHASES.map((p, i) => (
            <PhaseCard key={p.n} phase={p} i={i} />
          ))}
        </div>

        {/* Footer strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={headIn ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 lg:mt-16 flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-white/[0.06]"
        >
          <div className="flex items-center gap-4 text-sm text-white/50">
            <span className="live-dot" />
            <span>
              Average engagement:{" "}
              <span className="text-white">12 weeks to first launch</span>
            </span>
          </div>
          <a href="#contact" className="btn btn-ghost text-sm">
            See a sample roadmap
            <span aria-hidden>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
EOF_PROCESS_TSX_7B4911

echo "   ✏️  writing components/Scene.tsx"
cat > 'components/Scene.tsx' <<'EOF_SCENE_TSX_C7FE12'
"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, AdaptiveDpr } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import FloatingObjects from "./FloatingObjects";

/* Mouse-reactive camera (subtle, doesn't break framing) */
function MouseCamera() {
  const { camera, mouse } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 7));

  useFrame(() => {
    target.current.x = mouse.x * 0.4;
    target.current.y = mouse.y * 0.3;
    camera.position.x += (target.current.x - camera.position.x) * 0.04;
    camera.position.y += (target.current.y - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        background: "transparent",
      }}
    >
      <Suspense fallback={null}>
        {/* Lighting */}
        <ambientLight intensity={0.5} color="#ffffff" />
        <directionalLight
          position={[3, 3, 3]}
          intensity={0.9}
          color="#ffffff"
        />
        <directionalLight
          position={[-3, -2, -3]}
          intensity={0.4}
          color="#ff4d8d"
        />
        <pointLight position={[0, 0, 4]} intensity={1.5} color="#ff1744" />
        <pointLight position={[-4, 3, 2]} intensity={0.8} color="#ff4d8d" />
        <pointLight position={[4, -3, 2]} intensity={0.8} color="#ff6b9d" />

        <Environment preset="night" background={false} />

        <MouseCamera />

        <FloatingObjects />

        <EffectComposer multisampling={0} disableNormalPass>
          <Bloom
            luminanceThreshold={0.55}
            luminanceSmoothing={0.4}
            intensity={1.4}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.15} darkness={0.6} />
        </EffectComposer>

        <AdaptiveDpr pixelated />
      </Suspense>
    </Canvas>
  );
}
EOF_SCENE_TSX_C7FE12

echo "   ✏️  writing components/ServiceModels.tsx"
cat > 'components/ServiceModels.tsx' <<'EOF_SERVICEMODELS_TSX_16ABDE'
"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshTransmissionMaterial,
  Environment,
  RoundedBox,
  Text,
  Trail,
  Sphere,
  Torus,
  Icosahedron,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

/* ============================================================
 * SHARED: lighting + environment used by every service canvas
 * ==========================================================*/
function StudioLighting() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 5]} intensity={0.9} color="#ffffff" />
      <pointLight position={[-3, 2, 2]} intensity={1.5} color="#ff1744" />
      <pointLight position={[3, -2, 2]} intensity={1.2} color="#ff4d8d" />
      <pointLight position={[0, 0, 4]} intensity={0.8} color="#ffffff" />
      <Environment preset="night" />
    </>
  );
}

/* ============================================================
 * MODEL 1 — Premium Brand Strategy: Rotating Diamond Logo Cube
 * ==========================================================*/
function BrandModel() {
  const group = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.25;
      group.current.rotation.x = Math.sin(t * 0.3) * 0.15;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.5;
      innerRef.current.rotation.z = t * 0.3;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
      <group ref={group}>
        {/* Outer glass diamond */}
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <octahedronGeometry args={[1.4, 0]} />
          <MeshTransmissionMaterial
            thickness={0.8}
            roughness={0.05}
            transmission={1}
            ior={1.6}
            chromaticAberration={0.06}
            backside
            color="#ffffff"
            attenuationColor="#ff1744"
            attenuationDistance={1.2}
          />
        </mesh>

        {/* Inner glowing core */}
        <mesh ref={innerRef}>
          <octahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial
            color="#ff1744"
            emissive="#ff1744"
            emissiveIntensity={2.5}
            toneMapped={false}
          />
        </mesh>

        {/* Floating "A" mark */}
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
          <Text
            position={[0, 0, 1.45]}
            fontSize={0.35}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            A
          </Text>
        </Float>

        {/* Orbital ring */}
        <Torus args={[1.9, 0.01, 16, 100]} rotation={[Math.PI / 2.5, 0, 0]}>
          <meshBasicMaterial color="#ff4d8d" transparent opacity={0.6} />
        </Torus>
      </group>
    </Float>
  );
}

/* ============================================================
 * MODEL 2 — Website Development: Floating Browser Windows
 * ==========================================================*/
function WebsiteModel() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.3) * 0.3;
    }
  });

  // Three stacked browser windows
  const windows = [
    { pos: [-0.4, 0.5, -0.3] as [number, number, number], rot: 0.1, color: "#ff1744" },
    { pos: [0, 0, 0] as [number, number, number], rot: 0, color: "#ff4d8d" },
    { pos: [0.4, -0.5, 0.3] as [number, number, number], rot: -0.1, color: "#ff6b9d" },
  ];

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={group}>
        {windows.map((w, i) => (
          <Float
            key={i}
            speed={1.3 + i * 0.2}
            rotationIntensity={0.05}
            floatIntensity={0.3}
          >
            <group position={w.pos} rotation={[0, w.rot, 0]}>
              {/* Window frame */}
              <RoundedBox args={[2.4, 1.6, 0.08]} radius={0.08} smoothness={4}>
                <MeshTransmissionMaterial
                  thickness={0.3}
                  roughness={0.1}
                  transmission={0.95}
                  ior={1.3}
                  chromaticAberration={0.03}
                  backside
                  color="#ffffff"
                  attenuationColor={w.color}
                  attenuationDistance={1.5}
                />
              </RoundedBox>

              {/* Top bar with dots */}
              <mesh position={[0, 0.65, 0.05]}>
                <planeGeometry args={[2.3, 0.2]} />
                <meshBasicMaterial color="#0a0a14" transparent opacity={0.6} />
              </mesh>
              {[-0.95, -0.75, -0.55].map((x, idx) => (
                <mesh key={idx} position={[x, 0.65, 0.06]}>
                  <circleGeometry args={[0.04, 16]} />
                  <meshBasicMaterial
                    color={["#ff5f56", "#ffbd2e", "#27c93f"][idx]}
                    toneMapped={false}
                  />
                </mesh>
              ))}

              {/* Content lines */}
              {[0.3, 0.1, -0.1, -0.3, -0.5].map((y, idx) => (
                <mesh
                  key={idx}
                  position={[-0.6 + (idx % 2) * 0.3, y, 0.05]}
                >
                  <planeGeometry args={[1 - idx * 0.1, 0.04]} />
                  <meshBasicMaterial
                    color={w.color}
                    transparent
                    opacity={0.5 - idx * 0.05}
                  />
                </mesh>
              ))}

              {/* Accent corner */}
              <mesh position={[0.9, 0.3, 0.06]}>
                <circleGeometry args={[0.12, 32]} />
                <meshBasicMaterial color={w.color} toneMapped={false} />
              </mesh>
            </group>
          </Float>
        ))}
      </group>
    </Float>
  );
}

/* ============================================================
 * MODEL 3 — Mobile Apps: Floating Phone
 * ==========================================================*/
function AppsModel() {
  const phoneRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (phoneRef.current) {
      phoneRef.current.rotation.y = Math.sin(t * 0.4) * 0.4 + 0.2;
      phoneRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;
    }
    if (screenRef.current) {
      const m = screenRef.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.5 + Math.sin(t * 2) * 0.2;
    }
  });

  return (
    <Float speed={1.1} rotationIntensity={0.1} floatIntensity={0.5}>
      <group ref={phoneRef}>
        {/* Phone body */}
        <RoundedBox args={[1.3, 2.6, 0.15]} radius={0.18} smoothness={6}>
          <MeshTransmissionMaterial
            thickness={0.6}
            roughness={0.05}
            transmission={1}
            ior={1.5}
            chromaticAberration={0.04}
            backside
            color="#ffffff"
            attenuationColor="#ff4d8d"
            attenuationDistance={1.2}
          />
        </RoundedBox>

        {/* Screen */}
        <mesh ref={screenRef} position={[0, 0, 0.085]}>
          <planeGeometry args={[1.1, 2.35]} />
          <meshBasicMaterial color="#ff1744" transparent opacity={0.6} />
        </mesh>

        {/* Notch */}
        <mesh position={[0, 1.05, 0.09]}>
          <planeGeometry args={[0.4, 0.08]} />
          <meshBasicMaterial color="#020205" />
        </mesh>

        {/* App icons grid */}
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2].map((col) => (
            <mesh
              key={`${row}-${col}`}
              position={[
                -0.35 + col * 0.35,
                0.4 - row * 0.4,
                0.092,
              ]}
            >
              <planeGeometry args={[0.22, 0.22]} />
              <meshBasicMaterial
                color={
                  (row + col) % 3 === 0
                    ? "#ffffff"
                    : (row + col) % 3 === 1
                    ? "#ff4d8d"
                    : "#ff6b9d"
                }
                transparent
                opacity={0.85}
                toneMapped={false}
              />
            </mesh>
          ))
        )}

        {/* Home indicator */}
        <mesh position={[0, -1.15, 0.092]}>
          <planeGeometry args={[0.35, 0.04]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
        </mesh>

        {/* Side rim glow */}
        <Torus
          args={[0.9, 0.015, 16, 100]}
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
        >
          <meshBasicMaterial color="#ff1744" transparent opacity={0.4} />
        </Torus>
      </group>

      {/* Floating mini-phone behind */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
        <group position={[1.4, -0.4, -0.8]} rotation={[0, -0.5, 0.2]} scale={0.5}>
          <RoundedBox args={[1.3, 2.6, 0.15]} radius={0.18} smoothness={4}>
            <meshStandardMaterial
              color="#ff4d8d"
              emissive="#ff1744"
              emissiveIntensity={0.4}
              metalness={0.5}
              roughness={0.2}
              transparent
              opacity={0.6}
            />
          </RoundedBox>
        </group>
      </Float>
    </Float>
  );
}

/* ============================================================
 * MODEL 4 — Custom AI: Neural Brain (icosphere + connected nodes)
 * ==========================================================*/
function AIModel() {
  const group = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = t * 0.2;
    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.4;
      innerRef.current.rotation.z = t * 0.3;
      const p = 1 + Math.sin(t * 2.5) * 0.06;
      innerRef.current.scale.setScalar(p);
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = -t * 0.3;
      wireRef.current.rotation.y = t * 0.2;
    }
  });

  // Neural node positions (around the brain)
  const nodes: [number, number, number][] = [];
  for (let i = 0; i < 18; i++) {
    const phi = Math.acos(2 * (i / 18) - 1);
    const theta = i * 2.4;
    const r = 1.85;
    nodes.push([
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi),
    ]);
  }

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={group}>
        {/* Outer glass brain shell */}
        <Icosahedron args={[1.3, 1]}>
          <MeshTransmissionMaterial
            thickness={0.5}
            roughness={0.05}
            transmission={1}
            ior={1.4}
            chromaticAberration={0.08}
            backside
            color="#ffffff"
            attenuationColor="#ff1744"
            attenuationDistance={1}
          />
        </Icosahedron>

        {/* Wireframe layer */}
        <Icosahedron ref={wireRef} args={[1.45, 2]}>
          <meshBasicMaterial
            color="#ff4d8d"
            wireframe
            transparent
            opacity={0.4}
          />
        </Icosahedron>

        {/* Inner pulsing core */}
        <Icosahedron ref={innerRef} args={[0.55, 0]}>
          <meshStandardMaterial
            color="#ff1744"
            emissive="#ff1744"
            emissiveIntensity={3}
            toneMapped={false}
          />
        </Icosahedron>

        {/* Neural nodes */}
        {nodes.map((pos, i) => (
          <NeuralNode key={i} position={pos} delay={i * 0.15} />
        ))}

        {/* Inner light */}
        <pointLight color="#ff1744" intensity={2} distance={6} />
      </group>
    </Float>
  );
}

function NeuralNode({
  position,
  delay,
}: {
  position: [number, number, number];
  delay: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime + delay;
    const m = ref.current.material as THREE.MeshBasicMaterial;
    m.opacity = 0.4 + Math.sin(t * 2) * 0.4;
    const s = 1 + Math.sin(t * 3) * 0.3;
    ref.current.scale.setScalar(s);
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.05, 12, 12]} />
      <meshBasicMaterial color="#ff4d8d" transparent toneMapped={false} />
    </mesh>
  );
}

/* ============================================================
 * MODEL 5 — ERP Systems: Interconnected Data Cubes Grid
 * ==========================================================*/
function ERPModel() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.2;
      group.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    }
  });

  // 3x3 grid of cubes — corner cubes are larger
  const cubes: { pos: [number, number, number]; size: number; color: string }[] = [];
  const spacing = 0.9;
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      const isCenter = x === 0 && y === 0;
      const isCorner = Math.abs(x) === 1 && Math.abs(y) === 1;
      cubes.push({
        pos: [x * spacing, y * spacing, 0],
        size: isCenter ? 0.45 : isCorner ? 0.35 : 0.28,
        color: isCenter ? "#ff1744" : isCorner ? "#ff4d8d" : "#ff6b9d",
      });
    }
  }

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={group}>
        {cubes.map((c, i) => (
          <ERPCube key={i} {...c} index={i} />
        ))}

        {/* Connecting lines (just visual rings around the grid) */}
        <Torus args={[1.6, 0.008, 16, 100]} rotation={[0, 0, 0]}>
          <meshBasicMaterial color="#ff1744" transparent opacity={0.5} />
        </Torus>
        <Torus args={[1.6, 0.008, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#ff4d8d" transparent opacity={0.5} />
        </Torus>
        <Torus args={[1.6, 0.008, 16, 100]} rotation={[0, Math.PI / 2, 0]}>
          <meshBasicMaterial color="#ff6b9d" transparent opacity={0.5} />
        </Torus>

        {/* Center cube emits light */}
        <pointLight color="#ff1744" intensity={2.5} distance={4} />
      </group>
    </Float>
  );
}

function ERPCube({
  pos,
  size,
  color,
  index,
}: {
  pos: [number, number, number];
  size: number;
  color: string;
  index: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime + index * 0.3;
    ref.current.rotation.x = t * 0.4;
    ref.current.rotation.y = t * 0.3;
  });
  return (
    <mesh ref={ref} position={pos}>
      <boxGeometry args={[size, size, size]} />
      <MeshTransmissionMaterial
        thickness={0.3}
        roughness={0.1}
        transmission={1}
        ior={1.4}
        chromaticAberration={0.04}
        backside
        color="#ffffff"
        attenuationColor={color}
        attenuationDistance={1}
      />
    </mesh>
  );
}

/* ============================================================
 * MODEL 6 — Cloud Services: Sphere with orbiting satellites
 * ==========================================================*/
function CloudModel() {
  const group = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y = t * 0.15;
    if (sphereRef.current) sphereRef.current.rotation.y = t * 0.1;
  });

  return (
    <Float speed={1} rotationIntensity={0.15} floatIntensity={0.5}>
      <group ref={group}>
        {/* Earth-like glass sphere */}
        <Sphere ref={sphereRef} args={[1.2, 64, 64]}>
          <MeshTransmissionMaterial
            thickness={1.5}
            roughness={0.05}
            transmission={1}
            ior={1.45}
            chromaticAberration={0.06}
            backside
            color="#ffffff"
            attenuationColor="#ff1744"
            attenuationDistance={2}
          />
        </Sphere>

        {/* Wireframe overlay (globe lines) */}
        <Sphere args={[1.22, 16, 12]}>
          <meshBasicMaterial
            color="#ff4d8d"
            wireframe
            transparent
            opacity={0.3}
          />
        </Sphere>

        {/* Orbiting satellites */}
        {[0, 1, 2, 3].map((i) => (
          <Satellite key={i} index={i} />
        ))}

        {/* Orbital rings */}
        <Torus args={[1.7, 0.005, 16, 100]} rotation={[Math.PI / 3, 0, 0]}>
          <meshBasicMaterial color="#ff1744" transparent opacity={0.6} />
        </Torus>
        <Torus
          args={[2.0, 0.005, 16, 100]}
          rotation={[Math.PI / 2, Math.PI / 4, 0]}
        >
          <meshBasicMaterial color="#ff4d8d" transparent opacity={0.5} />
        </Torus>
        <Torus
          args={[2.3, 0.005, 16, 100]}
          rotation={[Math.PI / 5, Math.PI / 3, 0]}
        >
          <meshBasicMaterial color="#ff6b9d" transparent opacity={0.4} />
        </Torus>

        {/* Core light */}
        <pointLight color="#ff1744" intensity={1.8} distance={5} />
      </group>
    </Float>
  );
}

function Satellite({ index }: { index: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const radius = 1.7 + index * 0.2;
  const speed = 0.5 - index * 0.08;
  const offset = (index * Math.PI) / 2;
  const tilt = (index * Math.PI) / 6;

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + offset;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = Math.sin(t * 1.3 + tilt) * 0.5;
  });

  return (
    <Trail
      width={0.4}
      length={4}
      color={index % 2 === 0 ? "#ff1744" : "#ff4d8d"}
      attenuation={(t) => t * t}
    >
      <mesh ref={ref}>
        <boxGeometry args={[0.08, 0.08, 0.08]} />
        <meshStandardMaterial
          color={index % 2 === 0 ? "#ff1744" : "#ff4d8d"}
          emissive={index % 2 === 0 ? "#ff1744" : "#ff4d8d"}
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
    </Trail>
  );
}

/* ============================================================
 * CANVAS WRAPPER — used by ServiceCanvas with model id
 * ==========================================================*/
const MODELS: Record<string, () => JSX.Element> = {
  brand: BrandModel,
  engineering: WebsiteModel,
  apps: AppsModel,
  ai: AIModel,
  erp: ERPModel,
  cloud: CloudModel,
};

interface ServiceCanvasProps {
  model: keyof typeof MODELS;
  className?: string;
}

export default function ServiceCanvas({
  model,
  className = "",
}: ServiceCanvasProps) {
  const Model = MODELS[model];
  if (!Model) return null;

  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        style={{
          width: "100%",
          height: "100%",
          background: "transparent",
        }}
      >
        <Suspense fallback={null}>
          <StudioLighting />
          <Model />
          <EffectComposer multisampling={0} disableNormalPass>
            <Bloom
              luminanceThreshold={0.5}
              luminanceSmoothing={0.4}
              intensity={1.2}
              mipmapBlur
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
EOF_SERVICEMODELS_TSX_16ABDE

echo "   ✏️  writing components/Services.tsx"
cat > 'components/Services.tsx' <<'EOF_SERVICES_TSX_D4D5EF'
"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";

const ServiceCanvas = dynamic(() => import("./ServiceModels"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-7 h-7 rounded-full border border-accent/30 border-t-accent animate-spin" />
    </div>
  ),
});

type ServiceId = "brand" | "engineering" | "apps" | "ai" | "erp" | "cloud";

interface Service {
  id: ServiceId;
  num: string;
  title: string;
  tagline: string;
  body: string;
  capabilities: string[];
  deliverables: string[];
  metrics: { value: string; label: string }[];
}

const SERVICES: Service[] = [
  {
    id: "brand",
    num: "01",
    title: "Premium Brand Strategy",
    tagline: "Luxury identities, engineered.",
    body: "We build luxury digital identities that combine strategic positioning, immersive storytelling, and futuristic visual systems — engineered for global premium audiences.",
    capabilities: [
      "Brand ecosystems",
      "Visual identity systems",
      "Premium positioning",
      "Story architecture",
      "Naming & verbal identity",
      "Scalable brand systems",
    ],
    deliverables: ["Brand book", "Design tokens", "Motion system", "Voice guide"],
    metrics: [
      { value: "180+", label: "Brands launched" },
      { value: "+312%", label: "Avg. uplift" },
    ],
  },
  {
    id: "engineering",
    num: "02",
    title: "Website Development",
    tagline: "Cinematic enterprise web engineering.",
    body: "Cinematic enterprise websites powered by immersive UI/UX and advanced frontend engineering — VFX-grade interfaces, hyper-fast architectures, and scalable design systems.",
    capabilities: [
      "Futuristic websites",
      "VFX-inspired interfaces",
      "Scalable frontend systems",
      "Responsive ecosystems",
      "Ultra-fast architectures",
      "Premium digital experiences",
    ],
    deliverables: ["Production code", "CMS setup", "Performance audit", "Analytics"],
    metrics: [
      { value: "98", label: "Avg. Lighthouse" },
      { value: "0.8s", label: "Time-to-interactive" },
    ],
  },
  {
    id: "apps",
    num: "03",
    title: "Mobile & Web Applications",
    tagline: "Scalable systems built for performance.",
    body: "We craft scalable mobile and web applications designed for performance, automation, and engagement — from SaaS ecosystems to enterprise-grade dashboards.",
    capabilities: [
      "SaaS ecosystems",
      "Enterprise applications",
      "Intelligent dashboards",
      "Cloud-connected systems",
      "Real-time platforms",
      "Engagement systems",
    ],
    deliverables: ["iOS / Android", "Web app", "API layer", "Admin console"],
    metrics: [
      { value: "420+", label: "Apps shipped" },
      { value: "9.2M", label: "Monthly users" },
    ],
  },
  {
    id: "ai",
    num: "04",
    title: "Custom AI Solutions",
    tagline: "Intelligent automation, engineered.",
    body: "We engineer intelligent AI systems for automation, predictive analytics, and machine intelligence — from generative AI ecosystems to enterprise AI infrastructure.",
    capabilities: [
      "AI assistants",
      "ML systems",
      "Generative AI",
      "Intelligent automation",
      "Predictive analytics",
      "AI infrastructure",
    ],
    deliverables: ["Fine-tuned model", "Eval suite", "Inference API", "Monitoring"],
    metrics: [
      { value: "1.4K", label: "Models trained" },
      { value: "23ms", label: "Inference time" },
    ],
  },
  {
    id: "erp",
    num: "05",
    title: "ERP Systems",
    tagline: "One operating system for the enterprise.",
    body: "Centralized ERP ecosystems connecting operations, analytics, finance, and workflow automation — a single intelligent layer across the business.",
    capabilities: [
      "HR management",
      "Financial systems",
      "CRM ecosystems",
      "Inventory infrastructure",
      "Workflow automation",
      "Operational analytics",
    ],
    deliverables: ["Modules suite", "Migration plan", "Integrations", "Training"],
    metrics: [
      { value: "67", label: "Enterprises" },
      { value: "94%", label: "Automation rate" },
    ],
  },
  {
    id: "cloud",
    num: "06",
    title: "Cloud Services",
    tagline: "Scalable infrastructure at planetary scale.",
    body: "Hyperscale cloud infrastructure engineered for security, deployment, and enterprise scalability — distributed architectures with end-to-end automation.",
    capabilities: [
      "Cloud architecture",
      "DevOps systems",
      "Scalable hosting",
      "Cybersecurity",
      "Server automation",
      "Distributed systems",
    ],
    deliverables: ["IaC blueprint", "CI/CD pipeline", "Security audit", "SRE handoff"],
    metrics: [
      { value: "99.99%", label: "Uptime SLA" },
      { value: "37", label: "Regions" },
    ],
  },
];

/* =========================================
 * BENTO OVERVIEW — at-a-glance grid
 * =========================================*/
function BentoOverview() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-32">
      {SERVICES.map((s, i) => (
        <motion.a
          key={s.id}
          href={`#${s.id}`}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: i * 0.05 }}
          className="group glass-card p-5 hover:-translate-y-1 transition-transform"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent">
              {s.num}
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="text-white/30 group-hover:text-white group-hover:translate-x-0.5 transition-all"
              aria-hidden
            >
              <path
                d="M3 11L11 3M11 3H5M11 3v6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="text-sm font-medium text-white leading-tight">
            {s.title}
          </h3>
          <p className="text-[11px] text-white/40 mt-1.5 leading-relaxed">
            {s.tagline}
          </p>
        </motion.a>
      ))}
    </div>
  );
}

/* =========================================
 * SINGLE SERVICE BLOCK — alternating layout
 * =========================================*/
function ServiceBlock({
  service,
  reverse,
}: {
  service: Service;
  reverse: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <article
      ref={ref}
      id={service.id}
      className="relative py-20 lg:py-32 scroll-mt-24"
    >
      {/* Section ambient glow */}
      <div
        className="ambient-glow opacity-30"
        style={{
          top: "30%",
          [reverse ? "left" : "right"]: "-15%",
          width: "50vw",
          height: "50vw",
          maxWidth: "700px",
          maxHeight: "700px",
          background:
            "radial-gradient(circle, rgba(255,45,85,0.15) 0%, transparent 60%)",
        }}
      />

      <div className="container-wide relative">
        <div
          className={`grid lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
            reverse ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Text column */}
          <div
            className={`lg:col-span-6 ${
              reverse ? "lg:order-2" : "lg:order-1"
            }`}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-accent">
                Service · {service.num}
              </span>
              <span className="h-px w-12 bg-accent/40" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="text-h1 text-display-lg text-white mb-4"
            >
              {service.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-xl text-white/80 font-light mb-4"
            >
              {service.tagline}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base text-white/55 leading-relaxed mb-10 max-w-xl"
            >
              {service.body}
            </motion.p>

            {/* Capabilities grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mb-10"
            >
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 mb-4">
                Capabilities
              </p>
              <div className="grid grid-cols-2 gap-y-2.5 max-w-xl">
                {service.capabilities.map((cap) => (
                  <div key={cap} className="flex items-center gap-2.5">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      className="text-accent flex-shrink-0"
                      aria-hidden
                    >
                      <path
                        d="M2 6l2.5 2.5L10 3"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-sm text-white/75">{cap}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Deliverables */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-10"
            >
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 mb-4">
                Deliverables
              </p>
              <div className="flex flex-wrap gap-2 max-w-xl">
                {service.deliverables.map((d) => (
                  <span
                    key={d}
                    className="text-xs font-medium text-white/70 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08]"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Metrics + CTA row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-8 border-t border-white/8"
            >
              <div className="flex gap-8">
                {service.metrics.map((m) => (
                  <div key={m.label}>
                    <div className="text-3xl font-medium text-white tabular">
                      {m.value}
                    </div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mt-1">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-accent transition-colors group"
              >
                Start a project
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                >
                  <path
                    d="M3 11L11 3M11 3H5M11 3v6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* 3D model column */}
          <div
            className={`lg:col-span-6 ${
              reverse ? "lg:order-1" : "lg:order-2"
            }`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.9,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative aspect-square max-w-[520px] mx-auto rounded-3xl overflow-hidden glass-strong"
            >
              {/* Top status bar */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <div className="pill !py-1 !px-2.5 !text-[10px]">
                  <span className="live-dot" />
                  {service.id.toUpperCase()}.SYS
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                  ACTIVE
                </span>
              </div>

              {/* 3D model */}
              <div className="absolute inset-0">
                {inView && <ServiceCanvas model={service.id} />}
              </div>

              {/* Bottom info bar */}
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">
                    {service.title}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-1 h-1 rounded-full bg-accent"
                        style={{
                          animationDelay: `${i * 0.2}s`,
                          animation: "subtle-pulse 1.5s ease-in-out infinite",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* =========================================
 * SERVICES SECTION
 * =========================================*/
export default function Services() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, amount: 0.3 });

  return (
    <section id="services" className="relative scroll-mt-24">
      {/* Section heading */}
      <div ref={headRef} className="container-wide section-y text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={headInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <span className="pill">
            <span className="text-accent">◆</span>
            What we build
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-h1 text-display-xl max-w-4xl mx-auto gradient-text mb-6"
        >
          A complete operating system{" "}
          <span className="font-serif italic text-white/85 font-normal">
            for next-generation enterprises.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={headInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-lg text-white/55 max-w-2xl mx-auto"
        >
          Six interconnected ecosystems — from brand strategy to AI
          infrastructure — engineered to scale, automate, and amplify every
          layer of modern business.
        </motion.p>

        {/* Bento overview grid */}
        <div className="mt-16">
          <BentoOverview />
        </div>
      </div>

      {/* Alternating detail blocks */}
      <div className="relative">
        {SERVICES.map((s, i) => (
          <ServiceBlock key={s.id} service={s} reverse={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
EOF_SERVICES_TSX_D4D5EF

echo "   ✏️  writing components/Stats.tsx"
cat > 'components/Stats.tsx' <<'EOF_STATS_TSX_1F938C'
"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ----------------------------------------------------
 * Stats — impact numbers row
 * Counts up when in view
 * -------------------------------------------------- */

type Stat = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sub: string;
  decimals?: number;
};

const STATS: Stat[] = [
  {
    value: 240,
    suffix: "+",
    label: "Enterprise clients",
    sub: "Across logistics, finance, health & retail",
  },
  {
    value: 1.4,
    suffix: "K",
    decimals: 1,
    label: "AI models in production",
    sub: "Serving 18M+ requests per day",
  },
  {
    value: 99.99,
    suffix: "%",
    decimals: 2,
    label: "Platform uptime SLA",
    sub: "Multi-region, multi-cloud by default",
  },
  {
    value: 37,
    label: "Countries deployed in",
    sub: "From Reykjavík to Auckland",
  },
];

function CountUp({
  to,
  decimals = 0,
  duration = 1.6,
  start,
}: {
  to: number;
  decimals?: number;
  duration?: number;
  start: boolean;
}) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setN(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration, start]);

  return <>{n.toFixed(decimals)}</>;
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section className="relative py-20 sm:py-24 lg:py-28 overflow-hidden">
      <div className="container-wide px-6 lg:px-10 relative z-10">
        {/* Subtle header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 lg:mb-14"
        >
          <div>
            <span className="pill mb-4 inline-flex">
              <span className="live-dot" />
              Live · updated daily
            </span>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white max-w-xl">
              Numbers we run the business by.
            </h2>
          </div>
          <a href="#contact" className="btn btn-ghost text-sm w-fit">
            See full impact report
            <span aria-hidden>→</span>
          </a>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-3xl overflow-hidden border border-white/[0.06]">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.08 }}
              className="relative bg-bg-elevated/60 backdrop-blur-xl p-6 sm:p-8 lg:p-10 group"
            >
              {/* Hover accent line */}
              <div className="absolute top-0 left-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />

              {/* Big number */}
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-4xl sm:text-5xl lg:text-6xl font-medium text-white tracking-tight tabular-nums">
                  {s.prefix}
                  <CountUp
                    to={s.value}
                    decimals={s.decimals ?? 0}
                    start={inView}
                  />
                </span>
                {s.suffix && (
                  <span className="text-2xl sm:text-3xl text-accent font-medium">
                    {s.suffix}
                  </span>
                )}
              </div>

              {/* Label */}
              <div className="text-sm font-medium text-white mb-1">
                {s.label}
              </div>
              <div className="text-xs text-white/45 leading-relaxed">
                {s.sub}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
EOF_STATS_TSX_1F938C

echo "   ✏️  writing components/Testimonials.tsx"
cat > 'components/Testimonials.tsx' <<'EOF_TESTIMONIALS_TSX_AE9DA6'
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ----------------------------------------------------
 * Testimonials — Social proof at C-suite altitude
 * -------------------------------------------------- */

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  metric: { value: string; label: string };
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "ARCLANE didn't just build us a product — they rebuilt our operating cadence. The platform shipped six weeks ahead of schedule and is now the spine of our European rollout.",
    name: "Mira Castellanos",
    role: "Chief Product Officer",
    company: "Helix Logistics",
    initials: "MC",
    metric: { value: "3.4×", label: "throughput in 90 days" },
  },
  {
    quote:
      "We've worked with the big consultancies. None matched ARCLANE on velocity or design fidelity. Our retention curve has a visible inflection from the week we shipped their redesign.",
    name: "Devon Park",
    role: "CEO",
    company: "Aurora Fintech",
    initials: "DP",
    metric: { value: "+41%", label: "30-day retention" },
  },
  {
    quote:
      "The AI agents they architected handle 78% of our tier-1 support volume with higher CSAT than our human team did. Genuinely category-defining work.",
    name: "Yuki Tanaka",
    role: "VP of Engineering",
    company: "Nimbus Cloud",
    initials: "YT",
    metric: { value: "78%", label: "tickets auto-resolved" },
  },
];

const LOGOS = [
  "Helix",
  "Aurora",
  "Nimbus",
  "Obsidian",
  "Vanta",
  "Zenith",
  "Nova",
  "Echelon",
];

function StarRow() {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="w-3.5 h-3.5 fill-accent"
          aria-hidden
        >
          <path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18 22l-6-3.7L6 22l1.5-7.2L2 10l7.1-1.1L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function TCard({ t, i }: { t: Testimonial; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card p-7 lg:p-8 flex flex-col h-full"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <StarRow />
        <span className="font-mono text-[10px] text-white/35">
          {String(i + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
        </span>
      </div>

      {/* Quote */}
      <blockquote className="text-white/85 text-lg leading-relaxed mb-8 flex-1">
        <span className="text-accent text-2xl leading-none mr-1 align-top">
          "
        </span>
        {t.quote}
      </blockquote>

      {/* Metric strip */}
      <div className="mb-6 pb-6 border-b border-white/[0.06]">
        <div className="text-3xl font-medium text-white tracking-tight">
          {t.metric.value}
          <span className="text-accent ml-1">.</span>
        </div>
        <div className="text-xs text-white/45 mt-1">{t.metric.label}</div>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="relative h-11 w-11 shrink-0 rounded-full overflow-hidden grid place-items-center bg-gradient-to-br from-accent to-accent-soft">
          <span className="text-sm font-medium text-white">{t.initials}</span>
        </div>
        <div className="min-w-0">
          <div className="text-sm font-medium text-white truncate">
            {t.name}
          </div>
          <div className="text-xs text-white/45 truncate">
            {t.role} · {t.company}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section
      id="work"
      className="relative py-28 sm:py-32 lg:py-40 overflow-hidden"
    >
      <div className="ambient-glow ambient-glow--right" />

      <div className="container-wide px-6 lg:px-10 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 lg:mb-20"
        >
          <div className="max-w-2xl">
            <span className="pill mb-6 inline-flex">
              <span className="text-accent">◆</span>
              Proof in production
            </span>
            <h2 className="text-h1 text-display-lg gradient-text">
              Operators who've shipped with us{" "}
              <span className="font-serif italic text-white/85 font-normal">
                tell the story
              </span>{" "}
              better than we can.
            </h2>
          </div>

          <div className="flex items-center gap-4 lg:shrink-0">
            <div className="text-right">
              <div className="text-3xl font-medium text-white">4.97</div>
              <div className="text-xs text-white/45">avg. client NPS</div>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div className="text-right">
              <div className="text-3xl font-medium text-white">96%</div>
              <div className="text-xs text-white/45">renewal rate</div>
            </div>
          </div>
        </motion.div>

        {/* Testimonial grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mb-20">
          {TESTIMONIALS.map((t, i) => (
            <TCard key={t.name} t={t} i={i} />
          ))}
        </div>

        {/* Logo wall */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="pt-10 border-t border-white/[0.06]"
        >
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/35 font-mono mb-6 text-center">
            Trusted by operators in 37 countries
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-x-4 gap-y-6">
            {LOGOS.map((logo, i) => (
              <motion.div
                key={logo}
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 0.55, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.04 }}
                whileHover={{ opacity: 1 }}
                className="text-center font-medium tracking-tight text-white text-base sm:text-lg transition-opacity"
              >
                {logo}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
EOF_TESTIMONIALS_TSX_AE9DA6


# Ecosystem config (PM2 deployment helper)
echo "🛠️   Writing ecosystem.config.cjs (optional PM2 helper) ..."
cat > ecosystem.config.cjs <<'EOF'
module.exports = {
  apps: [
    {
      name: "arclane-global",
      cwd: ".",
      script: "node_modules/next/dist/bin/next",
      args: "start -H 0.0.0.0 -p 3000",
      env: { NODE_ENV: "production", PORT: 3000 },
      instances: 1,
      exec_mode: "fork",
      watch: false,
      max_memory_restart: "1G",
    },
  ],
};
EOF

# Netlify deploy config (optional, harmless if unused)
echo "🌐  Writing netlify.toml (deploy hint) ..."
cat > netlify.toml <<'EOF'
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
EOF

# README
echo "📖  Writing README.md ..."
cat > README.md <<'EOF'
# ARCLANE GLOBAL

Futuristic Next.js 14 + React Three Fiber + Tailwind site for ARCLANE GLOBAL.

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
```

## Production build

```bash
npm run build
npm run start
```

## Deploy

- **Netlify**: connect this repo, install `@netlify/plugin-nextjs`, `netlify.toml` is preconfigured
- **Vercel**: zero-config, just import the repo
- **Cloudflare Pages / Workers**: requires `@cloudflare/next-on-pages` adapter

## Stack

- Next.js 14.2.5 (App Router)
- React 18.2 + TypeScript 5.4
- Tailwind CSS 3.4.4
- three.js 0.164 + @react-three/fiber 8.16 + drei 9.105 + postprocessing
- Framer Motion 11.2 + GSAP 3.12 + lucide-react
EOF

# Done
printf "\n\033[1;32m✅  Project scaffolded successfully in ./%s\033[0m\n\n" "$PROJECT_NAME"
echo "Next steps:"
echo "  cd $PROJECT_NAME"
echo "  npm install"
echo "  npm run dev      # open http://localhost:3000"
echo ""
echo "To deploy:"
echo "  • Netlify  →  push to GitHub, connect repo (netlify.toml included)"
echo "  • Vercel   →  vercel deploy"
echo ""
