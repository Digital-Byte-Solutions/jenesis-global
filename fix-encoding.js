const fs = require('fs');
const files = ['components/ScrollOverlay.tsx', 'components/HUDOverlay.tsx'];
const replacements = {
  'â˜…': '★',
  'â€”': '—',
  'Ã—': '×',
  'â†’': '→',
  'â—†': '◆',
  'â†“': '↓',
  'Â·': '·',
  'â€œ': '“',
  'â€ ': '”',
  'â€“': '–',
  'â€': '”'
};

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  for (const [bad, good] of Object.entries(replacements)) {
    content = content.split(bad).join(good);
  }
  
  content = content.replace(/Book A Strategy Call .*/g, 'Book A Strategy Call →\n              </button>');
  content = content.replace(/UTC A/g, 'UTC ·');
  content = content.replace(/JGA/g, 'JG·');
  fs.writeFileSync(file, content, 'utf8');
}
console.log('Fixed encodings.');
