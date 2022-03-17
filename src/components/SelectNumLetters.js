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
      <h2>Select difficulty:</h2>
      <div className="flex-row num-btns">
        {buttonList}
      </div>
    </div>
  );
}