// lib/scoreDefaults.ts
// Sport-aware defaults for the score prediction picker.
//
// Different sports have wildly different score ranges:
//   - Soccer: typically 1-3 per team
//   - Basketball: typically 90-130 per team
//   - Cricket Test: can be 200-500+ per team
//
// Hardcoding any single starting value would look broken for most sports.
// This file maps each sport to:
//   - defaultHome, defaultAway: starting scores when the user opens the picker
//   - step: how much each + or - button click changes the score
//   - max: upper bound to prevent absurd values
//   - min: lower bound (always 0)
//
// The step value matters more than people think. For cricket Test cricket,
// scores are typically in the 300-500 range. Forcing the user to click
// "plus" 400 times to reach a reasonable starting point would be unusable.
// A step of 5 lets them get from 0 to 400 in 80 clicks instead of 400.
//
// These defaults are educated guesses based on typical sport averages.
// They can be tuned later with real usage data.

import type { Sport } from "./mockData";

export type ScoreDefaults = {
  defaultHome: number;
  defaultAway: number;
  step: number;
  max: number;
  min: number;
};

// Lookup table from Sport to its default settings.
// Record<Sport, ScoreDefaults> forces an entry for every sport at compile time.
const SCORE_DEFAULTS: Record<Sport, ScoreDefaults> = {
  // Low-scoring sports
  Soccer:        { defaultHome: 1, defaultAway: 1, step: 1, max: 10,  min: 0 },
  Hockey:        { defaultHome: 2, defaultAway: 2, step: 1, max: 12,  min: 0 },
  MMA:           { defaultHome: 1, defaultAway: 0, step: 1, max: 5,   min: 0 },

  // Moderate-scoring sports
  Baseball:      { defaultHome: 4, defaultAway: 4, step: 1, max: 20,  min: 0 },
  Football:      { defaultHome: 21, defaultAway: 21, step: 1, max: 60, min: 0 },

  // High-scoring sports
  Basketball:    { defaultHome: 105, defaultAway: 105, step: 1, max: 200, min: 0 },

  // Cricket -- three formats, three score profiles
  Cricket_T20:   { defaultHome: 165, defaultAway: 165, step: 1, max: 250, min: 0 },
  Cricket_ODI:   { defaultHome: 280, defaultAway: 280, step: 1, max: 450, min: 0 },
  Cricket_Test:  { defaultHome: 400, defaultAway: 400, step: 5, max: 800, min: 0 },
};

// Returns the score defaults for the given sport.
// Use this in the predict page to initialize the score picker correctly.
export function getScoreDefaults(sport: Sport): ScoreDefaults {
  return SCORE_DEFAULTS[sport];
}