import React from "react";
import Header from "./components/Header";
import Main from "./Main";

export default function App() {

  document.title = "Guess The Word";

  return (
    <main className="container">
      <Header />
      <Main />
    </main>
  );
}