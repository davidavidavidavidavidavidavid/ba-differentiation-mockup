import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { GroggCoachProvider } from "./context/GroggCoachContext.jsx";

import "./styles/global.css";
import "./styles/landing.css";
import "./styles/testout.css";
import "./styles/challengeChoice.css";
import "./styles/challenge.css";
import "./styles/support.css";
import "./styles/conundrums.css";
import "./styles/coachbar.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GroggCoachProvider>
      <App />
    </GroggCoachProvider>
  </StrictMode>
);
