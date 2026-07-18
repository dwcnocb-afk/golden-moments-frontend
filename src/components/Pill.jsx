export default function Pill({ children, tone = "gold", className = "" }) {
  const tones = {
    gold: "bg-gold text-pitch",
    cyan: "bg-cyan text-pitch",
    muted: "bg-card text-muted",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[11px] font-medium tracking-wide ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
