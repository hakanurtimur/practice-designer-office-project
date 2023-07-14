import React from "react";
import Link from "next/link";

const MainNavigation = () => {
  return (
    <header>
      <div>
        <h1>LOGO</h1>
      </div>
      <nav>
        <ul>
          <li>
            {" "}
            <Link href="/">Home</Link>{" "}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
