import React from "react";

const UserInfo = () => {
  return (
    <aside className="user-info p-3 bg-white border-round-xl">
      <div
        className="profile-cover border-round-xl h-8rem bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: `url(https://cdn.pixabay.com/photo/2017/08/01/01/17/beach-2562563_1280.jpg)`,
        }}></div>

      <div className="flex-start-end gap-3 -my-4 pl-3">
        <div
          className="user-image w-5rem h-5rem bg-no-repeat bg-cover bg-center border-circle border-3 border-white"
          style={{
            backgroundImage: `url(https://avatars.githubusercontent.com/u/88965473?v=4)`,
          }}></div>
        <div className="flex flex-column gap-1 pb-2">
          <span className="font-semibold text-gray-700">Mohamed Omar</span>
          <span className="text-sm font-medium text-gray-500">
            Front-End Engineer
          </span>
        </div>
      </div>
    </aside>
  );
};

export default UserInfo;
