import { Timestamp } from "@firebase/firestore";

export const formatDate = (timestamp: Timestamp) => {
  if (!timestamp) return "Waiting for date...";
  const dateObj = new Date(timestamp.seconds * 1000);
  const month = dateObj.toLocaleString("en-US", { month: "long" });
  const day = dateObj.toLocaleString("en-US", { day: "numeric" });
  const year = dateObj.toLocaleString("en-US", { year: "numeric" });
  return `${month} ${day}, ${year}`;
};
export const formatDateTime = (timestamp: Timestamp) => {
  if (!timestamp) return "Waiting for date...";
  const dateObj = new Date(timestamp.seconds * 1000);
  const month = dateObj.toLocaleString("en-US", { month: "long" });
  const day = dateObj.toLocaleString("en-US", { day: "numeric" });
  const year = dateObj.toLocaleString("en-US", { year: "numeric" });
  const hours = dateObj.toLocaleString("en-US", {
    hour: "numeric",
    hour12: false,
  });
  const minutes = dateObj.toLocaleString("en-US", { minute: "numeric" });

  return `${month} ${day}, ${year} ${hours}:${minutes}`;
};
