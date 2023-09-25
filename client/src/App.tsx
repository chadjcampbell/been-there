import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavWrapper from "./components/global/NavWrapper";
import Home from "./routes/Home";
import Map from "./routes/Map";
import Friends from "./routes/Friends";
import Profile from "./routes/Profile";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Error from "./routes/Error";
import Chats from "./routes/Chats";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getLoginStatus } from "./redux/features/auth/authService";
import { SET_LOGIN } from "./redux/features/auth/authSlice";
import { ErrorBoundary } from "react-error-boundary";
import FullScreenImage from "./components/global/FullScreenImage";
import FriendProfile from "./components/profile/FriendProfile";

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
    }
    loginStatus();
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <Error />,
      element: <NavWrapper />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "map",
          element: <Map />,
        },
        {
          path: "friends",
          element: <Friends />,
        },
        {
          path: "chats",
          element: <Chats />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "profile/:friendId",
          element: <FriendProfile />,
        },
        {
          path: "/fullscreen/:imageUrl",
          element: <FullScreenImage />,
        },
      ],
    },
    {
      path: "/login",
      errorElement: <Error />,
      element: <Login />,
    },
    {
      path: "/register",
      errorElement: <Error />,
      element: <Register />,
    },
  ]);

  return (
    <ErrorBoundary FallbackComponent={Error}>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;
