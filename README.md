# Beast Classroom Differentiation Mockup

Interactive prototype of the Beast Classroom (BC) test-out / support /
challenge flow, built to spec across several rounds: the initial
test-out/support/challenge flow, an Enrichment-choice split and Clod's
Conundrums, real challenge-pool content and a star-difficulty filter, a
persistent "Grogg coach bar" that replaced every in-app speech bubble as
the app's one demo-orientation voice, and — most recently — retiring the
"Enrichment" concept entirely in favor of "test-out unlocks the Challenge
content," plus turning Clod's Conundrums sample problems into a real
answerable page instead of a viewer/modal.

## Run it

```bash
npm install
npm run dev
```

Open the printed local URL (typically http://localhost:5173).

## What's here

Seven screens, wired together with a simple state machine in
[src/App.jsx](src/App.jsx) (no router library, no backend — state lives in
memory and resets on reload):

1. **Landing** ([src/screens/LandingPage.jsx](src/screens/LandingPage.jsx)) —
   BC lesson-map layout (wooden clipboard + illustrated water/forest map),
   matched to the reference screenshot. A small **🛟 icon at the start of
   the sub-lesson list** (not a button at the bottom) opens **Support** —
   always enabled, never gated. Below the sub-lesson list: **Test out**
   (primary/amber, disables and shows a muted warning after 2 failed
   attempts). Once test-out is passed, a **Continue to Challenge →** button
   (green) appears here too — without it, leaving the Challenge flow for
   the map was a dead end with no way back in.
2. **Test-out** ([src/screens/TestOutScreen.jsx](src/screens/TestOutScreen.jsx))
   — the 4 Lesson 8 long-division questions, one per screen with a numbered
   pager bar up top to jump straight to any question. Each question has its
   own "Check this answer" button — checked individually, not all at once,
   and a correct answer submits *and* advances to the next question in one
   action (wrong answers stay put so the "Not quite" feedback is visible).
   The moment all 4 have been checked at least once, the attempt resolves:
   2-attempt gating, a wrong attempt 1 silently rolls into attempt 2
   (answers stay, marks clear so you re-verify each), a wrong attempt 2
   routes back to Landing and locks the button.
3. **Support** ([src/screens/SupportScreen.jsx](src/screens/SupportScreen.jsx))
   — reached from Landing's 🛟 icon. A backup-a-step intervention scoped
   tightly to 4.NBT.B.6 *without remainders*: 3 related 756/1,456/1,526 ÷ 7
   problems with deliberately decreasing scaffolding (fully worked →
   partially scaffolded with a reveal and fill-in blanks → most faded,
   numbers only) — see [src/data/supportProblems.js](src/data/supportProblems.js).
   The worked-example lines render as plain instructional text (no
   character-dialogue bubbles — see "Grogg coach bar" below for why). Ends
   with a "Ready — try test-out again" button that routes straight back
   into **Test-out** (not Landing).
4. **Challenge Choice** ([src/screens/ChallengeChoiceScreen.jsx](src/screens/ChallengeChoiceScreen.jsx))
   — shown right after a passing Test-out. Shows the "4 for 4" confirmation,
   a plain screen-copy line, then one cohesive choice row: **Today's
   Challenge** (larger, primary/default — routes straight into the
   Challenge screen below, no stand-in screen in between) and **Clod's
   Conundrums** (smaller, secondary) sit side by side — neither gates the
   other. This screen's "back" returns to the Challenge screen itself
   (it's challenge-adjacent, not a detour back out to Landing).
5. **Challenge** ([src/screens/ChallengeScreen.jsx](src/screens/ChallengeScreen.jsx))
   — all 8 Lesson 8 challenge problems, one per screen via a numbered pager
   (with a divider + color split between the 4 lesson-tied and 4
   competition-style problems). Lesson-tied problems 1 and 4 render actual
   hand-built graphics — [PyramidPuzzle](src/components/PyramidPuzzle.jsx)
   (a staircase digit/operator grid) and
   [HoneycombPuzzle](src/components/HoneycombPuzzle.jsx) (a branching
   division-fact lattice), both verified against reference puzzle
   screenshots; these two aren't wired for real input, so clicking either
   surfaces a joke refusal via the coach bar instead of pretending they're
   solvable. Problems 2–3 are playable digit-arrangement puzzles. Problems
   5–8 are **real content** pulled from
   `references/grade4_challenge_pool_original.md` (Unit 5: Division, Q1–4),
   each with an actual free-text answer input + Check button (not just a
   solution reveal), plus a source byline, a star-difficulty rating in
   place of the raw point value, and a "Show solution" fallback. Per spec,
   scoring is intentionally generic/static — a plain "Score: 0 / 8"
   readout, no real completion tracking or bonus-access logic
   (demo-only scope).
6. **Clod's Conundrums** ([src/screens/CloddsConundrumsScreen.jsx](src/screens/CloddsConundrumsScreen.jsx))
   — just the island grid now (the star-difficulty filter used to live
   here; it moved to the unit page below, since it filters that unit's
   problems specifically). Every tile — reached or locked — sits on the
   same hand-built island art ([IslandArt.jsx](src/components/IslandArt.jsx);
   no dedicated island asset was found in the references, so this is an
   original SVG blob reusing the Landing map's forest-green
   palette/foliage-dot technique). Units 1–5 are reached; 6–8 stay
   grayscale with a padlock, no progress shown. Each reached unit shows
   **3 small pie charts**, one per difficulty tier (1★/2★/3★)
   ([TierPie.jsx](src/components/TierPie.jsx) — a 3-way mock split of
   completed/green, attempted-not-finished/dark-gray, and
   unattempted/light-gray; see [src/data/units.js](src/data/units.js)).
   A **Grade 3 arrow** sits above the grid — clicking it doesn't navigate
   anywhere; it's a demo-only dead end that flags itself as blocked via the
   coach bar. Legend at the bottom explains the pie colors and lock icon.
   Back button returns to the Challenge screen.
7. **Clod's Conundrums — unit page** ([src/screens/ConundrumsUnitScreen.jsx](src/screens/ConundrumsUnitScreen.jsx))
   — reached by picking a unit on the islands grid. A **real, full page**
   (not a modal/viewer) styled like Test-out: paged one-question-at-a-time,
   an actual type-and-check answer input, a "Show answer" fallback, and the
   **star-difficulty filter** (1★/2★/3★ toggle chips, all on by default)
   that genuinely restricts which of that unit's problems are shown/
   reachable. Questions are pulled live from
   `references/grade4_challenge_pool_original.md` (see
   [src/data/challengePool.js](src/data/challengePool.js) — parses the
   markdown at build time via a `?raw` import, so there's a single source
   of truth instead of a hand-transcribed copy). Point values are shown as
   a star rating (see [utils/tier.js](src/utils/tier.js)); free-text
   answers across the pool's varied formats (numbers, phrases, letter
   codes) are graded by a deliberately-heuristic checker
   ([utils/answerMatch.js](src/utils/answerMatch.js)) — hence the "Show
   answer" fallback, since it won't catch every valid phrasing. If a
   unit's questions can't be found at all (missing file, changed format),
   that's flagged explicitly through the coach bar rather than silently
   showing nothing. Back returns to the islands grid.

The question pager itself — numbered tabs you click to jump to any
question/problem, plus prev/next arrows — is a shared component,
[src/components/QuestionNavBar.jsx](src/components/QuestionNavBar.jsx), used
by Test-out, Challenge, and the Conundrums unit page.

**Grogg coach bar** — the app's only "voice," and a persona distinct from
any in-universe character dialogue (there is none left in the UI — see
below). This Grogg talks to whoever is *running the demo*, not to a
student, explaining design choices: why a screen looks the way it does,
what's real vs. placeholder, what a button does and why. It's a single,
constant, persistent bar spanning the bottom of every screen — never a
popup, never dismissed, never re-mounted per screen (rendered once in
[App.jsx](src/App.jsx), outside the screen switch). Set in the "Finger
Paint" Google Font, colored `#674ea7`, with Grogg's face (the same real
character art used before) and no other decorative icons/emoji.

