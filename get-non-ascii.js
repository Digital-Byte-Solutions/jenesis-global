const fs = require('fs');
const content = fs.readFileSync('components/ScrollOverlay.tsx', 'utf8');
const nonAscii = content.match(/[^\x00-\x7F]+/g) || [];
const unique = [...new Set(nonAscii)];
console.log('ScrollOverlay non-ascii:');
console.log(unique);

const content2 = fs.readFileSync('components/HUDOverlay.tsx', 'utf8');
const nonAscii2 = content2.match(/[^\x00-\x7F]+/g) || [];
const unique2 = [...new Set(nonAscii2)];
console.log('HUDOverlay non-ascii:');
console.log(unique2);
