import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavWrapper from "./components/global/NavWrapper";
import Home from "./routes/Home";
import Map from "./routes/Map";
import Friends from "./routes/Friends";
import Profile from "./routes/Profile";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Error from "./routes/Error";
import AuthWrapper from "./components/global/AuthWrapper";
import Chats from "./routes/Chats";

function App() {
  return (
    <BrowserRouter>
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
      </Routes>{" "}
    </BrowserRouter>
  );
}

export default App;
