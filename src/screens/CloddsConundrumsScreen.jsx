import { useEffect } from "react";
import SceneChrome from "../components/SceneChrome";
import IslandArt from "../components/IslandArt";
import TierPie from "../components/TierPie";
import { UNITS } from "../data/units";
import { useGroggCoach } from "../context/GroggCoachContext";
import { COACH_LINES } from "../data/groggCoach";

function TierPieRow({ tiers, onHoverPie, onLeavePie }) {
  return (
    <div className="ba-unit-tierpies" aria-label="Progress by difficulty tier">
      {tiers.map((t, i) => (
        <div
          className="ba-unit-tierpie"
          key={i}
          onMouseEnter={onHoverPie}
          onMouseLeave={onLeavePie}
        >
          <TierPie {...t} size={30} />
          <span className="ba-unit-tierpie__label">{"★".repeat(i + 1)}</span>
        </div>
      ))}
    </div>
  );
}

// Units with no demo content behind them yet — clicking is blocked with a
// Grogg aside rather than navigating, same pattern as the blocked Grade 3
// arrow below. Not a "locked" unit (it's still reached/progressed, so it
// keeps its normal art and tier pies), just a dead end for this demo.
const DEMO_BLOCKED_UNIT_IDS = [2, 4];

function UnitIsland({ unit, onSelect, onHoverPie, onLeavePie, onBlockedClick }) {
  const locked = unit.status === "locked";
  const demoBlocked = DEMO_BLOCKED_UNIT_IDS.includes(unit.id);
  return (
    <button
      className={"ba-unit-island" + (locked ? " ba-unit-island--locked" : "")}
      onClick={() => {
        if (locked) return;
        if (demoBlocked) {
          onBlockedClick();
          return;
        }
        onSelect(unit);
      }}
      disabled={locked}
      title={
        locked
          ? "Not reached by the class yet"
          : demoBlocked
          ? "No demo content for this unit"
          : undefined
      }
    >
      <div className="ba-unit-island__art">
        <IslandArt variant={unit.id} />
      </div>

      {locked ? (
        <span className="ba-unit-island__lock" aria-hidden="true">
          🔒
        </span>
      ) : (
        <span className="ba-unit-island__num">{unit.id}</span>
      )}

      <div className="ba-unit-island__sign">
        <p className="ba-unit-island__name">{unit.name}</p>
        {!locked && (
          <TierPieRow tiers={unit.tiers} onHoverPie={onHoverPie} onLeavePie={onLeavePie} />
        )}
      </div>
    </button>
  );
}

// This is now just the island grid — picking a unit routes to
// ConundrumsUnitScreen (a real question-answering page), which is also
// where the star-difficulty filter lives now (it filters that unit's
// problems, so it belongs there, not here). Out of scope for now
// (flagged, not built): cross-grade pooling, difficulty-tag-based problem
// serving, real seen/unseen tracking — the blocked Grade 3 arrow below is
// part of that: it's a demo-only dead end, not a real cross-grade browser.
export default function CloddsConundrumsScreen({ onBack, onSelectUnit }) {
  const { setDefault, hover, resetToDefault } = useGroggCoach();
  useEffect(() => {
    setDefault(COACH_LINES.conundrumsDefault);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SceneChrome
      title="Clod's Conundrums"
      eyebrow="Bonus problems"
      onBack={onBack}
      backLabel="Back to Challenge"
    >
      <div className="ba-stage">
        <div className="ba-stage__inner ba-conundrums-stage">
          <div className="ba-grade-nav">
            <button
              className="ba-grade-nav__arrow"
              onClick={() => hover(COACH_LINES.grade3Blocked)}
              aria-label="Previous grade (blocked in this demo)"
              title="Grade 3"
            >
              ‹
            </button>
            <span className="ba-grade-nav__label">Grade 4</span>
            <button
              className="ba-grade-nav__arrow ba-grade-nav__arrow--disabled"
              disabled
              aria-label="Next grade (not applicable)"
            >
              ›
            </button>
          </div>

          <div className="ba-unit-grid">
            {UNITS.map((unit) => (
              <UnitIsland
                key={unit.id}
                unit={unit}
                onSelect={onSelectUnit}
                onHoverPie={() => hover(COACH_LINES.conundrumsPieHover)}
                onLeavePie={resetToDefault}
                onBlockedClick={() => hover(COACH_LINES.conundrumsUnitBlocked)}
              />
            ))}
          </div>

          <div className="ba-unit-legend">
            <span className="ba-unit-legend__item">
              <span className="ba-legend-dot ba-legend-dot--none" /> Not started
            </span>
            <span className="ba-unit-legend__item">
              <span className="ba-legend-dot ba-legend-dot--partial" /> In progress
            </span>
            <span className="ba-unit-legend__item">
              <span className="ba-legend-dot ba-legend-dot--done" /> Completed
            </span>
            <span className="ba-unit-legend__item">
              <span aria-hidden="true">🔒</span> Not yet reached
            </span>
          </div>
        </div>
      </div>
    </SceneChrome>
  );
}
