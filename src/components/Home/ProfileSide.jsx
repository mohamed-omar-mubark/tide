import React, { useEffect, useState } from "react";
import { getCurrentUserData } from "../../firebase/auth";

// components
import UserInfo from "./UserInfo";
import UserSkills from "./UserSkills";

const ProfileSide = () => {
  const [user, setUser] = useState(null);

  // get current user data
  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getCurrentUserData();
      setUser(userData);
    };

    fetchUserData();
  }, []);

  return (
    <aside className="profile-side bg-white border-round-xl">
      <UserInfo user={user} />
      <UserSkills skills={user?.skills} />
    </aside>
  );
};

export default ProfileSide;
