import React, { useEffect, useState } from "react";
import matchLetters from "../helper/matchLetters";
import Keyboard from "./Keyboard";

// This can be changed to alter the difficulty of the game!
const numOfGuesses = 6;

function makeArrayWithBlankString(num) {
  const arr = [];
  let i = 0;
  while (i < num) {
    arr.push("");
    i++;
  }
  return arr;
}

function getRandomFromArray(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

export default function GameBox(props) {

  const [guessEnum, setGuessEnum] = useState(0);
  const [allGuesses, setAllGuesses] = useState(makeArrayWithBlankString(numOfGuesses)); // [string]
  const [matched, setMatched] = useState([]); // [{exact, contains}]
  const [wordsList, setWordsList] = useState([]); // array of words
  const [metaWord, setMetaWord] = useState("");
  const [win, setWin] = useState(false);
  const [isBadWord, setIsBadWord] = useState(false);
  
  // TODO: loading component
  // const [ loading, setLoading ] = useState(true);

  useEffect(() => {

    // TODO: Implement client side caching
    const pathToWordFile = `assets/words/${props.numLetters}_letter_words.txt`;

    fetch(pathToWordFile)
      .then(res => res.text())
      .then(data => {
        const allWords = data
          .split(/\r?\n/)
          .filter(word => word.length !== 0);
          
        const randomWord = getRandomFromArray(allWords);

        setWordsList(allWords);
        setMetaWord(randomWord);
        // sneek peek
        console.log(randomWord);
      })
      .catch(err => console.error(err));

  }, [props.numLetters]);

  useEffect(() => {

    // callback fn for keydown event lister
    const makeWord = (event) => {

      // conditions
      const hasChance = guessEnum < numOfGuesses && !win;
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
            setIsBadWord(false);
            return newAllGuessesArr;
          } else {
            return prevAllGuesses;
          }
        });

      }

      if (keyIsEnter) {

        const guessWord = allGuesses[guessEnum];

        // check word is in the wordList
        const isLegalWord = wordsList.includes(allGuesses[guessEnum]);

        // guess string length === numLetters
        if (guessWord.length === props.numLetters) {
          // console.log("Enter!");
          if (isLegalWord) {
            setGuessEnum(prevGuessEnum => prevGuessEnum + 1);

            // correct word
            setIsBadWord(false);

            setMatched(prevMatched => {
              const newMatched = [...prevMatched];
              newMatched[guessEnum] = matchLetters(metaWord, guessWord);
              // console.log("matched state:", newMatched);
              return newMatched;
            });
          } else {
            console.log("word is illegal");
            // current guess is long enough, but is not a legal word
            setIsBadWord(true);
          }

        }

      }
      
    }

    document.addEventListener("keydown", makeWord);

    if (!win) {
      for (const match of matched) {
        if (match.exact.length === props.numLetters) {
          console.log("Winner! 🎉");
          setWin(true);
          break;
        }
      }
    }

    // Clean-up function
    return () => {
      // console.log("cleaning up...");
      document.removeEventListener("keydown", makeWord);
    }
  }, [props.numLetters, allGuesses, guessEnum, metaWord, win, matched, wordsList]);

  // console.log("allGuesses state:", allGuesses);
  // wordsList.includes(allGuesses[guessEnum]) && console.log(allGuesses[guessEnum]);
  // console.log(guessEnum);
  // console.log("matched state:", matched);

  // The guess-row, we have 6 of them!
  const GuessRow = (props) => {

    const word = props.word;
    const matchedObj = props.matchLetters ? props.matchLetters : null;

    // console.log("matched object", matchedObj);

    const inWordsList = wordsList.includes(word);
    // word.length === props.numLetters && console.log(inWordsList);

    // All boxes get mapped into a game-row
    const boxes = [];

    for (let i = 0; i < props.numLetters; i++) {

      const letter = word[i];
      let className = "box";

      if (matchedObj) {

        if (matchedObj.exact.includes(i)) {
          className = "box exact-match";
        } else if (matchedObj.contains.includes(i)) {
          className = "box contains-match";
        }

      }

      // styling the input box
      let boxStyle = {};

      if (letter) {
        boxStyle = { borderColor: "black" };
      }

      if (word.length === props.numLetters && !inWordsList && props.isBadWord) {
        boxStyle = { borderColor: "red" };
      }

      if (win && metaWord === word) {
        boxStyle = { borderColor: "var(--link)" };
      }

      boxes.push(
        <div
          className={className}
          key={i}
          style={boxStyle}
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
        isBadWord={isBadWord}
      />
    );
  });

  function handleClickKeyboard(event) {

    const key = event.target.textContent;

    const hasChance = guessEnum < numOfGuesses && !win;
    const isChar = hasChance && key.length === 1;
    const isDel = hasChance && key === "<=";
    const isEnter = hasChance && key === "enter";

    if (isChar) {
      setAllGuesses(prevAllGuesses => {
        const newAllGuessesArr = [...prevAllGuesses];
        // guess string length < numLetters
        if (newAllGuessesArr[guessEnum].length < props.numLetters) {
          newAllGuessesArr[guessEnum] += key;
          return newAllGuessesArr;
        } else {
          return prevAllGuesses;
        }
      });
    }

    if (isDel) {
      setAllGuesses(prevAllGuesses => {
        const newAllGuessesArr = [...prevAllGuesses];
        // guess string length > 0
        if (newAllGuessesArr[guessEnum].length > 0) {
          newAllGuessesArr[guessEnum] = newAllGuessesArr[guessEnum].slice(0, -1);
          setIsBadWord(false);
          return newAllGuessesArr;
        } else {
          return prevAllGuesses;
        }
      });
    }

    if (isEnter) {
      const guessWord = allGuesses[guessEnum];

      // check word is in the wordList
      const isLegalWord = wordsList.includes(allGuesses[guessEnum]);

      // guess string length === numLetters
      if (guessWord.length === props.numLetters) {
        // console.log("Enter!");
        if (isLegalWord) {
          setGuessEnum(prevGuessEnum => prevGuessEnum + 1);

          // correct word
          setIsBadWord(false);

          setMatched(prevMatched => {
            const newMatched = [...prevMatched];
            newMatched[guessEnum] = matchLetters(metaWord, guessWord);
            // console.log("matched state:", newMatched);
            return newMatched;
          });
        } else {
          console.log("word is illegal");
          // current guess is long enough, but is not a legal word
          setIsBadWord(true);
        }

      }
    }

  }

  return (
    <div className="game-box">
      { allGuessRows }
      <Keyboard 
        allGuesses={allGuesses} 
        onClick={handleClickKeyboard} 
        matched={matched}
        i={guessEnum}
      />
    </div>
  );
}