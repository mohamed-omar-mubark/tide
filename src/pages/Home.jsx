import React from "react";
import { useAuth } from "../contexts/authContext";

// components
import Header from "../components/Header";
import Posts from "../components/Home/Posts";
import ProfileSide from "../components/Home/ProfileSide";
import NoUser from "../components/Home/NoUser";
import PeopleYouMayKnow from "../components/Home/PeopleYouMayKnow";
import AddPost from "../components/Home/AddPost";

const Home = () => {
  const { userLoggedIn } = useAuth();

  return (
    <div className="home-layout mx-auto">
      <AddPost />
      <Header />

      <main className="main container pb-3">
        {userLoggedIn ? <ProfileSide /> : <NoUser />}

        <Posts />

        <PeopleYouMayKnow />
      </main>
    </div>
  );
};

export default Home;
