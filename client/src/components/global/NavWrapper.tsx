import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiTwotoneHome } from "react-icons/ai";
import { BsGlobeAmericas } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { BsChatDots } from "react-icons/bs";
import useSocketSetup from "../../hooks/useSocketSetup";
import { toast } from "react-hot-toast";
import { useLogoutUserMutation } from "../../redux/api/authApi";

type NavWrapperProps = {
  children: ReactNode;
};

const NavWrapper = ({ children }: NavWrapperProps) => {
  const [logoutUser, { isLoading }] = useLogoutUserMutation();
  const navigate = useNavigate();
  useSocketSetup();

  // close the nav menu after a small animation
  const handleNavClick = () => {
    const elem = document.activeElement as HTMLElement;
    if (elem) {
      setTimeout(() => {
        elem?.blur();
      }, 250);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Successfully logged out");
      navigate("/login");
    } catch (error: any) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <header>
        <nav>
          <div className="navbar bg-gray-100">
            <div className="navbar-start">
              <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-lg dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li
                    onClick={handleNavClick}
                    className="px-1 text-lg text-secondary"
                  >
                    <Link to="/map">
                      <BsGlobeAmericas />
                      Map
                    </Link>
                  </li>
                  <li
                    onClick={handleNavClick}
                    className="px-1 text-lg text-secondary"
                  >
                    <Link to="/friends">
                      <FaUserFriends />
                      Friends
                    </Link>
                  </li>
                  <li
                    onClick={handleNavClick}
                    className="px-1 text-lg text-secondary"
                  >
                    <Link to="/chats">
                      <BsChatDots />
                      Chats
                    </Link>
                  </li>
                  <li
                    onClick={handleNavClick}
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
                className="btn btn-ghost normal-case text-xl text-secondary"
              >
                <AiTwotoneHome />
                Been There
              </Link>
            </div>
            <div className="navbar-center hidden lg:flex ">
              <ul className="menu menu-horizontal px-1">
                <li className="px-10 text-lg text-secondary">
                  <Link to="/map">
                    <BsGlobeAmericas />
                    Map
                  </Link>
                </li>
                <li className="px-10 text-lg text-secondary">
                  <Link to="/friends">
                    <FaUserFriends />
                    Friends
                  </Link>
                </li>
                <li className="px-10 text-lg text-secondary">
                  <Link to="/chats">
                    <BsChatDots />
                    Chats
                  </Link>
                </li>
                <li className="px-10 text-lg text-secondary">
                  <Link to="/profile">
                    <CgProfile />
                    Profile
                  </Link>
                </li>
              </ul>
            </div>
            <div className="navbar-end">
              <button className="btn btn-ghost btn-circle">
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
              <button
                onClick={handleLogout}
                className="btn text-white bg-primary"
              >
                {isLoading ? (
                  <span className="loading loading-spinner text-white loading-lg"></span>
                ) : (
                  "Logout"
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>
      <main className="h-[calc(100vh-4rem)]">{children}</main>
    </>
  );
};

export default NavWrapper;
