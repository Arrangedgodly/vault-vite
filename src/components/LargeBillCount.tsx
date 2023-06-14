import { useLargeBillCountLogic } from "../logic/useLargeBillCountLogic";

interface LargeBillCountProps {
  handleTotal: (arg0: string, arg1: number) => void;
  reset: boolean;
}

const LargeBillCount = ({ handleTotal, reset }: LargeBillCountProps) => {
  const { twenty, fifty, hundred, total, setTwenty, setFifty, setHundred } =
    useLargeBillCountLogic({ handleTotal, reset });

  return (
    <div className="card bordered bg-error m-1 mb-5">
      <div className="card-body grid grid-cols-3 items-center justify-items-center">
        <div className="center-col">
          <h2 className="card-title norm-large">Twenty Bills</h2>
          <input
            type="number"
            className="input-large"
            value={twenty}
            onChange={(e) => setTwenty(Number(e.target.value))}
          />
        </div>
        <div className="center-col">
          <h2 className="card-title norm-large">Fifty Bills</h2>
          <input
            type="number"
            className="input-large"
            value={fifty}
            onChange={(e) => setFifty(Number(e.target.value))}
          />
        </div>
        <div className="center-col">
          <h2 className="card-title norm-large">Hundred Bills</h2>
          <input
            type="number"
            className="input-large"
            value={hundred}
            onChange={(e) => setHundred(Number(e.target.value))}
          />
        </div>
        <div></div>
        <div className="center-col">
          <h2 className="card-title norm-large">Total</h2>
          <p className="text-2xl text-center text-error-content">${total}</p>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default LargeBillCount;
