import { useState, useEffect } from "react";
import CoinCount from "./CoinCount";
import BillCount from "./BillCount";
import LargeBillCount from "./LargeBillCount";
import Footer from "./Footer";

function ChangeCounter() {
  const [values, setValues] = useState({});
  const [total, setTotal] = useState(0);

  const handleTotal = (id: string, newValue: number) => {
    setValues((prev) => ({
      ...prev,
      [id]: newValue,
    }));
  };

  useEffect(() => {
    let sum = 0;
    for (const key in values) {
      sum += values[key];
    }
    setTotal(sum);
  }, [values]);

  return (
    <div className='mb-20 mt-3'>
      <CoinCount
        name="Penny"
        amount={0.01}
        roll={50}
        handleTotal={handleTotal}
      />
      <CoinCount
        name="Nickel"
        amount={0.05}
        roll={40}
        handleTotal={handleTotal}
      />
      <CoinCount name="Dime" amount={0.1} roll={50} handleTotal={handleTotal} />
      <CoinCount
        name="Quarter"
        amount={0.25}
        roll={40}
        handleTotal={handleTotal}
      />
      <BillCount name="One" amount={1} bund={100} handleTotal={handleTotal} />
      <BillCount name="Five" amount={5} bund={100} handleTotal={handleTotal} />
      <BillCount name="Ten" amount={10} bund={10} handleTotal={handleTotal} />
      <LargeBillCount handleTotal={handleTotal} />
      <Footer total={total} />
    </div>
  );
}

export default ChangeCounter;
