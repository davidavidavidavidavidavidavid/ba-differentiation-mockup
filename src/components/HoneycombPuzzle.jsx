// Hand-built approximation of a BC "honeycomb" path puzzle — a branching
// lattice of division facts from Start to Finish, where every node in one
// stage connects to every node in the next (the "overlapping paths" look
// of a honeycomb, not a single chain). This is a manual SVG reconstruction
// built from a text description of the stage groupings for this
// prototype, NOT an export from the BA Editor/BaTeX pipeline — swap for
// the real exported graphic when available (see build spec). The exact
// edge connectivity within the lattice wasn't fully specified, so full
// bipartite connections between adjacent stages is this prototype's
// best-effort reading of "every adjacent pair connected."
const STAGES = [
  ["Start"],
  ["800÷8"],
  ["891÷9", "693÷7"],
  ["588÷6", "485÷5", "582÷6"],
  ["855÷9", "672÷7"],
  ["376÷4", "752÷8", "465÷5"],
  ["552÷6", "651÷7"],
  ["819÷9"],
  ["Finish"],
];

const COL_SPACING = 120;
const ROW_SPACING = 86;
const MARGIN_X = 70;
const MARGIN_Y = 70;
const NODE_R = 34;

function layout() {
  const maxCount = Math.max(...STAGES.map((s) => s.length));
  const height = (maxCount - 1) * ROW_SPACING + MARGIN_Y * 2;
  const width = MARGIN_X * 2 + (STAGES.length - 1) * COL_SPACING;
  const stages = STAGES.map((stage, i) => {
    const x = MARGIN_X + i * COL_SPACING;
    return stage.map((label, j) => ({
      label,
      x,
      y: height / 2 + (j - (stage.length - 1) / 2) * ROW_SPACING,
    }));
  });
  return { stages, width, height };
}

export default function HoneycombPuzzle() {
  const { stages, width, height } = layout();

  const edges = [];
  for (let i = 0; i < stages.length - 1; i++) {
    for (const a of stages[i]) {
      for (const b of stages[i + 1]) {
        edges.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y });
      }
    }
  }

  return (
    <div className="ba-honeycomb-wrap">
      <svg
        className="ba-honeycomb"
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Honeycomb division-fact path from Start to Finish, counting down by 1"
      >
        {edges.map((e, i) => (
          <line
            key={i}
            x1={e.x1}
            y1={e.y1}
            x2={e.x2}
            y2={e.y2}
            className="ba-honeycomb__edge"
          />
        ))}
        {stages.flat().map((n, i) => {
          const isEndpoint = n.label === "Start" || n.label === "Finish";
          return (
            <g key={i} transform={`translate(${n.x}, ${n.y})`}>
              {isEndpoint ? (
                <rect
                  x={-42}
                  y={-22}
                  width={84}
                  height={44}
                  rx={22}
                  className="ba-honeycomb__endpoint"
                />
              ) : (
                <circle r={NODE_R} className="ba-honeycomb__node" />
              )}
              <text
                textAnchor="middle"
                dominantBaseline="central"
                className={
                  isEndpoint ? "ba-honeycomb__endpoint-text" : "ba-honeycomb__node-text"
                }
              >
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
