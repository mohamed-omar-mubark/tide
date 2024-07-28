import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import { collection, onSnapshot } from "firebase/firestore";

// components
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Avatar } from "primereact/avatar";
import { Skeleton } from "primereact/skeleton";
import { Carousel } from "primereact/carousel";

const Stories = () => {
  const [visible, setVisible] = useState(false);
  const [currentStory, setCurrentStory] = useState(null);
  const [stories, setStories] = useState([]);
  const [loadingStories, setLoadingStories] = useState(true);

  // get stories
  useEffect(() => {
    const unSub = onSnapshot(collection(db, "stories"), (snapshot) => {
      setStories(
        snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
      );
      setLoadingStories(false); // Finished loading posts
    });
    return () => {
      unSub();
    };
  }, []);

  const openStory = (story) => {
    setCurrentStory(story);
    setVisible(true);
  };

  const headerElement = currentStory ? (
    <div className="inline-flex align-items-center justify-content-center gap-2">
      <Avatar image={currentStory.data.author?.image} shape="circle" />
      <span className="font-bold white-space-nowrap">
        {currentStory.data.author?.name}
      </span>
    </div>
  ) : null;

  const imageTemplate = (image) => {
    return (
      <img
        src={image}
        alt=""
        style={{ width: "100%" }}
        className="border-round-lg mb-3"
      />
    );
  };

  return (
    <>
      <Dialog
        visible={visible}
        modal
        header={headerElement}
        style={{ width: "400px" }}
        onHide={() => setVisible(false)}>
        {currentStory && (
          <Carousel
            value={currentStory.data.images}
            numVisible={1}
            numScroll={1}
            className="custom-carousel"
            circular
            autoplayInterval={3000}
            itemTemplate={imageTemplate}
          />
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
          {loadingStories && (
            <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>
          )}

          {!loadingStories && stories.length === 0 && (
            <p>No stories available.</p>
          )}

          {stories.map((story) => (
            <div
              key={story.id}
              onClick={() => openStory(story)}
              className="story flex flex-column align-items-center gap-2 cursor-pointer"
              style={{ minWidth: "92px" }}>
              <div
                className="border-3 border-primary bg-no-repeat bg-cover bg-center h-5rem w-5rem border-circle"
                style={{
                  backgroundImage: `url(${story.data.author?.image})`,
                }}
                onClick={() => openStory(story)}></div>
              <span className="text-sm font-medium">
                {story.data.author?.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Stories;
