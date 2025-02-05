import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";

// components
import Stories from "./Stories";
import Post from "./Post";
import AddPost from "./AddPost";
import { Skeleton } from "primereact/skeleton";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  // Get posts
  useEffect(() => {
    const unSub = onSnapshot(collection(db, "posts"), (snapshot) => {
      const fetchedPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      const sortedPosts = fetchedPosts.sort(
        (a, b) => b.data.timestamp - a.data.timestamp
      ); // Sort posts by timestamp

      console.log("Fetched Posts:", sortedPosts); // Log posts to debug

      setPosts(sortedPosts);
      setLoadingPosts(false); // Finished loading posts
    });
    return () => {
      unSub();
    };
  }, []);

  // Functions

  const showDeleteConfirmDialog = (postId) => {
    confirmDialog({
      message: "Do you want to delete this post?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      defaultFocus: "reject",
      accept: () => {
        handleDelete(postId);
      },
    });
  };

  const handleDelete = async (postId) => {
    try {
      await deleteDoc(doc(db, "posts", postId));
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="posts flex flex-column gap-3">
      <Stories />
      <AddPost setPosts={setPosts} /> {/* Pass setPosts to AddPost */}
      {loadingPosts && (
        <div className="p-3 surface-card border-round-xl">
          <div className="flex mb-3">
            <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>
            <div>
              <Skeleton width="10rem" className="mb-2"></Skeleton>
              <Skeleton width="5rem" className="mb-2"></Skeleton>
              <Skeleton height=".5rem"></Skeleton>
            </div>
          </div>
          <Skeleton width="100%" height="150px"></Skeleton>
          <div className="flex justify-content-between mt-3">
            <Skeleton width="4rem" height="2rem"></Skeleton>
            <Skeleton width="4rem" height="2rem"></Skeleton>
          </div>
        </div>
      )}
      <ConfirmDialog />
      {!posts.length && !loadingPosts ? (
        <div className="p-3 flex-center bg-white border-round-lg h-6rem">
          <span>There are no posts at the moment.</span>
        </div>
      ) : (
        posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            setPosts={setPosts}
            showDeleteConfirmDialog={showDeleteConfirmDialog}
          />
        ))
      )}
    </div>
  );
};

export default Posts;
