import React from "react";
import { NavLink } from "react-router-dom";
import "./App.css";

const Navigation = () => {
  return (
    <div id="navigationLinks">
      <NavLink to="/" className="nav-btn" id ="homebtn">
        Home
      </NavLink>
      <NavLink to="/dashboard" className="nav-btn" id ="dashboard">
        Dashboard
      </NavLink>
      <NavLink to="/project" className="nav-btn" id="projects">
        Projects
      </NavLink>
      <NavLink to="/analytics" className="nav-btn" id="analytics">
        Analytics
      </NavLink>
    </div>
  );
};

export default Navigation;
