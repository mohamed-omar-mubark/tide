import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { doSignInWithEmailAndPassword } from "../../firebase/auth";
import { useAuth } from "../../contexts/authContext";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";

// components
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

function SignIn() {
  const { userLoggedIn } = useAuth();

  const [isSigningIn, setIsSigningIn] = useState(false);

  // yup validation
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    password: Yup.string().required("Password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  // signin with email and password
  const signin = async (values, { setSubmitting }) => {
    setIsSigningIn(true);
    await doSignInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        // navigate to home
        Navigate("/");
      })
      .catch(() => {
        setIsSigningIn(false);
        setSubmitting(false);
      });
  };

  return (
    <div className="h-screen flex-center">
      {userLoggedIn && <Navigate to={"/"} replace={true} />}

      <div className="form-container mx-auto w-full max-w-30rem">
        <h1 className="page-title mt-0 mb-7">Sign In</h1>

        <Formik
          initialValues={initialValues}
          onSubmit={signin}
          validationSchema={validationSchema}>
          {({ isSubmitting }) => (
            <Form>
              <div className="flex flex-column gap-2 mb-3">
                <label htmlFor="email">Email</label>
                <Field
                  as={InputText}
                  id="email"
                  name="email"
                  autoComplete="email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-sm font-medium text-red-500"
                />
              </div>

              <div className="flex flex-column gap-2 mb-5">
                <label htmlFor="password">Password</label>
                <Field
                  as={Password}
                  id="password"
                  name="password"
                  toggleMask
                  autoComplete="current-password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-sm font-medium text-red-500"
                />
              </div>

              <Button
                className="w-full mb-3"
                label={isSubmitting ? "Signing In..." : "Sign In"}
                type="submit"
                disabled={isSubmitting || isSigningIn}
              />
            </Form>
          )}
        </Formik>

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
