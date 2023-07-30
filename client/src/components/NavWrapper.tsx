import { ReactNode } from "react";

type NavWrapperProps = {
  children: ReactNode;
};

const NavWrapper = ({ children }: NavWrapperProps) => {
  return (
    <main>
      <nav>
        <li>home</li>
        <li>map</li>
        <li>friends</li>
        <li>profile</li>
      </nav>
      <section>{children}</section>
    </main>
  );
};

export default NavWrapper;