State lives in a small context —
[GroggCoachContext.jsx](src/context/GroggCoachContext.jsx) — with two
moves: each screen sets its own idle **default** message on mount, and any
element can call **hover** on mouseenter (reverting to that screen's
default on mouseleave; a couple of spots use it on **click** instead, for
things that aren't really "hoverable" — the Challenge joke refusal, the
blocked Grade 3 arrow). All the lines live in
[data/groggCoach.js](src/data/groggCoach.js):

- Landing: greets on load; hovering a sub-lesson pill, the 🛟 icon, or the
  "Test out" button each override briefly.
- Test-out: a standing default line with the demo answers (so a run-through
  doesn't require knowing the answer key), plus a hover on the "Attempt X
  of 2" indicator explaining the 2-attempt limit.
- Challenge: default explains to hover a problem; hovering problems 1–4 vs.
  5–8 shows a different explanation for each group; clicking problem 1 or
  4 surfaces the joke refusal.
- Clod's Conundrums (islands): default explains the screen; hovering a
  tier pie explains both the difficulty-tiering logic and what the pie
  colors mean; clicking the Grade 3 arrow flags it as blocked.
- Clod's Conundrums (unit page): confirms real vs. mock content (or flags
  a loader failure) on load; hovering a problem's star rating explains the
  scale.
