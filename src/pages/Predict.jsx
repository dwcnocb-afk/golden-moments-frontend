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
  const [confirmedPlayer, setConfirmedPlayer] = useState(null);
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
      const allPlayers = lineups
        ? [
            ...lineups.home.starters,
            ...lineups.home.bench,
            ...lineups.away.starters,
            ...lineups.away.bench,
          ]
        : [];
      const player = allPlayers.find((p) => p.id === selectedId);
      setConfirmedPlayer(player?.name ?? "your pick");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  function handleCloseConfirmation() {
    setConfirmedPlayer(null);
    navigate(`/match/${matchId}/goal-moment`);
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

      {confirmedPlayer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5">
          <div className="w-full max-w-xs rounded bg-card p-5 text-center">
            <p className="font-display text-lg text-chalk">Your bet has been placed</p>
            <p className="mt-2 font-mono text-[12px] tracking-wide text-gold">
              BET: {confirmedPlayer.toUpperCase()} TO SCORE THE NEXT GOAL
            </p>
            <div className="mt-4">
              <Button onClick={handleCloseConfirmation}>OK</Button>
            </div>
          </div>
        </div>
      )}
    </Screen>
  );
}
