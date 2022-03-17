import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="nav-bar">
      <div className="logo">📖</div>
      <ul className="nav-links">
        <li><Link to="/">Play!</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
}