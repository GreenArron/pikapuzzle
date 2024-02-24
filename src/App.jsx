import "./App.css";
import { useState } from "react";
import Start from "./components/Start";

function App() {
  const [started, setStarted] = useState(false);

  if (!started) {
    return <Start onStart={setStarted} />;
  }
  return;
}

export default App;
