import { useSelector } from "react-redux";
import {
  NotificationType,
  selectNotifications,
} from "../../redux/features/notifications/notificationSlice";
import { motion } from "framer-motion";

const NotificationButton = () => {
  const notifications = useSelector(selectNotifications);

  return notifications.length > 0 ? (
    /*     <div className="dropdown dropdown-end">
  <label tabIndex={0} className="btn m-1">Click</label>
  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</div> */
    <div className="dropdown dropdown-end">
      <label tabIndex={0}>
        <button className="btn btn-ghost btn-circle mr-4">
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
        </button>
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[999] p-2 shadow bg-base-100 rounded-box w-72"
      >
        {notifications.map((n: NotificationType) => (
          <li>
            <div className="p-2 m-2 flex items-center justify-center">
              <p className="flex-1 mr-2">{n.content}</p>
              <button className="btn btn-circle btn-sm btn-outline">
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
          </li>
        ))}
      </ul>
    </div>
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
