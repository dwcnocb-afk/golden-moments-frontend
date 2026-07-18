import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Screen from "../components/Screen";
import ScoreBoard from "../components/ScoreBoard";
import EventCard from "../components/EventCard";
import Button from "../components/Button";
import { getMatch, getMatchEvents } from "../lib/api";
import { MATCH_ID } from "../lib/config";

const POLL_INTERVAL_MS = 5000;

export default function LiveMatch() {
  const [match, setMatch] = useState(null);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [matchData, eventsData] = await Promise.all([
          getMatch(MATCH_ID),
          getMatchEvents(MATCH_ID),
        ]);
        if (!cancelled) {
          setMatch(matchData);
          setEvents(eventsData);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      }
    }

    load();
    const interval = setInterval(load, POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return (
    <Screen>
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
        <span className="font-mono text-xs tracking-wide text-gold">
          {match ? `LIVE · ${match.minute}'` : "LOADING…"}
        </span>
      </div>

      <div className="mt-5">
        <ScoreBoard match={match} />
      </div>

      {error && (
        <p className="mt-4 rounded-sm bg-card p-3 text-[12px] text-muted">
          Couldn't reach the live feed ({error}). Showing last known data.
        </p>
      )}

      <h2 className="mt-6 font-display text-lg text-chalk">Predict the next goal</h2>

      <div className="mt-4 flex flex-col gap-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
        {events.length === 0 && (
          <p className="text-[12px] text-muted">No match events yet.</p>
        )}
      </div>

      <div className="mt-6">
        <Button onClick={() => navigate("/predict")}>MAKE YOUR PREDICTION</Button>
      </div>
    </Screen>
  );
}
