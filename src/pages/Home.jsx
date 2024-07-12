import React from "react";

// components
import Header from "../components/Header";

const Home = () => {
  return (
    <div className="home-layout mx-auto">
      <Header />

      <div className="main container">
        <aside className="profile bg-green-200">Profile</aside>

        <main className="posts bg-red-200">Posts</main>

        <aside className="side bg-orange-200">Side</aside>
      </div>
    </div>
  );
};

export default Home;
