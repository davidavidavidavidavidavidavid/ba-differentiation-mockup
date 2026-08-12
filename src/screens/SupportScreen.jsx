import { useEffect, useState } from "react";
import SceneChrome from "../components/SceneChrome";
import { SUPPORT_PROBLEMS } from "../data/supportProblems";
import { useGroggCoach } from "../context/GroggCoachContext";
import { COACH_LINES } from "../data/groggCoach";

function ScaffoldedProblem({ problem, index }) {
  const hasBlanks = !!problem.blanks?.length;
  const [revealed, setRevealed] = useState(false);
  const [values, setValues] = useState(() =>
    Object.fromEntries((problem.blanks ?? []).map((_, i) => [i, ""]))
  );
  const [results, setResults] = useState(null); // bool[] | null

  const handleChange = (i, value) => {
    setValues((prev) => ({ ...prev, [i]: value }));
    setResults(null);
  };

  const handleCheck = () => {
    const r = problem.blanks.map(
      (b, i) => Number(String(values[i]).replace(/,/g, "").trim()) === b.answer
    );
    setResults(r);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleCheck();
  };

  return (
    <div className="ba-scaffold-problem">
      <div className="ba-scaffold-problem__head">
        <span className="ba-scaffold-problem__index">{index}</span>
        <p className="ba-scaffold-problem__title">
          {problem.dividend.toLocaleString()} ÷ {problem.divisor}
        </p>
        {!hasBlanks && <span className="ba-worked-tag">Worked Example</span>}
      </div>

      {problem.calloutText && (
        <div className="ba-scaffold-callout">{problem.calloutText}</div>
      )}

      {problem.workedLines.map((line, i) => (
        <p className="ba-scaffold-note" key={i}>
          {line.text}
        </p>
      ))}

      {problem.revealText &&
        (revealed ? (
          <p className="ba-scaffold-reveal">{problem.revealText}</p>
        ) : (
          <button
            className="ba-btn ba-btn--sm ba-btn--ghost ba-scaffold-reveal-btn"
            onClick={() => setRevealed(true)}
          >
            {problem.revealLabel}
          </button>
        ))}

      {hasBlanks && (
        <div className="ba-scaffold-blanks">
          {problem.blanks.map((b, i) => (
            <div className="ba-scaffold-blank" key={i}>
              <label htmlFor={`${problem.id}-${i}`}>{b.label}</label>
              <input
                id={`${problem.id}-${i}`}
                type="text"
                inputMode="numeric"
                value={values[i]}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={handleKeyDown}
              />
              {results && (
                <span
                  className={
                    "ba-scaffold-blank__status " +
                    (results[i]
                      ? "ba-scaffold-blank__status--correct"
                      : "ba-scaffold-blank__status--incorrect")
                  }
                >
                  {results[i] ? "✓" : "✕"}
                </span>
              )}
            </div>
          ))}
          <button
            className="ba-btn ba-btn--primary ba-btn--sm"
            onClick={handleCheck}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

// The intervention/backup-a-step path for students not ready for the
// test-out — scoped tightly to 4.NBT.B.6 WITHOUT remainders (see
// src/data/supportProblems.js for the scaffold design). Reachable anytime
// from Landing's "Need support?" button, and exits straight back into
// Test-out (not Landing) via the footer CTA, per the intended flow.
export default function SupportScreen({ onBack, onReadyForTestOut }) {
  const { setDefault } = useGroggCoach();
  useEffect(() => {
    setDefault(COACH_LINES.supportDefault);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SceneChrome
      title="Support: Lesson 8"
      eyebrow="Extra Practice"
      onBack={onBack}
      backLabel="Back to lesson map"
    >
      <div className="ba-stage">
        <div className="ba-stage__inner ba-support-stage">
          <p className="ba-support-intro">
            Same divisor, three problems, a little less help each time — see
            if the pattern carries you the rest of the way.
          </p>

          {SUPPORT_PROBLEMS.map((problem, i) => (
            <ScaffoldedProblem key={problem.id} problem={problem} index={i + 1} />
          ))}

          <div className="ba-support-footer">
            <button className="ba-btn ba-btn--primary" onClick={onReadyForTestOut}>
              Ready — try test-out again →
            </button>
          </div>
        </div>
      </div>
    </SceneChrome>
  );
}
