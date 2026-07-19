import { API_BASE_URL, USE_MOCK_API } from "./config";
import {
  mockMatches,
  mockMatch,
  mockEvents,
  mockLineups,
  mockGoalMoment,
  mockStubs,
} from "./mockData";

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const message = await res.text().catch(() => res.statusText);
    throw new Error(`API error ${res.status}: ${message}`);
  }
  return res.json();
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// --- Browsing matches (GET /matches, POST /matches/:id/activate) ---

export async function getMatches() {
  if (USE_MOCK_API) {
    await delay(200);
    return mockMatches;
  }
  return request(`/matches`);
}

export async function activateMatch(matchId) {
  if (USE_MOCK_API) {
    await delay(150);
    return { id: matchId, activated: true, mock: true };
  }
  return request(`/matches/${matchId}/activate`, { method: "POST" });
}

// --- A single match & its live events ---

export async function getMatch(matchId) {
  if (USE_MOCK_API) {
    await delay(200);
    return mockMatch;
  }
  return request(`/match/${matchId}`);
}

export async function getMatchEvents(matchId) {
  if (USE_MOCK_API) {
    await delay(200);
    return mockEvents;
  }
  return request(`/match/${matchId}/events`);
}

// Grouped starters/bench per team, plus hasLineupData so the UI can tell
// "no lineup posted yet" apart from "roster fetch failed".
export async function getMatchLineups(matchId) {
  if (USE_MOCK_API) {
    await delay(200);
    return mockLineups;
  }
  return request(`/match/${matchId}/lineups`);
}

// --- Predictions ---

export async function submitPrediction({ wallet, matchId, playerId }) {
  if (USE_MOCK_API) {
    await delay(400);
    return { id: "pred_mock", wallet, matchId, playerId, status: "pending" };
  }
  return request(`/predictions`, {
    method: "POST",
    body: JSON.stringify({ wallet, matchId, playerId }),
  });
}

export async function getPredictionsForWallet(wallet) {
  if (USE_MOCK_API) {
    await delay(200);
    return mockStubs;
  }
  return request(`/predictions/${wallet}`);
}

// --- Goal moment (used to render the reveal screen after a resolution) ---
// Pass the fan's wallet so the backend can resolve *their* prediction for
// this goal instead of returning the generic "pending" default.
export async function getLatestGoalMoment(matchId, wallet) {
  if (USE_MOCK_API) {
    await delay(200);
    return mockGoalMoment;
  }
  const query = wallet ? `?wallet=${encodeURIComponent(wallet)}` : "";
  return request(`/match/${matchId}/latest-goal${query}`);
}
