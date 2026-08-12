import { useEffect } from "react";
import SceneChrome from "../components/SceneChrome";
import { useGroggCoach } from "../context/GroggCoachContext";
import { COACH_LINES } from "../data/groggCoach";

// Shown right after a passing Test-out. "Today's Challenge" is the
// visually dominant/default choice and routes straight into the Challenge
// screen — there's no placeholder/stand-in screen in between anymore (that
// "enrichment packet" box was cut entirely). "Clod's Conundrums" sits
// alongside it as an equally-clickable secondary option — neither gates
// the other. The header line below is plain screen copy, not character
// dialogue — it isn't attributed to anyone.
export default function ChallengeChoiceScreen({
  passedOnAttempt,
  onChooseChallenge,
  onChooseConundrums,
  onBack,
}) {
  const { setDefault } = useGroggCoach();
  useEffect(() => {
    setDefault(COACH_LINES.challengeChoiceDefault);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SceneChrome
      title="Challenge Unlocked: Lesson 8"
      eyebrow="Test-out unlocked"
      onBack={onBack}
      backLabel="Back to Challenge"
    >
      <div className="ba-stage">
        <div className="ba-stage__inner ba-challenge-choice-stage">
          <div className="ba-confirm-banner" data-passed-on-attempt={passedOnAttempt}>
            <span className="ba-confirm-banner__badge">4/4</span>
            <div>
              <p className="ba-confirm-banner__title">4 for 4 — tested out!</p>
              <p className="ba-confirm-banner__sub">Long division is locked in.</p>
            </div>
          </div>

          <p className="ba-choice-intro">
            Try today's challenge, or explore some of Clod's previous
            conundrums.
          </p>

          <div className="ba-choice-row">
            <button
              className="ba-choice-card ba-choice-card--primary"
              onClick={onChooseChallenge}
            >
              <span className="ba-choice-card__eyebrow">This lesson · default</span>
              <span className="ba-choice-card__title">Today's Challenge</span>
              <span className="ba-choice-card__sub">
                8 problems mixing lesson-tied puzzles and competition-style
                questions.
              </span>
            </button>

            <button
              className="ba-choice-card ba-choice-card--secondary"
              onClick={onChooseConundrums}
            >
              <span className="ba-choice-card__eyebrow">Anytime, any order</span>
              <span className="ba-choice-card__title">Clod's Conundrums</span>
              <span className="ba-choice-card__sub">
                Bonus problems from units you've already finished.
              </span>
            </button>
          </div>
        </div>
      </div>
    </SceneChrome>
  );
}
