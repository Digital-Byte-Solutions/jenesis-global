const fs = require('fs');
const files = ['components/ScrollOverlay.tsx', 'components/HUDOverlay.tsx'];
const replacements = {
  'Ã¢” â‚¬': '—',
  'Ã¢”¢Â': '═',
  'Ã¢â‚¬”': '—',
  'Ãƒ—': '×',
  'Ã¢” “': '↓',
  'Ã‚·': '·',
  'Ã¢Ëœ”¦': '★',
  'Ã¢Ëœâ€¡': '★',
  'Ã¢—” ': '◆',
  'Ã¢” ”™': '→',
  'Ã¢â‚¬“': '–', // en-dash
  'Ã¢â‚¬œ': '“',
  'Ã¢â‚¬”': '”' // Wait, Ã¢â‚¬” is also '—'. Let's check: quote has "Jenesis didn't just build us a product Ã¢â‚¬”  they rebuilt..." so it IS an em-dash.
};

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  for (const [bad, good] of Object.entries(replacements)) {
    content = content.split(bad).join(good);
  }
  fs.writeFileSync(file, content, 'utf8');
}
console.log('Fixed double encodings.');
