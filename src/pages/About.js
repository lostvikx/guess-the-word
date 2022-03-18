import React from "react";
import Header from "../components/Header";

export default function About() {

  document.title = document.title + " | About";

  return (
    <div>
      <Header />
      <h1>Fun facts about the game!</h1>
    </div>
  );
}