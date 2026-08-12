import { useEffect } from "react";
import SceneChrome from "../components/SceneChrome";
import { useGroggCoach } from "../context/GroggCoachContext";
import { COACH_LINES } from "../data/groggCoach";

const SUB_LESSONS = [
  { id: 1, label: "Long Division Practice 1" },
  { id: 2, label: "Division Story Problems 1" },
  { id: 3, label: "Scrambled Digits: Division Targets" },
];

const MAP_PINS = [
  { id: 1, top: "30%", left: "62%" },
  { id: 2, top: "58%", left: "38%" },
  { id: 3, top: "62%", left: "78%" },
];

export default function LandingPage({
  testOutStatus,
  onStartTestOut,
  onOpenSupport,
  onContinueToChallenge,
}) {
  const locked = testOutStatus === "locked";
  const passed = testOutStatus === "passed";
  const { setDefault, hover, resetToDefault } = useGroggCoach();

  useEffect(() => {
    setDefault(COACH_LINES.landing);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SceneChrome title="Lesson 8" eyebrow="Beast Classroom">
      <div className="ba-stage">
        <div className="ba-stage__inner ba-landing-stage">
          <div className="ba-clipboard">
            <span className="ba-clipboard__peg" />
            <div className="ba-clipboard__paper">
              <div className="ba-support-icon-row">
                <button
                  className="ba-support-icon"
                  onClick={onOpenSupport}
                  onMouseEnter={() => hover(COACH_LINES.supportIconHover)}
                  onMouseLeave={resetToDefault}
                  aria-label="Need support?"
                  title="Need support?"
                >
                  🛟
                </button>
                <span className="ba-support-icon__label">Need support?</span>
              </div>

              {SUB_LESSONS.map((lesson) => (
                <button
                  className="ba-lesson-pill"
                  key={lesson.id}
                  onMouseEnter={() => hover(COACH_LINES.subLessonHover)}
                  onMouseLeave={resetToDefault}
                >
                  <span className="ba-lesson-badge">{lesson.id}</span>
                  {lesson.label}
                </button>
              ))}

              <div className="ba-clipboard__rule" />

              <div className="ba-landing-ctas">
                {passed ? (
                  <>
                    <button className="ba-btn ba-btn--primary" disabled>
                      Test out ✓ complete
                    </button>
                    <p className="ba-testout-helper">
                      You tested out of this practice — you can skip straight
                      to challenge.
                    </p>
                    {/* Once unlocked, this is the only way back into the
                        Challenge flow from Landing — without it, leaving
                        it for the map was a dead end. */}
                    <button
                      className="ba-btn ba-btn--success"
                      onClick={onContinueToChallenge}
                    >
                      Continue to Challenge →
                    </button>
                    <p className="ba-testout-helper">
                      Pick up where you left off.
                    </p>
                  </>
                ) : locked ? (
                  <>
                    <button className="ba-btn ba-btn--locked" disabled>
                      Test out
                    </button>
                    <p className="ba-testout-helper ba-testout-helper--locked">
                      Test-out attempts used. Continue with the regular
                      lesson.
                    </p>
                  </>
                ) : (
                  <>
                    <button
                      className="ba-btn ba-btn--primary"
                      onClick={onStartTestOut}
                      onMouseEnter={() => hover(COACH_LINES.testOutButtonHover)}
                      onMouseLeave={resetToDefault}
                    >
                      Test out
                    </button>
                    <p className="ba-testout-helper">
                      Score 4 for 4 to skip straight to the challenge
                      questions.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="ba-map">
            <div className="ba-map__waves" />
            <div className="ba-map__forest" />
            {MAP_PINS.map((pin) => (
              <button
                key={pin.id}
                className="ba-map-pin"
                style={{ top: pin.top, left: pin.left }}
                title="Prototype: sub-lesson map pins are decorative"
              >
                <span className="ba-map-pin__badge">{pin.id}</span>
                <span className="ba-map-pin__stick" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </SceneChrome>
  );
}
