import { useParams, useNavigate } from 'react-router-dom';

const Store = () => {
  const { store } = useParams();
  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center'>
      <h2 className='text-2xl font-bold'>{store}</h2>
      <button className='btn btn-lg btn-outline rounded-box' onClick={() => {navigate('/stores')}}>Back</button>
    </div>
  )
}

export default Store;