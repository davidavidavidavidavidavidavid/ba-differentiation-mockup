// Maps the challenge pool's point values to a 1/2/3-star difficulty
// rating. The pool only ever uses 3, 4, or 5 pts (verified against
// references/grade4_challenge_pool_original.md), so this is a clean,
// order-preserving mapping — not an arbitrary guess:
//   3 pts -> 1 star, 4 pts -> 2 stars, 5 pts -> 3 stars.
// Anything outside that range clamps to the nearest tier rather than
// throwing, in case the source doc ever adds a 2pt/6pt question.
export function pointsToTier(points) {
  const tier = Number(points) - 2;
  return Math.min(3, Math.max(1, tier));
}
