import React from "react";

function getRandomFromArray(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

export default function SelectNumLetters(props) {

  const colors = ["#dae6ff", "#c6b8ff", "#dcfce7", "#e9d5ff"];
  const wordNumberSelection = [5, 6, 7, 8];
  const colorful = getRandomFromArray(colors);
  
  const buttonList = wordNumberSelection.map((number, i) => {
    return (
      <button
        type="button"
        className="letter-num-selection-btn"
        value={number}
        onClick={(event) => props.handleClick(Number(event.target.value))}
        key={i}
        style={{ backgroundColor: colorful }}
      >
        {number} Letters
      </button>
    );
  });

  return (
    <div>
      <h1>Select Difficulty</h1>
      <section>
        <p>Note: You get n amount of guesses in n letters difficulty. Meaning that if you selected the <strong>"5 Letters"</strong> difficulty, then you get <strong>5 Guesses</strong> to find the answer.</p>
      </section>
      <div className="num-btns">
        {buttonList}
      </div>
    </div>
  );
}