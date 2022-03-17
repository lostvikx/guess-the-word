import React from "react";
import GuessBoxes from "./GuessBoxes";

export default function GameBox(props) {
  return (
    <div className="game-box">
      <div className="game-row">
        <GuessBoxes numLetters={props.numLetters} />
      </div>
      <div className="game-row">
        <GuessBoxes numLetters={props.numLetters} />
      </div>
      <div className="game-row">
        <GuessBoxes numLetters={props.numLetters} />
      </div>
      <div className="game-row">
        <GuessBoxes numLetters={props.numLetters} />
      </div>
      <div className="game-row">
        <GuessBoxes numLetters={props.numLetters} />
      </div>
      <div className="game-row">
        <GuessBoxes numLetters={props.numLetters} />
      </div>
      <div className="game-row">
        <GuessBoxes numLetters={props.numLetters} />
      </div>
    </div>
  );
}