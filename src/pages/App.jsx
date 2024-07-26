import React from "react";

// auth provider
import { AuthProvider } from "../contexts/authContext";

// pages and components imports
import Home from "./Home";
import Login from "./auth/Login";

// react router
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
