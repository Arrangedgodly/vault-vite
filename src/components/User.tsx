import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface UserProps {
  loggedIn: boolean;
  user: any;
}

const User: React.FC<UserProps> = ({loggedIn, user}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
  }, [loggedIn]);
  return <div className="flex flex-col items-center"></div>;
};

export default User;
