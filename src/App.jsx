import "./App.css";
import { useState } from "react";
import Start from "./components/Start";
import QuizArea from "./components/QuizArea/QuizArea";

function App() {
  const [started, setStarted] = useState(false);

  if (!started) {
    return <Start onStart={setStarted} />;
  }
  return <QuizArea />;
}

export default App;
