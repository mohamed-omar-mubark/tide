import React from "react";

// auth provider
import { AuthProvider } from "../contexts/authContext";

// pages and components imports
import Home from "./Home";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";

// react router
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
