export default function Button({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  type = "button",
  className = "",
}) {
  const base =
    "w-full rounded-sm px-5 py-3.5 text-[13px] font-semibold tracking-wide transition-opacity disabled:opacity-40 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-gold text-pitch hover:opacity-90",
    secondary: "bg-card text-chalk border border-line hover:bg-card-alt",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
