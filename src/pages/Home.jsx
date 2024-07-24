import React from "react";

// components
import Header from "../components/Header";
import Posts from "../components/Home/Posts";
import ProfileSide from "../components/Home/ProfileSide";
import Friends from "../components/Home/Friends";

// declarition
const friends = [
  {
    id: 1,
    image: "https://avatars.githubusercontent.com/u/88965473?v=4",
    name: "Mohamed Omar",
    role: "Front-End Developer",
  },
  {
    id: 2,
    image: "https://avatars.githubusercontent.com/u/88965473?v=4",
    name: "Ahmed Ali",
    role: "Back-End Developer",
  },
  {
    id: 3,
    image:
      "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?cs=srgb&dl=pexels-olly-762020.jpg&fm=jpg",
    name: "Sara Ahmed",
    role: "Full Stack Developer",
  },
  {
    id: 4,
    image:
      "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?cs=srgb&dl=pexels-olly-762020.jpg&fm=jpg",
    name: "Fatima Hassan",
    role: "UI/UX Designer",
  },
  {
    id: 5,
    image: "https://avatars.githubusercontent.com/u/88965473?v=4",
    name: "Khaled Youssef",
    role: "Project Manager",
  },
  {
    id: 6,
    image:
      "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?cs=srgb&dl=pexels-olly-762020.jpg&fm=jpg",
    name: "Laila Mostafa",
    role: "QA Engineer",
  },
];

const Home = () => {
  return (
    <div className="home-layout mx-auto">
      <Header />

      <main className="main container">
        <ProfileSide />

        <Posts />

        <Friends friends={friends} />
      </main>
    </div>
  );
};

export default Home;
