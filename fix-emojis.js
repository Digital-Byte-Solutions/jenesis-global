const fs = require('fs');

function fixScrollOverlay() {
  let content = fs.readFileSync('components/ScrollOverlay.tsx', 'utf8');
  
  // Fix the block comments with garbage characters
  content = content.replace(/\/\* [^\w\s\(\)]+ Stage opacity helper [^\w\s\(\)]+ \*\//g, '/* ─── Stage opacity helper ────────────────────────────── */');
  content = content.replace(/\/\* [^\w\s\(\)]+ Slide-in style helper [^\w\s\(\)]+ \*\//g, '/* ─── Slide-in style helper ───────────────────────────── */');
  
  // Replace the garbage dividers
  content = content.replace(/\/\* [^\w\s]{10,} \*\//g, '/* ════════════════════════════════════════════════════════════ */');
  
  // Fix em-dashes and quotes
  content = content.replace(/Ã¢â‚¬”/g, '—');
  content = content.replace(/”\x9D/g, '”');
  content = content.replace(/Ã¢”\x9Dâ‚¬/g, '—');
  
  // Fix Emojis in Approach Nodes
  content = content.replace(/icon: "Ã°Å¸Å¡â‚¬"/g, 'icon: "🚀"');
  content = content.replace(/icon: "Ã¢Å¡Â¡"/g, 'icon: "⚡"');
  content = content.replace(/icon: "Ã°Å¸Â¤–"/g, 'icon: "🤖"');
  content = content.replace(/icon: "Ã°Å¸Å½Â¯"/g, 'icon: "🎯"');
  
  // Ensure the quotes are closed properly around emojis if any were stripped
  
  fs.writeFileSync('components/ScrollOverlay.tsx', content, 'utf8');
}

function fixHUDOverlay() {
  let content = fs.readFileSync('components/HUDOverlay.tsx', 'utf8');
  content = content.replace(/â”€/g, '─');
  content = content.replace(/â†”/g, '↔');
  fs.writeFileSync('components/HUDOverlay.tsx', content, 'utf8');
}

fixScrollOverlay();
fixHUDOverlay();
console.log('Fixed emojis and remaining garbage.');
