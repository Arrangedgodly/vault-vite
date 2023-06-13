import { useState, useEffect } from "react"

interface CoinCountProps {
  name: string;
  amount: number;
  roll: number;
  handleTotal: (arg0: string, arg1: number) => void;
  reset: boolean;
}

const CoinCount = ({
  name,
  amount,
  roll,
  handleTotal,
  reset
}: CoinCountProps) => {
  const [rolls, setRolls] = useState(0);
  const [boxes, setBoxes] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(rolls * roll * amount + boxes * roll * amount * 50);
  }, [rolls, boxes]);

  useEffect(() => {
    if (rolls < 0) {
      setRolls(0);
    }
    if (boxes < 0) {
      setBoxes(0);
    }
  }, [rolls, boxes]);

  useEffect(() => {
    handleTotal(name, total);
  }, [total])

  useEffect(() => {
      setRolls(0);
      setBoxes(0);
  }, [reset]);

  return (
    <div className="card bordered bg-primary m-1">
      <div className="card-body grid grid-cols-3 items-center justify-items-center">
        <div className="center-col">
          <h2 className="card-title text-primary-content">{name} Rolls</h2>
          <input
            type="number"
            className="input input-bordered text-center bg-primary-content text-primary w-20"
            value={rolls}
            onChange={(e) => setRolls(Number(e.target.value))}
          />
        </div>
        <div className="center-col">
          <h2 className="card-title text-primary-content">{name} Boxes</h2>
          <input
            type="number"
            className="input input-bordered text-center bg-primary-content text-primary w-20"
            value={boxes}
            onChange={(e) => setBoxes(Number(e.target.value))}
          />
        </div>
        <div className="center-col">
          <h2 className="card-title text-primary-content">Total</h2>
          <p className="text-2xl text-center text-primary-content">${total}</p>
        </div>
      </div>
    </div>
  );
};

export default CoinCount;
