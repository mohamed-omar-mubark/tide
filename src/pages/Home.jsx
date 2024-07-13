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

        <aside className="side bg-orange-200">Side</aside>
      </main>
    </div>
  );
};

export default Home;
