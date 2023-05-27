import React from "react";

export default function Header() {
  return (
    <header className="header">
      <nav className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item">
            <a href="/" className="navbar-link">Home</a>
          </li>
          <li className="navbar-item">
            <a href="/about" className="navbar-link">About</a>
          </li>
          <li className="navbar-item">
            <a href="/contact" className="navbar-link">Contact</a>
          </li>
        </ul>
      </nav>
      <h1>Conversor</h1>
    </header>
  );
}
