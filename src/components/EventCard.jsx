export default function EventCard({ event }) {
  const accent = event.type === "goal" ? "text-gold" : "text-muted";

  return (
    <div className="flex w-full items-center gap-3 rounded-sm bg-card p-3.5">
      <span className={`w-10 shrink-0 font-mono text-sm font-medium ${accent}`}>
        {event.minute}
      </span>
      <div className="min-w-0">
        <p className="truncate text-[13px] font-semibold text-chalk">{event.text}</p>
        <p className="truncate text-[11px] text-muted">{event.sub}</p>
      </div>
    </div>
  );
}
