import "./QuizArea.css";
import { useEffect, useState } from "react";
import { getRandomPokemon } from "/src/utils/pikapi";
import { normalize } from "/src/utils/common";
import generateQuestion, { selectQuestion } from "./generateQuestion";

function Loading() {
  return <div className="loading">Loading...</div>;
}

function Option({ children, onClick, mark }) {
  return (
    <button className={`q-option ${mark}`} onClick={onClick}>
      {children}
    </button>
  );
}

function LoadingImage({ src, alt }) {
  const [imgStatus, setImgStatus] = useState("loading");

  return (
    <img
      src={src}
      alt={imgStatus === "loading" ? "" : alt}
      aria-label={alt}
      onError={() => setImgStatus("dead")}
      onLoad={() => setImgStatus("loaded")}
      className={imgStatus}
    />
  );
}

export default function QuizArea({ score, setScore }) {
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  function handleAnswer(index) {
    if (index === currentQuestion.correctIndex) {
      setScore(score + 1);
    } else {
      setScore(0);
    }
    setCurrentQuestion({ ...currentQuestion, answered: true, selected: index });
  }

  useEffect(() => {
    if (currentPokemon === null) {
      getRandomPokemon().then((randomPokemon) => {
        setCurrentQuestion(generateQuestion(score, randomPokemon));
        setCurrentPokemon({
          ...randomPokemon,
          photo: `https://raw.githubusercontent.com/PokeAPI/sprites/showdown/sprites/pokemon/other/dream-world/${randomPokemon.id}.svg`,
        });
      });
    } else if (currentQuestion === null) {
      setCurrentQuestion(generateQuestion(score, currentPokemon));
    }
  }, [currentPokemon, currentQuestion, score]);

  if (!!currentQuestion && currentQuestion.answered) {
    setTimeout(() => {
      setCurrentQuestion(null);
      if (
        selectQuestion(score) === 1 ||
        currentQuestion.selected !== currentQuestion.correctIndex
      ) {
        setCurrentPokemon(null);
      }
    }, 400);
  }

  if (!currentQuestion) {
    return <Loading />;
  }

  return (
    <div className="quiz-area">
      <div className="question-container">
        <div className="quiz-pokemon">
          <LoadingImage
            src={currentPokemon.photo}
            alt={`an Image of ${currentPokemon.name} Pokemon`}
          />
          <div className="pokemon-name">
            {selectQuestion(score) !== 1 ? currentPokemon.name : "???????"}
          </div>
        </div>
        <div className="question">{currentQuestion.question}</div>
      </div>
      <div className="options-container">
        <div className="options">
          {currentQuestion.options.map((optionString, index) => {
            let markClass = "";
            if (currentQuestion.answered) {
              markClass =
                index === currentQuestion.correctIndex ? "correct" : "wrong";
              if (index === currentQuestion.selected) {
                markClass += " selected";
              }
            }
            return (
              <Option
                key={`${normalize(currentPokemon.id)}-${normalize(currentQuestion.question)}-${index}`}
                mark={markClass}
                onClick={() => handleAnswer(index)}
              >
                {optionString}
              </Option>
            );
          })}
        </div>
      </div>
    </div>
  );
}
