const fs = require('fs');
const content = fs.readFileSync('components/ScrollOverlay.tsx', 'utf8');
const lines = content.split('\n');

const findings = {};
for (let i=0; i<lines.length; i++) {
  const line = lines[i];
  if (line.includes('Stage opacity helper')) findings['Stage opacity helper'] = line.trim();
  if (line.includes('Stage 0 ')) findings['Stage 0'] = line.trim();
  if (line.includes('4.2')) findings['4.2'] = line.trim();
  if (line.includes('text-[var(--gold)] text-base')) findings['star'] = line.trim();
  if (line.includes('COO ')) findings['COO'] = line.trim();
  if (line.includes('Jenesis didn')) findings['quote'] = line.trim();
  if (line.includes('Proof')) findings['Proof'] = line.trim();
  if (line.includes('89% CAC')) findings['CAC'] = line.trim();
  if (line.includes('FLOWING INTO')) findings['flowing'] = line.trim();
}
console.log(JSON.stringify(findings, null, 2));
