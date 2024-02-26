import "./App.css";
import { useState } from "react";
import Start from "./components/Start";
import QuizArea from "./components/QuizArea/QuizArea";
import Score from "./components/Score";

function App() {
  const [gameState, setGameState] = useState(null);
  const [score, setScore] = useState(0);

  if (gameState === null) {
    return <Start onStart={setGameState} />;
  }
  return (
    <>
      <div className="generic-container">
        <Score score={score} />
        <QuizArea score={score} setScore={setScore} />
      </div>
    </>
  );
}

export default App;
