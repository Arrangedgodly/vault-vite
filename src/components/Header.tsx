import {BsSafe, BsCalculator} from 'react-icons/bs';
import {RxAvatar} from 'react-icons/rx';

function Header() {
  return (
    <div className="navbar bg-base-100 drop-shadow-md">
      <div className='navbar-start'>
      <button className="btn btn-square btn-ghost">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
    </button>
      </div>
      <div className='navbar-center flex-1'>
        <BsSafe size='2em' />
        <BsCalculator size='2em' />
      </div>
      <div className='navbar-end'>
      <button className="btn btn-square btn-ghost">
      <RxAvatar size='2em' />
      </button>
      </div>
    </div>
  )
}

export default Header;