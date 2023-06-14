import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

export const useStoreLogic = () => {
  const { store } = useParams();
  const [vaultRef, setVaultRef] = useState<[] | null>(null);
  const [eodRef, setEodRef] = useState<[] | null>(null);
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
  };

  useEffect(() => {
    getStore();
  }, []);

  return { store, vaultRef, eodRef, vaultErr, eodErr, navigate };
};
