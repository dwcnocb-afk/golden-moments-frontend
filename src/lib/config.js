// Central config, driven by .env (see .env.example).
// Falls back to sensible defaults so the app runs standalone in mock mode
// before the backend exists.

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

// Single source of truth for which match/fixture the app points at.
// Must match whatever ID your backend seeded (its TxODDS fixture ID).
export const MATCH_ID = import.meta.env.VITE_MATCH_ID || "18257865";

export const SOLANA_CLUSTER = import.meta.env.VITE_SOLANA_CLUSTER || "devnet";

// Toggle this off once your backend is live. While true, api.js serves
// canned responses instead of making real network calls, so you can build
// and demo the frontend independently of backend progress.
export const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== "false";

export function explorerTxUrl(signature) {
  const cluster = SOLANA_CLUSTER === "mainnet-beta" ? "" : `?cluster=${SOLANA_CLUSTER}`;
  return `https://explorer.solana.com/tx/${signature}${cluster}`;
}
