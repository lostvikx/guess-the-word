import React, { useEffect, useState } from "react";
import matchLetters from "../helper/matchLetters";

// This can be changed to alter the difficulty of the game!
const numOfGuesses = 6;

// This is important
function makeArrayWithBlankString(num) {
  const arr = [];
  let i = 0;
  while (i < num) {
    arr.push("");
    i++;
  }
  return arr;
}

// type = ["warn", "success"]
// function notifyUser(type, timeout=2000) {
//   const warnNoti = document.getElementById(type);
//   warnNoti.style.visibility = "visible";
//   setTimeout(() => warnNoti.style.visibility = "hidden", timeout);
// }

function getRandomFromArray(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

export default function GameBox(props) {

  const [ guessEnum, setGuessEnum ] = useState(0);
  const [allGuesses, setAllGuesses] = useState(makeArrayWithBlankString(numOfGuesses));
  const [ matched, setMatched ] = useState([]);
  const [ wordsList, setWordsList ] = useState([]);
  const [ metaWord, setMetaWord ] = useState("");
  const [ win, setWin ] = useState(false);
  
  // TODO: loading component
  // const [ loading, setLoading ] = useState(true);

  useEffect(() => {

    // TODO: Implement client side caching
    const pathToWordFile = `assets/words/${props.numLetters}_letter_words.txt`;

    fetch(pathToWordFile)
      .then(res => res.text())
      .then(data => {
        const allWords = data.split(/\r?\n/).filter(word => word.length !== 0);
        const randomWord = getRandomFromArray(allWords);
        setWordsList(allWords);
        setMetaWord(randomWord);
        // sneek peek
        console.log(randomWord);
      })
      .catch(err => console.error(err));

  }, [props.numLetters]);

  // console.log(wordsList);

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
            return newAllGuessesArr;
          } else {
            return prevAllGuesses;
          }
        });

      }

      // guess made and word is in the wordList
      if (keyIsEnter) {

        const guessWord = allGuesses[guessEnum];
        const isLegalWord = wordsList.includes(allGuesses[guessEnum]);

        // guess string length === numLetters
        if (guessWord.length === props.numLetters) {
          // console.log("Enter!");
          if (isLegalWord) {
            setGuessEnum(prevGuessEnum => prevGuessEnum + 1);

            setMatched(prevMatched => {
              const newMatched = [...prevMatched];
              newMatched[guessEnum] = matchLetters(metaWord, guessWord);
              console.log("matched state:", newMatched);
              return newMatched;
            });
          } else {
            console.log("word is illegal");
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

    // matchedObj && console.log("matched object", matchedObj);
    // badWord.length === props.numLetters && console.log(badWord);

    const inWordsList = wordsList.includes(word);
    word.length === props.numLetters && console.log(inWordsList);

    // All boxes get mapped into a game-row
    const boxes = [];

    for (let i = 0; i < props.numLetters; i++) {

      const letter = word[i];
      let className = "box"

      if (matchedObj) {

        if (matchedObj.exact.includes(i)) {
          className = "box exact-match";
        } 
        // change to else if (on error)
        if (matchedObj.contains.includes(i)) {
          className = "box contains-match";
        }

      }

      let boxStyle = {};

      if (letter) {
        boxStyle = { borderColor: "black" };
      }

      if (word.length === props.numLetters && !inWordsList) {
        boxStyle = { borderColor: "red" };
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
      />
    );
  });

  return (
    <div className="game-box">
      { allGuessRows }
    </div>
  );
}