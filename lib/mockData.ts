// lib/mockData.ts
// This file contains all the mock data for Predictabl.
// Every piece of data here is structured exactly how it will come
// from the real backend API in Phase 11.
// When we connect the real backend, we just replace these imports
// with real API calls -- the UI components stay exactly the same.

// The possible states a match can be in
export type MatchStatus = "open" | "closing" | "live" | "ended";

// The top-level sport categories shown in the dropdown.
// Each sport has multiple leagues nested inside it.
//
// Cricket is split into three formats because each has wildly different
// score ranges:
//   - T20: 20 overs per side, total ~350 runs
//   - ODI: 50 overs per side, total ~600 runs
//   - Test: 5 days, two innings per side, total ~1500+ runs
// The distribution algorithm uses a different "winner threshold" for
// each format because what counts as a "close" prediction is totally
// different in T20 vs Test cricket.
export type Sport =
  | "Basketball"
  | "Football"
  | "Soccer"
  | "Cricket_T20"
  | "Cricket_ODI"
  | "Cricket_Test"
  | "Hockey"
  | "MMA"
  | "Baseball";

// Leagues grouped by sport category.
// When the user selects a sport in the dropdown, we show
// the corresponding league chips from this object.
export const leaguesBySport: Record<Sport, string[]> = {
  Basketball: ["All", "NBA", "EuroLeague", "NCAA", "WNBA"],
  Football: ["All", "NFL", "NCAA"],
  Soccer: [
    "All",
    "Premier League",
    "La Liga",
    "Champions League",
    "Bundesliga",
    "Serie A",
    "MLS",
  ],
  Cricket_T20: [
    "All",
    "IPL",
    "International T20",
    "PSL",
    "BPL",
    "Big Bash",
  ],
  Cricket_ODI: [
    "All",
    "ICC Cricket World Cup",
    "ICC Champions Trophy",
    "International ODI",
  ],
  Cricket_Test: [
    "All",
    "ICC World Test Championship",
    "The Ashes",
    "Border-Gavaskar Trophy",
  ],
  Hockey: ["All", "NHL"],
  MMA: ["All", "UFC", "Bellator"],
  Baseball: ["All", "MLB"],
};

// This is the shape of a single match object.
// Every match card, match detail page, and prediction references this type.
export type Match = {
  id: string;
  sport: Sport;
  league: string;
  homeTeam: string;
  awayTeam: string;
  homeOdds: number;
  awayOdds: number;
  startTime: string;
  channel: string;
  status: MatchStatus;
  poolSize: number;
  entryFee: number;
  participants: number;
  potCapacity: number;
  homeSentiment: number;
  awaySentiment: number;
};

// This is the shape of a single prediction the user has made.
export type Prediction = {
  id: string;
  matchId: string;
  match: Match;
  homeScore: number;
  awayScore: number;
  wager: number;
  status: "pending" | "won" | "lost" | "live";
  potentialPayout: number;
  actualPayout?: number;
  rank?: number;
  totalParticipants?: number;
  createdAt: string;
};

// This is the shape of a transaction in the wallet history.
export type Transaction = {
  id: string;
  type: "deposit" | "withdrawal" | "won" | "lost" | "entry";
  amount: number;
  description: string;
  date: string;
};

