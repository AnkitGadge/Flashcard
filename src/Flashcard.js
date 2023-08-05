import React, { useState, useEffect, useRef } from "react";

export default function Flashcard({ flashcards }) {
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState("inital");

  const frontEl = useRef();
  const backEl = useRef();
  function setMaxHeight() {
    const fronHeight = frontEl.current.getBoundingClientRect().height;
    const backHeight = backEl.current.getBoundingClientRect().height;
    setHeight(Math.max(fronHeight, backHeight, 100));
  }

  useEffect(() => {
    setMaxHeight();
  }, [flashcards.question, flashcards.answer, flashcards.options]);

  useEffect(() => {
    window.addEventListener("resize", setMaxHeight);
    return () => window.removeEventListener("resize", setMaxHeight);
  }, []);

  return (
    <div
      className={`card ${flip ? "flip" : ""}`}
      style={{ height: height }}
      onClick={() => setFlip(!flip)}
    >
      <div className="front" ref={frontEl}>
        {flashcards.question}
        <div className="flashcard-options">
          {flashcards.options.map((option) => {
            return (
              <div className="flashcard-option" key={option}>
                {option}
              </div>
            );
          })}
        </div>
      </div>
      <div className="back" ref={backEl}>
        {/* {flip ? flashcards.answer :flashcards.question} */}
        {flashcards.answer}
      </div>
    </div>
  );
}
