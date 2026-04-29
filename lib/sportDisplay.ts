// lib/sportDisplay.ts
// Helper functions for showing sport names cleanly in the UI.
//
// Sport types in code use "Cricket_T20" / "Cricket_ODI" / "Cricket_Test"
// because underscores are valid in TypeScript identifiers and easier
// to use in code than spaces or parentheses. But for display in the UI,
// we want users to see "Cricket (T20)" -- proper capitalization, with
// the format in parentheses.
//
// Use displaySportName() anywhere you would otherwise show a Sport
// directly to the user (filter dropdowns, match cards, headers, etc).

import type { Sport } from "./mockData";

// Maps each Sport value to a user-friendly display string.
// Most sports stay the same -- only the cricket formats need translation.
const SPORT_DISPLAY_NAMES: Record<Sport, string> = {
  Basketball:    "Basketball",
  Football:      "Football",
  Soccer:        "Soccer",
  Cricket_T20:   "Cricket (T20)",
  Cricket_ODI:   "Cricket (ODI)",
  Cricket_Test:  "Cricket (Test)",
  Hockey:        "Hockey",
  MMA:           "MMA",
  Baseball:      "Baseball",
};

// Returns the human-readable display name for a sport.
// Falls back to the raw Sport string if somehow not found.
export function displaySportName(sport: Sport): string {
  return SPORT_DISPLAY_NAMES[sport] ?? sport;
}