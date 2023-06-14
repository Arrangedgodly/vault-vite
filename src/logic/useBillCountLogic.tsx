import { useState, useEffect } from "react";

interface BillCountProps {
  name: string;
  amount: number;
  bund: number;
  handleTotal: (arg0: string, arg1: number) => void;
  reset: boolean;
}

export const useBillCountLogic = ({
  name,
  amount,
  bund,
  handleTotal,
  reset,
}: BillCountProps) => {
  const [singles, setSingles] = useState(0);
  const [bundle, setBundle] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(singles * amount + bundle * amount * bund);
    handleTotal(name, total);
  }, [singles, bundle]);

  useEffect(() => {
    if (singles < 0) {
      setSingles(0);
    }
    if (bundle < 0) {
      setBundle(0);
    }
  }, [singles, bundle]);

  useEffect(() => {
    setSingles(0);
    setBundle(0);
    setTotal(0);
  }, [reset]);

  return { singles, setSingles, bundle, setBundle, total };
};
