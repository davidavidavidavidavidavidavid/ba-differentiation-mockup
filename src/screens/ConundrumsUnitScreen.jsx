import { useEffect, useState } from "react";
import SceneChrome from "../components/SceneChrome";
import QuestionNavBar from "../components/QuestionNavBar";
import StarRating from "../components/StarRating";
import { getPoolQuestionsForUnit } from "../data/challengePool";
import { pointsToTier } from "../utils/tier";
import { checkAnswer } from "../utils/answerMatch";
import { computeMockSolvedNumbers } from "../utils/mockProgress";
import { useGroggCoach } from "../context/GroggCoachContext";
import { COACH_LINES } from "../data/groggCoach";

const ALL_TIERS = [1, 2, 3];

function TierFilter({ selected, onToggle }) {
  return (
    <div className="ba-tier-filter">
      <span className="ba-tier-filter__label">Show difficulty:</span>
      {ALL_TIERS.map((tier) => (
        <button
          key={tier}
          className={
            "ba-tier-filter__chip" +
            (selected.includes(tier) ? " ba-tier-filter__chip--active" : "")
          }
          onClick={() => onToggle(tier)}
          aria-pressed={selected.includes(tier)}
        >
          <StarRating tier={tier} />
        </button>
      ))}
    </div>
  );
}

