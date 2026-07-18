import { explorerTxUrl } from "../lib/config";

function truncateSignature(sig) {
  if (!sig || sig.length < 12) return sig || "—";
  return `${sig.slice(0, 4)}…${sig.slice(-4)}`;
}

export default function StubCard({ stub }) {
  const resultLabel =
    stub.result === "hit" ? "HIT" : stub.result === "miss" ? "MISS" : "PENDING";
  const resultColor =
    stub.result === "hit" ? "text-gold" : stub.result === "miss" ? "text-muted" : "text-muted";

  return (
    <div className="w-full overflow-hidden rounded">
      <div className="bg-card p-5">
        <p className="font-mono text-[10px] tracking-wide text-muted">{stub.matchLabel}</p>
        <p className="mt-2 text-base font-semibold text-chalk">{stub.prediction}</p>
        <div className="mt-2.5 flex items-center justify-between">
          <span className={`text-[11px] ${resultColor}`}>
            {stub.minute} · Result: {resultLabel}
          </span>
          <span className="text-[11px] text-muted">{stub.date}</span>
        </div>
      </div>

      <div className="perforation" aria-hidden="true" />

      <div className="bg-card-alt p-5">
        {stub.txSignature ? (
          <>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden="true" />
              <span className="font-mono text-[10px] tracking-wide text-cyan">
                VERIFIED ON SOLANA
              </span>
            </div>
            <p className="mt-2 font-mono text-xs text-chalk">
              {truncateSignature(stub.txSignature)}
            </p>
            <a
              href={explorerTxUrl(stub.txSignature)}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block text-[11px] font-medium text-gold underline-offset-2 hover:underline"
            >
              View on Explorer →
            </a>
          </>
        ) : (
          <p className="font-mono text-[11px] text-muted">Awaiting on-chain confirmation…</p>
        )}
      </div>
    </div>
  );
}
