import React from "react";

export default function SelectGame(props) {
  return (
    <div>
      <h2>Select the number of letters:</h2>
      <div>
        <button 
          type="button" 
          className="btn" 
          value={5} 
          onClick={(event) => props.handleClick(event.target.value)}
        >
          5
        </button>
        <button 
          type="button" 
          className="btn" 
          value={6} 
          onClick={(event) => props.handleClick(event.target.value)}
        >
          6
        </button>
        <button 
          type="button" 
          className="btn" 
          value={7} 
          onClick={(event) => props.handleClick(event.target.value)}
        >
          7
        </button>
      </div>
    </div>
  );
}