import { useStoreLogic } from "../logic/useStoreLogic";

const Store = () => {
  const { store, vaultRef, eodRef, vaultErr, eodErr, navigate } =
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
