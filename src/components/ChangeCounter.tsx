import { useState, useEffect } from "react";
import CoinCount from "./CoinCount";
import BillCount from "./BillCount";
import LargeBillCount from "./LargeBillCount";
import Footer from "./Footer";

interface Values {
  [key: string]: number;
}

function ChangeCounter() {
  const [values, setValues] = useState<Values>({
    "Penny": 0,
    "Nickel": 0,
    "Dime": 0,
    "Quarter": 0,
    "One": 0,
    "Five": 0,
    "Ten": 0,
    "largeBill": 0
  });
  const [total, setTotal] = useState(0);
  const [reset, setReset] = useState(false);

  const handleTotal = (id: string, newValue: number) => {
    setValues((prev) => ({
      ...prev,
      [id]: newValue,
    }));
  };

  const handleReset = () => {
    setReset(true);
    setValues({
      "Penny": 0,
      "Nickel": 0,
      "Dime": 0,
      "Quarter": 0,
      "One": 0,
      "Five": 0,
      "Ten": 0,
      "largeBill": 0
    });
    setTotal(0);  
  };

  const handleSubmit = () => {
    console.log(values);
  };

  useEffect(() => {
    let sum = 0;
    Object.keys(values).forEach((key) => {
      sum += values[key];
    });
    setTotal(sum);
  }, [values]);

  useEffect(() => {
    setReset(false);
  }, [reset]);

  return (
    <div className="my-20 relative z-0">
      <CoinCount
        name="Penny"
        amount={0.01}
        roll={50}
        handleTotal={handleTotal}
        reset={reset}
      />
      <CoinCount
        name="Nickel"
        amount={0.05}
        roll={40}
        handleTotal={handleTotal}
        reset={reset}
      />
      <CoinCount
        name="Dime"
        amount={0.1}
        roll={50}
        handleTotal={handleTotal}
        reset={reset}
      />
      <CoinCount
        name="Quarter"
        amount={0.25}
        roll={40}
        handleTotal={handleTotal}
        reset={reset}
      />
      <BillCount
        name="One"
        amount={1}
        bund={100}
        handleTotal={handleTotal}
        reset={reset}
      />
      <BillCount
        name="Five"
        amount={5}
        bund={100}
        handleTotal={handleTotal}
        reset={reset}
      />
      <BillCount
        name="Ten"
        amount={10}
        bund={10}
        handleTotal={handleTotal}
        reset={reset}
      />
      <LargeBillCount handleTotal={handleTotal} reset={reset} />
      <Footer total={total} handleReset={handleReset} handleSubmit={handleSubmit} />
    </div>
  );
}

export default ChangeCounter;
