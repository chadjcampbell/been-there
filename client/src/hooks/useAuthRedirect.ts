import { useEffect } from "react";
import { getLoginStatus } from "../redux/features/auth/authService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_LOGIN } from "../redux/features/auth/authSlice";
import { toast } from "react-hot-toast";

const useAuthRedirect = (path: string) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const authRedirect = async () => {
      const isLoggedIn = await getLoginStatus();
      dispatch(SET_LOGIN(isLoggedIn));

      if (!isLoggedIn) {
        toast.error("Session expired, please login");
        navigate(path);
        return false;
      }
      return true;
    };
    authRedirect();
  }, []);
};

export default useAuthRedirect;
