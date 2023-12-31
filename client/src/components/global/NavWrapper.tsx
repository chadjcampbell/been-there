import { useEffect, useState } from "react";
import { Link, Outlet, ScrollRestoration, useNavigate } from "react-router-dom";
import { AiTwotoneHome } from "react-icons/ai";
import { BsGlobeAmericas } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { BsChatDots } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import useSocketSetup from "../../hooks/useSocketSetup";

import useAuthRedirect from "../../hooks/useAuthRedirect";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logoutUser } from "../../redux/features/auth/authService";
import {
  SET_LOGIN,
  SET_USER,
  selectIsLoggedIn,
  selectUser,
} from "../../redux/features/auth/authSlice";
import Loading from "./Loading";
import {
  SET_FRIENDS_LIST,
  SET_PENDING_FRIENDS,
} from "../../redux/features/friends/friendsSlice";
import { SET_POSTS } from "../../redux/features/posts/postSlice";
import DeleteModal from "../home/DeleteModal";
import { socket } from "../../socket";
import { ScrollToTopButton } from "./ScrollToTopButton";
import NotificationButton from "./NotificationButton";
import { SET_NOTIFICATIONS } from "../../redux/features/notifications/notificationSlice";
import { getNotifications } from "../../redux/features/notifications/notificationService";
import { regSw, subscribe } from "../../utils/swHelper";
import { FiMenu, FiSettings } from "react-icons/fi";

const NavWrapper = () => {
  const [isLoggingOut, setisLoggingOut] = useState(false);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [navbarVisible, setNavbarVisible] = useState(true);
  const user = useSelector(selectUser);

  // Add a scroll event listener to hide/show the "back to top" button
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (scrolled > 100) {
        setNavbarVisible(false);
      } else {
        setNavbarVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const setUserState = async () => {
      try {
        const userData = await getUser();
        dispatch(SET_USER(userData));
        const notificationData = await getNotifications();
        dispatch(SET_NOTIFICATIONS(notificationData));
      } finally {
        if ("geolocation" in navigator) {
          //trigger a location allowed popup
          navigator.geolocation.getCurrentPosition(() => null);
        }
        //register service worker for push notifications
        async function registerAndSubscribe() {
          try {
            const serviceWorkerReg = await regSw();
            await subscribe(serviceWorkerReg);
          } catch (error) {
            console.log(error);
          }
        }
        await registerAndSubscribe();
        setLoading(false);
      }
    };
    isLoggedIn && setUserState();
  }, [isLoggedIn]);

  useEffect(() => {
    function setView() {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.controller?.postMessage({ pageHidden: false });
      }
    }
    !loading && setView();
    return () => {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.controller?.postMessage({ pageHidden: true });
      }
    };
  }, []);

  useAuthRedirect("/login");
  useSocketSetup();

  const onLogoutHandler = async () => {
    setisLoggingOut(true);
    navigate("/login");
    await logoutUser();
    dispatch(SET_LOGIN(false));
    dispatch(SET_FRIENDS_LIST([]));
    dispatch(SET_PENDING_FRIENDS([]));
    dispatch(SET_POSTS([]));
    setisLoggingOut(false);
    socket.disconnect();
  };

  // close the nav menu after a small animation
  const handleMenuBlur = () => {
    const elem = document.activeElement as HTMLElement;
    if (elem) {
      setTimeout(() => {
        elem?.blur();
      }, 250);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      <ScrollRestoration />
      <header>
        {!navbarVisible && <ScrollToTopButton />}
        <nav>
          <div className="navbar bg-gray-100">
            <div className="navbar-start">
              <div className="dropdown">
                <button tabIndex={0} className="btn btn-ghost lg:hidden">
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
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </button>
                <ul
                  tabIndex={0}
                  className="menu menu-lg dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li
                    onClick={handleMenuBlur}
                    className="px-1 text-lg text-secondary"
                  >
                    <Link to="/">
                      <AiTwotoneHome />
                      News Feed
                    </Link>
                  </li>
                  <li
                    onClick={handleMenuBlur}
                    className="px-1 text-lg text-secondary"
                  >
                    <Link to="/map">
                      <BsGlobeAmericas />
                      Map
                    </Link>
                  </li>
                  <li
                    onClick={handleMenuBlur}
                    className="px-1 text-lg text-secondary"
                  >
                    <Link to="/friends">
                      <FaUserFriends />
                      Friends
                    </Link>
                  </li>
                  <li
                    onClick={handleMenuBlur}
                    className="px-1 text-lg text-secondary"
                  >
                    <Link to="/chats">
                      <BsChatDots />
                      Chats
                    </Link>
                  </li>
                  <li
                    onClick={handleMenuBlur}
                    className="px-1 text-lg text-secondary"
                  >
                    <Link to="/profile">
                      <CgProfile />
                      Profile
                    </Link>
                  </li>
                </ul>
              </div>

              <Link
                to="/"
                className="btn btn-ghost normal-case text-xl text-secondary lg:hidden"
              >
                <AiTwotoneHome />
                Been There
              </Link>
            </div>
            <div className="navbar-center hidden lg:flex ">
              <ul className="menu menu-horizontal px-1">
                <li className="px-1 text-lg text-secondary-focus">
                  <Link to="/">
                    <AiTwotoneHome />
                    News Feed
                  </Link>
                </li>
                <li className="px-1 text-lg text-secondary-focus">
                  <Link to="/map">
                    <BsGlobeAmericas />
                    Map
                  </Link>
                </li>
                <li className="px-1 text-lg text-secondary-focus">
                  <Link to="/friends">
                    <FaUserFriends />
                    Friends
                  </Link>
                </li>
                <li className="px-1 text-lg text-secondary-focus">
                  <Link to="/chats">
                    <BsChatDots />
                    Chats
                  </Link>
                </li>
                <li className="px-1 text-lg text-secondary-focus">
                  <Link to="/profile">
                    <CgProfile />
                    Profile
                  </Link>
                </li>
              </ul>
            </div>
            <div className="navbar-end mr-4">
              <NotificationButton />
              <div className="dropdown dropdown-end dropdown-hover">
                <label tabIndex={0}>
                  <div className="avatar indicator">
                    <span className="indicator-item badge badge-secondary mr-3 mt-2">
                      <FiMenu />
                    </span>
                    <div className="w-12 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2 m-2">
                      <img src={user.photoUrl} alt="profile pic user menu" />
                    </div>
                  </div>
                </label>
                <ul
                  onClick={handleMenuBlur}
                  tabIndex={0}
                  className="dropdown-content z-[100] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li className="px-1 text-lg text-secondary-focus">
                    <Link to="/settings">
                      <FiSettings />
                      Settings
                    </Link>
                  </li>
                  <li className="px-1 text-lg text-secondary-focus">
                    <button onClick={onLogoutHandler}>
                      <BiLogOut />
                      {isLoggingOut ? (
                        <span className="loading loading-spinner text-white loading-lg"></span>
                      ) : (
                        "Logout"
                      )}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <main className="min-h-[calc(100vh-5rem)] flex justify-center w-full">
        <DeleteModal />
        <Outlet />
      </main>
    </>
  );
};

export default NavWrapper;
