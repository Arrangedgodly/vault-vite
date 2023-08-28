import { useStoreLogic } from "../logic/useStoreLogic";

const Store = () => {
  const { store, vaultRef, userBoolean, toggleUser, vaultErr, navigate } =
    useStoreLogic();

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
      <div className="flex flex-row items-center">
        <input type="checkbox" 
          checked={userBoolean}
          onChange={() => toggleUser()}
        />
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
