import React, { useEffect, useState } from "react";

// This can be changed to alter the difficulty of the game!
const numOfGuesses = 6;
const metaWord = "vikram";

/**
 * matchWord takes two arguments.
 * The return value is an array of indecies that match.
 * @param {string} word - metaWord
 * @param {string} - guessWord
 */
function matchWord(word, guess) {

  console.assert(word.length === guess.length);

  let iter = 0;

  while (iter < word.length) {

    

    iter++;
  }

}

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

    // callback fn for keydown event lister
    const makeWord = (event) => {

      // conditions
      const hasChance = guessEnum < numOfGuesses;
      const keyIsChar = hasChance && event.keyCode >= 65 && event.keyCode <= 90;
      const keyIsDel = hasChance && (event.keyCode === 8 || event.keyCode === 46);
      const keyIsEnter = hasChance && event.keyCode === 13;

      if (keyIsChar) {

        setAllGuesses(prevAllGuesses => {
          const newAllGuessesArr = [...prevAllGuesses];
          // guess string length < numLetters
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
          // guess string length > 0
          if (newAllGuessesArr[guessEnum].length > 0) {
            newAllGuessesArr[guessEnum] = newAllGuessesArr[guessEnum].slice(0, -1);
            return newAllGuessesArr;
          } else {
            return prevAllGuesses;
          }
        });

      }

      // guess made
      if (keyIsEnter) {

        const guessWord = allGuesses[guessEnum];

        // guess string length === numLetters
        if (guessWord.length === props.numLetters) {
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

    // All boxes get mapped into a game-row
    const boxes = Array
      .from(Array(props.numLetters).keys())
      .map((_, i) => {
        // word[index]
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