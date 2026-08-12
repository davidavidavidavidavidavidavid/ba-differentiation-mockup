import { createContext, useContext, useRef, useState } from "react";

// A single, app-wide "coach commentary track" — Grogg talking to whoever
// is running the demo (not to a student) about why a screen looks the way
// it does. Rendered once, persistently, by GroggCoachBar (see App.jsx) —
// never as a popup or per-screen bubble. Each screen sets its own idle
// "default" message on mount; hoverable elements call `hover(msg)` on
// mouseenter and `resetToDefault()` on mouseleave so the bar settles back
// to that screen's default when nothing's being explained right now.
const GroggCoachContext = createContext(null);

export function GroggCoachProvider({ children }) {
  const [message, setMessage] = useState("");
  const defaultRef = useRef("");

  const setDefault = (msg) => {
    defaultRef.current = msg;
    setMessage(msg);
  };

  const hover = (msg) => setMessage(msg);
  const resetToDefault = () => setMessage(defaultRef.current);

  return (
    <GroggCoachContext.Provider value={{ message, setDefault, hover, resetToDefault }}>
      {children}
    </GroggCoachContext.Provider>
  );
}

export function useGroggCoach() {
  const ctx = useContext(GroggCoachContext);
  if (!ctx) {
    throw new Error("useGroggCoach must be used within a GroggCoachProvider");
  }
  return ctx;
}
