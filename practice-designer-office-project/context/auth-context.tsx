import React, { createContext, ReactNode, useContext, useEffect } from "react";
import { auth, db } from "@/config/firebase-config";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
  useSignOut,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  authContextInterface,
  fetchedUser,
} from "@/interfaces/auth-context-interface";

const AuthContext = createContext<authContextInterface | null>(null);

export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  // Create user in firestore
  const collectionRef = collection(db, "myUsers");

  // fetch users from firestore for role claims we can do it also in the with rules for now we do it here
  // Hooks for authentication
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
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
  const [sendPasswordResetEmail, sendingPassword, sendPasswordError] =
    useSendPasswordResetEmail(auth);
  const [allUsers, setAllUsers] = React.useState<fetchedUser[] | undefined>([]);

  // get All users
  useEffect(() => {
    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
      const items: object[] = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setAllUsers(items as fetchedUser[] | undefined);
    });
    return () => unsubscribe();
  }, []);

  // signup function
  const signUp = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(
      email,
      password,
    );
    if (!userCredential) return;
    const newUser = {
      id: userCredential.user.uid, // get user uid
      createdAt: new Date().toISOString(),
      role: "client",
      name: "",
      email: userCredential.user.email,
      photoURL: "",
      // We can add a field for the assigned AM
      assignedAmId: "flmqC1a8dQSZo3g8pYxqNxkUX8R2",
      assignedAmName: "Account Manager 1",
    };
    return await setDoc(doc(collectionRef, newUser.id), newUser);
  };

  // update user profile

  const updateUserProfile = async ({
    displayName,
    photoURL,
  }: {
    displayName?: string | undefined;
    photoURL?: string | undefined;
  }) => {
    if (!user) return;
    const updatedUser = {
      name: displayName,
      photoURL: photoURL,
    };
    await updateProfile({ displayName, photoURL });
    return await updateDoc(doc(collectionRef, user.uid), updatedUser);
  };

  // signOut function
  const signOut = async () => {
    return await signout();
  };

  // login function
  const login = async (email: string, password: string) => {
    return await logIn(email, password);
  };

  // send password reset email
  const sendPasswordReset = async (email: string) => {
    return await sendPasswordResetEmail(email);
  };

  // fetch users from firestore for role claims we can do it also in the with rules for now we do it here

  const getUserRole = async () => {
    if (!collectionRef) return;
    if (!user) return;
    const docRef = doc(collectionRef, user.uid);
    const userData = await getDoc(docRef);
    if (!userData) return;
    const userRole = userData.data()?.role;
    return userRole as string;
  };
  // fetch assigned users for AM for now we do it here, we can do it in the with rules

  const myAssignedUsers = allUsers?.filter(
    (user) => user.assignedAmId === "flmqC1a8dQSZo3g8pYxqNxkUX8R2",
  );

  const selectUser = (id: string) => {
    return allUsers?.find((user) => user.id === id);
  };

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
        // send password reset email states and function
        sendPasswordReset,
        sendingPassword,
        sendPasswordError,
        // update user profile
        updateUserProfile,
        updating,
        updateError,
        // user role
        getUserRole,
        // all users for admin
        allUsers,
        // select user for admin and AM
        selectUser,
        // assigned users for AM
        myAssignedUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
