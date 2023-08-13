import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../redux/store";

const AuthWrapper = () => {
  const user = useAppSelector((state) => state.userState.user);

  if (user) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default AuthWrapper;
