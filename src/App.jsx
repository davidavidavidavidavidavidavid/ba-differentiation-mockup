import { useState } from "react";
import LandingPage from "./screens/LandingPage";
import TestOutScreen from "./screens/TestOutScreen";
import ChallengeChoiceScreen from "./screens/ChallengeChoiceScreen";
import CloddsConundrumsScreen from "./screens/CloddsConundrumsScreen";
import ConundrumsUnitScreen from "./screens/ConundrumsUnitScreen";
import ChallengeScreen from "./screens/ChallengeScreen";
import SupportScreen from "./screens/SupportScreen";
import GroggCoachBar from "./components/GroggCoachBar";

// Simple state machine for the screen flow. `screen` is the current view;
// `testOutStatus` persists across visits to the landing page ('available'
// -> 'locked' after 2 failed attempts, or 'passed' once tested out).
//
// Flow: Test-out (pass) -> Challenge Choice -> Challenge (directly — no
// stand-in screen in between anymore)
//                                            \-> Clod's Conundrums (either
//                                                order, neither gates the
//                                                other) -> pick a unit ->
//                                                ConundrumsUnitScreen
//
// GroggCoachBar renders once here, outside the screen switch, so it's the
// one persistent element present on every screen (see
// context/GroggCoachContext.jsx) — not re-mounted per screen.
export default function App() {
  const [screen, setScreen] = useState("landing");
  const [testOutStatus, setTestOutStatus] = useState("available");
  const [passedOnAttempt, setPassedOnAttempt] = useState(null);
  const [activeConundrumsUnit, setActiveConundrumsUnit] = useState(null);

  const goLanding = () => setScreen("landing");
  const goChallenge = () => setScreen("challenge");
  const goChallengeChoice = () => setScreen("challengeChoice");

  const handlePass = (attemptNumber) => {
    setTestOutStatus("passed");
    setPassedOnAttempt(attemptNumber);
    setScreen("challengeChoice");
  };

  const handleLockOut = () => {
    setTestOutStatus("locked");
    setScreen("landing");
  };

  const handleSelectConundrumsUnit = (unit) => {
    setActiveConundrumsUnit(unit);
    setScreen("conundrumsUnit");
  };

  let screenEl;
  switch (screen) {
    case "testout":
      screenEl = (
        <TestOutScreen onPass={handlePass} onLockOut={handleLockOut} onBack={goLanding} />
      );
      break;
    case "challengeChoice":
      screenEl = (
        <ChallengeChoiceScreen
          passedOnAttempt={passedOnAttempt}
          onChooseChallenge={goChallenge}
          onChooseConundrums={() => setScreen("conundrums")}
          // Challenge-adjacent screen — "back" goes to the Challenge
          // screen itself rather than all the way out to Landing.
          onBack={goChallenge}
        />
      );
      break;
    case "conundrums":
      screenEl = (
        <CloddsConundrumsScreen onBack={goChallenge} onSelectUnit={handleSelectConundrumsUnit} />
      );
      break;
    case "conundrumsUnit":
      screenEl = (
        <ConundrumsUnitScreen unit={activeConundrumsUnit} onBack={() => setScreen("conundrums")} />
      );
      break;
    case "challenge":
      screenEl = <ChallengeScreen onBack={goLanding} />;
      break;
    case "support":
      screenEl = (
        <SupportScreen onBack={goLanding} onReadyForTestOut={() => setScreen("testout")} />
      );
      break;
    case "landing":
    default:
      screenEl = (
        <LandingPage
          testOutStatus={testOutStatus}
          onStartTestOut={() => setScreen("testout")}
          onOpenSupport={() => setScreen("support")}
          onContinueToChallenge={goChallengeChoice}
        />
      );
  }

  return (
    <>
      {screenEl}
      <GroggCoachBar />
    </>
  );
}
