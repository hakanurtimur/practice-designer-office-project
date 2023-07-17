import React, { createContext, ReactNode, useContext } from "react";
import { auth, db } from "@/config/firebase-config";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { authContextInterface } from "@/interfaces/auth-context-interface";

const AuthContext = createContext<authContextInterface | null>(null);

export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  // Create user in firestore
  const collectionRef = collection(db, "myUsers");

  // Hooks for authentication
  const [
    createUserWithEmailAndPassword,
    createdUser,
    createLoading,
    createError,
  ] = useCreateUserWithEmailAndPassword(auth);

  const signUp = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(
      email,
      password,
    );
    const newUser = {
      id: userCredential?.user?.uid, // get user uid
      createdAt: new Date().toISOString(),
      role: "user",
    };
    return await setDoc(doc(collectionRef, newUser.id), newUser);
  };

  return (
    <AuthContext.Provider
      value={{
        signUp,
        createdUser,
        createLoading,
        createError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
