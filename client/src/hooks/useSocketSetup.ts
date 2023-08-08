import { useContext, useEffect } from "react";
import { socket } from "../socket";
import { AuthContext } from "../context/UserContext";

const useSocketSetup = () => {
  const { setUser } = useContext(AuthContext);
  useEffect(() => {
    socket.connect();
    socket.on("connect_error", () => {
      setUser({ loggedIn: null, user: null });
    });
    return () => {
      socket.off("connect_error");
    };
  }, []);
};

export default useSocketSetup;
