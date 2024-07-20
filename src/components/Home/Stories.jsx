import React from "react";

// components
import { Button } from "primereact/button";
import Story from "./Story";

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
    id: 1,
    user: {
      id: 1,
      image:
        "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "Belal Said",
    },
    images: [
      {
        id: 1,
        image:
          "https://images.pexels.com/photos/34098/south-africa-hluhluwe-giraffes-pattern.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
    ],
  },
  {
    id: 1,
    user: {
      id: 1,
      image:
        "https://images.pexels.com/photos/6481906/pexels-photo-6481906.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      name: "Mostafa Amgad",
    },
    images: [
      {
        id: 1,
        image:
          "https://images.pexels.com/photos/1802268/pexels-photo-1802268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
    ],
  },
];

const Stories = () => {
  return (
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
          <Story key={story.id} story={story} />
        ))}
      </div>
    </div>
  );
};

export default Stories;
