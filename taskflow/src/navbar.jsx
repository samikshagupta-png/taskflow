import React, { useState } from "react";
import "./App.css"; 

const Navbar = () => {
  const gradients = [
    "linear-gradient(to right, #d0c2dc, #FFFFFF)",
    "linear-gradient(to right, #6fb9f6, #e9b7b7)",
    "linear-gradient(to right, #8d8a8a, #5555da)",
    "linear-gradient(to right, #f3ecec, #b6b6be)",
  ];

  const [current, setCurrent] = useState(0);

  const handleThemeSwitch = () => {
    // Apply gradient to body
    document.body.style.background = gradients[current];
    // Move to next gradient
    setCurrent((prev) => (prev + 1) % gradients.length);
  };

  return (
    <nav>
      <h1 className="brand">Taskflow</h1>
      <button id="themebtn" onClick={handleThemeSwitch}>
        🌞
      </button>
    </nav>
  );
};

export default Navbar;
