// lib/mockData.ts
// This file contains all the mock data for Predictabl.
// Every piece of data here is structured exactly how it will come
// from the real backend API in Phase 11.
// When we connect the real backend, we just replace these imports
// with real API calls -- the UI components stay exactly the same.

// The possible states a match can be in
export type MatchStatus = "open" | "closing" | "live" | "ended";

// The possible sports categories
export type Sport = "NBA" | "NFL" | "Soccer" | "UFC" | "MLB";

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
  {
    id: "match-001",
    sport: "NBA",
    league: "NBA Finals",
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
    id: "match-002",
    sport: "NFL",
    league: "NFL Regular Season",
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
    id: "match-004",
    sport: "UFC",
    league: "UFC 299",
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
    id: "match-006",
    sport: "NBA",
    league: "NBA Regular Season",
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