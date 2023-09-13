import { useDispatch, useSelector } from "react-redux";
import {
  NotificationType,
  SET_NOTIFICATIONS,
  selectNotifications,
} from "../../redux/features/notifications/notificationSlice";
import { AnimatePresence, motion } from "framer-motion";
import { removeNotification } from "../../redux/features/notifications/notificationService";
import { SET_CHAT_ID } from "../../redux/features/chats/chatSlice";
import { useNavigate } from "react-router-dom";
import {
  SET_PENDING_FRIENDS,
  selectFriendsList,
} from "../../redux/features/friends/friendsSlice";
import { findFriendId } from "../../utils/findFriendId";
import { useEffect, useRef } from "react";
import {
  findAllFriends,
  getPendingFriends,
} from "../../redux/features/friends/friendService";

const NotificationButton = () => {
  const notifications = useSelector(selectNotifications);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const friends = useSelector(selectFriendsList);
  const dropdownRef = useRef<HTMLDetailsElement | null>(null);

  const handleRemove = async (id: number) => {
    await removeNotification(id);
    const newNotifications = notifications.filter(
      (n: NotificationType) => n.notification_id !== id
    );
    dispatch(SET_NOTIFICATIONS(newNotifications));
  };

  const handleNotifyClick = async (n: NotificationType) => {
    dropdownRef.current!.open = false;
    if (n.type === "chat_message") {
      const friendId = findFriendId(friends, n.content);
      dispatch(SET_CHAT_ID(friendId));
      setTimeout(() => {
        navigate("/chats");
      }, 250);
    }
    if (n.type === "friend_request") {
      const newPendingFriends = await getPendingFriends();
      dispatch(SET_PENDING_FRIENDS(newPendingFriends));
      setTimeout(() => {
        navigate("/friends");
      }, 250);
    }
  };

  // Event listener to close the dropdown when clicking outside of it
  const handleOutsideClick = (e: MouseEvent) => {
    if (
      !e.target ||
      !(e.target instanceof Element) ||
      (!e.target.closest(".dropdown") && notifications.length > 0)
    ) {
      dropdownRef.current!.open = false;
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return notifications.length > 0 ? (
    <details ref={dropdownRef} className="dropdown dropdown-end dropdown-open">
      <summary className="btn btn-ghost btn-circle mr-4">
        <div className="indicator">
          <motion.svg
            animate={{
              scale: [1, 1.2, 1],
              rotateZ: [0, -20, 20, -20, 20, -20, 20, 0],
              transition: {
                duration: 1,
                repeat: 3,
                repeatDelay: 1,
              },
            }}
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </motion.svg>

          {/* this span badge color will be for notifications */}
          <span className="badge badge-sm badge-success indicator-item">
            {notifications.length}
          </span>
        </div>
      </summary>
      <ul className="dropdown-content z-[999] p-2 shadow bg-base-100 rounded-box w-72">
        <AnimatePresence>
          {notifications.map((n: NotificationType) => (
            <motion.li
              key={n.notification_id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ x: "-12rem", opacity: 0 }}
              transition={{ duration: 0.2 }}
              layout={"size"}
            >
              <div className="p-2 m-2 flex items-center justify-center">
                <button
                  onClick={() => handleNotifyClick(n)}
                  className="btn btn-ghost flex-1 mr-2"
                >
                  {n.content}
                </button>
                <button
                  onClick={() => handleRemove(n.notification_id)}
                  className="btn btn-circle btn-sm btn-outline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </details>
  ) : (
    <button className="btn btn-ghost btn-circle mr-4">
      <div className="indicator">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {/* this span badge color will be for notifications */}
        <span className="badge badge-xs badge-gray indicator-item"></span>
      </div>
    </button>
  );
};

export default NotificationButton;
