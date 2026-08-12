import { useId } from "react";

// No dedicated island-art asset was found among the reference files, so
// this is an original hand-built SVG blob — reusing the same forest-green
// palette and "scattered foliage dot" technique already established on
// the Landing page's map (see .ba-map__forest in landing.css) so it reads
// as part of the same visual world rather than a new illustration style.
// `variant` just flips every other tile horizontally for a little visual
// variety across the 8 unit tiles.
export default function IslandArt({ variant = 0 }) {
  const gradientId = useId();
  const flipped = variant % 2 === 1;

  return (
    <svg
      className="ba-island-art"
      viewBox="0 0 160 130"
      style={flipped ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="var(--ba-forest-500)" />
          <stop offset="100%" stopColor="var(--ba-forest-700)" />
        </linearGradient>
      </defs>
      <path
        d="M22 82 C8 68 10 46 30 36 C40 20 66 8 92 16 C114 6 146 20 150 44
           C160 58 152 80 132 90 C122 104 92 110 70 100
           C48 110 28 100 22 82 Z"
        fill={`url(#${gradientId})`}
        stroke="var(--ba-forest-800)"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <circle cx="52" cy="46" r="11" fill="var(--ba-forest-800)" opacity="0.35" />
      <circle cx="86" cy="32" r="9" fill="var(--ba-forest-800)" opacity="0.3" />
      <circle cx="116" cy="52" r="10" fill="var(--ba-forest-800)" opacity="0.32" />
      <circle cx="70" cy="72" r="8" fill="var(--ba-forest-800)" opacity="0.28" />
      <circle cx="100" cy="78" r="7" fill="var(--ba-forest-800)" opacity="0.25" />
    </svg>
  );
}
