import React, { useState } from "react";
import Header from "./components/Header";
import Main from "./Main";
import SelectGame from "./components/SelectGame";

export default function App() {

  const [gameType, setGameType] = useState(null);
  document.title = "Guess The Word";

  console.log("gameType state:", gameType);

  function handleClick(nLetters) {
    setGameType(nLetters);
  }

  return (
    <main className="container">
      <Header />
      {
        gameType === null 
          ? <SelectGame handleGameType={handleClick} />
          : <Main letters={gameType} />
      }
    </main>
  );
}