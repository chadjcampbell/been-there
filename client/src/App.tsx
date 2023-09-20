import { BrowserRouter, Routes, Route } from "react-router-dom";
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

  return (
    <ErrorBoundary FallbackComponent={Error}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <NavWrapper>
                <Home />
              </NavWrapper>
            }
          />
          <Route
            path="/map"
            element={
              <NavWrapper>
                <Map />
              </NavWrapper>
            }
          />
          <Route
            path="/friends"
            element={
              <NavWrapper>
                <Friends />
              </NavWrapper>
            }
          />
          <Route
            path="/chats"
            element={
              <NavWrapper>
                <Chats />
              </NavWrapper>
            }
          />
          <Route
            path="/profile"
            element={
              <NavWrapper>
                <Profile />
              </NavWrapper>
            }
          />
          <Route
            path="/fullscreen/:imageUrl"
            element={
              <NavWrapper>
                <FullScreenImage />
              </NavWrapper>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>{" "}
    </ErrorBoundary>
  );
}

export default App;
