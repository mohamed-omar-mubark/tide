import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";

import {
  doCreateUserWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../firebase/auth";
import { useAuth } from "../../contexts/authContext";

// components
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";

function SignIn() {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  // functions

  // signin with email and password
  const signin = async (e) => {
    e.preventDefault();

    if (!isRegistering) {
      setIsRegistering(true);
      await doCreateUserWithEmailAndPassword(email, password).then(() => {
        // navigate to home
        Navigate("/");
      });
      setIsRegistering(false);
    }
  };

  const googleSignIn = (e) => {
    e.preventDefault();

    if (!isRegistering) {
      setIsRegistering(true);
      doSignInWithGoogle()
        .then(() => {
          // navigate to home
          Navigate("/");
        })
        .catch(() => {
          setIsRegistering(false);
        });
    }
  };

  return (
    <div className="h-screen flex-center">
      {userLoggedIn && <Navigate to={"/"} replace={true} />}

      <div className="form-container mx-auto w-full max-w-30rem">
        <h1 className="page-title mt-0 mb-7">Sign Up</h1>

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

          <div className="flex flex-column gap-2 mb-3">
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

          <div className="flex flex-column gap-2 mb-5">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Password
              inputId="confirmPassword"
              toggleMask
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>

          <Button
            className="w-full mb-3"
            label={isRegistering ? "Signing Up..." : "Sign Up"}
            type="submit"
            disabled={isRegistering}
          />
        </form>

        <div className="flex-between-center mb-4">
          <Link
            to={"/auth/signin"}
            className="text-sm font-medium text-gray-500 hover:text-gray-900">
            Sign In
          </Link>

          <Link
            to={"/"}
            className="text-sm font-medium text-gray-500 hover:text-gray-900">
            Back To Home
          </Link>
        </div>

        <Divider align="center" className="mt-0 mb-5">
          <p className="my-0">OR</p>
        </Divider>

        <Button
          className="w-full"
          icon="pi pi-google"
          label={isRegistering ? "Signing Up..." : "Sign Up with Google"}
          severity="secondary"
          outlined
          disabled={isRegistering}
          onClick={(e) => {
            googleSignIn(e);
          }}
        />
      </div>
    </div>
  );
}

export default SignIn;
