import { useEffect, useMemo, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { getOrCreateFanKeypair } from "../lib/fanIdentity";

/**
 * Gives every part of the app a single source of truth for "which public
 * key represents this fan right now" - a real connected wallet if there
 * is one, otherwise the silently-generated fan identity. Nothing else in
 * the app needs to know which case it is, except the UI that displays it.
 */
export function useFanWallet() {
  const { publicKey: realPublicKey, connected } = useWallet();
  const [fanKeypair] = useState(() => getOrCreateFanKeypair());

  const publicKey = useMemo(() => {
    if (connected && realPublicKey) return realPublicKey;
    return fanKeypair.publicKey;
  }, [connected, realPublicKey, fanKeypair]);

  return {
    publicKeyString: publicKey.toBase58(),
    isRealWallet: connected && Boolean(realPublicKey),
  };
}
