import React from "react";

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