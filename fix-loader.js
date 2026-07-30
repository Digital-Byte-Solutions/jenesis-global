const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf8');
content = content.replace(/border-\[\#ff1744\]/g, 'border-[var(--gold)]');
content = content.replace(/shadow-\[0_0_25px_\#ff1744\]/g, 'shadow-[0_0_25px_var(--shadow-gold)]');
content = content.replace(/text-\[\#ff4d8d\]/g, 'text-[var(--gold)]');
fs.writeFileSync('app/page.tsx', content, 'utf8');
console.log('Fixed loader colors.');
