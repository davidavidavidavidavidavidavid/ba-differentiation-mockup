# Copy Inventory — Beast Classroom Differentiation Mockup

Every user-facing string in the app, organized by screen, as of this round of edits. Use this to review/edit copy by hand instead of another instruction round — tell me the row and the new text and I'll make the change.

**Not included:** the ~67 Clod's Conundrums problem prompts/answers/solutions themselves (Units 1–5, sourced from [references/grade4_challenge_pool_original.md](references/grade4_challenge_pool_original.md)) — that file is already a directly-reviewable, single source of truth, so reproducing it here would just be a second copy to keep in sync. Everything the *app* itself authors around those problems (headers, buttons, filters, empty states) **is** listed below, in the Clod's Conundrums section.

---

## Page metadata

| Element | Current copy |
|---|---|
| Browser tab title | `Beast Classroom — Differentiation Prototype` |

---

## Global / shared chrome

These appear identically across most/all screens via `SceneChrome.jsx` and shared components.

| Element | Current copy |
|---|---|
| Back button (default aria-label, when a screen doesn't override it) | `Back to map` |
| Back button aria-label — Test-out, Challenge, Support | `Back to lesson map` |
| Back button aria-label — Challenge Choice | `Back to Challenge` |
| Back button aria-label — Clod's Conundrums (islands) | `Back to Challenge` |
| Back button aria-label — Clod's Conundrums (unit page) | `Back to Clod's Conundrums` |
| "Teacher" badge, shown next to every answer-key/solution reveal (Challenge competition problems, Conundrums unit page) | `(Teacher)` |
| Answer-submit button, shown on every question card app-wide (Test-out, Support, Challenge competition problems, Conundrums) | `Submit` |
| Prev/next problem arrow aria-labels | `Previous question` / `Next question` (Test-out, Conundrums) or `Previous problem` / `Next problem` (Challenge) |

---

## Grogg Coach Bar

The persistent black bar pinned to the bottom of every screen. One line is always showing — a screen's **default** line loads on entry; **hover** lines temporarily replace it while the cursor is over a specific element, then it reverts to the default. All lines live in [src/data/groggCoach.js](src/data/groggCoach.js).

| Trigger | Screen | Current copy |
|---|---|---|
| Default on load | Landing | "Hi. I'm Grogg, EVERYONE's favorite beast. I don't normally talk to strangers, but I'm going to guide you through this demo. I may also lose my classic Grogg voice and instead sound like David Flynn. Please just go with it." |
| Hover a sub-lesson pill | Landing | "These are the existing student portal questions. These aren't new or part of the demo." |
| Hover the 🛟 "Need support?" icon | Landing | "Extra scaffolded practice — this is the least built out part of the demo, the focus is more on extension" |
| Hover the "Test out" button | Landing | "These provide an opportunity for students to demonstrate mastery of the lesson, and skip to more authentic challenge. In print, these are the spot-check problems — meaning the print version is accessible without requiring extra printing." |
| Default on load | Test-out | "Hint: for the demo, here are the answers: 82, 222, 658, and 179." |
| Hover the "Attempt X of 2" indicator | Test-out | "We don't want students retrying indefinitely, but equally don't want them locked out because of a typo — so we'll adopt the standard 2-attempt limit from BA." |
| Default on load | Support | "Nothing here is polished, the demo is more built out for challenge. But this shows the structure of Support. At this point, MVP is just extra scaffolding" |
| Default on load | Challenge Choice | "The two options here are to do 8 problems specific to this lesson, or work back through a bank of challenge problems (that would be made from the challenge problems in early lessons)" |
| Default on load | Challenge | "These are split into 2 groups. Since students skipped some really good stuff in the packet, we want to make sure they see it... or see similar problems. That's the first half. The latter 4 questions are competition-style problems. In most cases these will be tagentially linked to the content of the lesson, but we want them to feel novel, so we'll intentionally write problems that sometimes are less related." |
| Hover a lesson-tied problem (1–4) | Challenge | "These are hard questions in the style of what they skipped in the packet. They're not exact copies, because some students may access this after doing the packet." |
| Click a locked (pyramid/honeycomb) problem | Challenge | "yehh.... sorry, this demo won't let you solve this type of problem. (Gotta save Claude tokens!)" |
| Hover a competition-style problem (5–8) | Challenge | "These are competition style problems. 4 per lesson, with a range of difficulty. These are intentionally different to what we put in the packet, they should feel novel and non-scaffolded, like a competition. These problems might directly relate to the content, or tangentially relate to the content, or we might throw in a (e.g.) spatial reasoning question that doesn't have another home." |
| Default on load | Clod's Conundrums (islands) | "This is the bonus-problem browser for units the class has already covered. Hover a pie chart below to see how difficulty tiers work." |
| Hover a unit's tier pie chart | Clod's Conundrums (islands) | "Difficulty is tiered just like the competition problems — a 3-star problem should be extremely challenging, so it's reasonable a 4th grader might try a 3-star problem from a 2nd-grade unit and still struggle. The colors track progress: light gray is unattempted, dark gray is attempted but not finished, and green is completed. The difficulties should roughly align to the star problems in the packet - though there are no 3-star problems in the packet." |
| Click the blocked "‹ Grade 3" arrow | Clod's Conundrums (islands) | "Grade 3 problems would be accessible to 4th Graders by clicking this arrow — but they are blocked for this demo." |
| Click a demo-blocked unit (Fractions, Multiplication) | Clod's Conundrums (islands) | "Sorry, no demo here. Try units 1 or 3" |
| Default on load, when the unit has real pool questions | Clod's Conundrums (unit page) | "These are a bank of problems that students would have seen in previous units if they had reached that far. Once a lesson is in the past, they are all visible in this view, regardless of whether or not a student reached them in that lesson." |
| Default on load, when the unit's questions failed to load | Clod's Conundrums (unit page) | "Uh oh — I can't find the questions for this unit. Check that grade4_challenge_pool_original.md is still in the references folder and its format hasn't changed." |
| Hover a problem's star rating | Clod's Conundrums (unit page) | "These stars show each problem's difficulty tier — 1 star is easiest, 3 stars is hardest, same scale as the competition-style problems. And aligned to the stars in the workbook." |

---

## Landing (`LandingPage.jsx`)

| Element | Current copy |
|---|---|
| Screen eyebrow / title | `Beast Classroom` / `Lesson 8` |
| Sub-lesson pill 1 | `Long Division Practice 1` |
| Sub-lesson pill 2 | `Division Story Problems 1` |
| Sub-lesson pill 3 | `Scrambled Digits: Division Targets` |
| Support icon aria-label / title | `Need support?` |
| Support icon caption | `Need support?` |
| Test-out button (default state) | `Test out` |
| Test-out helper text (default state) | `Score 4 for 4 to skip straight to the challenge questions.` |
| Test-out button (locked state) | `Test out` (disabled) |
| Locked helper text | `Test-out attempts used. Continue with the regular lesson.` |
| Test-out button (passed state) | `Test out ✓ complete` (disabled) |
| Passed helper text 1 | `You tested out of this practice — you can skip straight to challenge.` |
| "Continue to Challenge" button (passed state) | `Continue to Challenge →` |
| Passed helper text 2 | `Pick up where you left off.` |
| Map pin tooltip (decorative, all 3 pins) | `Prototype: sub-lesson map pins are decorative` |

---

## Support (`SupportScreen.jsx` + `supportProblems.js`)

| Element | Current copy |
|---|---|
| Screen eyebrow / title | `Extra Practice` / `Support: Lesson 8` |
| Intro paragraph | "Same divisor, three problems, a little less help each time — see if the pattern carries you the rest of the way." |
| Problem 1 title (auto-generated from data) | `756 ÷ 7` |
| Problem 1 — "fully worked" tag | `Worked Example` |
| Problem 1, line 1 (Alex) | "756 is 700 plus 56." |
| Problem 1, line 2 (Alex) | "700 ÷ 7 = 100. 56 ÷ 7 = 8." |
| Problem 1, line 3 (Grogg) | "So 756 ÷ 7 is 100 + 8 = 108!" |
| Problem 2 title | `1,456 ÷ 7` |
| Problem 2 callout | "756 + 700 = 1,456 — up 700 from the last one." |
| Problem 2 line (Winnie) | "700 more in the dividend means 700 ÷ 7 = 100 more in the answer." |
| Problem 2 reveal button | `Show first step` |
| Problem 2 reveal text | `1,456 = 1,400 + 56` |
| Problem 2 blank labels | `1,400 ÷ 7 = `, `56 ÷ 7 = `, `1,456 ÷ 7 = ` |
| Problem 3 title | `1,526 ÷ 7` |
| Problem 3 callout | "1,456 + 70 = 1,526 — up another 70 from the last one." |
| Problem 3 reveal button | `Show first step` |
| Problem 3 reveal text | `1,526 = 1,400 + 126` |
| Problem 3 blank labels | `1,400 ÷ 7 = `, `126 ÷ 7 = `, `1,526 ÷ 7 = ` |
| Submit button (each problem with blanks) | `Submit` |
| Footer CTA | `Ready — try test-out again →` |

---

## Test-out (`TestOutScreen.jsx` + `testOutQuestions.js`)

| Element | Current copy |
|---|---|
| Screen eyebrow / title | `Long Division` / `Test Out: Lesson 8` |
| Attempt indicator | `Attempt {n} of 2` |
| Attempt-2 note (after a wrong first attempt) | "Not quite — you have 1 attempt left. Check each answer again below." |
| Question 1 prompt | `574 ÷ 7` |
| Question 2 prompt | `1,332 ÷ 6` |
| Question 3 prompt | "Critter cards come in packs of 9. Philip has 5,922 critter cards. How many packs did he buy?" |
| Question 4 prompt | "There are 713 students at school. The principal buys sweaters for all of them in packs of 4. How many packs will she need to buy so every student gets one?" |
| Answer field label (each question) | `Answer:` |
| Correct feedback | `✓ Correct` |
| Incorrect feedback | `✕ Not quite` |
| Submit button | `Submit` |
| Locked-out note | "That's both attempts used for this test-out." |
| Locked-out button | `Return to lesson map` |
| Passed button | `Continue to Challenge →` |
| Default footer note (mid-attempt) | ` ` |

---

## Challenge Choice (`ChallengeChoiceScreen.jsx`)

| Element | Current copy |
|---|---|
| Screen eyebrow / title | `Test-out unlocked` / `Challenge Unlocked: Lesson 8` |
| Confirmation banner badge | `4/4` |
| Confirmation banner title | `4 for 4 — tested out!` |
| Confirmation banner subtitle | `Long division is locked in.` |
| Intro line | "Try today's challenge, or explore some of Clod's previous conundrums." |
| Primary card eyebrow | `This lesson · default` |
| Primary card title | `Today's Challenge` |
| Primary card subtitle | "8 problems mixing lesson-tied puzzles and competition-style questions." |
| Secondary card eyebrow | `Anytime, any order` |
| Secondary card title | `Clod's Conundrums` |
| Secondary card subtitle | "Bonus problems from units you've already finished." |

---

## Challenge (`ChallengeScreen.jsx` + `challengeProblems.js`)

| Element | Current copy |
|---|---|
| Screen eyebrow / title | `Long Division` / `Challenge: Lesson 8` |
| Section heading | `8 problems, two flavors` |
| Section subheading | "4 problems tied directly to this lesson, plus 4 written in a competition-math style." |
| Score display (static, not tracked) | `Score: 0 / 8` |
| Problem group chip | `Lesson-tied` / `Competition-style` + `· Problem {n} of 8` |
| "View only" suffix on unsolvable problems | `(view only)` |
| **Problem 1 title** | `Find two true equations` |
| Problem 1 description | "A digit/operator pyramid puzzle — combine the digits and operators along the staircase to find two true equations (two tiles are circled as a starting hint)." |
| **Problem 2 title** | `Digit puzzle: four even digits` |
| Problem 2 description | "Arrange 2, 7, 9, 9 into the four blanks so the division below results in a 3-digit number with all even digits." |
| **Problem 3 title** | `Digit puzzle: ascending digits` |
| Problem 3 description | "Arrange 3, 5, 6, 7 into the four blanks so the division below results in a 4-digit number, all digits different, in ascending order." |
| **Problem 4 title** | `Honeycomb path: count down by 1` |
| Problem 4 description | "A branching chain of division facts links Start to Finish — trace a path where each answer counts down by 1 from the last." |
| Digit-puzzle "reset" button (Problems 2 & 3) | `Reset digits` |
| Digit-puzzle success feedback | `✓ That works!` |
| Digit-puzzle failure feedback | `Not quite yet — try another arrangement.` |
| **Problem 5 title / source tag** | `Problem 5` / `Unit 5 · Q1` |
| Problem 5 prompt | "Marisol picks a number, divides it by 4, adds 9, then multiplies the result by 6. She gets 90. What number did she start with?" |
| Problem 5 solution text | "Answer: 24. Working backward: 90 ÷ 6 = 15, so (n ÷ 4) + 9 = 15, meaning n ÷ 4 = 6, so n = 24." |
| **Problem 6 title / source tag** | `Problem 6` / `Unit 5 · Q2` |
| Problem 6 prompt | "A four-digit number uses the digits 1, 2, 3, and 6, each exactly once. The number is divisible by 4. How many such numbers are there?" |
| Problem 6 solution text | "Answer: 8. A number is divisible by 4 exactly when its last two digits are. Among 1, 2, 3, 6, the two-digit endings divisible by 4 are 12, 16, 32, and 36 — 4 options. For each, the remaining two digits can go in front in 2 orders, so 4 × 2 = 8 numbers." |
| **Problem 7 title / source tag** | `Problem 7` / `Unit 5 · Q3` |
| Problem 7 prompt | "The five-digit number 36X2Y is divisible by 4, 5, and 9. What is X + Y?" |
| Problem 7 solution text | "Answer: 7 (X = 7, Y = 0). Divisible by 5 means Y is 0 or 5; divisible by 4 needs the last two digits \"2Y\" divisible by 4, which only works for Y = 0 (20 ÷ 4 = 5). Divisible by 9 means the digit sum 3+6+X+2+0 = 11+X is a multiple of 9, so X = 7. X + Y = 7." |
| **Problem 8 title / source tag** | `Problem 8` / `Unit 5 · Q4` |
| Problem 8 prompt | "In Mr. Diaz's class, there are twice as many girls as boys. There are 24 children in the class. How many boys are there?" |
| Problem 8 solution text | "Answer: 8. Girls are twice the boys, so boys + girls = 3 × boys = 24, giving boys = 8." |
| Answer field label (Problems 5–8) | `Answer:` |
| Correct feedback | `✓ Correct` |
| Incorrect feedback | `✕ Not quite` |
| Submit button (Problems 5–8) | `Submit` |
| Solution toggle button | `Show solution` / `Hide solution` |
| Teacher badge (Problems 5–8 only) | `(Teacher)` |

---

## Clod's Conundrums — islands map (`CloddsConundrumsScreen.jsx` + `units.js`)

| Element | Current copy |
|---|---|
| Screen eyebrow / title | `Bonus problems` / `Clod's Conundrums` |
| Grade nav label | `Grade 4` |
| Blocked "previous grade" arrow aria-label / title | `Previous grade (blocked in this demo)` / `Grade 3` |
| Disabled "next grade" arrow aria-label | `Next grade (not applicable)` |
| Locked unit tooltip | `Not reached by the class yet` |
| Demo-blocked unit tooltip (Fractions, Multiplication) | `No demo content for this unit` |
| Unit 1 name | `Factors and Multiples` |
| Unit 2 name | `Fractions` |
| Unit 3 name | `Big Numbers` |
| Unit 4 name | `Multiplication` |
| Unit 5 name | `Division` |
| Unit 6 / 7 / 8 names (locked placeholders) | `Unit 6`, `Unit 7`, `Unit 8` |
| Legend item 1 | `Not started` |
| Legend item 2 | `In progress` |
| Legend item 3 | `Completed` |
| Legend item 4 | `Not yet reached` |

---

## Clod's Conundrums — unit page (`ConundrumsUnitScreen.jsx`)

| Element | Current copy |
|---|---|
| Screen eyebrow / title | `Clod's Conundrums` / `{Unit name} — Sample Problems` |
| Empty-state title/eyebrow (no unit selected) | `Sample problems` / `Clod's Conundrums` |
| Tier filter label | `Show difficulty:` |
| Answer field label | `Answer:` |
| Correct feedback | `✓ Correct` |
| Incorrect feedback | `✕ Not quite` |
| Submit button | `Submit` |
| Answer-reveal toggle button | `Show answer` / `Hide answer` |
| Teacher badge | `(Teacher)` |
| Revealed-answer prefix | `Answer: {value}` |
| No-unit-selected empty state | `No unit selected.` |
| Filtered-to-nothing empty state | "No sample problems match the current star filter for this unit. Try including more tiers." |
| Flagged-question prefix (from source doc's `*Flag: ...*` lines, rare) | `⚠️ {flag text}` |

---

## Notes for whoever edits this

- Rows in **bold** ("Problem N title") are app-authored labels wrapping content that itself comes from the reference doc (Challenge Problems 5–8) — the prompt/solution text is pulled verbatim from `references/grade4_challenge_pool_original.md`, Unit 5, Q1–4.
- The Grogg Coach Bar lines are the only copy written in a specific "voice" (a demo narrator talking to whoever's running the demo, not a student) — everything else is plain screen/UI copy.
- Support's "Submit" button does **not** get a `(Teacher)` pill — it's genuine student self-checking of blanks, not an answer-key reveal, so it didn't fit that pattern.
