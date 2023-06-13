import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

interface StoresProps {
  loggedIn: boolean;
  user: any;
}

const Stores = ({ loggedIn, user }: StoresProps) => {
  const navigate = useNavigate();
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
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    storeSnapshot();
  }, []);

  return (
    <div className="center-col">
      <h2 className="text-2xl font-bold m-2">Stores</h2>
      <div className="menu menu-primary text-center gap-2">
        {Object.keys(stores).map((store) => (
          <li key={store}>
            <button
              className="btn btn-lg btn-outline rounded-box"
              onClick={() => navigate(`/stores/${store}`)}
            >
              {store}
            </button>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Stores;
