import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Header(props) {

  // Object.keys(props).length ? console.log(props) : console.log("no props");

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {

    function watchWidth() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", watchWidth);

    return () => {
      window.removeEventListener("resize", watchWidth);
    }

  }, [windowWidth]);

  const isMobile = windowWidth < 500;

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
          : <div className="logo">
            <Link to="/play">{isMobile ? "🧁" : "🧁 GuessTheWord"}</Link>
            </div>
      }
      
      <ul className="nav-links">
        <li><Link to="/">Rules</Link></li>
        <li>
          <a href="https://github.com/lostvikx/guess-the-word" target="_blank" rel="noreferrer">GitHub</a>
        </li>
      </ul>

    </nav>
  );
}