const fs = require('fs');
let content = fs.readFileSync('components/ScrollOverlay.tsx', 'utf8');

// Replace white text on gold background with dark slate text for proper contrast in all themes
content = content.replace(/bg-\[var\(--gold\)\] text-white/g, 'bg-[var(--gold)] text-[#171717]');

fs.writeFileSync('components/ScrollOverlay.tsx', content, 'utf8');
console.log('Fixed text contrast on gold buttons.');
