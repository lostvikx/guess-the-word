import React, { useState } from "react";
import Header from "./components/Header";
import Main from "./Main";
import Rules from "./pages/Rules";
import SelectNumLetters from "./components/SelectNumLetters";
import { Navigate } from "react-router";

export default function App() {

  const shouldRedirect = true;

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
      </div>
    );
  }

  return (
    // shouldRedirect ? <Rules /> : <Home />
    <>
      <Home />
      {shouldRedirect && <Navigate replace to="/rules"/>}
    </>
  );
}