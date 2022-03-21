import React, { useState } from "react";
import Header from "./components/Header";
import Main from "./Main";
import SelectNumLetters from "./components/SelectNumLetters";

export default function App() {

  const [ numLetters, setNumLetters ] = useState(null);
  document.title = "GuessTheWord";

  console.log("numLetters state:", numLetters);

  // for selecting the numLetters and the back button
  function handleClick(num) {
    numLetters ? setNumLetters(null) : setNumLetters(num);
  }

  return (
    <div className="container">

      {
        numLetters === null
          ? <div>
              <Header />
              <SelectNumLetters handleClick={handleClick} />
            </div>
          : <div>
              <Header handleClick={handleClick} />
              <Main numLetters={numLetters} handleClick={handleClick} />
            </div>
      }

    </div>
  );
}