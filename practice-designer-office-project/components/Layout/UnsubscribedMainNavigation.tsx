import React from "react";
import MainNavigationSample from "@/components/helpers/MainNavigation/MainNavigationSample";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";

const UnsubscribedMainNavigation = () => {
  const router = useRouter();

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
      function: async () => {
        await router.push("/auth/login");
        await console.log("Login");
      },
      id: uuidv4(),
    },
    {
      title: "Sign up",
      function: async () => {
        await router.push("/auth/signup");
        await console.log("Sign up");
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
