import React from "react";
import GuessBoxes from "./components/GuessBoxes";

export default function Main(props) {

  console.log(props.numLetters);

  return (
    <div>
      <h1>Guess a {props.numLetters} letter word 🤠</h1>
      <div className="game-box flex-col">
        <div className="game-row flex-row">
          <GuessBoxes numLetters={props.numLetters} />
        </div>
        <div className="game-row flex-row">
          <GuessBoxes numLetters={props.numLetters} />
        </div>
        <div className="game-row flex-row">
          <GuessBoxes numLetters={props.numLetters} />
        </div>
        <div className="game-row flex-row">
          <GuessBoxes numLetters={props.numLetters} />
        </div>
        <div className="game-row flex-row">
          <GuessBoxes numLetters={props.numLetters} />
        </div>
        <div className="game-row flex-row">
          <GuessBoxes numLetters={props.numLetters} />
        </div>
        <div className="game-row flex-row">
          <GuessBoxes numLetters={props.numLetters} />
        </div>
      </div>
      <button 
        type="button" 
        onClick={() => props.handleClick(null)}
      >
        Reset
      </button>
    </div>
  );
}