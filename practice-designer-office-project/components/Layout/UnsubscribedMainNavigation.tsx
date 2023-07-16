import React from "react";
import MainNavigationSample from "@/components/helpers/MainNavigation/MainNavigationSample";
import { v4 as uuidv4 } from "uuid";

const UnsubscribedMainNavigation = () => {
  const contentArray = [
    {
      title: "Home",
      link: "",
    },
    {
      title: "About",
      link: "",
    },
    {
      title: "Contact",
      link: "",
    },
  ];

  const buttonArray = [
    {
      title: "Login",
      function: () => {
        console.log("Sign in");
      },
      id: uuidv4(),
    },
    {
      title: "Sign up",
      function: () => {
        console.log("Sign up");
      },
      id: uuidv4(),
    },
  ];

  return (
    <MainNavigationSample
      buttonArray={buttonArray}
      contentArray={contentArray}
    />
  );
};

export default UnsubscribedMainNavigation;
