function StatPair({ label, home, away }) {
  return (
    <div className="flex items-center justify-between">
      <span className="w-8 text-right font-mono text-[12px] text-chalk">{home}</span>
      <span className="flex-1 text-center text-[10px] tracking-wide text-muted">{label}</span>
      <span className="w-8 text-left font-mono text-[12px] text-chalk">{away}</span>
    </div>
  );
}

export default function StatsRow({ stats, odds }) {
  if (!stats) return null;

  return (
    <div className="mt-3 w-full rounded bg-card p-4">
      <div className="flex flex-col gap-2">
        <StatPair label="CORNERS" home={stats.corners.home} away={stats.corners.away} />
        <StatPair label="YELLOW CARDS" home={stats.yellowCards.home} away={stats.yellowCards.away} />
        <StatPair label="RED CARDS" home={stats.redCards.home} away={stats.redCards.away} />
        <StatPair label="THROW-INS" home={stats.throwIns.home} away={stats.throwIns.away} />
      </div>
      {stats.throwIns.authoritative === false && (
        <p className="mt-2 text-[9px] text-muted">
          Throw-in count is best-effort, not an official synced total.
        </p>
      )}
      {odds && (
        <p className="mt-3 border-t border-line pt-2 text-[10px] text-muted">
          Live odds available
          {Array.isArray(odds.selections) ? ` · ${odds.selections.length} selections` : ""}
        </p>
      )}
    </div>
  );
}

