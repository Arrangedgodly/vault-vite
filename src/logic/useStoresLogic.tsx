import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";


export const useStoresLogic = () => {
  const [stores, setStores] = useState<any>({});

  const storeSnapshot = async () => {
    const storesCol = collection(db, "stores");
    const storeSnapshot = await getDocs(storesCol);
    let stores: any = {};
    storeSnapshot.forEach((doc) => {
      stores[doc.id] = doc.data();
    });
    setStores(stores);
  };

  useEffect(() => {
    storeSnapshot();
  }, []);

  return { stores };
}