import React, { useState } from "react";

function createKeyDivs(keysString, handleClick) {

  const isLastLine = keysString.startsWith("z");

  if (isLastLine) {
    const keys = ["enter"].concat(keysString.split("")).concat("<=").map((letter, i) => {
      return (
        <div 
          key={i} 
          className="key" 
          onClick={handleClick} 
          value={letter}
        >
          {letter}
        </div>
      );
    });
    return keys;
  } else {
    const keys = keysString.split("").map((letter, i) => {
      return (
        <div 
          key={i} 
          className="key char-key" 
          onClick={handleClick} 
          value={letter}
        >
          {letter}
        </div>
      );
    });
    return keys;
  }
}

export default function Keyboard(props) {

  const [letters, setLetters] = useState({
    all: [],
    duds: [],
    exact: [],
    contains: []
  });

  const i = props.i - 1;
  const guess = props.allGuesses[i];
  console.log(guess);

  // console.log(props.matched, i);

  if (props.matched.length && props.matched[i]) {
    
    // console.log(i, props.matched[i]);
    // console.log("exact match:", props.matched[i].exact);
    // console.log("contains match:", props.matched[i].contains);

    for (const index of props.matched[i].exact) {

      const isNewLetter = !letters.all.includes(guess[index]);
      const isInContains = letters.contains.includes(guess[index]);

      if(isNewLetter) {
        setLetters(prevLetters => {
          const newLetters = { ...prevLetters };
          newLetters.all.push(guess[index]);
          newLetters.exact.push(guess[index]);
          return newLetters;
        });
      }

      if (isInContains) {
        console.log("was in contains");
        setLetters(prevLetters => {
          const newLetters = { ...prevLetters };
          newLetters.contains = newLetters.contains.filter(letter => letter !== guess[index]);
          newLetters.exact = newLetters.exact.filter(letter => letter !== guess[index]);
          newLetters.exact.push(guess[index]);
          return newLetters;
        });
      }

    }

    for (const index of props.matched[i].contains) {

      const isNewLetter = !letters.all.includes(guess[index]);

      if(isNewLetter) {
        setLetters(prevLetters => {
          const newLetters = { ...prevLetters };
          newLetters.all.push(guess[index]);
          newLetters.contains.push(guess[index]);
          return newLetters;
        });
      }
    }

    for (const letter of guess) {
      const isNewLetter = !letters.all.includes(letter);

      if (isNewLetter) {
        setLetters(prevLetters => {
          const newLetters = { ...prevLetters };
          newLetters.all.push(letter);
          newLetters.duds.push(letter);
          return newLetters;
        });
      }

    }

  }

  console.log(letters);

  const upperLine = createKeyDivs("qwertyuiop", props.onClick);
  const middleLine = createKeyDivs("asdfghjkl", props.onClick);
  const lowerLine = createKeyDivs("zxcvbnm", props.onClick);

  return (
    <div className="keyboard">
      <div className="upperline">{upperLine}</div>
      <div className="middleline">{middleLine}</div>
      <div className="lowerline">{lowerLine}</div>
    </div>
  );

}