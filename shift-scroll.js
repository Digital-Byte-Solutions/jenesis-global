const fs = require('fs');

// 1. Update app/page.tsx
let page = fs.readFileSync('app/page.tsx', 'utf8');
page = page.replace('const STAGES = 9;', 'const STAGES = 10;');
page = page.replace('const targetPx = baseOffset + (index / STAGES) * oneLoopPxRef.current + 5;', 'const targetPx = baseOffset + ((index + 1) / STAGES) * oneLoopPxRef.current + 5;');
fs.writeFileSync('app/page.tsx', page, 'utf8');

// 2. Update components/HUDOverlay.tsx
let hud = fs.readFileSync('components/HUDOverlay.tsx', 'utf8');
hud = hud.replace(/const SECTIONS = \[[\s\S]*?\];/, \const SECTIONS = [
  { id: 0, label: "01", name: "Hero",         range: [0.1, 0.2] },
  { id: 1, label: "02", name: "Approach",     range: [0.2, 0.3] },
  { id: 2, label: "03", name: "Services",     range: [0.3, 0.4] },
  { id: 3, label: "04", name: "Proof",        range: [0.4, 0.5] },
  { id: 4, label: "05", name: "Process",      range: [0.5, 0.6] },
  { id: 5, label: "06", name: "Stats",        range: [0.6, 0.7] },
  { id: 6, label: "07", name: "Testimonials", range: [0.7, 0.8] },
  { id: 7, label: "08", name: "FAQ",          range: [0.8, 0.9] },
  { id: 8, label: "09", name: "Contact",      range: [0.9, 1.0] },
];\);
hud = hud.replace('const isActive = activeSectionIdx === idx || (activeSectionIdx === -1 && idx === 0);', 'const isActive = activeSectionIdx === idx;');
fs.writeFileSync('components/HUDOverlay.tsx', hud, 'utf8');

// 3. Update components/ScrollOverlay.tsx
let scroll = fs.readFileSync('components/ScrollOverlay.tsx', 'utf8');
scroll = scroll.replace('const o = useStageOpacity(sp, 0, 0.11);', 'const o = useStageOpacity(sp, 0.1, 0.2);');
scroll = scroll.replace('const o = useStageOpacity(sp, 0.11, 0.22);', 'const o = useStageOpacity(sp, 0.2, 0.3);');
scroll = scroll.replace('const o = useStageOpacity(sp, 0.22, 0.33);', 'const o = useStageOpacity(sp, 0.3, 0.4);');
scroll = scroll.replace('const o = useStageOpacity(sp, 0.33, 0.44);', 'const o = useStageOpacity(sp, 0.4, 0.5);');
scroll = scroll.replace('const o = useStageOpacity(sp, 0.44, 0.55);', 'const o = useStageOpacity(sp, 0.5, 0.6);');
scroll = scroll.replace('const o = useStageOpacity(sp, 0.55, 0.66);', 'const o = useStageOpacity(sp, 0.6, 0.7);');
scroll = scroll.replace('const o = useStageOpacity(sp, 0.66, 0.77);', 'const o = useStageOpacity(sp, 0.7, 0.8);');
scroll = scroll.replace('const o = useStageOpacity(sp, 0.77, 0.88);', 'const o = useStageOpacity(sp, 0.8, 0.9);');
scroll = scroll.replace('const o = useStageOpacity(sp, 0.88, 1.0);', 'const o = useStageOpacity(sp, 0.9, 1.0);');
fs.writeFileSync('components/ScrollOverlay.tsx', scroll, 'utf8');

console.log('Scroll shifted successfully.');
