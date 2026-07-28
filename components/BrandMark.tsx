/* Jenesis trefoil mark — three interlocked orbits echoing the sculpture */
export default function BrandMark({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="jg-sapphire" x1="0" y1="0" x2="64" y2="64">
          <stop offset="0%" stopColor="var(--accent-glow)" />
          <stop offset="55%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--accent-deep)" />
        </linearGradient>
        <linearGradient id="jg-gold" x1="0" y1="64" x2="64" y2="0">
          <stop offset="0%" stopColor="var(--accent-soft)" />
          <stop offset="100%" stopColor="var(--accent-glow)" />
        </linearGradient>
      </defs>
      <ellipse
        cx="32"
        cy="32"
        rx="24"
        ry="11"
        stroke="url(#jg-sapphire)"
        strokeWidth="3.5"
        transform="rotate(0 32 32)"
      />
      <ellipse
        cx="32"
        cy="32"
        rx="24"
        ry="11"
        stroke="url(#jg-sapphire)"
        strokeWidth="3.5"
        transform="rotate(60 32 32)"
        opacity="0.85"
      />
      <ellipse
        cx="32"
        cy="32"
        rx="24"
        ry="11"
        stroke="url(#jg-gold)"
        strokeWidth="2.5"
        transform="rotate(120 32 32)"
        opacity="0.9"
      />
    </svg>
  );
}
