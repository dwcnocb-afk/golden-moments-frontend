import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Screen from "../components/Screen";
import PlayerRow from "../components/PlayerRow";
import WalletPill from "../components/WalletPill";
import Button from "../components/Button";
import { getMatchPlayers, submitPrediction } from "../lib/api";
import { MATCH_ID } from "../lib/config";
import { useFanWallet } from "../hooks/useFanWallet";

export default function Predict() {
  const [players, setPlayers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const { publicKeyString } = useFanWallet();
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    getMatchPlayers(MATCH_ID).then((data) => {
      if (!cancelled) setPlayers(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSubmit() {
    if (!selectedId) return;
    setSubmitting(true);
    setError(null);
    try {
      await submitPrediction({
        wallet: publicKeyString,
        matchId: MATCH_ID,
        playerId: selectedId,
      });
      navigate("/goal-moment");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Screen>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-chalk"
      >
        <span aria-hidden="true">←</span>
        <span className="text-[13px] font-medium">Brazil vs Morocco</span>
      </button>

      <h1 className="mt-4 font-display text-xl leading-tight text-chalk">
        Who scores the next goal?
      </h1>
      <p className="mt-2 text-[12px] leading-relaxed text-muted">
        Lock in your pick before the next kickoff restart. One prediction per goal window.
      </p>

      <div className="mt-5 flex flex-col gap-2.5">
        {players.map((player) => (
          <PlayerRow
            key={player.id}
            player={player}
            selected={selectedId === player.id}
            onSelect={setSelectedId}
          />
        ))}
      </div>

      <div className="mt-5">
        <WalletPill />
      </div>

      {error && <p className="mt-3 text-[12px] text-muted">{error}</p>}

      <div className="mt-5">
        <Button onClick={handleSubmit} disabled={!selectedId || submitting}>
          {submitting ? "LOCKING IN…" : "LOCK IN PREDICTION"}
        </Button>
      </div>
    </Screen>
  );
}
