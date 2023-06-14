import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useStoresLogic } from "../logic/useStoresLogic";

interface StoresProps {
  user: any;
}

const Stores = ({ user }: StoresProps) => {
  const { stores } = useStoresLogic();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

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
