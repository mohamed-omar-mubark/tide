import React, { useEffect, useState, useRef } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { useAuth } from "../../contexts/authContext";

// components
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";

const Post = ({ post, showDeleteConfirmDialog }) => {
  const { currentUser } = useAuth();
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const postActionsMenu = useRef(null);

  useEffect(() => {
    const unSub = onSnapshot(
      collection(db, "posts", post.id, "likes"),
      (snapshot) => {
        setLikes(snapshot.docs);
      }
    );
    return () => {
      unSub();
    };
  }, [post.id]);

  useEffect(() => {
    setLiked(likes.findIndex((like) => like.id === currentUser?.uid) !== -1);
  }, [likes, currentUser?.uid]);

  // declaration
  const items = [
    {
      label: "Options",
      items: [
        {
          label: "Edit",
          icon: "pi pi-pencil",
        },
        {
          label: "Delete",
          icon: "pi pi-trash",
          command: () => {
            showDeleteConfirmDialog(post.id);
          },
        },
      ],
    },
  ];

  // functions

  // like post
  const likePost = async () => {
    if (liked) {
      await deleteDoc(doc(db, "posts", post.id, "likes", currentUser.uid));
    } else {
      await setDoc(doc(db, "posts", post.id, "likes", currentUser.uid), {
        userId: currentUser.uid,
      });
    }
  };

  return (
    <div className="post p-3 bg-white border-round-xl">
      <div className="post-head mb-3 flex-between-center">
        <div className="flex-start-center gap-3">
          <img
            src={post.data?.author.image}
            alt={post.data?.author.name}
            className="w-3rem border-circle"
          />

          <div className="flex flex-column gap-2">
            <span className="font-semibold text-gray-700">
              {post.data?.author.name}
            </span>
            <span className="text-sm font-medium text-gray-500">
              {post.data?.author.role}
            </span>
          </div>
        </div>

        {currentUser.uid === post.data?.author.uid && (
          <>
            <Button
              icon="pi pi-ellipsis-v"
              text
              rounded
              severity="secondary"
              size="small"
              onClick={(event) => postActionsMenu.current.toggle(event)}
              aria-controls="popup_post_actions_menu"
              aria-haspopup
            />

            <Menu
              model={items}
              popup
              ref={postActionsMenu}
              id="popup_post_actions_menu"
            />
          </>
        )}
      </div>

      {post.data?.image && (
        <div
          className="post-image mb-3 h-20rem bg-no-repeat bg-cover bg-center border-round-xl"
          style={{
            backgroundImage: `url(${post.data.image})`,
          }}></div>
      )}

      <div className="post-statistics mb-3 flex-between-center px-3">
        <div className="flex-start-center gap-3">
          <i
            className={`pi pi-heart text-2xl cursor-pointer ${
              liked ? "text-red-500" : "text-gray-500"
            }`}
            onClick={likePost}></i>
          <span className="font-medium text-gray-700">
            <span className="font-semibold">{likes.length} </span>
            Likes
          </span>
        </div>

        <span className="text-sm font-medium text-gray-500">
          {new Date(post.data?.timestamp?.toDate()).toLocaleString()}
        </span>
      </div>

      <div className="post-content flex flex-column gap-2 px-3">
        <span className="font-semibold text-gray-700">{post.data?.title}</span>
        <span className="text-sm text-gray-500">{post.data?.description}</span>
      </div>
    </div>
  );
};

export default Post;
