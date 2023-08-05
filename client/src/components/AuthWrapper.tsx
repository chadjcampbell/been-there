import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/UserContext";
import Loading from "./Loading";

const AuthWrapper = () => {
  const { user } = useContext(AuthContext);
  const isAuth = user?.loggedIn;
  if (isAuth === null) {
    return <Loading />;
  }
  if (isAuth === false) {
    return <Navigate to="/login" />;
  }
  if (isAuth === true) {
    return <Outlet />;
  }
};

export default AuthWrapper;
