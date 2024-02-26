import "./Start.css";
import { useState } from "react";
import pikaPuzzleSVG from "/pikapuzzle.svg";

export default function Start({ onStart, highScore }) {
  const [fadeAway, setFadeAway] = useState(false);
  function handleStart(e) {
    e.target.classList.add("activated");
    setFadeAway(true);
  }

  if (fadeAway) {
    // dangerous, but we don't render Start after this
    setTimeout(() => onStart("started"), 500);
  }

  return (
    <section
      id="start-menu"
      aria-label="start menu"
      className={fadeAway ? "fade-away" : ""}
    >
      <div className="container-column">
        <img src={pikaPuzzleSVG} alt="PikaPuzzle logo" id="logo" />
        <small>Yet another pokemon trivia quiz game</small>
      </div>
      <main>
        <button id="startbutton" onClick={handleStart}>
          START
        </button>
        {highScore === 0 || (
          <div className="highscore">highscore: {highScore}</div>
        )}
      </main>
    </section>
  );
}
