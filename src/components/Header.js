import React from "react";
import { Link } from "react-router-dom";

export default function Header(props) {

  // Object.keys(props).length ? console.log(props) : console.log("no props");

  return (
    <nav className="nav-bar">

      {
        Object.keys(props).length
          ? <div 
              className="back-btn"
              onClick={() => props.handleClick(null)}
            >
              ⬅ Back
            </div>
          : <div
              className="logo"
            >
              <Link to="/">GuessTheWord</Link>
            </div>
      }
      
      <ul className="nav-links">
        <li><Link to="/about">About</Link></li>
        <li><a href="https://github.com/lostvikx/guess-the-word" target="_blank" rel="noreferrer">GitHub</a></li>
      </ul>

    </nav>
  );
}