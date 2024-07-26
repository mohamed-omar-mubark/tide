import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { doSignOut } from "../firebase/auth";

// components
import { Button } from "primereact/button";

const Header = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  return (
    <div className="header bg-white flex align-items-center">
      <div className="container flex-between-center">
        <Link to={"/"} className="logo text-4xl font-bold text-primary">
          Tide
        </Link>

        <div className="controllers flex gap-2">
          {userLoggedIn ? (
            <>
              <Button
                icon="pi pi-sign-out"
                label="Logout"
                size="small"
                onClick={() => {
                  doSignOut().then(() => {
                    navigate("/auth/login");
                  });
                }}
              />
            </>
          ) : (
            <>
              <Link to={"/auth/login"}>
                <Button icon="pi pi-sign-in" label="Login" size="small" />
              </Link>
              <Link to={"/auth/register"}>
                <Button label="Register" size="small" />
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
