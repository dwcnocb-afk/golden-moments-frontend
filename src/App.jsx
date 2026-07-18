import { Routes, Route } from "react-router-dom";
import LiveMatch from "./pages/LiveMatch";
import Predict from "./pages/Predict";
import GoalMoment from "./pages/GoalMoment";
import Stubs from "./pages/Stubs";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LiveMatch />} />
      <Route path="/predict" element={<Predict />} />
      <Route path="/goal-moment" element={<GoalMoment />} />
      <Route path="/stubs" element={<Stubs />} />
    </Routes>
  );
}
