import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface UserProps {
  user: any;
}

const User = ({ user }: UserProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <div className="center-col m-5">
      {user && (
        <>
          <h2 className="bold-2x">{user.displayName}</h2>
          <img
            className="rounded-full m-2"
            src={user.photoURL}
            alt={`Avatar for ${user.displayName}`}
          />
          <p className="text-center">
            {user.email}
          </p>
        </>
      )}
    </div>
  );
};

export default User;
