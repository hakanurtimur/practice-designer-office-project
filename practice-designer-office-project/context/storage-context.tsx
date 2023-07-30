import React, { createContext } from "react";
import { storage } from "@/config/firebase-config";
import { ref } from "firebase/storage"; // import { uuidv4 } from "@firebase/util";
import { useUploadFile } from "react-firebase-hooks/storage";
import { storageContextInterface } from "@/interfaces/storage-context-interface";

const StorageContext = createContext<storageContextInterface | null>(null);

export const useStorage = () => {
  return React.useContext(StorageContext);
};

const StorageContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // hooks
  const [uploadImage, uploading, uploadSnapshot, uploadError] = useUploadFile();
  // const [value, loading, error] = useDownloadURL();
  // functions

  const uploadImageHandler = async (image: File, path: string) => {
    const imageRef = ref(storage, path);
    await uploadImage(imageRef, image);
  };

  return (
    <StorageContext.Provider
      value={{
        uploadImageHandler,
        uploading,
        uploadSnapshot,
        uploadError,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};

export default StorageContextProvider;
