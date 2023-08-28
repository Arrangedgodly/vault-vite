import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, setDoc, Timestamp, doc } from "firebase/firestore";

interface ChangeCounterLogicProps {
  user: any;
}

interface Values {
  [key: string]: number;
}

export const useChangeCounterLogic = ({ user }: ChangeCounterLogicProps) => {
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
    if (!user || !user.store) {
      return false;
    }
  
    const date = Timestamp.fromDate(new Date()).toMillis().toString();
    const userVaultRef = collection(db, `stores/${user.store}/vault`);
    
    setDoc(doc(userVaultRef, date), values)
      .then(() => {
        console.log("Document successfully written!");
        handleReset();
        return true;
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
        return false;
      });
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
