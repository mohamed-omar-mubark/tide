import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { doCreateUserWithEmailAndPassword } from "../../firebase/auth";
import { useAuth } from "../../contexts/authContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// components
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

function SignUp() {
  const { userLoggedIn } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);

  // Yup validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    jobTitle: Yup.string().required("Job title is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const initialValues = {
    name: "",
    email: "",
    jobTitle: "",
    password: "",
    confirmPassword: "",
  };

  // Signup function
  const signUp = async (values, { setSubmitting }) => {
    if (!isRegistering) {
      setIsRegistering(true);
      await doCreateUserWithEmailAndPassword(
        values.email,
        values.password,
        values.name,
        values.jobTitle
      )
        .then(() => {
          // navigate to home
          Navigate("/");
        })
        .catch(() => {
          setIsRegistering(false);
          setSubmitting(false);
        });
    }
  };

  return (
    <div className="h-screen flex-center">
      {userLoggedIn && <Navigate to={"/"} replace={true} />}

      <div className="form-container mx-auto w-full max-w-30rem">
        <h1 className="page-title mt-0 mb-7">Sign Up</h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={signUp}>
          {({ isSubmitting }) => (
            <Form>
              <div className="flex flex-column gap-2 mb-3">
                <label htmlFor="name">Name</label>
                <Field
                  as={InputText}
                  id="name"
                  name="name"
                  autoComplete="name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-sm font-medium text-red-500"
                />
              </div>

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

              <div className="flex flex-column gap-2 mb-3">
                <label htmlFor="jobTitle">Job Title</label>
                <Field
                  as={InputText}
                  id="jobTitle"
                  name="jobTitle"
                  autoComplete="job-title"
                />
                <ErrorMessage
                  name="jobTitle"
                  component="div"
                  className="text-sm font-medium text-red-500"
                />
              </div>

              <div className="flex flex-column gap-2 mb-3">
                <label htmlFor="password">Password</label>
                <Field
                  as={Password}
                  id="password"
                  name="password"
                  toggleMask
                  autoComplete="new-password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-sm font-medium text-red-500"
                />
              </div>

              <div className="flex flex-column gap-2 mb-5">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Field
                  as={Password}
                  id="confirmPassword"
                  name="confirmPassword"
                  toggleMask
                  autoComplete="new-password"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-sm font-medium text-red-500"
                />
              </div>

              <Button
                className="w-full mb-3"
                label={
                  isSubmitting || isRegistering ? "Signing Up..." : "Sign Up"
                }
                type="submit"
                disabled={isSubmitting || isRegistering}
              />
            </Form>
          )}
        </Formik>

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
      </div>
    </div>
  );
}

export default SignUp;
