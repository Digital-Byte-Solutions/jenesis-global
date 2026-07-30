const fs = require('fs');
let content = fs.readFileSync('app/globals.css', 'utf8');
content = content.replace(/[^\x00-\x7F]+/g, function(match) {
  if (match.includes('â•\x90') || match.includes('═')) return '═══════════════════════════════════════════════════════════════';
  if (match.includes('â”€') || match.includes('─')) return '───────────────────────────────────────';
  if (match.includes('â€”')) return '—';
  if (match.includes('Â·')) return '·';
  if (match.includes('﻿')) return ''; // remove BOM if present
  return match;
});
fs.writeFileSync('app/globals.css', content, 'utf8');
