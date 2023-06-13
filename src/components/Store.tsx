import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

const Store = () => {
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
      vault.push({ id: doc.id, ...doc.data() })
    });
    setVaultRef(vault);
    const eodCol = collection(db, `stores/${store}/eod`);
    if (!eodCol) {
      setEodErr("End of Day counts not found!");
    }
    const eodSnapshot = await getDocs(eodCol);
    let eod: any = [];
    eodSnapshot.forEach((doc) => {
      eod.push({ id: doc.id, ...doc.data() })
    });
    setEodRef(eod);
  };


  useEffect(() => {
    getStore();
  }, []);

  return (
    <div className="center-col">
      <h2 className="text-2xl font-bold m-2">{store}</h2>
      {vaultRef && (
        <div className="center-col">
          <h3 className="bold-xl">Vault</h3>
          <div className="menu menu-primary text-center gap-2">
            {vaultRef.map((item: any) => (
              <li key={item.id}>
                <button
                  className="btn btn-lg btn-outline rounded-box"
                  onClick={() => navigate(`/stores/${store}/vault/${item.id}`)}
                >
                  {item.id}
                </button>
              </li>
            ))}
          </div>
        </div>
      )}
      {vaultErr && (
        <div className="center-col">
          <h3 className="bold-xl">Vault</h3>
          <p className="bold-xl">{vaultErr}</p>
        </div>
      )}
      {eodRef && (
        <div className="center-col">
          <h3 className="bold-xl">EOD</h3>
          <div className="menu menu-primary text-center gap-2">
            {eodRef.map((item: any) => (
              <li key={item.id}>
                <button
                  className="btn btn-lg btn-outline rounded-box"
                  onClick={() => navigate(`/stores/${store}/eod/${item.id}`)}
                >
                  {item.id}
                </button>
              </li>
            ))}
          </div>
        </div>
      )}
      {eodErr && (
        <div className="center-col">
          <h3 className="bold-xl">EOD</h3>
          <p className="bold-xl">{eodErr}</p>
        </div>
      )}
      <div className="flex flex-row items-center">
        <input type="checkbox" />
        <p className="bold-xl">My Primary Store</p>
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
