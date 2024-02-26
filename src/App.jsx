import "./App.css";
import { useState } from "react";
import Start from "./components/Start";
import QuizArea from "./components/QuizArea/QuizArea";

function App() {
  const [gameState, setGameState] = useState(null);

  if (gameState === null) {
    return <Start onStart={setGameState} />;
  }
  return <QuizArea />;
}

export default App;
