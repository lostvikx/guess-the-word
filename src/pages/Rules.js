import React, {useState} from "react";
import Header from "../components/Header";
import exactMatchExample from "./img/gifts.png";
import guessMatchExample from "./img/contain-match.png";
import guessNoMatchExample from "./img/none-match.png";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function Rules() {

  const [hover, setHover] = useState(false);

  document.title = "Rules | GuessTheWord";

  function handleHover() {
    setHover(prevHover => !prevHover);
  }

  return (
    <div className="container">
    <div>
      <Header />
      <h1>Do you think you can beat the game?</h1>
      <section>
        <h2>Rules:</h2>
        <p>GuessTheWord in the number of tries that is the amount of letters to guess.</p>
        <p>Each guess must be a valid n letter word. Hit Enter or Return to submit the guess.</p>
        <p>After each guess, the color of the tiles will show how close the guess was to the actual word.</p>
        <hr />
        <h2>Examples:</h2>
        <img src={exactMatchExample} alt="guess match example" />
        <p>The letter <strong>G</strong> is in the word and in the correct spot.</p>
        <img src={guessMatchExample} alt="guess match example" />
        <p>The letter <strong>A</strong> and <strong>E</strong> are in the word, but in the wrong spots.</p>
        <img src={guessNoMatchExample} alt="no guess match example" />
        <p>None of the letters in the above guess are is the word.</p>
        <p className="play">
            <Link className="play-btn" to="/play" onMouseEnter={handleHover} onMouseLeave={handleHover}>{hover ? "🧁" : "Play"}</Link>
        </p>
      </section>
    </div>
    <Footer />
    </div>
  );
}