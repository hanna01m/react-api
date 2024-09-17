import React from "react";
import { Link } from "react-router-dom"; // Import Link, NOT BrowserRouter

function Header() {
  return (
    <header>
      <h1 className="header-title">API POLISEN - SENASTE HÄNDELSER</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Start</Link>
          </li>
          <li>
            <Link to="/search">Sök</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
