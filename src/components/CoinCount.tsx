import { useState, useEffect } from 'react';

function CoinCount({ name, amount, roll, handleTotal}) {
  const [rolls, setRolls] = useState(0)
  const [boxes, setBoxes] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setTotal((rolls * roll * amount) + (boxes * roll * amount * 50))
  }, [rolls, boxes])

  useEffect(() => {
    if (rolls < 0) {
      setRolls(0)
    }
    if (boxes < 0) {
      setBoxes(0)
    }
  }, [rolls, boxes])

    return (
      <div className='card bordered bg-primary m-1'>
        <div className='card-body grid grid-cols-3 items-center justify-items-center'>
          <div className='flex flex-col items-center'>
            <h2 className='card-title text-primary-content'>{name} Rolls</h2>
            <input type='number' className='input input-bordered text-center bg-primary-content text-primary' value={rolls} onChange={(e) => setRolls(e.target.value)} />
          </div>
          <div className='flex flex-col items-center'>
            <h2 className='card-title text-primary-content'>{name} Boxes</h2>
            <input type='number' className='input input-bordered text-center bg-primary-content text-primary' value={boxes} onChange={(e) => setBoxes(e.target.value)} />
          </div>
          <div className='flex flex-col items-center'>
            <h2 className='card-title text-primary-content'>Total</h2>
            <p className='text-2xl text-center text-primary-content'>${total}</p>
          </div>
        </div>
      </div>
    )
}

export default CoinCount;