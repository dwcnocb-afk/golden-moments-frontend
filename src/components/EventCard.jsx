import { flagFor } from "../lib/flags";

export default function EventCard({ event }) {
  const isCard = event.type === "card";

  return (
    <div className="flex w-full items-center gap-3 rounded-sm bg-card p-3.5">
      <div className="min-w-0">
        <p className={`truncate text-[13px] font-semibold ${event.type === "goal" ? "text-gold" : "text-chalk"}`}>{event.text}</p>
        <p className="truncate text-[11px] text-muted">
          {isCard ? (
            <>
              🟨 {flagFor(event.sub)} {event.sub}
            </>
          ) : (
            event.sub
          )}
        </p>
      </div>
    </div>
  );
}
