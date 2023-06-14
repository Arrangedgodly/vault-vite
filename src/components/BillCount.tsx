import { useBillCountLogic } from "../logic/useBillCountLogic";

interface BillCountProps {
  name: string;
  amount: number;
  bund: number;
  handleTotal: (arg0: string, arg1: number) => void;
  reset: boolean;
}

const BillCount = ({
  name,
  amount,
  bund,
  handleTotal,
  reset,
}: BillCountProps) => {
  const { singles, setSingles, bundle, setBundle, total } = useBillCountLogic({
    name,
    amount,
    bund,
    handleTotal,
    reset,
  });

  return (
    <div className="card bordered bg-success m-1">
      <div className="card-body grid grid-cols-3 justify-items-center">
        <div className="center-col">
          <h2 className="card-title norm-bill">{name} Bills</h2>
          <input
            type="number"
            className="input-bill"
            value={singles}
            onChange={(e) => setSingles(Number(e.target.value))}
          />
        </div>
        <div className="center-col">
          <h2 className="card-title norm-bill">{name} Bundles</h2>
          <input
            type="number"
            className="input-bill"
            value={bundle}
            onChange={(e) => setBundle(Number(e.target.value))}
          />
        </div>
        <div className="center-col">
          <h2 className="card-title norm-bill">Total</h2>
          <p className="text-2xl text-center text-success-content">${total}</p>
        </div>
      </div>
    </div>
  );
};

export default BillCount;
