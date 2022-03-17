import React, { useState } from "react";
import Header from "./components/Header";
import Main from "./Main";
import SelectNumLetters from "./components/SelectNumLetters";

export default function App() {

  const [numLetters, setNumLetters] = useState(null);
  document.title = "Guess The Word";

  // console.log("numLetters state:", numLetters);

  function handleClick(num) {
    numLetters ? setNumLetters(null) : setNumLetters(num)
  }

  return (
    <div className="container">
      <Header />
      {
        numLetters === null
          ? <SelectNumLetters handleClick={handleClick} />
          : <Main numLetters={numLetters} handleClick={handleClick} />
      }
    </div>
  );
}