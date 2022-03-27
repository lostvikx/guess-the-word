import React from "react";
import Header from "../components/Header";
import guessMatchExample from "./img/example.png";
import guessNoMatchExample from "./img/none-match.png";

export default function About() {

  document.title = "About | GuessTheWord";

  return (
    <div>
      <Header />
      <h1>Do you think you can beat the game?</h1>
      <div className="about-section">
      <h2>Rules:</h2>
      <p>GuessTheWord in the number of tries that is the amount of letters to guess.</p>
      <p>Each guess must be a valid X-letter word. Hit Enter or Return to submit the guess.</p>
      <p>After each guess, the color of the tiles will show how close the guess was to the actual word.</p>
      <hr />
      <h2>Examples:</h2>
      <img src={guessMatchExample} alt="guess match example" />
      <p>The letter <strong>C</strong> is in the word and in the correct spot.</p>
      <p>The letter <strong>O</strong> is in the word, but in is the wrong spot.</p>
      <img src={guessNoMatchExample} alt="no guess match example" />
      <p>None of the letters in the above guess are is the word.</p>
      </div>
    </div>
  );
}