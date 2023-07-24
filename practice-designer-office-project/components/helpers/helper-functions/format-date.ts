import { Timestamp } from "@firebase/firestore";

export const formatDate = (timestamp: Timestamp) => {
  const dateObj = new Date(timestamp.seconds * 1000);
  const month = dateObj.toLocaleString("en-US", { month: "long" });
  const day = dateObj.toLocaleString("en-US", { day: "numeric" });
  const year = dateObj.toLocaleString("en-US", { year: "numeric" });
  return `${month} ${day}, ${year}`;
};
