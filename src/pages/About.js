import React from "react";
import Header from "../components/Header";

export default function About() {

  document.title = document.title + " | About";

  return (
    <div>
      <Header />
      Some things about the game!
    </div>
  );
}