import { DocumentData, FirestoreError, Timestamp } from "@firebase/firestore";

export interface requestContextInterface {
  allRequests: DocumentData | undefined;
  error: FirestoreError | undefined;
  loading: boolean;
  allDesigns: DocumentData | undefined;
  designError: FirestoreError | undefined;
  designLoading: boolean;
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
  acceptRequest: (
    id: string,
    amNote: string,
    designerId: string,
  ) => Promise<void>;
  approveDesign: (designId: string) => Promise<void>;
  rejectDesign: (designId: string, amNote: string) => Promise<void>;

  // states
  // --- Variables ---
  myComingRequests: DocumentData[] | undefined;
  selectRequest: (id: string) => DocumentData | undefined;
  myDutyDesigns: DocumentData[] | undefined;

  // DESIGNER SIDE
  // --- Functions ---
  acceptDesign: (designId: string) => Promise<void>;
  finishTask: (designId: string, designerNote: string) => Promise<void>;
  // states
  // --- Variables ---
  myComingDesigns: DocumentData[] | undefined;
  selectDesign: (id: string) => DocumentData | undefined;
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
  designStatus: string | null;
}
