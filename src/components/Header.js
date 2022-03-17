import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav>
      <figure><img src="#" alt="logo" /></figure>
      <ul>
        <li><Link to="/" />Play!</li>
        <li><Link to="/about-game" />About</li>
      </ul>
    </nav>
  );
}