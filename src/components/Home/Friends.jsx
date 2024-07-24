import React from "react";

// components
import { Button } from "primereact/button";

const Friends = ({ friends }) => {
  return (
    <aside className="friends p-3 bg-white border-round-xl">
      <div className="head mb-5">
        <span className="text-2xl font-semibold text-gray-700">Friends</span>
      </div>

      <div className="flex flex-column gap-5">
        {friends.map((friend) => (
          <div key={friend.id} className="friend flex-between-center">
            <div className="flex-start-center gap-3">
              <div
                style={{
                  backgroundImage: `url(${friend.image})`,
                }}
                alt={"Mohamed"}
                className="w-3rem border-circle w-3rem h-3rem bg-no-repeat bg-cover bg-center"></div>

              <div className="flex flex-column gap-2">
                <span className="font-semibold text-gray-700">
                  {friend.name}
                </span>
                <span className="text-sm font-medium text-gray-500">
                  {friend.role}
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
