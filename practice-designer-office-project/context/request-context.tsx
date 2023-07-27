import React from "react";
import { useAuth } from "@/context/auth-context";
import { authContextInterface } from "@/interfaces/auth-context-interface";
import {
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
// messages for import { db, rtdb } from "@/config/firebase";
import { uuidv4 } from "@firebase/util";
import { db } from "@/config/firebase-config";
import { useCollection } from "react-firebase-hooks/firestore";
import { requestContextInterface } from "@/interfaces/request-context-interface";
import { FirestoreError } from "@firebase/firestore";

const RequestContext = React.createContext<requestContextInterface | null>(
  null,
);

const useRequest = () => React.useContext(RequestContext);

const RequestProvider = ({ children }: { children: React.ReactNode }) => {
  // hooks for auth
  const { user } = useAuth() as authContextInterface;
  // hooks for requests
  const collectionRef = collection(db, "requests");
  const designCollectionRef = collection(db, "designs");
  const [snapshot, loading, error] = useCollection(collectionRef);
  const [designSnapshot, designLoading, designError] =
    useCollection(designCollectionRef);
  // getting documents
  const allRequests = snapshot?.docs.map((doc) => doc.data());
  const allDesigns = designSnapshot?.docs.map((doc) => doc.data());
  // state for requests
  const [creatingError, setCreatingError] = React.useState<
    FirestoreError | undefined | null
  >(null);
  const [creatingLoading, setCreatingLoading] = React.useState(false);

  // 1) USER ACTIONS !!!!!
  // 1) user can create reqs
  // createRequest function
  const createRequest = async (title: string, description: string) => {
    if (!user || !user.email || !user.uid) return;
    setCreatingLoading(true);
    const newRequest = {
      title: title,
      description: description,
      id: uuidv4(),
      owner: user?.uid,
      ownerName: user?.displayName || "no name",
      ownerEmail: user?.email,
      reqStatus: "pending",
      amId: "flmqC1a8dQSZo3g8pYxqNxkUX8R2",
      amName: "Account Manager 1",
      amNote: null,
      designerId: null,
      designerNote: null,
      imgUrl: null,
      createdAt: serverTimestamp(),
      updatedAt: null,
      designStatus: null,
    };
    try {
      await setDoc(doc(collectionRef, newRequest.id), newRequest);
    } catch (e) {
      setCreatingError(e as FirestoreError);
    }
    setCreatingLoading(false);
  };
  // user can review his reqs and approve

  const approveRequest = async (requestId: string) => {
    if (!user || !user.uid) return;
    const req = selectRequest(requestId);
    if (!req) return;
    setCreatingLoading(true);
    const updatedRequest = {
      ...req,
      reqStatus: "approved",
      updatedAt: serverTimestamp(),
    };
    try {
      await updateDoc(doc(collectionRef, req.id), updatedRequest);
    } catch (e) {
      setCreatingError(e as FirestoreError);
    }
    setCreatingLoading(false);
  };
  // user can review his reqs and reject
  const rejectRequest = async (requestId: string, description: string) => {
    if (!user || !user.uid) return;
    const req = selectRequest(requestId);
    if (!req) return;
    setCreatingLoading(true);
    const updatedRequest = {
      ...req,
      reqStatus: "pending",
      updatedAt: serverTimestamp(),
      description: description,
      designStatus: null,
    };
    try {
      await updateDoc(doc(collectionRef, req.id), updatedRequest);
    } catch (e) {
      setCreatingError(e as FirestoreError);
    }
    setCreatingLoading(false);
  };

  // User can see his requests
  const thisClientsRequests = allRequests?.filter(
    (req) => req.owner === user?.uid,
  );
  //2) AM ACTIONS !!!!!
  // AM can see all his coming reqs
  const myComingRequests = allRequests?.filter((req) => req.amId === user?.uid);
  // AM can see all his designs
  const myDutyDesigns = allDesigns?.filter(
    (design) => design.amId === user?.uid,
  );
  // AM can see reqs details
  const selectRequest = (requestId: string) => {
    return allRequests?.find((req) => req.id === requestId);
  };

  // AM can update reqs to designs and add notes

  const acceptRequest = async (
    requestId: string,
    amNote: string,
    designerId: string,
  ) => {
    if (!user || !user.uid) return;
    const req = selectRequest(requestId);
    if (!req) return;
    setCreatingLoading(true);
    const updatedRequest = {
      ...req,
      reqStatus: "Sent to designer",
      amNote: amNote,
      designerId: designerId,
      updatedAt: serverTimestamp(),
      designStatus: "pending",
    };
    try {
      await updateDoc(doc(collectionRef, req.id), updatedRequest);
      // after updating request, we need to create a design
      await setDoc(doc(designCollectionRef, req.id), updatedRequest);
    } catch (e) {
      setCreatingError(e as FirestoreError);
    }
    setCreatingLoading(false);
  };

  // AM can approve design
  const approveDesign = async (designId: string) => {
    if (!user || !user.uid) return;
    const design = selectDesign(designId);
    const request = selectRequest(designId);
    if (!design) return;
    setCreatingLoading(true);
    const updatedDesign = {
      ...design,
      designStatus: "approved",
      updatedAt: serverTimestamp(),
    };
    const updatedRequest = {
      ...request,
      designStatus: "approved",
      updatedAt: serverTimestamp(),
      reqStatus: "waiting for review",
    };
    try {
      await updateDoc(doc(designCollectionRef, design.id), updatedDesign);
      await updateDoc(doc(collectionRef, design.id), updatedRequest);
    } catch (e) {
      setCreatingError(e as FirestoreError);
    }
    setCreatingLoading(false);
  };
  // AM can reject design
  const rejectDesign = async (designId: string, amNote: string) => {
    if (!user || !user.uid) return;
    const design = selectDesign(designId);
    if (!design) return;
    setCreatingLoading(true);
    const updatedDesign = {
      ...design,
      designStatus: "pending",
      updatedAt: serverTimestamp(),
      amNote: amNote,
    };
    try {
      await updateDoc(doc(designCollectionRef, design.id), updatedDesign);
    } catch (e) {
      setCreatingError(e as FirestoreError);
    }
    setCreatingLoading(false);
  };

  //3) DESIGNER ACTIONS !!!!!
  // Designer can see all his coming designs
  const myComingDesigns = allDesigns?.filter(
    (design) => design.designerId === user?.uid,
  );
  // Designer can see design details
  const selectDesign = (designId: string) => {
    return allDesigns?.find((design) => design.id === designId);
  };
  // Designer can accept design
  const acceptDesign = async (designId: string) => {
    if (!user || !user.uid) return;
    const design = selectDesign(designId);
    if (!design) return;
    setCreatingLoading(true);
    const updatedDesign = {
      ...design,
      designStatus: "ongoing",
      updatedAt: serverTimestamp(),
    };
    try {
      await updateDoc(doc(designCollectionRef, design.id), updatedDesign);
    } catch (e) {
      setCreatingError(e as FirestoreError);
    }
    setCreatingLoading(false);
  };
  // Designer can upload design and finish task
  const finishTask = async (designId: string, designerNote: string) => {
    if (!user || !user.uid) return;
    const design = selectDesign(designId);
    if (!design) return;
    setCreatingLoading(true);
    const updatedDesign = {
      ...design,
      designStatus: "waiting for approval",
      updatedAt: serverTimestamp(),
      designerNote: designerNote,
      //imageUrl: imageUrl, will be added later
    };
    try {
      await updateDoc(doc(designCollectionRef, design.id), updatedDesign);
    } catch (e) {
      setCreatingError(e as FirestoreError);
    }
    setCreatingLoading(false);
  };
  // Designer can update design to done and add notes

  return (
    <RequestContext.Provider
      value={{
        // SA SIDE
        loading,
        error,
        allRequests,
        allDesigns,
        designLoading,
        designError,
        // CLIENT SIDE ACTIONS
        //create states and functions
        createRequest,
        creatingError,
        creatingLoading,
        //client can see his requests
        thisClientsRequests,
        // client can review his reqs and approve
        approveRequest,
        // client can review his reqs and reject
        rejectRequest,
        // AM SIDE ACTIONS
        // AM can see all his coming reqs
        myComingRequests,
        // AM can see reqs details
        selectRequest,
        // AM can see all his designs
        myDutyDesigns,
        // AM can update reqs to designs and add notes
        acceptRequest,
        // AM can approve design
        approveDesign,
        // AM can reject design
        rejectDesign,
        // DESIGNER SIDE ACTIONS
        // Designer can see all his coming designs
        myComingDesigns,
        // Designer can see design details
        selectDesign,
        // Designer can accept design
        acceptDesign,
        // Designer can upload design and finish task
        finishTask,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};

export { RequestProvider, useRequest };
