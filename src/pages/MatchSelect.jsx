import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Screen from "../components/Screen";
import Pill from "../components/Pill";
import { getMatches, activateMatch } from "../lib/api";

function stateTone(gameState) {
  if (gameState === "live") return "gold";
  if (gameState === "finished") return "muted";
  return "cyan";
}

export default function MatchSelect() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activatingId, setActivatingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    getMatches()
      .then((data) => {
        if (!cancelled) setMatches(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSelect(match) {
    if (!match.seeded || activatingId) return;
    setActivatingId(match.id);
    try {
      // Warms the match up on the backend (fetches score/lineups if it
      // hasn't seen this fixture yet) so the detail screen isn't waiting
      // on its first live message once we land on it.
      await activateMatch(match.id);
    } catch {
      // Non-fatal - GET /match/:id lazily fetches the same data anyway.
    } finally {
      setActivatingId(null);
    }
    navigate(`/match/${match.id}`);
  }

  return (
    <Screen>
      <h1 className="font-display text-xl text-chalk">World Cup 2026</h1>
      <p className="mt-2 text-[12px] text-muted">Pick a match to follow live.</p>

      {loading && <p className="mt-6 text-[12px] text-muted">Loading fixtures…</p>}
      {error && (
        <p className="mt-6 rounded-sm bg-card p-3 text-[12px] text-muted">
          Couldn't reach the fixtures feed ({error}).
        </p>
      )}

      <div className="mt-5 flex flex-col gap-2.5">
        {matches.map((match) => (
          <button
            key={match.id}
            type="button"
            onClick={() => handleSelect(match)}
            disabled={!match.seeded || activatingId === match.id}
            className={`flex w-full items-center justify-between rounded-sm bg-card p-3.5 text-left transition-opacity ${
              !match.seeded ? "opacity-50 cursor-not-allowed" : "hover:bg-card-alt"
            }`}
          >
            <span className="min-w-0">
              <span className="block truncate text-[14px] font-semibold text-chalk">
                {match.homeTeam} vs {match.awayTeam}
              </span>
              <span className="block truncate text-[10px] text-muted">
                {match.seeded ? "Predictions available" : "Coming soon"}
              </span>
            </span>
            <Pill tone={stateTone(match.gameState)}>
              {activatingId === match.id ? "LOADING…" : (match.gameState || "scheduled").toUpperCase()}
            </Pill>
          </button>
        ))}
        {!loading && !error && matches.length === 0 && (
          <p className="text-[12px] text-muted">No fixtures found.</p>
        )}
      </div>
    </Screen>
  );
}
