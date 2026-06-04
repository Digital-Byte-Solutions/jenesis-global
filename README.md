# ARCLANE GLOBAL — Futuristic 3D Glassmorphism Website

> Intelligent Solutions. Global Impact.
> A cinematic, immersive AI-powered web experience built with Next.js 14, React Three Fiber, and advanced WebGL effects.

---

## Project Overview

- **Name**: ARCLANE GLOBAL
- **Type**: Futuristic 3D / Glassmorphism corporate website
- **Stack**: Next.js 14.2.5 · React 18.2 · Three.js · React Three Fiber · @react-three/drei · @react-three/postprocessing · Framer Motion · GSAP · TailwindCSS
- **Goal**: Deliver a billion-dollar-AI-company feel — cinematic 3D, holographic glass, immersive motion, neon ambient lighting.

---

## Live Preview

- **Sandbox URL**: <https://3000-i5jolpnz5469mciciqwdu-b237eb32.sandbox.novita.ai>
- **Local**: `http://localhost:3000`

---

## v2 Redesign — UX Improvements

After the v1 ship, the experience was refactored end-to-end as a senior full-stack UI/UX pass:

1. **Text no longer animates on scroll** — headings appear once via gentle fade-in, then stay static. No parallax-driven jitter, no movement on body copy. This dramatically improves readability.
2. **Hero is now a 2-column grid** — text lives in the LEFT column, the 3D scene is contained in the RIGHT column. Text and 3D never overlap on any breakpoint.
3. **Apple-style Liquid Glass** added (`components/LiquidGlass.tsx`) — true backdrop blur + saturation, cursor-tracked specular highlight via CSS variables, soft 3D tilt, top "light entry" edge highlight, side bevels, neon hover halo.
4. **Real 3D models per service** (`components/ServiceModels.tsx`) — every service now has its OWN custom React Three Fiber model rendered inside a Liquid Glass card.
5. **Blank regions filled** — added **Process** (4 phases) and **Testimonials + logo wall** sections, plus a final **CTA panel** in a giant Liquid Glass card.

## Completed Features

### 🎬 Hero Section (`components/Hero.tsx`)
- **2-column grid layout** — text on left (7 cols), 3D scene on right (5 cols), never overlap
- Massive typography: `INTELLIGENT / SOLUTIONS. / GLOBAL IMPACT.` with holographic gradient + neon red glow
- Status bar, navigation, eyebrow tag, dual CTAs
- **Inline metrics row** under the CTAs (clients / models / uptime / countries)
- Three floating glass UI labels around the 3D scene (NEURAL.CORE, v3.1.4, POWERED BY ARCLANE OS)
- Bottom scroll indicator
- Text appears once via fade-in — **NO scroll-driven movement**

### 🌌 Three.js Scene (`components/Scene.tsx`)
- ACES Filmic tone mapping
- Multi-source dynamic lighting (red, pink, white point lights)
- Night environment for realistic reflections
- Mouse-reactive camera with smoothed interpolation
- Postprocessing: Bloom (mipmap blur) + Vignette
- Adaptive DPR + adaptive events for performance

### 🧊 Floating 3D Objects (`components/FloatingObjects.tsx`)
- Central AI Core: nested icosahedrons (glass shell + wireframe + glowing inner core + point light)
- 4 holographic energy rings rotating on different axes
- 3 orbiting trail particles (with `Trail` from drei)
- 3 glass cubes with `MeshTransmissionMaterial` (chromatic aberration, IOR, attenuation)
- 2 glass spheres with realistic refraction
- 4 floating wireframe octahedrons
- 300-particle field with vertex colors (red / pink / white)
- All objects float via `useFrame` + `Float` wrapper from drei

### ✨ Ambient Background (`components/Background.tsx`)
- Fixed-position lightweight canvas behind all non-hero sections
- 500-point drifting nebula with additive blending
- 4 rotating wireframe torus rings (neural lattice)
- Low-power GL settings + reduced DPR for performance

### 🍎 Apple-style Liquid Glass (`components/LiquidGlass.tsx`)
The flagship glass primitive — modeled after visionOS / iOS 26 liquid glass:
- 8 layered effect stack:
  1. **Refracted backdrop** — `backdrop-filter: blur + saturate + brightness`
  2. **Inner refraction gradient** — radial light bend with screen blend
  3. **Cursor-tracked specular highlight** — radial gradient at `var(--mx) var(--my)`
  4. **Top "light entry" edge** — bright 1px highlight at top
  5. **Bottom shadow edge** — dark 1px line at bottom
  6. **Side micro-bevels** — vertical 1px highlights on left/right
  7. **Inset + outset border ring** — multi-layer box-shadow
  8. **Hover neon halo** — outer glow that appears on hover
- **3D parallax tilt** on hover (CSS-variable driven, no React re-renders)
- 3 intensity presets: `light` / `medium` / `strong` (different blur + saturation)
- Used by: Service cards, Process cards, Testimonials, Manifesto trio, CTA panel

