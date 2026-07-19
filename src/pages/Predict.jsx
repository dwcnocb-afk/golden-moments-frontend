import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Screen from "../components/Screen";
import PlayerRow from "../components/PlayerRow";
import WalletPill from "../components/WalletPill";
import Button from "../components/Button";
import { getMatchLineups, submitPrediction } from "../lib/api";
import { useFanWallet } from "../hooks/useFanWallet";

function TeamGroup({ label, team, players, selectedId, onSelect }) {
  if (players.length === 0) return null;
  return (
    <div className="mt-4">
      <p className="font-mono text-[9px] tracking-wide text-muted">
        {label} · {team}
      </p>
      <div className="mt-2 flex flex-col gap-2.5">
        {players.map((player) => (
          <PlayerRow
            key={player.id}
            player={player}
            selected={selectedId === player.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

export default function Predict() {
  const { matchId } = useParams();
  const [lineups, setLineups] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const { publicKeyString } = useFanWallet();
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    getMatchLineups(matchId).then((data) => {
      if (!cancelled) setLineups(data);
    });
    return () => {
      cancelled = true;
    };
  }, [matchId]);

  async function handleSubmit() {
    if (!selectedId) return;
    setSubmitting(true);
    setError(null);
    try {
      await submitPrediction({
        wallet: publicKeyString,
        matchId,
        playerId: selectedId,
      });
      navigate(`/match/${matchId}/goal-moment`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  const headerLabel = lineups ? `${lineups.home.team} vs ${lineups.away.team}` : "Loading…";

  return (
    <Screen>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-chalk"
      >
        <span aria-hidden="true">←</span>
        <span className="text-[13px] font-medium">{headerLabel}</span>
      </button>

      <h1 className="mt-4 font-display text-xl leading-tight text-chalk">
        Who scores the next goal?
      </h1>
      <p className="mt-2 text-[12px] leading-relaxed text-muted">
        Lock in your pick before the next kickoff restart. One prediction per goal window.
      </p>

      {lineups && !lineups.hasLineupData && (
        <p className="mt-4 rounded-sm bg-card p-3 text-[12px] text-muted">
          Lineups haven't been posted for this match yet — check back closer to kickoff.
        </p>
      )}

      {lineups && lineups.hasLineupData && (
        <>
          <TeamGroup
            label="STARTERS"
            team={lineups.home.team}
            players={lineups.home.starters}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
          <TeamGroup
            label="STARTERS"
            team={lineups.away.team}
            players={lineups.away.starters}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
          <TeamGroup
            label="BENCH"
            team={lineups.home.team}
            players={lineups.home.bench}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
          <TeamGroup
            label="BENCH"
            team={lineups.away.team}
            players={lineups.away.bench}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </>
      )}

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
