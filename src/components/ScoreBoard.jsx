import { flagFor } from "../lib/flags";

export default function ScoreBoard({ match }) {
  if (!match) return null;

  return (
    <div className="w-full rounded bg-card p-5">
      <div className="flex items-center justify-between">
        <p className="font-display text-2xl sm:text-3xl text-chalk">{flagFor(match.homeTeam)} {match.homeTeam}</p>
        <p className="font-mono text-2xl sm:text-3xl font-medium text-gold">
          {match.homeScore} — {match.awayScore}
        </p>
        <p className="font-display text-2xl sm:text-3xl text-chalk">{flagFor(match.awayTeam)} {match.awayTeam}</p>
      </div>
      <p className="mt-1.5 text-[11px] tracking-wide text-muted">
        {match.competition} · {match.venue}
      </p>
    </div>
  );
}
