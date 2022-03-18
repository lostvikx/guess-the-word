import React, { useEffect, useState } from "react";

// Each box gets mapped into a div
const GuessBoxes = (props) => {
  return Array.from(Array(props.numLetters).keys())
    .map((_, i) => {
      return (
        <div className="box" key={i}></div>
      );
    });
}

// The guess-row, we have 6 of them!
const GuessRow = (props) => {
  return (
    <div className="game-row">
      <GuessBoxes numLetters={props.numLetters} />
    </div>
  );
}

export default function GameBox(props) {

  const [word, setWord] = useState("");

  const makeWord = (event) => {
    setWord((prevWord) => prevWord + event.key);
  }

  useEffect(() => {
    document.addEventListener("keypress", makeWord);

    return () => {
      console.log("cleaning up...")
      document.removeEventListener("keypress", makeWord);
    }
  }, []);

  word && console.log("word:", word);

  return (
    <div className="game-box">
      <GuessRow numLetters={props.numLetters} />
      <GuessRow numLetters={props.numLetters} />
      <GuessRow numLetters={props.numLetters} />
      <GuessRow numLetters={props.numLetters} />
      <GuessRow numLetters={props.numLetters} />
      <GuessRow numLetters={props.numLetters} />
    </div>
  );
}