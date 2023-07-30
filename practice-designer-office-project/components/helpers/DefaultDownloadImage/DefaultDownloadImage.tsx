import React from "react";
import { notificationContextInterface } from "@/interfaces/notification-context-interface";
import { useNotification } from "@/context/notification-context";

interface DownloadImageProps {
  imageUrl: string;
  fileName: string;
}

const DownloadImage: React.FC<DownloadImageProps> = ({
  imageUrl,
  fileName,
}) => {
  // notification context
  const { showNotification } =
    useNotification() as notificationContextInterface;
  const handleDownload = () => {
    fetch(imageUrl, { mode: "no-cors" })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .then(() => {
        showNotification({
          status: "success",
          title: "Success",
          message: "Image downloaded successfully",
        });
      })
      .catch((error) => {
        showNotification({
          status: "error",
          title: "Error",
          message: error.message,
        });
      });
  };

  return (
    <button
      className="hover:text-primary-500 text-sm text-gray-400 mt-3"
      onClick={handleDownload}
    >
      Click for download
    </button>
  );
};

export default DownloadImage;
