import React from "react";

// components
import { Button } from "primereact/button";
import { Link } from "react-router-dom";

const NoUser = () => {
  return (
    <div className="p-3 flex flex-column gap-3 align-items-center bg-white border-round-xl">
      <div
        style={{
          backgroundImage: `url('/left-user.webp')`,
        }}
        className="w-full h-20rem bg-no-repeat bg-cover bg-center"></div>
      <span className="text-sm font-medium text-gray-500">
        Sign In To Access Your Profile
      </span>
      <Link to={"/auth/signin"}>
        <Button icon="pi pi-sign-in" label="Sign In" size="small" />
      </Link>
    </div>
  );
};

export default NoUser;
