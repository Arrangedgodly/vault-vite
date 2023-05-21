import { useState, useEffect } from "react";

const LargeBillCount = ({ handleTotal, reset }) => {
  const [twenty, setTwenty] = useState(0);
  const [fifty, setFifty] = useState(0);
  const [hundred, setHundred] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const sum = twenty * 20 + fifty * 50 + hundred * 100;
    setTotal(sum);
    handleTotal("largeBill", sum);
  }, [twenty, fifty, hundred]);

  useEffect(() => {
    if (reset) {
      setTwenty(0);
      setFifty(0);
      setHundred(0);
    }
  }, [reset]);

  return (
    <div className="card bordered bg-error m-1">
      <div className="card-body grid grid-cols-3 items-center justify-items-center">
        <div className="flex flex-col items-center">
          <h2 className="card-title text-error-content">Twenty Bills</h2>
          <input
            type="number"
            className="input input-bordered text-center bg-error-content text-error w-20"
            value={twenty}
            onChange={(e) => setTwenty(Number(e.target.value))}
          />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="card-title text-error-content">Fifty Bills</h2>
          <input
            type="number"
            className="input input-bordered text-center bg-error-content text-error w-20"
            value={fifty}
            onChange={(e) => setFifty(Number(e.target.value))}
          />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="card-title text-error-content">Hundred Bills</h2>
          <input
            type="number"
            className="input input-bordered text-center bg-error-content text-error w-20"
            value={hundred}
            onChange={(e) => setHundred(Number(e.target.value))}
          />
        </div>
        <div></div>
        <div className="flex flex-col items-center">
          <h2 className="card-title text-error-content">Total</h2>
          <p className="text-2xl text-center text-error-content">${total}</p>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default LargeBillCount;
