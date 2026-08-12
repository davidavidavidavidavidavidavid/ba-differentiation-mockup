function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

// A wedge from cx,cy of radius r, sweeping clockwise from startAngle to
// endAngle (degrees, 0 = 12 o'clock).
function describeSlice(cx, cy, r, startAngle, endAngle) {
  const clampedEnd = endAngle - startAngle >= 360 ? startAngle + 359.99 : endAngle;
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, clampedEnd);
  const largeArcFlag = clampedEnd - startAngle > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y} Z`;
}

// One small pie per difficulty tier: a three-way static/mock split of
// completed (green) / attempted-but-not-finished (dark gray) / unattempted
// (light gray). Percentages are hand-set mock data (see data/units.js) —
// no real per-problem tracking exists yet.
export default function TierPie({ completed = 0, partial = 0, unattempted = 0, size = 32 }) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 1;

  const segments = [
    { pct: completed, color: "var(--ba-success-600)" },
    { pct: partial, color: "var(--ba-locked-600)" },
    { pct: unattempted, color: "var(--ba-locked-400)" },
  ].filter((s) => s.pct > 0);

  let angle = 0;
  const slices = segments.map((s, i) => {
    const start = angle;
    const sweep = (s.pct / 100) * 360;
    angle += sweep;
    return <path key={i} d={describeSlice(cx, cy, r, start, start + sweep)} fill={s.color} />;
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="ba-tier-pie">
      {slices}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--ba-ink-900)" strokeOpacity="0.18" />
    </svg>
  );
}
