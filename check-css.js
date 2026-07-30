const fs = require('fs');
const content = fs.readFileSync('app/globals.css', 'utf8');
const nonAscii = content.match(/[^\x00-\x7F]+/g) || [];
const unique = [...new Set(nonAscii)];
console.log('globals.css non-ascii:');
console.log(unique);
