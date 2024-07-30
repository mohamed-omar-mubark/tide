import React, { useState, useContext } from "react";
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

const AddPost = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [hasTag, setHasTag] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuth();

  const handleInputClick = () => setIsPopupVisible(true);
  const handleClosePopup = () => setIsPopupVisible(false);
  const handleFileChange = (e) => setImg(e.target.files[0]);
  const handleHasTagChange = (e) => setHasTag(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleSubmit = async (/*e*/) => {
    // e.preventDefault();

    if (!currentUser) return;

    setIsPopupVisible(false);

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

            setDescription("");
            setHasTag("");
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

      setDescription("");
      setHasTag("");
      setImg(null);
    }
  };

  return (
    <div className="absolute p-3 bg-red-100 bottom-0 right-0">
      <Button label="Add Post" onClick={handleSubmit} />
    </div>
  );
};

export default AddPost;
