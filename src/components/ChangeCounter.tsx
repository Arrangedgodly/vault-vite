import { useChangeCounterLogic } from "../logic/useChangeCounterLogic";
import CoinCount from "./CoinCount";
import BillCount from "./BillCount";
import LargeBillCount from "./LargeBillCount";
import Footer from "./Footer";


function ChangeCounter() {
  const { total, handleTotal, handleReset, handleSubmit, reset } = useChangeCounterLogic();

  return (
    <div className="mt-5 mb-20 relative z-0">
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
