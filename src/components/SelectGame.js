import React from "react";

export default function SelectGame(props) {

  const wordNumberSelection = [5, 6, 7, 8];
  
  const buttonList = wordNumberSelection.map((number, i) => {
    return (
      <button
        type="button"
        className="letter-num-selection-btn"
        value={number}
        onClick={(event) => props.handleClick(event.target.value)}
        key={i}
      >
        {number}
      </button>
    );
  });

  return (
    <div>
      <h2>Select the number of letters:</h2>
      <div>
        {buttonList}
      </div>
    </div>
  );
}