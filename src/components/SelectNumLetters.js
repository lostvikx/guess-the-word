import React from "react";

export default function SelectNumLetters(props) {

  const wordNumberSelection = [5, 6, 7, 8];
  
  const buttonList = wordNumberSelection.map((number, i) => {
    return (
      <button
        type="button"
        className="letter-num-selection-btn"
        value={number}
        onClick={(event) => props.handleClick(Number(event.target.value))}
        key={i}
      >
        {number} Letters
      </button>
    );
  });

  return (
    <div>
      <h1>Select Difficulty:</h1>
      <section>
        <p>Note: You get n amount of guesses in n letters difficulty. Meaning that if you selected the <strong>"5 Letters"</strong> difficulty, then you get <strong>5 Guesses</strong> to find the answer.</p>
      </section>
      <div className="num-btns">
        {buttonList}
      </div>
    </div>
  );
}