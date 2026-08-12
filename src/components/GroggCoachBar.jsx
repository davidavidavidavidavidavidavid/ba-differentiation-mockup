import { useGroggCoach } from "../context/GroggCoachContext";
import groggFace from "../assets/characters/Grogg.png";

// The persistent bottom coach bar — the ONLY Grogg-voiced UI element in
// the app. Always mounted (see App.jsx), never dismissed, never a popup.
// Deliberately plain otherwise: no decorative icons, no emoji — just
// Grogg's face (the same official art used elsewhere) and the line, in
// Finger Paint / #674ea7 (see styles/coachbar.css).
export default function GroggCoachBar() {
  const { message } = useGroggCoach();
  return (
    <div className="ba-coach-bar">
      <img className="ba-coach-bar__face" src={groggFace} alt="Grogg" />
      <span className="ba-coach-bar__text">{message}</span>
    </div>
  );
}
