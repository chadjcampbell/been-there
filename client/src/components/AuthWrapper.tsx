import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/UserContext";
import Loading from "./Loading";

const useAuth = () => {
  const { user } = useContext(AuthContext);
  return user?.loggedIn;
};

const AuthWrapper = () => {
  const isAuth = useAuth();
  if (isAuth === null) {
    return <Loading />;
  }
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthWrapper;
