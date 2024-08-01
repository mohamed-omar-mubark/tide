import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";

import { doSignInWithEmailAndPassword } from "../../firebase/auth";
import { useAuth } from "../../contexts/authContext";

// components
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

function SignIn() {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

  // functions

  // signin with email and password
  const signin = async (e) => {
    e.preventDefault();

    if (!isSigningIn) {
      setIsSigningIn(true);
      await doSignInWithEmailAndPassword(email, password)
        .then(() => {
          // navigate to home
          Navigate("/");
        })
        .catch(() => {
          setIsSigningIn(false);
        });
    }
  };

  return (
    <div className="h-screen flex-center">
      {userLoggedIn && <Navigate to={"/"} replace={true} />}

      <div className="form-container mx-auto w-full max-w-30rem">
        <h1 className="page-title mt-0 mb-7">Sign In</h1>

        <form onSubmit={signin}>
          <div className="flex flex-column gap-2 mb-3">
            <label htmlFor="email">Email</label>
            <InputText
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-column gap-2 mb-5">
            <label htmlFor="password">Password</label>
            <Password
              inputId="password"
              toggleMask
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <Button
            className="w-full mb-3"
            label={isSigningIn ? "Signing In..." : "Sign In"}
            type="submit"
            disabled={isSigningIn}
          />
        </form>

        <div className="flex-between-center mb-4">
          <Link
            to={"/auth/signup"}
            className="text-sm font-medium text-gray-500 hover:text-gray-900">
            Create new account
          </Link>

          <Link
            to={"/"}
            className="text-sm font-medium text-gray-500 hover:text-gray-900">
            Back To Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
