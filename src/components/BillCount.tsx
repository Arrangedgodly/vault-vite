import { useState, useEffect } from "react";

interface BillCountProps {
  name: string;
  amount: number;
  bund: number;
  handleTotal: () => void;
}

const BillCount: React.FC<BillCountProps> = ({
  name,
  amount,
  bund,
  handleTotal,
}) => {
  const [singles, setSingles] = useState(0);
  const [bundle, setBundle] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(singles * amount + bundle * amount * bund);
    handleTotal(name, total);
  }, [singles, bundle]);

  useEffect(() => {
    if (singles < 0) {
      setSingles(0);
    }
    if (bundle < 0) {
      setBundle(0);
    }
  }, [singles, bundle]);

  return (
    <div className="card bordered bg-success m-1">
      <div className="card-body grid grid-cols-3 justify-items-center">
        <div className="flex flex-col items-center">
          <h2 className="card-title text-success-content">{name} Bills</h2>
          <input
            type="number"
            className="input input-bordered text-center bg-success-content text-success w-20"
            value={singles}
            onChange={(e) => setSingles(Number(e.target.value))}
          />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="card-title text-success-content">{name} Bundles</h2>
          <input
            type="number"
            className="input input-bordered text-center bg-success-content text-success w-20"
            value={bundle}
            onChange={(e) => setBundle(Number(e.target.value))}
          />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="card-title text-success-content">Total</h2>
          <p className="text-2xl text-center text-success-content">${total}</p>
        </div>
      </div>
    </div>
  );
};

export default BillCount;
