import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/UserContext";

const useAuth = () => {
  const { user } = useContext(AuthContext);
  return user && user.loggedIn;
};

const AuthWrapper = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthWrapper;
