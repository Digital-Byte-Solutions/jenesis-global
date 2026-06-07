# ARCLANE GLOBAL — v3

A futuristic Next.js 14 + React Three Fiber website for **ARCLANE GLOBAL**, an
intelligence-first studio. Now redesigned at world-class craft level (Linear /
Stripe / Vercel-grade) with a complete new design system, navigation, content
architecture and 3D scenes.

## What's new in v3

### Design system
- **Typography pair**: Inter (sans) + Instrument Serif (italic display) + JetBrains Mono (eyebrows/numbers)
- **Color tokens**: `bg`, `bg-elevated`, `accent.{DEFAULT, soft, glow, deep}` — neon red ↔ pink gradient on near-black
- **Component primitives** in `globals.css`:
  - `.btn` + `.btn-primary` (gradient with shimmer) / `.btn-secondary` (glass) / `.btn-ghost`
  - `.pill` + `.pill-accent`
  - `.glass` / `.glass-strong` / `.glass-card` (with masked border-gradient hover)
  - `.gradient-text`, `.text-display-{2xl|xl|lg|md}` (clamp-based responsive type)
  - `.ambient-glow--{left|right|center}` positional modifiers
  - `.live-dot`, `.ticker-track`, `.container-wide` (1440), `.container-narrow` (1140)

### New components
- `Navigation.tsx` — sticky scroll-detecting header with pill-style nav + mobile drawer
- `Stats.tsx` — count-up impact numbers (240+ clients, 1.4K models, 99.99% uptime, 37 countries)
- `FAQ.tsx` — single-open accordion with 6 enterprise CTO questions
- `Footer.tsx` — extracted from inline; newsletter form + 3-column IA + giant outline wordmark

### Refactored components
- `Hero.tsx` — centered hero, status pill, gradient + serif italic headline, **3D scene inside contained glass card** with HUD overlays, trust-logo strip
- `Services.tsx` — bento overview grid + alternating deep-dive blocks with capabilities checkmarks, deliverable pills, and per-service metrics
- `Process.tsx` — 4-column phase grid with `Discover → Architect → Engineer → Amplify`, deliverable lists, duration pills
- `Testimonials.tsx` — 3 C-suite quotes with metric strip + 8-logo wall + NPS/renewal stats
- `CTASection.tsx` — giant glass-strong panel with grid background, 3-column info row in cell-split layout

### Page architecture
```
Navigation (sticky)
↓
Hero
↓
Manifesto (refreshed in app/page.tsx)
↓
Marquee (with edge fades)
↓
Services (bento + 6 alternating blocks)
↓
Process (4 phases)
↓
Stats (count-up numbers)  ← NEW
↓
Testimonials + logo wall
↓
FAQ accordion             ← NEW
↓
CTASection
↓
Footer (newsletter + IA)  ← NEW (was inline)
```

## URLs
- **Sandbox**: https://3000-i5jolpnz5469mciciqwdu-b237eb32.sandbox.novita.ai

## Tech stack (locked versions)
- next 14.2.5 · react 18.2.0 · three 0.164.1
- @react-three/fiber 8.16.6 · @react-three/drei 9.105.6 · @react-three/postprocessing
- framer-motion 11.2.10 · gsap 3.12.5
- tailwindcss 3.4.4

## Run locally / sandbox
```bash
# Build (memory-constrained sandbox)
NEXT_TELEMETRY_DISABLED=1 NODE_OPTIONS="--max-old-space-size=720" npx next build

# Start via PM2
pm2 start ecosystem.config.cjs
curl http://localhost:3000  # → HTTP 200
pm2 logs --nostream
```

## Build state
- ✅ Build: SUCCESS — 142 KB First Load JS, 5 static pages
- ✅ HTTP 200 — 96 KB HTML payload
- ✅ Playwright: no JS errors (only expected software-WebGL warnings in headless)
- ✅ Memory: ~91 MB RSS in PM2 production mode
