import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";
import Navigation from "./Navigation";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Project from "./Project";
import Analytics from "./Analytics";


function App() {
  return (
    <>
      <Navbar />
      <hr /><br></br>
      <Navigation />
      <br></br>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/project" element={<Project />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </>
  );
}

export default App;
