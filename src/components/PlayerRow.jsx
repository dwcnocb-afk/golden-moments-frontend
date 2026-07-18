export default function PlayerRow({ player, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(player.id)}
      aria-pressed={selected}
      className={`flex w-full items-center justify-between rounded-sm p-3 text-left transition-colors ${
        selected ? "bg-card-alt border border-gold" : "bg-card border border-transparent"
      }`}
    >
      <span className="flex items-center gap-3">
        <span className="h-8 w-8 shrink-0 rounded-full bg-line" aria-hidden="true" />
        <span className="min-w-0">
          <span className="block truncate text-[13px] font-semibold text-chalk">
            {player.name}
          </span>
          <span className="block truncate text-[10px] text-muted">
            {player.team} · {player.position}
          </span>
        </span>
      </span>
      {selected && (
        <span className="shrink-0 font-mono text-[9px] tracking-wide text-gold">SELECTED</span>
      )}
    </button>
  );
}
