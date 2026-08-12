// Mock unit map for Clod's Conundrums — static/illustrative only. Unit
// names 1–5 are the real topics from grade4_challenge_pool_original.md;
// 6–8 aren't sourced from anything (that pool only covers Units 1–5), so
// they're left as plain placeholders and shown locked either way.
//
// Each reached unit has 3 tiers (1-star/2-star/3-star difficulty). Every
// tier gets its own completed/partial/unattempted split (must sum to
// 100) rendered as a small pie chart — see TierPie.jsx.
//
// OUT OF SCOPE (flagged per spec, not built): cross-grade pooling,
// difficulty-tag-based problem serving, and real seen/unseen tracking.
// Every number below is a hand-set mock value, not derived from any
// tracking system.
export const UNITS = [
  {
    id: 1,
    name: "Factors and Multiples",
    status: "reached",
    tiers: [
      { completed: 90, partial: 10, unattempted: 0 },
      { completed: 70, partial: 20, unattempted: 10 },
      { completed: 55, partial: 25, unattempted: 20 },
    ],
  },
  {
    id: 2,
    name: "Fractions",
    status: "reached",
    tiers: [
      { completed: 100, partial: 0, unattempted: 0 },
      { completed: 80, partial: 10, unattempted: 10 },
      { completed: 40, partial: 30, unattempted: 30 },
    ],
  },
  {
    id: 3,
    name: "Big Numbers",
    status: "reached",
    tiers: [
      { completed: 65, partial: 20, unattempted: 15 },
      { completed: 30, partial: 30, unattempted: 40 },
      { completed: 0, partial: 20, unattempted: 80 },
    ],
  },
  {
    id: 4,
    name: "Multiplication",
    status: "reached",
    tiers: [
      { completed: 45, partial: 25, unattempted: 30 },
      { completed: 10, partial: 20, unattempted: 70 },
      { completed: 0, partial: 0, unattempted: 100 },
    ],
  },
  {
    id: 5,
    name: "Division",
    status: "reached",
    tiers: [
      { completed: 20, partial: 30, unattempted: 50 },
      { completed: 0, partial: 15, unattempted: 85 },
      { completed: 0, partial: 0, unattempted: 100 },
    ],
  },
  { id: 6, name: "Unit 6", status: "locked" },
  { id: 7, name: "Unit 7", status: "locked" },
  { id: 8, name: "Unit 8", status: "locked" },
];
