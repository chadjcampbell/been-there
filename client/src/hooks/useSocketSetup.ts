import { useEffect } from "react";
import { socket } from "../socket";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../redux/features/auth/authSlice";
import { SET_ONLINE_FRIENDS } from "../redux/features/friends/friendsSlice";
import { ADD_NOTIFICATION } from "../redux/features/notifications/notificationSlice";

const useSocketSetup = () => {
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      socket.connect();
      socket.on("connect", () => {
        //console.log("Socket IO Connected");
      });
      socket.on("connect_error", () => {
        console.log("Socket IO Error");
      });
      // Listen for updates to the online user list
      socket.on("onlineUsers", (users: string[]) => {
        dispatch(SET_ONLINE_FRIENDS(users));
      });
      socket.on("notification", (notification) => {
        if (user.userId === notification.user_id) {
          dispatch(ADD_NOTIFICATION(notification));
          const audio = new Audio("./notification.mp3");
          audio.play();
        }
      });
      return () => {
        socket.off("connect");
        socket.off("connect_error");
        socket.off("onlineUsers");
        socket.off("notification");
        socket.disconnect();
      };
    }
  }, [user]);
};

export default useSocketSetup;
