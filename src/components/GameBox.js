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

  // This can be changed to alter the difficulty of the game!
  const numOfGuesses = 6;
  const [word, setWord] = useState([]);
  // const [metaWord, setMetaWord] = useState("vikram");

  const guesses = [];
  let i = 0;
  while (i < numOfGuesses) {
    guesses.push("");
    i++;
  }

  const [ allGuesses, setAllGuesses ] = useState(guesses);

  console.log(allGuesses);

  const makeWord = (event) => {
    // console.log(event);
    // only alphabets allowed
    if (event.keyCode >= 65 && event.keyCode <= 90) {
      setWord((prevWord) => prevWord.concat(event.key.toLowerCase()));
    } else if (event.keyCode === 8 || event.keyCode === 46) {
      // console.log("backspace");
      setWord(prevWord => prevWord.slice(0, -1));
    } else if (event.keyCode === 13) {
      console.log("enter!");
    }
  }

  useEffect(() => {
    document.addEventListener("keyup", makeWord);

    return () => {
      console.log("cleaning up...")
      document.removeEventListener("keyup", makeWord);
    }
  }, []);

  word && console.log("word:", word);

  const allGuessRows = guesses.map((_, i) => {
    return (
      <GuessRow numLetters={props.numLetters} key={i} />
    );
  });

  return (
    <div className="game-box">
      {allGuessRows}
    </div>
  );
}