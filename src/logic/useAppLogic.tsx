import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";

export const useAppLogic = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!)
      : null
  );
  const [err, setErr] = useState<any>(null);

  const navigate = useNavigate();

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    }
  }, [user]);

  return { loggedIn, user, err, handleLogin, handleLogout };
}