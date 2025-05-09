import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Event Manager</Link>
      </div>
      <ul className="navbar-links">
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/add">Add Event</NavLink></li>
        <li><NavLink to="/about"> About </NavLink></li>
        
      </ul>
    </nav>
  );
}

export default Navbar;
