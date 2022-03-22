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
      <div className="num-btns">
        {buttonList}
      </div>
    </div>
  );
}