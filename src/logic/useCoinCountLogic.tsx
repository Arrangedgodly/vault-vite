import { useState, useEffect } from "react";

interface CoinCountProps {
  name: string;
  amount: number;
  roll: number;
  handleTotal: (arg0: string, arg1: number) => void;
  reset: boolean;
}

export const useCoinCountLogic = ({
  name,
  roll,
  amount,
  handleTotal,
  reset,
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
  }, [total]);

  useEffect(() => {
    setRolls(0);
    setBoxes(0);
  }, [reset]);

  return { rolls, setRolls, boxes, setBoxes, total };
};
