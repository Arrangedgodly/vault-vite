import { useState, useEffect } from "react";
import { collection, setDoc } from "firebase/firestore";

interface Values {
  [key: string]: number;
}

export const useChangeCounterLogic = () => {
  const [values, setValues] = useState<Values>({
    Penny: 0,
    Nickel: 0,
    Dime: 0,
    Quarter: 0,
    One: 0,
    Five: 0,
    Ten: 0,
    largeBill: 0,
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
      Penny: 0,
      Nickel: 0,
      Dime: 0,
      Quarter: 0,
      One: 0,
      Five: 0,
      Ten: 0,
      largeBill: 0,
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

  return { total, handleTotal, handleReset, handleSubmit, reset };
};
