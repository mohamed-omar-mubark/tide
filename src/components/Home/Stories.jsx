import React, { useState } from "react";

// components
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Avatar } from "primereact/avatar";

// declarations
const stories = [
  {
    id: 1,
    user: {
      id: 1,
      image: "https://avatars.githubusercontent.com/u/88965473?v=4",
      name: "Mohamed Omar",
    },
    images: [
      {
        id: 1,
        image:
          "https://images.pexels.com/photos/256450/pexels-photo-256450.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
    ],
  },
  {
    id: 2,
    user: {
      id: 2,
      image:
        "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "Belal Said",
    },
    images: [
      {
        id: 2,
        image:
          "https://images.pexels.com/photos/34098/south-africa-hluhluwe-giraffes-pattern.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
    ],
  },
  {
    id: 3,
    user: {
      id: 3,
      image:
        "https://images.pexels.com/photos/6481906/pexels-photo-6481906.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "Mostafa Amgad",
    },
    images: [
      {
        id: 3,
        image:
          "https://images.pexels.com/photos/1802268/pexels-photo-1802268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
    ],
  },
];

const Stories = () => {
  const [visible, setVisible] = useState(false);
  const [currentStory, setCurrentStory] = useState(null);

  const openStory = (story) => {
    setCurrentStory(story);
    setVisible(true);
  };

  const headerElement = currentStory ? (
    <div className="inline-flex align-items-center justify-content-center gap-2">
      <Avatar image={currentStory.user.image} shape="circle" />
      <span className="font-bold white-space-nowrap">
        {currentStory.user.name}
      </span>
    </div>
  ) : null;

  return (
    <>
      <Dialog
        visible={visible}
        modal
        header={headerElement}
        style={{ width: "400px" }}
        onHide={() => setVisible(false)}>
        {currentStory && (
          <div>
            {currentStory.images.map((img) => (
              <img
                key={img.id}
                src={img.image}
                alt=""
                style={{ width: "100%" }}
                className="border-round-lg"
              />
            ))}
          </div>
        )}
      </Dialog>

      <div className="stories p-3 border-bottom-1 border-gray-300">
        <div className="head mb-3 flex-between-center">
          <span className="text-2xl font-semibold text-gray-700">
            Just for you
          </span>

          <Button
            icon="pi pi-ellipsis-h"
            text
            rounded
            severity="secondary"
            size="small"
          />
        </div>

        <div className="flex-start-center gap-5">
          {stories.map((story) => (
            <div
              key={story.id}
              onClick={() => openStory(story)}
              className="story flex min-w flex-column align-items-center gap-2 cursor-pointer"
              style={{ minWidth: "92px" }}>
              <div
                className="border-3 border-primary bg-no-repeat bg-cover bg-center h-5rem w-5rem border-circle"
                style={{ backgroundImage: `url(${story.user.image})` }}></div>
              <span className="text-sm font-medium">{story.user.name}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Stories;
