import React from "react";
import { Link } from "react-router-dom";

// components
import { Button } from "primereact/button";

const Header = () => {
  return (
    <div className="header bg-white flex align-items-center">
      <div className="container flex-between-center">
        <Link to={"/"} className="logo text-4xl font-bold text-primary">
          Tide
        </Link>

        <div className="controllers flex gap-2">
          <Link to={"/auth/login"}>
            <Button icon="pi pi-sign-in" label="Login" size="small" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
