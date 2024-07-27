import React from "react";

// auth provider
import { AuthProvider } from "../contexts/authContext";

// pages and components imports
import Home from "./Home";
import SignIn from "./auth/SignIn";

// react router
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/signin" element={<SignIn />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
