import React, { useEffect, useState } from "react";



// This can be changed to alter the difficulty of the game!
const numOfGuesses = 6;

const guesses = [];
let i = 0;
while (i < numOfGuesses) {
  guesses.push("");
  i++;
}

let guessEnum = 0;

// test
guesses[0] = "yellow";
// guesses[3] = "tigers";

export default function GameBox(props) {

  const [ word, setWord ] = useState("");
  const [ allGuesses, setAllGuesses ] = useState(guesses);

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
            return prevWord + event.key.toLowerCase();
          }
        });
      }
      else if (keyIsDel) {
        setWord(prevWord => prevWord.slice(0, -1));
      }
      else if (keyIsEnter) {
        if (word.length === props.numLetters) {
          console.log("enter!");
          setAllGuesses(prevAllGuesses => {

            const newGuessesArr = prevAllGuesses.filter(guess => guess !== "");

            if (newGuessesArr.length === numOfGuesses) {
              console.log("No more guesses!");
              return newGuessesArr;
            }

            newGuessesArr.push(word);
            console.log(newGuessesArr);

            while (newGuessesArr.length < numOfGuesses) {
              newGuessesArr.push("");
            }

            return newGuessesArr;
          });

          setWord("");
        }
      }
    }

    document.addEventListener("keydown", makeWord);

    // Clean-up function
    return () => {
      // console.log("cleaning up...");
      document.removeEventListener("keydown", makeWord);
    }
  }, [ word ]);

  // console.log("word state:" ,word, word.length);
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