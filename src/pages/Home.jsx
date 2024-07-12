import React from "react";

// components
import Header from "../components/Header";
import Posts from "../components/Posts";

const Home = () => {
  return (
    <div className="home-layout mx-auto">
      <Header />

      <main className="main container">
        <aside className="profile bg-green-200">Profile</aside>

        <Posts />

        <aside className="side bg-orange-200">Side</aside>
      </main>
    </div>
  );
};

export default Home;
