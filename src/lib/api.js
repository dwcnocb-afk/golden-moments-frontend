import { API_BASE_URL, USE_MOCK_API } from "./config";
import {
  mockMatch,
  mockEvents,
  mockPlayers,
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

// --- Matches & live events ---

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

export async function getMatchPlayers(matchId) {
  if (USE_MOCK_API) {
    await delay(200);
    return mockPlayers;
  }
  return request(`/match/${matchId}/players`);
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

export async function getLatestGoalMoment(matchId) {
  if (USE_MOCK_API) {
    await delay(200);
    return mockGoalMoment;
  }
  return request(`/match/${matchId}/latest-goal`);
}
