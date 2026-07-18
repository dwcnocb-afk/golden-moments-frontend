import BottomNav from "./BottomNav";

export default function Screen({ children, showNav = true }) {
  return (
    <div className="min-h-screen bg-pitch">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pb-24 pt-8 sm:max-w-lg sm:px-8 lg:max-w-xl">
        {children}
      </div>
      {showNav && <BottomNav />}
    </div>
  );
}
