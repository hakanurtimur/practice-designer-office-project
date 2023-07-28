export interface notificationContextInterface {
  activeNotification: notification | null;
  showNotification: (notification: notification) => void;
  hideNotification: () => void;
}

export interface notification {
  title: string;
  message: string;
  status: string;
}
