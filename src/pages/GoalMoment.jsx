import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Screen from "../components/Screen";
import Pill from "../components/Pill";
import Button from "../components/Button";
import { getLatestGoalMoment } from "../lib/api";
import { MATCH_ID } from "../lib/config";

export default function GoalMoment() {
  const [moment, setMoment] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    getLatestGoalMoment(MATCH_ID).then((data) => {
      if (!cancelled) setMoment(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!moment) {
    return (
      <Screen>
        <p className="mt-10 text-center text-[12px] text-muted">Waiting for the next goal…</p>
      </Screen>
    );
  }

  const resultText =
    moment.userPrediction.result === "correct"
      ? `${moment.userPrediction.player} — Correct`
      : moment.userPrediction.result === "incorrect"
      ? `${moment.userPrediction.player} — Incorrect`
      : "Verifying on Solana…";

  const resultColor =
    moment.userPrediction.result === "correct" ? "text-cyan" : "text-muted";

  return (
    <Screen>
      <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
        <Pill>GOAL · {moment.minute}</Pill>

        <h1 className="whitespace-pre-line font-display text-4xl leading-none text-chalk sm:text-5xl">
          {moment.scorerLastName}
        </h1>

        <p className="font-mono text-lg font-medium text-gold">{moment.score}</p>

        <div className="w-full rounded bg-card p-5 text-left">
          <p className="font-mono text-[9px] tracking-wide text-muted">YOUR PREDICTION</p>
          <p className={`mt-1.5 text-base font-semibold ${resultColor}`}>{resultText}</p>
          <p className="mt-1 text-[11px] text-muted">
            {moment.userPrediction.result === "pending"
              ? "Verifying on Solana…"
              : "Recorded on Solana"}
          </p>
        </div>

        <Button variant="secondary" onClick={() => navigate("/stubs")}>
          VIEW YOUR STUB
        </Button>
      </div>
    </Screen>
  );
}
