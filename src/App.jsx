import { Routes, Route } from "react-router-dom";
import MatchSelect from "./pages/MatchSelect";
import LiveMatch from "./pages/LiveMatch";
import Predict from "./pages/Predict";
import GoalMoment from "./pages/GoalMoment";
import Stubs from "./pages/Stubs";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MatchSelect />} />
      <Route path="/match/:matchId" element={<LiveMatch />} />
      <Route path="/match/:matchId/predict" element={<Predict />} />
      <Route path="/match/:matchId/goal-moment" element={<GoalMoment />} />
      <Route path="/stubs" element={<Stubs />} />
    </Routes>
  );
}
