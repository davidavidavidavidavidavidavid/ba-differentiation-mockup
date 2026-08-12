import { useEffect, useState } from "react";
import SceneChrome from "../components/SceneChrome";
import QuestionNavBar from "../components/QuestionNavBar";
import DigitArrangePuzzle from "../components/DigitArrangePuzzle";
import PyramidPuzzle from "../components/PyramidPuzzle";
import HoneycombPuzzle from "../components/HoneycombPuzzle";
import StarRating from "../components/StarRating";
import {
  LESSON_TIED_PROBLEMS,
  COMPETITION_PROBLEMS,
  CHALLENGE_TOTAL,
} from "../data/challengeProblems";
import { pointsToTier } from "../utils/tier";
import { checkAnswer } from "../utils/answerMatch";
import { useGroggCoach } from "../context/GroggCoachContext";
import { COACH_LINES } from "../data/groggCoach";

const ALL_PROBLEMS = [
  ...LESSON_TIED_PROBLEMS.map((p) => ({ ...p, group: "lesson" })),
  ...COMPETITION_PROBLEMS.map((p) => ({ ...p, group: "competition", kind: "competition" })),
];

function PyramidProblem({ problem, onLockedClick }) {
  return (
    <div className="ba-problem-card ba-problem-card--clickable" onClick={onLockedClick}>
      <p className="ba-problem-card__title">{problem.title}</p>
      <p className="ba-problem-card__prompt">{problem.description}</p>
      <PyramidPuzzle />
    </div>
  );
}

function HoneycombProblem({ problem, onLockedClick }) {
  return (
    <div className="ba-problem-card ba-problem-card--clickable" onClick={onLockedClick}>
      <p className="ba-problem-card__title">{problem.title}</p>
      <p className="ba-problem-card__prompt">{problem.description}</p>
      <HoneycombPuzzle />
    </div>
  );
}

function DigitProblem({ problem }) {
  // Solved state is self-contained per puzzle — the Challenge screen itself
  // deliberately doesn't track completion (see ChallengeScreen comment).
  const [solved, setSolved] = useState(false);
  return (
    <div className={"ba-problem-card" + (solved ? " ba-problem-card--done" : "")}>
      <p className="ba-problem-card__title">{problem.title}</p>
      <p className="ba-problem-card__prompt">{problem.description}</p>
      <DigitArrangePuzzle
        digits={problem.digits}
        divisor={problem.divisor}
        blanks={problem.blanks}
        check={problem.check}
        solved={solved}
        onSolved={() => setSolved(true)}
      />
    </div>
  );
}

function CompetitionProblem({ problem }) {
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null); // true | false | null
  const [showSolution, setShowSolution] = useState(false);

  const handleChange = (value) => {
    setAnswer(value);
    setResult(null);
  };

  const handleCheck = () => {
    setResult(checkAnswer(answer, problem.answer));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleCheck();
  };

  return (
    <div className="ba-problem-card">
      <p className="ba-problem-card__title">
        {problem.title}
        {problem.source && <span className="ba-problem-card__source"> — {problem.source}</span>}
      </p>
      {problem.points && <StarRating tier={pointsToTier(problem.points)} />}
      <p className="ba-problem-card__prompt">{problem.prompt}</p>

      <div className="ba-question-card__answer-row">
        <label htmlFor={`${problem.id}-answer`}>Answer:</label>
        <input
          id={`${problem.id}-answer`}
          type="text"
          value={answer}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      {result === true && (
        <span className="ba-question-card__status ba-question-card__status--correct">
          ✓ Correct
        </span>
      )}
      {result === false && (
        <span className="ba-question-card__status ba-question-card__status--incorrect">
          ✕ Not quite
        </span>
      )}

      <div className="ba-answer-actions">
        <button className="ba-btn ba-btn--primary ba-btn--sm" onClick={handleCheck}>
          Submit
        </button>
        <button
          className="ba-btn ba-btn--sm ba-btn--ghost ba-solution-toggle"
          onClick={() => setShowSolution((s) => !s)}
        >
          {showSolution ? "Hide solution" : "Show solution"}
        </button>
        <span className="ba-teacher-pill">(Teacher)</span>
      </div>
      {showSolution && (
        <p className="ba-solution-box">
          <strong>Answer: {problem.answer}.</strong> {problem.solution}
        </p>
      )}
    </div>
  );
}

// Per spec: this screen shows a generic/static "Score: 0 / 8" and a plain
// unlock note — no real scoring, completion-tracking, or bonus-access
// logic. Cross-grade bonus pool / difficulty tagging / real scoring are
// explicitly deferred, demo-only scope. The 8-problem pager below is still
// wired up for browsing between problems; it just doesn't track or display
// per-problem completion anymore.
export default function ChallengeScreen({ onBack }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = ALL_PROBLEMS[activeIndex];

  const { setDefault, hover, resetToDefault } = useGroggCoach();
  useEffect(() => {
    setDefault(COACH_LINES.challengeDefault);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navItems = ALL_PROBLEMS.map((p, i) => ({
    id: p.id,
    groupStart: i > 0 && p.group !== ALL_PROBLEMS[i - 1].group,
  }));

  const hoverMessage =
    active.group === "lesson" ? COACH_LINES.challenge14Hover : COACH_LINES.challenge58Hover;
  const isUnsolvable = active.kind === "pyramid" || active.kind === "honeycomb";

  return (
    <SceneChrome
      title="Challenge: Lesson 8"
      eyebrow="Long Division"
      onBack={onBack}
      backLabel="Back to lesson map"
    >
      <div className="ba-stage">
        <div className="ba-stage__inner ba-challenge-stage">
          <div className="ba-challenge-intro">
            <div>
              <h2 className="ba-section-title" style={{ fontSize: "1.3rem" }}>
                8 problems, two flavors
              </h2>
              <p>
                4 problems tied directly to this lesson, plus 4 written in a
                competition-math style.
              </p>
            </div>
            <div className="ba-score-display">Score: 0 / 8</div>
          </div>

          <div className="ba-qnav-row">
            <button
              className="ba-round-btn ba-round-btn--sm"
              disabled={activeIndex === 0}
              onClick={() => setActiveIndex((i) => i - 1)}
              aria-label="Previous problem"
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
              disabled={activeIndex === ALL_PROBLEMS.length - 1}
              onClick={() => setActiveIndex((i) => i + 1)}
              aria-label="Next problem"
            >
              ›
            </button>
          </div>

          <div
            className="ba-question-single"
            onMouseEnter={() => hover(hoverMessage)}
            onMouseLeave={resetToDefault}
          >
            <span className={"ba-group-chip ba-group-chip--" + active.group}>
              {active.group === "lesson" ? "Lesson-tied" : "Competition-style"} · Problem{" "}
              {activeIndex + 1} of {CHALLENGE_TOTAL}
              {isUnsolvable && " (view only)"}
            </span>

            {active.kind === "pyramid" && (
              <PyramidProblem
                problem={active}
                onLockedClick={() => hover(COACH_LINES.challenge14Click)}
              />
            )}
            {active.kind === "honeycomb" && (
              <HoneycombProblem
                problem={active}
                onLockedClick={() => hover(COACH_LINES.challenge14Click)}
              />
            )}
            {active.kind === "digit-arrange" && (
              <DigitProblem key={active.id} problem={active} />
            )}
            {active.kind === "competition" && (
              <CompetitionProblem key={active.id} problem={active} />
            )}
          </div>
        </div>
      </div>
    </SceneChrome>
  );
}
