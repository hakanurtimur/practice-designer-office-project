import React from "react";
import DefaultCarousel from "@/components/helpers/DefaultCarousel/DefaultCarousel";

const ClientDashboard = () => {
  const items = [
    {
      content: "New Request",
      imageUrl: "/plus.png",
      link: "/client/new-request",
    },
    {
      content: "Your Requests",
      imageUrl: "/request.png",
      link: "/client/request-list",
    },
    {
      content: "Profile Settings",
      imageUrl: "/user-settings.png",
      link: "/client/profile",
    },
    {
      content: "Message Center",
      imageUrl: "/messages.png",
      link: "/client/message-center",
    },
  ];

  return (
    <div
      className={
        "h-80 w-full flex flex-col my-10 items-center gap-5 justify-between"
      }
    >
      <h1 className={`font-bold text-primary-600  text-2xl`}>
        Dash<span className={`font-bold text-primary-300 text-2x1`}>board</span>
      </h1>
      <DefaultCarousel items={items} />
    </div>
  );
};

export default ClientDashboard;
