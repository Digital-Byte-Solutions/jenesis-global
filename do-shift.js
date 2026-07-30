const fs = require('fs');
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
console.log('Scroll shift complete.');
