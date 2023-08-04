import { toast } from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const user = { loggedIn: false };
  return user && user.loggedIn;
};

const AuthWrapper = () => {
  const isAuth = useAuth();
  if (isAuth) {
    return <Outlet />;
  } else {
    toast.error("Please log in");
    return <Navigate to="/login" />;
  }
};

export default AuthWrapper;