// All the matches available in the app
export const matches: Match[] = [
  // Basketball / NBA
  {
    id: "match-001",
    sport: "Basketball",
    league: "NBA",
    homeTeam: "Lakers",
    awayTeam: "Celtics",
    homeOdds: -150,
    awayOdds: 130,
    startTime: "20:30 EST",
    channel: "ESPN",
    status: "live",
    poolSize: 24800,
    entryFee: 50,
    participants: 147,
    potCapacity: 92,
    homeSentiment: 42,
    awaySentiment: 58,
  },
  {
    id: "match-006",
    sport: "Basketball",
    league: "NBA",
    homeTeam: "Warriors",
    awayTeam: "Suns",
    homeOdds: -135,
    awayOdds: 115,
    startTime: "22:00 EST",
    channel: "TNT",
    status: "ended",
    poolSize: 8200,
    entryFee: 100,
    participants: 198,
    potCapacity: 100,
    homeSentiment: 55,
    awaySentiment: 45,
  },
  {
    id: "match-007",
    sport: "Basketball",
    league: "EuroLeague",
    homeTeam: "Real Madrid",
    awayTeam: "CSKA",
    homeOdds: -120,
    awayOdds: 110,
    startTime: "19:00 EST",
    channel: "EuroSport",
    status: "open",
    poolSize: 3200,
    entryFee: 30,
    participants: 87,
    potCapacity: 40,
    homeSentiment: 58,
    awaySentiment: 42,
  },

  // Football / NFL
  {
    id: "match-002",
    sport: "Football",
    league: "NFL",
    homeTeam: "Chiefs",
    awayTeam: "Eagles",
    homeOdds: -110,
    awayOdds: 105,
    startTime: "20:15 EST",
    channel: "ESPN",
    status: "closing",
    poolSize: 12500,
    entryFee: 100,
    participants: 89,
    potCapacity: 78,
    homeSentiment: 61,
    awaySentiment: 39,
  },
  {
    id: "match-008",
    sport: "Football",
    league: "NCAA",
    homeTeam: "Alabama",
    awayTeam: "Georgia",
    homeOdds: -140,
    awayOdds: 125,
    startTime: "21:00 EST",
    channel: "CBS",
    status: "open",
    poolSize: 5600,
    entryFee: 50,
    participants: 124,
    potCapacity: 55,
    homeSentiment: 52,
    awaySentiment: 48,
  },

  // Soccer
  {
    id: "match-003",
    sport: "Soccer",
    league: "Premier League",
    homeTeam: "Arsenal",
    awayTeam: "Man City",
    homeOdds: 140,
    awayOdds: -165,
    startTime: "20:30 EST",
    channel: "Sky Sports",
    status: "closing",
    poolSize: 3680,
    entryFee: 50,
    participants: 234,
    potCapacity: 65,
    homeSentiment: 38,
    awaySentiment: 62,
  },
  {
    id: "match-005",
    sport: "Soccer",
    league: "La Liga",
    homeTeam: "Real Madrid",
    awayTeam: "Barcelona",
    homeOdds: -120,
    awayOdds: 110,
    startTime: "21:00 EST",
    channel: "ESPN+",
    status: "open",
    poolSize: 8920,
    entryFee: 100,
    participants: 445,
    potCapacity: 55,
    homeSentiment: 54,
    awaySentiment: 46,
  },
  {
    id: "match-009",
    sport: "Soccer",
    league: "Champions League",
    homeTeam: "Bayern",
    awayTeam: "PSG",
    homeOdds: -110,
    awayOdds: 105,
    startTime: "20:00 EST",
    channel: "CBS",
    status: "open",
    poolSize: 14500,
    entryFee: 75,
    participants: 312,
    potCapacity: 72,
    homeSentiment: 48,
    awaySentiment: 52,
  },

  // Cricket T20 - IPL, BPL, PSL, International T20 are all T20 leagues
  {
    id: "match-010",
    sport: "Cricket_T20",
    league: "IPL",
    homeTeam: "Mumbai Indians",
    awayTeam: "Chennai Super Kings",
    homeOdds: -130,
    awayOdds: 120,
    startTime: "19:30 IST",
    channel: "Star Sports",
    status: "live",
    poolSize: 18900,
    entryFee: 40,
    participants: 567,
    potCapacity: 88,
    homeSentiment: 51,
    awaySentiment: 49,
  },
  {
    id: "match-011",
    sport: "Cricket_T20",
    league: "BPL",
    homeTeam: "Dhaka Dominators",
    awayTeam: "Rangpur Riders",
    homeOdds: 115,
    awayOdds: -135,
    startTime: "18:00 BST",
    channel: "T Sports",
    status: "open",
    poolSize: 4200,
    entryFee: 25,
    participants: 156,
    potCapacity: 35,
    homeSentiment: 44,
    awaySentiment: 56,
  },
  {
    id: "match-012",
    sport: "Cricket_T20",
    league: "PSL",
    homeTeam: "Karachi Kings",
    awayTeam: "Lahore Qalandars",
    homeOdds: 110,
    awayOdds: -130,
    startTime: "19:00 PKT",
    channel: "PTV Sports",
    status: "closing",
    poolSize: 6800,
    entryFee: 35,
    participants: 198,
    potCapacity: 68,
    homeSentiment: 47,
    awaySentiment: 53,
  },
  {
    id: "match-013",
    sport: "Cricket_T20",
    league: "International T20",
    homeTeam: "India",
    awayTeam: "Australia",
    homeOdds: -115,
    awayOdds: 105,
    startTime: "14:30 IST",
    channel: "Hotstar",
    status: "open",
    poolSize: 45600,
    entryFee: 100,
    participants: 1245,
    potCapacity: 80,
    homeSentiment: 56,
    awaySentiment: 44,
  },

  // Hockey / NHL
  {
    id: "match-014",
    sport: "Hockey",
    league: "NHL",
    homeTeam: "Maple Leafs",
    awayTeam: "Rangers",
    homeOdds: -120,
    awayOdds: 110,
    startTime: "19:00 EST",
    channel: "NBCSN",
    status: "open",
    poolSize: 5400,
    entryFee: 45,
    participants: 134,
    potCapacity: 48,
    homeSentiment: 53,
    awaySentiment: 47,
  },

  // MMA / UFC
  {
    id: "match-004",
    sport: "MMA",
    league: "UFC",
    homeTeam: "O'Malley",
    awayTeam: "Vera",
    homeOdds: -180,
    awayOdds: 155,
    startTime: "22:00 EST",
    channel: "ESPN+",
    status: "open",
    poolSize: 8200,
    entryFee: 75,
    participants: 312,
    potCapacity: 45,
    homeSentiment: 71,
    awaySentiment: 29,
  },

  // Baseball / MLB
  {
    id: "match-015",
    sport: "Baseball",
    league: "MLB",
    homeTeam: "Yankees",
    awayTeam: "Red Sox",
    homeOdds: -125,
    awayOdds: 115,
    startTime: "19:05 EST",
    channel: "FOX",
    status: "closing",
    poolSize: 7100,
    entryFee: 60,
    participants: 223,
    potCapacity: 71,
    homeSentiment: 57,
    awaySentiment: 43,
  },
];

