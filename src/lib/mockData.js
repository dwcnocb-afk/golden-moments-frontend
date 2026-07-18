// Shapes here define the contract your backend API should match.
// Keep this file in sync with your backend responses as you build it.

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
};

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

export const mockPlayers = [
  { id: "p1", name: "Vinícius Jr.", team: "Brazil", position: "Forward" },
  { id: "p2", name: "Rodrygo", team: "Brazil", position: "Forward" },
  { id: "p3", name: "En-Nesyri", team: "Morocco", position: "Forward" },
  { id: "p4", name: "Ziyech", team: "Morocco", position: "Midfielder" },
];

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
