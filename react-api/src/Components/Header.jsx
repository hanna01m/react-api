import React from "react";
import { Link } from "react-router-dom"; // Import Link, NOT BrowserRouter

function Header() {
  return (
    <header>
      {" "}
      <Link to="/">
        <h1 className="header-title">API POLISEN - SENASTE HÄNDELSER</h1>
      </Link>
    </header>
  );
}

export default Header;
