import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavWrapper from "./components/NavWrapper";
import Home from "./routes/Home";
import Map from "./routes/Map";
import Friends from "./routes/Friends";
import Profile from "./routes/Profile";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Error from "./routes/Error";
import axios from "axios";
import AuthWrapper from "./components/AuthWrapper";
import { UserContext } from "./context/UserContext";
import Chats from "./routes/Chats";

axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <UserContext>
        <Routes>
          <Route element={<AuthWrapper />}>
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
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </UserContext>
    </BrowserRouter>
  );
}

export default App;
