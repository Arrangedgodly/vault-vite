import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs, doc, deleteDoc, setDoc } from "firebase/firestore";
import { useState, useEffect } from "react";

export const useStoreLogic = () => {
  const { store } = useParams();
  const [vaultRef, setVaultRef] = useState<[] | null>(null);
  const [eodRef, setEodRef] = useState<[] | null>(null);
  const [usersRef, setUsersRef] = useState<[] | null>(null);
  const [userBoolean, setUserBoolean] = useState<boolean>(false);
  const [vaultErr, setVaultErr] = useState<any>(null);
  const [eodErr, setEodErr] = useState<any>(null);
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
    const eodCol = collection(db, `stores/${store}/eod`);
    if (!eodCol) {
      setEodErr("End of Day counts not found!");
    }
    const eodSnapshot = await getDocs(eodCol);
    let eod: any = [];
    eodSnapshot.forEach((doc) => {
      eod.push({ id: doc.id, ...doc.data() });
    });
    setEodRef(eod);
    const usersCol = collection(db, `stores/${store}/users`);
    const usersSnapshot = await getDocs(usersCol);
    let users: any = [];
    usersSnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    }
    );
    setUsersRef(users);
  };

  const checkUser = () => {
    if (usersRef) {
      let user = usersRef.find((user: any) => user.uid === localStorage.getItem("uid"));
      if (user) {
        setUserBoolean(true);
      } else {
        setUserBoolean(false);
      }
    }
  }

  const toggleUser = async () => {
    const usersCol = collection(db, `stores/${store}/users`);
    if (!usersCol) {
      return;
    }
    if (userBoolean) {
      await deleteDoc(doc(usersCol, `${localStorage.getItem("uid")}`));
      setUserBoolean(false);
    } else {
      await setDoc(doc(usersCol, `${localStorage.getItem("uid")}`), {
        uid: localStorage.getItem("uid"),
      });
      setUserBoolean(true);
    }
  }

  useEffect(() => {
    getStore();
  }, []);

  useEffect(() => {
    checkUser();
  }, [usersRef]);

  return { store, vaultRef, eodRef, userBoolean, toggleUser, vaultErr, eodErr, navigate };
};
