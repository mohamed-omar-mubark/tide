import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const doCreateUserWithEmailAndPassword = async (
  email,
  password,
  name,
  jobTitle
) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);

  await setDoc(doc(db, "users", res.user.uid), {
    uid: res.user.uid,
    name,
    image:
      "https://static.vecteezy.com/system/resources/previews/024/183/525/non_2x/avatar-of-a-man-portrait-of-a-young-guy-illustration-of-male-character-in-modern-color-style-vector.jpg",
    role: jobTitle,
    statistics: [
      {
        id: 1,
        title: "Followers",
        count: "9K",
      },
      {
        id: 2,
        title: "Following",
        count: "87",
      },
      {
        id: 3,
        title: "Project",
        count: "12",
      },
    ],
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next"],
    createdAt: new Date(),
  });
};

export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const getCurrentUserData = async () => {
  const user = auth.currentUser;
  if (user) {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.log("No such user document!");
      return null;
    }
  } else {
    console.log("No user is signed in.");
    return null;
  }
};

export const doSignOut = () => {
  return auth.signOut();
};
