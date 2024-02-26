import { useEffect, useState } from "react";
import "./Score.css";

export default function Score({ score }) {
  const [shake, setShake] = useState(true);

  useEffect(() => {
    if (score === 0 && !shake) {
      setShake(true);
    } else if (score !== 0 && shake) {
      setTimeout(() => setShake(false), 300);
    }
  }, [score, shake]);

  return (
    <div className={shake ? "score-card shake" : "score-card"}>{score}</div>
  );
}
