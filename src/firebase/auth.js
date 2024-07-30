import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const doCreateUserWithEmailAndPassword = async (
  name,
  email,
  password
) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);

  await updateProfile(res.user, {
    name: name,
  });

  await setDoc(doc(db, "users", res.user.uid), {
    uid: res.user.uid,
    name,
    createdAt: new Date(),
    image:
      "https://static.vecteezy.com/system/resources/previews/024/183/525/non_2x/avatar-of-a-man-portrait-of-a-young-guy-illustration-of-male-character-in-modern-color-style-vector.jpg",
    role: "User",
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
  });
};

export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  const userDoc = await getDoc(doc(db, "users", user.uid));
  if (!userDoc.exists()) {
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      name: user.displayName,
      createdAt: new Date(),
      image: user.photoURL,
      role: "Front-End Engineer",
      statistics: [
        {
          id: 1,
          title: "Followers",
          count: "12K",
        },
        {
          id: 2,
          title: "Following",
          count: "990",
        },
        {
          id: 3,
          title: "Project",
          count: "50",
        },
      ],
      skills: ["JavaScript", "TypeScript", "Vue", "Nuxt", "React", "Next"],
    });
  }

  return result;
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
