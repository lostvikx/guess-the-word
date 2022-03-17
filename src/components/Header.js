import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav>
      <div className="logo">📖</div>
      <ul>
        <li><Link to="/">Play!</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
}