import { DocumentData, FirestoreError, Timestamp } from "@firebase/firestore";

export interface requestContextInterface {
  allRequests: DocumentData | undefined;
  error: FirestoreError | undefined;
  loading: boolean;
  // CLIENT SIDE
  // --- Functions ---
  createRequest: (title: string, description: string) => Promise<void>;
  // states
  creatingError: FirestoreError | undefined | null;
  creatingLoading: boolean;
  // --- Variables ---
  thisClientsRequests: DocumentData[] | undefined;

  // AM SIDE
  // --- Functions ---
  // states
  // --- Variables ---
  myComingRequests: DocumentData[] | undefined;
}

export interface requestInterface {
  title: string;
  description: string;
  id: string;
  owner: string;
  ownerName: string;
  ownerEmail: string;
  reqStatus: string;
  amId: string | null;
  amName: string | null;
  amNote: string | null;
  designerId: string | null;
  designerNote: string | null;
  imgUrl: string | null;
  createdAt: Timestamp;
  updatedAt: Timestamp | null;
}
