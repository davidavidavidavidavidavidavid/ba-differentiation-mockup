// Challenge: Lesson 8 — 4 lesson-tied puzzles + 4 competition-style problems.
// The 4 competition-style problems are real content, pulled from
// references/grade4_challenge_pool_original.md (Unit 5: Division, Q1–4) —
// not placeholders. Completing all 8 is meant to unlock a randomly served,
// unseen bonus problem from a prior lesson. Per spec, the cross-grade
// bonus pool, difficulty tagging, and real scoring/tracking are explicitly
// deferred — this prototype only shows the static "Score: 0 / 8" and the
// unlock note.

export const LESSON_TIED_PROBLEMS = [
  {
    id: "lt1",
    kind: "pyramid",
    title: "Find two true equations",
    description:
      "A digit/operator pyramid puzzle — combine the digits and operators along the staircase to find two true equations (two tiles are circled as a starting hint).",
  },
  {
    id: "lt2",
    kind: "digit-arrange",
    title: "Digit puzzle: four even digits",
    description:
      "Arrange 2, 7, 9, 9 into the four blanks so the division below results in a 3-digit number with all even digits.",
    digits: [2, 7, 9, 9],
    divisor: 9,
    blanks: 4,
    check: (value) => {
      const quotient = value / 9;
      if (!Number.isInteger(quotient)) return false;
      const digits = String(quotient).split("");
      return digits.length === 3 && digits.every((d) => Number(d) % 2 === 0);
    },
  },
  {
    id: "lt3",
    kind: "digit-arrange",
    title: "Digit puzzle: ascending digits",
    description:
      "Arrange 3, 5, 6, 7 into the four blanks so the division below results in a 4-digit number, all digits different, in ascending order.",
    digits: [3, 5, 6, 7],
    divisor: 3,
    blanks: 4,
    check: (value) => {
      const quotient = value / 3;
      if (!Number.isInteger(quotient)) return false;
      const digits = String(quotient).split("");
      if (digits.length !== 4) return false;
      const unique = new Set(digits).size === 4;
      const ascending = digits.every(
        (d, i) => i === 0 || Number(d) > Number(digits[i - 1])
      );
      return unique && ascending;
    },
  },
  {
    id: "lt4",
    kind: "honeycomb",
    title: "Honeycomb path: count down by 1",
    description:
      "A branching chain of division facts links Start to Finish — trace a path where each answer counts down by 1 from the last.",
  },
];

// Pulled verbatim (light rewording only where the source used "the
// result" vs. "then multiplies") from references/grade4_challenge_pool_original.md,
// Unit 5: Division, Questions 1–4. Exact wording carried over from that
// doc. `points` is the pool's raw point value — rendered as a star rating
// (see utils/tier.js) rather than shown as a number.
export const COMPETITION_PROBLEMS = [
  {
    id: "cp5",
    title: "Problem 5",
    source: "Unit 5 · Q1",
    points: 4,
    prompt:
      "Marisol picks a number, divides it by 4, adds 9, then multiplies the result by 6. She gets 90. What number did she start with?",
    answer: "24",
    solution:
      "Working backward: 90 ÷ 6 = 15, so (n ÷ 4) + 9 = 15, meaning n ÷ 4 = 6, so n = 24.",
  },
  {
    id: "cp6",
    title: "Problem 6",
    source: "Unit 5 · Q2",
    points: 5,
    prompt:
      "A four-digit number uses the digits 1, 2, 3, and 6, each exactly once. The number is divisible by 4. How many such numbers are there?",
    answer: "8",
    solution:
      "A number is divisible by 4 exactly when its last two digits are. Among 1, 2, 3, 6, the two-digit endings divisible by 4 are 12, 16, 32, and 36 — 4 options. For each, the remaining two digits can go in front in 2 orders, so 4 × 2 = 8 numbers.",
  },
  {
    id: "cp7",
    title: "Problem 7",
    source: "Unit 5 · Q3",
    points: 5,
    prompt: "The five-digit number 36X2Y is divisible by 4, 5, and 9. What is X + Y?",
    answer: "7 (X = 7, Y = 0)",
    solution:
      "Divisible by 5 means Y is 0 or 5; divisible by 4 needs the last two digits \"2Y\" divisible by 4, which only works for Y = 0 (20 ÷ 4 = 5). Divisible by 9 means the digit sum 3+6+X+2+0 = 11+X is a multiple of 9, so X = 7. X + Y = 7.",
  },
  {
    id: "cp8",
    title: "Problem 8",
    source: "Unit 5 · Q4",
    points: 4,
    prompt:
      "In Mr. Diaz's class, there are twice as many girls as boys. There are 24 children in the class. How many boys are there?",
    answer: "8",
    solution:
      "Girls are twice the boys, so boys + girls = 3 × boys = 24, giving boys = 8.",
  },
];

export const CHALLENGE_TOTAL = LESSON_TIED_PROBLEMS.length + COMPETITION_PROBLEMS.length;
