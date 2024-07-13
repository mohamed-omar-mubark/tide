import React from "react";

// components
import Header from "../components/Header";
import Posts from "../components/Home/Posts";
import ProfileSide from "../components/Home/ProfileSide";

const Home = () => {
  return (
    <div className="home-layout mx-auto">
      <Header />

      <main className="main container">
        <ProfileSide />

        <Posts />

        <aside className="side p-3 bg-white border-round-xl">Side</aside>
      </main>
    </div>
  );
};

export default Home;
