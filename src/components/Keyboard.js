import React from "react";

function createKeyDivs(keysString) {

  const isLastLine = keysString.startsWith("z");

  if (isLastLine) {
    const keys = ["Enter"].concat(keysString.split("")).concat("<=").map((letter, i) => {
      return (
        letter.length > 1 ? <div key={i} className="key special-key">{letter}</div> : <div key={i} className="key">{letter}</div>
      );
    });
    return keys;
  } else {
    const keys = keysString.split("").map((letter, i) => {
      return (
        <div key={i} className="key char-key">{letter}</div>
      );
    });
    return keys;
  }
}

export default function Keyboard(props) {

  // console.log(props.allGuesses);

  const upperLine = createKeyDivs("qwertyuiop");
  const middleLine = createKeyDivs("asdfghjkl");
  const lowerLine = createKeyDivs("zxcvbnm");

  return (
    <div className="keyboard">
      <div className="upperline">{upperLine}</div>
      <div className="middleline">{middleLine}</div>
      <div className="lowerline">{lowerLine}</div>
    </div>
  );

}