import React, { useEffect, useState } from "react";

// This can be changed to alter the difficulty of the game!
const numOfGuesses = 6;

// This is imp
const guesses = [];
let i = 0;
while (i < numOfGuesses) {
  guesses.push("");
  i++;
}

export default function GameBox(props) {

  const [guessEnum, setGuessEnum] = useState(0);
  const [ allGuesses, setAllGuesses ] = useState(guesses);

  useEffect(() => {
    const makeWord = (event) => {

      const hasChance = guessEnum < numOfGuesses;
      const keyIsChar = hasChance && event.keyCode >= 65 && event.keyCode <= 90;
      const keyIsDel = hasChance && (event.keyCode === 8 || event.keyCode === 46);
      const keyIsEnter = hasChance && event.keyCode === 13;

      if (keyIsChar) {

        setAllGuesses(prevAllGuesses => {
          const newAllGuessesArr = [...prevAllGuesses];
          if (newAllGuessesArr[guessEnum].length < props.numLetters) {
            newAllGuessesArr[guessEnum] += event.key.toLowerCase();
            return newAllGuessesArr;
          } else {
            return prevAllGuesses;
          }
        });

      }

      if (keyIsDel) {

        setAllGuesses(prevAllGuesses => {
          const newAllGuessesArr = [...prevAllGuesses];
          if (newAllGuessesArr[guessEnum].length > 0) {
            newAllGuessesArr[guessEnum] = newAllGuessesArr[guessEnum].slice(0, -1);
            return newAllGuessesArr;
          } else {
            return prevAllGuesses;
          }
        });

      }

      if (keyIsEnter) {

        if (allGuesses[guessEnum].length === props.numLetters) {
          console.log("Enter!");
          setGuessEnum(prevGuessEnum => prevGuessEnum + 1);
        }

      }
    }

    document.addEventListener("keydown", makeWord);

    // Clean-up function
    return () => {
      // console.log("cleaning up...");
      document.removeEventListener("keydown", makeWord);
    }
  }, [props.numLetters, allGuesses, guessEnum]);

  console.log("allGuesses state:", allGuesses);

  // The guess-row, we have 6 of them!
  const GuessRow = (props) => {
    // All boxes get mapped into a div-row
    const boxes = Array
      .from(Array(props.numLetters).keys())
      .map((_, i) => {
        const letter = props.word[i];
        // letter && console.log(letter);
        return (
          <div className="box" key={i}>{letter}</div>
        );
      });

    return (
      <div className="game-row">
        {boxes}
      </div>
    );
  }

  const allGuessRows = allGuesses.map((guess, i) => {
    return (
      <GuessRow
        numLetters={props.numLetters}
        word={guess}
        key={i}
      />
    );
  });

  return (
    <div className="game-box">
      { allGuessRows }
    </div>
  );
}