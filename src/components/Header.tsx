import { BsSafe, BsCalculator } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  loggedIn: boolean;
  user: any;
  handleLogout: () => void;
}

const Header = ({ loggedIn, user, handleLogout }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="navbar bg-base-100 drop-shadow-md relative z-30">
      <div className="navbar-start">
        <div className="dropdown dropdown-hover">
          <label tabIndex={0} className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52 relative z-40"
          >
            <li className="flex items-center">
              <a
                onClick={() => {
                  navigate("/");
                }}
              >
                Vault Counter
              </a>
            </li>
            <li className="flex items-center">
              <a
                onClick={() => {
                  navigate("/deposit");
                }}
              >
                Deposit Counter
              </a>
            </li>
            <li className="flex items-center">
              <a
                onClick={() => {
                  navigate("/stores");
                }}
              >
                My Store
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center flex-1">
        <BsSafe size="2em" />
        <BsCalculator size="2em" />
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-hover dropdown-end">
        <label
          className="btn btn-square btn-ghost"
          tabIndex={0}
        >
          {loggedIn ? (
            <div className="avatar">
              <div className="w-[2em] rounded-full">
                <img src={user.photoURL} alt="avatar" />
              </div>
            </div>
          ) : (
            <RxAvatar size="2em" />
          )}
        </label>
        <ul
          tabIndex={0}
          className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52 relative z-40"
        >
          {loggedIn ? (
            <>
            <li className="flex items-center">
              <a
                onClick={() => {
                  navigate("/my-account");
                }}
              >
                My Account
              </a>
            </li>
            <li className="flex items-center">
              <a
                onClick={handleLogout}
              >
                Logout
              </a>
            </li>
            </>
          ) : (
            <li className="flex items-center">
              <a
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </a>
            </li>
          )}
        </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
