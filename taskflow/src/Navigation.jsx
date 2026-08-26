import React from "react";
import { NavLink } from "react-router-dom";
import "./App.css";

const Navigation = () => {
  return (
    <div id="navigationLinks">
      <NavLink to="/" className="nav-btn">
        Home
      </NavLink>
      <NavLink to="/dashboard" className="nav-btn">
        Dashboard
      </NavLink>
      <NavLink to="/projects" className="nav-btn">
        Projects
      </NavLink>
      <NavLink to="/analytics" className="nav-btn">
        Analytics
      </NavLink>
    </div>
  );
};

export default Navigation;
