import React, { createContext } from "react";
import {
  notification,
  notificationContextInterface,
} from "@/interfaces/notification-context-interface";

const NotificationContext = createContext<notificationContextInterface | null>(
  null,
);

export const useNotification = () => {
  return React.useContext(NotificationContext);
};

const NotificationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeNotification, setActiveNotification] =
    React.useState<notification | null>(null);

  const showNotification = (notificationData: notification) => {
    setActiveNotification(notificationData);
  };

  const hideNotification = () => {
    setActiveNotification(null);
  };

  return (
    <NotificationContext.Provider
      value={{ activeNotification, showNotification, hideNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContextProvider;
