import React from "react";

// components
import Stories from "./Stories";
import Post from "./Post";

// declarations
const posts = [
  {
    id: 1,
    author: {
      id: 1,
      image: "https://avatars.githubusercontent.com/u/88965473?v=4",
      name: "Mohamed Omar",
      role: "Business analyst",
    },
    image:
      "https://images.pexels.com/photos/6248980/pexels-photo-6248980.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    likes: 3,
    isLiked: false,
    title: "Discover the Power of Data Analysis!",
    description:
      "Data analysis unlocks hidden insights and drives smarter decisions. Join us in exploring the techniques and tools that make it all possible. Transform your data into actionable intelligence today!",
    time: "56 minutes ago",
  },
  {
    id: 2,
    author: {
      id: 2,
      image: "https://avatars.githubusercontent.com/u/88965473?v=4",
      name: "Mohamed Omar",
      role: "Business analyst",
    },
    image:
      "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    likes: 5,
    isLiked: true,
    title: "Unleash the Potential of Your Data!",
    description:
      "Dive into the world of data analysis and uncover valuable insights. Learn the skills and techniques that turn raw data into strategic advantage. Start your data-driven journey now!",
    time: "8 hour ago",
  },
];

const Posts = () => {
  return (
    <div className="posts flex flex-column gap-3">
      <Stories />

      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
