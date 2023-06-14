import { useState, useEffect } from "react";

interface LargeBillCountProps {
  handleTotal: (arg0: string, arg1: number) => void;
  reset: boolean;
}

export const useLargeBillCountLogic = ({ handleTotal, reset }: LargeBillCountProps) => {
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
    setTwenty(0);
    setFifty(0);
    setHundred(0);
  }, [reset]);

  useEffect(() => {
    if (twenty < 0) setTwenty(0);
  }, [twenty]);

  useEffect(() => {
    if (fifty < 0) setFifty(0);
  }, [fifty]);

  useEffect(() => {
    if (hundred < 0) setHundred(0);
  }, [hundred]);

  return { twenty, fifty, hundred, total, setTwenty, setFifty, setHundred }
}