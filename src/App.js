import React, { useState } from "react";
import Header from "./components/Header";
import Main from "./Main";
import SelectNumLetters from "./components/SelectNumLetters";

export default function App() {

  const [ numLetters, setNumLetters ] = useState(null);

  document.title = "Home | GuessTheWord";

  // console.log("numLetters state:", numLetters);

  // for selecting the numLetters and the back button
  function handleClick(num) {
    numLetters ? setNumLetters(null) : setNumLetters(num);
  }

  function Home() {
    return (
      <div className="container">
        {
          numLetters === null
            ? <>
              <Header />
              <SelectNumLetters handleClick={handleClick} />
            </>
            : <>
              <Header handleClick={handleClick} />
              <Main numLetters={numLetters} handleClick={handleClick} />
            </>
        }
        {/* <Footer /> */}
      </div>
    );
  }

  return (
    <Home />
  );
}