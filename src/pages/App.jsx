import React from "react";

// pages and components imports
import Home from "./Home";
import Login from "./auth/Login";

// react router
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/login" element={<Login />} />
    </Routes>
  );
}

export default App;
