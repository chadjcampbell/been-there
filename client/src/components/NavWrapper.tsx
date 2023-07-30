import { ReactNode } from "react";
import { Link } from "react-router-dom";

type NavWrapperProps = {
  children: ReactNode;
};

const NavWrapper = ({ children }: NavWrapperProps) => {
  return (
    <>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/map">Map</Link>
          <Link to="/friends">Friends</Link>
          <Link to="/profile">Profile</Link>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
};

export default NavWrapper;
