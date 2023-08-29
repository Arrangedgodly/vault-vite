import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider, db } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import {
  collection,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

export const useAppLogic = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!)
      : null
  );
  const [err, setErr] = useState<any>(null);
  const [primaryStore, setPrimaryStore] = useState<any>(null);

  const navigate = useNavigate();
  const usersCol = collection(db, "users");

  const handleCreateUser = async (user: any) => {
    const userDocRef = doc(usersCol, user.uid);
    await setDoc(userDocRef, {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      uid: user.uid,
      store: ""
    });
  };

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("uid", user.uid);
        setLoggedIn(true);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        setErr({ errorCode, errorMessage, email });
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setLoggedIn(false);
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("uid");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const checkUserStore = async () => {
    if (!user) return;
    const userDocRef = doc(usersCol, user.uid);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      console.log(userData);
      if (userData.store) {
        setPrimaryStore(userData.store);
      }
    }
  };

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      handleCreateUser(user);
    }
  }, [user]);

  useEffect(() => {
    checkUserStore();
  }, [user]);

  return { loggedIn, user, err, handleLogin, handleLogout, primaryStore };
};
