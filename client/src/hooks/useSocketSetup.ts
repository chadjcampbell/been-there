import { useEffect } from "react";
import { socket } from "../socket";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/features/auth/authSlice";
import { SET_ONLINE_FRIENDS } from "../redux/features/friends/friendsSlice";

const useSocketSetup = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      socket.connect();
      socket.on("connect", () => {
        console.log("Socket IO Connected");
      });
      socket.on("connect_error", () => {
        console.log("Socket IO Error");
      });
      // Listen for updates to the online user list
      socket.on("onlineUsers", (users) => {
        dispatch(SET_ONLINE_FRIENDS(users));
      });
      return () => {
        socket.off("connect");
        socket.off("connect_error");
        socket.off("onlineUsers");
      };
    }
  }, [user]);
};

export default useSocketSetup;
