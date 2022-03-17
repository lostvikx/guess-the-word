import React from "react";

export default function Main(props) {



  return (
    <div>
      <h1>Guess a {props.numLetters} letter word 🤠</h1>
      <button 
        type="button" 
        onClick={() => props.handleClick(null)}
      >
        Reset
      </button>
    </div>
  );
}