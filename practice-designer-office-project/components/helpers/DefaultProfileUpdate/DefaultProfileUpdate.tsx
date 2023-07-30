import React, { useEffect } from "react";
import { authContextInterface } from "@/interfaces/auth-context-interface";
import { useAuth } from "@/context/auth-context";
import LoadingSpinner from "@/components/helpers/LoadingSpinner/LoadingSpinner";
import { useRouter } from "next/router";
import Link from "next/link";
import { notificationContextInterface } from "@/interfaces/notification-context-interface";
import { useNotification } from "@/context/notification-context";
import DropFile from "./DropFile";
import { useStorage } from "@/context/storage-context";
import { storageContextInterface } from "@/interfaces/storage-context-interface";
import { uuidv4 } from "@firebase/util";
import { getDownloadURL, ref } from "@firebase/storage";
import { storage } from "@/config/firebase-config";

const DefaultUpdateProfile: React.FC<{
  userRole: string;
}> = (props) => {
  // auth context
  const { updateUserProfile, updating, updateError, user } =
    useAuth() as authContextInterface;
  // notification context
  const { showNotification } =
    useNotification() as notificationContextInterface;
  // storage context
  const { uploadImageHandler, uploadError, uploading } =
    useStorage() as storageContextInterface;
  // router
  const router = useRouter();
  // error
  const [error, setError] = React.useState({
    error: false,
    content: "",
  });
  // internal states
  const [imageUpload, setImageUpload] = React.useState<File | null>(null);
  // refs
  const nameInputRef = React.useRef<HTMLInputElement>(null);
  const surnameInputRef = React.useRef<HTMLInputElement>(null);
  // existing image
  const existingImageSrc = user?.photoURL;
  console.log("existingImageSrc", existingImageSrc);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const imageId = uuidv4();
    const enteredName = nameInputRef.current?.value;
    const enteredSurname = surnameInputRef.current?.value;
    let downloadURL = "";
    if (!enteredName || !enteredSurname) {
      setError({
        error: true,
        content: "Please fill in all fields",
      });
      return;
    }
    if (!existingImageSrc && !imageUpload) {
      setError({
        error: true,
        content: "Please upload an image",
      });
      return;
    }
    if (
      enteredName?.trim().length === 0 ||
      enteredSurname?.trim().length === 0
    ) {
      setError({
        error: true,
        content: "Please fill in all fields",
      });
    }
    await showNotification({
      message: "Updating profile...",
      status: "loading",
      title: "Updating profile",
    });
    if (imageUpload) {
      const imagePath = `images/pp/${user?.uid}/${imageId}`;
      const imageRef = ref(storage, imagePath);
      await uploadImageHandler(imageUpload, imagePath);
      downloadURL = await getDownloadURL(imageRef);
    }
    await updateUserProfile({
      displayName: enteredName + " " + enteredSurname,
      photoURL: downloadURL || existingImageSrc || "/user-pen.svg",
    });
    await showNotification({
      message: "Profile updated",
      status: "success",
      title: "Profile updated",
    });
    await router.push(`/${props.userRole}/profile`);
  };

  useEffect(() => {
    if (updateError || uploadError) {
      showNotification({
        message: (updateError?.message || uploadError?.message) as string,
        status: "error",
        title: "Error updating profile",
      });
    }
  }, [updateError]);

  return (
    <form onSubmit={handleSubmit} className={"w-8/12 mt-10 mx-auto my-10"}>
      {(updating || uploading) && <LoadingSpinner />}
      {(updating || uploading) && (
        <div className="absolute inset-0 bg-overlay bg-gray-950 opacity-30 z-40"></div>
      )}
      <div className="flex flex-col md:gap-6 w-full">
        <DropFile
          imageUpload={imageUpload}
          setImageUpload={setImageUpload}
          existingImageSrc={existingImageSrc}
        />
        <div>
          <div className="relative z-0  w-full md:w-1/2 mb-6 group">
            <input
              type="text"
              ref={nameInputRef}
              name="floating_first_name"
              id="floating_first_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_first_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300
            transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0
            peer-focus:text-primary-600 peer-focus:dark:text-primary-500
            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75
            peer-focus:-translate-y-6"
            >
              First name
            </label>
          </div>
          <div className="relative z-0 w-full md:w-1/2 mb-6 group">
            <input
              type="text"
              ref={surnameInputRef}
              name="floating_last_name"
              id="floating_last_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2
              border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500
              focus:outline-none focus:ring-0 focus:border-primary-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_last_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300
              transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-600
              peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
              peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Last name
            </label>
          </div>
        </div>
      </div>
      {error.error && (
        <div className="flex items-center justify-center">
          <p className="text-red-500 text-sm font-medium">{error.content}</p>
        </div>
      )}
      {(updateError || uploadError) && (
        <div className="flex items-center justify-center">
          <p className="text-red-500 text-sm font-medium">
            {updateError?.message || uploadError?.message}
          </p>
        </div>
      )}
      <button
        type="submit"
        className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none
        focus:ring-primary-300 font-medium rounded-lg text-sm w-full
         sm:w-auto px-5 py-2.5 text-center dark:bg-primary-600
         dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Submit
      </button>
      <Link
        href={`/${props.userRole}/profile`}
        className="inline-flex items-center px-4 py-2
            text-sm font-medium text-center text-gray-900
            rounded-lg hover:text-primary-600
            dark:text-white
            dark:hover:text-primary-700"
      >
        Back
      </Link>
    </form>
  );
};

export default DefaultUpdateProfile;
