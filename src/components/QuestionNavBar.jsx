// Shared "1 question per block" pager bar — a row of clickable numbered
// tabs used to jump directly to any question, plus optional group dividers
// (e.g. Challenge's lesson-tied vs. competition-style split).
// items: [{ id, status?: 'correct' | 'incorrect' | 'complete', groupStart?: bool, label?: number|string }]
// `label` overrides the default position-based number (i+1) — needed
// wherever a filtered subset shouldn't renumber items (e.g. Clod's
// Conundrums, where each problem keeps its fixed original number).
export default function QuestionNavBar({ items, activeIndex, onSelect }) {
  return (
    <div className="ba-qnav" role="tablist" aria-label="Jump to question">
      {items.map((item, i) => (
        <span className="ba-qnav__item" key={item.id}>
          {item.groupStart && i > 0 && <span className="ba-qnav__divider" aria-hidden="true" />}
          <button
            role="tab"
            aria-selected={i === activeIndex}
            className={
              "ba-qnav__tab" +
              (i === activeIndex ? " ba-qnav__tab--active" : "") +
              (item.status ? ` ba-qnav__tab--${item.status}` : "")
            }
            onClick={() => onSelect(i)}
          >
            {item.status === "correct" || item.status === "complete"
              ? "✓"
              : item.status === "incorrect"
              ? "✕"
              : item.label ?? i + 1}
          </button>
        </span>
      ))}
    </div>
  );
}
