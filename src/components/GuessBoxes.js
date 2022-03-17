import React from "react";

export default function GuessBoxes(props) {
  return Array.from(Array(props.numLetters).keys())
    .map((_, i) => {
      return (
        <div className="box" key={i}>
          {i}
        </div>
      );
    });
}