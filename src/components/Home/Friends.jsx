import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { collection, onSnapshot } from "firebase/firestore";

// components
import { Button } from "primereact/button";
import { Skeleton } from "primereact/skeleton";

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [loadingFriends, setLoadingFriends] = useState(true);

  // get friends
  useEffect(() => {
    const unSub = onSnapshot(collection(db, "users"), (snapshot) => {
      setFriends(
        snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
      );
      setLoadingFriends(false); // Finished loading friends
    });
    return () => {
      unSub();
    };
  }, []);

  return (
    <aside className="friends p-3 bg-white border-round-xl">
      <div className="head mb-5">
        <span className="text-2xl font-semibold text-gray-700">Friends</span>
      </div>

      <div className="flex flex-column gap-5">
        {loadingFriends &&
          [1, 2, 3].map((item) => (
            <div key={item} className="flex-start-center gap-3">
              <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>
              <div style={{ flex: "1" }}>
                <Skeleton width="100%" className="mb-2"></Skeleton>
                <Skeleton width="75%"></Skeleton>
              </div>
            </div>
          ))}

        {friends.map((friend) => (
          <div key={friend} className="friend flex-between-center">
            <div className="flex-start-center gap-3">
              <div
                style={{
                  backgroundImage: `url(${friend.data.image})`,
                }}
                alt={friend.data.name}
                className="w-3rem border-circle w-3rem h-3rem bg-no-repeat bg-cover bg-center"></div>

              <div className="flex flex-column gap-2">
                <span className="font-semibold text-gray-700">
                  {friend.data.name}
                </span>
                <span className="text-sm font-medium text-gray-500">
                  {friend.data.role}
                </span>
              </div>
            </div>

            <Button
              icon="pi pi-ellipsis-v"
              text
              rounded
              severity="secondary"
              size="small"
            />
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Friends;