// The user's prediction history
export const predictions: Prediction[] = [
  {
    id: "pred-001",
    matchId: "match-003",
    match: matches[2],
    homeScore: 2,
    awayScore: 1,
    wager: 50,
    status: "live",
    potentialPayout: 450,
    rank: 142,
    totalParticipants: 2500,
    createdAt: "2024-08-24T14:22:01Z",
  },
  {
    id: "pred-002",
    matchId: "match-001",
    match: matches[0],
    homeScore: 112,
    awayScore: 105,
    wager: 200,
    status: "pending",
    potentialPayout: 820,
    createdAt: "2024-08-24T13:00:00Z",
  },
  {
    id: "pred-003",
    matchId: "match-006",
    match: matches[5],
    homeScore: 118,
    awayScore: 112,
    wager: 100,
    status: "won",
    potentialPayout: 1200,
    actualPayout: 1200,
    rank: 3234,
    totalParticipants: 198,
    createdAt: "2024-08-23T20:00:00Z",
  },
];

// The user's wallet transaction history
export const transactions: Transaction[] = [
  {
    id: "txn-001",
    type: "won",
    amount: 1200,
    description: "Warriors vs Suns prediction win",
    date: "2024-08-23",
  },
  {
    id: "txn-002",
    type: "entry",
    amount: -50,
    description: "Arsenal vs Man City entry fee",
    date: "2024-08-24",
  },
  {
    id: "txn-003",
    type: "entry",
    amount: -200,
    description: "Lakers vs Celtics entry fee",
    date: "2024-08-24",
  },
  {
    id: "txn-004",
    type: "deposit",
    amount: 500,
    description: "Token deposit",
    date: "2024-08-22",
  },
];

// The user's overall performance stats
export const userStats = {
  totalPredictions: 142,
  won: 12,
  lost: 8,
  winRate: 64,
  totalWon: 48240,
  bestPayout: 12.5,
  tokenBalance: 1240,
  lockedTokens: 840,
  returnedTokens: 120,
  monthlyGoal: 2000,
  monthlyEarned: 1240,
  tier: "Gold Predictor",
  username: "Jordan_Dev",
  currentStreak: 3,
  bestPayoutTokens: 12400,
};

// Helper function to find a single match by its ID.
// This is used by the predict page to load the correct match
// when the user arrives from a match card.
export function getMatchById(id: string): Match | undefined {
  return matches.find((match) => match.id === id);
}