// A real, Test-out-style question page (paged, one question at a time,
// type-and-check input) for a single Clod's Conundrums unit — replaces the
// earlier modal/viewer. Ungated on purpose — this is browsing/practice,
// not a scored attempt, so there's no attempt limit and a "Show answer"
// fallback is always available (the free-text checker in
// utils/answerMatch.js is a heuristic across very varied answer formats,
// so it won't always agree with a student's exact phrasing — hence the
// "(Teacher)" pill next to it, since a real answer-key view isn't
// something a student would normally see). The star-difficulty filter
// lives here (not on the islands map) since it filters which of THIS
// unit's problems are shown. Every problem keeps its fixed original
// number from the reference doc regardless of filtering (see q.number,
// not array position) — some show as already-solved via
// utils/mockProgress.js, kept consistent with the islands page's mock
// tier-pie percentages.
export default function ConundrumsUnitScreen({ unit, onBack }) {
  const [tierFilter, setTierFilter] = useState(ALL_TIERS);
  const [activeIndex, setActiveIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});
  const [showAnswer, setShowAnswer] = useState({});

  const { setDefault, hover, resetToDefault } = useGroggCoach();

  const pool = unit ? getPoolQuestionsForUnit(unit.id) : null;
  const allQuestions = pool?.questions ?? [];
  const questions = allQuestions.filter((q) => tierFilter.includes(pointsToTier(q.points)));
  const mockSolvedNumbers = computeMockSolvedNumbers(unit, allQuestions);

  useEffect(() => {
    setDefault(
      allQuestions.length > 0
        ? COACH_LINES.conundrumsRealContent
        : COACH_LINES.conundrumsLoaderMissing
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit?.id]);

  useEffect(() => {
    setActiveIndex(0);
  }, [tierFilter]);

  const toggleTier = (tier) => {
    setTierFilter((prev) =>
      prev.includes(tier) ? prev.filter((t) => t !== tier) : [...prev, tier].sort()
    );
  };

  const hasQuestions = questions.length > 0;
  const q = hasQuestions ? questions[activeIndex] : null;

  const handleChange = (value) => {
    setAnswers((prev) => ({ ...prev, [q.number]: value }));
    setResults((prev) => ({ ...prev, [q.number]: undefined }));
  };

  const handleCheck = () => {
    const correct = checkAnswer(answers[q.number] ?? "", q.answer);
    setResults((prev) => ({ ...prev, [q.number]: correct }));
    // Same submit-and-advance behavior as Test-out: correct moves you on
    // in one action, wrong stays put so the feedback is visible.
    if (correct && activeIndex < questions.length - 1) {
      setActiveIndex((i) => i + 1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleCheck();
  };

  // A question's real (this-session) result takes priority; otherwise it
  // falls back to the mock "already solved" flag, so pre-solved problems
  // show as done from the start without blocking a fresh real check.
  const statusFor = (number) =>
    results[number] === true
      ? "correct"
      : results[number] === false
      ? "incorrect"
      : mockSolvedNumbers.has(number)
      ? "correct"
      : undefined;

  const navItems = questions.map((qq) => ({
    id: qq.number,
    label: qq.number,
    status: statusFor(qq.number),
  }));

  const status = q ? statusFor(q.number) ?? null : null;

  if (!unit) {
    return (
      <SceneChrome
        title="Sample problems"
        eyebrow="Clod's Conundrums"
        onBack={onBack}
        backLabel="Back to Clod's Conundrums"
      >
        <div className="ba-stage">
          <div className="ba-stage__inner ba-testout-stage">
            <p className="ba-unit-questions__empty">No unit selected.</p>
          </div>
        </div>
      </SceneChrome>
    );
  }

  return (
    <SceneChrome
      title={`${unit.name} — Sample Problems`}
      eyebrow="Clod's Conundrums"
      onBack={onBack}
      backLabel="Back to Clod's Conundrums"
    >
      <div className="ba-stage">
        <div className="ba-stage__inner ba-testout-stage">
          <TierFilter selected={tierFilter} onToggle={toggleTier} />

          {hasQuestions ? (
            <>
              <div className="ba-qnav-row">
                <button
                  className="ba-round-btn ba-round-btn--sm"
                  disabled={activeIndex === 0}
                  onClick={() => setActiveIndex((i) => i - 1)}
                  aria-label="Previous question"
                >
                  ‹
                </button>
                <QuestionNavBar
                  items={navItems}
                  activeIndex={activeIndex}
                  onSelect={setActiveIndex}
                />
                <button
                  className="ba-round-btn ba-round-btn--sm"
                  disabled={activeIndex === questions.length - 1}
                  onClick={() => setActiveIndex((i) => i + 1)}
                  aria-label="Next question"
                >
                  ›
                </button>
              </div>

              <div className="ba-question-single">
                <div
                  className={
                    "ba-question-card" + (status ? ` ba-question-card--${status}` : "")
                  }
                >
                  <p className="ba-question-card__prompt">
                    <span className="ba-question-card__num">{q.number}</span>
                    {q.prompt}
                  </p>
                  <span
                    onMouseEnter={() => hover(COACH_LINES.starRatingHover)}
                    onMouseLeave={resetToDefault}
                  >
                    <StarRating tier={pointsToTier(q.points)} />
                  </span>

                  {q.flagged ? (
                    <p className="ba-unit-question__flag">⚠️ {q.flagged}</p>
                  ) : (
                    <>
                      <div className="ba-question-card__answer-row">
                        <label htmlFor={`unit-q-${q.number}`}>Answer:</label>
                        <input
                          id={`unit-q-${q.number}`}
                          type="text"
                          value={answers[q.number] ?? ""}
                          onChange={(e) => handleChange(e.target.value)}
                          onKeyDown={handleKeyDown}
                          autoFocus
                        />
                      </div>
                      {status === "correct" && (
                        <span className="ba-question-card__status ba-question-card__status--correct">
                          ✓ Correct
                        </span>
                      )}
                      {status === "incorrect" && (
                        <span className="ba-question-card__status ba-question-card__status--incorrect">
                          ✕ Not quite
                        </span>
                      )}
                      <div className="ba-answer-actions">
                        <button
                          className="ba-btn ba-btn--primary ba-btn--sm"
                          onClick={handleCheck}
                        >
                          Submit
                        </button>
                        <button
                          className="ba-btn ba-btn--ghost ba-btn--sm"
                          onClick={() =>
                            setShowAnswer((prev) => ({ ...prev, [q.number]: !prev[q.number] }))
                          }
                        >
                          {showAnswer[q.number] ? "Hide answer" : "Show answer"}
                        </button>
                        <span className="ba-teacher-pill">(Teacher)</span>
                      </div>
                      {showAnswer[q.number] && (
                        <p className="ba-solution-box">
                          <strong>Answer: {q.answer}</strong>
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
            </>
          ) : (
            <p className="ba-unit-questions__empty">
              No sample problems match the current star filter for this unit.
              Try including more tiers.
            </p>
          )}
        </div>
      </div>
    </SceneChrome>
  );
}
