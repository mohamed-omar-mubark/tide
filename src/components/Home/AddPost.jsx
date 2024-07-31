import React, { useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { v4 as uuid } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase/firebase";
import {
  addDoc,
  arrayUnion,
  collection,
  serverTimestamp,
  Timestamp,
  updateDoc,
  doc,
} from "firebase/firestore";

// components
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

const AddPost = () => {
  const { currentUser } = useAuth();
  const [postTitle, setPostTitle] = useState("");
  const [img, setImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) return;

    const postData = {
      uid: currentUser.uid,
      author: {
        uid: currentUser.uid,
        name: currentUser.displayName,
        email: currentUser.email,
        image: currentUser.photoURL,
        role: "User",
      },
      image:
        "https://images.pexels.com/photos/15812624/pexels-photo-15812624/free-photo-of-woman-posing-on-stadium.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: "Post Title",
      description: "Post description",
      time: serverTimestamp(),
    };

    const postDocRef = await addDoc(collection(db, "posts"), postData);

    if (img) {
      const storageRef = ref(storage, `Posts/${uuid()}`);
      const uploadTask = uploadBytesResumable(storageRef, img);

      setIsLoading(true);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error("Upload failed", error);
          setIsLoading(false); // Stop loading if there's an error
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            await updateDoc(postDocRef, { img: downloadURL });

            await updateDoc(doc(db, "users", currentUser.uid), {
              posts: arrayUnion({
                ...postData,
                id: postDocRef.id,
                img: downloadURL,
                time: Timestamp.now(),
              }),
            });

            setImg(null);
            setIsLoading(false); // Stop loading when done
          } catch (error) {
            console.error("Error fetching download URL", error);
            setIsLoading(false); // Stop loading if there's an error
          }
        }
      );
    } else {
      await updateDoc(postDocRef, { img: null });

      await updateDoc(doc(db, "users", currentUser.uid), {
        posts: arrayUnion({
          ...postData,
          id: postDocRef.id,
          img: null,
          time: Timestamp.now(),
        }),
      });
      setImg(null);
    }
  };

  return (
    <>
      <Dialog
        header="Add Post"
        visible={visible}
        style={{ width: "100%", maxWidth: "500px" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-column gap-2 mb-5">
            <label htmlFor="post-title">Post Title</label>
            <InputText
              id="post-title"
              value={postTitle}
              onChange={(e) => {
                setPostTitle(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-column gap-2 mb-5">
            <label htmlFor="post-title">Post Content</label>
            <InputText
              id="post-title"
              value={postTitle}
              onChange={(e) => {
                setPostTitle(e.target.value);
              }}
            />
          </div>

          <div className="flex justify-content-end align-items-center gap-3">
            <Button label="Cancel" type="submit" disabled={isLoading} />
            <Button
              label={isLoading ? "loading..." : "Add"}
              type="submit"
              disabled={isLoading}
            />
          </div>
        </form>
      </Dialog>

      {currentUser && (
        <Button
          icon="pi pi-plus"
          rounded
          className="fixed"
          style={{ bottom: "16px", right: "16px" }}
          tooltip="Add New Post"
          tooltipOptions={{ position: "left", className: "text-sm" }}
          onClick={() => setVisible(true)}
        />
      )}
    </>
  );
};

export default AddPost;