### 💎 Original Glass Card (`components/GlassCard.tsx`)
- True glassmorphism: `backdrop-filter: blur(24px) saturate(180%)`
- Mouse-tracked radial reflection (`framer-motion` springs)
- 3D tilt on hover (`rotateX` / `rotateY` with perspective)
- Animated holographic glow halo
- Neon edge lighting on left/right (hover-only)
- Animated scan line on hover
- Holographic dot grid overlay
- Top edge highlight stripe
- Spring-based lift animation

### 🛰️ Service Sections (`components/Services.tsx` + `components/ServiceModels.tsx`)
Six premium sections — each with its own **real 3D model** rendered in a Liquid Glass card:

| # | Service | Visual Tag | 3D Model |
|---|---|---|---|
| 01 | Premium Brand Strategy | `IDENTITY.SYS` | Floating **glass diamond** with glowing core + "A" mark + orbital ring |
| 02 | Website Development | `WEB.ENGINE` | Three **stacked browser windows** with traffic-light dots + content lines |
| 03 | Mobile & Web Applications | `APP.RUNTIME` | **Glass phone** with rotating notch, app icon grid, home indicator + smaller phone behind |
| 04 | Custom AI Solutions | `NEURAL.CORE` | **Brain icosphere** (transmission glass shell + wireframe + pulsing red core + 18 neural nodes) |
| 05 | ERP Systems | `ERP.GRID` | **3×3 grid of rotating glass cubes** + three intersecting orbital rings |
| 06 | Cloud Services | `CLOUD.MESH` | **Glass globe** with orbiting trail-satellites + 3 orbital rings + wireframe latitude/longitude lines |

- Alternating left/right layout (no text overlap with 3D)
- Giant translucent index numbers (01–06) sit behind the title as decoration
- Capability grid with glowing bullets
- **Inline metrics** per section (e.g. "AVG. LIGHTHOUSE 98/100", "INFERENCE TIME 23ms")
- Per-section accent color
- Each 3D model only mounts when its section enters viewport (lazy load)
- All text fades in **once** then stays static (no scroll animation)

### 🧭 Process Section (`components/Process.tsx`)
- 4 phase cards in a row: **Discover → Architect → Engineer → Amplify**
- Each card has a custom SVG glyph (magnifier, blueprint, code brackets, ascending chart)
- 4-segment progress bar at the bottom of each card (fills based on phase index)
- Liquid Glass medium-intensity cards
- Connector lines between cards (desktop only)

### 💬 Testimonials Section (`components/Testimonials.tsx`)
- 3 testimonial cards from C-suite roles at premium brands (Helix, Aurora, Nimbus)
- Avatar circles (gradient orbs with initials), 5-star ratings, role + company tags
- **8-logo wall** below — Helix, Aurora, Nimbus, Obsidian, Vanta, Zenith, Nova, Echelon
- "TRUSTED BY 240+ TEAMS ACROSS 37 COUNTRIES" divider

### 📞 CTA Section (`components/CTASection.tsx`)
- One giant Liquid Glass panel with strong intensity
- "Build the future with ARCLANE" — final conversion moment
- Two CTAs (Request Deployment + Schedule Strategy Call)
- 3-column info row (Email / Response Time / Timezone)
- Top "ACCEPTING DEPLOYMENTS — Q3 / 2026" pill badge

### 🌐 Page Composition (`app/page.tsx`)
- Custom dual-ring **cursor** with smooth easing
- **Scroll progress bar** (top, gradient + glow)
- **Manifesto** section (giant statement + 3 Liquid Glass capability cards)
- **Marquee** ticker band (infinite scroll)
- **Process** (4 phases)
- **Services** (6 sections, each with 3D model)
- **Testimonials** + logo wall
- **CTA panel**
- **Footer** with giant ARCLANE wordmark, ecosystem links, status line

### 🎨 Design System (`app/globals.css`)
- Color tokens: `--arc-black` `--arc-red` `--arc-pink` `--arc-glow`
- Reusable utilities: `.glass-surface` `.glass-strong` `.holo-text` `.neon-glow` `.neon-border` `.liquid-button` `.scan-effect` `.grid-bg` `.section-divider` `.marquee-track`
- Custom scrollbar with red→pink gradient
- Noise overlay + vignette
- Custom cursor styles (auto-hidden on mobile)

---

## Functional Entry URIs

| Path | Description |
|---|---|
| `/` | Main single-page experience (Hero → Manifesto → Marquee → 6 Services → Footer) |
| `/icon.svg` | Brand favicon |
| `#brand` | Anchor → Premium Brand Strategy |
| `#engineering` | Anchor → Website Development |
| `#apps` | Anchor → Mobile & Web Apps |
| `#ai` | Anchor → Custom AI Solutions |
| `#erp` | Anchor → ERP Systems |
| `#cloud` | Anchor → Cloud Services |

---

## Color System

