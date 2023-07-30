import React, { ChangeEvent } from "react";
import SuccessSvg from "@/components/helpers/SuccesSvg/SuccessSvg";
import Image from "next/image";

const DropFile: React.FC<{
  setImageUpload: React.Dispatch<React.SetStateAction<File | null>>;
  imageUpload: File | null;
  existingImageSrc: string | null | undefined;
}> = (props) => {
  const [previewImage, setPreviewImage] = React.useState<string | null>(null);

  const { imageUpload, setImageUpload, existingImageSrc } = props;
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

  console.log(imageUpload, previewImage);
  return (
    <div className="flex flex-col gap-2 md:flex-row items-center justify-between flex-1 z-0 w-full mb-6 group align-center">
      <Image
        className="rounded-full"
        src={previewImage || existingImageSrc || "/user-pen.png"}
        alt="Large avatar"
        width={300}
        height={300}
      />
      <div className="flex items-center w-1/2  justify-center">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed
        rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100
         dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          {!previewImage ? (
            <div className="flex flex-col items-center justify-center px-5 py-6">
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
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137
              5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
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
          ) : (
            <div className="flex self-start flex-row w-full items-center">
              <SuccessSvg className={"w-2/5 h-2/5 text-green-500 z-40"} />
              <p className="text-gray-500 text-sm dark:text-gray-400">
                You can see the preview of your image left, if you want to
                change click here.
              </p>
            </div>
          )}
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleUpload}
          />
        </label>
      </div>
    </div>
  );
};

export default DropFile;
