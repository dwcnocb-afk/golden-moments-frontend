// Shapes here define the contract your backend API should match.
// Keep this file in sync with your backend responses as you build it.

// GET /matches
export const mockMatches = [
  {
    id: "match_001",
    homeTeam: "BRA",
    awayTeam: "MAR",
    startTime: null,
    gameState: "live",
    seeded: true,
  },
  {
    id: "18257865",
    homeTeam: "FRA",
    awayTeam: "ENG",
    startTime: null,
    gameState: "scheduled",
    seeded: true,
  },
  {
    id: "future_fixture",
    homeTeam: "ARG",
    awayTeam: "GER",
    startTime: null,
    gameState: "scheduled",
    // Not seeded yet -> no roster/prediction target on the backend, so
    // the UI should offer this as "coming soon" rather than let a fan
    // tap into a broken predict screen.
    seeded: false,
  },
];

// GET /match/:id
export const mockMatch = {
  id: "match_001",
  homeTeam: "BRA",
  awayTeam: "MAR",
  homeScore: 2,
  awayScore: 1,
  minute: 62,
  status: "live", // live | finished | scheduled
  competition: "QUARTERFINAL",
  venue: "MetLife Stadium",
  stats: {
    corners: { home: 5, away: 3 },
    yellowCards: { home: 1, away: 2 },
    redCards: { home: 0, away: 0 },
    // Best-effort tally, not a synced total - see backend note on this field.
    throwIns: { home: 12, away: 9, authoritative: false },
  },
  // Bonus, non-critical field the backend attaches when available - shape
  // is whatever TxODDS' latest odds snapshot looks like, so treat it as
  // opaque and only ever summarize/count it, never assume its structure.
  odds: {
    market: "next_goalscorer",
    updatedAt: "2026-07-16T14:02:00Z",
    selections: [
      { player: "Vinícius Jr.", price: 3.5 },
      { player: "Rodrygo", price: 5.0 },
      { player: "En-Nesyri", price: 6.5 },
    ],
  },
};

// GET /match/:id/events
export const mockEvents = [
  {
    id: "evt_3",
    minute: "58'",
    type: "goal",
    text: "Goal — Vinícius Jr.",
    sub: "Assisted by Rodrygo",
  },
  {
    id: "evt_2",
    minute: "45'",
    type: "card",
    text: "Yellow card — Achraf Hakimi",
    sub: "Tactical foul",
  },
  {
    id: "evt_1",
    minute: "31'",
    type: "goal",
    text: "Goal — En-Nesyri",
    sub: "Header from corner",
  },
];

// GET /match/:id/lineups
export const mockLineups = {
  home: {
    team: "Brazil",
    starters: [
      { id: "p1", name: "Vinícius Jr.", team: "Brazil", position: "Forward", rosterNumber: "7", starter: true },
      { id: "p2", name: "Rodrygo", team: "Brazil", position: "Forward", rosterNumber: "11", starter: true },
    ],
    bench: [
      { id: "p5", name: "Endrick", team: "Brazil", position: "Forward", rosterNumber: "9", starter: false },
    ],
  },
  away: {
    team: "Morocco",
    starters: [
      { id: "p3", name: "En-Nesyri", team: "Morocco", position: "Forward", rosterNumber: "19", starter: true },
      { id: "p4", name: "Ziyech", team: "Morocco", position: "Midfielder", rosterNumber: "7", starter: true },
    ],
    bench: [
      { id: "p6", name: "Boufal", team: "Morocco", position: "Midfielder", rosterNumber: "17", starter: false },
    ],
  },
  hasLineupData: true,
};

// GET /match/:id/latest-goal?wallet=...
export const mockGoalMoment = {
  minute: "58'",
  scorer: "Vinícius Jr.",
  scorerLastName: "VINÍCIUS\nJR.",
  score: "BRA 2 — 1 MAR",
  userPrediction: {
    player: "Vinícius Jr.",
    result: "correct", // correct | incorrect | pending
  },
};

// GET /predictions/:wallet
export const mockStubs = [
  {
    id: "stub_1",
    matchLabel: "BRAZIL vs MOROCCO",
    prediction: "Vinícius Jr. to score",
    minute: "58'",
    result: "hit", // hit | miss | pending
    date: "Jul 16, 2026",
    txSignature: "4hT9k2Lp9x7abCq8mQz3sVn6dRw1TzYf2eXpUoJk8mQz",
  },
];
