import { useState, useEffect } from 'react';
import Header from './components/Header'
import CoinCount from './components/CoinCount'
import BillCount from './components/BillCount'

function App() {
  const [total, setTotal] = useState(0)

  const handleTotal = (amount) => {
    setTotal(total + amount)
  }

  return (
    <div className='flex flex-col items-center min-h-screen p-0'>
      <Header />
      <CoinCount 
        name='Penny'
        amount={.01}
        roll={50}
        handleTotal={handleTotal}
      />
      <CoinCount
        name='Nickel'
        amount={.05}
        roll={40}
        handleTotal={handleTotal}
      />
      <CoinCount
        name='Dime'
        amount={.1}
        roll={50}
        handleTotal={handleTotal}
      />
      <CoinCount
        name='Quarter'
        amount={.25}
        roll={40}
        handleTotal={handleTotal}
      />
      <BillCount
        name='One'
        amount={1}
        bund={100}
        handleTotal={handleTotal}
      />
      <BillCount
        name='Five'
        amount={5}
        bund={100}
        handleTotal={handleTotal}
      />
      <BillCount
        name='Ten'
        amount={10}
        bund={10}
        handleTotal={handleTotal}
      />
    </div>
  )
}

export default App
