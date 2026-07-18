import { useEffect, useState } from "react";
import Screen from "../components/Screen";
import StubCard from "../components/StubCard";
import WalletPill from "../components/WalletPill";
import { getPredictionsForWallet } from "../lib/api";
import { useFanWallet } from "../hooks/useFanWallet";

export default function Stubs() {
  const { publicKeyString } = useFanWallet();
  const [stubs, setStubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getPredictionsForWallet(publicKeyString)
      .then((data) => {
        if (!cancelled) setStubs(data);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [publicKeyString]);

  return (
    <Screen>
      <h1 className="font-display text-xl text-chalk">Your stubs</h1>
      <p className="mt-2 text-[12px] text-muted">Proof of prediction, verified on-chain.</p>

      <div className="mt-5">
        <WalletPill />
      </div>

      <div className="mt-5 flex flex-col gap-4">
        {loading && <p className="text-[12px] text-muted">Loading stubs…</p>}
        {!loading && stubs.length === 0 && (
          <p className="text-[12px] text-muted">No predictions yet — go make one.</p>
        )}
        {stubs.map((stub) => (
          <StubCard key={stub.id} stub={stub} />
        ))}
      </div>
    </Screen>
  );
}
