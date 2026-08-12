// Lightweight free-response grading for the challenge-pool's varied answer
// formats — not just numbers (e.g. "16 (1×3×5×7)", "a quarter the size",
// "in front — 23057", "either 7 or 8", "DDFDDEE"). This is deliberately a
// heuristic, not a real grader: it strips an answer down to its "primary"
// value (before any parenthetical/dash explanation) and accepts either an
// exact match against that, or the input appearing as a standalone token
// in the full answer text (which conveniently also accepts either valid
// option in "either 7 or 8"-style answers). Good enough for a demo; it can
// occasionally be too lenient (e.g. a coincidental number mentioned in an
// explanation) — that trade-off is intentional given the format variety.
function normalize(s) {
  return String(s)
    .toLowerCase()
    .replace(/−/g, "-") // unicode minus -> ascii hyphen (keeps negatives)
    .replace(/,/g, "") // thousands-separator commas
    .replace(/[^a-z0-9\s-]/g, " ") // other punctuation -> space
    .replace(/\s+/g, " ")
    .trim();
}

function extractPrimaryAnswer(rawAnswer) {
  const cut = String(rawAnswer).split(/\s*[(—]/)[0]; // stop at "(" or em dash
  return cut.trim() || String(rawAnswer).trim();
}

export function checkAnswer(input, rawAnswer) {
  const normInput = normalize(input);
  if (!normInput) return false;

  const primary = normalize(extractPrimaryAnswer(rawAnswer));
  if (normInput === primary) return true;

  const fullTokens = normalize(rawAnswer).split(" ");
  return fullTokens.includes(normInput);
}