- Support / Challenge Choice: each has its own default explaining what's
  real there.

Since this bar is the sole explanatory channel, **every other speech
bubble was removed app-wide** — including the in-universe
Winnie/Alex/Lizzie/Ms. Q/Clod dialogue from earlier rounds. The Support
screen's worked-example *text* (the actual scaffolding content, e.g. "756
is 700 plus 56") was kept — just re-rendered as plain paragraphs instead of
character-voiced bubbles, so removing the chrome didn't gut the pedagogy.
`CharacterAvatar.jsx`, `SpeechBubble.jsx`, and `data/characters.js` were
deleted as dead code once nothing rendered them anymore; the real
character-art PNGs are still in `src/assets/characters/` (Grogg's is now
imported directly by the coach bar) and the originals are in
`references/Grade 4/`.

Visual system lives in [src/styles/tokens.css](src/styles/tokens.css) and
[src/styles/global.css](src/styles/global.css): the outdoor/parchment/wood
palette is pulled from the live BC lesson-map screenshot; the CTA/badge
accent triad (navy/orange/sky-blue) is pulled from the wave graphic in the
official BC doc templates, and body copy uses Roboto per the BC style guide.

## Navigation summary

- Landing → (Test out) → Test-out → pass → Challenge Choice → Today's
  Challenge → **Challenge** (directly — no stand-in screen anymore)
- Landing → (Test out) → Test-out → pass → Challenge Choice → Clod's
  Conundrums → pick a unit → **Conundrums unit page** (either order vs.
  Challenge — neither gates the other)
- Landing → (Test out) → Test-out → fail ×2 → back to Landing, locked
- Landing → (Need support?) → Support → (Ready, try again) → **Test-out**
  directly (not Landing)
- Challenge Choice's and Clod's Conundrums' "back" both return to the
  **Challenge** screen, not Landing/Home — they're challenge-adjacent, so
  backing out of them shouldn't dump you all the way out of the flow.

## Known open items — flagged, not built

- **Attempt-2-pass handling**: whether passing on attempt 2 should count
  identically to attempt 1 or be flagged for teacher visibility is
  unresolved. `passedOnAttempt` is tracked in state
  ([src/App.jsx](src/App.jsx)) and stashed on the Challenge Choice
  confirmation banner as a `data-passed-on-attempt` attribute as a hook
  point, but not surfaced in the UI yet.
- Whether "Test out" appears per-lesson or once per unit.
- The pyramid and honeycomb puzzle graphics are hand-built approximations
  for this prototype (see code comments in
  [PyramidPuzzle.jsx](src/components/PyramidPuzzle.jsx) and
  [HoneycombPuzzle.jsx](src/components/HoneycombPuzzle.jsx)), not exports
  from the BA Editor — though both were checked against reference
  screenshots and match closely. They're also not wired for real input
  (see the Challenge-screen note above).
- Cross-grade bonus-problem pool, difficulty tagging, and real
  scoring/tracking logic — deferred for both the Challenge screen (static
  "Score: 0 / 8") and Clod's Conundrums (static mock per-tier pie data,
  see [src/data/units.js](src/data/units.js); the Grade 3 arrow is a
  demo-only dead end, not a real cross-grade browser).
- Unit names for Units 6–8 on Clod's Conundrums are unsourced placeholders
  (the challenge-pool doc only covers Units 1–5) — shown locked either way.
- The free-text answer checker ([utils/answerMatch.js](src/utils/answerMatch.js))
  is a heuristic, not a real grader — it can be too lenient on some
  explanation-heavy answers. A "Show answer"/"Show solution" fallback is
  always available anywhere it's used.
