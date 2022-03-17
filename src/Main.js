import React from "react";
import GameBox from "./components/GameBox";

export default function Main(props) {

  console.log(props.numLetters);

  return (
    <div>
      <h1>Guess a {props.numLetters} letter word 🤠</h1>
      <GameBox numLetters={props.numLetters} />
      <button 
        type="button" 
        onClick={() => props.handleClick(null)}
      >
        Reset
      </button>
    </div>
  );
}