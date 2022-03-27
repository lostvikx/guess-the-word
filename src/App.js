import React, { useState } from "react";
import Header from "./components/Header";
import Main from "./Main";
import SelectNumLetters from "./components/SelectNumLetters";
import Footer from "./components/Footer";

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
            ? <div>
              <Header />
              <SelectNumLetters handleClick={handleClick} />
            </div>
            : <div>
              <Header handleClick={handleClick} />
              <Main numLetters={numLetters} handleClick={handleClick} />
            </div>
        }
        <Footer />
      </div>
    );
  }

  return (
    <Home />
  );
}