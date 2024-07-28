import React from "react";
import { useAuth } from "../contexts/authContext";

// components
import Header from "../components/Header";
import Posts from "../components/Home/Posts";
import ProfileSide from "../components/Home/ProfileSide";
import NoUser from "../components/Home/NoUser";
import Friends from "../components/Home/Friends";

const Home = () => {
  const { userLoggedIn } = useAuth();

  return (
    <div className="home-layout mx-auto">
      <Header />

      <main className="main container">
        {userLoggedIn ? <ProfileSide /> : <NoUser />}

        <Posts />

        <Friends />
      </main>
    </div>
  );
};

export default Home;
