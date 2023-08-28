import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";

export const useStoreLogic = () => {
  const { store } = useParams();
  const [vaultRef, setVaultRef] = useState<[] | null>(null);
  const [usersRef, setUsersRef] = useState<[] | null>(null);
  const [userBoolean, setUserBoolean] = useState<boolean>(false);
  const [vaultErr, setVaultErr] = useState<any>(null);
  const navigate = useNavigate();

  const getStore = async () => {
    const vaultCol = collection(db, `stores/${store}/vault`);
    if (!vaultCol) {
      setVaultErr("Vault counts not found!");
    }
    const vaultSnapshot = await getDocs(vaultCol);
    let vault: any = [];
    vaultSnapshot.forEach((doc) => {
      vault.push({ id: doc.id, ...doc.data() });
    });
    setVaultRef(vault);
    const usersCol = collection(db, `stores/${store}/users`);
    const usersSnapshot = await getDocs(usersCol);
    let users: any = [];
    usersSnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    setUsersRef(users);
  };

  const checkUser = () => {
    if (usersRef) {
      let user = usersRef.find(
        (user: any) => user.uid === localStorage.getItem("uid")
      );
      if (user) {
        setUserBoolean(true);
      } else {
        setUserBoolean(false);
      }
    }
  };

  const toggleUser = async () => {
    const uid = localStorage.getItem("uid");
    if (!uid || !store) return;

    const usersCol = collection(db, `stores/${store}/users`);
    const userCol = collection(db, `users/${uid}/store`);

    const userDocRef = doc(usersCol, uid);
    const storeDocRef = doc(userCol, store);

    if (userBoolean) {
      await deleteDoc(userDocRef);
      await deleteDoc(storeDocRef);
      setUserBoolean(false);
    } else {
      await setDoc(userDocRef, { uid });
      await setDoc(storeDocRef, { store });
      setUserBoolean(true);
    }
  };

  useEffect(() => {
    getStore();
  }, []);

  useEffect(() => {
    checkUser();
  }, [usersRef]);

  return { store, vaultRef, userBoolean, toggleUser, vaultErr, navigate };
};
