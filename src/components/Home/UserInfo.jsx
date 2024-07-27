import React from "react";
import { useAuth } from "../../contexts/authContext";

const UserInfo = ({ user }) => {
  const { currentUser } = useAuth();
  console.log("user", currentUser);

  return (
    <div className="user-info p-3 bg-white border-round-xl">
      <div
        className="profile-cover border-round-xl h-8rem bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: `url(https://cdn.pixabay.com/photo/2017/08/01/01/17/beach-2562563_1280.jpg)`,
        }}></div>

      <div className="flex-start-end gap-3 -my-4 pl-3">
        <div
          className="user-image w-5rem h-5rem bg-no-repeat bg-cover bg-center border-circle border-3 border-white"
          style={{
            backgroundImage: `url(${
              currentUser?.photoURL ||
              "https://static.vecteezy.com/system/resources/previews/024/183/525/non_2x/avatar-of-a-man-portrait-of-a-young-guy-illustration-of-male-character-in-modern-color-style-vector.jpg"
            })`,
          }}></div>
        <div className="flex flex-column gap-1 pb-2">
          <span className="font-semibold text-gray-700">{user?.name}</span>
          <span className="text-sm font-medium text-gray-500">
            {user?.role}
          </span>
        </div>
      </div>

      <div className="mt-7 pb-3 flex justify-content-around align-items-center border-bottom-1 border-gray-200">
        {user?.statistics.map((item) => (
          <div
            key={item.id}
            className="flex flex-column align-items-center gap-1">
            <span className="text-xl font-semibold text-gray-700">
              {item.count}
            </span>
            <span className="text-sm font-semibold text-gray-400">
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserInfo;
