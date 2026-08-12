import { pointsToTier } from "./tier";

// Derives a per-question "already solved" mock flag from the unit's
// tier-level mock percentages (see data/units.js), so the two stay
// consistent — e.g. if a unit's 2-star tier is mocked at 40% completed,
// roughly the first 40% of that unit's real 2-star questions (by their
// fixed original number) show as already-solved here. This is static/mock
// only, not real tracking — it exists purely so the unit page's numbered
// problem list visually agrees with the progress pies shown on the
// islands page, without hand-authoring a status for every problem
// (some units have dozens).
export function computeMockSolvedNumbers(unit, questions) {
  const solved = new Set();
  if (!unit?.tiers || !questions?.length) return solved;

  for (let tierIndex = 0; tierIndex < unit.tiers.length; tierIndex++) {
    const tier = tierIndex + 1;
    const tierMock = unit.tiers[tierIndex];
    const group = questions
      .filter((q) => pointsToTier(q.points) === tier)
      .sort((a, b) => a.number - b.number);
    const completedCount = Math.round((group.length * (tierMock?.completed ?? 0)) / 100);
    for (let i = 0; i < completedCount; i++) {
      solved.add(group[i].number);
    }
  }
  return solved;
}
