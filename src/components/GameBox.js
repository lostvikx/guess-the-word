import React, { useEffect, useState } from "react";
import matchLetters from "../helper/matchLetters";

// This can be changed to alter the difficulty of the game!
const numOfGuesses = 6;
const metaWord = "hollow";

// console.log(matchLetters(metaWord, "kitvip"));

// This is important
const guesses = [];
let i = 0;
while (i < numOfGuesses) {
  guesses.push("");
  i++;
}

export default function GameBox(props) {

  const [ guessEnum, setGuessEnum ] = useState(0);
  const [ allGuesses, setAllGuesses ] = useState(guesses);
  const [ matched, setMatched ] = useState([]);

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

          setMatched(prevMatched => {
            const newMatched = [...prevMatched];
            newMatched[guessEnum] = matchLetters(metaWord, guessWord);
            return newMatched;
          });

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

  // console.log("allGuesses state:", allGuesses);
  console.log("matched state:", matched);

  // The guess-row, we have 6 of them!
  const GuessRow = (props) => {

    const matchedObj = props.matchLetters ? props.matchLetters : null;
    // matchedObj && console.log("matched object", matchedObj);

    // All boxes get mapped into a game-row
    const boxes = [];

    for (let i = 0; i <props.numLetters; i++) {

      const letter = props.word[i];

      let className = "box";

      if (matchedObj) {

        if (matchedObj.exact.includes(i)) {
          className = "box exact-match";
        } else if (matchedObj.contains.includes(i)) {
          className = "box contains-match";
        }

      }

      boxes.push(
        <div
          className={className}
          key={i}
        >
          {letter}
        </div>
      );
    }

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
        matchLetters={matched[i] || null}
      />
    );
  });

  return (
    <div className="game-box">
      { allGuessRows }
    </div>
  );
}