import React from "react";

export default function SelectGame(props) {
  return (
    <div>
      <h2>Select a Game:</h2>
      <div>
        <button 
          type="button" 
          className="btn" 
          value={5} 
          onClick={(event) => props.handleGameType(event.target.value)}
        >
          5 words
        </button>
        <button 
          type="button" 
          className="btn" 
          value={6} 
          onClick={(event) => props.handleGameType(event.target.value)}
        >
          6 words
        </button>
        <button 
          type="button" 
          className="btn" 
          value={7} 
          onClick={(event) => props.handleGameType(event.target.value)}
        >
          7 words
        </button>
      </div>
    </div>
  );
}