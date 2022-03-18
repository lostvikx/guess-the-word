import React from "react";
import GameBox from "./components/GameBox";

export default function Main(props) {

  console.log(props.numLetters);
  document.title = `Guess The Word | ${props.numLetters} Letters Challenge`;

  return (
    <div>
      <h1>Guess a {props.numLetters} letter word</h1>
      <GameBox numLetters={props.numLetters} />
    </div>
  );
}