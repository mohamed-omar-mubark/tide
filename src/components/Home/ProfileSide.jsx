import React from "react";

// user
const user = {
  id: 1,
  image: "https://avatars.githubusercontent.com/u/88965473?v=4",
  name: "Mohamed Omar",
  role: "Front-End Engineer",
  statistics: [
    {
      id: 1,
      title: "Followers",
      count: "12K",
    },
    {
      id: 2,
      title: "Following",
      count: "990",
    },
    {
      id: 3,
      title: "Project",
      count: "50",
    },
  ],
  skills: ["JavaScript", "TypeScript", "Vue", "Nuxt", "React", "Next"],
};

// components
import UserInfo from "./UserInfo";

const ProfileSide = () => {
  return (
    <aside className="profile-side bg-white border-round-xl">
      <UserInfo user={user} />
    </aside>
  );
};

export default ProfileSide;
