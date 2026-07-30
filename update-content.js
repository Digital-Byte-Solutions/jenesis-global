const fs = require('fs');
let content = fs.readFileSync('components/ScrollOverlay.tsx', 'utf8');

// StageHero
content = content.replace(
  'One unified growth engine uniting Performance Marketing, Web &amp; App Engineering,\n          Enterprise AI Systems, and Search Engine Dominance for maximum ROI.',
  'One unified engine driving maximum ROI.'
);

// StageApproach Nodes
content = content.replace(
  'desc: "Scalable multi-channel user acquisition engines, paid media scale, and predictive CAC optimization."',
  'desc: "Scalable user acquisition and predictive CAC."'
);
content = content.replace(
  'desc: "High-performance digital flagships, 3D WebGL storefronts, and conversion-audited checkout engines."',
  'desc: "High-speed 3D flagships and checkout engines."'
);
content = content.replace(
  'desc: "Autonomous 24/7 SDR & support agents, operational loops, and predictive lead scoring trained on your data."',
  'desc: "Autonomous 24/7 agents and predictive lead scoring."'
);
content = content.replace(
  'desc: "Generative AI search dominance across ChatGPT, Perplexity & Google SGE. Category authority compounding."',
  'desc: "Generative AI search dominance. Compounding authority."'
);

// StageApproach Heading
content = content.replace(
  'Four synchronized growth vectors feeding into one central ARR flywheel. Hover any node to inspect data streams.',
  'Four vectors. One revenue flywheel. Hover to inspect.'
);

// StageServices
content = content.replace(
  'outcome: "Scalable multi-channel user acquisition engines."',
  'outcome: "Scalable user acquisition engines."'
);
content = content.replace(
  'outcome: "High-performance, 60fps digital experiences."',
  'outcome: "60fps digital experiences."'
);
content = content.replace(
  'outcome: "Custom AI agents and automated operational loops."',
  'outcome: "Automated AI operational loops."'
);
content = content.replace(
  'outcome: "Search and AI Engine Optimization to capture high-intent demand."',
  'outcome: "AI search optimization to capture high-intent demand."'
);

// StageServices - Remove subtitle
content = content.replace(
  'Icon + 1-Line Outcome per discipline. No fluff.',
  'Four disciplines. One outcome.'
);

// StageServices - Remove tags rendering block
content = content.replace(
  /<div className="flex flex-wrap gap-1\.5 mt-4">[\s\S]*?<\/div>/g,
  ''
);

// StageProof Cases
content = content.replace(
  'desc: "Engineered a custom React Native ecosystem across 3 regions. Cut onboarding friction by 60%.",',
  'desc: "Custom React Native ecosystem.",'
);
content = content.replace(
  'desc: "Re-architected the main global consumer site. Lifted mobile conversions with a headless WebGL configurator.",',
  'desc: "Global consumer site re-architecture.",'
);
content = content.replace(
  'desc: "Deployed autonomous patient onboarding and document verification AI agents across the clinic network.",',
  'desc: "Autonomous patient onboarding.",'
);

// StageProcess
content = content.replace(
  'desc: "Strategy workshops, stakeholder interviews and a forensic audit of the current stack."',
  'desc: "Forensic audit and strategy."'
);
content = content.replace(
  'desc: "Information architecture, data models and design tokens built in parallel."',
  'desc: "IA and data models built in parallel."'
);
content = content.replace(
  'desc: "Two-week sprints, shared backlog, no agency theatre. You see every commit."',
  'desc: "Two-week sprints. Zero agency theatre."'
);
content = content.replace(
  'desc: "Quarterly business reviews convert telemetry into roadmap so the product keeps paying back."',
  'desc: "Data-driven roadmaps for compounding growth."'
);

// StageFAQ
content = content.replace(
  'A 30-minute discovery call, then a paid 2-week sprint zero. By week two you have a product brief, design system v1, technical RFC and a fixed SOW.',
  'A 30-min discovery call followed by a 2-week sprint zero.'
);
content = content.replace(
  'Sprint zero from \\,000. Full product builds from \\–\\+ depending on scope, team size and timeline.',
  'Sprint zero from \\,000. Full builds from \\ based on scope.'
);
content = content.replace(
  'Embedded. Your Slack, your standups, your backlog — with no black-box agency theatre.',
  'Embedded in your Slack, standups, and backlog.'
);
content = content.replace(
  'You own 100% from day one. All code in your repo, all design files in your Figma workspace.',
  'You own 100% from day one.'
);

fs.writeFileSync('components/ScrollOverlay.tsx', content, 'utf8');
console.log('Content updated.');
