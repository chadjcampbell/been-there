import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

export type UserType = {
  id: number;
  name: string;
  email: string;
};

export type AuthStateType = {
  loggedIn: boolean | null;
  user: UserType | null;
};

export type AuthContextType = {
  user: AuthStateType;
  setUser: Dispatch<SetStateAction<{ loggedIn: null; user: null }>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

type UserContextProps = {
  children: ReactNode;
};

export const UserContext = ({ children }: UserContextProps) => {
  const [user, setUser] = useState({ loggedIn: null, user: null });
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
