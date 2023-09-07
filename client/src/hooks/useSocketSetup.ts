import { useEffect } from "react";
import { socket } from "../socket";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/auth/authSlice";

const useSocketSetup = () => {
  const user = useSelector(selectUser);
  useEffect(() => {
    if (user) {
      socket.connect();
      socket.on("connect_error", () => {
        console.log("Socket IO Error");
      });
      return () => {
        socket.off("connect_error");
      };
    }
  }, [user]);
};

export default useSocketSetup;
