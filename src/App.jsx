import "./App.css";
import { useState } from "react";
import Start from "./components/Start";
import QuizArea from "./components/QuizArea/QuizArea";
import Score from "./components/Score";

function loadHighScore() {
  const item = window.sessionStorage.getItem("highscore");
  return item != null ? JSON.parse(item) : 0;
}

function saveHighScore(highScore) {
  window.sessionStorage.setItem("highscore", JSON.stringify(highScore));
}

function App() {
  const [gameState, setGameState] = useState(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(loadHighScore);

  function setScoreWithCheck(newScore) {
    setScore(newScore);
    if (newScore > score) {
      setHighScore(newScore);
      saveHighScore(newScore);
    }
  }

  if (gameState === null) {
    return <Start onStart={setGameState} highScore={highScore} />;
  }
  return (
    <>
      <div className="generic-container">
        {highScore === 0 || (
          <div className="highscore">
            <small>highscore:</small> {highScore}
          </div>
        )}
        <Score score={score} />
        <QuizArea score={score} setScore={setScoreWithCheck} />
      </div>
    </>
  );
}

export default App;
