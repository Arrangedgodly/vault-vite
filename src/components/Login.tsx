interface LoginProps {
  handleLogin: () => void;
  err: any;
}

const Login = ({ handleLogin, err }: LoginProps) => {
  return (
    <div className="center-col m-20">
      <div className="card p-4 shadow-2xl">
        <h2 className="text-2xl font-bold card-title">Login</h2>
        <div className="card-body card-center text-center">
          <p className="card-text">
            Please login using your Silver Stem email to continue
          </p>
          <p className='card-text text-xs italic'>Signing in with a non-Silver Stem email will provide read only access</p>
        </div>
        <button className="btn" onClick={handleLogin}>
          Sign In
        </button>
      </div>
      {err && (
        <div className="toast toast-bottom toast-center">
          <div className="alert alert-error">
            <div>
              <span>{err.errorMessage}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
