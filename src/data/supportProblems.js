// Support path — a backup-a-step intervention for students not ready for
// the test-out, scoped tightly to 4.NBT.B.6 WITHOUT remainders. Every
// number here divides evenly on purpose; no leftover-quantity language.
//
// Three problems, same divisor (7), scaffolded with deliberately
// decreasing support. The "remainder chunk" after the hundreds split is
// 56 in both problems 1 and 2 (isolating that the +100 in the quotient
// comes purely from the +700 in the dividend), then jumps to 126 in
// problem 3 (56 + 70), isolating that the +10 in the quotient comes from
// the +70. That structural parallelism IS the scaffold — the numbers
// carry the teaching, so no hint text spells it out.
export const SUPPORT_PROBLEMS = [
  {
    id: "sp1",
    dividend: 756,
    divisor: 7,
    // Fully worked — no interaction, no inputs.
    workedLines: [
      { who: "alex", text: "756 is 700 plus 56." },
      { who: "alex", text: "700 ÷ 7 = 100. 56 ÷ 7 = 8." },
      { who: "grogg", text: "So 756 ÷ 7 is 100 + 8 = 108!" },
    ],
  },
  {
    id: "sp2",
    dividend: 1456,
    divisor: 7,
    // Partially scaffolded — one voice, one reveal, three blanks.
    calloutText: "756 + 700 = 1,456 — up 700 from the last one.",
    workedLines: [
      {
        who: "winnie",
        text: "700 more in the dividend means 700 ÷ 7 = 100 more in the answer.",
      },
    ],
    revealLabel: "Show first step",
    revealText: "1,456 = 1,400 + 56",
    blanks: [
      { label: "1,400 ÷ 7 = ", answer: 200 },
      { label: "56 ÷ 7 = ", answer: 8 },
      { label: "1,456 ÷ 7 = ", answer: 208 },
    ],
  },
  {
    id: "sp3",
    dividend: 1526,
    divisor: 7,
    // Most faded — no character voice at all, just the callout, a reveal,
    // and the blanks. The numbers alone carry it from here.
    calloutText: "1,456 + 70 = 1,526 — up another 70 from the last one.",
    workedLines: [],
    revealLabel: "Show first step",
    revealText: "1,526 = 1,400 + 126",
    blanks: [
      { label: "1,400 ÷ 7 = ", answer: 200 },
      { label: "126 ÷ 7 = ", answer: 18 },
      { label: "1,526 ÷ 7 = ", answer: 218 },
    ],
  },
];
