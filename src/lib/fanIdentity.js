// A fan identity that requires zero crypto knowledge: a Solana keypair
// generated silently in the browser on first visit and reused from then on.
//
// This exists because the app only ever needs a PUBLIC KEY to identify a
// fan (for predictions and stub lookup) - the backend signs the on-chain
// Memo transaction with its own keypair, so the fan is never asked to sign
// anything. That means a real wallet extension is optional, not required.
//
// Power users who already have Phantom/Solflare can still connect a real
// wallet instead (see useFanIdentity below) - this is purely an on-ramp
// for everyone else.

import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";

const STORAGE_KEY = "golden-moment:fan-identity-secret";

function loadStoredKeypair() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return Keypair.fromSecretKey(bs58.decode(stored));
  } catch {
    // Corrupted or inaccessible storage - treat as no identity yet.
    return null;
  }
}

function persistKeypair(keypair) {
  try {
    window.localStorage.setItem(STORAGE_KEY, bs58.encode(keypair.secretKey));
  } catch {
    // Storage unavailable (private browsing, quota, etc.) - the identity
    // still works for this session, it just won't survive a reload.
  }
}

/**
 * Returns the fan's auto-generated keypair, creating and persisting one
 * on first call. This never prompts the user or requires an extension.
 */
export function getOrCreateFanKeypair() {
  const existing = loadStoredKeypair();
  if (existing) return existing;

  const generated = Keypair.generate();
  persistKeypair(generated);
  return generated;
}

/** Clears the locally-generated identity (e.g. a "reset my fan ID" action). */
export function clearFanIdentity() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
