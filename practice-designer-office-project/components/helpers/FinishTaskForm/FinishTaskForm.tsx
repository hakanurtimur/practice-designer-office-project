import React, { ChangeEvent, useEffect } from "react";
import { requestContextInterface } from "@/interfaces/request-context-interface";
import { useRequest } from "@/context/request-context";
import { notificationContextInterface } from "@/interfaces/notification-context-interface";
import { useNotification } from "@/context/notification-context";
import LoadingSpinner from "@/components/helpers/LoadingSpinner/LoadingSpinner";
import { useStorage } from "@/context/storage-context";
import { storageContextInterface } from "@/interfaces/storage-context-interface";
import Image from "next/image";
import { uuidv4 } from "@firebase/util";
import { getDownloadURL, ref } from "@firebase/storage";
import { storage } from "@/config/firebase-config";

const FinishTaskForm: React.FC<{
  designId: string;
  clientId: string;
}> = (props) => {
  // refs
  const designerNoteRef = React.useRef<HTMLTextAreaElement>(null);
  // const fileRef = React.useRef<HTMLInputElement>(null);
  // req context
  const { finishTask, creatingError, creatingLoading } =
    useRequest() as requestContextInterface;
  // notification context
  const { showNotification } =
    useNotification() as notificationContextInterface;
  // storage context
  const { uploadImageHandler } = useStorage() as storageContextInterface;

  // internal states
  const [imageUpload, setImageUpload] = React.useState<File | null>(null);
  const [previewImage, setPreviewImage] = React.useState<string | null>(null);
  // onChangeEvent for file upload
  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (!event.target.files) return;
    const file = event.target.files[0];
    setImageUpload(file);
    if (!file) {
      return;
    }
    const filereader = new FileReader();
    filereader.onloadend = () => {
      setPreviewImage(filereader.result as string);
    };
    filereader.readAsDataURL(file);
  };
  // submit handler
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    // fileRef will be added later
    const designerNote = designerNoteRef.current?.value;
    const imageId = uuidv4();
    const imagePath = `images/designs/${props.clientId}/${props.designId}/${imageId}`;
    const imageRef = ref(storage, imagePath);
    let imageUrl = "";
    if (!designerNote) {
      showNotification({
        status: "error",
        title: "Error",
        message: "Please add a note to send to Manager",
      });
      return;
    }
    if (!imageUpload) {
      showNotification({
        status: "error",
        title: "Error",
        message: "Please add a image to send to Manager",
      });
      return;
    }
    await showNotification({
      status: "loading",
      title: "Sending to Account Manager",
      message: "Please wait while we are sending your design to Manager",
    });
    if (imageUpload) {
      await uploadImageHandler(imageUpload, imagePath);
      imageUrl = await getDownloadURL(imageRef);
    }
    await finishTask(props.designId, designerNote, imageUrl);
    await showNotification({
      status: "success",
      title: "Sent to Account Manager",
      message:
        "Your design has been sent to Manager successfully. Waiting for Manager's approval.",
    });
  };

  useEffect(() => {
    if (creatingError) {
      showNotification({
        status: "error",
        title: "Error",
        message: creatingError.message,
      });
    }
  }, [creatingError]);

  return (
    <form onSubmit={submitHandler}>
      {creatingLoading && <LoadingSpinner />}
      {creatingLoading && (
        <div className="fixed inset-0 bg-overlay bg-gray-950 opacity-30 z-40"></div>
      )}
      <label
        htmlFor="dropzone-file"
        className="block mb-2 text-sm font-medium text-primary-500 dark:text-white"
      >
        {!previewImage ? "Add Your Work Here" : "Preview"}
      </label>
      {!previewImage ? (
        <div className="flex items-center justify-center w-full mb-4">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300
           border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700
           hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleUpload}
            />
          </label>
        </div>
      ) : (
        <div className="flex flex-col w-full mb-4">
          <Image
            src={previewImage}
            alt={"preview"}
            className={"mb-3"}
            width={300}
            height={300}
          />
          <p
            className="mb-3 text-gray-500 text-sm dark:text-gray-400 cursor-pointer hover:text-primary-500"
            onClick={() => {
              setPreviewImage(null);
            }}
          >
            Cancel and choose new image
          </p>
        </div>
      )}

      <label
        htmlFor="note"
        className="block mb-2 text-sm font-medium text-primary-500 dark:text-white"
      >
        Add Designer Note
      </label>
      <textarea
        id="note"
        rows={4}
        className="mb-3 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg
         border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700
         dark:border-gray-600 dark:placeholder-gray-400
        dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        placeholder="Add your note here..."
        ref={designerNoteRef}
      ></textarea>
      <div className={"flex flex-row justify-end w-full"}>
        <button
          type="submit"
          className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4
        focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-full
        sm:w-auto px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700
        dark:focus:ring-primary-800 mt-3"
        >
          Send to Account Manager
        </button>
      </div>
    </form>
  );
};

export default FinishTaskForm;
