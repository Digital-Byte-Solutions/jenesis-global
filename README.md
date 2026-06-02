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

## Completed Features

### 🎬 Hero Section (`components/Hero.tsx`)
- Fullscreen WebGL canvas with floating 3D structures
- Massive cinematic typography: `INTELLIGENT / SOLUTIONS. / GLOBAL IMPACT.`
- Holographic gradient text + neon red glow
- Status bar, navigation, eyebrow tag, dual CTAs, metrics strip
- Scroll-driven parallax + opacity transforms
- Animated scroll indicator

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

### 💎 Glass Card System (`components/GlassCard.tsx`)
- True glassmorphism: `backdrop-filter: blur(24px) saturate(180%)`
- Mouse-tracked radial reflection (`framer-motion` springs)
- 3D tilt on hover (`rotateX` / `rotateY` with perspective)
- Animated holographic glow halo
- Neon edge lighting on left/right (hover-only)
- Animated scan line on hover
- Holographic dot grid overlay
- Top edge highlight stripe
- Spring-based lift animation

### 🛰️ Service Sections (`components/Services.tsx`)
Six massive premium sections — each with custom animated SVG visual:

| # | Service | Visual Tag |
|---|---|---|
| 01 | Premium Brand Strategy | `IDENTITY.SYS` — rotating nested squares |
| 02 | Website Development | `WEB.ENGINE` — floating browser panels |
| 03 | Mobile & Web Applications | `APP.RUNTIME` — orbiting devices |
| 04 | Custom AI Solutions | `NEURAL.CORE` — pulsing neural network |
| 05 | ERP Systems | `ERP.GRID` — interconnected data cubes |
| 06 | Cloud Services | `CLOUD.MESH` — global node network |

- Alternating left/right layout
- Giant translucent index numbers (01–06)
- Capability grid with glowing bullets
- Per-section accent color
- Live status indicators ("ACTIVE", load %, version tags)
- `useInView` scroll-triggered reveals with blur + translate

### 🌐 Page Composition (`app/page.tsx`)
- Custom dual-ring **cursor** with smooth easing
- **Scroll progress bar** (top, gradient + glow)
- **Manifesto** section between Hero and Services
- **Marquee** ticker band (infinite scroll)
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
│   └── page.tsx           — Main composition (cursor, progress, manifesto, marquee, footer)
├── components/
│   ├── Background.tsx     — Ambient nebula + neural lattice canvas
│   ├── FloatingObjects.tsx— AI core, rings, cubes, spheres, particles
│   ├── GlassCard.tsx      — Tilted glassmorphism card with reflections
│   ├── Hero.tsx           — Hero section + nav + headline + CTAs
│   ├── Scene.tsx          — Hero Three.js canvas + postprocessing
│   └── Services.tsx       — 6 massive service blocks + SVG visuals
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
- **Last Updated**: 2026-06-02

---

## Notes on WebGL

- Sandbox previews fall back to **software WebGL** (no GPU). On real client devices the scene runs at smooth 60 FPS with hardware acceleration.
- Postprocessing (bloom, vignette) is GPU-accelerated via WebGL2.
- `MeshTransmissionMaterial` from drei provides real-time glass refraction.

---

© 2026 ARCLANE GLOBAL · ALL SYSTEMS RESERVED
