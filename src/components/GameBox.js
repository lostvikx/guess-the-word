import React, { useEffect, useState } from "react";

// The guess-row, we have 6 of them!
const GuessRow = (props) => {
  // All boxes get mapped into a div-row
  const boxes = Array
    .from(Array(props.numLetters).keys())
    .map((_, i) => {
      const letter = props.word[i];
      return (
        <div className="box" key={i}>{letter}</div>
      );
    });

  return (
    <div className="game-row">
      { boxes }
    </div>
  );
}

export default function GameBox(props) {

  // This can be changed to alter the difficulty of the game!
  const numOfGuesses = 6;
  const [ word, setWord ] = useState([]);
  // const [metaWord, setMetaWord] = useState("vikram");

  const guesses = [];
  let i = 0;
  while (i < numOfGuesses) {
    guesses.push("");
    i++;
  }

  // test
  guesses[1] = "vikram";
  guesses[3] = "yellow";

  const [ allGuesses, setAllGuesses ] = useState(guesses);
  // console.log(allGuesses);

  useEffect(() => {
    const makeWord = (event) => {

      const keyIsChar = event.keyCode >= 65 && event.keyCode <= 90;
      const keyIsDel = event.keyCode === 8 || event.keyCode === 46;
      const keyIsEnter = event.keyCode === 13;

      // only alphabets allowed
      if (keyIsChar) {
        setWord((prevWord) => {
          // limited to numLetters length
          if (prevWord.length === props.numLetters) {
            console.log("reached the word length limit!");
            return prevWord;
          } else {
            return prevWord.concat(event.key.toLowerCase())
          }
        });
      }
      else if (keyIsDel) {
        setWord(prevWord => prevWord.slice(0, -1));
      }
      else if (keyIsEnter) {
        console.log("enter!");
        if (word.length === props.numLetters) {
          setAllGuesses(word);
        }
      }
    }

    document.addEventListener("keyup", makeWord);

    // Clean-up function
    return () => {
      // console.log("cleaning up...");
      document.removeEventListener("keyup", makeWord);
    }
  }, [ word ]);

  word && console.log(word, word.length);
  console.log(allGuesses);

  const allGuessRows = guesses.map((guess, i) => {
    return (
      <GuessRow 
        numLetters={props.numLetters}
        word={guess}
        key={i}
      />
    );
  });

  const testWords = ["vikram", "yellow"];

  return (
    <div className="game-box">
      { allGuessRows }
      {/* <GuessRow
        numLetters={props.numLetters}
        word={testWords[0]}
      />
      <GuessRow
        numLetters={props.numLetters}
        word={testWords[1]}
      />
      <GuessRow
        numLetters={props.numLetters}
        word={word}
      /> */}
    </div>
  );
}