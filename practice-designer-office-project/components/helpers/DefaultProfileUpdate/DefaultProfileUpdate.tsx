import React from "react";
import { authContextInterface } from "@/interfaces/auth-context-interface";
import { useAuth } from "@/context/auth-context";
import LoadingSpinner from "@/components/helpers/LoadingSpinner/LoadingSpinner";
import { useRouter } from "next/router";
import Link from "next/link";

const DefaultUpdateProfile: React.FC<{
  userRole: string;
}> = (props) => {
  const { updateUserProfile, updating, updateError } =
    useAuth() as authContextInterface;
  // router
  const router = useRouter();
  // error
  const [error, setError] = React.useState({
    error: false,
    content: "",
  });
  // refs
  const nameInputRef = React.useRef<HTMLInputElement>(null);
  const surnameInputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const enteredName = nameInputRef.current?.value;
    const enteredSurname = surnameInputRef.current?.value;
    if (!enteredName || !enteredSurname) {
      setError({
        error: true,
        content: "Please fill in all fields",
      });
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
    if (enteredName !== undefined && enteredSurname !== undefined) {
      await updateUserProfile({
        displayName: enteredName + " " + enteredSurname,
        photoURL: "/user-pen.png",
      });
    }
    await router.push(`/${props.userRole}/profile`);
  };

  return (
    <form onSubmit={handleSubmit} className={"w-8/12 mx-auto my-10"}>
      {updating && <LoadingSpinner />}
      {updating && (
        <div className="absolute inset-0 bg-overlay bg-gray-950 opacity-30 z-40"></div>
      )}
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-6 group align-center">
          <img
            className="w-20 h-20 rounded"
            src="/user-pen.png"
            alt="Large avatar"
          />
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <label
            className="block mb-2 text-sm font-medium text-gray-900
        dark:text-white text-primary-600"
            htmlFor="default_size"
          >
            Select a profile picture
          </label>
          <input
            className="block w-full mb-5 text-sm text-gray-900 
            border border-gray-300 rounded-lg cursor-pointer bg-gray-50 
            dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="default_size"
            type="file"
          />
        </div>
        <div className="relative z-0 w-full mb-6 group">
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
            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            First name
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            ref={surnameInputRef}
            name="floating_last_name"
            id="floating_last_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_last_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-600 peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Last name
          </label>
        </div>
      </div>
      {error.error && (
        <div className="flex items-center justify-center">
          <p className="text-red-500 text-sm font-medium">{error.content}</p>
        </div>
      )}
      {updateError && (
        <div className="flex items-center justify-center">
          <p className="text-red-500 text-sm font-medium">
            {updateError.message}
          </p>
        </div>
      )}
      <button
        type="submit"
        className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
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
