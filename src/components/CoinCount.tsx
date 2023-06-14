import { useCoinCountLogic } from "../logic/useCoinCountLogic";

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
  reset,
}: CoinCountProps) => {
  const { rolls, setRolls, boxes, setBoxes, total } = useCoinCountLogic({
    name,
    roll,
    amount,
    handleTotal,
    reset,
  });

  return (
    <div className="card bordered bg-primary m-1">
      <div className="card-body grid grid-cols-3 items-center justify-items-center">
        <div className="center-col">
          <h2 className="card-title norm-head">{name} Rolls</h2>
          <input
            type="number"
            className="input-main"
            value={rolls}
            onChange={(e) => setRolls(Number(e.target.value))}
          />
        </div>
        <div className="center-col">
          <h2 className="card-title norm-head">{name} Boxes</h2>
          <input
            type="number"
            className="input-main"
            value={boxes}
            onChange={(e) => setBoxes(Number(e.target.value))}
          />
        </div>
        <div className="center-col">
          <h2 className="card-title norm-head">Total</h2>
          <p className="text-2xl text-center text-primary-content">${total}</p>
        </div>
      </div>
    </div>
  );
};

export default CoinCount;
