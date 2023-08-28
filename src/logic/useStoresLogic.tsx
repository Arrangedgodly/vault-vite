import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";

interface StoresLogicProps {
  user: any;
}

export const useStoresLogic = ({ user }: StoresLogicProps) => {
  const [stores, setStores] = useState<any>({});
  const [userStore, setUserStore] = useState<any>("");

  const storeSnapshot = async () => {
    const storesCol = collection(db, "stores");
    const storeSnapshot = await getDocs(storesCol);
    let stores: any = {};
    storeSnapshot.forEach((doc) => {
      stores[doc.id] = doc.data();
    });
    setStores(stores);
  };

  const checkUserStore = async () => {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      if (userData.store && userData.store !== "") {
        setUserStore(userData.store);
      }
    }
  }

  useEffect(() => {
    storeSnapshot();
  }, []);

  useEffect(() => {
    if (user) {
      checkUserStore();
    }
  }, [user]);

  return { stores, userStore };
};
