import React from "react";

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

  const i = props.i - 1;
  const guess = props.allGuesses[i];

  const letters = {
    duds: [],
    exact: [],
    contains: []
  };

  // console.log(props.matched);

  for (const match of props.matched) {

    for (const index of match.exact) {
      letters.exact.push(guess[index]);
    }

    for (const index of match.contains) {
      letters.contains.push(guess[index]);
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