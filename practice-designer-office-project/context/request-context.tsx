import React from "react";
import { useAuth } from "@/context/auth-context";
import { authContextInterface } from "@/interfaces/auth-context-interface";
import {
  collection,
  doc,
  setDoc,
  /*  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,*/
} from "firebase/firestore";
// messages for import { db, rtdb } from "@/config/firebase";
import { uuidv4 } from "@firebase/util";
import { db } from "@/config/firebase-config";
import { useCollection } from "react-firebase-hooks/firestore";
import { requestContextInterface } from "@/interfaces/request-context-interface";
import { serverTimestamp } from "firebase/firestore";
import { FirestoreError } from "@firebase/firestore";

const RequestContext = React.createContext<requestContextInterface | null>(
  null,
);

const useRequest = () => React.useContext(RequestContext);

const RequestProvider = ({ children }: { children: React.ReactNode }) => {
  // hooks for auth
  const { user } = useAuth() as authContextInterface;
  // hooks for requests
  if (!user) return null;
  const collectionRef = collection(db, "requests");
  const [snapshot, loading, error] = useCollection(collectionRef);
  // getting documents
  const value = snapshot?.docs.map((doc) => doc.data());
  // state for requests
  const [creatingError, setCreatingError] = React.useState<
    FirestoreError | undefined | null
  >(null);
  const [creatingLoading, setCreatingLoading] = React.useState(false);

  // 1) USER ACTIONS !!!!!
  // 1) user can create reqs

  // createRequest function
  const createRequest = async (title: string, description: string) => {
    setCreatingLoading(true);
    if (!user || !user.email || !user.uid) return;
    const newRequest = {
      title: title,
      description: description,
      id: uuidv4(),
      owner: user?.uid,
      ownerName: user?.displayName || "no name",
      reqStatus: "pending",
      designerId: null,
      designerNote: null,
      imgUrl: null,
      createdAt: serverTimestamp(),
      updatedAt: null,
    };
    try {
      await setDoc(doc(collectionRef, newRequest.id), newRequest);
    } catch (e) {
      setCreatingError(e as FirestoreError);
      console.log(e);
    }
    setCreatingLoading(false);
  };
  return (
    <RequestContext.Provider
      value={{
        loading,
        error,
        value,
        // create states and functions
        createRequest,
        creatingError,
        creatingLoading,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};

export { RequestProvider, useRequest };
