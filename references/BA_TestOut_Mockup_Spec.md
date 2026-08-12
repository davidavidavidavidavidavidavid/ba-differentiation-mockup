# Beast Academy differentiation mockup — build spec

## Purpose
Interactive prototype of the test-out / enrichment / challenge flow for the BA differentiation model, for demoing to teachers/stakeholders. Should look and feel like an authentic Beast Academy Classroom (BAC) screen, not a generic UI mockup.

## Reference assets to pull into the project
- BAC Skill Builder Template (HTML)
- BAC Style Guide
- Live Google Doc template (margins: Top 0.25", Bottom 0.5", Left/Right 0.63")
- Official BA Lore/Character document
- Screenshot of the live BAC lesson map (Lesson 8 example — attached separately)

## Visual direction
- Match the real BAC lesson-map aesthetic: wooden clipboard/parchment lesson list on the left, illustrated map (water + forest, numbered lesson markers) on the right, banner-style "Lesson N" header, rounded pill buttons for sub-lessons.
- Use actual BA color palette and iconography where available in the style guide, not the flat neutral CDS palette used in the chat mockup.
- Ms. Q, Grogg, Winnie, Lizzie, and Alex may appear as small illustrated characters/dialogue on feedback or transition screens, following the official lore doc's voice rules (see below). Not required for MVP.

## Screen flow

### 1. Lesson landing page (map view)
- Existing BAC lesson map layout (see screenshot).
- **New element: "Test out" button**, added below the sub-lesson list on the clipboard panel.
  - Default state: enabled, styled as a call-to-action distinct from the sub-lesson pills.
  - Helper text under button: "Score 4 for 4 to unlock the enrichment path."
  - **Locked state** (after 2 failed attempts): button visually disabled (grayed out, no hover/click), helper text replaced with something like "Test-out attempts used. Continue with the regular lesson," styled as a warning/muted state.

### 2. Test-out screen (4 questions)
Triggered by tapping "Test out." Attempt-gated: **2 attempts total**, tracked in state.

Questions (Lesson 8 — long division, example content):
1. 574 ÷ 7
2. 1,332 ÷ 6
3. Critter cards come in packs of 9. Philip has 5,922 critter cards. How many packs did he buy?
4. There are 713 students at school. The principal buys sweaters for all of them in packs of 4. How many packs will she need to buy so every student gets one?

Answer key: 82, 222, 658, 179

Behavior:
- Attempt 1 wrong → inline feedback ("Not quite — you have 1 attempt left"), inputs remain editable, same attempt.
- Attempt 2 wrong → returns to landing page, "Test out" button locks (see above).
- All 4 correct (attempt 1 or 2) → routes to Enrichment screen.
- Open design question (unresolved as of this spec): should a pass on attempt 2 count identically to a pass on attempt 1, or should it be flagged/treated differently for teacher visibility? Decide before final build.

### 3. Enrichment screen
- Confirmation state ("4 for 4 — tested out") plus placeholder container for the actual enrichment packet content (self-guided comic-style instruction, per the differentiation model — not built yet).
- CTA to continue to Challenge screen.

### 4. Challenge screen
- Header: "Challenge: Lesson 8" + note that there are 8 problems total (4 lesson-tied + 4 competition-style), and that completing all 8 unlocks a randomly served unseen bonus problem from a prior lesson (not yet built).
- **Lesson-tied problems (4):**
  1. "Find two true equations" — digit/operator pyramid puzzle (image-based; needs the actual grid rendered, not just text).
  2. Digit puzzle: arrange 2, 7, 9, 9 into ▢▢▢▢ ÷ 9 so the result is a 3-digit number with all even digits.
  3. Digit puzzle: arrange 3, 5, 6, 7 into ▢▢▢▢ ÷ 3 so the result is a 4-digit number, all digits different, ascending order.
  4. Honeycomb path puzzle: "count down by 1" — chain of division facts from Start to Finish (needs the actual honeycomb graphic, not just text description).
- **Competition-style problems (4):**
  5. 4 dogs weigh 384 lbs total; the biggest dog weighs as much as the other 3 combined. How much does the biggest dog weigh?
  6. Fenceposts placed at start and end of a 792-yard path, plus equally spaced between, 9 posts total. About how far apart are the posts?
  7. 32X6Y is divisible by 2, 3, 4, 5, and 9. Find X and Y. *(Flag: divisible by 5 and by 2 together forces the number to end in 0 — double-check this constraint set is intentional, not a typo, before finalizing.)*
  8. Suzanne thinks of a number, divides by 9, adds 9, multiplies by 9 — then divides by 3, adds 3, multiplies by 3 — result is 2,091. Find the starting number.

## Known open items / decisions for later
- Attempt-2-pass handling (see above).
- Whether "Test out" appears per-lesson or once per unit.
- BaTeX-rendered graphics (pyramid puzzle, honeycomb puzzle) can't render live in this app — plan to manually export images from `curriculum.beastclassroom.com/tools/reusable-batex` and drop them in as static assets.
- Content-volume-at-scale and overflow-problem-tracking issues (from the broader differentiation model) are out of scope for this visual prototype but will matter once this becomes a real delivery mechanism.

## Suggested build approach for Claude Code
- Plain HTML/CSS/JS or a lightweight framework (React is fine) — no backend needed for the prototype; state can live in memory.
- Componentize by screen (LandingPage, TestOut, Enrichment, Challenge) with a simple state machine or router between them.
- Keep placeholder content clearly marked as placeholder so it's obvious what's real BA content vs. scaffolding.
