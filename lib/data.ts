export interface PortfolioItem {
  id: string;
  code: string; // e.g. PORTFOLIO_CO_01
  title: string;
  subtitle: string;
  category: string;
  date: string;
  temp: string;
  delta: string;
  stats: { label: string; value: string }[];
  description: string;
  fullContent: string;
  tags: string[];
  color: string;
  shapeType: "crystal" | "cube" | "octahedron" | "prism";
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "quantum-core",
    code: "PORTFOLIO_CO_01",
    title: "QUANTUM ADVISORY",
    subtitle: "Enterprise Autonomous Infrastructure",
    category: "Strategic Tech",
    date: "D 01.02.2026",
    temp: "32.42",
    delta: "+88.23",
    color: "#00f0ff",
    shapeType: "crystal",
    stats: [
      { label: "Capital Deployed", value: "$1.4B+" },
      { label: "Efficiency Gain", value: "340%" },
      { label: "Latency Reduct.", value: "-84ms" },
    ],
    description:
      "Architecting next-generation autonomous cloud infrastructure and multi-agent AI ecosystems for Fortune 100 enterprise clients.",
    fullContent:
      "Jenesis Global spearheaded the complete infrastructure modernization for global financial institutions, deploying distributed high-throughput Web3 & AI compute grids. The result yielded zero-downtime execution and multi-billion-dollar operational scaling.",
    tags: ["Distributed Systems", "AI Compute", "Quantum Security", "Cloud Mesh"],
  },
  {
    id: "nexus-ventures",
    code: "PORTFOLIO_CO_02",
    title: "NEXUS DYNAMICS",
    subtitle: "Cross-Border Venture Strategy",
    category: "Capital Strategy",
    date: "D 04.18.2025",
    temp: "24.18",
    delta: "+104.12",
    color: "#ff007f",
    shapeType: "cube",
    stats: [
      { label: "Fund Size", value: "$500M" },
      { label: "Active Ventures", value: "42" },
      { label: "IRR Metric", value: "48.2%" },
    ],
    description:
      "Structuring cross-border venture capital allocation frameworks and liquid algorithmic treasury models for sovereign funds.",
    fullContent:
      "Our capital strategy division created a sovereign venture ecosystem linking Silicon Valley, Tokyo, and London tech corridors, optimizing liquidity paths and cross-market expansion for hyper-growth technology ventures.",
    tags: ["Venture Capital", "Treasury Engineering", "Liquidity Pools", "Tokenomics"],
  },
  {
    id: "ai-synapse",
    code: "PORTFOLIO_CO_03",
    title: "AI SYNAPSE",
    subtitle: "Neural Agent Orchestration",
    category: "AI & Data Science",
    date: "D 06.28.2024",
    temp: "19.46",
    delta: "-06.97",
    color: "#7000ff",
    shapeType: "octahedron",
    stats: [
      { label: "Model Parameters", value: "700B" },
      { label: "Tokens / Sec", value: "1.2M" },
      { label: "Accuracy Score", value: "99.4%" },
    ],
    description:
      "Custom multi-modal LLM synthesis and autonomous agent swarms tailored for high-frequency trading and predictive analytics.",
    fullContent:
      "Engineered proprietary agentic swarms capable of processing real-time global macroeconomic feeds, generating high-conviction decision trees, and executing automated hedging strategies with sub-millisecond precision.",
    tags: ["Neural Swarms", "LLM Fine-tuning", "Autonomous Agents", "Predictive Analytics"],
  },
  {
    id: "omni-scale",
    code: "PORTFOLIO_CO_04",
    title: "OMNI SCALE",
    subtitle: "Global Market Acceleration",
    category: "Brand Ecosystems",
    date: "D 11.14.2024",
    temp: "41.05",
    delta: "+12.40",
    color: "#00ffaa",
    shapeType: "prism",
    stats: [
      { label: "User Reach", value: "120M+" },
      { label: "Valuation Impact", value: "4.8x" },
      { label: "Retention Rate", value: "92%" },
    ],
    description:
      "Transforming high-value consumer brands with Web3 community governance, spatial computing, and digital identity layers.",
    fullContent:
      "Scaled top-tier digital assets and consumer brands into global household phenomena by merging physical retail experiences with WebGL spatial environments, token-gated loyalty systems, and viral brand narratives.",
    tags: ["Web3 Brands", "Spatial Computing", "Digital Identity", "Community Scaling"],
  },
];

export interface MascotHoloPlatform {
  id: string;
  name: string;
  handle: string;
  url: string;
  metric: string;
}

export const HOLO_PLATFORMS: MascotHoloPlatform[] = [
  {
    id: "linkedin",
    name: "LinkedIn",
    handle: "jenesis-global",
    url: "https://linkedin.com/company/jenesis-global",
    metric: "48K+ Executives",
  },
  {
    id: "twitter",
    name: "X / Twitter",
    handle: "@jenesis_global",
    url: "https://x.com/jenesis_global",
    metric: "125K Followers",
  },
  {
    id: "medium",
    name: "Medium",
    handle: "@jenesis.research",
    url: "https://medium.com/@jenesis.research",
    metric: "200+ Publications",
  },
  {
    id: "contact",
    name: "Consultation",
    handle: "direct@jenesis.global",
    url: "#contact",
    metric: "24/7 Advisory",
  },
];
