import React, { useState } from "react";
import Header from "./components/Header";
import Main from "./Main";
import SelectGame from "./components/SelectGame";

export default function App() {

  const [numLetters, setNumLetters] = useState(null);
  document.title = "Guess The Word";

  console.log("gameType state:", numLetters);

  function handleClick(num) {
    numLetters ? setNumLetters(null) : setNumLetters(num)
  }

  return (
    <main className="container">
      <Header />
      {
        numLetters === null
          ? <SelectGame handleClick={handleClick} />
          : <Main numLetters={numLetters} handleClick={handleClick} />
      }
    </main>
  );
}