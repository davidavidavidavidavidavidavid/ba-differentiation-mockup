// Lines for the persistent Grogg coach bar (see components/GroggCoachBar.jsx
// and context/GroggCoachContext.jsx). This Grogg talks to whoever's
// running the demo about design choices — real vs. placeholder, why a
// screen looks the way it does — never to a student. Every
// demo-orientation aside in the app should live here, not as one-off
// on-screen copy or a popup.
export const COACH_LINES = {
  // Landing — default on load.
  landing:
    "Hi. I'm Grogg, EVERYONE's favorite beast. I don't normally talk to strangers, but I'm going to guide you through this demo. I may also lose my classic Grogg voice and instead sound like David Flynn. Please just go with it.",
  // Landing — hovering any of the 3 existing sub-lesson pills.
  subLessonHover:
    "These are the existing student portal questions. These aren't new or part of the demo.",
  // Landing — hovering the "Need support?" icon.
  supportIconHover:
    "Extra scaffolded practice — this is the least built out part of the demo, the focus is more on extension",
  // Landing — hovering the "Test out" button.
  testOutButtonHover:
    "These provide an opportunity for students to demonstrate mastery of the lesson, and skip to more authentic challenge. In print, these are the spot-check problems — meaning the print version is accessible without requiring extra printing.",

  // Test-out — default (stays up throughout; this is the one the tester
  // actually needs to get through the screen).
  testOut: "Hint: for the demo, here are the answers: 82, 222, 658, and 179.",
  // Test-out — hovering the "Attempt X of 2" indicator.
  attemptPipsHover:
    "We don't want students retrying indefinitely, but equally don't want them locked out because of a typo — so we'll adopt the standard 2-attempt limit from BA.",

  // Support — default.
  supportDefault:
    "Nothing here is polished, the demo is more built out for challenge. But this shows the structure of Support. At this point, MVP is just extra scaffolding",

  // Challenge Choice — default.
  challengeChoiceDefault:
    "The two options here are to do 8 problems specific to this lesson, or work back through a bank of challenge problems (that would be made from the challenge problems in early lessons)",

  // Challenge — default, and hover states for the two problem groups.
  challengeDefault:
    "These are split into 2 groups. Since students skipped some really good stuff in the packet, we want to make sure they see it... or see similar problems. That's the first half. The latter 4 questions are competition-style problems. In most cases these will be tagentially linked to the content of the lesson, but we want them to feel novel, so we'll intentionally write problems that sometimes are less related.",
  challenge14Hover:
    "These are hard questions in the style of what they skipped in the packet. They're not exact copies, because some students may access this after doing the packet.",
  challenge14Click:
    "yehh.... sorry, this demo won't let you solve this type of problem. (Gotta save Claude tokens!)",
  challenge58Hover:
    "These are competition style problems. 4 per lesson, with a range of difficulty. These are intentionally different to what we put in the packet, they should feel novel and non-scaffolded, like a competition. These problems might directly relate to the content, or tangentially relate to the content, or we might throw in a (e.g.) spatial reasoning question that doesn't have another home.",

  // Clod's Conundrums (islands page) — default, pie-chart hover, blocked
  // grade-nav arrow.
  conundrumsDefault:
    "This is the bonus-problem browser for units the class has already covered. Hover a pie chart below to see how difficulty tiers work.",
  conundrumsPieHover:
    "Difficulty is tiered just like the competition problems — a 3-star problem should be extremely challenging, so it's reasonable a 4th grader might try a 3-star problem from a 2nd-grade unit and still struggle. The colors track progress: light gray is unattempted, dark gray is attempted but not finished, and green is completed. The difficulties should roughly align to the star problems in the packet - though there are no 3-star problems in the packet.",
  grade3Blocked:
    "Grade 3 problems would be accessible to 4th Graders by clicking this arrow — but they are blocked for this demo.",
  // Clod's Conundrums (islands page) — clicking a unit with no demo content
  // (currently Fractions and Multiplication).
  conundrumsUnitBlocked: "Sorry, no demo here. Try units 1 or 3",

  // Clod's Conundrums unit page — real-content confirmation / loader
  // failure, and the star-rating hover on each problem.
  conundrumsRealContent:
    "These are a bank of problems that students would have seen in previous units if they had reached that far. Once a lesson is in the past, they are all visible in this view, regardless of whether or not a student reached them in that lesson.",
  conundrumsLoaderMissing:
    "Uh oh — I can't find the questions for this unit. Check that grade4_challenge_pool_original.md is still in the references folder and its format hasn't changed.",
  starRatingHover:
    "These stars show each problem's difficulty tier — 1 star is easiest, 3 stars is hardest, same scale as the competition-style problems. And aligned to the stars in the workbook.",
};
