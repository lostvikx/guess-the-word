import React from "react";

const GuessBoxes = (props) => Array.from(Array(props.numLetters).keys()).map((_, i) => <div key={i}>{i}</div>);

export default function Main(props) {

  console.log(props.numLetters);

  return (
    <div>
      <h1>Guess a {props.numLetters} letter word 🤠</h1>
      <div>
        <GuessBoxes numLetters={props.numLetters} />
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