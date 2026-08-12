// Loads the REAL reference example questions for Clod's Conundrums straight
// out of the references folder (single source of truth — nothing here is
// hand-transcribed/duplicated). If the file moves, gets renamed, or its
// format changes enough that a unit's questions can't be found, callers
// get that back explicitly (see `warnings`) instead of silently pretending
// everything's fine — the UI is expected to surface that via the Demo
// Guide persona rather than quietly falling back to mock-only content.
import poolMarkdown from "../../references/grade4_challenge_pool_original.md?raw";

const UNIT_HEADER_RE = /^##\s*Unit\s+(\d+):\s*(.+)$/;
const QUESTION_HEADER_RE = /^\*\*Question\s+(\d+)\*\*\s*\(([\d.]+)\s*pts?\)/;
const ANSWER_LINE_RE = /^\*Answer:\s*(.+?)\*\s*$/;
const FLAG_LINE_RE = /^\*Flag:\s*(.+?)\*\s*$/;

function parsePool(markdown) {
  const units = {};
  const warnings = [];

  if (!markdown || typeof markdown !== "string" || markdown.trim().length === 0) {
    warnings.push("grade4_challenge_pool_original.md loaded empty or missing.");
    return { units, warnings };
  }

  const lines = markdown.split("\n");
  let currentUnit = null;
  let currentQuestion = null;

  const flushQuestion = () => {
    if (currentQuestion && currentUnit) {
      currentQuestion.prompt = currentQuestion.promptLines.join(" ").trim();
      delete currentQuestion.promptLines;
      units[currentUnit].questions.push(currentQuestion);
    }
    currentQuestion = null;
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    const unitMatch = line.match(UNIT_HEADER_RE);
    if (unitMatch) {
      flushQuestion();
      currentUnit = Number(unitMatch[1]);
      units[currentUnit] = { id: currentUnit, name: unitMatch[2].trim(), questions: [] };
      continue;
    }

    const qMatch = line.match(QUESTION_HEADER_RE);
    if (qMatch && currentUnit) {
      flushQuestion();
      currentQuestion = {
        number: Number(qMatch[1]),
        points: Number(qMatch[2]),
        promptLines: [],
        answer: null,
        flagged: null,
      };
      continue;
    }

    if (currentQuestion) {
      const answerMatch = line.match(ANSWER_LINE_RE);
      if (answerMatch) {
        currentQuestion.answer = answerMatch[1].trim();
        continue;
      }
      const flagMatch = line.match(FLAG_LINE_RE);
      if (flagMatch) {
        currentQuestion.flagged = flagMatch[1].trim();
        continue;
      }
      if (line.length > 0) {
        currentQuestion.promptLines.push(line);
      }
    }
  }
  flushQuestion();

  const unitCount = Object.keys(units).length;
  if (unitCount === 0) {
    warnings.push(
      "No \"## Unit N: Name\" sections found — the file's format may have changed."
    );
  }
  for (const unit of Object.values(units)) {
    if (unit.questions.length === 0) {
      warnings.push(`Unit ${unit.id} (${unit.name}) parsed with zero questions.`);
    }
  }

  return { units, warnings };
}

const PARSED = parsePool(poolMarkdown);

export const CHALLENGE_POOL_UNITS = PARSED.units;
export const CHALLENGE_POOL_WARNINGS = PARSED.warnings;

// unitId -> { id, name, questions } | undefined
export function getPoolQuestionsForUnit(unitId) {
  return CHALLENGE_POOL_UNITS[unitId];
}