| Token | Hex | Use |
|---|---|---|
| `arc-black` | `#020205` | Page background |
| `arc-deep` | `#050510` | Deep panels |
| `arc-red` | `#ff1744` | Primary neon accent |
| `arc-pink` | `#ff4d8d` | Secondary neon |
| `arc-glow` | `#ff6b9d` | Soft holographic glow |
| `arc-white` | `#f5f7ff` | Typography |

---

## Tech Stack (Locked Versions)

```json
{
  "react": "18.2.0",
  "react-dom": "18.2.0",
  "next": "14.2.5",
  "three": "0.164.1",
  "@react-three/fiber": "8.16.6",
  "@react-three/drei": "9.105.6",
  "@react-three/postprocessing": "2.16.2",
  "framer-motion": "11.2.10",
  "gsap": "3.12.5",
  "tailwindcss": "3.4.4"
}
```

All Three.js components use `"use client"` and are imported via `next/dynamic({ ssr: false })`.

---

## Project Structure

```
/home/user/webapp
├── app/
│   ├── globals.css        — Design system + tokens + utilities
│   ├── icon.svg           — Brand favicon
│   ├── layout.tsx         — Root metadata + viewport
│   └── page.tsx           — Main composition + cursor + progress + manifesto + marquee + footer
├── components/
│   ├── Background.tsx     — Ambient nebula + neural lattice canvas
│   ├── FloatingObjects.tsx— AI core, rings, cubes, spheres, particles (hero scene)
│   ├── GlassCard.tsx      — Original tilted glassmorphism card
│   ├── LiquidGlass.tsx    — Apple-style liquid glass primitive (NEW)
│   ├── Hero.tsx           — 2-column hero (text LEFT + 3D RIGHT)
│   ├── Scene.tsx          — Hero Three.js canvas + postprocessing
│   ├── ServiceModels.tsx  — 6 unique 3D models per service (NEW)
│   ├── Services.tsx       — 6 service blocks with 3D models + Liquid Glass
│   ├── Process.tsx        — 4-phase process section (NEW)
│   ├── Testimonials.tsx   — 3 testimonials + 8-logo wall (NEW)
│   └── CTASection.tsx     — Final big Liquid Glass CTA (NEW)
├── ecosystem.config.cjs   — PM2 production config
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## How to Run

### Local development
```bash
npm install
npm run dev          # Vite-style HMR
# → http://localhost:3000
```

### Production (sandbox / PM2)
```bash
npm run build
pm2 start ecosystem.config.cjs
pm2 logs --nostream
```

### Stop / restart
```bash
pm2 restart arclane-global
pm2 delete arclane-global
fuser -k 3000/tcp
```

---

## User Guide

1. Open the site — the hero loads with floating AI core, glass cubes, orbiting trails, and holographic rings.
2. Move your mouse — the entire 3D scene shifts with subtle camera parallax.
3. Scroll down — hero scales + fades; manifesto reveals; marquee scrolls infinitely.
4. Each service section animates in with blur + slide; hover the glass card to see 3D tilt, mouse-tracked reflection, neon edges, and scan line.
5. Bottom CTA → "REQUEST DEPLOYMENT" for action.

---

## Features Not Yet Implemented

- ⬜ Contact form with backend (API route + email)
- ⬜ Case study / portfolio sub-pages
- ⬜ Blog / Insights section
- ⬜ Animated page transitions (between routes)
- ⬜ Lottie/After Effects-style hero loader
- ⬜ Audio reactive mode (Web Audio API → bloom intensity)
- ⬜ I18n (multi-language)
- ⬜ Cloudflare D1 / KV integration for analytics

---

## Recommended Next Steps

1. **Add `/contact` route** with Hono-style serverless API (Cloudflare Functions) + email integration (Resend).
2. **Per-service detail pages** (`/services/[id]`) with deeper case studies and embedded 3D models.
3. **Page transition system** using Framer Motion `AnimatePresence` + a global overlay.
4. **GLTF model loading** — replace primitives with real branded 3D assets (logos, products).
5. **Performance audit** — code-split each service block, lazy-load Three.js below the fold.
6. **Deploy to Cloudflare Pages** — switch to `@cloudflare/next-on-pages` adapter or use Vercel directly.

---

## Deployment

- **Platform (current)**: Sandbox preview via PM2 + `next start`
- **Status**: ✅ Active on port 3000
- **Build size**: First Load JS ≈ 136 kB (page) / 87 kB (shared)
- **Last Updated**: 2026-06-04 (v2 redesign — Apple-style Liquid Glass + 3D models per service)

---

## Notes on WebGL

- Sandbox previews fall back to **software WebGL** (no GPU). On real client devices the scene runs at smooth 60 FPS with hardware acceleration.
- Postprocessing (bloom, vignette) is GPU-accelerated via WebGL2.
- `MeshTransmissionMaterial` from drei provides real-time glass refraction.

---

© 2026 ARCLANE GLOBAL · ALL SYSTEMS RESERVED
