import React, { createContext, ReactNode, useContext, useEffect } from "react";
import { auth, db } from "@/config/firebase-config";
import {
  useCreateUserWithEmailAndPassword,
  useAuthState,
  useSignOut,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { authContextInterface } from "@/interfaces/auth-context-interface";

const AuthContext = createContext<authContextInterface | null>(null);

export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  // Create user in firestore
  const collectionRef = collection(db, "myUsers");

  // fetch users from firestore for role claims we can do it also in the with rules for now we do it here
  const [userRole, setUserRole] = React.useState<string>("");

  // Hooks for authentication
  const [user, loading, error] = useAuthState(auth);
  const [
    createUserWithEmailAndPassword,
    createdUser,
    createLoading,
    createError,
  ] = useCreateUserWithEmailAndPassword(auth);
  const [signout, signOutLoading, signOutError] = useSignOut(auth);
  const [logIn, loggedInUser, loginLoading, loginError] =
    useSignInWithEmailAndPassword(auth);

  // signup function
  const signUp = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(
      email,
      password,
    );
    if (!userCredential) return;
    const newUser = {
      id: userCredential?.user?.uid, // get user uid
      createdAt: new Date().toISOString(),
      role: "client",
    };
    return await setDoc(doc(collectionRef, newUser.id), newUser);
  };

  // signOut function
  const signOut = async () => {
    return await signout();
  };

  // login function
  const login = async (email: string, password: string) => {
    return await logIn(email, password);
  };

  // fetch users from firestore for role claims we can do it also in the with rules for now we do it here

  useEffect(() => {
    if (!collectionRef) return;
    if (!user) return;
    const getUserRole = () => {
      const docRef = doc(collectionRef, user?.uid);
      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            setUserRole(docSnap.data()?.role);
          }
        })
        .then(() => {
          console.log(userRole);
        });
    };

    return getUserRole();
  }, [user, collectionRef]);

  return (
    <AuthContext.Provider
      value={{
        //users states
        user,
        loading,
        error,
        // create user states and function
        signUp,
        createdUser,
        createLoading,
        createError,
        // signOut states and function
        signOut,
        signOutLoading,
        signOutError,
        // login states and function
        login,
        loggedInUser,
        loginLoading,
        loginError,
        // user role
        userRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
