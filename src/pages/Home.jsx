import React from "react";

const Home = () => {
  return (
    <div className="home">
      <div className="header p-4 bg-white">
        <div className="container">Header</div>
      </div>
      <div className="container layout">
        <div className="main">
          <div className="profile bg-green-200">Profile</div>

          <div className="posts bg-red-200">Posts</div>

          <div className="side bg-orange-200">Side</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
