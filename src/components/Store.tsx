import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

const Store = () => {
  const { store } = useParams();
  const [vaultRef, setVaultRef] = useState<any>(null);
  const [eodRef, setEodRef] = useState<any>(null);
  const [err, setErr] = useState<any>(null);
  const navigate = useNavigate();

  const getStore = async () => {
    const vaultCollection = collection(
      db,
      "stores",
      store,
      "counts",
      "someDocId",
      "vault"
    );
    const vaultSnapshot = await getDocs(vaultCollection);
    let vault: any = {};
    vaultSnapshot.forEach((doc) => {
      vault[doc.id] = doc.data();
    }
    );
    setVaultRef(vault);
    const eodCollection = collection(
      db,
      "stores",
      store,
      "counts",
      "someDocId",
      "eod"
    );
    const eodSnapshot = await getDocs(eodCollection);
    let eod: any = {};
    eodSnapshot.forEach((doc) => {
      eod[doc.id] = doc.data();
    }
    );
    setEodRef(eod);
  };

  useEffect(() => {
    getStore();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold m-2">{store}</h2>
      {err && <p>{err}</p>}
      <div className='flex flex-row items-center'>
        <input type='checkbox' />
        <p className='text-xl font-bold m-2'>My Primary Store</p>
      </div>
      <button
        className="btn btn-lg btn-outline rounded-box"
        onClick={() => {
          navigate("/stores");
        }}
      >
        Back
      </button>
    </div>
  );
};

export default Store;
