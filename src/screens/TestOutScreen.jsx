import { useEffect, useState } from "react";
import SceneChrome from "../components/SceneChrome";
import QuestionNavBar from "../components/QuestionNavBar";
import { TEST_OUT_QUESTIONS, TOTAL_ATTEMPTS } from "../data/testOutQuestions";
import { useGroggCoach } from "../context/GroggCoachContext";
import { COACH_LINES } from "../data/groggCoach";

const initialAnswers = () =>
  Object.fromEntries(TEST_OUT_QUESTIONS.map((q) => [q.id, ""]));

// Spec behavior: 2 attempts total, tracked in state.
//  - Attempt 1 wrong -> inline per-question feedback, inputs stay editable,
//    same screen (this now counts as "on attempt 2").
//  - Attempt 2 wrong -> back to landing, Test out button locks.
//  - All 4 correct on either attempt -> the Challenge flow. Which attempt it was
//    passed on is threaded through (onPass) so it can be surfaced quietly
//    for teacher visibility, per the spec's open design question.
//
// Questions render one at a time and are checked individually (own Check
// button per question, immediate feedback) rather than all at once. A
// correct answer submits AND advances to the next question in one action;
// a wrong one stays put so the "Not quite" feedback is visible. The nav
// bar above still lets you jump straight to any of the 4. The moment the
// 4th question of the current attempt has been checked, the attempt
// resolves automatically: pass -> Challenge Choice, fail with attempts left ->
// silently rolls into attempt 2 (answers stay put, results clear so you
// re-verify each), fail with no attempts left -> locked.
export default function TestOutScreen({ onPass, onLockOut, onBack }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [attemptNumber, setAttemptNumber] = useState(1);
  const [answers, setAnswers] = useState(initialAnswers);
  const [results, setResults] = useState({}); // { [id]: boolean | undefined }
  const [outcome, setOutcome] = useState(null); // 'passed' | 'locked' | null

  const q = TEST_OUT_QUESTIONS[activeIndex];

  const { setDefault, hover, resetToDefault } = useGroggCoach();
  useEffect(() => {
    setDefault(COACH_LINES.testOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    // Editing after a check clears the stale correctness mark for that card.
    setResults((prev) => ({ ...prev, [id]: undefined }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleCheckQuestion();
  };

  const handleCheckQuestion = () => {
    const correct =
      Number(String(answers[q.id]).replace(/,/g, "").trim()) === q.answer;
    const next = { ...results, [q.id]: correct };
    setResults(next);

    const allChecked = TEST_OUT_QUESTIONS.every((qq) => next[qq.id] !== undefined);
    if (allChecked) {
      const allCorrect = TEST_OUT_QUESTIONS.every((qq) => next[qq.id] === true);
      if (allCorrect) {
        setOutcome("passed");
      } else if (attemptNumber < TOTAL_ATTEMPTS) {
        setAttemptNumber(2);
        setResults({});
      } else {
        setOutcome("locked");
      }
      return;
    }

    // Correct answers submit-and-advance in one action — no separate click
    // to move on. Wrong answers stay put so the "Not quite" feedback (and
    // the chance to fix it) is visible.
    if (correct && activeIndex < TEST_OUT_QUESTIONS.length - 1) {
      setActiveIndex((i) => i + 1);
    }
  };

  const onAttempt2 = outcome === null && attemptNumber === 2;

  const locked = outcome === "locked";
  const passed = outcome === "passed";

  const status =
    results[q.id] === true ? "correct" : results[q.id] === false ? "incorrect" : null;

  const navItems = TEST_OUT_QUESTIONS.map((qq) => ({
    id: qq.id,
    status:
      results[qq.id] === true ? "correct" : results[qq.id] === false ? "incorrect" : undefined,
  }));

  return (
    <SceneChrome
      title="Test Out: Lesson 8"
      eyebrow="Long Division"
      onBack={onBack}
      backLabel="Back to lesson map"
    >
      <div className="ba-stage">
        <div className="ba-stage__inner ba-testout-stage">
          <div className="ba-testout-head">
            <div
              className="ba-attempt-pips"
              onMouseEnter={() => hover(COACH_LINES.attemptPipsHover)}
              onMouseLeave={resetToDefault}
            >
              Attempt {attemptNumber} of {TOTAL_ATTEMPTS}
              {Array.from({ length: TOTAL_ATTEMPTS }).map((_, i) => (
                <span
                  key={i}
                  className={
                    "ba-attempt-pips__dot" +
                    (i < attemptNumber - (outcome === null ? 1 : 0)
                      ? " ba-attempt-pips__dot--used"
                      : "")
                  }
                />
              ))}
            </div>
          </div>

          {onAttempt2 && (
            <p className="ba-testout-actions__note" style={{ margin: 0 }}>
              Not quite — you have 1 attempt left. Check each answer again
              below.
            </p>
          )}

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
              disabled={activeIndex === TEST_OUT_QUESTIONS.length - 1}
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
                <span className="ba-question-card__num">{activeIndex + 1}</span>
                {q.prompt}
              </p>
              <div className="ba-question-card__answer-row">
                <label htmlFor={q.id}>Answer:</label>
                <input
                  id={q.id}
                  type="text"
                  inputMode="numeric"
                  value={answers[q.id]}
                  disabled={passed || locked}
                  onChange={(e) => handleChange(q.id, e.target.value)}
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
              {!passed && !locked && (
                <button
                  className="ba-btn ba-btn--primary ba-btn--sm ba-question-card__check"
                  onClick={handleCheckQuestion}
                >
                  Submit
                </button>
              )}
            </div>
          </div>

          <div className="ba-testout-actions">
            {locked && (
              <>
                <span className="ba-testout-actions__note">
                  That's both attempts used for this test-out.
                </span>
                <button className="ba-btn ba-btn--navy" onClick={onLockOut}>
                  Return to lesson map
                </button>
              </>
            )}

            {passed && (
              <button
                className="ba-btn ba-btn--primary"
                onClick={() => onPass(attemptNumber)}
              >
                Continue to Challenge →
              </button>
            )}

            {!passed && !locked && (
              <span className="ba-testout-actions__note"> </span>
            )}
          </div>
        </div>
      </div>
    </SceneChrome>
  );
}
