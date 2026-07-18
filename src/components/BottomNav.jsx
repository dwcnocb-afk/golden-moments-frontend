import { NavLink } from "react-router-dom";

const items = [
  { to: "/", label: "Live" },
  { to: "/predict", label: "Predict" },
  { to: "/stubs", label: "Stubs" },
];

export default function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 border-t border-line bg-pitch/95 backdrop-blur">
      <div className="mx-auto flex max-w-md justify-around px-5 py-3 sm:max-w-lg lg:max-w-xl">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `font-mono text-[11px] tracking-wide transition-colors ${
                isActive ? "text-gold" : "text-muted"
              }`
            }
          >
            {item.label.toUpperCase()}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
