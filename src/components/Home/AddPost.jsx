import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../contexts/authContext";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getCurrentUserData } from "../../firebase/auth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// components
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { FileUpload } from "primereact/fileupload";

const AddPost = ({ setPosts }) => {
  const { currentUser } = useAuth();
  const [img, setPostImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [postDialogVisible, setPostDialogVisible] = useState(false);
  const fileUploadRef = useRef(null);
  const [cUser, setUser] = useState(null);

  // Get current user data
  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getCurrentUserData();
      setUser(userData);
    };

    fetchUserData();
  }, []);

  // Watch cUser changes
  useEffect(() => {
    if (cUser) {
      // console.log("Current user data:", cUser);
    }
  }, [cUser]);

  // Yup validation schema
  const validationSchema = Yup.object({
    postTitle: Yup.string().required("Post Title is required"),
    postDescription: Yup.string().required("Post Description is required"),
  });

  const initialValues = {
    postTitle: "",
    postDescription: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
    let imageURL = "";

    if (img) {
      const imageRef = ref(storage, `post-images/${Date.now()}_${img.name}`);

      try {
        await uploadBytes(imageRef, img);
        imageURL = await getDownloadURL(imageRef);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    const postData = {
      author: {
        uid: currentUser.uid,
        name: cUser.name,
        email: currentUser.email,
        image: cUser.image,
        role: cUser.role,
      },
      title: values.postTitle,
      description: values.postDescription,
      image: imageURL,
      timestamp: serverTimestamp(), // Ensure timestamp is set correctly
    };

    console.log("post data:", postData);

    try {
      const docRef = await addDoc(collection(db, "posts"), postData);
      const newPost = { ...postData, id: docRef.id, timestamp: new Date() };
      setPosts((prevPosts) => [newPost, ...prevPosts]);
      setPostImage(null);
      fileUploadRef.current.clear();
      setPostDialogVisible(false);
    } catch (error) {
      console.error("Error adding post:", error);
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  const headerTemplate = (options) => {
    const { className, chooseButton, cancelButton } = options;

    return (
      <div
        className={className}
        style={{
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
        }}>
        {chooseButton}
        {cancelButton}
      </div>
    );
  };

  const itemTemplate = (file) => {
    return (
      <img
        alt={file.name}
        role="presentation"
        src={file.objectURL}
        width={200}
      />
    );
  };

  return (
    <>
      <Dialog
        header="Add Post"
        visible={postDialogVisible}
        style={{ width: "100%", maxWidth: "500px" }}
        onHide={() => setPostDialogVisible(false)}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <div className="flex flex-column gap-2 mb-3">
                <label htmlFor="post-title">Post Title</label>
                <Field as={InputText} id="post-title" name="postTitle" />
                <ErrorMessage
                  name="postTitle"
                  component="div"
                  className="text-sm font-medium text-red-500"
                />
              </div>

              <div className="flex flex-column gap-2 mb-5">
                <label htmlFor="post-description">Post Description</label>
                <Field
                  as={InputTextarea}
                  id="post-description"
                  name="postDescription"
                  rows={3}
                />
                <ErrorMessage
                  name="postDescription"
                  component="div"
                  className="text-sm font-medium text-red-500"
                />
              </div>

              <div className="flex flex-column gap-2 mb-5">
                <label>Post Image</label>
                <FileUpload
                  ref={fileUploadRef}
                  headerTemplate={headerTemplate}
                  itemTemplate={itemTemplate}
                  name="demo[]"
                  accept="image/*"
                  maxFileSize={1000000}
                  emptyTemplate={
                    <p className="m-0">Drag and drop image here.</p>
                  }
                  onSelect={(e) => {
                    setPostImage(e.files[0]);
                  }}
                />
              </div>

              <div className="flex justify-content-end align-items-center gap-3">
                <Button
                  label="Cancel"
                  type="button"
                  size="small"
                  onClick={() => setPostDialogVisible(false)}
                />
                <Button
                  label={isSubmitting || isLoading ? "loading..." : "Add"}
                  type="submit"
                  size="small"
                  disabled={isSubmitting || isLoading}
                />
              </div>
            </Form>
          )}
        </Formik>
      </Dialog>

      {currentUser && (
        <Button
          icon="pi pi-plus"
          rounded
          className="fixed"
          style={{ bottom: "16px", right: "16px" }}
          tooltip="Add New Post"
          tooltipOptions={{ position: "left", className: "text-sm" }}
          onClick={() => setPostDialogVisible(true)}
        />
      )}
    </>
  );
};

export default AddPost;
