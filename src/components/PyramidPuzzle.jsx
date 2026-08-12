// Hand-built approximation of a BC "digit pyramid" puzzle — a staircase
// grid of digit/operator tiles hiding two true equations, two tiles
// circled. This is a manual CSS-grid reconstruction built from a text
// description of the staircase coordinates for this prototype, NOT an
// export from the BA Editor/BaTeX pipeline — swap for the real exported
// graphic when available (see build spec).
//
// Layout notes: rows 2–4 share a left column; row 5 (bottom) is offset one
// column to the right of that; row 1 (top) is centered over row 2's span.
// Exact BaTeX pixel alignment wasn't available, so this is a best-effort
// staircase reconstruction from the described row widths/offsets.
const ROWS = [
  { start: 4, cells: [{ v: "3" }, { v: "6", circled: true }] },
  {
    start: 3,
    cells: [{ v: "3", circled: true }, { v: "3" }, { v: "0" }, { v: "÷" }],
  },
  { start: 3, cells: [{ v: "0" }, { v: "÷" }, { v: "3" }, { v: "3" }, { v: "=" }] },
  { start: 3, cells: [{ v: "6" }, { v: "0" }, { v: "=" }, { v: "1" }, { v: "2" }] },
  {
    start: 4,
    cells: [{ v: "0" }, { v: "2" }, { v: "0" }, { v: "1" }, { v: "1" }, { v: "0" }],
  },
];

export default function PyramidPuzzle() {
  return (
    <div className="ba-pyramid" role="img" aria-label="Digit pyramid puzzle grid">
      {ROWS.map((row, r) =>
        row.cells.map((cell, i) => (
          <span
            key={`${r}-${i}`}
            className={
              "ba-pyramid__cell" + (cell.circled ? " ba-pyramid__cell--circled" : "")
            }
            style={{ gridRow: r + 1, gridColumn: row.start + i }}
          >
            {cell.v}
          </span>
        ))
      )}
    </div>
  );
}
