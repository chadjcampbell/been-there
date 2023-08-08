import axios from "axios";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export type UserType = {
  id: number;
  name: string;
  email: string;
  photoURL: string;
};

export type AuthStateType = {
  loggedIn: boolean | null;
  user: UserType | null;
};

export type AuthContextType = {
  user: AuthStateType | null;
  setUser: Dispatch<SetStateAction<{ loggedIn: null; user: null }>>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => null,
});

type UserContextProps = {
  children: ReactNode;
};

export const UserContext = ({ children }: UserContextProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ loggedIn: null, user: null });
  useEffect(() => {
    const getLoginStatus = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/auth/loginStatus`
        );
        if (response.data) {
          setUser({ ...response.data });
        }
        if (response.data.loggedIn === true) {
          navigate("/");
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
        navigate("/login");
      }
    };
    user.loggedIn === null && getLoginStatus();
  }, [user]);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
