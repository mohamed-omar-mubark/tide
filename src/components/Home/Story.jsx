import React from "react";

const Story = ({ story }) => {
  return (
    <div
      className="story flex min-w flex-column align-items-center gap-2 cursor-pointer"
      style={{ minWidth: "100px" }}>
      <div
        className="border-3 border-primary bg-no-repeat bg-cover bg-center h-5rem w-5rem border-circle"
        style={{ backgroundImage: `url(${story.user.image})` }}></div>
      <span className="text-sm font-medium">{story.user.name}</span>
    </div>
  );
};

export default Story;
